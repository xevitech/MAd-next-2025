import { Box, styled, Typography } from "@mui/material";
export const ProductContentContainer = styled("div")({
  // padding: "16px",
  width: "100%",
  background: "#ffff",
  // marginTop: "16px",
  // boxShadow:
  //   "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  alignItems: "center",
  flexDirection: "column",
});

export const TabsContainer = styled("div")({
  width: "100%",
  "& .MuiTabs-root": {
    width: "100%",
  },
});
export const AttributeListSection = styled("div")({
  borderBottom: "1px solid #dddddd",
  margin: "2rem 0 0",
  padding: "0px 0 10px",
});
export const AttributeListInn = styled("div")({
  width: "80%",
  "@media screen and (max-width:1500px)": {
    width: "100%",
  },
});

export const UnitText = styled("div")({
  display: "flex",
  alignItems: "center",
  // height: "100%",
  padding:"5px 0 0"
});

export const AttributLabel = styled(Typography)({
  color: "#231F20",
  fontSize: "14px",
  fontWeight: 600,
  padding: "5px 0 0",
  textTransform: "capitalize",
  // "@media screen and (max-width:1550px)": {
  //   fontSize: "13px",
  // },
});
export const AttributeToggle = styled(Box)({
  "& .Mui-selected": {
    background: "#d7282f !important",
    color: "#fff !Important",
  },
  "& .MuiButtonBase-root": {
    height: "24px",
    fontSize: "11px",
    padding: "7px 10px",
    textTransform: "capitalize",
    "&:hover": {
      color: "#656565",
    },
  },
  "& .Mui-checked": {
    color: "#d7282f !important",
  },
});
export const AttributesAplication = styled(Box)({
  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#231F20",
    fontWeight: 600,
  },
  "& .MuiCheckbox-root": {
    padding: "9px 5px 9px 9px",
    "& svg": {
      fontSize: "18px",
    },
  },
  "& .Mui-checked": {
    color: "#d7282f !important",
  },
});
export const AttributeDatepicker = styled(Box)({
  "& .MuiFormControl-root": {
    width: "100%",
  },
});
export const SectionOperatingVoltage = styled(Box)({
  "& .Mui-checked": {
    color: "#d7282f !important",
  },

  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#231F20",
    fontWeight: 600,
  },
  "& .MuiRadio-root": {
    padding: "9px 5px 9px 9px",
    "& svg": {
      fontSize: "18px",
    },
  },
});

export const ForMiddleSpace = styled(Box)({
  margin: "0 0 15px",
});
