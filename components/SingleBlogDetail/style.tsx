import {
  Box,
  ButtonBase,
  Divider,
  InputBase,
  Link,
  List,
  Typography,
  styled,
} from "@mui/material";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { TreeItem } from "@mui/lab";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import YouTubeIcon from "@mui/icons-material/YouTube";

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
    background: "rgba(0,0,0,0.66)",
    position: "absolute",
  },
}));

export const Textoverimg1 = styled(Typography)(() => ({
  fontSize: "40px",
  fontWeight: "700",
  color: "#FFFFFF",
  padding: "0 10%",
  "@media (max-width: 900px)": {
    fontSize: "32px ",
    fontWeight: "600",
  },
  "@media (max-width: 600px)": {
    fontSize: "24px ",
  },
  "@media (max-width: 400px)": {
    fontSize: "18px ",
  },
}));

export const Textoverimg2 = styled(Typography)(() => ({
  fontSize: "20px ",
  fontWeight: "600",
  color: "#FFFFFF",
  "@media (max-width: 600px)": {
    fontSize: "16px ",
  },
  "@media (max-width: 400px)": {
    fontSize: "14px ",
  },
}));

export const Heading = styled(Typography)(() => ({
  fontSize: "20px ",
  fontWeight: "700 ",
  color: "#D7282F",
  marginTop: "30px ",
  marginBottom: "40px ",
}));

export const Imagetext = styled(Typography)(() => ({
  fontSize: "30px ",
  fontWeight: "600 ",
  color: "#231F20",
}));

export const Threetext = styled(Typography)(() => ({
  fontSize: "12px ",
  fontWeight: "400 ",
  color: "#4A4A4A",
  display: "flex",
  alignItems: "center",
}));
export const Paragraph = styled(Typography)(() => ({
  fontSize: "13px ",
  fontWeight: "400 ",
  marginTop: "10px ",
  color: "#4A4A4A",
}));

export const Borderall = styled(Box)(() => ({
  border: "1px solid #E7E7E7",
  borderRadius: "20px",

  "@media (max-width: 600px)": {
    marginTop: "50px ",
  },
}));

export const SearchBox = styled(Box)(() => ({
  backgroundColor: "#F8F8F8",
  padding: "10px 0px 18px 0px",
  "@media (max-width: 600px)": {
    marginTop: "20px ",
  },
}));

export const Searchtext = styled(Typography)(() => ({
  fontWeight: "600 ",
  fontSize: "25px ",
  color: "#231F20",
  borderLeft: "3px solid red",
  paddingLeft: "10px",
  paddingRight: "10px ",
}));

export const Searchbar = styled("div")(({ theme }) => ({
  border: "1px solid #CCCEDD",
  paddingLeft: "10px",
  position: "relative",
  marginLeft: "10px ",
  marginTop: "15px",
  borderRadius: "3px",
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  marginRight: "10px",
  "&:hover": {
    borderColor: "#a7a7a7",
  },
  "& .MuiInputBase-input": {
    paddingLeft: 0,
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  marginRight: "6px",
  "&:hover": {
    "& .MuiSvgIcon-root": {
      color: "#D7282F",
    },
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  backgroundColor: "#ffffff",
  width: "100%",
  "& .MuiInputBase-input": {
    width: "100%",
    height: "30px",
  },
}));

export const Categorybox = styled(Box)(() => ({
  backgroundColor: "#F8F8F8",
  marginTop: "20px",
  padding: "10px 0px 18px 0px",
}));

export const Categorytext = styled(Typography)(() => ({
  fontWeight: "600 ",
  fontSize: "25px ",
  color: "#231F20",
  borderLeft: "3px solid red",
  paddingLeft: "10px",
  paddingRight: "10px ",
}));

export const Recentbox = styled(Box)(() => ({
  backgroundColor: "#F8F8F8",
  marginTop: "20px",
  padding: "10px 12px 18px 0px",
}));

export const Recenttext = styled(Typography)(() => ({
  fontWeight: "600 ",
  fontSize: "25px ",
  color: "#231F20",
  borderLeft: "3px solid red",
  paddingLeft: "10px",
  paddingRight: "10px ",
}));

export const Sidehead = styled(Typography)(() => ({
  fontSize: "14px ",
  fontWeight: "600 ",
  color: "#D7282F ",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  display: "-webkit-box",
  minHeight: "40px",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const Sidehead2 = styled(Typography)(() => ({
  fontSize: "14px ",
  fontWeight: "600 ",
  color: "#000 ",
  marginTop: "10px",
  borderBottom: "1px solid #e2e2e2",
  "&:hover": {
    color: "#d7282f ",
  },
}));

export const Sidetext = styled(Typography)(() => ({
  fontSize: "14px ",
  fontWeight: "400 ",
}));

export const Followbox = styled(Box)(() => ({
  backgroundColor: "#F8F8F8",
  marginTop: "20px",
  padding: "10px 12px 18px 0px",
}));

export const Followtext = styled(Typography)(() => ({
  fontWeight: "600 ",
  fontSize: "25px ",
  color: "#231F20",
  borderLeft: "3px solid red",
  paddingLeft: "10px",
  paddingRight: "10px ",
}));

export const Icon1 = styled(DateRangeOutlinedIcon)(() => ({
  color: "#D7282F",
  width: "14.4px",
  height: "16px",
  marginRight: "8px",
}));

export const Icon2 = styled(AccountCircleOutlinedIcon)(() => ({
  color: "#D7282F",
  width: "14.4px",
  height: "16px",
  marginRight: "8px",
}));

export const Treemt = styled(TreeItem)(() => ({
  marginTop: "9px",
  fontWeight: "400 ",
  fontSize: "14px ",
}));

export const Buttonone = styled(ButtonBase)(() => ({
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "14px",
  fontWeight: "600",
  height: "36.22px",
  width: "167.76px",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "ease-in .3s",
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  "&:hover": {
    backgroundColor: "#D7282F",
    color: "#ffff",
    "& .MuiBox-root": {
      borderColor: "white",
    },
  },
}));

export const Buttonicon = styled(ArrowCircleRightOutlinedIcon)(() => ({
  height: "25px ",
  width: "25px ",
  marginRight: "5px",
  paddingRight: "5px",
}));

export const Dividerheight = styled(Box)(() => ({
  border: "1.06px solid #EE4D54",
  height: "18px",
  marginRight: "5px",
  marginLeft: "-5px",
  transition: "ease-in .3s",
}));

export const Img = styled("img")(() => ({
  cursor: "pointer",
  zIndex: "1",
  display: "flex",
  width: "100%",
  transition: "all 0.5s ease-in",
  "&:hover": {
    boxShadow: "inset 0 0 0 0 rgba(0,0,0,0.6), 0 0 10px rgba(0,0,0,0.3)",
    borderRadius: "20px 0px 0px 20px",
    transition: "all 0.5s ease-in",
  },
}));

export const Socialimgs = styled("img")(() => ({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "grey",
    borderRadius: "50%",
    fill: "green ",
  },
}));

export const Linkdecoration = styled(Link)(() => ({
  textDecoration: "none",
  cursor: "pointer",
  "& img": {
    maxWidth: "100%",
  },
  "&:hover": {
    "& img": {
      opacity: ".9",
    },
  },
}));

export const Newsspan = styled("span")(() => ({
  textDecoration: "none",
  cursor: "pointer",
  paddingLeft: "4px",
}));

export const Threetextspan = styled("span")(() => ({
  fontSize: "12px ",
  fontWeight: 400,
  display: "flex",
  alignItems: "center",
  color: "#D7282F",
}));

export const ByFont = styled("span")(() => ({
  fontSize: "18px ",
  fontWeight: 600,
  color: "#FFFFFF",
  display: "block",
  "@media (max-width: 768px)": {
    fontSize: "16px",
  },
}));

export const Datefont = styled("span")(() => ({
  fontSize: "30px ",
  fontWeight: 600,
  color: "#FFFFFF",
  display: "block",
  "@media (max-width: 768px)": {
    fontSize: "22px",
  },
}));

export const Twentyforseven = styled("span")(() => ({
  fontWeight: 700,
  fontSize: "52px",
  color: "#D7282F",
}));

export const Supporttext = styled("span")(() => ({
  fontWeight: 700,
  fontSize: "52px",
  color: "#D7282F",
}));

export const Sixteen = styled("span")(() => ({
  display: "block",
  fontWeight: 600,
  fontSize: "18px",
  color: "#FFFFFF",
}));

export const Comments = styled("span")(() => ({
  display: "block",
  fontWeight: 600,
  fontSize: "18px",
  color: "#FFFFFF",
}));

export const Faceboo = styled(FacebookIcon)(() => ({
  height: "34px",
  width: "34px",
  borderRadius: "50%",
  marginLeft: "10px",
  border: "1px solid #DDDDDD",
  padding: "5px",
  color: "#1877f2",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    borderColor: "#cbc8c8",
  },
}));
export const YouTubeIco = styled(YouTubeIcon)(() => ({
  height: "34px",
  width: "34px",
  borderRadius: "50%",
  marginLeft: "10px",
  border: "1px solid #DDDDDD",
  padding: "5px",
  color: "#CD201F",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    borderColor: "#cbc8c8",
  },
}));

export const Twitte = styled(TwitterIcon)(() => ({
  height: "34px",
  width: "34px",
  borderRadius: "50%",
  marginLeft: "10px",
  border: "1px solid #DDDDDD",
  padding: "5px",
  color: "#1DA1F2",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    borderColor: "#cbc8c8",
  },
}));
export const LinkedI = styled(LinkedInIcon)(() => ({
  height: "34px",
  width: "34px",
  borderRadius: "50%",
  marginLeft: "10px",
  border: "1px solid #DDDDDD",
  padding: "5px",
  color: "#0072b1",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    borderColor: "#cbc8c8",
  },
}));
export const Instagra = styled(InstagramIcon)(() => ({
  height: "34px",
  width: "34px",
  borderRadius: "50%",
  marginLeft: "10px",
  border: "1px solid #DDDDDD",
  padding: "5px",
  color: "#c92bb7",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    borderColor: "#cbc8c8",
  },
}));

// blog detail

export const Headingdetail = styled(Typography)(() => ({
  fontSize: "20px ",
  fontWeight: "700 ",
  color: "#D7282F",
  marginTop: "30px ",
}));

export const Subheading = styled(Typography)(() => ({
  fontSize: "25px ",
  fontWeight: "500 ",
  color: "#231F20",
  marginTop: "0px",
}));
export const Divide = styled(Divider)(() => ({
  color: "#EBEBEB",
  marginTop: "12px",
  height: "1px",
}));
export const BoxOne = styled(Box)(() => ({
  height: "107px",
  width: "100%",
  backgroundColor: "#D7282F",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  flexDirection: "column",
  position: "relative",
  "&.active": {
    "&::after": {
      content: '" "',
      position: "absolute",
      right: "-17px",
      borderTop: "18px solid transparent",
      borderBottom: "18px solid transparent",
      borderLeft: "18px solid #D7282F",

      "@media (max-width: 768px)": {
        borderLeft: "18px solid transparent",
        borderRight: "18px solid transparent",
        borderTop: "18px solid #D7282F",
        right: "50%",
        bottom: "-32px",
        transform: "translate(50% , 0)",
      },
    },
  },
}));
export const BoxTwo = styled(Box)(() => ({
  height: "107px",
  width: "100%",
  backgroundColor: "#BA0E15",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  flexDirection: "column",
}));
export const Ownertext = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "21px",
  color: "#FFFFFF",
  "@media (max-width: 768px)": {
    fontSize: "18px",
  },
}));
export const Datetext = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "18px",
  color: "#FFFFFF",
}));
export const Commenttext = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "18px",
  color: "#FFFFFF",
}));
export const Rhombus = styled(Box)(() => ({
  width: "0",
  height: "0",
  borderLeft: "16px solid #D7282F",
  borderTop: "16px solid transparent",
  borderBottom: "16px solid transparent",
  position: "absolute",
  zIndex: "-1",
  top: "50%",
  right: "-14px",
  transform: "translate(0px, -50%)",
}));
export const Imgbox = styled(Box)(() => ({
  borderRadius: "20px",
  border: "1px solid #E7E7E7",
  padding: "8px",
  overflow: "hidden",
  "& .slick-dots": {
    bottom: "0px",
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
}));
export const SliderImgbox = styled(Box)(() => ({
  height: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  borderRadius: "8px",
  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },
}));
export const DateYear = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
}));
export const Paradetail = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "13px",
  color: "#4A4A4A",
  lineHeight: "20px",
}));
export const Buttondetail = styled(ButtonBase)(() => ({
  backgroundColor: "#D7282F",
  borderRadius: "2px",
  height: "34.22px",
  width: "150.49px",
  opacity: "0.9",
  transition: " .5s",
  "&:hover": {
    backgroundColor: "#231f20",
    transition: " 1s",
  },
}));
export const Butntext = styled(Typography)(() => ({
  color: "#ffff",
  fontSize: "14px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
}));

export const Iconforbutton = styled(ArrowCircleRightOutlinedIcon)(() => ({
  height: "25px ",
  width: "25px ",
  paddingRight: "5px",
  paddingLeft: "5px",
  color: "#ffff",
}));

export const Aboutheading = styled(Typography)(() => ({
  fontSize: "35px",
  fontWeight: "600",
  color: "#000000",
}));
export const Aboutpara = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "600",
  color: "#000000",
}));
export const Boxborder = styled(Box)(() => ({
  border: "1px solid #C4C4C4",
  position: "relative",
}));
export const Imageonborder = styled(Box)(() => ({
  position: "absolute",
  left: "-23px",
  top: "55px",
  width: "48px",
  height: "48px",
  backgroundImage: "linear-gradient(to right, #D7282F , #EE777C);",
  borderRadius: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiBox-root": {
    display: "flex",
  },
}));

export const Italictext = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
  fontStyle: "italic",
  color: "#4A4A4A",
  padding: "20px",
}));
export const Italictextauthor = styled(Typography)(() => ({
  fontSize: "17px",
  fontWeight: "600 ",
  color: "#231F20",
  marginLeft: "19px",
}));
export const Texttwentyforseven = styled(Typography)(() => ({
  fontSize: "55px",
  fontWeight: "700 ",
  color: "#231F20",
}));
export const Iconforlist = styled(TaskAltOutlinedIcon)(() => ({
  marginRight: "10px",
  color: "#231F20",
  height: "22px",
  width: "22px",
}));
export const Next = styled(ChevronRightIcon)(() => ({
  backgroundColor: "rgba(0,0,0,0.6)",
  color: "#ffff",
  height: "30px",
  width: "30px",
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
}));

export const Previous = styled(ChevronLeftIcon)(() => ({
  backgroundColor: "rgba(0,0,0,0.6)",
  color: "#ffff",
  height: "30px",
  width: "30px",
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
}));

export const CategoryListing = styled(Box)(() => ({
  "& .MuiTreeView-root": {
    margin: "16px 12px 0",
    "& .MuiTreeItem-content": {
      padding: "4px 0",
      borderRadius: "4px",
      margin: "1px 0",
      transition: "all ease .3s",
      "&:hover": {
        backgroundColor: "#e7e7e7",
      },
      "& .MuiTreeItem-label": {
        fontSize: "14px",
      },
      "&.Mui-expanded": {
        backgroundColor: "inherit",
        color: "red !important",
      },
      "&.Mui-selected": {
        color: "#000000",
        backgroundColor: "inherit !important",
      },
    },
    "& .MuiTreeItem-group": {
      margin: "0!important",
      "& .MuiTreeItem-root": {
        "& .MuiTreeItem-content": {
          paddingLeft: "18px",
        },
        "& .MuiCollapse-vertical": {
          "& .MuiTreeItem-content": {
            paddingLeft: "28px",
          },
        },
      },
    },
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

export const CreatedInfo = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "15px 0 0",
}));
export const BlogCreated = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "12px",
  gap: "5px",
  "& svg": {
    fontSize: "16px",
    color: "#D7282F",
  },
}));
export const DetailCategoryList = styled(Box)(() => ({
  height: "300px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#F8F8F8",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
  "& .MuiList-root": {
    "& .MuiTypography-root": {
      fontSize: "14px",
    },
    "& .MuiButtonBase-root": {
      paddingTop: "2px",
      paddingBottom: "2px",
    },
  },
}));

export const SearchCategoryList = styled(List)(() => ({
  "& .MuiListItem-root": {
    fontSize: "14px",
    padding: "4px 14px",
  },
}));
export const NoBlogBox = styled(Box)(() => ({
  fontSize: "14px",
  padding: "10px",
}));
export const SuggestioBoxList = styled(Box)(() => ({
  "& .MuiTypography-root": {
    fontSize: "13px",
  },
}));
export const BlogImagee = styled(Box)(() => ({
  width: "50px",
  height: "50px",
  "& img": {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    objectFit: "cover",
  },
}));
export const BlogContentdiv = styled(Box)(() => ({
  paddingBottom: "60px",
}));

export const BreadcrumbSec = styled(Box)(() => ({
  margin: "1rem 0",
  fontSize: "13px",
}));
