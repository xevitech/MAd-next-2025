import {
  styled,
  Switch,
  FormControl,
  Button,
  Box,
  ButtonBase,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
export const PersonNameCont = styled("p")({
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "25px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  fontFamily: "open sans",
  padding: "0 0 10px",
  zIndex: "1",
});
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
export const FormControlData = styled(FormControl)({
  minWidth: "460px",
  maxWidth: "500px",
  minHeight: "200px",
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  "@media screen and (max-width:767px)": {
    minWidth: "100%",
    maxWidth: "100%",
  },
});

export const AddMoreDetails: any = styled("div")(({ dataLength }: any) => ({
  position: "absolute",
  zIndex: 1200,
  background: "white",
  height: "280px",
  right: "0px",
  top: "71px",
  "@media screen and (max-width:767px)": {
    left: "0",
    top: "126px",
  },
  "@media screen and (max-width:600px)": {
    left: "0",
    top: "112px",
  },
  "@media screen and (max-width:346px)": {
    top: "130px",
  },
}));
export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "10px",
  margin: "10px",
  textTransform: "none",
});
export const SaveButton = styled(Button)({
  backgroundColor: "#DD484E",
  color: "white",
  height: "30px",
  textTransform: "none",
  padding: "0px 15px 0px 15px",
  "&:hover": {
    backgroundColor: "#e06f74",
  },
});
export const CancelButton = styled(Button)({
  backgroundColor: "#393535",
  color: "white",
  height: "30px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#817979",
  },
  padding: "0px 15px 0px 15px",
});
export const RedSaveButton: any = styled(Button)(({ breakPoints }: any) => ({
  backgroundColor: "#fff",
  color: "#DD484E",
  height: "30px",
  textTransform: "none",
  padding: breakPoints?.max600px
    ? "0px 15px 0px 15px"
    : breakPoints?.max1460px
    ? "0px 6px 0px 6px"
    : "2px 15px 0px 15px",
  border: "1px solid #DD484E",
  minWidth: "78px",
  "&:hover": {
    backgroundColor: "#DD484E",
    color: "#fff",
  },
  "@media screen and (max-width: 1600px)": { padding: "0px 6px 0px 6px" },
  "@media screen and (max-width: 1400px)": {
    minWidth: "55px",
    height: "25px",
    fontSize: "12px",
  },
}));

export const BlackCancelButton: any = styled(Button)(
  ({ breakPoints }: any) => ({
    backgroundColor: "#fff",
    color: "#393535",
    // height: "36px",
    height: "30px",
    textTransform: "none",
    border: "1px solid #393535",
    "&:hover": {
      backgroundColor: "#393535",
      color: "#fff",
    },
    padding: breakPoints?.max600px
      ? "0px 15px 0px 15px"
      : breakPoints?.max1460px
      ? "0px 6px 0px 6px"
      : "2px 15px 0px 15px",
    "@media screen and (max-width: 1600px)": { padding: "0px 6px 0px 6px" },
    "@media screen and (max-width: 1400px)": {
      minWidth: "55px",
      height: "25px",
      fontSize: "12px",
    },
  })
);

export const ImageuploadIconField = styled("span")({
  paddingRight: "10px",
  position: "relative",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  left: "-20px",
  cursor: "pointer",
});
export const FloatingIconfield = styled("span")({
  position: "absolute",
  height: "10px",
  width: "10px",
  zIndex: 99999999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const UploadingIcon = styled("div")({
  position: "relative",
  width: "19px",
  height: "19px",
  top: "10px",
  left: "45px",
  zIndex: 10520,
  background: "rgba(215, 40, 47, 0.8)",
  borderRadius: "50%",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const ContentsContainer = styled("div")(({ value }: any) => ({
  ...value,
  display: "block",
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",

  flex: 0.5,
}));

export const SectionOuterContainer: any = styled("div")(
  ({ oneItemOnly }: any) => ({
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: oneItemOnly ? "flex-end" : "flex-start",
    flexWrap: "wrap",
  })
);

export const SectionInnerContent: any = styled("div")(
  ({ breakPoints }: any) => ({
    padding: "0px",
    position: "relative",
  })
);

export const FieldContainerAddContact: any = styled("div")(
  ({ height, breakPoints }: any) => ({
    display: "flex",
    flex: 1,
    width: "100%",
    minHeight: "50px",
    "@media screen and (max-width:600px)": {
      flexDirection: "column",
      margin: "6px 0px",
    },
  })
);

export const LabelContainerAddContact: any = styled("div")(
  ({ flex, breakPoints }: any) => ({
    flex: 0.35,
    display: "flex",
    alignItems: "center",
    fontWeight: 400,
    fontSize: "14px",
    color: "#223354",
    opacity: "0.5",
  })
);

export const ValueContainerAddContact: any = styled("div")(
  ({ justifyContent, breakPoints }: any) => ({
    flex: 0.65,
    display: "flex",
    alignItems: "center",
    color: "#223354",
    fontSize: breakPoints?.max768px ? "14px" : "14px",
    justifyContent: justifyContent ? justifyContent : "flex-start",
  })
);

export const DividerCustom: any = styled("div")(
  ({ breakPoints, elementIndex }: any) => ({
    position: "absolute",
    right: "-13px",
    width: "1px",
    top: "0",
    bottom: "0",
    height: "85%",
    margin: "auto",
    backgroundColor: "rgba(34, 51, 84,0.1)",
  })
);

/*************  Product Detail page "Contact Person Details" styling component ***************/

export const ProUserName: any = styled("h5")(({ breakPoints }: any) => ({
  fontWeight: 600,
  fontSize: "14px",
  color: "#231F20",
  lineHeight: "normal",
  padding: "0px 0 0 6px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "150px",
  "@media screen and (max-width:400px)": {
    display: "none",
  },
}));

export const HelpDesk: any = styled("div")(({}: any) => ({
  display: "flex",
  alignItems: "center",
  margin: "0 5px",
  color: "#747474",
  fontSize: "20px",
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
  },
}));
export const FloatingEditIcon: any = styled("span")(({ breakPoints }: any) => ({
  position: "relative",
  right: "-0px",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  alignItems: "center",
  textAlign: "center",
  color: "#D7282F",
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  margin: "0 20px 0 0",
}));

export const CancelLink = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
    marginRight: "2px",
  },
  "&:hover": {
    opacity: ".7",
  },
});
export const SaveLink = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#231f20",
  cursor: "pointer",
  position: "relative",
  "&::before": {
    borderLeft: "1px solid #d2d2d2",
    content: '" "',
    position: "absolute",
    left: "0",
    height: "16px",
  },
  "& .MuiButtonBase-root": {
    textTransform: "none",
    padding: "0",
    borderRadius: "0",
    color: "#231f20",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
    marginLeft: "6px",
    marginRight: "2px",
  },
  "&:hover": {
    opacity: ".7",
  },
});

export const DeleteButtonLink = styled(DeleteOutlineSharpIcon)({
  display: "flex",
  alignItems: "center",
  color: "#231f20",
  cursor: "pointer",
  position: "relative",
  borderLeft: "1px solid #d2d2d2",
  width: "22px !important",
  height: "16px !important",
  "&::before": {
    borderLeft: "1px solid #d2d2d2",
    content: '" "',
    position: "absolute",
    left: "0",
    height: "16px",
  },
});

export const CheckBoxComponent = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .Mui-checked": {
    color: "#d7282fcc !important",
  },
  ".MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
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
});
export const SelectedContainer = styled("div")(({ value, flex }: any) => ({
  ...value,
  background: "#FFFFFF",
  borderRadius: "6px",
  flex: flex || 0.5,
  paddingRight: "10px",
  paddingLeft: "10px",
  paddingTop: "12px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  position: "relative",
  overflow: "hidden",
  transition: "all ease .3s",
  "&:hover": {
    boxShadow: "rgba(99, 99, 99, .6) 0px 2px 8px 0px",
    "& .checkStyle": {
      opacity: "1",
    },
  },
  "&.active": {
    boxShadow: "rgba(99, 99, 99, .6) 0px 2px 8px 0px",
    "& .checkStyle": {
      opacity: "1",
      "&::before": {
        background: "#D7282F",
      },
      "& .MuiBox-root": {
        borderColor: "white",
        "& .icon-approved": {
          opacity: "1",
        },
      },
    },
  },
}));
export const CheckStyle = styled(Box)({
  width: "50px",
  height: "50px",
  borderRadius: "100%",
  position: "absolute",
  right: "-16px",
  top: "-16px",
  opacity: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all ease .3s",
  "&::before": {
    content: '" "',
    width: "90px",
    height: "90px",
    background: "#d3d3d3",
    position: "absolute",
    top: "-33px",
    right: "-33px",
    transform: "rotate(48deg)",
  },
});

export const useStyles = makeStyles()((theme) => {});
// popup style
export const DisableEnable = styled(ButtonBase)({
  border: "1px solid #d7282f",
  borderRadius: "6px",
  backgroundColor: "#d7282f",
  padding: "8px 16px",
  opacity: "85%",
  fontSize: "14px",
  fontWeight: "600",
  transition: " all ease .3s",
  color: "#fff",
  "&:hover": {},
});
export const Cancel = styled(ButtonBase)({
  border: "1px solid #d7282f",
  borderRadius: "6px",
  backgroundColor: "#fff",
  padding: "8px 16px",
  fontSize: "14px",
  fontWeight: "600",
  transition: " all ease .3s",
  color: "#d7282f",
  "&:hover": {
    backgroundColor: "#d7282f",
    color: "#fff",
  },
});
