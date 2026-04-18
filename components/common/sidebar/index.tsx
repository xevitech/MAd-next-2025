import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import { MyAppContext } from "contextApi/appContext";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "tss-react/mui";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import * as Yup from "yup";
import {
  UserSidebarContainer,
  LogoContainer,
  UnderlinedDiv,
  FooterLogoContainer,
  NameAndRoleContainer,
  SidebarInnerContainer,
  UserName,
  UserNameContainer,
  UserRole,
  UserRoleContainer,
  UserInfoSidebarContainer,
  FloatingEditButon,
  ImageContainer,
  SidebarToggle,
  CustomSwitch3,
  BuyerRole,
} from "./styles";
import Image from "next/image";
import { useSelector } from "react-redux";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { FirstletterCapital, apiClient } from "../common";
import {
  FormControlLabel,
  FormGroup,
  Skeleton,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "redux/store";
import { setToggleNavbar } from "@/hooks/HeaderHooks";
import { Android12Switch } from "@/components/subDomain/ManageBanner/BannerOptions";
import { useFormik } from "formik";
import {
  profileData,
  setBasicDetail,
  setUserBasicInfo,
  setOpenLogoutModal,
} from "@/hooks/appReducers";
import { LightTooltip } from "../Tooltip/tooltip";
import { setSkeleton } from "@/hooks/LeadsReducer";
import SidebarSkeleton from "./SidebarSkeleton";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { LOCAL_PUBLIC_URL } from "@/utils/staticValues";
export const LogoImageSmall = styled("img")({
  height: "50px",
  width: "50px",
  cursor: "pointer",
});

const ImageElement = styled("img")({
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  objectFit: "cover",
});
export const UserSidebar = () => {
  const router: any = useRouter();
  const {
    user_info,
    userprofileImage,
    profileInfos,
    userEmail,
    mobileverified,
    emailVerified,
    default_role,
    subSellerList,
  } = useSelector((state: any) => state.userData);

  console.log(user_info, "user_info--------");
  useEffect(() => {
    if (!default_role) {
      setSkelton(true);
    } else {
      setSkeleton(false);
    }
  });
  const { basicDetails } = profileInfos;
  const routesArray = router.pathname
    .split("/")
    .filter((elem: any) => elem !== "");
  const routesArray1 = router.pathname
    .split("/")
    .filter((elem: any) => elem !== "");
  const [minimiseSidebar, setMinimiseSidebar] = useState(false);
  const [checkPermissions, setCheckPermissions] = useState(null);
  let { contextValue, ScreenLoader } = useContext(MyAppContext);
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  useLayoutEffect(() => {
    setCheckPermissions(user_info?.type);
  }, [user_info, subSellerList]);

  const NavigateHandler = (route: any) => {
    router.push(route);
  };
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList?.length > 0
      ? storedSubSellerList[0]
      : null;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [subMenuOpen, setSubmenuOpen] = useState<string>("");
  const [subMenuOpen1, setSubmenuOpen1] = useState<string>("");
  const useStyles = makeStyles()((theme: any) => {
    return {
      desktopmenu: {
        "@media screen and (max-width: 1280px)": {
          display: "none !important",
        },
      },

      mobilemenu: {
        display: "none",
        "@media screen and (max-width: 1280px)": {
          display: "block",
          position: "fixed",
          zIndex: "1200",
          top: "6px",
          left: "-10px",
        },
      },
      menuicon: {
        color: "#000",
        border: "1px solid #ddd",
        borderRadius: "4px",
      },
    };
  });
  const validation = Yup.object().shape({
    accountType: Yup.string().required("Please select user type"),
  });
  const formik: any = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      accountType: basicDetails?.accountType ?? "",
    },
    onSubmit: async (values) => {
      const { accountType } = values;

      setCompleteScreenLoader(true);
      let payload = {
        user_type: accountType,
      };
      const response = await apiClient("profile/updateProfile", "patch", {
        body: payload,
      });
      if (response.status === true || response.status == 200) {
        dispatch(profileData());
        setCompleteScreenLoader(false);
      }
      dispatch(setBasicDetail(values));

      formik.setFieldValue("editMode", false);
    },
  });

  const { classes } = useStyles();
  const [skelton, setSkelton] = useState(false);
  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const updateProfile = async (event: boolean) => {
    let payload = {
      user_type: event ? "buyer" : "seller",
    };
    setCheckPermissions(event ? "buyer" : "seller");
    try {
      const response = await apiClient("profile/updateProfile", "patch", {
        body: payload,
      });
      if (response.status == true || response.status == 200) {
        let userData = JSON.parse(localStorage.userData);
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, type: event ? "buyer" : "seller" })
        );
        dispatch(profileData());
        dispatch(
          setUserBasicInfo({ ...user_info, type: event ? "buyer" : "seller" })
        );
      }
    } catch (error) {
    } finally {
    }
  };
  const list = (anchor: string) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      {" "}
      <UserSidebarContainer
        breakPoints={contextValue?.breakPoints}
        className={`${togglenavbar ? "active-toggle" : ""}`}
      >
        <LogoContainer>
          {minimiseSidebar ? (
            <div
              style={{
                height: "50px",
                width: "50px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Image
                src={"/assets/power-cozmo-icon1.svg"}
                layout="fill"
                alt="logo"
              />
            </div>
          ) : (
            <div
              style={{
                position: "relative",
                width: "220px",
                margin: "15px 0 15px",
                height: "48px",
              }}
            >
              <Image
                src={"/assets/merchantad-logo.png"}
                layout="fill"
                alt="logo"
              />
            </div>
          )}

          <UnderlinedDiv />
        </LogoContainer>
        <UserInfoSidebarContainer breakPoints={contextValue?.breakPoints}>
          {router.asPath !== "/profile" && (
            <>
              <Box
                sx={{ position: "absolute", right: "8px", top: "12px" }}
              ></Box>
            </>
          )}
          <ImageContainer
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              if (checkPermissions !== "subuser") {
                NavigateHandler("/profile");
              } else {
                return;
              }
            }}
          >
            <div style={{ position: "relative" }}>
              {userprofileImage == "" ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              ) : (
                <ImageElement
                  src={
                    userprofileImage
                      ? userprofileImage
                      : `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png`
                  }
                  alt="userImage"
                />
              )}
            </div>
          </ImageContainer>
          <NameAndRoleContainer breakPoints={contextValue?.breakPoints}>
            {user_info?.name ? (
              <UserNameContainer>
                <LightTooltip
                  placement="top"
                  title={user_info?.name}
                  arrow
                  disableInteractive
                >
                  <UserName>{user_info?.name}</UserName>
                </LightTooltip>
              </UserNameContainer>
            ) : (
              <Skeleton animation="wave" sx={{ height: 15 }} width="70px" />
            )}
            {userEmail == "" ? (
              <Skeleton animation="wave" sx={{ height: 10 }} width="60px" />
            ) : (
              <UserRole>
                {checkPermissions == "subuser"
                  ? localStorage.getItem("listData") && (
                      <>
                        Account Type:-
                        {
                          JSON.parse(localStorage.getItem("listData"))?.user
                            ?.account_type
                        }
                        <br />
                        Role:- Sub User
                      </>
                    )
                  : emailVerified && mobileverified
                  ? `Verified ${FirstletterCapital(
                      checkPermissions ? checkPermissions : user_info?.type
                    )}`
                  : `Not Verified ${FirstletterCapital(
                      checkPermissions ? checkPermissions : user_info?.type
                    )}`}
              </UserRole>
            )}
            {ScreenLoader?.completeScreenLoader &&
            mobileverified &&
            userEmail == "" ? (
              <Skeleton animation="wave" sx={{ height: 10 }} width="60px" />
            ) : (
              <UserRoleContainer sx={{ position: "relative" }}>
                {checkPermissions != "subuser" && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-34px",
                      right: "-20px",
                    }}
                  >
                    <CustomSwitch3>
                      <FormGroup>

                        {default_role && default_role == "buyer" && (
                          <>
                            {checkPermissions ? (
                              <>
                                <Box
                                  sx={{
                                    backgroundColor: "#d7282f",
                                    color: "#fff",
                                    borderRadius: "10px",
                                    position: "absolute",
                                    bottom: "9px",
                                    right: "14px",
                                    fontSize: "10px",
                                    padding:'2px 8px'
                                  }}
                                >
                                  Buyer
                                </Box>
                              </>
                            ) : (
                              "----"
                            )}
                          </>
                        )}
                        {default_role && default_role == "seller" && (
                          <>
                            {checkPermissions ? (
                              <FormControlLabel
                                sx={{
                                  "&.MuiFormControlLabel-root": {
                                    marginRight: 0,
                                  },
                                }}
                                checked={
                                  checkPermissions === "seller" ? false : true
                                }
                                control={<Android12Switch />}
                                label=""
                                onChange={(e: any) =>
                                  updateProfile(e.target.checked)
                                }
                              />
                            ) : (
                              "----"
                            )}
                          </>
                        )}
                        
                      </FormGroup>
                    </CustomSwitch3>
                  </Box>
                )}
              </UserRoleContainer>
            )}
          </NameAndRoleContainer>
        </UserInfoSidebarContainer>

        {userEmail === "" ? (
          <SidebarSkeleton links={user_info} />
        ) : (
          <SidebarInnerContainer>
            <Sidebar
              // breakPoint={"always"}
              className={minimiseSidebar && "pro-sidebar"}
              collapsed={false}
              collapsedWidth={"30px"}
              backgroundColor={"#FFFFFF"}
            >
              <Menu
                menuItemStyles={{
                  button: ({ level, active, disabled }) => {
                    if (level === 2)
                      return {
                        color: disabled ? "#f5d9ff" : "#d359ff",
                        backgroundColor: active ? "#eecef9" : undefined,
                      };
                  },
                }}
              >
                {(checkPermissions === "seller" ||
                  checkPermissions === "buyer" ||
                  (checkPermissions === "subuser" &&
                    permissions?.dashboard?.view)) && (
                  <MenuItem
                    onClick={(e) => NavigateHandler("/dashboard")}
                    className={
                      routesArray[0] === "dashboard"
                        ? "selected-sidebar dashboard-menu-item"
                        : "dashboard-menu-item"
                    }
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "23.15px",
                      fontFamily: "Open Sans",
                      background: "transparent",
                    }}
                    icon={<GridViewOutlinedIcon />}
                  >
                    Dashboard
                  </MenuItem>
                )}

                {checkPermissions === "seller" && (
                  <MenuItem
                    onClick={(e) => NavigateHandler("/profile")}
                    className={
                      routesArray[0] == "profile"
                        ? "selected-sidebar dashboard-menu-item"
                        : "dashboard-menu-item"
                    }
                    onMouseEnter={(e: any) => {}}
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "23.15px",
                      fontFamily: "Open Sans",
                      background: "transparent",
                    }}
                    icon={<AccountCircleOutlinedIcon />}
                  >
                    Personal Profile
                  </MenuItem>
                )}

                {checkPermissions === "subuser" &&
                  permissions?.personal_profile?.view == true && (
                    <MenuItem
                      onClick={(e) => NavigateHandler("/profile")}
                      className={
                        routesArray[0] == "profile"
                          ? "selected-sidebar dashboard-menu-item"
                          : "dashboard-menu-item"
                      }
                      onMouseEnter={(e: any) => {}}
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "23.15px",
                        fontFamily: "Open Sans",
                        background: "transparent",
                      }}
                      icon={<AccountCircleOutlinedIcon />}
                    >
                      Personal Profile
                    </MenuItem>
                  )}

                

                {checkPermissions == "buyer" && (
                  <SubMenu
                    className={routesArray[0] == "profile" && "ps-open"}
                    onMouseEnter={(e: any) => {}}
                    onMouseLeave={(e: any) => {}}
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "23.15px",
                      fontFamily: "open sans",
                    }}
                    icon={
                      <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
                    }
                    label="Profile"
                    open={subMenuOpen === "profile" ? false : true}
                    onClick={(e) =>
                      setSubmenuOpen((prev) =>
                        prev == "profile" ? "" : "profile"
                      )
                    }
                  >
                    <MenuItem
                      onClick={(e) => NavigateHandler("/profile")}
                      className={`menu-expanded-menu-item ${
                        routesArray[0] == "profile" &&
                        routesArray[1] == undefined
                          ? "selectedMenuItem"
                          : ""
                      }`}
                    >
                      Personal Profile
                    </MenuItem>
                    {checkPermissions == "buyer" && (
                      <MenuItem
                        onClick={(e) =>
                          NavigateHandler("/profile/companyprofile")
                        }
                        className={`menu-expanded-menu-item ${
                          routesArray[0] == "profile" &&
                          routesArray[1] == "companyprofile"
                            ? "selectedMenuItem"
                            : ""
                        }`}
                      >
                        Company Profile{" "}
                      </MenuItem>
                    )}
                  </SubMenu>
                )}
                <>
                  <span
                    className="seller-tools-heading"
                    style={{
                      textAlign: "center",
                      display: "inline-flex",
                      width: "100%",
                      color: "#CCCEDD",
                      marginTop: "10px",
                      marginLeft: "5px",
                      marginBottom: "18px",
                      paddingLeft: "18px",
                    }}
                  >
                    For{" "}
                    {checkPermissions === "buyer"
                      ? "Buyer"
                      : checkPermissions === "subuser"
                      ? "Subuser"
                      : checkPermissions === "seller"
                      ? "Seller"
                      : ""}
                  </span>
                  
                  {(checkPermissions === "seller" ||
                    (checkPermissions === "subuser" &&
                      permissions?.product?.view == true)) && (
                    <SubMenu
                      className={
                        (routesArray[0] == "products" ||
                          routesArray[0] == "wishlist") &&
                        "ps-open"
                      }
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "23.15px",
                        fontFamily: "open sans",
                      }}
                      icon={<PhotoSizeSelectActualOutlinedIcon />}
                      label="Products"
                      open={subMenuOpen === "products" ? true : false}
                      onClick={(e) =>
                        setSubmenuOpen((prev) =>
                          prev == "products" ? "" : "products"
                        )
                      }
                    >
                      {(checkPermissions === "seller" ||
                        (checkPermissions === "subuser" &&
                          permissions?.product?.view == true)) && (
                        <MenuItem
                          onClick={(e) => NavigateHandler("/products/List")}
                          className={`menu-expanded-menu-item ${
                            routesArray[1] == "List" ? "selectedMenuItem" : ""
                          }`}
                        >
                          Product List
                        </MenuItem>
                      )}
                      {(checkPermissions === "seller" ||
                        (checkPermissions === "subuser" &&
                          permissions?.product?.add == true)) && (
                        <MenuItem
                          onClick={(e) => NavigateHandler("/products/List?add")}
                          className="menu-expanded-menu-item"
                        >
                          Add New Product
                        </MenuItem>
                      )}
                      {(checkPermissions === "seller" ||
                        (checkPermissions === "subuser" &&
                          permissions?.product_catalog?.view == true)) && (
                        <MenuItem
                          className="menu-expanded-menu-item"
                          onClick={(e) => NavigateHandler("/catalog/List")}
                        >
                          Catalog Product List
                        </MenuItem>
                      )}
                      {(checkPermissions === "seller" ||
                        (checkPermissions === "subuser" &&
                          permissions?.wishlist?.view == true)) && (
                        <MenuItem
                          className={`menu-expanded-menu-item ${
                            routesArray[0] == "wishlist"
                              ? "selectedMenuItem"
                              : ""
                          }`}
                          onClick={(e) => NavigateHandler("/wishlist")}
                        >
                          Saved Product/ Supplier
                        </MenuItem>
                      )}
                    </SubMenu>
                  )}
                  {/* {checkPermissions == "seller" && (
                    <SubMenu
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "23.15px",
                        fontFamily: "open sans",
                      }}
                      icon={<SpeakerNotesOutlinedIcon />}
                      label="Quotations"
                      open={subMenuOpen === "quotations" ? true : false}
                      onClick={(e) =>
                        setSubmenuOpen((prev) =>
                          prev == "quotations" ? "" : "quotations"
                        )
                      }
                    >
                      {checkPermissions != "buyer" && (
                        <MenuItem className="menu-expanded-menu-item">
                          Create Quote
                        </MenuItem>
                      )}
                      <MenuItem className="menu-expanded-menu-item">
                        Quote List
                      </MenuItem>
                      <MenuItem className="menu-expanded-menu-item">
                        Quotation Settings
                      </MenuItem>
                    </SubMenu>
                  )} */}

                  {checkPermissions == "buyer" && (
                    <SubMenu
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "23.15px",
                        fontFamily: "open sans",
                      }}
                      icon={<SpeakerNotesOutlinedIcon />}
                      label="RFQ"
                      open={subMenuOpen === "RFQ" ? true : false}
                      onClick={(e) =>
                        setSubmenuOpen((prev) => (prev == "RFQ" ? "" : "RFQ"))
                      }
                    >
                      <MenuItem
                        className="menu-expanded-menu-item"
                        onClick={(e) => NavigateHandler("/rfq")}
                      >
                        Create RFQ
                      </MenuItem>
                      <MenuItem
                        className="menu-expanded-menu-item"
                        onClick={(e) => NavigateHandler("/rfq")}
                      >
                        RFQ List
                      </MenuItem>
                      <MenuItem className="menu-expanded-menu-item">
                        RFQ Settings
                      </MenuItem>
                    </SubMenu>
                  )}

                  {(checkPermissions === "seller" ||
                    (checkPermissions === "subuser" &&
                      permissions?.category?.view == true) ||
                    permissions?.brands?.view == true ||
                    permissions?.specification_definition?.view == true ||
                    permissions?.company_settings?.view == true ||
                    permissions?.company_information?.view == true ||
                    permissions?.contact_person_details?.view == true ||
                    permissions?.regional_office?.view == true ||
                    permissions?.company_facilities?.view == true ||
                    permissions?.export_capabilities?.view == true ||
                    permissions?.qa_qc?.view == true ||
                    permissions?.r_d_management?.view == true ||
                    permissions?.services?.view == true ||
                    permissions?.social_accounts?.view == true ||
                    permissions?.certificates?.view == true ||
                    permissions?.news_room?.view == true ||
                    permissions?.faqs?.view == true ||
                    permissions?.manage_menu?.view == true ||
                    permissions?.manage_banner?.view == true ||
                    permissions?.manage_store?.view == true ||
                    permissions?.roles_permissions?.view == true ||
                    permissions?.sub_accounts?.view == true ||
                    permissions?.ads?.view == true) && (
                    <SubMenu
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "23.15px",
                        fontFamily: "open sans",
                      }}
                      icon={<AddBusinessOutlinedIcon />}
                      label="Seller Tools"
                      open={subMenuOpen === "seller-tools" ? true : false}
                      className={
                        (routesArray[0] == "seller" ||
                          routesArray[0] == "companySettings" ||
                          routesArray[0] == "subdomain" ||
                          routesArray[0] == "sellersubaccount" ||
                          routesArray[0] == "ads") &&
                        "ps-open"
                      }
                      onClick={(e) =>
                        setSubmenuOpen((prev) =>
                          prev == "seller-tools" ? "" : "seller-tools"
                        )
                      }
                    >
                      {(checkPermissions === "seller" ||
                        (checkPermissions === "subuser" &&
                          permissions?.category?.view == true) ||
                        permissions?.product_application?.view == true ||
                        permissions?.product_use_cases?.view == true) && (
                        <MenuItem
                          onClick={(e) => NavigateHandler("/seller/categories")}
                          className={`menu-expanded-menu-item ${
                            routesArray[1] == "categories"
                              ? "selectedMenuItem"
                              : ""
                          }`}
                        >
                          {" "}
                          Categories{" "}
                        </MenuItem>
                      )}
                      {(checkPermissions === "seller" ||
                        (checkPermissions === "subuser" &&
                          permissions?.brands?.view)) && (
                        <MenuItem
                          onClick={(e) => NavigateHandler("/seller/brands")}
                          className={`menu-expanded-menu-item ${
                            routesArray[1] === "brands"
                              ? "selectedMenuItem"
                              : ""
                          }`}
                        >
                          Brands
                        </MenuItem>
                      )}

                      {checkPermissions === "seller" && (
                        <MenuItem
                          className={`menu-expanded-menu-item ${
                            routesArray[0] == "companySettings"
                              ? "selectedMenuItem"
                              : ""
                          }`}
                          onClick={(e) =>
                            NavigateHandler(
                              "/companySettings/companyDetails?tab=company"
                            )
                          }
                        >
                          Company Details
                        </MenuItem>
                      )}

                      {(checkPermissions === "seller" ||
                        (checkPermissions === "subuser" &&
                          permissions?.manage_store?.view == true) ||
                        permissions?.manage_menu?.view == true ||
                        permissions?.manage_banner?.view == true) && (
                        <MenuItem
                          className={`menu-expanded-menu-item ${
                            routesArray[0] == "subdomain"
                              ? "selectedMenuItem"
                              : ""
                          }`}
                          onClick={(e) => NavigateHandler("/subdomain")}
                        >
                          Store Settings
                        </MenuItem>
                      )}

                      {checkPermissions === "seller" && (
                        <MenuItem
                          className={`menu-expanded-menu-item ${
                            routesArray[0] == "sellersubaccount"
                              ? "selectedMenuItem"
                              : ""
                          }`}
                          onClick={(e) => NavigateHandler("/sellersubaccount")}
                        >
                          Seller Sub Account
                        </MenuItem>
                      )}
                      {checkPermissions === "seller" && (
                        <MenuItem
                          className={`menu-expanded-menu-item ${
                            routesArray[0] == "ads" ? "selectedMenuItem" : ""
                          }`}
                          onClick={(e) => NavigateHandler("/ads")}
                        >
                          My Ads
                        </MenuItem>
                      )}
                    </SubMenu>
                  )}
                  {checkPermissions === "seller" && (
                    <SubMenu
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "23.15px",
                        fontFamily: "open sans",
                      }}
                      icon={<MonetizationOnOutlinedIcon />}
                      label="Discount Settings"
                      open={subMenuOpen === "pricing-settings" ? true : false}
                      className={routesArray[0] == "pricesettings" && "ps-open"}
                      onClick={(e) =>
                        setSubmenuOpen((prev) =>
                          prev == "pricing-settings" ? "" : "pricing-settings"
                        )
                      }
                    >
                      <MenuItem
                        className={`menu-expanded-menu-item ${
                          routesArray[0] == "pricesettings"
                            ? "selectedMenuItem"
                            : ""
                        }`}
                        onClick={(e) => NavigateHandler("/pricesettings")}
                      >
                        Rules
                      </MenuItem>
                    </SubMenu>
                  )}
                </>
                {/* {(checkPermissions === "seller" ||
                  (checkPermissions === "subuser" &&
                    permissions?.invited_users?.view == true) ||
                  permissions?.my_contacts?.view == true) && (
                  <SubMenu
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "23.15px",
                      fontFamily: "open sans",
                    }}
                    icon={<ContactPageOutlinedIcon></ContactPageOutlinedIcon>}
                    label="My Contacts"
                    open={subMenuOpen === "contact" ? true : false}
                    className={
                      (routesArray[0] == "contacts" ||
                        routesArray[0] == "invite") &&
                      "ps-open"
                    }
                    onClick={(e) =>
                      setSubmenuOpen((prev) =>
                        prev == "contact" ? "" : "contact"
                      )
                    }
                  >
                    {(checkPermissions === "seller" ||
                      (checkPermissions === "subuser" &&
                        permissions.my_contacts.view == true)) && (
                      <MenuItem
                        className={`menu-expanded-menu-item ${
                          routesArray[0] == "contacts" ? "selectedMenuItem" : ""
                        }`}
                        onClick={(e) => NavigateHandler("/contacts")}
                      >
                        Contact List
                      </MenuItem>
                    )}
                    {(checkPermissions === "seller" ||
                      (checkPermissions === "subuser" &&
                        permissions.invited_users.view == true)) && (
                      <MenuItem
                        className={`menu-expanded-menu-item ${
                          routesArray[0] == "invite" ? "selectedMenuItem" : ""
                        }`}
                        onClick={(e) => NavigateHandler("/invite")}
                      >
                        Invited List
                      </MenuItem>
                    )}
                  </SubMenu>
                )} */}
              </Menu>
              <Menu>
                {(checkPermissions === "seller" ||
                  (checkPermissions === "subuser" &&
                    permissions?.my_subscriptions?.view == true)) && (
                  <MenuItem
                    className={`menu-expanded-menu-item enquiry-center-menu-item ${
                      routesArray[0] == "subscription" &&
                      "selected-sidebar ps-open"
                    }`}
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "23.15px",
                      fontFamily: "open sans",
                    }}
                    icon={<i className="icon-my-subscription"></i>}
                    onClick={(e) => NavigateHandler("/subscription")}
                  >
                    My Subscriptions
                  </MenuItem>
                )}
                {(checkPermissions === "seller" ||
                  checkPermissions === "buyer" ||
                  (checkPermissions === "subuser" &&
                    permissions?.plans?.view == true)) && (
                  <MenuItem
                    className={`${
                      routesArray[0] == "plancards" &&
                      "selected-sidebar ps-open"
                    }`}
                    onClick={(e) => {
                      NavigateHandler("/plancards");
                    }}
                    style={{ fontSize: "18px" }}
                    icon={<PaymentOutlinedIcon />}
                  >
                    Plans
                  </MenuItem>
                )}
              </Menu>
              {checkPermissions == "buyer" && (
                <Menu>
                  <MenuItem
                    className={`menu-expanded-menu-item enquiry-center-menu-item ${
                      routesArray[0] == "wishlist" && "selected-sidebar ps-open"
                    }`}
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "23.15px",
                      fontFamily: "open sans",
                    }}
                    icon={<i className="icon-my-subscription"></i>}
                    onClick={(e) => NavigateHandler("/wishlist")}
                  >
                    Favourite Product/ Supplier
                  </MenuItem>
                </Menu>
              )}

              {/* <Menu>
                <MenuItem
                  className={`menu-expanded-menu-item enquiry-center-menu-item ${
                    routesArray[0] == "chat" && "selected-sidebar ps-open"
                  }`}
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "23.15px",
                    fontFamily: "open sans",
                  }}
                  icon={
                    <i className="icon-livechat chatIcon">
                      <span
                        className="path1"
                        aria-label="Chat with Seller"
                      ></span>
                      <span
                        className="path2"
                        aria-label="Chat with Seller"
                      ></span>
                    </i>
                  }
                  onClick={(e) => NavigateHandler("/chat")}
                >
                  Chat
                </MenuItem>
              </Menu> */}

              <Menu>
                {checkPermissions == "buyer" && (
                  <SubMenu
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "23.15px",
                      fontFamily: "open sans",
                    }}
                    icon={<ContactPageOutlinedIcon></ContactPageOutlinedIcon>}
                    label="My Contacts"
                    open={subMenuOpen === "contact" ? true : false}
                    className={
                      (routesArray[0] == "contacts" ||
                        routesArray[0] == "invite") &&
                      "ps-open"
                    }
                    onClick={(e) =>
                      setSubmenuOpen((prev) =>
                        prev == "contact" ? "" : "contact"
                      )
                    }
                  >
                    {checkPermissions == "buyer" && (
                      <MenuItem
                        className={`menu-expanded-menu-item ${
                          routesArray[0] == "contacts" ? "selectedMenuItem" : ""
                        }`}
                        // className={`menu-expanded-menu-item ${
                        //   routesArray[0] == "contacts"
                        //     ? "selectedMenuItem"
                        //     : ""
                        // }`}
                        onClick={(e) => NavigateHandler("/contacts")}
                      >
                        Contact List
                      </MenuItem>
                    )}
                    {checkPermissions == "buyer" && (
                      <MenuItem
                        className={`menu-expanded-menu-item ${
                          routesArray[0] == "invite" ? "selectedMenuItem" : ""
                        }`}
                        onClick={(e) => NavigateHandler("/invite")}
                      >
                        Invited List
                      </MenuItem>
                    )}
                  </SubMenu>
                )}
              </Menu>

              <Menu>
                {checkPermissions === "buyer" && (
                  <SubMenu icon={<AccessTimeOutlinedIcon />} label="Activity">
                    <MenuItem
                      onClick={(e) => NavigateHandler("/recentactivity")}
                      className={`menu-expanded-menu-item enquiry-center-menu-item ${
                        routesArray[0] == "recentactivity" && " ps-open"
                      }`}
                      // icon={<AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>}
                    >
                      Recent Activity
                    </MenuItem>

                    <MenuItem
                      onClick={(e) => NavigateHandler("/recentsupplier")}
                    >
                      Recent Supplier
                    </MenuItem>
                  </SubMenu>
                )}

                {/* {(checkPermissions === "seller" ||
                  (checkPermissions === "subuser" &&
                    (permissions?.notifications?.view ||
                      permissions?.account_preferences?.view))) && (
                  <SubMenu
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "23.15px",
                      fontFamily: "open sans",
                    }}
                    icon={<SettingsOutlinedIcon />}
                    label="Settings"
                    open={subMenuOpen === "settings" ? true : false}
                    className={
                      (routesArray[0] == "notifications" ||
                        routesArray[0] == "preferences") &&
                      "ps-open"
                    }
                    onClick={() =>
                      setSubmenuOpen((prev) =>
                        prev == "settings" ? "" : "settings"
                      )
                    }
                  >
                    {(checkPermissions === "seller" ||
                      (checkPermissions === "subuser" &&
                        permissions?.notifications?.view)) && (
                      <MenuItem
                        className={`menu-expanded-menu-item ${
                          routesArray[0] == "notifications"
                            ? "selectedMenuItem"
                            : ""
                        }`}
                        onClick={() => NavigateHandler("/notifications")}
                      >
                        Notifications
                      </MenuItem>
                    )}

                    {(checkPermissions === "seller" ||
                      (checkPermissions === "subuser" &&
                        permissions?.account_preferences?.view)) && (
                      <MenuItem
                        className={`menu-expanded-menu-item ${
                          routesArray[0] == "preferences"
                            ? "selectedMenuItem"
                            : ""
                        }`}
                        onClick={() => NavigateHandler("/preferences")}
                      >
                        Preferences
                      </MenuItem>
                    )}
                  </SubMenu>
                )} */}
              </Menu>
              <Menu>
                {(checkPermissions === "seller" ||
                  (checkPermissions === "subuser" &&
                    permissions?.recent_activity?.view == true)) && (
                  <SubMenu icon={<AccessTimeOutlinedIcon />} label="Activity">
                    <MenuItem
                      onClick={(e) => NavigateHandler("/recentactivity")}
                      className={`menu-expanded-menu-item enquiry-center-menu-item ${
                        routesArray[0] == "recentactivity" && " ps-open"
                      }`}
                      // icon={<AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>}
                    >
                      Recent Activity
                    </MenuItem>

                    <MenuItem
                      onClick={(e) => NavigateHandler("/recentsupplier")}
                    >
                      Recent Supplier
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => NavigateHandler("/recentsearches")}
                    >
                      Recent Searches
                    </MenuItem>
                  </SubMenu>
                )}

                {(checkPermissions === "seller" ||
                  (checkPermissions === "subuser" &&
                    (permissions?.notifications?.view ||
                      permissions?.account_preferences?.view))) && (
                  <SubMenu
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "23.15px",
                      fontFamily: "open sans",
                    }}
                    icon={<SettingsOutlinedIcon />}
                    label="Settings"
                    open={subMenuOpen === "settings" ? true : false}
                    className={
                      (routesArray[0] == "notifications" ||
                        routesArray[0] == "preferences") &&
                      "ps-open"
                    }
                    onClick={() =>
                      setSubmenuOpen((prev) =>
                        prev == "settings" ? "" : "settings"
                      )
                    }
                  >
                    {(checkPermissions === "seller" ||
                      (checkPermissions === "subuser" &&
                        permissions?.notifications?.view)) && (
                      <MenuItem
                        className={`menu-expanded-menu-item ${
                          routesArray[0] == "notifications"
                            ? "selectedMenuItem"
                            : ""
                        }`}
                        onClick={() => NavigateHandler("/notifications")}
                      >
                        Notifications
                      </MenuItem>
                    )}

                    {(checkPermissions === "seller" ||
                      (checkPermissions === "subuser" &&
                        permissions?.account_preferences?.view)) && (
                      <MenuItem
                        className={`menu-expanded-menu-item ${
                          routesArray[0] == "preferences"
                            ? "selectedMenuItem"
                            : ""
                        }`}
                        onClick={() => NavigateHandler("/preferences")}
                      >
                        Preferences
                      </MenuItem>
                    )}
                  </SubMenu>
                )}
              </Menu>
              <Menu>
                <MenuItem
                  onClick={(e) => {
                    dispatch(setOpenLogoutModal(true));
                  }}
                  style={{ fontSize: "18px" }}
                  icon={<LogoutIcon />}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Sidebar>
          </SidebarInnerContainer>
        )}
        <FooterLogoContainer>
          <Sidebar></Sidebar>
        </FooterLogoContainer>
      </UserSidebarContainer>
    </Box>
  );
  const dispatch = useAppDispatch();
  const { togglenavbar } = useSelector((state: any) => state.header);
  return (
    <>
      <UserSidebarContainer
        breakPoints={contextValue?.breakPoints}
        className={`${classes.desktopmenu} ${
          togglenavbar ? "active-toggle" : ""
        }`}
      >
        <SidebarToggle
          className="arrowToggle"
          onClick={() => dispatch(setToggleNavbar(!togglenavbar))}
        >
          <ArrowForwardIosIcon />
        </SidebarToggle>
        {list("left")}
      </UserSidebarContainer>
      <div className={classes.mobilemenu}>
        <Button onClick={toggleDrawer("left", true)}>
          <MenuIcon className={classes.menuicon} />
        </Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </div>
    </>
  );
};
