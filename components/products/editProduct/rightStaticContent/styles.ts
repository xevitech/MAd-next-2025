import { styled, Button, Box, Typography, ButtonBase } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const InnerRightContainer: any = styled("div")(({ value }: any) => {
  return {
    position: "fixed",
    width: "240px",
    top: value.stick ? "80px" : "129px",
    margin: "0px",
    display: "flex",
    marginLeft: "15px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    paddingTop: "0px",
    paddingBottom: "10px",
    gap: "15px",
    flexDirection: "column",
    transition: "all ease .5s",
    right: !value?.toggle ? "14px" : "",
    zIndex: "2",
    "@media (max-width:1024px)": {
      right: value?.toggle ? "14px" : "-241px",
    },
  };
});
export const InnerRightContainerContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  background: "#FFFFFF",
  paddingTop: "12px",
  "@media (max-width:1024px)": {
    boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.1)",
  },
});

export const InnerRightContentProfileCompletionBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const CircularContainer = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const InnerCircle = styled("div")({
  width: "104px",
  height: "104px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#F2F2F2",
  border: "1px solid #DDDDDD",
  position: "absolute",
});

export const DescriptionText = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "15px",
  marginTop: "0px",
  marginBottom: "10px",
  textAlign: "center",

  color: "#5F5F5F",
});

export const ButtonContainer :any = styled("div")( ({ value }: any) => {
  return {display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  marginBottom: "8px",
  "& .publishbutton": {
    background:   value=="Published" ? '#008000' :"#d7272f", color:"#fff"
  },
  "& .publishdisable": {
    background: "#ddd",
    boxShadow: "none",
    color: "#231F20",
    "&:hover": {
      background: "#ddd",
    },
  },
  "& .publishbutton-grey":{
    color: "#231F20",
  },
  "& .publishedBtn":{
    color:"#fff !important"
  },
  "& .white":{
    color:"#fff !important"
  },
  // "& .published":{
  //   color:'orange',
  //   backgroundColor: value=="Published" ? '#008000': "#d7272f",
  // }
}
});

export const InnerRightMiddleContainer = styled("div")({
  height: "98px",
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  display: "flex",
  width: "240px",
});

export const ItemContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 0.5,
  marginTop: "10px",
  marginBottom: "10px",
});

export const IconContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "5px",
  position: "relative",
  // /width: '100%',
  justifyContent: "center",
  padding: "5px",
  cursor: "pointer",
  width: "fit-content",
  margin: "auto",
});

export const TextContainer = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "16px",
  color: "#3A3A3A",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
export const HelpCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  height: "150px",
  width: "100%",
  padding: "15px",
});
export const HelpCardHeader = styled("div")({
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "30px",
  color: "#DD484E",
  fontFamily: "open sans",
});
export const HelpCardContentText = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "16px",
  paddingTop: "5px",

  color: "#000000",
});
export const HelpCardFooterContainer = styled("div")({
  paddingTop: "10px",
});
export const HelpCardFooterButton = styled(Button)({
  background: "#D7282F",
  borderRadius: "4px",
  textTransform: "none",
  minWidth: "120px",
  fontWeight: 600,
  fontSize: "13px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  color: "#FFFFFF",
  "&:hover": {
    background: "#D7282F",
  },
});
export const StickyContainer = styled("div")({});
export const Sticky = styled("div")({
  position: "sticky",
});
export const CategoryListing = styled("div")(({ theme }) => ({
  "& .MuiList-root": {
    marginLeft: "30px",
  },
  "& .MuiListItemText-root": {
    margin: "3px 0",
    paddingLeft: "12px",
    position: "relative",
    "&:before": {
      content: '" "',
      position: "absolute",
      display: "inline-block",
      borderRadius: "100%",
      width: "6px",
      height: "6px",
      backgroundColor: "#DD484E",
      left: "0",
      top: "50%",
      transform: "translate(0 , -50%)",
    },
  },
  "& .MuiTypography-root": {
    fontSize: "13px",
  },
  "& .MuiListItem-root": {
    padding: "0",
  },
}));

export const PublishToggle = styled(Box)({
  position: "absolute",
  right: "100%",
  top: "20px",
  backgroundColor: "#414141",
  width: "50px",
  borderRadius: "14px 0px 0px 14px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "-2px 0px 7px rgba(0, 0, 0, 0.4)",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    color: "white",
    fontSize: "40px",
  },

  "@media (min-width:1025px)": {
    display: "none",
  },
});

export const EditProductSwitchSection = styled(Box)({
  margin: "10px",
  borderTop: "1px dashed #ABABAB",
  padding: "10px",
  display: "flex",
  alignItems: "center",

  "& .MuiTypography-root": {
    fontSize: "12px",
    color: "#5F5F5F",
  },
  "& .MuiStack-root": {
    margin: "0 auto",
  },
});

// _______________________________________________________________________________________________________________________________
// ads 1

// export const Buttonstyle = styled(ButtonBase)(() => ({
//   backgroundColor: "rgba(215, 40, 47, 0.85)",
//   color: "#ffff",
//   fontSize: "12px",
//   fontWeight: "700",
//   padding: "5px 12px ",
//   borderRadius: "6px",
//   transition: "0.3s",
//   "&:hover": {
//     backgroundColor: "rgba(215, 40, 47, 1)",
//     transition: "0.3s",
//   },
// }));

// export const Mainbox = styled(Box)(() => ({
//   height: "250px",
//   width: "240px",
//   backgroundImage: `url('/assets/adsbg.svg')`,
//   objectFit: "contain",
//   backgroundRepeat: "no-repeat",
//   borderRadius: "5px",
//   boxShadow:
//     "0px 9px 10px rgba(159, 162, 191, 0.15), 0px 0px 19px rgba(159, 162, 191, 0.04)",
//   zIndex: "-1",
// }));
// export const Rightbox = styled(Box)(() => ({
//   float: "right",
//   marginRight: "8px",
//   marginTop: "8px",
// }));
// export const useStyles = makeStyles({
//   imageone: {
//     width: "100%",
//     height: "165.8px",
//     objectFit: "contain",
//   },
//   imagetwo: {
//     width: "160px",
//     height: "98.34px",
//     position: "absolute",
//     left: "41px",
//     top: "30px",dtext
//     objectFit: "contain",
//   },
//   rightstaricon: {
//     height: "21px",
//     width: "100%",
//   },
//   // ads 2
//   alltext: {
//     fontWeight: 400,
//     fontSize: "10px !important",
//     color: "#231F20",
//   },
//   redtext: {
//     fontWeight: 700,
//     fontSize: "13px !important",
//     color: "#D7282F",
//   },
//   bgimage: {
//     marginRight: "8px",
//     marginTop: "8px",
//   },
//   map: {
//     position: "absolute",
//     top: "-60px",
//     left:'0px',
//     width:'100%'
//   },
//   ellipse: {
//     position: "absolute",
//     top: "-40px",
//     right: "6px",
//     height: "140px",
//   },
//   ellipseimage: {
//     position: "absolute",
//     top: "-40px",
//     right: "6px",
//     borderRadius: "50%",
//     height: "130px",
//   },
//   hexaimage: {
//     position: "absolute",
//     top: "40px",
//     left: "12px",
//   },
//   hexatext: {
//     position: "absolute",
//     color: "#ffff",
//     fontWeight: 700,
//     fontSize: "13px",
//     top: "60px",
//     left: "35px",
//   },
//   hexatext2: {
//     position: "absolute",
//     color: "#ffff",
//     fontWeight: 700,
//     fontSize: "26px !important",
//     left: "-15px",
//     top: "15px",
//   },
// });

// export const Alltext = styled(Typography)(() => ({
//   fontSize: "11px !important",
//   fontWeight: 600,
//   color: "#231F20",
// }));
// export const Redtext = styled("span")(() => ({
//   fontSize: "14px !important",
//   fontWeight: 900,
//   color: "#D4454E",
// }));
// export const Blackboldtext = styled("span")(() => ({
//   fontSize: "15px !important",
//   fontWeight: 900,
//   color: "#231F20",
// }));

// // ads 2
// // ____________________________________
// export const Buttonstyle1 = styled(ButtonBase)(() => ({
//   backgroundColor: "rgba(215, 40, 47, 0.85)",
//   color: "#ffff",
//   fontSize: "12px",
//   fontWeight: "700",
//   padding: "5px 14px ",
//   borderRadius: "6px",
//   transition: "0.3s",
//   "&:hover": {
//     backgroundColor: "rgba(215, 40, 47, 1)",
//     transition: "0.3s",
//   },
// }));

// export const Alltext1 = styled(Typography)(() => ({
//   color: "#231F20",
//   fontSize: "16px",
// }));
// export const Mainbox1 = styled(Typography)(() => ({
//   backgroundImage: `url('/assets/Mask group.svg')`,
//   height: "260px",
//   width: "240px",
//   backgroundRepeat: "no-repeat",
//   borderRadius: "5px",
//   boxShadow:
//     "0px 9px 10px rgba(159, 162, 191, 0.15), 0px 0px 19px rgba(159, 162, 191, 0.04)",
// }));
// export const Floatbox = styled(Typography)(() => ({
//   float: "right",
// }));
