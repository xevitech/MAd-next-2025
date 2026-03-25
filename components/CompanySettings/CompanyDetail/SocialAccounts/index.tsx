import { FormControl, MenuItem, TextField } from "@mui/material";
import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  OuterContainer,
  HeaderContainer,
  ContactEdits,
  HeaderTextContainer,
  FactorySmallTextContainer,
  AccountTypeContainer,
  AccountLinkContainer,
  LogoContainer,
  SocialContactMedia,
  IconsStyle,
  RightContentContainer,
  SocialmediaLogoBox,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { apiClient, SocialMediaList } from "@/components/common/common";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MyAppContext } from "@/contextApi/appContext";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import EmptyPage from "@/components/common/EmptyPage";
import { PencilIcon1 } from "@/components/CompanySettings/CompanyDetail/style";
import SocialSkeleton from "@/components/CompanySettings/CompanyDetail/CompanySkeletons/SocialAccount";
import companydetail from "../../CompanyDetail/companydetail.module.css";
import { MobileInputContainer } from "@/components/profile/personalProfile/personalProfileModals/editMobile/styles";
import dynamic from "next/dynamic";
import InputFields from "./InputFields";
import { ThreeDots } from "react-loader-spinner";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MobileWithFlag from "@/components/common/numberwithflag";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import Image from "next/image";
import { DeleteButtonLink } from "../ContactPersonDetail/style";
import { useDispatch, useSelector } from "react-redux";
import {
  profileData,
  setPlanDetails,
  setSocialAccounts,
} from "@/hooks/appReducers";
import SocialDeleteDialog from "@/components/common/DeleteAlert/SocialMediaDeleteDialog";
import { getCompanyProfile } from "@/hooks/company";

const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);
const SocialMediaContact = ({ componentType }) => {
  const dispatch = useDispatch();
  const [socialMediaList, setSocialMediaLists] = useState<any>([]);
  const [skeletonLoader, setSkeletonLoader] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<boolean>(false);
  const [editFieldIndex, setEditFieldIndex] = useState<number>(-1);
  const [deleteID, setDeleteID] = useState<any>("");
  const [validate, setValidation] = useState<boolean>(false);
  const { profileSocialAccount } = useSelector((state: any) => state.userData);
  const validation = Yup.object().shape({
    profile_type: Yup.string().required("Please select social media account"),
    profile_link: Yup.string().when("profile_type", {
      is: "WhatsApp",
      then: Yup.string()
        .matches(/^[0-9]+$/, "Please enter WhatsApp number")
        .required("Please enter WhatsApp number"),
      otherwise: Yup.string().when("profile_type", {
        is: "WeChat",
        then: Yup.string()
          .matches(/^[0-9]+$/, "Please enter WeChat number")
          .required("Please enter WeChat number"),
        otherwise: Yup.string().required("Please enter profile link"),
      }),
    }),
  });
  const InputRef: any = useRef();
  let formik = useFormik({
    initialValues: {
      profile_type: "",
      profile_link: "",
      countryCode: "",
      mobile_code: "",
      type: componentType == "personal-profile" ? "personal" : "company",
      status: "enable",
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (values) => {
      const { profile_type } = values;
      if (!["WhatsApp", "WeChat"].includes(profile_type)) {
        if (ValidateURL(profile_type)) {
          formik.setFieldError("profile_link", "");
          SubmitData(values);
        }
      }
      if (["WhatsApp", "WeChat"].includes(profile_type)) {
        if (!validate) {
          formik.setFieldError(
            "profile_link",
            "Please enter correct mobile no"
          );
          return;
        }
        SubmitData(values);
      }
    },
  });

  const SubmitData = async (values) => {
    const { status, ...profileWithoutStatus } = values;
    setButtonLoader(true);
    let response = await apiClient(`profile/submit/social`, "post", {
      body: {
        social_data: [
          componentType == "company" ? values : profileWithoutStatus,
        ],
      },
    });
    if (response.status) {
      formik.resetForm();
      getSocialList();
      dispatch(getCompanyProfile());
    }
    setButtonLoader(false);
  };

  const getSocialList = async () => {
    setSkeletonLoader(true);
    let type: any;
    if (componentType == "personal-profile") {
      type = "personal";
    } else {
      type = "company";
    }
    let response = await apiClient(`profile/list/social`, "post", {
      body: { type: type },
    });

    if (response.status == true || response.status == 200) {
      setSocialMediaLists(response?.data);
      dispatch(setSocialAccounts(response?.data));
      dispatch(setPlanDetails(response?.data));
      dispatch(profileData());
    }
    setSkeletonLoader(false);
  };

  useEffect(() => {
    getSocialList();
  }, []);

  const DeleteMediaAccount = async () => {
    const index = socialMediaList.findIndex((item) => item.id === deleteID);
    const payloads = {
      delete_ids: deleteID,
    };

    let response = await apiClient(`profile/submit/social`, "post", {
      body: payloads,
    });
    if (response.status == true || response.status == 200) {
      getSocialList();
      dispatch(getCompanyProfile());
      setDeleteConfirmation(false);
      setSocialMediaLists((prev) => {
        let list = [...prev];
        list.splice(index, 1);
        return list;
      });
    }
  };
  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("mobile", phone);
    formik.setFieldValue("countryCode", country_code);
    formik.setFieldValue("profile_link", phone);
    formik.setFieldValue("mobile_code", mobile_code);
    formik.setFieldError("profile_link", "");
    setValidation(isValid);
  };
  const FacebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com/;
  const linkedinUrlRegex = /^(https?:\/\/)?(www\.)?linkedin\.com/;
  const instagramUrlRegex = /^(https?:\/\/)?(www\.)?instagram\.com/;
  const twitterUrlRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)/;
  const skypeUrlRegex =
    /^(https?:\/\/)?(www\.)?(skype\.com(\/.*)?|join\.skype\.com\/(invite\/)?[A-Za-z0-9_-]+)$/;
  function isValidLinkedInUrl(url) {
    return linkedinUrlRegex.test(url);
  }
  const ValidateURL = (profile_type) => {
    const profileLink = formik.values.profile_link.trim();
    const startsWithHttp = /^(https?:\/\/)/.test(profileLink);

    if (!startsWithHttp) {
      formik.setFieldError(
        "profile_link",
        "Please enter a valid URL (http:// or https://)"
      );
      return false;
    }
    let validate = true;
    if (profile_type === "LinkedIn") {
      validate = isValidLinkedInUrl(formik.values.profile_link);
      if (!validate) {
        formik.setFieldError(
          "profile_link",
          "Please enter a valid LinkedIn URL"
        );
      }
    }
    if (profile_type === "Facebook") {
      validate = FacebookRegex.test(formik.values.profile_link);
      if (!validate) {
        formik.setFieldError(
          "profile_link",
          "Please enter a valid Facebook URL"
        );
      }
    }
    if (profile_type === "Twitter") {
      validate = twitterUrlRegex.test(formik.values.profile_link);
      if (!validate) {
        formik.setFieldError(
          "profile_link",
          "Please enter a valid Twitter URL"
        );
      }
    }
    if (profile_type === "Instagram") {
      validate = instagramUrlRegex.test(formik.values.profile_link);
      if (!validate) {
        formik.setFieldError(
          "profile_link",
          "Please enter a valid Instagram URL"
        );
      }
    }
    if (profile_type === "Skype") {
      validate = skypeUrlRegex.test(formik.values.profile_link);
      if (!validate) {
        formik.setFieldError("profile_link", "Please enter a valid skype URL");
      }
    }
    return validate;
  };
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <Box className="social_media_box">
      <Box
        sx={{
          "@media (max-width: 600px)": {
            padding: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            borderRadius: "6px",
          },
        }}
      >
        <OuterContainer
          sx={{
            minHeight: "400px",
            marginBottom: "0rem !important",
            "@media screen and (max-width:900px)": {
              minHeight: "auto !important",
            },
          }}
          noshodow={componentType == "personal-profile" ? "true" : ""}
        >
          {deleteConfirmation && (
            <SocialDeleteDialog
              open={deleteConfirmation}
              handleClose={() => setDeleteConfirmation(false)}
              text={`${deleteType}`}
              onClickAction={DeleteMediaAccount}
              subText="You can reconnect this account anytime."
              componentText="wishlist"
            />
          )}
          <HeaderContainer>
            <Box
              sx={{
                borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
                width: "100%",
                marginBottom: "14px",
              }}
            >
              <HeaderTextContainer>
                Social {componentType == "company" ? "Contacts" : "Accounts"}
              </HeaderTextContainer>
              <FactorySmallTextContainer>
                Manage connected social{" "}
                {componentType == "company" ? "contacts" : "accounts"} options
              </FactorySmallTextContainer>
            </Box>
          </HeaderContainer>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <TextField
                  className="media_box"
                  error={formik.errors.profile_type ? true : false}
                  helperText={formik.errors.profile_type}
                  label={
                    formik.values.profile_type !== ""
                      ? ""
                      : "Select Social Media"
                  }
                  style={{ width: "100%" }}
                  id="outlined-select-social"
                  variant="outlined"
                  select
                  name={"profile_type"}
                  size="small"
                  value={formik.values.profile_type}
                  onChange={(e) => {
                    e.stopPropagation();
                    formik.handleChange(e);
                    formik.setFieldError("profile_type", "");
                    formik.setFieldError("profile_link", "");
                  }}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: `${
                        profileSocialAccount && "#d7282f !important"
                      }`,
                      animation: profileSocialAccount
                        ? "pulseBorder 1.5s infinite"
                        : "none",
                    },
                    "@keyframes pulseBorder": {
                      "0%": {
                        boxShadow: "0 0 0 0 rgba(211, 47, 47, 0.4)",
                      },
                      "70%": {
                        boxShadow: "0 0 0 6px rgba(211, 47, 47, 0)",
                      },
                      "100%": {
                        boxShadow: "0 0 0 0 rgba(211, 47, 47, 0)",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "4px",
                        fontSize: "12px",
                        height: "45px",
                        "@media screen and (max-width:767px)": {
                          height: "40px",
                        },
                      },
                    },
                  }}
                >
                  {SocialMediaList.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.name}
                      sx={{ fontSize: "14px" }}
                      disabled={socialMediaList.some(
                        (obj) => obj.profile_type === option.name
                      )}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{
                  display: "flex",
                  alignItems: "start",
                  gap: "16px",
                  "@media screen and (max-width:600px)": {
                    display: "block",
                  },
                }}
              >
                {formik.values.profile_type !== "WhatsApp" &&
                  formik.values.profile_type !== "WeChat" && (
                    <Box
                      className="detailsContacts1"
                      sx={{
                        width: "100%",
                        "@media screen and (max-width:600px)": {
                          width: "100%",
                        },
                      }}
                    >
                      <TextField
                        className={
                          companydetail.cdetailmediafield + " media_box"
                        }
                        style={{
                          width:
                            componentType === "personal-profile"
                              ? "100%"
                              : "100%",
                          fontSize: "14px",
                        }}
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: `${
                              profileSocialAccount && "#d7282f !important"
                            }`,
                            animation: profileSocialAccount
                              ? "pulseBorder 1.5s infinite"
                              : "none",
                          },
                          "@keyframes pulseBorder": {
                            "0%": {
                              boxShadow: "0 0 0 0 rgba(211, 47, 47, 0.4)",
                            },
                            "70%": {
                              boxShadow: "0 0 0 6px rgba(211, 47, 47, 0)",
                            },
                            "100%": {
                              boxShadow: "0 0 0 0 rgba(211, 47, 47, 0)",
                            },
                          },
                        }}
                        name={"profile_link"}
                        size="small"
                        value={formik.values.profile_link}
                        onChange={(e) => {
                          formik.setFieldValue("profile_link", e.target.value);
                          formik.setFieldError("profile_link", "");
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Insert Link/ ID/ Number"
                        error={!!formik.errors.profile_link}
                        helperText={formik.errors.profile_link}
                      ></TextField>
                    </Box>
                  )}
                {(formik.values.profile_type == "WhatsApp" ||
                  formik.values.profile_type == "WeChat") && (
                  <MobileInputContainer
                    className="detailsContacts"
                    style={{ minHeight: "40px" }}
                  >
                    <MobileInputCommon
                      mobileNumber={formik.values.profile_link}
                      mobileCode={formik.values.mobile_code}
                      countryCode={formik.values.countryCode}
                      handleChange={setMobileNumber}
                      helperText={formik.errors.profile_link}
                    />
                  </MobileInputContainer>
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    width: `${componentType == "company" && "40%"}`,
                    "@media screen and (max-width:600px)": {
                      margin: "16px 0 0 0",
                    },
                  }}
                >
                  {componentType == "company" && (
                    <Box
                      sx={{
                        width: "62%",
                        "@media (min-width:600px) and (max-width:680px)": {
                          width: "45%",
                        },
                        "@media screen and (max-width:600px)": {
                          width: "100%",
                        },
                      }}
                    >
                      <TextField
                        className="media_box"
                        label={"Visible on Mini-site"}
                        style={{ width: "100%" }}
                        variant="outlined"
                        select
                        name={"profile_type"}
                        value={formik?.values?.status}
                        onChange={(e) =>
                          formik.setFieldValue("status", e.target.value)
                        }
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderRadius: "4px",
                              fontSize: "12px",
                              height: "45px",
                            },
                          },
                        }}
                      >
                        <MenuItem value={"enable"}>Enable</MenuItem>
                        <MenuItem value={"disable"}>Disable</MenuItem>
                      </TextField>
                    </Box>
                  )}
                  <BtnFilled
                    type="submit"
                    height={"38px"}
                    width={"80px"}
                    sx={{
                      color: `${
                        socialMediaList.length === 7
                          ? "rgba(0, 0, 0, 0.26)"
                          : "#fff"
                      }`,
                      backgroundColor: `${
                        socialMediaList.length === 7
                          ? "rgba(0, 0, 0, 0.12)"
                          : ""
                      }`,
                      border: `${socialMediaList.length === 7 ? "none" : ""}`,
                      "@media screen and (max-width:767px)": {
                        minWidth: "auto",
                      },
                    }}
                    disabled={socialMediaList.length === 7 || buttonLoader}
                  >
                    {buttonLoader ? (
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
                      "Add"
                    )}
                  </BtnFilled>
                </Box>
              </Grid>
            </Grid>
          </form>
          {skeletonLoader ? (
            <>
              {[1, 2, 3, 4].map((v, i) => (
                <SocialSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {socialMediaList.length > 0 && (
                <SocialContactMedia className="editsocial_contact">
                  <Grid container spacing={1} columnSpacing={3}>
                    {socialMediaList.map((val, i) => (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={6}
                        sx={{ display: "flex", alignItems: "stretch" }}
                        key={val.id}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            "@media screen and (max-width:768px)": {
                              marginTop: "16px",
                            },
                            "& .actionClick": {
                              display: "none",
                              transition: " .5s",
                              "@media screen and (max-width:1280px)": {
                                display: "block",
                              },
                            },
                            "&:hover": {
                              transition: " .5s",
                              "& .actionClick": {
                                display: "block",
                              },
                            },
                          }}
                        >
                          <FormControl
                            sx={{
                              width: "100%",
                              height: "100%",
                            }}
                            key={val.id}
                          >
                            <Grid container sx={{ alignItems: "center" }}>
                              <Grid
                                item
                                xs={10}
                                sm={10}
                                md={10}
                                lg={10}
                                xl={10}
                              >
                                <LogoContainer
                                  sx={{
                                    width: "100%",
                                    paddingRight: "12px",
                                    "@media (max-width:767px)": {
                                      paddingBottom: "5px",
                                    },
                                  }}
                                >
                                  <SocialmediaLogoBox>
                                    {
                                      SocialMediaList.find(
                                        (v) =>
                                          v.name.toLowerCase() ===
                                          val.profile_type.toLowerCase()
                                      )?.logo
                                    }
                                  </SocialmediaLogoBox>
                                  <Box
                                    sx={{
                                      width: "100%",
                                      "& .MuiInputAdornment-root": {
                                        "& .MuiTypography-root": {
                                          fontSize: "13px",
                                          color: "#231F20",
                                          paddingLeft: "4px",
                                        },
                                      },
                                      "@media screen and (max-width:320px)": {},
                                      "& .MuiInputBase-root": {
                                        "& .MuiInputBase-input": {
                                          padding: "0px 6px",
                                          fontSize: "13px",
                                        },
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        "@media screen and (max-width:600px)": {
                                          gap: "12px",
                                          justifyContent: "inherit",
                                        },
                                      }}
                                    >
                                      <AccountTypeContainer
                                        sx={{
                                          "@media screen and (max-width:320px)":
                                            {
                                              width: "auto",
                                            },
                                        }}
                                      >
                                        {val.profile_type == "Twitter"
                                          ? " X(Twitter)"
                                          : val.profile_type}
                                      </AccountTypeContainer>
                                      {componentType == "company" && (
                                        <Box
                                          sx={{
                                            backgroundColor:
                                              val.status === "enable"
                                                ? "#ECFBE6"
                                                : "#FFEBE6",
                                            color:
                                              val.status === "enable"
                                                ? "#2a7e03"
                                                : "#C22E00",
                                            padding: "2px 8px",
                                            borderRadius: "4px",
                                            textTransform: "capitalize",
                                            display: "none",
                                            fontSize: "13px",
                                            "@media screen and (max-width:600px)":
                                              {
                                                display: "block",
                                              },
                                          }}
                                        >
                                          {val.status === "enable"
                                            ? "Enabled"
                                            : "Disabled"}
                                        </Box>
                                      )}
                                    </Box>
                                    <AccountLinkContainer
                                      value={val.profile_type}
                                      className={
                                        val.profile_type != "WhatsApp"
                                          ? companydetail.linklength
                                          : null
                                      }
                                      sx={{ width: "100%" }}
                                    >
                                      {i === editFieldIndex ? (
                                        <InputFields
                                          ref={InputRef}
                                          index={i}
                                          socialMediaList={socialMediaList}
                                          setSocialMediaLists={
                                            setSocialMediaLists
                                          }
                                          componentType={componentType}
                                          profile_type={val.profile_type}
                                          defaultValue={val}
                                          cancelHandler={() =>
                                            setEditFieldIndex(-1)
                                          }
                                        />
                                      ) : val.profile_type !== "WhatsApp" &&
                                        val.profile_type !== "WeChat" ? (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                          }}
                                        >
                                          <LightTooltip
                                            title={val.profile_link}
                                            placement="top"
                                            arrow
                                            disableInteractive
                                          >
                                            <Box
                                              component={"span"}
                                              sx={{
                                                cursor: "pointer",
                                                wordBreak: "break-all",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: "1",
                                                display: "-webkit-box",
                                                width: "80%",
                                                "@media screen and (max-width:600px)":
                                                  { width: "100%" },
                                              }}
                                              onClick={() =>
                                                window.open(
                                                  val.profile_link,
                                                  "_blank"
                                                )
                                              }
                                            >
                                              {val.profile_link}
                                            </Box>
                                          </LightTooltip>
                                          {componentType == "company" && (
                                            <Box
                                              sx={{
                                                backgroundColor:
                                                  val.status === "enable"
                                                    ? "#ECFBE6"
                                                    : "#FFEBE6",
                                                color:
                                                  val.status === "enable"
                                                    ? "#2a7e03"
                                                    : "#C22E00",
                                                padding: "2px 8px",
                                                borderRadius: "4px",
                                                textTransform: "capitalize",
                                                "@media screen and (max-width:600px)":
                                                  {
                                                    display: "none",
                                                  },
                                              }}
                                            >
                                              {val.status === "enable"
                                                ? "Enabled"
                                                : "Disabled"}
                                            </Box>
                                          )}
                                        </Box>
                                      ) : (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                          }}
                                        >
                                          <LightTooltip
                                            title={`${val.mobile_code} ${val.profile_link}`}
                                            placement="top"
                                            arrow
                                            disableInteractive
                                          >
                                            <MobileWithFlag
                                              country_code={val.countryCode}
                                              number={`${val.mobile_code} ${val.profile_link}`}
                                              componentType={componentType}
                                            />
                                          </LightTooltip>
                                          {componentType == "company" && (
                                            <Box
                                              sx={{
                                                backgroundColor:
                                                  val.status === "enable"
                                                    ? "#ECFBE6"
                                                    : "#FFEBE6",
                                                color:
                                                  val.status === "enable"
                                                    ? "#2a7e03"
                                                    : "#C22E00",
                                                padding: "2px 8px",
                                                borderRadius: "4px",
                                                textTransform: "capitalize",
                                                "@media screen and (max-width:600px)":
                                                  {
                                                    display: "none",
                                                  },
                                              }}
                                            >
                                              {val.status === "enable"
                                                ? "Enabled"
                                                : "Disabled"}
                                            </Box>
                                          )}
                                        </Box>
                                      )}
                                    </AccountLinkContainer>
                                  </Box>
                                </LogoContainer>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                sm={2}
                                md={2}
                                lg={2}
                                sx={{
                                  marginLeft: "auto",
                                  height: "100%",
                                  alignItems: "center",
                                  display: "flex",
                                  "@media screen and (max-width:1280px)": {
                                    border: "none",
                                    justifyContent: "center",
                                  },
                                  "@media screen and (max-width:480px)": {
                                    alignItems: "flex-start",
                                  },
                                }}
                              >
                                <Box className="actionClick">
                                  {i !== editFieldIndex && (
                                    <Box
                                      sx={{
                                        padding: "6px 0 6px 12px",
                                        width: "56px",
                                        marginLeft: "auto",
                                      }}
                                    >
                                      <RightContentContainer>
                                        <PencilIcon1>
                                          <LightTooltip
                                            placement="top"
                                            title="Edit"
                                            arrow
                                            disableInteractive
                                          >
                                            <Image
                                              style={{ cursor: "pointer" }}
                                              src={"/assets/EditPencil.svg"}
                                              layout="fill"
                                              onClick={() => {
                                                setEditFieldIndex(i);
                                              }}
                                              alt="editImage"
                                            />
                                          </LightTooltip>
                                        </PencilIcon1>
                                        <LightTooltip
                                          placement="top"
                                          title="Delete"
                                          arrow
                                          disableInteractive
                                        >
                                          <DeleteButtonLink
                                            sx={IconsStyle}
                                            onClick={() => {
                                              setDeleteConfirmation(true);
                                              setDeleteType(val?.profile_type);
                                              setDeleteID(val.id);
                                            }}
                                          />
                                        </LightTooltip>
                                      </RightContentContainer>
                                    </Box>
                                  )}
                                  {i == editFieldIndex && (
                                    <Box
                                      sx={{
                                        width: "56px",
                                        marginLeft: "auto",
                                      }}
                                    >
                                      <ContactEdits>
                                        <TaskAltSharpIcon
                                          className={companydetail.actionicon}
                                          style={{
                                            cursor: "pointer",
                                            marginLeft: "auto",
                                          }}
                                          onClick={() =>
                                            InputRef?.current?.SubmitHandler()
                                          }
                                        />
                                        <CancelOutlinedIcon
                                          className={companydetail.actionicon}
                                          onClick={() => {
                                            setEditFieldIndex(-1);
                                          }}
                                        />
                                      </ContactEdits>
                                    </Box>
                                  )}
                                </Box>
                              </Grid>
                            </Grid>
                          </FormControl>
                          <hr className="hair-line" />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </SocialContactMedia>
              )}
              {socialMediaList.length == 0 && (
                <EmptyPage
                  text={
                    componentType == "company"
                      ? " social contacts"
                      : " social accounts"
                  }
                  onClickHandler={() => {}}
                  logo=""
                  detailClass="profile_socail_accounts_detail"
                  actiontext={false}
                />
              )}
            </>
          )}
        </OuterContainer>
      </Box>
    </Box>
  );
};
export default SocialMediaContact;
