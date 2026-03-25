import { styled, Button, Box } from "@mui/material";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  outline: "none",
  bgcolor: "white",
  background: `linear-gradient(127.55deg, #EEEEEE 3.73%, #FFFFFF 92.26%)`,
  boxShadow: 24,
  p: 4,
  borderRadius: "6px",
  "@media (max-width:480px)": {
    width: "90%",
    padding: "20px 10px",
  },
};

export const ModalOuterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  "& .mobileverificationPopup": {
    "@media screen and (max-width:480px)": {
      // width: "75%",
    },
    "@media screen and (max-width:320px)": {
      // width: "80%",
    },
  },
});

export const IconContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
});

export const Icon = styled("img")({});

export const ModalHeader = styled("p")({
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "22px",
  color: "#231F20",
  textAlign: "center",
});

export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "12px",
});
export const CustomButton = styled(Button)({
  textTransform: "none",

  display: "inline-flex",
  margin: "auto",
  background: "rgba(216, 38, 47, 0.9)",
  fontFamily: "open sans",
  fontWeight: "600",
  fontSize: "13px",
  lineHeight: "18px",
  height: "36px",
  borderRadius: "6px",
  paddingLeft: "15px",
  paddingRight: "15px",
  minWidth: "180px",

  "&:hover": {
    background: "rgba(215, 40, 47, 0.85)",
  },
});

export const ModalSubHeader = styled("p")({
  textAlign: "center",
  fontSize: "14px",
  color: "rgba(35, 31, 32, 0.6)",
  opacity: 0.5,
});

export const OuterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const StepHeading = styled("div")({
  display: "flex",
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "22px",
  color: "#231F20",
  textAlign: "center",
  padding: "2px 10px",
  marginTop: "20px",
});

export const OtpWrapper = styled("div")({});
export const OtpInputWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media screen and (max-width:480px)": {
    padding: "8px 0px",
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

export const VerifyMobileBoxx = styled(Box)({
  padding: "10px 0 0",
  textAlign: "center",
  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#231F20",
    padding: "3px 0 0",
  },
});
