import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/styles";
export const LeftRedBorder = styled("div")({
  height: "30px",
  width: "2px",
  backgroundColor: "#D7282F",
  position: "absolute",
  left: "6px",
});
export const UnreadNotification = styled("div")({
  background: "#d7282f",
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  position: "absolute",
  right: "8px",
});

export const SettingContainer = styled("div")({
  width: "25px",
  height: "17px",
  margin: "0 0px 0 7px",
  padding: "0 0px 0 7px",
  borderLeft: "1px solid",
  "@media screen and (max-width: 800px)": {
    margin: 0,
  },
  "& svg": {
    color: "#000",
    fontSize: "16px",
  },
});
export const ViewAllButton: any = styled(Button)({
  marginLeft: "10px !important",
  backgroundColor: "#fff !important",
  border: "1px solid #D7282F !important",

  fontSize: "12px !important",
  color: "#d7282f !important",
  boxShadow: "none !important",
  padding: "2px 12px !important",
  transition: ".3s",
  "&:hover": {
    backgroundColor: "#D7282F !important",
    color: "#fff !important",
    transition: ".3s",
  },
});
export const NotificationContainer: any = styled("div")(({ length }: any) => {
  return {
    height: length > 0 ? "380px" : "100px",
    overflowY: "auto",
    width: "100%",
    margin: "-11px 0 0",
    "&::-webkit-scrollbar": { width: "5px" },
    "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
    "&::-webkit-scrollbar-thumb": {
      background: "#D9D9D9",
      borderRadius: "10px",
    },
    "& .MuiMenuItem-root": {
      padding: 0,
    },
  };
});
export const CountContainer: any = styled("div")({
  background: "#D7282F",
  position: "absolute",
  borderRadius: "50%",
  color: "#fff",
  fontSize: "10px",
  width: "8px",
  height: "8px",
  right: "13px",
  top: "5px",
  padding: "2px 3px",
});

/**************** Remove makestyle new component  ****************/
export const TypographyHeading: any = styled(Typography)({
  width: 124,
  height: 27,
  fontSize: 20,
  fontWeight: 600,
  color: "#000000",
  "@media screen and (max-width: 800px)": {
    fontSize: "14px",
  },
});

export const NotificationTitleHeader: any = styled(Box)({
  display: "flex",
  padding: "0 10px 2px",
  alignItems: "center",
});

export const HeaderText: any = styled("div")({
  display: "flex",
  flexDirection: "row",
  color: "#D7282F",
  fontFamily: "sans-serif",
  position: "absolute",
  right: "20px",
  fontWeight: "600",
  gap: 4,
  "@media screen and (max-width: 800px)": {
    right: "3px",
  },
});

export const NotificationData: any = styled("span")({
  position:'relative',
  "& a": {
    margin: "0 0 0 10px",
    color: "#d7282f",
    textDecoration: "underline",
    fontWeight: "600",
    "&:hover": {
      textDecoration: "none",
      color: "#d7282f",
    },
  },
});
export const TypographySubtitle: any = styled(Typography)({
  fontSize: "13px !important",
});

export const TypographyMarkRead: any = styled(Typography)({
  fontSize: "12px !important",
  fontWeight: "600 !important",
});

export const TypographyDateTime: any = styled(Typography)({
  fontSize: "10px !important",
  fontWeight: "400 !important",
  color: "#7B7979 !important",
});

export const TypographyDetail: any = styled(Typography)({
  fontSize: "11px !important",
  fontWeight: "400 !important",
  color: "#231F20 !important",
});

export const TypographyProductName: any = styled(Typography)({
  fontWeight: "600 !important",
  fontSize: "12px !important",
  "& .mainnameproduct": {
    padding: "0 2px",
  },
});

export const Gridnotificationdata: any = styled(Grid)({
  padding: "11px 6px 0!important",
  "& .notificationinline p, h6, span": {
    display: "inline",
    wordBreak: "break-word",
  },
  "& .mainnameproduct strong": {
    fontWeight: "600",
  },
  "& .ClickHereBTN": {
    color: "#d7282f",
    fontWeight: "600",
    textTransform: "capitalize",
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "none",
      background:'transparent'
    },
  },
});
export const LoadingTxt: any = styled("div")({
  fontSize: "13px",
  margin: "1rem",
});

export const Notoficationlayuout: any = styled(Box)({
  "@media screen and (max-width: 767px)": {
    "& .Headersmallbutton": {
      "& .MuiAvatar-circular": {
        width: "25px",
        height: "25px",
      },
    },
  },
});

export const TabsIndicatorStyling = {
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
    fontSize: "13px",
    color: "#333333",
    fontWeight: "600",
    "& svg": { margin: "0 3px", fontSize: 19 },
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    fontWeight: "600",
    zIndex: 1,
    "& svg": { color: "#D7282F" },
  },

  "& .MuiTabs-flexContainer": {
    alignItems: "center",
  },

  "& .MuiTabs-scroller": {
    borderBottom: "1px solid #e5e5e5",
    margin: "0 0 0 -11px",
  },
  "& .MuiButtonBase-root": {
    zIndex: "10",
    "&:hover": {
      color: "#d7282f",
    },
  },
  "& .MuiTabs-scrollButtons": {
    width: "20px",
    margin: "0 5px",
    "& svg": {
      background: "#ddd",
      borderRadius: "50px",
      margin: "0 0 0 -13px",
      zIndex: "100",
    },
  },
};
