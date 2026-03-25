import { Box, ButtonBase, Grid, IconButton, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";

export const Bannerheading = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "60px !important",
  color: "#FFFFFF",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  "@media screen and (max-width: 1500px)": {
    fontSize: "50px !important",
  },
  "@media screen and (max-width: 1300px)": {
    fontSize: "33px !important",
  },
  "@media screen and (max-width: 600px)": {
    fontSize: "25px !important",
    width: "100%",
    textAlign: "center",
  },
}));
export const SectionWhiteBox = styled(Box)({
  background: "#fff",
});

export const SectionColoredBox = styled(Box)({
  background: "#FBF8F6",
});

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

export const Redtext = styled(Typography)(() => ({
  fontWeight: "700 ",
  fontSize: "20px",
  color: "#D7282F",
  textTransform: "uppercase",
  "@media screen and (max-width: 1500px)": {
    fontSize: "15px !important",
  },
}));

export const Subheading = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "35px !important",
  color: "#4A4A4A",
  textTransform: "capitalize",
  "@media screen and (max-width: 1500px)": {
    fontSize: "25px !important",
  },
  "@media screen and (max-width: 1200px)": {
    fontSize: "18px !important",
  },
}));

export const Headings = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "30px !important",
  color: "#4A4A4A",
  marginTop: "22px !important",
  textTransform: "capitalize",
  "@media screen and (max-width: 1500px)": {
    fontSize: "22px !important",
  },
  "@media screen and (max-width: 1300px)": {
    fontSize: "20px !important",
  },
}));

export const Headingtexts = styled(Typography)(() => ({
  fontWeight: "400 !important",
  fontSize: "13px !important",
  color: "#4A4A4A",
  marginTop: "15px !important",
}));

export const Img = styled("img")(() => ({
  position: "absolute",
  width: "100%",
  "@media screen and (max-width: 1600px)": {
    width: "70%",
  },
  "@media screen and (max-width: 767px)": {
    position: "relative",
  },
}));

export const Img2 = styled("img")(() => ({
  position: "absolute",
  height: "79%",
  left: "17%",
  top: "8%",
  width: "66%",
  "@media screen and (max-width: 1600px)": {
    position: "absolute",
    height: "57%",
    left: "12%",
    top: "6%",
    width: "46%",
  },
}));

export const Sectionheading = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "20px !important",
  color: "#D7282F",
}));

export const SectionSubheading = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "45px !important",
  lineHeight: "60px !important",
  color: "#231F20",
  textTransform: "uppercase",
  "@media screen and (max-width: 1600px)": {
    fontSize: "25px!important",
    lineHeight: "normal !important",
    padding: "6px 0 12px",
  },
  "@media screen and (max-width: 899px)": {
    fontSize: "18px!important",
  },
}));

export const Sectionpara = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "15px !important",
  color: "#4A4A4A",
  marginTop: "10px",
}));


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

export const Fourcolumns = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "40px !important",
  color: "#231F20",
  marginTop: "10px !important",
}));

export const Fourcolumnstext = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "13.5px !important",
  color: "#231F20",
}));

export const ButtonoverCard = styled(ButtonBase)(() => ({
  border: "1px solid #CDCDCD",
  fontWeight: "600 !important",
  fontSize: "16px !important",
  textAlign: "center",
  borderRadius: "6px !important",
  padding: "13px !important",
  marginTop: "8% !important",
  backgroundColor: "white",
  left: "0",
  right: "0",
  color: "#D7282F",
}));

export const HeadingBig = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "20px !important",
  color: "#D7282F",
  textTransform: "uppercase",
}));

export const HeadingBigSub = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "35px !important",
  "@media screen and (max-width: 1500px)": {
    fontSize: "25px !important",
  },
  "@media screen and (max-width: 1300px)": {
    fontSize: "18px !important",
  },
}));
export const Nextsection = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "22px !important",
  color: "#231F20",
  textTransform: "capitalize",
}));
export const Nextsection2 = styled(Typography)(() => ({
  fontWeight: "400 !important",
  fontSize: "15px !important",
  color: "#4A4A4A",
  marginTop: '12px'
}));
export const Nextsection3 = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "18px !important",
  color: "#4A4A4A",
}));

export const Ourmission = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "25px !important",
  color: "#231F20",
  "& .css-ahj2mt-MuiTypography-root": {
    fontWeight: "700 !important",
    fontSize: "25px !important",
    color: "#D7282F",
  },
}));
export const Ourmissionpara = styled(Typography)(() => ({
  fontWeight: "400 !important",
  fontSize: "15px !important",
  color: "#4A4A4A",
  marginTop: "15px !important",
}));

export const Listheading = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "18px !important",
  color: "#4A4A4A",
  marginTop: "20px !important",
}));
export const Our = styled("span")(() => ({
  color: "#d7282f",
}));
export const Aboutcompany = styled(Grid)(() => ({
  color: "#d7282f",
}));
export const Ul = styled('ul')(() => ({
  margin: '16px 30px 0px'
}));
export const Li = styled('li')(() => ({
  margin: '12px 0px',
  color: '#4a4a4a'
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
    backgroundColor: 'rgba(0,0,0,.66)',
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
export const Pagecontent = styled(Box)(() => ({
  paddingTop: "60px",
  paddingBottom: "80px",
  backgroundColor: "#FCF8F8",
  "@media screen and (max-width: 1500px)": {
    paddingTop: "40px",
  },
  "@media screen and (max-width: 1300px)": {
    paddingTop: "25px",
  },
}));
export const Boxcontent = styled(Box)(() => ({
  border: "1px solid #E4E4E4",
  borderRadius: "10px",
  padding: "20px",
  backgroundColor: "white",
  "@media screen and (max-width: 1500px)": {
    padding: "10px",
  },
  "@media screen and (max-width: 600px)": {
    padding: "20px",
  },
}));
export const Icons = styled('img')(() => ({
  "@media screen and (max-width: 1300px)": {
    width: "70px",
  },
}));
export const Aboutbackground = styled(Grid)(() => ({
  backgroundImage: `URL('/assets/shadebg.svg')`,
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
      backgroundColor: "white",
      backgroundSize: "cover",
      "@media screen and (max-width: 899px)": {
        paddingBottom: "0px !important",
      },
}));
export const AboutcompanyTwo = styled(Grid)(() => ({
  "@media screen and (max-width: 899px)": {
    padding: "20px 20px 20px 50px !important",
  },
}));
export const Invisiblebg = styled(Grid)(() => ({
  backgroundImage: `URL('/assets/invisible.svg')`,
  backgroundPosition: "right",
  backgroundSize: "cover",
  backgroundColor: "white",
  paddingBottom: "70px",
  "@media screen and (max-width: 1200px)": {
    padding: "30px 30px 20px !important",
  },
}));

export const useStyles = makeStyles()((theme) => {
  return {
    spantext: {
      position: "relative",
    },
    spantext2: {
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
    },
    spantext3: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    spantext4: {
      position: "absolute",
      top: "65%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      "@media (max-width: 900px)": {
        top: "80%",
      },
      "@media (max-width: 600px)": {
        top: "95%",
      },
    },
    bglaptop: {
      backgroundImage: `URL('')`,
      height: "555px",
      width: "1031.57px",
      backgroundRepeat: "no-repeat",
      position: "relative",
      marginLeft: "15px",
      "@media (max-width: 1500px)": {
        width: "700.57px",
        height: "380px",
      },
      "@media (max-width: 1200px)": {
        width: "550px",
        height: "300px",
      },
      "@media (max-width: 600px)": {
        width: "100%",
        height: "210px",
      },
    },
    supp: {
      color: "#D7282F",
      fontSize: "40px !important",
    },
    borderline: {
      position: "absolute",
      bottom: "70px",
      height: 1,
      background: "red",
    },
    spantext5: {

    },
    imgstyle: {
      width: "100%",
      height: "378px",
      borderRadius: "20px",
      "@media screen and (max-width:600px)": {
        height: "100%",
        borderRadius: "20px",
      },
    },
    dangerbg: {
      backgroundImage: `URL('/assets/dangerbg.svg')`,
    },
    map: {
      backgroundImage: `URL('/assets/dangermap.svg')`,

      overflow: "hidden",
      width: "100%",
    },
    maplines: {
      width: "80%",
      left: "10%",
      top: "56px",
      position: "relative",
    },
    bgimage: {
      backgroundImage: `URL('/assets/footerbg.svg')`,
      backgroundColor: "#231F20",
      color: "white",
      px: "10",
    },
    borderr: {
      height: "2px",
      width: "100px",
      backgroundColor: "#FF000A",
      borderRadius: "10px",
      margin: "14px 0px",
    },
    aboutbackground: {
      backgroundImage: `URL('/assets/shadebg.svg')`,
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
      backgroundColor: "white",
      backgroundSize: "cover",
      "@media screen and (max-width: 899px)": {
        paddingBottom: "0px !important",
      },
    },
    invisible: {
      backgroundImage: `URL('/assets/invisible.svg')`,
      backgroundPosition: "right",
      backgroundSize: "cover",
      backgroundColor: "white",
      paddingBottom: "70px",
      "@media screen and (max-width: 1200px)": {
        padding: "30px 30px 20px !important",
      },
    },
    styletabs: {
      borderBottom: "2px solid #DBDBDB !important",
      fontWeight: 600,
      fontSize: "24px !important",
      marginLeft: "7% !important",
      "@media screen and (max-width: 1500px)": {
        fontSize: "16px !Important",
      },
      "@media screen and (max-width: 899px)": {
        marginLeft: "2% !important",
      },
    },
    tabspace: {
      "@media screen and (max-width: 1500px)": {
        paddingLeft: "30px !Important",
      },
    },
    listt: {
      marginTop: "30px !important",
      display: "flex",
      "@media screen and (max-width: 1500px)": {
        fontSize: "16px",
        marginTop: "8px !important",
      },
      "@media screen and (max-width:600px)": {
        textAlign: "left",
      },
    },
    footerheadings: {
      fontWeight: 400,
      fontSize: "15px",
      marginTop: "20px !important",
    },
    footerlist: {
      fontWeight: 400,
      fontSize: "15px",
      marginTop: "5px !important",
      marginBottom: "5px !important",
    },
    footerlasttext: {
      textAlign: "center",
      fontWeight: 400,
      fontSize: "15px",
      lineHeight: "20.43px",
    },
    heads: {
      fontWeight: 600,
      fontSize: "25px",
      lineHeight: "34.05px",
    },
    boxcontent: {
      border: "1px solid #E4E4E4",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "white",
      "@media screen and (max-width: 1500px)": {
        padding: "10px",
      },
      "@media screen and (max-width: 600px)": {
        padding: "20px",
      },
    },
    WeAreProud: {
      fontSize: "18px",
      lineHeight: "40px",
      color: "#4A4A4A",
      marginTop: "20px",
      marginBottom: "10px !important",
    },
    footerlistmb: {
      marginBottom: "30px !important",
    },
    marginleftimg: {
      marginLeft: "10px",
    },
    copyrighttext: {
      backgroundColor: "#231F20",
      color: "white",
      px: "10",
    },
    socialicons: {
      color: "white",
      fontSize: "1.8rem",
      marginRight: "8px",
      cursor: "pointer",
      "&:hover": {
        color: "#D7282F",
      },
    },
    pagecontent: {
      paddingTop: "60px",
      paddingBottom: "80px",
      "@media screen and (max-width: 1500px)": {
        paddingTop: "40px",
      },
      "@media screen and (max-width: 1300px)": {
        paddingTop: "25px",
      },
    },
    iocns: {
      "@media screen and (max-width: 1300px)": {
        width: "70px",
      },
    },
    aboutcompany: {
      "@media screen and (max-width: 899px)": {
        padding: "20px 20px 20px 50px !important",
      },
    },

    weraesection: {
      "@media screen and (max-width: 899px)": {
        marginBottom: "0",
      },
    },
    tabscrolls: {
      marginLeft: "-90px",
      "@media screen and (max-width: 767px)": {
        marginLeft: "0px !important",
      },
    },

    imgouter: {
      "@media screen and (max-width:899px)": {
        textAlign: "center",
      },
    },
  };
});

export const Sliderboxstyle = styled(Box)(() => ({
  height: "8px",
  width: "8px",
  backgroundColor: "#EC0A13",
  marginTop: "8px",
  borderRadius: "2px",
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
export const SliderMainBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "-100px",
  '@media screen and (max-width:1500px)': {
    marginTop: '-80px'
  },
  '@media screen and (max-width:1300px)': {
    marginTop: '-67px'
  },
}));
