import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const ITEM_HEIGHT = 35;
export const ITEM_PADDING_TOP = 2;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 140,
    },
  },
};

export const useStyles = makeStyles()((theme) => {
  return {
    updateprofile: {
      textTransform: "capitalize",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "16.41px",
      height: "35px",
      borderRadius: "6px",
      width: "135px",
      margin: "7px 0 0",
      borderColor: "#D7282F !important",
      color: "#D7282F",
      "&:hover": {
        background: "#DD484E",
        color: "#fff",
      },
    },
  };
});

export const PersonalHeaderText: any = styled("div")(
  ({ breakPoints }: any) => ({
    fontWeight: breakPoints?.max600px ? "600" : "700",
    lineHeight: breakPoints?.max600px ? "41px" : "36px",
    margin: breakPoints?.max600px
      ? "5rem auto 1rem"
      : breakPoints?.max768px
      ? "5rem 0 1rem"
      : "6rem 0 2rem",
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
  })
);

export const MultipleAddressContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const AddressInnerContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const AddressLeftContainer = styled("div")({});
export const AddressRightContainer = styled("div")({});
export const ContentContainerHeader: any = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  background: "rgb(245, 247, 250)",
  flexDirection: "column",
  paddingBottom: "0px",
  minHeight: "193px",
  flex: 1,
});

export const ImageAndHeadingContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    height: "100%",
    gap: "20px",
    fontFamily: "open sans",
    flex: 0.6,
    position: "relative",
    display: "flex",
    margin: breakPoints?.max600px ? "0px auto 0" : "0 auto",
    alignItems: "center",
    lineHeight: "40px",
    padding: "0 0 0 15px",
    "@media screen and (max-width:600px)": {
      padding: "12px 0 0 0",
      gap: "10px",
    },
  })
);

export const ImageContainer = styled("div")({
  width: "fit-content",
  position: "relative",
  cursor: "pointer",
});

export const ProfileImage = styled("img")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover",
  "@media screen and (max-width:767px)": {
    width: "60px",
    height: "60px",
  },
});

export const FloatingUpdateIconContainer = styled("div")({
  position: "absolute",
  bottom: "5px",
  right: "3px",
  width: "25px",
  height: "25px",
  background: "rgba(204, 64, 78, 0.8)",
  zIndex: 1,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "@media screen and (max-width:767px)": {
    width: "25px",
    height: "25px",
    right: "0px",
    bottom: "9px",
    "& img": {
      width: "10px",
    },
  },
  "& img": {
    width: "11px",
  },
});
export const FloatingIcon = styled("img")({
  height: "19px",
  width: "24px",
});
export const FloatingInnerIcon = styled("img")({
  position: "relative",
  zIndex: 20,
});
export const HeadingContainer: any = styled("div")(({ breakPoints }: any) => ({
  display: breakPoints?.max768px ? "block" : "flex",
  margin: "-12px 0 0",
}));

export const HeadingText: any = styled("div")(({ breakPoints }: any) => ({
  fontWeight: 700,
  lineHeight: "25px",
  color: "#231F20",
  padding: "0 0 6px",
  fontSize: breakPoints?.max768px
    ? "16px"
    : breakPoints?.max980px
    ? "18px"
    : breakPoints?.max1460px
    ? "19px"
    : "23px",
  top: breakPoints?.max600px
    ? "15px"
    : breakPoints?.max768px
    ? "11px"
    : "-14px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-all",
  width: "100%",
  "@media screen and (max-width: 600px)": {
    width: "100%",
    wordBreak: "break-word",
  },
}));

export const Card: any = styled("div")(({ breakPoints }: any) => ({
  background: breakPoints?.max600px ? "#FFF6F6" : "#FFF",
  borderRadius: breakPoints?.max768px ? "6px" : "0px",
  height: "fit-content",
  borderLeft: breakPoints?.max768px ? "none" : "1px solid #D9D9D9",
  padding: breakPoints?.max600px
    ? "5px 15px 12px"
    : breakPoints?.max768px
    ? "0 15px 10px"
    : "0 15px 0px",
  flex: 0.5,
  marginBottom: "0",
  margin: "10px 0",
  "@media screen and (max-width: 768px)": {
    width: "100%",
    margin: "0 auto",
  },
}));

export const CardHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
});

export const CardHeaderText: any = styled("p")(({ breakPoints }: any) => ({
  color: "#231F20",
  fontFamily: "open sans",
  fontWeight: 700,
  lineHeight: "33px",
  display: "flex",
  alignItems: "center",
  paddingBottom: breakPoints?.max600px
    ? "4px"
    : breakPoints?.max768px
    ? "10px"
    : "10px",
  borderBottom: "1px solid rgba(34, 51, 84,0.1)",
  fontSize: breakPoints?.max768px ? "18px" : "24px",
}));

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
  marginTop: "5px",
  opacity: 0.8,
  fontFamily: "open sans",
  position: "relative",
});

export const Header: any = styled("div")(({ breakPoints }: any) => ({
  display: "flex",
  width: "100%",
  margin: "auto",
  alignItems: "center",
  justifyContent: "space-around",
  flex: 0.9,
  background: breakPoints?.max600px
    ? "transparent"
    : breakPoints?.max768px
    ? "#fff"
    : "#fff",
  /* Gray Goose/Card Shadow */
  boxShadow: breakPoints?.max768px
    ? "none;  "
    : "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  paddingBottom: breakPoints?.max600px
    ? "0px"
    : breakPoints?.max768px
    ? "0"
    : "0px",
  marginTop: breakPoints?.max600px ? "0px" : "0px",
  padding: "0",
}));

export const ProfileContentContainer = styled("div")({
  width: "100%",
});

export const ProfileSelectButtons = styled("div")({
  display: "flex",
  gap: "30px",
});

export const ActiveButton = styled(Button)({
  background: "rgba(215, 40, 47, 0.85)",
});

export const CenterContentContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    gap: breakPoints?.max1920px ? "25px" : "16px",
    justifyContent: "center",
  })
);
export const LeftContentContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    display: "flex",
    flexDirection: "column",
    flex: 0.53,
    gap: breakPoints?.max1920px ? "25px" : "16px",
  })
);
export const RightContentContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    display: "flex",
    flexDirection: "column",
    flex: 0.45,
    gap: breakPoints?.max1920px ? "25px" : "16px",
  })
);

export const FooterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  marginTop: "20px",
});

export const SectionContainer: any = styled(Box)(({ breakPoints }: any) => ({
  maxwidth: "607px",
  boxShadow: breakPoints?.max600px
    ? "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
    : "0px 12px 23px 0px rgb(112 112 112 / 4%)",
  borderRadius: "6px",
  background: "white",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "10px",
  padding: breakPoints?.max600px ? "  10px" : "16px",
  "@media screen and (max-width:600px)": {
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
}));

export const SectionHeader = styled("div")({
  position: "relative",
  paddingBottom: "0px",
});
export const SectionHeaderText: any = styled("p")(({ breakPoints }: any) => ({
  fontWeight: 500,
  fontSize: breakPoints?.max600px ? "15px" : "18px",
  lineHeight: "25px",
  color: "#231F20",
  "@media (max-width:1400px)": {
    fontSize: "16px",
  },
  "@media (max-width:767px)": {
    fontSize: "14px",
  },
}));

export const SectionSubHeaderContainer = styled("div")({
  borderBottom: " 1px solid rgba(34,51,84,0.1)",
  paddingBottom: "8px",
});
export const SectionSubHeaderText = styled("p")({
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "18px",
  color: "#223354",
  opacity: "0.5",
});

export const IconAndTextContainer: any = styled(Box)(
  ({ verified, bgColor, transform, editIcon }: any) => ({
    // position: "absolute",
    right: editIcon?.editIcon ? "0px" : "38px",
    top: editIcon?.editIcon ? "10px" : "26px",
    color: verified?.verified ? "#3BB900" : "#D7282F",
    display: "flex",
    gap: "4px",
    cursor: verified?.verified ? "" : "pointer",
    padding: bgColor?.color && "2px",
    backgroundColor: bgColor?.color
      ? verified?.verified
        ? "#ECFBE6"
        : "rgba(215, 40, 47, 0.07)"
      : "transparent",
    // transform: transform?.up && `translateY(-15px)`,
    paddingLeft: bgColor?.color && "5px",
    paddingRight: bgColor?.color && "5px",
    borderRadius: "3px",
    minWidth: "auto",
    letterSpacing: "0.6px",
    // "@media (max-width:400px)": {
    //   top: editIcon?.editIcon ? "10px" : "47px !important",
    // },

    "@media (max-width:400px)": {
      top: editIcon?.editIcon ? "10px" : "",
    },
  })
);

export const SocialAccountsContainer: any = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "15px",
  paddingTop: "0px",
});

export const MediaContent: any = styled("div")(({ place }: any) => ({
  display: "flex",
  borderBottom: place?.last ? "none" : "1px solid rgba(34,51,84,0.1)",
}));

export const SocialIconContainer = styled("div")({
  width: "40px",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const SocialIcon = styled("img")({});

export const HiddenPasswordContainer = styled("div")({
  display: "flex",
  width: "50%",
  fontSize: "50px",
  letterSpacing: "10px",
  alignItems: "center",
  tranform: "translate(10px,-8px)",
  gap: "15px",
});

export const MediaHeadingAndIdContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const MediaHeading = styled("div")({
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "16px",
  color: "#231F20",
});
export const MediaId = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "15px",
  color: "#223354",

  opacity: 0.5,
});

export const FieldsContainer = styled("div")({
  margin: "0px",
  "@media screen and (max-width: 768px)": {
    margin: "0",
  },
  "& .gridBorder": {
    position: "relative",
    "&:before": {
      content: '""',
      position:'absolute',
      height:'29px',
      width:'1px',
      backgroundColor:'#ddd',
      right:'-25px',
      top:'20px',
      // boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px'
    },
  },
});

export const CustomisedInputField: any = styled("div")(
  ({ position, rightContainer }: any) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // justifyContent: rightContainer?.rightContainer
    //   ? "flex-start"
    //   : "space-between",
    borderBottom: position?.last ? "none" : "1px solid rgba(34,51,84,0.1)",
    paddingTop: "8px",
    paddingLeft: "0px",
    paddingBottom: "8px",
    paddingRight: "0px",
    position: "relative",
    height: "50px",
    marginTop: "10px",
    "&:hover": {},

    "@media screen and (max-width: 767px)": {
      display: "flex",
    },
    "@media screen and (max-width: 400px)": {
      // flexDirection: "column",
      alignItems: "flex-start",
    },
    "@media screen and (max-width:320px)": {
      height: "55px !important",
    },
  })
);

export const UserEmail = styled("span")({
  color: "#231f20",
  fontFamily: "open sans",
  fontSize: "14px",
  display: "inline-block",
  marginLeft: "0px",
  "@media screen and (max-width: 767px)": {
    wordBreak: "break-all",
    fontSize: "13px",
  },
  "@media screen and (max-width:320px)": {
    // marginTop: "6px",
  },
});

export const HoverEditMessage = styled("div")({
  position: "absolute",
  fontSize: "8px",
  right: 0,
  top: 0,
  color: "red",
  opacity: "0.9",
});

export const FieldLabel = styled("span")({
  color: "#223354",
  opacity: 0.6,
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "18px",
  fontFamily: "open sans",
  marginRight: "10px",
  display: "flex",
  "@media screen and (max-width: 767px)": {
    fontSize: "13px",
  },
});

export const EditText = styled("span")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "18px",
  display: "inline-block",
});
export const EditIconContainer = styled("span")({
  display: "inline-block",
});
export const PasswordField: any = styled("div")({
  display: "flex",
  alignItems: "center",
  height: "45px",
  marginRight: "20px",
  paddingTop: "10px",
  justifyContent: "space-between",
  "@media screen and (max-width:320px)": {
    display: "block",
  },
});

export const AddressContainer = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const MobileContainer = styled("div")({
  color: "#231f20",
  fontFamily: "open sans",
  fontSize: "15px",
  height: "16px",
  transform: "translateY(-2px)",
  display: "inline-block",
  marginLeft: "10px",
  "@media screen and (max-width: 400px)": {
    marginLeft: "0",
    marginTop: "6px",
  },
});

export const EditIcon = styled("img")({});

export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const DotContainer = styled("div")({
  display: "flex",
  background: "black",
  height: "5px",
  width: "5px",
  borderRadius: "50%",
});
export const DotsOuterContainer = styled("div")({
  width: "35%",
  display: "flex",
  gap: "8px",
  marginLeft: "20px",
  "@media screen and (max-width:320px)": {
    width: "100%",
  },
});

export const CustomButton = styled(Button)({
  textTransform: "none",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "12px",
  background: "#DD484E",
  color: "white",
  height: "26px",

  "&:hover": {
    background: "#DD484E",
  },
});

export const ChipCustom: any = styled("div")(({ breakPoints }: any) => ({
  height: "23px",
  background: "rgba(34, 51, 84, 0.1)",
  borderRadius: "6px",
  paddingLeft: "6px",
  paddingRight: "6px",
  color: "#231F20",
  fontWeight: "600",
  marginTop: "6px",
  fontSize: breakPoints?.max768px ? "10px" : "13px",
  lineHeight: "18px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

export const PageContainer = styled("div")({
  background: "#F4F6FA",
  width: "95%",
  margin: "0 auto",
});

export const CompanyProfileGrid = styled(Grid)({
  padding: "0px",
});

// Responsive css for small devices (maya dev feb 13) //

export const MemberId: any = styled("p")(({ breakPoints }: any) => ({
  bottom: breakPoints?.max600px
    ? "25px"
    : breakPoints?.max768px
    ? "25px"
    : "8px",
  left: "121px",
  color: "#231F20",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "138.9%",
  margin: 0,
}));

export const CardHeaderTextProfile: any = styled(Typography)(
  ({ breakPoints }: any) => ({
    color: "#231F20",
    fontFamily: "open sans",
    fontWeight: 700,
    lineHeight: "33px",
    display: "flex",
    alignItems: "center",
    paddingBottom: breakPoints?.max600px
      ? "4px"
      : breakPoints?.max768px
      ? "10px"
      : "10px",
    borderBottom: "1px solid rgba(34, 51, 84,0.1)",
    fontSize: breakPoints?.max768px ? "18px" : "24px",
    "@media (max-width: 980px)": {
      fontSize: "16px",
    },
  })
);

export const GridPersonalProfile = styled(Grid)({
  "@media (max-width: 980px)": {
    marginTop: "0px",
  },
});

export const ButtonChangePwd = styled(Button)({
  marginLeft: "12px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "16.41px",
  height: "35px",
  borderRadius: "6px",
  "@media screen and (max-width: 768px)": {
    fontSize: "12px !important",
  },
  "@media screen and (max-width: 320px)": {
    marginTop: "12px",
    marginLeft: "0px",
  },
});
export const BoxLabelCcontainer = styled(Box)({
  display: "flex",
  "@media screen and (max-width: 767px)": {
    display: "block",
  },
  "& .flagspacing": {
    "@media screen and (max-width: 767px)": {
      marginLeft: "0",
    },
  },
});

export const BoxIconCcontainer = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  "@media screen and (max-width: 767px)": {
    position: "absolute",
    right: "0",
    top: "5x",
  },
});
