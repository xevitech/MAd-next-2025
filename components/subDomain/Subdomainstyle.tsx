import {
  Box,
  Button,
  ButtonBase,
  Container,
  Typography,
  styled,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
export const IConforlines = styled(TaskAltIcon)(() => ({
  height: "16px",
  width: "16px",
  marginRight: "8px",
  color: "#4A4A4A",
}));

export const Texts = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#4A4A4A",
  "& .impInfo": {
    fontWeight: "600",
    color: "#d7282f",
  },
}));

export const Boxfortext = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
  gap: "6px",
  "@media (max-width: 768px)": {
    alignItems: "flex-start",
  },
  "& .MuiSvgIcon-root": {
    "@media (max-width: 768px)": {
      position: "relative",
      top: "3px",
    },
  },
  "@media screen and (max-width:600px)": {
    alignItems: "start",
  },
}));

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 16px",
  "@media screen and (max-width:600px)": {
    display: "block",
  },
}));

export const BoxRightBorder = styled(Box)(() => ({
  borderLeft: "1px solid #CBCBCB",
  height: "42px",
}));

export const TypoRightBorder = styled(Typography)(() => ({
  borderLeft: "2px solid #D7282F",
  fontSize: "15px",
  fontWeight: "600",
  color: "#787878",
  paddingLeft: "16px",
  "@media screen and (max-width:600px)": {
    fontSize: "12px",
    textAlign: "start",
  },
}));

export const RedText = styled(Typography)(() => ({
  fontSize: "11px",
  fontWeight: "600",
  color: "#D7282F",
  marginTop: "10px",
}));

export const ListOfSliders = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
}));

export const GridImagebottomtext = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: "400",
  color: "#231F20",
}));

export const GridBoxes = styled(Box)(() => ({
  textAlign: "center",
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFF5F5 100%)",
  border: "1px solid #E4E4E4",
  borderRadius: "10px",
}));

export const PreviewBtn = styled(ButtonBase)(() => ({
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "15px",
  fontWight: "700",
  padding: "10px 20px",
  borderRadius: "6px",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#D7282F",
    transition: "0.3s",
    color: "#ffff",
  },
  "@media screen and (max-width:600px)": {
    padding: "8px 12px",
  },
}));

export const SaveBtn = styled(ButtonBase)(() => ({
  color: "#fff",
  fontSize: "15px",
  fontWight: "700",
  padding: "10px 20px",
  borderRadius: "6px",
  backgroundColor: "rgba(215, 40, 47, .85)",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#D7282F",
    transition: "0.3s",
    color: "#ffff",
  },
  "@media screen and (max-width:600px)": {
    padding: "8px 12px",
  },
}));

export const BoxforBanner = styled(Box)(() => ({
  border: "1px solid #EAEAEA",
  borderRadius: "5px",
  height: "314px",
  width: "100%",
  marginTop: "18px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const Bannersubimages = styled(Box)(() => ({
  border: "1px solid #EAEAEA",
  borderRadius: "5px",
  width: "100%",
  marginTop: "30px",
  padding: "15px 15px 10px 15px",
}));

export const Gridimagebox = styled(Box)(() => ({
  border: "1px dashed #D8D8D8",
  height: "50px",
  position: "relative",
  "& img": {
    objectFit: "cover",
    width: "100%",
  },
}));
export const GridBoxCrossicon = styled(Box)(() => ({
  position: "absolute",
  right: "-10px",
  top: "-9px",
}));

export const Gridimageboxtext = styled(Box)(() => ({
  dispaly: "flex !important",
  justifyContent: "space-between !important",
}));

export const Mainbox = styled(Box)(() => ({
  textAlign: "center",
}));

export const Imageboxheading = styled(Box)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  color: "#000000",
}));

export const Imageboxtext = styled(Box)(() => ({
  fontSize: "13px",
  fontWeight: "400",
  color: "#4A4A4A",
  "& .impInfo": {
    fontWeight: 600,
    color: "#d7282f",
  },
}));

export const Uploadbutton = styled("label")(() => ({
  color: "#D7282F",
  borderBottom: "1px solid #D7282F",
  cursor: "pointer",
  textAlign: "center",
  fontSize: "15px",
  fontWeight: "600",
}));
export const CustomSwitch = styled(Box)(() => ({
  "& .MuiSwitch-root": {
    position: "relative",
    width: "88px",
    "& .MuiSwitch-track": {
      backgroundColor: "white !important",
      opacity: "1",
      border: "1px solid #d2d2d2",
      "&:before": {
        content: '"On"',
        backgroundImage: "none",
        fontSize: "12px",
        color: "white",
        display: "none",
      },
      "&:after": {
        content: '"Off"',
        backgroundImage: "none",
        fontSize: "12px",
        color: "white",
        display: "none",
      },
    },
    "& .MuiSwitch-thumb": {
      width: "36px",
      height: "20px",
      borderRadius: "26px",
      margin: "0",
    },
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        transform: "translateX(34px)",
        "& .MuiSwitch-track": {
          backgroundColor: "white",
        },
        "& .MuiSwitch-thumb": {
          color: "#34A853",
        },
      },
      "& .MuiSwitch-thumb": {
        color: " #dadada",
      },
    },
    "&:before": {
      content: '"Off"',
      backgroundImage: "none",
      fontSize: "12px",
      color: "black",
      position: "absolute",
      zIndex: "3",
      top: "10px",
      left: "18px",
      pointerEvents: "none",
    },
    "&:after": {
      content: '"On"',
      backgroundImage: "none",
      fontSize: "12px",
      color: "black",
      position: "absolute",
      zIndex: "3",
      right: "18px",
      top: "10px",
      pointerEvents: "none",
    },
  },
  "@media screen and (max-width:600px)": {
    marginLeft: "16px",
    marginTop: "-10px",
  },
}));

export const IncrimentDecimentButton = styled(ButtonBase)(() => ({
  fontWeight: "700",
  margin: "0px 15px",
}));

export const AddMenuButton = styled(ButtonBase)(() => ({
  color: "#d7282f",
  position: "absolute",
  bottom: "60px",
}));
export const CancelBtn = styled(Button)(() => ({
  border: "1px solid #d7282f",
  borderRadius: "6px",
  backgroundColor: "transparent",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "capitalize",
  color: "#d7282f",
  transition: ".3s",
  padding: "6px 14px",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#d7282f",
    transition: " .3s",
  },
}));
export const SaveBtnDialog = styled(Button)(() => ({
  border: "1px solid #d7282f",
  borderRadius: "6px",
  backgroundColor: "transparent",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "capitalize",
  color: "#d7282f",
  transition: ".3s",
  padding: "6px 14px",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#d7282f",
    transition: " .3s",
  },
}));
SaveBtnDialog;
export const MenuTextStyle = styled("span")(() => ({
  position: "absolute",
  margin: "18px 0",
  fontSize: "14px",
  fontWeight: 600,
  color: "#1A2027",
  "& svg": {
    fontSize: "16px",
    color: "#231F20",
    margin: "0 0 0 5px",
  },
  "@media screen and (max-width:800px)": {
    display: "none",
  },
}));
export const AddnewMenu = styled(ButtonBase)(() => ({
  backgroundColor: "#D7282F",
  borderRadius: "4px",
  color: "#ffff",
  padding: "8px 14px",
  margin: "0px 10px",
  "@media screen and (max-width:600px)": {
    padding: "7px 10px",
  },
}));

export const BoxSubDomaincontent = styled(Box)(() => ({
  padding: "24px",
  "@media screen and (max-width:600px)": {
    padding: "5px 11px 20px",
    margin: 0,
  },
}));

// toggle button

export const CustomSwitch2 = styled(Box)(() => ({
  "& .MuiSwitch-root": {
    position: "relative",
    width: "88px",
    "& .MuiSwitch-track": {
      backgroundColor: "white !important",
      opacity: "1",
      border: "1px solid #d2d2d2",
      "&:before": {
        content: '"On"',
        backgroundImage: "none",
        fontSize: "12px",
        color: "white",
        display: "none",
      },
      "&:after": {
        content: '"Off"',
        backgroundImage: "none",
        fontSize: "12px",
        color: "white",
        display: "none",
      },
    },
    "& .MuiSwitch-thumb": {
      width: "36px",
      height: "22px",
      borderRadius: "26px",
      margin: "0",
    },
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        "& .MuiSwitch-thumb": {
          color: "#34A853",
        },
        transform: "translateX(34px)",
        "& .MuiSwitch-track": {
          backgroundColor: "white",
        },
      },
      "& .MuiSwitch-thumb": {
        color: "#cccccc",
      },
    },
    "&:before": {
      content: '"Off"',
      backgroundImage: "none",
      fontSize: "12px",
      color: "black",
      position: "absolute",
      zIndex: "3",
      top: "11.3px",
      left: "18px",
      pointerEvents: "none",
    },
    "&:after": {
      content: '"On"',
      backgroundImage: "none",
      fontSize: "12px",
      color: "black",
      position: "absolute",
      zIndex: "3",
      right: "18px",
      top: "11.3px",
      pointerEvents: "none",
    },
  },
  "@media screen and (max-width:600px)": {
    marginLeft: "16px",
  },
}));
export const CustomSwitch3 = styled(Box)(() => ({
  "& .MuiSwitch-root": {
    position: "relative",
    width: "50px",
    height: "34px",
    "& .MuiSwitch-track": {
      backgroundColor: "white !important",
      opacity: "1",
      border: "1px solid #d2d2d2",
      "&:before": {
        content: '"On"',
        backgroundImage: "none",
        fontSize: "12px",
        color: "white",
        display: "none",
      },
      "&:after": {
        content: '"Off"',
        backgroundImage: "none",
        fontSize: "12px",
        color: "white",
        display: "none",
      },
    },
    "& .MuiSwitch-thumb": {
      width: "17px",
      height: "16px",
      borderRadius: "11px",
      margin: "0",
    },
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        "& .MuiSwitch-thumb": {
          color: "#d7282f",
        },
        transform: "translateX(15px)",
        "& .MuiSwitch-track": {
          backgroundColor: "white",
        },
      },
      "& .MuiSwitch-thumb": {
        color: "#cccccc",
      },
    },
    "&:before": {
      content: '""',
      backgroundImage: "none",
      fontSize: "12px",
      color: "black",
      position: "absolute",
      zIndex: "3",
      top: "11.3px",
      left: "18px",
      pointerEvents: "none",
    },
    "&:after": {
      content: '""',
      backgroundImage: "none",
      fontSize: "12px",
      color: "black",
      position: "absolute",
      zIndex: "3",
      right: "18px",
      top: "11.3px",
      pointerEvents: "none",
    },
  },
  "@media screen and (max-width:600px)": {
    marginLeft: "16px",
  },
}));

export const CompanyDetailbtn = styled(ButtonBase)(() => ({
  border: "1px solid #d7282f",
  borderRadius: "6px",
  backgroundColor: "transparent",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "capitalize",
  color: "#d7282f",
  transition: ".3s",
  padding: "6px 14px",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#d7282f",
    transition: " .3s",
  },
  "@media screen and (max-width:767px)": {
    fontSize: "12px",
  },

  "@media screen and (max-width:480px)": {
    fontSize: "10px",
  },
  "@media screen and (max-width:900px)": {
    margin: "10px 0px 10px 10px",
  },
}));

export const AddMenuBtn = styled(ButtonBase)({
  color: "#DD484E",
  fontSize: "13px",
  fontWeight: "600",
});

export const AddMenuBtnNew = styled(Button)({
  color: "#DD484E",
  fontSize: "13px",
  fontWeight: "600",
});
// -------------SliderList
export const SliderouterBox = styled(Box)({
  border: "1px solid #eaeaea",
  backgroundColor: "#fff",
  borderRadius: "5px",
  padding: "16px",
});
export const SliderinnerBox = styled(Box)({});
export const GridouterBox = styled(Box)({
  padding: "18px 0 22px 0",
});
export const SliderHeading = styled(Typography)({
  fontSize: "20px",
  fontWeight: "700",
  color: "#d7282f",
});
export const SliderGridBox = styled(Box)({
  boxShadow: " 0px 2px 2px 0px #9FA2BF52",
  borderRadius: "6px",
  border: "1px solid #CBCBCB",
});
export const Slidernameandedit = styled(Box)({
  padding: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
export const Slidername = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  color: "#4a4a4a",
});
export const IconBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});
export const Copycontent = styled(ContentCopyIcon)({
  fontSize: "18px",
  color: "#006FBF",
  cursor: "pointer",
});
export const Editcontent = styled(EditOutlinedIcon)({
  fontSize: "18px",
  color: "#00AF6A",
  cursor: "pointer",
});
export const Deletecontent = styled(DeleteOutlineOutlinedIcon)({
  fontSize: "18px",
  color: "#d7282f",
  cursor: "pointer",
});
export const Icondivider = styled(Box)({
  backgroundColor: "#CBCBCB",
  height: "22px",
  width: "2px",
});
export const ImageSliderBox = styled(Box)({
  width: "100%",
  height: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  objectFit: "contain",
  overflow: "hidden",
});
export const Sliderheaderandadd = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  padding: "0 0 10px 0",
});
export const Addslider = styled(ButtonBase)({
  border: "1px solid #d7282f",
  backgroundColor: "#fff",
  color: "#d7282f",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "400",
  transition: "all ease .3s",
  "&:hover": {
    backgroundColor: "#d7282f",
    color: "#fff",
    transition: "all ease .3s",
  },
});

// list of slider
export const SliderListBox = styled(Box)({
  border: "1px solid #eaeaea",
  borderRadius: "5px",
  padding: "16px",
  margin: "16px 0 0 0",
});
export const SliderListHeading = styled(Typography)({
  fontSize: "20px",
  fontWeight: "700",
  color: "#d7282f",
});
export const SliderRelativeBox = styled(Box)({
  borderTop: "1px solid #e1e1e1",
  borderRight: "1px solid #e1e1e1",
  borderLeft: "1px solid #e1e1e1",
  borderRadius: "6px 6px 0px 0px",
});
export const SliderAbsoluteBox = styled(Box)({});
export const NameAndIcons = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px",
  borderBottom: "1px solid #e1e1e1",
  borderRight: "1px solid #e1e1e1",
  borderLeft: "1px solid #e1e1e1",
  borderRadius: "0px 0px 6px 6px",
});
export const SliderName1 = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  color: "#4a4a4a",
});
export const AddsliderBtn = styled(ButtonBase)({
  border: "1px solid #d7282f",
  padding: "6px 12px",
  borderRadius: "6px",
  color: "#d7282f",
  backgroundColor: "#ffff",
  transition: "all ease .3s",
  "&:hover": {
    backgroundColor: "#d7282f",
    border: "1px solid #d7282f",
    color: "#ffff",
    transition: "all ease .3s",
  },
});
// Seo Settings
export const SeoLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: "600",
  color: "#231f20",
});
// ------------------------- Manage Menu-----------------\\

export const ManageBannerPopup = styled(Box)({
  padding: "30px 16px",
});
export const ManageBannerTitle = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#FFEEEF",
  width: "100%",
  padding: "6px",
  "& .MuiTypography-root": {
    fontSize: "16px",
    color: "#231f20",
    fontWeight: "600",
  },
  " svg": {
    transition: "all ease .3s",
    cursor: "pointer",
    fontSize: "18px",
    "&:hover": {
      color: "#d7282f",
      transition: "all ease .3s",
    },
  },
});
export const EditWrapper = styled(Box)({
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  backgroundColor: "#FFEEEF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const EditMenuBTN = styled(Button)({
  border: "1px solid #d7282f",
  color: "#d7282f",
  textTransform: "capitalize",
  "&:hover": {
    background: "#d7282f",
    border: "1px solid #d7282f",
    color: "#fff",
  },
});
export const TextOuterBox = styled(Box)({
  position: "relative",
  "::before": {
    content: '""',
    position: "absolute",
    right: "-35px",
    height: "100%",
    width: "1px",
    backgroundColor: "#d2d2d2",
  },
});
export const ContainerBox = styled(Container)({
  backgroundColor: "#fff",
  borderRadius: "4px",
  boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  position: "relative",
  overflow: "hidden",
  width: "600px",
  maxWidth: "100%",
  minHeight: "300px",
});
export const EditStoreBox = styled(Box)({
  position: "absolute",
  top: "20%",
  height: "100%",
  transition: "all 0.6s ease-in-out",
  width: "50%",
  padding: "0px 40px",
});
export const EditStoreInnerBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin: "0 0 10px 0",
});
export const EditNamePosition = styled(Box)({
  position: "absolute",
  top: "20%",
  height: "100%",
  transition: "all 0.6s ease-in-out",
  width: "50%",
  padding: "0px 40px",
});
export const EditNamePositionBefore = styled(Box)({
  background: "linear-gradient(135deg, #d7282f, #e53935, #d7282f, #a81e23)",
  position: "relative",
  left: "-100%",
  height: "100%",
  width: "200%",
  transition: "transform 0.6s ease-in-out",
  color: "#fff",
});
export const EditNamePositionInnerBefore = styled(Box)({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0 40px",
  textAlign: "center",
  top: 0,
  height: "100%",
  width: "50%",
  transition: "transform 0.6s ease-in-out",
});
export const EditStoreBefore = styled(Box)({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0 40px",
  textAlign: "center",
  top: 0,
  height: "100%",
  width: "50%",
  right: 0,
  transition: "transform 0.6s ease-in-out",
});
export const EditStoreText = styled(Typography)({
  fontSize: "16px",
  fontWeight: "500",
  color: "#fff",
  "&::first-letter": {
    fontSize: "30px",
    color: "#fff",
  },
});
export const ClickHereBTN = styled(Button)({
  marginTop: "20px",
  color: "#d7282f",
  borderColor: "#fff",
  padding: "6px 30px",
  textTransform: "capitalize",
  backgroundColor: "#fff",
  "&:hover": { border: "1px solid #fff", backgroundColor: "#fff" },
});
export const BeforeSection = styled(Box)({
  position: "absolute",
  top: 0,
  left: "50%",
  width: "50%",
  height: "100%",
  overflow: "hidden",
  transition: "transform 0.6s ease-in-out",
  zIndex: 100,
});
export const ManagepopupHeading = styled(Typography)({
  fontSize: "16px",
  fontWeight: "600",
  color: "#231f20",
  margin: "-20px 0 16px 0 !important",
});
export const PopCrossBTN = styled(Box)({
  position: "absolute",
  right: "20px",
  top: "15px",
  zIndex: 101,
  // "svg":{color:"#d7282f"}
  cursor: "pointer",
});
