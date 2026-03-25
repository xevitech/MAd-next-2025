import {
  Box,
  Button,
  ButtonBase,
  Grid,
  List,
  ListItem,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import { Height, Margin } from "@mui/icons-material";

export const Bgimage = styled(Box)(() => ({
  backgroundImage: `url('/assets/bannerforblog.svg')`,
  height: "423.96px",
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

export const Textoverimg1 = styled(Typography)(() => ({
  fontSize: "40px !important",
  fontWeight: "700",
  color: "#FFFFFF",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "@media (min-width:300px) and (max-width:600px)": {
    fontSize: "13px !important",
    fontWeight: "bold",
  },
  "@media (min-width:600px) and (max-width:900px)": {
    fontSize: "20px !important",
    fontWeight: "bold",
  },
}));

export const Textoverimg2 = styled(Typography)(() => ({
  fontSize: "20px !important",
  fontWeight: "600",
  color: "#FFFFFF",
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "@media (min-width:300px) and (max-width:600px)": {
    fontSize: "13px !important",
    fontWeight: "bold",
  },
  "@media (min-width:600px) and (max-width:900px)": {
    fontSize: "20px !important",
    fontWeight: "bold",
  },
}));

export const Heading = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "20px !important",
  color: "#231F20",
}));

export const Liststyle = styled(List)(() => ({
  marginLeft: "-16px",
  marginTop: "0px",
}));

export const Items = styled(ListItem)(() => ({
  fontWeight: "400 !important",
  fontSize: "14px !important",
  color: "#4A4A4A",
  cursor: "pointer",
  textTransform: "capitalize",
  padding: "4px 16px",
  "&:hover": {
    color: "#D7282F",
  },
}));

export const Rightarrow = styled(KeyboardArrowRightIcon)(() => ({
  color: "#D7282F",
}));

export const ArrowNtext = styled(Typography)(() => ({
  display: "inline-flex",
  color: "#D7282F",
  fontSize: "13px !important",
  fontWeight: "600 !important",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    fontSize: "13px",
    position: "relative",
    top: "3px",
    marginLeft: "2px",
  },
}));

export const Absoluteborderstyle = styled(Box)(() => ({
  borderTopRightRadius: "25px",
  borderBottomRightRadius: "25px",
  position: "absolute",
  top: "47px",
  backgroundColor: "rgba(255, 255, 255)",
  opacity: "0.55",
  padding: "8px",
}));

export const Bgimageabsolute = styled(Box)(() => ({
  position: "absolute",
  left: "35px",
  bottom: "15px",
  "@media (min-width:300px) and (max-width:1200px)": {
    left: "inherit",
    bottom: "15px",
    position: "absolute",
    right: "25px",
  },
}));
export const Bgimageabsolute1 = styled(Box)(() => ({
  position: "absolute",
  right: "25px",
  bottom: "15px",
}));
export const Mainboxborder = styled(Box)(() => ({
  borderRadius: "16px",
  margin: "0 16px 40px",
  padding: "16px",
  border: "1px solid #dddddd",
}));
export const CategoryTabs = styled(Tabs)(() => ({
  "& .MuiTabScrollButton-root": {
    position: "relative",
    "&:before": {
      content: '" "',
      height: "1px",
      width: "100%",
      position: "absolute",
      backgroundColor: "#d2d2d2",
    },
    "& .MuiSvgIcon-root": {
      width: "22px",
      height: "22px",
      margin: "0",
      backgroundColor: "#d2d2d2",
      borderRadius: "50%",
      transition: "all ease .5s",
    },
    "&:hover": {
      "& .MuiSvgIcon-root": {
        backgroundColor: "#D7282F",
        color: "#ffffff",
      },
    },
  },
}));

export const CustomeTab = styled(Tab)(() => ({
  minHeight: "18px",
  marginTop: "2px",
  textTransform: "none",
  whiteSpace: "normal",
  color: "#231F20",
  borderRadius: "6px",
  transition: ".5s",
  fontSize: "13px",
  padding: "6px 16px",
  textAlign: "left",
  "&.Mui-selected": {
    background: "#D7282F !important",
    color: "#ffffff !important",
    transition: ".5s",
  },
  "&:hover": {
    background: "#e7e7e7",
    color: "#000000",
    transition: ".5s",
  },
}));

export const Verticaltabimg = styled("img")(() => ({
  height: "18px",
  width: "18px",
}));

export const Textoverimage = styled(Typography)(() => ({
  position: "absolute",
  top: "53%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  "@media screen and (max-width:899px)": {
    width: "100%",
    padding: "0 10px",
    "& .MuiBreadcrumbs-ol": {
      "& li": {
        "& .MuiTypography-root": {
          fontSize: "12px",
        },
      },
    },
  },
  "& .MuiBreadcrumbs-ol": {
    "& li": {
      color: "#fff",
      transition: "0.2s ease-in",
      "&:hover": {
        color: "#d7282f",
        textDecoration: "underline",
      },
      "& .MuiTypography-root": {
        fontSize: "14px",
        fontWeight: 400,
        "@media screen and (max-width: 767px)": {
          fontSize: "12px",
        },
      },
    },
  },
}));
// export const HeadingCategory = styled("h1")(() => ({
//   "& span": {
//     backgroundColor: "#FFFFFF",
//     padding: "8px 18px",
//     borderRadius: "50px",
//   },
//   fontWeight: "600",
//   fontSize: "16px",
//   color: "#000000",
//   "@media screen and (max-width:600px)": {
//     fontSize: "12px",
//     padding: "4px",
//   },
// }));
export const DescriptionOfCate = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#fff",
  margin: "20px 0 0",
}));

export const AllHeadings = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "600 !important",
  color: "#231F20",
  textTransform: "capitalize",
  marginBottom: "6px",
}));

export const Image = styled("img")(() => ({
  objectFit: "cover",
  width: "100%",
  "@media screen and (max-width:600px)": {
    height: "300px !important",
    width: "100%",
  },
}));

export const MarginleftBox = styled(Box)(() => ({
  marginLeft: "10px",
}));

export const TabRightContent = styled(Box)(() => ({}));
export const PageHeading = styled(Typography)(() => ({
  fontSize: "26px",
  fontWeight: "600",
  margin: "0",
  padding: "6px 0 20px",
}));
export const CateDescription = styled(Box)(() => ({
  fontSize: "13px",
  color: "#231F20",
}));
export const ChildCateThumb = styled(Box)(() => ({
  "& img": {
    height: "90px",
    width: "100%",
    objectFit: "contain",
  },
}));
export const SubCategoryTab = styled(Box)(() => ({
  borderRight: "1px solid #dddddd",
  paddingRight: "10px",
  height: "100%",
  marginTop: "-8px!important",
  "@media (max-width: 900px)": {
    border: "0",
    padding: "0",
  },
  "& .MuiPaper-root": {
    boxShadow: "none",
    margin: "8px 0 !important",
    "&::before": {
      display: "none",
    },
    "& .MuiAccordionSummary-root": {
      padding: "0",
      minHeight: "auto",
      "& .MuiAccordionSummary-content": {
        display: "flex",
        justifyContent: "space-between",
        margin: "0",
        "& .MuiSvgIcon-root": {
          display: "inline-block",
          transition: "all ease .3s",
          transform: "rotate(0deg)",
        },
        "&.Mui-expanded": {
          "& .MuiSvgIcon-root": {
            transform: "rotate(-180deg)",
          },
        },
      },
    },
  },
}));
export const TabIcons = styled(Box)(() => ({
  borderRadius: "4px",
  width: "30px",
  height: "30px",
  display: "flex",
  justifyContent: "center",
  padding: "4px",
  marginRight: "6px",
}));
export const TabSubLink = styled(Box)(() => ({
  "@media screen and (max-width:900px)": {
    maxHeight: "90px",
    overflowY: "auto",
  },
  "& .MuiListItem-root": {
    padding: "4px 16px 4px 22px",
    "& .MuiTypography-root": {
      fontSize: "12px",
      color: "#4A4A4A",
      "&:hover": {
        color: "#D7282F",
      },
    },
    "& .li-active": {
      color: "#d7282f",
      fontWeight: 600,
    },
  },
}));

//  Category sector

export const CategoryMainBox = styled(Box)(() => ({
  // padding: "16px",
  backgroundColor: "#fff",
}));
export const ImageLabelBox = styled(Box)(() => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "20px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  cursor: "pointer",
  "@media screen and (max-width:600px)": {
    borderRadius: "0",
  },

  "& img": {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // width: "100%",
    // height: "100%",
    objectFit: "cover",
    // zIndex: "-1",
    transition: "0.4s",
  },
  "&:hover img": {
    transform: "scale(1.15)",
  },
}));
export const LabelBox = styled(Box)(() => ({
  position: "absolute",
  top: "20px",
  left: 0,
  backgroundColor: "#FFFFFFD9",
  padding: "5px 18px 5px 18px",
  borderRadius: "0px 50px 50px 0px",
  width: "auto",
}));
export const Label1 = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "600",
  color: "#4a4a4a",
  lineHeight: "normal",
  "@media screen and (max-width:480px)": {
    fontSize: "16px",
  },
}));
export const CategoryHeading = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "600",
  color: "#231f20",
  padding: "7px 0",
  transition: ".3s",
  textTransform: "capitalize",
  "&:hover": {
    color: "#d7282f",
    transition: ".3s",
  },
}));
export const CategoryDescription = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: "400",
  color: "#231f20",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "3",
  display: "-webkit-box",
  cursor: "pointer",
}));

export const OuterBorder = styled(Box)(() => ({
  border: "1px solid #ddd",
  borderRadius: "7px",
  padding: "20px 20px 40px 20px",
  // position: "relative",
  marginBottom: "50px",
  height: "590px",
  "@media screen and (max-width:899px)": {
    marginBottom: "10px",
    height: "480px",
    padding: "10px",
  },
  "@media screen and (max-width:600px)": {
    border: "none",
    padding: 0,
    height: "auto",
  },

  overflowY: "auto",
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
}));

export const CategiryListingList = styled(List)(() => ({
  "& .MuiButtonBase-root": {
    padding: "0 10px",
  },
  "& .MuiTypography-root": {
    fontSize: "13px",
    // "&::before": {
    //   content: '""',
    //   width: "4px",
    //   height: "4px",
    //   backgroundColor: "black",
    //   margin: "0 -8px 0",
    //   borderRadius: "50%",
    //   display: "inline-block",
    //   position: "relative",
    //   top: "-3px",
    //   marginRight: "8px", // Adjust this value as needed
    // },
  },
}));

export const ViewMoreBtn = styled(Button)(() => ({
  color: "#d7292f",
  // border: "1px solid #d7282f",
  borderRadius: "4px",
  // padding: "6px",
  textTransform: "capitalize",
  transition: "0.3s",
  zIndex: 1,
  background: "transparent",
  fontSize: "14px",
  fontWeight: "600",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#d7282f",
    transition: "0.3s",
  },
}));
export const ViewMoreBtnBox = styled(Box)(() => ({
  position: "absolute",
  // bottom: "-40px",
  // transform: "translate(-50%,-50%)",
  // left: "50%",
  right: 0,
  bottom: "-17px",
  background: "#f6f6f6",
}));
export const Spaceforheading = styled(Box)(() => ({
  marginTop: "4px",
}));
export const Spacefordescription = styled(Box)(() => ({
  marginTop: "2px",
}));
export const HomeLink = styled(Link)(() => ({
  color: "#231f20",
  fontSize: "12px",
}));
export const AllCategoriesLink = styled(Link)(() => ({
  color: "#d7282f",
  fontWeight: "700",
  fontSize: "12px",
}));

// subcategory page

export const TabBtn = styled(Tab)(() => ({
  fontSize: "20px",
  textAlign: "left",
  border: "1px solid #DDDDDD",
  minWidth: "20%",
  margin: "0px 14px",
  borderRadius: "12px",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "flex-start",
  padding: "12px 20px",
  position: "relative",
  "& .MuiTab-iconWrapper": {
    position: "relative",
    zIndex: "1",
  },
  " .heightwidth": {
    height: "40px",
    width: "auto",
  },
}));
export const MuiTabs = styled(Tabs)(() => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },

  "& .MuiTabs-flexContainer": {
    padding: 10,
    justifyContent: "center",
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#fff",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 16px 0px rgba(99, 99, 99, 0.21)",
    border: "1px solid #EBEBEB",
    ".smallervalue": {
      color: "#fff",
      position: "relative",
      zIndex: "1",
    },
    ".largervalue": {
      color: "#fff",
      position: "relative",
      zIndex: "1",
    },
    "&:after": {
      display: "flex",
      content: '" "',
      background: "#d7282f",
      position: "absolute",
      left: "8px",
      right: "8px",
      top: "8px",
      bottom: "8px",
      borderRadius: "12px",
    },
  },
  ".smallervalue": {
    color: "#231f20",
    fontSize: "18px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  ".largervalue": {
    color: "#d7282f",
    fontSize: "22px",
    fontWeight: "600",
    display: "block",
    textTransform: "capitalize",
  },
  "& .MuiTabScrollButton-root": {
    color: "#6D6D6D",
  },
}));

export const InnerAccordion = styled(Box)({
  "& .MuiPaper-root": {
    boxShadow: "none",
    margin: "0px !important",
    "&::before": {
      display: "none",
    },
    "& .MuiAccordionSummary-root": {
      padding: "0",
      minHeight: "auto",
      "& .MuiAccordionSummary-content": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        "& .MuiSvgIcon-root": {
          display: "inline-block",
          transition: "all ease .3s",
          transform: "rotate(0deg)",
        },
        "&.Mui-expanded": {
          "& .MuiSvgIcon-root": {
            transform: "rotate(-180deg)",
          },
          ".accordiontitle": {
            color: "#d7282f",
          },
        },
      },
    },
  },
});

export const BannerDescriptionBox = styled(Box)(() => ({
  width: "90%",
  margin: "0 auto",
}));
export const BannerDescription = styled(Typography)(() => ({
  fontSize: "13px",
  fontWeight: "400",
  color: "#4a4a4a",
  textAlign: "center",
}));
export const Subcategorybox = styled(Box)(() => ({
  marginTop: "12px",
}));
export const GridBorder = styled(Box)(() => ({
  padding: "16px 16px 20px 16px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  margin: "12px 0 0 0",
}));
export const GridAlign = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
}));
export const ImageHeading = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#000",
  padding: "14px 0 0px",
  fontWeight: 700,
  cursor: "pointer",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  minHeight: "60px",
  display: "-webkit-box",
  "@media screen and (max-width:1600px)": {
    fontSize: "12px",
    padding: "10px 0 5px",
  },
  "@media screen and (max-width:1200px)": {
    fontSize: "11px",
    padding: "10px 0 5px",
  },
  "@media screen and (max-width:445px)": {
    fontSize: "11px",
    padding: "10px 0 5px",
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
export const ImageSubHeading = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: "400",
  color: "#4a4a4a",

  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "4",
  display: "-webkit-box",
  cursor: "pointer",
}));
export const ThinBorder = styled(Box)(() => ({
  borderLeft: "1px solid #ddd",
  paddingLeft: "8px",
}));
export const ThickBorder = styled(Box)(() => ({
  borderLeft: "2px solid #d7282f",
  marginLeft: "-8px",
  paddingLeft: "8px",
}));
export const SubHeading = styled(Typography)(() => ({
  fontSize: "13px",
  fontWeight: "600",
  color: "#4a4a4a",
  transition: "all ease .3s",
  "&:hover": {
    color: "#d7282f",
    transition: "all ease .3s",
  },
}));
export const SubHeadingSubText = styled(Typography)(() => ({
  fontSize: "13px",
  fontWeight: "400",
  color: "#4a4a4a",
}));

export const ParentCategoryBox = styled(Box)(() => ({
  // background: "#F4F6FA",
  padding: "1rem",
  transition: "all ease .5s",
  "@media screen and (max-width:1700px)": {
    padding: "0",
  },
  "@media screen and (max-width:600px)": {
    padding: "0 10px",
  },
  "&:hover": {
    // backgroundImage: `url('https://merchantad.xevitech.com/public/uploads/all/tGuyrdENCD8H9ajcBM1iUZJRGP7qkAV4vDdcl3AS.png')`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "100%",
    // transition: "all ease .5s",
    // "& .MuiTypography-root": {
    //   color: "#fff",
    //   position: "relative",
    //   "&:hover": {
    //     color: "#d7282f"
    //   }
    // },
    // "& .layer": {
    //   backgroundColor: "rgba(0, 0, 0, 0.6)",
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   width: "100%",
    //   height: "100%"
    // }
  },
}));
export const MyBannerImage = styled(Box)(() => ({
  "& .bannerlayer": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "99%",
  },
  "@media screen and (max-width:899px)": {
    marginBottom: "5px",
  },
}));
export const DataBannerInfo = styled(Box)(() => ({
  // position: "absolute",
  padding: "8px 18px",
  fontSize: "16px !important",
  color: "#fff",
  bottom: 0,
  "@media screen and (max-width:600px)": {
    fontSize: "12px",
    padding: "4px",
  },
}));

/******============= Parent Sub Category Page styling =============******/
export const ParentCategory = styled(Box)({});
export const CommonWhiteArea = styled(Box)({
  background: "#fff",
  borderRadius: "6px",
  padding: "20px 20px 40px",
  marginBottom: "30px",
  // boxShadow:"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
  // boxShadow:
  //   "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
  boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
  "@media screen and (max-width:899px)": {
    padding: "10px",
  },
});

export const PageSmallHeading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "700",
  padding: "0px 0 5px",
  // textAlign:"center",
});

export const ParentCategoryInner = styled(Box)({
  padding: "2rem 2rem 1rem",
  "@media screen and (max-width:767px)": {
    padding: "1rem",
  },
});
export const MyInnerContainer = styled(Box)({
  width: "95%",
  margin: "0 auto",
  padding: "0 20px",
  "@media screen and (max-width:1600px)": {
    width: "95%",
  },
  "@media screen and (max-width:1400px)": {
    width: "98%",
  },
  "@media screen and (max-width:767px)": {
    width: "100%",
    padding: "0 10px",
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
export const HotSearchArea = styled(Box)({
  background: "#fff",
  borderRadius: "6px",
  padding: "20px",
  marginBottom: "30px",
  // boxShadow:
  //   "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
  boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
});
export const CategoryShowLessSpan = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#d7282f",
  fontSize: "14px",
  margin: "2px 0 0",
  "& svg": {
    fontSize: "19px",
  },
  "& button": {
    textTransform: "capitalize",
    color: "#d7282f",
  },
  "@media screen and (max-width:767px)": {
    display: "none",
  },
});
export const StyledKeyword = styled("span")({
  backgroundColor: "#ffffff",
  border: "1px solid #C8C8C8",
  // borderRadius: "6px",
  display: "inline-block",
  alignItems: "center",
  fontSize: "13px",
  padding: "4px 8px",
  margin: "4px 6px 8px 0",
  "@media screen and (max-width:1500px)": {
    fontSize: "12px",
  },
  cursor: "pointer",
  "&:hover": {
    background: "#d7282f",
    color: "#fff",
    borderColor: "#d7282f",
    transition: "all ease .5s",
  },
});
export const CommonInnerContent = styled(Box)({
  padding: "10px 0",
});
export const MoreSubCategory = styled(Box)({
  // boxShadow:
  //   "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
  boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
  // padding: "10px",
  borderRadius: "6px",
  background: "#fff",
  margin: "0 0 30px",
});
export const MoreSubCategoryListStyling = styled(List)({
  // height: "350px",
  // height: "92%",
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
    "@media screen and (max-width:767px)": { margin: 0 },
  },
  "& .listItem": {
    position: "relative",
    "@media screen and (max-width:767px)": {
      padding: "2px 10px",
    },
  },

  "& .listItem:hover ": {
    "& .subMenu": {
      display: "block",
      opacity: 1,
      "@media screen and (max-width:900px)": {
        display: "none",
      },
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

/**** New css ****/
export const HeadingCategory = styled("h1")(() => ({
  "& span": {
    backgroundColor: "#FFFFFF",
    padding: "8px 18px",
    borderRadius: "50px",
  },
  fontWeight: "600",
  fontSize: "24px",
  color: "#fff",
  textTransform: "capitalize",
  "@media screen and (max-width:600px)": {
    fontSize: "16px",
    padding: "4px",
  },
}));
export const MyPageInfo = styled(Typography)(() => ({
  textAlign: "center",
  color: "#000",
  "& .MuiTypography-h2": {
    fontWeight: "700",
    fontSize: "22px",
    padding: "8px 0 15px",
    "@media screen and (max-width:1600px)": {
      fontSize: "18px",
    },
  },
  "& .MuiTypography-body2": {
    fontSize: "13px",
    padding: "0 0 12px",
    lineHeight: "22px",
  },
}));
export const ContentSection = styled(Box)({
  margin: "3rem 0 0",
  "@media screen and (max-width:767px)": {
    margin: "1rem 0 0",
  },
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
export const LeftCategorySide = styled(Box)({
  height: "100%",
  // paddingLeft:"20px",
  // filter: "drop-shadow(rgb(0, 0, 0, 0.05) -4px -3px 5px)",
  position: "relative",
  zIndex: "10",
});

export const MyInfoBox = styled(Box)({
  padding: "0 10px",
});
export const VideoArea = styled(Box)({
  position: "relative",

  "& img": {
    width: "100%",
  },
  "& svg": {
    position: "absolute",
    top: "45%",
    left: "45%",
    color: "#fff",
    cursor: "pointer",
  },
});
export const VideoHeading = styled(Typography)({
  padding: "5px 10px",
  fontSize: "14px",
  color: "#000",
  fontWeight: 700,
  textAlign: "center",
  "@media screen and (max-width:1600px)": {
    fontSize: "12px",
  },
});
export const BrandItem = styled(Box)({
  background: `url('/assets/images/category/hexigon-shape.svg') no-repeat`,
  height: "160px",
  position: "relative",
  // backgroundSize: "100%",
  // WebkitBackgroundSize:"100% !important",
  transition: "transform 0.3s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  padding: "10px",
  backgroundPosition: "center",
  "@media screen and (max-width:1600px)": {
    height: "170px",
  },
  "&:hover img": {
    transform: "scale(1.1)",
  },
  "& img": {
    // margin: "0 auto",
    color: "#fff",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    position: "absolute",
    // top:"55%",
    // left: "5%",
    // transform:" translate(-50%, -50%)"
    height: "100px",
    width: "100px",
    objectFit: "contain",
  },
});
export const SellerCardItem = styled(Box)({
  padding: "14px 10px 6px",
  color: "#000",
  textAlign: "center",
  // boxShadow:
  //   "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
  boxShadow:
    "inset rgba(17, 17, 26, 0.05) 0px -1px 1px, rgba(17, 17, 26, 0.1) 0px 0px 3px",
});
export const SellerImage = styled(Box)({
  width: "150px",
  height: "85px",
  margin: "0 auto",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

export const HoverInfo = styled(Box)({
  textAlign: "center",
  "& .MuiTypography-h5": {
    fontWeight: "700",
    fontSize: "16px",
    padding: "8px 0 0",
    textTransform: "capitalize",
    "@media screen and (max-width:1600px)": {
      fontSize: "13px",
    },
  },
  "& .MuiTypography-body1": {
    fontSize: "12px",
    padding: "4px 0",
    textTransform: "capitalize",
  },
});
export const FaqSection = styled(Box)({
  paddingTop: "1rem",
  "& .MuiTypography-h4": {
    fontWeight: "700",
    fontSize: "16px",
  },
  "& .MuiTypography-body1": {
    fontSize: "12px",
    padding: "4px 0",
    color: "#4A4A4A",
    "& span": {
      fontWeight: "700",
    },
  },
});
export const NewsSectionHere = styled(Box)({
  padding: "1rem 0",
  "& .MuiTypography-h5": {
    fontWeight: "700",
    fontSize: "16px",
  },
  "& .MuiTypography-body1": {
    fontSize: "12px",
    padding: "4px 0",
  },
});
export const NewsItem = styled(Box)({
  overflow: "hidden",
  "&:hover img": {
    filter: " brightness(100%)",
    transform: "scale(1.05)",
    height: "100%",
  },
  "& img": {
    width: "100%",
    transition: "transform 1s, filter 1.5s ease-in-out",
    transformOrigin: "center center",
    filter: "brightness(50%)",
    height: "100%",
    objectFit: "cover",
  },
  "& .MuiTypography-h4": {
    fontWeight: "700",
    fontSize: "14px",
  },
  "& .MuiTypography-body1": {
    fontSize: "12px",
    // padding: "4px 0",
  },
  "& .datePlace": {
    fontWeight: "600",
    fontSize: "12px",
    "@media screen and (max-width:320px)": {
      padding: "0px",
    },
  },
  "& .imgBox": {
    height: "300px",
    border: "1px solid #d2d2d2",
    overflow: "hidden",
    cursor: "pointer",
  },
  "& .blogTitle": {
    fontSize: "16px",
    color: "#d7282f",
    fontWeight: "600 !important",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
    display: "-webkit-box",
    cursor: "pointer",
  },
  "& .UserName": {
    fontSize: "12px",
    fontWeight: "600",
    "@media screen and (max-width:320px)": {
      padding: "0px",
    },
  },
  "& .Dot": {
    "@media screen and (max-width:320px)": {
      display: "none",
    },
  },
  "& .flexBox": {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    "@media screen and (max-width:320px)": {
      flexDirection: "column",
      gap: "0px",
    },
  },
});

export const TopSellers = styled(Box)({
  padding: "1rem 0",
  "& .card": {
    width: "100%",
    // maxWidth: "300px",
    // minWidth: "200px",
    // height: "180px",
    height: "207px",
    transition: "all 0.3s ease",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    "& .hovertext": {
      opacity: 0,
      maxHeight: 0,
      transition: "all 0.3s ease",
    },
    "&:hover": {
      height: "200px",
    },
  },

  "& .card:hover": {
    "& .info": {
      height: "90%",
    },
    "& .hovertext": {
      transition: "all 0.3s ease",
      opacity: 1,
      maxHeight: "40px",
    },
  },
});

/**** Start New styling for Sectior page (28 June 24) ****/
export const ParentCategoryImageBox = styled(Box)({
  height: "150px",
  border: "1px solid #DDDDDD",
  borderRadius: "6px",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
/**** End New styling for Sectior page (28 June 24) ****/

/**** Start Single Sector Page styling ****/
export const SingleSectorPageWrapper = styled(Box)({});

export const BackgroundSection = styled(Box)({
  // backgroundImage: `url('/assets/images/homebanner-img.png')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  // padding: "50px 0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "relative",
  height: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(4, 22, 32, 0.3)",
  zIndex: 1,
});

export const BannerContentWrap = styled(Box)({
  zIndex: 1,
  position: "relative",
  "& .MuiTypography-h4": {
    fontWeight: 700,
    padding: "0 0 10px",
    whiteSpace: "nowrap",
    textAlign: "left",
    "@media screen and (max-width:1600px)": {
      fontSize: "22px",
    },
    "@media screen and (max-width:900px)": {
      textAlign: "center",
    },
  },
});
export const IconWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
  "& img": {
    width: "120px",
  },
  "@media screen and (max-width:900px)": {
    "& img": {
      width: "70px",
    },
  },
  "@media screen and (max-width:480px)": { display: "none" },
});

export const ContentWrapper = styled(Box)({
  color: "#fff",
  padding: "10px",
  borderRadius: "8px",
  width: "70%",
  "@media screen and (max-width:900px)": {
    padding: "0",
    width: "100%",
  },
});
export const BannerOuter = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});
export const ImgTextBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  justifyContent: "center",
  "@media screen and (max-width:900px)": {
    flexDirection: "column",
  },
});
export const Bannerdescription = styled(Typography)({
  fontSize: "16px",
  color: "#fff",
  fontWeight: "500",
  "@media screen and (max-width:900px)": {
    textAlign: "center",
    fontSize: "12px",
  },
});

export const CommonSectionBox = styled(Box)({
  background: "#fff",
  padding: "20px 20px 10px",
  marginBottom: "30px",
  "& h3": {
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

export const EngineerImageBox = styled(Box)({
  // display: "contents",
  height: "120px",
  "& img": {
    width: "100%",
    height: "100%",
    borderRadius: "4px 0 0",
    objectFit: "cover",
  },
});
export const EngineerBoxInfo = styled(Box)({
  position: "relative",
  border: "1px solid #ddd",
  borderRadius: "6px",
  transition: "transform 0.3s ease-in-out",
  margin: "12px",
});

export const EPersonalInfo = styled(Box)({
  padding: "10px 0 0",
  "@media screen and (max-width:767px)": {
    padding: "10px 0 0 0",
  },
  "& .MuiTypography-h3": {
    fontSize: "16px",
    color: "#000",
    fontWeight: "700",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#d7282f",
    fontWeight: "600",
    padding: "5px 0",
  },
});
export const EngineerDes = styled(Typography)({
  fontSize: "13px",
  color: "#000",
  "@media screen and (max-width:767px)": {
    // padding: "0 0 10px 10px",
  },
});
// top engineers
export const EngineerOuterBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  "@media screen and (max-width:900px)": {
    flexDirection: "column",
  },
});
export const EngineerFlexBox = styled(Box)({
  display: "flex",
  height: "120px",
  "@media screen and (max-width:1300px)": { width: "30%" },
  "@media screen and (max-width:1250px)": { width: "70%" },
  "@media screen and (max-width:900px)": { width: "100%", height: "150px" },
});
export const EngineerContentBox = styled(Box)({
  "@media screen and (max-width:900px)": {
    padding: "0px 12px 8px 12px",
  },
});
export const TopRatedCompaniesBox = styled(Box)({
  borderRadius: "15px",
  border: "1px solid #DADADA",
  padding: "1rem",
  "@media screen and (max-width:767px)": {
    background: "#f7f7f7",
  },
});
export const TopRatedCompaniesInner = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "@media screen and (max-width:767px)": {
    display: "block",
  },
});
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
export const TopRatedCompaniesInner1 = styled(Box)({
  display: "flex",
  // alignItems: "center",
  position: "relative",
  gap: "10px",
  "@media screen and (max-width:480px)": {
    flexDirection: "column",
    alignItems: "center",
  },
});
export const CompanyOriginInfo = styled(Box)({
  "& .MuiTypography-h5": {
    fontSize: "20px",
    color: "#231F20",
    fontWeight: "600",
    "@media screen and (max-width:1600px)": {
      fontSize: "16px",
    },
  },
});
export const OriginDate = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "4px 0",
  flexWrap: "wrap",
  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#4A4A4A",
  },
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

export const CompanyProductList = styled(Box)({
  margin: "20px 0",
});
export const CompanyProductItem = styled(Box)({
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
export const SecrorMinMaxOrder = styled(Box)({
  "& .MuiTypography-h5": {
    fontSize: "14px",
    fontWeight: "600",
    color: "#d7282f",
    padding: "3px 0",
  },
  fontSize: "12px",
});
export const MainSectorBox = styled(Box)({
  marginTop: "12px",
  "@media screen and (max-width:600px)": {
    height: "auto",
    border: "1px solid #e2e2e2",

    marginTop: "22px",
  },
});

/**** End Single Sector Page styling ****/
