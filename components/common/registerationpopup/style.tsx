import { Box, styled } from "@mui/material";

export const CompleteProfile = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: '10px',
  "@media (max-width: 900px)": {
    margin: '0',
  },
  "@media (max-width: 600px)": {
    justifyContent: 'flex-start',
  },
});

export const WelcomeScrolleble = styled(Box)({
  "@media (max-width: 600px)": {
    height: "200px",
    overflowY: "auto"
  },
});
export const ContentArea = styled(Box)({
  "@media only screen and (min-width: 400px) and (max-device-width: 950px) and (orientation: landscape)":
  {
    height: "200px",
    overflowY: "auto"
  },
});

