import { styled } from "@mui/material";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  outline: "none",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "6px",
  p: 4,
  minHeight: 228,
  "@media (max-width:600px)": {
    width: "90%",
    padding: "20px 10px",
  },
};

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
  // padding: "20px 10px",
  marginTop: "27px"
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
export const ModalHeader = styled("p")({
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "100.9%",
  color: "#223354",
  fontFamily: "open sans",
  padding: "15px 15px 25px",
  textAlign: "center",
  marginLeft: "10px",
});
export const MobileInputContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "95%",
  marginLeft: "10px",
  "@media (max-width:767px)": {
    marginLeft: "0",
    width: "100%",
  },
  '& .MuiInputAdornment-root': {
    '& .MuiTypography-body1': {
      fontSize: '14px',
      paddingLeft: '4px',
      color: '#000'
    },
  },
});
export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "10px",

});
