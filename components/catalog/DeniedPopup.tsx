import { Box, Button, Stack, styled, Typography } from "@mui/material";
import React from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export const OuterBox = styled(Box)({
  height: "100vh",
  width: "100vw",
  backgroundImage: `url('/assets/images/bg-blur.jpg')`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "absolute",
  zIndex: "9999",
  top: "0",
  left: "0",
  //   padding: "20px 0 0 0",
});
export const InnerBox = styled(Box)({
  backgroundColor: "#fff",
  width: "500px",
  padding: "20px",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  zIndex: "100",
  background: "rgba(255, 255, 255, 0.22)",
  borderRadius: "10px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 1)",
  "@media screen and (max-width:600px)": {
    width: "90%",
  },
});
export const Text = styled(Typography)({
  fontSize: "20px",
  color: "#231f20",
  fontWeight: "500",
  textAlign: "center",
  "@media screen and (max-width:600px)": {
   fontSize: "16px"
  },
});
export const OKbtn = styled(Button)({
  backgroundColor: "#d7282f",
  color: "#fff",
  border: "1px solid #d7282f",
  padding: "4px 16px",
  "&:hover": { backgroundColor: "#fff", color: "#d7282f" },
});
export const ErrorIcon = styled(ErrorOutlineOutlinedIcon)({
  fontSize: "80px",
  color: "#d7282f",
  "@media screen and (max-width:600px)": {
    width: "60px",
  },
});
export const Column = styled(Stack)({
  gap: "16px",
  alignItems: "center",
});
export default function DeniedPopup(props) {
  const { callBackFunction = null } = props;
  const handleClick = () => {
    if (callBackFunction) {
      callBackFunction();
      return;
    }
  };
  return (
    <>
      <OuterBox>
        <InnerBox>
          <Column>
            <ErrorIcon />
            <Text>
              You need alteast one published product <br /> to create catalog
            </Text>
            <OKbtn onClick={handleClick}>Ok</OKbtn>
          </Column>
        </InnerBox>
      </OuterBox>
    </>
  );
}
