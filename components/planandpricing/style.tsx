import {
  Accordion,
  AccordionSummary,
  Box,
  ButtonBase,
  Grid,
  ListItem,
  Switch,
  SwitchProps,
  TableCell,
  TableRow,
  Typography,
  tableCellClasses,
  styled
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const Bgimage = styled(Box)(() => ({
  backgroundImage: `url('/assets/Contactus.jpg')`,
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
export const Bgimage1 = styled(Box)(() => ({
  backgroundImage: `url('/assets/plansandpricing.svg')`,
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
  fontSize: "20px  ",
  fontWeight: "600",
  color: "#FFFFFF",
  "@media only screen and (max-width: 600px)": {
    fontSize: "16px  ",
    fontWeight: "400",
  },
}));

export const SecondSection = styled(Box)(() => ({
  marginTop: "30px",
  textAlign: "center",
}));
export const Heading = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#d7282f",
}));
export const SubHeading = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "400",
  color: "#4A4A4A",
}));
export const Gridbox = styled(Box)(() => ({
  border: "1px solid #E4E4E4",
  borderRadius: "10px",
  backgroundColor: "#fff",
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));
export const ImageBox = styled(Box)(() => ({
  height: "100px",
  width: "100px",
  borderRadius: "50px",
  backgroundColor: "#FFF3F4",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const Textbox = styled(Box)(() => ({
  textAlign: "center",
  marginTop: "15px",
}));
export const Boxheading = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: "600",
  color: "#4A4A4A",
}));
export const Boxtext = styled(Typography)(() => ({
  fontSize: "13px",
  fontWeight: "400",
  color: "#4A4A4A",
  marginTop: "10px",
}));
export const BoxTextonImage = styled(Box)(() => ({
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
export const TextonImage = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "700",
  color: "#fff",
  textTransform: "uppercase",
}));
export const SubTextonImage = styled(Typography)(() => ({
  fontSize: "35px",
  fontWeight: "600",
  color: "#fff",
}));
export const GridImages = styled(Box)(() => ({
  border: "1px solid #fff",
  borderRadius: "50%",
  height: "80px",
  width: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const Grid2text = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "600",
  color: "#fff",
}));
export const Grid2text2 = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#fff",
  marginTop: "15px",
}));

export const BackImage = styled("img")(() => ({
  width: "100% !important",
  height: "auto",
}));
export const Accordionsection = styled(Box)(() => ({
  backgroundImage: `url('/assets/shapeforplans.svg')`,
  height: "auto",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "100%",
  backgroundAttachment: "fixed",
}));
export const Faqsecondheading = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "700",
  color: "#231F20",
}));
export const AccordionQuestion = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "600",
  color: "#231F20",
}));
export const AccordionAnswer = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#4a4a4a",
}));
export const AccordionHead = styled(Accordion)(() => ({
  border: "1px solid #DBDBDB",
  boxShadow: "none",
  borderRadius: "6px",
}));
export const AccordSummary = styled(AccordionSummary)(() => ({
  borderBottom: "1px solid #DBDBDB",
}));
export const Planshead = styled(Typography)(() => ({
  fontSize: "28px",
  fontWeight: "600",
  color: "#231F20",
}));
export const PlansheadBold = styled("span")(() => ({
  fontSize: "28px",
  fontWeight: "700",
  color: "#231F20",
}));
export const Planssubhead = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "600",
  color: "#231F20",
}));
export const Planssubheadred = styled("span")(() => ({
  fontSize: "45px",
  fontWeight: "700",
  color: "#d7282f",
}));
export const Plancardbox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow:
    "0px 0px 2px 0px rgba(159, 162, 191, 0.32), 0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
  padding: "0px 16px 25px 16px",
}));
export const Plancost = styled(Typography)(() => ({
  fontSize: "50px",
  fontWeight: "600",
  color: "#333",
}));
export const Plancostcurrency = styled("sup")(() => ({
  fontSize: "26px",
  fontWeight: "400",
  color: "#333",
}));
export const Permonth = styled(Typography)(() => ({
  fontSize: "13px",
  fontWeight: "400",
  color: "#000",
}));
export const PlanButtons = styled(ButtonBase)(() => ({
  backgroundColor: "#00b884",
  borderRadius: "10px",
  height: "46px",
  width: "284px",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "700",
}));
export const Listitemstext = styled(ListItem)(() => ({
  display: "flex",
  justifyContent: "center",
  fontSize: "13px",
  color: "#000",
}));
export const Upgradebtton = styled(ButtonBase)(() => ({
  border: "1px solid #00b884",
  borderRadius: "10px",
  padding: "12px 50px",
  height: "46px",
  width: "284px",
  color: "#00b884",
  fontSize: "16px",
  fontWeight: "600",
  boxShadow: "0px 1px 0px 0px #00B884",
}));

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" />
))(({ theme }) => ({
  width: "54px",
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    color: "#00B884",
    "&.Mui-checked": {
      transform: "translateX(28px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "dark" ? "#EAEAEA" : "#EAEAEA ",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "light" ? "#EAEAEA" : "#39393D",
    opacity: 1,
  },
}));
export const Whatourclient = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "20px",
  color: "#d7282f",
}));
export const Happywithcustomers = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "45px",
  color: "#231F20",
}));
export const HappywithcustomersRed = styled("span")(() => ({
  fontWeight: "600",
  fontSize: "45px",
  color: "#d7282f",
}));
export const Newsection = styled(Box)(() => ({
  backgroundImage: `url('/assets/4sectionforplans.svg')`,
  height: "auto",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  position: "relative",
  width: "100%",
  padding: "50px 30px",
}));
export const Newsectiontext = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "20px",
  color: "#fff",
  textTransform: "uppercase",
  textAlign: "center",
}));
export const Newsectiontext2 = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "35px",
  color: "#fff",
  textAlign: "center",
}));
export const WedontText = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "15px",
  color: "#4A4A4A",
}));
export const NameHeading = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "25px",
  color: "#d7282f",
}));
export const NameDesignation = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  color: "#4A4A4A",
}));

export const FeatureButton = styled(ButtonBase)(() => ({
  border: "1px solid #d7282f",
  borderRadius: "50px",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 30px 0px rgba(215, 40, 47, 0.25)",
  color: "#d7282f",
  fontSize: "18px",
  fontWeight: "600",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "#00B884",
    fontSize: "26px",
    fontWeight: "600",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "14px",
    fontWeight: "400",
    textAlign: "center",
  },
}));
export const Basic = styled(TableCell)(() => ({
  backgroundColor: "white",
  color: "#00B884",
  fontSize: "26px",
  fontWeight: "600",
  textAlign: "center",
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#fff",
  "&:nth-of-type(odd)": {
    backgroundColor: "#F1F1F1",
    textAlign: "center",
  },
  "&:last-child td, &:last-child th": {
  },
}));

export const CheckBox = styled(Box)(() => ({
  height: "25px",
  width: "25px",
  borderRadius: "50px",
  background: "linear-gradient(180deg, #00B884 0%, #19DBA4 100%)",
  boxShadow: " 0px 4px 8px 0px rgba(0, 0, 0, 0.15)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const CheckBoxicon1 = styled(CheckOutlinedIcon)(() => ({
  color: "#fff",
  fontSize: "15px",
}));
export const CheckBoxicon2 = styled(CloseOutlinedIcon)(() => ({
  color: "#C8C8C8",
  fontSize: "15px",
}));
export const CheckBox2 = styled(Box)(() => ({
  height: "25px",
  width: "25px",
  borderRadius: "50px",
  backgroundColor: "transparent",
  border: "1px solid #C8C8C8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const GridStyle = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url('/assets/mapforplan.svg')`,
  objectFit: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center bottom",
}));
export const GridStyle2 = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  backgroundImage: `url('/assets/lastsectionforplan.svg')`,
  objectFit: "cover",
  backgroundRepeat: "no-repeat",
}));
export const AccordionsummaryIcon = styled(AccordSummary)(() => ({
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
