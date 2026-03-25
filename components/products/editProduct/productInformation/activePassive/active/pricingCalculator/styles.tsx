import { Padding } from "@mui/icons-material";
import { Box, Button, styled, TableCell, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
export const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "54px",
  borderBottom: "1px solid #D2D2D2",
  paddingLeft: "48px",
  // paddingRight: "22px",
  position:'relative'
});

export const HeaderText = styled("p")({
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "22px",
  color: "#000000",
  marginLeft: "-24px",
});

export const CloseIcon = styled("span")({
  display: "inline-block",
});

export const OuterContainer = styled("div")({
  display: "flex",
  flex: 1,
  height: "calc(100% - 6vh)",
  padding: "0 22px",
  "& .SpecTable": {
    "&.GroupActive": {
      flexBasis: "100%",
      maxWidth: "100%",
      transition: "none",
    },
  },
  "& .RightSection": {
    transition: "all ease .5s",
    position: "absolute",
    left: "41%",
    // paddingRight: "24px",
    zIndex: "4",
    width: "100%",
    "@media (max-width: 1199px)": {
      position: "inherit",
    },
    "@media (max-width: 992px)": {
      paddingRight: "0px",
    },
  },
  "& .active": {
    overflow: "hidden",
    position: "relative",
    "& .RightSection": {
      transform: "translate3d(101%,0,0);",
      "& .arrowPosition": {
        position: "relative",
        left: "-30px",
        transform: "rotate(-180deg)",
      },
    },
    "& .SpecTable": {
      flexBasis: "100%",
      maxWidth: "100%",
      backgroundColor: "#ffffff",
    },
  },
});

export const LeftContainer = styled("div")({
  flex: 0.7,
  "& .MuiTabPanel-root": {
    "@media (max-width: 1200px)": {
      padding: "10px 0",
    },
  },
});

export const RightContainer = styled("div")({
  flex: 0.3,
  padding: "22px 0 0 0px",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  "@media (max-width:1024px)": {
    padding: "16px 0",
    border: "0",
  },
});

export const EditEquation = styled(Box)({
  gap: "0",
  "& .MuiTextField-root": {
    "& .MuiInputBase-root": {
      "& .MuiInputBase-input": {
        height: "14px",
        padding: "6px 8px",
        fontSize: "13px",
      },
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
    marginLeft: "3px",
    color: "#D7282F",
    cursor: "pointer",
  },
});

export const CalculatorOuterContianer = styled("div")({
  // minHeight: "260px",
  height: "fit-content",
  width: "100%",
  borderRadius: "6px",
  padding: "16px",
  border: "1px solid #d2d2d2",
  marginBottom: "16px",
  position: "relative",
});

export const CalculatorHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  margin: "14px 0 0",
  fontWeight: 600,
  fontSize: "20px",
  paddingBottom: "6px",
  lineHeight: "27px",
  "@media (max-width:900px)": {
    fontSize: "16px",
  },
  "@media (max-width:600px)": {
    marginTop: "0px",
  },
  color: "#000000",
  position: "relative",
  "& .resetAll": {
    cursor: "pointer",
    "&:hover": {
      color: "#D7282F",
    },
  },
});

export const CalculatorContent = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const EquationHeader = styled("div")({
  fontWeight: 600,
  fontSize: "13px",
  lineHeight: "18px",
  color: "#000000",
  display: "flex",
  alignItems: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
    marginLeft: "4px",
  },
});

export const AddEquationContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  fontSize: "12px",
  lineHeight: "16px",
  color: "#D7282F",
  paddingRight: "10px",
  paddingTop: "5px",
  paddingBottom: "5px",
  cursor: "pointer",
});
export const EquationSave = styled(Button)({
  backgroundColor: "#d7282f",
  color: "#fff",
  fontSize: "14px",
  padding: "4px 12px",
  // margin: "6px 0 0 0",
  height: "32.5px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#d7282f",
  },
});

export const CustomEquationContainer = styled("div")({
  paddingTop: "6px",
  paddingBottom: "6px",
  paddingLeft: "6px",
  borderRadius: "4px",
  border: "1px solid #C4C4C4",
  minHeight: "37.83px",
  width: "calc(100% - 0px)",
  margin: "auto",
  display: "flex",
  flexWrap: "wrap",
  gap: "3px",
  position: "relative",
  paddingRight: "34px",
  "& .MuiSvgIcon-root": {
    position: "absolute",
    right: "8px",
    color: "#D7282F",
    top: "6px",
    cursor: "pointer",
  },
});

export const CustomChipEquation = styled("div")({
  width: "auto",
  height: "23px",
  background: "#D7282F",
  borderRadius: "4px",
  padding: "4px 6px",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "15px",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
});

export const EquationsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const EquationOuterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const EquationContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "12px",
});

export const FinalCalculationContainer = styled("div")({
  padding: "6px 14px 16px",
  gap: "10px",
  // minWidth: "355px",
  width: "100%",
  height: "fit-content",
  border: "1px solid #D2D2D2",
  borderRadius: "6px",
});

export const EquationsContainerFinalCalculation = styled("div")({
  display: "flex",
  gap: "4px",
  flexWrap: "wrap",
  padding: "0px",
});

export const EquationItem: any = styled(Button)(({ borderColor }: any) => ({
  minHeight: "24px",
  border: borderColor ? ` 1px solid ${borderColor}` : `1px solid #4A4A4A`,
  borderRadius: "4px",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "16px",
  color: "#4A4A4A",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "0px",
  padding: "0px 8px",
}));
export const CalculatorTab = styled(Box)({
  padding: "0 24px",
  "& .MuiTabs-scroller": {
    borderBottom: "1px solid #d2d2d2",
  },
  "& .MuiTabs-flexContainer": {
    "& .MuiTab-textColorPrimary": {
      fontWeight: "600",
      color: "#000000",
      "&:hover": {
        backgroundColor: "#F5F5F5",
      },
      "&.Mui-selected": {
        color: "#D7282F",
        backgroundColor: "#F5F5F5",
      },
    },
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#D7282F",
  },
  "@media (max-width:1200px)": {
    padding: "0 0",
  },
});

export const AllGroupsCol = styled(Box)({});

export const GroupHeading = styled(Box)({
  fontSize: "20px",
  color: "#2F2F2F",
  fontWeight: "600",
  marginBottom: "16px",
  "@media (max-width:1200px)": {
    fontSize: "16px",
  },
  "@media (max-width:317px)": {
    //  marginLeft:"-37px",
    fontSize: "18px",
    margin: "0 0 0 9px",
    padding: "0px",
  },
});
export const AccordionBox = styled(Box)({
  "& .MuiPaper-rounded": {
    border: "1px solid #E6E6E6",
    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.15)",
    borderRadius: "6px",
    "& .Mui-expanded": {
      minHeight: "auto",
    },
    "& .MuiAccordionSummary-root": {
      minHeight: "auto",
    },
  },
  "& .MuiAccordionSummary-content": {
    justifyContent: "space-between",
    paddingRight: "16px",
    "&.Mui-expanded": {
      margin: "12px 0",
    },
    "& p": {
      fontWeight: "500",
      whiteSpace: "nowrap",
      letterSpacing: "0",
      fontSize: "13px",
      width: "auto",
    },
  },
});

export const CalculatorTable = styled(Box)({
  marginLeft: "30px",
  height: "100%",
  paddingTop: "0px",
  paddingBottom: "12px",
  marginRight: "14px",
  position: "relative",
  "&:before": {
    content: '" "',
    display: "block",
    backgroundColor: "#D7282F",
    width: "10px",
    height: "10px",
    position: "absolute",
    top: "0",
    borderRadius: "100%",
    left: "-4px",
  },
  "&:after": {
    content: '" "',
    display: "block",
    backgroundColor: "#D7282F",
    width: "1px",
    height: "66px",
    position: "absolute",
    top: "0",
    zIndex: "2",
    left: "0",
  },
});
export const AddparameterCol = styled(Box)({
  "& .MuiButton-textPrimary": {
    textTransform: "inherit",
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
    },
  },
  "& .addParameterBTN": {
    backgroundColor: "#d7282f",
    color: "#fff",
    border: "1px solid #d7282f",
    borderRadius: "5px",
    minWidth: "185.14px",
    height: "38.5px",
    "@media screen and (max-width:600px)": { minWidth: "auto" },
  },
  position: "sticky",
  left: "0",
});

export const AddNewParameters = styled(Button)({
  textTransform: "capitalize",
  borderColor: "#d7282f !important",
  color: "#d7282f",
  "&:hover": {
    background: "#d7282f",
    color: "#fff",
  },
});
export const TableBox = styled(Box)({
  marginTop: "10px",
  position: "relative",
  // overflowX: "auto",
  width: "100%",

  "&::-webkit-scrollbar": {
    width: "4px",
    height: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
});
export const AddparameterValue = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiSvgIcon-root": {
    color: "#D7282F",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginLeft: "2px",
  },
});
export const EditParmeter = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiOutlinedInput-input": {
    height: "0.8em",
    width: "67px",
  },
});

export const useStyles = makeStyles()((theme) => {
  return {
    updateBtn: {
      marginTop: "16px !important",
    },
    specificationHeading: {
      padding: "4px 8px !important",
      position: "relative",
      height: "38px",
    },

    paddingLeft16: {
      paddingLeft: "16px",
      position: "relative",
    },
    headingline: {
      position: "relative",
      "&:after": {
        content: '" "',
        display: "block",
        width: "16px",
        height: "1px",
        backgroundColor: "#D7282F",
        position: "absolute",
        left: "-16px",
        top: "18px",
      },
    },
    groupLine: {
      position: "relative",
      "&:before": {
        content: '" "',
        display: "block",
        backgroundColor: "#D7282F",
        width: "1px",
        height: "100%",
        position: "absolute",
        top: "0",
        zIndex: "2",
        left: "-16px",
        bottom: "0",
      },
    },

    noParameterLink: {
      color: "white",
      "&:after": {
        height: "30px !important",
      },
    },
    multilevelTable: {},
    tableFixed: {
      "& thead": {
        "& th": {
          position: "sticky",
          top: "0",
          whiteSpace: "nowrap",
          // background: "white",
          zIndex: "2",
          "&:first-child": {
            position: "sticky",
            left: "-16px",
            zIndex: "3",
            backgroundColor: "#fcc4c6",
          },
        },
      },
      "& tbody": {
        "& td": {
          whiteSpace: "nowrap",
          background: "#fff",
          "&:first-child": {
            position: "sticky",
            left: "-16px",
            zIndex: "2",
            backgroundColor: "white",
          },
        },
      },
    },
  };
});

export const CalculatorBox = styled(Box)({
  margin: "0 0px 20px",
});

export const EQCross = styled(Box)({
  borderLeft: "1px solid #FF9FA3",
  paddingLeft: "6px",
  marginLeft: "6px",
});

export const EQAction = styled(Box)({
  "& span": {
    paddingLeft: "10px",
    marginLeft: "10px",
    "&:hover": {
      color: "#D7282F",
    },
  },
});

export const CalcHeading = styled(Typography)({
  fontSize: "14px",
  fontWeight: "600",
  margin: "10px 0 12px 0",
});
export const SelectSpecification = styled(Box)({
  // width: '100%'
});

export const EQField = styled(Box)({
  border: "1px solid #d2d2d2",
  borderRadius: "6px",
  padding: "6px 26px 6px 6px",
  minHeight: "37.83px",
  display: "inline-flex",
  flexWrap: "wrap",
  position: "relative",
  gap:'5px',
  "& .MuiTypography-subtitle1": {
    border: "1px solid #dcdcdc",
    borderRadius: "4px",
    fontSize: "12px",
    padding: "2px 4px",
    // marginRight: "5px",
    // marginBottom: "5px",
  },
  "& .MuiTypography-subtitle2": {
    margin: "5px 6px 0 0",
    fontSize: "12px",
  },
});
export const FinalEQField = styled(Box)({
  border: "1px solid #d2d2d2",
  borderRadius: "6px",
  padding: "6px 26px 6px 6px",
  minHeight: "37.83px",
  display: "inline-flex",
  flexWrap: "wrap",
  position: "relative",
  "& .MuiTypography-subtitle1": {
    border: "1px solid #dcdcdc",
    borderRadius: "4px",
    fontSize: "12px",
    padding: "2px 4px",
    marginRight: "5px",
    marginBottom: "5px",
  },
  "& .MuiTypography-subtitle2": {
    margin: "5px 6px 0 0",
    fontSize: "12px",
  },
});
export const CalcyBackspace = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  alignItems: "center",
});
export const CalcyDelEdit = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});
export const CalyDeletedIcon = styled(DeleteOutlineOutlinedIcon)({
  fontSize: "20px",
  color: "#d7282f",
  margin: "4px 0 0 0",
  cursor: "pointer",
});
export const CalyBackSpaceIcon = styled(BackspaceOutlinedIcon)({
  position: "absolute",
  right: "8px",
  color: "#27282f",
  fontSize: "20px",
  top: "10px",
  cursor: "pointer",
});
export const ExpandCollapseArrow = styled(Box)({
  backgroundColor: "#D7282F",
  borderRadius: "3px",
  padding: "4px",
  height: "25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  cursor: "pointer",
  marginRight: "6px",
  transition: "all ease .3s",
  // "&:hover": {
  //   backgroundColor: "#ff3941",
  // },
  "@media (max-width: 1199px)": {
    display: "none",
  },
  "& .MuiSvgIcon-root": {
    color: "#ffffff",
    fontSize: "16px",
    position: "relative",
    left: "1px",
  },
});
export const CalculateText = styled(Typography)({
  color: "#231F20",
  fontSize: "12px",
  fontWeight: "600",
  textAlign: "center",
  padding: "5px 0 0",
  "@media (max-width: 1199px)": {
    textAlign: "left",
  },
  "& span": {
    fontWeight: "700",
  },
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&:first-of-type": {
    textAlign: "left",
    left: "-33px !important",
    position: "relative !important",
  },
}));
