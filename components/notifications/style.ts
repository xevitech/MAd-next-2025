import { Box, styled, Tab, Tabs } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

export const NotificationContainer = styled("div")({
  background: "#fff",
  boxShadow:
    "0px 9px 16px rgba(159, 162, 191, 0.18), 0px 2px 2px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
});

export const HeadDes = styled("p")({
  fontSize: "14px",
  fontWeight: 400,
});

export const HeadTTxt = styled("p")({
  fontSize: "16px",
  fontWeight: 600,
  color: "#333333",
});

export const NotificationTabs = styled("div")({
  margin: "1rem 0 0 0",
  "& .notification-paper": {},
});

export const StepperCon = styled("div")({
  margin: "1rem 0 0 0",
});

export const Heading: any = styled("span")(({ value }: any) => ({
  fontWeight: 600,
  fontSize: "14px",
  marginLeft: "13px",
  color: "#231F20",
}));

export const NotificationDec = styled(Box)({
  "& p": {
    fontSize: "14px",
    fontWeight: 400,
  },
});

export const ProductNamemsgg = styled("span")({
  fontSize: "15px",
  fontWeight: 600,
});
export const NotificationDate = styled("p")({
  fontWeight: 400,
  fontSize: "12px",
  color: "#7B7979",
  margin: "5px 0 0 0",
});
export const Noticontainer: any = styled("div")(({ value }: any) => {
  return {
    width: "100%",
    position: "relative",
    margin: "0 0 8px",
    padding: "18px 10px 10px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  };
});

export const NotiItem = styled("div")({
  width: "100%",
  margin: "1rem 0 0 0",
});

export const Iconcontainer: any = styled("div")(({ itemColor }: any) => ({
  color: "#FFFFFF",
  padding: "2px",
  gap: "10px",
  width: "42px",
  height: "42px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50px",
  backgroundColor: "#FEECEC",
  border: "1px solid #fff",
}));

export const ActivityHeader = styled(Box)({
  display: "flex",
  flex: 1,
  height: "15px",
  alignItems: "center",
});

export const Content = styled("div")({
  // borderLeft: "2px solid #BEBEBE",
  margin: "-20px 0 0 20px",
  padding: "0 0 12px 29px",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "2px",
    height: "75%",
    background: "#bebebe",
    top: "34px",
    left: "1px",
    "@media screen and (max-width:600px)": {
      height: "100%",
    },
  },
});

export const NotiItemTop = styled("div")({});

export const Notificationstatus = styled("div")({
  right: "10px",
  color: "#7B7979",
  fontSize: "12px",
});
export const Statusbg = styled("div")({
  position: "absolute",
  right: "0",
  color: "#CA950F",
  fontSize: "12px",
  background: "#FFF8E5",
  borderRadius: "4px",
  padding: "1px 5px",
});

export const Headercontent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const ReadTxt = styled("div")({
  color: "#D7282F",
  fontSize: "12px",
  textDecoration: "underline",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "none",
  },
});

/***********  Styled Component *********/

export const InnerNotification = styled("div")({
  margin: "0 auto 2rem",
  width: "100%",
  padding: "20px",

  "@media screen and (max-width:480px)": {
    padding: "16px",
  },
});

export const NotifcationFlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid #d2d2d2",
  padding: "0 0 8px 0",
});
export const SettingBox = styled("div")({
  color: "#7B7979",
  position: "absolute",
  right: 0,
  cursor: "pointer",
  "@media (max-width: 767px)": {
    display: "none",
  },
});
export const NotificationTabLeft = styled(Box)({
  "& .MuiTabs-vertical": {
    border: "2px solid #F6F8FB",
    margin: "8px 20px 8px 0",
    borderRadius: "6px",
    position: "sticky",
    top: "77px",
  },
});

// for badges

export const Badges = styled(Box)({
  position: "absolute",
  right: "10px",
  "@media screen and (max-width:900px)": {
    display: "none",
  },
});
export const BadgeshowonMd = styled(Box)({
  display: "none",
  "@media screen and (max-width:900px)": {
    display: "inline",
  },
});
export const DateNStautsBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media screen and (max-width:320px)": {
    display: "block",
  },
});
export const PulseAndText = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "@media screen and (min-width:1536px)": {
    alignItems: "center",
  },
});
export const PulseBackground = styled(Box)({
  background: "#d7282f",
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  position: "absolute",
  right: "8px",
  "@media screen and (max-width:1536px)": {
    margin: "6px 0 0 0",
  },
});
// Inner Tab
export const NotificationInnerTabs = styled(Tabs)({
  // color: "red",
  "& .MuiButtonBase-root.Mui-selected": {
    color: "#d7282f !important",
    "& .badgeselected": {
      backgroundColor: "#d7282f",
    },
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#d7282f",
  },
});
export const NotificationInnerButtonTab = styled(Tab)({
  textTransform: "capitalize",
});
export const NotificationInnerBadge = styled("span")({
  backgroundColor: "#7b7979",
  color: "#fff",
  borderRadius: "12px",
  padding: "2px 7px",
  fontSize: "10px",
});
