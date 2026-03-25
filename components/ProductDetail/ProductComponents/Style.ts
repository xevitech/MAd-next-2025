import { Button, List, Stack, Typography, styled } from "@mui/material";
import { Box, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import PlaceTwoToneIcon from "@mui/icons-material/PlaceTwoTone";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

/*************************Configure Products************************************/
export const ConfigureProductHeader = styled("div")({
  background: "#FFF5F6",
  gap: 5,
  display: "flex",
  alignItems: "center",
  borderRadius: "6px 6px 0px 0",
  padding: "8px",
  justifyContent: "space-between",
  marginTop: "0 !important",
});
export const ConfigureProductFooter = styled("div")({
  padding: "8px",
  alignItems: "center",
  gap: 10,
  justifyContent: "center",
});

/****************************Contact Supplier***********************************/

export const ContactSupplierHeader = styled("div")({
  // margin: "0 0 12px",
  margin: "0 0 8px",
  background: "#fff",
  border: "1px solid #e3e6ed",
  borderRadius: "6px",
  padding: "6px",
  "&.active": {
    "& .SupplierActive": {},
  },
  "& .MuiTypography-h6": {
    fontSize: "12px !important",
    fontWeight: "normal !important",
    margin: "0 !important",
    lineHeight: "16px",
  },
});
export const ContactContainer = styled("div")({
  display: "flex",
  alignItems: "start",
  flexDirection: "column",
});
export const ContactButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});
export const ContactInformationContainer = styled("div")({
  display: "flex",
  padding: "8px",
  gap: 8,
  alignItems: "center",
  margin: "10px 0 5px",
});

/****************************Product Option***********************************/
export const ProductOptionHeader = styled("div")({
  background: "#FFF5F6",
  gap: 5,
  display: "flex",
  alignItems: "center",
  borderRadius: "6px",
  padding: "8px",
  justifyContent: "space-between",
});

export const CustomContainer = styled("div")({
  border: "1px solid #e1e1e1",
  background: "#ffffff",
  borderRadius: "6px",
  margin: "0 0 16px 0 !important",
  "& .MuiBox-root": {
    "& .css-0": {
      boxShadow: "inherit",
    },
  },
});

export const OptionTable = styled(Box)({
  "& .css-0": {
    boxShadow: "inherit",
    background: "transparent",
    padding: "6px 8px 0",
  },
  "& .css-11xur9t-MuiPaper-root-MuiTableContainer-root": {
    boxShadow: "inherit",
  },
});

/****************************Overview***********************************/

export const OverviewContentContainer = styled("div")({
  alignItems: "start",
  display: "flex",
  flexDirection: "column",
  gap: 5,
});
export const OverviewContainer = styled(Box)({
  padding: "16px 12px 6px",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  flexDirection: "column",
  marginLeft: "-12px",
  "& .quantityBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap:'12px',
  }
});

/****************************Port Container************************************** */

export const PortContainer = styled("div")({
  width: "100%",
});
export const PortBox = styled("div")({
  display: "flex",
  width: "auto",
});
export const PortLocationContainer = styled("div")({
  display: "flex",
  gap: 5,
  width: "100%",
  alignItems: "flex-start",
  lineHeight: "normal",
});
export const PortStyleContainer = styled("div")({
  display: "flex",
  paddingLeft: "0",
  alignItems: "center",
  "& .MuiTypography-body1": {
    lineHeight: "normal",
    marginRight: "4px",
  },
  "& .overviewtitle": {
    fontSize: "14px",
    color: "#000000",
    fontWeight: "600",
    "@media (max-width: 767px)": {
      fontSize: "13px",
    },
  },
});
export const SeaPortsCol = styled("div")({
  width: "auto",
  "& .MuiTypography-body1": {
    fontWeight: "600",
    "& img": {
      marginLeft: "4px",
    },
  },
});
export const BriefDesLink = styled("div")({
  fontSize: "14px",
  fontWeight: "400",
  margin: "10px 6px 0px",
  "& img": {
    marginLeft: "3px",
  },
});

/****************************Supplier************************************** */

export const SupplierHeader = styled("div")({
  display: "flex",
  padding: "8px",
  alignItems: "center",
  justifyContent: "space-between",
  "@media screen and (max-width:380px)": { display: "block" },
});
export const SupplierInfoContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 5,
  marginTop: "4px",

  marginBottom: "4px",
});
export const SupplierProfileContainer = styled("div")({
  display: "flex",
  alignItems: "start",
  flexDirection: "column",
});
export const SupplierFooter = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "fit-content",
  margin: "-8px auto 10px",
});
export const SupplierMessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  margin: "10px 0 0",
  "& .pdpredbtn": {
    background: "#D7282F",
    border: "1px solid #D7282F",
    borderRadius: "6px",
    color: "#fff",
  },
});

export const QuantityBox = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  margin: "0",
  padding: "8px",
  "& .MuiStack-root": {
    flexDirection: "inherit",
    alignItems: "center",
  },
  "@media screen and (max-width: 1600px)": {},
});
export const QuantityInput = styled("div")({
  display: "flex",
  alignItems: "center",
  margin: "0 0 0 0px !important",
  padding: "2px 0px",
  borderRadius: "4px",
  "& .MuiButtonBase-root": {
    padding: "2px !important",
    "& .MuiSvgIcon-root": {
      fontSize: "16px",
    },
  },
  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
    "& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
      height: "1.2em",
      padding: "4px 14px",
    },
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "inherit !important",
        borderWidth: "0",
      },
    },
    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
      borderWidth: "0",
    },
  },
});

export const NegotiablePrice = styled("div")({
  padding: "12px 8px",
  "& .MuiTypography-body1": {
    fontWeight: "400 !important",
    fontSize: "12px",
  },
  "& .div-root-344": {
    padding: "0",
  },
});

export const PriceCon = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "0 0 0 2px",
  "& .css-19ul630-MuiTypography-root": {
    fontSize: "16px",
  },
  "& .MuiTypography-body1": {
    color: "black",
    fontWeight: "700 !important",
    fontSize: "20px",
  },
});

export const StyledIconButtonBase = styled(IconButton)({
  color: "#D7282F",
  background: "#FFEBEC",
  borderRadius: "6px",
});

export const SupplierContainer = styled(Box)({
  padding: "9px",
  borderRadius: "6px",
  // margin: "10px 0 0 0",
  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
  "&.quicksignup": {
    boxShadow: "none",
    margin:'0'
  },
  "& h3": {
    marginBottom: "0 !important",
  },
  "@media screen and (max-width: 767px)": {
    display: "none",
  },
});

export const PortIcons = styled(Box)({
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& i": {
    fontSize: "26px",
  },
});

export const InnerRightContainer: any = styled(Grid)(({ value }: any) => {
  return {
    transition: "all ease .9s !important",
    position: "relative",
    right: !value?.toggle ? "0px !important" : "0px",
    "@media (max-width: 1199px)": {
      position: "fixed",
      zIndex: "9999",
      padding: "0 !important",
      top: 0,
      boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.1)",
      right: value?.toggle ? "-350px" : "70px !important",
      width: "350px",
    },
    "@media (max-width: 400px)": {
      right: "-300px",
    },
  };
});

export const PublishToggle = styled(Box)({
  position: "absolute",
  right: "100%",
  top: "90px",
  backgroundColor: "#414141",
  width: "34px",
  borderRadius: "10px 0px 0px 10px",
  height: "34px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "-2px 0px 7px rgba(0, 0, 0, 0.4)",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    color: "white",
    fontSize: "28px",
  },
  "@media screen and (max-width: 600px)": {
    width: "30px",
  },

  "@media (min-width:1200px)": {
    display: "none",
  },
});

export const SliderThumbnails = styled(Box)({
  borderRadius: "0px",
  // padding: "0 8px 8px",
  margin: "0 ",
  "@media screen and (max-width: 767px)": {
    padding: "0",
  },
  "& .slick-track": {
    display: "flex",
    gap: "10px",
    // padding: "16px",
    padding: "16px 0",
    "@media screen and (max-width: 767px)": {
      padding: "0",
      gap: "5px",
    },
    "& .slick-slide": {
      "& img": {
        border: "1px solid #e7e7e7",
        padding: "2px",
        borderLeft: 0,
        borderRight: 0,
      },
    },
  },
  "& .slick-arrow": {
    width: "23px",
    height: "23px",
    borderRadius: "50%",
    "&:before": {
      color: "#6e6e6e",
      fontSize: "26px",
    },
  },
  "& .slick-prev": {
    left: "7px",
    zIndex: "1",
    color: "#231F20",
    background: "#dbdbdb",
    padding: "4px",
  },
  "& .slick-next": {
    right: "5px",
    zIndex: "1",
    color: "#231F20",
    background: "#dbdbdb",
    padding: "4px",
  },
  "& .slick-disabled": {
    opacity: ".5",
  },
});
/****************************Right Sidebar************************************** */
export const Companyprofile = styled(Box)({
  boxShadow: "0 1px 10px #00000040",
  padding: "0 !important",
});

export const Headstrip = styled(Stack)({
  borderRadius: "6px 6px 0 0",
  background: "#FFF5F6",
  padding: "8px",
});

export const Compannyname = styled(Typography)({
  fontWeight: 500,
  padding: "4px 6px",
});

export const Midcontent = styled(Stack)({
  padding: "12px",
});
export const Contenttxt = styled(Typography)({
  fontSize: "13px !important",
  padding: "0 0 10px",
});
export const Contentimg = styled(Image)({
  margin: "0 10px 0 0",
  fontSize: "18px !important",
});
export const Contentimg1 = styled(PlaceTwoToneIcon)({
  margin: "0 10px 0 0",
  fontSize: "18px !important",
});
export const Contentimg2 = styled(FactoryOutlinedIcon)({
  margin: "0 10px 0 0",
  fontSize: "18px !important",
});
export const Contentimg3 = styled(RequestQuoteOutlinedIcon)({
  margin: "0 10px 0 0",
  fontSize: "18px !important",
});

export const ConfigureBtnCol = styled(Box)({
  display: "flex",
  alignItems: "center",
  borderLeft: "1px solid #f0f0f0",
  height: "100%",
  marginLeft: "10px",
  padding: "0 0 0 16px",
  "@media (max-width: 1200px)": {
    borderLeft: "0",
    marginLeft: "0",
    padding: "10px 0 8px 8px",
  },
  "& .MuiTypography-body1": {
    display: "block",
    fontWeight: "600",
    "@media only screen and (max-width: 1600px) and (min-width: 1200px)": {
      fontSize: "13px",
    },
  },
  "& .MuiLink-root": {
    color: "#d7282f",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "13px",
    border: "1px solid #d7282f",
    padding: "2px 10px",
    borderRadius: "6px",
    marginTop: "5px",
    display: "inline-block",
    transition: "all ease .3s",
    "&:hover": {
      backgroundColor: "#d7282f",
      color: "#ffffff",
    },
  },
});

export const CompanyDetail = styled(Stack)({
  position: "relative",
  display: "block",
  lineHeight: "normal",
  "&:hover": {
    "& .CompanyInfoFlyout": {
      maxHeight: "200px",
    },
    "& .MuiButtonBase-root": {
      "& .MuiSvgIcon-root": {
        display: "inline-block",
        transform: "rotate(180deg)",
      },
    },
  },
  "& .MuiButtonBase-root": {
    color: "#231f20",
    fontSize: "14px",
    textAlign: "left",
    "& .MuiSvgIcon-root": {
      display: "inline-block",
      transform: "rotate(0deg)",
      transition: "all ease .5s",
      fontSize: "22px",
    },
  },
});

export const CompanyInfoFlyout = styled(Box)({
  transition: "max-height .7s",
  position: "absolute",
  top: "100%",
  zIndex: "3",
  backgroundColor: "#ffffff",
  overflow: "hidden",
  borderRadius: "6px",
  boxShadow: "0 1px 10px #00000040",
  minWidth: "250px",
  maxWidth: "280px",
  maxHeight: "0",
  left: "-40px",
});
export const SpecificatioCol = styled(Box)({});
export const OverviewOpt = styled(Box)({
  padding: "6px 0",
  "& h6": {
    fontSize: "16px",
    color: "#231f20",
    margin: "0",
    fontWeight: "500",
  },
  "& span": {
    color: "#231f20",
    fontSize: "13px",
  },
});
export const ConfigProductCol = styled(Box)({});

export const ShadowBox = styled(Box)({
  borderRadius: "6px",
  border: "1px solid #E2E2E2",
  background: "#FFF",
  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
  padding: "12px",
  margin: "10px  0!important",
  "@media screen and (max-width: 600px)": {
    padding: "6px",
  },
});
export const AddList = styled(List)({
  margin: "0 !important",
  padding: "0 !important",
  // height: "58px",
  height: "72px",
  overflow: "hidden",
  "& .MuiListItem-root": {
    display: "flex",
    width: "100%",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "600",
    padding: "8px 0",
    // padding: "4px 0",
    lineHeight: "20px",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: "0",
    // margin: "16px 0",
    // height: "58px",
    margin: "2px 0",
    height: "72px",
    "@media screen and (max-width: 1300px)": {
      fontSize: "14px",
      padding: "8px 4px",
      lineHeight: "17px",
    },
    animation: "move 5s infinite 1s",
    "& span": {
      display: "block",
      marginLeft: "4px",
    },
    "&:first-child": {
      background: "#ECFBE6",
      border: "1px solid #B3DFA1",
      marginTop: "0",
    },
    "&:nth-child(2)": {
      background: "#FFE8EC",
      border: "1px solid #FA93A5",
    },
    "&:nth-child(3)": {
      background: "#FFF6E8",
      border: "1px solid #FFD595",
    },
  },
});

export const MyAdsInnerData = styled(Box)({
  padding: "10px",
});

export const WishlistCol = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "0px 0px 10px 0px",
  borderBottom: "1px dashed #DDDDDD",
  justifyContent: "space-between",
  "& .MuiLink-root": {
    color: "#231f20",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",

    "&:hover": {
      color: "#D7282F",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "18px",
      marginRight: "6px",
      color: "#D7282F",
    },
    "@media screen and (max-width: 600px)": {
      fontSize: "12px",
    },
  },
  "@media screen and (max-width: 600px)": {
    gap: "10px",
  },
});
export const LocationCol = styled(Box)({
  fontSize: "12px",
  padding: "10px 0",
  borderBottom: "1px solid #DDDDDD",
  "& .MuiSvgIcon-root": {
    color: "#D7282F",
    fontSize: "20px",
  },
  "& strong": {
    fontSize: "13px",
    fontWeight: "600",
  },
});
export const DispatchOpt = styled(Box)({
  borderTop: "1px solid #DDDDDD",
  marginTop: "14px",
  padding: "4px 0",
  "& .MuiList-root": {
    "& .MuiListItem-root": {
      padding: "0",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      "&::before": {
        content: '" "',
        display: "block",
        width: "5px",
        height: "5px",
        backgroundColor: "#231f20",
        borderRadius: "50%",
        marginRight: "8px",
      },
      "& span": {
        color: "#D7282F",
        fontWeight: "500",
        paddingLeft: "4px",
      },
    },
  },
});
export const ViewOpt = styled(Box)({
  textAlign: "center",
  borderTop: "1px solid #DDDDDD",
  padding: "12px 0",
  "& .MuiTypography-body1": {
    fontSize: "13px",
    fontWeight: "600",
  },
  "& .MuiLink-root": {
    color: "#D82E34",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& i": {
      marginRight: "4px",
    },
  },
});
export const ChatSupplier = styled(Box)({
  borderRadius: "6px",
  border: "1px solid #D2D2D2",
  background:
    "linear-gradient(180deg, #F1F1F1 0%, rgba(241, 241, 241, 0.00) 7.81%, #F1F1F1 82.29%, #EFEFEF 95.83%)",
  padding: "14px 16px",
  fontSize: "20px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  "& span": {
    color: "#D7282F",
    marginLeft: "5px",
  },
  "@media (max-width: 1700px)": {
    fontSize: "16px",
  },
  "@media (min-width: 1200px) and (max-width: 1280px)": {
    fontSize: "15px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "16px",
    padding: "14px 2px",
  },
  "@media screen and (max-width:370px)": {
    fontSize: "13px",
  },
});
export const SupplierImg = styled(Box)({
  width: "40px",
  height: "40px",
  overflow: "hidden",
  borderRadius: "100%",
  marginRight: "10px",
});
export const InfoButtons = styled(Box)({
  marginTop: "8px",
  paddingTop: "8px",
  display: "flex",
});
export const CountQty = styled(Box)({
  borderRadius: "6px",
  border: "1px solid #C8C8C8",
  overflow: "hidden",
  width: "120px",
  gap: "0 !important",
  "& .MuiFormControl-root": {
    width: "100%",
    "& fieldset": {
      border: "0",
    },
    "& .MuiInputBase-input": {
      padding: "2px 14px",
      height: "24px",
      textAlign: "center",
    },
  },
  "& .MuiSvgIcon-root": {
    height: "28px",
    width: "28px",
    padding: "6px",
    backgroundColor: "#F2F2F2",
    "&:hover": {
      backgroundColor: "#dfdbdb",
    },
  },
});
export const QtyContainer = styled(Box)({
  display: "flex",
  borderTop: "1px solid #dddddd",
  height: "16px",
  marginTop: "18px",
  position: "relative",
  "& .MuiTypography-body1": {
    fontSize: "14px",
    marginRight: "8px",
    color: "#231f20",
  },
});
export const SellerRelatedproducts = styled("div")({
  "& .slick-slide": {
    display: "grid",
    height: "auto",
  },
});
export const SupplierName = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "white",
  border: "1px solid #CCCCCC",
  width: "100%",
  padding: "6px",
  borderRadius: "6px",
  margin: "6px 0",
  "& .hover-fx": {
    display: "inline-block",
    cursor: "pointer",
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    textAlign: "center",
    position: "relative",
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transition: "300ms",
  },

  "& .hover-fx:after": {
    pointerEvents: "none",
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    content: "''",
    boxSizing: "content-box",
    boxShadow: "0 0 0 1px #d7282f",
    top: 0,
    left: 0,
    opacity: 0,
    transition: "300ms",
  },

  "& .hover-fx:hover": {
    backgroundColor: "#fff",
    color: "#00989A",
  },

  "& .hover-fx:hover:after": {
    opacity: 1,
    transform: "scale(1.15)",
  },
});
export const RatingReviews = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  borderBottom: "1px solid #DDDDDD",
  padding: "0 0 7px",
  gap: "4px",
  "& .MuiTypography-h6": {
    fontSize: "15px",
    fontWeight: "600",
    margin: "0 0 6px 0",
  },
});
export const MyRatingBox = styled(Box)({
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  "& .MuiLink-root": {
    cursor: "pointer",
    fontSzie: "12px",
    color: "#0055D6",
  },
});

export const CoDetailsOpt = styled(Box)({
  paddingTop: "8px",
  "@media screen and (max-width: 767px)": {
    "& .MuiTypography-h6": {
      margin: 0,
    },
  },
  "& .MuiGrid-item": {
    "@media (min-width: 1536px) and (max-width: 1700px)": {
      "& .MuiTypography-body1": {
        fontSize: "11px",
      },
      "& .MuiTypography-h6": {
        fontSize: "12px",
      },
      "& i": {
        fontSize: "18px",
      },
    },
  },
});
export const Certificates = styled(Box)({
  borderTop: "1px solid #DDDDDD",
  marginTop: "8px",
  paddingTop: "8px",
  "& .MuiTypography-h6": {
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
});
export const CertifcatesTitle = styled(Typography)({
  fontSize: "15px !important",
  fontWeight: "500",
  color: "#231f20",
  margin: "0 0 6px 0px",
  "& span": {
    fontWeight: "700",
  },
});

export const LiveChat = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  justifyContent: "center",
  margin: "10px 0 0",
  cursor: "pointer",
  "& .icon-livechat": {
    fontSize: "36px",
  },
});

/*****========== Start Product Detail Page styling ==========*****/
export const ManufacturerYearBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  margin: "10px 0 0",
  cursor: "pointer",
  "@media (max-width: 1400px)": {
    gap: "15px",
  },
  "@media (max-width: 950px)": {
    alignItems: "self-start",
    gap: "18px",
  },
  "@media (max-width:1025px)": {
    // flexDirection: "row",
    // justifyContent: "start",
    // display: "block"
  },
  "& .MuiTypography-root": {
    fontSize: "11px",
    fontWeight: 600,
    "@media (max-width:767px)": {
      fontSize: "12px",
    },
  },
  "& .hover-fx": {
    display: "inline-block",
    cursor: "pointer",
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    textAlign: "center",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transition: "300ms",
  },

  "& .hover-fx:after": {
    pointerEvents: "none",
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    content: "''",
    boxSizing: "content-box",
    boxShadow: "0 0 0 1px #d7282f",
    top: 0,
    left: 0,
    opacity: 0,
    transition: "300ms",
  },

  "& .hover-fx:hover": {
    backgroundColor: "#fff",
    color: "#00989A",
  },

  "& .hover-fx:hover:after": {
    opacity: 1,
    transform: "scale(1.15)",
  },
  "@media (max-width: 480px)": {
    alignItems: "self-start",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  "& .onlyimagecase": {
    "& img": {
      "@media (max-width: 1200px)": {
        height: "14px !important",
      },
      "@media (max-width: 1025px)": {
        height: "auto !important",
        width: "70px",
      },
    },
    "& .enterprisePlan": {
      "@media (max-width: 1025px)": {
        width: "90px",
      },
    },
  },
  "& .yearbadge": {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
});
export const InnColumn = styled(Box)({
  position: "relative",
  "& .move-up": {
    transition: "all 1s",
    "&:hover": {
      transition: "all .9s",
      transform: "translateY(-10px)",
    },
  },
  "& .dotBefore": {
    "&::before": {
      content: '"\\2022"',
      fontSize: "17px",
      position: "absolute",
      width: "5px",
      height: "5px",
      margin: "-5px -13px",
      "@media (max-width: 1280px)": {
        margin: "-5px -9px",
      },
      "@media (max-width: 980px)": {
        margin: "-4px 0 0 -12px",
        fontSize: "15px",
      },

      "@media (max-width:767px)": {
        display: "block",
      },
    },
  },
  "& .dotbeforeimg": {
    "&::before": {
      content: '"\\2022"',
      fontSize: "17px",
      position: "absolute",
      width: "5px",
      height: "5px",
      margin: "-1px -13px",
      alignItems: "center",
      "@media (max-width: 1800px)": {
        margin: "-3px -11px",
      },
      "@media (max-width: 1300px)": {
        margin: "-4px -11px",
      },
      "@media (max-width: 1200px)": {
        margin: "-3px -11px",
        fontSize: "15px",
      },
      "@media (max-width:1025px)": {
        // display: "block",
        margin: "1px -11px",
      },
    },
  },
  "& .typebusiness": {
    height: "25px",
    margin: "-2px 0 0",
    "@media (max-width: 767px)": {
      height: "28px",
    },
  },
});
export const CoDetailsOptInfo = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "12px !important",
    marginBottom: 0,
  },
  "@media (max-width: 767px)": {
    "& .MuiTypography-root": {
      fontSize: "11px !important",
    },
  },
  "& .MuiTypography-h6": {
    fontWeight: "600",
  },
});
export const ProductDetailHeadingArea = styled(Box)({
  "& .mainpheading": {
    fontSize: "18px !important",
    lineHeight: "22px",
    padding: "0 0 5px",
    "@media (max-width: 1600px)": {
      fontSize: "18px !important",
    },
    "@media (max-width: 900px)": {
      fontSize: "15px !important",
    },
  },
});
export const SocialIconsDetailPage = styled(Box)({
  display: "grid",
  justifyContent: "center",
  "& .MuiIconButton-root": {
    padding: "2px",
    "&:hover": {
      background: "transparent",
    },
  },
  "& svg": {
    fontSize: "17px",
  },
  "& .icon-x-social": {
    fontSize: "13px",
    "&::before": {
      color: "#000",
    },
  },
  "@media (max-width: 600px)": { margin: "25px 0 0 0 !important" },
});
export const FlagCityName = styled("span")({
  "& svg": {
    fontSize: "10px",
  },
  "& .move-up": {
    transition: "all 1s",
    border: "1px solid #DDDDDD",
    padding: "1px",
    borderRadius: "2px",

    "&:hover": {
      transition: "all .9s",
      transform: "translateY(-10px)",
    },
  },
});
export const HideOptionns = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin: "0 -3px 0 0",
});

export const UpToIpadView = styled(Box)({
  display: "block",
  "@media (max-width: 899px)": {
    display: "none",
  },
});
export const IpadPortrtaitView = styled(Box)({
  display: "none",
  "@media (max-width: 899px)": {
    display: "block",
  },
});
export const MyIpadMobileGrid = styled(Grid)({
  "@media (max-width: 767px)": {
    maxWidth: "100%",
    flexBasis: "100%",
  },
});
export const GetQuoteMobile = styled(Button)({
  display: "none !important",
  color: "#fff !important",
  padding: "2px 8px !important",
  backgroundColor: "#d32f2f !important",
  borderRadius: "4px !important",
  "@media (max-width: 767px)": {
    display: "block !important",
  },
});
export const BusinessNmeTooltip = styled(Typography)({
  "&::before": {
    content: '""',
    width: "5px",
    height: "5px",
    backgroundColor: "black",
    margin: "0 -8px 0",
    borderRadius: "50%",
    display: "inline-block",
    position: "relative",
    top: "-3px",
    marginRight: "4px", // Adjust this value as needed
  },
  fontSize: "12px",
  padding: "0 6px 3px",
  lineHeight: "18px",
});
/*****========== End Product Detail Page styling ==========*****/

/***** Relted Keywords styling *****/
export const RelatyedSearchArea = styled(Box)({
  background: "#fff",
  // borderRadius: "6px",
  // padding: "20px",
  // boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.09)",
  margin: "0 10px 17px",
});
export const RelatedSearchHeading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "700",
  padding: "0px 0 5px",
});
export const PDPStyledKeyword = styled("span")({
  backgroundColor: "#ffffff",
  border: "1px solid #C8C8C8",
  // borderRadius: "6px",
  display: "inline-block",
  alignItems: "center",
  fontSize: "12px",
  padding: "4px 8px",
  margin: "4px 3px 0px 0",
  cursor: "pointer",
  "&:hover": {
    background: "#d7282f",
    color: "#fff",
    borderColor: "#d7282f",
    transition: "all ease .5s",
  },
});
export const RelatyedSearchContent = styled(Box)({
  padding: "5px 0 0",
});
// country Name in nearby seaport and airport
export const CountryName = styled("span")({
  fontSize: "14px",
  fontWeight: "700",
});
