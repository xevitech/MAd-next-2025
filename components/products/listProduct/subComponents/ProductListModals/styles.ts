import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import { ToggleButtonGroup, Typography, styled } from "@mui/material";
import { Grid, Link, ButtonBase } from "@mui/material";
import { Height } from "@mui/icons-material";

export const Mediaquery = styled(Box)(() => ({
  width: "1150px",
  "@media (max-width: 1536px)": {
    width: "1150px",
  },
  "@media (max-width: 1200px)": {
    width: "100%",
  },
  // "@media (max-width: 900px)": {
  //   width: "600px",
  // },
  // "@media (max-width: 600px)": {
  //   width: "350px",
  // },
  // "@media (max-width: 480px)": {
  //   maxWidth: "320px",
  // },
  // "@media (max-width: 320px)": {
  //   maxWidth: "272px",
  // },
}));

export const Heading = styled(Box)(() => ({
  backgroundColor: "#D7282F0F",
  padding: "10px 15px",
  color: "#D7282F",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const Contentflex = styled(Box)(() => ({
  color: "#D7282F",
  display: "flex",
  alignItems: "center",
  alignSelf: "center",
}));

export const Text = styled(Typography)(() => ({
  marginLeft: "20px ",
  fontSize: "14px ",
  fontWeight: "600 ",
  display: "flex ",
  alignItems: "center ",
}));
export const Textlink = styled(Link)(() => ({
  fontSize: "14px ",
  fontWeight: "600 ",
  display: "flex ",
  alignItems: "center",
  color: "#D7282F",
  textDecoration: "none",
  cursor: "pointer",
  "& svg":{
    "@media screen and (max-width: 767px)": {
   fontSize:"15px",
   margin:"0 3px"
  },
  }
}));

export const Text2 = styled(Typography)(() => ({
  marginRight: "20px ",
  fontSize: "14px ",
  fontWeight: "600  ",
  display: "flex ",
  alignItems: "center ",
}));

export const Closebtn = styled(Box)(() => ({
  cursor: "pointer",
}));

export const Secondsection = styled(Box)(() => ({
  // paddingLeft: "15px",
  // marginTop: "10px",
  // paddingBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
  "@media (max-width:899px)": {
    display: "block",
    position: "relative",
    margin:"20px 0 0px"
  },
}));

export const SecondsectionHeading = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "14px !important",
  lineHeight:"12px",
}));

export const SecondsectionTextonRight = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "11px !important",
  "@media (max-width: 600px)": {
    marginBottom: "2px !important",
    marginLeft: "0px !important",
  },
}));
export const SecondsectionTextonRightDate = styled(Typography)(() => ({
  fontWeight: "400 !important",
  fontSize: "13px !important",
}));
export const Biogas = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "13px !important",
  color: "#231F20",
}));
export const Biogasflex = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "13px !important",
  color: "#3bb900",
  backgroundColor: "#ecfbe6",
  marginLeft: "14px !important",
  padding: "3px 8px",
  borderRadius: "6px",
  "@media (max-width: 600px)": {
    marginRight: "30px !important",
  },
}));
export const UpdateAndCreated = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  "@media (max-width:899px)": {
    padding: "7px 0"
  },
  "@media (max-width:767px)": {
    paddingBottom: "10px"
  },
  // "@media (max-width: 480px)": {
  //   flexDirection:"column",
  //   alignItems: "start",
  // },
}));
export const UpdateAndCreatedPadding = styled(Box)(() => ({
  borderLeft: "1px solid #dddddd",
  padding: "0 20px",
  lineHeight: "normal",
  "&:first-child": {
    paddingLeft: "0",
    border: "0",
  },

}));
export const Ribon = styled(Box)(() => ({
  marginLeft: "40px",
  position: "relative",
  top: "4px",
  marginRight: "-8px",
  "@media (max-width: 600px)": {
    marginLeft: "-15px !important",
  },
}));
export const Textoverribon = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "10px !important",
  color: "#ffff",
  position: "absolute",
  top: "6px",
  left: "25px",
}));

export const Productid = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "12px !important",
  color: "#fff",
  "@media screen and (max-width:600px)": {
    margin: "6px 0px 12px 0px",
  },
}));

export const Soundproof = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "14px !important",
  color: "#d7282f",
  "@media (max-width: 1024px)": {
    fontSize: "15px !important",
    marginBottom: "8px",
  },
}));
export const Boxbar = styled(Box)(() => ({
  backgroundColor: "#E9E9E9",
  padding: "8px",
  marginTop: "15px",
  display: "flex",

}));
export const BoxbarText1 = styled(Typography)(() => ({
  backgroundColor: "#ECFBE6",
  padding: "13px, 8px, 3px, 8px !important",
  fontWeight: "600",
  fontSize: "13px",
  color: "#3BB900",
  borderRadius: "6px",
}));
export const BoxbarText2 = styled(Typography)(() => ({
  backgroundColor: "#FFE8EC",
  padding: "3px, 8px, 3px, 8px",
  fontWeight: "600",
  fontSize: "13px",
  color: "#D7282F",
  borderRadius: "6px",
  marginLeft: "8px !important",
}));
export const BoxbarText3 = styled(Typography)(() => ({
  backgroundColor: "#FFF6E8",
  padding: "3px, 8px, 3px, 8px",
  fontWeight: "600",
  fontSize: "13px",
  color: "#FFA31A",
  borderRadius: "6px",
  marginLeft: "8px !important",
}));
export const Para = styled(Typography)(() => ({
  fontWeight: "500",
  fontSize: "14px",
  color: "#4A4A4A",
}));
export const Gridcontent = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "14px !important",
  color: "#231F20",
  textTransform: "capitalize",
  
}));
export const GridRedcontent = styled(Typography)(() => ({
  fontWeight: "700 !important",
  fontSize: "13px !important",
  color: "#D7282F",
}));
export const Gridcontentblack = styled(Typography)(() => ({
  fontWeight: "400 !important",
  fontSize: "13px !important",
  color: "#4A4A4A",
}));
export const GridRedcontent2 = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "13px",
  // color: "#d7282f",
  color: "#4a4a4a",
}));
export const Newsection = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "14px !important",
  color: "#231F20",
}));
export const NewsectionText = styled(Typography)(() => ({
  fontWeight: "400 !important",
  fontSize: "14px !important",
  color: "#4A4A4A",
}));
export const Thirdsection = styled(Typography)(() => ({
  fontWeight: "600 !important",
  fontSize: "14px ",
  color: "#231f20",
}));
export const Thirdsection2 = styled(Typography)(() => ({
  fontWeight: "400 ",
  fontSize: "14px ",
  color: "#4a4a4a",
  // color: "#d7282f",
}));

export const useStyles = makeStyles()((theme) => {
  return {
    headingspan: {
      fontWeight: 600,
      fontSize: "18px !important",
    },
    dividercolor: {
      height: "100%",
      marginTop: "8px",
      width: "2px",
      margin: "0 16px",
      "@media (max-width: 600px)": {},
    },
    productidspan: {
      fontSize: "13px !important",
      marginLeft: "0px",
    },
  };
});
export const AdvertisementContainer = styled("div")({
  background: "#E9E9E9",
  display: "flex",
  justifyContent: "space-between",
  width: "max-content"
});

export const AdvertisementText: any = styled("div")(
  ({ color, background, borderColor }: any) => ({
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 600,
    // fontSize: "13px",
    // lineHeight: "18px",
    color: color || "#D7282F",
    background: background || "#FFE8EC",
    margin: "5px",
    borderRadius: "5px",
    // padding: "8px 10px",
    padding: "2px 4px",
    // border: "1px solid",
    borderColor: borderColor || "",
    "& .MuiTypography-root": {
      fontSize: "13px",
      fontWeight: 600,
    }
  })
);
export const Shadowcontainer = styled("div")(() => ({
  background: " #FFFFFF",
  borderRadius: " 6px",
}));
export const DetailBox = styled(ButtonBase)(() => ({
  borderColor: "red",
}));
export const Boxforgrid = styled(Box)(() => ({
  backgroundColor: " #FFFFFF",
  padding: "20px",
  marginTop: "10px",
  position:'relative'
}));

export const TopGrid = styled(Grid)(() => ({
  backgroundColor: " #fff",
  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
  marginTop: "1px",
  marginLeft: "0px",
  paddingBottom: "5px",
  width: "100%",
}));

export const Productbutn = styled(ButtonBase)(() => ({
  border: "1px solid #D7282F",
  borderRadius: "6px",
  height: "30px",
  padding: "10px",
  color: "#D7282F",
  transition: ".5s",
  fontSize: "12px",
  "@media screen and (max-width:600px)": {
    fontSize: "10px",
    margin: "6px 0px 10px 0px",
  },
  "&:hover": {
    backgroundColor: "#D7282F",
    color: "#fff",
  },
}));

export const TButtonGroup = styled(ToggleButtonGroup)(() => ({
  display: "flex",
  gap: "18px !important",
  marginTop: "16px !important",
  marginBottom: "16px",
  "@media screen and (max-width:480px)": {
    display: "block",
  },
}));

/**** 19/04/2024 ****/
export const ProuctTypeLine = styled(Box)(() => ({
  padding: "0 0 8px 0",
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: "600",
  },
  span: {
    borderRadius: "4px",
    padding: "0px 8px",
    backgroundColor: "#fff",
    margin: "0 4px",
  },
  "& .by-orderp": {
    border: "1px solid #D7282F",
    color: "#D7282F",
  },
  "& .in-stockp": {
    border: "1px solid #34A853",
    color: "#34A853",
  },
}));

export const CommercialSectionInfo = styled(Box)(() => ({}));

export const CommercialSectionInfoInner = styled(Box)(() => ({
  margin: "14px 0 0",
}));
export const CWhiteBox = styled(Box)(() => ({
  background: "#fff",
  borderRadius: "4px",
  padding: "10px",
  margin: "0 0 15px",
  "& .emptyOrigin":{
    fontSize:'14px',
    color:'#231f20'
  }
}));
export const CommercialHeading = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "600",
  color: "#d7282f",
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
  gap: "6px",
  "& .greysmallheading": {
    fontSize: "12px",
    color: "#4a4a4a",
    padding: "2px 0 0",
  },
}));
export const CommercialdesP = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#4A4A4A",
  padding: "2px 0",
  alignContent: "center",
  "& .cinfo-icon": {
    color: "#34A853",
    fontSize: "16px",
    margin: "4px 0 -2px 4px",
  },
  "& .manufactured-place": {
    fontWeight: "600",
  },
}));
export const CommercialCheckValue = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#231F20",
  padding: "2px 0 0",
  fontWeight: 600,
  "& i": {
    padding: "0 5px 0 0",
    fontSize: "16px",
  },
}));
export const DevideInfoArea = styled(Box)(() => ({}));
export const CommercialInfoLft = styled(Box)(() => ({
  padding: "4px 0 0",
}));
export const SmallHeadingInn = styled(Typography)(() => ({
  fontSize: "13px",
  color: "#231F20",
  fontWeight: 600,
}));

// configure style starts

export const SeaportAirport = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  borderRight: "1px solid #E4E4E4",
}));
export const ProductOptionandViewMore = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));



/**** Maya 05/07/24 ****/
export const PriceTermText = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 600,
  color: "#000000",
  display: "flex",
  alignItems: "center",
}));
export const BoldCommonTypography = styled("span")(() => ({
  fontWeight: 600,
}));

export const ShowHideView = styled(Box)(() => ({
  padding: "2px 0",
  borderTop: "1px solid #ddd",
  margin: "8px 0 0",
  "& .MuiTypography-root": {
    fontSize: "14px",
    color: "#000"
  },
  "& .icon-agreement": {
    fontSize: "26px"
  }

}));

export const IconWithText = styled(Box)(() => ({
  display: "flex",
  fontSize: "14px",
  gap: "5px",
  alignItems:"center",
  "& .icon-agreement": {
    fontSize: "26px",
  },
  "& .path2:before": {
    color: "#4aab41"
  }
}));

export const HideShowtextImage = styled(Box)(() => ({
  display: "flex",
  fontSize: "14px",
  gap: "5px",
  alignItems: "flex-start",
  padding: "0 0 3px",
  "& img": {
    width: "14px",
    margin: "3px 0 0"
  }
}));

export const ShowHideViewText = styled(Typography)(() => ({
  fontSize: "15px !important",
  fontWeight: 600,
  color: "#000000",
  padding: "3px 0"
}));

export const FlyoutDescription = styled("span")({
  fontSize: "12px",
  cursor: "pointer",
  color: "#231f20",
  fontWeight: "600",
  lineHeight: "normal",
  "&:hover": {
    color: "#d7282f",
    textDecoration: "underline",
  },
});
export const BadgeImage = styled(Box)(() => ({
  position: "relative",
  width: "90px",
  height: "32px",
  "@media (max-width: 899px)": {
    position: "absolute",
    right: 0,
    // top: "-17px"
    top: "-30px"
  },
}));


/***** Icon datagrid  ******/
export const ConfigSDatagrid = {
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "&.MuiDataGrid-root": {
    height: "90%",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
    fontSize: "14px",
    color: "#1A2027",
    fontFamily: "Open Sans",
  },
  "& .MuiDataGrid-cell": {
    color: "#3E5060",
    fontSize: "13px",
    fontFamily: "Open Sans",
    cursor: "pointer",
  },
  "& .Mui-checked": {
    color: "#d7282fcc !important",
  },
  "& .MuiSvgIcon-root": {
    // color: "#D7282F",
    fontSize: 16,
  },
  "& .MuiDataGrid-columnSeparator": { display: "none" },
};
export const ConfigureMetrixTable = styled(Box)(() => ({
  margin: "1rem 0"
}));
export const ConfigureMetrixTableInn = styled(Box)(() => ({
  margin: "14px 0 0"
}));
export const ProductBreadcrumbsStyle = styled(Box)(() => ({
  visibility: "visible",
  // paddingLeft: "16px",
  margin: "-7px 0px 10px",
  "& .MuiBreadcrumbs-li": {
    "& .MuiLink-root": {
      color: "#231F20",
      textDecoration: "none",
      fontSize: "12px",
    },
    "&:last-child": {
      "& .MuiLink-root": {
        fontWeight: "600",
        color: "#D82E34",
      },
    },
  },
  "& .MuiBreadcrumbs-separator": {
    fontSize: "0",
    background: 'url("/assets/breadcrumb-arrow.svg") no-repeat center',
    display: "block",
    width: "7px",
    height: "10px",
    position: "relative",
    top: "2px",
    opacity: "0.7"
  },
  "@media screen and (max-width: 767px)": {
    padding: "0 10px 5px",
    background: "#f5f5f5",
     margin: "0 0px 10px"
  },
}));
export const IdProductColB = styled(Box)(() => ({
  position: "absolute", 
  top:"20px",
  backgroundColor: "#898989",
  borderRadius: "3px",
  color: "#ffffff",
  display: "inline-flex",
  marginBottom: "6px",
  padding: "0px 4px",
  fontSize: "10px",
  right: "5px",
  "& .MuiTypography-body1":{
    fontSize:"10px"
  }
}));

export const SKUNumberData = styled(Box)(() => ({
  "& .MuiTypography-body1":{
    fontSize:"12px",
    "& span":{
      fontWeight:700
    }
  }
}));
export const ConfigImgBox = styled(Box)(() => ({
background:"#ddd",
// width:"30px",
// height:"30px",
// borderRadius:"50px",
// "& .MuiAvatar-root":{
//   width:"100%",
//   height:"100%",
// }
}));






