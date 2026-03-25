import {
  Box,
  IconButton,
  styled,
  TextField,
  Typography,
  Grid,
  ButtonBase,
  Drawer,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Popover from "@mui/material/Popover";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";

export const FieldContainer: any = styled("div")(({ borderNone }: any) => ({
  display: "flex",
  justifyContent: "space-between",
  minHeight: "45px",
  alignItems: "center",
  flex: 1,
  borderBottom: borderNone ? "" : "1px solid rgba(34, 51, 84, 0.1)",
  paddingBottom: 10,
}));

export const FieldLabel: any = styled("div")(({ flex }: any) => ({
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "169.3%",
  display: "flex",
  alignItems: "center",
  color: "rgba(34, 51, 84, 0.5)",
  flex: flex ? flex : 0.5,
  fontFamily: "Open Sans",
}));

export const FieldValue: any = styled("div")(({ flex }: any) => ({
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  letterSpacing: "0.09px",
  color: "#231F20",
  flex: flex ? flex : 0.5,
  justifyContent: "space-between",
}));

export const ChipContainer = styled("div")(({ flex }: any) => ({
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  letterSpacing: "0.09px",
  color: "#231F20",
  flex: flex ? flex : 0.5,
  flexWrap: "wrap",
  gap: 5,
}));

export const ContainerHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  paddingLeft: 20,
  paddingRight: 20,
  marginTop: 10,
});

export const ContentContainer = styled("div")({
  display: "flex",
  flex: 1,
  background: "#FFFFFF",
  gap: "20px",
  marginTop: 10,
});

export const LeftContainer = styled("div")({
  display: "flex",
  flex: 0.5,
  flexDirection: "column",
});

export const RightContainer = styled("div")({
  display: "flex",
  flex: 0.5,
  flexDirection: "column",
});

export const MainHeaderContainer = styled("div")({
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
});

export const HeaderTextContainer = styled("div")({
  marginTop: 25,
  flex: 0.5,
});

export const HeaderText: any = styled("div")(({ small }: any) => ({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: small ? 400 : 700,
  fontSize: small ? "14px" : "21px",
  lineHeight: small ? "19px" : "29px",
  alignItems: "center",
  color: small ? "#223354" : "#231F20",
  opacity: small && 0.5,
  marginBottom: 10,
}));

export const FloatingEditIcon = styled("div")({
  display: "flex",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
  color: "#D7282F",
  fontFamily: "Open Sans",
  paddingLeft: 20,
});

export const PencilIcon = styled("div")({
  marginRight: "5px",
  width: "10px",
  height: "10px",
  position: "relative",
});

export const PencilIcon1 = styled("div")({
  marginRight: "5px",
  width: "12px",
  height: "12px",
  position: "relative",
});

export const SocialPencilIcon1 = styled("div")({
  marginRight: "0px",
  position: "relative",
  display: "flex",
  "@media (max-width:1700px)": {
    marginRight: "-2px",
  },
});

export const PencilIcon2 = styled("div")({
  marginRight: "5px",
  top: "-6px",
  width: "14px",
  height: "14px",
  position: "relative",
});
export const UpdateCoverText = styled("div")({
  position: "relative",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "16px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  color: "#FFFFFF",
});

export const InputField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

export const SectionFooterBtnContainer: any = styled("div")(
  ({ gap, padding, justifyContent }: any) => ({
    display: "flex",
    gap: gap || "4px",
    padding: padding || "0px",
    alignItems: "center",
    justifyContent: "flex-end",
  })
);

/******* Newsroom component ******/
export const OuterDiv = styled("div")({
  width: "36px",
  height: "36px",
  // padding: "4px",
  background: "#f3f3f3",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});
export const DeleteContainerInner = styled("p")({
  fontSize: "14px",
  borderRadius: "3px",
  padding: "5px 6px",
  marginLeft: "20px",
  fontWeight: 300,
  cursor: "pointer",
  color: "#D7282F",
  border: "1px solid #fff",
  "&:hover": {
    border: "1px solid #e5e5e5",
  },
});

export const DeleteContainer = styled("div")({});

export const NewsField = styled("div")({
  width: "30%",
  "@media screen and (max-width: 600px)": { width: "70%" },
});

/****** Add newsroom ******/
export const TypographyAddHeading = styled(Typography)({
  fontSize: "17px",
  color: "rgb(35, 31, 32)",
});

/****** Add Services ******/
export const ServiceAddText = styled(Typography)({
  fontSize: "17px",
  color: "rgb(35, 31, 32)",
});

/****** Research nd development ******/
export const PatentProduction = styled(Box)({
  "& .forblock": {
    "@media screen and (max-width:600px)": {
      display: "block !important  ",
    },
  },
});
export const FactoryInventory = styled(Box)({
  "& .forflex": {
    "@media screen and (max-width:767px)": {
      display: "flex !important  ",
    },
  },
});

export const FactoryHeadingStyle = {
  "@media screen and (max-width:320px)": {
    padding: 0,
    display: "flex !important",
  },
};
// regional offices
export const Leftlabel = styled(Box)({
  width: "40%",
});
export const Rightlabel = styled(Box)({
  width: "60%",
});
export const AboutCompanyBox = styled(Box)({
  "& .aboutTitle": {
    padding: "0 0 10px",
  },
});

export const AboutCompanyImage = styled(Box)({
  height: "114x",
  minHeight: "114px",
  position: "relative",
  width: "114px",
  "& img": {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    borderRadius: "6px",
  },
});
export const AboutIconButton = styled(Box)({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  gap: "6px",
  width: "36px",
  height: "36px",
  margin: "auto",

  "& .upbuttonabout": {
    background: "#fff",
    color: "#000",
    padding: "5px",
    minWidth: "auto",
    borderRadius: "50px",
    "&:hover": {
      background: "#000",
      color: "#fff",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "18px",
    },
  },
});

export const InfoOutline = styled(InfoOutlinedIcon)({
  color: "#50b76c",
  fontSize: "16px",
  margin: "0 0 0 4px",
});

export const AboutCompanyPopover = styled(Popover)({
  "& .MuiPaper-root": {
    width: "500px",
    boxShadow: "none",
    border: "0.5px solid #D2D2D2",
    borderRadius: "10px",
    background: "#fff",
    padding: "12px",
    "& .infocontent": {
      border: "1px solid #E1E1E1",
      borderRadius: "6px",
      height: "150px",
      "& img": {
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        objectFit: "cover",
      },
      "& .MuiTypography-root": {
        color: "#000",
        fontSize: "14px",
        fontWeight: 600,
        padding: "0 0 7px",
      },
    },
    "& .adsshownInn": {
      padding: "10px",
    },
  },
});

export const InfoIconButton = styled(IconButton)({
  background: "#fff",
  color: "#000",
  padding: "5px",
  minWidth: "auto",
  borderRadius: "50px",
  "&:hover": {
    background: "#000",
    color: "#fff",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
  },
});
export const RNDGrid = styled(Grid)({
  display: "grid",
  alignItems: "stretch",
  "& .rndlableclass": {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
});
export const Addmorebtn = styled(ButtonBase)({
  backgroundColor: "#d7282f",
  color: "#fff",
  fontSize: "14px",
  borderRadius: "6px",
  padding: "8px 12px",
  transition: "all ease .4s",
  border: "1px solid #d7282f",
  "&:hover": {
    color: "#d7282f",
    backgroundColor: "#fff",
    border: "1px solid #d7282f",
    transition: "all ease .4s",
  },
});
export const QualityAssurenceBox = styled(Box)({
  padding: "12px 0px",
  "& .MuiInputBase-root": {
    paddingTop: "2px !important",
    paddingBottom: "2px !important",
  },
});

// Product application and cases

export const CommentBox = styled(BaseTextareaAutosize)({
  width: "100%",
  outline: "none",
  padding: "8px",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "6px",
  fontFamily: "open sans",
  "&:hover": {
    border: "1px solid #000",
  },
});

//export capabilites
export const ResetButton = styled(ButtonBase)({
  padding: "8px 18px",
  backgroundColor: "#fff",
  color: "#231F20",
  border: "1px solid #231F20",
  borderRadius: "6px",
  transition: "all ease .3s",
  "&:hover": {
    border: "1px solid #231F20",
    backgroundColor: "#231F20",
    color: "#fff",
    transition: "all ease .3s",
  },
});
export const SaveButton = styled(ButtonBase)({
  padding: "8px 18px",
  border: "1px solid #d7282f",
  borderRadius: "6px",
  color: "#d7282f",
  transition: "all ease .3s",
  "&:hover": {
    border: "1px solid #d7282f",
    backgroundColor: "#d7282f",
    color: "#fff",
    transition: "all ease .3s",
    "& div": {
      "& svg": {
        fill: "white",
      },
    },
  },
});
export const BrowseButton = styled(ButtonBase)({
  padding: "4px 18px",
  border: "1px solid #d7282f",
  borderRadius: "6px",
  color: "#d7282f",
  transition: "all ease .3s",
  "&:hover": {
    border: "1px solid #d7282f",
    backgroundColor: "#d7282f",
    color: "#fff",
    transition: "all ease .3s",
  },
});
export const UploadedImageBox = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "10px",
});
export const CSocialIcons = styled(Box)({
  width: "25px",
  minWidth: "25px",
});
export const AnnualTurnoverBox = styled(Box)({
  "& .MuiFormControl-root .MuiFormLabel-root": {
    fontSize: "13px",
    color: "#223354",
    opacity: "0.6",
  },
});

export const CreatedUpdatedOuterBox = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "4px",
  padding: "5px",
  gap: "5px",
  backgroundColor: "#FFEEEF",
  margin: "6px 0",
  "@media screen and (max-width:600px)": {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "start",
    width: "100%",
    padding: "0",
  },
});
export const CreatedUpdatedInnerBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  "@media screen and (max-width:600px)": {
    display: "block",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "start",
    width: "100%",
  },
});
export const CreatedUpdatedBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiTypography-root": {
    fontSize: "12px",
    color: "#231F20",
    fontWeight: "700",
    padding: "0 6px 0 0",
    "@media screen and (max-width:320px)": {
      fontSize: "10px",
    }
  },
  "@media screen and (max-width:767px)": {
    margin: "6px 0 0"
  },
  "@media screen and (max-width:320px)": {
    margin: "3px 0 0"
  }
});
export const FormikErrorStyle = styled(Box)({
  padding: "0 0 5px 0"
});
export const GridRightData = styled(Box)({
  padding: "12px 0px 0"
});
export const CustomerCaseTable = styled(Box)({
  margin:"2rem 0 0"
  
});
export const DrawerEdit = styled(Drawer)({
 
  '& .MuiDrawer-paper': { width: 500 }
});




