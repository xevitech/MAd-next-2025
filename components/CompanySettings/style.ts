import {
  styled,
  ToggleButton,
  Box,
  Typography,
  ButtonBase,
} from "@mui/material";

export const OuterContainer = styled("div")({
  background: "#f5f7fa",
  padding: "30px",
  minHeight: "calc(100vh - 64px)",
});

export const PreHeaderText: any = styled("div")(({ breakPoints }: any) => ({
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: "30px",
  lineHeight: "41px",
  marginBottom: "30px",
  display: "flex",
  color: "#231F20",
  marginTop: "64px",
}));

export const Header = styled("div")({
  display: "flex",
  flex: 1,
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
});

export const HeaderLeftContent = styled("div")({
  display: "flex",
  flex: 0.5,
  gap: "20px",
  position: "relative",
  margin: "16px",
});

export const LogoContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  position: "relative",
});

export const Logo = styled("img")({
  width: "83px",
  height: "83px",
  borderRadius: "6px",
});

export const CompanyName = styled("div")({
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: "30px",
  lineHeight: "41px",
  display: "flex",
  color: "#231F20",
  alignItems: "center",
});

export const HeaderRightContent = styled("div")({
  display: "flex",
  flex: 0.5,
  paddingLeft: 17,
  flexDirection: "column",
  marginTop: 25,
});

export const CoverContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch ",
  width: "100%",
  position: "relative",
  paddingLeft: 15,
  paddingBottom: 15,
});

export const Cover = styled("img")({
  objectFit: "cover", //fill
  width: "100%",
  height: "124px",
  borderRadius: "6px",
  filter:
    "drop-shadow(0px 9px 16px rgba(159, 162, 191, 0.18)) drop-shadow(0px 2px 2px rgba(159, 162, 191, 0.32))",
  "@media screen and (max-width:600px)": {
    height: "auto",
  },
});

export const NavigationButtonContainer = styled("div")({
  display: "flex",
  gap: "10px",
  flexFlow: "row",
  alignItems: "center",
  marginTop: "25px",
  flexWrap: "wrap",
});

export const NavigationButton: any = styled(ToggleButton)(
  ({ active }: any) => ({
    " &:hover ": {
      background: "#D7282F",
      color: "#FFFFFF",
    },
    textTransform: "none",
    display: "flex",
    fontFamily: "open sans",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "16px",
    color: active ? "#FFFFFF" : "#231F20",
    background: active ? "#D7282F" : "",
    opacity: " 0.85",
    border: active ? "1px solid #D7282F" : "",
    boxShadow: active
      ? "0px 2px 10px rgba(30, 144, 255, 0.5); border-radius: 6px"
      : "",
    alignItems: "center",
    justifyContent: "space-around",
  })
);

export const ContentContainer = styled("div")({
  display: "flex",
  gap: "20px",
});

export const ContainerHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
  margin: "10px",
  marginBottom: "0px",
  paddingBottom: "10px",
  background: "#FFFFFF",
  borderRadius: "6px",
  paddingLeft: 20,
  paddingRight: 20,
  marginTop: 10,
});

export const ContainerHeaderText = styled("p")({
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "22px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  fontFamily: "open sans",
});

export const FloatingUpdateIconContainer = styled("div")({
  position: "absolute",
  bottom: "-6px",
  right: "-22px",
  width: "42px",
  height: "41px",
  background: "rgba(215, 40, 47, 0.8);",
  zIndex: 1,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const FloatingIcon = styled("div")({
  height: "13px",
  width: "13px",
  position: "relative",
});

export const FloatingIconUpdateCoverContainer = styled("div")({
  position: "absolute",
  bottom: "45px",
  right: "20px",
  width: "111px",
  height: "26px",
  background: "rgba(215, 40, 47, 0.8);",
  zIndex: 1,
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  gap: 2,
});

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
  width: "13px",
  height: "13px",
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

export const RightContainerText = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "13px",
  lineHeight: "18px",
  color: "#747474",
  marginBottom: 25,
  width: "max-content",
});

export const CardHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
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

export const CardContent = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const StoreContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

export const StoreButtonContainer: any = styled(ToggleButton)({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "13px",
  lineHeight: "18px",
  display: "flex",
  aligItems: "center",
  textTransform: "none",
  alignItems: "center",
  borderRadius: "6px",
  borderColor: "#231F20",
  color: "#231F20",
  height: "35px",
  width: "100%",
  transition: "all ease .3s",
});

export const CoverImage = styled("img")({
  objectFit: "cover",
});

export const Followersbutton = styled("p")({
  color: "#D7282F",
  fontSize: "16px",
  fontWeight: "600",
  cursor:"pointer"
});
//modal
export const ModalHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "10px",
});
export const Modaltext = styled(Typography)({
  color: "#000000",
  fontWeight: "600",
  fontSize: "14px",
});

export const Modaltext1 = styled(Typography)({
  color: "#000000",
  fontWeight: "400",
  fontSize: "14px",
});

export const Modalcontent = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "8px",
});

export const ImageNtext = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const Subtext = styled(Typography)({
  color: "#006FBF",
  fontSize: "12px",
  fontWeight: "400",
});

export const FollowButton = styled(ButtonBase)({
  backgroundColor: "#EFEFEF",
  borderRadius: "3px",
  color: "#231F20",
  fontWeight: "600",
  fontSize: "14px",
  padding: "10px",
  border: "1px solid #D2D2D2",
  // height: "31.78px",
  height: "27.78px",
  transition: "all ease .3s",
  "&:hover": {
    color: "#d7282f",
    transition: "all ease .3s",
  },
  "@media (max-width:600px)": {
    float: "right",
  },
});

export const NoFollowers = styled(Box)({
  padding: "10px 0",
  textAlign: "center",
  "& .icon-follower": {
    fontSize: "60px",
  },
  "& .MuiTypography-h4": {
    fontWeight: "600",
    fontSize: "22px",
    margin: "16px 0 4px 0",
  },
});

export const FollowerList = styled(Box)({
  "& .MuiListItem-root": {
    padding: "8px 0px",
    "& .MuiAvatar-root": {
      border: "1px solid #bdbdbd",
      backgroundColor: "white",
      overflow: "hidden",
      "& .MuiSvgIcon-root": {
        color: "#bdbdbd",
        fontSize: "30px",
      },
    },
    "& .MuiListItemText-root": {
      margin: "0",
      "& .MuiListItemText-primary": {
        fontSize: "14px",
        fontWeight: "500",
      },
      "& .MuiListItemText-secondary": {
        fontSize: "12px",
        color: "#1976d2",
      },
    },
    "& .MuiButtonBase-root": {
      textTransform: "inherit",
    },
  },
});

export const CompanyDetailInnData = styled(Box)({
  padding: "15px 15px 0",
});
export const SocialmediaContactt = styled(Box)({
  "& .detailaccountinfo": {
    width: "30%",
    display: "block",
    "& .MuiFormControl-root": {
      width: "100% !Important",
    },
  },
});
