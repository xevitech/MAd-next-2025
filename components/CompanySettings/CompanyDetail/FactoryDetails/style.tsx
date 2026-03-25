import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import {
  Box,
  Button,
  Select,
  Stack,
  Switch,
  Typography,
  styled,
} from "@mui/material";

export const CompanyFacilityContainer = styled(Stack)({
  // border: '1px solid #e2e2e2',
  borderRadius: "5px",
  padding: "20px",
  // gap: "18px",
  background: "#fff",
  "@media screen and (max-width:767px)": {
    padding: "0px",
  },
});
export const CompanyFacilityInnContainer = styled(Box)({
  border: "1px solid #e2e2e2",
  borderRadius: "5px",
  padding: "20px",
  background: "#fff",
  "@media screen and (max-width:767px)": {
    padding: "10px",
  },
});
export const CompanyFacilityInnContainerQAQCnRND = styled(Box)({
  // border: '1px solid #e2e2e2',
  margin: "14px 0 0 0",
  borderRadius: "5px",
  padding: "16px 16px 16px 16px",
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  position: "relative",
  "@media screen and (max-width:767px)": {
    padding: "10px",
  },
  "& .qaqcandrndHeading": {
    padding: "0px",
  },
  "& .toggleBoxstyle": {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
});

export const SavebtnBox = styled(Box)({
  position: "absolute",
  padding: "10px",
  display: "flex",
  justifyContent: "left",
  right: "0",
});
export const SubHeadingPage = styled(Box)({
  padding: "0 0 10px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export const TypographyTitle = styled(Typography)({
  color: "#000",
  fontSize: "16px",
  fontWeight: 600,
  "@media screen and (max-width:767px)": {
    fontSize: "14px",
  },
});
export const Separation = styled(Box)({
  border: "1px solid #ddd",
  margin: "16px",
  borderRadius: "5px",
  padding: "16px",
  "@media screen and (max-width:767px)": {
    padding: "16px 0 0 0",
  },
  "&.spacing": {
    "@media screen and (max-width:767px)": {
      padding: "16px",
      margin: "0 0 16px 0",
    },
  },
  "&.spacing1": {
    "@media screen and (max-width:767px)": {
      padding: "16px",
      margin: "16px 0 16px 0",
    },
  },
});
export const SeparationSkeleton = styled(Box)({
  padding: "0px",
  border: "1px solid #ddd",
  margin: "16px",
  borderRadius: "5px",
  "&.spacing": {
    "@media screen and (max-width:767px)": {
      // padding: "16px",
      margin: "0 0 16px 0",
    },
  },
  "&.spacing1": {
    "@media screen and (max-width:767px)": {
      padding: "0 16px 16px 16px",
      margin: "0 0 16px 0",
    },
  },
  "&.spacing2": {
    "@media screen and (max-width:767px)": {
      padding: "0 16px 16px 16px",
      margin: "0 0 16px 0",
    },
  },
  "&.spacing3": {
    "@media screen and (max-width:767px)": {
      padding: "0 16px 16px 0px",
      margin: "16px 0 0 0",
    },
  },
  "&.spacing4": {
    "@media screen and (max-width:767px)": {
      padding: "0 16px 16px 16px",
      margin: "16px 0 0 0",
    },
  },
});

export const DataRowHere = styled(Box)({
  borderBottom: "1px solid #DDDDDD",
  paddingBottom: "5px",
  display: "flex",
  height: "100%",
  "& .SpacingforImages": {
    "@media screen and (min-width:900px)": { margin: "-8px 0 0 0" },
  },
  transition: "max-height 0.3s ease-out, opacity 0.3s ease-out",
  maxHeight: "500px",
  overflow: "hidden",
  opacity: 1,
  "&.hidden": {
    maxHeight: 0,
    opacity: 0,
    padding: 0,
    pointerEvents: "none",
  },
  "& .RndSpending": {
    // "@media screen and (max-width:767px)": { display: "none" },
  },
});
export const DataRowTitle = styled(Box)({
  "& .MuiTypography-body1": {
    color: "#9199aa",
    fontSize: "14px",
    fontWeight: 400,
  },
});
export const SuperScript = styled("span")({});
export const SelectPlaceholder = styled(Typography)({
  fontSize: "13px !important",
  color: "#A2A2A2 !important",
});
export const DataRowValue = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "& .MuiTypography-body1": {
    color: "#231F20",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    "@media screen and (max-width:900px)": {
      flexDirection: "column",
      alignItems: "start",
      width: "100%",
    },
  },
});
export const CompanyFacilityData = styled(Box)({
  // padding: "1rem 0",
  "& .height100": {
    height: "100%",
    display: "flex",
    alignItems: "stretch",
  },
});
export const QaqcandRndSeparation = styled(Box)({
  border: "1px solid #ddd",
  borderRadius: "5px",
  margin: "0",
  padding: "16px",
});
export const ButtonModeHere = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "15px",
});

export const UploadImagesRow = styled(Box)({
  display: "flex",
  gap: "8px",
  paddingBottom: "5px",
  flexWrap: "wrap",
});
export const UploadImageCol = styled("span")({
  display: "inline-flex",
  gap: "8px",
  alignItems: "center",
  border: "1px solid #d2d2d2",
  borderRadius: "5px",
  // padding: "8px",
  padding: "3px 6px",
  "& .MuiTypography-body2": {
    position: "relative",
    padding: "0 8px 0 0",
    "&::before": {
      borderRight: "1px solid #d2d2d2",
      content: '" "',
      position: "absolute",
      right: "0",
      height: "17px",
      top: 3,
    },
  },
  "& svg": {
    padding: "3px 0 0",
  },
  "& img": {
    width: "30px",
    height: "24px",
    objectFit: "cover",
  },
});
export const UpImageName = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "8px",
  "& .imagenname": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "60px",
  },
});

/*****======= Edit style here ========*****/
export const EditDataRowHere = styled(Box)({
  border: "none",
  paddingBottom: "5px",
});
export const EditSaveIcons1 = styled(Box)({
  display: "flex",
  gap: "3px",
  alignItems: "center",
  cursor: "pointer",
  "& img": {
    width: "12px",
  },
  "& .MuiTypography-body1": {
    color: "#231F20",
    fontSize: "13px",
  },
});
export const EditSaveIcons = styled(Box)({
  display: "flex",
  gap: "15px",
  alignItems: "center",
  "& img": {
    width: "12px",
  },
  "& .MuiTypography-body1": {
    color: "#231F20",
    fontSize: "13px",
  },
});

export const CancelTextWithIcon = styled(Box)({
  color: "#d7282f",
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  "& svg": {
    fontSize: "18px",
    color: "#d7282f",
  },
  "& .MuiTypography-body1": {
    color: "#d7282f",
    "@media screen and (max-width:767px)": {
      display: "none",
    },
  },
  "&:hover": {
    opacity: "0.7",
  },
});
export const SaveTextWithIcon = styled(Box)({
  color: "#231f20",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "& svg": {
    fontSize: "18px",
    color: "#231f20",
  },
  "& .MuiTypography-body1": {
    color: "#231f20",
    "@media screen and (max-width:767px)": {
      display: "none",
    },
  },
  "&:hover": {
    opacity: "0.7",
  },
  position: "relative",
  "&::before": {
    borderLeft: "1px solid #d2d2d2",
    content: '" "',
    position: "absolute",
    left: "-6px",
    height: "17px",
    "@media screen and (max-width:767px)": {
      left: "-9px",
    },
  },
});
export const EditModeBoxContainer = styled(Box)({
  position: "relative",
  "& .editview": {
    border: "none",
  },
});
export const AstricksMark = styled("span")({
  color: "#d7282f",
  "& svg": {
    fontSize: "16px",
    marginLeft: "5px",
  },
  "& .notmadatory": {
    display: "none",
  },
  "& .madatory": {
    display: "inline",
  },
});
export const AdditionAddress = styled(Typography)({
  color: "#d7282f !important",
  fontSize: "13px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "& svg": {
    fontSize: "16px",
  },
});
export const EditUpImagesStack = styled(Box)({
  color: "#d7282f",
  // border: "1px solid #0000003b",
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "@media screen and (max-width:767px)": { flexDirection: "column" },
  "& svg": {
    fontSize: "16px",
    cursor: "pointer",
  },
});
export const EditBrowseIcon = styled("span")({
  "& .MuiButtonBase-root": {
    background: "#fff !important",
    boxShadow: "none",
    padding: 0,
  },
  "& .MuiButton-icon": {
    marginRight: "0 !important",
  },
});

export const EditBrowseText = styled(Typography)({
  fontSize: "14px",
  color: "#444",
  textTransform: "capitalize",

  "& .MuiTypography-root": {
    boxShadow: "none",
  },
});
export const SelectedEditSection = styled(Box)({
  display: "flex",
  gap: "10px",
  "@media screen and (max-width: 767px)": {
    flexWrap: "wrap",
  },
});

export const SelectedEditImg = styled(Box)({
  border: "1px solid #0000003b",
  padding: "5px",
  borderRadius: "5px",
  position: "relative",
  height: "80px",
  width: "100px",
  "& svg": {
    position: "absolute",
    top: "-7px",
    right: "-7px",
    background: "#fff",
    fontSize: "13px",
  },
  "& img": { width: "100%", height: "70%" },
  "& .imagename": {
    fontSize: "12px",
  },
});

export const MainHeading = styled(Typography)({
  fontSize: "16px",
  color: "#231f20",
  textTransform: "capitalize",
  fontWeight: "600",
});
/****************************************Factory********************** */
export const PlushIconBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
});
export const FooterDiv = styled(Box)({
  position: "relative",
  marginTop: "30px",
});
export const Radiomain = styled(Box)({
  position: "relative",
  paddingBottom: "20px",
  paddingTop: "8px",
});
// export const FormControl = styled(Box)({
//     "& .MuiFormControlLabel-label": {
//         fontSize: "px",
//         fontWeight: "400",
//       },

// });
// export const PlushtoltipBox = styled(LightTooltip)({
//   height:"33px",
//   width:"171px",
//   padding:"10px",
//   borderRadius:"3px",
//   backgroundColor:"#828282",
//   titl:"Add Another Store Details" ,
// });

export const PlushIcon = styled(Box)({
  display: "flex",
  justifyContent: "center",
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  backgroundColor: "#D7282F",
  gap: "10px",
  padding: "8px",
  "& svg": {
    color: "#FFFFFF",
  },
});
export const ViewMorLess = styled(Button)({
  position: "absolute",
  left: "50%",
  bottom: "-28px",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#fff",
  color: "#d7282f",
  border: "1px solid #d7282f",
  transition: "all ease .3s",
  fontSize: "13px",
  padding: "2px 8px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#d7282f",
    transition: "all ease .3s",
  },
});

export const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    fontSize: "13px",
  },

  "& .MuiPaper-root": {
    maxHeight: "100px !important",
    overflowY: "auto",
  },
}));

export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#d7282f",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    background: "#fff",
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export const SwitchInfo = styled(Box)({
  margin: "5px 0 0",
});
export const HeadingWithSwitch = styled(Box)({
  display: "flex",
  gap: "25px",
});
export const AddRemoveBTN = styled(Button)({
  background: "none",
  color: "#d7282f",
  whiteSpace: "nowrap",
  "&:hover": {
    background: "none",
  },
  textTransform: "capitalize",
  "& svg": {
    border: "2px solid",
    borderRadius: "50px",
  },
  "@media screen and (min-width: 1275px) and (max-width: 1307px)": {
    fontSize: "12px",
  },
  "@media screen and (max-width: 1090px)": {
    fontSize: "12px",
    padding: "6px 3px",
  },
  "@media screen and (max-width: 900px)": {
    margin: "0 0 0 4px",
  },
});
// Switch Button
export const SwitchButtons = styled(Switch)(({ theme }) => ({
  marginLeft: "10px",
  width: 29,
  height: 17,
  padding: 0,
  borderRadius: "20px",
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#D7282F" : "#D7282F",
      },
      "& .MuiSwitch-colorPrimary": {
        color: "#7e7c7c47",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#85898d" : "#B2BAC2",
    boxSizing: "border-box",
  },

  "@media screen and (max-width: 1400px)": {
    margin: "0 10px",
  },
}));
export const ToggleBox = styled("span")({
  borderLeft: "1px solid #d2d2d2",
});
