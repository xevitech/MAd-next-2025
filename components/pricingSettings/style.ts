import { Box, Button, Chip, InputLabel, Switch, Typography, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
export const PricingContainer = styled("div")({
  background: "#F6F8FB",
  width: "100%",
  paddingTop: 1,
});

export const UpButton = styled(Button)({
  backgroundColor: "#D7282F",
  color: "#FFFFFF",
  marginTop: 21,
  textTransform: "capitalize",
});

export const ValueTitle = styled(Typography)({
  width: 100,
  height: 18,
  color: "#000000",
  fontSize: 13,
  fontWeight: 600,
  margin: "0 0 5px",
});
export const ValueTitle2 = styled(Typography)({
  width: 174,
  height: 20,
  fontSize: "15px",
  marginTop: 20,
  marginBottom: 10,
  fontWeight: 600,
  color: "#0D0D0D",
});

export const BoxCoulmn = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  "@media screen and (max-width:600px)": {
    display: "block",
  },
});

export const TextfieldStyling = {
  "& .MuiOutlinedInput-notchedOutline": {
    fontSize: "15px",
  },
  "& .MuiInputLabel-root": {
    top: "2px !important",
  },
  width: "100%",
  "@media screen and (max-width:600px)": {
    width: "100%",
    margin: "0px 0 0px",
  },
};

export const BoxContainer = styled(Box)({
  minHeight: 730,
  padding: "2px 16px 16px",
  background: "#FFFFFF",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
  borderRadius: "6px",
  marginBottom: "50px",
  "@media screen and (max-width:600px)": {
    minHeight: 300,
    width: "95%",
    margin: "0 auto",
  },
});

export const Tabstyling = {
  color: "#000",
  textTransform: "capitalize",
  fontSize: "16px",
  fontWeight: "600",
  "&.Mui-selected": {
    color: "#D7282F",
  },
};

export const TabListStyle = {
  padding: "0",
};

export const TabPanelStyle = {
  padding: "24px 0",
};

export const BoxHeader = styled(Box)({
  color: "#231F20",
  fontSize: 30,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
});

export const BoxRuleInner = styled(Box)({
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
export const SelectCondition = styled(InputLabel)({
  color: "#000",
  fontSize: "12px",
  margin: "0px 0 0",
});

export const SelectConditionBox = styled(Box)({
  "@media screen and (max-width:600px)": {
    marginTop: "10px",
  },
});

export const menuList = {
  fontSize: "12px",
  color: "#000",
};

export const BoxRuletext = styled(Box)({
  position: "relative",
  borderBottom: "1px dashed #d2d2d2",
  margin: "20px 0 10px",
});
export const PlusIcon = styled(AddIcon)({
  color: "#D7282F",
  fontSize: "18px",
  float: "left",
  margin: "-4px 2px -4px 0",
});

export const IconClose = styled(CloseIcon)({
  border: "1px solid #ddd",
  borderRadius: "4px",
  color: " #333333",
  cursor: "pointer",
  width: "36px",
  height: "36px",
  padding: "7px",
  "@media screen and (max-width:600px)": {

  },
});

export const RuleBox = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  "@media screen and (max-width:600px)": {
    display: "block",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const RuleBox2 = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  "@media screen and (max-width:600px)": {
    display: "block",
  },
});
export const ChipBox = styled(Box)({});
export const DatePickerBox = styled(Box)({

  "@media screen and (max-width:600px)": {
    marginTop: "10px",
  },
});

export const ChipStyle = styled(Chip)({
  color: "#fff",
  marginTop: "8px",
  borderRadius: "4px",
  background: "#7D7C7C",
  width: "90px",
  height: "28px",
});

export const SelectPricingfield = {
  width: "30%",
  "@media screen and (max-width:600px)": {
    width: "90%",
    margin: "0 0 10px",
  },
};

export const LargeContainer = styled(Typography)({
  fontFamily: "open sans",
  fontSize: "16px",
  fontWeight: "600",
  color: "#A44044",
});

export const SmallContainer = styled(Typography)({
  fontFamily: "open sans",
  fontSize: "12px",
  fontWeight: "400",
});


export const Android12Switch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  margin:"0 0 0 10px",
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#d7282f",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    background: "#fff",
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));


/********** Discount Level components *********/
export const ContainerBox = styled(Box)({
  background: "#F9F9F9",
  border: "1px solid #DDDDDD",
  width: "100%",
  height: 100,
  borderRadius: 10,
  padding: "12px 16px 16px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  "@media screen and (max-width:600px)": {
    display: "block",
    height: "auto",
  },
});

export const BoxColumn = styled(Box)({
  width: "33%",
  "@media screen and (max-width:600px)": {
    width: "100%",
  },
});

export const FormControlStyle = {
  width: "100%",
  background: "#FFFFFF",
};
export const BoxDiscountLevel = styled(Box)({
  background: "#FFFFFF",
  width: "100%",
  boxShadow: "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: 6,
  padding: "10px 16px 16px",
  border: "1px solid #DDDDDD",
});
export const InfoData = styled(Box)({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  marginTop: 50,
  width: "100%",
});

export const TypographyNoDiscount = styled(Typography)({
  color: "#393939",
  fontSize: 26,
  marginBottom: 3,
  fontWeight: "700",
});

export const TypographyContent = styled(Typography)({
  height: 25,
  fontSize: 17,
  color: "#404040",
  fontWeight: 400,
});

export const TypographyContent2 = styled(Typography)({
  fontWeight: 600,
  fontSize: 16,
  color: "#404040",
});

export const CrosIccon = styled(CloseIcon)({
  border: "1px solid #ddd",
  borderRadius: "4px",
  color: " #333333",
  cursor: "pointer",
  width: "30px",
  height: "30px",
  padding: "4px 0",
  "@media screen and (max-width:600px)": {
    marginTop: "10px",
  },
});

export const BoxSetBox: any = styled('div')({
  width: "33%",
  "@media screen and (max-width:600px)": {
    width: "100%",
  },
});

export const BoxFormedInquiry = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "end",
  "@media screen and (max-width:600px)": {
    width: "100%",
    display: "block",
  },

});