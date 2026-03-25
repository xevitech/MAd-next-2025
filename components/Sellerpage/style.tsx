import { Box, ButtonBase, Tab, TableCell, Typography,styled } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

export const Firstsectionbackground = styled(Box)(() => ({
  backgroundImage: `url('/assets/buyerbluebg.svg')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
  backgroundPosition: "top center",
  paddingBottom: "60px",
  "@media screen and (max-width:600px)": {
    backgroundSize: "600%",
  },
  "@media screen and (max-width:1200px)": {
    backgroundSize: "600%",
  },
  "@media screen and (max-width:1536px)": {
    backgroundSize: "600%",
  },
}));
export const Buyon = styled(Typography)(() => ({
  fontSize: "33px",
  fontWeight: "400",
  color: "#d7282f",
  "@media screen and (max-width:600px)": {
    fontSize: "22px",
    lineHeight: "24px",
  },
}));
export const Buyonspan = styled("span")(() => ({
  color: "#231F20",
}));
export const FillinBox = styled(Box)(() => ({
  marginTop: "10px",
}));
export const Fillin = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "700",
  color: "#4A4A4A",
  lineHeight: "56px",
  "@media screen and (max-width:600px)": {
    fontSize: "20px",
    lineHeight: "24px",
  },
}));
export const Fillinspan = styled("span")(() => ({
  color: "#d7282f",
}));
export const FromsellerBox = styled(Box)(() => ({
  marginTop: "15px",
}));
export const Fromseller = styled(Typography)(() => ({
  fontSize: "19px",
  fontWeight: "600",
  color: "#231F20",
}));
export const Fromsellerspan = styled("span")(() => ({
  color: "#d7282f",
}));
export const ParaBox = styled(Box)(() => ({
  marginTop: "15px",
}));
export const Firstsectionparagraph = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  color: "#4A4A4A",
}));
export const Startsellingbutton = styled(ButtonBase)(() => ({
  background: "linear-gradient(360deg, #D7282F 0%, #FA4B52 100%)",
  borderRadius: "6px",
  padding: "18px 12px",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  opacity: "85%",
  transition: ".3s",
  "&:hover": {
    opacity: "100%",
    transition: ".3s",
  },
  "@media screen and (max-width:600px)": {
    padding: "10px 12px",
  },
}));
export const Buyercirclebg = styled(Box)(() => ({
}));
export const Mapbox = styled(Box)(() => ({
  position: "relative",
}));
export const Locationicon = styled("img")(() => ({
  height: "30px",
  width: "30px",
}));
export const Location1 = styled(Box)(() => ({
  position: "absolute",
  top: "45px",
  left: "210px",
}));
export const Location2 = styled(Box)(() => ({
  position: "absolute",
  top: "200px",
  left: "100px",
}));
export const Location3 = styled(Box)(() => ({
  position: "absolute",
  top: "309px",
  left: "237px",
}));
export const Location4 = styled(Box)(() => ({
  position: "absolute",
  bottom: "293px",
  left: "320px",
}));
export const Location5 = styled(Box)(() => ({
  position: "absolute",
  top: "140px",
  right: "140px",
}));
export const Location6 = styled(Box)(() => ({
  position: "absolute",
  bottom: "400px",
  right: "66px",
}));
export const Location7 = styled(Box)(() => ({
  position: "absolute",
  top: "80px",
  left: "30px",
}));
export const Star = styled(StarBorderOutlinedIcon)(() => ({
  color: "#d7282f",
}));
export const ButtonoverCard = styled(ButtonBase)(() => ({
  border: "1px solid #CDCDCD",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "21.79px",
  textAlign: "center",
  borderRadius: "6px",
  padding: "9px 11px 12px 11px",
  backgroundColor: "transparent",
  left: "0",
  right: "0",
  margin: "0 auto",
  width: "auto",
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
export const ButtonText = styled(Typography)(() => ({
  color: "#D7282F",
  transition: "ease-in .3s",
}));
export const TypographyBorderline: any = styled(Typography)({
  position: "absolute",
  bottom: 0,
  height: 1,
  width: "90px",
  background: "red",
});
export const Secondsection = styled(Box)(() => ({
  backgroundColor: "#FCF8F8",
  padding: "30px 0px",
}));
export const IndusterialText = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "700",
  color: "#231F20",
  lineHeight: "60px",
  "@media screen and (max-width:600px)": {
    fontSize: "22px",
    lineHeight: "30px",
  },
}));
export const Industerialparagraph = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#4a4a4a",
}));
export const Tablecellborder = styled(TableCell)(() => ({
  border: "none",
}));
export const TablecellBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));
export const SecondsectionParabox = styled(Box)(() => ({
  borderLeft: "4px solid #d7282f",
  padding: "16px",
  marginTop: "12px",
  backgroundColor: "#F8F8F8",
}));
export const SecondsectionPara = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  color: "£4a4a4a",
}));
export const CircleBG = styled(Box)(() => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundImage: `url('/assets/buyerredbg.svg')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
  backgroundPosition: "top center",
  "@media screen and (max-width:600px)": {
    backgroundSize: "200%",
  },
  "@media screen and (max-width:320px)": {
    backgroundSize: "260%",
  },
}));
export const Fifthsectionheading = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#fff",
  textAlign: "center",
  "@media screen and (max-width:600px)": {
    fontSize: "16px",
  },
}));
export const Fifthsectionsubheading = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "600",
  color: "#fff",
  textAlign: "center",
  "@media screen and (max-width:800px)": {
    fontSize: "20px",
  },
}));
export const Fifthsectiontext = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "400",
  color: "#fff",
  textAlign: "center",
  "@media screen and (max-width:600px)": {
    fontSize: "14px",
  },
}));
export const TabSection = styled(Tab)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#231F20",
  borderBottom: "3px solid #DBDBDB",
  marginRight: "14px",
  textTransform: "capitalize",
  
}));
export const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginTop: "50px",
}));
export const FlexImageBox = styled(Box)(() => ({
  backgroundColor: "#fff",
  padding: "10px",
  border: "1px solid #DBDBDB",
  borderRadius: "10px",
}));
export const FlexBoxText = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "600",
  color: "#231F20",
}));
export const FlexBoxSubText = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  color: "#4a4a4a",
}));
export const Sliderbox = styled(Box)(() => ({
  border: "1px solid #E9E9E9",
  borderRadius: "20px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 9px 0px rgba(159, 159, 159, 0.25)",
  padding: "20px 20px 0px 20px",
}));
export const Bgshade = styled(Box)(() => ({
  backgroundImage: `url('/assets/buyershades.svg')`,
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  padding: "60px 0px",
}));
export const Powercozmobox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));
export const PowercozmoText = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#d7282f",
}));
export const Howitworks = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "600",
  color: "#4A4A4A",
}));
export const Howitworksspan = styled("span")(() => ({
  color: "#d7282f",
}));
export const Paragraph = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  color: "#4A4A4A",
  textAlign: "center",
}));
export const OneBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "15px",
}));
export const One = styled(Typography)(() => ({
  fontSize: "64px",
  fontWeight: "600",
  color: "#231F20",
}));
export const Linebox = styled(Box)(() => ({
  width: "100%",
  height: "12px",
  backgroundColor: "#d7282f",
  position: "relative",
}));
export const Outerbox = styled(Box)(() => ({
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  backgroundColor: "#fff",
  top: "50%",
  position: "absolute",
  left: "50%",
  transform: "translate(-50%,-50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const Innerbox = styled(Box)(() => ({
  height: "30px",
  width: "30px",
  borderRadius: "50%",
  backgroundColor: "#d7282f",
}));
export const Textbox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  mb: 3,
  flexDirection: "column",
  alignItems: "center",
  mt: 3,
}));
export const GlobalMarket = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: "700",
  color: "#231F20",
}));
export const GlobalMarketspan = styled("span")(() => ({
  color: "#d7282f",
}));
export const GlobalMarkettext = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#4A4A4A",
  textAlign: "center",
}));
export const Uppertextbox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "24px",
  flexDirection: "column",
  alignItems: "center",
  mt: 3,
}));
export const LeandAndOpportunities = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: "700",
  color: "#231F20",
  textAlign: "center",
}));
export const LeandAndOpportunitiesspan = styled("span")(() => ({
  color: "#d7282f",
}));
export const LeandAndOpportunitiesText = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#4A4A4A",
  textAlign: "center",
}));
export const Buttonbox = styled(Box)(() => ({
  "@media screen and (max-width:1199px)": {
    flexDirection: "column-reverse",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const Blackbg = styled(Box)(() => ({
  backgroundImage: `url('/assets/buyerblackbgwithmap.png')`,
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  padding: "40px 0px",
  backgroundSize: "100%",
  backgroundPosition: "top center",
  "@media screen and (max-width:1200px)": {
    backgroundSize: "500%",
  },
}));
export const Whyseller = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#fff",
  textAlign: "center",
}));
export const Weknow = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#fff",
}));
export const Skewimage = styled(Box)(() => ({
  backgroundImage: `url('/assets/skewskewimage.png')`,
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  padding: "20px 30px 20px 140px",
  position: "relative",
  paddingBottom: "100px",
  width: "100%",
  "@media screen and (max-width:600px)": {
    backgroundColor: "#FFF7F7",
    padding:'0px 20px'
  },
}));
export const Quotebox = styled(Box)(() => ({
  position: "absolute",
  right: "20%",
  bottom: "20%",
  "@media screen and (max-width:600px)": {
    display: "none",
  },
}));
export const Wealways = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  color: "#4a4a4a",
  lineHeight: "30px",
}));
export const ContentBox = styled(Box)(() => ({
  marginTop: "30px",
  backgroundRepeat: "no-repeat",
}));
export const ContentBoxmarginTop = styled(Box)(() => ({
  marginTop: "20px",
}));
export const Name = styled(Typography)(() => ({
  fontSize: "25px",
  fontWeight: "600",
  color: "#d7282f",
}));
export const Designation = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#4A4A4A",
}));
export const Shadesbg = styled(Box)(() => ({
  backgroundImage: `url('/assets/buyershadesbg.svg')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
}));
export const Skewimage2 = styled(Box)(() => ({
  backgroundImage: `url('/assets/buyerskewimage2.svg')`,
  backgroundRepeat: "no-repeat",
  padding: "90px 180px",
  "@media screen and (max-width:600px)": {
    padding: "0px 0px 0px 0px",
  },
}));
export const Realtime = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "700",
  color: "#d7282f",
}));
export const Realtimespan = styled("span")(() => ({
  fontWeight: "600",
  color: "#231F20",
}));
export const Weeasy = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "400",
  color: "#4A4A4A",
}));
export const FlexBoxforchat = styled(Box)(() => ({
  display: "flex",
  gap: "15px",
  "@media screen and (max-width:600px)": {
    padding: "0px 20px",
  },
}));
export const Imageborder = styled(Box)(() => ({
  border: "1px solid #E9E9E9",
  borderRadius: "6px",
  padding: "10px",
}));
export const Onlinechat = styled(Typography)(() => ({
  fontSize: "22px",
  fontWeight: "400",
  color: "#231F20",
}));
export const Livechat = styled(Typography)(() => ({
  fontSize: "32px",
  fontWeight: "600",
  color: "#d7282f",
}));
export const Livechatparagraph = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#4a4a4a",
  lineHeight: "33px",
}));
export const TabButtonBox = styled(Box)(() => ({
  marginTop: "50px",
  "@media screen and (max-width:600px)": {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
  },
}));
export const GrowYourBusiness = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "600",
  color: "#4a4a4a",
  "@media screen and (max-width:600px)": {
    fontSize: "22px",
    margin: "20px 0px",
  },
}));
export const DiscoverMoreBox = styled(Box)(() => ({
  marginTop: "50px",
  "@media screen and (max-width:600px)": {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
  },
}));
export const ClickHereBox = styled(Box)(() => ({
  marginTop: "50px",
  "@media screen and (max-width:600px)": {
    padding: "30px 0px",
    margin: "0 auto",
  },
}));
export const LearnMoreBox = styled(Box)(() => ({
  marginTop: "50px",
  "@media screen and (max-width:600px)": {
    margin: "30px 0px",
    display: "flex",
    justifyContent: "center",
    paddingBottom: "30px",
  },
}));
export const Padding20px = styled(Box)(() => ({

  "@media screen and (max-width:600px)": {
    padding: "0px 20px",
  },
}));
