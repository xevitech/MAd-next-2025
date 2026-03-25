import { Box, Typography, styled } from "@mui/material";

export const CheckBoxStyle = {
  ".MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #c3c3c3",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      top: "11px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
  },
};
export const OuterContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  "& .BasicInfoContactDetail": {
    justifyContent: "space-between",
  },
});

export const ContentInnerContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    display: "flex",
    flexDirection: "column",
    background: "#FFFFFF",
    boxShadow: breakPoints?.max600px
      ? "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
      : "0px 12px 23px 0px rgb(112 112 112 / 4%)",
    borderRadius: "6px",
    padding: breakPoints?.max600px ? "10px" : "16px",
    fontFamily: "open sans",
    "@media screen and (max-width:600px)": {
      boxShadow:
        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    },
    "@media screen and (max-width:319px)": {},
    "& p": {
      margin: 0,
      "@media screen and (max-width:1600px)": {},
      wordBreak: "break-word",
    },
  })
);

export const ContainerHeader: any = styled(Box)(({ breakPoints }: any) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
  margin: 0,
  marginBottom: "16px",
  paddingBottom: "12px",
  "@media screen and (max-width: 1400px)": {},
  "@media screen and (max-width:320px)": {
    paddingRight: "0px",
  },
}));
export const ContainerHeaderText: any = styled("p")(({ breakPoints }: any) => ({
  fontWeight: 500,
  gap: "10px",
  fontSize: breakPoints?.max1920px ? "18px" : "16px",
  lineHeight: breakPoints?.max1920px ? "25px" : "22px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  fontFamily: "open sans",
  "@media screen and (max-width: 768px)": {
    fontSize: "14px",
  },
  "@media screen and (max-width: 480px)": {
    display: "block",
  },
}));

export const ContainerHeaderDescription: any = styled(Typography)(
  ({ breakPoints }: any) => ({
    fontWeight: 400,
    fontSize: breakPoints?.max1920px ? "14px" : "14px",
    lineHeight: "18px",
    display: "flex",
    alignItems: "center",
    // color: "#223354",
    // color: "#b7bdc7",
    color: "#4a4a4a",
    fontFamily: "open sans",
    // opacity: 0.5,

    paddingBottom: "0px",
    "@media screen and (max-width: 768px)": {
      fontSize: "13px",
      lineHeight: "normal",
      paddingTop: 0,
    },
  })
);

export const FloatingEditIcon: any = styled("span")(({ breakPoints }: any) => ({
  position: "absolute",
  right: "-0px",
  top: "0px", //12px
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  alignItems: "center",
  textAlign: "center",
  color: "#D7282F",
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  "@media screen and (max-width:320px)": {},
}));

export const PencilIcon = styled("div")({
  marginRight: "-5px",
  width: "13px",
  height: "13px",
  position: "relative",
});

export const FieldOuterContainer: any = styled("div")(
  ({ breakPoints, lastOne }: any) => ({
    display: "flex",
    flex: 1,
    minHeight: breakPoints?.max1920px ? "50px" : "40px",
    borderBottom: !lastOne && "1px solid rgba(34,51,84,0.1)",
    marginLeft: "0px",
    fontFamily: "open sans",
    alignItems: "center",
    "@media screen and (max-width: 480px)": {
      display: "block",
      padding: "8px 0px 8px 0px",
    },
  })
);

export const LabelContainer: any = styled(Box)(({ breakPoints }: any) => ({
  flex: 0.4,
  fontSize: "14px",
  display: "flex",
  fontWeight: 500,
  lineHeight: "138.9%",
  color: "#223354",
  alignItems: "center",
  height: "100%",
  opacity: "0.6",

  "@media screen and (max-width: 768px)": {
    fontSize: "12px",
    marginBottom: "6px",
  },
}));

export const LabelContainer1: any = styled("div")(({ breakPoints }: any) => ({
  flex: 0.4,
  fontSize: "14px",
  display: "flex",
  fontWeight: 500,
  lineHeight: "138.9%",
  color: "#223354",
  alignItems: "center",
  height: "100%",
  opacity: "0.6",
  alignSelf: "flex-start",
}));
export const FieldValueContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    flex: 0.6,
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: "10px",
    width: "-webkit-fill-available",
    wordBreak: "break-word",
    "@media screen and (max-width: 1600px)": {
      padding: "5px",
      wordBreak: "keep-all",
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "12px",
    },
    "& .toggleBtnContainer": {
      width: "100%",
    },
    "@media screen and (max-width:767px)": {
      justifyContent: "start",
      padding: "5px 0",
    },
    "@media screen and (max-width:480px)": {
      justifyContent: "flex-start",
    },
    "&.hideerroricon": {
      "&.MuiFormHelperText-root::before": {
        display: "none !important",
      },
    },
  })
);
export const AddCircle: any = styled("div")(({ breakPoints }: any) => ({
  position: "relative",
  margin: breakPoints?.max1440px ? "0px" : "0 9px 0 0",
}));

export const AddplusIcon = styled("div")({
  width: "13px",
  height: "13px",
  position: "relative",
  color: "#D7282F",
  top: "14px",
  right: "12px",
});

export const Addwarning = styled("div")({
  width: "13px",
  position: "relative",
  color: "#D7282F",
  top: "1px",
  right: "-6px",
});

export const ButtonArea = styled("div")({
  gap: "8px",
  display: "flex",
});

export const TypebusinessButton = styled("div")({
  "@media screen and (max-width: 1024px)": {
    paddingLeft: 0,
  },
});
export const TypographyBusiness = styled(Typography)({
  padding: "3px 12px!important",
  borderRadius: "0 !important",
  textTransform: "capitalize",
  "&::before": {
    content: '""',
    width: "5px",
    height: "5px",
    backgroundColor: "black",
    margin: "0 -8px 0",
    borderRadius: "50%",
    display: "inline-block",
    position: "relative",
    top: "-2px",
    left: "-2px",
    marginRight: "4px",
  },
});
export const CancelLink = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
    marginRight: "2px",
  },
  "&:hover": {
    opacity: ".7",
  },
});
export const SaveLink = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#231f20",
  cursor: "pointer",
  position: "relative",
  "&::before": {
    borderLeft: "1px solid #d2d2d2",
    content: '" "',
    position: "absolute",
    left: "0",
    height: "16px",
  },
  "& .MuiButtonBase-root": {
    textTransform: "none",
    padding: "0",
    borderRadius: "0",
    color: "#231f20",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
    marginRight: "2px",
    "@media screen and (max-width:320px)": {},
  },
  "&:hover": {
    opacity: ".7",
  },
});
