import { Box, Button, styled, Tab, Tabs, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

export const TabsStyle = styled(Tabs)(() => ({
  "& .MuiButtonBase-root-MuiTab-root.Mui-selected": {
    color: "red",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#d7282f !important ",
  },
  "& .Mui-selected": {
    color: "#d7282f !important",
    fontWeight: "600",
  },
}));
export const TabStyle = styled(Tab)(() => ({
  textTransform: "capitalize",
  color: "#231f20",
  fontWeight: "600",
}));
export const TabContentBox = styled(Box)(() => ({}));
export const BrowsingHeading = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "700",
  color: "#231f20",
}));
export const BrowsingSpanHeading = styled("span")(() => ({
  fontSize: "18px",
  fontWeight: "400",
  color: "#BDBDBD",
}));
export const BrowsingButtonBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));
export const BrowsingLoadMore = styled(Button)(() => ({
  border: "1px solid #626262",
  color: "#626262",
  fontSize: "14px",
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#d7282f",
    border: "1px solid #d7282f",
    color: "#fff",
  },
}));
export const BrowsingOuterBox = styled(Box)(() => ({
  // background: "#fff",
  "& .scrollspy": {
    display: "flex !important",
    alignItems: "center",
    gap: "20px",
    position: "sticky",
    backgroundColor: "#fff",
    zIndex: "99",
    top: "100px",
    margin: "0 34px",
    borderBottom: "1px solid #d2d2d2",
    padding: "0 0 12px 0",
  },
}));

export const MiniSiteContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1740px",
  margin: "12px auto 0",
  width: "100%",
  padding: "0 16px",
  "& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
    textTransform: "capitalize",
  },
  "& .NavBar": {
    "@media(max-width:767px)": {
      padding: "0",
    },
  },
  "@media(max-width:767px)": {
    padding: "0 4px",
    margin: 0,
  },
  "@media(max-width:320px)": {
    padding: "0",
    margin: 0,
  },
  "& .scrollspy": {
    display: "flex !important",
    alignItems: "center",
    gap: "20px",
    position: "sticky",
    backgroundColor: "#fff",
    zIndex: "99",
    top: "100px",
    margin: "0 34px",
    "&:first-child":{
      marginLeft:'0px !important'
    }
  },
}));
export const ScrollHiddenDiv = styled(Box)({
  position: "relative",
  top: "-55px",
  margin: "0 !important",
});
