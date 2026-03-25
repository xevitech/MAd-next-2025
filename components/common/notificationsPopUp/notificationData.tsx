import React, { useContext, useEffect, useState } from "react";
import {
  Tooltip,
  Avatar,
  Box,
  Button,
  Paper,
  Grid,
  tabsClasses,
  Tabs,
  CardHeader,
  Skeleton,
} from "@mui/material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import moment from "moment";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/router";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InfiniteScroll from "react-infinite-scroll-component";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  LeftRedBorder,
  SettingContainer,
  ViewAllButton,
  NotificationContainer,
  CountContainer,
  TypographyHeading,
  HeaderText,
  TypographySubtitle,
  TypographyMarkRead,
  TypographyDateTime,
  TypographyDetail,
  TypographyProductName,
  Gridnotificationdata,
  LoadingTxt,
  Notoficationlayuout,
  TabsIndicatorStyling,
  UnreadNotification,
  NotificationTitleHeader,
  NotificationData,
} from "./style";
import parse from "html-react-parser";
import { TabsCustomSlide } from "../commonStyle";
import { useSelector } from "react-redux";
import { ReplaceSpaces, apiClient } from "../common";
import { HeaderRightSideIconContainer } from "../header/styles";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { LightTooltip } from "../Tooltip/tooltip";
const useStyles = makeStyles()((theme) => {
  return {
    tabs: {
      "&:hover": {
        backgroundColor: "transparnt",
      },
      "& .MuiTabs-indicator": {
        backgroundColor: "#fff",
        height: "30px",
        minHeight: "30px",
        borderRadius: "7px",
        top: 7,
        border: "1px solid #D7282F",
        color: "#D7282F !important",
      },
      "& .MuiTab-root": {
        textTransform: "capitalize",
        fontSize: "14px",
        margin: "-2px 0 0",
        minWidth: "25%",
      },

      "& .MuiTab-root.Mui-selected": {
        color: "#d7282f",

        borderRadius: "6px",
        minHeight: "30px",
        height: "30px",
        zIndex: 1,
        minWidth: "60px",
        lineHeight: "12px",
      },

      "& .MuiTabs-flexContainer": {
        alignItems: "center",
      },
    },

    head: {
      display: "flex",
      flexDirection: "row",
      fontSize: "24px",
      color: "#000000",
      fontFamily: "sans-serif",
      justifyContent: "space-between",

      "@media screen and (max-width:319px)": {
        display: "inline-block !important",
      },
    },
    count: {
      background: "#7B7979",
      borderRadius: "4px",
      color: "#ddd",
      fontSize: "10px",

      padding: "1px 2px",
      display: "inline-block",
    },
    countSelcted: {
      background: "#D7282F",
      borderRadius: "4px",
      color: "#fff",
      fontSize: "10px",

      padding: "1px 2px",
      display: "inline-block",
    },
    btn: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 7,
      backgroundColor: "#7B7979",
      borderRadius: 50,
      height: 30,
      color: "#FFFFFF",
      textAlign: "center",
      marginLeft: 6,
    },
    image: {
      margin: "auto",
      display: "block",
      maxWidth: 100,
      maxHeight: 100,
    },
    divider: {
      margin: "5px 5px 5px !important",
      alignItems: "center !important",
      height: "15px !important",
    },

    tabLabel: {
      color: "#D7282F !important",
      width: "19px!important",
      height: "22px !important",
      // fontFamily: "sans-serif !important",
    },

    buttonbottom: {
      display: "flex !important",
      justifyContent: "end !important",
    },
    pulse: {
      background: "#d7282fcc",
      borderRadius: "50%",
      margin: "0 -2px 0 3px",
      height: 10,
      width: 10,
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 1)",
      transform: "scale(1)",
      animation: "$pulse 2s infinite",
    },
    "@keyframes pulse": {
      "0%": {
        transform: "scale(0.95)",
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.7)",
      },
      "70%": {
        transform: "scale(1)",
        boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)",
      },
      "100%": {
        transform: "scale(0.95)",
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
      },
    },
  };
});

const NotificationDataList = () => {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);
  const [enquiriesCount, setEnquriesCount] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [companyCount, setCompanyCount] = useState<number>(0);
  const [contactCount, setContactCount] = useState<number>(0);
  const [brandCount, setBrandCount] = useState<number>(0);
  const [unitCount, setUnitCount] = useState<number>(0);
  const [allCount, setAllCount] = useState<number>(0);
  const [notificationList, setNotificationList] = useState<any>(null);
  const [allNotificationList, setAllNotificationList] = useState<any>([]);
  const [value, setValue] = useState<any>(0);
  const [selectedTab, setselectedTab] = useState("all");
  const { userName, profileInfos, id } = useSelector(
    (state: any) => state.userData
  );
  const [hasMore, setHasMore] = useState<any>(true);
  const [loader, setLoader] = useState<any>(true);
  const userType = profileInfos?.basicDetails?.accountType ?? null;
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotificationCount(0);
    FetchNotificationsCount("no", "");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    id && FetchNotificationsCount("yes");
  }, []);

  const NavigateTopage = (item) => {
    if (item.title == "Product Approved") {
      const {
        product_slug,
        user_id,
        updated_id,
        product_name,
        category_name,
        company_details,
      } = item;

      router.push(
        `/productdetail/${ReplaceSpaces(
          category_name ? category_name : product_slug
        )}/${ReplaceSpaces(
          company_details?.slug ?? product_slug
        )}/${ReplaceSpaces(product_slug)}/${updated_id}/${user_id}`
      );
    }
    if (item.type === "enquiries") {
      router.push(`/enquiry`);
    }
  };

  useEffect(() => {
    if (userName) {
      if (router.asPath !== "/notifications") FetchNotificationsCount("yes");
    }
  }, []);

  const FetchNotificationsCount = async (count, type = "") => {
    setLoader(true);
    let response = await apiClient(
      `front/notifications?type=${type}&skip=0&take=10&only_count=${count}&user_type=${userType}`,
      "get"
    );

    if (response.status == 200 && count == "yes") {
      setNotificationCount(response.data);
    }
    if (response.status == 200 && count == "no") {
      if (response.data.all === notificationList?.length) {
        setHasMore(false);
      }
      setNotificationList((prev) => {
        return [...response.data.list];
      });
      setAllNotificationList((prev) => {
        return [...response.data.list];
      });
      setProductCount(response.data.product);
      setEnquriesCount(response.data.enquiries);
      setCategoriesCount(response.data.category);
      setCompanyCount(response.data.company);
      setContactCount(response.data.contact_list);
      setBrandCount(response.data.brand);
      setAllCount(response.data.all);
      setUnitCount(response.data.unit);
    }
    setLoader(false);
  };

  const TabChangeHandler = (tab) => {
    setselectedTab(tab);
    if (tab == "all") {
      FetchNotificationsCount("no", "");
    } else {
      FetchNotificationsCount("no", tab);
    }
  };
  const handleReadNotification = async (id: any, type: any) => {
    let payload: any;
    if (type == "mark_all") {
      payload = {
        id: id,
        mark_all: "read",
      };
    } else {
      payload = {
        id: id,
        type: type,
      };
    }
    let response = await apiClient(`front/update_status`, "post", {
      body: payload,
    });
    if (response.status === 200) {
      FetchNotificationsCount("no", type ? type : "");
    }
  };

  const NotificationSkeleton = () => {
    return [1, 2, 3, 4, 5].map((v) => (
      <Box>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          action={null}
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
      </Box>
    ));
  };

  return (
    <>
      <Notoficationlayuout
        sx={{
          margin: "auto",
          position: "absolute",
          left: "0",
          right: "0",
          "@media screen and (max-width: 767px)": {
            right: "42px",
          },
        }}
      >
        <LightTooltip title="Notifications" arrow disableInteractive>
          {/* <IconButton
            onClick={handleClick}
            size="small"
            className="Headersmallbutton"
          > */}
          {/* <Avatar sx={{ width: 32, height: 32, backgroundColor: "#fff" }}> */}
          <HeaderRightSideIconContainer>
            <NotificationsActiveOutlinedIcon
              className="headericon"
              onClick={handleClick}
            />{" "}
          </HeaderRightSideIconContainer>
          {/* </Avatar> */}
          {/* </IconButton> */}
        </LightTooltip>
        {notificationCount !== 0 && <CountContainer></CountContainer>}
      </Notoficationlayuout>

      <Menu
        className="notificationpop"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        disableScrollLock
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 2,
            boxShadow:
              "rgba(159, 162, 191, 0.18) 0px -6px 6px,rgba(159, 162, 191, 0.32) 0px 2px 2px",
            width: 388,
            height: "575",
            // maxHeight:'100%',
            "@media screen and (orientation:landscape)": {
              maxHeight: "100%",
            },
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              borderRadius: "50%",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 10,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <NotificationTitleHeader>
          <TypographyHeading>Notifications</TypographyHeading>
          {allCount > 0 && (
            <HeaderText>
              <img src="/assets/readall.svg" />
              <TypographyMarkRead
                style={{ cursor: "pointer" }}
                onClick={() => handleReadNotification("", "mark_all")}
              >
                Mark all as Read
              </TypographyMarkRead>
              <SettingContainer
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/preferences")}
              >
                <SettingsOutlinedIcon />
              </SettingContainer>
            </HeaderText>
          )}
        </NotificationTitleHeader>
        <MenuItem>
          <Tabs
            // variant="scrollable"
            // scrollButtons
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleChange}
            style={{
              // [`& .${tabsClasses.scrollButtons}`]: {
              //   "&.Mui-disabled": { opacity: 0.3 },

              // },
              // minHeight: '36px', height: '36px',
              marginBottom: "14px",
              marginTop: "-7px",
            }}
            // sx={TabsCustomSlide}
            sx={TabsIndicatorStyling}
          >
            <Tab
              label={
                <div
                  className={classes.tabs}
                  onClick={() => TabChangeHandler("all")}
                >
                  All{" "}
                  <span
                    className={
                      selectedTab === "all"
                        ? classes.countSelcted
                        : classes.count
                    }
                  >
                    {allCount}
                  </span>
                </div>
              }
              sx={{
                "&.MuiTab-root.Mui-selected": {
                  color: "#D7282F",
                },
              }}
            />
            <Tab
              label={
                <div
                  className={classes.tabs}
                  onClick={() => TabChangeHandler("enquiries")}
                >
                  Enquiries{" "}
                  <span
                    className={
                      selectedTab === "enquiries"
                        ? classes.countSelcted
                        : classes.count
                    }
                  >
                    {enquiriesCount}
                  </span>
                </div>
              }
              sx={{
                "&.MuiTab-root.Mui-selected": {
                  color: "#D7282F",
                },
              }}
            />
            <Tab
              label={
                <div
                  className={classes.tabs}
                  onClick={() => TabChangeHandler("product")}
                >
                  Product{" "}
                  <span
                    className={
                      selectedTab === "product"
                        ? classes.countSelcted
                        : classes.count
                    }
                  >
                    {productCount}
                  </span>
                </div>
              }
              sx={{
                "&.MuiTab-root.Mui-selected": {
                  color: "#D7282F",
                },
              }}
              //disableRipple={true}
            />
            <Tab
              label={
                <div
                  className={classes.tabs}
                  onClick={() => TabChangeHandler("category")}
                >
                  Categories{" "}
                  <span
                    className={
                      selectedTab === "category"
                        ? classes.countSelcted
                        : classes.count
                    }
                  >
                    {categoriesCount}
                  </span>
                </div>
              }
              sx={{
                "&.MuiTab-root.Mui-selected": {
                  color: "#D7282F",
                },
              }}
            />
            <Tab
              label={
                <div
                  className={classes.tabs}
                  onClick={() => TabChangeHandler("company")}
                >
                  Company{" "}
                  <span
                    className={
                      selectedTab === "company"
                        ? classes.countSelcted
                        : classes.count
                    }
                  >
                    {companyCount}
                  </span>
                </div>
              }
              sx={{
                "&.MuiTab-root.Mui-selected": {
                  color: "#D7282F",
                },
              }}
            />
            <Tab
              label={
                <div
                  className={classes.tabs}
                  onClick={() => TabChangeHandler("contact_list")}
                >
                  Contacts{" "}
                  <span
                    className={
                      selectedTab === "contact_list"
                        ? classes.countSelcted
                        : classes.count
                    }
                  >
                    {contactCount}
                  </span>
                </div>
              }
              sx={{
                "&.MuiTab-root.Mui-selected": {
                  color: "#D7282F",
                },
              }}
            />
            <Tab
              label={
                <div
                  className={classes.tabs}
                  onClick={() => TabChangeHandler("brand")}
                >
                  Brand{" "}
                  <span
                    className={
                      selectedTab === "brand"
                        ? classes.countSelcted
                        : classes.count
                    }
                  >
                    {brandCount}
                  </span>
                </div>
              }
              sx={{
                "&.MuiTab-root.Mui-selected": {
                  color: "#D7282F",
                },
              }}
            />
            <Tab
              label={
                <div
                  className={classes.tabs}
                  onClick={() => TabChangeHandler("unit")}
                >
                  Unit{" "}
                  <span
                    className={
                      selectedTab === "unit"
                        ? classes.countSelcted
                        : classes.count
                    }
                  >
                    {unitCount}
                  </span>
                </div>
              }
              sx={{
                "&.MuiTab-root.Mui-selected": {
                  color: "#D7282F",
                },
              }}
            />
          </Tabs>
        </MenuItem>
        <NotificationContainer
          id="scrollableDiv"
          length={notificationList?.length}
        >
          {/* InfiniteScroll
            dataLength={
              notificationList?.length > 0 ? notificationList.length : 0
            }
            next={() => FetchNotificationsCount("no", selectedTab)}
            hasMore={hasMore}
            loader={
              <LoadingTxt>
                {notificationList?.length > 0
                  ? "Loading..."
                  : "No notifications"}
              </LoadingTxt>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            scrollableTarget="scrollableDiv" */}
          <>
            {loader && NotificationSkeleton()}

            {!loader && notificationList?.length > 0 ? (
              notificationList?.map((item: any, index: any) => {
                const firstName = item.from_user?.name.split(" ")[0] || "User";
                if (item.from_user)
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        if (item?.type == "company") {
                          router.push(
                            "/companySettings/companyDetails?tab=company"
                          );
                        } else {
                          return;
                        }
                      }}
                    >
                      <Paper
                        sx={{
                          // p: 2,
                          padding: "12px",
                          margin: "auto",
                          maxWidth: 360,
                          // borderBottom: "1px solid #efefef",
                          borderRadius: 0,
                          flexGrow: 1,
                          borderBottom: "2px solid #fff",
                          boxShadow: "none",
                          transition: "all ease .5s",
                          backgroundColor: `${
                            item.status === "unread" ? "#f5f5f5" : ""
                          }`,
                          "&:hover": {
                            background: "#eaeaea",
                          },
                          position: "relative",
                        }}
                        onClick={() => {
                          if (item.status === "unread") {
                            handleReadNotification(item?.id, item?.type);
                          }
                        }}
                      >
                        {item.status ===
                          "unread" /*<UnreadNotification></UnreadNotification>*/ && (
                          <LightTooltip
                            placement="left"
                            title="Mark as read"
                            arrow
                            disableInteractive
                          >
                            <UnreadNotification>
                              <div className="pulse"></div>
                            </UnreadNotification>
                          </LightTooltip>
                        )}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            wordBreak: "break-all",
                          }}
                        >
                          {/* <LeftRedBorder> </LeftRedBorder> */}

                          <div>
                            <Avatar
                              alt={firstName}
                              src={`${
                                item.from_user?.profileimage?.source
                                // ||
                                // "/assets/notification/powercozmo_logo.svg"
                              }`}
                              sx={{
                                width: "10px",
                                height: "15px",
                                "& .MuiAvatar-root": {
                                  width: "20px",
                                  height: "20px",
                                },
                              }}
                            />
                          </div>
                          <Grid
                            container
                            spacing={2}
                            style={{ paddingLeft: 10 }}
                          >
                            <Gridnotificationdata item xs={12}>
                              <div
                                className="notificationinline"
                                style={{
                                  display: "inline",
                                  // flexDirection: "row",
                                  whiteSpace: "normal",
                                  alignItems: "center",
                                }}
                              >
                                {item.type == "product" && (
                                  // <Box display="inline">
                                  <TypographyProductName>
                                    <TypographySubtitle
                                      variant="subtitle1"
                                      // component="div"
                                    >
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: ` ${item.message}`,
                                        }}
                                        className="mainnameproduct"
                                        // style={{ fontWeight: 600 }}
                                      ></span>
                                    </TypographySubtitle>
                                  </TypographyProductName>
                                  // </Box>
                                )}
                                <TypographySubtitle
                                  variant="subtitle1"
                                  component="span"
                                >
                                  {item.type == "product" ? (
                                    item.title == "Product Approved"
                                  ) : (
                                    <NotificationData
                                      onClick={() => {
                                        router.replace("/seller/categories");
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html: ` ${item.message}`,
                                      }}
                                      className="mainnameproduct"
                                    ></NotificationData>
                                  )}
                                  <TypographyDetail
                                    variant="subtitle1"
                                    component="span"
                                    sx={{ paddingLeft: "5px" }}
                                  >
                                    {item.type == "members" && (
                                      <>
                                        <Typography
                                          style={{ fontSize: "12px" }}
                                        >
                                          {" "}
                                          {item.touser?.name == userName
                                            ? "You"
                                            : item.user_name}{" "}
                                          {item.message}
                                        </Typography>
                                      </>
                                    )}

                                    {item.type == "enquiries" && (
                                      <Typography style={{ fontSize: "12px" }}>
                                        {" "}
                                        {parse(item.enquiry_title)}
                                      </Typography>
                                    )}
                                  </TypographyDetail>
                                </TypographySubtitle>
                              </div>
                              <Grid item width="15">
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <TypographyDateTime
                                    component="div"
                                    width="20"
                                  >
                                    {moment(item.created_at).format(
                                      "DD MMM YYYY"
                                    )}
                                  </TypographyDateTime>

                                  {item.title == "Product Approved" && (
                                    <Button className="ClickHereBTN"
                                      size="small"
                                      onClick={(e) => {
                                        NavigateTopage(item);
                                      }}
                                    >
                                      Click here
                                    </Button>
                                  )}
                                </Box>
                              </Grid>
                            </Gridnotificationdata>
                          </Grid>
                        </div>
                      </Paper>
                    </MenuItem>
                  );
              })
            ) : (
              <Box
                display="fles"
                textAlign="center"
                sx={{ alignItems: "center" }}
                pt={"40px"}
                pl={14}
              >
                No New Notification
              </Box>
            )}
          </>
        </NotificationContainer>
        <MenuItem className={classes.buttonbottom}>
          {/* {notificationList?.length > 0 && (
            <ListItemIcon onClick={() => setAnchorEl(null)}>
              <CancelOutlinedIcon sx={{ color: "#7B7979" }} />
            </ListItemIcon>
          )} */}
          <ViewAllButton
            style={{ textTransform: "capitalize" }}
            dissable
            ripple
            variant="contained"
            onClick={() => router.push("/notifications")}
          >
            View All Notifications
          </ViewAllButton>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationDataList;
