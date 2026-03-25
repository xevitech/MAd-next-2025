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
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import useAppContext from "@/hooks/useAppContext";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { CustomTextField } from "@/components/common/customTextField";
import { RedBtnDummy } from "./styles";
import CustomToggleSelect from "@/components/common/toggleBtnGroupSingleSelection";
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
import { apiClient } from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
const AccountTypeOptions = ["seller", "buyer"];
const GenderOptions = ["male", "female"];
export const BasicDetailsSubUser = ({
  editBasicDetails,
  setEditBasicDetail,
}) => {
  const { breakPoints } = useAppContext();
  const { profileInfos, user_info, default_role,userprofileImage } = useSelector(
    (state: any) => state.userData
  );

  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
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

  const list = JSON.parse(localStorage.getItem("listData"));
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
    postalCode: Yup.string()
      .min(5, "Postal code must be between 5 and 10 characters long.")
      .max(10, "Postal code must be between 5 and 10 characters long.")
      .trim()
      .required("Please enter postal code")
      .trim(),
    address: Yup.string().trim().required("Please enter address").trim(),
  });

  const { basicDetails } = profileInfos;
  const formik: any = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnBlur: true,
    validateOnChange: false,
    initialValues: {
      fullName: basicDetails?.fullName ?? "",
      email: list?.user?.email ?? "",
      phone: list?.user?.phone ?? "",
      gender: basicDetails?.gender ?? "",
      postalCode: basicDetails?.postalCode ?? "",
      accountType: basicDetails?.accountType ?? "",
      address: basicDetails?.address ?? "",
      department: list?.user?.job_role ?? "",
      job_title: list?.user?.job_function ?? "",
      editMode: editBasicDetails ? editBasicDetails : false,
    },
    onSubmit: async (values) => {
      const { fullName, gender, postalCode, accountType, address, department } =
        values;
      let payload = {
        name: fullName,
        city,
        user_type: accountType,
        gender: gender,
        postal_code: postalCode,
        country: countryId,
        address: address,
        department: department,
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

  const CancelEditing = () => {
    if (editMode) {
      formik.setFieldValue("editMode", false);
      setEditBasicDetail(false);
    } else {
      formik.setFieldValue("fullName", basicDetails?.fullName ?? "");
      formik.setFieldValue("gender", basicDetails?.gender ?? "");
      formik.setFieldValue("postalCode", basicDetails?.postalCode ?? "");
      formik.setFieldValue("accountType", basicDetails?.accountType ?? "");
      formik.setFieldValue("email", basicDetails?.email ?? "");
      formik.setFieldValue("phone", basicDetails?.phone ?? "");
      formik.setFieldValue("department", basicDetails?.department ?? "");
      formik.setFieldValue("job_title", basicDetails?.job_title ?? "");
      formik.setFieldValue("address", basicDetails?.address ?? "");
      formik.setFieldValue("editMode", false);
      setEditBasicDetail(false);
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
        {permissions?.personal_profile?.edit == true && (
          <>
            {" "}
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
                <SaveLink onClick={formik.handleSubmit}>
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
          </>
        )}
      </ContainerHeader>

      <OuterContainer>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6}>
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
                    const cursorPosition = input.selectionStart;
                    if (newValue.length > 100) {
                      formik.setFieldError(
                        "fullName",
                        "Full name content is too long. Please limit it to 100 characters."
                      );
                      return;
                    }
                    const trimmedValue = newValue.trimStart();
                    if (trimmedValue !== newValue) {
                      formik.setFieldValue("fullName", trimmedValue);
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition -
                          (newValue.length - trimmedValue.length);
                      });
                    } else {
                      formik.setFieldValue("fullName", newValue);
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
                Email<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>Email</LabelContainer>
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
              <p>{capitalizeFirstLetter(formik?.values?.email)}</p>
            ) : (
              <Box>
                <CustomTextField
                  placeholder="Email"
                  autoComplete="off"
                  value={formik.values.email}
                  name={"geo_location"}
                  handleChange={(e) => {
                    const inputValue = e.target.value;
                    formik.setFieldValue("email", inputValue);
                  }}
                  error={formik.errors.email ? true : false}
                  errorText={formik.errors.email ? formik.errors.email : ""}
                  disabled={true}
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
                Phone No.<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>
                Phone No.
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
              <p>{capitalizeFirstLetter(formik?.values?.phone)}</p>
            ) : (
              <Box>
                <CustomTextField
                  placeholder="phone"
                  autoComplete="off"
                  value={formik?.values?.phone}
                  name={"geo_location"}
                  handleChange={(e) => {
                    const inputValue = e.target.value;
                    formik.setFieldValue("phone", inputValue);
                  }}
                  error={formik.errors.phone ? true : false}
                  errorText={formik.errors.phone ? formik.errors.phone : ""}
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
                <RedBtnDummy breakPoints={breakPoints} sx={{ padding:"1px 25px", fontsize:"12px"}}>
                  {capitalizeFirstLetter(gender)}
                </RedBtnDummy>
              ) : (
                "N/A"
              )
            ) : (
              <Box>
                <CustomToggleSelect
                  name="gender"
                  value={formik?.values?.gender}
                  handleChange={(e) => {
                    formik.setFieldValue("gender", e);
                    formik.setFieldError("gender", "");
                  }}
                  options={GenderOptions}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  errorText={formik.touched.gender && formik.errors.gender}
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
                <RedBtnDummy breakPoints={breakPoints} sx={{ padding:"1px 25px", fontsize:"12px" }}>
                  {capitalizeFirstLetter(accountType)}
                </RedBtnDummy>
              )
            ) : (
              <Box>
                <CustomToggleSelect
                  name="accountType"
                  value={accountType}
                  handleChange={(e) => formik.setFieldValue("accountType", e)}
                  options={
                    default_role == "subuser" ? AccountTypeOptions : ["subuser"]
                  }
                  error={
                    formik.touched.accountType &&
                    Boolean(formik.errors.accountType)
                  }
                  errorText={
                    formik.touched.accountType && formik.errors.accountType
                  }
                />
              </Box>
            )}
          </Grid>
        </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <Box>
        <Grid container>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                Address<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>Address</LabelContainer>
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
              <p>{formik.values.address ? formik.values.address : "N/A"}</p>
            ) : (
              <Box>
                <CustomTextField
                  value={formik.values.address}
                  handleChange={(e) => {
                    const input = e.target;
                    const newValue = input.value;
                    const cursorPosition = input.selectionStart;
                    if (newValue.length > 100) {
                      formik.setFieldError(
                        "address",
                        " address content is too long. Please limit it to 100 characters."
                      );
                      return;
                    }
                    const trimmedValue = newValue.trimStart();
                    if (trimmedValue !== newValue) {
                      formik.setFieldValue("address", trimmedValue);
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition -
                          (newValue.length - trimmedValue.length);
                      });
                    } else {
                      formik.setFieldValue("address", newValue);
                      formik.setFieldError("address", "");
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition;
                      });
                    }
                  }}
                  placeholder={"Enter address"}
                  error={!!formik.errors.address}
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
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {editMode ? (
              <LabelContainer breakPoints={breakPoints}>
                Department
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>
                {" "}
                Department
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
              <p>
                {formik.values.job_title ? formik.values.job_title : "N/A"}
              </p>
            ) : (
              <Box>
                <CustomTextField
                  placeholder="Enter department"
                  autoComplete="off"
                  value={formik.values.job_title}
                  name={"geo_location"}
                  handleChange={(e) => {
                    const inputValue = e.target.value;
                    formik.setFieldValue("department", inputValue);
                  }}
                  error={formik.errors.department ? true : false}
                  errorText={
                    formik.errors.job_title ? formik.errors.job_title : ""
                  }
                  disabled={true}
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
                Job Title
              </LabelContainer>
            ) : (
              <LabelContainer breakPoints={breakPoints}>
                {" "}
                Job Title
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
              <p>{formik.values.department ? formik.values.department : "N/A"}</p>
            ) : (
              <Box>
                <CustomTextField
                  placeholder="Job Title"
                  autoComplete="off"
                  value={formik.values.department}
                  name={"geo_location"}
                  handleChange={(e) => {
                    const inputValue = e.target.value;
                    formik.setFieldValue("job_title", inputValue);
                  }}
                  error={formik.errors.department ? true : false}
                  errorText={
                    formik.errors.department ? formik.errors.department : ""
                  }
                  disabled={true}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr className="hair-line" />
          </Grid>
          </Grid>
        </Box>
        </Grid>
        </Grid>
      </OuterContainer>
    </ContentInnerContainer>
  );
};
