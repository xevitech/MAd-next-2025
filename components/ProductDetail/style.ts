import { Button, FormControl, Paper, styled } from "@mui/material";
import { Typography, Box, TextareaAutosize } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
export const TextArea = styled(TextareaAutosize)(({ error = false }: any) => ({
  width: "100%",
  height: "58px",
  marginTop: 4,
  marginBottom: 4,
  paddingLeft: 10,
  border: "1px solid rgba(34, 51, 84, 0.5)",
  borderRadius: "4px",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "14px",
  color: "#929296",
  lineHeight: "23px",
  paddingTop: "5px",
  backgroundColor: "white",
  resize: "none",
  borderColor: error ? "#e74c3c" : "#22335480",
}));

export const OuterContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 0px 0 0px",
};

export const InnerContainerStyle = {
  display: "flex",
};
export const BreadcrumbsStyle = styled(Box)(() => ({
  visibility: "visible",
  // paddingLeft: "16px",
  margin: "10px 0px 10px",
  "& .MuiBreadcrumbs-li": {
    "& .MuiLink-root": {
      color: "#231F20",
      textDecoration: "none",
      fontSize: "12px",
    },
    "&:last-child": {
      "& .MuiLink-root": {
        fontWeight: "600",
        color: "#D82E34",
      },
    },
  },
  "& .MuiBreadcrumbs-separator": {
    fontSize: "0",
    background: 'url("/assets/breadcrumb-arrow.svg") no-repeat center',
    display: "block",
    width: "7px",
    height: "10px",
    position: "relative",
    top: "2px",
    opacity: "0.7",
  },
  "@media screen and (max-width: 767px)": {
    padding: "0 10px 5px",
    background: "#f5f5f5",
  },
}));
export const OverviewHeading = styled(Box)(() => ({
  "& .MuiTypography-root": {
    fontWeight: "600",
  },
}));
export const TabContainer = styled(Box)(() => ({
  fontFamily: "Open Sans",
  // "& .MuiTabPanel-root": {
  //   maxHeight: "890px",
  //   height:"890px",
  //   overflowY: "auto",
  // },
}));

export const ConfigRibbon = styled(Box)(() => ({
  background: 'url("/assets/ribon.svg") no-repeat center',
  color: "#ffffff",
  borderRadius: "6px",
  zIndex: 10,
  fontSize: "11px",
  width: "100px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  backgroundSize: "100%",
  position: "absolute",
  top: "-2px",
  right: "0",
  "& .MuiTypography-subtitle1": {
    margin: "0 0 0 14px",
    fontWeight: 600,
    textTransform: "capitalize",
    position: "relative",
    top: "-3px",
    fontSize: "12px",
  },
}));
export const SideBarPaper = styled(Paper)(() => ({
  borderRadius: 0,
}));

export const HeaderRightButtonConatainer = styled("div")({
  display: "flex",
  justifyContent: "end",
  gap: "10px",
  margin: " 0",
  cursor: "pointer",
});
export const ButtonStyleContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 5,
  background: "#fff",
  padding: "4px 10px",
  borderRadius: "4px",
  "@media screen and (max-width: 1600px)": {
    padding: "4px 0",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "18px !important",
  },
});

export const AdvertisementContainer = styled("div")({
  background: "#E9E9E9",
  display: "flex",
  justifyContent: "space-between",
});

export const AdvertisementText = styled("div")(
  ({ color, background, borderColor }: any) => ({
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "13px",
    lineHeight: "18px",
    color: color || "#D7282F",
    background: background || "#fff",
    margin: "5px 0",
    borderRadius: "6px",
    padding: "4px 10px",
    border: "1px solid",
    borderColor: borderColor || "",
    marginRight: "8px",
  })
);

export const ProductDetailHeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "3px",
});
export const ProductHeading = styled("div")({
  "& .MuiTypography-h1": {
    marginBottom: "10px",
    marginTop: "2px",
    color: "black",
    fontWeight: 700,
    fontSize: "16px",
    "@media screen and (max-width: 1600px)": {
      fontSize: "15px",
      color: "#374151 ",
      lineHeight: "normal",
    },
  },
});
export const StockIconConatiner = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

export const ProductTypeContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0px 0px 5px",
});

export const TermContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 0 8px",
});

export const TermButtonStyle = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  padding: "5px",
  gap: 5,
});

export const ViewMoreContainer = styled(Box)({
  alignItems: "center",
  display: "flex",
});

export const TextAreaContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "8px",
  paddingLeft: "8px",
  gap: 5,
});

export const SpecificationValueContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
});
export const SpecificationContentContainer = styled("div")({
  display: "flex",
  gap: 50,
  justifyContent: "space-between",
  padding: "20px",
  flexWrap: "wrap",
});

export const SpecificationHeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 20px",
  marginRight: "10px",
});

export const ConfigureTitleContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "0 0 6px",
});

export const ConfigureTextFieldContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
  paddingTop: "16px",
});

export const Container = styled(Box)(
  ({ padding, paddingX, paddingY }: any) => ({
    background: " #FFFFFF",
    boxShadow:
      " 0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
    borderRadius: " 6px",
    paddingLeft: paddingX,
    paddingRight: paddingX,
    paddingTop: paddingY,
    paddingBottom: paddingY,
    padding: "20px !important",
  })
);

export const ConfigContainer = styled("div")(
  ({ padding, paddingX, paddingY }: any) => ({
    background: " #FFFFFF",
    borderRadius: " 6px",
    margin: "0 0 16px !important",
    border: "1px solid #e1e1e1",
    "& .MuiBox-root": {
      boxShadow: "inherit",
      padding: "8px 8px 0",
      "& .css-11xur9t-MuiPaper-root-MuiTableContainer-root": {
        boxShadow: "inherit",
        border: "1px solid #e1e1e1",
        "& .MuiTableCell-head": {
          fontSize: "13px",
        },
      },
    },
    "& .MuiDivider-root": {
      opacity: ".5",
    },
  })
);
export const SelectConfigtype = styled("div")({
  margin: "12px 6px 0 0",
  "& .MuiButton-textPrimary": {
    whiteSpace: "nowrap",
    fontSize: "12px",
    fontWeight: "500",
  },
});
/**************************** Seller product style ************************************** */

export const RelatedproductContainer = styled("div")(
  ({ padding, paddingX, paddingY }: any) => ({
    background: " #FFFFFF",
    paddingLeft: paddingX,
    paddingRight: paddingX,
    // paddingTop: paddingY,
    paddingBottom: paddingY,
    paddingTop: "1rem",
  })
);

export const ProductItemContainer = styled(Box)(() => ({
  background: " #FFFFFF",
  boxShadow:
    " 0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: " 6px",
  // borderBottom: "1px solid #dddddd",
  border: "1px solid #ddd",
}));

export const MarginContainer = styled("div")(() => ({
  margin: "8px",
}));

export const Shadowcontainer = styled("div")(() => ({
  background: " #FFFFFF",
  borderRadius: " 6px",
}));

export const MuiContainer = styled("div")(() => ({
  background: " #FFFFFF",
  boxShadow:
    " 0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: " 6px",
  padding: "24px 16px",
}));
export const ProductdesShadow = styled("div")(() => ({
  background: " #FFFFFF",
  boxShadow:
    " 0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: " 6px",
  padding: "8px 12px",
  "@media screen and (max-width: 600px)": {
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
}));

export const FontContainer = styled(Typography)(
  ({
    color,
    fontSize,
    fontWeight,
    padding,
    textDecorationLine,
    background,
  }: any) => ({
    fontFamily: "Open Sans !important",
    wordWrap: "break-word",
    fontStyle: "normal",
    fontWeight: fontWeight ? fontWeight : "400px !important",
    fontSize: fontSize || "13px",
    color: color || "#6C6C6C",
    padding,
    textDecorationLine,
    background,
    display: "flex",
    justifyContent: "space-between",
    alignItem: "center",
  })
);

export const SpecificationHead: any = styled("h2")(({ breakPoints }: any) => ({
  fontFamily: "Open Sans !important",
  fontStyle: "normal",
  fontWeight: "600 !important",
  fontSize: breakPoints?.max1440px ? "12px" : "17px",
  color: "#231F20",
}));

export const OverviewHead: any = styled("h4")(({ breakPoints }: any) => ({
  fontFamily: "Open Sans !important",
  fontStyle: "normal",
  fontWeight: "600 !important",

  fontSize: breakPoints?.max1440px
    ? "12px"
    : breakPoints?.max1023px
    ? "12px"
    : "13px !important",
  color: "#231F20",
  paddingLeft: "6px !important",
  borderLeft: "2px solid #D7282F",
  whiteSpace: "nowrap",
}));

export const SmallMainHead: any = styled("h3")(({ breakPoints }: any) => ({
  fontFamily: "Open Sans !important",
  fontStyle: "normal",
  fontWeight: "600 !important",
  fontSize: breakPoints?.max1440px ? "12px" : "15px !important",
  color: "#231F20",
  paddingLeft: "6px !important",
  wordWrap: "break-word",
  borderLeft: "2px solid #D7282F",
  "@media screen and (max-width: 1600px)": {
    fontSize: "13px !important",
  },
}));

export const SpecificationValue = styled(Typography)({
  fontFamily: "Open Sans !important",
  fontStyle: "normal",
  fontWeight: "400 !important",
  fontSize: "14px !important",
  color: "#00000080",
});

export const PortLocation = styled("div")(() => ({
  fontWeight: "600",
  fontSize: "14px",
}));

/**************************Content*******************************/

export const RightContentHeader = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  paddingBottom: "8px",
});
export const RightContentContainer = styled("div")({
  background: "#FFE8EC",
  padding: 3,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: "3px",
});

/************************* Product detail 14march *****************/
export const DetailTopSection: any = styled("div")(({ breakPoints }: any) => ({
  background: "#fff",
  borderRadius: "6px",
  padding: breakPoints?.max1440px ? "8px" : "10px",
}));

export const SpecificationProduct = styled("div")({
  background: "#FFFFFF",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  borderRadius: "6px",
  margin: " 32px 19px 0",
});

export const SpecificationBox = styled("div")({
  padding: "0 6px",
});

export const ProductDescription = styled("div")({
  fontWeight: "400 !Important",
  fontSize: "13px !Important",
  padding: "8px 0px",
  color: "#5C5C5C!important",
  lineHeight: "24px",
});

/************************* Mobile View component *****************/
export const Webview: any = styled("div")(({ breakPoints }: any) => ({
  display: breakPoints?.max1023px ? "none" : "block",
}));

export const MobileView: any = styled("div")(({ breakPoints }: any) => ({
  display: breakPoints?.max1023px ? "block" : "none",
}));

export const Containerlogin = styled("div")({
  background: " #FFFFFF",
  // boxShadow:
  //   " 0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: " 6px",
  padding: "20px ",
  "& .MuiTypography-body2": {
    fontSize: "18px",
    fontWeight: "600",
    color: "#000000",
    justifyContent: "flex-start",
    "& .MuiSvgIcon-root": {
      marginRight: "4px",
    },
  },
  "& .MuiAlert-icon": {
    fontSize: "18px",
    padding: "4px 0",
  },
  "& .MuiAlert-message": {
    fontSize: "12px",
    color: "#d7282f",
    padding: "5px 0",
  },
});
export const ConfigProduct = styled(Box)({
  position: "fixed",
  bottom: "-230px",
  left: "0",
  right: "0",
  zIndex: "1299",
  backgroundColor: "#ffffff",
  padding: "4px 16px 16px",
  boxShadow: "0 -3px 15px #cccccc",
  transition: "all ease .5s",
  "& .MuiTypography-h6": {
    fontSize: "18px",
    borderBottom: "1px solid #E8E8E8",
    paddingBottom: "10px",
    fontWeight: "600",
  },
  "&.active": {
    bottom: "0px",
    "& .minusW": {
      display: "block",
    },
    "& .PlusW": {
      display: "none",
    },
  },
  "& .minusW": {
    display: "none",
  },
});

export const SpecificationField = styled(Box)({});
export const SigninField = styled(Box)({
  paddingTop: "16px",
  "& .MuiFormControl-root": {
    height: "auto",
    width: "100%",
    marginBottom: "12px",
    "& .MuiInputBase-root": {
      lineHeight: "30px",
      "& .MuiInputBase-input": {
        height: "24px",
        padding: "6px 14px",
        width: "100%",
      },
    },
  },
  "& fieldset": {
    borderColor: "#D2D2D2",
  },
  "& .MuiFormLabel-root": {
    fontSize: "13px",
    color: "#000000",
    transform: "translate(14px, 7px) scale(1)",
    "&.Mui-focused": {
      transform: "translate(14px, -9px) scale(0.9)",
    },
  },
});
export const FieldContainer = styled(Box)({
  "& .MuiTypography-h6": {
    margin: "6px 0 6px 0",
    fontSize: "18px",
    fontWeight: "600",
    backgroundColor: "#f5f5f5",
    padding: "2px 12px",
  },
});
export const ScrollCol = styled(Box)({
  // display: "inline-table",
  // gap: 16,
  // width: "100%",
  // paddingBottom: "10px",
  // clear: "both",
  maxHeight: "204px",
  overflow: "auto",
  // padding: "16px 0px",
  padding: "12px 11px",
  border: "1px solid #dbdbdb",
  borderRadius: "4px",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#bfbfbf",
    borderRadius: "10px",
  },
});
export const SelectContainer = styled(Box)({
  // minWidth: "190px",
  // maxWidth: "100%",
  // float: "left",
  // marginRight: "12px",
  // marginBottom: "16px",
  "& .MuiSelect-select": {
    fontSize: "13px",
    padding: "6px 12px",
  },

  "& .MuiInputBase-input": {
    fontSize: "13px",
    padding: "6px 12px",
  },
  "&.active": {
    "& .MuiSelect-select": {
      color: "#2f7c43",
      backgroundColor: "#f7f7f7",
    },
    "& fieldset": {
      border: "1px solid #2f7c43",
    },
  },
});
export const SelectLbl = styled(Box)({
  fontSize: "12px",
  fontWeight: "600",
  marginBottom: "4px",
  fontFamily: "Open Sans",
});

export const ToggleCircle = styled(Box)({
  width: "50px",
  height: "50px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export const FadeCircle = styled(Box)({
  width: "50px",
  height: "50px",
  position: "absolute",
  opacity: "0.5",
  backgroundColor: "#D7282F",
  borderRadius: "50%",
  top: "0",
  left: "0",
});
export const MaxMinCol = styled(Box)({
  borderRadius: "100%",
  width: "34px",
  height: "34px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backgroundColor: "#D7282F",
  position: "relative",
  zIndex: "1",
  "&:after": {
    content: '" "',
    width: "30px",
    height: "30px",
    border: "2px solid #ffffff",
    position: "absolute",
    left: "2px",
    top: "2px",
    borderRadius: "100%",
  },
  "&:hover": {
    borderColor: "#8b8b8b",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "24px",
    color: "#ffffff",
    transform: "rotate(-90deg)",
  },
});
export const SelectedSpecification = styled(Box)({
  display: "flex",
});
export const ProductListAccordion = styled(Box)({
  "& .MuiAccordion-root": {
    borderRadius: "8px",
    marginBottom: "12px !important",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  "& .MuiAccordionSummary-root": {
    flexDirection: "row",
    paddingLeft: "0",
    "& .MuiAccordionSummary-content": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "4px 0",
      "@media (max-width: 600px)": {
        display: "block",
      },
    },
  },
});
export const AccordionHeader = styled(Box)({
  "& .MuiTypography-h6": {
    fontSize: "13px !important",
    fontWeight: "600 !important",
    margin: "0 !important",
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
    color: "#7E7E7E",
  },
});
export const ProductLabel = styled(Box)({
  color: "#D7282F",
  border: "1px solid #D7282F",
  borderRadius: "6px",
  padding: "2px 6px",
  fontSize: "11px",
  fontWeight: "400",
  "@media (max-width: 480px)": {
    display: "none",
  },
});
export const SelectedConfig = styled(Box)({
  fontSize: "13px",
  color: "#494949",
  marginLeft: "12px",
  borderLeft: "1px solid #ABABAB",
  padding: "0 12px",
  "@media (max-width: 600px)": {
    border: "none",
    margin: "8px 0",
    fontWeight: 600,
  },
  "& strong": {
    marginLeft: "4px",
  },
});
export const ProdThumbImg = styled(Box)({
  display: "flex",
  marginRight: "8px",
  "& img": {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
  },
});
export const RelatedProSpec = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
});
export const SpecificationCol = styled(Box)({
  width: "95%",
  display: "-webkit-inline-box",
  overflowX: "auto",
  padding: "12px 0 10px",
  whiteSpace: "nowrap",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
  "& .MuiFormControl-root": {
    width: "190px",
    marginRight: "16px",
    "& .MuiSelect-select": {
      padding: "8px 14px",
    },
  },
});
export const DeleteSpecCol = styled(Box)({
  borderLeft: "1px solid #d2d2d2",
  marginLeft: "16px",
  paddingLeft: "16px",
  position: "relative",
  top: "-3px",
  "& .MuiSvgIcon-root": {
    border: "1px solid #D7282F",
    borderRadius: "50%",
    color: "#D7282F",
    width: "26px",
    height: "26px",
    padding: "2px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#D7282F",
      color: "#ffffff",
    },
  },
});

export const ProductDetails = styled(Box)({
  paddingBottom: "0px",
  paddingTop: "1px",

  "@media (max-width: 899px)": {
    paddingTop: "0",
  },

  "& .MuiTypography-h1": {
    fontSize: "22px",
    color: "#231F20",
    fontWeight: "600",
  },
  "& .MuiTypography-body1": {
    color: "#3A3A3A",
    fontWeight: "500",
    fontSize: "14px",
  },
});
export const ProdID = styled(Box)({
  fontSize: "13px",
  color: "#2D2D2D",
  "& img": {
    marginLeft: "5px",
  },
});
export const ProductDetailTxt = styled(Box)({
  fontSize: "13px",
  color: "#434343",
  lineHeight: "normal",
  "@media (max-width: 1290px)": {
    fontSize: "12px",
  },
  marginTop: "5px",
  "& .MuiLink-root": {
    fontWeight: "600",
    color: "#231F20",
    fontSize: "13px",
    cursor: "pointer",
    display: "inline-block",
    "&:hover": {
      color: "#d7282f",
    },
  },
});
export const OverviewBox = styled(Box)({
  marginTop: "8px !important",
  "@media (max-width: 767px)": {
    marginTop: "0 !important",
  },

  "& .MuiTypography-h2": {
    fontSize: "18px",
    fontWeight: "600",
    color: "#000000",
    marginBottom: "6px",
    "@media (max-width: 767px)": {
      marginBottom: "15px",
    },
    "@media (max-width: 1600px)": {
      fontSize: "16px",
    },
  },
});
export const DetailBigOverview = styled(Box)({
  "& .blueclr": {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const OverviewData = styled(Box)({
  position: "relative",
  minHeight: "53px",
  "@media (max-width: 768px)": {
    paddingLeft: "0",
  },
  "& .slick-slider": {
    padding: "0 16px",
    "& .slick-list": {
      position: "relative",
      "&::before": {
        display: "block",
        width: "2px",
        height: "100%",
        content: '" "',
        position: "absolute",
        left: "0",
        zIndex: "2",
        top: "0",
      },
      "&::after": {
        display: "block",
        width: "2px",
        height: "100%",
        content: '" "',
        position: "absolute",
        right: "0",
        zIndex: "2",
        top: "0",
      },
    },
  },
  "&.noScroll": {
    "& .slick-track": {},
  },
  "& .slick-arrow": {
    zIndex: "3",
    height: "100%",
    "&::before": {
      content: '" "',
      display: "block",
      width: "20px",
      height: "20px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    },
  },
  "& .slick-prev": {
    left: "-6px",
    "&::before": {
      backgroundImage: `url('/assets/arrowLeft.svg')`,
    },
  },
  "& .slick-next": {
    right: "-6px",
    "&::before": {
      backgroundImage: `url('/assets/arrowRight.svg')`,
    },
  },
});
export const OverviewOpt = styled(Box)({
  "& h6": {
    fontSize: "13px",
    color: "#000000",
    fontWeight: "600",
    margin: "0",
    wordBreak: "break-word",
  },
  "& span": {
    color: "#000000",
    fontSize: "13px",
  },
});
export const PriceCol = styled(Box)({
  marginTop: "16px !important",
  "& .MuiTypography-h6": {
    fontSize: "13px",
    color: "#000000",
  },
  "& .MuiTypography-body1": {
    fontSize: "18px",
    color: "#000000",
    fontWeight: "500",
  },
});
export const AvailabilityCol = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiTypography-h6": {
    fontSize: "14px",
    color: "#000000",
    lineHeight: "22px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    "@media (max-width: 600px)": {
      fontSize: "12px",
    },
    "@media (max-width: 1280px)": {
      whiteSpace: "nowrap",
    },
    "& span": {
      fontSize: "14px",
      "@media (max-width: 1280px)": {
        whiteSpace: "normal",
      },
      "@media (max-width: 600px)": {
        fontSize: "12px",
      },
    },
    "& .MuiTypography-body1": {
      fontSize: "13px",
      fontWeight: "600",
      border: "1px solid #34A853",
      borderRadius: "4px",
      padding: "0px 8px",
      whiteSpace: "nowrap",
      color: "#34A853",
      backgroundColor: "#ffffff",
      display: "inline-flex",
      margin: "0 8px",
      "@media (max-width: 600px)": {
        fontSize: "12px",
      },
    },
    "@media (max-width: 768px)": {
      display: "initial",
    },
  },
});
export const QtyCol = styled(Box)({});
export const ConfigList = styled(Box)({
  display: "flex",
  width: "100%",
  // padding: " 8px 12px 0",
  justifyContent: "space-between",
});
export const CollapseIcon = styled(Box)({
  backgroundColor: "#EDEDED",
  border: "1px solid #D4D4D4",
  padding: "6px",
  borderRadius: "4px",
  height: "30px",
  width: "36px",
  display: "flex",
  alignItems: "center",
  position: "relative",
  top: "22px",
  justifyContent: "center",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    fontSize: "25px",
  },
});
export const RememberCheckbox = styled(Box)({
  width: "100%",
  padding: "0 8px 12px",
  "& .MuiCheckbox-root": {
    padding: "0",
    color: "#7a7878",
    marginRight: "6px",
    "& .MuiSvgIcon-root": {
      fontSize: "22px",
    },
  },
  "& .MuiFormControlLabel-label": {
    fontSize: "13px",
  },
});
export const ProductAvailability = styled(Box)({
  backgroundColor: "#F4F6FA",
  borderRadius: "6px 6px 0 0",
  padding: "8px 12px",
  margin: "10px 0 0",
});
export const PriceQuoteCol = styled(Box)({
  backgroundColor: "#ffffff",
  marginTop: "10px",
  padding: "9px",
  "@media (max-width:767px)": {
    padding: "9px 4px 9px 9px",
  },
  borderRadius: "4px",
  "& .MuiTypography-h6": {
    fontSize: "14px",
    fontWeight: "600",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
  "& .icon-agreement": {
    fontSize: "24px",
  },
  "& .icon-instock-hideprice": {
    fontSize: "20px",
    margin: "4px 0px 0 1px",
  },
  "& .showhidepeice": {
    "& .showhideoption": {
      display: "contents",
    },
  },
});
export const QuoteBtnCol = styled(Box)({
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  borderTop: "1px solid #dddddd",
  padding: "12px 0 0px",
  marginTop: "12px!important",
  "@media (max-width:767px)": {
    display: "block",
    textAlign: "center",
    margin: "0 0 4px",
  },

  "@media (max-width:480px)": {
    flexDirection: "column",
    gap: "16px",
  },
  "& button": {
    boxShadow: "none",
  },
  "& .leftgetquote": {
    color: "#fff",
    padding: "4px 10px",
    backgroundColor: "#d32f2f",
    borderRadius: "4px",
    "@media (max-width:950px)": {
      fontSize: "12px",
    },
  },
});
export const SelectedOrigin = styled(Box)({
  margin: "8px 0 0 0!important",
  borderRadius: "0px 0px 6px 6px",
  padding: "8px 0px 0",
  "& .MuiTypography-body1": {
    fontSize: "13px",
    "@media (max-width: 767px)": {
      fontSize: "12px",
    },
    "& span": {
      fontWeight: "600",
    },
  },
});
export const OriginShippingPayIconsInfo = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: "5px",
  "& .MuiTypography-body1": {
    fontSize: "13px",
    "@media (max-width: 767px)": {
      fontSize: "12px",
    },
  },
  "& i": {
    fontSize: "22px",
    display: "block",
    width: "20px",
  },
  "& .icon-globe": {
    margin: "5px 0 0",
  },
  "& .icon-lead-time": {},
  "& .icon-shipping": {
    fontSize: "16px",
  },
  "& .icon-payments": {},
  "& .origincountrycolor strong": {
    color: "#231f20",
  },
  "& .icon-shipping:before": {
    margin: "0 0 0 -4px",
  },
  "& .icon-agreement": {
    margin: "-3px 2px 0 0",
  },
  "& .icon-productavail": {
    fontSize: "20px",
    // margin: "4px 0 0"
  },
  "& .icon-contact-ai": {
    fontSize: "20px",
  },
  "& .overviewtitle": {
    fontSize: "14px",
    color: "#000000",
    fontWeight: "600",
    lineHeight: "normal",
    "@media (max-width: 767px)": {
      fontSize: "13px",
    },
  },
});
export const ShippingOption = styled(Box)({
  borderBottom: "1px solid #dddddd",
  paddingBottom: "16px",
  marginTop: "12px !important",
});
export const PaymentOpt = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px !important",
  "& .icon-payMethod": {
    fontSize: "36px",
    display: "block",
    width: "28px",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
  },
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "start",
  },
});

export const PaymentMethodImageBox = styled("span")({
  border: "1px solid #ddd",
  borderRadius: "4px",
  textAlign: "center",
  justifyContent: "space-around",
  display: "flex",
  // width: "50px",
  // height: "30px",
  width: "40px",
  height: "25px",
  "@media (max-width: 900px)": {
    width: "40px",
    height: "25px",
  },
  "& img": {
    width: "100%",
    objectFit: "contain",
  },
});

export const ProductAvlil = styled(Box)({
  borderTop: "1px solid #dddddd",
  paddingTop: "10px",
  marginTop: "10px !important",

  "& .MuiTypography-h6": {
    fontSize: "13px",
    fontWeight: "600",
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
    "& span": {
      fontWeight: "600",
    },
  },
});

/*****========== Styling =========******/

export const CheckedTypography = styled(Typography)({
  fontSize: "12px !important",
  fontWeight: "600",
  color: "#d7282f",
  padding: "3px 0 0",
});
export const ContactForShippingBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginTop: "10px !important",
  "& .icon-contactshipping-new": {
    fontSize: "22px",
    display: "block",
    width: "15px",
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
  },
  "@media (max-width: 600px)": {
    alignItems: "start",
  },
});
export const ProDuctDetailBase = styled(Box)({
  "& .hover-fx": {
    display: "inline-block",
    cursor: "pointer",
    width: "30px",
    height: "30px",
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
    backgroundColor: "#000",
    color: "#00989A",
  },

  "& .hover-fx:hover:after": {
    opacity: 1,
    transform: "scale(1.15)",
  },
  "& .RightbarToggle": {
    transition: "all ease .5s",
    position: "relative",
    "@media (max-width: 1200px)": {
      position: "fixed",
      right: "-350px",
      zIndex: "9999",
      padding: "0 !important",
      top: "0",
      boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.1)",
      width: "350px !important",
      maxWidth: "350px !important",
      flexBasis: "350px!important",
      "& .CloseList": {
        display: "none",
      },
    },
    "@media (max-width: 370px)": {
      right: "-350px",
    },
  },
  "& .RightToggle": {
    transition: "all ease .5s",
    position: "relative",
    "@media (max-width: 1200px)": {
      position: "fixed",
      right: "0px",
      width: "400px !important",
      MaxWidth: "400px !important",
      zIndex: "1298",
      padding: "0 !important",
      top: "0px",
      boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.1)",
    },
    "@media (max-width: 480px)": {
      width: "350px !important",
      maxWidth: "350px !important",
    },
    "@media (max-width: 370px)": {
      width: "250px !important",
      maxWidth: "250px !important",
    },
    "& .PlayListIco": {
      display: "none",
    },
    "& .CloseList": {
      fontSize: "23px !important",
    },
  },
  "& .fixedHeightSide": {
    position: "sticky",
    // top: "100px",
    top: "20px",
    "@media (max-width: 767px)": {
      position: "unset",
    },

    "@media only screen and (max-width: 1600px) and (min-width: 1300px)": {
      float: "right",
      width: "100%",
    },

    "@media screen and (max-width: 1200px)": {
      overflowY: "auto",
    },
    "@media screen and (max-width: 600px)": {
      padding: "0",
    },
  },
  "& .mobilenozoom": {
    "@media screen and (max-width: 600px)": {
      width: "100%",
      margin: "0 auto",
    },
  },

  "& .mobilespacing": {
    "@media screen and (min-width: 1200px)": {},
    "@media screen and (max-width: 600px)": {
      padding: "0",
    },
  },
});

/*****===== Start Available Options of Configuration product =====*****/
export const SelectproductFeature = styled(Box)({
  position: "relative",
  "& .expandcontainer": {
    // width: "300px",
    width: "100%",
    margin: "auto",
    position: "absolute",
    background: "#fff",
    zIndex: "10",
    boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
  },
  "& .content": {
    overflow: "hidden",
    maxHeight: 0,
    transition: "max-height 0.8s ease",
  },
  "& .content.expanded": {
    maxHeight: "600px",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },

  "& .flyouthederr": {
    background: "#FFE8E8",
    padding: "12px",
    "& svg": {
      fontSize: "18px",
    },
  },
});
export const SelectProductText = styled(Typography)({
  color: "#434343",
  fontWeight: "700",
  fontSize: "14px",
  "& .totalvariation": {
    fontWeight: "600",
    padding: "0 0 0 7px",
    "@media screen and (max-width: 300px)": {
      padding: 0,
    },
  },
  "& .itemcount": {
    fontWeight: "700",
  },
});
export const EmptyFlyout = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "80px 0 0 0",
  "@media screen and (max-width:767px)": {
    margin: "30px 0 0 0",
  },
  "& .Textarea": {
    width: "80%",
    margin: "50px auto",
    textAlign: "center",
    "@media screen and (max-width:767px)": {
      margin: "20px 0 0 0",
    },
  },
  "& .emptyHeading": {
    fontSize: "24px",
    fontWeight: "600",
    color: "#231f20",
    "@meida screen and (max-width:900px)": {
      fontSize: "18px",
    },
    "@meida screen and (max-width:600px)": {
      fontSize: "16px",
    },
  },
  "& .emptySubHeading": {
    fontSize: "16px",
    fontWeight: "400",
    color: "#231f20",
    "@meida screen and (max-width:900px)": {
      fontSize: "14px",
    },
  },
});
export const EmptyImage = styled(Box)({
  position: "absolute",
  left: "50%",
  transform: "translate(-50%,50%)",
});
export const ItemSelectRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 9px",
  alignItems: "center",
  "@media screen and (max-width: 767px)": {
    display: "block",
    padding: "0px 0 10px",
  },
});
export const NowSelect = styled(Box)({
  "& button": {
    // color: "#0055D6",
    // padding: 0,
    textTransform: "capitalize",
    // fontWeight: "600",
    fontSize: "13px",
    margin: "5px -4px 0 5px",
    color: "#fff",
    background: "#d7282f",
    padding: "0 0px 0 6px",
    "& svg": {
      width: "12px",
    },
    "@media screen and (max-width: 767px)": {
      margin: "0",
    },
    "&:hover": {
      background: "#c62828",
      color: "#fff",
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    },
    "& .MuiButton-endIcon": {
      marginLeft: "0",
    },
  },
});
export const CollapseIconSelect = styled(Box)({
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "@media screen and (max-width: 767px)": {
    justifyContent: "left",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
  },
});
export const SelectProductt = {
  minHeight: "35px",
  "& .MuiButtonBase-root": {
    color: "#000",
    fontWeight: "600",
    fontSize: "14px",
    textTransform: "capitalize",
  },
  "& .Mui-selected": {
    color: "#d7282f !important",
    background: "#F1F1F1",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
};
export const SelectFormControl = styled(FormControl)({
  "& svg": {
    fontSize: "17px",
  },
});
export const TabPanelStyle = styled(TabPanel)({
  padding: "0",
});
export const QuantityPriceRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid #ddd",
  borderBottom: "1px solid #ddd",
  margin: "15px 0",
  padding: "12px 5px 10px",
});
export const PriceColumn = styled(Box)({
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    fontSize: "14px",
  },
  "& .BoldColor": {
    color: "#d7282f",
    fontSize: "18px",
    fontWeight: "700",
  },
  "& .infocolumn": {
    color: "#231F20",
    fontSize: "14px",
    fontWeight: "600",
    padding: "0 0 0 1rem",
    "& svg": {
      color: "#0AA133",
      margin: "0 5px",
      fontSize: "14px",
    },
  },
});
export const QuantityColumn = styled(Box)({});
export const QtyContainer1 = styled(Box)({
  position: "relative",
  "& .MuiTypography-body1": {
    fontSize: "14px",
    marginRight: "8px",
    color: "#000000",
  },
});

export const QtyCounter = styled(Box)({
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
export const SimpleQuantityCompo = styled(Box)({
  "& .simplqtybox": {
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
});
export const AddFeatures = styled(Box)({
  "& .MuiLink-root": {
    display: "flex",
    alignItems: "center",
    color: "#d7282f",
    fontSize: "12px",
    margin: "0 0 0 8px",
    "& svg": {
      fontSize: "18px",
    },
  },
});

export const CustomisedConfigration = styled(Box)({
  //  padding:"1rem 0 0"
  "& .expandbox": {
    // width: "300px",
    margin: "auto",
    position: "absolute",
    background: "#fff",
    zIndex: "10",
  },
  "& .content": {
    overflow: "hidden",
    maxHeight: 0,
    transition: "max-height 0.3s ease",
  },
  "& .content.expanded": {
    maxHeight: "600px",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
});
export const TopAraaText = styled(Box)({
  "& .MuiTypography-h5": {
    color: "#231F20",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    "& svg": {
      fontSize: "18px",
    },
  },
  "& .MuiTypography-body2": {
    color: "#434343",
    fontSize: "12px",
  },
});
export const AddSpecifications = styled(Box)({
  padding: "10px 0",
});
export const CustomizationContainer = styled(Box)({});
export const MyLabel = styled(Box)({
  fontSize: "14px",
  marginBottom: "4px",
  color: "#231F20",
  fontFamily: "Open Sans",
  fontWeight: 500,
});
export const AddIcons = styled("span")({
  background: "#ddd",
  borderRadius: "4px",
  padding: "5px",
  cursor: "pointer",
  margin: "20px 0 0",
  display: "inline-block",
  "& svg": {
    color: "#000",
  },
});
export const StyleDrawer = styled(SwipeableDrawer)({
  "& .MuiDrawer-paper": {
    width: "1300px",
    maxWidth: "1300px",
    "@media (max-width: 1300px)": {
      width: "96%",
    },
  },
});
export const UnfoldBtn = styled("div")({
  background: "#ddd",
  borderRadius: "4px",
  padding: "1px",
  cursor: "pointer",
  position: "absolute",
  width: "20px",
  height: "20px",
  right: 0,
  bottom: "11px",
  "&:hover svg": {
    color: "#d7282f",
  },
  "& svg": {
    color: "#000",
    fontSize: "18px",
    transform: "rotate(45deg)",
    margin: "-7px 0px 1px 0px",
  },
});
export const AddedOptionHere = styled(Box)({
  background: "#fff",
  borderTop: "1px solid #ddd",
  padding: "10px 0 14px",
  borderBottom: "1px solid #ddd",
  margin: "5px 0 12px",
});
export const DeleteLbl = styled(Box)({
  fontSize: "12px",
  fontWeight: "600",
  marginBottom: "4px",
  fontFamily: "Open Sans",
  color: "#d7282f",

  display: "flex",
  "& svg": {
    color: "#d7282f",
    fontSize: "16px",
  },
});

export const BottomFixedPrice = styled("footer")({
  // position: "relative",
  // "& .fixed-priceBottom": {
  // position: "fixed",
  bottom: "10px",
  width: "-webkit-fill-available",
  // }
});
export const AvailableOpt4Config = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "5px 0 6px",
  "@media screen and (max-width: 767px)": {
    display: "block",
    padding: 0,
  },
  span: {
    margin: "0 2px",
    "& button": {
      color: "#d7282f",
      padding: 0,
      fontSize: "14px",
      textTransform: "capitalize",
      textDecoration: "underline",
      "&:hover": {
        background: "none",
        textDecoration: "none",
      },
    },
    "& svg": {
      fontSize: "14px !important",
    },
  },
});
export const AvailableOptText = styled(Typography)({
  color: "#231F20",
  fontSize: "14px",
  fontWeight: 600,
});
/***** Icon datagrid  ******/
export const StylingDatagrid = {
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "&.MuiDataGrid-root": {
    height: "90%",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
    fontSize: "14px",
    color: "#1A2027",
    fontFamily: "Open Sans",
  },
  "& .MuiDataGrid-cell": {
    color: "#3E5060",
    fontSize: "13px",
    fontFamily: "Open Sans",
    cursor: "pointer",
  },
  "& .Mui-checked": {
    color: "#d7282fcc !important",
  },
  "& .MuiSvgIcon-root": {
    // color: "#D7282F",
    fontSize: 16,
  },
  "& .MuiDataGrid-columnSeparator": { display: "none" },
};

/*****===== End Available Options of Configuration product =====*****/

export const FlyOutButtonArea = styled(Box)({
  display: "flex",
  justifyContent: "end",
  margin: "10px 0 0",
});
export const FlyOutTableButton = styled(Box)({
  display: "flex",
  justifyContent: "end",
  gap: "10px",
  "&.configFlyout": {
    margin: "10px 0 0 0",
  },
});

export const FlyoutCloseBtn = styled(Button)({
  background: "#fff",
  textTransform: "capitalize",
  borderColor: "#d7282f !important",
  color: "#d7282f",
  "&:hover": {
    background: "#d7282f",
    color: "#fff",
  },
});
export const FlyoutBtn = styled(Button)({
  background: "#d7282f",
  textTransform: "capitalize",
  borderColor: "#d7282f !important",
  color: "#fff",
  "&:hover": {
    background: "#fff",
    color: "#d7282f",
  },
  "&.ConfigQuote": {
    background: "rgba(0, 0, 0, 0.12)",
    color: "rgba(0, 0, 0, 0.26)",
    border: "rgba(0, 0, 0, 0.12)",
    cursor: "not-allowed",
    pointerEvents: "none !important",
  },
});
export const FlyOutTable = styled(Box)({
  margin: "2rem 0 0",
  "& .MuiTypography-h3": {
    color: "#000",
    fontSize: "16px",
    padding: "0px 0 10px",
    fontWeight: 600,
  },
  "&.getQuote": { margin: "2rem 0 1rem 0" },
});
export const EnterQuantityBox = styled(Box)({
  display: "flex",
  gap: "8px",
  "& .MuiFormControl-root": {
    maxWidthg: "135px",
  },
  "& .MuiInputBase-input": {
    padding: "6px 10px",
  },
  "& button": {
    background: "#fff",
    textTransform: "capitalize",
    borderColor: "#d7282f !important",
    color: "#d7282f",
    "&:hover": {
      background: "#d7282f",
      color: "#fff",
    },
  },
  "& .iconDelete": {
    borderLeft: "1px solid #ddd",
    margin: "0 10px",

    "& svg": {
      color: "#d7282f",
      border: "1px solid #d7282f",
      borderRadius: "30px",
      cursor: "pointer",
      padding: "5px",
      width: "32px",
      height: "32px",
      margin: "0 0 0 15px",
    },
  },
});

export const ConfigAccordionHeader = styled(Box)({
  "& .MuiTypography-h4": {
    fontSize: "13px",
    fontWeight: "600",
    margin: "0",
    padding: 0,
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
    color: "#7E7E7E",
  },
});
export const RelatedSelectOptions = styled(Box)({
  margin: "12px",
  "& .MuiInputBase-input": {
    fontSize: "13px",
    padding: "6px 12px",
  },
});

export const AddAnotherSpecification = styled(Box)({
  borderTop: "2px solid #ddd",
  margin: "0px 0 6px 0px",
  "& button": {
    color: "#d7282f",
    border: "none !important",
    textTransform: "capitalize",
    "&:hover": {
      background: "none",
    },
  },
});
