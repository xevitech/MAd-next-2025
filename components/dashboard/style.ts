import { styled, Typography, Button, Divider } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
export const Card = styled("div")({
  background: "#FFFFFF",
  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.075)",
  borderRadius: "6px",
  gap: "20px",
  height: "100%",
  "& .dashboardcontentt": {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingBottom: "16px",
    height: "100%",
  },
  "& .CompletedText":{
    fontSize:'15px',
    color:'#231f20',
    fontWeight:'400'
  },
  "& .CompletedSpan":{
    fontSize:'15px',
    color:'#d7282f',
    fontWeight:'700',
    cursor:'pointer'
  },
});

export const ProductCard = styled("div")({
  background: "#FFFFFF",
  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.075)",
  borderRadius: "6px",
  gap: "20px",
});

export const CardCoulmn = styled("div")({
  background: "#FFFFFF",
  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.075)",
  borderRadius: "6px",
  minHeight: "145px",
});

export const CardBox = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "15px",
});
export const Box = styled("div")({
  padding: "50px",
});

export const Cellbtn = styled("button")({
  textTransform: "capitalize",
  padding: "5px 10px",
  borderRadius: "6px",
});

export const Emptybox = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  height: "240px",
  alignSelf: "center",
  alignItems: "center",
});

export const Imgcom = styled("div")({
  margin: "5px",
});

export const EmptyPageOuter = styled("div")({
  padding: "50px",
});

export const TypographyBorderline: any = styled(Typography)({
  position: "absolute",
  bottom: 0,
  height: 1,
  width: "90px",
  background: "red",
});

export const WelcomeModalOuter: any = styled(Box)({
  position: "absolute",
  top: 10,
  right: 10,
  padding: 0,
});

export const CirculerBox: any = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: 0,
  "@media screen and (max-width:767px)": {
    display: "block",
  },
});

export const PlansCardOuterBox: any = styled(Box)({
  position: "fixed",
  right: "0px",
  top: "100px",
  backgroundColor: "#fff",
  padding: "12px",
  boxShadow: "0px 2px 4px 3px rgba(0, 0, 0, 0.075)",
  // zIndex: "1",
  zIndex: "999",
  borderRadius: "4px",
  "@media screen and (max-width:767px)": {
    width: "350px",
  },
  "@media screen and (max-width:480px)": {
    width: "250px",
  },
});
export const PlansCardCrossbtn: any = styled(Box)({
  position: "absolute",
  left: "-18px",
  top: "6px",
  backgroundColor: "#fff",
  filter: "drop-shadow(-1px 0px 1px rgba(0, 0, 0, 0.09))",
  zIndex: "-1",
  height: "20px",
  padding: "0px",
  borderRadius: "3px",
});
export const Closeicon: any = styled(CloseOutlinedIcon)({
  color: "#d7282f",
  cursor: "pointer",
  height: "20px",
  width: "20px",
});
export const LeftArrow: any = styled(KeyboardArrowLeftOutlinedIcon)({
  color: "#d7282f",
  cursor: "pointer",
  fontSize: "22px",
});
export const InnerBox: any = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "14px",
  margin: "0 0 12px 0px",
  padding: "0px",
  "@media screen and (max-width:600px)": {
    display: "grid",
    gap: "5px"
  },
});
export const InnerBoxText: any = styled(Typography)({
  fontSize: "16px",
  fontWeight: "500",
  color: "#3BB900",
  display: "flex",
  alignItems: "center",
  "@media screen and (max-width:767px)": { fontSize: "14px" },
});
export const Planicon: any = styled("img")({
  width: "70px",
  margin: "0px 0px 0px 4px",
});
export const StartDate: any = styled(Typography)({
  fontSize: "13px",
  fontWeight: "400",
  color: "#4a4a4a",
});
export const FlexBox: any = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0px",
});
export const DaysLeft: any = styled(Typography)({
  fontSize: "16px",
  fontWeight: "500",
  color: "#d7282f",
  "@media screen and (max-width:767px)": { fontSize: "14px" },
});
export const EndDate: any = styled(Typography)({
  fontSize: "13px",
  fontWeight: "400",
  color: "#4a4a4a",
});
export const ButtonBox: any = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin: "12px 0 0 0",
  padding: "0px",
});
export const UpgradeButton: any = styled(Button)({
  border: "1px solid #d7282f",
  color: "#d7282f",
  fontSize: "13px",
  textTransform: "none",
  padding: "4px 8px",
  transition: "all ease .3s",
  "&:hover": {
    backgroundColor: "#d7282f",
    border: "1px solid #d7282f",
    color: "#fff",
    transition: "all ease .3s",
  },
});
export const DividerForSmall: any = styled(Divider)({
  display: "none",
  "@media screen and (max-width:600px)": {
    display: "block"
  },
});

