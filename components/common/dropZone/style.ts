import { styled, Button, Typography, Divider, Grid, Box } from "@mui/material";

export const PreHeaderText = styled("div")({
  fontFamily: "open sans",
  fontWeight: 600,
  fontSize: "30px",
  lineHeight: "41px",
  marginBottom: "30px",
  display: "flex",
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
});
export const DividerUI = styled(Divider)(() => ({
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
  margin: "5px 0 10px",
  textAlign: "center",
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
  () => ({
    display: "flex",
    alignContent: "center",
    border: "6px",
    top: 0,
  })
);
export const ProductImageContainer = styled("div")({
  flexDirection: "row",
  width: "100%",
  marginTop: "5px",
  gap: "16px",
  maxHeight: "121px",
  minHeight: "36px",

  alignItems: "center",
  "&::-webkit-scrollbar": {
  },
  "&::-webkit-scrollbar-track": {
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
  height:'100%',
  "&::-webkit-scrollbar": {
  },
  "&::-webkit-scrollbar-track": {
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: "2px",
  },
  "@media screen and (max-width:600px)":{
    overflowX:"scroll",
    marginTop:'16px'
  }
});
export const Verticaldivider = styled(Divider)({
  marginLeft: "8px",
});
export const PhotoGallaryText = styled("h3")({
  fontSize: "14px",
  display: "flex",
  flexDirection: "row",
  minWidth: "0px",
  color: "#242424",
  alignSelf: "center",
});
export const DeleteButton = styled(Button)({
  color: "#D7282F",
  textTransform: "capitalize",
  right: "1px",
  display: "inline-flex",
});
export const UploadedPhotoGallary = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  marginTop: "8px",
  gap: "8px",
  overflowY: "scroll",
  width: "100% !important",
  margin: "0 auto !important"
});
export const ImagesGrid = styled(Grid)({
  bottom: 13
});
export const ButtonBox = styled("div")({
  right: 20,
  position: "absolute",
  marginLeft: "30px",
  bottom: 30,
  display: "flex",
  gap: "10px",
});
export const PhotoDelete = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});
export const DeleteBox = styled("span")({
  marginTop: "10px",
});

export const ImageBox = styled("div")({
  maxWidth: "100px",
  width: "100px",
  position: "relative",
  display: "-webkit-inline-flex",
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
  marginRight: "16px",
  marginBottom:"16px",
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
  borderRadius:'100%',
  backgroundColor:'#ffffff',
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
  textAlign: "center",
  color: "GrayText",
  display: "flex",
  alignSelf: "center",
});
export const ImagesBox = styled("span")({
  margin: "2px",
  height:"100%",
  top: "20px",
  alignItems: "center",
  display: "grid",
  alignItem: "center",
  objectFit: "cover",
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
  width:"22px",
  height:'19px',
  display:'inline-block', 
  marginRight:'4px', 
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
});
export const DropZoneContainer = styled("div")({
});
export const DragDropContainer = styled(Typography)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  position: "relative",
  width: "-webkit-fill-available",
  justifyContent:'space-between',
  '& .css-tn9jn5':{
    width:'100%',
    display:'block', 
    padding:'16px 0', 
  },
});
export const UploadProductImageHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100",
});

export const PhotoGallaryContainer = styled("div")({
  width: "100%",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
});

export const UploadImages = styled(Box)({
  border: "1px dashed #ABABAB",
  borderWidth: "thin",
  borderRadius:'6px', 
  padding:'0px 12px 12px', 
  height:'100%',
  display:'flex',
});
export const FeaturedImg = styled(Box)({
  border: "1px solid #d2d2d2",
  padding:'4px',
  width:'100%',
  margin:'4px 0 12px 0',
  height:'100px',
  '& img':{
    width:'100%',
    height:'90px', 
    objectFit:'cover', 
  },
  "@media (max-width: 1368px)": {
    height:'66px',
    '& img':{
      height:'100%',
    },
  },
});
export const DelallImg = styled(Box)({
  margin:'0',
  height:'30px',
  position:'absolute',
  right:'0',
  '& .MuiButton-textPrimary':{
    color:'#D7282F',
    position:'relative',
    top:'-38px',
    '& .MuiSvgIcon-root':{
      fontSize:'21px',
    },
  },
  "@media screen and (max-width:1199px)":{
  }
});
export const ImgContainer = styled(Box)({
  width:'100%',
  height:"100%",
  '& img':{
    // height:'60px',
    height:"100%",
    width:'100%',
    objectFit:'cover',
  },
});