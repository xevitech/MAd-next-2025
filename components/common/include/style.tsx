import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TabList from "@mui/lab/TabList";
import { Button, ButtonBase, Container, Grid, List, Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    ProdName: {
      "&.css-ahj2mt-MuiTypography-root": {
        fontSize: "18px !important",
        fontWeight: 600,
      },
    },
    SinceYear: {
      fontSize: "40px !important",
      position: "relative",
      "&:before": {
        content: '" "',
        display: "block",
        width: "34px",
        height: "3px",
        background: "white",
        position: "absolute",
        top: "4px",
        margin: "auto",
        left: "0",
        right: "0",
      },
    },
    ContentCol: {
      padding: "0 4% 0 8%",
    },

    redimg: {
      backgroundImage: `url('/assets/background.svg')`,
      height: "100%",
      width: "100%",
      position: "absolute",
      top: "0",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      zIndex: 1,
    },

    firstimg: {
      backgroundImage: `url('/assets/new2.svg')`,
      height: "621px",
      width: "830px",
      position: "absolute",
      bottom: "0",
      backgroundRepeat: "no-repeat",
      zIndex: 2,
      top: "30px",
      right: "0",
    },

    secondimg: {
      backgroundImage: `url('/assets/new1.svg')`,
      height: "290px",
      width: "424px",
      position: "absolute",
      bottom: "56px",
      left: "0%",
      backgroundRepeat: "no-repeat",
      zIndex: 3,
    },
    biglaptop: {
      width: "100%",
      height: "auto",
      zIndex: 999,
    },
    hello: {
      width: "100%",
      height: "auto",
      position: "absolute",
      top: "-7%",
      left: "0px",
      zIndex: 888,
    },
    imgontop: {
      top: "53px",
      position: "absolute",
      left: "63px",
      width: "84%",
    },
    tablebelow: {
      position: "absolute",
      bottom: "-86px",
      left: "44%",
    },
    smallLaptop: {
      position: "absolute",
      left: "-22px",
      bottom: "-10%",
      width: "50%",
      height: "auto",
    },
    imgonsmalllaptop: {
      position: "absolute",
      left: "16px",
      bottom: "-4.6%",
      width: "41.8%",
      height: "auto",
    },
    smalllaptopright: {
      position: "absolute",
      left: "14%",
      bottom: "-18%",
      width: "31%",
      height: "auto",
    },
    smalllaptopleft: {
      position: "absolute",
      left: "7px",
      height: "auto",
      width: "15%",
      bottom: "-18%",
    },
    spantext: {
      fontSize: "30px !important",
      color: "#D7282F",
    },
    spantext2: {
      fontSize: "33px !important",
      color: "#D7282F",
      fontWeight: 600,
    },
    secondpageimg: {
      width: "100%",
      height: "auto",
    },
    imgonsecondimg: {
      position: "absolute",
      left: "17%",
      top: "9%",
      width: "66%",
    },
    borderline: {
      position: "absolute",
      bottom: 0,
      height: 1,
      background: "red",
    },
    spantext3: {
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "27.14px",
      color: "#D7282F",
    },
    Fourthspan: {
      fontWeight: 700,
      fontSize: "45px !important",
      lineHeight: "61.06px",
      color: "#D7282F",
    },
    Fourthsub1span: {
      fontWeight: 700,
      fontSize: "55px !important",
      lineHeight: "74.63px",
      color: "#D7282F",
    },
    Fourthsub2span: {
      fontWeight: 700,
      fontSize: "45px !important",
      lineHeight: "74.63px",
      color: "#D7282F",
    },
    Fifthspan1: {
      fontWeight: 600,
      fontSize: "45px !important",
      lineHeight: "61.28px",
      color: "#D7282F",
    },
    Fifthspan2: {
      fontWeight: 700,
      fontSize: "45px !important",
      lineHeight: "61.28px",
      color: "#D7282F",
    },
    seven: {
      fontWeight: 700,
      fontSize: "30px !important",
      lineHeight: "40.71px",
      color: "#D7282F",
    },
    bgg: {
      backgroundImage: `url('')`,
      height: "auto",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
    },
    bothbg: {
      backgroundImage: `url('/assets/www.svg')`,
      height: "auto",
      backgroundSize: "cover",
    },
    footerbg: {
      backgroundImage: `url('/assets/footerbg.svg')`,
      height: "auto",
    },
    send: {
      fontWeight: 700,
      fontSize: "30px !important",
      lineHeight: "40.71px",
      color: "#D7282F",
    },
    getquote: {
      fontWeight: 700,
      fontSize: "45px !important",
      lineHeight: "61.28px",
      color: "#231F20",
    },
    borderr: {
      height: "2px",
      width: "100px",
      backgroundColor: "#FF000A",
      borderRadius: "10px",
      margin: "14px 0px 30px",

      "@media screen and (max-width: 1600px)": { margin: "7px 0px 10px" },
      "@media screen and (max-width: 800px)": { margin: "8px 0px 10px" },
    },
    snakebg: {
      backgroundImage: `url('/assets/snakedesign.svg')`,
      height: "auto",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0 -140px",
      padding: "30px 20px 60px",
      marginTop: "0 !important",
      backgroundAttachment: "fixed",
    },
    seconebg: {
      background: "#fefefe",
      height: "770px",
      padding: "0 0 0 16px !important",
      position: "relative",
    },
    CompanyCont: {
      padding: "10px 16px 90px  !important",
      "@media screen and (max-width:1600px)": {
        padding: "10px 16px 45px  !important",
      },
    },
    powercozmoshade: {
      backgroundImage: `url('/assets/shadelikething.svg')`,
      width: "100%",
      backgroundRepeat: "no-repeat",
      paddingBottom: "80px",
    },
    Bgimage: {
      backgroundImage: `url('/assets/footerbg.svg')`,
      backgroundColor: "#231F20",
      color: "white",
    },
    footerlinks: {
      fontSize: "20px !important",
      "@media screen and (max-width: 1500px)": { fontSize: "16px !important" },
    },
    footertxt: { fontSize: "13px !important" },
    logoimage: {
      width: "200px",
      "@media screen and (max-width: 1300px)": {
        width: "135px",
        position: "relative",
        top: "3px",
      },
      "@media screen and (max-width: 400px)": {
        width: "120px",
        position: "relative",
        top: "3px",
      },
      "@media screen and (max-width: 320px)": {
        position: "relative",
        top: "3px",
      },
    },
    hammenu: {
      background: "#fff",
      border: "1px solid #d7d7d7",
      borderRadius: "3px",
      width: "32px !important",
      color: "#231f23",
      height: "26px !important",
      margin: "-8px 0 0",
    },

    homeheaderimg: {
      position: "fixed",
      top: "0",
      "& .MuiPaper-root": {
        background: "white",
        boxShadow: "none",
        borderBottom: "1px solid #d1d1d1",
      },
      "& .MuiToolbar-gutters": {
        padding: "0",
        minHeight: "54px",
      },
      "& .css-tuv6v7-MuiContainer-root": {
        margin: "0",
        display: "flex",
        alignItems: "center",
      },
      "@media screen and (max-width: 1600px)": {
        "&:before": { backgroundSize: "80%" },
      },
      "@media screen and (max-width: 1366px)": {
        "&:before": { display: "none" },
      },
    },

    homeheader: {
      position: "fixed",
      top: "0",
      zIndex: "999",
      boxShadow: "0 0 7px 1px #cccccc",
      width: "100%",
      "& .MuiPaper-root": {
        background: "white",
        boxShadow: "none",
        borderBottom: "1px solid #ededed",
      },
      "& .MuiToolbar-gutters": {
        padding: "0",
        minHeight: "55px",
      },
      "& .css-tuv6v7-MuiContainer-root": {
        margin: "0",
        display: "flex",
        alignItems: "center",
      },
    },
  };
});

export const Text = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "17px",
  color: "#231F20",
  marginLeft: "20px",
  textAlign: "center",
}));

export const ButtonText = styled(Typography)(() => ({
  color: "#D7282F",
}));

export const Cont = styled(Container)(() => ({
  display: "flex",
}));
export const Bar = styled(AppBar)(() => ({
  padding: "6px 4px 2px 10px",
  "@media screen and (max-width: 767px)": {
    padding: "0 4px 2px 10px",
  },

  color: "black",
}));
export const MainHeader = styled(Box)(() => ({}));

export const Headerinner = styled(Box)(() => ({
  position: "relative",
  "&:before": {
    content: '" "',
    background: ``,
    position: "absolute",
    display: "block",
    width: "868px",
    height: "805px",
    zIndex: "1",
    right: "-60px",
    top: "0",
    backgroundSize: "100% 100%",
  },
}));

export const NavigationBar = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  paddingLeft: "10%",
  ".MuiTypography-body1": {
    "&:last-child": {
      "& .MuiLink-root": {
        border: "0",
        padding: "8px 20px",
        background: "white",
        borderRadius: "3px",
      },
    },
  },
  "& .MuiTypography-body1": {
    margin: "0",
    "& .MuiLink-root": {
      cursor: "pointer",
      padding: "0 12px 16px",
      margin: "0 12px",
      borderBottom: "3px solid transparent",
      fontSize: "15px",
      transition: "all ease .5s",
      "@media screen and (max-width: 1000px)": {
        margin: "0 2px",
      },
      "&:hover": {
        borderColor: "#D7282F",
        color: "#D7282F",
      },
      "&.active": {
        borderColor: "#D7282F",
        color: "#D7282F",
      },
    },
  },

  "@media screen and (max-width: 1024px)": {
    paddingLeft: "3%",
  },
  "@media screen and (max-width: 850px)": {
    display: "none",
  },
}));
export const BannerContent = styled(Box)(() => ({
  "& .css-a13pr7-MuiTypography-root": {
    marginBottom: "10px",
  },
  "& .css-19km929-MuiTypography-root": {
    fontWeight: "700",
    "& .css-ahj2mt-MuiTypography-root": {
      fontWeight: "700",
    },
  },
}));

export const BannerSearch = styled(Box)(() => ({
  "& .MuiPaper-elevation1": {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "65%",
    boxShadow: "none",
    border: "1px solid #CCCEDD",
    background: "#F9F9F9",
  },
  "& .css-piqts5-MuiInputBase-root": {
    fontSize: "15px",
    margin: "0",
  },
}));
export const AboutImg = styled(Box)(() => ({}));
export const SinceCircle = styled(Box)(() => ({
  width: "140px",
  height: "140px",
  borderRadius: "50%",
  background: "#D7282F",
  position: "absolute",
  top: "-25px",
  right: "70px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .css-ahj2mt-MuiTypography-root": {
    fontSize: "25px",
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
}));

export const FooterCol = styled(Box)(() => ({
  "& .MuiTypography-body1": {
    color: "white",
    fontSize: "13px",
    lineHeight: "20.43px",
    marginTop: "12px",
    "& .MuiLink-root": {
      color: "white",
      cursor: "pointer",
      transition: "all ease .3s",
      "&:hover": {
        color: "#D7282F",
        textDecoration: "underline",
      },
    },
    "@media screen and (max-width: 1500px)": {
      fontSize: "12px",
      marginTop: "5px",
    },
  },
  "& .MuiTypography-h5": {
    color: "white",
    fontWeight: "600",
  },
  "& .ComLogo": {
    marginTop: "7px",
    marginBottom: "7px",
    "@media screen and (max-width: 1500px)": {
      width: "190px",
      marginBottom: "10px",
    },
  },
  "& .mailinfo": {
    "& .MuiTypography-root": {
      color: "#d7282f",
    },
  },
  "& .highlightedtext": {
    fontWeight: 600,
    fontSize: "15px",
  },
  "& .footerlogoic": {
    "@media screen and (max-width: 1024px)": {
      width: "180px",
      margin: "0 0 13px",
    },
  },
}));

export const Text2 = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "27.24px",
  color: "#231F20",
}));

export const Two = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "25px 0px 0px 35px",
}));

export const Turbinesvg = styled(Box)(() => ({
  marginLeft: "15px",
}));
export const ProductBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #DBDBDB",
  borderRadius: "10px",
  height: "296px",
  width: "100%",
  background: "white",
  padding: "5px",
  "&:hover": {
    background: "#f5f5f5",
    boxShadow: "0 0 7px -1px #cccccc",
  },
  "& .MuiStack-root": {
    width: "100%",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: "10px",
    transition: "all ease .5s",
    background: "white",
    "& .css-ahj2mt-MuiTypography-root": {
      fontSize: "13px",
    },
    "& img": {
      margin: "0 auto 5px",
    },
  },
}));
export const SellingLink = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginTop: "0",
  "& .MuiTypography-body1": {
    fontWeight: "700",
    display: "flex",
    "& .MuiLink-root": {
      color: "#D7282F",
      marginLeft: "6px",
      cursor: "pointer",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.4rem",
      marginLeft: "4px",
    },
  },
}));

export const CateThumbImg = styled(Box)(() => ({
  width: "100px",
  height: "100px",
  margin: "0 auto 10px",
  "& img": {
    width: "100%",
  },
}));

export const Turbinetext = styled(Typography)(() => ({
  marginLeft: "10px",
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "20.43px",
  color: "#231F20",
}));
export const Textlink = styled(Link)(() => ({
  color: "#231F20",
  textDecoration: "none !important",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const Headingtext = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "30px",
  color: "#4A4A4A",
}));

export const SecondHeadingtext = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "33px",
  color: "#4A4A4A",
  marginTop: "0px",
}));

export const Para = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  color: "#4A4A4A",
  lineHeight: "25px",
  marginTop: "14px",
  marginBottom: "30px",
}));

export const Secondpag = styled(Grid)(() => ({
  position: "relative",
  height: "100%",
  width: "100%",
}));
export const CopyrightTxt = styled(Box)(() => ({
  borderTop: "1px solid #636363",
  padding: "10px 0",
  color: "white",
  textAlign: "center",
  fontWeight: "300",
  fontSize: "12px",
  lineHeight: "20.43px",
  zIndex: 1,
  position: "relative",
}));

export const SocialIcons = styled(Box)(() => ({
  gap: "20px",
  "& .MuiSvgIcon-root": {
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    "@media (max-width: 767px)": {
      fontSize: "17px",
    },
    "&:hover": {
      color: "#D7282F",
    },
  },
  "& .MuiIconButton-root": {
    width: "40px",
    height: "40px",
    border: "1px solid #fff",
    padding: 0,
    alignItems: "center",
    "& .icon-x-social:hover::before": {
      color: "#d7282f",
    },
    "@media (max-width: 767px)": {
      width: "28px",
      height: "28px",
    },
  },
  margin: "2rem 0 0",
  "@media (max-width: 767px)": {
    margin: "1rem 0 0",
  },
}));

export const Secondpageheading = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "20px",
  color: "#D7282F",
}));

export const Secondpagesubheading = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "45px",
  lineHeight: "60px",
  color: "#231F20",
  marginBottom: "10px",
}));

export const Secondpagepara1 = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "21px",
  color: "#4A4A4A",
  marginBottom: "10px",
}));
export const Secondpagepara = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "21px",
  color: "#4A4A4A",
}));

export const Secondpagepara3 = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "25px",
  color: "#4A4A4A",
  borderLeft: "5px solid #D7282F",
  paddingLeft: "15px",
  marginTop: "30px",
}));

export const ButtonoverCard = styled(ButtonBase)(() => ({
  border: "1px solid #CDCDCD",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "21.79px",
  textAlign: "center",
  borderRadius: "6px",
  padding: "20px",
  marginTop: "7%",
  backgroundColor: "inherit",
  left: "0",
  right: "0",
  color: "#D7282F",
}));
export const ButtonoverCard2 = styled(ButtonBase)(() => ({
  border: "2px solid #CDCDCD",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "21.79px",
  borderRadius: "6px",
  padding: "20px",
  backgroundColor: "#fff",
  left: "0",
  right: "0",
  color: "#D7282F",
}));

export const ButtonoverCard3 = styled(ButtonBase)(() => ({
  border: "1px solid #CDCDCD",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "21.79px",
  borderRadius: "6px",
  padding: "20px",
  backgroundColor: "#fff",
  left: "0",
  right: "0",
  color: "#D7282F",
  width: "21%",
  position: "relative",
}));

export const Thirdpageheading = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "45px",
  color: "#4A4A4A",
  lineHeight: "61.06px",
}));

export const Threefirstheading = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "20px",
  lineHeight: "27.14px",
  color: "#4A4A4A",
}));

export const Fourthheading = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "45px",
  lineHeight: "61.06px",
  color: "#231F20",
  textAlign: "center",
}));

export const Fourthsubheading = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "55px",
  lineHeight: "74.63px",
  color: "#231F20",
}));

export const Fourthpara = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "27px",
  color: "#4A4A4A",
}));
export const Fifthheading = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "45px",
  lineHeight: "61.28px",
  color: "#231F20",
}));
export const Fifthpara = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "24.51px",
  color: "#4A4A4A",
}));
export const listit = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "20.35px",
  color: "#4A4A4A",
  marginBottom: "10px",
}));

export const Col7 = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "30px",
  lineHeight: "40.71px",
  color: "#231F20",
  textTransform: "uppercase",
}));
export const Col8 = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "45px !important",
  lineHeight: "61.28px",
  color: "#231F20",
}));
export const Bggg = styled(Box)(() => ({
  backgroundImage: `url('/assets/footerbg.svg')`,
  height: "auto",
  backgroundSize: "contain",
}));

export const Footerhead = styled(Typography)(() => ({
  fontWeight: "400 !important",
  fontSize: "15px !important",
  lineHeight: "20.43px",
  color: "#FFFFFF",
  marginTop: "15px",
}));

export const Quickbox = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "25px !important",
  lineHeight: "34.05px",
}));

export const Last = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "15px !important",
  lineHeight: "20.43px",
}));

export const LandingPageContainerImage = styled("img")({});
export const LandingPageContainer = styled("div")({
  backgroundImage: "url(/assets/landing4.svg)",
  backgroundOrigin: "border-box",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top",
  backgroundSize: "cover",
  height: "100vh",
  width: "auto",
  margin: 0,
  padding: 0,
});

export const TopButtonsContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

export const CustomButton: any = styled(Button)(({ buttontype }: any) => ({
  margin: "20px",
  width: buttontype?.emailButton
    ? "190px"
    : buttontype?.getStarted
    ? "140px"
    : "90px",
  height: "42px",
  background: buttontype?.emailButton ? "#db3b43" : "#FFFFFF",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "6px",
  color: buttontype?.emailButton ? "#FFFFFF" : "#D6573C",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "13px",
  lineHeight: "18px",
  "&:hover": {
    color: "#FFFFFF",
    background: "#D6573C",
  },
  transition: "background 1s",
  textTransform: "none",
}));

export const LeftMaskContainer = styled("div")({
  backgroundImage: "url(/assets/LeftMaskgroup.svg)",
  background: `linear-gradient(90deg, #F74A51 0%, #4F1214 98.96%)`,
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  zIndex: 12,
  width: "50%",
});

export const RightMaskContainer = styled("div")({
  background: "transparent",
  backdropFilter: `brightness(50%)`,
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  zIndex: 12,
  width: "50%",
});

export const InputFieldContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  position: "absolute",
  top: `calc(50% - 41px)`,
  left: `calc(65% - 360px )`,
  zIndex: 20,
  background: "white",
  paddingLeft: "20px",
  paddingRight: "20px",

  borderRadius: "16px",
  minWidth: "620px",
  minHeight: "100px",
});

export const HeaderText = styled("p")({
  fontWeight: 700,
  fontSize: "70px",
  lineHeight: "80px",
  color: "white",
  fontFamily: "open sans",
});

export const NormalText = styled("p")({
  textAlign: "start",
  color: "white",
  fontWeight: 700,
  fontSize: "26px",
  lineHeight: "80px",
  fontFamily: "open sans",
});

export const Overlayback = styled("div")({});

export const CrossIconContainer = styled("div")({
  zIndex: 15,
  position: "absolute",
  top: "30px",
  right: "30px",
});

export const CrossIconImage = styled("div")({
  cursor: "pointer",
});

export const Mobilemenu = styled("div")({
  display: "none",
  "@media screen and (max-width: 850px)": {
    display: "block",
    // right: "-10px",
    // position: "absolute",
  },
});

export const HeaderRightMenu = styled("div")({
  "@media screen and (max-width: 850px)": {
    // marginRight: "40px",
    // marginTop: "-5px",
  },
});
export const NotificationButton = styled(Button)({
  color: "#000",
  minWidth: "auto",
  padding: 0,
});
export const UserDetail = styled(Typography)({
  padding: "0 10px 5px",
  color: "#231f20  !important",
  fontWeight: "700",
  fontSize: "13px  !important",
  lineHeight: "16px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box",
  cursor: "pointer",
  wordBreak: "break-all",
});
export const UserEmail = styled(Typography)({
  // padding: "0 10px 4px",
  color: "#ccccc !important",
  fontWeight: 400,
  fontSize: "13px !important",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box",
  cursor: "pointer",
  wordBreak: "break-all",
});

export const FullContent = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ContainerHome = styled(Box)({
  backgroundSize: "100%",
  height: "auto",
  backgroundPosition: "center bottom",
  position: "relative",
  backgroundColor: "#231F20 !important",
  backgroundAttachment: "fixed",
  marginTop: "60px",
  "& .bgimage": {
    width: "93%",
    margin: "0 auto",
    paddingBottom: "20px",
    padding: "30px 20px 30px 0",
    marginTop: "0px !important",
    zIndex: 1,
    position: "relative",

    "@media screen and (max-width: 1280px)": {
      width: "99%",
    },
    "@media screen and (max-width: 767px)": {
      padding: "0 20px 30px 0",
    },
  },
});

export const Overlay = styled(Box)({
  backgroundColor: "#231F20",
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0px",
});
export const FooterSubscribe = styled(Box)({
  padding: "10px 0 0",
  "@media screen and (max-width:800px)": {},
  "& .MuiToolbar-root": {
    padding: 0,
  },
  "& .MuiSvgIcon-root": {
    color: "#000",
    padding: "3px 0 0",
  },
});

export const ButtonSearch = styled(Button)({
  borderRadius: "5px",
  background: "#d7282f",
  boxShadow: "none",
  textTransform: "capitalize",
  margin: "0 11px 0",
  padding: "4px 18px",
  "&:hover": {
    background: "#d7282f",
    opacity: "80%",
  },
  "@media screen and (max-width:1280px)": {
    margin: "6px 0 0",
    display: "block",
  },
  "@media screen and (max-width:767px)": {
    margin: "0",
    display: "inline-flex",
  },
});

export const CommonListMenu = {
  "& .MuiList-root": {
    padding: "10px",
    "& .MuiMenuItem-root": {
      display: "flex",
      padding: "5px 11px",
      minHeight: "22px",
      alignItems: "center",
      justifyContent: "start",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "30px",
    },
    "& .MuiDivider-root": {
      opacity: 1,
    },
  },
  "& .MuiMenu-paper": {
    minWidth: "300px",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
};

export const StyledPaper = styled(Paper)({
  maxWidth: "300px",
  padding: "20px",
});

/**** New header css 03/06/24 ****/
export const MyCommonHeader = styled(Box)({
  background: "#fff",
  marginBottom: "135px",
  "@media screen and (max-width:767px)": {
    marginBottom: "137px",
  },
  "& .MuiAppBar-root": {
    background: "#231F20",
    "& .MuiToolbar-regular": {
      minHeight: "40px",
    },
  },
  "& .headerLogoSearch": {
    position: "relative",
    transition: "all 0.3s ease-in-out",
  },

  "& .headerLogoSearchFixed": {
    position: "sticky",
    top: "10px",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1100,
    boxShadow: "0 4px 2px -2px #f1eaea",
    transition: "all 0.3s ease-in-out",
    width: "100%",
  },

  "& .scrollHeader": {
    transition: "top 0.3s ease-in-out",
    top: "-64px",
    "&.visible": {
      top: "0",
    },
  },
});

export const FixedAtTop = styled(Box)({
  background: "#fff",
  margin: "-1px 0 0",
});
export const BlackBarTop = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  "& .MuiButton-text": {
    fontSize: "13px",
    color: "#fff",
    fontWeight: 400,
    textTransform: "capitalize",
    // padding: "0 27px 0 0px",
    margin: 0,
    // height: "100%",
    "@media screen and (max-width:1600px)": {
      fontSize: "11px",
    },
    "@media screen and (max-width:767px)": {
      fontSize: "10px",
      padding: "0 8px 0 0",
    },
    "&:hover": {
      color: "#d7282f",
    },
  },
});

export const MyMenuBox = styled(Box)({
  "& .MuiButton-text": {
    minWidth: "auto",
    margin: "3px 20px 5px 0 !important",
    padding: "6px 25px 15px 0",
    "@media screen and (max-width:920px)":{padding: "6px 18px 15px 0",}
  },
  "& .pmenu-active": {
    color: "#d7282f !important",
  },
});

export const StyledButton = styled(Button)({});
export const HeaderLogoSearch = styled(Box)({
  padding: "10px 0 0",
});
export const AppbarBox = styled(Box)({
  // maxWidth: "100%", padding: "0 20px",
  "@media screen and (max-width:1024px)": {
    padding: "0",
  },
  "@media screen and (max-width:767px)": {
    display: "none",
  },
});
export const LogoSearchRow = styled(Box)({
  // maxWidth: "100%", padding: "0 20px",
  "@media screen and (max-width:1024px)": {
    padding: "0",
  },
});

export const SelectAndSocialIcons = styled(Box)({
  display: "flex",
  height: "100%",
  justifyContent: "end",
  gap: "20px",
});
export const ForSelectContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1px",
  "& .MuiInputBase-root": {
    color: "#fff",
    "& fieldset": {
      border: "none",
    },
  },
  "& .MuiFormLabel-root": {
    background: "transparent",
    color: "#fff !important",
  },
  "& .MuiButtonBase-root": {
    margin: "3px 0",
  },
});
export const DropDownSelect = styled(Box)({
  "& i": {
    margin: "1px 5px",
  },
  "& .MuiButton-endIcon": {
    marginLeft: 0,
    fontSize: "10px",
  },
});

export const ForSocialContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  "& svg": {
    fontSize: "13px",
    "@media screen and (max-width:1600px)": {
      fontSize: "11px",
    },
  },
  "@media screen and (max-width:899px)": {
    "& .MuiIconButton-root": {
      color: "#000",
    },
    padding: "15px 10px",
  },
});
export const WebLogo = styled(Box)({
  "& .Imagelogo": {
    width: "180px",
    "@media screen and (max-width:1300px)": {
      width: "150px",
    },
  },
});
export const SearchbarArea = styled(Box)({
  display: "flex",
  gap: "8px",
  justifyContent: "space-between",
  padding: "5px 0 0",
  "@media screen and (max-width:1700px)": {
    gap: "20px",
  },
});

export const AutoSearchbar = styled(Box)({
  width: "68%",
  margin: "5px 0 0",
  "@media screen and (max-width:1700px)": {
    margin: 0,
  },
  "@media screen and (max-width:800px)": {
    width: "60%",
  },
  "@media screen and (max-width:600px)": {
    width: "100%",
  },
  "& .searchaction": {
    color: "#fff",
    background: "#d7282f",
    border: "1px solid #d7282f",
    borderRadius: "0px 3px 3px 0",
    textTransform: "capitalize",
    padding: "5px 12px",
    fontSize: "14px",
    margin: "0 0px 0 0",
    "&:hover": {
      background: "#d23339",
    },
    "@media screen and (max-width:767px)": {
      minWidth: "30px",
      padding: "5px",
    },
  },
  "& fieldset": {
    borderColor: "#d7282f",
  },
  "& .MuiOutlinedInput-root": {
    paddingRight: "0 !important",
  },
  "& .MuiIconButton-edgeEnd": {
    "&:hover": {
      background: "transparent",
      "& svg": {
        color: "#d7282f",
      },
    },
    "& svg": {
      color: "#888585",
      fontSize: "19px",
      margin: "0 15px 0 0px",
    },
  },
  "& .MuiAutocomplete-popper ": {
    "& .MuiPaper-root ul": {
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#acabab",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#6d6d6d",
      },
    },
  },
});
export const OtherClickOption = styled(Box)({
  // display: "contents",
  // gap: "30px",
  display: "flex",
  gap: "20px",
});

export const OptionClickBox = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  "@media screen and (max-width:767px)": {
    "& .qutation-mobile": {
      width: "23px !important",
    },
  },
  "& img": {
    width: "30px",
  },
});
export const HeaderSupplierLogInfo = styled(Box)({
  whiteSpace: "nowrap",
  "& .MuiTypography-h4": {
    fontSize: "13px",
    color: "#231F20",
    fontWeight: "700",
    "@media screen and (max-width:1600px)": {
      fontSize: "12px",
    },
  },
  "& .MuiTypography-body2": {
    fontSize: "12px",
    color: "#231F20",
  },
  "& a": {
    color: "#231F20",
  },
});

/**** After Loggin Header styling ****/
export const AfterLoginOptions = styled(Box)({
  display: "flex",
  // gap: "30px",
  position: "relative",
  alignItems: "center",
  "& img, svg": {
    cursor: "pointer",
  },
  "& .MuiBadge-badge": {
    background: "#d7282f",
    fontSize: "10px",
    minWidth: "16px",
    height: "12px",
    padding: "8px 3px",
  },
});

export const ALoginBox = styled("div")({
  padding: "0 0 0 30px",
  "& svg": {
    color: "#231f20",
  },
  "& i": {
    color: "#000",
    fontSize: "22px",
  },
  "@media screen and (max-width:767px)": {
    padding: "0 0 0 18px",
  },
});
export const LogoQuotationText = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});
export const MenuAndLogo = styled("div")({
  display: "flex",
  alignItems: "center",
  "& button": {
    "& svg": {
      fontSize: "30px",
      color: "#231f20",
    },
  },
});
export const MainSectorsRow = styled(Box)({
  margin: "6px 0 0",
});
export const MyContainer = styled(Box)({
  width: "95%",
  margin: "0 auto",
  padding: "10px 10px 10px 0",
  "@media screen and (max-width:1280px)": {
    width: "100%",
  },
  "@media screen and (max-width:767px)": {
    padding: "0 10px",
  },
});

/****===================== Start Css Before Login By Nafish =======================*****/
export const LoginBox = styled(Box)({});
export const LogoImageBox = styled(Box)({
  textAlign: "center",
  "& img": {
    width: "200px",
  },
});

export const SingInButtonBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export const DividerlognBox = styled(Box)({
  marginTop: "20px",
  fontSize: "16px",
  fontWeight: "500",
});

export const GoogleIconBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  marginTop: "10px",
  "& img": {
    width: "20px",
    cursor: "pointer",
  },
});

export const Logintext = styled(Typography)({
  fontSize: "13px",
  fontWeight: "400",
  color: "#231F20",
  marginTop: "10px",
  "& .MuiLink-root": {
    color: "#231F20",
    cursor: "pointer",
  },
});

export const PreLoginBox = styled(Typography)({
  fontSize: "13px",
  fontWeight: "400",
  color: "#231F20",
  gap: "20px",
  marginTop: "8px",
});

export const ListText = styled(List)({
  cursor: "pointer",
  "&:hover": {
    color: "#d7282f",
  },
});

export const RegisterButton = styled(Button)({
  border: " 1px solid #d7282f",
  backgroundColor: "#ffff",
  borderRadius: "6px",
  textTransform: "capitalize",
  width: "500px",
  gap: "10px",
  fontSize: "18px !important",
  fontWeight: "500 !important",
  color: "#d7282f !important",

  // "&:hover": {
  //   background: "#b52a30 !important",
  // },
});

export const FooterTxt = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  color: "#231F20",
  marginTop: "10px",
});
/****===================== End Css Before Login By Nafish =======================*****/

/****===================== Start Css After Login By Nafish =======================*****/
export const WelcomeSectionInner = styled(Box)({
  display: "grid",
  gap: "5px",
});
export const WelcomeMenuBox = styled(Box)({
  display: "grid",
  // gap: "12px",
  padding: "8px 0",
  "& .signOut-option": {
    margin: "10px 0 0",
  },
});

export const WlecomeUserName = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  color: "#231F20",
  cursor: "pointer",
  padding: "0 0 8px",
  "&:hover": {
    color: "#d7282f",
  },
  "& span": {
    fontWeight: "600",
    fontSize: "15px",
  },
});

export const WlecomeTxtHello = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  // margin: "0 0 12px",
  color: "#231F20",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "0 7px",
  "& .icon-messages-img": {
    "& span:before": {
      color: "#000",
      fontWeight: "normal",
    },
  },
  "&:hover": {
    color: "#d7282f",
  },
  "& span": {
    fontWeight: "600",
  },
  "& i": {
    fontWeight: 300,
    fontSize: "17px",
  },
  "& svg": {
    fontWeight: 300,
    fontSize: "18px",
  },
});
export const WlecomeTxt = styled("div")({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "5px 7px",
  borderRadius: "4px",

  "& .MuiTypography-root": {
    fontSize: "13px",
    fontWeight: "400",
    display: "flex",
    alignItems: "center",
    color: "#231F20",
    gap: "10px",
  },

  "& .icon-messages-img": {
    "& span:before": {
      color: "#000",
      fontWeight: "normal",
    },
  },
  "&:hover": {
    color: "#d7282f",
    background: "#e5e5e5",
  },
  "& span": {
    fontWeight: "600",
  },
  "& i": {
    fontWeight: 300,
    fontSize: "15px",
  },
  "& svg": {
    fontSize: "18px",
    stroke: "#ffffff",
    strokeWidth: 1,
  },
});
export const WlecomeSing = styled(Box)({
  fontSize: "16px",
  fontWeight: "400",
  color: "#231F20",
  padding: "20px",
});
export const AfterLogInTab = styled(Box)({
  padding: "10px 17px",
});
export const MessageContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "3px 9px",
  "&:hover": {
    background: "#f5f5f5",
    cursor: "pointer",
    borderRadius: "4px",
  },
});
export const MessageBoxWuithIcon = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const ChatUserName = styled(Box)({
  color: "#484848",
  fontSize: "13px",
  fontWeight: "700",
  padding: "7px 10px",
  display: "grid",
  gap: "3px",
});
export const MessageNumber = styled(Box)({
  height: "22px",
  width: "22px",
  backgroundColor: "#FFEEEF",
  borderRadius: "50%",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  minWidth: "22px",
});
export const TextSeven = styled(Box)({
  color: "#D7282F",
  fontSize: "12px",
  fontWeight: "700",
});
export const ChatUserMessage = styled(Box)({
  color: "#333333",
  fontSize: "13px",
  fontWeight: "400",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box",
  cursor: "pointer",
  wordBreak: "break-all",
});
export const ImgBox = styled(Box)({
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  backgroundColor: "#EDEDED",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  "& .MuiAvatar-root": {
    height: "40px",
    width: "40px",
    margin: 0,
  },
});

/*****===== Start Order Popup css =====*****/
export const OrderBox = styled(Box)({
  borderRadius: "10px",
});
export const ManageOrderTxt = styled(Box)({
  fontSize: "14px",
  fontWeight: "600",
  color: "#231F20",
  padding: "0px 0 2px",
});
export const TradeAssuranceTxt = styled(Box)({
  fontSize: "14px",
  fontWeight: "600",
  color: "#231F20",
  padding: "0px 0 2px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "& img": {
    width: "27px",
    margin: "3px 0 0",
  },
});
export const ManageOrderTxt1 = styled(Box)({
  padding: "2px 0 10px",
  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#231F20",
    padding: "2px 0",
  },
});
export const OrderBottomText = styled(Box)({
  padding: "10px 0 0",
});

export const OrderText = styled(Box)({
  fontSize: "13px",
  color: "#231F20",
  padding: "4px 0",
  "& a": {
    cursor: "pointer",
    color: "#d7282f",
    fontSize: "12px",
  },
});
/*****===== End Order Popup css =====*****/

/*****===== Start Wishlist Popup css =====*****/
export const WishListBox = styled(Box)({
  // height:'283px',
  overflow:'auto',
  padding:'0 4px 0 0',
  position:'relative',
  "&::-webkit-scrollbar": { width: "5px" },
  "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
  "&::-webkit-scrollbar-thumb": { background: "#D9D9D9", borderRadius: "10px" },
});
export const WishListContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 0",
  borderBottom: "1px solid #ddd",
  "&:last-child": {
    border: "none",
  },
});

export const WishListImg = styled(Box)({
  minWidth: "90px",
  height: "50px",
  maxWidth: "90px",
  width: "15%",
  flexShrink: 0,
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export const WishListtext = styled(Typography)({
  fontSize: "12px",
  fontWeight: "500",
  color: "#231F20 ",
  gap: "10px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box",
  cursor: "pointer",
  wordBreak: "break-all",
});
export const PriceText = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  color: "#231F20 ",
  gap: "10px",
});

export const WishListtext1 = styled("span")({
  fontSize: "13px",
  fontWeight: "600",
  color: "#D7282F ",
});
export const DeleteIconOrdeer = styled(DeleteOutlinedIcon)({
  color: "#231F20",
  paddingLeft: "6px",
});
export const WishListSecond = styled(Box)({});
export const WishListTextInfo = styled(Box)({
  display: "flex",
  // gap: 10,
  justifyContent: "space-between",
  width: "80%",
});

export const DeleteIconBox = styled("span")({
  border: "1px solid #E6ECF2",
  borderRadius: "4px",
  gap: "6px",
  height: "30px",
  padding: "4px 4px 0",
  "& svg": {
    color: "#231F20",
    fontSize: "18px",
    cursor: "pointer",
    "&:hover": {
      color: "#D7282F ",
    },
  },
});
/*****===== End Wishlist Popup css =====*****/
/****===================== End Css After Login By Nafish =======================*****/

/***** Start Common PopOver css (With & Without Login) ******/
export const TabListComponent = styled(TabList)({
  borderBottom: 1,
  borderColor: "divider",
  "& .MuiTabs-indicator": {
    backgroundColor: "#000",
    height: "1px",
  },

  "& .MuiButtonBase-root": {
    textTransform: "capitalize",
  },
  "& .Mui-selected": {
    color: "#231F20 !important",
    fontSize: "16px",
    fontWeight: "600",
  },
});

export const SelectPopOverOuter = styled(Box)({
  "& .MuiTypography-h4": {
    fontSize: "15px",
    color: "#231F20",
    fontWeight: 700,
  },
  "& .MuiTypography-body2": {
    fontSize: "12px",
    color: "#231F20",
    padding: "8px 0 0",
  },
});
export const SelectFormData = styled(Box)({
  "& .MuiFormControl-root": {
    margin: "22px 0 0",
    "& svg": {
      fontSize: "16px",
    },
  },
});

export const BeforeLogInTab = styled(Box)({
  "& .MuiTabPanel-root": {
    fontFamily: "Open Sans",
    padding: "20px",
    background: "#fff",
    borderRadius: "5px",
  },
});
export const SelectFormButton = styled(Button)({
  background: "#d7282f",
  borderRadius: "6px",
  textTransform: "capitalize",
  margin: "20px 0 0",
  fontSize: "12px",
  padding: "4px 16px",
  boxShadow: "none !important",
  "&:hover": {
    background: "#b52a30",
  },
});

export const OutlinedButton = styled(Button)({
  background: "#fff",
  borderRadius: "6px",
  textTransform: "capitalize",
  margin: "10px 0 0",
  color: "#d7282f",
  fontSize: "12px",
  border: "1px solid #d7282f",
  boxShadow: "none !important",
  padding: "4px 16px",
  "&:hover": {
    background: "#b52a30",
    color: "#fff",
  },
});

/**** Drawer Styling css *****/

export const DrawerWidthBox = styled(Box)({
  width: 250,
});
export const ForSpaceSection = styled(Box)({
  padding: "0 10px 0",
});

export const ClickDrawerInner = styled(Box)({});
export const CancelOption = styled(Box)({
  display: "flex",
  gap: "10px",
  margin: "1rem 0",
  alignItems: "center",
  "& .MuiTypography-root": {
    color: "#231F20",
    fontWeight: 600,
  },
  "& svg": {
    border: "1px solid",
    width: "30px",
    height: "30px",
    padding: "7px",
    borderRadius: "50px",
  },
});
export const ButtonOptionsClick = styled(Box)({
  display: "flex",
  gap: "10px",
  "& button": {
    background: "#fff",
    borderRadius: "50px",
    textTransform: "capitalize",
    color: "#d7282f",
    border: "1px solid #d7282f",
    boxShadow: "none !important",
    padding: "1px 9px",
    fontSize: "13px",
    "&:hover": {
      background: "#d7282f",
      color: "#fff",
    },
  },
});

export const NavInDrawer = styled(Box)({
  "& .MuiButtonBase-root": {
    padding: "2px 0 6px",
    minHeight: "38px",
    "& .MuiTypography-body1": {
      fontSize: "14px",
      color: "#231F20",
      fontWeight: 600,
      "&:hover": {
        color: "#d7282f",
      },
    },
  },
});
export const LanguageCountryBox = styled(Box)({
  margin: "10px 0",
  display: "grid",
  gap: "10px",
});
export const ImgCountryLabel = styled(Box)({
  display: "flex",
  padding: "0 10px",
  gap: "10px",
  justifyContent: "space-between",
  "& i": {
    margin: "0px 7px 0px 0",
  },
  "& svg": {
    fontSize: "18px",
  },
  "& i::before": {
    color: "#231F20",
  },
  "& .MuiTypography-root": {
    color: "#231F20",
    fontWeight: 600,
    fontSize: "14px",
  },
});
export const OnClickLanguageCountryBox = styled(Box)({
  position: "absolute",
  right: 0,
  // padding: 2,
  backgroundColor: "#fff",
  borderRadius: 1,
  width: "100%",
  height: "100vh",
  top: 0,
  padding: "0 10px",
  "& .MuiListItem-root": {
    borderBottom: "1px solid #e8e4e4",
    padding: "2px 14px",
  },
  "& .MuiListItem-root:last-child": {
    borderBottom: "none",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
  },
});

export const HeaderPartBox = styled(Box)({
  "& .user-welcome-popup": {
    "& .MuiPaper-root": {
      maxWidth: "200px",
      minWidth: "200px",
    },
  },
});
export const ViewAllCategoriesLink = styled(Box)({
  "& svg": {
    color: "#231f20",
    fontSize: "20px",
  },
});
export const CategoriesLinkBtn = styled(Button)({
  textTransform: "capitalize",
  border: "none !important",
  padding: 0,
  fontSize: "13px",
  fontWeight: "600",
  color: "#000",
  "@media screen and (max-width:767px)": {
    fontSize: "12px",
  },
});
export const ViewAllCategoriesLinkMobile = styled(Box)({
  display: "block",
  background: "#fff",
  padding: "0px 10px",
  position: "fixed",
  right: 0,
  bottom: "10px",
  "& .MuiButton-startIcon": {
    margin: "0 2px 0 0",
  },

  "& svg": {
    color: "#231f20",
    fontSize: "20px",
  },
});
export const MainSectorsRowInner = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export const SectorSctroll = styled(Box)({
  width: "70%",
});
