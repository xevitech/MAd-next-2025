import { Box, Button, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/styles";
export const MainButton = styled(Button)({
  margin: "40px 0px",
  borderRadius: "26px",
  fontSize: "15px",
  alignItems: "center",
  padding: "15px 20px",
  height: "50px",
  background: "#FFFFFF",
  border: "1px solid #D7282F",
  boxShadow: "0px 0px 30px rgba(215, 40, 47, 0.25)",
});
export const Listitemtext1 = styled(ListItemText)({
  height: "30px",
  margin: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid #f1f1f1",
  "& .MuiListItemText-primary": {
    fontSize: "13px !important",
    fontWeight: "300",
    color: "#00000",
    display: "flex",
    justifyContent: "center",
  },
});
export const Permonth = styled(Typography)({
  fontSize: "13px !important",
  fontWeight: "300",
  color: "#00000",
  margin: "15px 0 20px",
});
export const FeatureListBox = styled(Box)({
  borderColor: "transparent",
  borderWidth: "1px 0 1px 1px",
  borderStyle: "solid",
  borderRadius: "10px 0 0 10px",
  // height: "calc(100% - 256px);", do not delete
  height: "calc(100% - 195px);",
  position: "absolute",
  top: "167px",
  border: "none",
});
export const DialogOuterBox = styled(Box)({
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  position: "relative",
});
export const CrossIconBox = styled(Box)({
  position: "absolute",
  top: "16px",
  right: "16px",
});
export const CrossIconInnerBox = styled(Box)({
  height: "30px",
  width: "30px",
  borderRadius: "50%",
  backgroundColor: "#FFE8EC",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});
export const DialogContentBox = styled(Box)({
  padding: "0 24px 16px 24px",
});
export const DialogContenttext = styled(Typography)({
  fontSize: "16px",
  fontWeight: "400",
  color: "#4A4A4A",
  textAlign: "center",
  "@media screen and (max-width:480px)": { fontSize: "14px" },
});
