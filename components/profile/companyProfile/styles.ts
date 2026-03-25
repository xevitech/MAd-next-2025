import { BorderLeft } from "@mui/icons-material";
import { styled, Button, Typography, Box, IconButton, Dialog } from "@mui/material";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

export const OuterContainer: any = styled("div")(({ breakPoints }: any) => ({
  background: breakPoints?.max600px ? "#fff" : "#f5f7fa",
  padding: "0px",
  minHeight: "calc(100vh - 64px)",
}));

export const PreHeaderText: any = styled("div")(({ breakPoints }: any) => ({
  fontFamily: "open sans",
  fontWeight: 700,
  lineHeight: "41px",
  marginBottom: "30px",
  display: breakPoints?.max600px ? "block" : "flex",
  color: "#231F20",
  backgroundColor: breakPoints?.max600px ? "#FFE9EA" : "transparent",
  borderRadius: "3px",
  width: breakPoints?.max600px ? "253px" : "auto",
  textAlign: breakPoints?.max600px ? "center" : "left",
  fontSize: breakPoints?.max768px
    ? "18px"
    : breakPoints?.max1024px
      ? "25px"
      : "30px",
  margin: breakPoints?.max600px ? "48px auto 0px" : "64px auto 10px",
}));

export const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  flex: 1,
  background: "#FFFFFF",
  /* Gray Goose/Card Shadow */
  borderRadius: "6px",
  marginBottom: "25px",
  minHeight: "193px",
  alignItems: "center",
  "& .BannerContainer": {
    "@media screen and (min-width: 601px)": {
      padding: "16px",
    },
    "@media screen and (max-width: 600px)": {
      padding: "0px",
    },
  },
});
export const HeaderLeftContent: any = styled("div")(({ breakPoints }: any) => ({
  flex: 0.5,
  display: "flex",
  position: "relative",
  margin: "16px",
  borderRight: "1px solid #D9D9D9",
  paddingRight: breakPoints?.max1920px ? "16px" : "6px",
  flexDirection: "column",
}));
export const HeaderRightContent = styled("div")({
  flex: 0.5,
  display: "flex",
  flexDirection: "column",
});

export const FloatingIcon = styled("div")({
  height: "20px",
  width: "20px",
  position: "relative",

  "@media screen and (max-width: 768px)": {
    height: "15px",
    width: "15px",
  },
});
export const ContentContainer: any = styled("div")(({ breakPoints }: any) => ({
  display: "flex",
  gap: "25px",
  flexDirection: breakPoints?.max1024px ? "column" : "row",
}));

export const ContentLeftContainer = styled("div")({
  flex: 0.55,
  paddingTop: "0px",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});

export const ContentRightContainer = styled("div")({
  flex: 0.45,
  display: "flex",
  flexDirection: "column",
  paddingTop: "0px",
  borderRadius: "6px",
  gap: "25px",
});

export const LogoContainer = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center",
  maxHeight: "125px",
  "& .CircleLogo": {
    position: "absolute",
    bottom: "-45px",
    left: "10px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "1px solid #d2d2d2",
    backgroundColor: "white",
    "@media screen and (max-width: 680px)": {
      width: "70px",
      height: "70px",
      bottom: "-28px",
    },
  },
  "& .CoverLogo": {
    position: "absolute",
    top: "10px",
    right: "1%",
  },
  "& .MuiButtonBase-root": {
    "@media screen and (max-width: 680px)": {
      padding: "3px",
      fontSize: "12px",
      marginRight: "5px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "20px",
    },
  },
});

export const Logo: any = styled("img")(({ breakPoints }: any) => ({
  width: breakPoints?.max1920px ? "100px" : "100%",
  height: breakPoints?.max1920px ? "100px" : "100%",
  borderRadius: "50%",
  objectFit: "cover",
  background: "#e1e1e1",
}));
export const CoverImage = styled("img")({
  height: "124px",
  width: "100%",
  objectFit: "cover",
  borderRadius: "6px",
});

export const FloatingUpdateIconContainer = styled("div")({
  position: "absolute",

  bottom: "10px",
  right: "-10px",
  width: "36px",
  height: "36px",

  background: "rgba(204, 64, 78, 0.8)",
  zIndex: 1,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "@media screen and (max-width: 768px)": {
    bottom: "2px",
    right: "-5px",
    width: "25px",
    height: "25px",
  },
});
export const CompanyNameContainer = styled("div")({
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "25px",
  display: "flex",
  color: "#231F20",
  paddingRight: "10px",
  marginTop: "6px",
  alignItems: "center",
  position: "relative",
  justifyContent: "space-between",
  padding: "0 0 0 129px",
  width: "calc(100% - 0px)",

  "@media screen and (max-width: 1600px)": {
    fontSize: "14px",
    lineHeight: "normal",
  },
  "@media screen and (max-width: 680px)": {
    padding: "0 0 0 89px",
  },
});
export const CompanyName = styled("div")({
  paddingRight: "0px", //62
  "@media screen and (max-width:280px)": { paddingLeft: "6px" },
});
export const Card: any = styled("div")(({ breakPoints }: any) => ({
  boxShadow: breakPoints?.max600px
    ? "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
    : "none",
  borderRadius: breakPoints?.max600px ? "6px" : "0px",
  height: "fit-content",
  minHeight: "100px",
  padding: "16px",

  flex: breakPoints?.max1024px ? 0.6 : breakPoints?.max1200px ? 0.4 : 0.3,
  Width: "360px",
  display: "flex",
  flexDirection: "column",
  "@media screen and (max-width: 768px)": {
    padding: "6px 16px",
  },
  "@media screen and (max-width:600px)": {
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    margin: "16px 0px 0",
  },
}));

export const CardHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  margin: "auto",
});
export const CardHeaderText = styled("p")({
  color: "#231F20",
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "20px",
  display: "flex",
  alignItems: "center",
  paddingBottom: "10px",
  borderBottom: "1px solid rgba(34, 51, 84,0.1)",
});

export const CardHeaderDescription = styled("p")({
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "20px",
  display: "flex",
  alignItems: "center",
  color: "#747474",
  marginBottom: "22px",
  "@media screen and (max-width: 768px)": {
    fontSize: "13px",
    marginBottom: "15px",
  },
});

export const CardContent = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const CardContenLightText = styled("p")({
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  color: "#2F2F2F",
  marginTop: "15px",
  opacity: 0.8,
  position: "relative",
});

export const ContentInnerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  padding: "15px",
});

export const ContainerHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  margin: "10px",
  marginBottom: "0px",
  paddingBottom: "10px",
});

export const ContainerHeaderText: any = styled("p")(({ breakPoints }: any) => ({
  fontWeight: 600,
  fontSize: breakPoints?.max1920px ? "18px" : "16px",
  lineHeight: breakPoints?.max1920px ? "25px" : "22px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  fontFamily: "open sans",
}));

export const ContainerHeaderDescription: any = styled("p")(
  ({ breakPoints }: any) => ({
    fontWeight: 400,
    fontSize: breakPoints?.max1920px ? "15px" : "13px",
    lineHeight: "18px",
    display: "flex",
    alignItems: "center",
    color: "#223354",
    fontFamily: "open sans",
    opacity: 0.5,
  })
);

export const FloatingEditIcon = styled("span")({
  position: "absolute",
  right: "5px",
  top: "-10px",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
  color: "#D7282F",
});

export const PencilIcon = styled("div")({
  marginRight: "5px",
  width: "12px",
  height: "12px",
  position: "relative",
});
export const FieldContainer: any = styled(Box)(({ flexDirection }: any) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "7px",
  borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
  minHeight: "45px",
  alignItems: "center",
  gap: flexDirection?.flexStart ? "20px" : "",
}));

export const FieldLabel = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "138.9%",

  display: "flex",
  alignItems: "center",

  color: "rgba(34, 51, 84, 0.5)",
});

export const AddressContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const AddressLeftContainer = styled("div")({
  display: "flex",
  gap: "10px",
});
export const AddressRightContainer = styled("div")({
  color: "#D7282F",
});

export const AddressIconContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const AddressValueContainer = styled("div")({
  width: "80%",
  textAlign: "start",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "20px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
});

export const FieldValue = styled("div")({
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "24px",
  display: "flex",
  alignItems: "center",
  textAlign: "right",
  letterSpacing: "0.09px",
  color: "#231F20",
});
export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },

  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export const FloatingEditIconCompanyName = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "@media screen and (max-width:980px)": {
    paddingRight: "10px",
  },
});

export const PencilIconCompanyName = styled("div")({
  marginRight: "5px",
  width: "13px",
  height: "13px",
  position: "relative",
  display: "flex",
  gap: "10px",
});

export const UpdateCoverButton = styled(IconButton)({
  background: "#fff",
  fontSize: "14px",
  lineHeight: "16px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  textTransform: "none",
  color: "#000",
  minHeight: "24px", //32
  borderRadius: "50px",
  fontWeight: "700",
  transition: "background 0.5s",
  padding: "4px",

  "&:hover": {
    background: "#000",
    color: "#fff",
  },
  "& svg": {
    fotSize: "16px",
  },
  "@media screen and (max-width:300px)": {},
});

export const WelcomeRightHeader: any = styled("div")(
  ({ breakPoints }: any) => ({
    borderLeft:
      breakPoints?.max600px || breakPoints?.max300px
        ? "none"
        : "1px solid #D9D9D9",
    padding: breakPoints?.max600px ? "0px" : "0 0 0 25px",
  })
);

export const WelcomeRightHeader1 = styled(Box)({
  borderLeft: "1px solid #d9d9d9",
  padding: "0 0 0 25px",
  "@media screen and (max-width:600px)": {
    borderLeft: "none",
    padding: "0",
  },
});

export const PersonalHeaderText: any = styled("p")(({ breakPoints }: any) => ({
  fontWeight: breakPoints?.max600px ? "600" : "700",
  lineHeight: breakPoints?.max600px ? "41px" : "36px",
  margin: breakPoints?.max600px
    ? "5rem auto 1rem"
    : breakPoints?.max768px
      ? "5rem 0 1rem"
      : "7rem 0 2rem",
  fontSize: breakPoints?.max768px
    ? "18px"
    : breakPoints?.max1024px
      ? "25px"
      : "30px",
  backgroundColor: breakPoints?.max600px ? "#FFE9EA" : "transparent",
  textAlign: breakPoints?.max600px ? "center" : "left",
  borderRadius: "3px",
  width: breakPoints?.max600px ? "253px" : "auto",
  position: breakPoints?.max600px ? "relative" : "static",
  top: breakPoints?.max600px ? "-13px" : "0px",
}));

export const SubHeadWelcome: any = styled("h3")(({ breakPoints }: any) => ({
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: breakPoints?.max600px
    ? "15px"
    : breakPoints?.max768px
      ? "26px"
      : "18px",
  color: "#231F20",
  padding: "0 50px 0 23px",
  textTransform: "capitalize",

  "@media screen and (max-width:1400px)": {
    padding: "0 50px 0 8px",
    fontSize: "15px",
  },

  "@media screen and (max-width:600px)": {
    width: "100%",
    padding: "0 6px 0 10px",
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
  },
  "@media screen and (max-width:320px)": {
    width: "50%",
    padding: "0 6px 0 10px",
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
  },
}));

export const ProgressDigit: any = styled("h3")(({ breakPoints }: any) => ({
  display: "inline-block",
  fontWeight: "800",
  opacity: 1,
  fontSize: "16px",
  lineHeight: "15px",
  color: "#223354",
  position: "absolute",
  top: "10%",
  right: "0",
}));

export const CompanyInfotext: any = styled("p")(({ breakPoints }: any) => ({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "13px",
  lineHeight: "18px",
  color: "#747474",
  width: "100%",
  marginBottom: "15px",
}));

export const AllHeaderText: any = styled("div")(({ breakPoints }: any) => ({
  fontWeight: 700,
  lineHeight: "41px",
  marginBottom: "30px",
  display: breakPoints?.max600px ? "block" : "flex",
  color: "#231F20",
  backgroundColor: breakPoints?.max600px ? "#FFE9EA" : "transparent",
  borderRadius: "3px",
  width: breakPoints?.max600px ? "253px" : "auto",
  textAlign: breakPoints?.max600px ? "center" : "left",
  fontSize: breakPoints?.max768px
    ? "18px"
    : breakPoints?.max1024px
      ? "25px"
      : "30px",
  margin: breakPoints?.max600px ? "48px auto 0px" : "64px auto 10px",
}));

export const UpIcon: any = styled("div")(({ breakPoints }: any) => ({
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  backgroundColor: "#D7282F",
  height: " 35px",
  width: "35px",
  borderRadius: "50%",
  alignItems: "center",
  left: "8%",
  bottom: "-6%",
  cursor: "pointer",
  zIndex: "1",
  "@media (max-width: 767px)": {
    height: " 25px",
    width: "25px",
    "& svg": {
      fontSize: "16px",
    },
  },
}));

export const SipmleText: any = styled("p")(({ breakPoints }: any) => ({
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  color: "#2F2F2F",
  margin: "5px 0 0",
  opacity: 0.8,
  fontFamily: "open sans",
}));

export const Edit: any = styled("span")(({ breakPoints }: any) => ({
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  color: "#D7282F",
  display: "inline-block",
  paddingRight: "15px",
  "@media (max-width: 980px)": {
    padding: "0",
  },
}));

/**** responsive css ****/

export const AboutDescription = styled("span")({
  fontSize: "12px",
  cursor: "pointer",
  color: "#231f20",
  fontWeight: "600",
  lineHeight: "normal",

  "&:hover": {
    color: "#d7282f",
    textDecoration: "underline",
  },
});
export const CompanyProfileAAbout = styled("div")({
  "& p": {
    // fontSize: "13px",
    // color: "#4a4a4a",
    lineHeight: "normal",
  },
  "& span": {},
  "& .quoteviewmore": {
    "& p": {
      display: "inline",
    },
  },
});

export const Spantext = styled("span")({
  paddingLeft: "20px",
  display: "inline-block",
  fontWeight: "800",
  opacity: 1,
  fontSize: "16px",
  lineHeight: "15px",
  color: "#223354",
  position: "absolute",
  right: "10px",
  top: "15px",
  "@media screen and (max-width:294px)": {
    top: "18px",
  },
});
export const TradeShowForm = styled(Box)({
  "& .hideerroricon .MuiFormHelperText-root": {
    display: "none",
  },
});
export const PlatformTextCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  "& .MuiTypography-root": {
    fontSize: "16px",
    fontWeight: "600",
  },
});

// platform edit save
export const EditSaveCancel = styled("span")({
  position: "absolute",
  right: "5px",
  top: "0px",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
  color: "#D7282F",
});
export const TradeShowPhotos = styled(Box)({
  "& .MuiAvatar-root": {
    width: "35px",
    height: "35px"
  }

});

export const TradeShowImages = styled(Box)({
  minHeight: "350px",
  maxHeight: "350px",
  height: "350px",
  "& img": {
    height: "100%",
    width: "100%",
    objectFit: "cover"
  }
});
export const ComDetailCarouselHead = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 16px 0",
});
export const ComDetailCarouselDialog = styled(Dialog)({
  "& .MuiDialogContent-root": {
    padding: "5px 16px 16px"
  }
});



