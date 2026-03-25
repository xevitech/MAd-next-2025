import { ButtonBase, styled } from "@mui/material";
import { Box, Container, Typography } from "@mui/material";

export const Bgimage = styled(Box)(() => ({
  backgroundImage: `url('https://d1oow2vyp2byq1.cloudfront.net/frontStatic/7esBy5ZByd41uvRr1gM2FdscHoZq2dhth7TPTe4w.webp')`,
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
    backgroundColor: "rgba(0,0,0,0.66)",
    position: "absolute",
  },
}));
export const Bgimage1 = styled(Box)(() => ({
  backgroundImage: `url('/assets/banner.svg')`,
  height: "46.2vh",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  position: "relative",
  width: "100%",
  "&:before": {
    content: '" "',
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(0deg, rgba(35,35,38,0.7763480392156863) 0%, rgba(0,212,255,0) 100%)",
    position: "absolute",
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
  fontWeight: "600 !important",
  fontSize: "20px !important",
  color: "#FFFFFF",
  "@media only screen and (max-width: 600px)": {
    fontSize: "16px  ",
    fontWeight: "400",
  },
}));
export const BackgroundImage = styled(Box)(() => ({
  backgroundImage: `url('/assets/contactus2.svg')`,
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
  "@media screen and (max-width:1024px)": {
    backgroundImage: "none",
    backgroundColor: "#FCF8F8",
  },
}));
export const BoxOne = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
}));
export const Headingbox = styled(Box)(() => ({
  marginTop: "30px",
}));
export const HeadingText = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#D7282F",
  textTransform: "uppercase",
  textAlign: "center",
}));
export const SubHeading = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  color: "#4a4a4a",
  textAlign: "center",
}));
export const FirstContainer = styled(Container)(() => ({
  marginTop: "70px",
  "@media screen and (max-width:600px)": {
    marginTop: "50px",
  },
}));

export const MainBox = styled(Box)(() => ({
  border: "1px solid #E4E4E4",
  backgroundColor: "#fff",
  borderRadius: "10px",
  position: "relative",
  padding: "0px 20px 20px 20px ",
}));

export const BgCircle = styled(Box)(() => ({
  height: "100px",
  width: "100px",
  borderRadius: "50%",
  backgroundColor: "#fff",
  position: "absolute",
  left: "0",
  right: "0",
  marginLeft: "auto",
  marginRight: "auto",
  top: "-50px",
}));

export const CicleImage = styled("img")(() => ({
  position: "absolute",
  left: "0",
  right: "0",
  marginLeft: "auto",
  marginRight: "auto",
  top: "12px",
}));
export const TextBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "60px",
  flexDirection: "column",
  alignItems: "center",
}));

export const BoxHeading = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: "600",
  color: "#4a4a4a",
}));
export const BoxSubHeading = styled(Typography)(() => ({
  fontSize: "13px",
  fontWeight: "400",
  color: "#4a4a4a",
  textAlign: "center",
}));
export const FlexBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "10px",
}));
export const ContactusImages = styled("img")(() => ({
  borderRight: "1px solid #D7282F",
  paddingRight: "8px",
}));
export const ContactusImages2 = styled("img")(() => ({
  borderRight: "1px solid #D7282F",
  paddingRight: "10px",
}));
export const Address = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  color: "#231F20",
  marginLeft: "10px",
}));
export const ContactHeadingBox = styled(Box)(() => ({
  textAlign: "center",
}));
export const ContactText = styled(Box)(() => ({
  position: "relative",
  marginTop: "-35px",
  "@media screen and (max-width:1200px)": {
    marginTop: "-15px",
  },
}));
export const BigContacttext = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontSize: "100px",
  fontWeight: "700",
  opacity: "0.05",
  "@media screen and (max-width:1200px)": {
    fontSize: "75px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "60px",
  },
}));
export const AbsoluteforContact = styled(Box)(() => ({
  top: "35%",
  left: "15px",
  position: "absolute",
}));
export const SmallContactus = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "600",
  color: "#d7282f",
  "@media screen and (max-width:1200px)": {
    fontSize: "18px",
  },
}));
export const Leaveus = styled(Typography)(() => ({
  fontSize: "40px",
  fontWeight: "400",
  color: "#4a4a4a",
  marginTop: "25px",
  textTransform: "capitalize",
}));
export const Leaveusspan = styled("span")(() => ({
  fontSize: "40px",
  fontWeight: "700",
  color: "#4a4a4a",
}));
export const ContactUsPara = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  color: "#4a4a4a",
  lineHeight: "30px",
}));
export const InputBox = styled(Box)(() => ({
  border: "1px solid #FCFCFC",
  borderRadius: " 6px",
  backgroundColor: "#FDFDFD",
  boxShadow: " 0px 9px 16px 0px rgba(159, 162, 191, 0.18)",
  padding: "40px 22px 40px 22px",
}));
export const ButtonoverCard = styled(ButtonBase)(() => ({
  border: "1px solid #CDCDCD",
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "21.79px",
  textAlign: "center",
  borderRadius: "6px",
  padding: "14px 30px",
  backgroundColor: "#ffff",
  left: "0",
  right: "0",
  margin: "0 auto",
  color: "#D7282F",
  transition: "ease-in .3s",
  "&:hover": {
    backgroundColor: "#D7282F",
    color: "#ffff",
    transition: "ease-in .3s",
    "& .MuiTypography-root": {
      color: "#ffff",
      transition: "ease-in .3s",
    },
  },
}));
export const TypographyBorderline: any = styled(Typography)({
  position: "absolute",
  bottom: 0,
  height: 1,
  width: "90px",
  background: "red",
});
export const ButtonText = styled(Typography)(() => ({
  color: "#D7282F",
  transition: "ease-in .3s",
  fontWeight: "600",
  fontSize: "16px",
}));
export const ButtonBox = styled(Box)(() => ({
  textAlign: "center",
  marginTop: "30px",
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
  "@media screen and (max-width:600px)": {
    height: "90px",
    width: "40px",
  },
}));
export const Sliderboxstyle = styled(Box)(() => ({
  height: "8px",
  width: "8px",
  backgroundColor: "#EC0A13",
  marginTop: "8px",
  borderRadius: "2px",
}));
export const Spantext2 = styled(Box)(() => ({
  backgroundImage: `URL('/assets/banner.svg')`,
  height: "46.4vh",
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  ZIndex: "",
  "@media (max-width: 1300px)": {
    height: "320px",
  },
  "@media (max-width: 600px)": {
    height: "180px",
  },
}));
export const Bannerheading = styled(Typography)(() => ({
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
export const Bannersubheading = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "20px !important",
  color: "#FFFFFF",
  top: "64%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  "@media (min-width:300px) and (max-width:600px)": {
    fontSize: "13px !important",
    fontWeight: "bold",
  },
  "@media (min-width:600px) and (max-width:900px)": {
    fontSize: "25px !important",
    fontWeight: "bold",
  },
}));
