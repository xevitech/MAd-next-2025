import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Link,
  List,
  ListItem,
  Popover,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import FormControl from "@mui/material/FormControl";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { styled } from "@mui/system";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Drawer from "@mui/material/Drawer";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
export const MylistItem = styled(ListItem)(() => ({
  display: "block",
  "& .MuiButtonBase-root-MuiListItemButton-root": {
    padding: "0 12px",
  },
  "& .MuiListItemButton-root": { padding: 0 },
  "& .MuiFormControlLabel-root": {
    marginRight: "0",
  },
  "&.MuiButtonBase-root:hover": {
    background: "transparent",
  },
}));

export const StyledTextarea = styled(TextareaAutosize)({
  resize: "none",
  border: "none", // remove the native textarea border
  minWidth: 0, // remove the native textarea width
  outline: 0, // remove the native textarea outline
  padding: 0, // remove the native textarea padding
  // paddingBlockStart: "1em",
  paddingInlineEnd: `var(--Textarea-paddingInline)`,
  flex: "auto",
  alignSelf: "stretch",
  color: "inherit",
  backgroundColor: "transparent",
  fontSize: "13px",
  fontStyle: "inherit",
  fontWeight: "inherit",
  lineHeight: "inherit",
  fontFamily: "Open Sans !important",
  height: "32px !important",
  "&::placeholder": {
    opacity: 0,
    transition: "0.1s ease-out",
  },
  "&:focus::placeholder": {
    opacity: 1,
    fontSize: "13px",
  },
  // specific to TextareaAutosize, cannot use '&:focus ~ label'
  "&:focus + textarea + label, &:not(:placeholder-shown) + textarea + label": {
    top: "0.5rem",
    fontSize: "11px",
    fontFamily: "Open Sans !important",
    background: "#fff !important",
    zIndex: 1,
    boxShadow: "none !important",
  },
  "&:focus + textarea + label": {
    color: "#00000099",
    top: "-6px",
  },
  "& JoyTextarea-root:focus-within::before": { boxShadow: "none" },
});
export const StyledLabel = styled("label")(({ theme }) => ({
  position: "absolute",
  lineHeight: 1,
  //top: "calc((var(--Textarea-minHeight) - 1em) / 1)",
  top: 12,
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  background: "#fff",
  color: "rgba(0, 0, 0, 0.6)",
  fontSize: "13px",
  fontWeight: "normal",
}));

export const TabsCustomStyle = {
  "&:hover": {
    backgroundColor: "transparnt",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#fff",
    height: "30px",
    minHeight: "30px",
    borderRadius: "7px",
    top: 7,
    color: "#D7282F !important",
  },
  "& .MuiTab-root": {
    textTransform: "capitalize",
    fontSize: "14px",
    margin: "-2px 0 0",
    color: "#333333",
    minHeight: "55px",
  },

  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    zIndex: 1,
    "& svg": { color: "red" },

  },

  "& .MuiTabs-flexContainer": {
    alignItems: "center",
    // borderBottom: "1px solid #C6C6C6",
  },
  "&.MuiTab-root.Mui-selected": {
    color: "#D7282F",
    "& .MuiTab-root.Mui-selected:after": {
      content: "''",
      borderTop: "20px solid #CC0000",
      borderLeft: "20px solid transparent",
      borderRight: "20px solid transparent",
    }
  },
  "& .MuiTabs-scrollButtons": {
    display: "none",
    "@media screen and (max-width: 767px)": {
      display: "inline-flex",
    },
  },
  "& .MuiSvgIcon-root": {
    "& svg": {
      background: "#FFE9EA",
      borderRadius: "50px"
    }
  }
};

// export const TabsBoxTitleBar = styled(Box)({
//   borderBottom: "1px solid #C5C5C5",
//   "& i::before": {
//     color: "#d7282f"
//   },
//   "@media screen and (max-width: 767px)": {
//     margin: "-18px 0 0",
//   },
// });

export const LeadsOuterBox = styled(Box)({
  //margin: "1rem 0 0",
  position: "sticky",
  top: "100px"
});

export const HelpIcon = styled(HelpOutlineIcon)({
  fontSize: "22px",
  zIndex: 1,
  margin: "0 0 0 -11px",
  padding: "0 7px 0 0px",
});

export const PageHeading = styled(Typography)({
  fontSize: "25px",
  fontWeight: 700,
  color: "#393939",
  "@media screen and (max-width: 1600px)": {
    fontSize: "20px",
  },
  "@media screen and (max-width: 767px)": {
    fontSize: "16px",
  },
});
export const PageDescription = styled(Typography)({
  fontSize: "14px",
  color: "#404040",
  padding: "10px 0 20px",
  "@media screen and (max-width: 1600px)": {
    // padding: "7px 0 0",
  },
  "@media screen and (max-width: 767px)": {
    fontSize: "13px",
    "& br": { display: "none" }
  },
});
export const LeadNoContent = styled(Box)({
  background: "#fff",
  margin: "20px 0 0",
  textAlign: "center",
  minHeight: "750px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media screen and (max-width: 1600px)": {
    minHeight: "600px",
  },
  "@media screen and (max-width: 900px)": {
    minHeight: "auto",
    display: "block",
    padding: "20px",
    margin: 0
  },
});

export const BottomTxt = styled(Box)({
  margin: "20px 0 0",
  "@media screen and (max-width: 1600px)": {
    margin: "2px 0 0",
  },
});
export const NoImage = styled(Image)({
  width: "400px",
  "@media screen and (max-width: 1600px)": {
    width: "350px",
  },
  "@media screen and (max-width: 900px)": {
    width: "200px",
    height: "100%",
  },
});

export const FormOuterBox = styled(Box)({
  padding: "18px",
  background: "#fff",
  height: "calc(100vh - 200px)",
  overflowY: "scroll",
  overflowX: "scroll",
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
  "@media screen and (max-width: 767px)": {
    padding: "8px",
  },
});
export const TaskListCarousel = styled(Box)(({ theme }) => ({
  "& .slick-arrow": {
    zIndex: "2",
    "&::before": {
      color: "black",
    },
    "&.slick-prev": {
      left: "-10px",
    },
    "&.slick-next": {
      right: "-10px",
    },
  },
}));
/********===================== Create custom lead form styling ==========================*******/
export const CreateLeadCustomForm = styled(Box)({
  margin: "22px 0"
});
export const FormOuterBoxContainer = styled(Box)({
  "& .MuiSelect-select": {
    border: "none !important",
    outline: "0 !important"
  }
});
export const LeadsDialogContent = styled(Box)({
  background: "#fff",
  border: "1px solid #E2E2E2",
  borderRadius: "5px",
  padding: "10px 12px",
  margin: "0 0 20px",
});

export const LeadsDialogTitle = styled(Box)({
  // background: "#FFE5E7",
  background: "#fff",
  borderBottom: "1px solid #ddd",
  // borderRadius: "30px 30px 0 0",
  borderRadius: "0",
  color: "#d7282f",
  fontSize: "18px",
  fontWeight: 600,
  padding: "10px 25px",
  display: "flex",
  alignItems: "center",
  "& .icon-leadsblack:before": { color: "#d7282f" },
  "@media screen and (max-width: 767px)": {
    display: "block",
    fontSize: "14px",
  }
});
export const TypographyEdit = styled(Typography)({
  color: "#D7282F",
  fontSize: "12px",
  letterSpacing: "normal",
  textTransform: "capitalize",
  margin: "0 0 0 12px",
});

export const LeadInfoHeading = styled(Typography)({
  borderBottom: "1px solid #E2E2E2",
  padding: "0px 0 8px",
  fontWeight: 600,
  margin: "0 10px",
  "@media screen and (max-width: 1600px)": {
    // margin: "0 6px",
  }
});

export const SocialHeading = styled(Typography)({
  fontWeight: 600,
  fontSize: "14px",
});

export const LeadBoxFom = styled(Box)({
  border: "1px solid #E2E2E2",
});

export const BoxBothfield = styled(Box)({
  border: "1px solid #BBBBBB",
  borderRadius: "4px",
  // height: "40px",
  height: "37px",
  "& fieldset": { border: "none" },
  "& label": {
    background: "#fff",
    padding: "0 7px",
    overflow: "inherit",
    maxWidth: "100%",
  },
  "& .MuiOutlinedInput-input": {
    // padding: "0 !important",
    // paddingRight: "0 !important",
    // padding: "10px"
  }
});

export const GridFormLeads = styled(Grid)({
  "& fieldset": {
    border: "none",
  },
  "& label": {
    background: "#fff",
    padding: "0 7px",
    overflow: "inherit",
    maxWidth: "100%",
  },
});

export const LableInput = styled(InputLabel)({
  position: "absolute",
  background: "#fff",
  margin: "0 0 0 12px",
  padding: "0 10px",
  fontSize: "13px",
  fontWeight: 600,
  color: "#000",
});

export const MobileCustomField = styled(Box)({
  minHeight: "30px",
  display: "flex",
  alignItems: "center",
  position: "relative",
});

export const AddInfoBox = styled(Box)({
  display: "flex",
  gap: "10px",
});

export const AddButton = styled(Button)({
  color: "#D7282F",
  fontSize: "12px",
});
export const CustomInputForm = styled('div')({
  "& .Customtextarea": {
    "& .MuiInputBase-input": {/* padding: "10px 14px",*/ fontSize: "13px" },
  }
});

export const CustomFormFieldContainer = styled(FormControl)({
  color: "#D7282F",
  "& .MuiInputLabel-root": {
    fontSize: "13px",
    textTransform: "capitalize"
  },
  "& .MuiInputBase-formControl": {
    fontSize: "13px !important",
  },
  "& svg": {
    width: 17,
  },

  // "&. MuiFilledInput-root": { fontSize: "20px" },
  // "& .MuiInputBase-input": { padding: "10px 14px", fontSize: "13px" },
  // "& .MuiButtonBase-root": { fontSize: "14px", marginRight: 0 },
  // "& .MuiFormLabel-root": { fontSize: "13px", color: "#1C1C1C", top: "-3px" },
  // "& .MuiFormLabel-asterisk": { color: "red" },
  // "& .Joy-focused:before": { boxShadow: "none" },
  // "& .MuiTextarea-root:hover": {
  //   borderColor: "#000000de",
  // },

  "& .Createleadautocomplete": {
    "& .MuiOutlinedInput-root": {
      // padding: "2.8px 10px",
    },
  },
  // "& .Leadphonefield": {
  //   "& .MuiInputBase-root": {
  //     padding: "0 7px"
  //   },
  //   "& .MuiInputBase-input": {
  //     paddingLeft: 0,
  //     paddingRight: 0
  //   }
  // },
  "& .datetimecommon": {
    "& .MuiInputBase-input": {
      padding: "8.5px 10px",
    },


  },
  "& .enadormentcolor": {
    borderRadius: "0px 4px 4px 0px",
    margin: "6px 0 0",
    "& i": {
      color: "#d7282f",
      margin: "8px 0 0",
      "&::before": {
        color: "#d7282f",
      }
    }
  },
  "& .annual-revenue": {
    "& .MuiInputBase-root": {
      padding: 0
    },
    "& .enadormentcolor": {
      marginRight: "5px"
    }
  },
  "& .MuiFormLabel-asterisk":{
    color:"#d7282f"
  }
});

/******** Field style for mostly form on CRM *******/
export const FormFieldContainer = styled(FormControl)({
  color: "#D7282F",
  fontSize: "12px",
  "&. MuiFilledInput-root": { fontSize: "20px" },
  "& .MuiInputBase-input": { padding: "10px 14px", fontSize: "13px" },
  "& svg": {
    width: 17,
  },
  "& .MuiButtonBase-root": { fontSize: "14px", marginRight: 0 },
  "& .MuiFormLabel-root": { fontSize: "13px", color: "#1C1C1C", top: "-3px" },
  "& .MuiFormLabel-asterisk": { color: "red" },
  "& .Joy-focused:before": { boxShadow: "none" },
  "& .MuiTextarea-root:hover": {
    borderColor: "#000000de",
  },
  ".Duedate_column": {
    margin: "14px 0  5px",
  },
  "& .Createleadautocomplete": {
    "& .MuiOutlinedInput-root": {
      padding: "2.8px 10px",
    },
  },
  "& .Leadphonefield": {
    "& .MuiInputBase-root": {
      padding: "0 7px"
    },
    "& .MuiInputBase-input": {
      paddingLeft: 0,
      paddingRight: 0
    }
  },


});
export const StyleMobileField = styled(Box)({
  "& .MuiTypography-root": {
    // fontSize: "13px",
    padding: "0 4px",
    fontSize: "12px",
    color: "rgba(0, 0, 0, 0.5)"
  },
});


export const InfoIconTooltip = styled(InfoOutlinedIcon)({
  color: "#50b76c",
  verticalAlign: "middle",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  right: 0,
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  width: 17,
});

export const LeadButtonContainer = styled(Box)({
  // background: "#FFF7F7",
  background: "#fff",
  padding: "15px 20px",
  textAlign: "right",
  borderTop: "1px solid #DDD",
  "@media screen and (max-width: 900px)": {
    padding: "12px"
  }
});
export const LeadButtonContainerInner = styled(Box)({
  display: "inline-flex",
  gap: 10,
  alignItems: "center",
});
export const CustomInputCheckboxRow = styled(Box)({});
export const CustomInputCheckbox = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "13px"
  },
  "@media screen and (max-width: 767px)": {
    padding: 0
  }
});
export const CustomInputontent = styled(Box)({
  padding: "20px 0 10px",
  "& .Customtextarea": {
    "& .MuiInputBase-input": { padding: "0", },
  },
  "& .mandatoryField": {
    fieldset: {
      borderLeft: "2px solid #d7282f !important"
    }
  }
});

export const CreateFormCountrySelect = styled(Box)({
  // "& .MuiAutocomplete-endAdornment button svg": {
  // display:"none",
  // "& .MuiTouchRipple-root": { width: "10px", height: "10px", position: "relative", background:"red", display:"grid" },
  // "& .MuiTouchRipple-root:before, .MuiTouchRipple-root:after": {
  //   color: "black",
  //   borderRight: "2px solid currentcolor",
  //   borderBottom: "2px solid currentcolor",
  //   content: "''",
  //   position: "absolute",
  //   width: 16,
  //   height: 16,
  // },

  // "& .MuiTouchRipple-root:before": {
  //   left: "-16px",
  //   transform: "rotate(135deg)",
  // },
  // "& .MuiTouchRipple-root:after": {
  //   right: "-16px",
  //   transform: "rotate(-45deg)",
  // }
  // },
});


/******************* Start Table Leads list data style here  *****************/
export const LeadsDataContainer = styled(Box)({
  background: "#fff",
  padding: "15px 10px 15px",
  "& .leadsgrey::before": {
    color: "#4a4a4a"
  },
  "&.crmactive-toggle": {
    "@media screen and (max-width:1280px)": {
      left: 0
    },
    left: "-256px",
    "& .arrowToggle1": {
      right: '-18px',
      borderRadius: '0px 4px 4px 0px',
    },
  },

});
export const FilterRowContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // paddingBottom: "5px",
  // paddingBottom: "8px",
  // paddingTop: "8px",
  "@media screen and (max-width:730px)": {
    display: "block",
  },
  "& .kanbanbuttons": {
    padding: "0px 0 0",
    "& .MuiButton-endIcon": {
      marginRight: "-8px",
      marginLeft: "2px"
    },
    "@media screen and (max-width:730px)": {
      display: 'block',
    },
    "& button": {
      // margin: "5px 5px 0 0"
      margin: "0 5px 0 0"
    }
  },
  "& .iconlead": {
    fontSize: "14px !important",
    "& i:before": {
      color: "#4A4A4A"
    },
    "&:hover": {
      "& i:before": {
        color: "#fff"
      },
    }
  }
});
export const FilterRowContainerLeft = styled(Box)({
  display: "flex",
  gap: 10,
  alignItems: "center",
  "& .Viewchange": {
    "& i": { margin: "-2px 1px 0 0" },
    "& .icon-listView": {
      fontSize: "11px !important",
    },
  },
  "@media screen and (max-width: 767px)": {
    margin: '0 0 7px',
  },
});
export const ViewTypeChange = {
  "& .MuiListItemIcon-root": {
    minWidth: "20px !important",
  },
};
export const OutLinedButton = styled(Button)({
  borderRadius: "3px",
  border: "1px solid #BFBFBF",
  background: "transparent",
  color: "#4A4A4A",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 12px",
  minWidth: "auto",
  width: "max-content",
  // minWidth: "115px",
  textTransform: "capitalize",
  height: "30px",
  "& svg, i": { fontSize: "16px !important" },
  "&:hover": {
    background: "#D7282F",
    color: "#fff",
    border: "1px solid #D7282F",
    opacity: "85%",
  },
  "&:hover img": {
    filter: "brightness(0) invert(1)"
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "& .MuiButton-startIcon": {
    marginRight: "3px",
  },
  "@media screen and (max-width:767px)": {
    fontSize: "12px"
  },
  "& img": {
    filter: "grayscale(100%)",
    fontSize: "18px",
  },
});


export const NoContentButton = styled(Button)({
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
  "& .MuiButton-startIcon": {
    margin: 0,
  },
  "& svg": {
    transition: "transform .5s, opacity .15s",
  },

  "& svg:hover": {
    transform: "rotate(270deg)",
  },
});
export const ActiveBtn = {
  background: "#D7282F",
  opacity: "85%",
  color: "#fff",
  border: "1px solid #D7282F",
  transition: 'all ease .5s',
};
export const FilledButton = styled(Button)({
  background: "#D7282F",
  opacity: "85%",
  borderRadius: "3px",
  border: "1px solid #D7282F !important",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 25px",
  minWidth: "auto",
  textTransform: "capitalize",
  height: "30px",
  "&:svg": { fontSize: "27px" },
  "&:hover": {
    background: "#fff",
    color: "#D7282F",
  },
});
export const AllLadsBtn = styled(Button)({
  color: "#fff",
  background: "#D7282F",
  opacity: "85%",
  borderRadius: 4,
  height: "30px",
  fontWeight: 600,
  fontSize: "13px",
  textTransform: "capitalize",
  "& .MuiSelect-select": {
    borderRadius: "4px",
    color: "#fff !important",
    padding: "6px 10px",
    fontWeight: 600,
  },
  "&:hover": {
    background: "#D7282F",
    color: "#fff",
  },
  "& .MuiFormLabel-root": { color: "#fff" },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& svg": { color: "#fff", width: 17 },
});

export const SelectEditOption = styled(Box)({
  display: "flex",
  gap: 10,
  alignItems: "center",
  minWidth: "200px",
  "& img": {
    display: "none",
    cursor: "pointer",
  },
  "&:hover img": {
    display: "block",
  },
});
export const ActionButtonContainer = styled(Box)({
  display: "flex",
  // margin: "6px 0 5px",
  // borderTop: "1px solid #D2D2D2",
  gap: 7,
  // padding: "10px 0 0",
  // minHeight: "45px",
  "@media screen and (max-width: 767px)": {
    display: "block",
  },
  "& button": {
    margin: "0px 5px 0 0",
    "@media screen and (max-width: 767px)": {
      margin: "0px 5px 5px 0",
    },
  },
  position: "relative"
});
export const ButtonManageColmnBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const ActionFieldStyle = styled(FormControl)({
  "& .MuiInputBase-input": {
    paddingTop: "6px",
    paddingBottom: "6px",
    color: "#4A4A4A",
    fontWeight: 600,
    fontSize: "13px",
  },
  "& .MuiSvgIcon-root": { width: "17px" },
});

export const LeadListData = styled(Box)({
  // border: "1px solid #E0E3E7",
  // padding: "10px 15px 15px",
  padding: "15px 0 0",
  // height: "80vh",
  // "@media screen and (max-width: 1600px)": {
  //   padding: "8px",
  // },
  "& .filterdesktop": {
    // height: "600px",
    overflow: "hidden",
    border: "1px solid #E0E3E7",
    borderRadius: 4,
    height: "100%",
    position: "relative"
  },
  // "@media screen and (max-width: 1600px)": {
  //   height: "75vh",
  // },

  "@media screen and (max-width: 767px)": {
    padding: "0 0"
  },
});

export const FilterCoulmn = styled("div")({
  // border: "1px solid #E0E3E7",
  borderRadius: "4px",
  // padding: "15px 10px",
  position: "relative",
});

export const SaveFilterBox = styled("div")({
  padding: "9px 0 0",
});
export const SaveFilterData = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  padding: "2px 15px",
  margin: "0 0 6px",
  "&:hover": {
    background: "#f7f7f7",
  },
  "& .Savevaluicon": {
    padding: 0,
    "& .MuiSvgIcon-root": {
      fontSize: "18px",
    },
  },
});

export const SaveFilterValue = styled("div")({
  fontSize: "13px",
  "& span": {
    background: "#f4f7ff",
    border: "1px solid #d2e3ef",
    borderRadius: "4px",
    padding: "1px 4px 1px",
    marginLeft: "6px",
    fontSize: "11px",
  },
});

export const TitleLeads = styled(Typography)({
  fontSize: "14px",
  color: "#000",
  fontWeight: 600,
  padding: "0",
  margin: "0",
});
export const FilterValuesLeads = styled(Typography)({
  fontSize: "13px",
  color: "#444",
  padding: "6px 0 0",
});
export const TypographyHeading = styled(Typography)({
  fontSize: "18px",
  color: "#000",
  fontWeight: 600,
  textTransform: 'capitalize'
});
export const TotalRecords = styled("span")({
  fontSize: "13px",
  color: "#000",
  fontWeight: 600,
  border: "1px solid #E0E3E7",
  padding: "3px 6px",
  borderRadius: "3px",
  minWidth: "120px",
  textAlign: "center",
});
export const FilterRecordList = styled("span")({
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
});
export const FilterAction = styled("span")({
  display: "flex",
  gap: "5px",
});
export const TotalRecordsFilter = styled("span")({
  fontSize: "12px",
  color: "#000",
  background: "#dfdfdf",
  padding: "2px 6px",
  borderRadius: "3px",
  textTransform: 'capitalize'
});
export const ApplyButtonWrapper = styled(Box)({
  gap: 10,
  display: "flex",
  justifyContent: "right",
  position: "absolute",
  bottom: 0,
  right: 0,
  left: 0,
  width: "100%",
  // bottom: 0,
  // bottom: "-35px",
  borderTop: '1px solid #E0E3E7',
  padding: "12px",
  // paddingTop:"12px",
  background: "#fff",
  boxShadow: "0 -2px 4px -1px rgba(0,0,0,.15)",
  // "@media(min-height:320px) and (max-height:600px)": {
  //   position: "static"
  // },

});
export const FilterIconStyle = styled(FilterAltOutlinedIcon)({
  fontSize: "18px",
  margin: "4px 3px -4px 3px",
});
export const SearchCoulmBox = styled(Box)({
  padding: "12px 7px",
});
export const FilterMenuList = styled(Box)({
  padding: "8px 0",
  // height: "500px",
  // height:"312px",
  // height: "54vh",
  height: "calc(54vh - 70px)",
  overflowY: "scroll",
  // marginBottom:"55px",
  "& .MuiTypography-root": {
    fontSize: "13px",
  },
  "& .MuiFormControlLabel-root": {
    padding: "0 12px",
  },

  // "@media screen and (max-width: 1550px)": {
  //   height: "50vh",
  // },
  // "@media screen and (max-width: 1360px)": {
  //   height: "300px",
  // },
  "@media screen and (max-width: 1700px)": {
    height: "500px",
    // minheight:"480px"
  },
  // "@media(min-height:320px) and (max-height:600px)": {
  //   height: "220px",
  // },
  "& .MuiFormHelperText-root::before": {
    display: "none"
  }
});

export const LeadFilterListing = styled(Box)({
  padding: "4px 10px",
});
export const FilterField = styled(FormControl)({
  color: "#D7282F",
  fontSize: "12px",
  "& .MuiInputBase-root": {
    // paddingLeft: "9px",
    paddingLeft: "5px",
    "& img": { margin: "0 3px 0 0" }
  },
  "& .MuiInputBase-input": {
    padding: "5px 17px 5px 5px",
    fontSize: "12px",
    minHeight: "20px",
  },
  "& svg": { display: "block !important", fontSize: 14 },
  "& .MuiMenuItem-root": { fontSize: "10px" },
  "& .MuiFormLabel-root": { fontSize: "13px" },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& .Filterowner img": {
    display: "none",
  },
  "& .Filterowner .MuiAutocomplete-inputRoot": {
    padding: "0 !important",
  },
  "& .Filterowner": {
    "& .MuiFormControl-root": {
      width: "100%"
    },
    "& .MuiChip-label": {
      fontSize: "11px"
    },
    "& .MuiChip-deleteIcon": {
      fontSize: "14px"
    },
    "& .MuiChip-root": {
      height: "16px"
    },
    "& .MuiInputBase-input": {
      padding: "5px !important",
      fontSize: "12px",
      minHeight: "20px",
    },
  },
  "& .FiltertagOption": {
    // border: "1px solid rgba(0, 0, 0, 0.23)", 
    borderRadius: "4px",
    "& .MuiInputBase-root": {
      padding: "1px 0 !important",
      paddingRight: "30px !important",
      maxHeight: "120px",
      overflowY: "auto"
    },
    "& .MuiAutocomplete-endAdornment": {
      top: 4
    },
    "& .MuiChip-label": {
      fontSize: "11px",
      padding: "0 3px"
    },
    "& fieldset": {
      border: "none"
    },
    "& .Mui-error": {
      border: "1px solid #d7282f"
    }
  }
});
export const StackCreatList = styled(Stack)({
  //width: "100%",
  margin: "10px 8px 0",
  "& .MuiSvgIcon-root": {
    fontSize: "12px",
    margin: "0 0 0 6px",
  },
});
export const FavoriteInnerData = styled(Stack)({
  padding: "5px 0",
  "& .fromleft": {
    paddingLeft: "29px !important"
  }
});
export const CreatListHeading = styled(Box)({
  background: "#F5F5F5",
  padding: "5px",
  "& .MuiTypography-root": {
    fontSize: "13px",
    fontWeight: 600,
    color: "#231F20",
  },
});
export const CreatViewType = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "0 5px"
});
export const LeadAccordion = styled(Box)({
  margin: "0 8px",
  "& .MuiSvgIcon-root": {
    fontSize: "12px",
    margin: "0 0 0 6px",
  },
  "& .MuiPaper-root": {
    borderRadius: "0",
    boxShadow: "none",
    border: "none !Important",
    margin: "0",
    "& .MuiAccordionSummary-content": {
      margin: 0,
      padding: "0 5px",
    },
    "& .MuiAccordionSummary-root": {
      minHeight: "30px",
      padding: "0 6px",
      margin: "5px 0"
    },
    "& .MuiTypography-root,": {
      fontSize: "13px",
      fontWeight: 600,
      color: "#231F20",
    },
  },
});
export const DropDownSearch = styled(Box)({
  margin: "0 8px",
});


/****** Start Manage Column styling here  *******/
export const NewCustomView = styled(Typography)({
  textAlign: "center",
  cursor: "pointer",
  color: "#D7282F",
  fontSize: "12px",
  fontWeight: 600,
  padding: "6px 0 0",
});
export const ListTopBarFilter = styled(Box)({
  // display: "flex",
  // justifyContent: "space-between",
  // alignItems: "center",
  // gap: 5,
  // position: "absolute",
  right: "21px",

});
export const ListRecords = styled(Box)({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  padding: "5px",
  background: "#f7f7f7",
  margin: "0 0 12px",
  borderRadius: "4px",
  "@media screen and (max-width: 767px)": {
    display: "block",
    padding: "10px"
  },
});
export const FilterByColumn = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "0 0 0 1rem",
  gap: "6px",
  "& .Totalrecordtxt": {
    fontSize: "14px",
    color: "#000",
    fontWeight: 600,
    minWidth: "60px",
    "@media screen and (max-width: 767px)": {
      padding: "0px 0 3px"
    },

  },
  "@media screen and (max-width: 767px)": {
    display: "block",
    // padding: "10px 0 0"
    padding: 0
  },
});
export const OuterHeightDiv = styled(Box)({

});


export const ManageColumnList = styled(Box)({
  height: "300px",
  overflowY: "auto",
  padding: "0 10px",
  "& .massupdeowner img": {
    display: "none",
  },
  "& .massupdeowner .MuiAutocomplete-inputRoot": {
    // padding: 0,
  },
  "& .massupdeowner": {
    "& .MuiFormControl-root": {
      width: "100%"
    },
    "& .MuiChip-label": {
      fontSize: "11px"
    },
    "& .MuiChip-deleteIcon": {
      fontSize: "14px"
    },
    "& .MuiChip-root": {
      height: "16px"
    }

  }
});
export const ManageColumnButton = styled(Box)({
  display: "flex",
  gap: "10px",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
  padding: "7px",
  borderTop: "1px solid #f5f5f5"
});
export const ManagaDeleteDialog = {
  "& .MuiPaper-root": {
    maxWidth: "1100px",
    width: "1100px",
    borderRadius: "10px",
  },
  "& .MuiDialogContent-root": {
    // padding: "15px 30px",
    padding: "15px 10px",
  },
  "& .MuiDialogActions-root": {
    padding: "10px 16px",

  },
};
export const ComposemailTitleTop = styled(Box)({
  display: "flex",
  justifyContent: "space-between"
});
export const HighCrossIcon = styled(HighlightOffRoundedIcon)({
  color: "#000",
  cursor: "pointer",
  "&:hover": {
    color: "#d7282f"
  }
});


export const ManageColumnContainerError = styled(Typography)({
  fontSize: "12px",
  color: "#d7282f",
});
export const ManageColumnContainer = styled(Box)({
  margin: "1rem 2rem",
});
/****** End Manage Column styling here  *******/

/****** Lead List Data Responsive styling here ******/
export const SMDrawerFilter = styled(Box)({
  "@media screen and (max-width: 900px)": {
    display: "block",
  },
});
export const FilterCoulmnDesktop = styled(Box)({
  "@media screen and (max-width: 900px)": {
    display: "none",
  },
});
export const LeadListAutocomplate = styled(Box)({
  minWidth: "160px",
  "& .MuiInputBase-root": {
    paddingTop: 10,
    paddingBottom: 0
  },
  "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
    padding: "5.5px 5px"
  }
});

export const CommonAvatarContainer = styled(Box)({

});
export const CommonAvatarLabel = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiAvatar-root": {
    marginRight: "6px",
    width: "30px !important",
    height: "30px !important",
    "& img": {
      width: "100% !important",
      height: "100% !important",
      borderRadius: "50%"
    }
  },
  "& .TaskUsername": {
    fontWeight: 600,
  },
  "& .MuiListItemText-root": {
    margin: "0",
  },
  "& .TaskUseremail": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%"
  },
  "& .MuiTypography-root": {
    color: "#4a4a4a",
    fontSize: "12px",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // width:"90%"
  },
});



/****** Lead List Data Responsive styling here ******/


/******************* Ends Table Leads list data style here  *****************/



/******************* Start single Leads details styling here  *****************/
/********============== Lead Info style =============******/
export const LeadDetailOuter = styled(Box)({
  padding: "0 20px 15px",
  position: "relative",
  "@media screen and (max-width: 1600px)": {
    padding: "0 10px 15px",
  },
  "@media screen and (max-width: 767px)": {
    padding: "0 5px 15px",
  },
  "& .persondetailmobile": {
    position: "fixed",
    left: '12px',
    alignItems: "center",
    transform: "rotate(-90deg)",
    transformOrigin: "center left",
    zIndex: 1,
    background: "#000",
    color: "#fff",
    fontSize: "15px",
    padding: "10px",
    "@media screen and (max-width: 1200px)": {
      display: "inline-flex",
    },
  }
});
export const LeadDetaileftArea = styled(Box)({
  alignItems: "center",
  display: "grid",
  padding: "15px 0",
  "@media screen and (max-width:899px)": {
    // paddingBottom: "0",
    padding: "8px 0 0px"
  },
  "@media screen and (max-width:767px)": {
    background: "#f7f7f7",
    padding: "0 10px",
    borderRadius: "4px",
    margin: "10px 0"
  },
});
export const DealName = styled(Typography)({
  color: "#000",
  fontWeight: 600,
  "& span": {
    fontWeight: 700,
    "@media screen and (max-width: 767px)": {
      fontSize: "14px"
    }
  },
});
export const BackOption = styled("span")({
  margin: "0 12px 0 0px",
  "& svg": {
    fontSize: "18px",
    color: "#000",
    margin: "8px 0 1px"
  },
  "& button": {
    backgroundColor: "#ddd",
    border: "none",
    color: "#fff",
    textAlign: "center",
    width: "22px",
    height: "22px",
    transition: "all 0.5s",
    cursor: "pointer",
    borderRadius: "50px"
  },
  "& button:hover": {
    // paddingRight: "24px",
    // paddingLeft: "0.2px",
  },
});
export const BackNdPreOptions = styled("span")({
  display: "flex",
  gap: 5,
  justifyContent: "flex-end",
  "& svg": {
    fontSize: "18px",
    color: "#000",
    margin: "0 0 1px"
  },
  "& button": {
    backgroundColor: "#ddd",
    border: "none",
    color: "#fff",
    textAlign: "center",
    width: "22px",
    height: "22px",
    transition: "all 0.5s",
    cursor: "pointer",
    borderRadius: "50px"
  },
  // "& button:hover": {
  //   paddingRight: "5px",
  //   paddingLeft: "0.2px",
  // },
  "@media screen and (max-width: 600px)": {
    margin: "10px 0 0px"
  }
});


export const LeadDetailInner = styled(Stack)({
  color: "#000",
  // fontWeight: 700,
  transition: 'all ease .5s',
  '& .arrowPosition': {
    position: 'relative',
    //left: '-30px',
    transform: 'rotate(-180deg)',
  },
  "@media screen and (max-width: 1200px)": {
    "& .detaildataright": {
      maxWidth: "100%",
      flexBasis: "100%"
    }
  }
});
export const LeadTopBar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: 'all ease .5s',


  "& .detailbuttongrid": {
    "@media screen and (max-width: 1199px)": {
      padding: "0 10px 0px 16px",
    },
    "@media screen and (max-width: 767px)": {
      padding: "0 0px 0 20px",
    },
    "& .buttoncontainer": {
      "@media screen and (max-width: 1199px)": {
        padding: "10px 0"
      },
      "@media screen and (max-width:712px)": {
        display: "block",
        justifyContent: "start",
      }
    }
  },


  "@media screen and (max-width: 600px)": {
    display: "block",
    // margin: "15px 0 -10px"

  },

});
export const Detailleft = styled(Box)({
  border: "1px solid #E0E3E7",
  padding: "8px 8px",
  height: "100%",
  // "& .firstheadingbg":{
  //   margin:"0",
  //   border:"1px solid #E0E3E7",
  //   borderBottom:"none"
  // }
});
export const ExpandCollapseArrow = styled(Box)({
  backgroundColor: '#231f20',
  borderRadius: '3px 0px 0 3px',
  padding: '4px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  cursor: 'pointer',
  marginRight: '6px',
  left: '-20px',
  position: "absolute",
  transition: 'all ease .3s',
  '&:hover': {
    backgroundColor: '#5e595a',
  },
  '& .MuiSvgIcon-root': {
    color: '#ffffff',
    fontSize: '16px',
    position: 'relative',
    left: '1px',
  },
  "@media screen and (max-width: 1200px)": {
    display: "none"
  }
});

export const HeadingBg = styled(Box)({
  background: "#F5F5F5",
  padding: 7,
  borderRadius: "6px 6px 0px 0px",
  margin: "0 0 12px",
  display: "flex",
  justifyContent: "space-between",
  "& svg": {
    color: "#7A7A7A",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  // "& svg:hover": { background: "#0000000a" }
  "& button": { padding: "0" },
});


export const PersonDetailTags = styled(Box)({
  "& .greenchip": {
    background: "#E2F7DD", color: "#57874B",
    "& svg": {
      color: "#57874B",
    }
  },
  "& .redchip": {
    background: "#F7DDDD", color: "#d7282f",
    "& svg": {
      color: "#d7282f",
    }
  },
  "& .bluechip": {
    background: "#DCF0FF", color: "#01AEF2",
    "& svg": {
      color: "#01AEF2",
    }
  },
  "& .MuiChip-label": {
    fontWeight: 600,
    fontSize: 12,
  },
  "& .MuiChip-root": {
    borderRadius: "6px",
    margin: "0 6px 6px 0",
    "& .MuiChip-icon": {
      fontSize: 12,
    },
    "& .MuiChip-deleteIcon": {
      borderLeft: "1px solid",
      fontSize: 14,
      margin: "2px"
    },
    "& svg":{
      color:"#fff"
    }
  },
  "& .addmtag": {
    textTransform: "capitalize",
    color: "#D7282F",
    fontSize: "12px",
    fontWeight: 400,
    padding: 0,
    "& .MuiSvgIcon-root": {
      fontSize: "13px"
    },
    "& .MuiButton-startIcon": {
      margin: "0 3px 0 0"
    },
    "&:hover": {
      background: "transparent"
    }
  }
});

export const MAddMorebtn = styled(Button)({

  textTransform: "capitalize",
  color: "#D7282F",
  fontSize: "12px",
  fontWeight: 400,
  padding: 0,
  "& .MuiSvgIcon-root": {
    fontSize: "13px"
  },
  "& .MuiButton-startIcon": {
    margin: "0 3px 0 0"
  },
  "&:hover": {
    background: "transparent"
  }

});


export const TagSearchBox = styled(Box)({
  "& .MuiInputBase-root": {
    padding: "2px 5px",
    "&::before": {
      borderBottomColor: "#e8eaed"
    },
    "&::after": {
      borderBottomColor: "#F7DDDD",
      borderWidth: "1px"
    },
    "&:hover:before": {
      borderBottomColor: "#F7DDDD",
      borderWidth: "1px"
    }
  }
});

export const PreTagBoxList = styled(Box)({
  "& .MuiListItemText-root": {
    padding: "0 !important"
  },
  "& .MuiButtonBase-root": {
    padding: "5px",
    minHeight: "20px"
  },
  "& .greenchip": {
    background: "#E2F7DD", color: "#57874B",
    "& svg": {
      color: "#57874B",
    }
  },
  "& .redchip": {
    background: "#F7DDDD", color: "#d7282f",
    "& svg": {
      color: "#d7282f",
    }
  },
  "& .bluechip": {
    background: "#DCF0FF", color: "#01AEF2",
    "& svg": {
      color: "#01AEF2",
    }
  },
  "& .MuiChip-label": {
    fontWeight: 400,
    fontSize: 11,
  },
  "& .MuiChip-root": {
    borderRadius: "6px",
    height: "18px",
    "& .MuiChip-icon": {
      fontSize: 12,
    },
    "& .MuiChip-deleteIcon": {
      borderLeft: "1px solid",
      fontSize: 14,
      margin: "2px"
    },
  },
  "& .addmtag": {
    textTransform: "capitalize",
    color: "#D7282F",
    fontSize: "12px",
    fontWeight: 400,
    "& .MuiSvgIcon-root": {
      fontSize: "16px"
    },
    "& .MuiButton-startIcon": {
      margin: "0 3px 0 0"
    },
    "&:hover": {
      background: "transparent"
    }
  }
});

export const TagPaperView = styled(Paper)({
});
export const PopperStyle = {
  "& .MuiPaper-root": {
    width: "180px",
    border: "1px solid #e8eaed",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
  }
};
export const MainHeading = styled(Typography)({
  color: "#393939",
  fontWeight: 600,
  fontSize: 16,
});

export const ThreeDotsButton = styled(IconButton)({
  minWidth: "auto",
  background: "transparent",
  color: "#4a4a4a",
  boxShadow: "none !important",
  borderRadius: 50,
  "&:hover": {
    background: "#e4e4e4",
  },
  "& svg": {
    fontSize: "18px",
  },
});
export const PersonDetailPopover = styled(Popover)({
  "& .MuiPaper-root": {
    minWidth: 100,
    maxWidth: 300
  },
  "& .MuiTypography-root": {
    fontSize: "13px",
  },
  "& svg": {
    fontSize: "18px",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "22px"
  }

});

export const DealName2 = styled(Typography)({
  color: "#000",
  whiteSpace: "nowrap",
  // width: "70%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: 16,
  margin: "15px 0",
});
export const DetailLeftContent = styled(Box)({
  border: "1px solid #E0E3E7",
  padding: "14px 10px",
  borderRadius: "5px 5px 0 0",
  position: "relative",
  "& .callgradient": {
    backgroundImage: "linear-gradient(#fcfcfc, #FEF3F3)",
    "& .MuiTypography-root": {
      color: "#4A4A4A",
    },
  },
  "& .taskgradient": {
    backgroundImage: "linear-gradient(#fcfcfc, #EEFFFB)",
    "& .MuiTypography-root": {
      color: "#4A4A4A",
    },
    "& i:before": {
      color: "#00BA8B"
    }
  },
  "& .notsgradient": {
    backgroundImage: "linear-gradient(#fcfcfc, #F6F2FF)",
    "& .MuiTypography-root": {
      color: "#4A4A4A",
    },
    "& i:before": {
      color: "#906FE8"
    }
  },
  "& .meetinggradient": {
    backgroundImage: "linear-gradient(#fcfcfc, #FEFFDC)",
    "& .MuiTypography-root": {
      color: "#4A4A4A",
    },
    "& i:before": {
      color: "#BBC200"
    }
  },
  "& .dealgradient": {
    backgroundImage: "linear-gradient(#fcfcfc, #FFF5EB)",
    "& .MuiTypography-root": {
      color: "#4A4A4A",
    },
    "& i:before": {
      color: "#DC8438"
    }
  }
  // borderTop:"none"
});
export const ContentStack = styled(Stack)({
  marginTop: 16,
});

export const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 0 8px",
});
export const SocialLinksContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  paddingBottom: 8,
  "& .MuiButtonBase-root": {
    width: "25px",
    height: "25px",
    borderRadius: 5
  },
  "& i": {
    padding: 6,
    background: "#f2f2f2",
    borderRadius: "50%"
  }
});
export const SocialLinksbutton = styled(Box)({
});

export const PButtonContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const AvatarContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 8,
  "& .MuiTypography-root": {
    color: "#4A4A4A",
  },
  "& img": {
    width: "100%",
    objectFit: "contain",
  },
  "& .personEmailsec a": {
    display: "flex",
    alignItems: "flex-end",
    gap: 5,
    fontSize: 12,
  },
  "& .MuiAvatar-root": {
    width: 40,
    height: 40,
    "@media screen and (max-width: 1400px)": {
      width: 30,
      height: 30
    },
  },

});
export const DetailStatusTop = styled("span")({
  background: "#E2F7DD",
  color: "#57874B",
  fontSize: "12px",
  fontWeight: 400,
  borderRadius: "20px",
  padding: "1px 6px",
  position: "relative",
  display: "none",
  "@media screen and (max-width: 1700px)": {
    position: "absolute",
    right: "5px",
    top: "5px"
  },

  "& .Phonefield": {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    gap: 3,
  },
  "& svg": { width: 13, color: "#57874B" },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
});
export const DetailStatus = styled("span")({
  background: "#E2F7DD",
  color: "#57874B",
  fontSize: "11px",
  fontWeight: 400,
  borderRadius: "20px",
  padding: "1px 6px",
  position: "relative",

  "& .Phonefield": {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    gap: 3,
  },
  "& svg": { width: 13, color: "#57874B" },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
});

export const DetailStatusSelect = styled(Select)({
  "& .MuiSelect-select": {
    background: "#E2F7DD",
    padding: "0 5px",
    color: "#57874B",
    borderRadius: "50px !important",
    textTransform: "capitalize",
    fontSize: "11px",
    "&. MuiFilledInput-root": { fontSize: "20px" },
    "& .MuiInputBase-input": { padding: "0px !impoortant", color: "#103DDA" },
    "& svg": { width: 17 },
    "& .MuiMenuItem-root": { fontSize: "10px" },
    "& fieldset": { border: "none" },
  },
});
export const LeadInfo = styled(Box)({
  // display: "flex",
  justifyContent: "space-between",
  // padding: "0 0 10px",
  "& .MuiTypography-root": {
    fontSize: 12,
    // padding: "0 10px 0 0",
  },
  "& svg": {
    margin: "1px 1px -5px",
    color: "#ababab",
    padding: "0 5px 0 0",
    fontSize: 19,
  },
  "& .smalltxt": {
    display: "flex",
    wordBreak: "break-word",
    cursor: "pointer",

    gap: 6,
    "& .emailcopy": {
      display: "none",
      transition: "all ease .5s",

    },
  },
  "& .smalltxt:hover .emailcopy": {
    display: "block",
    cursor: "pointer"
  }
});
export const SuccessStatusTop = styled(Typography)({
  background: "#E2F7DD",
  color: "#57874B",
  fontSize: 11,
  borderRadius: 12,
  padding: "0px 5px 2px",
  textTransform: "capitalize",
});

export const SuccessStatus = styled(Typography)({
  background: "#E2F7DD",
  color: "#57874B",
  fontSize: 11,
  borderRadius: 12,
  padding: "0px 5px 2px",
  textTransform: "capitalize",
  "@media screen and (max-width: 1700px)": {
    // position: "absolute",
    right: 0,
    top: 0
  },
});


export const ContentInnerInfo = styled(Box)({});
export const CompanyAvatar = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    fontSize: 14,
  },
  "& svg": {
    color: "#ababab",
    padding: "0 5px 0 0",
    fontSize: 19,
  },
  "& .smalltxt": {
    display: "flex",
    wordBreak: "break-word",
    cursor: "pointer",
    "& .emailcopy": {
      display: "none",
      transition: "all ease .5s",
    },
  },
  "& .smalltxt:hover .emailcopy": {
    display: "block",
    cursor: "pointer",
    margin: "0 10px"
  },
  "& .MuiLink-root": {
    fontSize: 12,
  }
});
export const CompanyCircle = styled("div")({
  background: "#FFEEEF",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  padding: "0 7px",
  border: "1px solid #FBDDDD",
  justifyContent: "center",
  "& svg": {
    textAlign: "center",
    fontSize: 24,
    color: "#D7282F",
  },
  "& img": {
    width: "18px"
  },
  "@media screen and (max-width: 1400px)": {
    width: "30px",
    height: "30px",
  }
});

export const RfqContent = styled(Box)({});
export const RfqTitle = styled(Typography)({
  color: "#231F20",
  fontSize: 14,
  fontWeight: 400,
});
export const RfqInfo = styled("p")({
  color: "#8A8A8A",
  fontSize: 12,
  fontWeight: 400,
  padding: "5px 0 0",
});
export const AddNoteMessage = styled(Box)({
  margin: "10px 0 0",
  "& .MuiInputBase-root": {
    borderRadius: "50px",
    borderColor: "#EAEAEA",
  },
});

export const DStyledTextarea = styled(TextareaAutosize)({
  resize: "none",
  border: "none", // remove the native textarea border
  minWidth: 0, // remove the native textarea width
  outline: 0, // remove the native textarea outline
  padding: 0, // remove the native textarea padding
  paddingInlineEnd: `var(--Textarea-paddingInline)`,
  flex: "auto",
  alignSelf: "stretch",
  color: "inherit",
  backgroundColor: "transparent",
  fontSize: "13px",
  lineHeight: "inherit",
  fontFamily: "Open Sans !important",
  height: "32px !important",
  "&::placeholder": {
    opacity: 0,
    transition: "0.1s ease-out",
  },
  "&:focus::placeholder": {
    opacity: 1,
    fontSize: "13px",
  },
  // specific to TextareaAutosize, cannot use '&:focus ~ label'
  "&:focus + textarea + label, &:not(:placeholder-shown) + textarea + label": {
    top: "0.5rem",
    fontSize: "11px",
    fontFamily: "Open Sans !important",
    background: "#fff !important",
    zIndex: 1,
    boxShadow: "none !important",
  },
  "&:focus + textarea + label": {
    color: "#00000099",
    top: "-6px",
  },
  "& JoyTextarea-root:focus-within::before": { boxShadow: "none" },
});

export const OverViewFields = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 6,
  "& .MuiInputBase-root:hover fieldset": {
    border: "none",
  },
  "@media screen and (max-width: 1700px)": {
    display: "block",
  }
});

export const SocialMediaFields = styled(Box)({
});
export const SocialMediaFInn = styled(Box)({
  display: "flex",
  gap: "6px",
  "& i": {
    margin: "4px 0 0"
  },
  "& .icon-x-social:before": {
    color: "#000",
    fontSize: "11px"
  }
});
export const AddButtonArea = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "100%"
});

export const SocialInffo = styled(Box)({
});
export const SocialIconLabel = styled(Typography)({
  color: "#231F20",
  fontSize: "13px"
});
export const SocialIconValue = styled(Typography)({
  color: "#231F20",
  fontSize: "11px",
  wordBreak: "break-all",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box",
});

export const SocialContactsAddMore = styled(Typography)({
  "& .MuiFormLabel-root": {
    fontSize: "12px"
  },
  "& svg": {
    fontSize: "16px"
  }
});

export const OuverViewCoulms = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: 12,
  },
  // "& .MuiInputBase-root": {
  //   width: "100%"
  // }
});
export const OverViewTxt = styled(Typography)({});

export const DetalFieldContainer = styled(FormControl)({
  color: "#D7282F",
  "&. MuiFilledInput-root": { fontSize: "20px" },
  "& .MuiInputBase-input": { padding: "0px !important", color: "#103DDA", fontSize: "12px", },
  "& svg": { fontSize: "12px", color: "#004CBF" },
  "& .MuiMenuItem-root": { fontSize: "10px" },
  "& fieldset": { border: "none" },
});
export const SelectOption = styled(Select)({
  width: "78px",
  "& .MuiMenuItem-root": { fontSize: "12px", padding: "3px 10px" },
  "& .mui-v4u5dn-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
  {
    borderBottom: "none",
  },
});

export const TopActivityArea = styled(Box)({
  // margin: "16px 0 14px",
});
export const OverviewHead = styled(Typography)({
  fontSize: "14px",
  color: "#393939",
  fontWeight: 600,
  padding: "0 0 5px",
});

export const ActivityCol = styled(Box)({
  border: "1px solid #F2F2F2",
  borderRadius: "4px",
  padding: "10px",
  // width: "50%",
  display: "flex",
  justifyContent: "space-between",
  "& svg": {
    color: "#ababab",
    padding: "0 5px 0 0",
  },
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#4a4a4a",
    margin: "0 0 5px",
    fontWeight: 600,
  },
});
export const ActivityIcon = styled(Box)({
  display: "flex",
  "& i": {
    padding: "2px 7px 0 0",
    fontSize: "18px"
  }
});


export const ActivityProgress = styled(Box)({
  "& span": {
    color: "#D7282F",
    fontWeight: 600,
    padding: "0 5px 0 0",
  },
});
export const ActivityColBoth = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 8,

});
export const UserProgressBar = styled(Box)({
  display: "grid",
  gap: 12,
  margin: "16px 0 0",
  "& .MuiTypography-root": {
    fontSize: 12,
    color: "#231F20",
  },
  "& span": {
    fontWeight: 600,
  },

});

export const PagevisitArea = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  "@media screen and (max-width: 1700px)": {
    display: "block"
  }
});
export const PageVisitCol = styled(Box)({
  borderLeft: "4px solid #D7282F",
  "& .MuiTypography-root": {
    padding: "0 0 0 10px",
    fontSize: 13,
    fontWeight: 400,
  },
  "& span": {
    fontWeight: 600,
  },
});

export const InsightColmn = styled(Box)({
  borderLeft: "1px solid #EAEAEA",
  "& .MuiTypography-root": {
    padding: "0 0 0 5px",
    fontSize: 11,
    fontWeight: 400,
    position: "relative",
  },
  "& span": {
    fontWeight: 600,
  },
  position: "relative",
  "&:before": {
    width: "2px",
    height: "16px",
    content: '" "',
    position: "absolute",
    left: 0,
    top: 0,
    display: "inline-block",
    zIndex: "1",
    backgroundColor: "#D7282F",
    transition: "all ease .5s",
  },
  "@media screen and (max-width: 1700px)": {
    width: "50%",
    display: "inline-block",
    margin: "0 0 15px"
  }
});
export const PersonDetailData = styled(Box)({
  position: "sticky",
  top: 80,
  display: "block",
  "@media screen and (max-width: 1200px)": {
    display: "none",
  }
});
export const DetailRight = styled(Box)({
  border: "1px solid #E0E3E7",
  // padding: "8px 16px",
  padding: "8px 8px",
  position: "relative",
  height: "100%",
  transition: 'all ease .5s',
  "& .detailtoptabs": {
    borderBottom: "1px solid #e5e5e5"
  },
  "@media screen and (max-width: 1600px)": {
    // padding: "8px 5px",
  },
  "@media screen and (max-width: 767px)": {
    "& .detailtoptabs": {
      "& .MuiTabScrollButton-root": {
        display: "none"
      }
    }
  },


});
export const LeadViewFormData = styled(Box)({
  border: "1px solid #E2E2E2",
  padding: 8,
  borderRadius: 5,
  margin: "1rem 0",
  "@media screen and (max-width: 1600px)": {
    // border: "none",
    padding: 0
  },
});
export const LeadViewformContent = styled(Box)({
  margin: "10px 0 0"
});
export const LeadViewInner = styled(Box)({
  "& .infotextarea": {
    "& .leadrow": {
      border: "none",
      maxHeight: "fit-content",
      padding: "0 55px 0 0",
      "& .hovericons": { top: 14 },
      "@media screen and (max-width:767px)": {
        padding: 0
      },
    }
  }
});
export const LeadInfoRow = styled(Box)({
  borderBottom: "1px solid #DDDDDD",
  position: "relative",
  // padding: "0 0 6px",
  // minHeight: "40px",
  padding: "0px 0 12px",
  "@media screen and (max-width:900px)": {
    minHeight: "55px",
    padding: 0
  },
  height: "100%",
  "& svg": {
    cursor: "pointer",
    fontSize: "17px",
  },
  "& .hovericons": {
    display: "none"
  },
  "&:hover .hovericons": {
    display: "block"
  },
  "& .textareaButtons": {
    top: "25px"
  },
  "& .onlydatepicker": {
    "& .MuiFormHelperText-root": {
      display: "none"
    }
  },
  "& .MuiCheckbox-root": {
    padding: 0
  }
});
export const GridField = styled(Grid)({
  paddingTop: "13px"
});
export const ModeEdit = styled(ModeEditOutlineOutlinedIcon)({
  position: "absolute",
  right: -5,
  top: "36%",
  transform: "translate(-50%,-50%)",
  border: "1px solid #d6d9de",
  width: "18px",
  height: "18px",
  fontSize: "18px",
  borderRadius: '4px',
  padding: 2,
  transition: "all 0.5s",
  "@media screen and (max-width:1600px)": {
    width: "16px",
    height: "16px",
  },

  "@media screen and (max-width:899px)": {
    top: 10
  }
});
export const EditFields = styled("div")({
  position: "absolute",
  right: -15,
  top: "36%",
  transform: "translate(-50%,-50%)",
  display: "flex",
  alignItems: "center",
  transition: "all 0.5s",
  "@media screen and (max-width: 899px)": {
    top: 10,
    position: "absolute",
    right: -15,
    transform: "translate(-50%,-50%)",
  },
  "& span": {
    display: "flex",
    gap: "3px",
  },
  "& svg": {
    border: "1px solid #d6d9de",
    width: "18px",
    height: "18px",
    fontSize: "18px",
    borderRadius: '4px',
    padding: 2,
    pointerEvents: "inherit",
    "& .social-icon1": {
      transform: "scale(1)",
      transitionDelay: "210ms",
    },
    "& .social-icon2": {
      transform: "scale(1)",
      transitionDelay: "180ms",
    },
    "@media screen and (max-width:1600px)": {
      width: "16px",
      height: "16px",
    },
  }
});

// export const ModeEdit = styled(ModeEditOutlineOutlinedIcon)({
//   position: "absolute",
//   right: 10,
//   top: "5",
//   border:"1px solid #d6d9de",
//   width:"22px",
//   height:"22px",
//   borderRadius:'4px',
//   padding:3
// });

export const InputFieldName = styled("span")({
  fontSize: 14,
  fontWeight: 600,
  color: "#223354",
  opacity: "50%",
  "@media screen and (max-width: 1600px)": {
    fontSize: 13,
  }
});
export const InputFieldValue = styled("span")({
  fontSize: 13,
  fontWeight: 400,
  wordBreak: "break-all",
  padding: "3px 0 0",
  "& .showmorelink": {
    color: "#d7282f",
    padding: "0 0px 0 6px"
  }
});
export const LeadInfoIconData = styled("span")({
  display: "flex",
  justifyContent: "space-between",
  // paddingRight: "40px",
  // height: "30px",

  "@media screen and (max-width: 767px)": {
    margin: "0px 0 10px",
  },
  "& .MuiInputBase-input": { padding: "10px 14px", fontSize: "13px" },
});
export const EditableBox = styled("div")({
  width: "80%",
  // margin: "-4px 0 0",
  "& .countryinfofield": {
    "& .MuiAutocomplete-root": {
      padding: "0 5px"
    }
  },
  '& .MuiFormControl-root': { width: "100%" },
  "& .MuiInputBase-root": {
    paddingTop: "0 !important", paddingBottom: "0 !important", width: "100%", fontSize: "12px", paddingLeft: "10px !important",
  },
  "& div .MuiInputBase-input": { /*padding: "7px 0!important",*/ paddingLeft: "0", paddingTop: "2px", paddingBottom: 0, fontSize: "13px" },
  // "& .MuiAutocomplete-endAdornment": {
  //   top: "calc(50% - 40%)"
  // },
  "@media screen and (max-width: 899px)": {
    width: "100%",
  },

  "@media screen and (max-width: 767px)": {
    width: "100%",
    margin: "0px 0 10px",
  },
  transition: "opacity 0.2s ease-out",
});



export const PrefixEditableBox = styled("div")({
  width: "80%",
  "& .Prefixbothfield": {
    height: "30px",
    // "& .MuiOutlinedInput-input": {
    //   padding: "0 !important"
    // }
  },
  "& .leadinfoEditablefield": {
    height: "29px"
  },
  "&:hover svg": {
    display: "block !important"
  },
  "& .MuiInputBase-input": {
    padding: "0 !important"
  }
});
export const ImageEdit = styled("img")({
  position: "absolute",
  right: 10,
  top: "22px",
  cursor: "pointer",
});

export const LeadViewFormrow = styled(Stack)({
  padding: "10px 10px 30px",
});

export const TabsStyleindicator = {
  "&:hover": {
    backgroundColor: "transparnt",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#D7282F",
    bottom: 0,
    color: "#D7282F !important",
    height: "1.5px",
  },
  "& .MuiTab-root": {
    textTransform: "capitalize",
    fontSize: "14px",
    // margin: "-2px 0 0",
    color: "#333333",
    minHeight: "50px",
    minWidth: "100px",
    "& svg": { margin: "0 3px", fontSize: 19 },
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    zIndex: 1,
    "& svg": { color: "#D7282F" },
  },

  "& .MuiTabs-flexContainer": {
    alignItems: "center",
    // borderBottom: "1px solid #e5e5e5",
  },
  ".icon-leadsblack:before": {
    color: "inherit"
  },
  "@media screen and (max-width: 900px)": {
    "& .MuiTabs-scroller": {
      background: "#f3f3f3",
      borderRadius: "50px"
    },
    "& .MuiTabs-indicator": {
      border: "none",
      background: "#fff",
      boxShadow: "0px 3px 3px rgba(150, 150, 150, 0.25)",
      borderRadius: "50px",
      height: "36px",
      minHeight: "36px",
      color: "#fff",
      position: "absolute",
      top: 6
    }
  },
  "& .MuiTabs-scroller": {
    // borderBottom: "1px solid #e5e5e5",
    // margin: "0 10px"
  },
  "& .MuiButtonBase-root:hover": { color: "#d7282f" },
  "& .MuiTabs-scrollButtons": {
    width: 10,
    margin: "0 5px",
    "& svg": {
      background: "#ddd",
      borderRadius: "50px"
    }
  },
  "& .MuiTabs-root": { overflow: "visible" }
};
export const ButtonContainer = styled(Box)({
  display: "flex",
  gap: 5,
  alignItems: "center",
  justifyContent: "end",
  height: "100%",
  "@media screen and (max-width: 899px)": {
    gap: 3,
    justifyContent: "start",
    paddingBottom: "1rem"
  },
  "@media screen and (max-width: 767px)": {
    // display: "block",
    alignItems: "baseline"
  },
  "& button": {
    "@media screen and (max-width: 767px)": {
      margin: "0 4px 5px 0",
    }
  }
});
export const InnerButtonArea = styled("div")({
  display: "flex",
  gap: 5,
  "@media screen and (max-width: 600px)": {
    display: "block",
    background: "#f7f7f7",
    padding: "10px",
    borderRadius: "4px"
  }
});

export const LinerProgressbar = {
  "&.MuiLinearProgress-root": {
    backgroundColor: "#E5E5E5",
  },
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "#D7282F !Important",
  },
};
export const ToolTipBox = styled(Box)({
  // background: "#E9E9E9",
  borderRadius: 4,
  "& .MuiTypography-root": {
    fontSize: 11,
    fontWeight: 400,
    color: "#fff",
  },
  "& span": {
    fontWeight: 600,
  },
});

export const TooltipStyle = styled(Tooltip)({
  "&.MuiTooltip-tooltip": {
    backgroundColor: "#EDEEEF!important",
  },
});
export const TopNextPreBar = styled("div")({
  background: "#D7282F0F",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 10px",
  "& svg": {
    color: "#d7282f",
  },
});
export const TopButtonCol = styled("div")({
  gap: "10px",
  display: "flex",
  "& button": {
    color: "#d7282f",
    minWidth: "50px",
    padding: "0 12px",
    border: "none",
    textTransform: "capitalize",
  },
  "& button:hover": {
    border: "none",
  },
});
export const PersonDetalDrrawer = styled(Drawer)({
  "& .MuiPaper-root": {
    width: "60%"
  },
  "@media screen and (max-width:500px)": {
    "& .MuiPaper-root": {
      width: "90%"
    }
  }
});
export const LeadInfoCalenderBpx = styled(Box)({
  "& .datetimecommon .MuiFormControl-root": {
    minWidth: "80% !important",
    width: "80%"
  },
});
export const LeadBoxBothfield = styled(Box)({
  border: "1px solid #BBBBBB",
  borderRadius: "4px",
  height: "30px",
  "& fieldset": { border: "none" },
  "& label": {
    background: "#fff",
    padding: "0 7px",
    overflow: "inherit",
    maxWidth: "100%",
  },
  "& .MuiOutlinedInput-input": {
    paddingRight: "20px !important",
    paddingLeft: "0",
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
  "& svg": {
    right: 0
  }
});
export const EditLayoutContainer = styled(Box)({
  display: "flex",
  gap: 6,
  alignItems: "center",
  padding: "0 0 0 30px",
  "@media screen and (max-width: 767px)": {
    // padding: "7px 0 0",
  },
  "& .btnedittag": {
    "&:hover": {
      background: "transparent"
    }
  },
  "& .hovericons": {
    visibility: "hidden"
  },
  "&:hover .hovericons": {
    visibility: "visible"
  },
});
export const EditAddTagLayoutInner = styled(Box)({
  display: "flex",
  gap: 6,
  alignItems: "center",
  // padding: "10px 0 0",
  margin: "-5px 0 0",
  "& .leadrow": {
    border: "none",
    padding: 0,
    minHeight: "max-content"
  },
  "& .createtagstxt": {
    fontSize: "15px",
    fontWeight: 600,
    "@media screen and (max-width: 767px)": {
      fontSize: "13px"
    }
  },
  "& a": {
    color: "#231F20"
  }
});
export const IconStyling = styled(Box)({
  // border: "1px solid #d6d9de",
  // width: "25px",
  // height: "25px",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export const EditCustomChip: any = styled("span")(({ value, text }: any) => ({
  background: value ? value : "#F7FFC9",
  // border: text ? `1px solid ${text}` : "1px solid #92AA12",
  color: text ? text : "#92AA12",
  fontSize: "12px",
  padding: "2px 6px",
  borderRadius: "0 30px 30px 0",
  fontWeight: 400,
  margin: "0 1px"
}));
export const DetailTagPopOver = styled(Popover)({
  "& .MuiPaper-root": {
    width: "400px",
    boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
    position: "relative",
    top: "180px !important",
    "& .closetagbtn": {
      position: "absolute",
      right: 5,
      top: 2,
      zIndex: "10",
      fontSize: 14
    }
  },
  "& .colorpicbox": {
    display: "grid",
    gap: 5,
  },
  "& .MuiInputBase-input": {
    padding: "4px !important"
  },
  "& .tagchip .labelName": {
    padding: 5,
    fontSize: "12px",

  },
  "& .chipActions": {
    margin: "-17px 0 0 0 !important",
    "& svg": {
      fontSize: "14px",
    }
  }
});
export const DetailTagPopOverInner = styled(Box)({
  // padding: "15px 0"
  padding: "0 0 10px"
});
export const NewAccountAdd = styled(Box)({
  "& .MuiTypography-root": {
    background: "#d7282f",
    borderRadius: "50px",
    color: "#fff",
    padding: "0 8px",
    fontSize: "12px",
    cursor: "pointer"
  },
});



/********============== End Lead Info styling =============******/

/********============== Start Enquiry Detail tab styling =============******/
export const EnquiryDetailData = styled(Box)({
  // display: "flex",
  // gap: 10,
  alignItems: "center",
  padding: "1rem 0px",
  width: "100%",
  "& .labeltext": {
    background: "#F5D5D6",
    color: "#D7282F",
    padding: "2px 8px",
    borderRadius: "50px",
    fontWeight: 600,
    margin: "2px 0 0",
    display: "inline-block",
    fontSize: "12px"
  }
});

export const DetailTopButtons = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#D7282F",
    fontWeight: 600,
  },
  "@media screen and (max-width: 767px)": {
    display: "block",
  }
});
export const ProductNameBox = styled(Box)({});
export const ProductTitle = styled(Typography)({
  color: "#006FBF",
  fontSize: 15,
  fontWeight: 600,
  lineHeight: "normal",
  padding: "5px 0",
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    cursor: "pointer"
  },
  "@media screen and (max-width: 767px)": {
    fontSize: 14,
  }
});

export const ProductBoxLeft = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  gap: 10,
  fontSize: "16px !important",
  color: "#4A4A4A",
});

export const ProDuctTypeRow = styled(Box)({
  display: "contents",
  justifyContent: "flex-start",
  gap: 10,
  // "& .MuiTypography-root": {
  //   color:"#4A4A4A"
  // },
  "@media screen and (max-width: 767px)": {
    gap: 5,
    "& .MuiTypography-root": {
      fontSize: "14px",
    }
  },

});
export const BoxAccordianInner = styled(Box)({
  // margin: "0 0 15px",
  // borderRadius: "8px"
});
export const CategoryName = styled(Typography)({
  fontSize: 12,
  "& span": {
    color: "#006FBF",
  },
});
export const ColorBoxValue = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
});
export const RedboxValue = styled("div")({
  background: "#FFE8EC",
  padding: "1px 4px",
  borderRadius: "4px",
  cursor: "pointer",
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#D7282F",
    fontWeight: 600,
  },
  "@media screen and (max-width: 767px)": {
    "& .MuiTypography-root": {
      fontSize: 12,
    }
  }
});


export const ProductIDSection = styled("div")({
  display: "flex",
  alignItems: "center"
});

export const GreenboxValue = styled("span")({
  background: "#E2F7DD",
  padding: "1px 4px",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "7px",
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#57874B",
    fontWeight: 600,
    display: "table-row",

  },
  "& .smallgreenbox": {
    "& .MuiTypography-root": {
      fontSize: 12,
    },
  }
});
export const GreenboxValuesmall = styled("div")({
  background: "#E2F7DD",
  padding: "1px 4px",
  borderRadius: "4px",
  cursor: "pointer",
  "& .MuiTypography-root": {
    fontSize: 10,
    color: "#57874B",
    fontWeight: 600,
  },
});
export const ProductBoxRight = styled(Box)({
  textAlign: "right",
  float: "right",
  display: "flex",
  alignItems: 'center',
  justifyContent: "space-between",
  gap: "16px"
});
export const LocationDiv = styled(Box)({
  // borderRight: "1px solid #C1BEBE",
  padding: "0 20px 0 7px",
});
export const EDetailButtons = styled(Box)({
  display: "flex",
  gap: 10,
  "@media screen and (max-width: 767px)": {
    display: "grid"
  }
});

export const CountryName = styled(Typography)({
  color: "#4A4A4A",
  fontSize: 16,
  fontWeight: 600,
});
export const DateAndTime = styled(Typography)({
  fontSize: 12,
  color: "#4A4A4A",

  "& svg": {
    fontSize: 15,
    color: "#223354",
    opacity: "50%",
    margin: "0px 5px -3px",
  },
});
export const ProductEnquiryData = styled(Box)({});
// export const InfoButtonContainer = styled(Box)({
//   display: "flex",
//   justifyContent: "end",
//   gap: 10,
//   margin: "0 0 1rem",
//   "@media screen and (max-width: 767px)": {
//     justifyContent: "flex-start",
//     padding: "10px 0 0",
//   }
// });
export const ProductBgInfo = styled(Box)({
  background: "#F5F5F5",
  // borderRadius: "12px 12px 0 0",
  width: "100%",
  padding: 8,
  "@media screen and (max-width: 767px)": {
    padding: "7px"
  }
});
export const TopData = styled(Box)({
  display: "inline-flex",
  justifyContent: "space-between",
  // padding: 16,
  padding: 0,
  alignItems: "center",
  "& .MuiTypography-root": {
    fontSize: 15,
    fontWeight: 600,
  },
  "& p": {
    fontSize: 14,
    fontWeight: 600,
  },
  "@media screen and (max-width: 767px)": {
    "& .MuiTypography-root": {
      fontSize: 14,
    }
  }
});
export const ProductDetailtable = styled("div")({
  padding: "0 16px 16px",
  '& .MuiTable-root': {
    '& .MuiTableHead-root': {
      backgroundColor: '#F5F5F5',
      '& .MuiTableCell-root': {
        whiteSpace: 'nowrap',
        padding: '12px 8px',
        fontWeight: '600',
        fontSize: '13px',
        // '&:last-child': {
        //   position: 'sticky',
        //   right: '0',
        //   backgroundColor: '#fbfbfb',
        //   zIndex: '2',
        //   textAlign: 'center',
        //   // background:"#fbfbfb"
        // },
      },
    },
    '& .MuiTableBody-root': {
      '& .MuiTableCell-root': {
        padding: '10px 8px',
        // '&:last-child': {
        //   position: 'sticky',
        //   right: '0',
        //   backgroundColor: '#fbfbfb',
        //   zIndex: '2',
        //   textAlign: 'center',
        //   // boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        // },
        '& .MuiSvgIcon-root': {
          fontSize: '20px',
          color: '#6c6c6c',
        },
      },
      '& .MuiFormControl-root': {
        width: '190px',
        '& .MuiFormLabel-root': {
          fontSize: '13px',
          '&.Mui-focused': {
            transform: 'translate(14px, -9px) scale(0.85)',
          },
        },
      },
    },
  },
});
export const UnitPriceContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  margin: "10px 0 0",
  "@media screen and (max-width: 600px)": {
    display: "grid"
  }
});
export const UnitPriceBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
});

export const UnitPrice = styled("div")({
  background: "#EEEEEE",
  borderRadius: 4,
  padding: "6px 15px",
  fontSize: 14,
  fontWeight: 600,
  color: "#231F20",
});
export const UnitPriceValue = styled("div")({
  background: "#EEEEEE",
  borderRadius: 4,
  padding: "6px 15px",
  fontWeight: 400,
  fontSize: 14,
  color: "#231F20",
});
export const AdditionalDetail = styled(Box)({
  border: "1px solid #D2D2D2",
  borderRadius: 4,
  padding: "16px 14px",
  marginTop: "10px",
  "& .coloredtext": {
    fontWeight: 600,
    color: "#D7282F"
  }
});
export const AdditionalTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 600,
  color: "#231F20",
  padding: "0px 0 10px",
});
export const EnquiryAddproduct = {
  "& .MuiPaper-root": {
    width: "1400px",
    maxWidth: "1400px",
  },
};
export const ButtonSimple = styled(Button)({
  background: "#DBE8F9",
  color: "#355F97",
  fontSize: "13px",
  boxShadow: "none !important",
  border: "1px solid inherit",
  textTransform: "capitalize",
  "&:hover": {
    background: "#c2d3eb",
  },
});
export const ButtonByOrder = styled(Button)({
  background: "#E7E7E7",
  color: "#3A3A3A",
  fontSize: "13px",
  boxShadow: "none !important",
  border: "1px solid inherit",
  textTransform: "capitalize",
  "&:hover": {
    background: "#d3d3d3",
  },
});
export const ButtonQuantity = styled(Button)({
  background: "#ECFBE6",
  color: "#3BB900",
  fontSize: "13px",
  boxShadow: "none !important",
  border: "1px solid #DFF2D7",
  textTransform: "capitalize",
  "&:hover": {
    background: "#e3ffd8",
  },
});
/****=========== Start Enquiry detail new c=design changes ========****/
export const AddSpecification = styled(Button)({
  background: "#D7282F",
  textTransform: "capitalize",
  padding: "3px 10px",
  fontSize: "13px",
  margin: "0 1rem 1rem",
  "&:hover": {
    background: "#b02329",
  },
  "& svg": {
    fontSize: "19px"
  }
});
export const StyledTable = styled(TableContainer)({
  border: "1px solid #D2D2D2",
  borderRadius: "4px",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  "& .MuiTableCell-root": { fontFamily: "Open Sans !important", fontSize: "13px", textAlign: "center" },
  "& .MuiTableCell-head": { fontWeight: 600 }
});
export const BoldCell = styled('span')({
  fontWeight: 600
});
export const ProductInnerInfo = styled(Box)({
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "12px"
  }
});
export const RelatedLabel = styled(Typography)({
  fontWeight: 600
});
export const LocationBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  background: "#FFF1F2",
  padding: "1rem",
  borderRadius: "0 0 10px 10px",
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "12px"
  }
});
export const RightSection = styled(Box)({
  // float: "right",
  // width: "50%",

});
export const AccordionContent = styled(Box)({
  // border: "1px solid #D2D2D2",
  // borderRadius: "10px",
  // marginBottom: "10px"
});
export const OuterContentAccor = styled(Box)({
  // margin: "0 10px"
});
export const MultipleButton = styled(Box)({
  display: "flex",
  gap: "5px"
});
export const TotalProductCount = styled(Box)({
  justifyContent: "right",
  display: "flex",
  "& .totaldivider": {
    margin: "10px 0"
  }
});
export const TotalProductBox = styled(Box)({
  border: "1px solid #DCDCDC",
  borderRadius: 10,
  padding: "16px 14px",
  marginTop: "10px",
  background: "#FBFBFB",
  width: "300px",
  "& .MuiTypography-root": {
    color: "#4a4a4a",
    fontSize: "13px",
  },

});
export const ProductRow = styled(Box)({
  justifyContent: "right",
  display: "flex",
  gap: "10px",
  marginBottom: "8px",
  "& .Countbox": {
    background: "#f1f1f1",
    border: "1px solid #C5C5C5",
    minWidth: "150px",
    borderRadius: "5px",
    color: "#333",
    fontSize: "14px",
    fontWeight: 400,
    paddingRight: "10px",
    textAlign: "right"
  }
});
export const GrandTotalRow = styled(Box)({
  justifyContent: "space-between",
  display: "flex",
  gap: "10px",
  "& .MuiTypography-root": {
    color: "#4a4a4a",
    fontWeight: 600,
  }
});
export const EnquiryDetailSearchOuter = styled(Box)({
  justifyContent: "right",
  display: "flex",
});
export const EnquiryDetailSearch = styled(Box)({
  margin: "0 0 1rem",
  position: "relative",
  "& .MuiInputBase-root": {
    width: "285px"
  }
});

export const SearchWithButton = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: 'pointer',
  marginRight: '6px',
  gap: 10,
  '&:hover': {
    '& .MuiSvgIcon-root': {
      color: '#D7282F',
    },
  },
  "& .enquirysearch": {
    margin: 0
  }
});
export const CancelButton = styled(Button)({
  borderRadius: "3px",
  border: "1px solid #d7282f",
  background: "transparent",
  color: "#d7282f",
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
});

export const NoProductList = styled(Box)({
  padding: "6px 10px 0",
  textAlign: "center",
  "& .MuiTypography-root": {
    color: "#4a4a4a",
    fontWeight: 600,
    fontSize: "14px",
  }
});

export const ExpandedList = styled(Box)({
  border: "1px solid #CDCDCD",
  borderRadius: "0",
  margin: "-1px 0 1rem",
  width: "285px",
  height: "300px",
  overflowY: "auto",
  position: "absolute",
  zIndex: 1,
  background: "#fff",
  "& .MuiList-root": {
    padding: 0
  },
  "& .MuiListItemIcon-root": {
    minWidth: "auto",
    width: "30px",
    margin: "0 10px 0 0px",
    "& img": {
      borderRadius: "50%"
    }
  },
  "& .MuiTypography-root": {
    fontSize: "12px",
    fontWeight: 600,
    color: "#231F20"
  },
  "& .producttype": {
    borderRadius: "50px",
    padding: "1px 11px",
    lineHeight: "27px",
  },
  "& .productsimple": {
    background: "#E2F7DD",
    color: "#57874B",

  },
  "& .productconfig": {
    background: "#FFF3F3",
    color: "#D7282F"
  },
  "& .MuiButtonBase-root": {
    padding: "5px 10px 0"
  }
});

export const ImageProduct = styled(Box)({
  width: "40px",
  height: "40px",
  "& img": {
    width: "100%",
    height: "100%",
    borderRadius: "50px",
  }
});
export const HeadingInfo = styled(Box)({
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "12px"
  },
  "& .myproductname": {
    fontSize: "14px",
    fontWeight: 600
  },
  "& .pricetyype": {
    background: "#E2F7DD",
    color: "#57874B"
  },

});
export const DialogProductInfo = styled(Box)({
  display: "flex",
  gap: 10,
  alignItems: "center",
});

export const EditProductTable = {
  "& .MuiPaper-root": {
    width: "1000px",
    maxWidth: "1000px",
    "& .MuiDialogTitle-root": {
      background: "#f5f5f5",
      padding: "20px 10px"
    }
  },
};
export const EditPopupContent = styled(Box)({
});
export const SpecificationScrollBox = styled(Box)({
  // height: "300px",
  overflowY: "auto",
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

export const SpecificationCol = styled(Box)({
  borderLeft: "2px solid #D2D2D2",
  "& .MuiTypography-root": {
    fontSize: "12px",
    color: "#231F20",
    padding: "0 0 0 8px"
  },
  "& .speciheading": {
    fontWeight: 600,
    borderLeft: "2px solid #d7282f",
    margin: "0 0 0 -1px",
  }
});
export const QtyContainer = styled(Box)({
  display: "flex",
  borderTop: "1px solid #dddddd",
  height: "16px",
  margin: "45px 0 30px",
  position: "relative",
  "& .MuiTypography-body1": {
    fontSize: "14px",
    marginRight: "8px",
    color: "#000000",
  },
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
export const SimpleQuantityCompo = styled(Box)({
  "& .simplqtybox": {
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
  }
});
export const EnquiryTableOuter = styled(Box)({
  background: "rgb(252, 252, 252)",
  borderRadius: "8px",
  border: '1px solid #DDDDDD',
  overflow: "hidden",
  backgroundColor: '#FCFCFC',
  '& .MuiPaper-root': {
    boxShadow: 'none',
    width: "100%",
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#d2d2d2',
      borderRadius: '10px',
      '&:hover': {
        background: '#6d6d6d',
      },
    },
    '& .MuiTable-root': {
      '& .MuiTableHead-root': {
        backgroundColor: '#F8F8F8',
        '& .MuiTableCell-root': {
          whiteSpace: 'nowrap',
          padding: '12px 8px',
          fontWeight: '600',
          fontSize: '13px',
          '&:last-child': {
            position: 'sticky',
            right: '0',
            backgroundColor: '#fbfbfb',
            zIndex: '2',
            textAlign: 'center',
          },
        },
      },
      '& .MuiTableBody-root': {
        '& .MuiTableCell-root': {
          padding: '15px 8px',
          fontSize: '13px',
          fontFamily: "Open Sans",
          '&:last-child': {
            position: 'sticky',
            right: '0',
            backgroundColor: '#fbfbfb',
            zIndex: '2',
            textAlign: 'center',
            gap: 10,
            display: "flex",
            justifyContent: "center",
            borderBottom: "none",
            '& .MuiSvgIcon-root': {
              fontSize: '15px',
              color: '#6c6c6c',
            },
          },
          // '& .MuiSvgIcon-root': {
          //   fontSize: '20px',
          //   color: '#6c6c6c',
          // },
        },
        '& .MuiFormControl-root': {
          width: '190px',
          '& .MuiFormLabel-root': {
            fontSize: '13px',
            '&.Mui-focused': {
              transform: 'translate(14px, -9px) scale(0.85)',
            },
          },
        },
      },
    },
  },
  '& .MuiButton-textPrimary': {
    color: '#D7282F',
    fontSize: '13px',
    textTransform: 'capitalize',
    margin: '3px 0',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#b31118',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '17px',
      marginRight: '4px',
    },
  },
});
export const EnquiryTable = styled(Box)({
});
export const AddButtonEnquiry = styled(Box)({
  "& .AddSpecenquiry": {
    margin: "8px 8px 15px"
  },
  "& button": {
    background: "transparent !important",
    color: "#d7282f",
    boxShadow: "none !important",
    "&:hover": {
      textDecoration: "underline"
    }
  },
});

export const EditModeProductTitle = styled(Box)({
  padding: "10px",
  background: "#ffedee",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: 0,
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
})

export const EditModeProductContent = styled(Box)({
  padding: "2rem 1rem"
});
export const ButtonActionInfo = styled(Box)({
  display: "flex",
  justifyContent: "right",
  gap: 10,
  // background:"#f5f5f5",
  padding: "10px"
});
export const EditSwipeableDrawerStyle = styled(SwipeableDrawer)({
  "@media (max-width:900px)": {
    "& .MuiPaper-root": {
      width: "95%"
    }
  }
});
export const EditDrawerPanel = styled(Box)({
  width: "800px",
  "@media (max-width:900px)": {
    width: "100%"
  }
});

/********============== Start Sketeton css =============******/
export const SkeletonBox = styled(Box)({});
/********============== End Sketeton css =============******/

/**===== New UI Updation =====**/
export const ProductTypeOption = styled(Box)({

});
export const MainRightData = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%"
});
export const PTypeImage = styled("span")({
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
  "& .MuiTypography-body1": {
    margin: "2px 0 0 20px",
    fontWeight: 600,
    textTransform: "capitalize",
    position: "relative",
    top: "-3px",
    fontSize: "12px",
    color: "#fff"
  },
});
export const ProductFeatureSection = styled(Box)({
  background: "#F3F9FF",
  padding: "18px 10px 10px",
  margin: "10px 0",
});
export const SpecificationHeading = styled(Typography)({
  fontSize: "14px",
  color: "#231F20",
  fontWeight: 600,
});
export const BrandBoxStyle = styled(Box)({
  "& .MuiTypography-h6": {
    fontSize: "12px",
    color: "#4A4A4A !important",
    fontWeight: "normal",
  },
  "& .MuiTypography-body1": {
    fontSize: "16px",
    color: "#D7282F !important",
    fontWeight: "600",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    "@media (max-width: 1600px)": {
      fontSize: "16px",
    },
    "@media (max-width: 800px)": {
      fontSize: "13px",
    },
  },
});

export const FeatureOpt = styled(Box)({
  display: "flex",
  "& .MuiTypography-h6": {
    fontSize: "12px",
    color: "#4A4A4A",
    fontWeight: "normal",
    textTransform: 'capitalize'
  },
  "& .MuiTypography-body1": {
    fontSize: "16px",
    color: "#000000",
    fontWeight: "600",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "@media (max-width: 767px)": {
      fontSize: "14px",
    },
  },
  "& .view_more_opt": {
    color: "#d7282f",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "none"
    }
  }
});
export const InnerOpt = styled(Box)({
  borderLeft: "1px solid #BDBDBD",
  paddingLeft: "10px"
});
export const DataProductTypeData1 = styled(Box)({
  background: "#F4F6FA",
  padding: "6px 10px",
  margin: "2px 0 0",
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: "600",
  },
  span: {
    borderRadius: "4px",
    padding: "0px 8px",
    backgroundColor: "#fff",
    margin: "0 4px",
  },
  "& .by-orderp": {
    border: "1px solid #D7282F",
    color: "#D7282F",
  },
  "& .in-stockp": {
    border: "1px solid #34A853",
    color: "#34A853",
  },
});




export const DataProductTypeInner = styled(Box)({
  background: "#fff",
  padding: "10px",
  margin: "10px 0 0",
  borderRadius: "4px",
  "& svg": {
    fontSize: "16px"
  },
});
export const PriceQuoteColumn = styled(Box)({
});
export const PriceQuoteInfo = styled(Box)({
  border: "1px solid #dadada",
  padding: "3px 40px",
  margin: "0 6px 4px 0",
  borderRadius: "5px",
  textAlign: "center",
  "& .MuiTypography-h5": {
    fontSize: "15px",
    color: "#D82E34",
    fontWeight: 700,
  },
  "& .MuiTypography-body1": {
    fontSize: "12px",
    color: "#4A4A4A",
  },
});
export const PriceTermVlue = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "100%",
  justifyContent: "center",
  paddingLeft: "0px",
  paddingRight: "16px",
  position: "relative",
  "& .MuiSvgIcon-root": {
    fontSize: "15px",
    color: "#0AA133",
    margin: "4px 3px -3px"
  },
  "@media (max-width: 900px)": {
    right: "0",
    backgroundColor: "#f3f3f3",
    borderColor: "#e3e3e3",
  },
});


export const OverViewHeading = styled(Box)({
  background: "#EBF4FD",
  padding: "10px",
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: "600",
  },

});
export const OverViewSection = styled(Box)({
  padding: "9px 12px",
  borderBottom: "1px solid #e6e6e6",
});
export const OverViewInfo = styled(Box)({
  padding: "0 10px",
  borderLeft: "1px solid #ddd",

});
export const OverinfoLabel = styled(Typography)({
  color: "#000",
  fontSize: "12px",
});
export const OverinfoValue = styled("p")({
  color: "#000",
  fontSize: "14px",
  fontWeight: '500'
});
export const OverViewSection2 = styled(Box)({
  padding: "0",

});
export const HeadingMain = styled(Typography)({
  padding: "18px 12px",
  fontSize: "12px",
  color: "#d7282f",
  fontWeight: 600,
});


export const AddButtonSection = styled(Box)({
  margin: "7px 12px 0",
  "& span": {
    cursor: "pointer",
    border: "1px solid #d7282f",
    padding: "2px 3px",
    display: "inline-block",
    borderRadius: "4px",
    margin: "0 3px",
    transition: "all .4s ease-in",
    "&:hover": {
      background: "#d7282f",
      "& .MuiTypography-root": {
        color: "#fff",
      },
    },
    "& .MuiTypography-root": {
      fontSize: "12px",
      color: "#d7282f",
      fontWeight: 600,
    },
  }
});
export const TopRightSection = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  "& button": {
    background: "#fff",
    color: "#d7282f",
    fontSize: "13px",
    boxShadow: "none !important",
    border: "1px solid #d7282f",
    textTransform: "capitalize",
    height: "20px",
    padding: "16px 12px",
    "&:hover": {
      background: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
    },
  }
});
export const CreatedDate = styled(Box)({
  "& .MuiTypography-h6": {
    fontSize: "13px",
    color: "#231F20",
    fontWeight: 600,
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
    color: "#4A4A4A",
  },
});

export const ProductID = styled(Typography)({
  color: "#231F20",
  fontSize: 12,
  "& span": {
    fontWeight: 600
  },
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    cursor: "pointer"
  },
});
export const ProductImageBox = styled(Box)({
  width: "50px",
  height: "50px",
  minWidth: "50px",
  border: "1px solid #D2D2D2",
  padding: "5px",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%"

  }
});
export const OverViewInfoP = styled(Box)({
  // padding: "1rem",
  "& .MuiTypography-root": {
    color: "#231F20",
    // fontSize: "12px"
  }
});
export const RProductLabel = styled(Typography)({
  fontWeight: 600,
  textAlign: "right"
});
export const AmountValue = styled(Typography)({
  "& span": {
    background: "#F5D5D6",
    borderRadius: "20px",
    padding: "1px 10px",
    fontWeight: 600,
    color: "#d7282f",
    margin: 0
  }
});
export const QuantityBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  background: "#FFF1F2",
  borderTop: "1px solid #FFCED2",
  padding: "1rem",
  // borderRadius: "0 0 10px 10px",
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "12px",

  },
  "& span": {
    color: "#231F20",
    fontWeight: 600,
    fontSize: "14px",
    margin: "0 8px"
  },
  "& .MuiFormLabel-root": {
    background: "transparent"
  }
});
export const GreyBoxInfo = styled(Box)({
  background: "#F5F5F5",
  // borderRadius: "8px 8px 0 0",
  padding: "0 0 6px",
  // border: "1px solid #D2D2D2",
  margin: "0 0 10px",
  "& .customize-title": {
    padding: "10px 16px",
    fontWeight: 600
  },
  "@media screen and (max-width: 767px)": {
    padding: "7px"
  }
});
export const CustomizeInfoInn = styled(Box)({
  background: "#eaeaea",
  borderTop: "1px solid #fff",
  margin: "0 10px 10px",
  padding: "10px"
});
export const CustomizeInfosection = styled(Box)({
  background: "#fff",
  borderRadius: "4px",
  padding: "10px",
  width: "100%",
  height: "100%",
  "& .Myinfovalues": {
    borderLeft: "1px solid #ddd",
    padding: "0 20px",
    height: "100%"
  }
});
export const CustomInfoTitle = styled(Box)({
  color: "#000",
  fontSize: "14px",
  fontWeight: "600",
  padding: "4px 0px"
});
export const CustomInfoValue = styled(Box)({
  color: "#1C1C1C",
  fontSize: "13px",
  fontWeight: "600",
});
export const CustomInfoValue2 = styled(Box)({
  color: "#606060",
  fontSize: "12px",
});


export const CustomSelectedChip = styled(Box)({
  display: "block",
});
export const CountryChip = styled("span")({
  color: "#fff",
  fontSize: "12px",
  background: "#d7282f",
  borderRadius: "4px",
  padding: "2px 5px",
  margin: "0 2px 2px 0",
  display: "inline-block",
  fontWeight: "600"
});

export const DestinationPort = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "& .MuiTypography-root": {
    fontSize: "13px"
  }
});
export const DestinationPortInn = styled(Box)({
});


/********============== End Enquiry Detail tab styling =============******/



/********============== Start Activities tab styling =============******/
export const ActivityContainer = styled(Box)({});
export const ActivityHead = styled(Box)({
  background: "#FFF3F3",
  display: "flex",
  alignItems: "center",
  borderRadius: 4,
  color: "#D7282F",
  fontSize: 14,
  fontWeight: 600,
  padding: 6,
  borderBottom: "1px solid #e5e5e5",
});
export const ActivityColumn = styled(Box)({
  background: "#F6F6F6",
  border: "1px solid #e5e5e5",
  borderRadius: 4,
  "@media screen and (max-width:767px)": {
    margin: "0 0 15px"
  }
});
export const ActivityCard = styled(Card)({
  background: "#F6F6F6",
  borderRadius: 4,
  boxShadow: "none",
  "& .MuiTypography-root": {
    fontSize: "14px",
    "@media screen and (max-width: 1500px)": {
      fontSize: 11,
    },
  },
});
export const ActivityThreeColumn = styled(Box)({
  margin: "15px 0",
});

export const AvatarInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "7px 5px",
  fontWeight: 400,
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    fontSize: 14,
    wordBreak: "break-all",
    "@media screen and (max-width: 1600px)": {
      fontSize: 12,
    },
  },
});
export const InnerInfoContainer = styled("div")({
  // height: "600px",
  height: "100vh",
  overflowY: 'auto',
  minHeight: "600px",
  "@media screen and (max-width: 767px)": {
    height: "auto"
  },
});
export const InnerInfoData = styled("div")({
  padding: "12px 6px",
  background: "#fff",
  border: "1px solid #e5e5e5",
  margin: "8px 6px",
  borderRadius: 4,
  "@media screen and (max-width: 1600px)": {
    margin: "8px 6px",
    padding: "6px",
  },
});
export const ActivityDate = styled(Typography)({
  "& svg": { fontSize: 16, margin: "0px 3px -3px 0" },
});
export const StatusContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "center",
});
export const StatusLabel = styled(Box)({
  background: "#F9FFF8",
  border: "1px solid #8AAC81",
  borderRadius: "50px",
  padding: "2px 5px",
  "& .MuiTypography-root": {
    fontWeight: 600,
    color: "#4A4A4A",
    fontSize: "11px",
  },
  "& svg": { fontSize: 13, margin: "0px 3px -3px 0" },
});
export const PriorityStatus = styled(Box)({
  background: "#FFF3F3",
  border: "1px solid #FF777C",
  borderRadius: "50px",
  padding: "2px 5px",
  "& .MuiTypography-root": {
    fontWeight: 600,
    color: "#4A4A4A",
    fontSize: "11px",
    "@media screen and (max-width: 1600px)": {
      fontSize: "11px",
    },
  },
  "& svg": { fontSize: 13, margin: "0px 3px -3px 0" },
});
export const MeetingPStatus = styled(Box)({
  background: "#EDF3FF",
  border: "1px solid #CCDEFF",
  borderRadius: "50px",
  padding: "6px 10px",
  "& .MuiTypography-root": {
    fontWeight: 600,
    color: "#4A4A4A",
    fontSize: "12px",
  },
  "& svg": { fontSize: 13, margin: "0px 3px -3px 0" },
  "@media screen and (max-width: 1600px)": {
    padding: "6px 6px",
  },
});
export const OpenCallStatus = styled(Box)({
  background: "#FFF3F3",
  border: "1px solid #FFC000",
  borderRadius: "50px",
  padding: "6px 10px",
  "& .MuiTypography-root": {
    fontWeight: 600,
    color: "#4A4A4A",
    fontSize: "12px",
  },
  "& svg": { fontSize: 13, margin: "0px 3px -3px 0" },
  "@media screen and (max-width: 1600px)": {
    padding: "6px 6px",
  },
});
export const OpenCallHead = styled(Box)({
  background: "#FFF3F3",
  display: "flex",
  alignItems: "center",
  borderRadius: 4,
  color: "#FFC000",
  fontSize: 14,
  fontWeight: 600,
  padding: 6,
  borderBottom: "1px solid #e5e5e5",
});

export const PersonDetailTop = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: "5px",
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
    width: "16px",
    height: "16px",
  },
  "& .MuiButtonBase-root": {
    padding: "3px"
  }
});
export const PersonDetail = styled(Typography)({
  fontWeight: 600,
  color: "#231F20",
  fontSize: "14px",
  // whiteSpace:"nowrap", 
  // width: "90%" ,
  // overflow: "hidden",
  // textOverflow: "ellipsis", 
});

export const MeetingHead = styled(Box)({
  background: "#EDF3FF",
  display: "flex",
  alignItems: "center",
  borderRadius: 4,
  color: "#4472C4",
  fontSize: 14,
  fontWeight: 600,
  padding: 6,

  "@media screen and (max-width: 1600px)": {
    fontSize: 12,
  },
});
export const OpenCloseBtnContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 10,
  padding: "16px 0",
  "@media screen and (max-width:480px)": {
    padding: "16px 0 10px",
    gap: 5,
  },
  "& img": {
    "@media screen and (max-width:480px)": {
      width: "12px !important"
    }
  },
  "& .highlightedbtn": {
    background: "#FFECEC",
    color: "#D7282F",
    border: "1px solid #D7282F"

  }

});
export const ActivityBtnContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #e5e5e5",
  "@media screen and (max-width:480px)": {
    display: "block",
    paddingBottom: "10px"
  },
});
export const AddActivity = styled("div")({
  "& button": {
    fontSize: "13px",
    height: "32px"
  }
});
export const AddActivityForms = styled(Box)({});

/****** Start Add Task Styling here ******/
export const TabsButtonStyle = {
  "&:hover": {
    backgroundColor: "transparnt",
  },
  "& img": {
    margin: "0 !important",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#FFECEC",
    height: "30px",
    minHeight: "30px",
    borderRadius: "7px",
    top: 0,
    border: "1px solid #D7282F",
    color: "#D7282F !important",
    zIndex: 1,
  },
  "& .MuiTab-root": {
    textTransform: "capitalize",
    margin: "0px 10px 0 0",
    minHeight: "auto",
    border: "1px solid #535353",
    // padding: "10px 25px 10px 25px",
    padding: "5px",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#000",
    fontWeight: 400,
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    zIndex: 2,
    border: "1px solid #d7282f",
  },
  "& .MuiTabs-flexContainer": {
    alignItems: "center",
    // borderBottom: "1px solid #C6C6C6",
    // paddingBottom: "1rem",
  },
  "&.MuiTab-root.Mui-selected": {
    color: "#D7282F",
  },
  "& .MuiTabs-root": {
    minHeight: "30px"
  }
};

export const ActivityInfoContainer = styled(Box)({
  padding: "10px 0",
  "& .ActivityViewtask": {
    position: "absolute",
    right: 10,
    "@media screen and (max-width:600px)": {
      left: "0",
      right: "auto",
      position: "relative",
    },
  },
});

export const ActivityInnerBox = styled(Box)({
  display: "flex",
  "@media screen and (max-width:600px)": {
    display: "block",
  },
});

export const TabAndButtonBox = styled(Box)({
  display: "grid",
  justifyContent: "space-between"
});
export const ActivityTabData = styled(Box)({
  // margin: "16px 0 0",
  "& .MuiTabs-root": {
    background: "red"
  }
});
export const ActivityTabLeft = styled("div")({
  display: "grid",
  // border: "1px solid #E2E2E2",
  borderRadius: 5,
  gap: 20,
  height: "100%",
  // height: "480px",
  // overflowY: "scroll",

  // "&::-webkit-scrollbar": {
  //   width: "0.37em",
  // },
  // "&::-webkit-scrollbar-track": {
  //   boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  //   webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  // },
  // "&::-webkit-scrollbar-thumb": {
  //   backgroundColor: "#DDD",
  //   borderRadius: "8px",
  // },
  "@media screen and (max-width:767px)": {
    margin: "20px 0 0",
  },
});
export const ActivityTabInner = styled("div")({
  border: "1px solid #E2E2E2",
  borderRadius: 5,
  padding: "10px 10px 20px",
  // marginTop:"1rem",
  "& .Nospace": {
    padding: 0
  },
  "& .Nomargin": {
    margin: "12px 0 0"
  }
});
export const TaskInfoBar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #D2D2D2",
  "@media screen and (max-width:767px)": {
    display: "block",
    paddingBottom: "10px"
  },
});
export const TaskInfoBtn = styled(Box)({
  display: "flex",
  gap: "10px",
});

export const InfoTitle = styled(Typography)({
  color: "#231F20",
  fontSize: 18,
  fontWeight: 600,
  paddingBottom: 10,

});
export const ActivityFormData = styled(Box)({
  margin: "18px 0 0",
  // margin: "14px 0 0",
  "& .schdulerautocomplete": {
    "& svg": { position: "relative", margin: "0" },
    "& button": {
      padding: 0,
      width: 17,
      height: 17
    },
    "& .MuiAutocomplete-endAdornment": {
      top: "calc(59% - 15px)",
    }
  }
});
export const FormControlstyle = styled(FormControl)({
  color: "#D7282F",
  fontSize: "12px",
  boxShadow: "none",
  width: "100%",
  margin: "0 0 8px",
  "& fieldset": { border: "none" },
  "&. MuiFilledInput-root": { fontSize: "20px" },
  "& img": { margin: "0px 4px -3px 0" /*width: 18,*/ },
  "& .MuiInputBase-root::before": {
    borderStyle: "none !important"
  },
  "& .Mui-error": {
    // borderBottom: "1px solid #D7282F !important",
  },

  "& .MuiInput-root::before": { border: "none" },
  "& .MuiInputBase-root": {
    border: "1px solid #D2D2D2",
    borderRadius: 4,
    margin: "24px 0 1px",
    width: "100%",
    padding: "0 !important",
    "& .MuiInputAdornment-positionStart": {
      display: "none"
    }
  },
  "& .MuiFormLabel-root": {
    color: "#4A4A4A !important",
    fontSize: '13px',
    fontWeight: 600,
    transform: "none",
    fontFamily: "Open Sans !important",
  },
  "& .MuiInputBase-input": { /*padding: "4.5px 8px !important"*/
    padding: "2.5px 8px 4.5px !important",
    fontSize: "13px",
    // paddingRight: "32px !important"
    paddingRight: "32px",
    "@media screen and (max-width:1500px)": {
      fontSize: "11px",
    },
  },
  "& .Mui-focused": { outline: "none", boxShadow: "none" },
  "& svg": {
    width: 17,
    color: "#ababab",
    margin: "0px 1px -3px 0",
    // margin: "0px 6px 0 0",
    fontSize: "16px",
  },
  "& .MuiMenuItem-root": { fontSize: "10px" },
  "& .CreateTask": {
    "& .MuiOutlinedInput-root": {
      margin: "7px 0px 0",
    },
    "& .MuiInputLabel-root": {
      margin: "3px 0 0 19px",
    },
  },
  "& .MuiInputBase-root:hover::before": {
    display: "none"
  },
  "& .MuiInputBase-root::after": {
    display: "none"
  },
  "& .MuiIconButton-edgeEnd": {
    margin: "-4px 0 0"
  }
});
export const BoxDateTimePicker = styled(Box)({
  // "& .MuiFormControl-root": {
  //   minWidth: "100% !important"
  // },
  // "& .MuiStack-root": {
  //   overflow: "hidden",
  //   paddingTop: 0
  // }

});



/***** Create Task popup *****/
export const TaskAvatarContainer = styled(Box)({});
export const TaskAvatarLabel = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiAvatar-root": {
    marginRight: "6px",
    width: "25px",
    height: "25px",
  },
  "& .TaskUsername": {
    fontWeight: 600,
  },
  "& .MuiListItemText-root": {
    margin: "0",
  },
  "& .TaskUseremail": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%"
  },
  "& .MuiTypography-root": {
    color: "#4a4a4a",
    fontSize: "12px",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // width:"90%"
  },
});
export const ListOption = styled(List)({
  "& .MuiButtonBase-root": {
    paddingTop: 0,
    paddingBottom: "0",
  },
  "& .MuiListItemText-root": {
    margin: 0,
  },
  "& .MuiTypography-root": {
    fontSize: "12px",
  },
});

/****** End Add Task Styling here ******/

/****** Start Add CALL Styling here ******/
export const CallfieldCombine = styled(Box)({
  border: "1px solid #D2D2D2",
  borderRadius: "4px",
  height: "30px",
  // padding: "4px 0 4px",
  margin: "24px 0 0",
  "& .MuiInputBase-root": {
    margin: 0,
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    padding: "7px 4px 6px 8px",
    fontSize: "13px",
  },
  // "& .MuiInputBase-input": { padding: "0 0px 0 10px !important", fontSize: "12px" },
  "& .MuiInputBase-input": { /*paddingTop: "0px !important", paddingBottom: "0px !important", */fontSize: "13px" },
  "& .MuiSelect-select": {
    // padding: "0 0 0 10px",
    // color: "#C8CCD5",
    fontSize: "13px",
    // margin: 0,
    borderRight: "1px solid #e4e4e4",
    borderRadius: "0",
    // margin: "-2.5px 0px -3px",
    // padding: "4px 10px 1px 0 !important",
  },
  // "& .MuiSvgIcon-root": {
  //   margin: "1px -7px 0 0"
  // }
  "& .MuiButtonBase-root:hover":
  {
    background: "transparent"
  }
});
export const IconHelping = styled(HelpOutlineIcon)({
  color: "#d7282f !important",
  fontSize: "13px !important",
  margin: "-8px 0 -2px !important",
});

/****** End Add CALL Styling here ******/

/****** Start Add Meeting Styling here ******/
export const AddMoreGridStyle = { display: "flex", alignItems: "center" };
export const AddMoreUser = styled(Box)({
  padding: "20px 0 0",
  "& .MuiTypography-root": {
    fontSize: "12px",
    color: "#d7282f"
  },
  "& .MuiSvgIcon-root": {
    color: "#d7282f",
    margin: "-3px 2px -4px 0"
  }
});
export const CheckboxField = styled(Box)({
  "& .MuiFormControlLabel-root": { marginRight: "2px" },
  "& .MuiInputBase-root": {
    margin: "6px 0 0",
  },

  "& .MuiTypography-root": {
    color: "#000",
    fontSize: "14px"
  },
  "& .MuiCheckbox-root": {
    padding: "5px 7px 3px 11px"
  },


  "& .Mui-checked": {
    color: "#d7282fcc",
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
      width: "13px",
      height: "13px",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "3px",
      height: "6px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      top: "8px",
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
});
export const CheckMeeting = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "12px",
    margin: "-3px 0 0"
  },
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    fontSize: "13px",
    fontWeight: 600
  },
  "& .MuiCheckbox-root": {
    padding: "5px 7px 5px 10px",
  }
});
/****** End Add Meeting Styling here ******/

/****** Start Reminder Status Styling here ******/
export const ReminderStatus = styled(Box)({
  backgroundImage: "linear-gradient(#F5FCF3, #E2F7DD )",
  border: "0.5px solid #B7D9AE",
  borderRadius: 10,
  color: "#4D883E",
  fontSize: "13px",
  padding: "0px 15px",
  "& .MuiFormControlLabel-label": {
    fontSize: "13px",
  },
});
export const RepeatStatus = styled(Box)({
  backgroundImage: "linear-gradient(#FFEEd2, #F9D892 )",
  border: "0.5px solid #F9D892",
  borderRadius: 10,
  color: "#C78800",
  fontSize: "13px",
  padding: "0px 15px",
  "& .MuiFormControlLabel-label": {
    fontSize: "12px",
  },
});
export const ReminderMessage = styled(Typography)({
  fontSize: "12px",
});

export const SwitchesBox = styled(Box)({
  display: "grid",
  gap: "8px",
  margin: "5px 0 0",
});
export const ActivityTabRight = styled("div")({
  // border: "1px solid #E2E2E2",
  borderRadius: 5,
});
/****** End Reminder Status Styling here ******/


/***** Start Popups styling (Reminder pop style)*****/
export const SwitchesPopup = styled(Box)({});
export const ReminderHead = styled("div")({
  background: "#E8F9E4",
  padding: "9px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: "#4D883E",
  "& svg": {
    fontSize: "16px",
    margin: "0 5px 0 0px",
  },
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: 600,
  },
});
export const ReminderPopOver = styled(Popover)({
  "& .MuiPaper-root": {
    width: "470px",
    borderRadius: "10px 10px 0 0",
    boxShadow:
      "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
  },
});
export const SwitchPopContent = styled("div")({
  padding: "18px 10px 18px 18px",
  "& .MuiTypography-root": {
    color: "#000",
    fontSize: "11px",
  },
  "& .MuiRadio-root": { padding: "6px 4px 6px 0px", color: "#D2D2D2" },
  "& .Mui-checked": { color: "#d7282f !important" },
  "& .MuiSvgIcon-root": { fontSize: "18px" },
  "& .MuiInputBase-input": { padding: "8px 12px !important" },
});

export const TextFieldTime = styled(TextField)({
  width: "75px",
});
export const TextTextField = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "center",
  justifyContent: "right",
  "& .MuiFormControlLabel-label": { display: "none" },
  "& .MuiFormControlLabel-root": { marginRight: "0" },
  "@media screen and (max-width: 560px)": {
    alignItems: "baseline",
  },
});

/***** Repeat popup styling  *****/
export const RepaetHead = styled("div")({
  background: "#FFEED2",
  padding: "9px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: "#C78800",
  "& svg": {
    fontSize: "16px",
    margin: "0 5px 0 0px",
  },
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: 600,
  },
});
export const RadioButtonText = styled(Box)({
  display: "flex",
  "& span": {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
});

export const TextFieldStyle = styled(TextField)({
  width: "100px !Important",
});

export const SwitchPopContentRepeat = styled("div")({
  padding: "20px 0 16px 16px",
  "& .MuiTypography-root": {
    color: "#000",
    fontSize: "14px",
    // margin: "9px 0 4px",
  },
  "& .MuiRadio-root": { /*padding: "6px 4px 6px 0px",*/ color: "#D2D2D2" },
  "& .Mui-checked": { color: "#d7282f !important" },
  "& .MuiSvgIcon-root": { fontSize: "18px" },
  "& .MuiInputBase-input": { padding: "10px !important" },
  "& .MuiFormControlLabel-root": { marginRight: 0, minWidth: "65px" },
});

export const TypographyEnd = styled(Typography)({});

export const RadioButtonText2 = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  "& span": {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
});
export const RepeatCoulumn = styled(Box)({
  paddingLeft: "53px",
  display: "grid",
  gap: "10px",
});

/***** Ends Popups styling *****/
/********============== End Activities tab styling =============******/

/********============== Start Files tab styling here =============******/
export const UploadOuterContainer = styled(Box)({
  background: "#FBFBFB",
  border: "1px dashed #D2D2D2",
  borderRadius: "6px",
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem 0px",
  padding: "30px 0 0",
  // display: "grid",
  gap: "20px",
});

export const UploadItem = styled("span")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

});
export const DragDropBox = styled("span")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const BrowseIcon = styled("span")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const BrowseText = styled(Typography)({
  fontSize: "14px",
  color: "#444",
  textTransform: "capitalize",
});

export const Input = styled("input")({
  display: "none",
  padding: "5px",
  fontSize: "14px",
  lineHeight: "16px",
  color: "#223354",
});
export const LabelAfterUploading = styled("div")({
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
});
export const UrlLabel: any = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  border: "1px solid #C5C5C5",
  borderRadius: 4,
  background: "#F6F6F6",
  color: "#444444",
  gap: "6px",
  padding: "2px 8px",
  "& svg": {
    margin: 1.5,
    color: "#d7282f",
    fontSize: "20px",
    cursor: 'pointer'
  },
  "& hr": {
    mx: 0.5,
  },
  "& .Filename": {
    fontSize: "13px",
    whiteSpace: "nowrap",
    width: "92px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
export const ProgressBarArea = styled(Box)({
  margin: "15px 0",
});
export const ProgressBarAreaInner = styled(Box)({
  display: "grid",
  gap: "10px", margin: "0 0 1rem"
});
export const UpFileHeading = styled(Typography)({
  padding: "8px 6px 0",
  fontSize: "14px",
  "& .upfileDate": {
    border: "1px solid #ddd",
    borderRadius: "25px",
    padding: "2px 16px",
    "& svg": {
      fontSize: "14px",
      color: "#d7282f",
      margin: "2px 4px -1px 0"
    }
  }
});

export const ProgressBarRow = styled(Box)({
  background: "#F5F5F5",
  borderTop: "1px solid #DADADA",
  borderBottom: "1px solid #DADADA",
  padding: "8px 20px",
  position: "relative",

  "& .FilenameNew": {
    fontSize: "12px",
    fontWeight: 600,
    padding: "0 0 5px"
  },
});
export const ProgressUpload = styled(Box)({
  display: "flex",
  "& .Filesize": {
    fontSize: "11px",
    color: "#797979",
    minWidth: "50px",
    fontWeight: 600,
    margin: "0 5px 0 0px"
  },
  "& .MuiLinearProgress-root": {
    background: "#EBEBEB"
  }
});

export const LinerProgrssBar = styled(Box)({
  width: "90%",
  "& .MuiTypography-root": {
    fontWeight: 600,
    color: "#231F20",
    fontSize: "11px"
  },
  ".sucess_msgg": {
    color: "#01AF13",
    fontSize: "12px"
  }
});

export const FileActions = styled(Box)({
  position: "absolute",
  right: "10px",
  top: "22%",
  "& .MuiSvgIcon-root": {
    fontSize: "18px"
  },
  "@media screen and (max-width: 900px)": {
    right: "0",
    top: "0",
  }
});

/********============== End Files tab styling here =============******/

/********============== Start Email tab styling here =============******/
export const EmailOuterContainer: any = styled(Box)(({ type }: any) => {
  return {
    border: "1px solid #E0E3E7",
    borderRadius: "6px",
    margin: type != 'popup' ? "18px 0" : "0px 0",
    "& .Composefixed": {
      position: "fixed",
      bottom: "10px",
      right: "10px",
      background: "#d7282f",
      display: "none",
      color: "#fff",
      border: "none",
      zIndex: 9,
      padding: "9px 15px",
      borderRadius: "50px",
      fontSize: "13px",
      textTransform: "capitalize",
      "&:hover": {
        background: "#d7282f",
      },
      "& img": {
        filter: "brightness(0) invert(1)",
      },
      "@media screen and (max-width: 900px)": {
        display: "flex",
      }
    },
  }
});
export const SubjectMailText = styled(Box)({
  display: "flex",
  gap: 8,
  alignItems: "center",
});
export const ImageWithText = styled(Box)({});
export const EmailSubject = styled(Typography)({
  color: "#3E5060",
  fontSize: "13px",
  fontFamily: "Open Sans",
  cursor: "pointer",
  whiteSpace: "nowrap",
  width: "95%",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
export const EmailAddress = styled(Typography)({
  color: "#3E5060",
  fontSize: "13px",
  fontFamily: "Open Sans",
  cursor: "pointer",
  fontWeight: "bold",
});
export const ComposeMailBtn = styled(Button)({
  borderRadius: "3px",
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "12px",
  fontWeight: 600,
  padding: "0 6px",
  minWidth: "auto",
  textTransform: "capitalize",
  height: "27px",
  position: "absolute",
  right: 10,
  "& svg": { fontSize: "16px !mportant" },
  "&:hover": {
    background: "#FFD7D7",
    color: "#D7282F",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "@media screen and (max-width: 900px)": {
    display: "none",
  }
});

export const EmailTabBox = styled(Box)({
  padding: "30px 10px",
});
export const SelectEmailOption = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  margin: "0 0 12px",
  transition: 'visibility 0s linear 0.33s, opacity 0.33s linear',
});

export const SelectEmailText = styled(Typography)({
  color: "#000",
  fontSize: "15px",
});
export const EmailActionButon = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const ComposeMailOuter = styled(Box)({
  "& .MuiInputBase-root": {
    "&:after": {
      borderBottom: "1px solid #d7282f"
    },
    // "&:before":{
    //   borderBottom:"1px solid #d7282f"
    // },
    "&:hover:before": {
      borderBottom: "1px solid #d7282f"
    },

  }
});
export const MessageHeading = styled("div")({
  background: "#FFEEEF",
  borderRadius: "6px",
  padding: "9px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "& svg": {
    color: "#231F20",
  },
});
export const EmailFormData = styled("div")({});
export const EmailBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  padding: "10px 12px",
  "& .MuiTypography-root": {
    color: "#000",
    fontSize: "15px",
  },
  "& .MuiInput-root": {
    fontSize: "15px",
    paddingBottom: "5px",
  },
  "& .MuiInputBase-root::before": { borderColor: "#D2D2D2" },
  "& .MuiFormControl-root": {
    padding: "0px 0 7px",
    "& .MuiInputBase-root-MuiInput-root:after": {
      borderBottom: "none",
    },
    "& .mce-content-body": {
      padding: "0"
    },
    "& iframe": {
      padding: "10px"
    }
  },
});
export const EmailStyledTextarea = styled(TextareaAutosize)({
  resize: "none",
  border: "1px solid #D2D2D2",
  minWidth: 0, // remove the native textarea width
  outline: 0, // remove the native textarea outline
  paddingInlineEnd: `var(--Textarea-paddingInline)`,
  flex: "auto",
  alignSelf: "stretch",
  backgroundColor: "transparent",
  fontFamily: "Open Sans !important",
  margin: "15px 0 0",
  minHeight: "200px",
  fontSize: "15px",
  color: "#000",
  fontWeight: "400",
  padding: "10px",
  height: "200px !important",

  "&::placeholder": {
    opacity: 0,
    transition: "0.1s ease-out",
  },
  "&:focus::placeholder": {
    opacity: 1,
    fontSize: "13px",
  },
  // specific to TextareaAutosize, cannot use '&:focus ~ label'
  "&:focus + textarea + label, &:not(:placeholder-shown) + textarea + label": {
    top: "0.5rem",

    fontFamily: "Open Sans !important",
    background: "#fff !important",
    zIndex: 1,
    boxShadow: "none !important",
  },
  "&:focus + textarea + label": {
    color: "#00000099",
    top: "-6px",
  },
  "& JoyTextarea-root:focus-within::before": { boxShadow: "none" },
});
export const EmailBtnContainer = styled(Box)({
  display: "flex",
  gap: "10px",
  width: "100%",
  justifyContent: "end",
  margin: "8px 0 10px",
});
export const SchduledHeading = styled("div")({
  background: "#FFEEEF",
  padding: "9px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: "#D7282F",
  "& svg": {
    fontSize: "16px",
    margin: "0 5px 0 0px",
  },
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: 600,
  },
});
export const StylePopOver = styled(Popover)({
  "& .MuiPaper-root": {
    width: "450px",
    boxShadow: "none",
    border: "0.5px solid #D2D2D2",
    borderRadius: "10px 10px 0 0",
  },
});
export const ContentSection = styled("div")({
  padding: "28px 16px",
  "& .MuiTypography-root": {
    color: "#000",
    fontSize: "14px",
  },
  "& .MuiRadio-root": { padding: "6px 4px 6px 0px", color: "#D2D2D2" },
  "& .Mui-checked": { color: "#d7282f !important" },
  "& .MuiSvgIcon-root": { fontSize: "18px" },
});
export const BottomButton = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "10px",
  margin: "20px 0 ",
});
export const GridItem = styled(Grid)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  paddingTop: "4px !important",
});
export const GridRow = styled(Grid)({
  padding: "3px 16px !important",
});
export const TabsStyleMail = {
  "&:hover": {
    backgroundColor: "transparnt",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#D7282F",
    bottom: 0,
    color: "#D7282F !important",
    height: "1.5px",
  },
  "& .MuiTab-root": {
    textTransform: "capitalize",
    fontSize: "14px",
    margin: "-2px 0 0",
    color: "#333333",
    minHeight: "50px",
    minWidth: "100px",
    "& svg": { margin: "0 3px", fontSize: 19 },
  },

  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    zIndex: 1,
    "& svg": { color: "#D7282F" },
  },

  "& .MuiTabs-flexContainer": {
    alignItems: "center",
    borderBottom: "1px solid #e5e5e5",
  },
  ".icon-leadsblack:before": {
    color: "inherit"
  },
};

/********============== End Email tab styling here =============******/

/********============== Start Email Detail styling here =============******/
export const EmailDetailOuter = styled(Box)({
  padding: "20px 12px",
  border: "1px solid #E0E3E7",
  borderRadius: "6px",
  margin: "20px 0"
});
export const EmailDetailTop = styled(Box)({});
export const EmailAvatarInfo = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "12px",
  }
});
export const EmailAvatarContainer = styled(Box)({});
export const EmailAvatarLabel = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const EmailDetailTopRight = styled(Box)({ textAlign: "right", margin: "-16px 0 15px" });
export const EmailDetailInnerInfo = styled(Box)({
  padding: "1rem",
  verticalAlign: "top",
  whiteSpace: "normal",
  width: "100%",
  wordBreak: "break-word",
  "& .MuiTypography-root": {
    color: "#263238",
    fontSize: "12px",
    padding: "0px 0 16px",
    lineHeight: "22px"
  },
  "& .MuiTypography-h6": {
    fontWeight: 600,
    padding: "0"
  }
});
export const MailDetailIcons = styled(Box)({
});
export const EmailDetailButtoins = styled(Box)({
  textAlign: "right",
  margin: "1rem 0 0"
});


/********============== End Email Detail styling here =============******/



/********============== Start Notes tab styling here =============******/
export const NotesContainer = styled(Box)({
  // border: "1px solid #E0E3E7",
  // padding: "8px 5px",
  borderRadius: "5px",
  margin: "12px 0 0",
});

export const NotsInner = styled(Box)({
  background: "#F6F6F6",
  border: "1px solid #D2D2D2",
  borderRadius: "6px",
  display: "grid",
  gap: "10px",
});

export const NotesEditorBox = styled(Box)({
  position: "relative",
  "& .tox-tinymce": { border: "none", borderRadius: "0" },
  "& .tox-editor-container": {
    flexDirection: "column-reverse !important",
    background: "#FFF6D6",
  },
  "& iframe": { background: "transparent !important" },
  "& .tox-toolbar-overlord": { background: "transparent !important" },
  "& .tox-toolbar__primary": { background: "transparent !important" },
  "& .tox-editor-header": { background: "transparent !important" },
  '& .tox-statusbar': { display: "none !important" },

  "& .quill":{
    background:"#f4ecb4"
  },
  "& .ql-snow":{
    border:"none !important"
  },
  "& .ql-container.ql-snow":{
     border:"none !important"
  }
});

export const EditorButtons = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "end",
  justifyContent: "end",
  position: "absolute",
  bottom: "10px",
  right: "10px",
  zIndex: 2,
  "@media screen and (max-width: 900px)": {
    bottom: "75px",
  },
});
export const BoxNots = styled(Box)({
  background: "#fff",
  borderRadius: "5px",
  border: "1px solid #EAEAEA",
  margin: "10px",
  height: "510px",
  padding: "2rem 1rem",
  overflowY: "scroll",
  "@media screen and (max-width: 900px)": {
    padding: "10px"
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
});

export const BoxNotsContent = styled(Box)({
  position: "relative",
  display: "grid",
  gap: "20px",
  margin: "0 0 20px 60px",
  width: "calc(100% - 60px)",
  "@media screen and (max-width: 600px)": {
    margin: "0 0 20px 0",
    width: "100%"
  },
});

export const NContentRow = styled(Stack)({
  "& .hidden-button": {
    display: "none"
  },
  "&:hover .hidden-button": {
    display: "flex",
    position: "absolute",
    right: 0,
    top: 0,
    background: "rgba(229, 229, 229, 0.9)",
    padding: 5
  },
  border: "1px solid #E0E3E7",
  position: "relative",
  borderRadius: "5px",
  color: "#d7282f",
  padding: "15px 14px",
  // padding: "9px 60px 9px 14px",
  "&::before": {
    content: '""',
    position: "absolute",
    backgroundColor: "#D7282F",
    background: "url('/assets/images/crm/notes_img.svg') no-repeat",
    left: "-47px",
    width: "40px",
    height: "52%",
    top: "0",
    minHeight: "40px",
    "@media screen and (max-width: 600px)": {
      display: "none"
    },
  },
});

export const NContentRowInn: any = styled(Box)(({ value }: any) => {
  return {
    "&::before": {
      content: '""',
      position: "absolute",
      backgroundColor: "#D7282F",
      left: "-32px",
      width: "1px",
      height: !value && "70%",
      top: "36px",
    },
  }
});


export const CenterNoteContent = styled(Box)({
  wordBreak: "break-all"
});
export const TabTitle = styled(Typography)({
  color: "#231F20",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 0 6px",
});

export const BottomCntentRow = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  gap: "30px",
  alignItems: "center",
  "& .MuiTypography-root": {
    color: "#d7282f",
    fontSize: "12px",
  },
  "@media screen and (max-width: 480px)": {
    display: "grid",
    gap: 7,
    padding: "8px 0 0"
  },
});
export const TimeStack = styled(Box)({
  border: "1px solid #D7282F",
  borderRadius: "50px",
  padding: "2px 7px",
});
export const TimeTypo = styled(Typography)({
  color: "#d7282f",
});
export const StackWithImg = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  "& .MuiTypography-root": {
    color: "#4a4a4a",
  },
});



/********============== Ends Notes tab styling here =============******/

/********============== Start Invite Meetingd tab styling here ===========******/
export const InviteMeetingOuter = styled(Box)({
  // border: "1px solid #E0E3E7",
  padding: "16px 0",
  borderRadius: "5px",
});
export const InviteTopBar = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "0 0 12px",
});
export const InviteActionBtn = styled(Box)({
  display: "flex",
  gap: "10px",
});
/********============== Ends Invite Meetingd tab styling here =============******/

/********============== Start Custom View Style =============*******/
export const CustomViewOuter = styled(Box)({});
export const CustomViewInner = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  background: "#FFF8F8",
  padding: "12px",
  alignItems: "center",
  "@media screen and (max-width: 480px)": {
    display: "block"
  }
});
export const CustomTopBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiInputBase-input": {
    padding: "12px 0",
    width: "95px",
  },
  "& .MuiInputBase-root": {
    padding: "0 5px",
    background: "#fff",
    color: "#4A4A4A",
    fontSize: "14px",
    fontWeight: 600,
  },
});
export const CustomActionButon = styled(Box)({
  display: "flex",
  gap: "10px",
});

export const CustomViewWrapper = styled(Box)({
  padding: "1rem",
  "& .criteriatextfield": {
    "& .MuiInputBase-input": {
      padding: "5px",
    },
    // "& fieldset": {
    //   border: "none",
    //   borderBottom: "1px solid #BFBFBF",
    //   borderRadius: "0"
    // },
    // "& .MuiInputBase-root": {
    //   margin: "0 0 0 12px",
    // },
  }
});
export const SpecifiCriteria = styled(Box)({});
export const NumCircleOuter = styled(Box)({
  position: "relative",
  "@media screen and (max-width: 899px)": {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});
export const SpecifiCriteriaInn = styled(Box)({
  "@media screen and (max-width: 899px)": {
    border: "1px solid #ddd",
    padding: "15px 8px",
    margin: "0 0 20px",
    "& .specifycountnum": {
      borderRadius: "4px",
      position: "relative"
    }
  }
});
export const NumCircle = styled(Box)({
  color: "#231F20",
  fontSize: "14px",
  fontWeight: "600",
  background: "#EFEFEF",
  border: "1px solid #E4E4E4",
  width: "30px",
  height: "30px",
  textAlign: "center",
  display: "grid",
  alignItems: "center",
  borderRadius: "50%",
  margin: "0 0 25px",
});
export const CustolFieldData = styled(Box)({
  margin: "1rem 0",
  "& fieldset": {
    border: "none",
    borderBottom: "1px solid #BFBFBF",
    borderRadius: "0",
    "@media screen and (max-width: 767px)": {
      borderBottom: "1px solid #e7e7e7",
    }
  },
  "& .MuiInputBase-root": {
    // margin: "0 0 0 12px",
    margin: "0 6px 0 6px",
    padding: "0 !important"
  },
  "& .MuiInputBase-input": {
    padding: "4.5px 7px !important",
    fontSize: "13px"
  },
  "& .CreateTask": {
    "& img": {
      display: "none"
    },
    "& .MuiInputBase-root": {
      padding: 0
    }
  },
  "& .datetimecommon": {
    "& .MuiFormControl-root": {
      minWidth: "100% !important"
    },
    "& .MuiStack-root": {
      overflow: "hidden",
      paddingTop: 0
    },
    "& svg": {
      fontSize: "14px"
    }
  },
});

export const MiddleText = styled(Box)({
  background: "#fff",
  cursor: "pointer",
  position: "absolute",
  margin: "-21px 4px  0",
  "& .MuiTypography-root": {
    color: "#d7282f",
    fontSize: "11px",
    position: "relative",
    zIndex: 1,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    backgroundColor: "#E4E4E4",
    left: "10px",
    width: "1px",
    height: "100%",
    top: "12px",
    "@media screen and (max-width: 767px)": {
      display: "none"
    }
  },
  "&::after": {
    content: '""',
    position: "absolute",
    backgroundColor: "#E4E4E4",
    left: "10px",
    width: "1px",
    height: "100%",
    bottom: "10px",
    "@media screen and (max-width: 767px)": {
      display: "none"
    }
  },
});
export const StackHeading = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#000",
});
export const ChooseCoulmnView = styled(Box)({});
export const TableGridBox = styled(Box)({
  padding: "9px 12px",
  border: "1px solid #D2D2D2",
  height: "100%",
  // minHeight: "300px",
  //   overflowY: "scroll",

  "& .MuiListItemButton-root": {
    padding: "0 10px",
  },
  "& .MuiTypography-root": {
    fontSize: "14px",
  },
  "& .MuiListItem-root": {
    "& svg, img": {
      display: "none",
      color: "#D7282F",
      fontSize: "18px",
      width: "20px",
    },
  },
  "& .MuiListItem-root:hover": {
    "& svg, img": { display: "block" },
    "& img": { width: "13px", margin: "0 8px 0 8px" },
  },
  "& .tabulerview": {
    height: "300px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#D2D2D2",
      borderRadius: "8px",
    },
  }
});
export const CusTomSearchBox = styled(Box)({
  padding: "0 10px"
});
export const CustomFieldControl = styled(FormControl)({
  color: "#D7282F",
  fontSize: "12px",
  // margin: "0 12px",

  "&. MuiFilledInput-root": { fontSize: "20px", margin: "0 12px" },
  "& svg": { width: 17 },
  "& .MuiMenuItem-root": { fontSize: "10px" },
  "& .MuiFormLabel-root": { fontSize: "13px" },
  // "& .MuiInputBase-root": {
  //   margin: "0 12px",
  // },
  "& .MuiButtonBase-root": {
    fontSize: "12px",
  },
  "& .MuiFormControl-root": {
    "&.MuiInputBase-root-MuiInput-root-MuiSelect-root.Mui-focused:after": {
      border: "none"
    }
  },
  "& .MuiInputBase-root::before": {
    borderBottom: "1px solid #BFBFBF",
    "@media screen and (max-width: 899px)": {
      borderBottom: "1px solid #e7e7e7",
    },
    "& .MuiInputBase-root::after": {
      borderBottom: "none",
    },
  },
  "& .MuiInputBase-input:focus": {
    background: "#fff"
  },




});
export const CustomViewDrawer = styled(Box)({
  width: "100%",
});
export const StyledSwipeableDrawer = styled(SwipeableDrawer)({
  "& .MuiDrawer-paper": {
    width: "40%",
    "@media screen and (max-width: 1600px)": {
      width: "50%",
    },
    "@media screen and (max-width: 1100px)": {
      width: "70%",
    },
    "@media screen and (max-width: 767px)": {
      width: "90%",
    },
  },
});
/********============== End Custom View Style =============*******/

/********==========  Start Detail Page Buyer on hover popover css ========*******/
export const UserInfoPopover = styled(Box)({});
export const StyledInfoPopover = styled(Popover)({
  "& .MuiPaper-root": {
    width: "300px",
    border: "1px solid #CDCDCD",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    overflowY: "hidden",
    margin: "40px 0 0"
  },
});
export const PopOverContainer = styled(Box)({});
export const BuyerDetail = styled("div")({
  display: "flex",
  padding: "6px 15px",
  alignItems: "center",
  justifyContent: "space-between",
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "16px",
    fontWeight: 600,
  },
  "& svg": {
    fontSize: "17px",
  },
});
export const PopOverInner = styled(Box)({
  padding: "15px 15px 5px",
  paddingLeft: 0,
  display: "flex",
  gap: 10,
  alignItems: "center",
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    fontSize: 16,
  },
  "& img": {
    width: "100%",
    objectFit: "contain",
  },
});

export const UseDes = styled(Typography)({
  fontSize: "12px !important",
});
export const IconContainer = styled(Box)({
  display: "flex",
  gap: "5px",
  padding: "0 12px 3px",
  "& img": {
    background: "transparent",
    width: "22px",
    height: "22px",
    padding: "2px",
  },
  "& img:hover": {
    background: "#F3F2F1",
  },
  "& .queryicon": {
    width: "15px",
    padding: "0",
  }
});
export const MainAccountInfo = styled(Box)({
  margin: "14px 12px",
  "& .MuiListItem-root svg": {
    display: "none",
    color: "#D7282F",
    fontSize: "14px",
  },
  "& .MuiListItem-root:hover svg": {
    display: "block",
  },
});
export const InfoGreyBar = styled(Box)({
  background: "#F3F2F1",
  padding: "3px 10px",
  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#231F20",
    fontWeight: 600,
  },
});
export const ListingData = styled(Box)({
  "& .MuiListItemText-primary": {
    fontSize: "12px",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "35px",
  },
  "& .MuiList-root": {
    // padding: "0 0 15px",
  },
  "& .MuiListItemButton-root": {
    padding: "4px 12px",
  },
});
export const AssignedAccount = styled(Box)({});
export const AssigneInfo = styled(Box)({
  display: "flex",
  gap: 10,
  alignItems: "center",
  padding: "10px 0",
  "& .MuiAvatar-root": {
    width: "30px",
    height: "30px",
    "& img": {
      objectFit: "cover",
      width: "100%",
    },
  },
});
export const ReassignName = styled(Typography)({
  fontSize: "12px",
});
export const DiviceInfo = styled(Typography)({
  fontSize: "12px",
  margin: "10px 0",
  "& .MuiTypography-root": {
    fontSize: "12px",
  },
  "& span": {
    fontWeight: 600,
  },
});
export const BuyerDetalFieldContainer = styled(FormControl)({
  color: "#D7282F",
  fontSize: "12px",
  "&. MuiFilledInput-root": { fontSize: "20px" },
  "& .MuiInputBase-input": {
    padding: "0px",
    color: "#D7282F",
    fontSize: "12px",
    paddingRight: "24px !important",
  },
  "& svg": { width: 17, color: "#D7282F" },
  "& .MuiMenuItem-root": { fontSize: "10px" },
  "& fieldset": { border: "none" },
  "& .MuiInputBase-root": { width: "auto" },
});
export const CancelIcon = styled(CancelOutlinedIcon)({
  position: "absolute",
  right: 5,
  top: 10,
  fontSize: 18,
});

/********==========  End  Detail Page Buyer popup on hover popover css ========*******/
/******************* Ends single Leads details styling here  *****************/

/******========= Start History Component css Here ========******/
export const HistoryDataContainer = styled(Box)({});
export const CustomTabContent = styled(Box)({
  "& .Mainheading": {
    fontSize: "14px",
    fontWeight: 600,
  },

});
export const CustomTabBox = styled(Box)({
  // border: "1px solid #ddd",
  margin: "1rem 0 0",
  borderRadius: 6,
  // padding: "1rem",
  "@media screen and (max-width: 767px)": {
    padding: "10px"
  }
});
export const HistoryTopBar = styled(Box)({
  background: "#FFECEC",
  padding: "12px",
  "& .MuiTypography-root": {
    color: "#D7282F",
    fontSize: "16px",
    fontWeight: 600,
  },
});
export const HistoryDes = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
});
export const HistoryDate: any = styled(Typography)({
  fontSize: "13px",
  color: "#333333",
  fontWeight: 600,
  padding: "10px 0",
  margin: "10px 0 0 0",
});
export const Historycontainer = styled("div")({
  width: "100%",
});
export const HistoryHeader = styled("div")({
  display: "flex",
  flex: 1,
  height: "35px",
});
export const Iconcontainer: any = styled("div")(({ itemColor }: any) => ({
  color: "#FFF",
  padding: "2px",
  gap: "10px",
  width: "30px",
  height: "30px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50px",
  // backgroundColor: "#6E8F44",
  margin: "4px 0px",
  "& svg": {
    fontSize: "16px",
  },
  "@media screen and (max-width: 767px)": {
    display: "none"
  }
}));
export const HistoryLabel: any = styled("span")(({ value }: any) => ({
  fontWeight: 600,
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginLeft: "15px",
  color: "#828282",
  "& .Infolabel": {
    fontWeight: 600,
    fontSize: "12px",
  },
  "@media screen and (max-width: 767px)": {
    marginLeft: "0",
  }
}));
export const HistoryContentContainer: any = styled("div")(({ value }: any) => ({
  marginLeft: "14px",
  "& .LeftLine": {
    position: "relative",
    "&::before": {
      content: '" "',
      width: "2px",
      height: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      backgroundColor: "#BEBEBE",
      "@media screen and (max-width: 767px)": {
        display: "none"
      }
    },
    "&::after": {
      content: '" "',
      width: "2px",
      height: "12px",
      position: "absolute",
      bottom: "0",
      left: "0",
      backgroundColor: "#ffffff",
      "@media screen and (max-width: 767px)": {
        display: "none"
      }
    },
  },
  "@media screen and (max-width: 767px)": {
    marginLeft: "0",
  }
}));
export const HistoryContent = styled("div")(({ }) => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#333333",
  fontSize: "12px",
  padding: "0 7px 10px 0",
  "& .viewLink": {
    color: "#666666",
    "&:hover": {
      color: "#d7282f",
    },
  },
  "@media screen and (max-width: 767px)": {
    alignItems: "baseline",
  }
}));
export const ContentLine = styled("span")({
  minWidth: "30px",
  height: "2px",
  background: "#BEBEBE",
  "@media screen and (max-width: 767px)": {
    display: "none"
  }
});
export const DotItem: any = styled("div")({
  borderRadius: "10px",
  // background: "#6E8F44",
  width: "8px",
  height: "8px",
  gap: "7px",
  margin: "0 7px 0 0px",

});
export const UserName = styled("span")({
  color: "#6E8F44",
  wordBreak: "break-all"
});
export const InnInfo = styled("div")({
  fontSize: "13px",
  flexBasis: "fit-content",
  // display: "flex",
  alignItems: "center",
  "& span": {
    display: "contents",
    alignItems: "center",
    gap: "3px",
    "& svg": {
      fontSize: "18px",

      "@media screen and (max-width: 767px)": {
        margin: "4px 3px -3px",
        fontSize: "15px"
      }
    },
    "@media screen and (max-width: 767px)": {
      display: "inline",
      padding: 0
    },
    "& b": {
      padding: "0 8px 0 0"
    }
  },
  "& .Notsdata": {
    color: "#828282",
  },
  "& .Filecolor": {
    color: "#A26B02",
  },
  "& .Invite": {
    color: "#CF702B",
  },
  "& .timericon svg": {
    margin: "0px 2px -4px 0"
  },
  "@media screen and (max-width: 767px)": {
    display: "block"
  }

});
export const RowItem = styled("div")({});
export const HighlightTxt = styled(Typography)({});
export const AuthorCreator = styled(Box)({
  display: "inline-flex",
  "& svg": {
    margin: "3px 2px -4px"
  }
});

export const HistoryStack = styled("div")({});
export const HistoryStackInn = styled("div")({ margin: "0 0 10px" });
export const HistoryTabsStyle = {
  "&:hover": {
    backgroundColor: "transparnt",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#D7282F",
    bottom: 0,
    color: "#D7282F !important",
    height: "1.5px",
  },
  "& .MuiTab-root": {
    textTransform: "capitalize",
    fontSize: "14px",
    margin: "-2px 0 0",
    color: "#333333",
    minHeight: "30px",
    minWidth: "108px",
    "& svg": { margin: "0 3px", fontSize: 19 },
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    zIndex: 1,
    "& svg": { color: "#D7282F" },
  },
  "& .MuiTabs-flexContainer": {
    alignItems: "center",
  },
  "&.MuiTab-root.Mui-selected": {
    color: "#D7282F",
  },
  "&.MuiTabs-root": {
    minHeight: "40px",
  },
  "& .MuiTabScrollButton-root": {
    // display: "none",
    "@media screen and (max-width: 767px)": {
      display: "inline-flex"
    }
  },

};
export const CrmHistoryData = styled(Box)({
  margin: "1rem 0 1rem",
  paddingBottom: "1rem",
  "& .MuiPaper-root": {
    borderRadius: "8px",
    boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
    marginBottom: "2rem"
  }
});

/******========= End History Component css Here ========******/

/******========= Start Mass Update styling Here ========******/
export const MassValueBox = styled("div")({});
export const MassUpdateContent = styled(Box)({

});
/******========= End Mass Update styling Here ========******/

/*****=========== Start Manage Tags (Action Popus Styling) ===========*****/
export const ManagaTagDialog = {
  "& .MuiPaper-root": {
    maxWidth: "670px",
  },
  "& .MuiDialogContent-root": {
    padding: "20px",
  },
  "& .Hoverdiv": {
    visibility: "hidden",
  },
  "& .MuiDataGrid-row:hover .Hoverdiv": { visibility: "visible" },
};
export const LabelChipStack = styled(Box)({
  display: "-webkit-box",
  flexWrap: "wrap",
  gap: 6,
});
export const CustomChip = styled("div")({
  background: "#F7FFC9",
  // border: "1px solid #92AA12",
  color: "black",
  fontSize: "12px",
  padding: "2px 6px",
  borderRadius: "100px",
  fontWeight: 600,
});
export const CustomChip2 = styled("div")({
  background: "#FFDEDF",
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "12px",
  padding: "2px 6px",
  borderRadius: "100px",
  fontWeight: 600,
});
export const MoreTags = styled("div")({
  fontSize: "12px",
});
export const ManageTagSearchOuter = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiInputBase-input": {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
});
export const ManageTagSearch = styled(Box)({
  "& .MuiInputBase-root": {
    borderRadius: "50px",
  },
});
export const ManageTagTable = styled("div")({
  marginTop: "10px",
});
export const ManageTagText = styled(Typography)({
  fontSize: "13px",
  color: "#000",
});
export const PickerBox = styled("span")({
  border: "1px solid #dae0e3",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  "& .MuiSvgIcon-root": { fontSize: "16px" },
  "& .ColorPicker-MuiButtonBase-root": {
    width: "15px",
    minWidth: "15px",
    height: "15px",
  },
  "& .ColorPicker-MuiButton-label div": {
    width: "15px",
    minWidth: "15px",
    height: "15px",
  },
  "& .MuiDataGrid-cellCheckbox": {
    display: "none",
  },
});
export const EditDeleteAction = styled("span")({
  display: "flex",
  gap: "6px",
  alignItems: "center",

  "& button": {
    borderRadius: "50%",
    minWidth: "auto",
    padding: "4px",
    "& svg": { fontSize: "17px", color: "#000" },
    "& svg:hover": { color: "#d7282f" },
  },

});

export const AddTagsBox = styled(Box)({
  margin: "6px 0px 2px",
  "& button": { height: "33px" },
  "& .MuiOutlinedInput-input": {
    padding: "5px 12px",
  },
  " .removetags": {
    "& .MuiInputBase-root": {
      padding: 0,
    },
    "& .MuiFormLabel-root": {
      fontSize: "13px",
      top: "-7px",
    },
  },
});

export const AddTagsFullwidth = styled(Box)({
  margin: "6px 0px 2px",
  alignItems: "center",
  "& .MuiOutlinedInput-input": {
    padding: "5px 12px",
  },
  "& .TagautocompleteAdd": {
    width: "100%",
    "& .MuiInputBase-root": {
      padding: 0,
    },
    "& .MuiFormLabel-root": {
      fontSize: "13px",
      top: "-7px",
    },
  },
});

export const TagRow = styled(Box)({
  "& .MuiChip-filled": { height: "22px" },
  "& .MuiChip-deleteIcon": { fontSize: "16px !important" },
});

export const TagGridStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export const AddTagFooter = styled(Box)({
  padding: "8px 0 0",
  "& .MuiTypography-root": { fontSize: "14px", color: "#000" },
});
export const TagFooterButton = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  margin: "30px 0 0",
  "& .MuiTypography-root": { fontSize: "13px" },
});

export const TagAutocompleteOptions = styled(Box)({
  // "& .myCustomListtag": {
  //   padding: 0,
  //   "&::-webkit-scrollbar": {
  //     width: "1em",
  //   },
  //   "&::-webkit-scrollbar-track": {
  //     backgroundColor: "#dedede"
  //   },
  //   "&::-webkit-scrollbar-thumb": {
  //     backgroundColor: "#dedede",
  //     borderRadius: "4px",
  //   },

  // },
  "& .MuiPaper-root": {
    boxShadow: "none"
  },

  "& .MuiListItem-root": { height: "17px", },
  "& .MuiListItemButton-root": {
    padding: "5px 8px",
    borderBottom: "1px solid #E0E3E7",
    "& span": {
      fontSize: "13px",
      color: "#000",
      borderRadius: "50px",
      padding: "2px 0",
      fontWeight: 600
    },
    "& .iconButtonds": { display: "none" },
    "&:hover .iconButtonds": {
      display: "flex",
      gap: "4px"
    },
    "& .MuiAutocomplete-option.Mui-focused": {
      background: 'none',
    }
  },
  "& .iconButtonds": {
    padding: "3px",
    position: "absolute",
    right: 0,
    top: "3px",
    "& svg": {
      fontSize: "18px"
    }
  },
  "& .MuiAutocomplete-listbox": {
    padding: 0
  },
});
export const RenameTagBox = styled(Box)({
  width: "100%",
  "& .renamefieldd": {
    width: "100%",
  }
});

/*****=========== End Manage Tags (Action Popus Styling) ===========*****/

/*****=========== Start Mass convert Popups (Action Popus Styling) ===========*****/
export const MassConvertRow = styled(Box)({
  padding: "6px 0 14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiFormLabel-root": {
    color: "#000 !important",
    fontSize: "14px",
    fontWeight: 600,
    "@media screen and (max-width:767px)": {
      fontWeight: 600,
      padding: "0 0 4px",
    }
  },
  "& .MuiCheckbox-root": { padding: "0 5px 0 7px" },
  "& .MuiRadio-root": { padding: "0 5px", color: "#000" },
  "& .MuiTypography-root": {
    fontSize: "13px", color: "#000",
  },
  "& .MuiSvgIcon-root": { fontSize: "18px" },
  "& .Mui-checked": { color: "#d7282f !important" },
  "& .MuiCheckbox-root svg": {
    display: "none",
  },
  "& .MuiDataGrid-columnSeparator": { display: "none" },
  ".MuiCheckbox-root": {
    "&:before": {
      content: '" "',
      display: "block",
      width: "14px !important",
      height: "14px !important",
      border: "1px solid #000",
      borderRadius: "4px",
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
      top: "2px",
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
});
export const MassConvertBox = styled(Box)({
  borderRadius: "5px",
  border: "1px solid #E2E2E2",
  padding: "20px 5px 20px 15px",
  "@media screen and (max-width:1024px)": {
    padding: " 10px 15px"
  }

});
export const MassConvertDialog = {
  "& .MuiDialogContent-root": {
    padding: "18px 18px 0",
  },
  "& .MuiPaper-root": {
    width: "700px",
    maxWidth: "700px",
  }
};
export const ConversionTypography = styled(Typography)({
  justifyContent: "flex-end",
  display: "flex",
  alignItems: "center",
  fontSize: "12px",
  padding: "10px 0",
  "& .MuiLink-root": { color: "#D7282F" },
});

/*****=========== End Mass convert Popups (Action Popus Styling) ===========*****/

/*****=========== Start Covert Single lead Styling here ===========*****/
export const ConvertLeadData = styled(Box)({
  margin: "1rem 0 0",
});
export const LeadOwnerName = styled(Typography)({
  fontSize: "14px",
  color: "#000",
});
/*****=========== End Covert Single lead Styling here ===========*****/

/*****=========== Start Mapping Conversion Style here ===========*****/

export const FieldMappingContainer = styled(Box)({
  background: "#fff",
  margin: "1rem 0 0",
  padding: "1rem",
  borderRadius: "10px",
  border: "1px solid #D2D2D2",
  position: "relative",
  overflow: "hidden",
  "& .supcolor": { color: "#d7282f" }
});
export const MappingHedingTop = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "& .custom_txt": {
    fontSize: 12,
  }
});

export const FieldMappingInner = styled(Box)({
  margin: "1rem 0 0",
  position: "relative"
});
export const MappingTableArea = styled(Box)({
  margin: "0 0 30px",
});

export const FieldMappingTitle = styled("div")({
  background: "#FBFBFB",
  padding: "10px 15px",
  borderLeft: "5px solid #FACED0",
});
export const FieldTitleText = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#000",
  fontSize: "16px",
  fontWeight: 600,
  "@media screen and (max-width:1024px)": {
    fontSize: "14px",
  }
});

export const FieldMappingColumn = styled("div")({
  marginTop: "1rem",
});
export const FieldCoulmnInn = styled(Box)({
  background: "#F9FAFB",
  padding: "15px 20px",
  border: "1px solid #EAECEF",
  borderRadius: "7px 0 0 7px",
  borderRight: 0,
  margin: "10px 0 0",
});
export const FieldCoulmnText = styled(Typography)({
  color: "#000",
  fontSize: "16px",
  fontWeight: 600,
  borderRight: "1px solid #FACED0",
  padding: "6px 0",
  "@media screen and (max-width:1024px)": {
    fontSize: "13px",
  }
});
export const MappingFormcontrol = styled(FormControl)({
  color: "#D7282F",
  fontSize: "12px",
  "&. MuiFilledInput-root": { fontSize: "20px" },
  "& svg": { width: 17 },
  "& .MuiInputBase-input": {
    padding: "7px 14px",
    fontSize: 14,
    color: "#000",
    fontWeight: 600,
    "@media screen and (max-width:1024px)": {
      fontSize: "12px",
    }
  },
});

export const TableStyle = {
  "& .MuiTableRow-root": {
    borderRadius: "10px",
    outline: "1px solid #EAECEF",
    "& .MuiTableBody-root": {
      "& .MuiTableRow-root": {
        borderRadius: "12px",
      },
    },
  },
  "& .MuiTable-root": {
    borderSpacing: "5px",
  },
  "& .mappingtabel": {
    borderCollapse: "separate",
    borderSpacing: "1px 15px",
  },
  "& .Contactstyle": {
    borderColor: "#D7282F !important",
  },
  "& .Companystyle": {
    borderColor: "#4476CF !important",
  },
  "& .Dealstyle": {
    borderColor: "#4476CF !important",
  },
  "& .icon-leadsblack:before": {
    color: "green",
  },
  "& .icon-contact:before": {
    fontSize: "12px",
  },
};
export const MappingActionArea = styled(Box)({
  position: "fixed",
  bottom: 0,
  background: "#fff",
  left: 283,
  right: 0,
  width: "calc(98% - 286px)",
  padding: 10,
  "@media screen and (max-width:1280px)": {
    left: 20,
    width: "94%"
  }
});
export const MappingActionButon = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "end",
  justifyContent: "end",
});
/*****=========== End Mapping Conversion Style here ===========*****/

/*****=========== Search and Add new Tag styling here ==========*****/
export const SearchAddTag = styled(Box)({
  "& .MuiInputBase-root": {
    padding: "3px"
  },
  "& fieldset": {
    // boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    borderRadius: "4px 4px 0px 0px",
    border: "none",
    borderBottom: "none"
  }
});

export const TagInnerDiv = styled(Box)({
  "& .MuiButtonBase-root": {
    height: "20px",
    borderRadius: "0 16px 16px 0",
    margin: "0 2px"
  },
  "& .MuiInputBase-root": {
    paddingRight: "0"
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    borderBottom: "1px solid #e8eaed",
    borderRadius: '0'
  },
  "& .MuiInputBase-root .Mui-focused": {
    border: "none",
  },
  "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
    borderBottom: "1px solid #e8eaed",
  },
  "& .MuiChip-label": {
    fontSize: "12px"
  },
  "& .tagchip": {
    "& .MuiSvgIcon-root": {
      fontSize: "13px",
      color: "#6c6a6a"
    },
    "& .MuiChip-avatar": {
      order: 1,
      margin: "4px 1px 0 0",
    },
    "& .MuiChip-deleteIcon": {
      order: 2
    },
  },

});

export const OtherOptionmenu = styled(Box)({
  "& .tagactioninner":
    { margin: "5px 0 0 0" },
});
export const PaperOptionsStyle = styled(Paper)({
  minWidth: 125,
  background: "#fff",
  position: "absolute",
  boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
  borderRadius: "4px",
  zIndex: 10,
  top: "25px",
  right: "20px",
  "& .MuiList-root": {
    "& .MuiTypography-root": {
      fontSize: "12px",
      fontWeight: 400
    },
    "& .MuiListItemIcon-root": {
      minWidth: "45px"
    },
    "& .MuiMenuItem-root": {
      padding: "3px 6px"
    },
    "& .MuiSvgIcon-root": {
      fontSize: "16px"
    }
  },
});
export const TagMenuActionList = styled(MenuList)({
});
export const NoTagsCreated = styled(Box)({
  padding: "27px 12px",
  "& .MuiTypography-root": {
    color: "#666363",
    fontWeight: 400,
    fontSize: "13px"
  },
});

export const TagStylePopover = styled(Popover)({
  "& .MuiPaper-root": {
    width: "300px",
    boxShadow:
      "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
  },
});
export const SavedTagsArea = styled(Box)({
  // padding: "5px",
  // borderBottom: "1px solid #e8eaed",
  background: "#fff",
  zIndex: 1,
  position: "relative",
  "& .chipActions": { display: "none" },
  "& .MuiChip-label:hover .chipActions": {
    display: "flex", transition: "width 2s", cursor: 'pointer', margin: "-13px 0 0", alignItems: "center", gap: 4,
    "& svg": {
      color: "#fff"
    }

  },
  "& .MuiChip-label:hover .labelName": { visibility: "hidden" },
  "& .tagchip": { borderRadius: "0 16px 16px 0", height: "18px", margin: '0 1px' },
  "& .tagchip span": { fontSize: "11px", fontFamily: "Open Sans", color: "#fff", position: "relative" },
});


/*****=========== Start Manage Full Tag page  styling here ==========*****/
export const HeadingManagetag = styled(Typography)({
  fontSize: 16,
  fontWeight: 600
});
export const DesManagetag = styled(Typography)({
  fontSize: 14,
  fontWeight: 400
});

export const ManageTagContainer = styled(Box)({
  margin: "20px 0 0",
  "& .MuiInputBase-root": {
    borderRadius: "20px",
    height: "38px"
  }
});
export const Tagsearch = styled(Box)({
  width: "300px",
  "@media screen and (max-width:600px)": {
    width: "100%"
  }
});
export const IconButtonBoth = styled(IconButton)({
  display: "flex",
  gap: '5px'
});
/*****=========== End Manage Full Tag page  styling here ==========*****/


/*****============= Start Task Module styling here ===============******/
export const OtherModeuleDetailOuter = styled(Box)({
  padding: "0 20px 15px",
  position: "relative",
  "@media screen and (max-width: 1600px)": {
    padding: "0 10px 15px",
  },
  "@media screen and (max-width: 767px)": {
    padding: "0 5px 15px",
  },
  "& .persondetailmobile": {
    position: "fixed",
    left: '12px',
    alignItems: "center",
    transform: "rotate(-90deg)",
    transformOrigin: "center left",
    zIndex: 1,
    background: "#000",
    color: "#fff",
    fontSize: "15px",
    padding: "10px",
    "@media screen and (max-width: 1200px)": {
      display: "inline-flex",
    },
  }
});
export const OtherModuleDetailInner = styled(Stack)({
  color: "#000",
  fontWeight: 700,
  transition: 'all ease .5s',
  '& .arrowPosition': {
    position: 'relative',
    //left: '-30px',
    transform: 'rotate(-180deg)',
  },
  "@media screen and (max-width: 1200px)": {
    "& .detaildataright": {
      maxWidth: "100%",
      flexBasis: "100%"
    }
  }
});
export const CardColumn = styled("div")({
  display: "flex !important",
  gap: '5px',
  justifyContent: "space-between",
  padding: 7,
  margin: "0 5px",
  position: "relative",
  // borderRadius: 6,
  minHeight: "55px",
  transition: 'all ease .5s',
  width: "calc(100% - 10px) !important",
  borderRadius: 0,
  "@media screen and (max-width:1024px)": {
    margin: "0",
  },
  "&::after": {
    content: "''",
    position: "absolute",
    backgroundColor: "#D2D2D2",
    width: "1px",
    height: "90%",
    top: "3px",
    // right: "-5px",
    right: "-5px",
    "@media screen and (max-width:600px)": {
      display: "none"
    },
  },
  "& .buttonstyle": {
    backgroundColor: "#ddd",
    border: "none",
    color: "#d7282f",
    textAlign: "center",
    width: "20px",
    height: "20px",
    transition: "all 0.5s",
    cursor: "pointer",
    borderRadius: "50px"
  },
  "& .buttonstyle:hover": {
    backgroundColor: "#b9b9b9",
  },
  "& svg": {
    fontSize: "18px",
    margin: '-1px 0 0 0'
  },
  "&:hover": {
    backgroundColor: "#fafafa",
  },
});
export const AllTaskListingContainer = styled(Box)({
});
export const OtherTopBox = styled(Box)({
  display: "flex",
  gap: '5px',
  justifyContent: "space-between",
  padding: "10px 0 0"
});
export const LinkButtomn = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& button": {
    backgroundColor: "#ddd",
    border: "none",
    color: "#000",
    textAlign: "center",
    width: "22px",
    height: "22px",
    transition: "all 0.5s",
    cursor: "pointer",
    borderRadius: "50px"
  },
  "& button:hover": {
    // paddingRight: "24px",
    // paddingLeft: "0.2px",
  },
  '& .MuiTypography-root': {
    fontWeight: 700,
    fontSize: "1rem",
    color: "#000",
    margin: "0 0 0 10px"
  },
  "& svg": {
    fontSize: "18px",
    color: "#000",
    margin: "1px 0 1px"
  }
});
export const AllTaskListingOuter = styled(Box)({
  // overflow: "hidden",
  // overflowX: "scroll",
});
export const AllTaskListingWrapper = styled("div")({
  width: "100%",
  // minWidth: "1000px",
  margin: "5px 0 15px",
  // minHeight: "120px",
  "& .selectedcard": {
    background: "#fafafa",
    // borderRadius: "6px"
  },
  "& .MuiLink-root": {
    fontWeight: 600
  }
});
export const GridCommonItem = styled(Grid)({
  "&:last-child .cardcoulmn::after": {
    display: "none"

  }
});
export const LinkText = styled(Link)({
  color: "#0F4B98",
  '& .MuiTypography-root': {
    fontWeight: 600,
    fontSize: "14px"
  }
});
export const ImageContainer = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  gap: 6,
  "@media screen and (max-width: 1600px)": {
    gap: 1,
  },
  "& .icon-main-task:before": {
    fontSize: "18px"
  },
  "& span": {
    padding: "0 5px"
  },
  "& .icon-incoming-new:before": {
    fontSize: "18px"
  }
});
export const ImageLabelText = styled("div")({
  alignItems: "start",
  gap: 8,
  lineHeight: "15px",
  "& .taskname": {
    fontWeight: 600,
    fontSize: "14px !important",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textTransform: "capitalize",
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '2',
    display: "-webkit-box",
  },
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    fontSize: "13px",
  },
  "& img": {
    width: "100%",
  },
  "& .alltaskcarousel": {
    display: 'inline',
    fontSize: "12px"
  }
});
export const InfoContainer = styled("div")({
  // width: "38%",
  textAlign: "center",
  // borderRight: "1px solid #D2D2D2",
  // margin: "0 -15px 0 2px",
  // padding: "0px 16px 0 0",
  "@media screen and (max-width: 1700px)": {
    padding: "0px 7px 0 0",
  },
  "& .MuiTypography-root": {
    color: "#949494",
    fontSize: "9px",
  },
});
export const OtherTaskStatus = styled(Typography)({
  // color: "#D7282F !important",
  textTransform: 'capitalize'
});
export const OtherPeriority = styled("div")({
  background: "#FFEEEF",
  textTransform: 'capitalize',
  borderRadius: "50px",
  color: "#d7282f",
  fontSize: "12px",
  padding: "1px 5px",
  display: "inline-flex",
  margin: "5px 0",
  "@media screen and (max-width: 1024px)": {
    padding: "2px 4px",
    fontSize: "12px",
  },
  "& svg": {
    padding: "2px",
    fontSize: "18px",
  }
});
export const OtherCommonDate = styled(Typography)({});
export const DividerStyle = styled(Divider)({
  margin: "14px 0 0 10px",
  height: "72px"
});
export const ActivitiesViewDetails = styled(Box)({
  border: "1px solid #F2F2F2",
  borderRadius: "10px 10px 0px 0px",
  // margin: "1rem 0",
});
export const ActivitiesAccordionData = styled(Box)({
  padding: '10px',

});
export const InnerListData = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "14px",
  },

});
export const OpenActivityList = styled(List)({
  "& .MuiList-root": {
    padding: 0
  },
  "& .MuiListItemButton-root": {
    padding: "5px"
  }
});

export const RecordsButtonsLeft = styled(Box)({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translate(-50%, -50%)",
});
export const RecordsButtonsRight = styled(Box)({
  position: "absolute",
  right: "-25px",
  top: "50%",
  transform: "translate(-50%, -50%)",
});

/************* Start Links styling here***********/
export const TaskLinkdOuter = styled(Box)({
  border: "1px solid #E2E2E2",
  padding: "10px 20px",
  borderRadius: 5,
  margin: "1rem 0",
  "@media screen and (max-width: 1400px)": {
    padding: "10px 15px",
  },
  "@media screen and (max-width: 767px)": {
    padding: "10px",
  },
});
export const LinksList = styled(Box)({
  margin: "2rem 0 1rem"
});
export const LinksListRow = styled(Box)({
  background: "#F8FAFB",
  display: "flex",
  alignItems: "center",
  gap: 10,
  borderRadius: 4,
  "& .MuiAvatar-root": {
    background: "#EBEBEB",
    borderRadius: "4px 0 0 4px",
    color: "#4a4a4a",
    fontSize: "15px",
    "& .MuiTypography-root": {
      color: "#000",
    },
  },
  "& .MuiTypography-root": {
    fontSize: "14px",
    color: "#0F4B98",
    fontWeight: 600,
  },
  "& .linksicons": {
    display: "none",
    transition: "all 0.2s",
    "& buttons": {
      padding: "3px 6px"
    }
  },
  "&:hover .linksicons": {
    display: "block"
  }
});

export const LinksListInner = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 10,
  justifyContent: "space-between",
  width: "100%",
  padding: "0 5px 0 0",
  "& svg": {
    color: "#d7282f",
    fontSize: "16px",
  }
});
export const LinkTopSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
export const LinksButtons = styled('div')({
  display: "flex",
  gap: 6,
  justifyContent: "flex-end"
});
export const LinksAddColumn = styled('div')({
  margin: "1rem 0"
});

/************* Ends Links styling here***********/

/************* Start Task Information styling here***********/
export const TaskFullTextarea = styled('div')({
  margin: "8px 0"
});
export const RelatedToBox = styled('div')({
  display: "flex",
  alignItems: "center",
  "& .MuiAvatar-root": {
    marginRight: "6px",
    width: "25px",
    height: "25px",
  },
  "& .TaskUsername": {
    fontWeight: 600,
  },
  "& .MuiListItemText-root": {
    margin: "0",
  },
  "& .TaskUseremail": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%"
  },
  "& .MuiTypography-root": {
    color: "#4a4a4a",
    fontSize: "12px",
  },
  "& li": {
    padding: "0px !important",
    width: "100%"
  },
  "& .MuiAutocomplete-option.Mui-focused": {
    background: "transparent"
  },
  "& .MuiList-root": {
    padding: 0,
    width: "100%"
  },
  "& .MuiButtonBase-root": {
    padding: "4px 8px"
  },
});
export const TaskKanbanInnerInfoData = styled("div")({
  padding: "12px 6px",
  background: "#fff",
  border: "1px solid #e5e5e5",
  margin: "8px 2px",
  borderRadius: 4,
  "@media screen and (max-width: 1600px)": {
    margin: "8px 6px",
    padding: "6px",
  },
});
export const TaskKanbanScrollOuter = styled("div")({
  // height: "597px",
  // height:"700px",
  overflowY: "auto",
  "& svg": {
    color: "#4a4a4a !important",
  }
});
/************* End Task Information styling here***********/

/************* Start Stepper styling here***********/
export const StepperPipeleine = styled(Box)({
  // margin: "1rem 0",
  margin: "-1rem 0 0",
  width: "100%",
  "& .MuiStepLabel-label": {
    color: "#4A4A4A",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "Open Sans",
  }
});
export const HorizontalStepper = styled(Box)({
  display: "table",
  width: "100%",
  margin: "0 auto",
  "& .MuiTypography-root": {
    fontSize: "12px",
    margin: "-5px 0"
  },
  "& span": {
    margin: "9px 0",
    display: "inline-block",
  }
});
/*****============= End Stepper styling here ===============******/

/*****========= Start styling for NoData found in CRM =========*****/
export const CrmNoDetailFound = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
});
export const CrmNoDetailFoundInner = styled(Box)({
  textAlign: "center",
  "& .MuiTypography-root": {
    fontSize: "18px",
    fontWeight: "700",
    color: "#393939",
    padding: "10px"
  },
});
/*****========= End styling for NoData found in CRM =========*****/

/*****======== Start Meeting Module (Sidebar styling) =======*****/
export const PDParticipantsCol = styled(Box)({});
export const PdInvitedInfoBox = styled(Box)({
  background: "#FFF3F3",
  color: "#d7282f",
  borderRadius: "4px",
  "& i:before": {
    color: "#d7282f",
  },
  "& svg": {
    color: "#d7282f",
  }
});

export const PdAcceptedInfoBox = styled(Box)({
  background: "#F9FFF8",
  color: "#8AAC81",
  borderRadius: "4px",
  "& i:before": {
    color: "#8AAC81",
  },
  "& svg": {
    color: "#8AAC81",
  }
});

export const PdNoReplyInfoBox = styled(Box)({
  background: "#EDF3FF",
  color: "#4472C4",
  borderRadius: "4px",
  "& i:before": {
    color: "#4472C4",
  },
  "& svg": {
    color: "#4472C4",
  }
});

export const PdDeclinedInfoBox = styled(Box)({
  background: "#FFFBEE",
  color: "#FFC000",
  borderRadius: "4px",
  "& i:before": {
    color: "#FFC000",
  },
  "& svg": {
    color: "#FFC000",
  }
});
export const ParticipantsAccordionData = styled(Box)({
  padding: '10px',
  "& .MuiAccordionSummary-root": {
    background: "transparent",
    margin: "0"
  }
});


