import React, { useEffect, useRef, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Divider,
  TextField,
  Fab,
  Avatar,
  Grid,
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
} from "@mui/material";
import { apiClient, toBase64 } from "@/components/common/common";
import Image from "next/image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Auth from "@/auth/Auth";
import { BASE_URL, LOCAL_PUBLIC_URL } from "@/utils/staticValues";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  ContentContainer,
  ContentHeaderContainer,
  HeaderContainer,
  HeaderTextContainer,
  LeftContentContainer,
  OuterContainer,
  RightContentContainer,
  IconsStyle,
} from "../commonStyles";
import { Redoutlinebtn } from "@/components/common/buttons/ButtonsVariations";
import * as Yup from "yup";
import {
  FormControlData,
  PersonNameCont,
  SwitchButtons,
  AddMoreDetails,
  ButtonContainer,
  ImageuploadIconField,
  FloatingIconfield,
  FieldContainerAddContact,
  LabelContainerAddContact,
  ValueContainerAddContact,
  SectionOuterContainer,
  SectionInnerContent,
  ProUserName,
  RedSaveButton,
  BlackCancelButton,
  CancelLink,
  SaveLink,
  FloatingEditIcon,
  CheckStyle,
  SelectedContainer,
  DeleteButtonLink,
  DisableEnable,
  Cancel,
} from "./style";
import { PencilIcon2, SectionFooterBtnContainer } from "../style";
import {
  Administrative_Assistant,
  Sales_and_marketing_rules,
  Customer_Service_Role,
  Management_Rules,
} from "@/utils/jobTitle";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { FormControl } from "@mui/material";
import { convertUnderscoreToSpaceAndCapitalize } from "@/utils/commonFunctions/other";
import { toast } from "react-toastify";
import EmptyPage from "@/components/common/EmptyPage";
import { ThreeDots } from "react-loader-spinner";
import MobileWithFlag from "@/components/common/numberwithflag";
import { FactorySmallTextContainer } from "@/components/CompanySettings/CompanyDetail/commonStyles";
import ContactSkeleton from "../CompanySkeletons/ContactpersonSkeleton";
import axios from "axios";
import ImageCropper from "@/components/common/ImageCropper";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { useDispatch } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);

const ContactPersonDetail = () => {
  let List = [1];
  const [contactsList, setContactList] = useState<any>([]);
  const [addMore, setMore] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [loader, setLoader] = useState<boolean>(true);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [DeleteID, setDeleteID] = useState<any>("");
  const [DeleteLoader, setDeleteLoader] = useState<boolean>(false);
  const [validate, setValidation] = useState<boolean>(false);
  const emailInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [enable, setEnable] = useState("");
  const [id, setId] = useState("");
  const [chat, setChat] = useState("");
  const designationList = [
    ...Management_Rules,
    ...Administrative_Assistant,
    ...Sales_and_marketing_rules,
    ...Customer_Service_Role,
  ];
  const capitalizedRoles = designationList.map(
    (role) => role?.label.charAt(0).toUpperCase() + role?.label?.slice(1)
  );
  const dispatch = useDispatch();

  const deleteUploadedImages = async (id: any, index) => {
    const endPoint = "profile/delete_images";
    let formData = new FormData();
    formData.append("id", id);
    formData.append("type", "user_contact_list");
    let url = `${BASE_URL}/${endPoint}`;
    try {
      let { status } = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${Auth.token()}` },
      });
      if (status === 200) {
        setContactList((prev) => {
          let contacts = [...prev];
          contacts[index].image = "";
          return contacts;
        });
        formik.setFieldValue("image", "");
        dispatch(getCompanyProfile());
      }
    } catch {}
  };
  const DeleteOffice = async () => {
    setDeleteLoader(true);
    await apiClient("company_profile/contact_person/delete", "POST", {
      body: { id: DeleteID },
    });
    setDeleteLoader(false);
    setDeleteConfirmation(false);
    getContactsList();
    dispatch(getCompanyProfile());
  };

  const getContactsList = async () => {
    setLoader(true);
    const response = await apiClient(
      "company_profile/contact_person/view",
      "get"
    );
    if (response.status == 200) {
      const data = response.data.map((v) => ({
        ...v,
        phone: `${v.code}${v.mobile}`,
      }));
      setContactList(data);
      dispatch(getCompanyProfile());
    }
    setLoader(false);
  };

  useEffect(() => {
    getContactsList();
  }, []);

  const handleClick = (e) => {
    setOpen(true);
    setChat(e?.is_chat_active);
    setId(e?.id);
    setEnable(e?.is_chat_active);
  };

  const handleEnable = () => {
    enableChatHandler(chat, id);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validation = Yup.object().shape({
    name: Yup.string()
      .max(50, "Name must be at most 50 characters")
      .required("Please enter full name"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter email"),
    designation: Yup.string().nullable().required("Please enter designation"),
    mobile: Yup.string().required("Please enter mobile number"),
  });

  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("code", mobile_code);
    formik.setFieldValue("mobile", phone);
    formik.setFieldValue("mobile_country_code", country_code);
    formik.setFieldError("mobile", "");
    setValidation(isValid);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      designation: "",
      email: "",
      code: "",
      mobile: "",
      status: false,
      image: "",
      is_chat_active: false,
      id: "",
      mobile_country_code: "",
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const {
        name,
        designation,
        email,
        code,
        mobile,
        image,
        mobile_country_code,
      } = values;
      if (!validate) {
        formik.setFieldError("mobile", "Please enter correct mobile no");
        return;
      }
      setButtonLoader(true);
      let response = await apiClient("company_profile/updateProfile", "PATCH", {
        body: {
          contact_details: {
            name,
            designation,
            email,
            code,
            mobile,
            image,
            status: values.status ? "1" : "0",
            is_chat_active: values.is_chat_active ? "1" : "0",
            mobile_country_code,
          },
        },
      });
      if (response.status) {
      }
      if (!response.status) {
        response.message == "Email Already exists" &&
          formik.setFieldError("email", response.message);
        setMore(true);
        setButtonLoader(false);
      } else {
        getContactsList();
        formik.resetForm();
        setMore(false);
        setButtonLoader(false);
      }
    },
  });

  const SetEditValue = (values) => {
    formik.setFieldValue("id", values?.id);
    formik.setFieldValue("name", values?.name);
    formik.setFieldValue("designation", values?.designation);
    formik.setFieldValue("email", values?.email);
    formik.setFieldValue("code", values?.code);
    formik.setFieldValue("mobile", values?.mobile);
    formik.setFieldValue("status", values?.status == "1" ? true : false);
    formik.setFieldValue("image", values?.image);
    formik.setFieldValue("mobile_country_code", values?.mobile_country_code);
    formik.setFieldValue(
      "is_chat_active",
      values?.is_chat_active == "1" ? true : false
    );
  };

  const SaveEditValues = async (index: number) => {
    const { name, email, designation, mobile, code, id, image } = formik.values;
    const validEmail = (field: any) => {
      if (formik.errors[field] && formik.touched[field]) return true;
      else return false;
    };
    if (
      !name ||
      !email ||
      !designation ||
      !mobile ||
      !validEmail ||
      !validate
    ) {
      if (!name) {
        formik.setFieldError("name", "Please enter name");
      }
      if (!email) {
        formik.setFieldError("email", "Please enter email");
      }
      if (!designation) {
        formik.setFieldError("designation", "Please enter designation");
      }
      if (mobile == "") {
        formik.setFieldError("mobile", "Please enter mobile number");
      }
      if (email && !validEmail) {
        formik.setFieldError("email", "Please enter valid email");
      }
      if (!validate) {
        formik.setFieldError("mobile", "Please enter correct mobile no");
      }
      return;
    }
    if (!buttonLoader) {
      setButtonLoader(true);
      let dataToSend = {
        id,
        name,
        designation,
        email,
        code,
        mobile,
        status: formik.values.status ? "1" : "0",
        is_chat_active: formik.values.is_chat_active ? "1" : "0",
      };
      let response = await apiClient("company_profile/updateProfile", "PATCH", {
        body: {
          contact_details: image.includes("base64")
            ? { ...dataToSend, image }
            : dataToSend,
        },
      });

      if (!response.status) {
        toast.error("Something went wrong!");
      }
      if (response.status == 200) {
        getContactsList();
      }
    }

    setButtonLoader(false);
    setEditIndex(-1);
  };

  const showChatHandler = async (status, id) => {
    if (editIndex >= 0) return;
    let index = contactsList.findIndex((v) => v.id == id);
    setContactList((prev) => {
      let list = [...prev];
      list[index].status = status == "1" ? "0" : "1";
      return list;
    });
    await apiClient("company_profile/updateProfile", "PATCH", {
      body: {
        contact_details: {
          id,
          status: status == "1" ? "0" : "1",
        },
      },
    });
  };
  const displayText = contactsList.some((item) => item?.is_chat_active === "1");
  const enableChatHandler = async (status, id) => {
    setLoader(true);
    if (editIndex >= 0) return;

    let index = contactsList.findIndex((v) => v.id == id);
    setContactList((prev) => {
      let list = [...prev];
      list[index].is_chat_active = status == "1" ? "0" : "1";
      return list;
    });

    await apiClient("company_profile/updateProfile", "PATCH", {
      body: {
        contact_details: {
          id,
          is_chat_active: status == "1" ? "0" : "1",
        },
      },
    });
    setLoader(false);
    getContactsList();
  };

  const { handleSubmit } = formik;

  const handleEmailChange = (e) => {
    const { value, selectionStart } = e.target;
    const sanitizedValue = value.replace(/\s+/g, "");

    const cursorPosition =
      selectionStart - (value.length - sanitizedValue.length);

    formik.setFieldValue("email", sanitizedValue);
    formik.setFieldTouched("email", true);

    if (value.includes(" ")) {
      formik.setFieldError("email", "Email address cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("email", "");
      }, 2000);
    } else {
      formik.setFieldError("email", "");
    }

    if (emailInputRef.current) {
      emailInputRef.current.value = sanitizedValue;
      emailInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const nameRef = useRef(null);
  // const emailRef = useRef(null);
  const DesignationRef = useRef(null);
  const mobileRef = useRef(null);

  const handleSave = () => {
    formik.handleSubmit();

    if (!formik.values.name || formik.errors.name) {
      nameRef.current?.focus();
      return;
    }
    if (!formik.values.email || formik.errors.email) {
      emailInputRef?.current?.focus();
      return;
    }
    if (!formik.values.designation || formik.errors.designation) {
      DesignationRef?.current?.focus();
      return;
    }
    if (!formik.values.mobile || formik.errors.mobile) {
      mobileRef?.current?.focus();
      return;
    }
  };

  return (
    <>
      <OuterContainer>
        <Dialog open={open} onClose={handleClose}>
          <Box>
            <Box
              sx={{ padding: "15px", display: "flex", justifyContent: "end" }}
            >
              <Box
                sx={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#FFE8EC",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              >
                <CloseOutlinedIcon
                  sx={{ color: "rgb(255, 26, 67)", fontSize: "1.5rem" }}
                />
              </Box>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <i className="icon-livechat" style={{ fontSize: "40px" }}>
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                fontSize: "23px",
                fontWeight: "700",
                color: "#231f20",
              }}
            >
              Chat
            </Box>
            <Box
              sx={{
                padding: "20px 24px 20px 24px",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "400",
                color: "#4a4a4a",
              }}
            >
              {enable == "1"
                ? "Are you sure you want to disable chat?"
                : displayText
                ? "Are you sure you want to switch the pinned contact person?"
                : "Are you sure you want to enable chat?"}
            </Box>
            <DialogActions
              sx={{ margin: "0 0 16px 0", justifyContent: "center" }}
            >
              <DisableEnable onClick={handleEnable} color="primary">
                {enable == "1" ? "Disable" : "Enable"}
              </DisableEnable>
              <Cancel onClick={handleClose} color="primary">
                Cancel
              </Cancel>
            </DialogActions>
          </Box>
        </Dialog>
        {deleteConfirmation && (
          <DeleteDialog
            loading={DeleteLoader}
            open={deleteConfirmation}
            handleClose={setDeleteConfirmation}
            text="contact person detail"
            onClickAction={() => DeleteOffice()}
          />
        )}
        <HeaderContainer sx={{ alignItems: "center" }}>
          <div>
            <HeaderTextContainer>Contact Person Details</HeaderTextContainer>
            <FactorySmallTextContainer>
              Manage Information related to Contact Person Details
            </FactorySmallTextContainer>
          </div>
          <div>
            <Redoutlinebtn
              onClick={() => {
                if (!addMore) {
                  setMore(true);
                  setEditIndex(-1);
                  formik.resetForm();
                }
              }}
              height={"36px"}
              sx={{
                "@media screen and (max-width:600px)": {
                  marginBottom: "12px",
                },
                zIndex: 1,
              }}
            >
              <div>Add Contact Person Details</div>
              <AddCircleOutlineIcon sx={{ marginLeft: 1, height: 24 }} />
            </Redoutlinebtn>
          </div>
          {/* )} */}
        </HeaderContainer>
        <Divider variant="middle" />
        <>
          {loader ? (
            <>
              {List.map((v, i) => (
                <ContactSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              <SectionOuterContainer>
                <Grid
                  container
                  spacing={2}
                  sx={{ minHeight: "300px", marginTop: "1px" }}
                  className="ContactPersonDetails"
                >
                  {contactsList.length > 0 && !loader ? (
                    contactsList.map((item, index) => (
                      <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                        <SelectedContainer
                          className={`reginal_box ${
                            item.status == 1 ? "active" : "false"
                          }`}
                        >
                          <CheckStyle className="checkStyle">
                            <LightTooltip
                              onClick={() =>
                                showChatHandler(item.status, item.id)
                              }
                              placement="top"
                              title={item.status == 1 ? "You can hide this contact from your mini-site." : "You can show this contact to your mini-site."}
                              arrow
                              disableInteractive
                            >
                              <Box
                                sx={{
                                  border: "1px solid #8d8d8d",
                                  borderRadius: "4px",
                                  width: "16px",
                                  height: "16px",
                                  position: "relative",
                                  left: "-7px",
                                  top: "7px",
                                  background: "#fbfbfb",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  zIndex: "1",
                                  cursor: "pointer",
                                  "& .icon-approved": {
                                    fontSize: "6px",
                                    opacity: "0",
                                  },
                                  "&:hover": {
                                    "& .icon-approved": {
                                      opacity: "1",
                                    },
                                  },
                                }}
                              >
                                <i className="icon-approved"></i>
                              </Box>
                            </LightTooltip>
                          </CheckStyle>

                          <SectionInnerContent
                            key={item?.id}
                            className="persondetail_box"
                          >
                            <Grid container>
                              <FormControl sx={{ width: "100%" }}>
                                <ContentHeaderContainer>
                                  <LeftContentContainer
                                    style={{ flex: "none" }}
                                  >
                                    <PersonNameCont>
                                      {index !== editIndex ? (
                                        <>
                                          <Fab
                                            sx={{
                                              width: "40px",
                                              height: "40px",
                                              boxShadow: "none",
                                            }}
                                            component="span"
                                          >
                                            {item?.image && (
                                              <Avatar
                                                alt="Remy Sharp"
                                                sx={{
                                                  width: 40,
                                                  height: 40,
                                                  boxShadow: "none",
                                                }}
                                              >
                                                {" "}
                                                {item?.image && (
                                                  <Image
                                                    style={{
                                                      objectFit: "cover",
                                                    }}
                                                    src={item?.image}
                                                    width={40}
                                                    height={40}
                                                    alt={"img"}
                                                  />
                                                )}
                                              </Avatar>
                                            )}
                                          </Fab>{" "}
                                          <LightTooltip
                                            arrow
                                            placement="top"
                                            title={item?.name}
                                            disableInteractive
                                          >
                                            <ProUserName>
                                              {item?.name}
                                            </ProUserName>
                                          </LightTooltip>
                                        </>
                                      ) : (
                                        <>
                                          {
                                            <>
                                              <ImageuploadIconField
                                                style={{ left: "0px" }}
                                              >
                                                <div>
                                                  <FloatingIconfield>
                                                    <ImageCropper
                                                      sx={{
                                                        height: "20px",
                                                        width: "20px",
                                                        left: "20px",
                                                        bottom: "-10px",
                                                      }}
                                                      deleteImages={() =>
                                                        deleteUploadedImages(
                                                          item?.id,
                                                          index
                                                        )
                                                      }
                                                      type={"profile"}
                                                      endPoints={""}
                                                      params={""}
                                                      defaultImage={
                                                        formik?.values?.image
                                                      }
                                                      onChange={async (e) => {
                                                        let image =
                                                          await toBase64(e);
                                                        formik.setFieldValue(
                                                          "image",
                                                          image
                                                        );
                                                      }}
                                                    />
                                                  </FloatingIconfield>
                                                </div>
                                                <label htmlFor="contained-button-file">
                                                  <Fab
                                                    style={{
                                                      width: "40px",
                                                      height: "40px",
                                                    }}
                                                    component="span"
                                                  >
                                                    {index == editIndex ? (
                                                      <Avatar
                                                        alt="Remy Sharp"
                                                        sx={{
                                                          width: 40,
                                                          height: 40,
                                                          boxShadow: "none",
                                                        }}
                                                      >
                                                        {formik?.values
                                                          ?.image && (
                                                          <Image
                                                            style={{
                                                              borderRadius:
                                                                "50%",
                                                              objectFit:
                                                                "cover",
                                                            }}
                                                            src={
                                                              formik?.values
                                                                ?.image
                                                            }
                                                            height={40}
                                                            width={40}
                                                            alt="image"
                                                          />
                                                        )}
                                                      </Avatar>
                                                    ) : (
                                                      <AddPhotoAlternateIcon />
                                                    )}
                                                  </Fab>
                                                </label>
                                              </ImageuploadIconField>
                                              <ProUserName>
                                                {item?.name}
                                              </ProUserName>
                                            </>
                                          }
                                        </>
                                      )}
                                      {index !== editIndex && (
                                        <LightTooltip
                                          placement="top"
                                          title="Pin the account to directly chat with customer"
                                          arrow
                                          disableInteractive
                                          componentsProps={{
                                            tooltip: {
                                              sx: {
                                                fontSize: "12px",
                                                width: "200px",
                                                opacity: 1,
                                              },
                                            },
                                          }}
                                        >
                                          <SwitchButtons
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleClick(item);
                                            }}
                                            name="is_chat_active"
                                            checked={
                                              item.is_chat_active === "1"
                                            }
                                            value={item.is_chat_active}
                                          />
                                        </LightTooltip>
                                      )}
                                      {index == editIndex && (
                                        <LightTooltip
                                          title="Pin the account to directly chat with customer"
                                          arrow
                                          disableInteractive
                                          componentsProps={{
                                            tooltip: {
                                              sx: {
                                                fontSize: "12px",
                                                width: "200px",
                                                opacity: 1,
                                              },
                                            },
                                          }}
                                        >
                                          <SwitchButtons
                                            onClick={(e) => e.stopPropagation()}
                                            checked={
                                              formik.values.is_chat_active
                                            }
                                            value={formik.values.is_chat_active}
                                            onChange={(e) => {
                                              e.stopPropagation();
                                              formik.setFieldValue(
                                                "is_chat_active",
                                                e.target.checked
                                              );
                                            }}
                                          />
                                        </LightTooltip>
                                      )}
                                    </PersonNameCont>
                                  </LeftContentContainer>

                                  <RightContentContainer>
                                    {index !== editIndex ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          position: "relative",
                                          right: "18px",
                                        }}
                                      >
                                        <PencilIcon2>
                                          <LightTooltip
                                            title="Edit"
                                            arrow
                                            placement="top"
                                            disableInteractive
                                          >
                                            <Image
                                              height={12}
                                              width={12}
                                              style={{
                                                fontSize: "15px",
                                                cursor: "pointer",
                                              }}
                                              src={"/assets/EditPencil.svg"}
                                              alt="editImage"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setMore(false);
                                                setEditIndex(index),
                                                  SetEditValue(item);
                                              }}
                                            />
                                          </LightTooltip>
                                        </PencilIcon2>
                                        <LightTooltip
                                          title="Delete"
                                          arrow
                                          placement="top"
                                          disableInteractive
                                        >
                                          <DeleteButtonLink
                                            sx={IconsStyle}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setMore(false);
                                              setDeleteID(item.id);
                                              setDeleteConfirmation(true);
                                            }}
                                          />
                                        </LightTooltip>
                                      </div>
                                    ) : (
                                      <>
                                        <SectionFooterBtnContainer>
                                          <FloatingEditIcon
                                            style={{
                                              display: "flex",
                                              justifyContent: "flex-end",
                                              alignItems: "center",
                                              gap: "2px",
                                            }}
                                          >
                                            <CancelLink
                                              sx={{
                                                "@media screen and (max-width:320px)":
                                                  {
                                                    fontSize: "12px !important",
                                                  },
                                              }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setButtonLoader(false);
                                                setEditIndex(-1);
                                                setMore(false);
                                                formik.resetForm();
                                              }}
                                            >
                                              <LightTooltip
                                                title="Cancel"
                                                arrow
                                                placement="top"
                                              >
                                                <CloseIcon
                                                  sx={{
                                                    "@media screen and (max-width:320px)":
                                                      {
                                                        fontSize:
                                                          "16px !important",
                                                      },
                                                  }}
                                                />
                                              </LightTooltip>
                                            </CancelLink>

                                            {buttonLoader ? (
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
                                              <SaveLink
                                                sx={{
                                                  "@media screen and (max-width:320px)":
                                                    {
                                                      fontSize:
                                                        "12px !important",
                                                    },
                                                }}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  SaveEditValues(index);
                                                }}
                                              >
                                                <LightTooltip
                                                  title="Save"
                                                  arrow
                                                  placement="top"
                                                >
                                                  <SaveOutlinedIcon
                                                    sx={{
                                                      "@media screen and (max-width:320px)":
                                                        {
                                                          fontSize:
                                                            "16px !important",
                                                        },
                                                    }}
                                                  />
                                                </LightTooltip>
                                              </SaveLink>
                                            )}
                                          </FloatingEditIcon>
                                        </SectionFooterBtnContainer>
                                      </>
                                    )}
                                  </RightContentContainer>
                                </ContentHeaderContainer>

                                <Divider variant="middle" />
                                <FieldContainerAddContact
                                  sx={{ padding: "8px 0px 8px 0px" }}
                                >
                                  <LabelContainerAddContact>
                                    Full Name
                                  </LabelContainerAddContact>
                                  {index !== editIndex ? (
                                    <ValueContainerAddContact>
                                      {item.name}
                                    </ValueContainerAddContact>
                                  ) : (
                                    <ValueContainerAddContact>
                                      <TextField
                                        name="name"
                                        placeholder="Add Full Name here..."
                                        size="small"
                                        autoComplete="new-password"
                                        fullWidth
                                        value={formik.values.name}
                                        onChange={(e) => {
                                          const newValue = e.target.value;
                                          if (newValue.length <= 50) {
                                            if (
                                              !newValue.startsWith(" ") ||
                                              newValue.trim().length > 0
                                            ) {
                                              formik.setFieldValue(
                                                "name",
                                                newValue
                                              );
                                              formik.setFieldError("name", "");
                                            }
                                          } else {
                                            navigator.clipboard
                                              .writeText(newValue)
                                              .then(() => {
                                                formik.setFieldValue(
                                                  "name",
                                                  newValue.slice(0, 50)
                                                );
                                                formik.setFieldError(
                                                  "name",
                                                  "Limit exceeded"
                                                );
                                              })
                                              .catch((error) => {});
                                          }
                                        }}
                                        helperText={formik.errors.name}
                                        error={
                                          formik.errors.name ? true : false
                                        }
                                      />
                                    </ValueContainerAddContact>
                                  )}
                                </FieldContainerAddContact>

                                <Divider variant="middle" />

                                <FieldContainerAddContact
                                  sx={{ padding: "8px 0px 8px 0px" }}
                                >
                                  <LabelContainerAddContact>
                                    Email
                                  </LabelContainerAddContact>
                                  {index !== editIndex ? (
                                    <ValueContainerAddContact
                                      sx={{ wordBreak: "break-word" }}
                                    >
                                      {item.email}
                                    </ValueContainerAddContact>
                                  ) : (
                                    <ValueContainerAddContact>
                                      {index == editIndex && (
                                        <FormControl sx={{ width: "100%" }}>
                                          <TextField
                                            name="email"
                                            fullWidth
                                            placeholder="Add Email here..."
                                            size="small"
                                            value={formik.values.email}
                                            onChange={(e) => {
                                              const inputValue = e.target.value;
                                              const sanitizedValue =
                                                inputValue.replace(/\s/g, "");
                                              const truncatedValue =
                                                sanitizedValue.slice(0, 90);

                                              if (inputValue.length > 90) {
                                                formik.setFieldValue(
                                                  "email",
                                                  truncatedValue.toLowerCase()
                                                );
                                                formik.setFieldError(
                                                  "email",
                                                  "Maximum 90 characters allowed"
                                                );
                                              } else {
                                                formik.setFieldValue(
                                                  "email",
                                                  truncatedValue.toLowerCase()
                                                );
                                                formik.setFieldError(
                                                  "email",
                                                  ""
                                                );
                                              }
                                            }}
                                            helperText={formik.errors.email}
                                            error={
                                              formik.errors.email ? true : false
                                            }
                                          />
                                        </FormControl>
                                      )}
                                    </ValueContainerAddContact>
                                  )}
                                </FieldContainerAddContact>

                                <Divider variant="middle" />

                                <FieldContainerAddContact
                                  sx={{ padding: "8px 0px 8px 0px" }}
                                >
                                  <LabelContainerAddContact>
                                    Designation
                                  </LabelContainerAddContact>

                                  {index !== editIndex ? (
                                    <ValueContainerAddContact>
                                      {convertUnderscoreToSpaceAndCapitalize(
                                        item.designation
                                      )}
                                    </ValueContainerAddContact>
                                  ) : (
                                    <ValueContainerAddContact justifyContent="flex-start">
                                      <FormControl sx={{ width: "100%" }}>
                                        <Autocomplete
                                          size="small"
                                          className={"autoComplete-container"}
                                          onInputChange={(
                                            e: any,
                                            value: string
                                          ) => {
                                            // Trim the value and remove leading spaces
                                            const trimmedValue = value.replace(
                                              /^\s+/,
                                              ""
                                            );
                                            formik.setFieldValue(
                                              "designation",
                                              trimmedValue
                                            );
                                            if (trimmedValue !== value) {
                                              // This resets the input if leading spaces were removed
                                              e.target.value = trimmedValue;
                                            }
                                            formik.setFieldError(
                                              "designation",
                                              ""
                                            );
                                          }}
                                          onChange={(e, newValue) => {
                                            // Trim the value and remove leading spaces
                                            const trimmedValue = newValue
                                              ? newValue.trimStart()
                                              : "";
                                            formik.setFieldValue(
                                              "designation",
                                              trimmedValue
                                            );
                                            formik.setFieldError(
                                              "designation",
                                              ""
                                            );
                                          }}
                                          id="free-solo-demo"
                                          freeSolo
                                          value={formik.values.designation}
                                          options={capitalizedRoles}
                                          renderInput={(params) => (
                                            <>
                                              <TextField
                                                {...params}
                                                autoComplete="new-password"
                                                size="small"
                                                name="designation"
                                                placeholder="Enter/select Designation"
                                                helperText={
                                                  formik.errors.designation
                                                }
                                                error={
                                                  formik.errors.designation
                                                    ? true
                                                    : false
                                                }
                                                onBlur={(e) => {
                                                  const trimmedValue =
                                                    e.target.value.trimStart();
                                                  formik.setFieldValue(
                                                    "designation",
                                                    trimmedValue
                                                  );
                                                }}
                                                inputProps={{
                                                  ...params.inputProps,
                                                  onInput: (e: any) => {
                                                    e.target.value =
                                                      e.target.value.replace(
                                                        /^\s+/,
                                                        ""
                                                      );
                                                  },
                                                }}
                                              />
                                            </>
                                          )}
                                        />
                                      </FormControl>
                                    </ValueContainerAddContact>
                                  )}
                                </FieldContainerAddContact>
                                <Divider variant="middle" />
                                <FieldContainerAddContact
                                  sx={{ padding: "8px 0px 8px 0px" }}
                                >
                                  <LabelContainerAddContact>
                                    Mobile No.
                                  </LabelContainerAddContact>
                                  {index !== editIndex ? (
                                    <ValueContainerAddContact>
                                      <MobileWithFlag
                                        // country_code={item?.mobile_country_code}
                                        mobile_code={item?.code}
                                        number={item.mobile}
                                      />
                                    </ValueContainerAddContact>
                                  ) : (
                                    <ValueContainerAddContact justifyContent="flex-start">
                                      {index == editIndex && (
                                        <FormControl sx={{ width: "100%" }}>
                                          <MobileInputCommon
                                            mobileNumber={
                                              formik?.values?.mobile
                                            }
                                            mobileCode={formik?.values?.code}
                                            countryCode={
                                              formik?.values
                                                ?.mobile_country_code
                                            }
                                            handleChange={(
                                              phone,
                                              mobile_code,
                                              country_code,
                                              isValid
                                            ) =>
                                              setMobileNumber(
                                                phone,
                                                mobile_code,
                                                country_code,
                                                isValid
                                              )
                                            }
                                            helperText={formik?.errors.mobile}
                                            error={
                                              formik?.errors.mobile
                                                ? true
                                                : false
                                            }
                                          />
                                        </FormControl>
                                      )}
                                    </ValueContainerAddContact>
                                  )}
                                </FieldContainerAddContact>
                              </FormControl>
                            </Grid>
                          </SectionInnerContent>
                        </SelectedContainer>
                      </Grid>
                    ))
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: "55%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {
                        <EmptyPage
                          logo="/assets/contactperson.svg"
                          onClickHandler={() => setMore(true)}
                          text={"contacts"}
                        />
                      }
                    </div>
                  )}
                </Grid>
              </SectionOuterContainer>

              {/* // ADD MORE */}
              {addMore && (
                <AddMoreDetails dataLength={contactsList} sx={{}}>
                  <FormControlData>
                    <ContentContainer className="add_contactperson">
                      <Box
                        sx={{
                          height: contactsList.length > 3 ? "auto" : "220px",
                          overflow: "auto",
                        }}
                      >
                        <ContentHeaderContainer>
                          <LeftContentContainer flex={1}>
                            <PersonNameCont>
                              <ImageuploadIconField style={{ left: "0px" }}>
                                <FloatingIconfield>
                                  <ImageCropper
                                    sx={{
                                      height: "20px",
                                      width: "20px",
                                      bottom: "-18px",
                                      left: "8px",
                                    }}
                                    deleteImages={""}
                                    type={"profile"}
                                    endPoints={""}
                                    params={""}
                                    defaultImage={""}
                                    onChange={async (e) => {
                                      let image = await toBase64(e);
                                      formik.setFieldValue("image", image);
                                    }}
                                  />
                                </FloatingIconfield>

                                <label htmlFor="contained-button-file">
                                  <Fab
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      boxShadow: "none",
                                      backgroundColor: "transparent",
                                    }}
                                    component="span"
                                  >
                                    {formik?.values?.image ? (
                                      <Avatar alt="Remy Sharp" sx={{}}>
                                        {formik?.values?.image && (
                                          <Image
                                            src={formik?.values?.image}
                                            height={50}
                                            width={50}
                                            alt="image"
                                          />
                                        )}
                                      </Avatar>
                                    ) : (
                                      <Image
                                        src={`${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png`}
                                        width={40}
                                        height={40}
                                        alt=""
                                        style={{ borderRadius: "70%" }}
                                      />
                                    )}
                                  </Fab>
                                </label>
                              </ImageuploadIconField>
                            </PersonNameCont>
                          </LeftContentContainer>
                        </ContentHeaderContainer>
                        <Divider variant="middle" />
                        <FieldContainerAddContact>
                          <LabelContainerAddContact>
                            Full Name <div style={{ color: "#d7282f" }}>*</div>
                          </LabelContainerAddContact>
                          <ValueContainerAddContact
                            sx={{ padding: "8px 0 8px 0" }}
                          >
                            <TextField
                              name="name"
                              placeholder="Enter full name"
                              size="small"
                              autoComplete="new-password"
                              fullWidth
                              value={formik.values.name}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue.length <= 100) {
                                  if (
                                    !newValue.startsWith(" ") ||
                                    newValue.trim().length > 0
                                  ) {
                                    formik.setFieldValue("name", newValue);
                                    formik.setFieldError("name", "");
                                  }
                                } else {
                                  navigator.clipboard
                                    .writeText(newValue)
                                    .then(() => {
                                      formik.setFieldValue(
                                        "name",
                                        newValue.slice(0, 100)
                                      );
                                      formik.setFieldError(
                                        "name",
                                        "Limit exceeded"
                                      );
                                    })
                                    .catch((error) => {});
                                }
                              }}
                              helperText={formik.errors.name}
                              error={formik.errors.name ? true : false}
                              inputRef={nameRef}
                            />
                          </ValueContainerAddContact>
                        </FieldContainerAddContact>
                        <Divider variant="middle" />
                        <FieldContainerAddContact>
                          <LabelContainerAddContact>
                            Email<div style={{ color: "#d7282f" }}>*</div>
                          </LabelContainerAddContact>

                          <ValueContainerAddContact
                            sx={{ padding: "8px 0 8px 0" }}
                          >
                            <TextField
                              fullWidth
                              size="small"
                              name="email"
                              value={formik.values.email}
                              placeholder="Enter email"
                              onChange={(e) => {
                                handleEmailChange(e);
                                formik.setFieldValue(
                                  "email",
                                  e.target.value?.toLowerCase()
                                );
                              }}
                              helperText={formik.errors.email}
                              error={formik.errors.email ? true : false}
                              InputLabelProps={{ style: { fontSize: "14px" } }}
                              inputProps={{
                                autoComplete: "off",
                              }}
                              inputRef={emailInputRef}
                            />
                          </ValueContainerAddContact>
                        </FieldContainerAddContact>
                        <Divider variant="middle" />
                        <FieldContainerAddContact>
                          <LabelContainerAddContact>
                            Designation<div style={{ color: "#d7282f" }}>*</div>
                          </LabelContainerAddContact>
                          <ValueContainerAddContact
                            sx={{ padding: "8px 0 8px 0" }}
                          >
                            <FormControl sx={{ width: "100%" }}>
                              <Autocomplete
                                size="small"
                                className={"autoComplete-container"}
                                onInputChange={(e: any, value: string) => {
                                  const trimmedValue = value.replace(
                                    /^\s+/,
                                    ""
                                  );
                                  formik.setFieldValue(
                                    "designation",
                                    trimmedValue
                                  );

                                  formik.setFieldError("designation", "");
                                }}
                                onChange={(e, newValue) => {
                                  const trimmedValue = newValue
                                    ? newValue.trimStart()
                                    : "";
                                  formik.setFieldValue(
                                    "designation",
                                    trimmedValue
                                  );
                                  formik.setFieldError("designation", "");
                                }}
                                id="free-solo-demo"
                                freeSolo
                                value={formik.values.designation}
                                options={capitalizedRoles}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    autoComplete="new-password"
                                    size="small"
                                    name="designation"
                                    placeholder="Enter/select Designation"
                                    helperText={formik.errors.designation}
                                    error={Boolean(formik.errors.designation)}
                                    inputProps={{
                                      ...params.inputProps,
                                      onInput: (e: any) => {
                                        e.target.value = e.target.value.replace(
                                          /^\s+/,
                                          ""
                                        );
                                      },
                                    }}
                                    inputRef={DesignationRef}
                                  />
                                )}
                              />
                            </FormControl>
                          </ValueContainerAddContact>
                        </FieldContainerAddContact>
                        <Divider variant="middle" />
                        <FieldContainerAddContact>
                          <LabelContainerAddContact>
                            Mobile No.<div style={{ color: "#d7282f" }}>*</div>
                          </LabelContainerAddContact>
                          <ValueContainerAddContact
                            sx={{ padding: "8px 0 8px 0" }}
                          >
                            <FormControl
                              sx={{
                                width: "100%",
                                "@media screen and (max-width:900px)": {
                                  width: "100%",
                                },
                              }}
                            >
                              <MobileInputCommon
                                mobileNumber={formik?.values?.mobile}
                                mobileCode={formik?.values?.code}
                                countryCode={
                                  formik?.values?.mobile_country_code
                                }
                                handleChange={(
                                  phone,
                                  mobile_code,
                                  country_code,
                                  isValid
                                ) =>
                                  setMobileNumber(
                                    phone,
                                    mobile_code,
                                    country_code,
                                    isValid
                                  )
                                }
                                helperText={formik?.errors.mobile}
                                error={formik?.errors.mobile ? true : false}
                                inputRef={mobileRef}
                                contactpersonPHN
                              />
                            </FormControl>
                          </ValueContainerAddContact>
                        </FieldContainerAddContact>
                      </Box>
                      <ButtonContainer
                        style={{ margin: "0", padding: "7px 0" }}
                      >
                        <BlackCancelButton
                          onClick={() => {
                            setButtonLoader(false);
                            setMore(false);
                            formik.resetForm();
                          }}
                        >
                          Cancel
                        </BlackCancelButton>
                        <RedSaveButton
                          onClick={handleSave}
                          disabled={buttonLoader}
                        >
                          {buttonLoader ? (
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
                    </ContentContainer>
                  </FormControlData>
                </AddMoreDetails>
              )}
            </>
          )}
        </>
      </OuterContainer>
    </>
  );
};
export default ContactPersonDetail;
