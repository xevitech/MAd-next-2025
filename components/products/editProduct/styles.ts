import { styled, Button, Box, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { display, margin } from "@mui/system";

export const useStyles: any = makeStyles()((theme) => {
  return {
    customTextField: {
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

export const PreHeaderText = styled("div")({
  fontFamily: "open sans",
  fontWeight: 600,
  fontSize: "22px",
  marginBottom: "0px",
  color: "#231F20",
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  // position: "sticky",
  // top: "65px",
  // backgroundColor: "#f5f7fa",
  // zIndex: 10,
  "& .editproductt": {
    fontWeight: 600,
    color: "#000000",
    fontSize: "22px",
    "@media screen and (max-width:1500px)": {
      fontSize: "18px",
      lineHeight: "normal",
    },
  },
});

export const TextFieldHelperText = styled("p")({
  textAlign: "end",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  color: "#727272",
  "@media only screen and (min-width: 1300px)": {
    // minHeight: "38px",
    lineHeight:"normal"
  },
});

export const OuterContainer: any = styled("div")(({ breakPoints }: any) => ({
  background: "#f5f7fa",
  padding: "0 15px 15px",
  minHeight: "calc(100vh - 64px)",
  width: "100%",
  //display: 'flex',
  display: breakPoints?.max768px ? "block" : "flex",
  // marginTop: "64px",
  "@media screen and (max-width:1280px)": {
    margin: "4.1rem 0px 1rem",
  },
}));

export const ProductCategoryContainer = styled("div")({
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
});
export const Heading = styled("div")({
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "25px",
  color: "#000000",
  padding: "0px",
  fontFamily: "open sans",
});
export const SubHeading = styled("div")({
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  padding: "6px 0 0 0",
  fontFamily: "open sans",
  color: "#414141",
});
export const CategorySelector = styled("div")({
  minHeight: "48px",
  background: "#ECECEC",
  borderRadius: "6px",
  margin: "16px 0px 0px 0",
  padding: "10px",
  display: "flex",
  alignItems: "center",
});
export const SelectCategory = styled(Typography)({
  fontSize: "12px",
  fontWeight: "600",
  marginRight: "8px",
  marginLeft: "12px",
  "@media screen and (max-width:600px)": {
    fontSize: "10px",
    marginLeft: "0px",
    fontWeight: "500",
  },
});
export const SelectCategoryText = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  "@media screen and (max-width:600px)": {
    gap: "0px",
  },
});
export const LeftHeading = styled("div")({
  padding: "15px",
  width: "fit-content",
});
export const RightContent = styled("div")({
  display: "flex",
  // minHeight: "48px",
  alignItems: "center",
  flexWrap: "wrap",
});
export const CategoryHeader = styled("div")({
  display: "flex",
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
  lineHeight: "25px",
  cursor: "pointer",
});
export const CategoryList = styled("div")({
  minWidth: "252px",
  height: "308px",
  border: "1px solid #ABAAAA",
  borderRadius: "6px",
  overflowY: "auto",
  paddingTop: "5px",
  paddingLeft: "5px",
  paddingRight: "5px",

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
  "&:hover": {
    background: "#DD484E",
    color: "white",
  },
});
export const CategoriesListOuterRightContainer = styled("div")({
  display: "flex",
  overflowX: "auto",
  gap: "20px",
  padding: "15px",

  "&::-webkit-scrollbar": {
    height: "5px",
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
export const CategoriesListInnerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "7px",
  maxWidth: "252px",
});

export const CategoryContainerSmall = styled("div")({
  fontSize: "12px",
  lineHeight: "16px",
  background: "white",
  color: "#000000",
  padding: "5px",
  borderRadius: "6px",
  cursor: "pointer",
  margin: "4px 5px",
  border: "1px solid #CCC",
  "@media screen and (max-width:600px)": {
    fontSize: "11px",
    padding: "2px",
  },
});

export const CategoriesOuterContainer = styled("div")({
  display: "flex",
});

export const CategoriesInnerLeftContainer = styled("div")({
  padding: "15px",
  boxShadow: "5px 0 2px -2px #888",
});

export const CategoriesInnerRightContiner = styled("div")({
  display: "flex",
  overflowX: "auto",
});

export const InnerLeftContainer = styled("div")({
  width: "calc(100% - 240px)",
  // marginTop: "64px",
  "& .MuiPaper-root": {
    borderRadius: "6px",
    margin: "16px 0",
    "&:before": {
      display: "none",
    },
  },
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

export const AttributesWrapper = styled("div")({
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  padding: "10px",
  border: "1px solid #DDDDDD",
  borderRadius: "6px",
  marginTop: "10px",
  // maxHeight: '112px',
  maxHeight: "150px",
  overflow: "auto",
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

export const HelpCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  height: "150px",
  width: "100%",
  padding: "15px",
});

export const HelpCardHeader = styled("div")({
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "30px",
  color: "#DD484E",
  fontFamily: "open sans",
});

export const HelpCardContentText = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "16px",
  paddingTop: "5px",

  color: "#000000",
});

export const HelpCardFooterContainer = styled("div")({
  paddingTop: "10px",
});

export const HelpCardFooterButton = styled(Button)({
  background: "#D7282F",
  borderRadius: "4px",
  textTransform: "none",
  minWidth: "120px",
  fontWeight: 600,
  fontSize: "13px",
  lineHeight: "24px",

  letterSpacing: "0.09px",

  color: "#FFFFFF",
  "&:hover": {
    background: "#D7282F",
  },
});

export const InnerRightMiddleContainer = styled("div")({
  height: "98px",
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  display: "flex",
  width: "240px",
});

export const ItemContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 0.5,
  marginTop: "10px",
  marginBottom: "10px",
});

export const IconContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "5px",
  position: "relative",
});

export const TextContainer = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "16px",
  color: "#3A3A3A",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const InnerRightContainerContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  background: "#FFFFFF",
  paddingTop: "12px",
});

export const InnerRightContentProfileCompletionBox = styled("div")({
  display: "flex",
  flexDirection: "column",

  width: "100%",
});

export const CircularContainer = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const OuterCircle = styled("div")({
  width: "130px",
  height: "130px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const InnerCircle = styled("div")({
  width: "104px",
  height: "104px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#F2F2F2",
  border: "1px solid #DDDDDD",
  position: "absolute",
});

export const DescriptionText = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "15px",
  marginTop: "10px",
  marginBottom: "10px",
  textAlign: "center",
  color: "#5F5F5F",
});

export const ButtonContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  padding: "10px",
});

export const ProductContentContainer = styled("div")({
  padding: "16px",
  width: "100%",
  background: "#ffff",
  marginTop: "16px",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  alignItems: "center",
  flexDirection: "column",
});

export const ProductSectionHeaderContainer = styled("div")({
  fontWeight: 700,
  fontSize: "18px",
  width: "100%",
});

export const ProductDescriptionFileUploader = styled("div")({
  width: "100%",
  border: "1px dashed #BBBBBB",
  borderRadius: "4px",
  height: "102px",
  position: "relative",
});

export const FileUploaderHeading = styled("div")({
  position: "absolute",
  top: "-8px",
  left: "10px",
  fontWeight: 600,
  fontSize: "13px",
  lineHeight: "12px",
  paddingLeft: "3px",
  paddingRight: "10px",
  background: "white",
  letterSpacing: "0.4px",
  width: "fit-content",
  color: "#1C1C1C",
});

export const FileUploaderContent = styled("div")({
  display: "flex",
  margin: "auto",
  marginTop: "8px",
});

export const ContentDescription = styled("div")({
  width: "100%",
});

export const ContentDescriptionHeader = styled("div")({
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  color: "#000000",
});

export const ContentDescriptionText = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "24px",
  /* identical to box height, or 200% */
  letterSpacing: "0.09px",
  color: "#414141",
});

export const TabsContainer = styled("div")({
  width: "100%",
});
export const AccordionHeading = styled(Box)({
  width: "100%",
});
export const EditPostAccordion = styled(Box)({
  margin: "64px 0 0 0",
  "& .MuiAccordionSummary-content": {
    "&.Mui-expanded": {
      margin: "12px 0",
    },
  },
  "@media screen and (max-width:1280px)": {
    margin: "0",
  },
});
export const HideOnScrollContentt = styled(Box)({
  padding: "5px 0 5px",
  borderRadius: "4px",
  transition: ".8s linear",
});
export const StickyHeaderStyle = styled(Box)({
  position: "relative",
  "@media screen and (max-width:1280px)": {
    display: "none",
  },
  "& .editfixed-header": {
    position: "fixed",
    top: "-50px",
    backgroundColor: "#fff",
    color: "#000",
    transition: "top 0.3s ease-in-out",
    zIndex: "1101",
    padding: "2px 30px",
    boxShadow: "0px 4px 5px #EFEFEF,0px 2px 3px #EFEFEF",
    marginLeft: "256px",
    width: "calc(100% - 256px)",
  },

  "& .hide": {
    transform: "translateY(-100%)",
  },

  "& .show": {
    top: 0,
    margin: 0,
    width: "100%",
  },
});
export const BreadcrumbArrow = styled(Box)({
  "& i": {
    fontSize: "10px",
    "&:before": {
      color: "#b3b3b3",
    },
  },
});
export const CategoryBoxSmall = styled("div")({
  fontSize: "12px",
  lineHeight: "16px",
  background: "#f5f5f5",
  color: "#000000",
  padding: "3px 6px",
  borderRadius: "6px",
  cursor: "pointer",
  margin: "4px 5px 4px 0",
  border: "1px solid #CCC",
  gap: "10px",
  "@media screen and (max-width:600px)": {
    fontSize: "10px",
    padding: "2px",
  },
});

export const SearchForCommonCateory = styled(Box)({
  margin: "0 0 1rem",

  "& .MuiInputBase-root": {
    paddingRight: "0 !important",
    overflow: "hidden",
    width: "500px",
    "@media screen and (max-width:767px)": {
      width: "99%",
    },
  },
});
export const CategorySelectorSearch = styled(Box)({
  minHeight: "42px",
  background: "#ECECEC",
  borderRadius: "6px",
  margin: "16px 0px 16px 0",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  "& i": {
    fontSize: "10px",
    "&::before": {
      color: "#b3b3b3",
    },
  },
  "& .MuiTypography-body2": {
    fontSize: "11px",
    lineHeight: "16px",
    background: "white",
    color: "#000000",
    padding: "3px 5px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "1px solid #CCC",
    fontWeight: "600",
    "@media screen and (max-width:600px)": {
      fontSize: "10px",
      padding: "2px",
    },
  },
});
export const SearchHere = styled(Button)({
  background: "#d7282f",
  color: "#fff",
  minWidth: "40px",
  padding: "10px",
  borderRadius: "0px 4px 4px 0",
  "&:hover": {
    background: "#d7282f",
    color: "#fff",
  },
  "& .MuiButton-startIcon": {
    margin: 0,
  },
});
export const ForSearchArea = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
