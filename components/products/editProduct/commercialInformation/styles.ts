import {
  Box,
  Button,
  Radio,
  Tabs,
  TextField,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import TabList from "@mui/lab/TabList";

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
    toggleBtn: {
      "& .MuiButtonBase-root": {
        fontSize: "11px",
        textTransform: "capitalize",
        padding: "4px",
        "@media screen and (max-width:600px)": {
          fontSize: "10px",
          padding: "4px",
        },
        "&.Mui-selected": {
          color: "white",
          background: "rgba(215, 40, 47, 1) !important",
        },
      },
      "@media screen and (max-width:600px)": {
        height: "25px !important",
      },
    },
    buttonGroup: {
      display: "flex",
      gap: "10px !important",
      marginTop: "16px !important",
      marginBottom: "16px",
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

export const PriceToggle = styled(Box)({
  position: "absolute",
  right: "8px",
  top: "5px",
  zIndex: "2",
  "& .MuiToggleButtonGroup-root": {
    height: "22px",
    "& .MuiButtonBase-root": {
      fontSize: "10px",
    },
  },
});
export const ProductContentContainer = styled("div")({
  // padding: "16px",
  width: "100%",
  background: "#ffff",
  // marginTop: "16px",
  // boxShadow:
  //   "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  alignItems: "center",
  flexDirection: "column",
});

export const ProductSectionHeaderContainer = styled("div")({
  height: "35px",
  borderBottom: "1px solid #DDDDDD",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "25px",
  width: "100%",
  marginBottom: "8px",
});

export const ContentDescription = styled("div")({
  width: "100%",
});

export const ContentDescriptionHeader = styled("div")({
  fontWeight: 600,
  fontSize: "14px",
  color: "#000000",
  width: "100%",
  "@media (max-width: 600px)": {
    fontSize: "13px",
  },
});

export const ContentDescriptionText = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  // lineHeight: "24px",
  /* identical to box height, or 200% */
  // letterSpacing: "0.09px",
  margin: "4px 0px",
  color: "#414141",
});
export const InputDelete = styled(Box)({
  background: "#ffd1d3",
  borderRadius: "100%",
  width: "26px",
  height: "26px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  right: "-13px",
  cursor: "pointer",
  zIndex: "1",
  "& .MuiSvgIcon-root": {
    fontSize: "1.2rem",
    color: "#DD484E",
  },
  "&:hover": {
    background: "#d7282f",
    "& .MuiSvgIcon-root": {
      color: "#ffffff",
    },
  },
});
export const OriginCase = styled(Box)({});
export const CustomToggleBtn = styled(ToggleButtonGroup)(
  ({ value, error }: any) => ({
    borderRadius: "0",
    gap: "16px",
    "@media screen and (max-width:600px)": {
      // display: "grid",
      // gap: "30px",
    },
    "& .MuiToggleButton-root": {
      fontSize: "13px",
      color: "#000000",
      padding: "2px 12px",
      borderRadius: "4px !important",
      textTransform: "capitalize",
      fontWeight: "600",
      position: "relative",
      "&.CaseOne": {
        "&:before": {
          content: '"Case 1"',
          display: "flex",
          position: "absolute",
          left: "0",
          top: "-28px",
          color: "#000000",
          fontSize: "14px",
        },
      },
      "&.CaseTwo": {
        "&:before": {
          content: '"Case 2"',
          display: "flex",
          position: "absolute",
          left: "0",
          top: "-28px",
          color: "#000000",
          fontSize: "14px",
        },
      },
      "&.CaseThree": {
        "&:before": {
          content: '"Case 3"',
          display: "flex",
          position: "absolute",
          left: "0",
          top: "-28px",
          color: "#000000",
          fontSize: "14px",
        },
      },
      "& .icon-approved": {
        display: "none",
        "&:before": {
          color: "#ffffff",
          fontSize: "10px",
          marginRight: "6px",
        },
      },
      "&.Mui-selected": {
        backgroundColor: `${
          value ? "#34A853 !important" : "#34A853 !important"
        }`,
        color: "#ffffff",
        borderColor: "#34A853 !important",
        "& .icon-approved": {
          display: "block",
        },
      },
    },
  })
);
export const SelectToggleBtn = styled(ToggleButtonGroup)({
  "& .MuiToggleButton-root": {
    border: "1px solid #979797 !important",
    fontSize: "13px",
    color: "#000000",
    padding: "2px 12px",
    textTransform: "capitalize",
    fontWeight: "600",
    "& .icon-approved": {
      display: "none",
      "&:before": {
        color: "#ffffff",
        fontSize: "10px",
        marginRight: "6px",
      },
    },
    "&.Mui-selected": {
      backgroundColor: "#D7282F",
      color: "#ffffff",
      borderColor: "#d7282f !important",
      "& .icon-approved": {
        display: "block",
      },
    },
  },
});

export const PaymentMethodEditPage = styled(Box)({});
export const PaymentMethodInnerInfo = styled(Box)({});

/****===== Commercial Information Tabs stling =====****/
export const CommercialInfoTabSection = styled(Box)({
  width: "100%",
  "& .MuiTabPanel-root": {
    padding: "24px 0 0",
  },
  "& .MuiFormHelperText-root": {
    "& svg": {
      fontSize: "10px",
      marginRight: "4px",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiFormGroup-root": {
    "& .MuiFormControlLabel-root": {
      display: "flex",
      justifyContent: "flex-start",
      width: "fit-content",
    },
  },
});
export const TabOuterBox = styled(Box)({
  margin: "0 -16px 0 -16px",
});

export const CustomTabs = styled(Tabs)({
  position: "relative",
  "&::before": {
    background: "#ddd",
    content: "''",
    height: "1px",
    width: "100%",
    position: "absolute",
    bottom: "0",
    zIndex: 2,
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#fff",
    height: "1px",
    zIndex: 2,
  },
  "& .MuiTab-root": {
    color: "#231F20",
    fontWeight: 700,
    margin: "0 10px 0 0px",
    border: "1px solid #ddd",
    borderBottom: "none",
    borderRadius: "6px 6px 0 0",
    textTransform: "capitalize",
    background: "#FAFAFA",
  },
  "& .Mui-selected": {
    color: "#D7282F",
    backgroundColor: "#fff",
  },
  "& .emptytab": {
    minWidth: "20px",
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    cursor: "default",
  },
  "& .MuiTabScrollButton-root": {
    width: "20px",
  },
});
export const CustomizationBox = styled(Box)({
  "& .MuiTypography-h3": {
    fontSize: "14px",
    fontWeight: 700,
  },
});
export const CustomizatioOptions = styled(Box)({
  margin: "1rem 0 0",
  borderTop: "1px solid #ddd",
  padding: "1rem 0",
  "& .qutLabelHere": {
    "@media screen and (max-width: 600px)": {
      display: "none",
    },
  },
  "& .MuiTypography-h3": {
    fontSize: "14px",
    fontWeight: 700,
  },
  "& button": {
    borderColor: "#d7282f",
    color: "#d7282f",
    "&:hover": {
      borderColor: "#d7282f",
      background: "#d7282f",
      color: "#fff",
    },
  },
});
export const RadioButtonGroup = styled(Box)({
  "& .MuiFormControlLabel-root":{
    margin: "0 0 6px 0",
  },
  "& .MuiFormControlLabel-label": {
    fontSize: "14px",
    fontWeight: 700,   
  },
  "& .MuiRadio-root": {
    padding: "3px 5px 3px",
    "& svg": {
      fontSize: "16px",
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
    color: "#a6a6a6",
  },
  "& .Mui-checked": {
    "& .MuiSvgIcon-root": {
      color: "#d7282f",
    },
  },
});
export const InputLabelText = styled(Box)({
  height: "100%",
  display: "flex",
  alignItems: "center",
});
export const CustOptionRow = styled(Box)({
  padding: "10px 0",
  "& .MuiInputBase-root": {
    width: "255px",
    "& input": {
      padding: "6.5px 14px",
    },
  },
});

export const TextfieldUnitsBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  "& span": {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    "& .MuiTypography-body1": {
      fontSize: "13px",
    },
  },
  "& svg": {
    color: "#d7282f",
    fontSize: "15px",
  },
});
export const SlectPricing = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
});
export const SelectPricingTBox = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "baseline",
});

/**** Start Pricing Selected styling Box ****/
export const NoSectionSelectBox = styled(Box)({
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  padding: "4rem 0",
  "&.priceUnavailable": {
    padding: "2rem 0 0 10px",
    justifyContent: "start",
  },
});
export const NoSelectBoxInn = styled(Box)({
  "& .MuiTypography-h2": {
    fontSize: "22px",
    fontWeight: 700,
    padding: "0 0 5px",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
  },
  "& .icon-globe": {
    fontSize: "60px",
    "&:before": {
      color: "#919191",
    },
  },
});
export const PricingOrderQtyy = styled(Box)({
  "& .responsiveSpacing": {
    "@media screen and (max-width:900px)": { margin: "12px 0 0 0" },
  },
  "& .responsiveHidden": {
    "@media screen and (max-width:900px)": { display: "none" },
  },
});
export const PriceOrderCol = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});
export const PriceOrderColInn = styled(Box)({
  width: "100%",
});
export const PriceOrderColPerInn = styled(Box)({
  margin: "0 0 0 18px",
  "@media screen and (max-width:900px)": {
    margin: "0px",
  },
});
export const PriceOrderColPerInn1 = styled(Box)({
  margin: "0 0 0 62px",
  "@media screen and (max-width:900px)": {
    margin: "0px",
  },
});

export const CurrencyCodeBox = styled(Box)({
  display: "flex",
  // alignItems: "center",
  gap: "8px",
  position: "relative",
});
export const ErrormessBox = styled(Box)({
  color: "#d7282f",
  fontSize: "10px",
  fontWeight: "400",
  position: "absolute",
});
export const CurrencyCodeBoxSecond = styled(Box)({
  minWidth: "55px",
  "@media screen and (max-width:900px)": {
    position: "absolute",
    top: "4px",
    left: "8px",
  },
});
export const PricesmainBox = styled(Box)({
  height: "100%",
  display: "flex",
  gap: "10px",
  position: "relative",
  alignItems: "center",
  // margin: "36px 0 0 0",
  "@media screen and (max-width:900px)": {
    margin: "10px 0 0 0",
  },
});

export const SymbolForQty = styled(Typography)({
  fontSize: "17px",
  fontWeight: 700,
  color: "#000",
  display: "block",
  textAlign: "center",
  margin: "-12px 0 0 0",
  position: "relative",
});

export const SymbolForQtyBox = styled(Typography)({
  margin: "20px 0 0 0px",
  "@media screen and (max-width:900px)": {
    position: "absolute",
    top: "7px",
    left: "15px",
  },
});
export const SymbolForQtyBox1 = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  position: "relative",
});
export const PricesTextFiled = styled(TextField)({
  "@media screen and (max-width:900px)": {
    "& .MuiOutlinedInput-input": {
      padding: "8.5px 14px 8.5px 45px",
    },
  },
});
export const PricesTextFiledSecond = styled(TextField)({
  "@media screen and (max-width:900px)": {
    "& .MuiOutlinedInput-input": {
      padding: "8.5px 14px 8.5px 65px",
    },
  },
});
export const CurrencyCode = styled(Typography)({
  fontSize: "15px",
  fontWeight: 700,
  color: "#000",
  minWidth: "50px",
  display: "block",
  textAlign: "center",
  bottom: "8px",
  position: "relative",
  margin: "20px 10px 0 0px",
});

export const PriceOrderLabel1 = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#000",
  // marginLeft:"55px",
  "& span": {
    color: "#D7282F",
    paddingRight: "5px",
  },
});
export const PriceOrderLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#000",
  // marginLeft:"20px",
  "& span": {
    color: "#D7282F",
    paddingRight: "5px",
  },
});
export const OrderQtiyLabel = styled(Typography)({
  fontSize: "12px",
  color: "#9F9F9F",
  // marginLeft:"20px",
});
export const OrderQtiyLabel1 = styled(Typography)({
  fontSize: "12px",
  color: "#9F9F9F",
  // marginLeft:"56px",
});
export const PriceOrderValueColmn = styled(Typography)({
  padding: "7px 0 0 ",
  "& .error-message-container": {
    position: "absolute",
  },
});
export const OrderQtiyValue = styled(Typography)({
  fontSize: "12px",
  color: "#9F9F9F",
  padding: "7px 0 0",
  "& span": {
    fontWeight: 700,
  },
});
export const AddMoreRangeBtn = styled(Button)({
  background: "#FFFFFF",
  border: "1px solid #DD484E",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "4px",
  textTransform: "none",
  height: "24px",
  color: "#DD484E",
  minWidth: "120px",
  padding: "0px 9px",
  // margin: "-12px 0 0 0",
  "&:hover": {
    border: "1px solid #DD484E",
  },
  "& svg": {
    fontSize: "14px !important",
    color: "#1f981f",
    "&:first-child": {
      color: "#DD484E",
      fontSize: "16px !important",
    },
  },
});
export const AllPriceRange = styled(Typography)({
  "& .MuiTypography-h4": {
    fontSize: "14px",
    color: "#000",
    fontWeight: 600,
    padding: "10px 0 8px 0",
    // marginLeft:"20px"
  },
});
export const PriceRangeColInfo = styled(Box)({
  border: "1px solid #dadada",
  padding: "3px 25px",
  margin: "0 6px 0 0",
  borderRadius: "5px",
  textAlign: "center",
  "& .MuiTypography-h5": {
    fontSize: "17px",
    color: "#D82E34",
    fontWeight: 700,
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
    color: "#4A4A4A",
  },
});
export const CSmallHeading = styled(Typography)({
  fontSize: "15px",
  color: "#000",
  fontWeight: 600,
});
export const CommercialCases = styled(Box)({});
export const OtherComponentBox = styled(Box)({
  padding: "1.5rem 0 1rem",
});
/**** End Pricing Selected styling Box ****/

export const ShowHideWithIcon = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& svg": {
    fontSize: "13px",
    margin: "0 3px 0 1px",
  },
});
/****===== End Commercial Information Tabs styling Box =====****/

/****=====  * Place of origin=====****/
export const Buttonspacing = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "@media screen and (max-width:1600px)": {
    gap: "6px",
  },
  "& button": {
    "@media screen and (max-width:1600px)": {
      minWidth: "30px",
      height: "30px",
      margin: "3px 0 0",
    },
  },
});
export const AddButton = styled(Button)({
  background: "#fff",
  color: "#d7282f",
  padding: "6px",
  transition: "all ease .3s",
  height: "37.13px",
  "&:hover": {
    color: "#fff",
    background: "#d7282f",
    border: "1px solid #d7282f",
    transition: "all ease .3s",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "19px !important",
    "@media screen and (min-width:1200px)": {
      fontSize: "16px",
    },
  },
});
export const DeleteButton = styled(Button)({
  background: "#d7282f",
  color: "#fff",
  padding: "6px",
  border: "1px solid #d7282f",
  transition: "all ease .3s",
  height: "37.13px",
  "&:hover": {
    color: "#fff",
    background: "#a71016",
    border: "1px solid #a71016",
    transition: "all ease .3s",
  },
  "& svg": {
    color: "#fff !important",
  },
});

export const RegionalBoxSelect = styled(Box)({
  width: "100%",
  "& .Box-Heading": {
    padding: "10px 0",
  },
  "@media screen and (max-width:1024px)": {
    display: "block",
  },
  "& .MuiTypography-h3": {
    "@media screen and (max-width:1500px)": {
      fontSize: "13px",
    },
  },
});
export const BoxHeadingTyp = styled(Box)({
  textAlign: "right",
  marginRight: "14px",

  "@media screen and (max-width:1600px)": {
    "& .MuiTypography-h3": {
      fontSize: "13px",
    },
  },
  "@media screen and (max-width:1535px)": {
    textAlign: "left",
    "& .MuiTypography-h3": {
      margin: "0 0 3px",
    },
  },
});
export const QuantityBaseShowHideBtn = styled(Box)({
  textAlign: "right",
});

export const StyledRadio = styled(Radio)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
    color: "#a6a6a6",
  },
  "&.Mui-checked": {
    "& .MuiSvgIcon-root": {
      color: "#d7282f",
    },
  },
}));
export const ToggleButtonBox = styled(Box)({
  "@media screen and (max-width:1300px)": {
    maxWidth: "100%",
    overflowX: "scroll",
    whiteSpace: "nowrap",
    height: "56px",
    display: "flex",
    alignItems: "end",
  },
});
export const EmptyDivSpace = styled(Box)({
  margin: "16px 0 30px",
  "@media screen and (max-width:1300px)": {
    margin: "-20px 0 30px",
  },
  "& .MuiTypography-h6": {
    fontSize: "18px",
    fontWeight: "600",
    color: "#000000",
  },
});

export const WheatherShowBox = styled(Box)({
  margin: "8px 0 0 0 ",
  display: "flex",
  "@media screen and (max-width:767px)": {
    flexDirection: "column",
    "& .MuiRadio-root": {
      paddingLeft: 0,
    },
  },
});
