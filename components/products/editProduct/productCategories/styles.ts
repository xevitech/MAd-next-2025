import { Box, styled, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { display } from "@mui/system";

export const useStyles: any = makeStyles()((theme) => {
  return {
    customTextField: {
      backgroundColor: "#fff",
      width: "100%",
      "& input::placeholder": {
        fontSize: "13px",
      },
    },

    customInputFieldsProduct: {
      "& input::placeholder": {
        fontSize: "13px",
        fontWeight: "bold",
      },
    },
    buttonGroup: {
      display: "flex",
      gap: "16px !important",
      marginTop: "16px !important",
      marginBottom: "16px",
      // paddingLeft: "30px",
      flexWrap: "wrap",
    },

    customToggleButton: {
      border: "1px solid rgba(0, 0, 0, 0.12) !important",
      borderLeft: "1px solid rgba(0, 0, 0, 0.12) !important",
      textTransform: "none",
      // height: "28px",
      minWidth: "90px",
      maxHeight: "40px",
      // border: 1px solid #979797;
      borderRadius: "4px !important",
      fontWeight: "500 !important",
      fontSize: "14px !important",
      lineHeight: "24px !important",
      fontFamily: "open sans !important",
      /* identical to box height, or 171% */
      // opacity: "0.9 !important",
      letterSpacing: "0.09px",
      color: "black !important",
      paddingLeft: "6px !important",
      paddingRight: "6px !important",
    },

    customToggleButtonSelected: {
      border: "1px solid rgba(0, 0, 0, 0.12) !important",
      borderLeft: "1px solid rgba(0, 0, 0, 0.12) !important",
      textTransform: "none",
      // height: "28px",
      minWidth: "90px",
      maxHeight: "40px",
      borderRadius: "4px !important",
      fontWeight: "500 !important",
      fontSize: "14px !important",
      lineHeight: "24px !important",
      fontFamily: "open sans !important",
      /* identical to box height, or 171% */
      // opacity: "0.9 !important",
      letterSpacing: "0.09px",
      backgroundColor: "#DD484E !important",
      color: "white !important",
      paddingLeft: "6px !important",
      paddingRight: "6px !important",
      // fontWeight:"bold !important"
    },

    pricingTypeCustomToggleButton: {
      fontWeight: "400 !important",
      fontSize: "14px !important",
      lineHeight: "24px !important",
      letterSpacing: "0.09px !important",
      height: "28px !important",
      border: "1px solid #979797 !important",
      borderRadius: "4px !important",
      padding: "2px 12px !important",
      color: "#000000 !important",
    },

    pricingTypeCustomToggleButtonSelected: {
      height: "28px !important",
      background: "#34A853 !important",
      border: "1px solid #A4A4A4 !important",
      borderRadius: "4px !important",
      fontWeight: 600,
      fontSize: "14px !important",
      lineHeight: "24px !important",
      letterSpacing: "0.09px !important",
      color: "#FFFFFF !important",
      padding: "2px 12px !important",
    },

    customScrollClass: {
      "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        borderRadius: "6px",
      },
    },
  };
});

export const ProductCategoryContainer = styled("div")({
  background: "#FFFFFF",
  // boxShadow:
  //   "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  padding: "0px",
  position: "relative",
});
export const Heading = styled("div")({
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "25px",
  color: "#000000",
  padding: "0px 0px 5px",
  fontFamily: "open sans",
});
export const SubHeading = styled("div")({
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  padding: "0px 0px 15px",
  fontFamily: "open sans",

  color: "#414141",
});
export const CategorySelector = styled("div")({
  minHeight: "35px",
  background: "#ECECEC",
  borderRadius: "6px",
  margin: "0px 16px 16px 0px",
  // paddingLeft: "10px",
  // paddingRight: "10px",
  padding: '10px'
});
export const LeftHeading = styled("div")({
  padding: "15px",
  width: "fit-content",
});
export const RightContent = styled("div")({
  // display: "flex",
  // height: "100%",
  // minHeight: "35px",
  // alignItems: "center",
});
export const CategoryHeader = styled("div")({
  display: "flex",
  "& .MuiInputBase-root": {
    borderRadius: "6px",
    paddingRight: "6px",
  },
});
export const CategoryHeaderText = styled("div")({
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
});
export const CategoryHeaderButton = styled("div")({
  width: "25px",
  height: "25px",
  background: "#DD484E",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  color: "white",
  fontSize: "23px",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    fontSize: "22px",
  },
});
export const CategoryList = styled("div")({
  // minWidth: "252px",
  height: "308px",
  // border: "1px solid #ABAAAA",
  // borderRadius: "6px",
  overflowY: "auto",
  // paddingTop: "5px",
  // paddingLeft: "5px",
  // paddingRight: "5px",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: "6px",
  },
});

export const CategoryListItem = styled("div")({
  color: "black",
  width: "100%",
  fontSize: "13px",
  lineHeight: "18px",
  padding: "6px",
  paddingLeft: "10px",
  borderRadius: "6px",
  textOverflow: "ellipsis",
  cursor: "pointer",
  margin: "2px 0 0",
  border: "1px solid transparent",
  fontWeight: "600",
  textTransform: "capitalize",
  "&:hover": {
    // border: "1px solid #DD484E",
    background: "#FFECEC !important",
  },
});
export const CategoriesListOuterRightContainer = styled("div")({
  display: "flex",
  overflowX: "auto",
  gap: "20px",
  // padding: '15px',
  padding: "0px 22px 15px 0",

  "&::-webkit-scrollbar": {
    height: "7px",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: "6px",
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#888888',
  },
  "@media screen and (max-width:600px)": {
    overflowX: "initial",
  },
});
export const CategoriesListInnerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0px",
  maxWidth: "252px",
});

export const CategoryContainerSmall = styled("div")({
  fontSize: "12px",
  lineHeight: "16px",
  background: "white",
  color: "#000000",
  padding: "3px 5px",
  borderRadius: "4px",
  border: "1px solid #CCC",
  cursor: "pointer",
  // marginLeft: "10px",
  // marginRight: "10px",
  fontWeight: "600",
  margin: "2px 2px",
});

export const CategoriesOuterContainer = styled("div")({
  display: "flex",
  "@media screen and (max-width:600px)": {
    overflowX: "auto",
  },
});

export const CategoriesInnerLeftContainer = styled("div")({
  padding: "0px 20px 15px 0",
});

export const CategoriesInnerRightContiner = styled("div")({
  display: "flex",
  overflowX: "auto",
});

export const InnerLeftContainer = styled("div")({
  width: "calc(100% - 240px)",
  marginTop: "64px",
});

export const InnerRightContainer = styled("div")({
  position: "sticky",
  width: "240px",
  // border: "1px solid #D7282F",
  height: "fit-content",
  right: "0",
  top: "150px",
  margin: "10px",
  display: "flex",
  marginLeft: "15px",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: "6px",
  paddingTop: "0px",
  paddingBottom: "10px",
  gap: "15px",
  flexDirection: "column",
});
export const ButtonCol = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  paddingTop: "14px",
});

export const CategoryName = styled(Box)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  "& span": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "90%"
  }

});

export const RightSectorCategory = styled(Box)({
  "& .MuiTypography-body1": {
    fontWeight: "600",
    fontSize: "14px",
    padding: "0 0 4px"
  },
  "& .MuiTypography-body2": {
    fontSize: "12px",
    color: "#919191",
  }

});
// rejected and pending categories
export const RejectedCategory = styled(Typography)({
  color: '#d7282f', fontSize: '12px', fontWeight: '400'
});
export const PendingCategory = styled(Typography)({
  // color: '#d7282f', fontSize: '10px', fontWeight: '400'
  display: "inline-flex",
  "& svg": {
    color: "#d7282f",
    fontSize: "16px"
  }
});
export const ApprovedCategory = styled(Typography)({
  display: "inline-flex",
  "& svg": {
    color: "#34A853",
    fontSize: "16px"
  }

});

