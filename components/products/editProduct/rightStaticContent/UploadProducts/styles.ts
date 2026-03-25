import { styled, Button, Typography, Divider, Grid, Box } from "@mui/material";

export const PreHeaderText = styled("div")({
  fontFamily: "open sans",
  fontWeight: 600,
  fontSize: "30px",
  lineHeight: "41px",
  marginBottom: "30px",
  display: "flex",
  // paddingLeft: "15px",
  color: "#231F20",
});
export const ImageContainer = styled("span")({
  position: "absolute",
  right: "20px",
  top: "20px",
});
export const ModalContainer = styled("div")({
  width: "868",
  height: "668px",
  display: "none",
  position: "fixed",
  background: "#fff",
  top: 0,
  left: 0,
  backgroundColor: "#fff",
  zIndex: 1,
  overscrollBehavior: "initial",
  textTransform: "capitalize",
  // display: 'none',
  // position: 'fixed',
  // top: '0%',
  // left: '0%',
  // background: '#fff',
  // z-index: 1,
  // overflow:'auto'
});
export const DividerUI = styled(Divider)((variant: any) => ({
  display: "block",
  width: "100%",
}));
export const CrossImage = styled("div")({
  cursor: "pointer",
  margin: "-11px -5px 0 0",
});
export const UpdateImageGallary = styled("div")({
  display: "flex",
  justifyContent: "center",
  // flexDirection:"row",
  margin: "5px 0 10px",
  textAlign: "center",
  // marginLeft:"20px"
});
export const UpdateImageText = styled(Typography)({
  fontSize: "15px",
  display: "flex",
  paddingLeft: "20px",
  minWidth: "0px",
});
export const CloudIconBox = styled("span")({
  paddingRight: "10px",
  top: 0,
  alignContent: "baseline",
});
export const DividerUpdateImage: any = styled("div")(
  ({ productImage }: any) => ({
    display: "flex",
    alignContent: "center",
    border: "6px",
    top: 0,
  })
);
export const ProductImageContainer = styled("div")({
  // display: "flex",
  flexDirection: "row",
  width: "100%",
  marginTop: "5px",
  // maxWidth:"120px",
  gap: "16px",
  // border: "1px solid #DDDDDD",
  // marginTop: '10px',
  maxHeight: "121px",
  // overflowX: "auto",
  // overflowY: "hidden",
  minHeight: "36px",

  alignItems: "center",
  "&::-webkit-scrollbar": {
    // width: '10px',
  },
  "&::-webkit-scrollbar-track": {
    // boxShadow: 'inset 0 0 0px rgba(0,0,0,0.00)',
    // webkitBoxShadow: 'inset 0 0 2px rgba(0,0,0,0.00)',
    // borderRadius: '2px',
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: "2px",
  },
  height: "300px",
  overflowY: "scroll",
});

export const ProductImageContainerup = styled("div")({
  display: "block",
  width: "100%",
  padding: "16px 0",
  height: "100%",
  "&::-webkit-scrollbar": {
    // width: '10px',
  },
  "&::-webkit-scrollbar-track": {
    // boxShadow: 'inset 0 0 0px rgba(0,0,0,0.00)',
    // webkitBoxShadow: 'inset 0 0 2px rgba(0,0,0,0.00)',
    // borderRadius: '2px',
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: "2px",
  },
  "@media screen and (max-width:600px)": {
    overflowX: "scroll",
    marginTop: "16px",
  },
});
export const Verticaldivider = styled(Divider)({
  // top:0,
  marginLeft: "8px",
});
export const PhotoGallaryText = styled("h3")({
  fontSize: "14px",
  display: "flex",
  flexDirection: "row",
  //  paddingLeft:"20px",
  minWidth: "0px",
  color: "#242424",
  alignSelf: "center",
});
export const DeleteButton = styled(Button)({
  color: "#D7282F",
  // position:"absolute",
  textTransform: "capitalize",
  right: "1px",
  display: "inline-flex",
  //  bottom:"14rem"
});
export const UploadedPhotoGallary = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  marginTop: "8px",
  gap: "8px",
  overflowY: "scroll",
  width: "100% !important",
  margin: "0 auto !important",
  "&::-webkit-scrollbar": {
    // width: '10px',
  },
});
export const ImagesGrid = styled(Grid)({
  bottom: 13,
  // width:"20px",
  // display:"flex",
  // flexDirection:"row",
  // overflowX: "hidden",
  // overflowY: "auto",
  //  display: "flex",
  // flexDirection: "row",

  // marginTop: "5px",
  // // maxWidth:"120px",
  // gap: "6px",
  // border: "1px solid #DDDDDD",
  // borderRadius: "3px",
  // // marginTop: '10px',
  // maxHeight: "121px",
  // overflowX: "auto",
  // overflowY: "hidden",
  // "&::-webkit-scrollbar": {
  //   // width: '10px',
  // },
});
export const ButtonBox = styled("div")({
  right: 20,
  // width:"100%",
  position: "absolute",
  marginLeft: "30px",
  bottom: 30,
  display: "flex",
  gap: "10px",
});
export const PhotoDelete = styled("div")({
  // display:"contents",
  display: "flex",
  justifyContent: "space-between",
});
export const DeleteBox = styled("span")({
  marginTop: "10px",
});

export const ImageBox = styled("div")({
  // paddingTop: "2px",
  maxWidth: "100px",
  width: "100px",
  // height:"70px",
  position: "relative",
  display: "-webkit-inline-flex",
  // flexDirection: "row",
  // marginRight: "4px",
  border: "1px solid #DDDDDD",
  bottom: "3px",
  padding: "2px",
});

export const ImageBoxup = styled("div")({
  paddingTop: "2px",
  minWidth: "110px",
  maxWidth: "75px",
  position: "relative",
  display: "-webkit-inline-flex",
  // flexDirection: "row",
  marginRight: "16px",
  marginBottom: "16px",
  border: "1px solid #DDDDDD",
  borderRadius: "3px",
  padding: "2px",
  "& .css-1mejs7f": {
    width: "100%",
    "& img": {
      width: "100%",
    },
  },
});
export const DeleImage = styled("span")({
  width: "24px",
  position: "absolute",
  top: "-12px",
  right: "-12px",
  zIndex: 100,
  height: "24px",
  borderRadius: "100%",
  backgroundColor: "#ffffff",
});
export const EmptyGallaryData = styled("span")({
  width: "100%",
  height: "100px",
  justifyItems: "center",
  left: 75,
  display: "grid",
  alignSelf: "center",
  textAlign: "center",
});
export const GallaryEmptyText = styled("h3")({
  // position:"absolute",
  // marginLeft:"20rem",
  // fontFamily:"sans-serif",
  textAlign: "center",
  color: "GrayText",
  display: "flex",
  alignSelf: "center",
});
export const ImagesBox = styled("span")({
  margin: "2px",
  top: "20px",
  alignItems: "center",
  display: "grid",
  alignItem: "center",
  objectFit: "cover",
  height: "100%",
  maxHeight: "100%",
  // boxShadow:
  //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
});

export const ProductImageText = styled("h5")({
  width: "auto",
  height: "27px",
  left: "0px",
  top: "0px",
  fontFamily: "Open Sans",
  fontSize: "20px",
  color: "#000000",
});
export const DropZoneBox: any = styled("form")({
  width: "100%",
  display: "grid",
  alignItems: "center",
  textAlign: "center",
});
export const TerrainIconContainer = styled("span")({
  color: "#4B4B4B",
  width: "22px",
  height: "19px",
  display: "inline-block",
  marginRight: "4px",
});
export const DragDropText = styled("h5")({
  fontWeight: "600",
  fontSize: "14px",
  color: "#242424",
  "@media (max-width: 1368px)": {
    fontSize: "13px",
  },
  "@media (max-width: 1024px)": {
    fontSize: "12px",
  },
});
export const BrowseContainer = styled("span")({
  // color: "red",
  // paddingLeft: "5px",
});
export const DropZoneContainer = styled("div")({
  // alignItems: "center",
  // display: "flex",
  // flexDirection: "row",
});
export const DragDropContainer = styled(Typography)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  position: "relative",
  width: "-webkit-fill-available",
  justifyContent: "space-between",
  "& .css-tn9jn5": {
    width: "100%",
    display: "block",
    padding: "16px 0",
  },
});
export const UploadProductImageHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100",
  // flexDirection: "column",
  // alignItems: "flex-start",
  // padding:"12px,16px",
  // top:50,
  // position: "relative",
  // width: "868px",
  // height: "588px",
});

export const PhotoGallaryContainer = styled("div")({
  width: "100%",
  // gap:7,
  // position:"relative",
  backgroundColor: "#FFFFFF",
  // height:"588px",
  display: "flex",
  flexDirection: "column",
  // alignItems:"flex-start",
  // padding:"12px,16px",
  // bottom:10
});

export const UploadImages = styled(Box)({
  border: "1px dashed #ABABAB",
  borderWidth: "thin",
  borderRadius: "6px",
  padding: "0px 12px 12px",
  height: "100%",
  display: "flex",
  // overflowX: "scroll",
  // "&::-webkit-scrollbar": {
  //   width: "6px",
  //   height: "6px",
  // },
  // "&::-webkit-scrollbar-track": {
  //   background: "#f1f1f1",
  // },
  // "&::-webkit-scrollbar-thumb": {
  //   background: "#d2d2d2",
  //   borderRadius: "10px",
  // },
  // "&::-webkit-scrollbar-thumb:hover": {
  //   background: "#888888",
  // },
});
export const FeaturedImg = styled(Box)({
  overflow: "hidden",
  border: "1px solid #d2d2d2",
  padding: "4px",
  width: "100%",
  margin: "4px 0 12px 0",
  // height: "150px",
  height: "165px",
  background: "#e9e9e9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  "@media only screen and (max-width:1299px) and (min-width:900px)": {
    height: "190px",
  },
  "@media (max-width: 1368px)": {
    // height: "66px",
    "& img": {
      height: "100%",
    },
  },
});
export const DelallImg = styled(Box)({
  margin: "0",
  height: "30px",
  position: "absolute",
  right: "0",
  "& .MuiButton-textPrimary": {
    color: "#D7282F",
    position: "relative",
    top: "-38px",
    "& .MuiSvgIcon-root": {
      fontSize: "21px",
    },
  },
  "@media screen and (max-width:1199px)": {
    // marginTop:'10px'
  },
});
export const ImgContainer = styled(Box)({
  // width: "100%",
  width: "150px",
  height: "100px",
  overflow: "hidden",
  "& img": {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
});
export const RedStripBox = styled(Box)({
  position: "absolute",
  left: "0px",
  top: "-1px",
  height: "40px",
});
export const RedStripBoxLabel = styled(Typography)({
  position: "absolute",
  top: "7px !important",
  color: "#fff",
  fontSize: "11px",
  transform: "rotate(-34deg)",
  right: "13px",
});
// Upload image section
export const UploadOuterDiv = styled(Box)({
mt:2,
"& .marginforresponsive":{
  "@media screen and (max-width:900px)":{
    margin:'24px 0 0 0'
  }
}
});