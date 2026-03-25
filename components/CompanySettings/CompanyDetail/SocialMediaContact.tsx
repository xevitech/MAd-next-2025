import {
  FormControl,
  MenuItem,
  TextField,
  Collapse,
  Box,
  Grid,
} from "@mui/material";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  OuterContainer,
  HeaderContainer,
  HeaderTextContainer,
  FactorySmallTextContainer,
  AccountTypeContainer,
  AccountLinkContainer,
  LogoContainer,
  SocialContactMedia,
  ContactEdits,
  FooterContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { apiClient, SocialMediaList } from "@/components/common/common";
import {
  BtnFilled,
  BtnOutlined,
} from "@/components/common/buttons/ButtonsVariations";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MyAppContext } from "@/contextApi/appContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import EmptyPage from "@/components/common/EmptyPage";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Image from "next/image";
import { SocialPencilIcon1 } from "./style";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SocialSkeleton from "./CompanySkeletons/SocialAccount";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import companydetail from "../CompanyDetail/companydetail.module.css";
import { setSkeletonLoader } from "@/hooks/socialMediaContactReducer";
import { MobileInputContainer } from "@/components/profile/personalProfile/personalProfileModals/editMobile/styles";
import dynamic from "next/dynamic";

const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);

const SocialMediaContactClone = ({ componentType }) => {
  const { skeletonLoader } = useSelector((state: any) => state.SocialMedia);

  const [focus, setFocus] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<boolean>(false);
  const [prevProfileLink, setprevProfileLink] = useState<any>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [editFieldIndex, setFieldIndex] = useState<number>(-1);
  const [addAccount, setAddAccount] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<any>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [showEditError, setShowEditError] = useState<boolean>(false);
  const [showEditMessage, setShowEditMessage] = useState("");
  const [expand, setExpand] = useState<boolean>(false);
  const [socialMediaLists, setSocialMediaLists] = useState<any>([]);
  const [Expanded, setExpandedLists] = useState<any>([]);
  const [validate, setValidation] = useState<boolean>(false);
  const [mobileValidation, setMobileValidation] = useState<any>("");
  const [deleteId, setDeleteID] = useState<any>(0);

  let List = [1, 2, 3];
  const inputRef = useRef<HTMLInputElement>(null);
  const validation = Yup.object().shape({
    profile_type: Yup.string().required("Please select social media account"),
    profile_link: Yup.string().required("Please enter profile link"),
  });

  let formik = useFormik({
    initialValues: {
      profile_type: "",
      profile_link: "",
      countryCode: "",
      mobile_code: "",
      type: componentType == "personal-profile" ? "personal" : "company",
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (!validate) {
        formik.setFieldError("profile_link", "Please enter correct mobile no");
        return;
      }
      if (isExist(values)) {
        toast.error("Social Account already exists");
      } else {
        if (!showError) {
          formik.resetForm();
          let response = await apiClient(`profile/submit/social`, "post", {
            body: {
              social_data: [values],
            },
          });
          dispatch(setSkeletonLoader(false));
          if (response.status == true || response.status == 200) {
            if (response?.not_updated.length > 0) {
              toast.error("Enter valid url!");
            } else {
              getSocialList();
              setSocialMediaLists((prev) => [...prev, values]);
              dispatch(setSkeletonLoader(false));
            }
          } else {
            setShowError(true);
            setShowErrorMessage("Enter valid url!");
          }
        }
      }
    },
  });
  const { breakPoints } = useContext(MyAppContext);

  const getSocialList = async () => {
    dispatch(setSkeletonLoader(true));
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
      setExpandedLists(response?.data.slice(0, 4));
      dispatch(setSkeletonLoader(false));
    }
  };

  useEffect(() => {
    getSocialList();
  }, []);

  let isExist = function (values) {
    return !!socialMediaLists.find((item: any) => {
      if (
        item.profile_link === values.profile_link &&
        item.profile_type === values.profile_type
      ) {
        return true;
      } else {
        return false;
      }
    });
  };

  const onChangeHandler = (e, index) => {
    const pointer = e.target.selectionStart;
    const end = e.target.selectionEnd;
    const input = e.target;
    const value = e.target.value;
    if (showError) setShowError(false);
    const savedSelectionRange = [pointer, end];
    setSocialMediaLists((prev) => {
      let list = [...prev];
      let updatedValue = { ...list[index], profile_link: value };
      list[index] = updatedValue;
      return list;
    });
    setExpandedLists((prev) => {
      let list = [...prev];
      let updatedValue = { ...list[index], profile_link: value };
      list[index] = updatedValue;
      return list;
    });
    requestAnimationFrame(() => {
      input.setSelectionRange(savedSelectionRange[0], savedSelectionRange[1]);
    });
  };

  const onChangeMobile = (phone, mobile_code, country_code, valid, index) => {
    if (!valid && phone) {
      if (phone.length > 5)
        setMobileValidation("Please enter correct mobile no.");
    }
    if (valid && phone) {
      setMobileValidation("");
    }
    setSocialMediaLists((prev) => {
      let list = [...prev];
      if (list[index]?.countryCode !== null) {
        let updatedValue = {
          ...list[index],
          profile_link: phone,
          countryCode: country_code,
          mobile_code: mobile_code,
        };
        list[index] = updatedValue;
      }
      return list;
    });
    setExpandedLists((prev) => {
      let list = [...prev];
      if (list[index]?.countryCode !== null) {
        let updatedValue = {
          ...list[index],
          profile_link: phone,
          countryCode: country_code,
          mobile_code: mobile_code,
        };
        list[index] = updatedValue;
      }
      return list;
    });
  };

  const CancelEdit = (index) => {
    setFieldIndex(-1);
    let list = [...socialMediaLists];
    list[index].profile_link = prevProfileLink;
    setSocialMediaLists(list);
    setprevProfileLink("");
  };

  const DeleteMediaAccount = async () => {
    const index = socialMediaLists.findIndex((item) => item.id === deleteId);
    const deletedData = [socialMediaLists];
    deletedData.splice(index, 1);
    const payloads = {
      social_data: socialMediaLists,
      delete_ids: deleteId,
    };

    let response = await apiClient(`profile/submit/social`, "post", {
      body: payloads,
    });
    if (response.status == true || response.status == 200) {
      setDeleteConfirmation(false);
      setSocialMediaLists((prev) => {
        let list = [...prev];
        list.splice(index, 1);
        return list;
      });
      setExpandedLists((prev) => {
        let list = [...prev];
        list.splice(index, 1);
        return list;
      });
    }
  };

  const SaveSocialAccounts: any = async (list: any, id: number) => {
    formik.resetForm();
    dispatch(setSkeletonLoader(true));
    const payload = {
      social_data: list ? list : socialMediaLists,
      delete_ids: id ? id.toString() : deleted.toString(),
    };
    if (showError) setShowError(false);
    let response = await apiClient(`profile/submit/social`, "post", {
      body: payload,
    });
    if (response.status == 200 || response.status == true) {
      getSocialList();
    }
  };

  const onCheckHandler = (index) => {
    const FB =
      "(?:(?:http|https)://)?(?:www.)?facebook.com/(?:(?:w)*#!/)?(?:pages/)?(?:[?w-]*/)?(?:profile.php?id=(?=d.*))?([w-]*)?";
    const LD = "^http(s)?://(www.)?linkedin.com/in/.*$";
    const SK = "^[a-z][a-z0-9.,-_]{5,31}$";
    const WC = "^[a-z][a-z0-9.,-_]{5,31}$";
    const IN =
      "(?:(?:http|https)://)?(?:www.)?instagram.com/(?:(?:w)*#!/)?(?:pages/)?(?:[?w-]*/)?(?:profile.php?id=(?=d.*))?([w-]*)?";
    const TW =
      "(?:(?:http|https)://)?(?:www.)?twitter.com/(?:(?:w)*#!/)?(?:pages/)?(?:[?w-]*/)?(?:profile.php?id=(?=d.*))?([w-]*)?";
    const WS = "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";
    if (socialMediaLists[index]?.profile_link === "") {
      setShowEditError(true);
      setShowEditMessage("Enter profile url");
      return;
    }

    if (socialMediaLists[index]?.profile_type === "LinkedIn") {
      if (!isValidURL(socialMediaLists[index]?.profile_link)) {
        setShowEditError(true);
        setShowEditMessage("Enter valid linkedln url");
      } else {
        setFieldIndex(-1);
        setprevProfileLink("");
        SaveSocialAccounts();
        setShowEditError(false);
        setShowEditMessage("");
      }
    } else if (socialMediaLists[index]?.profile_type === "Facebook") {
      if (!isValidURL(socialMediaLists[index]?.profile_link)) {
        setShowEditError(true);
        setShowEditMessage("Enter valid Facebook url");
      } else {
        setFieldIndex(-1);
        setprevProfileLink("");
        SaveSocialAccounts();
        setShowEditError(false);
        setShowEditMessage("");
      }
    } else if (socialMediaLists[index]?.profile_type === "Instagram") {
      if (!isValidURL(socialMediaLists[index]?.profile_link)) {
        setShowEditError(true);
        setShowEditMessage("Enter valid Instagram url");
      } else {
        setFieldIndex(-1);
        setprevProfileLink("");
        SaveSocialAccounts();
        setShowEditError(false);
        setShowEditMessage("");
      }
    } else if (socialMediaLists[index]?.profile_type === "Wechat") {
      if (!isValidURL(socialMediaLists[index]?.profile_link)) {
        setShowEditError(true);
        setShowEditMessage("Enter valid Wechat url");
      } else {
        setFieldIndex(-1);
        setprevProfileLink("");
        SaveSocialAccounts();
        setShowEditError(false);
        setShowEditMessage("");
      }
    } else if (socialMediaLists[index]?.profile_type === "Twitter") {
      if (!isValidURL(socialMediaLists[index]?.profile_link)) {
        setShowEditError(true);
        setShowEditMessage("Enter valid Twitter url");
      } else {
        setFieldIndex(-1);
        setprevProfileLink("");
        SaveSocialAccounts();
        setShowEditError(false);
        setShowEditMessage("");
      }
    } else if (socialMediaLists[index]?.profile_type === "WhatsApp") {
      var res = socialMediaLists[index]?.profile_link?.match(WS);
      if (socialMediaLists[index]?.profile_type == "") {
        setShowEditError(true);
        setShowEditMessage("Enter Whatsapp no.");
      } else {
        setFieldIndex(-1);
        setprevProfileLink("");
        SaveSocialAccounts();
        setShowEditError(false);
        setShowEditMessage("");
      }
    } else {
      setFieldIndex(-1);
      setprevProfileLink("");
      SaveSocialAccounts();
      setShowEditError(false);
      setShowEditMessage("");
    }
  };
  function isValidURL(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  const handleValidation = async (event) => {
    const FB =
      "(?:(?:http|https)://)?(?:www.)?facebook.com/(?:(?:w)*#!/)?(?:pages/)?(?:[?w-]*/)?(?:profile.php?id=(?=d.*))?([w-]*)?";
    const LD = "^http(s)?://(www.)?linkedin.com/in/.*$";
    const SK = "^[a-z][a-z0-9.,-_]{5,31}$";
    const WC = "^[a-z][a-z0-9.,-_]{5,31}$";
    const IN =
      "(?:(?:http|https)://)?(?:www.)?instagram.com/(?:(?:w)*#!/)?(?:pages/)?(?:[?w-]*/)?(?:profile.php?id=(?=d.*))?([w-]*)?";
    const TW =
      "(?:(?:http|https)://)?(?:www.)?twitter.com/(?:(?:w)*#!/)?(?:pages/)?(?:[?w-]*/)?(?:profile.php?id=(?=d.*))?([w-]*)?";
    const WS = "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";
    let linkType = formik.values.profile_type;
    const isUrl = (str) => {
      const urlPattern = /^(?:https?|ftp):\/\/(?:www\.)?[^\s/$.?#].[^\s]*$/i;
      return urlPattern.test(str);
    };
    if (linkType == "Facebook") {
      var res = event.target.value.match(FB);
      if (!isValidURL(event.target.value)) {
        setShowError(true);
        setShowErrorMessage("Enter valid facebook url");
      } else {
        setShowError(false);
        setShowErrorMessage("");
        return true;
      }
    } else if (linkType == "LinkedIn") {
      setShowError(false);
      var res = event.target.value.match(
        "/(http(s)?://.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g"
      );
      if (!isValidURL(event.target.value)) {
        setShowError(true);
        setShowErrorMessage("Enter valid linkedln url");
      } else {
        setShowError(false);
        setShowErrorMessage("");
        return true;
      }
    } else if (linkType === "Skype") {
      const fieldValue = formik.values.profile_link.trim();
      const skypeUrlRegex = /^(https?:\/\/){0,1}(www\.){0,1}skype\.com/;

      if (fieldValue === "") {
        formik.setFieldError("profile_link", "Skype profile link is required");
        return false;
      }

      if (isUrl(fieldValue)) {
        if (skypeUrlRegex.test(fieldValue)) {
          return true;
        } else {
          formik.setFieldError(
            "profile_link",
            "Please enter a valid Skype URL"
          );
          return false;
        }
      } else {
        return true;
      }
    } else if (linkType == "Wechat") {
      var res = event.target.value.match(WC);
      if (res == null) {
        setShowError(true);
        setShowErrorMessage("Enter valid wechat url");
      } else {
        setShowError(false);
        setShowErrorMessage("");
        return true;
      }
    } else if (linkType == "Instagram") {
      var res = event.target.value.match(IN);
      if (!isValidURL(event.target.value)) {
        setShowError(true);
        setShowErrorMessage("Enter valid instagram url");
      } else {
        setShowError(false);
        setShowErrorMessage("");
        return true;
      }
    } else if (linkType == "Twitter") {
      var res = event.target.value.match(TW);
      if (!isValidURL(event.target.value)) {
        setShowError(true);
        setShowErrorMessage("Enter valid twitter url");
      } else {
        setShowError(false);
        setShowErrorMessage("");
        return true;
      }
    } else if (linkType == "WhatsApp") {
      var res = event.target.value.match(WS);
      if (res == null) {
        setShowError(true);
        setShowErrorMessage("Enter valid whatsapp no.");
      } else {
        setShowError(false);
        setShowErrorMessage("");
        return true;
      }
    }
  };

  const ValidateField = (field) => {
    if (formik.touched[field] && formik.errors[field]) return true;
    else return false;
  };

  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("countryCode", country_code);
    formik.setFieldValue("profile_link", phone);
    formik.setFieldValue("mobile_code", mobile_code);
    formik.setFieldError("profile_link", "");
    setValidation(isValid);
  };

  const ExpandList = () => {
    setExpand(true);
    setExpandedLists(socialMediaLists.slice(0, 7));
  };
  const handleClose = () => {
    setExpand(false);
    setExpandedLists(socialMediaLists.slice(0, 4));
  };

  return (
    <div className="social_media_box">
      <Box
        sx={{
          "@media (max-width: 600px)": {
            padding: "10px",
          },
        }}
      >
        <OuterContainer
          noshodow={componentType == "personal-profile" ? "true" : ""}
        >
          {deleteConfirmation && (
            <DeleteDialog
              open={deleteConfirmation}
              handleClose={() => setDeleteConfirmation(false)}
              text="account"
              onClickAction={DeleteMediaAccount}
            />
          )}
          <HeaderContainer>
            <Box
              sx={{
                borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
                width: "100%",
                paddingBottom: "10px",
                marginBottom: "6px",
              }}
            >
              <HeaderTextContainer>
                Preferred instant Message ID
              </HeaderTextContainer>
              <FactorySmallTextContainer>
                Manage connected social accounts options
              </FactorySmallTextContainer>
            </Box>
          </HeaderContainer>

          {!addAccount ? (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
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
                      setFocus(true);
                      setShowErrorMessage("");
                      setShowEditError(false);
                    }}
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
                    {SocialMediaList.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.name}
                        sx={{ fontSize: "14px" }}
                        disabled={socialMediaLists.some(
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
                  sm={9}
                  md={9}
                  lg={9}
                  xl={9}
                  sx={{ display: "flex", alignItems: "start", gap: "16px" }}
                >
                  {formik.values.profile_type !== "WhatsApp" &&
                    formik.values.profile_type !== "WeChat" && (
                      <TextField
                        className={
                          companydetail.cdetailmediafield + " media_box"
                        }
                        {...formik.getFieldProps("profile_link")}
                        style={{
                          width:
                            componentType === "personal-profile"
                              ? "100%"
                              : "30%",
                          fontSize: "14px",
                        }}
                        name={"profile_link"}
                        size="small"
                        value={formik.values.profile_link}
                        onChange={(e) => {
                          handleValidation(e);
                          formik.setFieldError("profile_link", "");
                          formik.handleChange(e);
                        }}
                        placeholder="Insert Link/ ID/ Number"
                        error={showError ? true : ValidateField("profile_link")}
                        helperText={
                          ValidateField("profile_link")
                            ? formik.errors.profile_link
                            : showErrorMessage
                        }
                        inputRef={inputRef}
                      ></TextField>
                    )}
                  {formik.values.profile_type == "WhatsApp" && (
                    <MobileInputContainer>
                      <MobileInputCommon
                        mobileNumber={formik.values.profile_link}
                        mobileCode={formik.values.mobile_code}
                        countryCode={formik.values.countryCode}
                        handleChange={setMobileNumber}
                        helperText={formik.errors.profile_link}
                      />
                    </MobileInputContainer>
                  )}
                  {formik.values.profile_type == "WeChat" && (
                    <MobileInputContainer>
                      <MobileInputCommon
                        mobileNumber={formik.values.profile_link}
                        mobileCode={formik.values.mobile_code}
                        countryCode={formik.values.countryCode}
                        handleChange={setMobileNumber}
                        helperText={formik.errors.profile_link}
                      />
                    </MobileInputContainer>
                  )}
                  <BtnFilled
                    type="submit"
                    height={"38px"}
                    width={"80px"}
                    sx={{
                      "@media screen and (max-width:320px)": {},
                    }}
                  >
                    Add
                  </BtnFilled>
                </Grid>
              </Grid>
            </form>
          ) : null}
          {skeletonLoader ? (
            <>
              {List.map((v, i) => (
                <SocialSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {socialMediaLists.length > 0 && (
                <Collapse in={expand} collapsedSize={"190px"}>
                  <SocialContactMedia className="editsocial_contact">
                    <Grid container spacing={2}>
                      {Expanded.map((val, i) => (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={6}
                          sx={{ display: "flex", alignItems: "stretch" }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              "@media screen and (max-width:768px)": {
                                marginTop: "16px",
                              },
                            }}
                          >
                            <FormControl
                              className={companydetail.socialdiv}
                              sx={{
                                width: "100%",
                                height: "100%",
                              }}
                              key={val.id}
                            >
                              <Box>
                                <LogoContainer style={{ width: "100%" }}>
                                  <Box>
                                    {
                                      SocialMediaList.find(
                                        (v) =>
                                          v.name.toLowerCase() ===
                                          val.profile_type.toLowerCase()
                                      ).logo
                                    }
                                  </Box>
                                  <Box
                                    sx={{
                                      width: "100%",
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
                                      }}
                                    >
                                      <AccountTypeContainer>
                                        {val.profile_type}
                                      </AccountTypeContainer>
                                      <Box>
                                        {!edit && (
                                          <ContactEdits>
                                            {editFieldIndex === i ? (
                                              <TaskAltSharpIcon
                                                className={
                                                  companydetail.actionicon
                                                }
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  if (!mobileValidation) {
                                                    onCheckHandler(i);
                                                  }
                                                }}
                                              />
                                            ) : (
                                              <SocialPencilIcon1>
                                                <Image
                                                  className={
                                                    companydetail.actionicon
                                                  }
                                                  style={{
                                                    cursor: "pointer",
                                                    marginTop: 2,
                                                  }}
                                                  src={"/assets/EditPencil.svg"}
                                                  layout="fill"
                                                  alt="editImage"
                                                  onClick={() => {
                                                    setFieldIndex(i);
                                                    setprevProfileLink(
                                                      val.profile_link
                                                    );
                                                  }}
                                                />
                                              </SocialPencilIcon1>
                                            )}

                                            {editFieldIndex === i ? (
                                              <CancelOutlinedIcon
                                                className={
                                                  companydetail.actionicon
                                                }
                                                onClick={() => {
                                                  CancelEdit(i);
                                                  setFieldIndex(-1);
                                                  setMobileValidation("");
                                                }}
                                              />
                                            ) : (
                                              <DeleteOutlineIcon
                                                className={
                                                  companydetail.actionicon
                                                }
                                                onClick={() => {
                                                  setDeleteConfirmation(true);
                                                  setDeleteID(val.id);
                                                }}
                                              />
                                            )}
                                          </ContactEdits>
                                        )}
                                      </Box>
                                    </Box>
                                    <Tooltip
                                      title={val.profile_link}
                                      placement="top"
                                    >
                                      <AccountLinkContainer
                                        value={val.profile_type}
                                        className={
                                          val.profile_type != "WhatsApp"
                                            ? companydetail.linklength
                                            : null
                                        }
                                      >
                                        {i === editFieldIndex ? (
                                          <>
                                            {val.profile_type != "WhatsApp" &&
                                              val.profile_type != "WeChat" ? (
                                              <TextField
                                                style={{ width: "100%" }}
                                                name={"profile_link"}
                                                size="small"
                                                value={val.profile_link}
                                                ref={inputRef}
                                                onChange={(e) => {
                                                  onChangeHandler(e, i),
                                                    setShowEditError(false);
                                                }}
                                                placeholder="Insert Link/ ID/ Number"
                                                error={
                                                  showEditError ? true : false
                                                }
                                                helperText={
                                                  showEditError
                                                    ? showEditMessage
                                                    : ""
                                                }
                                              />
                                            ) : (
                                              <MobileInputCommon
                                                mobileCode={
                                                  val?.mobile_code ?? "91"
                                                }
                                                mobileNumber={val.profile_link}
                                                countryCode={val.countryCode}
                                                handleChange={(
                                                  phone,
                                                  mobile_code,
                                                  country_code,
                                                  isValid
                                                ) => {
                                                  onChangeMobile(
                                                    phone,
                                                    mobile_code,
                                                    country_code,
                                                    isValid,
                                                    i
                                                  );
                                                }}
                                                helperText={mobileValidation}
                                              />
                                            )}
                                          </>
                                        ) : val.profile_type != "WhatsApp" ? (
                                          <span
                                            style={{
                                              cursor: "pointer",
                                              wordBreak: "break-all",
                                            }}
                                            onClick={() =>
                                              window.open(
                                                val.profile_link,
                                                "_blank"
                                              )
                                            }
                                          >
                                            {val.profile_link}
                                          </span>
                                        ) : (
                                          val.profile_link
                                        )}
                                      </AccountLinkContainer>
                                    </Tooltip>
                                  </Box>
                                </LogoContainer>
                              </Box>
                            </FormControl>
                            <hr className="hair-line" />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </SocialContactMedia>
                </Collapse>
              )}
              <FooterContainer
                breakPoints={breakPoints}
                style={{ padding: "0" }}
              >
                <Box
                  alignItems="center"
                  display="flex"
                  justifyContent="center"
                  paddingTop="12px"
                  gap="20px"
                  sx={{
                    "@media screen and (max-width:600px)": {
                      paddingRight: "16px",
                    },
                  }}
                >
                  {socialMediaLists.length !== Expanded.length && (
                    <BtnOutlined
                      height={"25px"}
                      onClick={() => ExpandList()}
                      style={{ padding: "16px" }}
                    >
                      Expand
                      <ExpandMoreIcon />
                    </BtnOutlined>
                  )}
                  {socialMediaLists.length == Expanded.length &&
                    socialMediaLists.length > 4 && (
                      <BtnFilled
                        height={"25px"}
                        background={"#231F20"}
                        onClick={() => handleClose()}
                        style={{ padding: "16px" }}
                      >
                        Close
                        <ExpandLessIcon />
                      </BtnFilled>
                    )}
                </Box>
              </FooterContainer>
              {showError === false &&
                !skeletonLoader &&
                socialMediaLists.length === 0 &&
                (!addAccount || !edit) && (
                  <EmptyPage
                    text={"social account"}
                    onClickHandler={() => { }}
                    logo=""
                    detailClass="profile_socail_accounts_detail"
                    actiontext={false}
                  />
                )}
            </>
          )}
        </OuterContainer>
      </Box>
    </div>
  );
};
export default SocialMediaContactClone;
