import { Box, ButtonBase, Typography,styled } from "@mui/material";
import { makeStyles } from 'tss-react/mui';


export const useStyles = makeStyles()(() => {
  return {
  borderline: {
    position: "absolute", 
    bottom: 0,
    height: 1,
    width: "100px",
    background: "white",
  },
  Bdesign: {
    position: 'relative',
    '&:before': {
      width: '200px',
      height: '200px',
      content: '" "',
      position: 'absolute',
      left: '3px',
      bottom: '3px',
      display: 'inline-block',
      zIndex: '1',
      backgroundColor: 'red',
      transition: 'all ease .5s',
      opacity: '0',
      borderRadius:'20px 20px 20px 20px'
      
    },
    '&:after': {
      width: "200px",
      height: "200px",
      content: '" "',
      position: "absolute",
      right: "13px",
      top: "13px",
      display: "inline-block",
      zIndex: "1",
      backgroundColor: "red",
      transition: "all ease .5s",
      opacity: "0",
      borderRadius:'20px 20px 20px 20px'
    },
    '&:hover': {
      "&:before": {
        left: "0",
        bottom: "0",
        opacity: "1",
      }, 
      '&:after': {
        right: "0",
        top: "0",
        opacity: "1",
      },
    },
  },
  janfont: {
    fontSize: "16px",
    fontWeight: 600,
  },
}
});

export const Bgimage = styled(Box)(() => ({
  backgroundImage: `url('/assets/bannerforblog.svg')`,
  height: "47.6vh",
  backgroundRepeat: "no-repeat",
  objectFit: "cover",
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

export const Textoverimg1 = styled(Typography)(() => ({
  fontSize: "40px !important",
  fontWeight: "700",
  color: "#FFFFFF",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

export const Textoverimg2 = styled(Typography)(() => ({
  fontSize: "20px !important",
  fontWeight: "600",
  color: "#FFFFFF",
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

export const Heading = styled(Typography)(() => ({
  fontSize: "20px !important",
  fontWeight: "700 !important",
  color: "#D7282F",
  marginTop: "30px !important",
}));

export const SubHeading = styled(Typography)(() => ({
  fontSize: "45px !important",
  fontWeight: "700",
  color: "#231F20",
  marginBottom: "30px !important", 
}));

export const News = styled(Typography)(() => ({
  fontSize: "12px !important",
  fontWeight: "400",
  color: "#D7282F",
  backgroundColor: "rgba(215, 40, 47, 0.09)",
  width: "35px",
  borderRadius: "3px",
  margin: "10px 0px !important",
  padding:'2px'
}));

export const Boxheading = styled(Typography)(() => ({
  fontSize: "20px !important",
  fontWeight: "600",
  color: "#231F20",
  marginBottom: "30px !important",
}));
export const Boxpara = styled(Typography)(() => ({
  fontSize: "13px !important",
  fontWeight: "400",
  color: "#4A4A4A",
}));

export const Boxspacebetween = styled(Typography)(() => ({
  fontSize: "13px !important",
  fontWeight: "400",
  color: "#223354",
}));
export const Boxbutton = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));
export const ButtonoverCard = styled(ButtonBase)(() => ({
  border: "1px solid #CDCDCD",
  fontWeight: "600",
  textAlign: "center",
  borderRadius: "6px",
  padding: "9px 11px 12px 11px",
  backgroundColor: "inherit",
  width: "auto !important",
  color: "#ffff",
}));
export const ButtonT = styled(Typography)(() => ({
  color: "#ffff",
  fontWeight: "600 !important",
  fontSize: "14px !important",
}));
export const Boxradius = styled(Box)(() => ({
  border: "1px solid #E7E7E7",
  borderRadius: "20px 20px 20px 20px",
  position: "relative",
  zIndex: "2",
  backgroundColor: "white",
}));

export const Images = styled("img")(() => ({
  position: "absolute",
  top: "31%",
  right: "4%", 
}));
export const Image1 = styled("img")(() => ({
  width:'100%'
}));
export const Startext = styled(Typography)(() => ({
  position: "absolute",
  bottom:'30px',
  right: "29px",
  color: "#ffff",
  fontSize: "18px",
  fontWeight: "700",
  lineHeight:'40px'
}));


