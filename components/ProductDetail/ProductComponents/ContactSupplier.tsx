import React, { useEffect, useState } from "react";
import { FontContainer } from "@/components/ProductDetail/style";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { BtnOutlined } from "@/components/common/buttons/ButtonsVariations";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import productdetail from "../productdetail.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Stack from "@mui/material/Stack";
import StarRateTwoToneIcon from "@mui/icons-material/StarRateTwoTone";
import {
  ContactSupplierHeader,
  Companyprofile,
  Headstrip,
  Compannyname,
  Midcontent,
  Contenttxt,
  Contentimg,
  Contentimg1,
  Contentimg3,
  Contentimg2,
  CompanyDetail,
  InfoButtons,
  SupplierName,
  RatingReviews,
  CoDetailsOpt,
  Certificates,
  ManufacturerYearBox,
  InnColumn,
  CoDetailsOptInfo,
  MyRatingBox,
  FlagCityName,
  GetQuoteMobile,
  BusinessNmeTooltip,
  CertifcatesTitle,
} from "@/components/ProductDetail/ProductComponents/Style";
import Image from "next/image";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material";
import { FirstletterCapital } from "@/components/common/common";
import { useSelector } from "react-redux";
import QueryModal from "./Modal/QueryModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import moment from "moment";
import { returnCountryFromCode } from "@/utils/commonFunctions/other";
import { setQuoteDetails } from "@/hooks/quoteHooks";
import { useAppDispatch } from "redux/store";
import QuoteModal from "./Modal/QuoteModal";
import Swal from "sweetalert2";
import TooltipComponent from "@/components/common/Tooltip/TooltipComponent";
import { chatWindowPopup } from "@/hooks/ChatReducer";

const CustomContainer = styled(Box)(() => ({
  border: "1px solid #E2E2E2",
  padding: "10px !important",
  background: "#FFF",
  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
  borderRadius: "6px",
  "@media screen and (max-width: 767px)": {
    padding: "6px !important",
  },
  "& .MuiTypography-h6": {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  "& .freeplancard": {
    background: "#fff",
  },
  "& .silverplancard": {
    backgroundImage: "linear-gradient(#EBEAEC, #F7F7F7)",
    border: "none",
  },
  "& .goldplancard": {
    backgroundImage: "linear-gradient(#FFF9D6, #FFFEF7)",
    border: "none",
  },
  "& .enterpriceplancard": {
    backgroundImage: "linear-gradient(#D8E3F2, #FAFBFD)",
    border: "none",
  },
  "& .pdpblackbtn": {
    width: "100%",
    height: "34px",
    fontSize: "14px",
    borderColor: "#231f20",
    color: "#ffffff",
    backgroundColor: "#231f20",
    marginTop: "8px",
    fontWeight: "500",
    borderRadius: "6px",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#4e4e4e",
    },
  },
}));

function HeaderInfoPopup({ data }) {
  const { country }: any = useSelector((state: any) => state.productDetail);
  const { company_details, plan_status_with_message, quote_button_type }: any =
    useSelector((state: any) => state.productDetail.detail.data);

  return (
    <Companyprofile p={{ xs: 2 }}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          {data?.location && (
            <Headstrip
              direction="row"
              alignItems="center"
              spacing={1}
              paddingY={0.5}
            >
              <Compannyname
                fontWeight={500}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `/mini-site/${company_details?.slug ?? "powercozmo"}/home`,
                    "_blank"
                  );
                }}
              >
                {FirstletterCapital(company_details?.company_name)}
              </Compannyname>
            </Headstrip>
          )}
          <Midcontent>
            <Contenttxt>
              <Contentimg1 sx={{ color: "#D7282F", fontSize: "16px" }} />
              {country.find((v) => v.value == data?.location)?.view}
            </Contenttxt>

            <Contenttxt>
              <Grid container md={12}>
                <Contentimg
                  src={"/assets/premium-user1.svg"}
                  alt="edit-img"
                  width={18}
                  height={18}
                ></Contentimg>
                {data?.acType
                  ? data.acType == "both"
                    ? "Seller, Buyer"
                    : FirstletterCapital(data.acType)
                  : ""}
              </Grid>
            </Contenttxt>

            <Contenttxt>
              <Contentimg2 /> {data?.estayear}
            </Contenttxt>
            <Contenttxt>
              <Grid container md={12}>
                <Contentimg3 />
                {data?.revenue}
              </Grid>
            </Contenttxt>
          </Midcontent>
          <Divider orientation="horizontal" />
        </Grid>
      </Grid>
    </Companyprofile>
  );
}

const ContactSupplier = ({ marginTop = "0px", paddingBottom = "20px" }) => {
  // Inside of functional component
  const router = useRouter();
  const {
    business_informations,
    company_details,
    is_company_show,
    user_id,
    certificates,
    plan_status_with_message,
    case_label,
    quote_button_type,
    caseData,
    case_type,
  }: any = useSelector((state: any) => state.productDetail.detail.data);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const data = useSelector((state: any) => state.productDetail.detail.data);
  let dispatch = useAppDispatch();
  const [popupdata, setPopupdata] = useState<any>({});
  const [openModal, setModal] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(true);

  const [openSupplier, setOpenSupplier] = React.useState(false);
  const handleClickOpen = () => {
    setOpenSupplier(true);
  };
  const handleClose = () => {
    setOpenSupplier(false);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  function getHeaderData() {
    const data = {
      location: business_informations?.country,
      busiType: business_informations?.business_type,
      acType: business_informations?.user_type,
      estayear: business_informations?.registration_year,
      revenue: business_informations?.yearly_revenue,
    };
    setPopupdata(data);
  }

  useEffect(() => {
    if (user_id) {
      getHeaderData();
    }
  }, [user_id]);

  const values = [
    {
      title: company_details?.business_type.split(",").join(",   "),

      src: "/assets/productlisting/Trader.svg",
    },
    {
      title: company_details?.top_rated,
      src: "/assets/productlisting/premium.svg",
    },
    {
      title: `Business Verified by ${company_details?.verified_by}`,
      src: "/assets/premium-top-rated-member2.svg",
    },
    {
      title: `Fast Response Seller Average ${company_details?.response_time} Hours`,
      src: "/assets/premium-top-rated-member3.svg",
    },
  ];

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("userData"))?.id;
    if (id == user_id) {
      setShowButton(false);
    }
  }, [user_id]);

  let certificateData = certificates.filter(
    (v) => v?.reference_no || v?.cer_name
  );
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  useEffect(() => {}, []);
  let display_message =
    plan_status_with_message?.display_message?.split("{company_name}");

  let bussiness = business_informations?.business_type;
  let businessTypeIcon = "s-badge.png";

  let bussinessName;
  if (typeof bussiness === "string" && typeof bussiness === "object") {
    bussinessName = business_informations?.business_type;
  } else {
    bussinessName = bussiness?.find((ele) => ele?.toggle == 1);
  }

  if (bussinessName?.name == "Manufacturers") {
    businessTypeIcon = "Manufacturers1.svg";
  } else if (bussinessName?.name == "Agents and Representatives") {
    businessTypeIcon = "Agents1.svg";
  } else if (bussinessName?.name == "Resellers") {
    businessTypeIcon = "Resellers1.svg";
  } else if (bussinessName?.name == "Distributors") {
    businessTypeIcon = "Distributors1.svg";
  } else if (bussinessName?.name == "Retailers") {
    businessTypeIcon = "Retailers1.svg";
  } else if (bussinessName?.name == "Wholesalers") {
    businessTypeIcon = "Wholesalers1.svg";
  } else {
    businessTypeIcon = "Others1.svg";
  }

  const getTootlTipData = () => {
    if (
      bussinessName?.tooltip?.length > 0 &&
      Array.isArray(bussinessName?.tooltip)
    ) {
      return bussinessName?.tooltip?.map((ele, index) => (
        <BusinessNmeTooltip key={index}>{ele}</BusinessNmeTooltip>
      ));
    } else {
      return "";
    }
  };

  const establishedYear = moment(business_informations?.created_at);
  const yearsDifference = moment().diff(moment(establishedYear), "years");
  const newMessage =
    yearsDifference < 1
      ? "<1 Year"
      : moment(establishedYear).fromNow()?.replaceAll("ago", "");

  const getSorce: any = (type) => {
    if (type == "ABS") {
      return "/assets/certficates/ABS.png";
    } else if (type == "BSI") {
      return "/assets/certficates/BSI.png";
    } else if (type == "BV") {
      return "/assets/certficates/BV.png";
    } else if (type == "CQC") {
      return "/assets/certficates/CQC.png";
    } else if (type == "CQM") {
      return "/assets/certficates/CQM.png";
    } else if (type == "CTC") {
      return "/assets/certficates/CTC.png";
    } else if (type == "China Great Wall Quality") {
      return "/assets/certficates/China-Great.png";
    } else if (type == "DNV") {
      return "/assets/certficates/DNV.png";
    } else if (type == "DQS") {
      return "/assets/certficates/DQS.png";
    } else if (type == "Dekra") {
      return "/assets/certficates/Dekra.png";
    } else if (type == "Intertek") {
      return "/assets/certficates/Intertek.png";
    } else if (type == "LR") {
      return "/assets/certficates/LR.png";
    } else if (type == "MOODY") {
      return "/assets/certficates/MOODY.png";
    } else if (type == "SGS") {
      return "/assets/certficates/SGS.png";
    } else if (type == "TUV NORD") {
      return "/assets/certficates/TUV-NORD.png";
    } else if (type == "TUV Rheinland") {
      return "/assets/certficates/TUV-Rheinland.png";
    } else if (type == "TUV SUD") {
      return "/assets/certficates/TUV-SUD.png";
    } else if (type == "UL") {
      return "/assets/certficates/UL.png";
    } else if (type == "WIT") {
      return "/assets/certficates/WIT.png";
    } else {
      return "/assets/certficates/other.png";
    }
  };

  const locationMap = `https://maps.googleapis.com/maps/api/staticmap?center=${returnCountryFromCode(
    company_details?.registration_country_id
  )}&markers=color:red%7Clabel:P%7C${returnCountryFromCode(
    company_details?.registration_country_id
  )}&zoom=2&size=97x63&key=AIzaSyAeo9TJaGkY6bcKri6tsXp8VhtYYv94H1g`;

  //////////////////// Tooltip Issue
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsTooltipVisible(false); // Hide the tooltip on scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderCertificateTitle = (type, data) => {
    if (type) {
      switch (type) {
        case "Management System Certifications":
          return `${data?.issued_by ? data?.issued_by : ""} ${
            data?.reference_no
          }`;
        case "Product Certificate":
          return `${data?.issued_by ? data?.issued_by : ""} ${
            data?.reference_no
          }`;
        case "Product Test Report":
          return `${data?.cer_name ? data?.cer_name : ""} ${
            data?.reference_no
          }`;
        case "Regulatory licensing document":
          return `${data?.cer_name ? data?.cer_name : ""} ${
            data?.reference_no
          }`;
        case "Country restricted sales access":
          return `${data?.cer_name ? data?.cer_name : ""} ${
            data?.reference_no
          }`;
      }
    }
  };

  const renderCertificates = (v, tooltipData, index) => {
    switch (v?.type) {
      case "certificate":
        if (v?.reference_no && v?.issued_by) {
          return (
            <Box
              sx={{
                display: "flex !important",
                alignItems: "center !important",
                gap: "8px",
                justifyContent: "center",
                "& .icon-iso-logo": {
                  fontSize: "38px",
                },
              }}
              key={index}
              onClick={() => {
                window.open(v?.images);
              }}
            >
              <img
                src={getSorce(v?.issued_by)}
                alt={v?.issued_by}
                height={50}
              />
              {(tooltipData?.benefits || certificateData?.focus) && (
                <Box>
                  <TooltipComponent
                    title={renderCertificateTitle(v?.type_of_certificate, v)}
                    description={
                      <>
                        <CertifcatesTitle>
                          Issued By <Box component={"span"}>{v?.title}</Box>
                        </CertifcatesTitle>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: "600",
                              marginBottom: "8px",
                            }}
                          >
                            ({v?.focus})
                          </Typography>
                        </Box>
                        {tooltipData?.benefits && (
                          <>
                            <ul>
                              {tooltipData.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </>
                        )}
                        {v?.certificate_url && (
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "#231f20",
                              fontWeight: "400",
                            }}
                          >
                            Visit the official website to verify the
                            certificates{" "}
                            <Link
                              sx={{ fontSize: "13px" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                window.open(v?.certificate_url, "_blank");
                              }}
                            >
                              Click here
                            </Link>
                          </Typography>
                        )}
                      </>
                    }
                    styles={{
                      fontSize: "12px !important",
                      fontWeight: "500 !important",
                      lineHeight: "18px !important",
                    }}
                    secondText="Certified Company"
                  />
                </Box>
              )}
            </Box>
          );
        } else if (v?.type_of_certificate) {
          return (
            <>
              <Box
                sx={{
                  display: "flex !important",
                  alignItems: "center !important",
                  gap: "8px",
                  justifyContent: "center",
                  "& .icon-iso-logo": {
                    fontSize: "38px",
                  },
                }}
                key={index}
                onClick={() => {
                  window.open(v?.images);
                }}
              >
                <img
                  src={getSorce(v?.issued_by)}
                  alt={v?.issued_by}
                  height={50}
                />
                <TooltipComponent
                  title={renderCertificateTitle(v?.cer_name, v)}
                  description={
                    <>
                      <CertifcatesTitle>
                        Issued By <Box component={"span"}>{v?.title}</Box>
                      </CertifcatesTitle>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          ({v?.focus})
                        </Typography>
                      </Box>
                      {tooltipData?.benefits && (
                        <>
                          <ul>
                            {tooltipData.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {v?.certificate_url && (
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "#231f20",
                            fontWeight: "400",
                          }}
                        >
                          Visit the official website to verify the certificates{" "}
                          <Link
                            sx={{ fontSize: "13px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              window.open(v?.certificate_url, "_blank");
                            }}
                          >
                            Click here
                          </Link>
                        </Typography>
                      )}
                    </>
                  }
                  styles={{
                    fontSize: "12px !important",
                    fontWeight: "500 !important",
                    lineHeight: "18px !important",
                  }}
                  secondText="Certified Company"
                />
              </Box>
            </>
          );
        }
      case "honor":
        if (v?.cer_name && v?.issued_by) {
          return (
            <Box
              sx={{
                display: "flex !important",
                alignItems: "center !important",
                gap: "8px",
                justifyContent: "center",
                "& .icon-iso-logo": {
                  fontSize: "38px",
                },
              }}
              key={index}
              onClick={() => {
                window.open(v?.images);
              }}
            >
              <img
                src={getSorce(v?.issued_by)}
                alt={v?.issued_by}
                height={50}
              />
              <Box>
                <TooltipComponent
                  title={`${v?.cer_name || ""} ${v?.reference_no || ""}`}
                  description={
                    <>
                      <CertifcatesTitle>
                        Issued By <Box component={"span"}>{v?.title}</Box>
                      </CertifcatesTitle>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          ({v?.focus})
                        </Typography>
                      </Box>
                      {tooltipData?.benefits && (
                        <>
                          <ul>
                            {tooltipData.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {v?.certificate_url && (
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "#231f20",
                            fontWeight: "400",
                          }}
                        >
                          Visit the official website to verify the certificates{" "}
                          <Link
                            sx={{ fontSize: "13px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              window.open(v?.certificate_url, "_blank");
                            }}
                          >
                            Click here
                          </Link>
                        </Typography>
                      )}
                    </>
                  }
                  styles={{
                    fontSize: "12px !important",
                    fontWeight: "500 !important",
                    lineHeight: "18px !important",
                  }}
                  secondText="Certified Company"
                />
              </Box>
            </Box>
          );
        }
      case "patent":
        if (v?.cer_name) {
          return (
            <Box
              sx={{
                display: "flex !important",
                alignItems: "center !important",
                gap: "8px",
                justifyContent: "center",
                "& .icon-iso-logo": {
                  fontSize: "38px",
                },
              }}
              key={index}
              onClick={() => {
                window.open(v?.images);
              }}
            >
              <img
                src={getSorce(v?.issued_by)}
                alt={v?.issued_by}
                height={50}
              />
              <Box>
                <TooltipComponent
                  title={`${v?.cer_name || ""} ${v?.name || ""}`}
                  description={
                    <>
                      <CertifcatesTitle>
                        Issued By <Box component={"span"}>{v?.title}</Box>
                      </CertifcatesTitle>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          ({v?.focus})
                        </Typography>
                      </Box>
                      {tooltipData?.benefits && (
                        <>
                          <ul>
                            {tooltipData.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {v?.certificate_url && (
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "#231f20",
                            fontWeight: "400",
                          }}
                        >
                          Visit the official website to verify the certificates{" "}
                          <Link
                            sx={{ fontSize: "13px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              window.open(v?.certificate_url, "_blank");
                            }}
                          >
                            Click here
                          </Link>
                        </Typography>
                      )}
                    </>
                  }
                  styles={{
                    fontSize: "12px !important",
                    fontWeight: "500 !important",
                    lineHeight: "18px !important",
                  }}
                  secondText="Certified Company"
                />
              </Box>
            </Box>
          );
        }
      case "trademark":
        if (v?.cer_name) {
          return (
            <Box
              sx={{
                display: "flex !important",
                alignItems: "center !important",
                gap: "8px",
                justifyContent: "center",
                "& .icon-iso-logo": {
                  fontSize: "38px",
                },
              }}
              key={index}
              onClick={() => {
                window.open(v?.images);
              }}
            >
              <img
                src={getSorce(v?.issued_by)}
                alt={v?.issued_by}
                height={50}
              />
              <Box>
                <TooltipComponent
                  title={`${v?.cer_name || ""} ${v?.name || ""}`}
                  description={
                    <>
                      <CertifcatesTitle>
                        Issued By <Box component={"span"}>{v?.title}</Box>
                      </CertifcatesTitle>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          ({v?.focus})
                        </Typography>
                      </Box>
                      {tooltipData?.benefits && (
                        <>
                          <ul>
                            {tooltipData.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {v?.certificate_url && (
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "#231f20",
                            fontWeight: "400",
                          }}
                        >
                          Visit the official website to verify the certificates{" "}
                          <Link
                            sx={{ fontSize: "13px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              window.open(v?.certificate_url, "_blank");
                            }}
                          >
                            Click here
                          </Link>
                        </Typography>
                      )}
                    </>
                  }
                  styles={{
                    fontSize: "12px !important",
                    fontWeight: "500 !important",
                    lineHeight: "18px !important",
                  }}
                  secondText="Certified Company"
                />
              </Box>
            </Box>
          );
        }
    }
  };

  return (
    <>
      {openModal && (
        <QuoteModal open={openModal} handleClose={() => setModal(false)} />
      )}

      {is_company_show ? (
        <CustomContainer style={{ marginTop }}>
          <ContactSupplierHeader
            className={
              plan_status_with_message?.is_true
                ? `active ${
                    plan_status_with_message?.display_name === "Free"
                      ? "freeplancard"
                      : plan_status_with_message?.display_name === "Silver"
                      ? "silverplancard"
                      : plan_status_with_message?.display_name === "Gold"
                      ? "goldplancard"
                      : "enterpriceplancard"
                  }`
                : ""
            }
          >
            <Typography variant="h6">{display_message?.[0] ?? ""}</Typography>
            <SupplierName className="SupplierActive">
              <Box className="hover-fx">
                <Image
                  height={27}
                  width={27}
                  alt="Logo"
                  src={company_details?.logo}
                  style={{ borderRadius: "50%" }}
                />
              </Box>
              <Stack data-tracking="company-profile">
                <CompanyDetail
                  justifyContent={{ xs: "flex-start" }}
                  data-tracking="company-profile"
                >
                  <IconButton
                    data-tracking="company-profile"
                    onClick={() =>
                      window.open(
                        `/mini-site/${
                          company_details?.slug ?? "powercozmo"
                        }/home`,
                        "_blank"
                      )
                    }
                    className={productdetail.compnyname}
                    onMouseOver={handleClick}
                    aria-label="delete"
                    size="small"
                    sx={{
                      background: "transparent!important",
                      fontFamily: '"Raleway", sans-serif !important',
                      fontWeight: 800,
                      textTransform: "capitalize",

                      "&:hover": {
                        background: "transparent!important",
                        color: "#666666 !important",
                      },
                      "& .MuiTouchRipple-root": {
                        display: "none",
                      },
                    }}
                  >
                    <LightTooltip
                      arrow
                      placement="top"
                      title={company_details?.slogan}
                      disableInteractive
                      data-tracking="company-profile"
                    >
                      {company_details?.company_name}
                    </LightTooltip>
                  </IconButton>
                </CompanyDetail>
                <FontContainer
                  className={productdetail.compnyname}
                  fontWeight={"400"}
                  color="#3E3E3E"
                ></FontContainer>
              </Stack>
            </SupplierName>
            <Typography variant="h6">{display_message?.[1] ?? ""}</Typography>
          </ContactSupplierHeader>
          <RatingReviews>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontFamily: "Open Sans",
              }}
            >
              {case_type == "case_1" && (
                <LightTooltip
                  open={isTooltipVisible}
                  PopperProps={{ style: { zIndex: 1200 } }}
                  arrow
                  placement="top"
                  title={
                    ((JSON?.parse(caseData)?.show_countries == 1 &&
                      JSON?.parse(caseData)?.selection == "country") ||
                      (JSON?.parse(caseData)?.show_territory == 1 &&
                        JSON?.parse(caseData)?.selection == "territory")) && (
                      <Box>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "14px",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Offer product origin information
                        </span>
                        <BusinessNmeTooltip
                          key={case_label}
                          dangerouslySetInnerHTML={{ __html: `${case_label}` }}
                        ></BusinessNmeTooltip>
                      </Box>
                    )
                  }
                  // disableInteractive
                >
                  <FlagCityName
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={productdetail.cityname}
                    style={{ textTransform: "capitalize" }}
                  >
                    <img
                      className="move-up"
                      src={`https://flagcdn.com/w20/${company_details?.registration_country_id?.toLowerCase()}.png`}
                    />{" "}
                    {company_details?.registration_city
                      ? company_details?.registration_city
                      : company_details?.registration_country_id}
                  </FlagCityName>
                </LightTooltip>
              )}
              {case_type == "case_2" && (
                <LightTooltip
                  open={isTooltipVisible}
                  PopperProps={{ style: { zIndex: 1200 } }}
                  arrow
                  placement="top"
                  title={
                    <Box>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "14px",
                          fontFamily: "Open Sans",
                        }}
                      >
                        Offer product origin information
                      </span>
                      <BusinessNmeTooltip
                        key={case_label}
                        dangerouslySetInnerHTML={{ __html: `${case_label}` }}
                      ></BusinessNmeTooltip>
                    </Box>
                  }
                  // disableInteractive
                >
                  <FlagCityName
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={productdetail.cityname}
                    style={{ textTransform: "capitalize" }}
                  >
                    <img
                      className="move-up"
                      src={`https://flagcdn.com/w20/${company_details?.registration_country_id?.toLowerCase()}.png`}
                    />{" "}
                    {company_details?.registration_city
                      ? company_details?.registration_city
                      : company_details?.registration_country_id}
                  </FlagCityName>
                </LightTooltip>
              )}
              {case_type == "case_3" && (
                <LightTooltip
                  open={isTooltipVisible}
                  PopperProps={{ style: { zIndex: 1200 } }}
                  arrow
                  placement="top"
                  title={
                    JSON?.parse(caseData)?.some(
                      (item: any) => item.status === "1"
                    ) &&
                    JSON?.parse(caseData)?.map((caseItem: any, index: any) => {
                      if (caseItem.status == 1) {
                        return (
                          <Box>
                            <span
                              style={{
                                fontWeight: 600,
                                fontSize: "14px",
                                fontFamily: "Open Sans",
                              }}
                            >
                              {index == 0 && "Offer product origin information"}
                            </span>
                            <BusinessNmeTooltip
                              key={caseItem?.label}
                              dangerouslySetInnerHTML={{
                                __html: `${caseItem?.label}`,
                              }}
                            ></BusinessNmeTooltip>
                          </Box>
                        );
                      }
                    })
                  }
                  // disableInteractive
                >
                  <FlagCityName
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={productdetail.cityname}
                    style={{ textTransform: "capitalize" }}
                  >
                    <img
                      className="move-up"
                      src={`https://flagcdn.com/w20/${company_details?.registration_country_id?.toLowerCase()}.png`}
                    />{" "}
                    {company_details?.registration_city
                      ? company_details?.registration_city
                      : company_details?.registration_country_id}
                  </FlagCityName>
                </LightTooltip>
              )}
              <LightTooltip
                arrow
                placement="top"
                title={
                  <Box>
                    <img src={locationMap} alt="Seller Location" />
                  </Box>
                }
                disableInteractive
              >
                <LocationOnOutlinedIcon
                  sx={{
                    fontSize: "16px !important",
                    color: "#d7282f",
                  }}
                />
              </LightTooltip>
              <div style={{ margin: "0 0 0 6px" }}>
                {plan_status_with_message?.display_name != "No Plan" && (
                  <InnColumn>
                    <Typography
                    //className="dotbeforeimg"
                    // className={plan_status_with_message?.display_name == 'Enterprise' ? 'dotbeforeimg enterdotbeforeimg' : 'dotbeforeimg'}
                    >
                      <img
                        src={plan_status_with_message?.icon}
                        alt={plan_status_with_message?.display_name}
                        className={
                          plan_status_with_message?.display_name == "Enterprise"
                            ? "typebusiness enterprisePlan"
                            : "typebusiness"
                        }
                      />
                    </Typography>
                  </InnColumn>
                )}
              </div>
            </Box>
            <MyRatingBox>
              <Rating
                name="simple-controlled"
                value={company_details?.rating}
                size="small"
                sx={{
                  color:
                    company_details?.rating <= 2
                      ? "#FF5960"
                      : company_details?.rating < 4
                      ? "#FFA319"
                      : "#34A853",
                }}
                readOnly
                icon={<StarRateTwoToneIcon fontSize="small" />}
                emptyIcon={<StarRateTwoToneIcon fontSize="small" />}
                precision={0.5}
              />
              {company_details?.rating}/{"5"}
              <Link
                underline="hover"
                onClick={() => {
                  window.open(
                    `/mini-site/${
                      company_details?.slug ?? "powercozmo"
                    }/reviews`,
                    "_blank"
                  );
                }}
              >
                Read Reviews.
              </Link>
            </MyRatingBox>
          </RatingReviews>

          <ManufacturerYearBox>
            {bussinessName?.name && (
              <InnColumn className="businessName">
                <Box sx={{ display: "flex" }}>
                  <img
                    className="move-up"
                    src={`/assets/images/${businessTypeIcon}`}
                    style={{ height: "16px", margin: "-1px 3px 0px 1px" }}
                  />

                  <LightTooltip
                    // PopperProps={{ style: { zIndex: 10 } }}
                    disableInteractive
                    arrow
                    title={getTootlTipData()}
                    placement="top"
                  >
                    <Typography>{bussinessName?.name}</Typography>
                  </LightTooltip>
                </Box>
              </InnColumn>
            )}
            <div className="yearbadge">
              <InnColumn>
                <LightTooltip
                  disableInteractive
                  arrow
                  title={`This supplier has a Merchant AD Website account for ${
                    newMessage == "<1 Year" ? "less than year" : newMessage
                  }.`}
                  placement="top"
                >
                  <Typography
                    className={
                      bussinessName?.name == undefined ||
                      bussinessName?.name == ""
                        ? ""
                        : "dotBefore"
                    }
                  >
                    {newMessage}
                  </Typography>
                </LightTooltip>
              </InnColumn>
              {/* {plan_status_with_message?.display_name != "No Plan" && (
                <InnColumn className="onlyimagecase">
                  <Typography 
                  className="dotbeforeimg"
                 // className={plan_status_with_message?.display_name == 'Enterprise' ? 'dotbeforeimg enterdotbeforeimg' : 'dotbeforeimg'}
                  
                  >
                    <img
                      src={plan_status_with_message?.icon}
                      alt={plan_status_with_message?.display_name}
                      className={plan_status_with_message?.display_name == 'Enterprise' ? 'typebusiness enterprisePlan' : 'typebusiness'}
                    />
                  </Typography>
                </InnColumn>
             
            )} */}
            </div>
          </ManufacturerYearBox>

          <CoDetailsOpt>
            <Grid container rowSpacing={1}>
              <Grid item xs={6} sm={6} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    "@media (max-width: 767px)": {
                      alignItems: "flex-start",
                    },
                    "& .icon-revenue": {
                      fontSize: "18px",
                      display: "block",
                      width: "20px",
                      textAlign: "center",
                    },
                  }}
                >
                  <i className="icon-revenue"></i>
                  <CoDetailsOptInfo>
                    <Typography>Yearly Revenue</Typography>
                    <LightTooltip
                      disableInteractive
                      arrow
                      title={company_details?.yearly_revenu}
                      placement="top-start"
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "1",
                          display: "-webkit-box",
                          "@media (max-width: 767px)": {
                            display: "flex",
                          },
                        }}
                      >
                        {company_details?.yearly_revenu}
                      </Typography>
                    </LightTooltip>
                  </CoDetailsOptInfo>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    "@media (max-width: 767px)": {
                      alignItems: "flex-start",
                    },
                    "& .icon-employees": {
                      fontSize: "20px",
                      display: "block",
                      width: "24px",
                      textAlign: "center",
                    },
                  }}
                >
                  <i className="icon-employees"></i>
                  <CoDetailsOptInfo>
                    <Typography>No. of Employees</Typography>
                    <Typography variant="h6">
                      {company_details?.no_of_employee}
                    </Typography>
                  </CoDetailsOptInfo>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    "@media (max-width: 767px)": {
                      alignItems: "flex-start",
                    },
                    "& .icon-delivery1": {
                      fontSize: "20px",
                      display: "block",
                      width: "24px",
                      textAlign: "center",
                    },
                  }}
                >
                  <i className="icon-delivery1"></i>
                  <CoDetailsOptInfo>
                    <Typography>On-time Delivery</Typography>
                    <Typography variant="h6">
                      {company_details?.on_time_delivery}
                    </Typography>
                  </CoDetailsOptInfo>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    "@media (max-width: 767px)": {
                      alignItems: "flex-start",
                    },
                    "& .icon-satisfaction": {
                      fontSize: "20px",
                      display: "block",
                      width: "24px",
                      textAlign: "center",
                    },
                  }}
                >
                  <i className="icon-satisfaction"></i>
                  <CoDetailsOptInfo>
                    <Typography>Customer Satisfaction</Typography>
                    <Typography variant="h6">
                      {company_details?.customer_satisfaction}
                    </Typography>
                  </CoDetailsOptInfo>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    "@media (max-width: 767px)": {
                      alignItems: "flex-start",
                    },
                    "& .icon-response-rate": {
                      fontSize: "20px",
                      display: "block",
                      width: "24px",
                      textAlign: "center",
                    },
                  }}
                >
                  <i className="icon-response-rate"></i>
                  <CoDetailsOptInfo>
                    <Typography>Response Rate</Typography>
                    <Typography variant="h6">
                      {company_details?.response_rate}
                    </Typography>
                  </CoDetailsOptInfo>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    "@media (max-width: 767px)": {
                      alignItems: "flex-start",
                    },
                    "& .icon-response-time": {
                      fontSize: "20px",
                      display: "block",
                      width: "24px",
                      textAlign: "center",
                    },
                  }}
                >
                  <i className="icon-response-time">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                  </i>
                  <CoDetailsOptInfo>
                    <Typography>Response Time</Typography>
                    <Typography variant="h6">
                      {company_details?.response_time}
                    </Typography>
                  </CoDetailsOptInfo>
                </Box>
              </Grid>
            </Grid>
          </CoDetailsOpt>

          {certificateData.length > 0 && (
            <Certificates>
              <Typography
                variant="h6"
                sx={{
                  "@media screen and (max-width: 1600px)": {
                    fontSize: "13px",
                  },
                }}
              >
                Certifications and Accreditations
              </Typography>
              <Box
                sx={{
                  "& .slick-arrow": {
                    height: "100%",
                    zIndex: 3,
                    background: "#ffffff",
                    "&:before": {
                      width: "15px",
                      height: "20px",
                      content: '""',
                      display: "block",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                    },
                  },
                  "& .slick-prev": {
                    left: "-8px",
                    "&:before": {
                      backgroundImage: "url(/assets/arrowLeft.svg)",
                    },
                  },
                  "& .slick-next": {
                    right: "-10px",
                    "&:before": {
                      backgroundImage: "url(/assets/arrowRight.svg)",
                    },
                  },
                }}
              >
                {certificateData.length > 1 ? (
                  <Slider {...settings}>
                    {certificateData.map((v, index) => {
                      const tooltipData = v?.tooltip
                        ? JSON.parse(v.tooltip)
                        : null;
                      return <>{renderCertificates(v, tooltipData, index)}</>;
                    })}
                  </Slider>
                ) : (
                  certificateData.map((v, index) => {
                    const tooltipData = v?.tooltip
                      ? JSON.parse(v.tooltip)
                      : null;
                    return renderCertificates(v, tooltipData, index);
                  })
                )}
              </Box>
            </Certificates>
          )}

          <InfoButtons>
            <Grid container spacing={1} data-tracking="visit-store-link">
              <Grid item xs={6} sm={6} md={6} data-tracking="visit-store-link">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    "@media screen and (max-width:767px)": {
                      position: "fixed",
                      bottom: 0,
                      left: 0,
                      background: "#fff",
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                      width: "100%",
                      padding: "10px 20px",
                      cursor: "pointer",
                      marginBottom: 0,
                      zIndex: 9 /* Ensure it's above other elements */,
                    },
                  }}
                  data-tracking="visit-store-link"
                >
                  <BtnOutlined
                    className="visit-store"
                    sx={{
                      width: "100%",
                      height: "34px",
                      fontSize: "12px",
                      "@media screen and (max-width: 1600px)": {
                        fontSize: "11px !important",
                      },
                      "&:hover": {
                        color: "#ffffff",
                        backgroundColor: "#d7282f",
                      },
                      "@media screen and (max-width: 767px)": {
                        display: "flex",
                        border: "1px solid #E6ECF2",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                        padding: "0 7px",
                        width: "auto",
                        minWidth: "auto",
                        cursor: "pointer",
                      },

                      "& svg": {
                        "@media screen and (max-width: 1700px)": {
                          fontSize: "14px !important",
                        },
                        "@media screen and (max-width: 1300px)": {
                          display: "none",
                        },
                        "@media screen and (max-width: 767px)": {
                          display: "block",
                          fontSize: "20px !important",
                        },
                      },
                      "& .MuiButton-startIcon": {
                        "@media screen and (max-width: 1700px)": {
                          marginRight: "2px",
                          // marginLeft: "-10px",
                        },
                        "@media screen and (max-width: 767px)": {
                          marginLeft: "0",
                        },
                      },
                    }}
                    startIcon={<StoreOutlinedIcon />}
                    data-tracking="visit-store-link"
                    onClick={() =>
                      window.open(
                        `/mini-site/${
                          company_details?.slug ?? "powercozmo"
                        }/home`,
                        "_blank"
                      )
                    }
                  >
                    <Box
                      sx={{
                        display: "block",
                        "@media screen and (max-width:950px)": {
                          margin: "-2px 0 0 !important",
                        },

                        "@media screen and (max-width:767px)": {
                          display: "none",
                        },
                      }}
                      data-tracking="visit-store-link"
                    >
                      Visit Store
                    </Box>
                  </BtnOutlined>

                  <Box
                    sx={{
                      border: "1px solid #d7282f",
                      display: "none",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      padding: "0 10px",
                      cursor: "pointer",
                      minHeight: "29px",
                      margin: "0 10px",
                      "@media screen and (max-width:767px)": {
                        display: "flex",
                      },
                      "&:hover": {
                        borderColor: "#d82e34",
                        backgroundColor: "#ffedee",
                      },
                      "& .icon-livechat": {
                        fontSize: "16px",
                        "& .path1": {
                          "&::before": {
                            color: "#d82e34",
                          },
                        },
                      },
                    }}
                    onClick={() => {
                      let id = localStorage?.userData
                        ? JSON.parse(localStorage?.userData).id
                        : "";
                      document.body.classList.add("chat-bodyadd");
                      dispatch(chatWindowPopup(true));
                    }}
                  >
                    <i className="icon-livechat">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                  </Box>
                  <GetQuoteMobile
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{
                      textTransform: "inherit",
                      width: quote_button_type == "quote" ? "140" : "140px",
                      display: "none",
                      "@media (max-width: 767px)": {
                        display: "block",
                      },
                    }}
                    onClick={() => {
                      if (quote_button_type == "contact") {
                        setOpenSupplier(true);
                      } else {
                        setModal(true);
                        dispatch(setQuoteDetails(data));
                      }
                    }}
                  >
                    {quote_button_type == "contact"
                      ? "Contact Us Now"
                      : "Get Quote Now"}
                  </GetQuoteMobile>
                </Box>
                <Box
                  sx={{
                    display: "none",
                    justifyContent: "center",
                    "@media screen and (max-width:767px)": {
                      display: "block",
                    },
                  }}
                >
                  <BtnOutlined
                    sx={{
                      width: "100% !important",
                      height: "34px !important",
                      fontSize: "12px !important",
                      border: "1px solid #2B2B2B !important",
                      color: "#2B2B2B !important",
                      borderRadius: "6px !important",
                      "&:hover": {
                        color: "#ffffff !important",
                        backgroundColor: "#2B2B2B !important",
                      },
                      "@media screen and (max-width:767px)": {
                        marginBottom: "10px",
                      },
                    }}
                    data-tracking="contact-seller"
                    onClick={() => {
                      let id = localStorage?.userData
                        ? JSON.parse(localStorage?.userData).id
                        : "";
                      if (id === user_id) {
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
                        handleClickOpen();
                      }
                    }}
                  >
                    Contact Supplier
                  </BtnOutlined>

                  {openSupplier && (
                    <QueryModal
                      handleClose={handleClose}
                      open={openSupplier}
                      type="contact"
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <div>
                  <BtnOutlined
                    className="pdpcompany-profile"
                    sx={{
                      width: "100%",
                      height: "34px",
                      fontSize: "12px",
                      borderColor: "#2B2B2B",
                      color: "#2B2B2B",
                      "@media screen and (max-width: 1600px)": {
                        fontSize: "11px",
                      },
                      "&:hover": {
                        color: "#ffffff",
                        backgroundColor: "#2B2B2B",
                      },

                      "& svg": {
                        "@media screen and (max-width: 1700px)": {
                          fontSize: "14px !important",
                        },
                        "@media screen and (max-width: 1300px)": {
                          display: "none",
                        },
                      },
                      "& .MuiButton-startIcon": {
                        "@media screen and (max-width: 1700px)": {
                          marginRight: "2px",
                          marginLeft: "-10px",
                        },
                      },
                      "@media screen and (max-width:767px)": {
                        marginBottom: "10px",
                      },
                    }}
                    startIcon={<AssignmentOutlinedIcon />}
                    data-tracking="company-profile"
                    onClick={() =>
                      window.open(
                        `/mini-site/${
                          company_details?.slug ?? "powercozmo"
                        }/companyprofile`,
                        "_blank"
                      )
                    }
                  >
                    Company Profile
                  </BtnOutlined>
                </div>
              </Grid>
            </Grid>
          </InfoButtons>
          <Box
            sx={{
              display: "block",
              justifyContent: "center",
              "@media screen and (max-width:767px)": {
                display: "none",
              },
            }}
          >
            <BtnOutlined
              className="pdpblackbtn"
              sx={{
                width: "100%",
                height: "34px",
                fontSize: "14px",
                borderColor: "#231f20",
                color: "#ffffff",
                backgroundColor: "#231f20",
                marginTop: "8px",
                fontWeight: "500",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "#4e4e4e",
                },
              }}
              data-tracking="contact-seller"
              onClick={() => {
                let id = localStorage?.userData
                  ? JSON.parse(localStorage?.userData).id
                  : "";

                if (id === user_id) {
                  const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: "custom-btn cancel-button",
                      cancelButton: "custom-btn remove-btn",
                    },
                    buttonsStyling: false,
                  });
                  swalWithBootstrapButtons.fire({
                    title: "",
                    html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot  <br> contact for your own product.</span>`,
                    icon: undefined,
                    showCancelButton: false,
                    reverseButtons: true,
                    imageUrl: "/assets/minisiteimages/blockmessage.svg",
                    imageWidth: 80,
                    imageAlt: "alt",
                  });
                  return;
                } else {
                  handleClickOpen();
                }
              }}
            >
              Contact Supplier
            </BtnOutlined>

            {openSupplier && (
              <QueryModal
                handleClose={handleClose}
                open={openSupplier}
                type="contact"
              />
            )}
          </Box>
        </CustomContainer>
      ) : null}
    </>
  );
};
export default ContactSupplier;
