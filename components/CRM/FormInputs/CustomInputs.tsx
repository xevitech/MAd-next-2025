import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  BoxBothfield,
  CreateFormCountrySelect,
  CreateLeadCustomForm,
  CustomFormFieldContainer,
  CustomInputCheckbox,
  CustomInputCheckboxRow,
  CustomInputForm,
  FormFieldContainer,
  InfoIconTooltip,
  StyleMobileField,
} from "../style";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import _debounce from "lodash/debounce";
import CountrySelect from "@/components/common/countrydropdown/Index";
import { CustomDatePicker } from "@/components/common/datePicker";
import { countriesList as countries } from "@/utils/countriesphp";
import CommonOwner from "../Leads/CommonOwner";
import { useSelector } from "react-redux";
import { SDCheckboxStyle } from "../commonStyle";
import { useAppDispatch } from "redux/store";
import {
  getAllListOfCities,
  getGeoLocation,
  setCountryCode,
  setDefaultCode,
  setSelectedCity,
} from "@/hooks/geolocation";
import CommonAutoComplete from "../Leads/CommonAutoComplete";
import moment from "moment";
import dynamic from "next/dynamic";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
import { apiClient } from "@/components/common/common";
import InfiniteScroll from "react-infinite-scroll-component";
import CommonAccounts from "../Leads/CommonAccounts";
import CommonTimeZone from "../Leads/CommonTimeZone";
import CommonSocialLinks from "../Leads/CommonSocialLinks";
import { FileUpload } from "@/components/common/uploadFile";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { MobileCodes } from "@/components/common/PhoneInput/MobileCodesList";
import CitiesStates from "@/components/common/CityStateDropdown";
import CountryStates from "@/components/common/statedropdown";
import StateSelect from "@/components/common/countrydropdown/states";
const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);

const CustomInputs = ({
  field,
  key,
  index,
  setFormData,
  formData,
  error,
  listType,
}) => {
  const [state, setState] = useState<any>("");
  const clearstate = useRef(null);
  const [mobile_code, setMobile_code] = useState<any>("");
  const [Image, setImage] = useState<any>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [defaultCountryCode, setDefaultCountryCode] = useState<any>("");
  const [errorText, setErrorText] = useState<string>("");
  const [cities, setCities] = useState([]);
  let errorData = error?.find((ele) => ele.id == field.id);
  const dispatch = useAppDispatch();

  const getCities = async (state) => {
    if (!state && !countryCode) {
      return;
    }
    const response = await apiClient(
      `cities?state=${state}&country=${countryCode}`,
      "get"
    );
    if (response.status === 200) {
      setCities(response.data);
    } else {
      setCities([]);
    }
  };

  const setMobileNumber = (value, id, mobile_code) => {
    setMobile_code(mobile_code);
    setState(value);
    if (value !== "") {
      setFormData(`+${mobile_code}-${value}`, id);
    }
  };

  const handleUpload = (e, field_id) => {
    setImage([...e]);
    setFormData(Image, field_id);
  };

  const { countryCode, allCities, selectedCity } = useSelector(
    (state: any) => state.geoLocation
  );
  const { userLists, typeName } = useSelector((state: any) => state.formList);
  const { userEmail } = useSelector((state: any) => state.userData);
  return (
    <>
      {field.field_type == "social" ? (
        <Grid item xs={12} sm={12} md={12} key={key}>
          <CommonSocialLinks
            label={field.label}
            updateValue={(newValue) => {
              setFormData(newValue, field.id);
            }}
            defaultValue={""}
            helperText={
              errorData?.id == field.id
                ? `Please select ${errorData?.label}`
                : null
            }
            error={errorData?.id == field.id ? true : false}
          />
        </Grid>
      ) : (
        field.field_type !== "tag" && (
          <Grid
            item
            xs={12}
            sm={
              field.field_type == "textarea" || listType == "single"
                ? 12
                : listType == "double"
                ? 6
                : 4
            }
            md={
              field.field_type == "textarea" || listType == "single"
                ? 12
                : listType == "double"
                ? 6
                : 4
            }
            key={key}
          >
            {field.field_type == "select" ||
            (field.name == "Account" &&
              field.field_type == "text" &&
              typeName == "Leads") ? (
              field.label == "Lead Owner" ||
              field.label == "Contact Owner" ||
              field.label == "Account Owner" ||
              field.label == "Deal Owner" ? (
                <CustomFormFieldContainer
                  fullWidth
                  size="small"
                  className={field.is_required == 1 ? "mandatoryField" : ""}
                >
                  <CommonOwner
                    startIcon={true}
                    defaultOwner={userLists?.find(
                      (item) => item?.email == userEmail
                    )}
                    size="small"
                    updateValue={(newValue) => {
                      setFormData(newValue?.email, field.id);
                    }}
                    label={field.label}
                    userLists={userLists}
                    helperText={
                      errorData?.id == field.id
                        ? `Please select ${errorData?.label}`
                        : null
                    }
                    error={errorData?.id == field.id ? true : false}
                  />
                </CustomFormFieldContainer>
              ) : field.name == "Account_Name" || field.name == "Account" ? (
                <CustomFormFieldContainer
                  fullWidth
                  size="small"
                  className={field.is_required == 1 ? "mandatoryField" : ""}
                >
                  <CommonAccounts
                    startIcon={true}
                    label={field.label}
                    updateValue={(newValue) => {
                      if (typeName == "Leads") {
                        setFormData(newValue?.value, field.id);
                      } else {
                        if (
                          newValue?.unique_id != "" &&
                          newValue?.unique_id != null &&
                          newValue?.unique_id != undefined
                        ) {
                          setFormData(newValue?.value, field.id);
                        } else {
                          setFormData("", field.id);
                        }
                      }
                    }}
                    defaultValue={""}
                    helperText={
                      errorData?.id == field.id
                        ? `Please select ${errorData?.label}`
                        : null
                    }
                    error={errorData?.id == field.id ? true : false}
                  />
                </CustomFormFieldContainer>
              ) : field.name == "State" && field.field_type == "select" ? (
                <CustomFormFieldContainer
                  fullWidth
                  size="small"
                  className={field.is_required == 1 ? "mandatoryField" : ""}
                >
                  <StateSelect
                    mode={"edit"}
                    country={countryCode}
                    value={state}
                    usedOn="CRM"
                    setStateData={(value) => {
                      setFormData(value, field.id);
                      setState(value);
                      dispatch(getAllListOfCities({ state: value }));
                    }}
                    autoComplete="off"
                    label="State"
                  />
                </CustomFormFieldContainer>
              ) : field.name == "City" && field.field_type == "select" ? (
                <CustomFormFieldContainer
                  fullWidth
                  size="small"
                  className={field.is_required == 1 ? "mandatoryField" : ""}
                >
                  <Autocomplete
                    id="city-select-demo"
                    popupIcon={<KeyboardArrowDownOutlinedIcon />}
                    size="small"
                    options={allCities}
                    value={state ? state : null}
                    autoHighlight
                    disableClearable={true}
                    getOptionLabel={(option) => option?.name}
                    onChange={(event, value) => {
                      setState(value);
                      if (value) {
                        setFormData(value?.name ? value.name : value, field.id);
                        // dispatch(setSelectedCity(value?.name));
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select City"
                        label="City"
                      />
                    )}
                  />
                </CustomFormFieldContainer>
              ) : (
                <CustomFormFieldContainer
                  fullWidth
                  size="small"
                  error={errorData?.id == field.id ? true : false}
                  className={field.is_required == 1 ? "mandatoryField" : ""}
                >
                  {field.tooltip && (
                    <Tooltip title={field.tooltip} placement="top">
                      <InfoIconTooltip style={{ right: "18px" }} />
                    </Tooltip>
                  )}
                  <InputLabel id="demo-simple-select-label">
                    {field.label}
                  </InputLabel>
                  <Select
                    // required={field.is_required == 1 ? true : false}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    value={
                      state
                        ? state
                        : field?.name == "Lead_status"
                        ? "Untouched"
                        : formData.find((item) => item.id == field?.id)?.value
                    }
                    label={field.label}
                    onChange={(e) => {
                      setState(e.target.value);
                      setFormData(e.target.value, field.id);
                    }}
                    IconComponent={KeyboardArrowDownOutlinedIcon}
                  >
                    {field.option_list?.map((list, index) => (
                      <MenuItem value={list} key={index}>
                        {list}
                      </MenuItem>
                    ))}
                  </Select>
                  {errorData?.id == field.id ? (
                    <FormHelperText>
                      Please select {errorData?.label}
                    </FormHelperText>
                  ) : null}
                </CustomFormFieldContainer>
              )
            ) : field.field_type == "timezone" ? (
              <CustomFormFieldContainer
                fullWidth
                className={
                  field.is_required == 1
                    ? "mandatoryField Customtextarea tabulerview"
                    : "Customtextarea tabulerview"
                }
              >
                {field.tooltip && (
                  <Tooltip title={field.tooltip} placement="top">
                    <InfoIconTooltip />
                  </Tooltip>
                )}
                <CommonTimeZone
                  defaultOwner={""}
                  size="small"
                  updateValue={(newValue) => {
                    setFormData(newValue, field.id);
                  }}
                  label={field.label}
                  helperText={
                    errorData?.id == field.id
                      ? `Please select ${errorData?.label}`
                      : null
                  }
                  error={errorData?.id == field.id ? true : false}
                />
              </CustomFormFieldContainer>
            ) : field.field_type == "textarea" ? (
              <CustomFormFieldContainer
                fullWidth
                className={
                  field.is_required == 1
                    ? "mandatoryField Customtextarea tabulerview"
                    : "Customtextarea tabulerview"
                }
              >
                {field.tooltip && (
                  <Tooltip title={field.tooltip} placement="top">
                    <InfoIconTooltip />
                  </Tooltip>
                )}
                <TextField
                  id="outlined-textarea"
                  ref={clearstate}
                  label={field.placeholder ? field.placeholder : field.label}
                  size="small"
                  placeholder={
                    field.placeholder ? field.placeholder : field.label
                  }
                  value={state}
                  multiline
                  onChange={(e) => {
                    setState(
                      e.target.value === " "
                        ? e.target.value.trim()
                        : e.target.value
                    );
                    setFormData(e.target.value, field.id);
                  }}
                  rows={4}
                  helperText={
                    errorData?.id == field.id
                      ? `Please enter ${errorData?.label}`
                      : null
                  }
                  error={errorData?.id == field.id ? true : false}
                />
              </CustomFormFieldContainer>
            ) : field.option_list?.length > 0 && field.label == "First Name" ? (
              <>
                {/* <BoxBothfield> */}
                {/* <CustomFormFieldContainer style={{ width:"max-content" }}>
                  <InputLabel id="demo-simple-select-label">
                    {field.label}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    value={prefix ? prefix : "Prefix"}
                    label={field.placeholder ? field.placeholder : field.label}
                    onChange={(e) => {
                      setPrefix(e.target.value);
                      localStorage.setItem(
                        "prefix",
                        e.target.value ? e.target.value : ""
                      );
                    }}
                    IconComponent={KeyboardArrowDownOutlinedIcon}
                    error={true}
                  >
                    <MenuItem value={"Prefix"} key={"indexPrefic"}>
                      Prefix
                    </MenuItem>
                    {field.option_list?.map((list, index) => (
                      <MenuItem value={list} key={index}>
                        {list}
                      </MenuItem>
                    ))}
                  </Select>
                </CustomFormFieldContainer> */}
                <CustomFormFieldContainer
                  fullWidth
                  style={
                    {
                      /*width: "75%"*/
                    }
                  }
                  className={field.is_required == 1 ? "mandatoryField" : ""}
                >
                  <TextField
                    fullWidth
                    ref={clearstate}
                    id="outlined-required"
                    size="small"
                    placeholder={field.label}
                    value={state}
                    label={field.name.replaceAll("_", " ")}
                    onChange={(e) => {
                      setState(e.target.value.trim());
                      setFormData(e.target.value, field.id);
                    }}
                    helperText={
                      errorData?.id == field.id
                        ? `Please enter ${errorData?.label}`
                        : null
                    }
                    error={errorData?.id == field.id ? true : false}
                  />
                </CustomFormFieldContainer>
                {/* </BoxBothfield> */}
              </>
            ) : field.field_type == "country" ? (
              <CustomFormFieldContainer
                fullWidth
                error={errorData?.id == field.id ? true : false}
                className={field.is_required == 1 ? "mandatoryField" : ""}
              >
                {field.tooltip && (
                  <Tooltip title={field.tooltip} placement="top">
                    <InfoIconTooltip />
                  </Tooltip>
                )}
                <CreateFormCountrySelect>
                  <CountrySelect
                    size="small"
                    country={state ? state : countryCode}
                    setCountry={(value) => {
                      const country = countries.find(
                        (item) => item?.code == value
                      )?.name;
                      setState(value);
                      dispatch(setCountryCode(value));
                      setFormData(country, field.id);
                    }}
                    type="crm"
                    label={"Country"}
                  />
                  {errorData?.id == field.id ? (
                    <FormHelperText>
                      Please select {errorData?.label}
                    </FormHelperText>
                  ) : null}
                </CreateFormCountrySelect>
              </CustomFormFieldContainer>
            ) : field.field_type == "phone" ? (
              <CustomFormFieldContainer
                fullWidth
                className={field.is_required == 1 ? "mandatoryField" : ""}
              >
                {field.tooltip && (
                  <Tooltip title={field.tooltip} placement="top">
                    <InfoIconTooltip />
                  </Tooltip>
                )}
                <StyleMobileField>
                  {/* <MobileInputCommon
                    mobileNumber={state}
                    module={"crm"}
                    label={field?.label}
                    size="small"
                    countryCode={""}
                    mobileCode={mobile_code}
                    handleChange={(e, mobile_code) => {
                      setMobileNumber(e, field.id, mobile_code);
                    }}
                    helperText={
                      errorData?.id == field.id
                        ? `${
                            errorData?.label !== undefined
                              ? `Please enter ${errorData?.label}`
                              : ` ${field?.label} already exists`
                          } `
                        : null
                    }
                    placeholder={"90 2327 7211"}
                  /> */}
                  <>
                    <MuiTelInput
                      fullWidth
                      size="small"
                      sx={{
                        "& .MuiButtonBase-root": {
                          paddingLeft: "0",
                          paddingRight: "0",
                          "& img": {
                            borderRadius: "2px",
                          },
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                          "& .MuiTouchRipple-root": {
                            display: "none",
                          },
                        },
                      }}
                      // fullWidth
                      forceCallingCode
                      autoComplete="off"
                      defaultCountry={
                        localStorage?.getItem("userData")
                          ? JSON.parse(localStorage?.getItem("userData"))
                              ?.mobile_country_code
                          : countryCode
                      }
                      helperText={
                        errorData?.id == field.id
                          ? `${
                              errorData?.label !== undefined
                                ? `Please enter ${errorData?.label}`
                                : ` ${field?.label} already exists`
                            } `
                          : errorText != ""
                          ? errorText
                          : null
                      }
                      placeholder={"90 2327 7211"}
                      value={state}
                      onChange={(value, info) => {
                        if (info.nationalNumber && matchIsValidTel(value)) {
                          setErrorText("");
                          setMobileNumber(value, field.id, countryCode);
                        } else {
                          setErrorText("Invalid Mobile!");
                          setMobileNumber(value, field.id, countryCode);
                        }
                      }}
                    />
                  </>
                </StyleMobileField>
              </CustomFormFieldContainer>
            ) : field.field_type == "date" ? (
              <CustomFormFieldContainer
                fullWidth
                className={field.is_required == 1 ? "mandatoryField" : ""}
              >
                {field.tooltip && (
                  <Tooltip title={field.tooltip} placement="top">
                    <InfoIconTooltip />
                  </Tooltip>
                )}
                <CustomDatePicker
                  label={field.name.replaceAll("_", " ")}
                  size="small"
                  handleChange={({ target }) => {
                    setState(moment(target.value));
                    setFormData(target.value, field.id);
                  }}
                  value={state}
                  errorText={
                    errorData?.id == field.id
                      ? `Please enter ${errorData?.name.replaceAll("_", " ")}`
                      : null
                  }
                  error={errorData?.id == field.id ? true : false}
                />
              </CustomFormFieldContainer>
            ) : field.field_type == "timestamp" ? (
              <CustomFormFieldContainer
                fullWidth
                size="small"
                className={field.is_required == 1 ? "mandatoryField" : ""}
              >
                {field.tooltip && (
                  <Tooltip title={field.tooltip} placement="top">
                    <InfoIconTooltip />
                  </Tooltip>
                )}
                <CustomDateTimePicker
                  label={field.name.replaceAll("_", " ")}
                  value={state}
                  size="small"
                  handleChange={({ target }) => {
                    setState(moment(target.value));
                    setFormData(target.value, field.id);
                  }}
                  errorText={
                    errorData?.id == field.id
                      ? `Please enter ${errorData?.name.replaceAll("_", " ")}`
                      : null
                  }
                  error={errorData?.id == field.id ? true : false}
                />
              </CustomFormFieldContainer>
            ) : field.field_type == "checkbox" ? (
              <CustomFormFieldContainer fullWidth>
                {field.tooltip && (
                  <Tooltip title={field.tooltip} placement="top">
                    <InfoIconTooltip />
                  </Tooltip>
                )}
                <CustomInputCheckboxRow>
                  <CustomInputCheckbox>
                    {" "}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked}
                          onClick={(e) => {
                            setIsChecked(!isChecked);
                            setFormData(!isChecked, field.id);
                          }}
                        />
                      }
                      label={field.name.replaceAll("_", " ")}
                      sx={SDCheckboxStyle}
                    />
                  </CustomInputCheckbox>
                </CustomInputCheckboxRow>
                {errorData?.id == field.id ? (
                  <FormHelperText>
                    Please check {errorData?.name.replaceAll("_", " ")}
                  </FormHelperText>
                ) : null}
              </CustomFormFieldContainer>
            ) : (
              //  : field.field_type == "file" ?(<>
              //  <FileUpload
              //                 fileType="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
              //                 name={field.label}
              //                 Crm={true}
              //                 files={Image}
              //                 single={false}
              //                 updateFiles={(e) => {
              //                   handleUpload(e,field.id)
              //                 }}
              //                 removedFile={(deletedID) =>
              //                   console.log(deletedID,"deletedID")
              //                   // formik.setFieldValue(
              //                   //   "deleted_images_ids",
              //                   //   deletedID
              //                   // )
              //                 }
              //               />
              // </>)
              <CustomFormFieldContainer
                fullWidth
                className={field.is_required == 1 ? "mandatoryField" : ""}
              >
                {field.tooltip && (
                  <Tooltip title={field.tooltip} placement="top">
                    <InfoIconTooltip />
                  </Tooltip>
                )}
                {field.label == "Language" ? (
                  <CommonAutoComplete
                    label={field.label}
                    setLanguage={setFormData}
                    id={field.id}
                  />
                ) : (
                  <TextField
                    className={
                      field.label == "Annual Revenue" && "annual-revenue"
                    }
                    required={field.is_required == 1 ? true : false}
                    ref={clearstate}
                    style={{ width: "100%" }}
                    size="small"
                    id="outlined-required"
                    // label={field.name == "Full_Name" ? "" : field.label}
                    label={
                      field.name == "Full_Name"
                        ? ""
                        : field.name == "mail"
                        ? "Email"
                        : field.name.replaceAll("_", " ")
                    }
                    disabled={field.readonly == 1 ? true : false}
                    value={
                      field.name == "Full_Name"
                        ? `${
                            formData.find((item) => item.label == "First Name")
                              ?.value
                          } ${
                            formData.find((item) => item.label == "Last Name")
                              ?.value
                          }`
                        : state
                      // ? state
                      // : formData.find((item) => item.id == field?.id)?.value
                    }
                    // placeholder={
                    //   field.placeholder ? field.placeholder : field.label
                    // }
                    placeholder={
                      field.placeholder
                        ? field.placeholder
                        : field.name == "mail"
                        ? "Email"
                        : field.name.replaceAll("_", " ")
                    }
                    onChange={(e) => {
                      if (
                        field.label == "Annual Revenue" ||
                        field.label == "No of Employee" ||
                        field.label == "Zip Code" ||
                        field.label == "Rating" ||
                        field.field_type == "float" ||
                        field.field_type == "integer"
                      ) {
                        const input = e.target.value;
                        const regex = /^[0-9\b]+$/;
                        if (input === "" || regex.test(input)) {
                          setState(input);
                          setFormData(input, field.id);
                        }
                      } else {
                        setState(e.target.value);
                        setFormData(e.target.value, field.id);
                      }
                    }}
                    helperText={
                      errorData?.id == field.id && errorData?.type == "email"
                        ? "Please enter valid email address."
                        : errorData?.id == field.id
                        ? `${
                            errorData?.label !== undefined
                              ? errorData?.type == "url"
                                ? "Please enter valid url"
                                : `Please enter ${errorData?.label}`
                              : ` ${field?.label} already exists`
                          } `
                        : errorData?.id == field.id &&
                          errorData?.type == "integer"
                        ? `Please enter numeric values`
                        : errorData?.id == field.id &&
                          errorData?.type == "float"
                        ? `Please enter numeric values`
                        : null
                    }
                    error={errorData?.id == field.id ? true : false}
                    InputProps={{
                      autoComplete: "off",
                      startAdornment: (
                        <>
                          {field.label == "Annual Revenue" && (
                            <InputAdornment position="end">  
                              <div className="enadormentcolor">
                                <AttachMoneyOutlinedIcon
                                  sx={{ color: "#d7282f" }}
                                />
                              </div>
                            </InputAdornment>
                          )}
                        </>
                      ),
                    }}
                  />
                )}
              </CustomFormFieldContainer>
            )}
          </Grid>
        )
      )}
    </>
  );
};

export default CustomInputs;
