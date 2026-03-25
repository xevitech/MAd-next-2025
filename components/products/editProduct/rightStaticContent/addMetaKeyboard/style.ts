import {
  styled,
  Button,
  Typography,
  Divider,
  Grid,
  Chip,
  Box,
} from "@mui/material";
export const AddMetaTextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "12px,16px",
  gap: "16px",
  position: "relative",
});
export const AddMetaText = styled("text")({
  position: "absolute",
  fontFamily: "sans-serif",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "27px",
  fontSize: "20px",
  width: "183px",
  height: "27px",
});
export const CrossIcon = styled("span")({
  position: "absolute",
  left: "35rem",
  cursor: "pointer",
});
export const TextDivider = styled(Divider)({
  display: "block",
  width: "100%",
  marginTop: "20px",
});
export const InputBox = styled("div")({
  position: "relative",
  borderRadius: "8px",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  margin: "0px 0 10px",
  padding: "12px 16px",
  "& .MuiInputBase-root": {
    "&:before": {
      borderBottom: "0",
    },
  },
});
export const ButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  position: "relative",
  width: "100%",
});
export const Buttons = styled("span")({
  position: "absolute",
  right: 0,
});
export const Boxborder = styled(Box)({
  border: "1px solid rgba(0, 0, 0, 0.22)",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "space-between",
  alignItems:"center",
  padding: "0 8px 0 0",
  position: "relative",
  "&:hover": {
    border: "1px solid rgba(0, 0, 0, 1)",
  },
});
export const AbsoluteBox = styled(Box)({
  position: "absolute",
  backgroundColor: "#fff",
  top: "-10px",
  left: "18px",
  padding: "0px 6px",
});
export const KeywordHeading = styled(Typography)({
  fontSize: "12px",
  color: "#1c1c1c",
  fontWeight: "600",
});
