import {
  Box,
  Button,
  Popover,
  Card,
  TextField,
  Stack,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import {
  ButtonGroupItem,
  ContactSeller,
  FloatingInformation,
  FloatingMenuBoxx,
  FloatingName,
  FloatingUser,
  SocialBtn,
  SocialCol,
  IconsContainer,
  TwitterIco,
  FacebookIco,
  LinkedinIco,
  CopyIco,
} from "./styled";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { apiClient } from "../common/common";
import { toast } from "react-toastify";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { UpdateContactStatus, setHeaderData } from "@/hooks/miniSite";
import AlertMessage from "../common/Confirmation";
import { useRouter } from "next/router";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LightTooltip } from "../common/Tooltip/tooltip";
export function Floatingmenu() {
  const dispatch = useAppDispatch();
  const [openAlert, setOpen] = useState<boolean>(false);
  const { userInfo, headerData } = useSelector((state: any) => state.miniSite);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [state, setstate] = useState<any>("");
  let user_id = JSON.parse(localStorage.getItem("userData"))?.id;
  let shop_id = JSON.parse(localStorage.getItem("shop_id"));
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { mobileNumber } = useSelector((state: any) => state.userData);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);
  const urlpath = `https://www.merchantad.com/${router?.asPath}`;
  const [authenticate, setAuthenticate] = useState<any>(false);
  const slug_status = headerData?.basic_information?.slug_status;
  let userType = JSON.parse(localStorage.getItem("userData"))?.type;
  const SaveSupplier = async () => {
    if (!JSON.parse(localStorage.getItem("userData"))?.id) {
      toast.error("Please login to add contact");
      router.push(`/user/signin?minisite=${router?.query?.id?.[0]}`);
    }
    let response = await apiClient("front/save_seller_contact", "post", {
      body: {
        seller_id: minisiteUserID,
        user_id,
      },
    });

    if (response.status === 200) {
      dispatch(UpdateContactStatus(!userInfo?.basic_information?.check_user));
      toast.success(response.message);
    } else {
      dispatch(UpdateContactStatus(!userInfo?.basic_information?.check_user));
      toast.error("Record Deleted");
    }
  };

  const SaveLikeData = async () => {
    if (userType == "seller"){
      return;
    } else {
      if (user_id == minisiteUserID) {
      setOpen(true);
      return;
    }
    let userData = localStorage.getItem("userData");
    let user = JSON.parse(userData);
    if (!user?.id) {
      toast.error("Please login to like minisite");
      setTimeout(() => {
        router.push(`/user/signin?minisite=${router?.query?.id?.[0]}`);
      }, 1000);

      return;
    }
    let response = await apiClient("front/shops/like_unlike", "post", {
      body: { shop_id: userInfo?.basic_information?.user_id },
    });
    let previousCount = headerData.basic_information.like_count;
    if (response.status === 200) {
      if (response.message === "Like") {
        let previousCount = headerData.basic_information.like_count;

        dispatch(
          setHeaderData({
            ...headerData,
            basic_information: {
              ...headerData.basic_information,
              like_count: response.total_followers,
              user_liked: true,
            },
          })
        );
      } else {
        dispatch(
          setHeaderData({
            ...headerData,
            basic_information: {
              ...headerData.basic_information,
              like_count: response.total_followers,
              user_liked: false,
            },
          })
        );
      }
    } else {
      toast.error("Please Login");
    }
    }
  };
  const NavigateHandler = (link: any) => window.open(`${link}`);

  const liked = headerData?.basic_information?.user_liked;
  const sharerNavigationHandler = (link: any) => {
    window.open(`${link}${urlpath}`);
  };
  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {})
      .catch((error) => {});
  };
  const copyWhatsappNumber = () => {
    const number = mobileNumber;
    navigator.clipboard
      .writeText(number)
      .then(() => {
        NavigateHandler(`https://wa.me/${number}`);
      })
      .catch((error) => {});
  
  };
  console.log(slug_status, minisiteUserID, "minisiteUserID")

  return (
    <>
      <AlertMessage
        open={openAlert}
        handleClose={setOpen}
        text="You cannot like your own store"
      />
      {(slug_status !== 0 && minisiteUserID != user_id) &&  (<Box position="fixed" zIndex={1000} right={{ xs: 0 }} top={{ xs: "40%" }}>
        <SocialBtn orientation="vertical" size="small" variant="contained">
          {minisiteUserID != user_id && (
            <ButtonGroupItem
              onClick={(e) => {
                if (user_id != minisiteUserID) {
                  handleClick(e), setstate("adduser");
                }
              }}
            >
              {<i className="icon-contact-seller"></i>}
            </ButtonGroupItem>
          )}

          <LightTooltip
            disableInteractive
            arrow
            title="Chat on whatsapp"
            placement="top"
          >
            <ButtonGroupItem onClick={copyWhatsappNumber}>
              <WhatsAppIcon aria-label="whatsapp" />
            </ButtonGroupItem>
          </LightTooltip>

          {/* <LightTooltip
            disableInteractive
            arrow
            title="Copy link and share anywhere"
            placement="top"
            aria-label="Copy link and share anywhere"
          >
            <ButtonGroupItem onClick={handleCopyUrl}>
              <ContentCopyIcon aria-label="Copy link and share anywhere" />
            </ButtonGroupItem>
          </LightTooltip> */}

          <LightTooltip
            disableInteractive
            arrow
            title={userType == "seller" ? "Seller can not follow other seller":"Like/Unlike Store"}
            placement="top"
          >
            <ButtonGroupItem onClick={SaveLikeData}>
              {!liked ? (
                <i className="icon-like"></i>
              ) : (
                <i className="icon-like" style={{ color: "#1DA1F2" }}></i>
              )}
            </ButtonGroupItem>
          </LightTooltip>
          <LightTooltip disableInteractive arrow title="Share" placement="top">
            <SocialCol sx={{ position: "relative" }}>
              <ButtonGroupItem>
                <i className="icon-share-outline"></i>
              </ButtonGroupItem>

              <IconsContainer className="containerHover">
                <FacebookIco
                  className={`social-icon1`}
                  onClick={(e) =>
                    sharerNavigationHandler(
                      "https://www.facebook.com/sharer/sharer.php?u="
                    )
                  }
                >
                  <i className="icon-facebook1" aria-label="facebook"></i>
                </FacebookIco>
                <LinkedinIco
                  className={`social-icon1`}
                  onClick={(e) =>
                    sharerNavigationHandler(
                      "https://www.linkedin.com/shareArticle?mini=true&url="
                    )
                  }
                >
                  <i className="icon-linkedin1" aria-label="linkedIn"></i>
                </LinkedinIco>
                <TwitterIco
                  className={`social-icon1`}
                  onClick={(e) =>
                    sharerNavigationHandler(
                      "https://twitter.com/intent/tweet?url="
                    )
                  }
                >
                  <i className="icon-x-social" aria-label="twitter"></i>
                </TwitterIco>
                <CopyIco className={`social-icon1`} onClick={handleCopyUrl}>
                  <ContentCopyIcon aria-label="Copy link and share anywhere" />
                </CopyIco>
              </IconsContainer>
            </SocialCol>
          </LightTooltip>
        </SocialBtn>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          style={{ marginRight: "10px" }}
          disableScrollLock={true}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {state === "adduser" ? (
            <FloatingMenuBoxx>
              <Card className="Floatingcard">
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                  p={1}
                  sx={{
                    "@media screen and (max-width: 768px)": {},
                  }}
                  style={{ borderBottom: "1px solid rgba(34, 51, 84, .1)" }}
                >
                  <ContactSeller variant="h6">Contact Sellers </ContactSeller>
                </Stack>
                <Stack spacing={2.5} padding="16px">
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    spacing={1.5}
                    alignItems="center"
                  >
                    <Avatar
                      sx={{ bgcolor: "#f07f07" }}
                      aria-label="recipe"
                      src={userInfo?.user_info?.profile_link ?? ""}
                    >
                      {userInfo?.user_info?.name?.[0]}
                    </Avatar>
                    <FloatingInformation>
                      <FloatingName variant="h6">
                        {userInfo?.user_info?.name}
                      </FloatingName>
                      <FloatingUser color="GrayText">
                        {userInfo?.user_info?.job_role}
                      </FloatingUser>
                    </FloatingInformation>
                  </Stack>
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: "#231F20",
                      "&:hover": { backgroundColor: "#231F20" },
                    }}
                    variant="contained"
                    startIcon={<ForumOutlinedIcon />}
                  >
                    Chat
                  </Button>
                  <TextField
                    sx={{
                      "& .MuiFormLabel-root": {
                        fontSize: "13px",
                      },
                      "& .MuiInputBase-input": {
                        paddingX: 1.5,
                      },
                    }}
                    label="Enter email address"
                    size="small"
                  />
                  <TextField
                    sx={{
                      "& .MuiFormLabel-root": {
                        fontSize: "13px",
                      },
                      "& .MuiInputBase-input": {
                        paddingX: 1.5,
                      },
                    }}
                    label="Short description"
                    size="small"
                    multiline
                    maxRows={4}
                  />
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      backgroundColor: "#D7282F",
                      "&:hover": { backgroundColor: "#D7282F" },
                      textTransform: "initial",
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </Card>
            </FloatingMenuBoxx>
          ) : (
            <>
              <Card>
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="space-between"
                  alignItems="center"
                  py={1}
                  px={1.5}
                  style={{ borderBottom: "1px solid rgba(34, 51, 84, .1)" }}
                >
                  {headerData?.social_list?.map((v) => {
                    if (v.profile_type == "Facebook") {
                      return (
                        <Box
                          style={{ cursor: "pointer", display: "flex" }}
                          onClick={(e) => NavigateHandler(v.profile_link)}
                        >
                          <img src="/assets/facebook_icon.svg" width={10} />
                        </Box>
                      );
                    }
                    if (v.profile_type == "Instagram") {
                      return (
                        <Box
                          style={{ cursor: "pointer", display: "flex" }}
                          onClick={(e) => NavigateHandler(v.profile_link)}
                        >
                          <InstagramIcon />
                        </Box>
                      );
                    }
                    if (v.profile_type == "Twitter") {
                      return (
                        <Box
                          style={{ cursor: "pointer", display: "flex" }}
                          onClick={(e) => NavigateHandler(v.profile_link)}
                        >
                          <img src="/assets/twitter_icon.svg" width={25} />
                        </Box>
                      );
                    }
                    if (v.profile_type == "linkedin") {
                      return (
                        <Box
                          style={{ cursor: "pointer", display: "flex" }}
                          onClick={(e) => NavigateHandler(v.profile_link)}
                        >
                          <LinkedInIcon />
                        </Box>
                      );
                    }
                    if (v.profile_type == "WhatsApp") {
                      return (
                        <Box style={{ cursor: "pointer", display: "flex" }}>
                          <WhatsAppIcon />
                        </Box>
                      );
                    }
                  })}
                </Stack>
              </Card>
            </>
          )}
        </Popover>
      </Box>)}
      
    </>
  );
}
