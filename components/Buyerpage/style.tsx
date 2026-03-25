import {
  Box,
  ButtonBase,
  Grid,
  TableCell,
  Typography,
  styled
} from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

export const Firstsectionbackground = styled(Box)(() => ({
  backgroundImage: `url('/assets/buyerbluebg.svg')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
  backgroundPosition: "top center",
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
    backgroundColor: "#f5f5f5",
  },
  "@media screen and (max-width:600px)": {
    padding: "10px 12px",
  },
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
export const SecondSection = styled(Box)(() => ({
  padding: "90px 0px 80px 0px",
  backgroundColor: "#FCFCFC",
  height: "618px",
  marginBottom: "200px",
  "@media screen and (max-width:1200px)": {
    height: "auto",
    marginBottom: "0px",
  },
  "@media screen and (max-width:600px)": {
    padding: "0px",
    "@media screen and (max-width:600px)": {
      padding: "0px",
    },
  },
}));
export const SecondSectioninnerBox = styled(Box)(() => ({
  paddingTop: "170px",
  "@media screen and (max-width:600px)": {
    paddingTop: "50px",
  },
}));
export const SecondSectionheadings = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));
export const Heading = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#D7282F",
  textAlign: "center",
  textTransform: "uppercase",
}));
export const SubHeading = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "600",
  color: "#231F20",
  textAlign: "center",
  "@media screen and (max-width:600px)": {
    fontSize: "20px",
    lineHeight: "24px",
  },
}));
export const MainGridBox = styled(Typography)(() => ({
  marginTop: "50px",
}));
export const GridBoxes = styled(Box)(() => ({
  border: "1px solid #d6d6d6",
  borderRadius: "6px",
  padding: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  backgroundColor: "#fff",
  transition: "0.3s ease-in",
  "&:hover": {
    boxShadow: "0 0 7px -1px #cccccc",
    transition: "0.2s ease-in",
  },
}));
export const GridBoxestext = styled(Typography)(() => ({
  fontSize: "24px",
  fontWeight: "600",
  color: "#d7282f",
  textAlign: "center",
}));
export const GridBoxestextspan = styled("span")(() => ({
  color: "#231F20",
}));
export const GridBoxesParagraph = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#4a4a4a",
  textAlign: "center",
}));
export const ThirdSection = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "50px",
}));
export const ThirdSectionheading = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "600",
  color: "#d7282f",
}));
export const ThirdSectionsubheading = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "700",
  color: "#231F20",
  textAlign: "center",
  "@media screen and (max-width:600px)": {
    fontSize: "20px",
  },
}));
export const Buyerskewimage = styled(Grid)(() => ({
  backgroundImage: `url('/assets/shape.png')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "64% 100%",
  backgroundPosition: "right center",
  "@media screen and (max-width:1200px)": {
    backgroundColor: "#FFF7F7",
  },
}));
export const ThirdHeading = styled(Box)(() => ({
  fontSize: "45px",
  fontWeight: "700",
  color: "#231F20",
  lineHeight: "60px",
  "@media screen and (max-width:600px)": {
    fontSize: "22px",
    lineHeight: "30px",
  },
}));
export const ThirdsectionParagraph = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "##4A4A4A",
  lineHeight: "21px",
}));
export const Tableborder = styled(TableCell)(() => ({
  border: "none",
}));
export const Tablecellbox = styled(Box)(() => ({
  display: "flex",
  gap: "12px",
}));
export const Staricon = styled(StarBorderOutlinedIcon)(() => ({
  color: "#d7282f",
}));
export const Borderfortext = styled(Box)(() => ({
  borderLeft: "5px solid #d7282f",
  padding: "20px",
  backgroundColor: "#fff",
}));
export const ButtonoverCard = styled(ButtonBase)(() => ({
  border: "1px solid #CDCDCD",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "21.79px",
  textAlign: "center",
  borderRadius: "6px",
  padding: "9px 11px 12px 11px",
  backgroundColor: "#ffff",
  left: "0",
  right: "0",
  margin: "0 auto",
  width: "200.19px",
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
export const Fourthsection: any = styled(Box)({
  padding: "40px 0px",
});
export const FourthsectionHeading: any = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});
export const FourthsectionHeadingone: any = styled(Typography)({
  fontSize: "20px",
  fontWeight: "600",
  color: "#d7282f",
});
export const FourthsectionsubHeading: any = styled(Typography)({
  fontSize: "45px",
  fontWeight: "700",
  color: "#231F20",
  "@media screen and (max-width:600px)": {
    fontSize: "26px",
  },
});
export const Pngbg = styled(Box)({
  backgroundImage: `url('/assets/buyerbgpng.png')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
});
export const Fourthheading = styled(Typography)({
  fontSize: "45px",
  fontWeight: "700",
  color: "#231F20",
  lineHeight: "60px",
  "@media screen and (max-width:600px)": {
    fontSize: "24px",
    lineHeight: "30px",
  },
});
export const Fourthsectionredtext = styled(Typography)({
  fontSize: "16px",
  fontWeight: "600",
  color: "#D7282F",
  lineHeight: "21px",
});
export const Fourthsectionparagraph = styled(Typography)({
  fontSize: "16px",
  fontWeight: "400",
  color: "#4A4A4A",
  lineHeight: "21px",
});
export const Redbg = styled(Box)(() => ({
  backgroundImage: `url('/assets/buyerredbg.svg')`,
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  padding: "40px 0px",
  backgroundSize: "100%",
}));
export const TextBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
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
export const Bgshade = styled(Box)(() => ({
  backgroundImage: `url('/assets/buyershades.svg')`,
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  padding: "40px 0px",
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
export const BlackbgMap = styled(Grid)(() => ({
  backgroundImage: `url('/assets/buyerblackbgmap.svg')`,
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  padding: "40px 0px",
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
export const Skewimageinsidepadding = styled(Box)(() => ({
  
  "@media screen and (max-width:600px)": {
    padding: "0px 20px",
  },
}));
export const Whyseller = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#fff",
}));
export const Weknow = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#fff",
}));
export const Wealways = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  color: "#4a4a4a",
  lineHeight: "30px",
}));
export const Davidse = styled(Typography)(() => ({
  fontSize: "25px",
  fontWeight: "600",
  color: "#d7282f",
}));
export const HeadofIT = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#4A4A4A",
}));
export const Quotebox = styled(Box)(() => ({
  position: "absolute",
  right: "20%",
  bottom: "20%",
  "@media screen and (max-width:600px)": {
    display: "none",
  },
}));
export const QuoteinnerimageBox = styled(Box)(() => ({
  position: "absolute",
  top: "30px",
  left: "45px",
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
export const TableCellborder = styled(TableCell)(() => ({
  border: "none",
}));
export const TableCellBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));
export const FlexBox = styled(Box)(() => ({
  display: "flex",
  gap: "15px",
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
export const Quotebox1 = styled(Box)(() => ({
  position: "absolute",
  right: "20%",
  bottom: "10%",
  "@media screen and (max-width:600px)": {
    display: "none",
  },
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
export const Tablecellborder = styled(TableCell)(() => ({
  border: "none",
}));
export const TablecellBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
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
export const FlexBoxforchat = styled(Box)(() => ({
  display: "flex",
  gap: "15px",
}));
export const ClickHereBox = styled(Box)(() => ({
  marginTop: "50px",
  "@media screen and (max-width:600px)": {
    padding: "30px 0px",
    margin: "0 auto",
  },
}));
export const Buyerportal = styled(Box)(() => ({
  marginTop: "30px",
  "@media screen and (max-width:600px)": {
    padding: "0px 20px",
  },
}));
