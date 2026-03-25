import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProfileHeader } from "../common/profileheader";
import { TopHeader } from "../recentActivities/styles";
import NotificationCss from "./notification.module.css";
import {
  NotificationContainer,
  Headercontent,
  HeadTTxt,
  HeadDes,
  NotificationTabs,
  NotificationDec,
  NotificationDate,
  Iconcontainer,
  ActivityHeader,
  Noticontainer,
  Content,
  NotiItemTop,
  Notificationstatus,
  InnerNotification,
  NotificationTabLeft,
  Badges,
  BadgeshowonMd,
  DateNStautsBox,
  PulseBackground,
  PulseAndText,
  NotifcationFlexBox,
  NotificationInnerTabs,
  NotificationInnerButtonTab,
  NotificationInnerBadge,
} from "./style";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Image from "next/image";
import moment from "moment";
import NotificationSkeleton from "./notificationSkeleton";
import parse from "html-react-parser";
import EmptyPage from "../common/EmptyPage";
import { ReplaceSpaces, apiClient } from "../common/common";
import { ThreeDots } from "react-loader-spinner";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationBadge from "./notification-badge";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <Head>
        <title>Notifictions | Merchant AD</title>
      </Head>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0, pt: 1 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    </>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const NotificationPage = () => {
  const [productCount, setProductCount] = useState<number>(0);
  const [enquiriesCount, setEnquriesCount] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [companyCount, setCompanyCount] = useState<number>(0);
  const [contactCount, setContactCount] = useState<number>(0);
  const [allCount, setAllCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [brandCount, setBrandCount] = useState<number>(0);
  const [unitCount, setUnitCount] = useState<number>(0);
  const [notificationList, setNotificationList] = useState<any>([]);
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [readUnreadCount, setReadUnreadCount] = useState({
    read: 0,
    unread: 0,
  });

  const [selectedTab, setselectedTab] = useState("all");
  const [loader, setLoader] = useState<any>(false);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);

  const { user_info } = useSelector((state: any) => state.userData);
  const userType = user_info?.type ?? null;

  const notificationMessage = (title) => {
    if (title == "Product Updated") {
      return `updated  product `;
    } else if (title == "Product Created") {
      return `  created product`;
    } else if (title == "Product Deleted") {
      return ` deleted`;
    }
  };
  const router = useRouter();

  useEffect(() => {
    setShowSkeleton(true);
    if (userType) FetchNotificationsCount("");
  }, [userType]);

  useEffect(() => {
    if (user_info?.id !== "") {
      if (selectedTab == "all") {
        FetchNotificationsCount("");
      } else {
        FetchNotificationsCount(selectedTab);
      }
    }
  }, [selectedTab]);

  const handleRedirect = (item) => {
    if (item?.type == "product") {
      router.push("/products/List");
    } else if (item?.type == "company") {
      router.push("/companySettings/companyDetails?tab=company");
    } else if (item?.type == "enquiries") {
      router.push("/crm/leads");
    } else if(item?.title == "Category Rejected") {
      router.replace("/seller/categories");
    }
  };
  useEffect(() => {
    const readCount = notificationList?.filter(
      (val) => val?.status === "read"
    ).length;
    const unreadCount = notificationList?.filter(
      (val) => val?.status === "unread"
    ).length;
    setReadUnreadCount({ read: readCount, unread: unreadCount });
  }, [notificationList]);

  const FetchNotificationsCount = async (type) => {
    let response = await apiClient(
      `front/notifications?type=${type}&skip=0&take=10&only_count=no&user_type=${userType}`,
      "get"
    );
    if (response.status == 200) {
      setNotificationList((prev) => {
        return [...response.data.list];
      });

      setProductCount(response.data.product);
      setEnquriesCount(response.data.enquiries);
      setCategoriesCount(response.data.category);
      setCompanyCount(response.data.company);
      setTotalCount(response.data.total);
      setContactCount(response.data.contact_list);
      setBrandCount(response.data.brand);
      setAllCount(response.data.all);
      setUnitCount(response.data.unit);
    }

    setShowSkeleton(false);
  };

  const TabChangeHandler = (tab) => {
    setselectedTab(tab);
    setNotificationList([]);
    setShowSkeleton(true);
    if (tab == "all") {
      FetchNotificationsCount("");
    } else {
      FetchNotificationsCount(tab);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  const FetchMoreData = async () => {
    setLoader(true);
    let response = await apiClient(
      `front/notifications?type=${
        selectedTab.toLowerCase() == "all" ? "" : selectedTab
      }&skip=${
        notificationList.length
      }&take=${10}&only_count=no&user_type=${userType}`,
      "get"
    );
    if (response.status == 200) {
      setNotificationList((prev) => {
        return [...prev, ...response.data.list];
      });
    }
    setLoader(false);
  };

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
    if (item?.title == "Category Rejected") {
      router.replace("/seller/categories");
      return;
    }
  };

  const handleReadNotification = async (id: any, type: any) => {
    const payload = {
      id: id,
      type: type,
    };

    let response = await apiClient(`front/update_status`, "post", {
      body: payload,
    });

    if (response.status === 200) {
      setNotificationList((prev: any) => {
        return prev.map((notification: any) => {
          if (notification.id === id) {
            return { ...notification, status: "read" };
          } else {
            return notification;
          }
        });
      });
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Head>
        <title>Notifictions | Merchant AD</title>
      </Head>
      <div className="full_page">
        <Grid container direction={"row"}>
          <Grid item xs={12}>
            <TopHeader variant="h1">
              <ProfileHeader text={"Notifications"} />
            </TopHeader>
          </Grid>
        </Grid>

        <NotificationContainer>
          <InnerNotification>
            <NotifcationFlexBox>
              <Box>
                <Headercontent>
                  <HeadTTxt>You can check your Notifications.</HeadTTxt>
                </Headercontent>
                <HeadDes>
                  Now you can review and see everything from today and back.
                </HeadDes>
              </Box>
              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <SettingsOutlinedIcon
                    sx={{ fontSize: "20px", color: "#d7282f" }}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
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
                  <Box sx={{ padding: "6px" }}>
                    <MenuItem>Mark as all read</MenuItem>
                    <Divider variant="fullWidth" orientation="horizontal" />
                    <MenuItem>Notification Settings</MenuItem>
                  </Box>
                </Menu>
              </Box>
            </NotifcationFlexBox>
            <NotificationTabs>
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  "@media screen and (max-width:900px)": { display: "block" },
                }}
                className="notification-paper"
              >
                <NotificationTabLeft>
                  <Tabs
                    orientation={isMobile ? "horizontal" : "vertical"}
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    sx={{
                      "& .MuiTab-root": {
                        minWidth: "190px",
                        textTransform: "capitalize",
                        margin: "2px 4px",
                        "@media (max-width: 900px)": {
                          minWidth: "100px",
                        },
                      },
                      "& .MuiTab-root.Mui-selected": {
                        background: "#F1F1F1",
                        borderRadius: "6px",
                        color: "#D7282F",
                        margin: "2px 4px",
                      },

                      "& .MuiTabs-flexContainer": {
                        alignItems: "center",
                      },
                      "& .MuiButtonBase-root": {
                        padding: "0 10px",
                        minHeight: "35px",
                        alignItems: "flex-start",
                        "@media screen and (max-width:900px)": {
                          alignItems: "center",
                        },
                      },
                      "& .MuiButtonBase-root.Mui-selected span": {
                        background: "#d7282f",
                      },
                      "& .MuiTabs-indicator": {
                        background: "#d7282f",
                      },
                    }}
                  >
                    <Tab
                      onClick={() => {
                        TabChangeHandler("all");
                      }}
                      disableRipple={true}
                      label={
                        <>
                          <div>
                            All Notifications{" "}
                            <BadgeshowonMd
                              component={"span"}
                              className={
                                selectedTab === "all"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {allCount}
                            </BadgeshowonMd>
                          </div>
                          <Badges>
                            <span
                              className={
                                selectedTab === "all"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {allCount}
                            </span>
                          </Badges>
                        </>
                      }
                    />
                    <Tab
                      disableRipple={true}
                      onClick={() => {
                        TabChangeHandler("enquiries");
                      }}
                      label={
                        <>
                          <div>
                            Enquiries{" "}
                            <BadgeshowonMd
                              component={"span"}
                              className={
                                selectedTab === "enquiries"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {enquiriesCount}
                            </BadgeshowonMd>
                          </div>
                          <Badges>
                            <span
                              className={
                                selectedTab === "enquiries"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {enquiriesCount}
                            </span>
                          </Badges>
                        </>
                      }
                      {...a11yProps(1)}
                    />
                    <Tab
                      disableRipple={true}
                      onClick={() => {
                        TabChangeHandler("product");
                      }}
                      label={
                        <>
                          <div>
                            Products{" "}
                            <BadgeshowonMd
                              component={"span"}
                              className={
                                selectedTab === "product"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {productCount}
                            </BadgeshowonMd>
                          </div>
                          <Badges>
                            <span
                              className={
                                selectedTab === "product"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {productCount}
                            </span>
                          </Badges>
                        </>
                      }
                      {...a11yProps(3)}
                    />

                    <Tab
                      disableRipple={true}
                      onClick={() => {
                        TabChangeHandler("category");
                      }}
                      label={
                        <>
                          <div>
                            Categories{" "}
                            <BadgeshowonMd
                              component={"span"}
                              className={
                                selectedTab === "category"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {categoriesCount}
                            </BadgeshowonMd>
                          </div>
                          <Badges>
                            <span
                              className={
                                selectedTab === "category"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {categoriesCount}
                            </span>
                          </Badges>
                        </>
                      }
                      {...a11yProps(3)}
                    />
                    <Tab
                      disableRipple={true}
                      onClick={() => {
                        TabChangeHandler("company");
                      }}
                      label={
                        <>
                          <div>
                            Company{" "}
                            <BadgeshowonMd
                              component={"span"}
                              className={
                                selectedTab === "company"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {companyCount}
                            </BadgeshowonMd>
                          </div>
                          <Badges>
                            <span
                              className={
                                selectedTab === "company"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {companyCount}
                            </span>
                          </Badges>
                        </>
                      }
                      {...a11yProps(3)}
                    />
                    <Tab
                      disableRipple={true}
                      onClick={() => {
                        TabChangeHandler("contact_list");
                      }}
                      label={
                        <>
                          <div>
                            Contacts{" "}
                            <BadgeshowonMd
                              component={"span"}
                              className={
                                selectedTab === "contact_list"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {contactCount}
                            </BadgeshowonMd>
                          </div>
                          <Badges>
                            <span
                              className={
                                selectedTab === "contact_list"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {contactCount}
                            </span>
                          </Badges>
                        </>
                      }
                      {...a11yProps(3)}
                    />
                    <Tab
                      disableRipple={true}
                      onClick={() => {
                        TabChangeHandler("brand");
                      }}
                      label={
                        <>
                          <div>
                            Brands{" "}
                            <BadgeshowonMd
                              component={"span"}
                              className={
                                selectedTab === "brand"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {contactCount}
                            </BadgeshowonMd>
                          </div>
                          <Badges>
                            <span
                              className={
                                selectedTab === "brand"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {contactCount}
                            </span>
                          </Badges>
                        </>
                      }
                      {...a11yProps(3)}
                    />
                    <Tab
                      disableRipple={true}
                      onClick={() => {
                        TabChangeHandler("unit");
                      }}
                      label={
                        <>
                          <div>
                            Unit{" "}
                            <BadgeshowonMd
                              component={"span"}
                              className={
                                selectedTab === "unit"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {unitCount}
                            </BadgeshowonMd>
                          </div>
                          <Badges>
                            <span
                              className={
                                selectedTab === "unit"
                                  ? NotificationCss.countSelcted
                                  : NotificationCss.count
                              }
                            >
                              {unitCount}
                            </span>
                          </Badges>
                        </>
                      }
                      {...a11yProps(3)}
                    />
                  </Tabs>
                </NotificationTabLeft>
                <Box sx={{ width: "100%" }}>
                  <TabPanel value={value} index={0}>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <NotificationInnerTabs
                          value={value1}
                          onChange={handleChange1}
                          aria-label="basic tabs example"
                        >
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Read"
                                count={readUnreadCount?.read}
                              />
                            }
                            {...a11yProps(0)}
                          />
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Unread"
                                count={readUnreadCount?.unread}
                              />
                            }
                            {...a11yProps(1)}
                          />
                        </NotificationInnerTabs>
                      </Box>
                      <TabPanel value={value1} index={0}>
                        {showSkeleton && <NotificationSkeleton />}
                        {!showSkeleton && notificationList.length > 0 && (
                          <>
                            {!showSkeleton &&
                              notificationList?.map((item: any, index: any) => {
                                const firstName =
                                  item.from_user?.name.split(" ")[0] || "User";
                                if (
                                  item?.from_user &&
                                  item.status !== "unread"
                                ) {
                                  return (
                                    <Noticontainer
                                      className="jojo"
                                      index={index}
                                      value={
                                        item.status == "unread" ? true : false
                                      }
                                      onClick={() => {
                                        if (item.title !== "Product Approved")
                                          handleRedirect(item);
                                      }}
                                    >
                                      <NotiItemTop
                                        onClick={() =>
                                          handleReadNotification(item?.id, "")
                                        }
                                      >
                                        <ActivityHeader>
                                          <Iconcontainer>
                                            {item.from_user?.profileimage
                                              ?.source ? (
                                              <Image
                                                height={32}
                                                width={32}
                                                alt="Icon"
                                                src={
                                                  item.from_user?.profileimage
                                                    ?.source
                                                }
                                                style={{
                                                  borderRadius: "50%",
                                                  objectFit: "cover",
                                                }}
                                              />
                                            ) : (
                                              <Avatar
                                                alt={firstName}
                                                src={`${item.from_user?.profileimage?.source}`}
                                                sx={{
                                                  height: "32px",
                                                  width: "32px",
                                                }}
                                              />
                                            )}
                                          </Iconcontainer>
                                        </ActivityHeader>

                                        <Content>
                                          <NotificationDec
                                            onClick={() => NavigateTopage(item)}
                                          >
                                            <PulseAndText>
                                              <Box>
                                                <p
                                                  dangerouslySetInnerHTML={{
                                                    __html: item?.message,
                                                  }}
                                                  style={{ cursor: "pointer" }}
                                                ></p>
                                              </Box>
                                              {item.status === "unread" && (
                                                <PulseBackground>
                                                  <Box className="pulse"></Box>
                                                </PulseBackground>
                                              )}
                                            </PulseAndText>
                                          </NotificationDec>
                                          {item.type == "enquiries" && (
                                            <NotificationDec>
                                              <p
                                                dangerouslySetInnerHTML={{
                                                  __html: item.enquiry_title,
                                                }}
                                              ></p>
                                            </NotificationDec>
                                          )}
                                          <DateNStautsBox>
                                            <NotificationDate>
                                              {moment(item.created_at).format(
                                                "DD MMM YYYY"
                                              )}
                                            </NotificationDate>
                                            <Notificationstatus>
                                              {moment(
                                                item.created_at
                                              ).fromNow()}
                                            </Notificationstatus>
                                          </DateNStautsBox>
                                        </Content>
                                      </NotiItemTop>
                                    </Noticontainer>
                                  );
                                }
                              })}
                          </>
                        )}
                        {!showSkeleton && notificationList.length == 0 && (
                          <EmptyPage
                            logo="\assets\notification\Notifications.svg"
                            text="Notifications"
                            actiontext={false}
                          />
                        )}

                        {notificationList.length < totalCount && (
                          <Box
                            sx={{ textAlign: "center", margin: "12px 0 0 0" }}
                          >
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                      </TabPanel>
                      <TabPanel value={value1} index={1}>
                        {showSkeleton && <NotificationSkeleton />}
                        {!showSkeleton && notificationList.length > 0 && (
                          <>
                            {!showSkeleton &&
                              notificationList?.map((item: any, index: any) => {
                                const firstName =
                                  item.from_user?.name.split(" ")[0] || "User";
                                if (
                                  item?.from_user &&
                                  item.status === "unread"
                                ) {
                                  return (
                                    <Noticontainer
                                      className="jojo"
                                      index={index}
                                      value={
                                        item.status == "unread" ? true : false
                                      }
                                      onClick={() => {
                                        if (item.title !== "Product Approved")
                                          handleRedirect(item);
                                      }}
                                    >
                                      <NotiItemTop
                                        onClick={() =>
                                          handleReadNotification(item?.id, "")
                                        }
                                      >
                                        <ActivityHeader>
                                          <Iconcontainer>
                                            {item.from_user?.profileimage
                                              ?.source ? (
                                              <Image
                                                height={32}
                                                width={32}
                                                alt="Icon"
                                                src={
                                                  item.from_user?.profileimage
                                                    ?.source
                                                }
                                                style={{
                                                  borderRadius: "50%",
                                                  objectFit: "cover",
                                                }}
                                              />
                                            ) : (
                                              <Avatar
                                                alt={firstName}
                                                src={`${item.from_user?.profileimage?.source}`}
                                                sx={{
                                                  height: "32px",
                                                  width: "32px",
                                                }}
                                              />
                                            )}
                                          </Iconcontainer>
                                        </ActivityHeader>

                                        <Content>
                                          <NotificationDec
                                            onClick={() => NavigateTopage(item)}
                                          >
                                            <PulseAndText>
                                              <Box>
                                                <p
                                                  dangerouslySetInnerHTML={{
                                                    __html: item?.message,
                                                  }}
                                                  style={{ cursor: "pointer" }}
                                                ></p>
                                              </Box>
                                              {item.status === "unread" && (
                                                <PulseBackground>
                                                  <Box className="pulse"></Box>
                                                </PulseBackground>
                                              )}
                                            </PulseAndText>
                                          </NotificationDec>
                                          {item.type == "enquiries" && (
                                            <NotificationDec>
                                              <p
                                                dangerouslySetInnerHTML={{
                                                  __html: item.enquiry_title,
                                                }}
                                              ></p>
                                            </NotificationDec>
                                          )}
                                          <DateNStautsBox>
                                            <NotificationDate>
                                              {moment(item.created_at).format(
                                                "DD MMM YYYY"
                                              )}
                                            </NotificationDate>
                                            <Notificationstatus>
                                              {moment(
                                                item.created_at
                                              ).fromNow()}
                                            </Notificationstatus>
                                          </DateNStautsBox>
                                        </Content>
                                      </NotiItemTop>
                                    </Noticontainer>
                                  );
                                }
                              })}
                          </>
                        )}
                        {!showSkeleton && notificationList.length == 0 && (
                          <EmptyPage
                            logo="\assets\notification\Notifications.svg"
                            text="Notifications"
                            actiontext={false}
                          />
                        )}

                        {notificationList.length < totalCount && (
                          <Box
                            sx={{ textAlign: "center", margin: "12px 0 0 0" }}
                          >
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                      </TabPanel>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <NotificationInnerTabs
                          value={value1}
                          onChange={handleChange1}
                          aria-label="basic tabs example"
                        >
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Read"
                                count={readUnreadCount?.read}
                              />
                            }
                            {...a11yProps(0)}
                          />
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Unread"
                                count={readUnreadCount?.unread}
                              />
                            }
                            {...a11yProps(1)}
                          />
                        </NotificationInnerTabs>
                      </Box>
                      <TabPanel value={value1} index={0}>
                        {showSkeleton && <NotificationSkeleton />}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status !== "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(
                                        item?.id,
                                        "enquiries"
                                      )
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                          style={{
                                            borderRadius: "50px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>

                                    <Content>
                                      {item.type == "enquiries" && (
                                        <NotificationDec>
                                          <PulseAndText>
                                            {parse(item.enquiry_title)}
                                            <p
                                              style={{ cursor: "pointer" }}
                                              dangerouslySetInnerHTML={{
                                                __html: item.message,
                                              }}
                                              onClick={() =>
                                                NavigateTopage(item)
                                              }
                                            ></p>
                                            {item.status === "unread" && (
                                              <PulseBackground>
                                                <Box className="pulse"></Box>
                                              </PulseBackground>
                                            )}
                                          </PulseAndText>
                                        </NotificationDec>
                                      )}
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}
                        {!showSkeleton && notificationList?.length === 0 && (
                          <>
                            <EmptyPage
                              logo="/assets/notification/Enquiries.svg"
                              text="Enquiries"
                              actiontext={false}
                            />
                          </>
                        )}
                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                      </TabPanel>
                      <TabPanel value={value1} index={1}>
                        {showSkeleton && <NotificationSkeleton />}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status === "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(
                                        item?.id,
                                        "enquiries"
                                      )
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                          style={{
                                            borderRadius: "50px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>

                                    <Content>
                                      {item.type == "enquiries" && (
                                        <NotificationDec>
                                          <PulseAndText>
                                            {parse(item.enquiry_title)}
                                            <p
                                              style={{ cursor: "pointer" }}
                                              dangerouslySetInnerHTML={{
                                                __html: item.message,
                                              }}
                                              onClick={() =>
                                                NavigateTopage(item)
                                              }
                                            ></p>
                                            {item.status === "unread" && (
                                              <PulseBackground>
                                                <Box className="pulse"></Box>
                                              </PulseBackground>
                                            )}
                                          </PulseAndText>
                                        </NotificationDec>
                                      )}
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}
                        {!showSkeleton && notificationList?.length === 0 && (
                          <>
                            <EmptyPage
                              logo="/assets/notification/Enquiries.svg"
                              text="Enquiries"
                              actiontext={false}
                            />
                          </>
                        )}
                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                      </TabPanel>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <NotificationInnerTabs
                          value={value1}
                          onChange={handleChange1}
                          aria-label="basic tabs example"
                        >
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Read"
                                count={readUnreadCount?.read}
                              />
                            }
                            {...a11yProps(0)}
                          />
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Unread"
                                count={readUnreadCount?.unread}
                              />
                            }
                            {...a11yProps(1)}
                          />
                        </NotificationInnerTabs>
                      </Box>
                      <TabPanel value={value1} index={0}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                // onClick={() => handleRedirect(item)}
                              >
                                {item?.status !== "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(
                                        item?.id,
                                        "product"
                                      )
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                          style={{
                                            borderRadius: "50px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>

                                    <Content>
                                      <NotificationDec>
                                        {" "}
                                        {item.type == "product" ? (
                                          <PulseAndText>
                                            <p
                                              style={{ cursor: "pointer" }}
                                              dangerouslySetInnerHTML={{
                                                __html: item.message,
                                              }}
                                              onClick={() =>
                                                NavigateTopage(item)
                                              }
                                            ></p>
                                            {item.status === "unread" && (
                                              <PulseBackground>
                                                <Box className="pulse"></Box>
                                              </PulseBackground>
                                            )}
                                          </PulseAndText>
                                        ) : (
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                        )}
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}

                        {!showSkeleton && notificationList?.length === 0 && (
                          <>
                            <EmptyPage
                              logo="\assets\notification\product.svg"
                              text="Products"
                              actiontext={false}
                            />
                          </>
                        )}
                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                      </TabPanel>
                      <TabPanel value={value1} index={1}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                // onClick={() => handleRedirect(item)}
                              >
                                {item?.status === "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(
                                        item?.id,
                                        "product"
                                      )
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                          style={{
                                            borderRadius: "50px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>

                                    <Content>
                                      <NotificationDec>
                                        {" "}
                                        {item.type == "product" ? (
                                          <PulseAndText>
                                            <p
                                              style={{ cursor: "pointer" }}
                                              dangerouslySetInnerHTML={{
                                                __html: item.message,
                                              }}
                                              onClick={() =>
                                                NavigateTopage(item)
                                              }
                                            ></p>
                                            {item.status === "unread" && (
                                              <PulseBackground>
                                                <Box className="pulse"></Box>
                                              </PulseBackground>
                                            )}
                                          </PulseAndText>
                                        ) : (
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                        )}
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}

                        {!showSkeleton && notificationList?.length === 0 && (
                          <>
                            <EmptyPage
                              logo="\assets\notification\product.svg"
                              text="Products"
                              actiontext={false}
                            />
                          </>
                        )}
                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                      </TabPanel>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <NotificationInnerTabs
                          value={value1}
                          onChange={handleChange1}
                          aria-label="basic tabs example"
                        >
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Read"
                                count={readUnreadCount?.read}
                              />
                            }
                            {...a11yProps(0)}
                          />
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Unread"
                                count={readUnreadCount?.unread}
                              />
                            }
                            {...a11yProps(1)}
                          />
                        </NotificationInnerTabs>
                      </Box>
                      <TabPanel value={value1} index={0}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status !== "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(
                                        item?.id,
                                        "category"
                                      )
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          style={{ borderRadius: "50px" }}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>
                                    <Content>
                                      <NotificationDec>
                                        {" "}
                                        <PulseAndText>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                          {item.status === "unread" && (
                                            <PulseBackground>
                                              <Box className="pulse"></Box>
                                            </PulseBackground>
                                          )}
                                        </PulseAndText>
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}
                        {!showSkeleton && notificationList.length === 0 ? (
                          <EmptyPage
                            logo="\assets\notification\Categories.svg"
                            text="Categories"
                            actiontext={false}
                          />
                        ) : (
                          ""
                        )}

                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                      </TabPanel>
                      <TabPanel value={value1} index={1}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status === "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(
                                        item?.id,
                                        "category"
                                      )
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          style={{ borderRadius: "50px" }}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>
                                    <Content>
                                      <NotificationDec>
                                        {" "}
                                        <PulseAndText>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                          {item.status === "unread" && (
                                            <PulseBackground>
                                              <Box className="pulse"></Box>
                                            </PulseBackground>
                                          )}
                                        </PulseAndText>
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}
                        {!showSkeleton && notificationList.length === 0 ? (
                          <EmptyPage
                            logo="\assets\notification\Categories.svg"
                            text="Categories"
                            actiontext={false}
                          />
                        ) : (
                          ""
                        )}

                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                      </TabPanel>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <NotificationInnerTabs
                          value={value1}
                          onChange={handleChange1}
                          aria-label="basic tabs example"
                        >
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Read"
                                count={readUnreadCount?.read}
                              />
                            }
                            {...a11yProps(0)}
                          />
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Unread"
                                count={readUnreadCount?.unread}
                              />
                            }
                            {...a11yProps(1)}
                          />
                        </NotificationInnerTabs>
                      </Box>
                      <TabPanel value={value1} index={0}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                index={index}
                                value={item.status == "unread" ? true : false}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status !== "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(
                                        item?.id,
                                        "company"
                                      )
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          style={{ borderRadius: "50px" }}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>
                                    <Content>
                                      <NotificationDec>
                                        <PulseAndText>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                          {item.status === "unread" && (
                                            <PulseBackground>
                                              <Box className="pulse"></Box>
                                            </PulseBackground>
                                          )}
                                          {/* {item.message} */}
                                        </PulseAndText>
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}

                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                        {!showSkeleton && notificationList.length == 0 ? (
                          <EmptyPage
                            logo="\assets\notification\company.svg"
                            text="Company"
                            actiontext={false}
                          />
                        ) : (
                          ""
                        )}
                      </TabPanel>
                      <TabPanel value={value1} index={1}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                index={index}
                                value={item.status == "unread" ? true : false}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status === "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(
                                        item?.id,
                                        "company"
                                      )
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          style={{ borderRadius: "50px" }}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>
                                    <Content>
                                      <NotificationDec>
                                        <PulseAndText>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                          {item.status === "unread" && (
                                            <PulseBackground>
                                              <Box className="pulse"></Box>
                                            </PulseBackground>
                                          )}
                                          {/* {item.message} */}
                                        </PulseAndText>
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}

                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                        {!showSkeleton && notificationList.length == 0 ? (
                          <EmptyPage
                            logo="\assets\notification\company.svg"
                            text="Company"
                            actiontext={false}
                          />
                        ) : (
                          ""
                        )}
                      </TabPanel>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <NotificationInnerTabs
                          value={value1}
                          onChange={handleChange1}
                          aria-label="basic tabs example"
                        >
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Read"
                                count={readUnreadCount?.read}
                              />
                            }
                            {...a11yProps(0)}
                          />
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Unread"
                                count={readUnreadCount?.unread}
                              />
                            }
                            {...a11yProps(1)}
                          />
                        </NotificationInnerTabs>
                      </Box>
                      <TabPanel value={value1} index={0}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status !== "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(
                                        item?.id,
                                        "contact_list"
                                      )
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          style={{ borderRadius: "50px" }}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>
                                    <Content>
                                      <NotificationDec>
                                        <PulseAndText>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                          {item.status === "unread" && (
                                            <PulseBackground>
                                              <Box className="pulse"></Box>
                                            </PulseBackground>
                                          )}
                                          {/* {item.message} */}
                                        </PulseAndText>
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}
                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                        {!showSkeleton && notificationList.length === 0 ? (
                          <EmptyPage
                            logo="\assets\notification\Contact.svg"
                            text="Contacts"
                            actiontext={false}
                          />
                        ) : (
                          ""
                        )}
                      </TabPanel>
                      <TabPanel value={value1} index={1}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status === "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(
                                        item?.id,
                                        "contact_list"
                                      )
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          style={{ borderRadius: "50px" }}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>
                                    <Content>
                                      <NotificationDec>
                                        <PulseAndText>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                          {item.status === "unread" && (
                                            <PulseBackground>
                                              <Box className="pulse"></Box>
                                            </PulseBackground>
                                          )}
                                          {/* {item.message} */}
                                        </PulseAndText>
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}
                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                        {!showSkeleton && notificationList.length === 0 ? (
                          <EmptyPage
                            logo="\assets\notification\Contact.svg"
                            text="Contacts"
                            actiontext={false}
                          />
                        ) : (
                          ""
                        )}
                      </TabPanel>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={6}>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <NotificationInnerTabs
                          value={value1}
                          onChange={handleChange1}
                          aria-label="basic tabs example"
                        >
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Read"
                                count={readUnreadCount?.read}
                              />
                            }
                            {...a11yProps(0)}
                          />
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Unread"
                                count={readUnreadCount?.unread}
                              />
                            }
                            {...a11yProps(1)}
                          />
                        </NotificationInnerTabs>
                      </Box>
                      <TabPanel value={value1} index={0}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status !== "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(item?.id, "brand")
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          style={{ borderRadius: "50px" }}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>
                                    <Content>
                                      <NotificationDec>
                                        <PulseAndText>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                          {item.status === "unread" && (
                                            <PulseBackground>
                                              <Box className="pulse"></Box>
                                            </PulseBackground>
                                          )}
                                          {/* {item.message} */}
                                        </PulseAndText>
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}

                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                        {!showSkeleton && notificationList.length == 0 ? (
                          <EmptyPage
                            logo="\assets\notification\Brands.svg"
                            text="Brand"
                            actiontext={false}
                          />
                        ) : (
                          ""
                        )}
                      </TabPanel>
                      <TabPanel value={value1} index={1}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status === "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(item?.id, "brand")
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          style={{ borderRadius: "50px" }}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>
                                    <Content>
                                      <NotificationDec>
                                        <PulseAndText>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                          {item.status === "unread" && (
                                            <PulseBackground>
                                              <Box className="pulse"></Box>
                                            </PulseBackground>
                                          )}
                                          {/* {item.message} */}
                                        </PulseAndText>
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}

                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                        {!showSkeleton && notificationList.length == 0 ? (
                          <EmptyPage
                            logo="\assets\notification\Brands.svg"
                            text="Brand"
                            actiontext={false}
                          />
                        ) : (
                          ""
                        )}
                      </TabPanel>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={7}>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <NotificationInnerTabs
                          value={value1}
                          onChange={handleChange1}
                          aria-label="basic tabs example"
                        >
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Read"
                                count={readUnreadCount?.read}
                              />
                            }
                            {...a11yProps(0)}
                          />
                          <NotificationInnerButtonTab
                            label={
                              <NotificationBadge
                                type="Unread"
                                count={readUnreadCount?.unread}
                              />
                            }
                            {...a11yProps(1)}
                          />
                        </NotificationInnerTabs>
                      </Box>
                      <TabPanel value={value1} index={0}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status !== "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(item?.id, "unit")
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          style={{ borderRadius: "50px" }}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>
                                    <Content>
                                      <NotificationDec>
                                        <PulseAndText>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                          {item.status === "unread" && (
                                            <PulseBackground>
                                              <Box className="pulse"></Box>
                                            </PulseBackground>
                                          )}
                                          {/* {item.message} */}
                                        </PulseAndText>
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}

                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                        {notificationList.length == 0 ? (
                          <EmptyPage
                            logo="\assets\notification\Unit.svg"
                            text="Unit"
                            actiontext={false}
                          />
                        ) : (
                          ""
                        )}
                      </TabPanel>
                      <TabPanel value={value1} index={1}>
                        {showSkeleton && (
                          <>
                            <NotificationSkeleton />
                          </>
                        )}
                        {!showSkeleton &&
                          notificationList?.map((item: any, index: any) => {
                            return (
                              <Noticontainer
                                value={item.status == "unread" ? true : false}
                                index={index}
                                onClick={() => handleRedirect(item)}
                              >
                                {item?.status === "unread" && (
                                  <NotiItemTop
                                    onClick={() =>
                                      handleReadNotification(item?.id, "unit")
                                    }
                                  >
                                    <ActivityHeader>
                                      <Iconcontainer>
                                        <Image
                                          height={22}
                                          width={22}
                                          style={{ borderRadius: "50px" }}
                                          alt="Icon"
                                          src={`${
                                            item.display_image ||
                                            "/assets/notification/powercozmo_logo.svg"
                                          }`}
                                        />
                                      </Iconcontainer>
                                    </ActivityHeader>
                                    <Content>
                                      <NotificationDec>
                                        <PulseAndText>
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: item.message,
                                            }}
                                          ></p>
                                          {item.status === "unread" && (
                                            <PulseBackground>
                                              <Box className="pulse"></Box>
                                            </PulseBackground>
                                          )}
                                          {/* {item.message} */}
                                        </PulseAndText>
                                      </NotificationDec>
                                      <DateNStautsBox>
                                        <NotificationDate>
                                          {moment(item.created_at).format(
                                            "DD MMM YYYY"
                                          )}
                                        </NotificationDate>
                                        <Notificationstatus>
                                          {moment(item.created_at).fromNow()}
                                        </Notificationstatus>
                                      </DateNStautsBox>
                                    </Content>
                                  </NotiItemTop>
                                )}
                              </Noticontainer>
                            );
                          })}

                        {notificationList.length < totalCount && (
                          <Box sx={{ textAlign: "center" }}>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                minWidth: "90px",
                                marginLeft: "auto",
                              }}
                              onClick={FetchMoreData}
                              disabled={loader}
                            >
                              {loader ? (
                                <ThreeDots
                                  height="30"
                                  width="30"
                                  radius="7"
                                  color="#D7282F"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "View More"
                              )}
                            </Button>
                          </Box>
                        )}
                        {notificationList.length == 0 ? (
                          <EmptyPage
                            logo="\assets\notification\Unit.svg"
                            text="Unit"
                            actiontext={false}
                          />
                        ) : (
                          ""
                        )}
                      </TabPanel>
                    </Box>
                  </TabPanel>
                </Box>
              </Box>
            </NotificationTabs>
          </InnerNotification>
        </NotificationContainer>
      </div>
    </>
  );
};
export default NotificationPage;
