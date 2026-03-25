import { Box, Button, Stack, styled } from "@mui/material";
export const OutlineButton = styled(Button)({
  border: "1px solid #d7282f",
  color: "#d7282f",
  "&:hover": {
    border: "1px solid #d7282f",
    color: "#fff",
    background: "#d7282f",
  },
});
export const FIlledButton = styled(Button)({
  border: "1px solid #d7282f",
  background: "#d7282f",
  color: "#fff",
  boxShadow: "none !important",
  "&:hover": {
    border: "1px solid #d7282f",
    color: "#d7282f",
    background: "#fff",
  },
});
export const CodeInput = styled(Stack)({
  "& .MuiInputBase-input": {
    padding: "8.5px 14px",
  },
});
export const VerificationInner = styled(Box)({
  width: "600px",
  background: "#fff",
  borderRadius: "2px solid",
  padding: "50px 32px",
  textAlign: "center",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  "& .MuiTypography-body1": {
    fontSize: "13px",
  },
  "@media screen and (max-width: 800px)": {
    width: "90%",
  },
  "& .MuiPaper-root":{
    background:"#FDEDED",
    marginBottom:"10px"
  },
  "& .MuiAlert-message":{
    color:"#5F2120"
  }
});
export const VerificationBG = styled(Box)({
  backgroundImage: `url('/assets/images/dashboard-Blurimg.jpg')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  position: "relative",
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100%",
  "@media screen and (max-width: 1200px)": {
    backgroundPosition: "center top",
  },
  "@media screen and (max-width: 768px)": {
    backgroundSize: "contain",
  },
  "@media screen and (max-width: 480px)": {
    backgroundSize: "cover",
    backgroundPosition: "top center",
  },
});
