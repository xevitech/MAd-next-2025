import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  Grid,
  Modal,
  Skeleton,
  Slider,
  styled,
  Typography,
} from "@mui/material";
import { MyAppContext } from "contextApi/appContext";
import Auth from "@/auth/Auth";
import { toast } from "react-toastify";
import { EditMobile } from "@/components/profile/personalProfile/personalProfileModals/editMobile";
import { EditEmail } from "@/components/profile/personalProfile/personalProfileModals/editEmail";
import { VerifyEmail } from "@/components/profile/personalProfile/personalProfileModals/verifyEmail";
import { ChangePassword } from "@/components/profile/personalProfile/personalProfileModals/changePassword";
import { SocialMedia } from "@/components/profile/personalProfile/personalProfileModals/socialMediaAccounts";
import { JobDetails } from "@/components/profile/personalProfile/jobDetails";
import { BasicDetails } from "@/components/profile/personalProfile/basicDetails";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Image from "next/image";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { BASE_URL, LOCAL_PUBLIC_URL } from "@/utils/staticValues";
import {
  Header,
  ImageAndHeadingContainer,
  ImageContainer,
  ProfileImage,
  HeadingContainer,
  HeadingText,
  CardContenLightText,
  SectionContainer,
  SectionHeader,
  IconAndTextContainer,
  SectionHeaderText,
  SectionSubHeaderContainer,
  SectionSubHeaderText,
  FieldsContainer,
  CustomisedInputField,
  FieldLabel,
  EditText,
  EditIconContainer,
  MobileContainer,
  PasswordField,
  DotsOuterContainer,
  DotContainer,
  Card,
  CardContent,
  CardHeader,
  ChipCustom,
  MemberId,
  CardHeaderTextProfile,
  GridPersonalProfile,
  ButtonChangePwd,
  UserEmail,
  BoxLabelCcontainer,
  BoxIconCcontainer,
} from "@/components/profile/personalProfile/styles";
import { ProfileHeader } from "@/components/common/profileheader";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import {
  profileData,
  setCompleteScreenLoading,
  setLoginViaSocial,
  setOpenLogoutModal,
  setPersonalProfileImage,
  setPlanDetails,
  setShowConfirmEmailModal,
  setShowEditEmailModal,
  setShowEditMobileModal,
  setShowVerifyMobileModal,
  setSocialAccountFocused,
} from "@/hooks/appReducers";
import ImageCropper from "@/components/common/ImageCropper";
import { apiClient } from "@/components/common/common";
import MobileWithFlag from "@/components/common/numberwithflag";
import moment from "moment";
import { HelpDesk } from "@/components/CompanySettings/CompanyDetail/ContactPersonDetail/style";
import SocialMediaContact from "@/components/CompanySettings/CompanyDetail/SocialAccounts";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { getOrientation } from "get-orientation/browser";
import {
  getCroppedImg,
  getRotatedImage,
} from "@/components/common/ImageCropper/CanvsUtlis";
import { ThreeDots } from "react-loader-spinner";

import {
  Controls,
  CropContainer,
  SliderContainer,
} from "@/components/common/ImageCropper/style";
import Cropper from "react-easy-crop";
import { getCompanyProfile } from "@/hooks/company";
import { BasicDetailsSubUser } from "./basicDetails/BasicDetailsSubUser";
import { removeMobileVerficiationFromCookie } from "@/utils/cookieUtils";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 5,
  marginTop: "6px",

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },

  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
const PersonalProfile = () => {
  const {
    breakPoints,
    setProfileImage,
    setUserName,
    setverifieduser,
    setCompleteScreenLoader,
  } = useContext(MyAppContext);
  const dispatch = useAppDispatch();
  const {
    userprofileImage,
    userName,
    mobileverified,
    mobileCode,
    userEmail,
    memberid,
    mobileNumber,
    emailVerified,
    profilePercentage,
    profileInfos,
    memberJoined,
    pendingFields,
    mobile_country_code,
    showConfirmEmailModal,
    showEditEmailModal,
    showEditMobileModal,
    role,
  } = useSelector((state: any) => state.userData);
  const [basicDetailsMode, setBasicDetailsMode] = useState<"view" | "edit">(
    "view"
  );
  const [loader, setLoader] = useState<boolean>(false);
  const endPoints = "profile/updateProfile";
  const params = "profile";
  const SaveImage = async (Image: any) => {
    if (endPoints) {
      let formData = new FormData();
      formData.append(params, Image);
      let response = await apiClient(
        endPoints,
        "post",
        {
          body: formData,
        },
        true
      );
      if (response.status == 200) {
        if (endPoints) dispatch(profileData());
        if (endPoints) dispatch(getCompanyProfile());
        closeModal();
      }
      setLoader(false);
    } else {
      // onChange(Image);
      if (endPoints) dispatch(profileData());
      if (endPoints) dispatch(getCompanyProfile());
      closeModal();
      setLoader(false);
    }
  };
  const showCroppedImage = async () => {
    setLoader(true);
    try {
      const croppedImage: any = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      fetch(croppedImage, {
        headers: { "access-control-allow-origin": "*" },
      })
        .then((res) => res.blob())
        .then((res) => SaveImage(res));
    } catch (e) {
      toast.error("Something went wrong!");
      setLoader(false);
    }
  };
  const [jobDetailsMode, setJobDetailsMode] = useState<"view" | "edit">("view");
  // const [showConfirmEmailModal, setShowConfirmEmailModal] = useState(false);
  // const [showEditEmailModal, setShowEditEmailModal] = useState(false);
  // const [showEditMobileModal, setShowEditMobileModal] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);
  const [weChatId, setWeChatId] = useState("_");
  const [skypeId, setSkypeId] = useState("_");
  const [whatsAppId, setWhatsAppId] = useState("_");
  const [editBasicDetails, setEditBasicDetail] = useState<boolean>(false);
  const [editJobDetails, setEditJobDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const [
    showSocialMediaAccountsEditModal,
    setShowSocialMediaAccountsEditModal,
  ] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const date = memberJoined;
  const formattedDate = moment(date).format("DD/MM/YYYY");
  const getProfileInfo = async (fullLodaer = true) => {
    if (fullLodaer) dispatch(setCompleteScreenLoading(false));
    const response = await fetch(`${BASE_URL}/profile/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
    });
    const data = await response.json();
    setCompleteScreenLoader(false);
    dispatch(setOpenLogoutModal(false));
    dispatch(setPersonalProfileImage(data?.data?.avatar_original));
    dispatch(setPlanDetails(data?.data));
    setWeChatId((prev) => data?.data?.social_wechat);
    setSkypeId((prev) => data.data?.social_skype);
    setWhatsAppId((prev) => data?.data?.social_whatsapp);
    setProfileImage((prev) => data?.data?.avatar_original);
    setUserName((prev) => data?.data?.full_name);
    setverifieduser((prev) => data?.data?.role);
  };

  const updateProfile = async (payload) => {
    let promise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/profile/updateProfile`, {
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        toast.success(data?.message);
        setLoading(false);
        getProfileInfo(false);
        return resolve(response);
      } catch (error) {
        setLoading(false);
        toast.error("something went wrong!");
        return reject(false);
      }
    });
    return promise;
  };

  const closeModals = () => {
    dispatch(setShowEditMobileModal(false));
    dispatch(setShowConfirmEmailModal(false));
    dispatch(setShowEditEmailModal(false));
    // setShowEditEmailModal(false);
    setShowEditPasswordModal(false);
    setShowSocialMediaAccountsEditModal(false);
  };

  const resetModes = () => {
    setJobDetailsMode((prev) => "view");
    setBasicDetailsMode((prev) => "view");
  };
  const [clickedImage, setClickedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = (imageSrc) => {
    setClickedImage(imageSrc);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setRotation(0);
    setZoom(1);
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const DeleteImage = async (type) => {
    let formData = new FormData();
    formData.append("type", "profile");
    let response = await apiClient(
      "profile/delete_images",
      "post",
      { body: formData },
      true
    );
    return response;
  };
  const ORIENTATION_TO_ANGLE = {
    3: 180,
    6: 90,
    8: -90,
  };
  const scrollToSection = (item) => {
    const sanitizedItem = item.replace(/\s+/g, "");
    const element = document.getElementById(sanitizedItem);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (item === "Job Detail") {
      setEditJobDetail(true);
    }
  };
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const DeleteHandler = async (type: any) => {
    setDeleteLoader(true);
    DeleteImage(type);
    dispatch(profileData());
    dispatch(getCompanyProfile());
    setDeleteLoader(false);
    closeModal();
  };
  const [editDefaultImage, setEditDefaultImage] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState<number>(1);
  const defaultImage = userprofileImage;

  function importData(edit = false) {
    if (defaultImage && !edit) {
      setImageSrc(defaultImage);
      setEditDefaultImage(true);
      return;
    }
    let input = document.createElement("input");
    input.type = "file";
    (input.accept = "image/png, image/jpeg"),
      (input.onchange = (_) => {
        setEditDefaultImage(false);
        let files = Array.from(input.files);
        setCrop({ x: 0, y: 0 });
        setRotation(0);
        setZoom(1);
        onFileChange(files);
      });
    input.click();
  }
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }
  const setImageName = (name: any) => {};
  const onFileChange = async (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should not exceed 2MB");
        return;
      }
      if (setImageName != (() => {})) setImageName(file?.name);
      let imageDataUrl = await readFile(file);
      try {
        const orientation = await getOrientation(file);
        const rotation = ORIENTATION_TO_ANGLE[orientation];
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        }
      } catch (e) {}

      setImageSrc(imageDataUrl);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "auto",
    bgcolor: "background.paper",
    border: "0px solid #000",
    padding: "40px 0px 0px 0px",
    "@media screen and (max-width:767px)": {
      width: "90%",
      height: "auto",
    },
  };

  return (
    <>
      <SocialMedia
        getProfile={getProfileInfo}
        wechatid={weChatId}
        skypeid={skypeId}
        whatsappid={whatsAppId}
        handleWhatsAppChange={setWhatsAppId}
        handleSkypeChange={setSkypeId}
        handleWeChatChange={setWeChatId}
        open={showSocialMediaAccountsEditModal}
        closeModal={closeModals}
      />
      <ChangePassword
        getProfile={getProfileInfo}
        email={userEmail}
        open={showEditPasswordModal}
        closeModal={closeModals}
      />
      <VerifyEmail
        open={showConfirmEmailModal}
        closeModal={closeModals}
        emailId={userEmail}
        getProfile={getProfileInfo}
      />
      <EditEmail
        getProfile={getProfileInfo}
        open={showEditEmailModal}
        closeModal={closeModals}
      />
      {showEditMobileModal && (
        <EditMobile
          mobileNumber={mobileNumber}
          countryCode={mobile_country_code}
          mobileCode={mobileCode?.replace("+", "")}
          getProfile={getProfileInfo}
          open={showEditMobileModal}
          closeModal={closeModals}
          emailId={userEmail}
        />
      )}
      {imageSrc && (
        <Modal
          open={true}
          onClose={closeModal}
          aria-labelledby="modal-modal-title1"
          aria-describedby="modal-modal-description1"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ marginTop: "-30px", padding: "0px 0px 10px 20px" }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "600", color: "#231f20" }}
                >
                  {defaultImage ===
                  `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png`
                    ? "Add Photo"
                    : "Change Photo"}
                </Typography>
              </Box>
              <Box sx={{ marginTop: "-30px", padding: "0px 20px 0px 20px" }}>
                <CloseOutlinedIcon
                  sx={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => closeModal()}
                />
              </Box>
            </Box>
            <CropContainer>
              {editDefaultImage ? (
                <img
                  src={defaultImage}
                  alt="gfg"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <>
                  <Cropper
                    cropShape={"round"}
                    aspect={3 / 3}
                    restrictPosition={false}
                    image={imageSrc}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    onCropChange={setCrop}
                    showGrid={false}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropSize={{ width: 400, height: 400 }}
                  />
                </>
              )}
            </CropContainer>
            {!editDefaultImage && (
              <Controls>
                <SliderContainer>
                  <Typography
                    variant="overline"
                    sx={{
                      "@media screen and (max-width:480px)": {
                        minWidth: 65,
                      },
                    }}
                  >
                    Zoom
                  </Typography>

                  <RemoveOutlinedIcon
                    onClick={() =>
                      setZoom((prev) => (prev < 1 ? prev : prev - 0.1))
                    }
                  />
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.2}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom: any) => setZoom(zoom)}
                    sx={{
                      padding: "22px 0px",
                      color: "#545454",
                      "@media screen and (max-width:600px)": {
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    }}
                  />
                  <AddOutlinedIcon
                    onClick={() =>
                      setZoom((prev) => (prev < 3 ? prev + 0.1 : prev))
                    }
                  />
                </SliderContainer>
                <SliderContainer>
                  <Typography
                    variant="overline"
                    sx={{
                      "@media screen and (max-width:480px)": {
                        minWidth: 65,
                      },
                    }}
                  >
                    Rotation
                  </Typography>
                  <RemoveOutlinedIcon
                    onClick={() =>
                      setRotation((prev) => (prev <= 10 ? 0 : prev - 10))
                    }
                  />
                  <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    onChange={(e, rotation: any) => setRotation(rotation)}
                    sx={{
                      padding: "22px 0px",
                      color: "#545454",
                      "@media screen and (max-width:600px)": {
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    }}
                  />
                  <AddOutlinedIcon
                    onClick={() =>
                      setRotation((prev) => (prev >= 350 ? 360 : prev + 10))
                    }
                  />
                </SliderContainer>
              </Controls>
            )}
            <Divider />
            {!editDefaultImage && (
              <Box
                display="flex"
                justifyContent="space-between"
                padding={"8px 16px"}
                sx={{
                  "@media screen and (max-width:360px)": {
                    display: "grid",
                    justifyContent: "center",
                  },
                }}
              >
                <input type="file" accept="image/*" alt="gg" />
                <Button
                  onClick={() => {
                    importData(true);
                  }}
                  sx={{
                    fontSize: "11px",
                    height: "30px",
                    color: "#d7282f",
                    border: "1px solid #d7282f",
                    transition: "all ease 0.5s",
                    "&:hover": {
                      backgroundColor: "#d7282f",
                      color: "#fff",
                      transition: "all ease 0.5s",
                    },
                  }}
                >
                  {defaultImage ==
                  `${LOCAL_PUBLIC_URL}/assets/img/logo_default.png`
                    ? "Change Photo"
                    : "Change Photo"}
                </Button>

                <Button
                  onClick={showCroppedImage}
                  sx={{
                    fontSize: "11px",
                    height: "30px",
                    backgroundColor: "#d7282f",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#d7282f",
                      color: "#fff",
                    },
                    "@media screen and (max-width:360px)": {
                      marginTop: "12px",
                    },
                  }}
                >
                  {loader ? (
                    <ThreeDots
                      height="18"
                      width="40"
                      radius="9"
                      color="white"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Box>
            )}
            {editDefaultImage && (
              <Box
                display="flex"
                justifyContent="space-between"
                padding={"8px 16px"}
                sx={{
                  "@media screen and (max-width:360px)": {
                    justifyContent: "center",
                    display: "grid",
                  },
                }}
              >
                <Button
                  onClick={() => {
                    importData(true);
                  }}
                  sx={{
                    color: "#d7282f",
                    border: "1px solid #d7282f",
                    transition: "all ease 0.5s",
                    fontSize: "11px",
                    height: "30px",
                    "&:hover": {
                      backgroundColor: "#d7282f",
                      color: "#fff",
                      transition: "all ease 0.5s",
                    },
                  }}
                >
                  {defaultImage ===
                  `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png`
                    ? "Add Photo"
                    : "Change Photo"}
                </Button>
                {defaultImage ===
                `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png` ? (
                  ""
                ) : (
                  <Button
                    onClick={() => DeleteHandler("profile")}
                    sx={{
                      backgroundColor: "#d7282f",
                      color: "#fff",
                      fontSize: "11px",
                      height: "30px",
                      "&:hover": {
                        backgroundColor: "#d7282f",
                        color: "#fff",
                      },
                      "@media screen and (max-width:360px)": {
                        marginTop: "12px",
                      },
                    }}
                  >
                    {deleteLoader ? (
                      <ThreeDots
                        height="18"
                        width="40"
                        radius="9"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Modal>
      )}
      {role == "subuser" ? (
        <>
          <div className="full_page profile_pages">
            <Grid container xs={12}>
              <ProfileHeader text={"Personal Profile"} />
            </Grid>

            <Header breakPoints={breakPoints} sx={{ p: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5} sm={6}>
                  <ImageAndHeadingContainer breakPoints={breakPoints}>
                    <ImageContainer>
                      <ProfileImage
                        loading="lazy"
                        src={
                          userprofileImage
                            ? userprofileImage
                            : "/assets/default/defaultProfileImage.png"
                        }
                        style={{
                          cursor: userprofileImage ? "pointer" : "default",
                        }}
                        onClick={() =>
                          userprofileImage
                            ? handleImageClick(
                                userprofileImage
                                  ? userprofileImage
                                  : "/assets/default/defaultProfileImage.png"
                              )
                            : ""
                        }
                      />
                      <ImageCropper
                        deleteImages={DeleteImage}
                        type={"profile"}
                        endPoints={"profile/updateProfile"}
                        params={"profile"}
                        defaultImage={userprofileImage}
                      />
                    </ImageContainer>

                    <div>
                      {loading ? (
                        <Skeleton
                          animation="wave"
                          variant="text"
                          sx={{
                            margin: "-12px 0 0 0",
                            height: "31px",
                            width: "250px",
                          }}
                        />
                      ) : (
                        <HeadingContainer breakPoints={breakPoints}>
                          <HeadingText breakPoints={breakPoints}>
                            Welcome {capitalizeFirstLetter(userName)}
                          </HeadingText>
                        </HeadingContainer>
                      )}

                      {loading ? (
                        <Skeleton
                          animation="wave"
                          variant="text"
                          sx={{
                            margin: "0px 0 0 0",
                            height: "20.69px",
                            width: "150px",
                          }}
                        />
                      ) : (
                        <MemberId breakPoints={breakPoints}>
                          Member ID:{" "}
                          <span
                            style={{
                              fontSize: "13px",
                              lineHeight: "18px",
                              color: "#7B7979",
                            }}
                          >
                            {memberid}
                          </span>
                        </MemberId>
                      )}
                      {loading ? (
                        <Skeleton
                          animation="wave"
                          variant="text"
                          sx={{
                            margin: "0px 0 0 0",
                            height: "20.69px",
                            width: "190px",
                          }}
                        />
                      ) : (
                        <MemberId breakPoints={breakPoints}>
                          Member Since:{" "}
                          <span
                            style={{
                              fontSize: "13px",
                              lineHeight: "18px",
                              color: "#7B7979",
                            }}
                          >
                            {formattedDate}
                          </span>
                        </MemberId>
                      )}
                    </div>
                  </ImageAndHeadingContainer>
                </Grid>
              </Grid>
            </Header>
            <GridPersonalProfile
              container
              spacing={3}
              sx={{ marginTop: "2px" }}
            >
              <Grid item md={12} xs={12} id="section0">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box
                      className="grid_box basic_detail_box"
                      style={{ height: "100%" }}
                    >
                      <BasicDetailsSubUser
                        editBasicDetails={editBasicDetails}
                        setEditBasicDetail={setEditBasicDetail}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </GridPersonalProfile>
          </div>
        </>
      ) : (
        <div className="full_page profile_pages">
          <Grid container xs={12}>
            <ProfileHeader text={"Personal Profile"} />
          </Grid>

          <Header breakPoints={breakPoints} sx={{ p: 0 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5} sm={6}>
                <ImageAndHeadingContainer breakPoints={breakPoints}>
                  <ImageContainer>
                    <ProfileImage
                      loading="lazy"
                      src={
                        userprofileImage
                          ? userprofileImage
                          : "/assets/default/defaultProfileImage.png"
                      }
                      style={{
                        cursor: userprofileImage ? "pointer" : "default",
                      }}
                      onClick={() =>
                        userprofileImage
                          ? handleImageClick(
                              userprofileImage
                                ? userprofileImage
                                : "/assets/default/defaultProfileImage.png"
                            )
                          : ""
                      }
                    />
                    <ImageCropper
                      deleteImages={DeleteImage}
                      type={"profile"}
                      endPoints={"profile/updateProfile"}
                      params={"profile"}
                      defaultImage={userprofileImage}
                    />
                  </ImageContainer>

                  <div>
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{
                          margin: "-12px 0 0 0",
                          height: "31px",
                          width: "250px",
                        }}
                      />
                    ) : (
                      <HeadingContainer breakPoints={breakPoints}>
                        <HeadingText breakPoints={breakPoints}>
                          Welcome {capitalizeFirstLetter(userName)}
                        </HeadingText>
                      </HeadingContainer>
                    )}

                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{
                          margin: "0px 0 0 0",
                          height: "20.69px",
                          width: "150px",
                        }}
                      />
                    ) : (
                      <MemberId breakPoints={breakPoints}>
                        Member ID:{" "}
                        <span
                          style={{
                            fontSize: "13px",
                            lineHeight: "18px",
                            color: "#7B7979",
                          }}
                        >
                          {memberid}
                        </span>
                      </MemberId>
                    )}
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{
                          margin: "0px 0 0 0",
                          height: "20.69px",
                          width: "190px",
                        }}
                      />
                    ) : (
                      <MemberId breakPoints={breakPoints}>
                        Member Since:{" "}
                        <span
                          style={{
                            fontSize: "13px",
                            lineHeight: "18px",
                            color: "#7B7979",
                          }}
                        >
                          {formattedDate}
                        </span>
                      </MemberId>
                    )}
                  </div>
                </ImageAndHeadingContainer>
              </Grid>

              <Grid item xs={12} md={7} sm={6}>
                <Card breakPoints={breakPoints}>
                  <div>
                    <CardHeader>
                      <CardHeaderTextProfile breakPoints={breakPoints}>
                        {Number(profilePercentage) < 100
                          ? "Complete Personal Profile Information"
                          : "Personal Profile Completed"}
                      </CardHeaderTextProfile>
                      <p
                        style={{
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "18px",
                          color: "#7B7979",
                          display: "flex",
                          alignItems: "center",
                          margin: 0,
                        }}
                      ></p>
                    </CardHeader>
                    <CardContent>
                      <CardContenLightText>
                        User with complete profiles receive quicker responses to
                        inquiries.
                        <span
                          style={{
                            paddingLeft: "20px",
                            display: "inline-block",
                            fontWeight: "800",
                            opacity: 1,
                            fontSize: "16px",
                            lineHeight: "15px",
                            color: "#223354",
                            position: "absolute",
                            right: "10px",
                            top: "auto",
                            bottom: "-1rem",
                          }}
                        >
                          {Number(profilePercentage)}%
                        </span>
                      </CardContenLightText>
                      <Box sx={{ flexGrow: 1, transform: "translateY(-6px)" }}>
                        <br />
                        <BorderLinearProgress
                          variant="determinate"
                          value={Number(profilePercentage)}
                        />
                      </Box>
                      {pendingFields?.length > 0 && (
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#2f2f2f",
                            opacity: ".8",
                          }}
                        >
                          Following sections have incomplete information
                        </Typography>
                      )}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                          // paddingTop: "8px",
                        }}
                      >
                        {loading ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              flexWrap: "wrap",
                            }}
                          >
                            {[1, 2, 3, 4]?.map((value) => (
                              <Skeleton
                                animation="wave"
                                key={value}
                                variant="rounded"
                                width={"100px"}
                                height={"23px"}
                                sx={{ margin: "6px 0 0 0" }}
                              />
                            ))}
                          </Box>
                        ) : (
                          <>
                            {pendingFields?.map((item, index) => (
                              <ChipCustom
                                className={`${item}`}
                                key={item}
                                breakPoints={breakPoints}
                                onClick={() => {
                                  if (
                                    [
                                      "Country",
                                      "City",
                                      "Postal Code",
                                      "Gender",
                                    ].includes(item)
                                  ) {
                                    setEditBasicDetail(true);
                                  } else if (["Phone"].includes(item)) {
                                    setShowEditMobileModal(true);
                                  } else if (
                                    ["Profile Picture"].includes(item)
                                  ) {
                                    importData();
                                  } else if (item === "Social Account") {
                                    // Fixed here
                                    dispatch(setSocialAccountFocused(true));
                                    setTimeout(() => {
                                      dispatch(setSocialAccountFocused(false));
                                    }, 3000);
                                  } else {
                                    setEditJobDetail(true);
                                  }
                                  scrollToSection(item);
                                }}
                              >
                                Add {item}
                              </ChipCustom>
                            ))}

                            {mobileverified == false && mobileNumber && (
                              <ChipCustom
                                breakPoints={breakPoints}
                                onClick={() => {
                                  removeMobileVerficiationFromCookie();
                                  dispatch(setShowVerifyMobileModal(true));
                                }}
                              >
                                Verify Mobile
                              </ChipCustom>
                            )}
                          </>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Header>
          <GridPersonalProfile container spacing={3} sx={{ marginTop: "2px" }}>
            <Grid item md={6} xs={12} id="section0">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    className="grid_box basic_detail_box"
                    style={{ height: "100%" }}
                  >
                    <BasicDetails
                      editBasicDetails={editBasicDetails}
                      setEditBasicDetail={setEditBasicDetail}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Box className="grid_box" sx={{ height: "100%" }} mb={3}>
                    <SectionContainer
                      id="section1"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          minHeight: "141px",
                        },
                        "@media screen and (max-width:300px)": {
                          minHeight: "161px",
                        },
                      }}
                      breakPoints={breakPoints}
                    >
                      <SectionHeader>
                        <SectionHeaderText breakPoints={breakPoints}>
                          Security
                        </SectionHeaderText>
                        <SectionSubHeaderContainer>
                          {" "}
                          <SectionSubHeaderText>
                            {" "}
                            You can change your password here
                          </SectionSubHeaderText>
                        </SectionSubHeaderContainer>
                      </SectionHeader>
                      <FieldsContainer style={{ paddingTop: "5px" }}>
                        <PasswordField breakPoints={breakPoints}>
                          <DotsOuterContainer>
                            <DotContainer />
                            <DotContainer />
                            <DotContainer />
                            <DotContainer />
                            <DotContainer />
                            <DotContainer />
                            <DotContainer />
                          </DotsOuterContainer>
                          <ButtonChangePwd
                            onClick={() => {
                              setShowEditPasswordModal(true);
                            }}
                            color="error"
                            variant="outlined"
                          >
                            Change Password
                          </ButtonChangePwd>
                        </PasswordField>
                      </FieldsContainer>
                    </SectionContainer>
                  </Box>
                </Grid>
                <Grid item xs={12} id="section2">
                  <Box>
                    <SocialMediaContact componentType="personal-profile" />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} id="section2">
              <div className="grid_box" style={{ height: "100%" }}>
                <SectionContainer breakPoints={breakPoints}>
                  <SectionHeader>
                    <SectionHeaderText breakPoints={breakPoints}>
                      Contact Details
                    </SectionHeaderText>
                    <SectionSubHeaderContainer>
                      {" "}
                      <SectionSubHeaderText>
                        {" "}
                        Manage Details related to your associated accounts{" "}
                      </SectionSubHeaderText>
                    </SectionSubHeaderContainer>
                    <Box
                      sx={{
                        position: "absolute",
                        right: "-8px",
                        top: "10px",
                      }}
                    >
                      <HelpDesk>
                        <LightTooltip
                          title="Kindly get your credentials verified by adding active email and mobile number"
                          arrow
                          placement="top"
                        >
                          <ContactSupportIcon />
                        </LightTooltip>
                      </HelpDesk>
                    </Box>
                  </SectionHeader>

                  <FieldsContainer>
                    <Grid container columnSpacing={6}>
                      <Grid item xs={12} lg={6} className="gridBorder">
                        <CustomisedInputField
                          breakPoints={breakPoints}
                          position={{ last: true }}
                          rightContainer={{ rightContainer: true }}
                        >
                          <BoxLabelCcontainer>
                            <FieldLabel>Email:</FieldLabel>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <UserEmail style={{}}>{userEmail}</UserEmail>
                              {emailVerified ? (
                                <IconAndTextContainer
                                  verified={{ verified: true }}
                                  bgcolor={{ color: true }}
                                  transform={{ up: true }}
                                >
                                  <EditText
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "6px",
                                      margin: "0 0 0 14px",
                                    }}
                                  >
                                    Verified{" "}
                                    <VerifiedOutlinedIcon
                                      sx={{ fontSize: "18px" }}
                                    />{" "}
                                  </EditText>
                                </IconAndTextContainer>
                              ) : (
                                <IconAndTextContainer
                                  // sx={{ top: "31px !important" }}
                                  verified={{ verified: false }}
                                  bgcolor={{ color: true }}
                                  transform={{ up: true }}
                                  onClick={() =>
                                    dispatch(setShowConfirmEmailModal(true))
                                  }
                                >
                                  {userEmail ? (
                                    <EditText sx={{ margin: "0 0 0 14px" }}>
                                      Verify
                                    </EditText>
                                  ) : (
                                    ""
                                  )}
                                </IconAndTextContainer>
                              )}
                            </Box>
                          </BoxLabelCcontainer>

                          <BoxIconCcontainer>
                            <IconAndTextContainer
                              editIcon={{ editIcon: true }}
                              // sx={{
                              //   top: "15px !important",
                              //   "@media screen and (max-width:400px)": {
                              //     top: "30px !important",
                              //   },
                              // }}
                            >
                              <EditIconContainer>
                                <LightTooltip
                                  title="Edit"
                                  arrow
                                  placement="top"
                                >
                                  <Image
                                    onClick={() =>
                                      dispatch(setShowEditEmailModal(true))
                                    }
                                    src={"/assets/EditPencil.svg"}
                                    alt="edit"
                                    width={12}
                                    height={15}
                                  />
                                </LightTooltip>
                              </EditIconContainer>
                            </IconAndTextContainer>
                          </BoxIconCcontainer>
                        </CustomisedInputField>
                      </Grid>

                      <Grid item xs={12} lg={6}>
                        <CustomisedInputField
                          sx={{
                            "@media screen and (max-width:1199px)": {
                              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                              // margin: "-16px 0 0 0",
                            },
                          }}
                          breakPoints={breakPoints}
                          position={{ last: true }}
                          rightContainer={{ rightContainer: true }}
                        >
                          <BoxLabelCcontainer>
                            <FieldLabel>Mobile No.:</FieldLabel>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <MobileContainer
                                className="flagspacing"
                                sx={{
                                  "@media screen and (max-width: 400px)": {
                                    marginTop: "0px",
                                  },
                                }}
                              >
                                {mobileCode && mobileNumber ? (
                                  <span>
                                    <MobileWithFlag
                                      mobile_code={mobileCode}
                                      number={mobileNumber}
                                      country_code={mobile_country_code}
                                    />
                                  </span>
                                ) : (
                                  "NA"
                                )}
                              </MobileContainer>
                              {!mobileverified ? (
                                <>
                                  {mobileNumber && (
                                    <IconAndTextContainer
                                      sx={{ top: "31px !important" }}
                                      onClick={() => {
                                        removeMobileVerficiationFromCookie();
                                        dispatch(
                                          setShowVerifyMobileModal(true)
                                        );
                                      }}
                                      verified={{ verified: false }}
                                      bgcolor={{ color: true }}
                                      transform={{ up: true }}
                                    >
                                      {mobileCode && mobileNumber ? (
                                        <EditText sx={{ margin: "0 0 0 14px" }}>
                                          Verify
                                        </EditText>
                                      ) : (
                                        ""
                                      )}
                                    </IconAndTextContainer>
                                  )}
                                </>
                              ) : (
                                <IconAndTextContainer
                                  verified={{ verified: true }}
                                  bgcolor={{ color: true }}
                                  transform={{ up: true }}
                                >
                                  <EditText
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "6px",
                                      margin: "0 0 0 14px",
                                    }}
                                  >
                                    Verified{" "}
                                    <VerifiedOutlinedIcon
                                      sx={{ fontSize: "18px" }}
                                    />
                                  </EditText>
                                </IconAndTextContainer>
                              )}
                            </Box>
                          </BoxLabelCcontainer>

                          <BoxIconCcontainer>
                            <IconAndTextContainer editIcon={{ editIcon: true }}>
                              <EditIconContainer>
                                <LightTooltip
                                  title="Edit"
                                  arrow
                                  placement="top"
                                >
                                  <Image
                                    onClick={() => {
                                      mobileNumber
                                        ? dispatch(setShowEditMobileModal(true))
                                        : dispatch(setLoginViaSocial(true));
                                    }}
                                    src={"/assets/EditPencil.svg"}
                                    alt={"edit-icon"}
                                    width={12}
                                    height={15}
                                  />
                                </LightTooltip>
                              </EditIconContainer>
                            </IconAndTextContainer>
                          </BoxIconCcontainer>
                        </CustomisedInputField>
                      </Grid>
                    </Grid>
                  </FieldsContainer>
                </SectionContainer>
              </div>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box className="grid_box" sx={{ height: "100%" }} id="JobDetail">
                <JobDetails
                  mode={"edit"}
                  resetModes={resetModes}
                  changeMode={setJobDetailsMode}
                  defaultValues={profileInfos?.jobDetails}
                  updateProfile={updateProfile}
                  editBasicDetails={editJobDetails}
                  setEditBasicDetail={setEditJobDetail}
                />
              </Box>
            </Grid>
          </GridPersonalProfile>
          {showModal && (
            <div className="personalmodal mkkk" onClick={closeModal}>
              <div
                className="personalmodal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={clickedImage} alt="Profile" />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PersonalProfile;
