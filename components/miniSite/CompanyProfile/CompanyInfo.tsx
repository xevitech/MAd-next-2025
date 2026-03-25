import {
  Box,
  Grid,
  Stack,
  Typography,
  Popover,
  Link,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import {
  OutlinedImageBox,
  CarousalImage,
  CPTextViewBoxCP,
} from "./CompanyProfile.styled";
import CPheader from "./CPheaderComponent";
import router from "next/router";
import { returnCountryFromCode } from "@/utils/commonFunctions/other";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { setCloseAnchorEl, setSearchCategory } from "@/hooks/miniSite";
import HeaderStripBuisness from "@/components/common/header/HeaderStripBuisness";
import MobileWithFlag from "@/components/common/numberwithflag";
import { ViewMoreLessBox, ViewMoreLessText } from "../styled";
import Carousel from "react-material-ui-carousel";
import TradeShow from "./TradeShow";
import EmptyPage from "../EmptyPages";
import { formatToFullAddress, getSymbolByName } from "@/components/Helper";

export default function CompanyInfo({ factory_photos }) {
  const dispatch = useAppDispatch();
  const { anchorEll, headerData } = useSelector((state: any) => state.miniSite);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [popUpdata, setPopUpdata] = React.useState<any[]>([]);
  const [showArrowIcon, setShowArrowIcon] = useState<boolean>(false);

  const open = Boolean(anchorEll);

  const handlePopoverClose = () => {
    setPopUpdata([]);
    setAnchorEl(null);
    setAnchorEl2(null);
    dispatch(setCloseAnchorEl(null));
  };
  const { userInfo, minisiteUserID } = useSelector(
    (state: any) => state.miniSite
  );

  const certificateData = headerData?.certificates?.map((data) => data?.name);
  let userData = localStorage?.getItem("userData") ?? "";
  let user = userData ? JSON.parse(userData) : "";

  const handleCategoryClick = (value) => {
    dispatch(setSearchCategory(value));
    router.push(
      `/mini-site/${userInfo.basic_information.slug}/products?s=${value}`
    );

    // onClick={() => {
    //   router.push(
    //     `/mini-site/${userInfo.basic_information.slug}/products?s=${ele}`
    //   );
    // }}
  };

  const [viewMore, setViewMore] = useState<boolean>(false);
  const NavigateHandler = (route) => router.push(route);
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const formatCertificates = (certificates) => {
    return certificates.join(", ").replaceAll(/\n/g, "<br />");
  };

  const displayedCertificates = showAll
    ? formatCertificates(certificateData)
    : formatCertificates(certificateData.slice(0, 3)) +
      (certificateData.length > 3 ? "..." : "");

  return (
    <Box position="relative">
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEll}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        style={{ marginRight: "10px", boxShadow: "none !important" }}
      />

      <CPheader
        // icon="/assets/cpicon5.svg"
        icon="icon-company_information"
        title="Company Information"
        controls={null}
      />
      <Grid
        container
        spacing={{ xs: 0, sm: 2 }}
        mt={{ xs: 2, md: 0, lg: 0 }}
        mb={{ xs: 3, lg: 3 }}
        alignItems={"stretch"}
      >
        <Grid item md={4.5} xs={12}>
          <OutlinedImageBox sx={{}}>
            {factory_photos?.length > 0 ? (
              <>
                <Carousel
                  cycleNavigation={true}
                  indicators={false}
                  duration={500}
                  swipe={true}
                  animation="fade"
                  navButtonsProps={{
                    style: {
                      backgroundColor: "#231F20",
                      borderRadius: 6,
                      color: "white",
                    },
                  }}
                  navButtonsAlwaysVisible={false}
                  sx={{
                    "& .MuiIconButton-root": {
                      padding: "4px !important",
                    },
                  }}
                >
                  {factory_photos.map((item, i) => (
                    <Box textAlign="center">
                      <CarousalImage
                        onMouseOver={(e) => {
                          if (!showArrowIcon) {
                            setShowArrowIcon(true);
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (showArrowIcon) {
                            setShowArrowIcon(false);
                          }
                        }}
                      >
                        <img src={item?.source} alt="factory_image" />
                      </CarousalImage>
                    </Box>
                  ))}
                </Carousel>
              </>
            ) : (
              <>
                <EmptyPage
                  logo="/assets/EmptyCompany.png"
                  text={"company photo"}
                  onClickHandler={() => {
                    NavigateHandler(
                      "/companySettings/companyDetails?tab=company"
                    );
                  }}
                  actiontext={user?.id !== minisiteUserID ? false : true}
                  company={true}
                />
              </>
            )}
          </OutlinedImageBox>
        </Grid>
        <Grid item md={7.5} xs={12} mt={{ xs: 2, sm: 0 }}>
          <Stack
            direction="row"
            alignItems="stretch"
            gap={1.5}
            flexWrap="wrap"
            sx={{}}
          >
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Email:</Typography>
                  {userInfo?.contact_profile?.shop_email ? (
                    <Typography>
                      {user?.id == minisiteUserID
                        ? userInfo?.contact_profile?.shop_email
                        : userInfo?.contact_profile?.shop_email.substr(0, 5) +
                          "*******"}
                    </Typography>
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Phone No:</Typography>
                  {userInfo?.contact_profile?.phone ? (
                    userInfo?.contact_profile?.mobile_code &&
                    userInfo?.contact_profile?.phone && (
                      <MobileWithFlag
                        mobile_code={userInfo?.contact_profile?.mobile_code}
                        number={
                          user?.id != minisiteUserID
                            ? userInfo?.contact_profile?.phone.substr(0, 2) +
                              "*******"
                            : userInfo?.contact_profile?.phone
                        }
                      />
                    )
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Country/City:</Typography>
                  <Typography>
                    {userInfo?.location_of_registration
                      ?.registration_country_id && (
                      <>
                        <img
                          style={{ marginRight: "8px" }}
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${userInfo?.location_of_registration?.registration_country_id.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${userInfo?.location_of_registration?.registration_country_id.toLowerCase()}.png 2x`}
                          alt="flag"
                        />
                        {"  "}
                        <span>
                          {returnCountryFromCode(
                            userInfo?.location_of_registration
                              ?.registration_country_id
                          )}
                          {userInfo?.location_of_registration
                            ?.registration_city === "0" ||
                          userInfo?.location_of_registration
                            ?.registration_city == ""
                            ? ""
                            : `/${userInfo?.location_of_registration?.registration_city}`}{" "}
                        </span>
                      </>
                    )}
                  </Typography>
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Postal Code:</Typography>
                  {userInfo?.location_of_registration
                    ?.registration_postalcode === "0" ||
                  !userInfo?.location_of_registration
                    ?.registration_postalcode ? (
                    <Typography>N/A</Typography>
                  ) : (
                    <Typography>
                      {
                        userInfo?.location_of_registration
                          ?.registration_postalcode
                      }
                    </Typography>
                  )}
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Full Address:</Typography>
                  {userInfo?.location_of_registration
                    ?.registration_postalcode ? (
                    <Typography>{formatToFullAddress(userInfo)}</Typography>
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Website:</Typography>
                  {userInfo?.basic_information?.category_id?.length > 0 &&
                  userInfo?.contact_profile?.registration_website?.length >
                    0 ? (
                    <Typography
                      className="CategoryOpt"
                      style={{ marginRight: "4px" }}
                    >
                      {userInfo?.contact_profile?.registration_website?.map(
                        (ele, i) => (
                          <Box component={"span"} key={ele}>
                            <a target="_blank" href={ele}>
                              <Link
                                sx={{ cursor: "pointer" }}
                                underline="hover"
                              >
                                {ele}
                              </Link>
                            </a>
                            {i ===
                            userInfo?.contact_profile?.registration_website
                              .length -
                              1
                              ? ""
                              : ", "}
                          </Box>
                        )
                      )}
                    </Typography>
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Business Type:</Typography>
                  <Box>
                    {headerData?.business_type?.length > 0 ? (
                      <HeaderStripBuisness />
                    ) : (
                      <Typography>N/A</Typography>
                    )}
                  </Box>
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Select Category:</Typography>
                  {userInfo?.basic_information?.category_id?.length > 0 ? (
                    <Typography className="CategoryOpt" style={{}}>
                      {userInfo?.basic_information?.category_id?.map(
                        (ele, i) => (
                          <Box component={"span"} key={ele}>
                            <Typography
                              component="span"
                              onClick={() => {
                                handleCategoryClick(ele);
                              }}
                            >
                              <Link
                                sx={{ cursor: "pointer" }}
                                underline="hover"
                              >
                                {ele}
                              </Link>
                            </Typography>
                            {i ===
                            userInfo?.basic_information?.category_id.length - 1
                              ? ""
                              : ", "}
                          </Box>
                        )
                      )}
                    </Typography>
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Main Products:</Typography>
                  {userInfo?.basic_information?.company_products?.length > 0 ? (
                    <Typography
                      className="CategoryOpt"
                      style={{ marginRight: "4px" }}
                    >
                      {userInfo?.basic_information?.company_products?.map(
                        (ele, i) => (
                          <Box component={"span"} key={ele}>
                            <Typography
                              component="span"
                              onClick={() => {
                                const slug = userInfo?.basic_information?.slug;
                                router.push(`/mini-site/${slug}/products`);
                              }}
                            >
                              <Link
                                sx={{ cursor: "pointer" }}
                                underline="hover"
                              >
                                {ele}
                              </Link>
                            </Typography>
                            {i ===
                            userInfo?.basic_information?.company_products
                              .length -
                              1
                              ? ""
                              : ", "}
                          </Box>
                        )
                      )}
                    </Typography>
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </CPTextViewBoxCP>
              </Grid>

              {userInfo?.basic_information?.company_other_products?.length >
                0 && (
                <Grid item xs={12} sm={6} md={6}>
                  <CPTextViewBoxCP pb={{ xs: "4px" }}>
                    <Typography component="label">Other Products:</Typography>
                    {userInfo?.basic_information?.company_other_products
                      ?.length > 0 && (
                      <Typography
                        className="CategoryOpt"
                        style={{ marginRight: "4px" }}
                      >
                        {userInfo?.basic_information?.company_other_products?.map(
                          (ele, i) => (
                            <Typography
                              component="span"
                              onClick={() => {
                                router.push({
                                  pathname: "/miniSite/Products",
                                });
                              }}
                            >
                              <Link
                                sx={{ cursor: "pointer" }}
                                underline="hover"
                              >
                                {ele}
                                {i ==
                                userInfo?.basic_information
                                  ?.company_other_products?.length -
                                  1
                                  ? ""
                                  : ", "}
                              </Link>
                            </Typography>
                          )
                        ) ?? <Typography>N/A</Typography>}
                        <Link></Link>
                      </Typography>
                    )}
                  </CPTextViewBoxCP>
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">
                    Registration Number:
                  </Typography>
                  {userInfo?.location_of_registration?.registration_number ||
                  userInfo?.location_of_registration?.registration_number !=
                    "" ? (
                    <Typography>
                      {userInfo?.location_of_registration?.registration_number}
                    </Typography>
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Yearly Revenue:</Typography>
                  {userInfo?.basic_information?.yearly_revenue ||
                  userInfo?.basic_information?.yearly_revenue != "" ? (
                    <Typography>
                      {userInfo?.basic_information?.yearly_revenue}
                    </Typography>
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">Registered Capital:</Typography>
                  <Typography>
                    {getSymbolByName(
                      headerData?.location_of_registration?.reg_currency
                    )}{" "}
                    {headerData?.location_of_registration?.registered_capital
                      ? headerData?.location_of_registration?.registered_capital
                      : "N/A"}
                  </Typography>
                </CPTextViewBoxCP>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CPTextViewBoxCP pb={{ xs: "4px" }}>
                  <Typography component="label">
                    Management Certification:
                  </Typography>
                  <Typography>
                    {/* {certificateData.length > 0
                      ? certificateData.join(",")
                      : "N/A"} */}
                    {certificateData.length > 0 ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: displayedCertificates,
                        }}
                      />
                    ) : (
                      "N/A"
                    )}
                    {certificateData.length > 3 && (
                      <Typography
                        onClick={toggleShowAll}
                        sx={{
                          display: "inline-block",
                          fontSize: "12px !important",
                          padding: "0 0 0 10px",
                          color: "#d7282f !important",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {showAll ? "View less!" : "View more!"}
                      </Typography>
                    )}
                  </Typography>
                </CPTextViewBoxCP>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      {userInfo?.contact_profile?.description && (
        <>
          <Box
            sx={{
              borderBottom: "1px solid rgba(34, 51, 84, .1)",
              padding: "0 0px 8px 0 ",
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: "600", color: "#231f20" }}
            >
              Company Introduction
            </Typography>
          </Box>
          <ViewMoreLessBox sx={{ padding: "8px 0px" }}>
            <p
              style={{
                lineHeight: "160.9%",
                alignItems: "center",
                paddingTop: "8px",
                flexDirection: "column",
                overflow: "hidden",
                fontSize: "14px",
              }}
            >
              {viewMore
                ? userInfo?.contact_profile?.description.length > 0 && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          userInfo?.contact_profile?.description.replaceAll(
                            /\n/g,
                            "<br />"
                          ),
                      }}
                    />
                  )
                : userInfo?.contact_profile?.description?.length > 0 && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          userInfo?.contact_profile?.description
                            ?.slice(0, 400)
                            .replaceAll(/\n/g, "<br />") + "...",
                      }}
                    />
                  )}
              <ViewMoreLessText
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMore((pre) => !pre);
                }}
              >
                <span>
                  {" "}
                  {userInfo?.contact_profile?.description?.length > 400 &&
                    (viewMore ? "View less!" : "View more!")}
                </span>
              </ViewMoreLessText>
            </p>
          </ViewMoreLessBox>
        </>
      )}

      <Box>
        <Box
          sx={{
            borderBottom: "1px solid rgba(34, 51, 84, .1)",
            padding: "0 0 10px 0",
          }}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: "600", color: "#231f20" }}
          >
            Trade Show
          </Typography>
        </Box>
        <TradeShow userID={minisiteUserID} />
      </Box>
    </Box>
  );
}
