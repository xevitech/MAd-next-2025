import { Button, styled, ToggleButton } from "@mui/material";
import { makeStyles } from "tss-react/mui";

/**** responsive css ****/
export const useStyles = makeStyles()((theme) => {
  return {
    "@media screen and (max-width: 768px)": {},
  };
});

export const BtnOutlined: any = styled(Button)(
  ({ width, height, borderRadius, colour, background, border }: any) => ({
    fontFamily: "open sans",
    background: background || "transparent",
    height: height || "40px",
    border: border || "1px solid #D7282F",
    borderRadius: borderRadius || "6px",
    textTransform: "none",
    minWidth: !width && "90px",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "24px",
    width: width || "auto",
    letterSpacing: "0.09px",
    color: colour || "#D7282F",
    "&:hover": {
      background: "transparent",
    },
  })
);

export const BtnFilled: any = styled(Button)(
  ({ width, height, background, colour, borderRadius }: any) => ({
    fontFamily: "open sans",
    background: background || "#D7282F",
    opacity: "85%",
    height: height || "40px",
    border: `1px solid ${background || "#D7282F"}`,
    borderRadius: borderRadius || "6px",
    textTransform: "none",
    minWidth: "90px",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "24px",
    width: width || "auto",
    letterSpacing: "0.09px",
    color: colour || "white",
    "&:hover": {
      background: background || "#D7282F",
    },
    "&.disableBTN": {
      background: "rgba(0, 0, 0, 0.12)",
      color: "rgba(0, 0, 0, 0.26)",
      border: "rgba(0, 0, 0, 0.12)",
      cursor:'not-allowed',
      pointerEvents:"none !important"
    },
  })
);
export const RedToggleBtnFilled: any = styled(ToggleButton)(
  ({ width, height, background, colour }: any) => ({
    fontFamily: "open sans",
    background: background || "#D7282F",
    height: height || "40px",
    border: `1px solid ${background || "#D7282F"}`,
    borderRadius: "4px",
    textTransform: "none",
    minWidth: "90px",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "24px",
    width: width || "auto",
    letterSpacing: "0.09px",
    color: colour || "white",
    "&:hover": {
      background: background || "#D7282F",
    },
  })
);

/* Outline button styled component */
export const Blackoutlinebtn: any = styled(Button)(
  ({ width, height, background, colour, borderRadius }: any) => ({
    fontFamily: "open sans",
    background: background || "transparent",
    opacity: "85%",
    height: height || "36px",
    border: `1px solid ${background || "#231F20"}`,
    borderRadius: borderRadius || "6px",
    textTransform: "none",
    minWidth: "90px",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "24px",
    width: width || "auto",
    letterSpacing: "0.09px",
    color: colour || "#231F20",
    "&:hover": {
      background: background || "#231F20",
      color: colour || "#fff",
      border: `1px solid ${background || "#231F20"}`,
    },
    "@media screen and (max-width: 1600px)": {
      minWidth: "65px",
      fontSize: "13px",
    },
    "@media screen and (max-width: 768px)": {
      minWidth: "57px",
      fontSize: "13px",
    },
  })
);

/* Outline button styled component */
export const Redoutlinebtn: any = styled(Button)(
  ({ width, height, background, colour, borderRadius }: any) => ({
    fontFamily: "open sans",
    background: background || "transparent",
    opacity: "85%",
    height: height || "36px",
    border: `1px solid ${background || "#D7282F"}`,
    borderRadius: borderRadius || "6px",
    textTransform: "none",
    minWidth: "90px",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "24px",
    width: width || "auto",
    letterSpacing: "0.09px",
    color: colour || "#D7282F",
    "&:hover": {
      background: background || "#D7282F",
      color: colour || "#fff",
      border: `1px solid ${background || "#D7282F"}`,
      "& div": {
        "& svg": {
          fill: "white",
        },
      },
    },
    "@media screen and (max-width: 1600px)": {
      minWidth: "65px",
      fontSize: "13px",
    },
    "@media screen and (max-width: 768px)": {
      minWidth: "57px",
      marginBottom: "10px",
    },
  })
);

export const ProductFilled: any = styled(Button)(
  ({ width, height, background, borderRadius }: any) => ({
    background: "#231F20 !important",
    opacity: "85%",
    height: height || "40px",
    border: `1px solid ${background || "#D7282F"}`,
    borderRadius: borderRadius || "6px",
    textTransform: "none",
    minWidth: "90px",
    fontWeight: 600,
    fontSize: "14px",
    width: width || "auto",
    color: "#fff !important",
    padding: "0 16px",

    "&:hover": {
      background: background || "#D7282F",
    },
  })
);
