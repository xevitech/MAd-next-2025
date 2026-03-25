import {
  alpha,
  Button,
  ButtonGroup,
  Chip,
  Popover,
  styled,
} from "@mui/material";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Tab,
  Tabs,
  MenuItem,
  FormControlLabel,
  TextareaAutosize,
} from "@mui/material";

import image from "../../public/assets/greadientbg.png";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "tss-react/mui";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

export const MiniSiteContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1740px",
  // margin: "12px auto 0",
  margin: "0 auto",
  width: "100%",
  padding: "0 16px",
  "&.sectionspacing":{
    margin:'40px auto',
    "@media screen and (max-width:480px)":{
      margin:'20px auto',
    }
  },
  "& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
    textTransform: "capitalize",
  },
  "& .NavBar": {
    "@media(max-width:767px)": {
      padding: "0",
    },
  },
  "@media(max-width:767px)": {
    padding: "0 4px",
    margin: 0,
  },
  "@media(max-width:320px)": {
    padding: "0",
    margin: 0,
  },
}));

export const MinisiteBanner = styled(Box)(() => ({
  height: "40vh",
}));
export const BoxMiniSiteinnerL = styled(Box)(() => ({
  "@media screen and (max-width:1024px)": {
    padding: "0",
  },
}));

export const StripedBox = styled(Box)(() => ({
  backgroundImage: `url(${image.src})`,
  backgroundSize: "cover",
}));
export const CertificateSlider = styled(Box)(() => ({
  width: "580px",
  height: "auto",
  margin: "auto",
  "@media screen and (max-width:767px)": {
    width: "100%",
  },
}));

export const Typoheading = styled(Typography)(({ theme }) => ({
  color: "#231F20",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "24px",
  padding: 0,
  [theme.breakpoints.down("lg")]: {
    fontSize: "19px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
  "@media screen and (max-width:320px)": {
    fontSize: "15px",
  },
}));

export const QuoteButton = styled(ButtonBase)(({ theme }) => ({
  minWidth: "130px",
  fontSize: ".95rem",
  fontWeight: 600,
  padding: "7px 10px",
  borderRadius: "6px",
  color: "rgba(215, 40, 47, 1)",
  boxSizing: "border-box",
  border: `1px solid rgba(215, 40, 47, 1)`,
  "&:hover": {
    background: "#231F20",
    border: `1px solid #231F20`,
    color: `${theme.palette.common.white}`,
  },
  "& .MuiSvgIcon-root": {
    marginRight: "5px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "13px",
    "& .MuiSvgIcon-root": {
      display: "none",
    },
  },
}));

export const CustomeChip = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(215, 40, 47, 0.12)",
  border: "1px solid #d7282f",
  width: "35px",
  height: "35px",
  borderRadius: 6,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "30px",
    height: "30px",
    "& img": {
      width: "16px",
      height: "16px",
    },
  },
}));
export const CertificateBox = styled(Box)(({ theme }) => ({
  width: "auto",
  height: "250px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  borderRadius: "8px",
  border: "1px solid #d2d2d2",
  cursor: "pointer",
  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
}));
export const MoreAboutUsButton = styled(ButtonBase)(({ theme }) => ({
  fontSize: "13px",
  fontWeight: 600,
  padding: "5px 15px",
  borderRadius: "3px",
  color: `${theme.palette.common.white}`,
  background: "rgba(215, 40, 47, 1)",
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
    fontWeight: 400,
  },
}));

export const SocialBtn = styled(ButtonGroup)(() => ({
  "& .MuiButtonBase-root": {
    "& i": {
      fontSize: "22px",
      color: "#424242",
    },
    "& svg": {
      fontSize: "24px",
      color: "#424242",
    },
    "&:hover": {
      backgroundColor: "#d7282f",
      "& i, svg": {
        color: "#FFFFFF !important",
      },
    },
  },
}));

export const ButtonGroupItem = styled(ButtonBase)(({ theme }) => ({
  padding: "8px 8px",
  boxSizing: "border-box",
  width: "100%",
  background: `${theme.palette.common.white}`,
  "&:hover": {
    background: `${theme.palette.common.white}`,
  },
  "&.css-10d1a0h-MuiButtonBase-root": {
    padding: "7px",
    background: "rgb(255, 255, 255)",
    boxSizing: "border-box",
  },
  "& svg": {
    color: "#44d600 !important",
  },
}));

export const NavigationButton = styled(ButtonBase)(({ theme }) => ({
  padding: "7px 12px",
  boxSizing: "border-box",
  color: "rgba(215, 40, 47, 1)",
  fontSize: "14px",
  fontWeight: 700,
  borderRadius: "6px",
  "&:hover": {
    color: "rgba(215, 40, 47, 1)",
  },
  "&:focus": {
    color: "rgba(215, 40, 47, 1)",
  },
  "&:active": {
    color: "rgba(215, 40, 47, 1)",
  },
  [theme.breakpoints.down("xl")]: {
    padding: "5px",
  },
}));

export const SearchButton = styled(ButtonBase)(({ theme }) => ({
  padding: "12px",
  boxSizing: "border-box",
  background: "rgba(215, 40, 47, 1)",
  borderRadius: "100px ",
  color: theme.palette.common.white,
  [theme.breakpoints.down("sm")]: {
    padding: "6px",
    borderRadius: 0,
  },
}));

export const CountryText = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: "#3A3A3A",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("lg")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

export const MainProductsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",
}));
export const CompanyNameFooter = styled("span")(({ theme }) => ({
  "&:hover": {
    color: "#d7282f",
    transition: "all ease 0.3s",
  },
  cursor: "pointer",
}));

export const BusinessText = styled(Typography)(({ theme }) => ({
  color: "#231F20",
  fontSize: "0.8125rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
  "@media screen and (max-width:600px)": {
    marginBottom: "4.8px",
  },
}));

export const CertificateTitle = styled(Typography)(({ theme }) => ({
  color: "rgba(35, 31, 32, 1)",
  fontSize: "13px",
  fontWeight: 600,
  textTransform: "capitalize",
}));

export const ManufactureText = styled(Typography)(({ theme }) => ({
  color: "#231F20",
  fontSize: "0.875rem",
  fontWeight: 600,
  [theme.breakpoints.down("lg")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
  "& span": {
    color: "#231F20",
    fontSize: "13px",
    fontWeight: 600,
    "& .MuiSvgIcon-root": {
      fontSize: "16px",
      position: "relative",
      top: "4px",
      marginLeft: "3px",
      cursor: "pointer",
    },
    "&:hover": {
      color: "#D7282F",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
}));

export const CertificateHeadText = styled(Typography)(({ theme }) => ({
  fontSize: "21px",
  fontWeight: 600,
  marginLeft: "16px !important",
  color: "rgba(215, 40, 47, 1)",
  textTransform: "capitalize",
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
  },
}));
export const Heighlightstext = styled(Typography)(({ theme }) => ({
  color: "#231F20",
  fontSize: "24px",
  fontWeight: 700,
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
  },
}));
export const AboutText = styled(Typography)(({ theme }) => ({
  color: "#4A4A4A",
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "24px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "3",
  display: "-webkit-box",
}));
export const MoreText = styled(Typography)(({ theme }) => ({
  color: "#000000",
  fontSize: "14px",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));
export const Smalldescription = styled(Typography)(({ theme }) => ({
  color: "#000000",
  fontSize: "12px",
  fontWeight: 400,
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
  "& span": {
    color: "#000000",
    fontSize: "12px",
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
}));

export const RatingText = styled(Typography)(({ theme }) => ({
  marginLeft: ".400rem",
  color: "rgba(123, 121, 121, 1)",
  fontSize: ".75rem",
  fontWeight: 400,
  [theme.breakpoints.down("lg")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
}));
export const ListHeading = styled(Typography)(({ theme }) => ({
  color: "#231F20",
  fontSize: "18px !important",
  display: "flex",
  alignItems: "center",
  "& span": {
    fontSize: "15px",
    color: "rgba(157, 157, 157, 1)",
    marginLeft: "4px",
    fontWeight: "600",
    "@media screen and (max-width:320px)": {
      fontSize: "12px",
    },
    "& span": {
      color: "rgba(215, 40, 47, 1)",
    },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "15px !important",
  },
}));
export const ImageGridItem: any = styled(Grid)(({ theme, imgsrc }: any) => ({
  background: imgsrc
    ? `url(${imgsrc})`
    : `url(/assets/minisiteimages/dummy_image.svg)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  [theme.breakpoints.down("md")]: {
    minHeight: "287px",
  },
}));
export const CategoryMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "block",
  padding: "12px 10px",
  minWidth: "150px",
}));
export const LogoBox = styled(Box)(({ theme }) => ({
  marginRight: "10px",
  [theme.breakpoints.down("md")]: {
    width: "auto",
  },
  "& img": {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "contain",
  },
}));

export const ChipButton = styled(Button)(({ theme }) => ({
  textTransform: "initial",
  borderRadius: "6px",
  height: "22px",
  color: "black",
  padding: "0px 5px",
  border: "1px solid black",
  fontWeight: 600,
  fontSize: "12px",
  cursor: "default",
  backgroundColor: "transaprent !important",
  [theme.breakpoints.down("lg")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down("md")]: {
    border: "none",
    fontSize: "12px",
    minWidth: "auto",
    padding: "0px 3px",
  },
}));
export const YearChip = styled(Chip)(({ theme }) => ({
  textTransform: "initial",
  borderRadius: "6px",
  // background: "#666666",
  // color: "#ffffff",
  background: "transparent",
  fontFamily: "Open Sans",
  color: "#231F20",
  fontSize: "12px",
  fontWeight: 600,
  height: "25px",
  [theme.breakpoints.down("lg")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "10px",
    height: "20px",
  },
  "& .MuiChip-label": {
    padding: 0,
  },
}));

export const NavContactButton = styled(ButtonBase)(({ theme }) => ({
  color: "white",
  width: "168px",
  borderRadius: "6px",
  backgroundColor: "#D7282F",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  gap: "5px",
  height: "40px",
  "&.MuiTypography-root": {
    color: "white",
    fontSize: "14px",
    fontWeight: 700,
  },
  "@media(max-width:1100px)": {
    width: "250px",
  },
  "@media(max-width:768px)": {
    display: "none!important",
  },
}));

export const NavContactButtonMobile = styled(ButtonBase)(({ theme }) => ({
  color: "white !important",
  "@media screen and (max-width:340px)": {
    fontSize: "10px",
  },
  "&.MuiButtonBase-root": {
    padding: "4px 8px",
    borderRadius: "6px",
    backgroundColor: "#D7282F",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    gap: "5px",
    "& p": {
      fontSize: "14px",
      fontWeight: 700,
    },
    [theme.breakpoints.down("md")]: {
      padding: "5px 8px",
      margin: 0,
      "& p": {
        fontSize: "10px",
        fontWeight: 600,
      },
    },
    "& svg": {
      fontSize: "15px",
    },
  },
}));
export const NavContactButtonGreen = styled(ButtonBase)(({ theme }) => ({
  color: "white !important",
  "&.MuiButtonBase-root": {
    padding: "9px 12px",
    borderRadius: "6px",
    backgroundColor: "#0abb75",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    gap: "5px",
    whiteSpace: "nowrap",
    "& p": {
      fontSize: "14px",
      fontWeight: 700,
    },
    [theme.breakpoints.down("md")]: {
      padding: "5px 8px",
      margin: 0,
      "& p": {
        fontSize: "10px",
        fontWeight: 600,
      },
      "& svg": {
        fontSize: "15px",
      },
    },
  },
}));
export const RatingChip = styled(Box)(({ theme }) => ({
  color: "white",
  fontSize: "12px",
  background: theme.palette.success.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  borderRadius: "10px",
  padding: "2px 6px",
  width: "55px",
  marginRight: "8px",
  "& svg": {
    width: "18px",
  },
  [theme.breakpoints.down("md")]: {
    "& svg": {
      fontSize: "15px",
    },
  },
}));

export const RightGrid = styled(Grid)(({ theme }) => ({
  "@media(max-width:600px)": {
    display: "none",
  },
}));

export const LeftGrid = styled(Grid)(({ theme }) => ({
  "@media(max-width:768px)": {
    flex: 1,
  },
}));

export const RatingStack = styled(Stack)(({ theme }) => ({
  display: "none",
  "@media(max-width:768px)": {
    display: "flex",
  },
}));

export const NavTab: any = styled(Tab)(({ theme, active }: any) => ({
  color: active
    ? "rgba(215, 40, 47, 0.85)!important"
    : theme.palette.common.black,
  textTransform: "inherit",
  padding: "14px 24px",
  fontSize: "16px",
  fontWeight: 400,
  paddingLeft: "12px",
  paddingRight: "12px",
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  minHeight: "48px",
}));
export const NavTabs = styled(Tabs)(({ theme }: any) => ({
  "& .css-1aquho2-MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-scroller": {
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      padding: " 0px",
    },
  },
  "& button": {
    color: "#231F20 !important",
    [theme.breakpoints.down("md")]: {},
  },
  "& button:hover": {
    color: "rgba(215, 40, 47, 0.85) !important",
    "& svg": { color: "#d7282f",  },
  },
  "& button:active": {
    color: "rgba(215, 40, 47, 0.85) !important",
  },
  "& button:focus": {
    color: "rgba(215, 40, 47, 0.85)",
  },
  "& button.Mui-selected": {
    color: "#d7282f !important",
    "& svg": { color: "#d7282f" },
  },
  "& .MuiTabs-indicator": {
    color: "rgba(215, 40, 47, 0.85)!important",
    background: "rgba(215, 40, 47, 0.85)!important",
  },
  "& svg": { color: "black",transition: "transform 0.3s ease", },
}));

export const SearchSortStack = styled(Stack)(({ theme }) => ({
  "@media(max-width:768px)": {
    display: "none",
  },
}));
export const ShortStack = styled(Stack)(({ theme }) => ({
  "& .MuiIconButton-root": {
    padding: "6px",
    "& .MuiSvgIcon-fontSizeMedium": {
      padding: "0 0 0 8px",
    },
  },
  "@media(max-width:768px)": {
    display: "none",
  },
}));

export const ShortChip = styled(Chip)(({ theme }) => ({
  color: "#4A4A4A",
  borderColor: "#4A4A4A",
  flexDirection: "row-reverse",
  display: "none",
  padding: "0px 10px",
  "& span": {
    padding: 0,
  },
  "& svg": {
    color: "#4A4A4A",
  },
  "@media(max-width:768px)": {},
}));
export const Miniproductheading = styled(Typography)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "#223354",
  fontSize: "1.12rem",
  fontWeight: 700,
  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
  },
}));
export const MiniproductSubheading = styled(Typography)(({ theme }) => ({
  color: "rgba(35, 31, 32, 1)",
  fontSize: "12px",
  fontWeight: 400,
  "& span": {
    color: "rgba(35, 31, 32, 0.6)",
  },
}));
export const MiniproductInfoHead = styled(Typography)(({ theme }) => ({
  color: "#223354",
  fontSize: "13px",
  fontWeight: 400,
  textTransform: "capitalize",
}));
export const MiniproductInfoData = styled(Typography)(({ theme }) => ({
  color: "rgba(35, 31, 32, 0.6)",
  fontSize: "14px",
  fontWeight: 700,
}));
export const MiniproductInfoCompany = styled(Typography)(({ theme }) => ({
  color: "rgba(35, 31, 32, 0.6)",
  fontSize: "15px",
  fontWeight: 400,
  [theme.breakpoints.down("lg")]: {
    fontSize: "13px",
  },
}));
export const ProductContentContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.between("sm", "md")]: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
}));
export const QuaniityText = styled(Typography)(({ theme }) => ({
  color: "#000000",
  fontSize: "14px",
  fontWeight: 400,
}));
export const MiniproductUploadButton = styled(ButtonBase)(({ theme }) => ({
  color: theme.palette.common.white,
  background: "#696969",
  borderRadius: "6px",
  fontSize: "13px",
  fontWeight: 700,
  padding: "0px 12px",
  height: "36px",
}));

export const SliderBox = styled(Box)(({ theme }) => ({
  "& .MuiStack-root.css-1y0ndw6-MuiStack-root": {
    display: "none",
  },
  "&:hover": {
    "& .MuiStack-root.css-1y0ndw6-MuiStack-root": {
      display: "flex",
    },
    "& .MuiStack-root.mui-style-1frc47y-MuiStack-root": {
      display: "flex",
    },
  },
}));

export const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #CCCEDD ",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  alignItems: "center",
  display: "flex",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  "& .MuiButtonBase-root": {
    color: "white",
    borderRadius: "6px",
    background: "#D7282F",
    padding: "0px 10px",
    height: "30px",
  },
}));

export const SearchIconWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(215, 40, 47, 1)",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "rgba(35, 31, 32, 1)",
  fontSize: "15px",
  flexGrow: 1,
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    paddingLeft: "16px",
    [theme.breakpoints.down("lg")]: {
      padding: "6px",
      paddingLeft: "5px",
    },
  },
}));

export const MenuSearchButton = styled(ButtonBase)(({ theme }) => ({
  fontSize: "15px",
  textTransform: "initial",
  fontWeight: 700,
  color: "white",
  borderRadius: "6px",
  background: "#D7282F",
  padding: "3px 10px",
  height: "30px",
  marginLeft: "5px !important",
  "&:hover": {
    background: "#D7282F",
    color: "white",
  },
  "@media screen and (max-width:767px)": {
    padding: "0px 5px !important",
    height: "28px !important",

    "& svg": {
      fontSize: "16px",
    },
  },
}));
export const SettingIconButton = styled(IconButton)(({ theme }) => ({
  padding: "16px",
  background: "rgba(35, 31, 32, 0.09)",
  borderRadius: "5px",
  color: "rgba(35, 31, 32, 1)",
  [theme.breakpoints.down("lg")]: {
    padding: "10px",
  },
}));
export const NotificationIconButton = styled(IconButton)(({ theme }) => ({
  padding: "16px",
  borderRadius: "5px",
  color: "rgba(35, 31, 32, 1)",
  [theme.breakpoints.down("lg")]: {
    padding: "10px",
  },
}));
export const CozmoToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: "0",
  },
}));
export const Cozmomobilemenu = styled(ButtonBase)(({ theme }) => ({
  display: "none",
  background: theme.palette.common.white,
  borderRadius: "2px",
  border: `1px solid ${theme.palette.divider}`,
  width: "30px",
  height: "30px",
  padding: "2px",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const SliderArrow = styled(ButtonBase)(({ theme, sz }: any) => ({
  background: "rgba(255, 255, 255, .3)",
  borderRadius: "100px",
  height: sz ? "35px" : "25px",
  width: sz ? "36px" : "26px",
  "& :hover": {
    background: "rgba(255, 255, 255, .5)",
    borderRadius: "100px",
  },
}));
export const SliderArrowbigpost: any = styled(ButtonBase)(
  ({ theme, sz }: any) => ({
    background: "rgba(0, 0, 0, .3)!important",
    borderRadius: "2px!important",
    overflow: "hidden",
    height: "25px",
    width: "25px",
    "& :hover": {
      background: "rgba(0, 0, 0, .5)",
    },
    "& svg": {
      color: "white",
      height: "100%",
      width: "100%",
    },
  })
);

export const PopupText: any = styled(Typography)(
  ({ theme, dot, fs, fw, dotSize, clr }: any) => ({
    fontSize: fs ? fs : "12px!important",
    fontWeight: fw ? fw : 400,
    paddingLeft: dot ? "15px" : dotSize ? "25px" : null,
    position: "relative",
    color: clr ? clr : null,
    "& span": {
      fontSize: fs ? fs : "13px!important",
      fontWeight: fw ? fw : 400,
      paddingLeft: dot ? "15px" : dotSize ? "25px" : null,
      position: "relative",
    },
    "&::before": {
      position: "absolute",
      left: dotSize ? -5 : 0,
      top: dotSize ? 2 : 9,
      borderRadius: 50,
      content: dot ? '" "' : null,
      display: "block",
      background: "#D7282F",
      height: dotSize ? dotSize : 6,
      width: dotSize ? dotSize : 6,
    },
  })
);

export const CompanyNamContent = styled(Box)(({ theme }) => ({
  marginLeft: "10px !important",
  "& .MuiTypography-h4": {
    fontWeight: "600",
  },
  "& .MuiIconButton-sizeSmall": {
    fontSize: "27px",
  },
  "& .css-ci5apu-MuiSvgIcon-root": {
    color: "#D7282F",
    fontSize: "20px",
  },
  "& .css-ahj2mt-MuiTypography-root": {
    fontSize: "13px",
  },
  "& .locIcon": {
    display: "flex",
    alignItems: "center",
  },
  "@media (max-width: 699px)": {
    width: "100% !important",
  },
}));

export const MainProdLbl = styled(Box)(({ theme }) => ({
  "& .MuiButtonBase-root": {
    border: "1px solid #231F20",
    borderRadius: "4px",
    minWidth: "90px",
    padding: "0 4px",
    marginRight: "6px",
    "&:hover": {
      backgroundColor: "#dcf4ff",
      // borderColor: "#767676",
      color: "#d7282f",
      border: "1px solid#d7282f",
    },
    "@media (max-width: 1536px)": {
      margin: "0 6px 6px 0",
    },
  },
  "@media (max-width: 699px)": {
    textAlign: "left",
  },
}));

export const ProductListHeading = styled(Box)(({ theme }) => ({
  "& .css-ag7rrr-MuiTypography-root": {
    fontWeight: "700",
  },
  "@media (max-width: 899px)": {
    marginBottom: "16px",
  },
}));

export const ProductListTile = styled(Box)(({ theme }) => ({
  height: "100%",
  "& .css-10d1a0h-MuiButtonBase-root": {
    borderRadius: "4px",
  },
}));

export const CertificateCarousel = styled(Box)(({ theme }) => ({
  "& .slick-arrow": {
    zIndex: "2",
    "&::before": {
      color: "black",
    },
    "&.slick-prev": {
      left: "-10px",
    },
    "&.slick-next": {
      right: "-10px",
    },
  },
}));

export const CertificateModalImg = styled(Box)(({ theme }) => ({
  "& img": {
    width: "560px",
    height: "450px",
    objectFit: "contain",
  },
}));
export const AllProductsSlide = styled(Box)(({ theme }) => ({
  "& .slick-track": {
    margin: "0",
  },
}));
export const useStyles = makeStyles()((theme) => {
  return {
    mapSection: {
      "& .MuiTypography-h5": {
        margin: "0 0 0 4px",
      },
    },
    locIcon: {
      color: "#D7282F",
    },
    typeTxt: {
      fontSize: "14px !important",
      fontWeight: "600 !important",
    },
    mapImg: {
      "& img": {
        width: "100%",
      },
    },
    mapContainer: {
      width: "720px",
    },
    SelectDropdown: {},
    searchbarright: { margin: "0" },
  };
});

export const CompanyInfoPopup = styled(Stack)(({ theme }) => ({
  "&:hover": {
    "& .MapFlyout": {
      maxHeight: "310px",
      "@media (max-width: 1200px) and (min-width: 900px)": {
        maxHeight: "430px",
      },
      "@media (max-width: 900px) and (min-width: 600px)": {
        maxHeight: "430px",
        overflowY: "auto",
      },
      "@media (max-width: 600px) and (min-width: 320px)": {
        overflowY: "auto",
      },
    },
    "& .MuiButtonBase-root": {
      transform: "rotate(180deg)",
      "& .MuiSvgIcon-root": {
        color: "#D7282F",
      },
    },
  },
  "& .MuiButtonBase-root": {
    transform: "rotate(0deg)", // Correctly applied
    transition: "all ease .3s",
  },
}));

export const Mapcontainer = styled(Box)(({ theme }) => ({
  width: "820px",
  position: "absolute",
  zIndex: "3",
  top: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0px 3px 6px #cccccc",
  transition: "max-height .4s",
  overflow: "hidden",
  maxHeight: "0",
  left: 0,
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#ffff",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
  "@media (max-width: 1200px) and (min-width: 900px)": {
    width: "680px",
    left: "-155px",
  },
  "@media (max-width: 900px) and (min-width: 600px)": {
    width: "550px",
    left: "0px",
  },
  "@media (max-width: 600px) and (min-width: 320px)": {
    width: "330px",
    left: "-155px",
  },
  "@media screen and (max-width:480px)": {
    width: "280px",
    left: "-160px",
  },
  "@media screen and (max-width:320px)": {
    width: "250px",
    left: "-150px",
  },
}));

export const Mapimage = styled(Box)(({ theme }) => ({
  width: "100%",
  "& img": {
    maxWidth: "100%",
  },
}));

export const Thumbsup = styled(ThumbUpAltOutlinedIcon)(({ theme }) => ({
  color: "#44D600",
  backgroundColor: "#ECFBE6",
  padding: "5px",
  marginRight: "10px",
  borderRadius: "6px",
}));

export const Ratingg = styled(Typography)(() => ({
  fontSize: "21px",
  fontWeight: 600,
}));

export const Qualitybox = styled(Box)(() => ({
  border: "1px solid #B7FFD6",
  backgroundColor: "#ECFAF2",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const Response = styled(Box)(() => ({
  border: "1px solid #FFD8DF",
  backgroundColor: "#FFF3F5",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const Delivery = styled(Box)(() => ({
  border: "1px solid #FFE9C6",
  backgroundColor: "#FFF3E0",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const BoxText = styled(Typography)(() => ({
  fontSize: "16px !important",
  fontWeight: 600,
  color: "#231F20",
  marginLeft: "10px !important",
}));

export const Wrong = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: 600,
  color: "#231F20",
}));

export const RadioText = styled(Typography)(() => ({
  fontSize: "16px !important",
  fontWeight: 400,
  color: "#231F20",
}));

export const PaddingX = styled(FormControlLabel)(() => ({
  paddingLeft: "16px",
  marginTop: "3px",
  marginBottom: "3px",
  "& .MuiFormControlLabel-label": { fontSize: "14px" },
}));

export const Commentsection = styled(TextareaAutosize)(() => ({
  border: "1px solid grey",
  padding: "12px",
  width: "100%",
  borderRadius: "10px",
  resize: "none",
}));

export const Nohtml = styled(Typography)(() => ({
  fontSize: "12px !important",
  fontWeight: 400,
  color: "#727272",
}));

export const TextBlack = styled(Typography)(() => ({
  fontSize: "12px !important",
  fontWeight: 400,
  color: "#231F20",
}));
export const TextRed = styled("span")(() => ({
  fontSize: "12px !important",
  fontWeight: 400,
  color: "#D7282F !important",
}));
export const Buttonstyle = styled(ButtonBase)(() => ({
  backgroundColor: "#D7282F !important",
  color: "#ffff !important",
  borderRadius: "6px !important",
  padding: "10px !important",
  textTransform: "capitalize",
  fontSize: "14px",
  fontWeight: 600,
  transition: "0.3s !important",
  "@media (max-width: 767px)": {
    fontSize: "13px",
    padding: "6px 10px !important",
  },
  "&:hover": {
    background: "rgba(215, 40, 47, .85) !important",
    transition: "0.3s !important",
  },
}));

export const Floatright = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  marginTop: "10px",
}));

export const TypeStyle = styled(Typography)(() => ({
  fontSize: 12,
  fontWeight: 600,
  fontFamily: "Open sans",
  color: "rgba(35, 31, 32, 1)",
  "& span": {
    fontWeight: 400,
    fontSize: 12,
    fontFamily: "Open sans",
    color: "rgba(35, 31, 32, 1)",
  },
}));

export const InStockStyle = styled(Typography)(() => ({
  color: "#34A853",
  fontFamily: "Open sans",
  fontSize: 14,
  fontWeight: 600,
  whiteSpace: "nowrap",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 5,
  "@media screen and (max-width: 1500px)": {
    fontSize: "12px",
  },
  "& svg": {
    width: 15,
    "@media screen and (max-width: 1500px)": {
      fontSize: "12px",
      gap: 2,
    },
  },
}));

export const ByOrderStyle = styled(Typography)(() => ({
  color: "rgba(215, 40, 47, 1)",
  fontFamily: "Open sans",
  fontSize: 14,
  fontWeight: 600,
  whiteSpace: "nowrap",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 5,
  "@media screen and (max-width: 1500px)": {
    fontSize: "12px",
  },
  "& svg": {
    width: 15,
    "@media screen and (max-width: 1500px)": {
      fontSize: "12px",
      gap: 2,
    },
  },
}));

export const CustomPopover = styled(Popover)(() => ({
  "& .MuiPopover-paper": {
    minWidth: "120px",
    width: "180px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
  },
  "& .MuiTypography-root": {
    fontSize: "13px",
    borderTop: "1px solid #dddddd",
    "&:first-child": {
      borderTop: "0",
    },
  },
}));
export const SelectProduct = styled(Box)(() => ({
  display: "flex",
  borderLeft: "1px solid #CCCEDD",
  alignItems: "center",
  flexBasis: "content",
  background: "#f5f5f5",
  padding: "14px 2px",
  "@media screen and (max-width: 767px)": {
    border: "0",
    display: "none",
    "& .MuiTypography-body1": {
      display: "none",
    },
    "& .MuiIconButton-sizeSmall": {
      display: "none",
    },
  },
}));
export const CloseButton = styled(Box)(() => ({
  width: "36px",
  height: "22px",
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 6px 0 4px",
  borderLeft: "1px solid #dddddd",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
  "&:hover": {
    "& .MuiSvgIcon-root": {
      color: "#D7282F",
    },
  },
}));
export const ContentAlign = styled(Stack)(() => ({
  marginTop: "2px !important",
  alignItems: "baseline",
  "@media (max-width: 699px)": {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    width: "100%",
  },
}));
export const FooterContainer = styled(Box)(() => ({
  "@media (max-width: 767px)": {
    "& .MuiStack-root": {
      flexDirection: "row",
      gap: "5px",
      "& .MuiTypography-caption": {
        margin: "0 0 6px 0",
        padding: "0",
        textAlign: "center",
      },
    },
    "& .MuiBox-root": {
      flexDirection: "column-reverse",
    },
  },
}));

export const FloatingMenuBoxx = styled(Box)(() => ({
  "& .Floatingcard": {
    minWidth: 300,
    "@media screen and (max-width: 480px)": {
      minWidth: "300",
    },
    "@media screen and (max-width: 340px)": {
      minWidth: "100%",
    },
  },
}));

export const ContactSeller = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: 700,
  "@media screen and (max-width: 1600px)": {
    fontSize: "16px",
  },
  "@media screen and (max-width: 767px)": {
    fontSize: "14px",
  },
}));

export const FloatingInformation = styled(Box)(() => ({}));
export const FloatingUser = styled(Typography)(() => ({
  fontSize: "12px",
}));

export const FloatingName = styled(Typography)(() => ({
  fontSize: "14px",
}));
export const SellerThumbImg = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  "& img": {
    width: "38px",
    height: "38px",
  },
}));

export const UserNameMini = styled("span")({
  color: "#231f20",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "16px",
  display: "none",
  "@media screen and (max-width: 480px)": {
    display: "block",
    padding: "5px",
  },
});

export const TypographyMiniUserName = styled("span")({
  fontSize: "14px",
  fontWeight: 700,
  color: "#231F20",

  "@media screen and (max-width:1024px)": {
    fontSize: "13px",
  },
  "@media screen and (max-width:480px)": {
    display: "none",
  },
});

export const AppBarArea = styled(Box)({
  "@media screen and (max-width: 767px)": {
    display: "flex",
  },
});

export const MenuStyle = {
  "& .MuiPaper-root": {
    zIndex: 100,
    margin: "-8px 0 0",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "30px",
  },
  "& .MuiTypography-root": {
    fontSize: "14px",
  },
};

export const AppBarStyle = {
  padding: "0 10px",
};

export const MiniSiteLogo = styled(Box)({
  marginRight: "20px",
  "@media screen and (max-width: 1024px)": {
    "& img": {
      width: "160px",
      height: "auto",
    },
  },
  "@media screen and (max-width: 767px)": {
    margin: "7px 20px 0",
    "& img": {
      width: "150px",
      height: "auto",
    },
  },
});

export const BoxForMobile = styled(Box)({
  display: "flex",
  gap: 10,
  "@media screen and (max-width: 700px)": {
    display: "flex",
    gap: 10,
  },
  "& .Minisearchbox": {
    "@media screen and (max-width: 767px)": {
      display: "none",
    },
  },
});

export const SearchBoxForMobile = styled(Box)({
  display: "none",
  "@media screen and (max-width:767px)": {
    display: "block",
    margin: "0 4px 10px",
  },
});

export const BoxMiniUserInfo = styled(Box)({
  "@media screen and (max-width: 899px)": {
    position: "absolute",
    top: 10,
    right: 0,
  },
});
export const SelectStack = styled(Stack)({
  "& .selectarrow": {
    padding: 0,
  },
});

//--------------new map------------------------------------------------------------
export const MapTndTextFlex = styled(Box)({
  display: "flex",
  gap: "12px",
  padding: "0px 0px 12px 0px",
});
export const MapBox = styled(Box)({});
export const Popoverdata = styled("p")({
  padding: "3px 12px!important",
  borderRadius: "0 !important",
  textTransform: "capitalize",
  "&::before": {
    content: '""',
    width: "5px",
    height: "5px",
    backgroundColor: "black",
    margin: "0 -8px 0",
    borderRadius: "50%",
    display: "inline-block",
    position: "relative",
    top: "-2px",
    left: "-2px",
    marginRight: "4px",
  },
});
export const CompanyName = styled(Typography)({
  fontSize: "18px",
  fontWeight: "700",
  color: "#231f20",
  textAlign: "left",
});
export const Since = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  color: "#4a4a4a",
});
export const VarifyBox = styled(Box)({
  padding: "4px 8px",
  width: "auto",
  borderRadius: "6px",
  textAlign: "center",
});
export const VarifyText = styled(Typography)({
  fontSize: "10px",
  fontWeight: "700",
});
export const TextFlex = styled(Box)({});
export const HeadingLabel = styled(Typography)({
  fontSize: "13px",
  fontWeight: "400",
  color: "#4a4a4a",
  padding: "4px 0px",
  textAlign: "left",
});
export const AnswerLabel = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  color: "#231f20",
  padding: "4px 0px",
  textAlign: "left",
});
export const MainProductBox = styled(Box)({
  display: "flex",
  width: "90%",
  margin: "0 auto",
  gap: "12px",
});
export const MapcrowntBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});
export const MapcrowntBoxImage = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "& .enterpricebadge": {
    width: "100px",
  },
});

export const BusinessTypeBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "@media screen and (max-width:900px)": {
    display: "block",
  },
});

export const ProductItemInfoCardOuter = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  height: "100%",
  position: "relative",
  paddingBottom: "60px",
  "& .productCenterInfo": {
    borderTop: "1px dashed #EAEAEA !important",
    margin: "5px 10px 0",
    padding: "5px 0",
  },
  "& .slick-slide": {
    display: "grid",
    height: "auto",
  },
  "&:hover": {
    "& .tileFooter": {
      bottom: "0",
    },
  },
});

export const ViewMoreProductts = styled(Box)({
  margin: "2rem auto 1rem",
});
export const CompanyprofileMNewsroom = styled(Box)({
  height: "100%",
  "& .newsroomsecright": {
    height: "100%",
    // padding: "0 0 0 25px",
  },
});
export const NewsRoomRightSide = styled(Box)({
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  padding: 15,
  height: "500px",
  borderRadius: "4px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
});
export const MiniScrollTop = styled(Box)({
  "& .scroll-container": {
    position: "fixed",
    bottom: 10,
    right: 10,
    "& .MuiFab-root": {
      background: "#000",
      svg: {
        color: "#fff",
      },
    },
  },

  "& .scroll-container:before": {
    content: "''",
    display: "block",
    height: "100%",
    pointerEvents: "none",
  },

  "& .scroll-container a": {
    position: "sticky",
    top: "88vh",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    background: "#000",
    color: "#fff",
    display: "flex",
    borderRadius: "50px",
    justifyContent: "center",
    alignItems: "center",
  },
});
export const SocialCol = styled(Box)({
  "&:hover": {
    "& .MuiButtonBase-root": {
      backgroundColor: "#d7282f",
      "& i": {
        color: "#FFFFFF",
      },
    },
    "& .containerHover": {
      pointerEvents: "inherit",
      "& .social-icon1": {
        transform: "scale(1)",
        transitionDelay: "210ms",
      },
      "& .social-icon2": {
        transform: "scale(1)",
        transitionDelay: "180ms",
      },
      "& .social-icon3": {
        transform: "scale(1)",
        transitionDelay: "150ms",
      },
      "& .social-icon4": {
        transform: "scale(1)",
        transitionDelay: "130ms",
      },
      "& .social-icon5": {
        transform: "scale(1)",
        transitionDelay: "100ms",
      },
      "& .social-icon6": {
        transform: "scale(1)",
        transitionDelay: "90ms",
      },
      "& .social-icon7": {
        transform: "scale(1)",
        transitionDelay: "60ms",
      },
    },
  },
});

export const IconsContainer = styled(Box)({
  position: "absolute",
  right: "100%",
  zIndex: 2,
  top: "0",
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  paddingRight: "8px",
  pointerEvents: "none",
  "& .social-icon1": {
    transition: "all ease .3s",
    transform: "scale(0)",
    transitionDelay: "0ms",
  },
  "& .social-icon2": {
    transition: "all ease .3s",
    transform: "scale(0)",
    transitionDelay: "30ms",
  },
  "& .social-icon3": {
    transition: "all ease .3s",
    transform: "scale(0)",
    transitionDelay: "60ms",
  },
  "& .social-icon4": {
    transition: "all ease .3s",
    transform: "scale(0)",
    transitionDelay: "90ms",
  },
  "& .social-icon5": {
    transition: "all ease .3s",
    transform: "scale(0)",
    transitionDelay: "120ms",
  },
  "& .social-icon6": {
    transition: "all ease .3s",
    transform: "scale(0)",
    transitionDelay: "150ms",
  },
  "& .social-icon7": {
    transition: "all ease .3s",
    transform: "scale(0)",
    transitionDelay: "180ms",
  },
});

export const TwitterIco = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "100px",
  backgroundColor: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "& i": {
    fontSize: "15px",
    color: "#ffffff",
  },
  "&:hover": {
    boxShadow: "0 0 8px #1DA1F2",
  },
});
export const FacebookIco = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "100px",
  backgroundColor: "#3b5998",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "& i": {
    fontSize: "24px",
    color: "#ffffff",
  },
  "&:hover": {
    boxShadow: "0 0 8px #3b5998",
  },
});
export const CopyIco = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "100px",
  backgroundColor: "#231f20",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "& svg": {
    fontSize: "24px",
    color: "#fff",
  },
  "&:hover": {
    boxShadow: "0 0 8px rgb(97, 114, 146)",
  },
});
export const LinkedinIco = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "100px",
  backgroundColor: "#0077b5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "& i": {
    fontSize: "16px",
    color: "#ffffff",
  },
  "&:hover": {
    boxShadow: "0 0 8px #0077b5",
  },
});
export const WhatsappIco = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "100px",
  backgroundColor: "#44d600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "& i": {
    fontSize: "20px",
    color: "#ffffff",
  },
  "&:hover": {
    boxShadow: "0 0 8px #44d600",
  },
});
export const InstaIco = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "100px",
  backgroundColor: "#ff00b8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "& i": {
    fontSize: "18px",
    color: "#ffffff",
  },
  "&:hover": {
    boxShadow: "0 0 8px #ff00b8",
  },
});

export const SkypeIco = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "100px",
  backgroundColor: "#00aff0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "& i:before": {
    fontSize: "18px",
    color: "#ffffff",
  },
  "&:hover": {
    boxShadow: "0 0 8px #00aff0",
  },
});

export const WechatIco = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "100px",
  backgroundColor: "#44d600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "& i:before": {
    fontSize: "20px",
    color: "#ffffff",
  },
  "&:hover": {
    boxShadow: "0 0 8px #44d600",
  },
});

export const ScrollHiddenDiv = styled(Box)({
  position: "relative",
  top: "-60px",
  margin: "0 !important",
});

// for viewmore and viewless
export const ViewMoreLessBox = styled(Box)({
  "& p": {
    display: "inline",
  },
  "& span": {
    padding: "0 0 0 10px",
  },
});
export const ViewMoreLessText = styled(Typography)({
  fontSize: "12px",
  cursor: "pointer",
  color: "#d7282f",
  fontWeight: "600",
  "&:hover": {
    textDecoration: "underline",
  },
});

/*****===== ProductCard style change with hover tile =====*****/
export const ProductHeadePriceButton = styled(ButtonBase)(({ theme }: any) => ({
  justifyContent: "space-between",
  gap: "8px",
  borderRadius: "6px !important",
  backgroundColor: "rgba(215, 40, 47, .1)!important",
  color: "rgba(215, 40, 47, 1)!important",
  fontSize: "13px!important",
  fontWeight: 600,
  fontFamily: "Open sans!important",
  padding: "4px 10px !important",
  "& span": {
    color: "rgba(215, 40, 47, 1)!important",
    fontSize: "13px !important",
    fontWeight: 600,
    fontFamily: "Open sans !important",
    whiteSpace: "nowrap",
  },
  "& svg": {
    width: 14,
  },
}));

export const SingleSliderBox = styled(Box)({
  // height: "421px",
  margin: "0 0 40px 0",
  "@media screen and (max-width:1200px)": {
    // height: "290px",
    margin: "0 0 40px 0",
  },
  "@media screen and (max-width:900px)": {
    // height: "200px",
    margin: "0 0 20px 0",
  },
  "& .bannerslidesimage": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    maxHeight: "fit-content",
    // "@media screen and (max-width:1200px)": {
    //   height: "290px",
    //   objectFit: "contain",
    //   minHeight: "290px",
    //   maxHeight: "290px",
    // },
    // "@media screen and (max-width:900px)": {
    //   height: "fit-content",
    //   objectFit: "contain",
    //   minHeight: "200px",
    //   maxHeight: "200px",
    // },
    // "@media screen and (max-width:600px)": {
    //   height: "100%",
    //   objectFit: "contain",
    //   width: "fit-content",
    // },
  },
});

/*****===== Start Styling for Company facility new design implementation ===== *****/

export const MiniComFacilityInnerData = styled(Box)({});
export const CFSubHeading = styled(Typography)({
  fontWeight: "600",
});
export const ComFacilitySubComponent = styled(Box)({
  borderRadius: "4px",
  margin: "10px 0",
  border: "1px solid #ddd",
  "& .MuiTypography-h4": {
    fontSize: "16px",
    background: "#fff1f1",
    padding: "0.3rem 1rem",
    fontWeight: "600",
    borderRadius: "4px",
  },
});
export const SubComponentData = styled(Box)({
  padding: "1rem",
});
export const ImagesShowBox = styled(Box)({
  display: "inline-flex",
  flexWrap: "wrap",
});

/*****===== End Styling for Company facility new design implementation ===== *****/

export const Loader = styled("div")(({ theme }) => ({
  transform: "rotateZ(45deg)",
  perspective: "1000px",
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  color: "#231f20",
  position: "relative",
  "&:before, &:after": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "inherit",
    height: "inherit",
    borderRadius: "50%",
    transform: "rotateX(70deg)",
    animation: "1s spin linear infinite",
  },
  "&:after": {
    color: "#d7282f",
    transform: "rotateY(70deg)",
    animationDelay: ".4s",
  },
  "@keyframes rotate": {
    "0%": {
      transform: "translate(-50%, -50%) rotateZ(0deg)",
    },
    "100%": {
      transform: "translate(-50%, -50%) rotateZ(360deg)",
    },
  },
  "@keyframes rotateccw": {
    "0%": {
      transform: "translate(-50%, -50%) rotate(0deg)",
    },
    "100%": {
      transform: "translate(-50%, -50%) rotate(-360deg)",
    },
  },
  "@keyframes spin": {
    "0%, 100%": {
      boxShadow: ".2em 0px 0 0px currentcolor",
    },
    "12%": {
      boxShadow: ".2em .2em 0 0 currentcolor",
    },
    "25%": {
      boxShadow: "0 .2em 0 0px currentcolor",
    },
    "37%": {
      boxShadow: "-.2em .2em 0 0 currentcolor",
    },
    "50%": {
      boxShadow: "-.2em 0 0 0 currentcolor",
    },
    "62%": {
      boxShadow: "-.2em -.2em 0 0 currentcolor",
    },
    "75%": {
      boxShadow: "0px -.2em 0 0 currentcolor",
    },
    "87%": {
      boxShadow: ".2em -.2em 0 0 currentcolor",
    },
  },
}));
export const CloneBoxSectionMini = styled(Box)({
  "& .common-section": {
    // background:"#f7f7f7",
    border: "1px solid #ddd",
    margin: "8px 8px 8px",
    padding: "5px 0 0",
    borderRadius: "4px",
  },
  "& .CPTextViewBox": {
    margin: "1px 0 0",
  },
});
export const SectionsOuterBox = styled(Box)({
  border: "1px solid #ddd",
  borderRadius: "4px",
  padding: "1rem",
  margin: "10px 0 24px 0",
});
export const SectionsInnerBox = styled(Box)({
  margin: "0 0 24px 0",
  border: "1px solid #e2e2e2",
  borderRadius: "10px",
});
export const SectionsHeading = styled(Typography)({
  textTransform: "capitalize",
  background: "#fff1f1",
  fontSize: "16px",
  padding: "0.3rem 1rem",
  fontWeight: "600",
  borderRadius: "10px 10px 0 0",
  margin: "0 0 16px 0",
});

export const TargetInnerSection = styled(Box)({
  "& .MuiButtonBase-root": {
    textTransform: "capitalize",
  },
});
