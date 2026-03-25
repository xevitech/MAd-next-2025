import { Typography, Box, ButtonBase, Link, Button,styled } from "@mui/material";

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

export const Bgimage:any = styled(Box)(() => ({
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
    background: "rgba(0,0,0,0.66)",
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

export const Heading = styled(Typography)(() => ({
  fontSize: "20px  ",
  fontWeight: "700  ",
  color: "#D7282F",
}));

export const SubHeading = styled(Typography)(() => ({
  fontSize: "32px  ",
  fontWeight: "700",
  color: "#231F20",
  marginBottom: "30px  ",
  "@media screen and (max-width:600px)": {
    fontSize: "20px ",
  },
}));

export const News = styled(Typography)(() => ({
  fontSize: "12px  ",
  fontWeight: "400",
  color: "#D7282F",
  backgroundColor: "rgba(215, 40, 47, 0.09)",
  width: "35px",
  borderRadius: "3px",
  margin: "10px 0px  ",
  padding: "2px",
}));

export const Boxheading = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#231F20",
  marginBottom: "10px",
}));
export const Boxpara = styled(Typography)(() => ({
  fontSize: "13px  ",
  fontWeight: "400",
  color: "#4A4A4A",
  minHeight: "90px",
}));

export const Boxspacebetween = styled(Typography)(() => ({
  fontSize: "13px  ",
  fontWeight: "600  ",
  color: "#223354",
}));
export const Boxbutton = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "1",
}));
export const ButtonoverCard = styled(ButtonBase)(() => ({
  border: "1px solid #CDCDCD",
  fontWeight: "600",
  textAlign: "center",
  borderRadius: "6px",
  padding: "9px 11px 12px 11px",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  width: "auto  ",
  color: "#ffff",
  top: "0px",
}));
export const ButtonT = styled(Typography)(() => ({
  color: "#ffff",
  fontWeight: "600  ",
  fontSize: "13px  ",
}));
export const Boxradius = styled(Box)(() => ({
  border: "1px solid #E7E7E7",
  borderRadius: "20px",
  position: "relative",
  zIndex: "2",
  backgroundColor: "white",
  overflow: "hidden",
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

export const Images = styled("img")(() => ({
  position: "absolute",
  top: "31%",
  right: "4%",
}));
export const Image1 = styled("img")(() => ({
  display: "flex",
  height: "240px",
  objectFit: "cover",
  width: "100%",
  "&:hover": {
    opacity: "0.7",
  },
  "@media only screen and (max-width: 1280px) and (min-width: 900px)": {
    height: "180px",
  },
  "@media only screen and (max-width: 400px)": {
    height: "200px",
  },
}));

export const CalendarIco = styled(Box)(() => ({
  position: "absolute",
  right: "6px",
  bottom: "6px",
  "& img": {
    maxWidth: "100%",
  },
  "@media only screen and (max-width: 1100px) and (min-width: 900px)": {
    width: "63px",
    right: "6px",
    bottom: "6px",
  },
}));

export const Linkdecoration = styled(Link)(() => ({
  textDecoration: "none",
}));

export const MonthSpan = styled("span")(() => ({
  color: "#000000",
  fontWeight: "600",
  display: "block",
}));

export const Startext = styled(Typography)(() => ({
  position: "absolute",
  top: "42%",
  left: "0",
  right: "0",
  color: "#000000",
  fontSize: "13px",
  fontWeight: "600",
  lineHeight: "16px",
  textAlign: "center",
  "@media only screen and (max-width: 1100px) and (min-width: 900px)": {
    top: "41%",
    fontSize: "11px",
    lineHeight: "13px",
  },
  "@media only screen and (max-width: 900px) and (min-width: 600px)": {
    top: "41%",
    fontSize: "11px",
    lineHeight: "13px",
  },
  "@media only screen and (max-width:400px)": {
    top: "41%",
    fontSize: "11px",
    lineHeight: "13px",
  },
}));

export const BorderlineforButton = styled("span")(() => ({
  position: "absolute",
  bottom: 0,
  height: 1,
  width: "100px",
  background: "white",
}));

export const StripeArea = styled(Box)(() => ({
  background: "#d7282f",
  width: "50%",
  position: "absolute",
  bottom: 0,
  color: "#fff",
  fontSize: "13px",
  zIndex: 10,
  padding: "5px 5px 5px 10px",
  fontWeight: 600,
}));
export const ContainerRow = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));
export const BreadcrumbSec = styled(Box)(() => ({
  margin: "1rem 0",
  fontSize: "13px",
}));

export const BlogButton = styled(Button)(() => ({
  background: "#fff",
  color: "#d7282f",
  fontSize: "13px",
  border: "1px solid #d7282f",
  "&:hover": {
    background: "#d7282f",
    color: "#fff",
  },
}));