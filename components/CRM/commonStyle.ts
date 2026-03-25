import {
  Box,
  Button,
  FormControl,
  InputBase,
  Stack,
  styled,
  Grid,
  Snackbar

} from "@mui/material";
import Menu from "@mui/material/Menu";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
export const CrmFullData = styled(Box)({
  height: "calc(100vh - 10vh)",
  background: "#fff",
  borderRadius: "6px",
  "@media screen and (max-width:1280px)": {
    background: "transparent"
  },
  ".MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      // width: "1rem",
      // height: "1rem",
      width: "14px",
      height: "14px",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
      padding: 0,
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "1px solid #D7282F",
      borderRight: "1px solid #D7282F",
      position: "absolute",
      top: "7px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
    "&.MuiCheckbox-root": {
      padding: "5px 10px",
    },
  },
  "& .datetimecommon": {
    "& .MuiFormControl-root": {
      minWidth: "100% !important"
    },
    "& .MuiStack-root": {
      overflow: "hidden",
      paddingTop: 0
    },
  },
  "&::-webkit-scrollbar": {
    width: "0.4em",
    backgroundColor: "#f5f5f5",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#dedede",
    borderRadius: "4px",
  },
});
export const CrmWhiteContainer = styled(Box)({
  background: "#fff",
  borderRadius: "6px",
  padding: "1rem"
});
export const CrmInnerContent = styled(Box)({
  margin: "5.5rem 0 0",
  background: "#fff",
  borderRadius: "6px",
  // height:"calc(95vh - 5vh)",
  // height:"90vh",
  "& .tabnospace": {
    paddingTop: "0 !important",
  },
  "@media screen and (max-width:1280px)": {
    margin: "1rem 0 0",
  },
});

/***************************************** CRM Buttons Variation  *************************************************/
export const CommonBigBlackOutineBtn = styled(Button)({
  minWidth: "100px",
  borderRadius: "6px",
  background: "#fff",
  border: "1px solid #231F20",
  color: "#231F20",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 6px",
  textTransform: "capitalize",
  height: "36px",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    background: "#231F20",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "@media screen and (max-width: 900px)": {
    minWidth: "70px",
    padding: "0 3px",
    height: "30px",
  },
});
export const CommonBigRedOutineBtn = styled(Button)({
  minWidth: "100px",
  borderRadius: "6px",
  background: "#fff",
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 6px",
  textTransform: "capitalize",
  height: "36px",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    background: "#D7282F",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "@media screen and (max-width: 900px)": {
    minWidth: "70px",
    padding: "0 3px",
    height: "30px",
  },
});

export const SmallFilledBtn = styled(Button)({
  // minWidth: "80px",
  // minWidth: "120px",
  borderRadius: "3px",
  background: "#D7282F",
  opacity: "85%",
  border: "1px solid #D7282F",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 12px",
  textTransform: "capitalize",
  height: "30px",
  "&:svg": { fontSize: "27px" },
  "&:hover": {
    background: "#D7282F",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
});

export const OutLinedButton = styled(Button)({
  borderRadius: "3px",
  border: "1px solid #BFBFBF",
  color: "#4A4A4A",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 12px",
  minWidth: "auto",
  textTransform: "capitalize",
  height: "30px",
  "& svg, i": { fontSize: "16px !important" },
  "&:hover": {
    background: "#D7282F",
    color: "#fff",
    border: "1px solid #D7282F",
    opacity: "85%",
  },
  "&:hover i::before": {
    color: "#fff",
  },
});
/** Red Filled Button **/
export const BtnFilledLeads: any = styled(Button)({
  fontFamily: "open sans",
  background: "#D7282F",
  // opacity: "85%",
  height: "30px",
  border: "1px solid #D7282F",
  textTransform: "none",
  minWidth: "90px",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "24px",
  width: "auto",
  letterSpacing: "0.09px",
  color: "white",
  "&:hover": {
    background: "#fff",
    color: "#D7282F",
  },
  "@media screen and (max-width: 1600px)": {
    margin: "15px 0 0",
  },
  "@media screen and (max-width: 767px)": {
    fontSize: "12px",
  },
});
/** Red Filled Button **/


/**** Used in Activity page ****/
export const OutlineBigButton = styled(Button)({
  borderRadius: "6px",
  background: "#fff",
  border: "1px solid #D2D2D2",
  color: "#231F20",
  fontSize: "14px",
  fontWeight: 400,
  padding: "0 12px",
  minWidth: "auto",
  textTransform: "capitalize",
  height: "32px",
  boxShadow: "none !important",
  "&:svg": { fontSize: "27px" },
  "&:hover": {
    background: "#FFECEC",
    color: "#D7282F",
    border: "1px solid #D7282F",
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "@media screen and (max-width: 1600px)": {
    fontSize: "12px",
    height: "32px",
  },
  "@media screen and (max-width: 767px)": {
    padding: "0 6px",
  },
});
/**** Used in Activity page ****/

/** Red Small Button **/
export const RedBgBtn = styled(Button)({
  borderRadius: "6px",
  background: "#FFECEC",
  border: "1px solid #D7282F",
  color: "#d7282f",
  fontSize: "15px",
  fontWeight: 400,
  padding: "0 12px",
  minWidth: "auto",
  textTransform: "capitalize",
  height: "40px",
  boxShadow: "none !important",
  "&:svg": { fontSize: "27px" },
  "&:hover": {
    background: "#FFECEC",
    color: "#D7282F",
    border: "1px solid #D7282F",
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "@media screen and (max-width: 1600px)": {
    fontSize: "12px",
    height: "32px",
  },
  "@media screen and (max-width: 767px)": {
    fontSize: "12px",
    height: "28px",
    padding: "0 6px",
  },
});


export const SmallOutineBtn = styled(Button)({
  minWidth: "65px",
  borderRadius: "3px",
  // background: "#fff",
  background: "transparent",
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 9px",
  textTransform: "capitalize",
  height: "25px",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    background: "#D7282F",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
});
export const SmallRedOutineBtn = styled(Button)({
  minWidth: "65px",
  borderRadius: "3px",
  // background: "#fff",
  background: "transparent",
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 9px",
  textTransform: "capitalize",
  height: "25px",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    background: "#D7282F",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
});
export const SmallBlackOutineBtn = styled(Button)({
  minWidth: "65px",
  borderRadius: "3px",
  // background: "#fff",
  background: "transparent",
  border: "1px solid #231F20",
  color: "#231F20",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 9px",
  textTransform: "capitalize",
  height: "25px",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    background: "#231F20",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
});


/****Common searchbar css ****/
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: "5px 10px",
    fontSize: "14px",
    //transition: theme.transitions.create("width"),
    width: "100%",
  },
}));
export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "100%",
  padding: "0",
  borderRadius: "4px",
  margin: "6px 0px 2px",
  "& .MuiInputBase-input": {
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  "& button": {
    padding: "0"
  }
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  top: 5,
  "& .MuiSvgIcon-root": { fontSize: "18px", margin: "-9px 0 0" },
}));
/****Common searchbar css ****/


/** Common datagrid style **/
export const DataGridStyle = {
  "& svg": {
    fontSize: "18px"
  },
  "& .MuiDataGrid-virtualScroller": {
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "3px",
      height: "6px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },
  },
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  // "&.MuiDataGrid-root": {
  //   height: "90%",
  // },
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
    padding: "5px"
  },
  "& .MuiDataGrid-columnHeaders": {
    background: "#f8f8f8"
  }
};
/***** Icon datagrid  ******/
export const DataGridStyleIcon = {
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
    color: "#D7282F",
    fontSize: 16,
  },
  "& .MuiDataGrid-columnSeparator": { display: "none" },
  ".MuiCheckbox-root": {
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      top: "11px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
  },
};
/******* Arrow Menu item ********/
export const CrmStyledMenu = {
  "& .MuiButtonBase-root": {
    fontSize: "13px",
    color: "#000"
  },
  "& .MuiPaper-root": {
    margin: 0,
    boxShadow: "none",
    // filter: "none",
    // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
  },
  "& .MuiDivider-root": {
    margin: 0
  }
};

/****** Start Common style for Select and Textfield ******/
export const CommonFormcontrol = styled(FormControl)({
  color: "#D7282F",
  fontSize: "12px",
  margin: "3px 0",
  "&. MuiFilledInput-root": { fontSize: "20px" },
  "& svg": { width: 17 },
  "& .MuiButtonBase-root": { fontSize: "10px" },
  "& .MuiFormLabel-root": { fontSize: "13px", color: "#1C1C1C" },
  "& .MuiFormLabel-asterisk": { color: "red" },
  // '& .MuiInputBase-input': { padding: "9px 14px" },
  // '& textarea': { padding: "0 !important" },
  "& .MuiPaper-root": {
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },
  },
});

/****** End Common style for Select and Textfield ******/

/****** Start Common Search Bar for CRM Module ******/
export const SearchCommon = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "100%",
  padding: "0",
  borderRadius: "4px",
  margin: "6px 0px 2px",
  "& .MuiInputBase-input": {
    paddingTop: "6px",
    paddingBottom: "6px",
    transition: "all 2s ease-in",
  },
  "& button": {
    padding: "0",
    margin: "3px 0px 3px -5px"
  },
  "& svg": {
    color: "#515151",
    fontSize: "19px",
  },
}));
/****** End Common Search Bar for CRM Module ******/

/****** Start Common style for Add or Remove icon ******/
export const ActionIcons = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  minHeight: "34px",
  "& svg": { fontSize: "16px" },
  "& button": {
    borderRadius: "50%",
    minWidth: "auto",
    padding: "1px",
  },
  "@media screen and (max-width:899px)": {
    position: "absolute",
    right: "0",
    top: "0",
    transform: "translate(16px, -78px)",
    background: "#f1f1f1",
    padding: "7px",
    borderRadius: "4px",
  }
});
export const IconButtonRemove = styled(Button)({
  border: "1px solid #D7282F",
  "& svg": { color: "#D7282F" },
});
export const IconButtonAdd = styled(Button)({
  border: "1px solid #34a400",
  "& svg": { color: "#34a400" },
});
/****** End Common style for Add or Remove icon ******/

/****** Start Common style for Dialog ******/
export const TitleDialog = styled(DialogTitle)(({ theme }) => ({
  '& .MuiDialogContentText-root': {
    color: "#000",
    fontWeight: 600
  },
  "& .icon-leadsblack": { margin: "3px 7px 0 0px" },
  "& .icon-leadsblack:before": { color: "#D7282F" }
}));
export const StyledBootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "700px",
    borderRadius: "10px 10px 0 0 !important",
    maxWidth: "600px",
    "@media screen and (max-width:767px)": {
      margin: "15px"
    },
  },
  "& .MuiDialogTitle-root": {
    color: "#d7282f",
    fontWeight: 600,
    "& .MuiIconButton-root": {
      top: "3px"
    }
  },
  '& .MuiDialogContent-root': {
    padding: "30px 16px",
    fontSize: "14px",
    "@media screen and (max-width:1024px)": {
      fontSize: "14px",
      padding: "8px !important",
    },
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },

  },
  "& .MuiDialogActions-root": {
    padding: "10px 15px",
    // background: "#FFF7F7",
    background: "#fff",
    justifyContent: "right",
  },
  " & .MuiDialogTitle-root": {
    // background: "#FFE5E7",
    background: "#fff",
    fontSize: "16px",
    padding: "9px 16px",
    '& .MuiButtonBase-root': {
      "& svg": {
        color: "#000",
        fontSize: "18px",
      }
    },
    "@media screen and (max-width:1024px)": {
      // fontSize: "13px",
      padding: "10px",
    },
  },
  // "& .MuiCheckbox-root": { padding: "0 5px 0 7px" },
  "& .MuiRadio-root": {
    padding: "0 5px",
    "& .MuiTypography-root": { fontSize: "14px" }
  },
  "& .MuiSvgIcon-root": { fontSize: "18px" },
  "& .Mui-checked": { color: "#d7282f !important" },
  "& .MuiCheckbox-root svg": { display: "none", },
  "& .MuiFormControlLabel-label": { fontSize: "14px" },
  ".MuiCheckbox-root": {
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #E0E3E7",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      // top: "2px",
      top: "11px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
  }
}));
/****** End Common style for Dialog ******/

export const FilterActionButton = styled(Button)({
  borderRadius: "3px",
  background: "#fff",
  color: "#D7282F",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 12px",
  minWidth: "auto",
  textTransform: "capitalize",
  height: "23px",
  opacity: "85%",
  border: "1px solid #D7282F",
  "& svg, i": { fontSize: "16px !important" },
  "&:hover": {
    background: "#FFD7D7",
    color: "#D7282F",
    border: "1px solid #FFD7D7",
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "& .MuiButton-startIcon": {
    marginRight: "3px",
  },
});

export const CommonCheckboxStyling = styled(Box)({
  padding: "6px 0 14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiFormLabel-root": {
    color: "#000",
    fontSize: "14px"
  }
});

/******* Common Checkbox Style (If checkbox Out from main div) ********/
export const SDCheckboxStyle = {
  width: "250px",
  ".MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      // width: "1rem",
      // height: "1rem",
      width: "14px",
      height: "14px",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
      padding: 0,
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "1px solid #D7282F",
      borderRight: "1px solid #D7282F",
      position: "absolute",
      top: "7px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
    "&.MuiCheckbox-root": {
      padding: "5px 10px",
    },
  },
};
/******* End Common Checkbox Style (If checkbox Out from main div) ********/
/******************** Start Stying for Common Menu for all modules ********************/

export const CrmOuterMenu = styled(Box)({
  borderBottom: "1px solid #D2D2D2",
  margin: "0 0 0 10px",
  position: "relative"
});
export const LeadMenuCommon = styled(Box)({
  // borderBottom: "1px solid #D2D2D2",
  // minWidth: 700,
  // margin: "0 10px",
  width: "calc(100% - 20px)",
  overflow: "hidden",
  "& .MuiListItemIcon-root": {
    minWidth: "22px",
    "& i:before": {
      fontSize: "15px",
      color: '#d7282f'
    }
  },
  "& .MuiTypography-root": {
    fontSize: "14px"
  },
  "& .MuiListItem-root": {
    width: "auto"
  },
  "& .MuiListItemButton-root": {
    padding: "8px 10px",
    "&:hover": {
      background: "transparent",
      color: "#d7282f",
    },
    "&:hover .MuiTypography-root": {
      // fontWeight: "600",
    },


  },
  "& .icon-contact": {
    margin: "-3px -3px 0",
    "&:before": {
      fontSize: "11px !important"
    }
  },
  "& .MuiDialogContent-root": {
    "@media screen and (max-width:1024px)": {
      fontSize: "14px",
    },
  },
  "@media screen and (max-width: 899px)": {
    overflow: "hidden",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      width: "1px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "red",
      borderRadius: "8px",
    },
  },

  "& .MuiButtonBase-root-MuiListItemButton-root:hover": {
    background: "red"
  }
});
export const MenuIconHelp = styled('span')({
  marginLeft: "17px",
  "& svg": {
    fontSize: "20px",
    marginTop: "1px",
    float: "right"
  }
});
export const CommonMenuInner = styled('div')({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  "@media screen and (max-width:1024px)": {
    width: "1000px",
  },
  "& .MuiListItemText-root": {
    borderRight: "1px solid #D2D2D2",
  },
  "& .activemenu:before": {
    content: "''",
    borderBottom: "6px solid #CC0000",
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    margin: "49px 0 19px",
    bottom: "-20px",
    position: "absolute",
    left: "42%",
    color: "#d7282f",
  },
  "& .activemenu": {
    color: "#d7282f",
  },
  "& .icon-main-meeting:before": {
    fontSize: "18px !important"
  },
  "& .icon-main-task:before": {
    fontSize: "19px !important"
  }

});
/******************** End Stying for Common Menu for all modules ********************/

/******************** Start style for Main Top Searchbar ********************/
export const CrmMainHeadingFullArea = styled('div')({
  display: "flex",
  justifyContent: "space-between",
  margin: "10px 0 0",
  minHeight: 10,
  position: "fixed",
  top: 0,
  // width:"100%",
  zIndex: 100,
  marginRight: "356px",
  width: "calc(100% - 370px)",

  "@media screen and (max-width:1280px)": {
    position: "relative",
    margin: "5rem 0 0",
    width: "100%",
    zIndex: 9,
  },

  "@media screen and (max-width:767px)": {
    margin: "4.3rem 0 0",
  },
  "& .crm_main_heading": {
    marginTop: "0",
    fontSize: "24px",
    "@media screen and (max-width:1400px)": {
      fontSize: "20px",
      lineHeight: "42px"
    },
    "@media screen and (max-width:767px)": {
      fontSize: "16px",
    },
  },
  "& .Crmtophead": {
    "@media screen and (max-width:899px)": {
      maxWidth: "50%",
      display: "flex"
    },
    "@media screen and (max-width:767px)": {
      paddingTop: 0,
      maxWidth: "100%",
      display: "block"
    },
  },
});
export const CommonTopSearch = styled('div')({
  display: "flex",
  gap: 6,
  width: "400px",
  margin: "0 auto",
  "@media screen and (max-width:767px)": {
    width: "70%", margin: "0 auto"
  },
  "@media screen and (max-width:600px)": {
    width: "100%"
  },

  "& .MuiInputBase-root": {
    background: "#fff",
    borderRadius: "50px",
    paddingRight: "0 !important",
    padding: "3px !Important"
  },
  "& svg": {
    width: "auto !important"
  },
  "& .Addcommonbutton": {
    background: "#fff",
    width: "36px",
    height: "36px",
    border: "1px solid #d2d2d2",
    "& svg": {
      color: "#000",
      position: "absolute",
      transition: "transform .25s, opacity .25s",
    },

    "& svg:hover": {
      transform: "rotate(270deg)",
    },
    "&:hover": {
      border: "1px solid #000",
    }
  }
});
export const FixedCreateButton = styled('div')({
  display: "flow",
  textAlign: "right",
  "& button": {
    background: "#fff",
    margin: "10px 0 0"
  },
  "& button i": {
    fontSize: "16px !important"
  },
  "& button i:before": {
    color: "#d7282f"
  },
  "& button:hover i:before": {
    color: "#d7282f"
  },
});
export const QuickAddBoxInn = styled(Box)({
  display: 'flex', alignItems: 'center', textAlign: 'center'
});
export const QuickAddBox = styled(Box)({
});
export const QuickAddMenu = styled(Menu)({
  "& i:before": {
    // color: "grey",
    // filter: "grayscale(100%)",
    color: "#d7282f",
    fontSize: "14px",
  },
  "& .icon-contact:before": {
    fontSize: "10px",
  },
  "& img, svg": {
    // filter: "grayscale(100%)",
    fontSize: "18px",
    color: "#d7282f"
  },
  "& .MuiMenuItem-root:hover": {
    color: "#d7282f"
  }
});

/******************** End style for Main Top Searchbar ********************/

export const AutocompleteSoacingCommon = styled(Box)({
  "& .MuiAutocomplete-root .MuiOutlinedInput-root": {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
    padding: "0 !important"
  }
});
export const MoreTabsButton = styled(Button)({
  minWidth: "auto",
  background: "transparent",
  color: "#4a4a4a",
  boxShadow: "none !important",
  padding: "5px",
  borderRadius: 50,
  "&:hover": {
    background: "#f3f3f3",
  },
  "& svg": {
    fontSize: "18px",
  },
});
export const MoreTabsPopoverStyle = styled(Menu)({
  "& .MuiPaper-root": {
    width: "250px",
    boxShadow: "none",
    border: "1px solid #EBEBEB",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "28px !important",
  },
  "& .MuiButtonBase-root i:before": {
    color: "#d7282f",
    fontSize: "14px",
  },
  "& .icon-contact:before": {
    fontSize: "10px !important",
  },
  "& .MuiButtonBase-root svg": {
    fontSize: "18px",
    color: "#d7282f"
  },
  "& .MuiMenuItem-root:hover": {
    color: "#d7282f"
  }
});

export const HelpIconPopover = styled("div")({
  marginLeft: "17px",
});
export const HelpSvg = styled(HelpOutlineIcon)({
  fontSize: "18px !important",
  zIndex: 1,
  margin: "0 0 0 -11px",
  padding: "0 7px 0 0px",
  color: "#4a4a4a !important"
});
export const PopoverSerach = styled("div")({
  padding: "0 10px",
});



/***********=============== Common Form Section ==============**************/
export const GridItemRow = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "right",
  "& span": {
    textAlign: "right",
    fontSize: 13
  },

  "& .MuiTypography-root": {
    borderRight: "1px solid #cdc9c9",
    padding: "0 7px 0 0px",
  }
});
export const ConverterFormCommon = styled(Box)({
  padding: "1rem 3rem 0 0px",
  "& .converterMantoryfield": {
    "& fieldset": {
      borderLeft: "2px solid #d7282f"
    }
  }
});


/*****=========== CRM Social Links Styling =============******/
export const AddSocialAccountBox = styled(Box)({
  border: "1px solid #ddd",
  borderRadius: "4px",
  padding: 10
});
export const CrmSocialLinks = styled(Box)({
  margin: "10px 0 0",
  "& .addmoretext": {
    color: "#d7282f"
  }
});
export const CrmSocialAddLinks = styled(Box)({
  margin: "1rem 0 1rem",
  "& .icon-instagram1": {
    color: "#ff00b8"
  }
});
export const SIconContainer = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: 5,
  padding: "0px 0 10px"
});
export const SIconBox = styled("div")({
  width: "20px"
});
export const SIconValue = styled("div")({
  '& .MuiTypography-root': {
    fontSize: "13px",
    color: "#231F20",
    wordBreak: "break-word",
  },
  "& .boldtextname": {
    fontWeight: 700
  }
});
export const SIconRight = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  "svg": {
    fontSize: 18,
    color: "#d7282f"
  },
  "button": {
    padding: 5
  }
});
export const AddLinksRow = styled(Box)({
  "& .hoverlinkj": {
    display: "none",
    transition: "0.1s ease-out",
  },
  "&:hover .hoverlinkj": {
    display: "flex"
  }
});

/*****=============== Common Form Section ==============*****/

export const ReminderPopSnackbar = styled(Snackbar)({
  "& .MuiSnackbarContent-root": {
    background: "#fff",
    padding: 0,
    width: "370px",
    position: "fixed",
    right: 0,
    bottom: 5,
    "& .MuiSnackbarContent-message": {
      padding: 0,
      width: "100%",
    }
  }
});
export const ReminderPopupConatiner = styled(Box)({});
export const ReminderHeader = styled(Box)({
  padding: 8,
  background: "#d7282f",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 8,
  "& .MuiTypography-root": {
    fontSize: "15px",
    fontWeight: 600
  },
  "& button svg": {
    margin: "-15px 0 0"
  }
});
export const ReminderHeading = styled(Box)({
  display: "flex",
  gap: 8,
  width: "100%",
  alignItems: "center"
});

export const ReminderContent = styled(Box)({
  "& .mui-1r87cm-MuiDivider-root::before": {
    borderTop: "thin dashed rgba(0, 0, 0, 0.12)",
  },
  "& .mui-1r87cm-MuiDivider-root::after": {
    borderTop: "thin dashed rgba(0, 0, 0, 0.12)",
  },
  "& .MuiDivider-root": {
    padding: "5px",
    "& .MuiTypography-root": {
      fontSize: "12px",
      color: "#000",
      fontWeight: 600
    }
  },
  "& .showcontent": {
    // display: "none",
    minHeight: 0,
    maxHeight: 0,
    opacity: 0,
    transition: "all .3s ease-in-out",

  },
  "& .active": {
    "& .showcontent": {
      minHeight: "40px",
      opacity: 1,
      overflow: "hidden"
    }
  }
});
export const ReminderListText = styled(Box)({
  padding: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: 'all ease .1s',
  cursor: "pointer",
  "&:hover": {
    background: "#f5f5f5",
    "& .dismissbtn": {
      display: "block"
    }
  },
  "& .MuiTypography-root": {
    color: "#848484",
    fontSize: "12px"
  },
  "& .dismissbtn": {
    display: "none"
  }
});

export const CheckTextInner = styled(Box)({
  display: "flex",
  gap: "5px",
  "& .reminderheading": {
    color: "#231F20 !important",
    fontWeight: 600,
    fontSize: "13px !important",
    padding: "0 0 2px"
  },
  "& .MuiCheckbox-root": {
    padding: "4px 6px 4px 0 !important",
  }
});
export const DismissBtn = styled(Box)({
  "& button": {
    padding: "0 4px",
    background: "#FFECEC",
    border: "1px solid #d7282f",
    borderRadius: 4,
    color: "#d7282f",
    boxShadow: "none",
    textTransform: "capitalize",
    fontSize: "12px",
    "&:hover": {
      background: "#d7282f",
      color: "#fff"
    }
  }
});
export const ReminderContainer = styled(Box)({
  "& .fabreminder": {
    position: "fixed",
    right: 10,
    bottom: 10
  },
  "& .MuiFab-root": {
    background: "#d7282f",
    "&:hover": { background: "#d7282f", opacity: ".87" }
  },
  "& .remindercount": {
    position: "absolute",
    right: -9,
    top: -6,
    background: "#fff",
    padding: "2px",
    borderRadius: "50px",
    width: "20px",
    height: "20px",
    color: "#d7282f",
    fontSize: 12,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    fontWeight: 600,
  }
});
export const PinkSmallBtn = styled(Button)({
  padding: "2px 4px",
  // background: "#FFECEC",
  border: "none !important",
  borderRadius: 4,
  color: "#d7282f",
  boxShadow: "none",
  textTransform: "none",
  fontSize: "14px",
  "&:hover": {
    textDecoration: "underline",
    background: "#FFECEC",
  }
});

export const ReminderInnerScroll = styled(Box)({
  maxheight: "300px",
  overflowY: "auto"
});
export const NoReminderFound = styled(Box)({
  textAlign: "center",
  padding: "14px",
  "& .MuiTypography-root": {
    color: "#000",
    fontSize: "14px",
    fontWeight: 600,
  },
});
export const CommonCreateButton = styled(Box)({
  position: "absolute",
  right: "10px",
  top: "7px",
  "@media screen and (max-width:1020px)": {
    display: "none"
  }
});

export const CommonCustomScrollbar = {
  "&::-webkit-scrollbar": {
    width: "0.4em",
    backgroundColor: "#f5f5f5",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#dedede",
    borderRadius: "4px",
  },

};
/*/////////////////////////*nafish Skeleton /*//////////////
export const SkeletonBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  paddingLeft: "12px",
  gap: "7px",
});
export const SkeletonBox1 = styled(Box)({
  display: "flex",
 
  paddingLeft: "12px",
  gap: "10px",
  bottom: "10px",
  borderTop: '1px solid #E0E3E7',
  padding: "10px 20px 10px",
  background: "#fff",
  boxShadow: "0 -2px 4px -1px rgba(0,0,0,.15)",
  marginTop: "40%",
  
  justifyContent: "right",
});
export const SideBox = styled(Box)({
  border: "1px solid #E0E3E7",
  height: "100%",
  borderRadius: "4px",
  overflow: "hidden",
  top: "7px",
  "@media screen and (max-width:899px)": {
    display: "none"
  },
  paddingTop: "12px"
});
export const MainBox = styled(Box)({
  border: "1px solid #E0E3E7",
  height: "100%",
  borderRadius: "4px",
  overflow: "hidden",

  paddingTop: "12px"
});
export const SecondSkeletonBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  paddingLeft: "20px",
  gap: "30px",
  paddingBottom:"5px"
});
export const CreatedLeades = styled(Box)({
  "@media screen and (max-width:1022px)": {
    display: "none"
  },
});
export const Allleads = styled(Box)({
  display:"flex", justifyContent:"space-between",
  paddingBottom:"10px",
  paddingTop:"15px"
 
});










