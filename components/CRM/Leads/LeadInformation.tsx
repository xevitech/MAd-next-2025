import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  styled,
  TextField,
  FormControlLabel,
  Link,
  Autocomplete,
} from "@mui/material";
import { useRouter } from "next/router";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { SDCheckboxStyle } from "../commonStyle";
import {
  BoxBothfield,
  CustomInputCheckbox,
  CustomInputCheckboxRow,
  EditFields,
  EditableBox,
  FormFieldContainer,
  ImageEdit,
  InputFieldName,
  InputFieldValue,
  LeadBoxBothfield,
  LeadInfoCalenderBpx,
  LeadInfoHeading,
  LeadInfoIconData,
  LeadInfoRow,
  LeadViewFormData,
  LeadViewFormrow,
  LeadViewInner,
  LeadViewformContent,
  ModeEdit,
  PrefixEditableBox,
} from "../style";
import { useSelector } from "react-redux";
import { countriesList as countries } from "@/utils/countriesphp";
import {
  setShowButtonsAsperDataChecked,
  setSelectedDataIds,
  setDetailsData,
  createHistory,
  EditSingleLead,
  setUpdateSingleData,
  setEmailIdToSender,
  getListOfUsersAndSubUsers,
  setShowSkeltn,
} from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useEffect, useRef, useState } from "react";
import CommonOwner from "./CommonOwner";
import { apiClient } from "@/components/common/common";
import CountrySelect from "@/components/common/countrydropdown/Index";
import LeadOwner from "../PageLayout/common/LeadOwner";
import LeadInfo from "../Skeletons/LeadInfo";
import dynamic from "next/dynamic";
import { CheckOs } from "@/components/common/common";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
import moment from "moment";
import { CustomDatePicker } from "@/components/common/datePicker";
import { FormControl } from "@mui/base";
import CommonAccounts from "./CommonAccounts";
import StateSelect from "@/components/common/countrydropdown/states";
import { getAllListOfCities } from "@/hooks/geolocation";
const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);
const LeadInformation = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef(null);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState<any>({ name: "" });
  const [isChecked, setIsChecked] = useState(false);
  const [timeStamp, setTimeStamp] = useState<any>("");
  const {
    updateSingleData,
    details,
    userLists,
    showSkelton,
    redirectedValue,
    editSingleData,
    typeId,
    formData,
    countryName,
    emailIdToSender,
    singleActivity,
    typeName,
    addedTags,
  } = useSelector((state: any) => state.formList);
  const { countryCode, allCities, selectedCity } = useSelector(
    (state: any) => state.geoLocation
  );
  const [prefix, setPrefix] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showEdit, setShowEdit] = useState({ type: "", show: false });
  const [showFullContent, setShowFullContent] = useState(false);
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(setShowSkeltn(true));
      if (redirectedValue == true) {
        await dispatch(EditSingleLead(singleActivity));
      } else {
        await dispatch(
          EditSingleLead({
            unique_id: router?.query?.id[0],
            crm_user_form_unique_id: router?.query?.id[1],
          })
        );
      }
      await dispatch(getListOfUsersAndSubUsers());
      await dispatch(setEmailIdToSender(details));
      dispatch(setShowSkeltn(false));
    }
    fetchMyAPI();
  }, [dispatch]);

  const handleEdit = (data) => {
    setEditField(data.id);
    if (data.name == "First_Name") {
      setPrefix(data.value.split(" ")[0]);
      setEditValue({ name: data.value });
    } else if (data.field_type == "checkbox") {
      setIsChecked(data.value == 1 ? true : false);
      setEditValue({ name: data.value });
    } else {
      setEditValue({ name: data.value });
    }
  };

  const handleChange = (e, Section, item) => {
    if (item?.field_type == "checkbox") {
      setEditValue({ name: e === true ? 1 : 0 });
    } else {
      const value = e.target.value;
      setEditValue({ name: value });
    }
  };

  const handleSaveField = async (section, item) => {
    const body = {
      crm_user_form_unique_id: item.crm_user_form_unique_id,
      type_id: section.type_id,
      unique_id: details?.unique_id,
      form_input_value: [
        {
          id: item.crm_save_form_id,
          section_form_id: item.id,
          value: editValue.name,
          form_input_list_id: item.form_input_list_id,
          unique: item?.unique == 1 ? true : false,
        },
      ],
    };

    dispatch(setShowSkeltn(true));
    setEditField("");

    let response = await apiClient("crm/save_input_form", "post", {
      body: body,
    });
    if (response.status == true || response.status == 200) {
      await dispatch(EditSingleLead(details));
      let newDetails = details
        ? details
        : JSON.parse(localStorage?.getItem("details"));
      const postNewDetails = { ...newDetails, [item.name]: editValue.name };
      dispatch(setDetailsData(postNewDetails));
      dispatch(
        createHistory({
          lead_id: details.unique_id,
          type_id: typeId,
          name: "Lead Info",
          type: "info",
          message: `<span>${typeName} Info - </span>${item?.name.replaceAll(
            "_",
            " "
          )} has been changed <b>from</b> ${
            item?.field_type == "checkbox"
              ? item?.value == 1
                ? "Checked"
                : "Unchecked"
              : item?.value
              ? item?.value
              : "null"
          } <b>to </b>${
            item?.field_type == "checkbox"
              ? editValue.name == 1
                ? "Checked"
                : "Unchecked"
              : editValue.name
              ? editValue.name
              : "null"
          } `,
        })
      );
      dispatch(setShowSkeltn(false));
    }
  };
  const handleCancel = () => {
    setEditField("");
    setShowEdit({ ...showEdit, show: false });
  };

  const setMobileNumber = (value, mobile_code, country_code, errorText) => {
    setEditValue({
      name: `+${mobile_code}-${value}`,
    });
  };

  const [selecteddCity, setSelectedCity] = useState(null);

  const displayedContent = (item) => {
    return showFullContent ? (
      <div dangerouslySetInnerHTML={{ __html: item }} />
    ) : (
      <div dangerouslySetInnerHTML={{ __html: item.slice(0, 250) }} />
    );
  };

  const handleCityChange = (event, value) => {
    setSelectedCity(value);
    setEditValue({
      name: value?.name,
    });
  };
  return (
    <>
      {showSkelton && <LeadInfo />}
      {!showSkelton && (
        <LeadViewFormData>
          {updateSingleData[0]?.form_data?.length > 0
            ? updateSingleData[0]?.form_data?.map((Section) => {
                return (
                  <>
                    <LeadViewformContent>
                      <LeadInfoHeading>{Section?.name}</LeadInfoHeading>
                      <LeadViewFormrow>
                        <LeadViewInner>
                          <Grid
                            container
                            rowSpacing={1}
                            spacing={1.5}
                            columnSpacing={{ xs: 1, sm: 1, md: 1, xl: 1.5 }}
                          >
                            {Section?.form_fields?.map(
                              (item) =>
                                item?.name != "tag" &&
                                item?.name != "Social" && (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={item?.field_type == "textarea" ? 12 : 6}
                                    md={item?.field_type == "textarea" ? 12 : 6}
                                    className={
                                      item?.field_type == "textarea" &&
                                      "infotextarea"
                                    }
                                  >
                                    <LeadInfoRow className="leadrow">
                                      <Grid container>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={
                                            item?.field_type == "textarea"
                                              ? 2.1
                                              : 3
                                          }
                                          lg={
                                            item?.field_type == "textarea"
                                              ? 2.1
                                              : 4
                                          }
                                          xl={
                                            item?.field_type == "textarea"
                                              ? 2.1
                                              : 4
                                          }
                                        >
                                          <InputFieldName>
                                            {item?.name == "mail"
                                              ? "Email"
                                              : item?.name.replaceAll(
                                                  "_",
                                                  " "
                                                )}{" "}
                                          </InputFieldName>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          // md={9}
                                          // lg={8}
                                          // xl={8}
                                          md={
                                            item?.field_type == "textarea"
                                              ? 9.9
                                              : 9
                                          }
                                          lg={
                                            item?.field_type == "textarea"
                                              ? 9.9
                                              : 8
                                          }
                                          xl={
                                            item?.field_type == "textarea"
                                              ? 9.9
                                              : 8
                                          }
                                        >
                                          {editField !== item.id && (
                                            <LeadInfoIconData>
                                              {item.field_type == "checkbox" ? (
                                                <FormFieldContainer fullWidth>
                                                  <CustomInputCheckboxRow>
                                                    <CustomInputCheckbox>
                                                      {" "}
                                                      <FormControlLabel
                                                        control={
                                                          <Checkbox
                                                            checked={
                                                              item?.value == 1
                                                                ? true
                                                                : false
                                                            }
                                                          />
                                                        }
                                                        label={""}
                                                        sx={SDCheckboxStyle}
                                                      />
                                                    </CustomInputCheckbox>
                                                  </CustomInputCheckboxRow>
                                                </FormFieldContainer>
                                              ) : (
                                                <InputFieldValue>
                                                  {item.name == "Lead_Owner" ||
                                                  item.name ==
                                                    "Contact_Owner" ||
                                                  item.name ==
                                                    "Account_Owner" ||
                                                  item.name == "Deal_Owner" ? (
                                                    userLists?.find(
                                                      (ele) =>
                                                        ele.email == item.value
                                                    )?.name
                                                  ) : item.name ==
                                                    "Description" ? (
                                                    <>
                                                      {displayedContent(
                                                        item?.value
                                                      )}

                                                      {item?.value?.length >
                                                        250 && (
                                                        <Link
                                                          className="showmorelink"
                                                          underline="hover"
                                                          onClick={
                                                            toggleContent
                                                          }
                                                        >
                                                          {showFullContent
                                                            ? "Show less"
                                                            : "Show more"}
                                                        </Link>
                                                      )}
                                                    </>
                                                  ) : (
                                                    item?.value
                                                  )}
                                                </InputFieldValue>
                                              )}

                                              <ModeEdit
                                                className="hovericons"
                                                sx={{ color: "#d7282f" }}
                                                onClick={(e) => {
                                                  e.preventDefault(),
                                                    handleEdit(item);
                                                }}
                                              />
                                            </LeadInfoIconData>
                                          )}
                                          {editField == item.id && (
                                            <>
                                              {item.name == "Lead_Owner" ||
                                              item.name == "Contact_Owner" ||
                                              item.name == "Account_Owner" ||
                                              item.name == "Deal_Owner" ? (
                                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                                  <LeadOwner
                                                    inputRef={inputRef}
                                                    defaultOwner={editValue}
                                                    userLists={userLists}
                                                    label={"Lead Owner"}
                                                    updateValue={(newValue) => {
                                                      setEditValue({
                                                        name: newValue,
                                                      });
                                                    }}
                                                    onChange={(value) => {
                                                      setEditValue({
                                                        name: value,
                                                      });
                                                    }}
                                                  />
                                                </EditableBox>
                                              ) : (item.name ==
                                                  "Account_Name" ||
                                                  item.name == "Account") &&
                                                typeName != "Accounts" ? (
                                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                                  <CommonAccounts
                                                    label={item.label}
                                                    updateValue={(newValue) => {
                                                      if (typeName == "Leads") {
                                                        setEditValue({
                                                          name: newValue?.value,
                                                        });
                                                      } else {
                                                        if (
                                                          newValue?.unique_id !=
                                                            "" &&
                                                          newValue?.unique_id !=
                                                            null &&
                                                          newValue?.unique_id !=
                                                            undefined
                                                        ) {
                                                          setEditValue({
                                                            name: newValue?.value,
                                                          });
                                                        } else {
                                                          setEditValue({
                                                            name: item?.value,
                                                          });
                                                        }
                                                      }
                                                    }}
                                                    defaultValue={item?.value}
                                                  />
                                                </EditableBox>
                                              ) : item?.field_type ==
                                                  "select" &&
                                                item.name != "State" &&
                                                item.name != "City" ? (
                                                <EditableBox className="leadinfoEditablefield">
                                                  <Select
                                                    fullWidth
                                                    required={false}
                                                    inputRef={inputRef}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={editValue.name}
                                                    IconComponent={
                                                      KeyboardArrowDownOutlinedIcon
                                                    }
                                                    label={""}
                                                    onChange={(e) => {
                                                      e.preventDefault();
                                                      setEditValue({
                                                        name: e.target.value,
                                                      });
                                                    }}
                                                  >
                                                    {" "}
                                                    {item?.option_list?.map(
                                                      (list, index) => (
                                                        <MenuItem
                                                          value={list}
                                                          key={index}
                                                        >
                                                          {list}
                                                        </MenuItem>
                                                      )
                                                    )}
                                                  </Select>
                                                </EditableBox>
                                              ) : item.name == "State" &&
                                                item.field_type == "select" ? (
                                                <EditableBox className="leadinfoEditablefield">
                                                  <StateSelect
                                                    mode={"edit"}
                                                    country={
                                                      countries.find(
                                                        (v) =>
                                                          v.name ==
                                                          Section?.form_fields?.find(
                                                            (ele) =>
                                                              ele?.name ==
                                                              "Country"
                                                          )?.value
                                                      )?.code
                                                    }
                                                    value={editValue.name}
                                                    usedOn="CRM"
                                                    setStateData={(value) => {
                                                      setEditValue({
                                                        name: value,
                                                      });
                                                      dispatch(
                                                        getAllListOfCities({
                                                          state: value,
                                                          country:
                                                            Section?.form_fields?.find(
                                                              (ele) =>
                                                                ele?.name ==
                                                                "Country"
                                                            )?.value,
                                                        })
                                                      );
                                                    }}
                                                    autoComplete="off"
                                                  />
                                                </EditableBox>
                                              ) : item.name == "City" &&
                                                item.field_type == "select" ? (
                                                <EditableBox className="leadinfoEditablefield">
                                                  <Autocomplete
                                                    id="city-select-demo"
                                                    size="small"
                                                    options={allCities}
                                                    popupIcon={<KeyboardArrowDownOutlinedIcon />}
                                                    value={
                                                      selecteddCity
                                                        ? selecteddCity
                                                        : null
                                                    }
                                                    autoHighlight
                                                    disableClearable={true}
                                                    getOptionLabel={(option) =>
                                                      option?.name
                                                    }
                                                    onChange={handleCityChange}
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        size="small"
                                                        placeholder="Select City"
                                                      />
                                                    )}
                                                  />
                                                </EditableBox>
                                              ) : (
                                                <>
                                                  {item.option_list?.length >
                                                    0 &&
                                                  item.label == "First Name" ? (
                                                    <PrefixEditableBox className="leadinfoEditablefield">
                                                      {/* <BoxBothfield className="Prefixbothfield"> */}
                                                      <LeadBoxBothfield className="">
                                                        {/* <FormFieldContainer
                                                          style={{
                                                            width: "25%",
                                                          }}
                                                        >
                                                          
                                                          <Select
                                                            inputRef={inputRef}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={
                                                              prefix
                                                                ? prefix
                                                                : "Prefix"
                                                            }
                                                           
                                                            onChange={(e) => {
                                                              setPrefix(
                                                                e.target.value
                                                              );
                                                            }}
                                                            IconComponent={
                                                              KeyboardArrowDownOutlinedIcon
                                                            }
                                                            error={true}
                                                          >
                                                            <MenuItem
                                                              value={"Prefix"}
                                                              key={
                                                                "indexPrefic"
                                                              }
                                                            >
                                                              Prefix
                                                            </MenuItem>
                                                            {item.option_list?.map(
                                                              (list, index) => (
                                                                <MenuItem
                                                                  value={list}
                                                                  key={index}
                                                                >
                                                                  {list}
                                                                </MenuItem>
                                                              )
                                                            )}
                                                          </Select>
                                                        </FormFieldContainer> */}
                                                        <FormFieldContainer
                                                          style={{
                                                            width: "75%",
                                                          }}
                                                        >
                                                          <TextField
                                                            inputRef={inputRef}
                                                            fullWidth
                                                            id="outlined-required"
                                                            value={
                                                              editValue.name
                                                            }
                                                            // label={item.label}
                                                            placeholder={
                                                              item.label
                                                            }
                                                            onChange={(e) => {
                                                              e.preventDefault();
                                                              setEditValue({
                                                                name: e.target
                                                                  .value,
                                                              });
                                                            }}
                                                          />
                                                        </FormFieldContainer>
                                                      </LeadBoxBothfield>
                                                    </PrefixEditableBox>
                                                  ) : (
                                                    <>
                                                      {" "}
                                                      {item.field_type ==
                                                      "phone" ? (
                                                        <EditableBox className="leadinfoEditablefield">
                                                          <MobileInputCommon
                                                            mobileNumber={
                                                              editValue.name
                                                                ? editValue.name
                                                                : ""
                                                            }
                                                            countryCode={
                                                              editValue.name
                                                                ? editValue.name.split(
                                                                    ""
                                                                  )[0]
                                                                : ""
                                                            }
                                                            handleChange={
                                                              setMobileNumber
                                                            }
                                                            helperText={""}
                                                            placeholder={
                                                              "90 2327 7211"
                                                            }
                                                          />
                                                        </EditableBox>
                                                      ) : item.field_type ==
                                                        "country" ? (
                                                        <EditableBox className="countryinfofield leadinfoEditablefield">
                                                          <CountrySelect
                                                            IconComponent={
                                                              KeyboardArrowDownOutlinedIcon
                                                            }
                                                            country={
                                                              editValue.name
                                                                ? countries.find(
                                                                    (v) =>
                                                                      v.name ==
                                                                      editValue.name
                                                                  )?.code
                                                                : ""
                                                            }
                                                            setCountry={(
                                                              value
                                                            ) => {
                                                              let countrycode =
                                                                value
                                                                  ? countries.find(
                                                                      (v) =>
                                                                        v.code ==
                                                                        value
                                                                    )?.name
                                                                  : null;
                                                              setEditValue({
                                                                name: countrycode,
                                                              });
                                                            }}
                                                          />
                                                        </EditableBox>
                                                      ) : item.field_type ==
                                                        "date" ? (
                                                        // <LeadInfoCalenderBpx>
                                                        <EditableBox className="onlydatepicker">
                                                          <CustomDatePicker
                                                            handleChange={(
                                                              e
                                                            ) => {
                                                              handleChange(
                                                                e,
                                                                Section,
                                                                item
                                                              );
                                                            }}
                                                            name="value"
                                                            value={item?.value}
                                                            // defaultDate={new Date()}
                                                          />
                                                          {/* </LeadInfoCalenderBpx> */}
                                                        </EditableBox>
                                                      ) : item.field_type ==
                                                        "timestamp" ? (
                                                        //  <LeadInfoCalenderBpx>
                                                        <EditableBox>
                                                          <CustomDateTimePicker
                                                            label={""}
                                                            value={item?.value}
                                                            handleChange={(
                                                              e
                                                            ) => {
                                                              setTimeStamp(
                                                                e.target.value
                                                              );
                                                              handleChange(
                                                                e,
                                                                Section,
                                                                item
                                                              );
                                                            }}
                                                          />
                                                        </EditableBox>
                                                      ) : // </LeadInfoCalenderBpx>
                                                      item.field_type ==
                                                        "checkbox" ? (
                                                        <FormFieldContainer
                                                          fullWidth
                                                        >
                                                          <CustomInputCheckboxRow>
                                                            <CustomInputCheckbox>
                                                              {" "}
                                                              <FormControlLabel
                                                                control={
                                                                  <Checkbox
                                                                    checked={
                                                                      isChecked
                                                                    }
                                                                    onClick={(
                                                                      e
                                                                    ) => {
                                                                      setIsChecked(
                                                                        !isChecked
                                                                      );
                                                                      handleChange(
                                                                        !isChecked,
                                                                        Section,
                                                                        item
                                                                      );
                                                                    }}
                                                                  />
                                                                }
                                                                label={""}
                                                                sx={
                                                                  SDCheckboxStyle
                                                                }
                                                              />
                                                            </CustomInputCheckbox>
                                                          </CustomInputCheckboxRow>
                                                        </FormFieldContainer>
                                                      ) : item.field_type ==
                                                        "textarea" ? (
                                                        <FormFieldContainer
                                                          fullWidth
                                                        >
                                                          <TextField
                                                            inputProps={{
                                                              style: {
                                                                padding: 0,
                                                              },
                                                            }}
                                                            id="outlined-textarea"
                                                            inputRef={inputRef}
                                                            multiline
                                                            rows={4}
                                                            value={
                                                              editValue.name
                                                            }
                                                            onChange={(e) => {
                                                              e.preventDefault();
                                                              handleChange(
                                                                e,
                                                                Section,
                                                                item
                                                              );
                                                            }}
                                                          />{" "}
                                                        </FormFieldContainer>
                                                      ) : (
                                                        <EditableBox className="leadinfoEditablefield">
                                                          <TextField
                                                            inputRef={inputRef}
                                                            value={
                                                              editValue.name
                                                            }
                                                            onChange={(e) => {
                                                              e.preventDefault();
                                                              if (
                                                                item?.label ==
                                                                  "Annual Revenue" ||
                                                                item?.label ==
                                                                  "No of Employee" ||
                                                                item?.label ==
                                                                  "Zip Code" ||
                                                                item?.label ==
                                                                  "Rating"
                                                              ) {
                                                                const input =
                                                                  e.target
                                                                    .value;
                                                                const regex =
                                                                  /^[0-9\b]+$/;
                                                                if (
                                                                  input ===
                                                                    "" ||
                                                                  regex.test(
                                                                    input
                                                                  )
                                                                ) {
                                                                  handleChange(
                                                                    e,
                                                                    Section,
                                                                    item
                                                                  );
                                                                }
                                                              } else {
                                                                handleChange(
                                                                  e,
                                                                  Section,
                                                                  item
                                                                );
                                                              }
                                                            }}
                                                          />{" "}
                                                        </EditableBox>
                                                      )}
                                                    </>
                                                  )}
                                                </>
                                              )}

                                              <EditFields
                                                className={`${
                                                  item.field_type == "textarea"
                                                    ? "hovericons textareaButtons"
                                                    : "hovericons"
                                                }`}
                                              >
                                                <span>
                                                  <CloseIcon
                                                    className="social-icon2"
                                                    sx={{ color: "#d7282f" }}
                                                    onClick={() =>
                                                      handleCancel()
                                                    }
                                                  />
                                                  <DoneOutlinedIcon
                                                    className="social-icon1"
                                                    sx={{
                                                      color: "green !important",
                                                    }}
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      handleSaveField(
                                                        Section,
                                                        item
                                                      );
                                                    }}
                                                  />
                                                </span>
                                              </EditFields>
                                            </>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </LeadInfoRow>
                                  </Grid>
                                )
                            )}
                          </Grid>
                        </LeadViewInner>
                      </LeadViewFormrow>
                    </LeadViewformContent>
                  </>
                );
              })
            : " No Data Found "}
        </LeadViewFormData>
      )}
    </>
  );
};
export default LeadInformation;
