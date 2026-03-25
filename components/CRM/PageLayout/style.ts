// import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  Popover,
  TextareaAutosize,
  Typography,
  styled
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Switch, { SwitchProps } from "@mui/material/Switch";
export const OutLinedButton = styled(Button)({
  borderRadius: "3px",
  border: "1px solid #BFBFBF",
  color: "#4A4A4A",
  fontSize: "14px",
  fontWeight: 600,
  padding: "0 10px",
  minWidth: "auto",
  textTransform: "capitalize",
  height: "30px",
  "& .MuiSvgIcon-root": { fontSize: "16px" },
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
export const FilledButton = styled(Button)({
  background: "#D7282F",
  opacity: "85%",
  borderRadius: "3px",
  border: "1px solid #D7282F !important",
  color: "#fff",
  fontSize: "14px",
  fontWeight: 600,
  padding: "0 10px",
  minWidth: "auto",
  textTransform: "capitalize",
  height: "30px",
  "& .MuiSvgIcon-root": { fontSize: "16px" },
  "&:hover": {
    background: "#fff",
    color: "#D7282F",
  },
  "@media screen and (max-width: 1600px)": {
    padding: "0 8px",
  },
});
export const FullPageContainer = styled(Box)({
  background: "#fff",
  borderRadius: "4px",
  padding: 12,
});
export const TopHeading = styled(Typography)({
  fontSize: "17px",
  color: "#D7282F",
  paddingBottom: "5px",
  "& .icon-leads:before": {
    fontSize: "15px"
  }
});

export const InnerContentContainer = styled(Box)({
  marginTop: 15,
});
export const PageContentleft = styled(Box)({
  border: "1px solid #E0E3E7",
  borderRadius: "5px 5px 0px 0px",
  padding: "8px",
  "@media screen and (max-width: 899px)": {
    "& .MuiAccordionSummary-root": {
      minHeight: "30px"
    }
  },

});
export const LeadFieldBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#8A8A8A",
  borderBottom: "1px solid #D2D2D2",
  padding: "0 0 9px",
  background: "#fff",
  "& svg": { fontSize: 20, borderLeft: "1px solid #D2D2D2" },
  "@media screen and (max-width: 899px)": {
    padding: "0 0 3px",
  },
});
export const IconText = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 8,
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#231F20",
    textTransform: "capitalize",
    "@media screen and (max-width: 1600px)": { fontSize: 12 },
  },
  "& svg": { border: "none !important" },
});

export const ItemGridRow = styled(Grid)({
  margin: "10px",
});

export const FieldTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: 12,
  color: "#4A4A4A",
});
export const FormBox = styled(Box)({
  margin: "14px 0",
  display: "grid",
  gap: 12,
});

export const FieldContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#8A8A8A",
  border: "1px solid #D2D2D2",
  padding: "9px",
  borderRadius: 3,
});
export const Deleteicon = styled(DeleteOutlineOutlinedIcon)({
  color: "#d7282f",
  fontSize: 18,
});
export const OuterBox = styled(Box)({
  margin: 1,
});

/************ Page Right section styling *********/
export const PageContentRight = styled(Box)({
  border: "1px solid #E0E3E7",
  padding: 20,
});
export const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media screen and (max-width:900px)": {
    display: "block",
  },
});
export const PButtonContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const AvatarContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  "& .MuiTypography-root": {
    fontWeight: 600,
  },
  "& .MuiAvatar-root": {
    width: "70px",
    height: "70px",
    borderRadius: "4px"
  }
});
export const ImageUpload = styled(Box)({
  position: "relative"
});
export const ImageActionButton = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
  bottom: "15px",
  left: "-7px"
});

export const IconBg = styled("div")({
  background: "#797979",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  color: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    fontSize: "16px"
  }
});



export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 25,
  height: 13,
  padding: 0,
  margin: "6px 0 0 !important",
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 9,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#D7282F",
      "& + .MuiSwitch-track": {
        opacity: 1,
        background: "#fff",
        border: "1px solid #E0E0E0",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 9,
    height: 9,
    borderRadius: 6,
    // transition: theme.transitions.create(['width'], {
    //   duration: 200,
    // }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#cbcbcb",
    boxSizing: "border-box",
  },
}));
export const LeadsContentContainer = styled("div")({
  margin: "1rem 0",
  border: "1px solid #E2E2E2",
  borderRadius: 4,
  padding: "10px 12px 18px",
  background: "#fff"
});
export const LeadsContentInner = styled("div")({});
export const GridBox = styled(Grid)({
  marginTop: "1rem",
});
export const TextFieldRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  border: "1px solid #BBBBBB",
  borderRadius: 4,
  alignItems: "center",
  padding: "3px 8px",
  color: "#8A8A8A",
  background: "#fff",
  gap: 10,
});
export const TextAreaFieldRow = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  border: "1px solid #BBBBBB",
  borderRadius: 4,
  alignItems: "center",
  padding: "10px 8px",
  color: "#8A8A8A",
});
export const TextFieldRowLeft = styled("div")({
  display: "flex",
  alignItems: "center",
  height: 30,
  color: "red",
  "& .MuiInputBase-input": {
    fontSize: "13px",
  },
  "& .MuiTypography-root": {
    fontSize: 12,
    color: "#CFD2DA",
    padding: "0 5px",
    "@media screen and (max-width:1600px)": {
      fontSize: "11px",
    },
  },


});
export const TextFieldRowRight = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "50%",
  flex: "auto",
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#CFD2DA",
  },
});
export const TextAreaFieldRowRight = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "100%",
  flex: "auto",
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#CFD2DA",
  },
});
export const FormFieldContainer = styled(FormControl)({
  color: "#D7282F",
  fontSize: "12px",
  "&. MuiFilledInput-root": { fontSize: "20px" },
  "& .MuiInputBase-input": { padding: "6.5px 14px" },
  "& svg": { width: 17 },
  "& .MuiMenuItem-root": { fontSize: "10px" },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    borderRight: "1px solid #8A8A8A",
    borderRadius: "0",
  },
  "& .MuiInputBase-root:hover fieldset": {
    border: "none",
    borderRight: "1px solid #8A8A8A",
  },
});

export const GridItem = styled(Grid)({
  display: "grid",
});

export const EditLeadHead = styled(Typography)({
  padding: "6px 0",
});

export const ListItemBox = styled(Box)({
  "& .MuiListItem-root": { padding: "0 12px", cursor: "pointer" },
  "& .MuiTypography-root": { fontSize: 12 },
});

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
  width: "100%",
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
}));
export const HeadingOption = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  cursor: "pointer",
  "& svg": { color: "#8A8A8A", fontSize: "16px" },
});
export const LeadContentOuter = styled(Box)({});
export const PreviewCustomDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    maxWidth: "1050px",
  },
  "& .MuiDialogContent-root": {
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
export const DiaglogHeader = styled(Box)({
  background: "#FFECEC",
  padding: "5px 19px",
  "& .MuiTypography-root": {
    color: "#D7282F",
    fontSize: "20px",
    fontWeight: 600,
  },
});

export const PreviewTextRow = styled(Box)({
  display: "block",
  justifyContent: "space-between",
  border: "1px solid #BBBBBB",
  borderRadius: 4,
  alignItems: "center",
  padding: "5px 8px",
  color: "#8A8A8A",
  gap: 10,

  "& .MuiInputBase-formControl:before": { border: "none !Important" },
  "& .MuiInputBase-root:after": { border: "none" },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none !important",
  },
  "& .MuiInputBase-formControl": {
    paddingLeft: "0",
  },
});
export const TextFieldRowLeft2 = styled("div")({
  display: "flex",
  alignItems: "center",
  height: 30,
  color: "red",
  position: "relative",
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#CFD2DA",
  },

  "& .MuiFormControl-root": {
    "&::placeholder": {
      opacity: 1,
    },
  }
});

export const StylesPopOver = styled(Popover)({
  "& .MuiPaper-root": {
    boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
  },
  "& .MuiListItem-root": {
    borderBottom: "1px solid #e5e5e5",
    '&:last-child': { border: "none" },
    '&:hover': { background: "#e5e5e5" }
  },
});

/*****=========== Edit Property Popup ===========*****/
export const EditPropCheck = styled(Box)({
  // padding: "7px 0",
  fontSize: "14px",
});
export const CustomLeadsEditBox:any = styled(Box)(({ option }: any) => ({
  height: option ? "300px" : "100px",
  overflowY: "scroll",
  background: "#eff1f5",
  padding: "1rem",
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
  "& .MuiDialogContent-root": {
    "@media screen and (max-width:1024px)": {
      fontSize: "14px",
    },
  },
  "& .MuiInputBase-root": {
    background: "#fff"
  }
}));

/*****=========== MultiSelect Popup ===========*****/
export const MultiSelectCheck = styled(Box)({
  margin: "-10px 0 0 0",
  fontSize: "14px",
});
export const TooltipValueBox = styled(Box)({
  margin: "6px 0 0 0"
});



