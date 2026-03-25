import { Box, Typography, styled } from "@mui/material";

export const DetailQuickSignPhoneField = styled(Box)(() => ({
  "& .MuiFormControl-root": {
    "& .MuiTypography-body1": {
      fontSize: "12px !important",
      fontWeight: "normal !important",
      color: "rgba(0, 0, 0, 0.87) !important",
      padding: "0 3px",
    },
  },
}));
export const HeaderBreadcrumb = styled(Box)(() => ({
  backgroundColor: "#F5F5F5",
  padding: "8px 10px",
  borderRadius: "6px",
  "& .MuiTypography-h6": {
    fontSize: "13px",
    color: "#000000",
    "& span": {
      fontWeight: "600",
    },
  },
}));

export const Container = styled(Box)(
  ({ padding, paddingX, paddingY }: any) => ({
    background: " #FFFFFF",
    boxShadow:
      " 0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
    borderRadius: " 6px",
    paddingLeft: paddingX,
    paddingRight: paddingX,
    paddingTop: paddingY,
    paddingBottom: paddingY,
    padding: "20px !important",
    "&.quicksignup": {
      boxShadow: "none",
    },
  })
);

export const FontContainer = styled(Typography)(
  ({
    color,
    fontSize,
    fontWeight,
    padding,
    textDecorationLine,
    background,
  }: any) => ({
    fontFamily: "Open Sans !important",
    wordWrap: "break-word",
    fontStyle: "normal",
    fontWeight: fontWeight ? fontWeight : "400px !important",
    fontSize: fontSize || "13px",
    color: color || "#6C6C6C",
    padding,
    textDecorationLine,
    background,
    display: "flex",
    justifyContent: "space-between",
    alignItem: "center",
  })
);
