import { Button, List, Stack, Typography, styled } from "@mui/material";
import { Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

export const MemberFilterBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #e9e9e9",
}));

export const MemberTitle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "16px",
  fontWeight: 600,
  fontFamily: "Open sans",
}));

/******************* Start Big Post New Component ****************/
export const TypographyPriceTextStyle = styled(Typography)({
  display: "inline-flex",
  alignItems: "top",
  fontSize: 14,
  gap: "5px",
  color: "rgba(35, 31, 32, 1)",
  fontWeight: 400,
  fontFamily: "Open sans",
  whiteSpace: "nowrap",
  padding: "5px",
  "& span": {
    fontSize: 22,
    fontWeight: 600,
    color: "#D7282F",
    "@media screen and (max-width: 1700px)": {
      fontSize: 16,
    },
  },
  "& sup": {
    fontSize: 20,
    fontWeight: 600,
    color: "#D7282F",
  },
});

export const PreTitleTypography = styled(Typography)({
  color: "#d7282f",
  fontWeight: 600,
  fontSize: "15px !important",
  padding: "0px 0 2px",
  "@media screen and (max-width: 767px)": {
    padding: "0",
    whiteSpace: "nowrap",
    width: "90%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
/******************* End Big Post New Component ****************/

/*********** Start Product Item New Component ************/
export const TypographyStylePriceText = styled(Typography)({
  display: "inline-flex",
  alignItems: "baseline",
  fontSize: "14px !important",
  fontWeight: "400 !important",
  gap: "5px",
  color: "rgba(35, 31, 32, 1)",
  fontFamily: "Open sans",
  whiteSpace: "nowrap",
  "@media screen and (max-width:768px)": {
    fontSize: "12px !important",
  },

  "& span": {
    fontSize: "18px",
    fontWeight: "600 !important",
    color: "#D7282F",
    "@media screen and (max-width: 1700px)": {
      fontSize: "14px !important",
    },
  },
  "& sup": {
    fontSize: "14px",
    fontWeight: "600 !important",
    color: "#D7282F",
    "@media screen and (max-width: 1700px)": {
      fontSize: "12px !important",
    },
  },
});

export const InStockTypography = styled(Typography)({
  color: "#34A853",
  fontFamily: "Open sans",
  fontSize: "13px !important",
  fontWeight: "600 !important",
  whiteSpace: "nowrap",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 3,
  "@media screen and (max-width: 1700px)": {
    fontSize: "11px !important",
  },
  "& svg": {
    width: 16,
    "@media screen and (max-width: 1700px)": {
      // width: 11,
      margin: "0 0 0 -3px",
    },
  },
});

export const ByOrderTypography = styled(Typography)({
  color: "rgba(215, 40, 47, 1)",
  fontFamily: "Open sans",
  fontSize: "13px !important",
  fontWeight: "600 !important",
  whiteSpace: "nowrap",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  "@media screen and (max-width: 1700px)": {
    fontSize: "11px !important",
  },
  gap: 3,
  "& svg": {
    width: 16,
    "@media screen and (max-width: 1700px)": {
      width: 11,
      margin: "0 0 0 -3px",
    },
  },
});

export const ProductTitleTypo = styled(Typography)({
  color: "rgba(35, 31, 32, 1)",
  fontFamily: "Open sans",
  fontSize: "12px !important",
  fontWeight: "600 !important",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  display: "-webkit-box",
  lineHeight: "normal",
  "&:hover": {
    color: "#D7282F",
  },
  "@media screen and (max-width: 1700px)": {
    fontSize: "13px !important",
  },
});

export const TypeStyleTypography = styled(Typography)({
  fontSize: "12px !important",
  fontWeight: "600 !important",
  fontFamily: "Open sans",
  color: "rgba(35, 31, 32, 1)",

  "& span": {
    fontSize: "12px !important",
    fontWeight: "400 !important",
    fontFamily: "Open sans",
    color: "rgba(35, 31, 32, 1)",
    "@media screen and (max-width: 1700px)": {
      fontSize: "10px !important",
    },
  },
});
export const ProductsmallTypography = styled(Typography)({
  color: "rgba(35, 31, 32, 1)",
  fontFamily: "Open sans",
  fontSize: "12px !important",
  fontWeight: "400 !important",
  whiteSpace: "nowrap",
  width: "40%",
});
export const BigPostModelNumberOuter = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  margin: "2px 0 0 0",
});
export const BigPostModelNumber = styled(Typography)({
  color: "rgba(35, 31, 32, 1)",
  fontFamily: "Open sans",
  fontSize: "12px !important",
  fontWeight: "400 !important",
  whiteSpace: "nowrap",
});

/*********** End Product Item New Component ************/
export const ContentFlewView = styled(Box)({
  display: "block",
  clear: "both",
  "& .MuiTypography-root": {
    float: "left",
    marginTop: "6px",
  },
  "& .boldtxt": {
    fontWeight: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "60%",
    paddingLeft: "6px",
    fontSize: "12px",
    "@media screen and (min-width:1200px) and (max-width:1450px)":{
      textAlign:'right'
    },
    "@media screen and (min-width:900px) and (max-width:1024px)":{
      textAlign:'right'
    },
  },
  "& .ProductLocationandbrand": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  "& .wishlistItem":{
    "@media screen and (min-width:1281px) and (max-width:1300px)":{
      paddingLeft: "10px"
    },
  }
});

export const ProductItemInfoCard = styled(Box)({
  width: "100%",
});

export const ProductItemInfoCardOuter = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  height: "100%",
  position: "relative",
  paddingBottom: "60px",
  "& .productCenterInfo": {
    borderTop: "1px solid #EAEAEA !important",
  },
  "& .tileFooter": {
    width: "100%",
    position: "absolute",
    bottom: "-65px",
    paddingBottom: "12px",
    zIndex: "2",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    transition: "all ease .5s",
  },
  "& .imageNotExists": {
    width: "100%",
    position: "absolute",
    bottom: "-49px",
    paddingBottom: "12px",
    zIndex: "2",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    transition: "all ease .5s",
  },
  "&:hover": {
    "& .tileFooter": {
      bottom: "0",
    },
  },
});

export const ProductListingContainerr = styled(Box)({});

export const BackToTopBox = styled("div")({
  position: "fixed",
  right: 10,
  bottom: 5,
  zIndex: 1000,
  "& .MuiFab-root": {
    background: "#000",
    width: "30px",
    height: "30px",
    minHeight: "30px",
    svg: {
      color: "#fff",
    },
    "&:hover": {
      background: "#ddd",
      "& svg": {
        color: "#000",
      },
    },
  },
});
export const ProductNavFilter = styled("div")({
  flexGrow: 1,
  flexBasis: "300px",
  paddingBottom: "10px",
});
export const ListingColumnInner = styled(Box)({
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#fff",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#dcdcdc",
    borderRadius: "10px",
  },
});
export const ScrollTopFab = styled("div")({
  position: "fixed",
  right: 10,
  bottom: 10,
  "& .fabcolor": {
    background: "#231f20",
    color: "#fff",
  },
});

export const ProductListPagination = styled(Box)({
  margin: "1rem 0 0",
  display: "flex",
  justifyContent: "center",
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "rgba(217, 40, 47, 0.8)",
    color: "#fff",
  },
  "& .MuiButtonBase-root:hover": {
    backgroundColor: "rgb(232 232 232)",
  },
});

export const ProductListViewDes = styled(Box)({
  "& .MuiTypography-root": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "0",
    textTransform: "capitalize",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "3",
    display: "-webkit-box",
  },
});
export const SelectFilters = styled(Box)({
  border: "1px solid #E9E9E9",
  borderRadius: "10px",
  padding: "10px",
});
export const FilterChip = styled(Stack)({
  "& .MuiChip-root": {
    border: "1px solid #C8C8C8",
    backgroundColor: "#F3F3F3",
    margin: "3px",
  },
});
export const SearchList = styled("span")({
  backgroundColor: "#ffffff",
  border: "1px solid #C8C8C8",
  borderRadius: "6px",
  display: "inline-block",
  alignItems: "center",
  fontSize: "13px",
  padding: "4px 8px",
  margin: "4px 6px 4px 0",
  cursor: "pointer",
});
export const ProductLIstHead = styled(Stack)({
  paddingTop: "12px",
  "& .MuiTypography-body1": {
    fontSize: "16px",
    fontWeight: "600",
    color: "#231F20",
    "& span": {
      fontWeight: "normal",
    },
    "& .availableProd": {
      fontSize: "12px",
      color: "#D7282F",
      fontWeight: "600",
    },
  },
  "& .MuiTypography-h6": {
    fontWeight: "600",
    fontSize: "26px",
    color: "#231F20",
    margin: "0",
  },
});
export const MainPageFilterBox = styled(Box)({
  "& .selected-filter-main-page .MuiButtonBase-root": {
    background: "rgba(0, 0, 0, 0.04)",
    color: "#d7282f",
    "& .MuiTypography-root": {
      color: "#d7282f",
    },
  },
});

export const BigPostOuterCardd = styled(Box)({
  "&:hover": {
    "& .BigPostFooter": {
      bottom: "0",
    },
  },
});
export const BigPostFooter = styled(Box)({
  width: "100%",
  transition: "all ease .5s",
  paddingBottom: "6px",
  zIndex: "4",
  "@media screen and (max-width: 767px)": {
    bottom: "0",
    margin: 0,
  },
});

export const MoreLessButton = styled(Box)({
  "& .MuiButtonBase-root": {
    color: "#231F20",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
});
export const ProductListWithCheckBox = styled(Box)({});
export const ProductCategoryCollpase = styled(Box)({
  width: "95%",
  position: "relative",
});
export const CategoryShowLess = styled(Box)({
  position: "absolute",
  top: "40px",
  right: 0,
  "@media screen and (max-width:1600px)": {
    right: "25px",
  },
  "@media screen and (max-width:899px)": {
    right: "40px",
  },
  "& .MuiButtonBase-root": {
    textTransform: "capitalize",
    "&:hover": {
      background: "transparent",
    },
  },
  "& svg": {
    fontSize: "19px",
  },
});
export const CategoryShowLessSpanFilter = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  fontSize: "14px",
  margin: "2px 0 0",
  "& svg": {
    fontSize: "19px",
  },
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
});
export const ContainerOuterBigPost = styled(Box)({
  width: "100%",
  display: "flex",
  padding: "8px 8px 0",
  gap: "10px",
  "@media screen and (max-width: 600px)": {
    display: "block",
  },
  "& .mobilethumbslider": {
    display: "none",
    "@media screen and (max-width: 600px)": {
      display: "block",
    },
  },
  "& .desktopthumbslider": {
    "@media screen and (max-width: 600px)": {
      display: "none",
    },
  },
});

export const MobileHorizontallyThumbs = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 1rem",
  "& .slick-arrow": {
    "&::before": {
      color: "#7a7a7a",
    },
  },
  "& .slick-prev": {
    left: "-16px",
    // top: "40px",
  },
  "& .slick-next": {
    right: "-16px",
    // top: "40px",
  },
  "& .slick-slide": {
    // margin: "10px 2px 0",
    // width: "160px !important",
    "& img": {
      height: "100%",
    },
  },
  "@media screen and (max-width: 600px)": {
    maxHeight: "80px",
    overflow: "hidden",
  },
});
export const MobileSmallThumb = styled(Box)({
  borderRadius: "6px",
  border: "1px solid rgba(34, 51, 84, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  padding: "0 1rem",
  margin: "6px 4px",
  height: "70px",
  "@media screen and (max-width: 600px)": {
    padding: "0",
    height: "50px",
  },
});
export const BoxContainerSticky = styled(Box)({
  "@media screen and (max-width: 767px)": {
    // position: "fixed",
    // top: 50,
    // backgroundColor: "#fff",
    // zIndex: 1000,
    // width: "100%",
    // padding: "0 8px 8px",
    // boxShadow:
    //   "0px 9px 16px rgba(159, 162, 191, 0.18), 0px 2px 2px rgba(159, 162, 191, 0.32)",
  },
});
export const ListingWrappers = styled(Box)({
  // padding: "16px",
  padding: "16px 0",
  "& .MuiBreadcrumbs-root": {
    margin: "5px 0 12px!important",
  },
  "@media screen and (max-width: 767px)": {
    padding: "10px 0",
    overflow: "hidden",
    // margin:"3rem 0 0"
    margin: "1rem 0 0",
  },
});
// productlistview style==================================================================================>
export const Listviewouterbox = styled(Box)({
  boxShadow: "0 3px 9px 0 rgb(0 0 0 / 10%)",
  border: "1px solid #e1e1e1",
  margin: "0 0 1rem",
  borderRadius: "6px",
  position: "relative",
  overflow: "hidden",
  padding: "16px 16px 16px 16px",
  // paddingTop: "8px",
});
export const NameNAvailability = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "0 0 12px 0",
});
export const CatName = styled(Box)({
  "& span": {
    fontSize: "12px",
    fontWeight: "500",
    borderRadius: "4px",
    backgroundColor: "#F2F2F2",
    padding: "4px 6px",
  },
});
export const Availabilitybox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  "& svg": {
    fontSize: "14px",
    margin: "-2px 1px 0 1px",
  },
});
export const Doneicon = styled(DoneIcon)({
  fontSize: "17px",
  marginLeft: "4px",
  position: "relative",
  top: "1px",
  "@media screen and (max-width:768px)": {
    fontSize: "14px !important",
  },
});
// ProductListViewSideBar (Related Products===================================)

export const ListVieRelatedProductArea = styled(Box)({
  "@media screen and (max-width:600px)": {
    display: "block",
  },
});
export const SidebarOuterBox = styled(Box)({
  border: "1px solid #E9E9E9",
  borderRadius: "6px",
  padding: "10px",
  margin: "0 0 1rem",
  boxShadow: "0 3px 9px 0 rgb(0 0 0 / 10%)",
  "@media screen and (max-width:1500px)": {
    padding: "8px",
  },
  "@media screen and (max-width:1024px)": {
    width: "100%",
  },
});
export const SidebarHeading = styled(Typography)({
  fontSize: "15px !important",
  fontWeight: "600 !important",
  color: "#231f20",
  textTransform: "uppercase",
  "@media screen and (max-width:600px)": {
    fontSize: "12px !important",
    fontWeight: "400 !important",
  },
});
export const SidebarMaintext = styled(Typography)({
  fontSize: "11px !important",
  fontWeight: "400 !important",
  color: "#231f20",
  lineHeight: "16px !important",
});
export const SidebarRedtext = styled(Typography)({
  fontSize: "13px !important",
  fontWeight: "600 !important",
  color: "#d7282f",
});
export const SidebarSearchText = styled(Typography)({
  fontSize: "12px !important",
  fontWeight: "400 !important",
  color: "#231f20",
  margin: "0 0 6px !important",
  padding: "0 15px",
  "&:hover": {
    textDecoration: "underline",
  },
  "&::before": {
    content: '""',
    width: "5px",
    height: "5px",
    backgroundColor: "black",
    margin: "0 -8px 0",
    borderRadius: "50%",
    display: "inline-block",
    position: "relative",
    top: "-1px",
    left: "-3px",
    marginRight: "4px", // Adjust this value as needed
  },
});
export const RelatedListingProducts = styled(Box)({
  margin: "15px 0 8px 0",
});
export const RelatedListingInnerBox = styled(Box)({
  margin: "0 0 14px",
  display: "flex !important",
  gap: "6px",
  "&:hover": {
    "& .sidebarproductnme": {
      textDecoration: "underline",
      transition: "all ease .5s",
    },
  },
});
export const MyImageBox = styled(Box)({
  border: "1px solid #EAEAEA",
  borderRadius: "5px",
  height: "50px",
  width: "50px",
  minWidth: "50px",
  overflow: "hidden",
  objectFit: "contain",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "100%",
  },
});
export const RelatedProductBox = styled(Box)({
  margin: "15px 0 0",
});
export const MyListRow = styled(Box)({
  margin: "0 0 5px",
});

export const CategoryBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #E9E9E9",
  marginTop: "8px !important",
}));
export const IconsGap = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "&:hover": {
    svg: {
      display: "block",
    },
  },
}));
export const Svgabsolute = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "16px",
  svg: {
    fontSize: "18px",
    display: "none",
    "&:hover": {
      color: "#d7282f",
    },
  },
}));
export const StyledList = styled(List)(({ theme }) => ({
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { background: "#EEEEEE" },
  "&::-webkit-scrollbar-thumb": { background: "#D9D9D9", borderRadius: "6px" },
  "& .MuiListItemButton-root": {
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  "& .MuiTypography-root": {
    fontWeight: "400!important",
    fontSize: "12px !important",
    color: "#d7282f",
    cursor: "pointer",
  },
  "& svg": {
    color: "#d7282f",
  },
  padding: "0 0 0 10px",
}));

export const CssGridBox4ItemProductlisting = styled(Box)(({ theme }: any) => ({
  gap: "16px",
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(250px, 1fr) )",
  alignItems:'stretch',

  [theme.breakpoints.only("lg")]: {
    gap: "8px",
    gridTemplateColumns: "repeat(4, minmax(150px, 1fr) )",
  },

  [theme.breakpoints.only("md")]: {
    gridTemplateColumns: "repeat( 3, minmax(150px, 1fr) )",
  },
  [theme.breakpoints.between("600px", "900px")]: {
    gridTemplateColumns: "repeat(3, minmax(150px, 1fr) )",
  },
  [theme.breakpoints.only("sm")]: {
    flexDirection: "column",
    gap: "16px",
    gridTemplateColumns: "repeat(2, minmax(100px, 1fr) )",
  },
  [theme.breakpoints.only("xs")]: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    gridTemplateColumns: "repeat(2, minmax(100px, 1fr) )",
  },
  "@media only screen and (max-width: 1750px) and (min-width: 1536px)": {
    gap: "8px",
    gridTemplateColumns: "repeat(4, minmax(100px, 1fr) )",
  },
  "@media only screen and (max-width: 1250px) and (min-width: 1199px)": {
    gap: "5px",
  },
}));

export const ListPriceButton = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  "@media screen and (max-width:767px)": {
    display: "block",
  },
}));
export const FilterMenu = styled(Box)(({ theme }) => ({
  display: "none",
  "@media screen and (max-width:899px)": {
    display: "block",
    margin: "6px 10px 0 0",
    position: "absolute",
    zIndex: 1,
    minWidth: "10px",
    right: "0",
    "& button": {
      background: "#ffffff",
      border: "1px solid #d7d7d7",
      borderRadius: "30px",
      color: "#231f20",
      boxShadow: "none",
      "&:hover": {
        background: "#ffffff",
        color: "#231f20",
      },
      "& svg": {
        margin: "0 -9px 0 4px",
      },
    },
  },
}));
export const BigPostProductName = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box !important",
  margin: "5px 0 0",
  cursor: "pointer",
  "&:hover": { color: "#d7282f" },
}));
export const PriceDataHere = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "5px",
  alignItems: "center",
}));
export const ManufactureData = styled(Typography)(({ theme }) => ({
  display: "flex",
  gap: "5px",
  alignItems: "center",
  fontSize: "13px",
  color: "#4A4A4A",
  "& .MuiTypography-body2": {
    color: "#000",
    fontWeight: 600,
    fontSize: "12px",
  },
}));
export const SeparationDots = styled(Box)(({ theme }) => ({
  height: "3px",
  width: "3px",
  minWidth: "3px",
  backgroundColor: "#231f20",
  borderRadius: "50%",
}));
