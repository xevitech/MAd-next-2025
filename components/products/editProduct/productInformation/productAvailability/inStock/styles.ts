import { Box, styled } from "@mui/material";

import { makeStyles } from "tss-react/mui";

export const useStyles: any = makeStyles()((theme) => {
  return {
    customTextField: {
      "& input::placeholder": {
        fontSize: "13px",
      },
    },
    customInputFieldsProduct: {
      "& input::placeholder": {
        fontSize: "13px",
        fontWeight: "bold",
      },
    },
    buttonGroup: {
      display: "flex",
      gap: "10px !important",
      marginTop: "12px !important",
      flexWrap: "wrap",
    },
    condition_btn: {
      "& button": {
        background: "#ffffff",
        border: "1px solid #979797",
        color: "#dd484e",
        fontWeight: "400",
      },
      "& .style_pink_btn__4Pu4S": {
        background: "#ffffff",
        padding: "0",
        cursor: "default",
        "&:before": {
          content: '""',
          display: "inline-block",
          width: "14px",
          height: "14px",
          background: "url(/assets/error-outline-red.svg) no-repeat",
          backgroundSize: "100%",
          marginRight: "4px",
          position: "relative",
          top: "-1px",
        },
      },
    },

    customToggleButton: {
      border: "1px solid rgba(0, 0, 0, 0.12) !important",
      borderLeft: "1px solid rgba(0, 0, 0, 0.12) !important",
      textTransform: "none",
      // height: "28px",
      minWidth: "90px",
      maxHeight: "40px",
      // border: 1px solid #979797;
      borderRadius: "4px !important",
      fontWeight: "500 !important",
      fontSize: "14px !important",
      lineHeight: "24px !important",
      fontFamily: "open sans !important",
      /* identical to box height, or 171% */
      // opacity: "0.9 !important",
      letterSpacing: "0.09px",
      color: "black !important",
      paddingLeft: "6px !important",
      paddingRight: "6px !important",
    },

    customToggleButtonSelected: {
      border: "1px solid rgba(0, 0, 0, 0.12) !important",
      borderLeft: "1px solid rgba(0, 0, 0, 0.12) !important",
      textTransform: "none",
      // height: "28px",
      minWidth: "90px",
      maxHeight: "40px",
      borderRadius: "4px !important",
      fontWeight: "500 !important",
      fontSize: "14px !important",
      lineHeight: "24px !important",
      fontFamily: "open sans !important",
      /* identical to box height, or 171% */
      // opacity: "0.9 !important",
      letterSpacing: "0.09px",
      backgroundColor: "#DD484E !important",
      color: "white !important",
      paddingLeft: "6px !important",
      paddingRight: "6px !important",
      // fontWeight:"bold !important"
    },

    pricingTypeCustomToggleButton: {
      fontWeight: "400 !important",
      fontSize: "14px !important",
      lineHeight: "24px !important",
      letterSpacing: "0.09px !important",
      height: "28px !important",
      border: "1px solid #979797 !important",
      borderRadius: "4px !important",
      padding: "2px 12px !important",
      color: "#000000 !important",
      "@media screen and (max-width:320px)": {
        fontSize: "10px !important",
        padding: "2px 10px !important",
      },
    },

    pricingTypeCustomToggleButtonSelected: {
      height: "28px !important",
      background: "#34A853 !important",
      border: "1px solid #A4A4A4 !important",
      borderRadius: "4px !important",
      fontWeight: 600,
      fontSize: "14px !important",
      lineHeight: "24px !important",
      letterSpacing: "0.09px !important",
      color: "#FFFFFF !important",
      padding: "2px 12px !important",
      "@media screen and (max-width:320px)": {
        fontSize: "10px !important",
        padding: "2px 10px !important",
      },
    },

    customScrollClass: {
      "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        borderRadius: "6px",
      },
    },
  };
});

export const ContentDescription = styled("div")({
  width: "100%",
  paddingTop: "12px",
  paddingBottom: "4px",
});

export const ContentDescriptionHeader = styled("div")({
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  color: "#000000",
});

export const ContentDescriptionText = styled(Box)({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "24px",
  /* identical to box height, or 200% */
  letterSpacing: "0.09px",
  color: "#414141",
});
