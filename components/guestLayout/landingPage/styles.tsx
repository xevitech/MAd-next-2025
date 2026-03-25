import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
export const useStyles = makeStyles()((theme) => {
  return {
    ProdName: {
      "&.css-ahj2mt-MuiTypography-root": {
        fontSize: "18px !important",
        fontWeight: 600,
      },
    },
    ourproducts: {
      margin: "40px 0 60px !important",
      "@media screen and (max-width: 767px)": { margin: "10px 0 !important" },
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
      "@media screen and (max-width: 767px)": { padding: "5% 1%" },
    },

    bgimage: {
      backgroundColor: "#231F20 !important",
      marginTop: "0!important",
      paddingTop: "30px",
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
      height: "100%",
      width: "100%",
      position: "relative",
      bottom: "0",
      backgroundRepeat: "no-repeat",
      zIndex: 2,
      top: "30px",
      right: "0",
      backgroundSize: "80%",
      backgroundPosition: "center",
      "@media screen and (max-width: 600px)": {
        width: "100%",
        position: "absolute",
        top: "170px",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      "@media (min-width:601px) and (max-width: 899px)": {
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: "220px",
        width: "80%",
        backgroundSize: "100%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    },

    secondimg: {
      backgroundImage: `url('/assets/new1.svg')`,
      height: "315px",
      width: "48%",
      position: "absolute",
      bottom: "10px",
      left: "-3%",
      backgroundRepeat: "no-repeat",
      zIndex: 3,
      backgroundSize: "100%",
      backgroundPosition: "left -1px",
      "@media screen and (max-width: 1600px)": {
        height: "265px",
      },
      "@media screen and (max-width: 1400px)": {
        height: "226px",
      },
      "@media screen and (max-width: 1200px)": {
        height: "196px",
      },
      "@media screen and (max-width: 1024px)": {
        height: "166px",
      },
      "@media (min-width:300px) and (max-width: 600px)": { display: "none" },
      "@media (min-width:601px) and (max-width: 899px)": { display: "none" },
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
      // zIndex: '1',
      left: "14%",
      bottom: "-18%",
      width: "31%",
      height: "auto",
    },
    smalllaptopleft: {
      position: "absolute",
      // zIndex: '1',
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
      "@media screen and (max-width:1300px)": {
        fontSize: "28px !important",
      },
      "@media screen and (max-width:600px)": {
        fontSize: "24px",
      },
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
      // width: "90px",
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
    },
    snakebg: {
      backgroundImage: `url('/assets/snakedesign.svg')`,
      height: "auto",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0 -140px",
      padding: "30px 20px 0",
      marginTop: "0 !important",
      "@media screen and (max-width:1600px)": {
        padding: "30px 20px 60px",
      },
    },
    seconebg: {
      background: "#fefefe",
      padding: "0 0 0 16px !important",
      position: "relative",
      "@media screen and (max-width:600px)": {},
    },
    CompanyCont: {
      padding: "10px 16px 90px  !important",
      "@media screen and (max-width:1600px)": {
        padding: "10px 16px 45px  !important",
      },
      "@media screen and (max-width:767px)": {
        padding: "10px 16px 20px  !important",
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
  padding: "15px",
  color: "black",
}));
export const MainHeader = styled(Box)(() => ({
  flexGrow: "1",
  position: "relative",
  "&:before": {
    content: '" "',
    background: `url('/assets/background.svg') center top no-repeat`,
    position: "absolute",
    display: "block",
    width: "868px",
    height: "805px",
    zIndex: "1",
    // right:'-60px',
    right: "0",
    top: "0",
    backgroundSize: "100% 100%",
  },

  "& .MuiPaper-root": {
    background: "white",
    boxShadow: "none",
    borderBottom: "1px solid #d1d1d1",
  },
  "& .MuiToolbar-gutters": {
    padding: "0",
  },
  "& .css-tuv6v7-MuiContainer-root": {
    margin: "0",
    display: "flex",
    alignItems: "center",
  },
}));

export const Headerinner = styled(Box)(() => ({
  flexGrow: "1",
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
      marginLeft: "auto",
      position: "relative",
      zIndex: "3",
      right: "8%",
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
      padding: "0 12px 34px",
      margin: "0 12px",
      borderBottom: "3px solid transparent",
      fontSize: "15px",
      transition: "all ease .5s",
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
  paddingLeft: "25px",
  "& .MuiTypography-body1": {
    color: "white",
    fontSize: "15px",
    lineHeight: "20.43px",
    marginTop: "12px",
    "& .MuiLink-root": {
      color: "white",
      cursor: "pointer",
      transition: "all ease .3s",
      "&:hover": {
        color: "#D7282F",
      },
    },
  },
  "& .MuiTypography-h5": {
    color: "white",
    fontWeight: "600",
  },
  "& .ComLogo": {
    marginTop: "7px",
    marginBottom: "22px",
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
  "@media screen and (max-width:600px)": {
    height: "170px",
  },
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
    alignItems: "center",
    "& .MuiLink-root": {
      color: "#D7282F",
      marginLeft: "6px",
      cursor: "pointer",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.4rem",
      marginLeft: "4px",
    },
    "@media screen and (max-width:400px)": {
      fontSize: "14px",
      "& .MuiSvgIcon-root": {
        fontSize: "1.2rem",
        marginLeft: "3px",
      },
    },
    "@media screen and (max-width:380px)": {
      fontSize: "12px",
      "& .MuiSvgIcon-root": {
        fontSize: "1rem",
        marginLeft: "3px",
      },
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
  textDecoration: "none",
  cursor: "pointer",
}));

export const Headingtext = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "30px",
  color: "#4A4A4A",
  "@media screen and (max-width:1300px)": {
    fontSize: "22px",
  },
  "@media screen and (max-width:900px)": {
    marginTop: "28px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "22px",
  },
}));

export const SecondHeadingtext = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "33px",
  color: "#4A4A4A",
  marginTop: "0px",
  "@media screen and (max-width:1300px)": {
    fontSize: "28px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "24px",
  },
}));

export const Para = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  color: "#4A4A4A",
  lineHeight: "25px",
  marginTop: "14px",
  marginBottom: "30px",
  "@media screen and (max-width:600px)": {
    fontSize: "14px",
  },
}));
// const Bgimage = styled(Img)(() => ({
//     background:url('/assets/background.svg'),
//     height:'auto',
//     width:'100%'
// }))

// const styles = {
//     background: `url('assets/background.svg')`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   };
export const Secondpag = styled(Grid)(() => ({
  position: "relative",
  height: "100%",
  width: "100%",
}));
export const CopyrightTxt = styled(Box)(() => ({
  borderTop: "1px solid #636363",
  paddingTop: "30px",
  color: "white",
  textAlign: "center",
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "20.43px",
  marginTop: "40px",
}));

export const SocialIcons = styled(Box)(() => ({
  "& .MuiSvgIcon-root": {
    color: "white",
    fontSize: "1.8rem",
    marginRight: "8px",
    cursor: "pointer",
    "&:hover": {
      color: "#D7282F",
    },
  },
}));

export const Secondpageheading = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "20px",
  color: "#D7282F",
  "@media screen and (max-width:1600px)": {
    fontSize: "16px",
  },
}));

export const Secondpagesubheading = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "35px",
  lineHeight: "normal",
  color: "#231F20",
  marginBottom: "10px",
  textTransform: "capitalize",
  "@media screen and (max-width:1600px)": {
    fontSize: "24px",
    lineHeight: "normal",
  },
  "@media screen and (max-width:767px)": {
    fontSize: "18px",
  },
}));

export const Secondpagepara1 = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "21px",
  color: "#4A4A4A",
  marginBottom: "10px",
  "@media screen and (max-width:1600px)": {
    fontSize: "14px",
    // lineHeight:'4
  },
}));
export const Secondpagepara = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "21px",
  color: "#4A4A4A",
  "@media screen and (max-width:1600px)": {
    fontSize: "14px",
    // lineHeight:'4
  },
}));

export const Secondpagepara3 = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "25px",
  color: "#4A4A4A",
  borderLeft: "5px solid #D7282F",
  paddingLeft: "15px",
  marginTop: "30px",
  "@media screen and (max-width:1600px)": {
    fontSize: "14px",
  },
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
  // textAlign: 'center',
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
  // textAlign: 'center',
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
  fontSize: "30px",
  color: "#4A4A4A",
  lineHeight: "normal",
  "@media screen and (max-width:1500px)": {
    fontSize: "27px",
    lineHeight: "normal",
  },
  "@media screen and (max-width:767px)": {
    fontSize: "18px",
  },
}));

export const Threefirstheading = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "20px",
  lineHeight: "27.14px",
  color: "#4A4A4A",
  "@media screen and (max-width:767px)": {
    fontSize: "16px",
  },
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
  // marginTop: '25px !important'
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
  // backgroundSize: "100%",
  backgroundSize: "cover",
  height: "100vh",
  // Width: "100vw",
  width: "auto",
  // display: "flex",
  // margin: "auto",
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
  // border: type?.emailButton ? "" : "1px solid #FFFFFF",
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
    // border: "1px solid #D6573C ",
  },
  transition: "background 1s",
  textTransform: "none",
}));

export const LeftMaskContainer = styled("div")({
  //   maxWidth: ",
  //   height: "100vh",

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

  // transition:'height 1s'
});

export const RightMaskContainer = styled("div")({
  //   backgroundImage: `url(${LeftMaskImage})`,
  //   background: `linear-gradient(90deg, #F74A51 0%, #4F1214 98.96%)`,
  background: "transparent",
  backdropFilter: `brightness(50%)`,
  position: "absolute",
  top: 0,
  //   left: 0,
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

export const Imagebox = styled("div")({
  position: "relative",
  width: "100%",
});

export const LargeImg = styled(Box)({
  "& img": {
    position: "relative",
    zIndex: "3",
    marginTop: "76px",
    maxWidth: "95%",
    marginBottom: "46px",
    "@media screen and (max-width:1600px)": {
      maxWidth: "85%",
    },
  },
  "@media screen and (max-width:1024px)": {
    textAlign: "center",
    "& img": {
      marginTop: "36px",
    },
  },
});
export const SmallImg = styled(Box)({});

//-------------------------------------------------------------------------

export const Bannerr = styled(Box)({
  "&::before": {
    content: '""',
    background: `url('/assets/banner.png')`,
    width: "100%",
    height: "59vh",
    top: "0",
    // display:'flex',
    position: "absolute",
    zIndex: -1,
  },

  // "&::before": {
  //     content: '""',
  //     position: "absolute",
  //     backgroundColor: "#D7282F",
  //     background: "url('/assets/images/crm/notes_img.svg') no-repeat",
  //     left: "-47px",
  //     width: "30px",
  //     height: "52%",
  //     top: "0",
  //   },
});

export const BannerBox = styled(Box)({
  backgroundImage: `url('/assets/images/homebanner-img.png')`,
  backgroundSize: "100%",
  // height: '530px',
  height: "650px",
  paddingTop: "120px",
  backgroundPosition: "100% 800px",
  position: "relative",
  // backgroundAttachment: "fixed",
  // backgroundRepeat: "no-repeat",
  "@media screen and (max-width:1600px)": {
    backgroundPosition: "center",
  },
  "@media screen and (max-width:1280px)": {
    backgroundPosition: "center",
    backgroundAttachment: "unset",
    // height: '400px',
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
  },
  "@media screen and (max-width:767px)": {
    // height: '200px',
    height: "auto",
    // padding: "12px 0 44px"
    padding: "130px 0 44px",
  },
});
export const Overlay = styled(Box)({
  // backgroundColor: '#414141',
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0px",
});
export const MainGrid = styled(Grid)({
  position: "relative",
  minHeight: "500px",
  width: "85%",
  margin: "0 auto",
  "@media screen and (max-width:1280px)": {
    width: "100%",
  },
  "@media screen and (max-width:1024px)": {
    minHeight: "100%",
  },
  "@media screen and (max-width:767px)": {
    minHeight: "auto",
  },
});
export const GridFirst = styled(Grid)({
  display: "flex",
  alignItems: "center",
});
export const Gridbox = styled(Box)({
  border: "10px solid ",
  padding: "30px",
  borderImage: "linear-gradient(to right, #fff 50%, transparent 50%)",
  borderImageSlice: 1,
  position: "relative",
  "@media screen and (max-width:1200px)": {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    // alignItems: 'center',
    // marginLeft: '70px'
  },
  "@media screen and (max-width:767px)": {
    margin: "0 auto",
    border: "none",
    padding: "0",
  },
});
export const Whiteline = styled(Box)({
  backgroundColor: "#fff",
  position: "absolute",
  top: "-10px",
  right: "32%",
  height: "10px",
  width: "20%",
  "@media screen and (max-width:767px)": {
    display: "none",
  },
});
export const OurServicesButton = styled(ButtonBase)({
  backgroundColor: "#d7282f",
  padding: "6px 8px",
  borderRadius: "6px",
  border: "none",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "400",
  position: "absolute",
  bottom: "-8%",
  right: "29%",
  "@media screen and (max-width:767px)": {
    position: "static",
  },
});
export const Heading = styled(Typography)({
  fontSize: "50px",
  fontWeight: "700",
  color: "#fff",
  lineHeight: "normal",
  // fontFamily: 'Impact !important',
  letterSpacing: "normal",
  marginBottom: "0px",
  "@media screen and (max-width:1280px)": {
    fontSize: "40px",
  },
  "@media screen and (max-width:900px)": {
    fontSize: "30px",
  },
});
export const SubHeading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "500",
  color: "#fff",
  lineHeight: "normal",
  marginTop: "0px",
  padding: "7px 0 20px",
  "@media screen and (max-width:600px)": {
    fontSize: "14px",
    padding: "12px 0",
  },
});

export const Typographydescription = styled(Typography)({
  fontSize: "14px",
  fontWeight: "300",
  color: "#fff",
  lineHeight: "24px",
  marginTop: "0px",
  "@media screen and (max-width:600px)": {
    fontSize: "14px",
    padding: "12px 0",
  },
});

export const GridSecond = styled(Grid)({
  marginTop: "100px",
  "@media screen and (max-width:1200px)": {
    display: "flex",
    justifyContent: "center",
  },
  "@media screen and (max-width:600px)": {
    marginTop: "30px",
  },
});
export const ImageBox = styled(Box)({
  backgroundColor: "#fff",
  width: "582px",
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  "@media screen and (max-width:600px)": {
    width: "70%",
  },
});
export const Image1 = styled("img")({
  width: "100%",
});
export const GridMainBox = styled(Box)({
  width: "90%",
  margin: "0 auto",
  "@media screen and (max-width:1500px)": {
    width: "99%",
  },
});
export const GridInnerBox = styled(Box)({
  backgroundColor: "#FAFAFA",
  boxShadow: " 0px 0px 24px 0px rgba(0, 0, 0, 0.15)",
  borderRadius: "30px",
  border: "10px solid #fff",
  padding: "20px 5px 20px 0px",
  position: "relative",
  display: "flex",
  alignItems: "stretch",
  width: "100%",
  "@media screen and (max-width:1600px)": {
    border: "5px solid #fff",
  },
});
export const FlexBox = styled(Box)({
  display: "flex",
  // alignItems: 'center',
  gap: "20px",
  position: "relative",
});
export const GridHeading = styled(Typography)({
  fontSize: "20px",
  fontWeight: "600",
  color: "#2f2f2f",
  "@media screen and (max-width:1700px)": {
    fontSize: "16px",
  },
  "@media screen and (max-width:1500px)": {
    fontSize: "14px",
  },
});
export const GridText = styled(Typography)({
  fontSize: "13px",
  fontWeight: "400",
  color: "#424242",
  marginTop: "8px",
  marginBottom: "20px",
  "@media screen and (max-width:1500px)": {
    fontSize: "12px",
    marginTop: "2px",
  },
});
export const RightArrowBox = styled(Box)({
  // position: 'absolute',
  // bottom: '-15%',
  // right: '-4.7%',
  // height: '32px',
  // width: '32px',
  // borderRadius: '50%',
  // backgroundColor: '#d7282f',
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center'
  position: "absolute",
  right: "0",
  bottom: 10,
});
export const Rightarrow = styled(ChevronRightOutlinedIcon)({
  color: "#fff",
});

export const BoxImagge = styled(Box)({
  width: "90px",
  height: "90px",
  "& img": {
    width: "100%",
  },
});

//******============ Start New Landing Page Styling ==============*******//
export const BannerContainer = styled(Box)({
  height: "85vh",
  // height: "800px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // backgroundImage: 'url("/assets/images/landing-page/landing-banner.webp")',
  backgroundImage:
    'url("https://d1oow2vyp2byq1.cloudfront.net/frontStatic/3kahnyfOireFhUa3Zr7PLf28kBLUVwhpWVePdVJ4.webp")',
  backgroundPosition: "center",
  color: "#fff",
  position: "relative",
  width: "100%",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  margin: "-2px 0 0",
  backgroundAttachment: "fixed",
  // background:'url("/assets/images/landing-page/landing-banner.png") #000'
  "@media screen and (max-width:1024px)": {
    backgroundAttachment: "unset",
  },
  "@media  (max-device-width: 900px) and (orientation: portrait)": {
    height: "50vh",
  },
  "@media screen and (max-width:767px)": {
    margin: "0 0 25px",
    height: "50vh",
    padding: "0 5px",
  },
});
export const LBgOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  zIndex: 1,
});
export const ContentContainer = styled(Box)({
  position: "relative",
  // zIndex: 2,
  textAlign: "center",
  width: "55%",
  margin: "0 auto",
  "@media screen and (max-width:1600px)": {
    // width: "100%",
    padding: "0 20px",
  },
  "@media screen and (max-width:1200px)": {
    width: "90%",
  },
  "& .MuiTypography-h1": {
    fontSize: "40px",
    fontWeight: 700,
    margin: "20px 0",
    "@media screen and (max-width:1600px)": {
      fontSize: "30px",
    },
    "@media screen and (max-width:767px)": {
      "& br": {
        display: "none",
      },
    },
    "@media screen and (max-width:1200px)": {
      fontSize: "26px",
    },
    "@media screen and (max-width:800px)": {
      fontSize: "19px",
    },
  },
  "& .MuiTypography-h2": {
    fontSize: "24px",
    "@media screen and (max-width:800px)": {
      fontSize: "16px",
    },
  },
  "& .MuiTypography-body1": {
    fontSize: "16px",
    "@media screen and (max-width:767px)": {
      fontSize: "12px",
      "& br": {
        display: "none",
      },
    },
  },
});

export const FixedForm = styled(Box)({
  position: "fixed",
  top: "350px",
  right: 0,
  // height: "100%",
  width: "100%",
  maxWidth: "400px",
  zIndex: "100",
  transition: "all ease 0.99s",
  "@media screen and (max-width:767px)": {
    maxWidth: "80%",
  },
});
export const BannerFormData = styled(Box)({
  background: "#fff",
  padding: "20px",
  maxWidth: "600px",
  boxShadow:
    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
});
export const FormCrossbtn: any = styled(Box)({
  position: "fixed",
  top: "0",
  backgroundColor: "#fff",
  filter: "drop-shadow(-1px 0px 1px rgba(0, 0, 0, 0.09))",
  zIndex: "-1",
  height: "20px",
  padding: "0px",
  borderRadius: "3px",
  left: 0,
  // height:"200px"
});
export const IconClose: any = styled(CloseOutlinedIcon)({
  color: "#d7282f",
  cursor: "pointer",
  height: "20px",
  width: "20px",
});
export const QuickSignupButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  right: 0,
  // top: "50%",
  top: 0,
  backgroundColor: "#d32f2f",
  color: "#fff",
  borderRadius: "4px 0 0 4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textTransform: "none",
  minWidth: "38px",
  maxHeight: "150px",
  transition: "height 1s ease, transform 1s ease",
  "&:hover": {
    backgroundColor: "#b71c1c",
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
    padding: "5px",
    transform: "rotate(180deg)",
  },
}));
export const QuickSignupIcon = styled(Button)(({ theme }) => ({
  position: "fixed",
  right: "0px",
  top: "0",
  backgroundColor: "#d32f2f",
  color: "#fff",
  padding: theme.spacing(1.5),
  borderRadius: "4px 0 0 4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textTransform: "none",
  transition: "max-height 1s ease- out",
  "&:hover": {
    backgroundColor: "#b71c1c",
  },
}));
export const BannerFormInner = styled(Box)({
  "& .MuiTypography-h4": {
    fontSize: "24px",
    color: "#231F20",
    textAlign: "center",
    fontWeight: 700,
    "@media screen and (max-width:899px)": {
      fontSize: "18px",
    },
  },
  "& .MuiTypography-body2": {
    fontSize: "16px",
    color: "#231F20",
    textAlign: "center",
    "@media screen and (max-width:899px)": {
      fontSize: "14px",
      margin: "0 0 10px",
    },
  },
});
export const FieldLabel = styled("span")({
  color: "#231F20",
  fontSize: "14px",
  padding: "3px 0",
  "@media screen and (max-width:899px)": {
    fontSize: "12px",
  },
});
export const FormBox = styled(Box)({
  padding: "1rem 0",
});

export const StyledButtonBox = styled(Box)({
  marginTop: "1rem",
});
export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#d32f2f",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#b71c1c",
  },
}));
export const SearchBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: 1,
  width: "100%",
  maxWidth: "600px",
  margin: "20px 0",
  background: "transparent",
  borderRadius: "40px",
  "& .MuiInputBase-input": {
    background: "transparent",
    color: "#BDBDBD",
  },
  "& .MuiInputBase-root": {
    paddingRight: "0",
  },
  "& fieldset": {
    background: "transparent",
    border: "1px solid rgba(189, 189, 189, .5)!important",
    borderRadius: "2px",
  },
  "& .MuiIconButton-root": {
    background: "#d7282f",
    height: "52px",
    width: "55px",
    borderRadius: "0 2px 2px 0",
    "& svg": {
      color: "#fff",
    },
  },
});
export const FrequentlySearch = styled(Box)({
  margin: "10px 0 0",
});
export const FQLink = styled("span")({
  padding: "0 0px 0 15px",
});

export const SectionColoredBox = styled(Box)({
  background: "#FBF8F6",
});
export const SectionWhiteBox = styled(Box)({
  background: "#fff",
});

/******* Start Second section styling ********/
export const LandingPageHeadings = styled("h2")({
  fontSize: "30px",
  fontWeight: "700",
  color: "#231f20",
  textAlign: "center",
  "@media screen and (max-width:1600px)": {
    fontSize: "24px",
  },
  "@media screen and (max-width:1024px)": {
    fontSize: "22px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "18px",
  },
});
export const LandingPageHeadingsSpan = styled("span")({
  color: "#d7282f",
});
export const CenterDes = styled(Typography)({
  fontSize: "16px",
  color: "#000",
  textAlign: "center",
});

export const LandingPageSubHeadings = styled(Typography)({
  fontSize: "18px",
  fontWeight: "700",
  color: "#231f20",
  "@media screen and (max-width:1024px)": {
    fontSize: "16px",
  },
  "@media screen and (max-width:480px)": {
    fontSize: "14px",
  },
  "@media screen and (max-width:320px)": {
    fontSize: "14px",
  },
});
export const LandingPageText = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  color: "#000",
  "@media screen and (max-width:600px)": {
    fontSize: "12px",
  },
});
export const ContainerBox = styled(Box)({
  "& .Gridhover": {
    padding: "16px",
    transition: "all ease .3s",
    "&:hover": {
      backgroundColor: "#D7282F",
      borderRadius: "4px",
      transition: "all ease .3s",
      "& .hovertext": {
        color: "#fff",
        transition: "all ease .3s",
      },
      "& .hoverbgcolor": {
        backgroundColor: "#fff",
        transition: "all ease .3s",
      },
      "& .Gridicon": {
        color: "#d7282f",
        transition: "all ease .3s",
      },
    },
  },
  "& .hovertext": { transition: "all ease .3s" },
  "& .Gridicon": {
    color: "#fff",
    transition: "all ease .3s",
  },
  "& .iconandtext": { display: "flex", alignItems: "center" },
  "& .headingfistspan": { color: "#231f20" },
  "& .headingsecondspan": {
    color: "#231f20",
    fontSize: "28px",
    "@media screen and (max-width:767px)": {
      fontSize: "18px",
    },
  },
  "& .headingthirdspan": {
    color: "#d7282f",
    fontSize: "28px",
    fontWeight: "700",
    "@media screen and (max-width:767px)": {
      fontSize: "18px",
    },
  },
});
export const CenterBox = styled(Box)({
  textAlign: "center",
});
export const GlobalTradeSection = styled(Stack)({
  gap: "26px",
  "& .laststack": {
    "&::before": {
      border: "none",
    },
  },
  "& .leftHeading": {
    textAlign: "left",
  },
});
export const SectorsInformation = styled(Box)({
  padding: "1rem 0 0",
});

export const GridStack = styled(Stack)({
  gap: "15px",
  alignItems: "left",
  // padding:"0 14px",
  padding: "20px 40px 50px",

  "@media screen and (max-width:1600px)": {
    padding: "20px 5px 50px",
  },
  "@media screen and (max-width:767px)": {
    padding: "0px 5px 5px",
    gap: "2px",
  },
});
export const GridImageBox = styled(Box)({
  // height: "60px",
  // width: "22px",
  borderRadius: "50%",
  transition: "all ease .3s",
  display: "flex",
  "& img": {
    width: "30px",
  },
});
export const GridInfoBox = styled(Box)({
  textAlign: "left",
  "@media screen and (max-width:1600px)": {
    padding: "10px 0",
  },
  "& .MuiTypography-h4": {
    margin: "0 0 5px",
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
    "@media screen and (max-width:1600px)": {
      fontSize: "12px",
    },
  },
});

export const SectorLearnMore = styled(Box)({
  "& a": {
    display: "flex",
    alignItems: "end",
    gap: "6px",
    fontSize: "14px",
    color: "#000",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
      color: "#d7282f",
    },
  },
  "& svg": {
    fontSize: "16px",
  },
});

/******* End Second section styling  *********/

/******* Start Third section styling  *********/
export const PageContentInfo = styled(Stack)({
  // gap: "40px",
  // overflowX: "hidden",
  "& .headerBlock": { display: "block" },
  "& .removeCenterformStack": { alignItems: "start", padding: "16px" },
  "& .iconandtext": { display: "flex", alignItems: "center" },
  "& .GridImages": { height: "100%", objectFit: "cover" },
  "& .bgRedShade": {
    background: "linear-gradient(270deg, #F5ECEB 0%, #FEDFDC 100%)",
  },
  "& .imagenone": {
    "@media screen and (max-width:600px)": {
      display: "none",
    },
  },
  "& .Bgred": { backgroundColor: "#d7282f", padding: "20px" },
  "& .textWhite": {
    color: "#fff",
    textAlign: "left",
    "@media screen and (max-width:900px)": {
      textAlign: "center",
    },
  },
  "& .GlobalBG": {
    backgroundImage: `url('/assets/images/landing-page/GlobalBG.png')`,
    padding: "20px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",
  },
  "& .SelectedSlide": {
    backgroundColor: "#d7282f",
  },
  "& .leftHeading": {
    textAlign: "left",
  },
  "& .discover-business": {
    "@media screen and (max-width:767px)": {
      padding: "0",
    },
  },
});
export const BodyContentInfo = styled(Box)({
  "& .slick-dots li button:before": {
    border: "1px solid #000",
    borderRadius: "50%",
    color: "#fff",
    background: "#fff",
    width: "8px",
    height: "8px",
    opacity: 1,
    lineHeight: "normal",
  },
  "& .slick-dots li.slick-active button:before": {
    background: "#d7282f",
    color: "#d7282f",
    border: "1px solid #d7282f",
  },
  "& .slick-dots li": {
    margin: 0,
  },
});

export const CrmBox = styled(Box)({
  background: "#FBF8F6",
});
export const CommonEachSection = styled(Box)({
  padding: "50px 0",
  "@media screen and (max-width:1600px)": {
    padding: "40px 0",
  },
  "@media screen and (max-width:767px)": {
    padding: "20px 0",
  },
});
export const PageButton = styled(Button)({
  color: "#d7282f",
  borderRadius: "4px",
  fontSize: "13px",
  textTransform: "capitalize",
  borderColor: "#d7282f !important",
  padding: "2px 12px",
  "&:hover": {
    background: "#d7282f",
    color: "#fff",
  },
});
export const ButtonContainer = styled(Box)({
  display: "flex",
  gap: "10px",
});
export const ColumnGap = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});
export const ColumnImage = styled(Box)({
  "& img": {
    width: "100%",
  },
});
export const ChatColumnImage = styled(Box)({
  "@media screen and (max-width:800px)": {
    textAlign: "center",
  },
  "& img": {
    width: "800px",
    "@media screen and (max-width:1600px)": {
      width: "100%",
    },
    "@media screen and (max-width:800px)": {
      width: "50%",
    },
  },
});

export const CRMColumnStack = styled(Stack)({
  gap: "20px",
});
export const ColumnStack = styled(Box)({
  padding: "0 20px",
  "@media screen and (max-width:800px)": {
    padding: "0",
  },
});
export const CheckSection = styled(Stack)({
  gap: "15px",
});
export const CheckRow = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: "8px",
  "& .MuiTypography-body1": {
    fontSize: "14px",
    "@media screen and (max-width:1600px)": {
      fontSize: "12px",
    },
  },
  "& svg": {
    color: "#d7282f",
    fontSize: "16px",
    margin: "3px 0 0px",
  },
  "& span": {
    fontWeight: 600,
    margin: "0 0 10px",
    fontSize: "14px",
  },
});

/******* End Third section styling  *********/

/******* Start CRM & Chat Info styling *******/
export const LiveChatInfo = styled(Stack)({
  padding: "35px 0 0 18px",
  gap: "30px",
  "& .MuiTypography-h3": {
    fontSize: "18px",
    fontWeight: "700",
    color: "#231f20",
    padding: "0px 0 2px",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#000",
    padding: "4px 0",
    "@media screen and (max-width:1600px)": {
      fontSize: "13px",
    },
  },
  "@media screen and (max-width:899px)": {
    padding: "15px 0 0",
    gap: "10px",
  },
});
export const LiveChatinnData = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: "14px",
});
export const LiveChatinnBox = styled(Box)({
  "& svg": {
    fontSize: "15px",
    margin: "0 0 0 6px",
  },
});
export const LearnMoreTxt = styled(Typography)({
  display: "flex",
  alignItems: "center",
  padding: "8px 0px",
  "& a": {
    color: "#d7282f",
    display: "flex",
    alignItems: "center",
  },
});
/******* End CRM & Chat Info styling *******/

/******* Start Explore  of offerings styling *******/
export const ExploreBusiness = styled(Box)({
  textAlign: "center",
});
export const TotalCountBox = styled(Box)({
  width: "60%",
  margin: "3rem auto 0",
  "@media screen and (max-width:1600px)": {
    width: "100%",
  },
});
export const TotalCountCol = styled(Box)({
  // "& .MuiTypography-h5": {
  //   fontSize: "22px",
  //   color: "#D7282F",
  //   fontWeight: "700",
  //   padding: "10px 0",
  //   "@media screen and (max-width:1024px)": {
  //     fontSize: "18px",
  //   },
  // },
  // "& .MuiTypography-body1": {
  //   fontSize: "16px",
  //   color: "#000",
  // },
});
export const MultipleBoxSec = styled(Box)({
  // width: "1512px",
  width: "90%",
  gap: "16px",
  // flexWrap: "wrap",
  // display: "flex",
  margin: "1rem auto 0",
  maskImage:
    "linear-gradient(to right, transparent 0%, #d9d9d9 30%, #d9d9d9 60%, transparent 100%)",
  padding: "10px 0 20px",
  "& .colorbox1": {
    background: "#FFEBEC",
  },
  "& .colorbox2": {
    background: "#DFF8EE",
  },
  "& .colorbox3": {
    background: "#F5FFBD",
  },
  "& .colorbox4": {
    background: "#DDFBFE",
  },
  "& .colorbox5": {
    background: "#FFEBEC",
  },
  "& .colorbox6": {
    background: "#ededfd",
  },
});
export const SingleCol = styled(Box)({
  boxShadow:
    "0 0 0 1px #0e3f7e0f, 0 1px 1px -.5px #2a334608, 0 2px 2px -1px #2a33460a, 0 3px 3px -1.5px #2a33460a, 0 5px 5px -2.5px #2a334608, 0 10px 10px -5px #2a334608, 0 24px 24px -8px #2a334608",
  backgroundColor: "#fff",
  padding: "20px 10px",
  display: "flex",
  alignItems: "stretch",

  // minWidth: "180px",
  // maxWidth: "180px",
  minHeight: "145px",
  margin: "6px",
  "@media screen and (max-width:1600px)": {
    // minWidth: "150px",
    // maxWidth: "150px",
    padding: "10px",
  },
  borderRadius: "10px",

  "& img": {
    width: "25px",
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
    "@media screen and (max-width:1600px)": {
      fontSize: "12px",
    },
  },
});

export const Totalproducts = styled(Typography)({
  color: "#d7282f",
  fontSize: "16px",
  fontWeight: "600",
  padding: "10px 0 10px",
});
export const SmallColrBox1 = styled(Box)({
  borderRadius: "50px",
  padding: "7px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "70px",
  margin: "0 auto",
});

/******* End Explore  of offerings styling *******/

/******* start Send Message section styling  *********/
export const SendMessages = styled(Box)({
  backgroundImage:
    "url('https://d1oow2vyp2byq1.cloudfront.net/frontStatic/JRDKMTRi71YvmBqeB6BvjSlAEpneFmRoUM4gk4jO.webp')",
  height: "100%",
  width: "100%",
  position: "relative",
  padding: "3rem 0",
  backgroundSize: "100%",
  "@media screen and (max-width:1600px)": {
    padding: "1rem 0",
  },

  "@media screen and (max-width:900px)": {
    background: "#8d8d8d",
  },
});
export const SendMessagesBox = styled(Box)({
  backgroundColor: "#fff",
  padding: "16px",
  borderRadius: "10px",
});
export const SendMessagesInnerBox = styled(Box)({
  padding: "24px 0px",
});
export const QuotationTxt = styled(Box)({
  padding: "0 50px",
  "@media screen and (max-width:767px)": {
    padding: "20px 0 0",
  },
});

export const MessageHeading = styled(Typography)({
  color: "#d7282f",
  fontSize: "21px",
  fontWeight: "700",
});
export const MessageFormBox = styled(Stack)({
  gap: "20px",
  margin: "25px 0 12px 0",
});
export const GetQuotationBox = styled(Box)({
  margin: "15px 0 0 0",
});
export const AddAttachmntArea = styled(Box)({
  "& .MuiButton-root": {
    textTransform: "capitalize",
    color: "#d7282f",
    fontSize: "14px",
    paddingTop: 0,
    paddingBottom: 0,
    "&:hover": {
      background: "rgba(225, 40, 47, 0.04)",
    },
  },
});

export const MessageFormButton = styled(Button)({
  backgroundColor: "#d7282f",
  color: "#fff",
  borderRadius: "6px",
  padding: "0 16px",
  height: "38px",
  border: "1px solid #d7282f",
  transition: "all ease .3s",
  textTransform: "capitalize",
  "&:hover": {
    color: "#d7282f",
    backgroundColor: "#fff",
    border: "1px solid #d7282f",
    transition: "all ease .3s",
  },
  "@media screen and (max-width:1024px)": {
    padding: "2px 8px",
    fontSize: "14px",
  },
});
export const MessageText = styled(Typography)({
  fontSize: "30px",
  fontWeight: "600",
  color: "#fff",
  "@media screen and (max-width:767px)": {
    fontSize: "22px",
  },
});
export const MessageSubText = styled(Typography)({
  fontSize: "16px",
  color: "#fff",
  padding: "6px 0px 0",
  "@media screen and (max-width:767px)": {
    fontSize: "14px",
  },
});

export const ListItemBox = styled(ListItem)({
  paddingLeft: "0",
  color: "#fff",
});
export const Listitembutton = styled(ListItemButton)({
  paddingLeft: "0",
  paddingBottom: "0px",
  paddingTop: "0px",
});
export const ListitemIconBox = styled(ListItemIcon)({
  minWidth: "36px",
});
export const ListIcon = styled(TaskAltOutlinedIcon)({
  color: "#fff",
});

//******============ End Message section Styling ==============*******//
export const GridBackgroundBox = styled(Box)({
  background: "linear-gradient(270deg, #EFF9FF 0%, #ECF3FD 100%)",
  borderRadius: "10px",
});
export const GridimageBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  height: "286px",
  overflow: "hidden",
});
export const SignUpBtnBox = styled(Box)({
  display: "flex",
  justifyContent: "end",
  "@media screen and (max-width:900px)": {
    justifyContent: "center",
  },
});
export const SignUpBtn = styled(Button)({
  backgroundColor: "#fff",
  color: "#d7282f",
  borderRadius: "20px",
  textTransform: "capitalize",
  padding: "6px 30px",
  "&:hover": {
    backgroundColor: "#fff",
  },
});
/******============ Start Streamline ordering from search Styling ==============*******/
export const BoSearchImageBoxOuter = styled(Box)({
  display: "flex",
  alignItems: "end",
  justifyContent: "end",
});
export const SearchImageBox = styled(Box)({
  position: "relative",
  width: "630px",
  height: "400px",
  textAlign: "right",
  "& img": {
    width: "100%",
    height: "100%",
    position: "relative",
    objectFit: "cover",
    zIndex: 10,
  },
  "::before": {
    content: '""',
    position: "absolute",
    left: "-28px",
    bottom: "-104px",
    transform: "translateY(-50%)",
    width: "300px",
    height: "150px",
    background: `url('/assets/images/landing-page/dot-img.png') center top no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});
/******============ End Streamline ordering from search Styling ==============*******/

//******============ Start Global Market Styling ==============*******//
export const SliderBackground = styled(Box)({
  backgroundImage: `url('/assets/images/landing-page/SliderBG.svg')`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  "@media screen and (max-width:767px)": {
    "& .slick-arrow": {
      display: "none !important",
    },
  },
});
export const SliderContentGap = styled(Stack)({
  gap: "4px",
  "& .MuiTypography-body1": {
    fontSize: "13px",
    fontWeight: 600,
  },
});
export const LandingpageSliderBox = styled(Box)({
  boxShadow: "0px 0px 10px 0px #0000001A",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "10px",
  textAlign: "center",
  padding: "16px",
});
export const SliderDots = styled(Box)({
  height: "15px",
  width: "15px",
  borderRadius: "50%",
  backgroundColor: "#EAEAEA",
});
export const SliderDotsstyle = styled(List)({
  display: "flex",
});
export const SliderDotsListstyle = styled(ListItem)({
  display: "flex",
  gap: "6px",
  cursor: "pointer",
});
export const SliderDotsBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export const FlagImageStyle = styled(Box)({
  width: "80px",
  height: "60px",
  "& img": {
    width: "100%",
  },
});

//******============ End Global Market Styling ==============*******//

export const TestimonialSlider = styled(Box)({
  // maskImage: "linear-gradient(to right, transparent 0%, #d9d9d9 80%, #d9d9d9 90%, transparent 100%)",
  maskImage: "linear-gradient(to right, transparent, #00F5CB, transparent)",
  padding: "1rem 0 50px",
  "@media screen and (max-width:1400px)": {
    padding: "1rem 0 0",
  },

  "@media screen and (max-width:767px)": {
    maskImage: "none",
  },
});
export const TestimonialBox = styled(Box)({
  padding: "40px 0 0",
  background: "#FBF8F6",
});

export const TestimonialDataOuter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media screen and (max-width:767px)": {
    display: "block",
  },
});

export const TestimonialDataMainBox = styled(Box)({
  backgroundColor: "#fff",
  padding: "10px 20px 10px",
  borderRadius: "20px",
  maxWidth: 600,
  display: "flex",
  alignItems: "start",
  margin: "16px",
  position: "relative",
  "@media screen and (max-width:1600px)": {
    flexDirection: "column",
    margin: "6px",
  },
  "& .quoteimg": {
    position: "absolute",
    right: "15px",
    top: "15px",
    width: "25px",
    "@media screen and (max-width:1600px)": {
      width: "22px",
    },
  },
  "& .testi-image": {
    width: "200px",
    height: "200px",
    "@media screen and (max-width:1600px)": {
      width: "100px",
      height: "100px",
      margin: "0 auto",
    },
  },
});
export const TestimonialDataBox = styled(Box)({
  padding: "20px",
  "& .MuiTypography-body1": {
    fontSize: "13px",
    marginBottom: "5px",
    fontWeight: 600,
  },
  "& .MuiTypography-h6": {
    fontSize: "16px",
    fontWeight: 600,
  },
  "& .MuiTypography-subtitle2": {
    color: "#808080",
    fontSize: "12px",
    fontWeight: 400,
  },
  "@media screen and (max-width:1400px)": {
    padding: "10px 6px",
    textAlign: "center",
    "& .MuiTypography-root": {
      fontSize: "12px",
    },
  },
});
export const TestiminialButton = styled(IconButton)({
  position: "absolute",
  bottom: "-20px",
  zIndex: 1,
  color: "#d7282f",
  padding: "2px",
  "& svg": {
    fontSize: "15px",
    margin: "0 -2px 0 3px",
    stroke: "#d7282f",
    strokeWidth: 1,
    "@media screen and (max-width:1400px)": {
      margin: "0 -12px 0 3px",
    },
  },
  "&:hover": {
    color: "#d7282f",
  },
});

export const GetStarted = styled(Typography)({
  color: "#fff",
  fontSize: "14px",
  padding: "10px 0",
});
export const OurTopProducts = styled(Box)({
  padding: "2rem 0 1rem",
  "& .slick-list": {
    padding: "4px 0",
  },
  "& .productCenterInfo": {
    minHeight: "50px",
  },
  "& .MuiTypography-h4": {
    fontSize: "20px",
    color: "#231F20",
    fontWeight: 700,
    padding: "0 0 8px",
  },
  "@media screen and (max-width:600px)": {
    "& .slick-arrow": {
      display: "none !important",
    },
  },
});
export const RecentlyViewedProducts = styled(Box)({
  padding: "1rem 0",
  "& .slick-list": {
    padding: "4px 0",
  },
  "& .productCenterInfo": {
    minHeight: "50px",
  },
  "& .MuiTypography-h4": {
    fontSize: "20px",
    color: "#231F20",
    fontWeight: 700,
    padding: "0 0 8px",
  },
  "& .slick-track": { margin: "0" },
  "@media screen and (max-width:900px)": {
    "& .slick-arrow": {
      display: "none !important",
    },
  },
});
export const ButtonSize = styled(IconButton)({
  position: "absolute",
  top: "-35px",
  zIndex: 1,
  border: "1px solid #ddd",
  color: "#ddd",
  padding: "2px",
  "& svg": {
    fontSize: "15px",
    margin: "0 -2px 0 3px",
    "@media screen and (max-width:1400px)": {
      margin: "0 -2px 0 -6px",
    },
  },
  "&:hover": {
    color: "#d7282f",
  },
  "@media screen and (max-width:900px)": {
    display: "none",
  },
});
export const EasySourcingBox = styled(Box)({
  padding: "1rem 0 0",
  "& .MuiListItemIcon-root": {
    minWidth: "25px",
  },
  "& .MuiTypography-root": {
    fontSize: "14px",
    "@media screen and (max-width:1600px)": {
      fontSize: "13px",
    },
  },
  "& svg": {
    fontSize: "20px",
  },
  "& .MuiTypography-body1": {
    "& span": {
      fontWeight: 600,
    },
  },
});
export const SingleColInn = styled(Box)({
  width: "100%",
  position: "relative",
  height: "100px",
  overflow: "hidden",
  "& .MuiTypography-body1": {
    padding: "10px 0 0",
  },
});
export const LearnMoreBtn = styled(Button)({
  background: "#fff",
  textTransform: "capitalize",
  fontSize: "12px",
});
export const TotalProductCount = styled(Box)({
  transition: "opacity 1s ease",
  position: "absolute",
  bottom: "50px",
  left: 0,
  right: 0,
  // bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export const CategoryNameBox = styled(Box)({
  transition: "opacity 1s ease",
  // position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  // bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

//******============ End New Landing Page Styling ==============*******//

// Retargating page style Starts from here //
export const RetargatingBannerContainer = styled(Box)({
  // height: "800px",
  height: "85vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // backgroundImage: 'url("/assets/images/landing-page/retargatingBG5.webp")',
  backgroundImage:
    'url("https://d1oow2vyp2byq1.cloudfront.net/frontStatic/OeaG4xAFq4NkWnX2y7zqYXE8LD4lxPoc4Hsc1vf4.webp")',
  backgroundPosition: "center",
  color: "#fff",
  position: "relative",
  width: "100%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  "@media  (max-device-width: 900px) and (orientation: portrait)": {
    height: "50vh",
  },
  "@media screen and (max-width:767px)": { height: "60svh" },
  "& .RetargetSearchbar": {
    margin: "30px 0",
    borderRadius: "100px",
    "& .MuiInputBase-input": {
      background: "#fff",
      color: "#BDBDBD",
      borderRadius: "100px",
    },
    "& fieldset": {
      background: "transparent",
      border: "1px solid rgba(189, 189, 189, .5)!important",
      borderRadius: "100px",
      overflow: "hidden",
    },
  },
});
export const CenterDiv = styled(Box)({
  display: "grid",
  placeItems: "center",
});
export const RetargetTabsBox = styled(Box)({
  backgroundColor: "#fff",
  padding: "9px 10px",
  borderRadius: "10px",
  "@media screen and (max-width:600px)": {
    background: "transparent",
    width: "100%",
  },
});
export const RetargetTabs = styled(Tabs)({
  "& .MuiTabs-flexContainer": {
    display: "flex",
    justifyContent: "center !important",
  },
  "& .MuiButtonBase-root": {
    color: "#231F20",
    fontWeight: "600",
    fontSize: "20px",
    zIndex: "2",
    minWidth: "300px",
    textTransform: "capitalize",
    "@media screen and (max-width:1024px)": {
      fontSize: "16px",
      minWidth: "153px",
    },
    "@media screen and (max-width:600px)": { minWidth: "50%", color: "#fff" },
    "@media screen and (max-width:480px)": { minWidth: "auto", color: "#fff" },
  },
  "& .Mui-selected": {
    color: "#fff !important",
    fontWeight: "600",
    fontSize: "20px",
    "@media screen and (max-width:1024px)": { fontSize: "16px" },
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#d7282f",
    BorderRadius: "10px",
    height: "50px",
    borderRadius: "10px",
    "@media screen and (max-width:600px)": {
      height: "2px",
    },
  },
});
export const RetargetSearchBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: 1,
  width: "100%",
  maxWidth: "900px",
  margin: "30px 0",
  background: "transparent",
  borderRadius: "40px",
  justifyContent: "center",

  "@media screen and (max-width:767px)": {
    margin: "10px 0",
  },

  "& .MuiInputBase-input": {
    background: "#fff",
    color: "#717171",
    borderRadius: "100px 0px 0px 100px",
    padding: "16.5px 14px !important",
    "@media screen and (max-width:900px)": {
      padding: "9px",
    },
    "@media screen and (max-width:600px)": {
      padding: "11.5px 14px !important",
    },
  },
  "& .MuiInputBase-root": {
    paddingRight: "0",
  },
  "& fieldset": {
    background: "transparent",
    border: "1px solid rgba(189, 189, 189, .5)!important",
    borderRadius: "100px",
    padding: "16.5px 14px",
  },
  "& .seachbtn": {
    background: "#d7282f",
    height: "52px",
    width: "55px",
    borderRadius: "0 100px 100px 0",
    "@media screen and (max-width:600px)": {
      height: "43px",
    },
    "&:hover": { background: "#d7282f" },
    "& svg": {
      color: "#fff",
    },
  },
  "& .MuiFormControl-root": {
    "@media screen and (max-width:1024px)": { width: "75%" },
    "@media screen and (max-width:767px)": { width: "100%" },
  },
  // "& .MuiOutlinedInput-root": {
  //   padding: "16.5px 14px",
  // },
});
export const RetargetTab = styled(Tab)({});
export const RetargetFrequentlySearch = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: "10px",
  width: "100%",
  maxWidth: "800px",
  flexWrap: "wrap",
  justifyContent: "center",
  minHeight: "100.25px",
  "@media screen and (max-width:767px)": { gap: "4px", minHeight: "auto" },
});
export const RetargetFrequentlySearchList = styled(Button)({
  border: "1px solid #BDBDBD",
  background: "transparent",
  color: "#BDBDBD",
  borderRadius: "5px",
  transition: "all ease .3s",
  textTransform: "capitalize",
  padding: "1px 8px",
  fontSize: "13px",
  "&:hover": {
    border: "1px solid #fff",
    color: "#fff",
    transition: "all ease .3s",
  },
  "@media screen and (max-width:767px)": { fontSize: "12px" },
});
export const RetargetWelcomeBox = styled(Box)({
  margin: "40px 0 0 0",
  textAlign: "center",
});
// export const RetargetGridBox = styled(Box)({
//   margin: "40px 0 0 0",
//   textAlign: "center",
// });
// export const RetargetIconBox = styled(Box)({
//   height: "105px",
//   width: "105px",
//   borderRadius: "50%",
//   backgroundColor: "#FFF3F4",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// });
// export const RetargetContentBox = styled(Box)({
//   margin: "20px 0 0 0",
//   "& .MuiTypography-root": {
//     fontSize: "22px",
//     fontWeight: "600",
//     color: "#231F20",
//     transition: "all ease .3s",
//     "&:hover": {
//       color: "#d7282f",
//     },
//   },
// });
export const RetargetRedBG = styled(Box)({
  backgroundImage: "url('/assets/images/landing-page/retargatingGridBG.png')",
  height: "100%",
  width: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
});
export const RetargetRedBGPadding = styled(Box)({
  padding: "24px 0px",
});
export const RetargetRedBGContentHeading = styled(Box)({
  fontSize: "30px",
  fontWeight: "700",
  color: "#fff",
});
export const RetargetRedBGContentSubHeading = styled(Box)({
  fontSize: "22px",
  fontWeight: "700",
  color: "#fff",
});
export const RetargetViewMore = styled(Button)({
  backgroundColor: "#fff",
  color: "#d7282f",
  fontSize: "14px",
  fontWeight: "600",
  margin: "15px 0 0 0",
  padding: "6px 16px",
  "&:hover": { backgroundColor: "#fff" },
});
export const RetargetImageAbsoluteBox = styled(Box)({
  position: "relative",
});
export const RetargetSubHeading = styled(Typography)({
  fontSize: "24px",
  fontWeight: "700",
  color: "#231f20",
  margin: "0 0 20px 0px",
  "@media screen and (max-width:767px)": {
    fontSize: "18px",
    // margin: "0 0 0px 0px",
  },
  "@media screen and (max-width:600px)": { fontSize: "16px" },
});
export const ViewMoreBtn = styled(Button)({
  background: "#d7282f",
  color: "#fff",
  border: "1px solid #d7282f",
  textTransform: "capitalize",
  padding: "2px 12px",
  "&:hover": {
    border: "1px solid #d7282f",
    background: "#fff",
    color: "#d7282f",
  },
});
export const RetargetText = styled(Typography)({
  fontSize: "16px",
  fontWeight: "600",
  color: "#231f20",
  margin: "0 0 16px 0px",
});
export const RetargetRelativeBox = styled(Box)({
  position: "relative",
  height: "100%",
  "::before": {
    content: '""',
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    opacity: ".3",
    top: "0",
    borderRadius: "10px",
  },
});
export const RetargetImage = styled("img")({
  height: "100%",
  width: "100%",
  borderRadius: "10px",
  objectFit: "cover",
});
export const RetargetAbsoluteBox = styled(Box)({
  position: "absolute",
  bottom: "0px",
  padding: "20px",
});
export const RetargetAbsoluteTextHeading = styled(Box)({
  color: "#fff",
  fontSize: "16px",
  fontWeight: "700",
});
export const RetargetAbsoluteTextSubHeading = styled(Box)({
  color: "#fff",
  fontSize: "14px",
  fontWeight: "400",
});

export const BorderBox = styled(Box)({
  textAlign: "center",
  border: "1px solid #D8D8D8",
  borderRadius: "6px",
  padding: "5px 5px 10px",
  height: "100%",
  "& img": {
    width: "70px",
    borderRadius: "6px",
    height: "70px",
    objectFit: "contain",
  },
  "& .MuiTypography-h6": {
    fontSize: "12px",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "0",
    textTransform: "capitalize",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    display: "-webkit-box",
    "@media screen and (max-width:1600px)": {
      fontSize: "11px",
    },
  },
});

export const TopRatedCompaniesBox = styled(Box)({
  borderRadius: "15px",
  border: "1px solid #DADADA",
  padding: "1rem",
  background: "#FBF8F6",
  height: "100%",
  "@media screen and (max-width:767px)": {
    background: "#f7f7f7",
  },
});
export const TopRatedCompaniesInner = styled(Box)({
  display: "flex",
  // alignItems: "center",
  position: "relative",
  gap: "10px",
  "@media screen and (max-width:480px)": {
    flexDirection: "column",
    alignItems: "center",
  },
});

// export const ChatNow = styled(Box)({
//   position: "absolute",
//   top: 0,
//   right: 0,
//   border: "1px solid #D8D8D8",
//   borderRadius: "5px",
//   padding: "2px 4px",
//   cursor: "pointer",
//   "& .MuiTypography-root": {
//     fontSize: "14px",
//     fontWeight: 600,
//   },
//   "& a": {
//     color: "#231F20",
//     "&:hover": {
//       color: "#d7282f"
//     }
//   }
// });

export const ComNameLogoInfo = styled(Box)({
  width: "75px",
  height: "75px",
  // width: "180px",
  // height: "71px",
  aspectRatio: "1:1",
  border: "1px solid #DDDDDD",
  "& img": { width: "100%", objectFit: "contain", height: "100%" },
  "@media screen and (max-width:767px)": {
    textAlign: "center",
  },
  "@media screen and (max-width:480px)": {
    width: "100%",
    height: "140px",
  },
});
export const CompanyOriginInfo = styled(Box)({
  "@media screen and (max-width:480px)": {
    textAlign: "center",
  },
  "& .MuiTypography-h5": {
    fontSize: "20px",
    color: "#231F20",
    fontWeight: "600",
    textTransform: "capitalize",
    "@media screen and (max-width:1600px)": {
      fontSize: "16px",
    },
  },
});
export const OriginDate = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
  padding: "4px 0",
  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#4A4A4A",
  },
  "& .MuiTypography-body2": {
    fontSize: "12px",
    color: "#4A4A4A",
  },
  "@media screen and (max-width:480px)": {
    justifyContent: "center",
  },
  "@media screen and (max-width:330px)": {
    flexDirection: "column",
  },
});
export const Since = styled(Typography)({
  fontSize: "12px !important",
});
export const UserStatus = styled(Box)({
  fontSize: "11px",
  padding: "3px 5px",
  borderRadius: "6px",
  background: "#D4F5CF",
  color: "#3E8C32",
});
export const CompanyBusinessType = styled(Typography)({
  fontSize: "12px",
  color: "#4A4A4A",
  "& span": {
    fontWeight: 600,
  },
});
export const CompanyRating = styled(Box)({
  padding: "2px 0",
  "& .MuiTypography-body1": {
    fontSize: "12px",
    color: "#4A4A4A",
  },
  "& .MuiTypography-h6": {
    fontSize: "12px",
  },
  "& span": {
    fontWeight: 600,
  },
  "& .ratingNum": {
    color: "#000",
  },
});
export const ManufactureImageBox = styled(Box)({
  margin: "10px 0 0 0",
  borderRadius: "10px",
  overflow: "hidden",
  "@media screen and (max-width:600px)": {
    height: "120px",
  },
});
export const ManufactureImage = styled("img")({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "10px",
});
export const EqualLengthGrids = styled(Grid)({
  display: "flex",
  alignItems: "stretch",
  "@media screen and (max-width:900px)": {
    display: "block",
  },
});
export const ManufactureImagesBox = styled(Box)({
  "@media screen and (max-width:900px)": {
    height: "300px",
  },
});
export const ListOuterBox = styled(Box)({
  overflow: "auto",
  flexGrow: 1,
  "&::-webkit-scrollbar": {
    width: "3px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d2d2d2",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#6d6d6d",
  },
});
// export const ListOuterBox = styled(Box)({
//   height: "225px",
//   overflow: "auto",
//   "&::-webkit-scrollbar": {
//     width: "3px",
//   },
//   "&::-webkit-scrollbar-track": {
//     backgroundColor: "#f1f1f1",
//     borderRadius: "10px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "#d2d2d2",
//     borderRadius: "10px",
//   },
//   "&::-webkit-scrollbar-thumb:hover": {
//     backgroundColor: "#6d6d6d",
//   },
// });
export const ListBox = styled(List)({
  padding: "0px",
});
export const RetargetListItemBox = styled(ListItem)({
  fontSize: "14px",
  fontWeight: "700",
  color: "#231f20",
  cursor: "pointer",
  transition: "all ease .3s",
  paddingLeft: "0px",
  "&:hover": {
    color: "#d7282f",
    transition: "all ease .3s",
  },
});
// ----------------------------------------------------------
export const LeftCategorySide = styled(Box)({
  height: "100%",
  // paddingLeft:"20px",
  filter: "drop-shadow(rgb(0, 0, 0, 0.05) -4px -3px 5px)",
  position: "relative",
  zIndex: "10",
});
export const MainSectorHeading = styled(Box)({
  background: "#d7282f",
  borderRadius: "10px 0 0",
  "& .MuiTypography-root": {
    fontSize: "18px",
    color: "#fff",
    fontWeight: 600,
    padding: "9px",
    "@media screen and (max-width:1200px)": {
      fontSize: "14px",
    },
  },
});
export const MoreSubCategoryListStyling = styled(List)({
  // height: "350px",
  height: "92%",
  width: "100%",
  // boxShadow: "rgba(50, 50, 105, 0.15) 0px 1px 2px 0px,rgba(0, 0, 0, 0.05) 0px -1px 1px 0px",
  background: "#fff",
  // borderRight: "1px solid #e3e3e3",
  // overflowY: "auto",
  "& .MuiTypography-root:hover": {
    color: "#d7282f",
  },
  "&::-webkit-scrollbar": {
    width: "0.2em",
    height: "0.2em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#dedede",
    borderRadius: "4px",
  },
  // "& .MuiButtonBase-root": {
  //   padding: "6px 10px"
  // },
  "& .MuiTypography-root": {
    fontSize: "13px",
  },
  "& .MuiDivider-inset": {
    marginLeft: "16px",
  },
  "& .listItem": {
    position: "relative",
  },

  "& .listItem:hover ": {
    "& .subMenu": {
      display: "block",
      opacity: 1,
    },
  },

  "& .subMenu": {
    display: "none",
    position: "absolute",
    top: 0,
    left: "100%",
    backgroundColor: "white",
    transition: "opacity 0.3s ease",
    boxShadow:
      "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
    zIndex: 1,
    opacity: 0,
    minWidth: "200px",
  },
  "& .removePoper": {
    "@media screen and (max-width:900px)": {
      display: "none",
    },
  },
});
export const SubMenuText = styled(Typography)({
  padding: "5px 16px",
});
export const SubcategorRow = styled(Box)({
  padding: "30px 0 24px",
  "@media screen and (max-width:767px)": {
    padding: "10px 7px",
  },
});
export const InnerContentBox = styled(Box)({
  textAlign: "center",
  padding: "0 0 10px",
  "&:hover img": {
    // transform: "scale(1.1)",
    transform: "scale(1.05)",
  },
});
export const MyImageBox = styled(Box)({
  width: "160px",
  height: "160px",
  margin: "0 auto",
  border: "1px solid #dedede",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  overflow: "hidden",
  "@media screen and (max-width:1600px)": {
    width: "100%",
    height: "140px",
  },

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
    padding: "3px",
    transform: "scale(1)",
    transition: ".3s ease-in-out",
  },
});
export const MyInfoBox = styled(Box)({
  padding: "0 10px",
});
export const ImageHeading = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#000",
  padding: "10px 0 5px",
  fontWeight: 700,
  cursor: "pointer",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  minHeight: "54px",
  display: "-webkit-box",
  "@media screen and (max-width:1600px)": {
    fontSize: "12px",
    padding: "10px 0 0 5px",
    minHeight: "32px",
  },
  "@media screen and (max-width:1200px)": {
    fontSize: "11px",
    padding: "10px 0 5px",
  },
  "@media screen and (max-width:445px)": {
    fontSize: "11px",
    padding: "10px 0 0 5px",
    fontWeight: 600,
  },
}));
export const ImageInfo = styled(Typography)(() => ({
  fontSize: "12px",
  color: "#000",
  cursor: "pointer",
  lineHeight: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  display: "-webkit-box",
  "@media screen and (max-width:1600px)": {
    fontSize: "11px",
  },
  //   "@media screen and (max-width:930px)": {
  //  display:"none"
  //   }
}));
export const CommonSectionBox = styled(Box)({
  background: "#fff",
  padding: "20px 20px 10px",
  marginBottom: "30px",
  "& h2": {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: 700,
    color: "#231F20",
    padding: "0 0 30px",
    "@media screen and (max-width:1600px)": {
      fontSize: "20px",
    },
  },
});
export const PageSmallHeading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "700",
  padding: "0px 0 5px",
  // textAlign:"center",
});
export const CommonInnerContent = styled(Box)({
  padding: "10px 0",
});
export const CompanyProductList = styled(Box)({
  margin: "20px 0",
});
export const CompanyProductItem = styled(Box)({
  textAlign: "center",
  border: "1px solid #D8D8D8",
  borderRadius: "6px",
  minHeight: "175px",
  padding: "5px 5px 10px",
  height: "100%",
  "& img": {
    width: "70px",
    borderRadius: "6px",
    height: "70px",
    objectFit: "contain",
  },
  "& .MuiTypography-h6": {
    fontSize: "12px",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "0",
    textTransform: "capitalize",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    display: "-webkit-box",
    "@media screen and (max-width:1600px)": {
      fontSize: "11px",
    },
  },
});
export const SecrorMinMaxOrder = styled(Box)({
  "& .MuiTypography-h5": {
    fontSize: "14px",
    fontWeight: "600",
    color: "#d7282f",
    padding: "3px 0",
  },
  fontSize: "12px",
});

export const RetargettabOuter = styled(Box)({
  width: "100%",
  position: "relative",
  padding: "1rem 0",
  "& .MuiTabs-root": {
    minHeight: "50px",
    borderBottom: "1px solid #dedede",
  },
  "& .in-whiteBox": {
    background: "#fff",
  },
});
export const Retargettabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#d7282f",
    height: "1px",
  },
  "& .Mui-selected": {
    color: "#d7282f !important",
  },

  "& .MuiButtonBase-root": {
    fontWeight: "700",
    color: "#231f20",
    textTransform: "capitalize",
  },
});
export const RetargetTabBtn = styled(Tab)({
  position: "relative",
});

export const RetargetimageandcontentBox = styled(Box)({
  backgroundImage: "url('/assets/images/landing-page/redBG.jpg')",
  height: "100%",
  width: "100%",
  position: "relative",
  "& .BigText": {
    fontSize: "48px",
    fontWeight: "700",
    "@media screen and (max-width:1024px)": { fontSize: "26px" },
    "@media screen and (max-width:900px)": { fontSize: "20px" },
    "@media screen and (max-width:600px)": { fontSize: "16px" },
  },
  "& .BigText2": {
    fontSize: "32px",
    fontWeight: "600",
    "@media screen and (max-width:1024px)": { fontSize: "22px" },
    "@media screen and (max-width:900px)": { fontSize: "18px" },
    "@media screen and (max-width:600px)": { fontSize: "14px" },
  },
  "& .hidegrid": {
    "@media screen and (max-width:1024px)": { display: "none" },
  },
});
export const RelativeBox = styled(Box)({
  position: "relative",
  overflow: "hidden",
});
export const HalfimageBox = styled(Box)({
  display: "flex",
});
export const HalfimageImg = styled("img")({
  width: "100%",
  objectFit: "cover",
});
export const HalfimageAbsoluteBox = styled(Box)({
  position: "absolute",
  right: "0px",
  top: "0",
});

export const RightFixedMenus = styled(Box)({
  // position: "fixed",
  // right: 0,
  // top: "50%",
  // transform: "translateY(-50%)",
  // width: "46px",
  cursor: "pointer",
  zIndex: 99999,
  position: "fixed",
  right: 0,
  top: "40%",
  backgroundColor: "#d32f2f",
  color: "#fff",
  borderRadius: "4px 0 0 4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textTransform: "none",
  minWidth: "38px",
  padding: "10px 0",
  transition: "height 1s ease, transform 1s ease",
  "&:hover": {
    backgroundColor: "#b71c1c",
  },
  "& .MuiTypography-body1": {
    fontSize: "15px",
    padding: "5px",
    transform: "rotate(180deg)",
    fontWeight: 600,
  },
  "& span": {
    writingMode: "vertical-rl",
    whiteSpace: "nowrap",
    width: "max-content",
  },
});
export const InnMenuData = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  backgroundColor: "#d7282f",
  borderRadius: "100px 0 0 100px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  padding: "27px 8px",
  margin: "0 0 0 5px",
  textAlign: "center",
  "& i": {
    fontSize: "18px",
    cursor: "pointer",
  },
  "& .icon-with-border": {
    position: "relative",
    display: "inline-block",
    paddingBottom: "4px",
  },

  "& .icon-with-border::before": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: "#FF9A9E",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease-in-out",
  },

  "& .icon-with-border:hover::before": {
    transform: "scaleX(1)",
  },
});
export const FixbarMenusTypeStyle = styled(Box)({
  height: "100%",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 100,
  right: 0,
  marginTop: 2,
  zIndex: 9999,
});

/*******========================= Blog Styling Here =============================******/
export const LandingNewsSection = styled(Box)({
  "& .MuiTypography-h5": {
    fontWeight: "700",
    fontSize: "16px",
  },
  "& .MuiTypography-body1": {
    fontSize: "12px",
    padding: "4px 0",
  },
});
export const MainFeedAear = styled(Box)({
  padding: "1.5rem 0 0",
});
export const LandingNewsItem = styled(Box)({
  overflow: "hidden",
  "&:hover img": {
    filter: " brightness(100%)",
    transform: "scale(1.05)",
  },
  "& img": {
    width: "100%",
    transition: "transform 1s, filter 1.5s ease-in-out",
    transformOrigin: "center center",
    filter: "brightness(50%)",
  },
  "& .MuiTypography-h4": {
    fontWeight: "700",
    fontSize: "19px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "0",
    textTransform: "capitalize",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    minHeight: "35px",
    display: "-webkit-box",
    "@media screen and (max-width:1600px)": {
      fontSize: "14px",
    },
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
    padding: "4px 0",
    "@media screen and (max-width:1600px)": {
      fontSize: "13px",
    },
  },
  "& .datePlace": {
    fontWeight: "600",
    fontSize: "12px",
    padding: "10px 0",
  },
});

export const BlogImgBox = styled(Box)({
  height: "260px",
  overflow: "hidden",
  borderRadius: "5px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
export const BlogReadMore = styled(Box)({
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: "600",
  gap: "6px",
  padding: "5px 0 0",
  "& svg": {
    fontSize: "14px",
  },
  "& a": {
    color: "#000",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    "&:hover": {
      color: "#d7282f",
    },
  },
});
export const CategoryinBox = styled(Box)({
  "@media screen and (max-width:767px)": {
    margin: "30px 0 0",
  },
});

/****======= Start Trade show styling here =======*****/
export const TradeshowSection = styled(Box)({
  textAlign: "right",
});
export const TradeShowFullImage = styled(Box)({
  position: "relative",
  width: "100%",
  height: 600,
  margin: "1rem 0 0",
  borderRadius: "15px",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  "@media screen and (max-width:899px)": {
    height: 400,
  },
});
export const OnlyImageOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "linear-gradient(180deg, rgba(0, 0, 0, 0) -2%, rgba(0, 0, 0, 1) 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.8,
});

export const TradeShowSmallImage = styled(Box)({
  position: "relative",
  width: "100%",
  height: 300,
  borderRadius: "15px",
  overflow: "hidden",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
export const overlayText = styled(Box)({});
export const OverlayCenter = styled(Box)({
  position: "absolute",
  bottom: "50%",
  left: "50%",
  transform: "translate(-50%, 50%)",
  textAlign: "center",
  color: "white",
  backgroundColor: "rgba(215, 40, 47, 0.5)",
  border: "2px solid #fff",
  borderRadius: "5px",
  width: "32vw",
  padding: "35px",
  "@media screen and (max-width:900px)": {
    width: "70vw",
    padding: "35px",
  },

  "& .MuiTypography-h3": {
    fontWeight: "700",
    fontSize: "36px",
    "@media screen and (max-width:1600px)": {
      fontSize: "26px",
    },
    "@media screen and (max-width:900px)": {
      fontSize: "20px",
    },
    padding: "0 0 18px",
  },
  "& .MuiTypography-subtitle1": {
    fontSize: "20px",
    "@media screen and (max-width:1600px)": {
      fontSize: "15px",
    },
    "@media screen and (max-width:900px)": {
      fontSize: "14px",
    },
  },
  "& span": {
    margin: "0 0 0 1rem",
  },
});
export const OverlaySmall = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  color: "white",
  background:
    "linear-gradient(180deg, rgba(0, 0, 0, 0) -2%, rgba(0, 0, 0, 1) 100%)",
  padding: "45px 0 25px",
  textAlign: "center",
  "& .MuiTypography-h3": {
    fontWeight: "700",
    fontSize: "21px",
  },
  "& .MuiTypography-body1": {
    fontSize: "16px",
  },
  "& span": {
    margin: "0 0 0 1rem",
  },
});

/****======= End Trade show styling here =======*****/

/****======= start Trade show detail============****** */
export const TradeShowDetailBorder = styled(Box)({
  border: "1px solid #C5C5C5",
  borderRadius: "10px",
  "& .removeBorder": {
    borderBottom: "0",
  },
});
export const BorderandSpacing = styled(Box)({
  borderBottom: "1px solid #C5C5C5",
  padding: "0 0 6px 0",
  "& .tradeShowText": {
    "@media screen and (max-width:900px)": {
      padding: "0 0 0 16px",
    },
  },
});
export const Textspacing = styled(Box)({
  padding: "0 0 0 16px",
});
export const TradeshowHeading = styled(Box)({
  fontSize: "14px",
  fontWeight: "700",
  color: "#231f20",
});
export const TradeshowText = styled(Box)({
  fontSize: "14px",
  fontWeight: "400",
  color: "#231f20",
  "& .facebook": { color: "#1877F2" },
  "& .linedin": { color: "#0A66C2" },
  "& .MuiTypography-body1": {
    fontSize: "14px",
    padding: "0 0 4px",
  },
});
export const ViewMoreBTN = styled(Button)({
  fontSize: "12px",
  fontWeight: "400",
  color: "#fff",
  border: "1px solid #d7282f",
  borderRadius: "4px",
  padding: "3px 12px",
  textTransform: "capitalize",
  transition: "all ease .3s",
  background: "#d7282f",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#d7282f",
    transition: "all ease .3s",
  },
});
export const TradeShowNameBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export const TradeShowName = styled(Typography)({
  fontSize: "36px",
  fontWeight: "700",
  color: "#231f20",
  textAlign: "center",
  "@media screen and (max-width:1200px)": {
    fontSize: "26px",
  },
  "@media screen and (max-width:900px)": {
    fontSize: "20px",
  },
  "@media screen and (max-width:767px)": {
    fontSize: "18px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "16px",
  },
});
export const TradeShowSliderImageBox = styled(Box)({
  height: "500px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  borderRadius: "8px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    "@media screen and (max-width:900px)": {
      height: "300px",
    },
  },
  "@media screen and (max-width:900px)": {
    height: "auto",
  },
});
export const TradeShowSliderBox = styled(Box)({
  borderRadius: "20px",
  border: "1px solid #ddd",
  padding: "8px",
  overflow: "hidden",
  "& .slick-dots": {
    bottom: "20px",
    "& button": {
      "&::before": {
        color: "#e2e2e2",
        opacity: 1,
        fontSize: "14px",
      },
    },
    "& .slick-active": {
      "& button": {
        "&::before": {
          color: "#d7282f",
          opacity: 1,
        },
      },
    },
  },
});

export const TradeshowSocialLinks = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "center",
});

export const IcoFacebook = styled(FacebookIcon)(() => ({
  height: "34px",
  width: "34px",
  borderRadius: "50%",
  border: "1px solid #DDDDDD",
  padding: "5px",
  color: "#1877f2",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    borderColor: "#cbc8c8",
  },
}));

export const IcoTwitter = styled(TwitterIcon)(() => ({
  height: "34px",
  width: "34px",
  borderRadius: "50%",
  border: "1px solid #DDDDDD",
  padding: "5px",
  color: "#1DA1F2",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    borderColor: "#cbc8c8",
  },
}));
export const IcoLinkedIn = styled(LinkedInIcon)(() => ({
  height: "34px",
  width: "34px",
  borderRadius: "50%",
  border: "1px solid #DDDDDD",
  padding: "5px",
  color: "#0072b1",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    borderColor: "#cbc8c8",
  },
}));
export const IcoInstagram = styled(InstagramIcon)(() => ({
  height: "34px",
  width: "34px",
  borderRadius: "50%",
  border: "1px solid #DDDDDD",
  padding: "5px",
  color: "#c92bb7",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    borderColor: "#cbc8c8",
  },
}));

/****======= end Trade show detail============****** */
// add attachment
export const AttachmentOuter = styled(Box)({
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
});
export const AttachmentBox = styled("span")({
  border: "1px solid rgb(197, 197, 197)",
  color: "rgb(68, 68, 68)",
  fontSize: "13px",
  borderRadius: "4px",
  gap: "5px",
  display: "inline-flex",
  alignItems: "center",
  padding: "7px 3px",
  margin:'6px 0 0 0'
});
export const AttachmentName = styled("span")({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "inline-block",
  maxWidth: "100px",
});
// trade show Replacement-----------------------------------------------------------------------------
export const SmartSellerOuter = styled(Box)({
  margin: "24px 0 0 0",
  "@media screen and (max-width:1200px)": { margin: "18px 0 0 0" },
  "@media screen and (max-width:900px)": { margin: "16px 0 0 0" },
  "@media screen and (max-width:767px)": { margin: "14px 0 0 0" },
});
export const InnerGrid = styled(Stack)({
  gap: "5px",
  "& .heading": {
    fontSize: "26px",
    color: "#231f20",
    fontWeight: "700",
    padding: "0",
    "@media screen and (max-width:1200px)": { fontSize: "22px" },
    "@media screen and (max-width:900px)": { fontSize: "20px" },
    "@media screen and (max-width:767px)": { fontSize: "18px" },
  },
  "& .text": {
    fontSize: "16px",
    color: "#000",
    fontWeight: "400",
    padding: "0",
    "@media screen and (max-width:767px)": { fontSize: "14px" },
  },
  "& img": {
    height: "50px",
    width: "50px",
  },
});
export const JoinAsSupllier = styled(Box)({
  display: "flex",
  justifyContent: "center",
  "& button": {
    background: "#d7282f",
    color: "#fff",
    fontSize: "14px",
    borderRadius: "4px",
    padding: "6px 12px",
    border: "1px solid #d7282f",
    textTransform: 'capitalize',
    "&:hover": {
      background: "#fff",
      color: "#d7282f",
      border: "1px solid #d7282f",
    },
  },
});
