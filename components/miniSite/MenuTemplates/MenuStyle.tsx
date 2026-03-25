import { Box, Stack, styled, Tab, Tabs, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

export const Buttonbox = styled(Box)(() => ({
  // height: "294px",
  border: "2px dashed #3F333340",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "70px",
  width: "100%",
}));
export const AddiconBox = styled(Stack)(() => ({
  // backgroundColor: "#d7282f",
  // borderRadius: "50%",
  // display: "flex",
  alignItems: "center",
  // justifyContent: "center",
  // height: "60px",
  // width: "60px",
  "& .MuiButton-root": {
    flexDirection: "column",
    color: "#d7282f",
    "& .MuiTypography-root": {
      fontWeight: "500",
      textTransform: "capitalize",
      fontSize: "18px !important",
      margin: "6px 0 0 0",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  "& .btnhelpertext": {
    fontSize: "14px",
    color: "#4a4a4a",
    fontWeight: "400",
  },
}));
export const Addicon = styled(AddCircleOutlineOutlinedIcon)(() => ({
  fontSize: "40px",
  color: "#fff",
  cursor: "pointer",
}));
export const CustomizeStoreText = styled(Typography)(() => ({
  fontSize: "16px",
  color: "#231f20",
  fontWeight: "600",
}));
export const CustomizeStoreSubText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#4a4a4a",
  fontWeight: "400",
}));
export const Foldericon = styled(FolderOutlinedIcon)(() => ({
  fontSize: "40px",
  color: "#fff",
  cursor: "pointer",
}));
export const Library = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "500",
  color: "#231f20",
}));
export const Tabssetting = styled(Tabs)(() => ({
  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    fontWeight: "500",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#d7282f",
  },
}));
export const Tabheading = styled(Tab)(() => ({
  color: "#231f20",
  textTransform: "capitalize",
}));
export const FlexContents = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "sticky",
  top: "0px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
}));
export const ModalStyle = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "16px",
}));
export const MasonaryInnerBox = styled(Box)(() => ({
  position: "relative",
  maxWidth: "400px",
  margin: "auto",
  overflow: "hidden",
  padding: "12px",
  boxShadow: "0 0 3px 2px rgba(204, 204, 204, 0.3)",
  cursor: "pointer",
  //   "::before": {
  //     background: "rgba(0,0,0,0.7)",
  //     position: "absolute",
  //     left: "12px",
  //     top: "12px",
  //     bottom: "12px",
  //     right: "12px",
  //     opacity: 0,
  //     transition: "all 0.4s ease-in-out 0s",
  //   },
}));
