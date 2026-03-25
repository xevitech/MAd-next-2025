import { TabList } from "@mui/lab";
import { styled, Button, Box } from "@mui/material";
import { display } from '@mui/system';

export const ContentDescriptionHeader = styled(Box)({
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  color: "#000000",
  // display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
  "@media screen and (max-width:900px)":{
    display:'block',
    
  }
});
export const ContentDescriptionText = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "24px",
  /* identical to box height, or 200% */
  letterSpacing: "0.09px",
  color: "#414141",
});

export const TabsContainer = styled("div")({
  width: "100%",
});

export const AttributesWrapper = styled("div")({
  display: "block",
  padding: "0 0 10px",
  // padding: "10px",
  // border: "1px solid #DDDDDD",
  borderRadius: "6px",
  // marginTop: "10px",
  minHeight:'48px',
  "& .MuiButton-textPrimary": {
    float: "left",
    marginRight: "8px",
    marginBottom: "8px",
  },
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: "6px",
  },
});
export const MainTab = styled(TabList)({
  "& .MuiTab-textColorPrimary": {
    "&.Mui-selected": {
      color: "#DD484E",
    },
  },
});
