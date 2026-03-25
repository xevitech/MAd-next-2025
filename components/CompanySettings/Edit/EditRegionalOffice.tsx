import React, { useContext, useEffect, useRef, useState } from "react";
import companydetail from "../CompanyDetail/companydetail.module.css";
import {
  ContentContainer,
  FieldLabelContainer,
  FieldValueContainer,
  LeftContentContainer,
  FieldContainer,
  RightContentContainer,
  ContentHeaderContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import {
  Divider,
  TextField,
  Grid,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import CountrySelect from "@/components/common/countrydropdown/Index";
import {
  apiClient,
  limitOfficeNameText,
  limitPostalCodeText,
  limitstreetAddressText,
  officeName,
  postalCodeText,
  streetAddressText,
} from "@/components/common/common";
import { MyAppContext } from "@/contextApi/appContext";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import dynamic from "next/dynamic";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  BlackCancelButton,
  ButtonContainer,
  CancelLink,
  FloatingEditIcon,
  RedSaveButton,
  SaveLink,
} from "../CompanyDetail/ContactPersonDetail/style";
import { CustomTextField } from "@/components/common/customTextField";
import StateSelect from "@/components/common/countrydropdown/states";
import CitiesStates from "@/components/common/CityStateDropdown";
const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);
const EditRegionalOffice = ({
  regionalOfficesList,
  getRegionalOfficeList,
  editValues,
  CancelEdit,
  editIndex,
  setExpand,
  addMore,
  check,
}) => {
  const { breakPoints } = useContext(MyAppContext);

  const default_Country = JSON.parse(
    localStorage.getItem("IP_Country")
  )?.countryCode;
  const [loading, setLoading] = useState(false);
  const [overFlowHidden, setOverFlowHidden] = useState(false);
  const emailInputRef = useRef(null);

  const validation = Yup.object().shape({
    officename: Yup.string().required("Please enter registered office name"),
    country: Yup.string().required("Please select country").nullable(),
    city: Yup.string().required("Please select city").nullable(),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter email"),
    address: Yup.string().required("Please enter street address"),
    mobile: Yup.string().required("Please enter mobile number").nullable(),
    regional_state: Yup.string()
      .required("Please select region/state/province")
      .nullable(),
    regional_postal_code: Yup.string()
      .trim()
      .max(10, "The content is too long. Please limit it to 10 characters")
      .required("Please enter postal code"),
    status: Yup.string().required("Please select status"),
  });
  let formik = useFormik({
    initialValues: {
      officename: editValues?.officename ?? "",
      country: editValues?.country?.toUpperCase() ?? default_Country,
      city: editValues?.city ?? "",
      address: editValues?.address ?? "",
      email: editValues?.email ?? "",
      code: editValues?.code ? `${editValues?.code}` : "",
      mobile: editValues?.mobile ?? "",
      mobile_country_code: editValues?.mobile_country_code ?? "",
      regional_state: editValues?.regional_state ?? "",
      regional_postal_code: editValues?.regional_postal_code ?? "",
      regional_lats: editValues?.regional_lats ?? "",
      regional_long: editValues?.regional_long ?? "",
      additional_address: editValues?.additional_address ?? "",
      status: editValues?.status ?? "Enable",
    },

    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      let dataToSend;
      if (!validate) {
        formik.setFieldError("mobile", "Please enter correct mobile no");
        return;
      }
      setLoading(true);
      if (editIndex >= 0) {
        let updatedValues = [...regionalOfficesList];
        updatedValues[editIndex] = values;
        dataToSend = { regional_offices: updatedValues };
      } else {
        dataToSend = { regional_offices: [...regionalOfficesList, values] };
      }
      let response = await apiClient("company_profile/updateProfile", "post", {
        body: dataToSend,
      });
      if (response.status === 200 || response.status === 201) {
        getRegionalOfficeList();
        if (addMore) setExpand(true);
      }
    },
  });

  useEffect(() => {
    if (addMore) {
    }
  }, [addMore]);

  const { values, handleChange, errors, setFieldError, handleSubmit } = formik;
  const [validate, setValidation] = useState<boolean>(false);
  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldError("mobile", "");
    formik.setFieldValue("code", mobile_code);
    formik.setFieldValue("mobile", phone);
    formik.setFieldValue("mobile_country_code", country_code);
    setValidation(isValid);
  };

  const handleDisabledScroll = (value) => {
    setOverFlowHidden(value)
  }

  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const streetAddRef = useRef(null);
  const postalCodeRef = useRef(null);

  const handleSave = () => {
    formik.handleSubmit();

    if(!formik.values.officename || formik.errors.officename) {
      nameRef?.current?.focus();
      return;
    }
    if(!formik.values.email || formik.errors.email) {
      emailInputRef?.current?.focus();
      return;
    }
    if(!formik.values.mobile || formik.errors.mobile) {
      mobileRef?.current?.focus();
      return;
    }
    if(!formik.values.country || formik.errors.country) {
      countryRef?.current?.focus();
      return;
    }
    if(!formik.values.regional_state || formik.errors.regional_state) {
      stateRef?.current?.focus();
      return;
    }
    if(!formik.values.city || formik.errors.city) {
      cityRef?.current?.focus();
      return;
    }
    if(!formik.values.address || formik.errors.address) {
      streetAddRef?.current?.focus();
      return;
    }
    if(!formik.values.regional_postal_code || formik.errors.regional_postal_code) {
      postalCodeRef?.current?.focus();
      return;
    }
  }
  return (
    <div className={`${addMore && companydetail.editregionalbox}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault(), handleSubmit();
        }}
      >
        <div className={check == 3 ? "reginal_office_add" : null}>
          <ContentContainer>
            <>
              <ContentHeaderContainer>
                {values.officename && (
                  <LeftContentContainer
                    value={{
                      padding: "8px 0px 8px 0",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", minHeight: "20px" }}>
                      {values?.officename}
                    </Typography>
                  </LeftContentContainer>
                )}

                <RightContentContainer
                  sx={{ position: "absolute", right: "0px", top: "16px" }}
                >
                  <FloatingEditIcon breakPoints={breakPoints}>
                    {regionalOfficesList.length >= 1 && !addMore && (
                      <>
                        <CancelLink onClick={CancelEdit}>
                          <CloseIcon />
                          Cancel
                        </CancelLink>

                        <SaveLink onClick={(e) => formik.handleSubmit()}>
                          <SaveOutlinedIcon />
                          {loading ? (
                            <ThreeDots
                              height="10"
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
                        </SaveLink>
                      </>
                    )}
                  </FloatingEditIcon>
                </RightContentContainer>
              </ContentHeaderContainer>
              {values.officename && (
                <Divider
                  variant="middle"
                  className={companydetail.reginaleditdivider}
                />
              )}
            </>
            <Box
              sx={{
                height: `${regionalOfficesList.length === 0
                    ? "235px"
                    : editIndex === -1 && regionalOfficesList.length <= 3
                      ? "476px"
                      : "auto"
                  }`,
                overflow: `${editIndex === -1 && !overFlowHidden ? "auto" : "hidden"}`,
                paddingBottom: `${regionalOfficesList.length == 0 ? "auto" : "12px"
                  }`,
              }}
            >
              <Grid container spacing={2} rowSpacing={-1}>
                <Grid item xs={12} sm={12} md={12}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{ height: "100%", display: "block !important" }}
                  >
                    <FieldLabelContainer
                      value={{}}
                      sx={{
                        margin: "8px 0px",
                        padding: "0 !important",
                        fontWeight: "medium",
                      }}
                    >
                       Name
                      <div style={{ color: "#d7282f" }}>*</div>
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      {" "}
                      <TextField
                        style={{ width: "100%" }}
                        variant="outlined"
                        size="small"
                        name="Registered Office Name"
                        type="Registered Office Name"
                        placeholder="Registered Office Name"
                        autoComplete="off"
                        onChange={(e: any) => {
                          if (e?.target?.value.length > officeName) {
                            setFieldError("officename", limitOfficeNameText);
                          } else {
                            setFieldError("officename", ""), e;
                            formik.setFieldValue(
                              "officename",
                              e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                            );
                          }
                        }}
                        value={values.officename}
                        helperText={`${errors?.officename ?? ""}`}
                        error={errors?.officename ? true : false}
                        inputRef={nameRef}
                      />
                    </FieldValueContainer>
                  </FieldContainer>
                </Grid>
                <Grid item xs={12} sm={12} mt={-1}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{ height: "100%", display: "block !important" }}
                  >
                    <FieldLabelContainer
                      value={{}}
                      sx={{ margin: "8px 0px", padding: "0 !important" }}
                    >
                      Email<div style={{ color: "#d7282f" }}>*</div>
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      <TextField
                        size="small"
                        InputLabelProps={{ style: { fontSize: 14, fontWeight: 700 } }}
                        error={formik.errors.email ? true : false}
                        helperText={`${errors?.email ?? ""}`}
                        fullWidth
                        placeholder="Enter email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        value={formik.values.email}
                        onChange={(e) => {
                          const { value, selectionStart } = e.target;
                          const removeSpace = value.replace(/\s/g, "");
                          formik.setFieldValue("email", removeSpace);
                          formik.setFieldTouched("email", true);
                          const cursorPosition = selectionStart - (value.length - removeSpace.length);
                          if (value.includes(" ")) {
                            formik.setFieldError("email", "Email address cannot contain spaces");
                            setTimeout(() => {
                              formik.setFieldError("email", "");
                            }, 2000);
                          } else {
                            formik.setFieldError("email", "");
                          }
                          if (emailInputRef.current) {
                            emailInputRef.current.value = removeSpace;
                            emailInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
                          }

                        }}
                        inputRef={emailInputRef}
                      />
                    </FieldValueContainer>
                  </FieldContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={6} mt={-1}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{ height: "100%", display: "block !important" }}
                  >
                    <FieldLabelContainer
                      placeholder="Mobile"
                      value={{}}
                      sx={{ margin: "8px 0px", padding: "0px !important" }}
                    >
                      Mobile<div style={{ color: "#d7282f" }}>*</div>
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      <MobileInputCommon
                       inputRef={mobileRef}
                        mobileNumber={formik.values.mobile}
                        mobileCode={formik.values.code}
                        countryCode={
                          formik.values.mobile_country_code
                            ? formik.values.mobile_country_code
                            : ""
                        }
                        handleChange={setMobileNumber}
                        helperText={formik.errors.mobile}
                        placeholder="Mobile Number"
                      />
                    </FieldValueContainer>
                  </FieldContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={6} mt={-1}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{ height: "100%", display: "block !important" }}
                  >
                    <FieldLabelContainer
                      value={{}}
                      sx={{ margin: "8px 0px", padding: "0 !important" }}
                    >
                      Country<div style={{ color: "#d7282f" }}>*</div>
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      <CountrySelect
                       inputRef={countryRef}
                        mode={"edit"}
                        country={values.country}
                        setCountry={(value) => {
                          formik.setFieldValue("country", value);
                          formik.setFieldValue("regional_state", "");
                          formik.setFieldValue("city", "");
                          formik.setFieldError("country", "");
                          // formik.setFieldValue("regional_lats", "");
                          // formik.setFieldValue("regional_long", "");
                        }}
                        disableScroll={handleDisabledScroll}
                        error={
                          formik.touched.country &&
                          Boolean(formik.errors.country)
                        }
                        errorText={
                          formik.touched.country && formik.errors.country
                        }
                        autoComplete="off"
                      />
                    </FieldValueContainer>
                  </FieldContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={6} mt={-1}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{ height: "100%", display: "block !important" }}
                  >
                    <FieldLabelContainer
                      value={{}}
                      sx={{ margin: "8px 0px", padding: "0 !important" }}
                    >
                      Region/State/Province
                      <div style={{ color: "#d7282f" }}>*</div>
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      <StateSelect
                       inputRef={stateRef}
                        mode={"edit"}
                        country={values.country}
                        value={values.regional_state}
                        disableScroll={handleDisabledScroll}
                        setStateData={(value) => {
                          formik.setFieldValue("regional_state", value);
                          formik.setFieldValue("city", null);
                          formik.setFieldError("regional_state", "");
                          // formik.setFieldValue("regional_lats", "");
                          // formik.setFieldValue("regional_long", "");
                        }}
                        error={
                          formik.touched.regional_state &&
                          Boolean(formik.errors.regional_state)
                        }
                        errorText={
                          formik.touched.regional_state &&
                          formik.errors.regional_state
                        }
                        autoComplete="off"
                      />
                    </FieldValueContainer>
                  </FieldContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={6} mt={-1}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{ height: "100%", display: "block !important" }}
                  >
                    <FieldLabelContainer
                      value={{}}
                      sx={{ margin: "8px 0px", padding: "0 !important" }}
                    >
                      City<div style={{ color: "#d7282f" }}>*</div>
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      <CitiesStates
                       inputRef={cityRef}
                        country={values.country}
                        city={formik.values.city}
                        state={formik.values.regional_state}
                        disableScroll={handleDisabledScroll}
                        setCity={(value) => {
                          formik.setFieldValue("city", value);
                          formik.setFieldError("city", "");
                          // if (!value) {
                          //   formik.setFieldValue("regional_lats", "");
                          //   formik.setFieldValue("regional_long", "");
                          // }
                        }}
                        errors={
                          formik.touched.city && Boolean(formik.errors.city)
                        }
                        errorText={formik.touched.city && formik.errors.city}
                        setLocation={(value) => {
                          // formik.setFieldValue(
                          //   "regional_lats",
                          //   value?.latitude
                          // );
                          // formik.setFieldValue(
                          //   "regional_long",
                          //   value?.longitude
                          // );
                        }}
                      />
                    </FieldValueContainer>
                  </FieldContainer>
                </Grid>
                <Grid item xs={12} mt={-1}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{ height: "100%", display: "block !important" }}
                  >
                    <FieldLabelContainer
                      value={{}}
                      sx={{ margin: "8px 0px", padding: "0 !important" }}
                    >
                      Street Address<div style={{ color: "#d7282f" }}>*</div>
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      {" "}
                      <TextField
                        style={{ width: "100%" }}
                        variant="outlined"
                        size="small"
                        name="address"
                        type="text"
                        placeholder="Enter street address"
                        autoComplete="new-password"
                        onChange={(e: any) => {
                          if (e?.target?.value.length > streetAddressText) {
                            formik.setFieldError(
                              "address",
                              limitstreetAddressText
                            );
                          } else {
                            setFieldError("address", ""), handleChange(e);
                          }
                        }}
                        value={values.address}
                        helperText={`${errors?.address ?? ""}`}
                        error={errors?.address ? true : false}
                        inputRef={streetAddRef}
                      />
                    </FieldValueContainer>
                  </FieldContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={12} mt={-1}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{ height: "100%", display: "block !important" }}
                  >
                    <FieldLabelContainer
                      value={{}}
                      sx={{ margin: "8px 0px", padding: "0 !important" }}
                    >
                      Postal Code<div style={{ color: "#d7282f" }}>*</div>
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      <CustomTextField
                       inputRef={postalCodeRef}
                        placeholder="Enter Postal Code"
                        value={values.regional_postal_code}
                        handleChange={(e) => {
                          if (e?.target?.value.length > postalCodeText) {
                            formik.setFieldError(
                              "regional_postal_code",
                              limitPostalCodeText
                            );
                            return;
                          } else {
                            const inputValue = e.target.value
                              .toUpperCase()
                              .slice(0, 10);
                            formik.setFieldValue(
                              "regional_postal_code",
                              inputValue
                            );
                            formik.setFieldError("regional_postal_code", "");
                          }
                        }}
                        error={
                          formik.errors.regional_postal_code ? true : false
                        }
                        errorText={formik.errors.regional_postal_code}
                        helperText={
                          formik.touched.regional_postal_code &&
                          formik.errors.regional_postal_code
                        }
                      />
                    </FieldValueContainer>
                  </FieldContainer>
                </Grid>
                <Grid item xs={12} mt={-1}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{ height: "100%", display: "block !important" }}
                  >
                    <FieldLabelContainer
                      value={{}}
                      sx={{ margin: "8px 0px", padding: "0 !important" }}
                    >
                      Additional Address Details
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      <CustomTextField
                        name="Enter additional address details"
                        value={formik.values.additional_address}
                        handleChange={(e) => {
                          const newValue = e.target.value;

                          if (
                            !newValue.startsWith(" ") ||
                            newValue.trim().length > 0
                          ) {
                            formik.setFieldValue(
                              "additional_address",
                              newValue
                            );
                            formik.setFieldError("additional_address", "");
                          }
                        }}
                        placeholder={"Enter additional address details"}
                        error={formik.errors.additional_address ? true : false}
                        errorText={formik.errors.additional_address}
                      />
                    </FieldValueContainer>
                  </FieldContainer>
                </Grid>

                <Grid item xs={12} sm={12} md={6} mt={-1}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{
                      height: "100%",
                      display: "block !important",
                    }}
                  >
                    <FieldLabelContainer
                      value={{}}
                      sx={{ margin: "8px 0px", padding: "0 !important" }}
                    >
                      Geolocation Coordinates
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ width: "100%" }}>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            fullWidth
                            placeholder="Latitude"
                            name="geo_location"
                            autoComplete="off"
                            value={values.regional_lats}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                            const validNumber = /^[+-]?\d*\.?\d*$/; 
                            const sanitizedValue = inputValue.replace(/[^0-9.+-]/g, "");
                            if (validNumber.test(sanitizedValue) || sanitizedValue === "") {
                            formik.setFieldValue("regional_lats", sanitizedValue);
                          }
                            }}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.regional_lats &&
                              Boolean(formik.errors.regional_lats)
                            }
                          />
                        </Box>
                        <Box sx={{ width: "100%" }}>
                          <TextField
                             id="outlined-basic"
                             variant="outlined"
                             size="small"
                             fullWidth
                            placeholder="Longitude"
                            autoComplete="off"
                            name="geo_location"
                            value={values.regional_long}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                            const validNumber = /^[+-]?\d*\.?\d*$/; 
                            const sanitizedValue = inputValue.replace(/[^0-9.+-]/g, "");
                            if (validNumber.test(sanitizedValue) || sanitizedValue === "") {
                            formik.setFieldValue("regional_long", sanitizedValue);
                          }
                            }}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.regional_long &&
                              Boolean(formik.errors.regional_long)
                            }
                          />
                        </Box>
                      </Box>
                    </FieldValueContainer>
                  </FieldContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={6} mt={-1}>
                  <FieldContainer
                    className={companydetail.edit_field}
                    sx={{ height: "100%", display: "block !important" }}
                  >
                    <FieldLabelContainer
                      value={{}}
                      sx={{ margin: "8px 0px", padding: "0 !important" }}
                    >
                      Status<div style={{ color: "#d7282f" }}>*</div>
                    </FieldLabelContainer>
                    <FieldValueContainer
                      value={{}}
                      className={companydetail.fieldvalue}
                    >
                      <FormControl fullWidth>
                        <Select
                          labelId="status-select-label"
                          id="status-select"
                          size="small"
                          name="status"
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          error={errors?.status ? true : false}
                        >
                          <MenuItem value="Enable">Enable</MenuItem>
                          <MenuItem value="Disable">Disable</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldValueContainer>
                  </FieldContainer>

                  {formik.errors.status && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <WarningAmberOutlinedIcon
                        style={{
                          fontSize: "9px",
                          margin: "0px 0px 0 0",
                          color: "#d7282f",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "10px",
                          color: "#d7282f !important",
                        }}
                      >
                        {"Please enter status"}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
            {addMore && (
              <>
                <ButtonContainer
                  style={{ margin: "0", padding: "7px 0 16px 0px" }}
                >
                  <BlackCancelButton onClick={CancelEdit}>
                    Cancel
                  </BlackCancelButton>
                  <RedSaveButton type="submit" onClick={handleSave}>
                    {loading ? (
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
                  </RedSaveButton>
                </ButtonContainer>
              </>
            )}
          </ContentContainer>
        </div>
      </form>
    </div>
  );
};
export default EditRegionalOffice;
