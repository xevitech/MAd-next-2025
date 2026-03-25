import { Box, styled, Typography } from "@mui/material";
export const MainnBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "20px 0 0 20px",
  "@media (max-width: 662px)": {
    width: "100px",
  },
});
export const Inner1Box = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0px 0 0 20px",
});
export const Inner2Box = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0px 0 0 20px",
});
export const Inner1Box1 = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "5px 0 0 20px",
  gap: "40px",
});
export const MainBox1 = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  padding: "15px",
});
export const ButtonBox = styled(Box)({
  display: "flex",
  alignItems: "center",

  padding: "10px 0 0 20px",
});
