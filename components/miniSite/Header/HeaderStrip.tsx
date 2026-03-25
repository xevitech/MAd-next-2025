import {
  Box,
  ButtonBase,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  Popover,
  styled,
  Typography,
} from "@mui/material";
import { Avatar, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import {
  BusinessText,
  ChipButton,
  CountryText,
  LeftGrid,
  LogoBox,
  ManufactureText,
  MiniSiteContainer,
  RatingChip,
  RatingStack,
  RightGrid,
  StripedBox,
  Typoheading,
  YearChip,
  CompanyNamContent,
  MainProdLbl,
  Mapcontainer,
  CompanyInfoPopup,
  ContentAlign,
  MainProductsBox,
  MapTndTextFlex,
  CompanyName,
  Since,
  VarifyBox,
  VarifyText,
  MapBox,
  HeadingLabel,
  AnswerLabel,
  MapcrowntBox,
  BusinessTypeBox,
  MapcrowntBoxImage,
  Popoverdata,
} from "../styled";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/lab";
import Image from "next/image";
import router from "next/router";
import moment from "moment";
import { toast } from "react-toastify";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { returnCountryFromCode } from "@/utils/commonFunctions/other";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { setDetailPopOver } from "@/hooks/miniSite";
import {
  apiClient,
  convertDateTimeToFormat,
  FirstletterCapital,
} from "@/components/common/common";
import { Followersbutton } from "@/components/CompanySettings/style";
import FollowerListModal from "@/components/CompanySettings/Modal/CompanyDetailModalheader";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { setUnit } from "@/hooks/HeaderHooks";
import { AddUnitList } from "@/hooks/productDetailsReducer";
import Swal from "sweetalert2";
import QuerySupplierModal from "@/components/ProductDetail/ProductComponents/Modal/QuickLoginModal/MiniSiteQuerySupplier";
import {
  getBussinessTypeIcon,
  getSymbolByName,
  isValidDate,
} from "@/components/Helper";

function HeaderInfoPopup({ data }) {
  const { headerData } = useSelector((state: any) => state.miniSite);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupdata, setPopupdata] = useState([]);
  const hoverCertificateData = headerData?.certificates?.join(", ");

  const certificateData = headerData?.certificates;
  const certificateSlice =
    certificateData?.length > 0
      ? certificateData.slice(0, 2).join(",")
      : certificateData;
  function calculateYear() {
    return convertDateTimeToFormat(
      headerData?.location_of_registration?.registration_year
    );
  }

  const locationMap = `https://maps.googleapis.com/maps/api/staticmap?center=${returnCountryFromCode(
    headerData?.location_of_registration?.registration_country_id
  )}&markers=color:red%7Clabel:P%7C${returnCountryFromCode(
    headerData?.location_of_registration?.registration_country_id
  )}&zoom=2&size=97x63&key=AIzaSyAeo9TJaGkY6bcKri6tsXp8VhtYYv94H1g`;

  useEffect(() => {
    fetchUnits();
  }, []);
  const dispatch = useDispatch();
  const fetchUnits = async () => {
    let response = await apiClient("unit", "get");
    if (response?.data) {
      dispatch(setUnit(response?.data));
      dispatch(AddUnitList(response?.data));
    }
  };
  console.log("headerData----", headerData);
  return (
    <>
      <Mapcontainer className="MapFlyout">
        <Box sx={{ padding: "16px" }}>
          <Grid container spacing={{ xs: 2 }}>
            <Grid item xs={12}>
              <MapTndTextFlex>
                <MapBox>
                  <img
                    src={locationMap}
                    alt="Seller Location"
                    style={{
                      border: "1px solid #dcdcdc",
                      padding: "4px",
                      borderRadius: "6px",
                    }}
                  />
                </MapBox>
                <Box>
                  <CompanyName>
                    {headerData?.contact_profile?.name
                      ? FirstletterCapital(headerData?.contact_profile?.name)
                      : ""}
                  </CompanyName>
                  <MapcrowntBox>
                    <MapcrowntBoxImage>
                      {headerData?.basic_information?.plan_status?.icon && (
                        <LightTooltip
                          placement="top"
                          title={
                            headerData?.basic_information?.plan_status
                              ?.display_name
                          }
                          arrow
                          disableInteractive
                        >
                          <img
                            src={
                              headerData?.basic_information?.plan_status?.icon
                            }
                            alt={
                              headerData?.basic_information?.plan_status
                                ?.display_name
                            }
                            width={75}
                            className={
                              headerData?.basic_information?.plan_status
                                ?.display_name == "Enterprise"
                                ? "enterpricebadge"
                                : ""
                            }
                          />
                        </LightTooltip>
                      )}
                    </MapcrowntBoxImage>
                    <Since>{calculateYear()}</Since>
                    {/* <VarifyBox
                      sx={{
                        backgroundColor: headerData?.basic_information
                          ?.is_company_approved
                          ? "#D4F5CF"
                          : "rgba(215, 40, 47, 0.07)",
                      }}
                    >
                      <VarifyText
                        sx={{
                          color: headerData?.basic_information
                            ?.is_company_approved
                            ? "#3E8C32"
                            : "#D7282F",
                        }}
                      >
                        {headerData?.basic_information?.is_company_approved
                          ? "Verified"
                          : "Not Verified"}
                      </VarifyText>
                    </VarifyBox> */}

                    {headerData?.basic_information?.is_company_approved && (
                      <VarifyBox>
                        <img
                          src="/assets/verifyWtext.svg"
                          width="60"
                          height="21"
                          loading="lazy" // Lazy load for better performance
                        />
                      </VarifyBox>
                    )}
                  </MapcrowntBox>
                  <BusinessTypeBox>
                    <AnswerLabel>
                      {data?.busiType?.map((prev, i) => (
                        <Box
                          key={i}
                          component="span"
                          sx={{
                            display: "inline-flex",
                            gap: "2px",
                            color: `${
                              prev?.toggle == 0 ? "" : "rgb(215, 40, 47)"
                            }`,
                          }}
                        >
                          {`${prev.name}`}
                          {prev?.tooltip?.length > 0 && (
                            <InfoOutlinedIcon
                              style={{
                                fontSize: "16px",
                                marginLeft: 1,
                              }}
                              onMouseEnter={(e: any) => {
                                setAnchorEl(e.currentTarget);
                                setPopupdata(
                                  typeof prev.tooltip == "string"
                                    ? [prev.tooltip]
                                    : prev.tooltip
                                );
                              }}
                              onMouseLeave={(e) => {
                                setAnchorEl(null);
                                setPopupdata([]);
                              }}
                            />
                          )}
                          {`${
                            i + 1 === data?.busiType.length ? "" : ",\u00A0"
                          }`}
                        </Box>
                      ))}
                    </AnswerLabel>
                  </BusinessTypeBox>
                </Box>
              </MapTndTextFlex>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              xl={6}
              sx={{
                borderRight: "1px solid #cacaca",
                "@media screen and (max-width:1200px)": { border: "none" },
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
                  <HeadingLabel>Company Location :</HeadingLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <AnswerLabel>
                    {data?.city
                      ? `${data?.city}, ${returnCountryFromCode(
                          data?.location
                        )}`
                      : "N/A"}
                  </AnswerLabel>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
                  <HeadingLabel>Year In Established :</HeadingLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <AnswerLabel>
                    {isValidDate(data?.estayear) ? data?.estayear : "N/A"}
                  </AnswerLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
                  <HeadingLabel>Management Certification :</HeadingLabel>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  {/* <LightTooltip title={hoverCertificateData} arrow> */}
                  <AnswerLabel>
                    {certificateData?.length > 0
                      ? `${certificateData[0].name}...`
                      : "N/A"}
                  </AnswerLabel>
                  {/* </LightTooltip> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              xl={6}
              sx={{
                "@media screen and (max-width:1200px)": {
                  paddingTop: "0px !important",
                },
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
                  <HeadingLabel>No. of employees :</HeadingLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <AnswerLabel>
                    {data?.employees ? data?.employees : "N/A"}
                  </AnswerLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
                  <HeadingLabel>Annual Revenue :</HeadingLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <AnswerLabel>
                    {data?.revenue ? data?.revenue : "N/A"}
                  </AnswerLabel>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
                  <HeadingLabel>Registered Capital:</HeadingLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <AnswerLabel>
                    {getSymbolByName(
                      headerData?.location_of_registration?.reg_currency
                    )}{" "}
                    {headerData?.location_of_registration?.registered_capital
                      ? headerData?.location_of_registration?.registered_capital
                      : "N/A"}
                  </AnswerLabel>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  borderTop: "1px solid #dcdcdc",
                  padding: "12px 0 0 0 ",
                  paddingBottom: "10px",
                }}
              >
                <Box>
                  <Grid container spacing={0}>
                    <Grid item xs={4} sm={6} md={3} lg={2} xl={2}>
                      <HeadingLabel>Main Product :</HeadingLabel>
                    </Grid>
                    <Grid item xs={7} sm={6} md={9} lg={9} xl={10}>
                      <AnswerLabel>
                        {data?.mainproduct?.length > 0 ? (
                          data?.mainproduct?.map((item, i) => (
                            <Box
                              key={i}
                              component="span"
                              sx={{
                                cursor: "pointer",
                                "&:hover": {
                                  color: "#d7282f",
                                },
                              }}
                              onClick={() => {
                                router.push(
                                  `/mini-site/${headerData?.basic_information?.slug}/products`
                                );
                              }}
                            >
                              {" "}
                              <Link
                                sx={{
                                  "&:hover": { color: "#d7282f" },
                                }}
                              >
                                {" "}
                                {item}
                              </Link>
                              {i === data?.mainproduct.length - 1
                                ? " "
                                : i != 10 && ", "}
                            </Box>
                          ))
                        ) : (
                          <>N/A</>
                        )}
                      </AnswerLabel>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Mapcontainer>
      {Boolean(anchorEl) && popupdata.length > 0 && (
        <Popover
          id="mouse-over-popover"
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              minWidth: "100px",
            },
          }}
          sx={{
            pointerEvents: "none",
          }}
          open={Boolean(open)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={() => {
            setAnchorEl(null);
            setPopupdata([]);
          }}
          disableRestoreFocus
          disableScrollLock
        >
          {popupdata?.map((v, i) => (
            <Typography
              sx={{ p: 0.5, fontSize: "13px" }}
              key={i}
              fontSize={"14px"}
            >
              <Popoverdata>{v}</Popoverdata>
            </Typography>
          ))}
        </Popover>
      )}
    </>
  );
}

const HeaderStrip = () => {
  const { headerData, headerLoading } = useSelector(
    (state: any) => state.miniSite
  );
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [followerCount, setFollowerCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [dataLoader, setDataLoader] = React.useState(false);
  let user_id = JSON.parse(localStorage.getItem("userData"))?.id;
  const handleOpen = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData?.id) {
      setOpen(true);
      setDataLoader(true);
      await FetchFollowerList(skip);
      setDataLoader(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setFollowerList([]);
    setSkip(0);
    setFollowerCount(0);
  };
  const [popupdata, setPopupdata] = React.useState<any>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [followerList, setFollowerList] = useState<any>([]);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      location: headerData?.location_of_registration?.registration_country_id,
      busiType: headerData?.business_type,
      acType: headerData?.user_info?.job_role,
      estayear: moment(headerData?.basic_information?.registration_year).format(
        "YYYY"
      ),
      mcertificate: headerData?.location_of_registration?.certification_file,
      capital: null,
      revenue: headerData?.basic_information?.yearly_revenue,
      employees: headerData?.basic_information?.no_of_employee,
      mainproduct: headerData?.basic_information?.company_products,
      city: headerData?.location_of_registration?.registration_city,
    };

    setPopupdata({ ...data });
  };

  function calculateYear() {
    return convertDateTimeToFormat(
      headerData?.location_of_registration?.registration_year
    );
  }

  const { minisiteUserID, allReview } = useSelector(
    (state: any) => state.miniSite
  );
  const openSupplierModel = () => {
    let userData = localStorage.getItem("userData");
    let user = JSON.parse(userData);
    if (!user?.id) {
      toast.error("Please login to contact supplier");
      router.push(`/user/signin?minisite=${router?.query?.id?.[0]}`);
      return;
    } else if (user?.id == minisiteUserID) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: "",
        text: "You cannot contact for your own product.",
        icon: "warning",
        showCancelButton: false,
        reverseButtons: true,
      });
      return;
    } else {
      window.removeEventListener("popstate", handlePopstate);
      setOpenModal(true);
    }
  };

  const FetchFollowerList = async (skip) => {
    let response = await apiClient(
      `front/user/follower_list?skip=${skip}&take=${5}&status=${1}&shop_id=${
        headerData?.basic_information?.user_id
      }`,
      "get"
    );
    if (response.status) {
      setFollowerCount(response.total);
      setFollowerList((prev) => [...prev, ...response.data]);
    }
  };

  const handlePopstate = () => {
    setOpenModal(false);
    Swal.close();
  };

  window.addEventListener("popstate", handlePopstate);

  const loadMoreData = async () => {
    if (followerList.length < followerCount) {
      setButtonLoader(true);
      await FetchFollowerList(skip + 4);
      setSkip((prev) => prev + 4);
      setButtonLoader(false);
    }
  };

  const SupplierButton = styled(ButtonBase)(({ theme }: any) => ({
    position: "relative",
    backgroundColor: "white",
    borderRadius: "290px",
    border: "2px solid transparent",
    height: "38px",
    padding: "5px",
    transition: "all ease .3s",

    "@media screen and (max-width:1024px)": {
      height: "36px",
    },
    "&:hover": {
      borderColor: user_id != minisiteUserID ? "#D7282F" : "",
      "& .MuiTypography-root": {
        color: user_id != minisiteUserID ? "#D7282F" : "",
      },
    },
    [theme.breakpoints.down("sm")]: {},
    "& .MuiTypography-root": {
      color: "rgba(55, 120, 149, 1)",
      fontSize: "13px",
      fontWeight: 600,
      marginLeft: "8px",
      marginRight: "8px",
      paddingLeft: "8px",
      transition: "all ease .3s",
      borderLeft: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.down("md")]: {
        border: "none",
        padding: "0px",
      },
    },
    "& .MuiBox-root": {
      position: "relative",
    },
    "& .MuiIconButton-root": {
      position: "absolute",
      bottom: -10,
      right: -10,
      zIndex: 2,
      background: "#EFEFEF",
      border: "1px solid #DBDBDB",
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiTypography-root": {},
    },
    [theme.breakpoints.down("md")]: {
      "& .MuiTypography-root": {
        borderLeft: "none",
      },
    },
  }));
  const liked = headerData?.basic_information?.user_liked;
  return (
    <>
      <StripedBox
        paddingX={{ lg: 2, xs: 1 }}
        paddingY={{ lg: 1, xs: 1.5 }}
        sx={{
          "@media screen and (max-width:600px)": {
            display: "none",
          },
        }}
      >
        {openModal && (
          <QuerySupplierModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
          />
        )}
        <MiniSiteContainer>
          <Grid container alignItems="center">
            <LeftGrid item xl={8} lg={7} md={7}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LogoBox display={{ xs: "none", lg: "block" }}>
                  {!dataLoader ? (
                    <img
                      src={
                        headerData?.contact_profile?.profile_image ||
                        "/assets/default/defaultCompanyImage.png"
                      }
                      width={170}
                      height={160}
                      alt="/assets/miniSiteprofile.svg"
                      onClick={() =>
                        router.push(`/mini-site/${router?.query?.id[0]}/home`)
                      }
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <Skeleton variant="rectangular" width={170} height={130} />
                  )}
                </LogoBox>

                <LogoBox display={{ xs: "none", md: "block", lg: "none" }}>
                  <Image
                    width={112}
                    height={120}
                    src={
                      headerData?.contact_profile?.profile_image ||
                      "/assets/default/defaultCompanyImage.png"
                    }
                    alt="logo"
                  />
                </LogoBox>
                <LogoBox display={{ xs: "none", md: "none" }}>
                  <img
                    src={
                      headerData?.contact_profile?.profile_image ||
                      "/assets/default/defaultProfileImage.png"
                    }
                  />
                </LogoBox>
                <CompanyNamContent>
                  <Stack spacing={{ md: 1, xs: 0.5 }} flexGrow={1}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="center"
                      position="relative"
                    >
                      <IconButton
                        sx={{
                          padding: 0,
                          "&:hover": {
                            background: "none",
                          },
                        }}
                        onMouseOver={(e) => {
                          e.stopPropagation();
                          dispatch(setDetailPopOver(e));
                          handleClick(e);
                        }}
                      >
                        <CompanyInfoPopup
                          direction={{ xs: "row" }}
                          justifyContent={{ xs: "flex-start" }}
                          alignItems={"center"}
                          zIndex={1000}
                        >
                          <Typoheading
                            variant="h4"
                            sx={{
                              width: "300px",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {headerData?.contact_profile?.name ? (
                              FirstletterCapital(
                                headerData?.contact_profile?.name
                              )
                            ) : (
                              <Skeleton
                                variant="text"
                                animation="wave"
                                width={"100px"}
                              />
                            )}
                          </Typoheading>
                          <IconButton
                            onMouseOver={(e) => {
                              e.stopPropagation();
                              dispatch(setDetailPopOver(e));
                              handleClick(e);
                            }}
                            aria-label="delete"
                            size="small"
                            sx={{
                              paddingTop: 0,
                              "@media screen and (max-width:600px)": {
                                display: "none",
                              },
                            }}
                          >
                            <KeyboardArrowDownIcon fontSize="inherit" />
                          </IconButton>
                          <HeaderInfoPopup data={popupdata} />
                        </CompanyInfoPopup>
                      </IconButton>
                      <Box
                        className="locIcon"
                        display={{ xs: "none", sm: "inline-block " }}
                        component="span"
                      >
                        <LocationOnOutlinedIcon color="primary" />
                      </Box>
                      <CountryText>
                        {" "}
                        {headerLoading ? (
                          <Skeleton variant="text" width={50} />
                        ) : (
                          returnCountryFromCode(
                            headerData?.location_of_registration
                              ?.registration_country_id
                          )
                        )}
                      </CountryText>
                    </Stack>
                    <ContentAlign direction="column">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          flexDirection: "row",
                          "@media screen and (max-width:1024px)": {
                            display: "flex",
                          },
                        }}
                      >
                        <Box>
                          {headerData?.basic_information?.plan_status?.icon && (
                            <LightTooltip
                              placement="top"
                              title=""
                              // title={
                              //   headerData?.basic_information?.plan_status
                              //     ?.display_name
                              // }
                              arrow
                              disableInteractive
                            >
                              <img
                                style={{ margin: "0 0 -4px 0" }}
                                src={
                                  headerData?.basic_information?.plan_status
                                    ?.icon
                                }
                                alt={
                                  headerData?.basic_information?.plan_status
                                    ?.display_name
                                }
                                width={90}
                                className={
                                  headerData?.basic_information?.plan_status
                                    ?.display_name == "Enterprise"
                                    ? "enterpricebadge"
                                    : ""
                                }
                              />
                            </LightTooltip>
                          )}
                        </Box>
                        <YearChip
                          label={calculateYear()}
                          sx={{
                            "@media screen and (max-width:1024px)": {
                              display: "none",
                            },
                          }}
                        />

                        <ManufactureText style={{ marginRight: "4.8px" }}>
                          {headerLoading ? (
                            <Skeleton variant="text" width={50} />
                          ) : (
                            <MainProdLbl>
                              {headerLoading ? (
                                <Skeleton variant="text" width={50} />
                              ) : (
                                <>
                                  {headerData?.business_type?.length > 0 ? (
                                    headerData?.business_type
                                      ?.slice(0, 3)
                                      .map((item, i) => {
                                        if (item.toggle == "1") {
                                          return (
                                            <>
                                              {i < 3 && (
                                                <>
                                                  <span
                                                    onClick={(e: any) =>
                                                      setAnchorEl(
                                                        e.currentTarget
                                                      )
                                                    }
                                                    key={i}
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    <>
                                                      <LightTooltip
                                                        placement="bottom"
                                                        disableInteractive
                                                        arrow
                                                        //title={item.tooltip}
                                                        title={item.tooltip?.map(
                                                          (
                                                            toolTipElement,
                                                            index
                                                          ) => (
                                                            <Typography
                                                              sx={{
                                                                p: 0.5,
                                                                fontSize:
                                                                  "13px",
                                                                "&::before": {
                                                                  content: '""',
                                                                  width: "5px",
                                                                  height: "5px",
                                                                  backgroundColor:
                                                                    "black",
                                                                  margin:
                                                                    "0 -10px 0",
                                                                  borderRadius:
                                                                    "50%",
                                                                  display:
                                                                    "inline-block",
                                                                  position:
                                                                    "relative",
                                                                  top: "-3px",
                                                                  marginRight:
                                                                    "4px", // Adjust this value as needed
                                                                },
                                                              }}
                                                              key={index}
                                                              fontSize={"14px"}
                                                            >
                                                              {toolTipElement}
                                                            </Typography>
                                                          )
                                                        )}
                                                      >
                                                        {/* {item?.value?.length >
                                                          0 && (
                                                          <Box
                                                            onMouseEnter={(
                                                              e: any
                                                            ) => {
                                                              setAnchorEl(
                                                                e.currentTarget
                                                              );

                                                              setPopupdata(
                                                                typeof item.value ==
                                                                  "string"
                                                                  ? [
                                                                      item.tooltip,
                                                                    ]
                                                                  : item.tooltip
                                                              );
                                                            }}
                                                            onMouseLeave={(
                                                              e
                                                            ) => {
                                                              setAnchorEl(null);
                                                              setPopupdata([]);
                                                            }}
                                                          > */}
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          placement="top"
                                                          title={
                                                            headerData
                                                              ?.basic_information
                                                              ?.getTooltipMassage
                                                          }
                                                        >
                                                          <Box
                                                            sx={{
                                                              display: "flex",
                                                              whiteSpace:
                                                                "nowrap",
                                                            }}
                                                          >
                                                            <img
                                                              src={`/assets/images/${getBussinessTypeIcon(
                                                                item?.name
                                                              )}`}
                                                              // width="26"
                                                              // height="16"
                                                              width="30"
                                                              height="20"
                                                              loading="lazy"
                                                            />
                                                            {item.name}
                                                          </Box>
                                                        </LightTooltip>
                                                        {/* </Box>
                                                        )} */}
                                                      </LightTooltip>
                                                    </>
                                                  </span>
                                                  {i ==
                                                  headerData?.business_type?.slice(
                                                    0,
                                                    3
                                                  ).length -
                                                    1
                                                    ? ""
                                                    : ""}
                                                </>
                                              )}
                                            </>
                                          );
                                        }
                                      })
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}
                            </MainProdLbl>
                          )}
                        </ManufactureText>
                      </Box>
                    </ContentAlign>
                    <ContentAlign spacing={0.6}>
                      <MainProductsBox
                        sx={{
                          "@media screen and (max-width:1024px)": {
                            display: "none",
                          },
                        }}
                      >
                        <BusinessText>Main Products:</BusinessText>
                        <ManufactureText style={{ marginRight: "4.8px" }}>
                          <MainProdLbl>
                            {headerLoading ? (
                              <Skeleton variant="text" width={50} />
                            ) : headerData?.basic_information?.company_products
                                .length > 0 ? (
                              headerData?.basic_information?.company_products?.map(
                                (item, i) =>
                                  i < 3 && (
                                    <ChipButton
                                      sx={{ cursor: "pointer" }}
                                      key={i}
                                      onClick={() => {
                                        router.push(
                                          `/mini-site/${headerData?.basic_information?.slug}/products`
                                        );
                                      }}
                                    >
                                      {item}
                                    </ChipButton>
                                  )
                              )
                            ) : (
                              ""
                            )}
                          </MainProdLbl>
                        </ManufactureText>
                      </MainProductsBox>
                    </ContentAlign>
                    <ContentAlign
                      direction="row"
                      spacing={0.6}
                      sx={{
                        "@media screen and (max-width:1280px)": {
                          display: "none",
                        },
                      }}
                    >
                      <MainProductsBox>
                        <BusinessText>Categories: </BusinessText>
                        <ManufactureText>
                          {headerLoading ? (
                            <Skeleton variant="text" width={50} />
                          ) : headerData?.basic_information?.category_id
                              ?.length > 0 ? (
                            headerData?.basic_information?.category_id?.map(
                              (item, i) => (
                                <Typography
                                  onClick={() => {
                                    router.push({
                                      pathname: `/mini-site/${headerData?.basic_information?.slug}/products`,
                                      query: { s: item },
                                    });
                                  }}
                                  sx={{ marginRight: "4px", cursor: "pointer" }}
                                  component="span"
                                  key={i}
                                >
                                  {i < 3 && (
                                    <>
                                      {item}
                                      {i ===
                                      headerData.basic_information?.category_id
                                        .length -
                                        1
                                        ? ""
                                        : i != 2 && ", "}
                                    </>
                                  )}
                                </Typography>
                              )
                            )
                          ) : (
                            ""
                          )}
                        </ManufactureText>
                      </MainProductsBox>
                    </ContentAlign>
                    <RatingStack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    ></RatingStack>
                  </Stack>
                </CompanyNamContent>
              </Stack>
            </LeftGrid>
            <RightGrid item xl={4} lg={5} md={5} xs>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "6px",
                  padding: "0 0 8px",
                  "@media screen and (max-width:920px)": {
                    flexDirection: "column-reverse",
                    alignItems: "flex-end",
                    gap: "10px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "@media screen and (max-width:920px)": {
                      display: "flex",
                      justifyContent: "flex-end",
                    },
                  }}
                >
                  {headerLoading ? (
                    <Skeleton width={5} />
                  ) : (
                    <RatingChip component="span">
                      {allReview?.total
                        ? allReview?.total
                        : headerData?.basic_information?.review_rating_count}
                      {"  "}
                      <StarPurple500Icon fontSize="small" />
                    </RatingChip>
                  )}
                  {headerLoading ? (
                    <Skeleton width={30} />
                  ) : (
                    <Typography
                      sx={{
                        marginLeft: ".400rem",
                        color: "rgba(123, 121, 121, 1)",
                        fontSize: ".75rem",
                        fontWeight: 400,
                        "@media screen and (max-width:900px)": {
                          marginLeft: "0px",
                        },
                      }}
                    ></Typography>
                  )}
                </Box>
                <SupplierButton
                  onClick={() => {
                    openSupplierModel();
                  }}
                >
                  <Box>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        headerLoading ? (
                          <Skeleton variant="text" width={50} />
                        ) : headerData?.user_info?.profile_link ? (
                          headerData?.user_info?.profile_link
                        ) : (
                          "/assets/userimg.png"
                        )
                      }
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                    />
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        openSupplierModel();
                      }}
                      aria-label="delete"
                      size="small"
                    >
                      <Image
                        width={14}
                        height={14}
                        src="/assets/pcicon11.svg"
                        alt="icon"
                      />
                    </IconButton>
                  </Box>

                  <Typography>Contact Supplier</Typography>
                </SupplierButton>
              </Box>
              <Stack
                spacing={{ xl: 3, lg: 2, md: 1 }}
                sx={{
                  display: "flex",
                  "@media screen and (max-width:1024px)": {
                    display: "none",
                  },
                }}
                direction="row"
                alignItems="center"
                justifyContent="end"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box textAlign="center">
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {" "}
                    {liked ? (
                      <Image
                        width={16}
                        height={16}
                        src="/assets/pcicon9filled2.svg"
                        alt="icon"
                      />
                    ) : (
                      <Image
                        width={16}
                        height={16}
                        src="/assets/pcicon9.svg"
                        alt="icon"
                      />
                    )}
                    <Typography
                      sx={{
                        marginLeft: ".400rem",
                        color: "#231F20",
                        fontSize: "14px",
                        fontWeight: 600,
                        "@media screen and (max-width:1100px)": {
                          fontSize: "12px",
                        },
                      }}
                    >
                      {headerData?.basic_information?.like_count}
                    </Typography>
                  </Stack>
                  <Box>
                    <Followersbutton
                      onClick={handleOpen}
                      sx={{
                        color: "#231F20",
                        fontSize: ".812rem",
                        fontWeight: 400,
                        cursor: "pointer",
                      }}
                    >
                      Followers
                    </Followersbutton>

                    {open && (
                      <FollowerListModal
                        buttonLoader={buttonLoader}
                        open={open}
                        followerList={followerList}
                        handleClose={handleClose}
                        loadMoreData={loadMoreData}
                        followerCount={followerCount}
                        setFollowerList={setFollowerList}
                        setFollowerCount={setFollowerCount}
                        dataLoader={dataLoader}
                      />
                    )}
                  </Box>
                </Box>
                <Box textAlign="center">
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      width={16}
                      height={16}
                      src="/assets/pcicon8.svg"
                      alt="icon"
                    />
                    <Typography
                      sx={{
                        marginLeft: ".400rem",
                        color: "#231F20",
                        fontSize: "14px",
                        fontWeight: 600,
                        "@media screen and (max-width:1100px)": {
                          fontSize: "12px",
                        },
                      }}
                    >
                      {headerLoading ? (
                        <Skeleton variant="text" width={50} />
                      ) : (
                        headerData?.basic_information?.no_of_employee
                      )}
                    </Typography>
                  </Stack>
                  <Typography
                    style={{
                      color: "#231F20",
                      fontSize: ".812rem",
                      fontWeight: 400,
                    }}
                  >
                    No. Of Employees
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        marginLeft: ".400rem",
                        color: "#231F20",
                        fontSize: "14px",
                        fontWeight: 600,
                        "@media screen and (max-width:1100px)": {
                          fontSize: "12px",
                        },
                      }}
                    >
                      {headerLoading ? (
                        <Skeleton variant="text" width={50} />
                      ) : (
                        headerData?.basic_information?.yearly_revenue
                      )}
                    </Typography>
                  </Stack>
                  <Typography
                    style={{
                      color: "#231F20",
                      fontSize: ".812rem",
                      fontWeight: 400,
                    }}
                  >
                    Yearly Revenue
                  </Typography>
                </Box>
              </Stack>
            </RightGrid>
          </Grid>
        </MiniSiteContainer>
      </StripedBox>

      {/* /////////////////////// Header For Mobile ////////////////////////////*/}
      <StripedBox
        paddingX={{ lg: 2, xs: 1 }}
        paddingY={{ lg: 1, xs: 3 }}
        sx={{
          display: "none",
          "@media screen and (max-width:600px)": {
            display: "block",
          },
        }}
      >
        {openModal && (
          <QuerySupplierModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
          />
        )}
        <MiniSiteContainer>
          <Grid container alignItems="center">
            <LeftGrid item xl={8} lg={7} md={7}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CompanyNamContent>
                  <Stack spacing={{ md: 1, xs: 0.5 }} flexGrow={1}>
                    <Box>
                      <Typoheading variant="h4">
                        {headerData?.contact_profile?.name
                          ? FirstletterCapital(
                              headerData?.contact_profile?.name
                            )
                          : ""}
                      </Typoheading>
                      <ManufactureText style={{ marginRight: "4.8px" }}>
                        {headerLoading ? (
                          <Skeleton variant="text" width={50} />
                        ) : (
                          <MainProdLbl sx={{ margin: "8px -7px 0px" }}>
                            {headerLoading ? (
                              <Skeleton variant="text" width={50} />
                            ) : (
                              <>
                                {headerData?.business_type?.length > 0 ? (
                                  headerData?.business_type
                                    ?.slice(0, 3)
                                    .map((item, i) => {
                                      if (item.toggle == "1") {
                                        return (
                                          <>
                                            {i < 3 && (
                                              <>
                                                <span
                                                  onClick={(e: any) =>
                                                    setAnchorEl(e.currentTarget)
                                                  }
                                                  key={i}
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                >
                                                  <>
                                                    <LightTooltip
                                                      placement="bottom"
                                                      disableInteractive
                                                      arrow
                                                      //title={item.tooltip}
                                                      title={item.tooltip?.map(
                                                        (
                                                          toolTipElement,
                                                          index
                                                        ) => (
                                                          <Typography
                                                            sx={{
                                                              p: 0.5,
                                                              fontSize: "13px",
                                                              "&::before": {
                                                                content: '""',
                                                                width: "5px",
                                                                height: "5px",
                                                                backgroundColor:
                                                                  "black",
                                                                margin:
                                                                  "0 -10px 0",
                                                                borderRadius:
                                                                  "50%",
                                                                display:
                                                                  "inline-block",
                                                                position:
                                                                  "relative",
                                                                top: "-3px",
                                                                marginRight:
                                                                  "4px", // Adjust this value as needed
                                                              },
                                                            }}
                                                            key={index}
                                                            fontSize={"14px"}
                                                          >
                                                            {toolTipElement}
                                                          </Typography>
                                                        )
                                                      )}
                                                    >
                                                      {item?.value?.length >
                                                        0 && (
                                                        <Box
                                                          onMouseEnter={(
                                                            e: any
                                                          ) => {
                                                            setAnchorEl(
                                                              e.currentTarget
                                                            );

                                                            setPopupdata(
                                                              typeof item.value ==
                                                                "string"
                                                                ? [item.tooltip]
                                                                : item.tooltip
                                                            );
                                                          }}
                                                          onMouseLeave={(e) => {
                                                            setAnchorEl(null);
                                                            setPopupdata([]);
                                                          }}
                                                        >
                                                          <Box
                                                            sx={{
                                                              display: "flex",
                                                            }}
                                                          >
                                                            <img
                                                              src={`/assets/images/${getBussinessTypeIcon(
                                                                item?.name
                                                              )}`}
                                                              // width="26"
                                                              // height="16"
                                                              width="30"
                                                              height="20"
                                                              loading="lazy"
                                                            />
                                                            {item.name}
                                                          </Box>
                                                        </Box>
                                                      )}
                                                    </LightTooltip>
                                                  </>
                                                </span>
                                                {i ==
                                                headerData?.business_type?.slice(
                                                  0,
                                                  3
                                                ).length -
                                                  1
                                                  ? ""
                                                  : ""}
                                              </>
                                            )}
                                          </>
                                        );
                                      }
                                    })
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                          </MainProdLbl>
                        )}
                      </ManufactureText>
                    </Box>
                    <List
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        padding: 0,
                      }}
                    >
                      {/* Overall Rating */}
                      <ListItem
                        disableGutters
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0 4px", // Reduce padding for ListItem
                          width: "auto", // Prevent full-width ListItem
                        }}
                      >
                        <Typography
                          sx={{
                            marginLeft: ".400rem",
                            color: "rgba(123, 121, 121, 1)",
                            fontSize: ".75rem",
                            fontWeight: 400,
                            "@media screen and (max-width:900px)": {
                              marginLeft: "0px",
                            },
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              fontSize: "14px",
                              color: "#000",
                              fontWeight: "600",
                            }}
                          >
                            {headerData?.basic_information?.overall_rating}{" "}
                          </Box>
                          /{headerData?.basic_information?.review_rating_count}{" "}
                        </Typography>
                      </ListItem>

                      {/* Year Chip */}
                      <ListItem
                        disableGutters
                        sx={{
                          padding: "0 4px", // Reduce padding for ListItem
                          width: "auto", // Prevent full-width ListItem
                        }}
                      >
                        <YearChip label={calculateYear()} />
                      </ListItem>

                      {/* Location */}
                      <ListItem
                        disableGutters
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0 4px", // Reduce padding for ListItem
                          width: "auto", // Prevent full-width ListItem
                        }}
                      >
                        <LocationOnOutlinedIcon
                          sx={{ fontSize: "16px" }}
                          color="primary"
                        />
                        <CountryText>
                          {headerLoading ? (
                            <Skeleton variant="text" width={50} />
                          ) : (
                            returnCountryFromCode(
                              headerData?.location_of_registration
                                ?.registration_country_id
                            )
                          )}
                        </CountryText>
                      </ListItem>
                    </List>
                  </Stack>
                </CompanyNamContent>
              </Stack>
            </LeftGrid>
            <Grid
              item
              xs={2}
              xl={2}
              md={2}
              sx={{
                "@media screen and (max-width:320px)": { display: "none" },
              }}
            >
              <Box textAlign="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {" "}
                  {liked ? (
                    <Image
                      width={16}
                      height={16}
                      src="/assets/pcicon9filled2.svg"
                      alt="icon"
                    />
                  ) : (
                    <Image
                      width={16}
                      height={16}
                      src="/assets/pcicon9.svg"
                      alt="icon"
                    />
                  )}
                  <Typography
                    sx={{
                      marginLeft: ".400rem",
                      color: "#231F20",
                      fontSize: "14px",
                      fontWeight: 600,
                      "@media screen and (max-width:1100px)": {
                        fontSize: "12px",
                      },
                    }}
                  >
                    {headerData?.basic_information?.like_count}
                  </Typography>
                </Stack>
                <Box>
                  <Followersbutton
                    onClick={handleOpen}
                    sx={{
                      color: "#231F20",
                      fontSize: ".812rem",
                      fontWeight: 400,
                      cursor: "pointer",
                    }}
                  >
                    Followers
                  </Followersbutton>

                  {open && (
                    <FollowerListModal
                      buttonLoader={buttonLoader}
                      open={open}
                      followerList={followerList}
                      handleClose={handleClose}
                      loadMoreData={loadMoreData}
                      followerCount={followerCount}
                      setFollowerList={setFollowerList}
                      setFollowerCount={setFollowerCount}
                      dataLoader={dataLoader}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </MiniSiteContainer>
      </StripedBox>
    </>
  );
};

export default HeaderStrip;
