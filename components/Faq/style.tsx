import {
  Typography,
  Box,
  ButtonBase,
  Tab,
  Accordion,
  AccordionSummary,
  styled,
} from "@mui/material";

export const Overlay = styled(Box)(() => ({
  display: "inline-block",
  transition: "0.3s",
  width: "100%",
  "&::after": {
    content: '""',
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    transition: "0.3s",
    opacity: "0",
  },
  "&:hover": {
    "&::after": {
      opacity: "1",
    },
  },
}));

export const Bgimage = styled(Box)(() => ({
  backgroundImage: `url('/assets/banners/commonbanner.png')`,
  height: "40vh",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  position: "relative",
  width: "100%",
  "&:before": {
    content: '" "',
    width: "100%",
    height: "100%",
    backgroundColor:'rgba(0,0,0,.66)',
    position: "absolute",
  },
}));

export const Textoverimg1 = styled(Typography)(() => ({
  fontSize: "40px  ",
  fontWeight: "700",
  color: "#FFFFFF",
  "@media only screen and (max-width: 900px)": {
    fontSize: "30px",
  },
  "@media only screen and (max-width: 600px)": {
    fontSize: "20px",
  },
  "@media only screen and (max-width: 340px)": {
    fontSize: "18px",
  },
}));

export const Textoverimg2 = styled(Typography)(() => ({
  fontSize: "20px  ",
  fontWeight: "600",
  color: "#FFFFFF",
  "@media only screen and (max-width: 600px)": {
    fontSize: "16px  ",
    fontWeight: "400",
  },
}));

export const CustomeTab = styled(Tab)(() => ({
  minHeight: "22px",
  fontWeight: "600 !important",
  marginTop: "5px",
  textTransform: "none",
  whiteSpace: "unset",
  margin: "5px",
  color: "#231F20",
  border: "1px solid #ECECEC",
  borderRadius: "50px",
  transition: ".5s",
  display: "flex",
  alignItems: "flex-start",
  "@media screen and (max-width:900px)": {
    width: "auto",
  },
  "&.Mui-selected": {
    background: "#D7282F",
    borderRadius: "50px",
    color: "#ffff",
    transition: ".5s",
    "@media screen and (max-width:400px)": {
      fontWeight: "500 !important",
      
    },
  },
  "&:hover": {
    backgroundColor: "#D7282F",
    color: "#fff",
    transition: ".5s",
  },
}));

export const BannerTxt = styled(Box)(() => ({
  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}));

export const Heading = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#d7282f",
  "@media screen and (max-width:1200px)": {
    fontSize: "28px",
    fontWeight: "600",
  },
  "@media screen and (max-width:900px)": {
    fontSize: "27px",
    fontWeight: "500",
  },
  "@media screen and (max-width:630px)": {
    fontSize: "20px",
    fontWeight: "500",
  },
  "@media screen and (max-width:767px)": {
    fontSize: "18px",
    fontWeight: "500",
  },
  "@media screen and (max-width:434px)": {
    fontSize: "14px",
    fontWeight: "500",
  },
}));
export const SubHeading = styled(Typography)(() => ({
  fontSize: "35px",
  fontWeight: "600",
  color: "#4a4a4a",
  "@media screen and (max-width:1100px)": {
    fontSize: "25px",
    fontWeight: "600",
  },
  "@media screen and (max-width:1400px)": {
    fontSize: "30px",
    fontWeight: "600",
  },
  "@media screen and (max-width:1200px)": {
    fontSize: "28px",
    fontWeight: "600",
  },
  "@media screen and (max-width:970px)": {
    fontSize: "27px",
    fontWeight: "500",
  },
  "@media screen and (max-width:630px)": {
    fontSize: "20px",
    fontWeight: "500",
  },
  "@media screen and (max-width:767px)": {
    fontSize: "18px",
    fontWeight: "500",
  },
  "@media screen and (max-width:434px)": {
    fontSize: "14px",
    fontWeight: "500",
  },
  "@media screen and (max-width:376px)": {
    fontSize: "14px",
    fontWeight: "500",
  },
}));
export const Faqheading = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: "700",
  color: "#D7282F",
  paddingBottom: "10px",
  borderBottom: "1px solid rgba(34, 51, 84, .2)",
  "@media screen and (max-width:1100px)": {
    fontSize: "25px",
    fontWeight: "600",
  },
  "@media screen and (max-width:970px)": {
    fontSize: "27px",
    fontWeight: "500",
  },
  "@media screen and (max-width:1200px)": {
    fontSize: "27px",
    fontWeight: "600",
  },
  "@media screen and (max-width:1400px)": {
    fontSize: "30px",
    fontWeight: "600",
  },
  "@media screen and (max-width:630px)": {
    fontSize: "20px",
    fontWeight: "500",
  },
  "@media screen and (max-width:767px)": {
    fontSize: "20px",
    fontWeight: "500",
  },
  "@media screen and (max-width:434px)": {
    fontSize: "14px",
    fontWeight: "500",
  },

}));
export const Questions = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#231F20",
  "@media screen and (max-width:434px)": {
    fontSize: "14px",
    fontWeight: "500",
  },
}));
export const Answer = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: "400",
  color: "#4A4A4A",
}));
export const A_answer = styled("span")(() => ({
  fontSize: "14px",
  fontWeight: "600",
  color: "#231F20",
}));

export const Imagenone = styled("img")(() => ({
  height: "300px",
  "@media screen and (max-width:900px)": {
    display: "none",
  },
}));
export const SearchButton = styled(ButtonBase)(() => ({
  background: "linear-gradient(90deg, #D7282F 0%, #FA4B52 100%)",
  padding: "16px 28px",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  "@media screen and (max-width:600px)": {
    padding: "16px 12px",
  },
  "@media screen and (max-width:888px)": {
    padding: "16px 20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  "@media screen and (max-width:400px)": {
    fontSize: "13px",
    fontWeight: "600",
    padding: "14px 16px",
  },
}));
export const Headingsubheadingbox = styled(Box)(() => ({
  marginTop: "50px",
}));
export const Outerbox = styled(Box)(() => ({
  border: "1px solid transparent",
  backgroundColor: "#fff",
  borderRadius: "30px",
  marginTop: "20px",
}));
export const Innerbox = styled(Box)(() => ({
  border: "1px solid #DADADA",
  borderRadius: "30px",
  padding: "8px",
}));
export const TabBox = styled(Box)(() => ({
  flexGrow: 1,
  bgcolor: "background.paper",
}));

export const Tabinnerbox = styled(Box)(() => ({
  border: "1px solid #DADADA",
  borderRadius: "30px",
  padding: "25px",
}));
export const ImageBox = styled(Box)(() => ({
  position: "relative",
}));
export const Textoverimg3 = styled(Typography)(() => ({
  fontSize: "20px  ",
  fontWeight: "600",
  color: "#000",
  backgroundColor: "#fff",
  opacity: ".85",
  padding: "10px 18px",
  borderRadius: "25px",
  "@media only screen and (max-width: 600px)": {
    fontSize: "12px  ",
    fontWeight: "400",
    padding: "10px 12px",
  },
  "@media only screen and (max-width: 400px)": {
    fontSize: "12px  ",
    fontWeight: "400",
    padding: "6px 10px",
  },
}));
export const TabsImage = styled("img")(() => ({
  width: "100%",
  borderRadius: "10px",
}));
export const AccordionBoxshadow = styled(Accordion)(() => ({
  boxShadow: "none",
}));
export const Accordionbackground = styled(AccordionSummary)(() => ({
  borderLeft: "4px solid #EE3131",
  backgroundColor: "#F8F8F8",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "none",
    transition: "none",
  },
}));
export const Sliderbox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "-40px",
}));
export const SliderboxDots = styled(Box)(() => ({
  width: "52px",
  height: "117px",
  borderRadius: "50px",
  border: "1px solid #7B7979",
  zIndex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));
export const Sliderboxstyle = styled(Box)(() => ({
  height: "8px",
  width: "8px",
  backgroundColor: "#EC0A13",
  marginTop: "8px",
  borderRadius: "2px",
}));
