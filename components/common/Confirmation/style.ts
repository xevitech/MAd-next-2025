import { Button,styled} from "@mui/material";

export const OuterContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  padding: 15,
  cursor: "pointer",
});

export const CrossIconContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  background: "white",
  borderRadius: 100,
  transform: "matrix(-1, 0, 0, 1, 0, 0)",
  height: 30,
  width: 30,
  justifyContent: "center",
});

export const CenterCrossIconContainer = styled("div")({
  border: "1px solid #D7282F",
  background: "#FFFFFF",
  borderRadius: 100,
  transform: "matrix(-1, 0, 0, 1, 0, 0)",
  height: 60,
  width: 60,
});

export const WarningHeaderStyle = {
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "23px",
  lineHeight: "30px",
  color: "#231F20",
  textAlign: "center",
};

export const WarningTextStyle = {
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "21px",
  color: "#4A4A4A",
  textAlign: "center",
};

export const closeIconStyle = {
  color: "#FF1A43",
  height: 50,
  width: 50,
  background: "#FFFFFF",
  border: " 1px solid #D7282F",
  borderRadius: "100px",
  transform: "matrix(-1, 0, 0, 1, 0, 0)",
};

export const CloseIconContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
});
export const BtnOutlinedRed = styled(Button)({
  fontFamily: "open sans",
  background: "#fff",
  height:"40px",
  border: "1px solid #D7282F",
  borderRadius: "4px",
  textTransform: "none",
  minWidth: "90px",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "24px",
  width:"auto",
  color:"#D7282F",
  "&:hover": {
    background:"#D7282F",
    color:"#fff",
  },
});
