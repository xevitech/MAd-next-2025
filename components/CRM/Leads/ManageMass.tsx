import React, { useEffect, useState } from "react";
import {
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  FilterCoulmn,
  SearchCoulmBox,
  TitleLeads,
  FilterIconStyle,
  FilterMenuList,
  MylistItem,
  LeadFilterListing,
  FilterField,
  ApplyButtonWrapper,
  FilledButton,
  OutLinedButton,
  FilterValuesLeads,
  ManageColumnList,
  ActionFieldStyle,
  ManagaDeleteDialog,
  FormFieldContainer,
  MassUpdateContent,
} from "../style";

import { Divider, Grid } from "@mui/material";
import {
  CommonFormcontrol,
  SearchCommon,
  SmallBlackOutineBtn,
  SmallRedOutineBtn,
  StyledBootstrapDialog,
} from "../commonStyle";
import { useSelector } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  DateFilter,
  NumberFilter,
  StringFilter,
} from "@/components/common/common";
import SearchIcon from "@mui/icons-material/Search";
import { idID } from "@mui/material/locale";
import {
  fetchAllFields,
  getAllFieldData,
  setFilters,
  updateFiledsData,
} from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { ThreeDots } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import CountrySelect from "@/components/common/countrydropdown/Index";
import { toast } from "react-toastify";
import CommonOwner from "./CommonOwner";
import MobileInputCommon from "@/components/common/PhoneInput";
import { CustomDatePicker } from "@/components/common/datePicker";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
import CommonAccounts from "./CommonAccounts";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ManageMass = ({ openPopUp, setAction }) => {
  const dispatch = useAppDispatch();
  const {
    savedFieldData,
    selectedDataIds,
    saveLoader,
    formList,
    userLists,
    typeName,
    typeId
  } = useSelector((state: any) => state.formList);
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState<any>("");
  const [latestField, setLatestField] = useState<any>([]);
  const [mobileState, setMobileState] = useState("");
  const [error, setError] = useState(false);
  const handleCloseColumn = () => {
    setAction("Action");
  };

  const handleChangeFields = (event, type) => {
    if (type == "name") {
      setFieldName(event.target.value);
      setFieldValue("");
      formList?.data?.form_data?.length > 0 &&
        formList?.data?.form_data.map((ele) => {
          ele?.form_fields?.map((newEle) => {
            if (newEle.id == event.target.value) setLatestField(newEle);
          });
        });
      // setLatestField(savedFieldData?.user_form_listing?.form_fields_data.find((ele) => ele.id == event.target.value))
    } else {
      setFieldValue(event.target.value);
    }
  };

  useEffect(() => {
    dispatch(fetchAllFields());
  }, [dispatch]);

  const handleUpdateData = async () => {
    if (
      fieldValue == "" ||
      fieldValue == null ||
      fieldName == "" ||
      fieldName == null
    ) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    let body = {
      unique_id: selectedDataIds.join(","),
      section_form_id: fieldName,
      value: fieldValue,
      crm_user_form_unique_id: latestField?.crm_user_form_unique_id,
      type_id:typeId,
      form_input_list_id:latestField?.form_input_list_id,
    };
    let response = await dispatch(updateFiledsData(body));
    if (response?.payload?.status == 200) {
      dispatch(getAllFieldData());
      toast.success(response?.payload?.message);
      handleCloseColumn();
    }
  };

  const onSubmit = (e) => {
    if (e.key === "Enter") {
      handleUpdateData();
    }
  };
  return (
    <MassUpdateContent>
      <StyledBootstrapDialog
        // onClose={handleCloseColumn}
        aria-labelledby="customized-dialog-title"
        open={openPopUp}
        sx={ManagaDeleteDialog}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseColumn}
        >
          Mass Update
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ManageColumnList>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <CommonFormcontrol required fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Select Field
                  </InputLabel>
                  <Select
                    fullWidth
                    id="demo-simple-select"
                    value={fieldName}
                    defaultValue="Select a Value"
                    onChange={(e) => handleChangeFields(e, "name")}
                    IconComponent={KeyboardArrowDownOutlinedIcon}
                    label={"Select Field"}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {savedFieldData?.data?.form_fields_data?.length > 0 &&
                      savedFieldData?.data?.form_fields_data.map(
                        (filters, filtersIndex) => {
                          if (
                            filters?.field_type != "tag" &&
                            filters?.name != "id"
                          ) {
                            return (
                              <MenuItem value={filters.id}>
                                {filters.name == "mail"
                                  ? "Email"
                                  : filters.name
                                      .replaceAll("_", " ")
                                      .replaceAll(".", "")}
                              </MenuItem>
                            );
                          }
                        }
                      )}
                  </Select>
                </CommonFormcontrol>
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <CommonFormcontrol fullWidth size="small">
                  {(latestField.name == "Lead_Owner" ||
                    latestField.name == "Contact_Owner" ||
                    latestField.name == "Account_Owner" ||
                    latestField.name == "Deal_Owner") &&
                  latestField.field_type == "select" ? (
                    <div className="massupdeowner">
                      <CommonOwner
                        defaultOwner={null}
                        updateValue={(newValue) => {
                          setFieldValue(newValue?.email);
                        }}
                        label={""}
                        size="small"
                        userLists={userLists}
                      />
                    </div>
                  ) : latestField.name == "Account_Name" ||
                    latestField.name == "Account" ? (
                    <div className="massupdeowner">
                      <CommonAccounts
                        label={latestField.label}
                        updateValue={(newValue) => {
                          if (typeName == "Leads") {
                            setFieldValue(newValue?.value);
                          } else {
                            if (
                              newValue?.unique_id != "" &&
                              newValue?.unique_id != null &&
                              newValue?.unique_id != undefined
                            ) {
                              setFieldValue(newValue?.value);
                            } else {
                              setFieldValue("");
                            }
                          }
                        }}
                        defaultValue={""}
                      />
                    </div>
                  ) : latestField.field_type == "float" ||
                    latestField.field_type === "integer" ? (
                    <TextField
                      id="outlined-number"
                      type="number"
                      name="value"
                      size="small"
                      onChange={(e) => handleChangeFields(e, "value")}
                    />
                  ) : latestField.field_type === "phone" ? (
                    <MobileInputCommon
                      mobileNumber={fieldValue}
                      countryCode={""}
                      size="small"
                      handleChange={(e) => {
                        setFieldValue(e);
                      }}
                      placeholder={"90 2327 7211"}
                      helperText={"Please enter valid phone number."}
                    />
                  ) : latestField.field_type == "select" ? (
                    <FormFieldContainer fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {latestField.label}
                      </InputLabel>
                      <Select
                        required={latestField.is_required == 1 ? true : false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fieldValue}
                        size="small"
                        label={latestField.label}
                        onChange={(e) => handleChangeFields(e, "value")}
                        IconComponent={KeyboardArrowDownOutlinedIcon}
                        error={error ? true : false}
                      >
                        {latestField.option_list?.map((list, index) => (
                          <MenuItem value={list} key={index}>
                            {list}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormFieldContainer>
                  ) : latestField.field_type == "date" ? (
                    <FormFieldContainer fullWidth>
                      <CustomDatePicker
                        handleChange={(e) => {
                          setFieldValue(e.target.value);
                        }}
                        name="value"
                        value={fieldValue}
                        // defaultDate={new Date()}
                      />
                    </FormFieldContainer>
                  ) : latestField.field_type == "timestamp" ? (
                    <CustomDateTimePicker
                      label={""}
                      value={""}
                      name="value"
                      size="small"
                      handleChange={(e) => {
                        setFieldValue(e.target.value);
                      }}
                    />
                  ) : latestField?.field_type == "checkbox" ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={filteredValue?.condition}
                      defaultValue={0}
                      size="small"
                      onChange={(e) => {
                        setFieldValue(e.target.value);
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                    >
                      <MenuItem value={0}>Select Status</MenuItem>
                      <MenuItem value={1}>Selected</MenuItem>
                      <MenuItem value={2}>Not Selected</MenuItem>
                    </Select>
                  ) : latestField.field_type == "country" ? (
                    // <FormFieldContainer fullWidth
                    // >
                    <CountrySelect
                      country={fieldValue}
                      setCountry={(value) => {
                        setFieldValue(value);
                      }}
                      helperText={
                        error ? `Please enter ${latestField?.label}` : null
                      }
                      error={error ? true : false}
                    />
                  ) : (
                    // </FormFieldContainer>
                    // <FormFieldContainer fullWidth>
                    <TextField
                      required={latestField.is_required == 1 ? true : false}
                      style={{ width: "100%" }}
                      id="outlined-required"
                      label={latestField?.label}
                      value={fieldValue}
                      size="small"
                      placeholder={
                        latestField.placeholder
                          ? latestField?.placeholder
                              ?.replaceAll("_", " ")
                              .replaceAll(".", "")
                          : latestField?.label
                              ?.replaceAll("_", " ")
                              .replaceAll(".", "")
                      }
                      onChange={(e) => handleChangeFields(e, "value")}
                      helperText={
                        error ? `Please enter ${latestField?.label}` : null
                      }
                      error={error ? true : false}
                      onKeyDown={onSubmit}
                    />
                    // </FormFieldContainer>
                  )}
                </CommonFormcontrol>
              </Grid>
            </Grid>
          </ManageColumnList>
        </DialogContent>
        <DialogActions>
          <SmallRedOutineBtn
            variant="outlined"
            autoFocus
            onClick={handleUpdateData}
          >
            {saveLoader ? (
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="#D7282F"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              "Save"
            )}
          </SmallRedOutineBtn>
          <SmallBlackOutineBtn variant="outlined" onClick={handleCloseColumn}>
            Cancel
          </SmallBlackOutineBtn>
        </DialogActions>
      </StyledBootstrapDialog>
    </MassUpdateContent>
  );
};
export default ManageMass;
