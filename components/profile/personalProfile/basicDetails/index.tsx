import React, { useState, useEffect, useRef } from "react";
import {
  OuterContainer,
  ContentInnerContainer,
  ContainerHeader,
  ContainerHeaderText,
  ContainerHeaderDescription,
  FloatingEditIcon,
  PencilIcon,
  LabelContainer,
  CancelLink,
  SaveLink,
} from "@/components/profile/common";
import Image from "next/image";
import { Box, Button, Grid, Skeleton, TextField, Typography } from "@mui/material";
import useAppContext from "@/hooks/useAppContext";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { returnCountryFromCode } from "@/utils/commonFunctions/other";
import { CustomTextField } from "@/components/common/customTextField";
import { RedBtnDummy } from "./styles";
import CustomToggleSelect from "@/components/common/toggleBtnGroupSingleSelection";
import CountrySelect from "@/components/common/countrydropdown/Index";
import { Flag } from "@/components/common/countryFlag";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import {
  profileData,
  setBasicDetail,
  setUserBasicInfo,
} from "@/hooks/appReducers";
import { useFormik } from "formik";
import * as Yup from "yup";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  apiClient,
  fullNameText,
  limitfullNameText,
  limitPostalCodeText,
  limitstreetAddressText,
  postalCodeText,
} from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import StateSelect from "@/components/common/countrydropdown/states";
import CitiesStates from "@/components/common/CityStateDropdown";
import { toast } from "react-toastify";
const AccountTypeOptions = ["seller", "buyer"];
const GenderOptions = ["Male", "Female"];

export const BasicDetails = ({ editBasicDetails, setEditBasicDetail }) => {
  const { breakPoints } = useAppContext();
  const { profileInfos, user_info, default_role } = useSelector(
    (state: any) => state.userData
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(
      setUserBasicInfo({
        ...user_info,
        name: profileInfos.basicDetails.fullName,
        type: profileInfos.basicDetails.accountType,
        avatar_original: profileInfos.basicDetails.avatar_original,
      })
    );
  }, [profileInfos.basicDetails]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setLoader(false);
    }, 2000);
  }, []);

  const [loader, setLoader] = useState<boolean>(false);
  let userData: any = localStorage.userData
    ? JSON.parse(localStorage.userData)
    : {};

  const validation = Yup.object().shape({
    fullName: Yup.string()
      .trim()
      .required("Please enter Full name")
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        "full name can only contain alphanumeric characters"
      ),
    gender: Yup.string().required("Please select gender"),
    countryId: Yup.string().required("Please select country").nullable(),
    city: Yup.string().required("Please select city").nullable().trim(),
    postalCode: Yup.string()
      .min(5, "Postal code must be between 5 and 10 characters long.")
      .max(10, "Postal code must be between 5 and 10 characters long.")
      .trim()
      .required("Please enter postal code")
      .trim(),
    accountType: Yup.string().required("Please select user type"),
    street_address: Yup.string()
      .trim()
      .required("Please enter street address")
      .trim(),
    state: Yup.string()
      .required("Please select region/state/province")
      .nullable()
      .trim(),
  });

  const { basicDetails } = profileInfos;
  const formik: any = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnBlur: true,
    validateOnChange: false,
    initialValues: {
      fullName: basicDetails?.fullName ?? "",
      gender: basicDetails?.gender ?? "",
      countryId: basicDetails?.countryId ?? "",
      postalCode: basicDetails?.postalCode ?? "",
      accountType: basicDetails?.accountType ?? "",
      city: basicDetails?.city ?? "",
      address: basicDetails?.address ?? "",
      state: basicDetails?.state ?? "",
      longs: basicDetails?.longs ?? "",
      lats: basicDetails?.lats ?? "",
      editMode: editBasicDetails ? editBasicDetails : false,
      street_address: basicDetails?.street_address ?? "",
    },
    onSubmit: async (values) => {
      const {
        fullName,
        gender,
        countryId,
        postalCode,
        accountType,
        city,
        address,
        state,
        longs,
        lats,
        street_address,
      } = values;
      let payload = {
        name: fullName,
        city,
        user_type: accountType,
        gender: gender,
        postal_code: postalCode,
        country: countryId,
        address: address,
        state: state,
        longs: longs,
        lats: lats,
        street_address: street_address,
      };
      setLoader(true);
      setLoading(true);
      const response = await apiClient("profile/updateProfile", "patch", {
        body: payload,
      });

      if (response.status === true || response.status == 200) {
        setLoader(false);
        setLoading(false);
        dispatch(profileData());
        toast.success("Basic Details saved successfully.");
      }

      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, ...payload })
      );
      dispatch(setBasicDetail(values));
      dispatch(setUserBasicInfo({ ...user_info, ...payload }));
      formik.setFieldValue("editMode", false);
      setEditBasicDetail(false);
      setLoader(false);
      setLoading(false);
    },
  });
  const {
    fullName,
    gender,
    countryId,
    postalCode,
    accountType,
    city,
    editMode,
  } = formik.values;
  const handlePostalCode = (e) => {
    let newValue = e.target.value;
    newValue = newValue
      .replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;:'",.\/<>?]/g, "")
      .toUpperCase();
    if (newValue.length < postalCodeText) {
      formik.setFieldValue("postalCode", newValue);
      formik.setFieldError("postalCode", "");
    } else {
      formik.setFieldError("postalCode", limitPostalCodeText);
    }
  };

  const CancelEditing = () => {
    if (editMode) {
      formik.setFieldValue("editMode", false);
      setEditBasicDetail(false);
    } else {
      formik.setFieldValue("fullName", basicDetails?.fullName ?? "");
      formik.setFieldValue("gender", basicDetails?.gender ?? "");
      formik.setFieldValue("countryId", basicDetails?.countryId ?? "");
      formik.setFieldValue("postalCode", basicDetails?.postalCode ?? "");
      formik.setFieldValue("accountType", basicDetails?.accountType ?? "");
      formik.setFieldValue("city", basicDetails?.city ?? "");
      formik.setFieldValue("address", basicDetails?.address ?? "");
      formik.setFieldValue("state", basicDetails?.state ?? "");
      formik.setFieldValue("editMode", false);
      setEditBasicDetail(false);
    }
  };
  const inputRef = useRef(null);
  const scrollAndFocus = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current.focus();
    }
  };
  const nameInputRef = useRef(null);
  const genderInputRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const streetAddRef = useRef(null);
  const postalCodeRef = useRef(null);

  const handleSave = () => {
    formik.handleSubmit();

    if (!formik.values.fullName || formik.errors.fullName) {
      scrollAndFocus(nameInputRef);
      return;
    }
    if (!formik.values.gender || formik.errors.gender) {
      scrollAndFocus(genderInputRef);
      return;
    }
    if (!formik.values.countryId || formik.errors.countryId) {
      scrollAndFocus(countryRef);
      return;
    }
    if (!formik.values.state || formik.errors.state) {
      scrollAndFocus(stateRef);
      return;
    }
    if (!formik.values.city || formik.errors.city) {
      scrollAndFocus(cityRef);
      return;
    }
    if (!formik.values.street_address || formik.errors.street_address) {
      scrollAndFocus(streetAddRef);
      return;
    }
    if (!formik.values.postalCode || formik.errors.postalCode) {
      scrollAndFocus(postalCodeRef);
      return;
    }
  };
  
  return (
    <ContentInnerContainer breakPoints={breakPoints} sx={{ height: "100%" }}>
      <ContainerHeader>
        <ContainerHeaderText breakPoints={breakPoints}>
          Basic Details
        </ContainerHeaderText>
        <ContainerHeaderDescription breakPoints={breakPoints}>
          Manage Information Related to your Personal Details
        </ContainerHeaderDescription>
        {!editMode ? (
          <FloatingEditIcon
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              formik.setFieldValue("editMode", true);
              setEditBasicDetail(true);
            }}
          >
            <PencilIcon>
              <Image
                src={"/assets/EditPencil.svg"}
                layout="fill"
                alt="editImage"
              />
            </PencilIcon>{" "}
            {profileInfos.basicDetails.fullName ? "Edit" : "Add"}
          </FloatingEditIcon>
        ) : (
          <FloatingEditIcon breakPoints={breakPoints}>
            <CancelLink onClick={CancelEditing}>
              <CloseIcon />
              <Box
                sx={{
                  "@media screen and (max-width:320px)": {
                    display: "none",
                  },
                }}
              >
                Cancel
              </Box>
            </CancelLink>
            <SaveLink onClick={handleSave}>
              <Button sx={{ padding: "0px", minWidth: "auto" }}>
                {!loader ? (
                  <SaveOutlinedIcon sx={{ marginLeft: "10px" }} />
                ) : (
                  ""
                )}
                {loader ? (
                  <ThreeDots
                    height="30"
                    width="60"
                    radius="5"
                    color="#d32f2f"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  <Box
                    sx={{
                      "@media screen and (max-width:320px)": {
                        display: "none",
                      },
                    }}
                  >
                    Save
                  </Box>
                )}
              </Button>
            </SaveLink>
          </FloatingEditIcon>
        )}
      </ContainerHeader>

      <OuterContainer>
        <Grid container>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                Full Name<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>
                Full Name
              </LabelContainer>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ fontSize: "14px" }}
          >
            {loading ? (
              <Skeleton width="40%" />
            ) : !editMode ? (
              <p>{capitalizeFirstLetter(fullName)}</p>
            ) : (
              <Box>
                <CustomTextField
                  value={formik.values.fullName}
                  handleChange={(e) => {
                    const input = e.target;
                    const newValue = input.value;
                    const filteredValue = newValue.replace(/[^a-zA-Z\s]/g, "");
                    if (filteredValue.length > 100) {
                      formik.setFieldError(
                        "fullName",
                        "Full name content is too long. Please limit it to 100 characters."
                      );
                      return;
                    }

                    const cursorPosition = input.selectionStart;
                    const trimmedValue = filteredValue.trimStart();
                    if (trimmedValue !== filteredValue) {
                      formik.setFieldValue("fullName", trimmedValue);
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition -
                          (newValue.length - trimmedValue.length);
                      });
                    } else {
                      formik.setFieldValue("fullName", filteredValue);
                      formik.setFieldError("fullName", "");
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition;
                      });
                    }
                  }}
                  placeholder="Enter your full name"
                  error={!!formik.errors.fullName}
                  errorText={formik.errors.fullName}
                  inputRef={nameInputRef}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                Gender<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>Gender</LabelContainer>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ fontSize: "14px" }}
          >
            {loading ? (
              <Skeleton variant="rounded" width="130px" height={"28px"} />
            ) : !editMode ? (
              gender ? (
                <RedBtnDummy breakPoints={breakPoints}>
                  {capitalizeFirstLetter(gender)}
                </RedBtnDummy>
              ) : (
                "N/A"
              )
            ) : (
              <Box>
                <CustomToggleSelect
                  name="gender"
                  // value={gender}
                  value={formik.values.gender}
                  handleChange={(e) => {
                    formik.setFieldValue("gender", e);
                    formik.setFieldError("gender", "");
                  }}
                  options={GenderOptions}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  errorText={formik.touched.gender && formik.errors.gender}
                  inputRef={genderInputRef}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                User Type<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>
                User Type
              </LabelContainer>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ fontSize: "14px" }}
          >
            {loading ? (
              <Skeleton variant="rounded" width="130px" height={"28px"} />
            ) : !editMode ? (
              accountType && (
                <RedBtnDummy breakPoints={breakPoints}>
                  {capitalizeFirstLetter(accountType)}
                </RedBtnDummy>
              )
            ) : (
              <Box>
                {/* <CustomToggleSelect
                  name="accountType"
                  value={accountType}
                  handleChange={(e) => formik.setFieldValue("accountType", e)}
                  options={
                    default_role == "seller" ? AccountTypeOptions : ["buyer"]
                  }
                  error={
                    formik.touched.accountType &&
                    Boolean(formik.errors.accountType)
                  }
                  errorText={
                    formik.touched.accountType && formik.errors.accountType
                  }
                /> */}
                 <Box>
                <CustomToggleSelect
                  name="accountType"
                  // value={gender}
                  value={formik.values.accountType}
                  handleChange={(e) => {
                    formik.setFieldValue("accountType", e);
                    formik.setFieldError("accountType", "");
                  }}
                  options={AccountTypeOptions}
                  error={formik.touched.accountType && Boolean(formik.errors.accountType)}
                  errorText={formik.touched.accountType && formik.errors.accountType}
                  // inputRef={accountType}
                />
              </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                Country<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>Country</LabelContainer>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ fontSize: "14px" }}
          >
            {loading ? (
              <Skeleton animation="wave" variant="text" width={"20%"} />
            ) : !editMode ? (
              <p>
                {countryId ? <Flag countryCode={countryId} /> : "N/A"}
                {returnCountryFromCode(countryId)}
              </p>
            ) : (
              <Box>
                <CountrySelect
                  mode={editMode ? "edit" : "view"}
                  country={formik.values.countryId}
                  setCountry={(value) => {
                    formik.setFieldValue("countryId", value);
                    formik.setFieldValue("state", null);
                    formik.setFieldValue("city", null);
                    // formik.setFieldValue("lats", "");
                    // formik.setFieldValue("longs", "");
                    formik.setFieldError("countryId", "");
                    // formik.setFieldError("lats", "");
                    // formik.setFieldError("longs", "");
                  }}
                  disableClearable={formik.values.countryId ? false : true}
                  error={
                    formik.touched.countryId && Boolean(formik.errors.countryId)
                  }
                  errorText={
                    formik.touched.countryId && formik.errors.countryId
                  }
                  autoComplete="off"
                  inputRef={countryRef}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer
                breakPoints={breakPoints}
                sx={{ wordBreak: "break-word" }}
              >
                Region/State/Province<span style={{ color: "#d7282f" }}>*</span>
              </LabelContainer>
            ) : (
              <LabelContainer
                breakPoints={breakPoints}
                sx={{ wordBreak: "break-word" }}
              >
                Region/State/Province
              </LabelContainer>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ fontSize: "14px" }}
          >
            {" "}
            {loading ? (
              <Skeleton animation="wave" variant="text" width={"17%"} />
            ) : !editMode ? (
              <p>{formik.values.state ? formik.values.state : "N/A"}</p>
            ) : (
              <Box>
                <StateSelect
                  mode={editMode ? "edit" : "view"}
                  country={formik.values.countryId}
                  value={formik.values.state}
                  setStateData={(value) => {
                    formik.setFieldValue("state", value);
                    formik.setFieldValue("city", null);
                    formik.setFieldError("state", "");
                  }}
                  disableClearable={formik.values.state ? false : true}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  errorText={formik.touched.state && formik.errors.state}
                  autoComplete="off"
                  inputRef={stateRef}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                City<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>City</LabelContainer>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ fontSize: "14px" }}
          >
            {" "}
            {loading ? (
              <Skeleton animation="wave" variant="text" width={"14%"} />
            ) : !editMode ? (
              <p>{city ? city : "N/A"}</p>
            ) : (
              <Box>
                <CitiesStates
                  country={countryId}
                  city={formik.values.city}
                  state={formik.values.state}
                  setCity={(value) => {
                    formik.setFieldValue("city", value);
                    formik.setFieldError("city", "");
                  }}
                  disableClearable={formik.values.city ? false : true}
                  errors={formik.errors.city ? true : false}
                  errorText={formik.errors.city ? formik.errors.city : ""}
                  setLocation={(value) => {
                    // formik.setFieldValue("lats", value?.latitude);
                    // formik.setFieldValue("longs", value?.longitude);
                  }}
                  inputRef={cityRef}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                Street Address<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>
                Street Address
              </LabelContainer>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ fontSize: "14px" }}
          >
            {loading ? (
              <Skeleton animation="wave" variant="text" width={"27%"} />
            ) : !editMode ? (
              <p>
                {formik.values.street_address
                  ? formik.values.street_address
                  : "N/A"}
              </p>
            ) : (
              <Box>
                <CustomTextField
                  value={formik.values.street_address}
                  handleChange={(e) => {
                    const input = e.target;
                    const newValue = input.value;
                    const cursorPosition = input.selectionStart;
                    if (newValue.length > 100) {
                      formik.setFieldError(
                        "street_address",
                        "Street address content is too long. Please limit it to 100 characters."
                      );
                      return;
                    }
                    const trimmedValue = newValue.trimStart();
                    if (trimmedValue !== newValue) {
                      formik.setFieldValue("street_address", trimmedValue);
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition -
                          (newValue.length - trimmedValue.length);
                      });
                    } else {
                      formik.setFieldValue("street_address", newValue);
                      formik.setFieldError("street_address", "");
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition;
                      });
                    }
                  }}
                  placeholder={"Enter street address"}
                  error={!!formik.errors.street_address}
                  errorText={formik.errors.street_address}
                  inputRef={streetAddRef}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                Postal Code<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>
                Postal Code
              </LabelContainer>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ fontSize: "14px" }}
          >
            {" "}
            {loading ? (
              <Skeleton animation="wave" variant="text" width={"16%"} />
            ) : !editMode ? (
              <p>{postalCode ? postalCode : "N/A"}</p>
            ) : (
              <CustomTextField
                name="postalCode"
                value={formik.values.postalCode}
                handleChange={(e) => {
                  const input = e.target;
                  let newValue = input.value;
                  const cursorPosition = input.selectionStart;
                  const leadingSpaceRemoved = newValue.replace(/^\s+/g, "");
                  const sanitizedValue = leadingSpaceRemoved
                    .replace(
                      /[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;:'",.\/<>?]/g,
                      ""
                    )
                    .toUpperCase();

                  if (sanitizedValue.length > 10) {
                    formik.setFieldError(
                      "postalCode",
                      "Postal code content is too long. Please limit it to 10 characters"
                    );
                    return;
                  }
                  const cursorPositionAfterTrim =
                    cursorPosition - (newValue.length - sanitizedValue.length);
                  formik.setFieldValue("postalCode", sanitizedValue);
                  formik.setFieldError("postalCode", "");
                  requestAnimationFrame(() => {
                    input.setSelectionRange(
                      cursorPositionAfterTrim,
                      cursorPositionAfterTrim
                    );
                  });
                }}
                placeholder={"Enter postal code"}
                error={formik.errors.postalCode ? true : false}
                errorText={formik.errors.postalCode}
                inputRef={postalCodeRef}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                Additional Address Details
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>
                {" "}
                Additional Address Details
              </LabelContainer>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ fontSize: "14px" }}
          >
            {loading ? (
              <Skeleton animation="wave" variant="text" width={"25%"} />
            ) : !editMode ? (
              <p>{formik.values.address ? formik.values.address : "N/A"}</p>
            ) : (
              <Box>
                <CustomTextField
                  name="Enter additional address details"
                  value={formik.values.address}
                  handleChange={(e) => {
                    const newValue = e.target.value;

                    if (
                      !newValue.startsWith(" ") ||
                      newValue.trim().length > 0
                    ) {
                      formik.setFieldValue("address", newValue);
                      formik.setFieldError("address", "");
                    }
                  }}
                  placeholder={"Enter additional address details"}
                  error={formik.errors.address ? true : false}
                  errorText={formik.errors.address}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                Geolocation Coordinates
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>
                Geolocation Coordinates
              </LabelContainer>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ fontSize: "14px" }}
          >
            {" "}
            {loading ? (
              <Skeleton animation="wave" variant="text" width={"27%"} />
            ) : !editMode ? (
              <p>
                {" "}
                {formik.values.lats !== 0 && formik.values.lats !== 0 && (
                  <>
                    {formik.values.longs ? formik.values.longs : "N/A"},
                    {formik.values.lats ? formik.values.lats : "N/A"}
                  </>
                )}
              </p>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder="Latitude"
                      autoComplete="off"
                      value={formik.values.lats}
                      name={"geo_location"}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                      const validNumber = /^[+-]?\d*\.?\d*$/; 
                      const sanitizedValue = inputValue.replace(/[^0-9.+-]/g, "");
                      if (validNumber.test(sanitizedValue) || sanitizedValue === "") {
                      formik.setFieldValue("lats", sanitizedValue);
                    }
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.errors.lats ? true : false}
                      helperText={formik.errors.lats ? formik.errors.lats : ""}
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
                      name={"geo_location"}
                      value={formik.values.longs}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                      const validNumber = /^[+-]?\d*\.?\d*$/; 
                      const sanitizedValue = inputValue.replace(/[^0-9.+-]/g, "");
                      if (validNumber.test(sanitizedValue) || sanitizedValue === "") {
                      formik.setFieldValue("longs", sanitizedValue);
                    }
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.errors.longs ? true : false}
                      helperText={formik.errors.longs ? formik.errors.longs : ""}
                    />
                  </Box>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </OuterContainer>
    </ContentInnerContainer>
  );
};
