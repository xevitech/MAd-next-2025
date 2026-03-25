import { Box, Dialog, Grid, MenuItem, Select, styled } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  CustomInputontent,
  FormOuterBox,
  FormOuterBoxContainer,
  LeadButtonContainer,
  LeadButtonContainerInner,
  LeadInfoHeading,
  LeadsDialogContent,
  LeadsDialogTitle,
  TypographyEdit,
} from "../style";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import Link from "@mui/material/Link";
import router, { useRouter } from "next/router";
import FormSkeleton from "../FormInputs/FormSkeleton";
import CustomInputs from "../FormInputs/CustomInputs";
import _debounce from "lodash/debounce";
import {
  createHistory,
  saveFieldsData,
  setFormData,
  setSelectedViewName,
  setTypeId,
  setTypeName,
} from "@/hooks/UseCreateFormData";
import { toast } from "react-toastify";
import { CommonBigBlackOutineBtn, CommonBigRedOutineBtn } from "../commonStyle";
import { ThreeDots } from "react-loader-spinner";
import { getGeoLocation } from "@/hooks/geolocation";
import { countries } from "@/utils/countries";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "1100px",
    maxWidth: "1000px",
    borderRadius: "0px",
    background: "transparent",
    boxShadow: "none",
    overflow: "unset",
    "@media screen and (max-width: 767px)": {
      width: "95%",
      maxWidth: "95%",
    },
  },
}));

const CreateForm = (props) => {
  const [open, setOpen] = useState(props.open);
  const [error, setError] = useState<any>([]);
  const { asPath } = useRouter();
  const dispatch = useAppDispatch();
  const { typeName, formList, formData, saveLoader, loader, typeId } =
    useSelector((state: any) => state.formList);
  const { userEmail } = useSelector((state: any) => state.userData);
  const NavigateHandler = (route) => router.push(route);
  const { countryCode } = useSelector((state: any) => state.geoLocation);

  const debounceLoadData = useCallback(
    _debounce((q, i) => onChnageHandler(q, i, formData), 500),
    [formData]
  );
  const onChnageHandler = (value, index, data) => {
    let duplicateData: any = [...data];
    let arr = duplicateData.map((v: any) => {
      let cloneData = { ...v };
      if (cloneData.id == index) {
        cloneData.value = value;
        return cloneData;
      } else {
        return cloneData;
      }
    });
    dispatch(setFormData(arr));
  };
  useEffect(() => {
    dispatch(getGeoLocation());
  }, []);

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const saveLeads = async () => {
    let integers = /^[0-9\b]+$/;
    let floats = /^[+-]?\d+(\.\d+)?$/;
    let errorField = formData.filter(
      (item) =>
        (item.required == "1" && item.value == "") ||
        (item.type == "email" &&
          item.required == "1" &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(item.value)) ||
        (item.value != "" &&
          item.type == "integer" &&
          !integers.test(item.value)) ||
        (item.value != "" &&
          item.type == "float" &&
          !item.value.match(floats)) ||
        (item.value !== "" && item.type == "url" && !isValidURL(item.value))
    );
    if (errorField && errorField?.length > 0) {
      setError(errorField);
    } else {
      setError([]);
      let array = [];
      formData?.map((list, index) => {
        let newValue = list.value == "null" ? "" : list.value;
        if (list.label == "First Name") {
          newValue =
            localStorage.getItem("prefix") == "Mr" ||
            localStorage.getItem("prefix") == "Mrs"
              ? localStorage.getItem("prefix") + " " + list.value
              : list.value;
        }

        if (
          list?.name == "Lead_status" &&
          (list?.value == "" || list?.value == null)
        ) {
          newValue = "Untouched";
        }

        if (
          list?.type == "phone" &&
          (list?.value != "" || list?.value != null)
        ) {
          newValue = list?.value?.replaceAll(`+${countryCode}-`, '');
        }
        if (
          list?.name == "Lead_status" &&
          (list?.value == "" || list?.value == null)
        ) {
          newValue = "Untouched";
        }

        if (
          list.name == "Lead_Owner" ||
          list.name == "Contact_Owner" ||
          list.name == "Account_Owner" ||
          list.name == "Deal_Owner"
        ) {
          if (list?.value == "" || list?.value == null) {
            newValue = userEmail;
          }
        }
        if (
          list?.type == "country" &&
          (list?.value == "" || list?.value == null)
        ) {
          const country = countries.find(
            (item) => item?.code == countryCode
          )?.name;
          newValue = country;
        }
        if (list.label == "Full Name" && typeName == "Contacts") {
          newValue = `${
            formData.find((item) => item.label == "First Name")?.value
          } ${formData.find((item) => item.label == "Last Name")?.value}`;
        }

        array.push({
          // id: list.id,
          id: "",
          value: newValue == undefined ? "" : newValue,
          // section_form_id: list.section_form_id
          section_form_id: list.id,
          form_input_list_id: list.form_input_list_id,
          unique: list?.unique == 1 ? true : false,
        });
      });
      let postData = {
        crm_user_form_unique_id: formList?.data?.unique_id,
        type_id: formList?.data?.type_id,
        form_input_value: array,
      };

      let response = await dispatch(saveFieldsData(postData));
      if (response?.payload?.status == 200) {
        dispatch(
          createHistory({
            lead_id: response?.payload?.lead_id,
            type_id: typeId,
            name: "Lead",
            type: "info",
            message: `<span>Lead Created</span>`,
          })
        );
        if (response?.payload?.data !== undefined) {
          setError(Object.values(response?.payload?.data));
          return;
        } else {
          setOpen(false);
          props.setFormStatus();
          NavigateHandler(`/crm/${typeName.toLowerCase()}`);
          toast.success(response?.payload?.message);
        }
      }
    }
  };
  const handleClose = () => {
    if (asPath.includes("leads")) {
      dispatch(setTypeId(1));
      dispatch(setTypeName("Leads"));
      dispatch(setSelectedViewName(`All Leads`));
    } else if (asPath.includes("contacts")) {
      dispatch(setTypeId(4));
      dispatch(setTypeName("Contacts"));
      dispatch(setSelectedViewName(`All Contacts`));
    } else if (asPath.includes("accounts")) {
      dispatch(setTypeId(3));
      dispatch(setTypeName("Accounts"));
      dispatch(setSelectedViewName(`All Accounts`));
    } else if (asPath.includes("deals")) {
      dispatch(setTypeId(2));
      dispatch(setTypeName("Deals"));
      dispatch(setSelectedViewName(`All Deals`));
    } else {
      dispatch(setTypeId(5));
      dispatch(setTypeName("Sales"));
      dispatch(setSelectedViewName(`All Sales`));
    }
    props.setFormStatus();
  };
  return (
    <BootstrapDialog
      className="leadsform"
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <LeadsDialogTitle id="customized-dialog-title">
        <i className="icon-leadsblack" style={{ margin: "3px 5px 0 0" }}></i>{" "}
        Create {typeName}
        <Link
          onClick={(e) => NavigateHandler("/crm/layout")}
          underline="hover"
          color="inherit"
          style={{ cursor: "pointer" }}
        >
          <TypographyEdit variant="overline">Edit Page layout</TypographyEdit>
        </Link>
      </LeadsDialogTitle>
      <FormOuterBoxContainer>
        {loader ? (
          <FormSkeleton />
        ) : (
          <>
            <FormOuterBox>
              {formList &&
                formList?.data?.form_data?.length > 0 &&
                formList?.data?.form_data?.map((list, index) => (
                  <LeadsDialogContent key={`parent_${index}`}>
                    <LeadInfoHeading style={{ margin: "0" }}>
                      {list.name}
                    </LeadInfoHeading>
                    <CustomInputontent>
                      <Box component="form" noValidate autoComplete="off">
                        <Grid container spacing={2}>
                          {list?.form_fields?.length > 0 &&
                            list?.form_fields?.map((field, childIndex) => (
                              <>
                                <CustomInputs
                                  field={field}
                                  key={`childIndex_ ${childIndex}`}
                                  index={childIndex}
                                  setFormData={debounceLoadData}
                                  formData={formData}
                                  error={error}
                                  listType={list.tab_columns}
                                />
                              </>
                            ))}
                        </Grid>
                      </Box>
                    </CustomInputontent>
                  </LeadsDialogContent>
                ))}
              {/* <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <CommonSocialLinks />
                </Grid>
              </Grid> */}
            </FormOuterBox>
            <LeadButtonContainer>
              <LeadButtonContainerInner>
                <CommonBigRedOutineBtn onClick={saveLeads}>
                  {saveLoader ? (
                    <ThreeDots
                      height="40"
                      width="40"
                      radius="9"
                      color="#fff"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    "Save"
                  )}
                </CommonBigRedOutineBtn>
                <CommonBigBlackOutineBtn onClick={handleClose}>
                  Cancel
                </CommonBigBlackOutineBtn>
              </LeadButtonContainerInner>
            </LeadButtonContainer>
          </>
        )}
      </FormOuterBoxContainer>
    </BootstrapDialog>
  );
};

export default CreateForm;
