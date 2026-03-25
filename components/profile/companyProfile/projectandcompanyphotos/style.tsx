import { Box, Button, styled, Tab, Tabs, Typography } from "@mui/material";

export const ProjectCompanyTabs = styled(Tabs)({});
export const ProjectCompanyTab = styled(Tab)({
  textTransform: "capitalize",
});
export const ProjectCompanyImageBox = styled(Box)({
  height: "120px",
  width: "100%",
  border: "1px solid #ebe9e9",
  borderRadius: "4px",
  position: "relative",
});
export const ProjectCompanyImage = styled("img")({
  height: "100%",
  width: "100%",
  objectFit: "contain",
  aspectRatio:'16/9'
});
export const ProjectCompanyImageDeleteBox = styled(Box)({
  position: "absolute",
  right: "-8px",
  top: "-8px",
  height: "20px",
  width: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#FFE8EC",
  cursor: "pointer",
});
export const PhotoName = styled(Typography)({
  fontSize: "14px",
  fontWeight: "500",
  color: "#231f20",
});
export const CenterOuterBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin: "16px 0 0 0",
});
export const ProjectCompanyImageView = styled(Box)({
  height: "120px",
  width: "100%",
  border: "1px solid #ebe9e9",
  borderRadius: "4px",
  position: "relative",
});
export const EditSave = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "4px",
  alignItems: "center",
  cursor: "pointer",
});
export const AddBtnBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  margin: "12px 0 0 0",
});
export const AddBtn = styled(Button)({
  background: "#d7282f",
  color: "#fff",
  padding: "3px 12px",
  border: "1px solid #d7282f",
  "&:hover": {
    background: "#fff",
    border: "1px solid #d7282f",
    color: "#d7282f",
  },
});
