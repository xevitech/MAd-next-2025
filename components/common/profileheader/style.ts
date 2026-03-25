import { styled } from "@mui/material";
export const ProfileHeaderText: any = styled("div")(
  ({ breakPoints }: any) => ({
    fontWeight: breakPoints?.max600px ? "600" : "700",
    lineHeight: breakPoints?.max600px ? "41px" : "36px",
    margin: breakPoints?.max600px
      ? "65px auto 0rem"
      : breakPoints?.max768px
      ? "5rem 0 1rem"
      : "5.5rem 0 1rem",
    fontSize: breakPoints?.max768px
      ? "18px"
      : breakPoints?.max1024px
      ? "25px"
      : "30px",
    backgroundColor: breakPoints?.max600px ? "#FFE9EA" : "transparent",
    textAlign: breakPoints?.max600px ? "center" : "left",
    borderRadius: "3px",
    width: breakPoints?.max600px ? "253px" : "auto",
    position: breakPoints?.max600px ? "relative" : "static",
    top: breakPoints?.max600px ? "-13px" : "0px",
    display: breakPoints?.max600px ? "block" : "flex",
    justifyContent: "space-between",
    color: "#000",

    "@media (max-width: 1368px)": {
    },
    "@media (max-width: 1200px)": {
      lineHeight: "35px",
    },
    "@media screen and (max-width:1280px)": {
      margin: "4.5rem 0 1rem",
    },
    "@media (max-width: 767px)": {
      lineHeight: "35px",
      fontSize: "16px",
      backgroundColor: "#FFE9EA",
      textAlign: "center",
      position: "relative",
      width: "253px",
      top: "-2px",
      display: "block",
      margin: "65px auto 10px",
    },
    "@media (max-width:480px)": {
      margin: "104px auto 10px",
    },
  })
);
