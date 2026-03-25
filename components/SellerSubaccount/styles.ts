import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { styled } from "@mui/styles";

export const PreHeaderText: any = styled(Box)(({ breakPoints }: any) => ({
  fontFamily: "open sans !important",
  fontWeight: 700,
  lineHeight: "41px",
  marginBottom: "30px",
  display: breakPoints?.max600px ? "block" : "flex",
  color: "#231F20",
  backgroundColor: breakPoints?.max600px ? "#FFE9EA" : "transparent",
  borderRadius: "3px",
  width: breakPoints?.max600px ? "253px" : "auto",
  textAlign: breakPoints?.max600px ? "center" : "left",
  fontSize: breakPoints?.max768px
    ? "18px"
    : breakPoints?.max1024px
    ? "25px"
    : "30px",
  margin: breakPoints?.max600px ? "48px auto 0px" : "64px auto 10px",
}));

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
    fontStyle: "normal",
    fontWeight: fontWeight || "600 !important",
    fontSize: fontSize || "12px",
    color: color || "#231F20",
    padding,
    textDecorationLine,
    background,
  })
);
export const swipebarStyling = {
  "& .MuiPaper-root": {
    width: "500px",
    "@media screen and (max-width: 600px)": {
      width: "90%",
    },
  },
};

/********************** New css component after makestyle *********************/
export const GridTableContainer = styled(Grid)({
  display: "block !important",
});

export const BoxSellerList = styled(Box)({
  marginBottom: "10px",
  display: "flex",
  gap: 10,
  alignItems: "center",
  "@media screen and (max-width:1500px)": {
    alignItems: "flex-start",
    flexDirection: "column-reverse",
    padding: "1rem 0 0",
  },
});

export const BoxSeller = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "@media screen and (max-width: 1024px)": {
    flexDirection: "column",
    alignItems: "start",
  },
  "& hr": {
    height: "20px",
  },
  "@media screen and (max-width: 768px)": {
    display: "block",
  },
});

export const CardFlapover = styled(Card)({
  "& .MuiButtonBase-root": {
    padding: "4px 0",
    "& svg": {
      fontSize: "16px",
    },
  },
  "& .Mui-checked": {
    color: "#d7282f",
  },
  "@media screen and (max-width: 768px)": {
    width: "100% !important",
  },
});
export const SubSellerRowItem = styled(Box)({
  "& .MuiFormControlLabel-root": {
    margin: "0 20px 0 0",
    gap: "6px",
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
  },
});
export const SellerFormLabel = styled(Box)({
  fontSize: "14px",
  fontWeight: 600,
  margin: "0 0 8px",
});
export const BorderRow = styled(Box)({
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "6px",
  padding: "9px",
  position: "relative",
  "&:hover": {
    border: "1px solid rgba(0, 0, 0, 0.87)",
  },
});
export const AcconyTypeWrapper = styled(Box)({
  "& .MuiTypography-body1": {
    fontSize: "12px",
  },
});
export const NameIconBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  position: "relative",
});
export const AbsoluteBox = styled(Box)({
  backgroundColor: "#fff",
  overflow: "auto",
  transition: "height 0.3s ease-in-out",
  position: "absolute",
  top: "35px",
  width: "100%",
  zIndex: "10",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  borderRadius: "6px",
});
export const AbsoluteInnerBox = styled(Box)({
  width: "96%",
  margin: "0 auto",
});
export const AbsoluteErrorBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#d7282f",
  bottom: "-10px",
  position: "absolute",
});
export const MyCardContent = styled(Box)({
  padding: "10px 20px",
  maxHeight: "700px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#acabab",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#6d6d6d",
  },
});

export const SearchWithCraete = styled(Box)({
  display: "flex",
  alignItems: "center",
  paddingBottom: "15px",
  "@media screen and (max-width:500px)": {
    display: "block",
    marginTop: "10px",
  },
});

export const SellerSearchCommon = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "250px",
  margin: "6px 0px 2px",
  "& .MuiInputBase-input": {
    paddingTop: "8px",
    paddingBottom: "8px",
    transition: "all 2s ease-in",
  },
  "& button": {
    padding: "0",
    margin: "3px 0px 3px -5px",
  },
  "& svg": {
    color: "#515151",
    fontSize: "19px",
  },
  "& fieldset": {
    borderRadius: "5px",
  },
}));

/**************************Account Type******************************/
export const SwitchAction = styled(Box)({
  "& .MuiSwitch-root": {
    width: "53px",
    height: "35px",
    "& .Mui-checked+.MuiSwitch-track": {
      backgroundColor: "#d7282f",
    },
    "& .MuiSwitch-thumb": {
      width: "16px",
      height: "16px",
    },
  },
});
export const SelectedAction = styled(Box)({
  display: "flex",
  gap: "10px",
});

/*****============= Start Seller Sub account Detail styling ==========******/

export const DrawerWidthContainer = styled(Box)({
  width: "1100px",
  "@media screen and (max-width: 900px)": {
    width: "90%",
  },
});
export const DrawerContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  borderRadius: "12px",
  padding: "20px",
  "& .ScrolldrawerBox": {
    height: "76vh",
    overflowY: "auto",margin:'0 0 10px 0',padding:'0 0 10px 0',
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },
  },
});

export const DrawerHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const DrawerProfileInfo = styled(Box)({
  display: "flex",
  gap: "18px",
  alignItems: "center",
});

export const SSAAvtarInfo = styled(Box)({
  "& .MuiTypography-root": {
    color: "#000",
  },
  "& .MuiTypography-h6": {
    fontWeight: 700,
  },
  "& .MuiTypography-subtitle1": {
    fontSize: "14px",
  },
});

export const SSAPersonalInfo = styled(Box)({
  margin: "0 0 5px",
  fontWeight: 600,
  fontSize: "14px",
  "& .MuiTypography-body2": {
    color: "#484848",
    fontSize: "14px",
  },
  "& .MuiSwitch-root": {
    margin: "0 7px 0 5px",
    "& .MuiFormControlLabel-label": {
      fontSize: "15px",
    },
  },
});

export const LabelTtext = styled(Typography)({
  fontWeight: 600,
  fontSize: "15px",
  "& .MuiTypography-body2": {
    color: "#484848",
  },
});

export const CardBoxContent = styled(Box)({
  display: "flex",
  gap: "1rem",
});

export const DrawerInfoCard = styled(Card)({
  flex: 1,
  boxShadow: "none",
  height: "100%",
  // background: "#EBF1FE",
  border: "1px solid #AFAFAF",
  borderRadius: "4px",
  filter: " drop-shadow(0.4rem 0.4rem 0.45rem rgba(0, 0, 0, 0.15))",
  "& .MuiCardContent-root": {
    padding: 0,
    background: "#EBF1FE",
    "& .MuiTypography-subtitle1": {
      color: "#231F20",
      textAlign: "center",
      borderBottom: "1px solid #B3B3B3",
      padding: "6px 0",
      fontWeight: "600",
    },
  },
});
export const CardInnerCode = styled(Box)({
  padding: "12px",
});
export const BoxFlex = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  margin: "0 0 10px",
  "& .MuiTypography-root": {
    fontSize: "14px",
    color: "#231F20",
    display: "flex",
  },
  "& .MuiTypography-body1": {
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    "& i": {
      margin: "0 5px 0 0",
      "&::before": {
        color: "#d7282f",
      },
    },
    "& img": {
      margin: "0 5px 0 0",
      width: "16px",
    },
  },
  "& .MuiTypography-body2": {
    whiteSpace: "nowrap",
    width: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    textAlign: "right",
  },
});
export const ColorNox = styled(Box)({
  background: "#FFBFC2D9",
  color: "#000",
  fontSize: "12px",
  width: "30px",
  height: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50px",
  margin: "-10px 0 0",
});
export const DrawerNotesSection = styled(Box)({
  marginTop: "1rem",
  padding: "1rem",
  background: "#EBF1FE",
  border: "1px solid #AFAFAF",
  borderRadius: "4px",
  "& .MuiTypography-subtitle1": {
    color: "#231F20",
    textAlign: "center",
    padding: "6px 0",
    fontSize: "14px",
    "& span": {
      fontWeight: "600",
      fontSize: "16px",
    },
  },
});

export const FeedbackBox = styled(Box)({
  background: "#fff",
  display: "flex",
  alignItems: "center",
  border: "1px solid #656565",
  borderRadius: "4px",
  padding: "0 10px",
  margin: "1rem 0 0",
  "& fieldset": {
    border: "none",
  },
  "& button": {
    background: "#d7282f",
    color: "#fff",
    textTransform: "capitalize",
    "&:hover": {
      background: "#c31f26",
      color: "#fff",
    },
  },
});
export const FeedbackInfo = styled(Box)({
  "& svg": {
    color: "#d7282f",
    fontSize: "16px",
  },
});
export const CrossButton = styled(Button)({
  position: "absolute",
  left: "-24px",
  background: "#fff",
  minWidth: "10px",
  color: "#d7282f",
  borderRadius: "4px 0 0 4px",
  padding: 0,
  "&:hover": {
    background: "#fff",
    color: "#d7282f",
  },
});
