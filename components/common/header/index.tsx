import React, { useContext, useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { AppBar, Box, Dialog, InputBase, Toolbar, styled } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { makeStyles } from "tss-react/mui";
import {
  HeaderContainer,
  AddListingBtnContainer,
  CustomisedButton,
  HeaderRightContentContainer,
  HeaderRightSideIconContainer,
  UserName,
  Buttonlogout,
  SmallLogoMobile,
  CommonListMenuAdmin,
  UserEmailAdmin,
  StyleDialoge,
  LogOutCloseButton,
  CenterLogOutArea,
  CenterLogOutButton,
  MyContentArea,
  MyContentArea2,
  MyButtonSection,
  StyledAppBar,
  TopHeadermenus,
  SearchOuter,
  SearchInnerBox,
} from "./styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import Auth from "@/auth/Auth";
import NotificationPopUp from "../notificationsPopUp";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { Divider, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import {
  profileData,
  setBasicDetail,
  setUserBasicInfo,
  logOut,
  setOpenLogoutModal,
} from "@/hooks/appReducers";
import { useAppDispatch } from "redux/store";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { LightTooltip } from "../Tooltip/tooltip";
import CloseIcon from "@mui/icons-material/Close";
import { BtnFilled, BtnOutlined } from "../buttons/ButtonsVariations";
import { ThreeDots } from "react-loader-spinner";
import { calculateTotalUnreadArchivedMessages, getPermission } from "../common";
import { getTokenFromCookies } from "@/utils/cookieUtils";

const useStyles = makeStyles()((theme) => {
  return {
    userinfo: {
      fontSize: "13px",
      fontWeight: 700,
      color: "#231f20",
    },
    emailaddress: {
      fontSize: "13px",
      fontWeight: 400,
    },
    userpro: { padding: "0px  10px 8px" },
    "@global": {
      '.MuiAutocomplete-option[data-focus="true"]': {
        background: "blue",
      },
    },
  };
});

export const Header = () => {
  const {
    profileInfos,
    userprofileImage,
    userName,
    userEmail,
    openLogoutModal,
  } = useSelector((state: any) => state.userData);
  const { usersList } = useSelector((state: any) => state.chatData);
  let { unreadMessageCount } = calculateTotalUnreadArchivedMessages(usersList);
  let checkPermissions = profileInfos?.basicDetails?.accountType;
  const dispatch = useAppDispatch();
  const NavigateHandler = (route) => router.push(route);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [domLoaded, setDomLoaded] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showHeaderMenus, setShowHeaderMenus] = useState(false);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [logoutLoader, setLogoutLoader] = useState<boolean>(false);
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList?.length > 0
      ? storedSubSellerList[0]
      : null;
  const { asPath } = useRouter();
  const { classes } = useStyles();
  const token = typeof window !== "undefined" && getTokenFromCookies();
  useEffect(() => {
    setDomLoaded(true);
    token && dispatch(profileData());
    if (asPath.includes("crm") || asPath.includes("rfq")) {
      setShowHeaderMenus(true);
    }
  }, []);
  const router = useRouter();

  return (
    <>
      {domLoaded && (
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <StyledAppBar
            position="fixed"
            className={
              showHeaderMenus ? "top_header crmPageHeader " : "top_header"
            }
          >
            <Toolbar
              sx={{
                paddingLeft: "0px !important",
                paddingRight: "0px !important",
                width: "100%",
              }}
            >
              <TopHeadermenus
                className={
                  showHeaderMenus ? "top_header crmPageHeader " : "top_header"
                }
              >
                {checkPermissions == "seller" ||
                (checkPermissions == "subuser" &&
                  permissions?.product?.add == true) ? (
                  <AddListingBtnContainer>
                    {checkPermissions == "seller" && (
                      <CustomisedButton
                        endIcon={
                          <AddCircleOutlineIcon style={{ fontSize: "20px" }} />
                        }
                        onClick={() => NavigateHandler("/products/List?add")}
                        className={showHeaderMenus && "addListingcrm"}
                      >
                        Add Listing
                      </CustomisedButton>
                    )}
                  </AddListingBtnContainer>
                ) : (
                  <AddListingBtnContainer></AddListingBtnContainer>
                )}
                <SmallLogoMobile>
                  <Image
                    src={"/assets/DashboardLogo.svg"}
                    layout="fill"
                    alt="logo"
                  />
                </SmallLogoMobile>
                <HeaderRightContentContainer>
                  {!showHeaderMenus && (
                    <HeaderRightSideIconContainer
                      className={activeSearch ? "active" : "HeaderSearch"}
                      onClick={() => setActiveSearch(true)}
                      sx={{
                        transition: "all ease .1s !important",
                        "@media screen and (max-width:480px)": {
                          display: "none",
                        },
                      }}
                    >
                      <LightTooltip title="Search" arrow disableInteractive>
                        <SearchOutlinedIcon className="headericon" />
                      </LightTooltip>
                      <InputBase
                        sx={{ padding: "4px 48px 5px 0px" }}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search Terms"
                        inputProps={{ "aria-label": "Search" }}
                      />

                      {searchValue !== "" && (
                        <RestartAltIcon
                          className="resetAll"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchValue("");
                          }}
                        />
                      )}
                      <ClearOutlinedIcon
                        className="crossField"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchValue("");
                          setActiveSearch(false);
                        }}
                      />
                    </HeaderRightSideIconContainer>
                  )}

                  <HeaderRightSideIconContainer>
                    <NotificationPopUp />
                  </HeaderRightSideIconContainer>

                  <HeaderRightSideIconContainer>
                    <Buttonlogout
                      sx={{
                        "&:hover": {
                          background: "transparent",
                        },
                      }}
                      id="basic-button"
                      disableRipple
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      <IconButton
                        sx={{
                          position: "relative",
                          "&:hover": {
                            background: "transparent",
                          },
                        }}
                        size="small"
                        disableRipple
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar
                          alt={userName}
                          src={
                            userprofileImage ||
                            "/assets/default/defaultProfileImage.png"
                          }
                          sx={{ width: 24, height: 24 }}
                        />
                        {unreadMessageCount > 0 && (
                          <Box
                            sx={{
                              height: "15px",
                              width: "20px",
                              borderRadius: "30%",
                              backgroundColor: "#d7282f",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "absolute",
                              top: "-4px",
                              right: "0px",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "12px", color: "#fff" }}
                            >
                              {unreadMessageCount}
                            </Typography>
                          </Box>
                        )}
                      </IconButton>
                    </Buttonlogout>
                    {checkPermissions != "subuser" && (
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        disableScrollLock
                        sx={CommonListMenuAdmin}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            width: 200,

                            "@media screen and (max-width:900px)": {
                              left: "auto !important",
                              right: "4px",
                            },

                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 8,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <Box className={classes.userpro}>
                          <Typography>
                            <LightTooltip
                              placement="top"
                              title={userName || "Loading..."}
                              arrow
                              disableInteractive
                            >
                              <UserName className={classes.userinfo}>
                                {userName || "Loading..."}
                              </UserName>
                            </LightTooltip>
                            <LightTooltip
                              placement="top"
                              title={userEmail || "Loading..."}
                              arrow
                              disableInteractive
                            >
                              <UserEmailAdmin>
                                {userEmail || "Loading..."}
                              </UserEmailAdmin>
                            </LightTooltip>
                          </Typography>
                        </Box>
                        <Divider />
                        {[
                          <MenuItem
                            onClick={() => {
                              router.push("/profile");
                              handleClose();
                            }}
                          >
                            <ListItemIcon>
                              <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Profile
                          </MenuItem>,
                          // <MenuItem
                          //   sx={{ position: "relative" }}
                          //   onClick={() => {
                          //     router.push("/chat");
                          //     handleClose();
                          //   }}
                          // >
                          //   <ListItemIcon>
                          //     <MessageOutlinedIcon fontSize="small" />
                          //   </ListItemIcon>
                          //   Messages
                          //   {unreadMessageCount > 0 && (
                          //     <Box
                          //       sx={{
                          //         height: "15px",
                          //         width: "20px",
                          //         borderRadius: "30%",
                          //         backgroundColor: "#d7282f",
                          //         display: "flex",
                          //         alignItems: "center",
                          //         justifyContent: "center",
                          //         position: "absolute",
                          //         right: "10px",
                          //       }}
                          //     >
                          //       <Typography
                          //         sx={{ fontSize: "12px", color: "#fff" }}
                          //       >
                          //         {unreadMessageCount}
                          //       </Typography>
                          //     </Box>
                          //   )}
                          // </MenuItem>,
                          <MenuItem
                            onClick={() => {
                              router.push("/preferences");
                              handleClose();
                            }}
                          >
                            <ListItemIcon>
                              <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                          </MenuItem>,

                          <MenuItem
                            onClick={(e) => {
                              dispatch(setOpenLogoutModal(true));
                            }}
                          >
                            <Divider
                              style={{ marginTop: "2px", marginBottom: "2px" }}
                            />
                            <ListItemIcon>
                              <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                          </MenuItem>,
                        ].filter(Boolean)}
                      </Menu>
                    )}
                    {checkPermissions == "subuser" && (
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        disableScrollLock
                        sx={CommonListMenuAdmin}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            width: 200,

                            "@media screen and (max-width:900px)": {
                              left: "auto !important",
                              right: "4px",
                            },

                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 8,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <Box className={classes.userpro}>
                          <Typography>
                            <LightTooltip
                              placement="top"
                              title={userName || "Loading..."}
                              arrow
                              disableInteractive
                            >
                              <UserName className={classes.userinfo}>
                                {userName || "Loading..."}
                              </UserName>
                            </LightTooltip>
                            <LightTooltip
                              placement="top"
                              title={userEmail || "Loading..."}
                              arrow
                              disableInteractive
                            >
                              <UserEmailAdmin>
                                {userEmail || "Loading..."}
                              </UserEmailAdmin>
                            </LightTooltip>
                          </Typography>
                        </Box>
                        <Divider />
                        <MenuItem
                          onClick={(e) => {
                            dispatch(setOpenLogoutModal(true));
                          }}
                        >
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    )}
                  </HeaderRightSideIconContainer>
                </HeaderRightContentContainer>
              </TopHeadermenus>
              <Dialog open={openLogoutModal} sx={StyleDialoge}>
                <Box sx={{}}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: "15px",
                    }}
                  >
                    <LogOutCloseButton
                      onClick={(e) => {
                        dispatch(setOpenLogoutModal(false));
                      }}
                    >
                      <CloseIcon />
                    </LogOutCloseButton>
                  </Box>
                  <CenterLogOutArea>
                    <CenterLogOutButton>
                      <CloseIcon />
                    </CenterLogOutButton>
                  </CenterLogOutArea>
                  <MyContentArea>
                    <Typography>Are You Sure?</Typography>
                  </MyContentArea>
                  <MyContentArea2>
                    <Typography>Do you want to logout this account?</Typography>
                  </MyContentArea2>
                  <MyButtonSection>
                    <BtnFilled
                      onClick={(e) => {
                        setLogoutLoader(true);

                        dispatch(logOut());
                      }}
                      type="submit"
                      height={"36px"}
                    >
                      {logoutLoader ? (
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
                        "Logout"
                      )}
                    </BtnFilled>
                    <BtnOutlined
                      className="cancelbtn"
                      onClick={(e) => {
                        dispatch(setOpenLogoutModal(false));
                      }}
                      height={"36px"}
                    >
                      Cancel
                    </BtnOutlined>
                  </MyButtonSection>
                </Box>
              </Dialog>
            </Toolbar>
            {/* 480 searchbar */}
            <SearchOuter className="crm-hidesearch">
              <SearchInnerBox className="active">
                <SearchOutlinedIcon
                  sx={{
                    color: "#231f20",
                    margin: "0 0 0 10px",
                    fontSize: "18px",
                  }}
                />
                <InputBase
                  fullWidth
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search Terms"
                  inputProps={{ "aria-label": "Search" }}
                />
                <RestartAltIcon sx={{ color: "#231f20", fontSize: "18px" }} />
                <ClearOutlinedIcon
                  sx={{ color: "#231f20", fontSize: "18px" }}
                />
              </SearchInnerBox>
            </SearchOuter>
          </StyledAppBar>
        </Box>
      )}
    </>
  );
};
