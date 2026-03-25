import { Padding } from "@mui/icons-material";
import { styled } from "@mui/material";

export const OtpWrapper = styled("div")({});
export const OtpInputWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media screen and (max-width:480px)": {
    padding: "8px 0",
    "& .MuiInputBase-input": {
      padding: "7px",
    },
  },
});

export const OtpHeading = styled("div")({
  padding: "10px",
  textAlign: "center",
  opacity: "0.7",
  fontSize: "15px",
  "@media (max-width:767px)": {
    fontSize: "13px",
  },
});

export const StepHeading = styled("div")({
  display: "flex",
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "22px",
  color: "#231F20",
  textAlign: "center",
  // padding: '20px 10px',
  margin: "20px 0 0 0 ",
});

export const OuterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
export const ModalHeader = styled("p")({
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "100.9%",
  color: "#223354",
  fontFamily: "open sans",
  padding: "15px",
  textAlign: "center",
  marginLeft: "10px",
});

export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "10px",
  "@media (max-width:600px)": {
    paddingTop: "12px",
  },
});
export const EyeIconContainer = styled("span")({
  position: "absolute",
  // right: '45px',
  right: "10px",
  top: "5px",
  fontSize: "24px",
  opacity: "0.7",
  cursor: "pointer",
  zIndex: 999,
});
