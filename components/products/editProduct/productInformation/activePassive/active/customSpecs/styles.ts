import { styled, Button, Box, Typography } from "@mui/material";
import { display, fontSize, fontWeight, height } from "@mui/system";

export const InnerContainerSingleSpec = styled("div")({
  minHeight: "40px",
  display: "flex",
  flex: 1,
  borderBottom: "1px solid #D2D2D2",
  "& .MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      color: "#d7282f",
    },
    "&.Mui-checked": {
      color: "#d7282f",
      "& .MuiSvgIcon-root": {
        color: "#d7282f",
      },
    },
  },
});

export const AddComponentContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  flex: 0.25,
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "19px",
  fontFamily: "Open Sans !important",
  /* identical to box height */

  color: "#231F20",
});

export const AuxiliaryAddMore = styled(Button)({
  fontSize: "13px",
  fontWeight: "500",
  color: "#d7282f",
  backgroundColor: "#fff",
  border: "1px solid #d7282f",
  transition: "all ease .3s",
  padding: "4px 12px",
  textTransform: "capitalize",
  margin: "8px 0px 13px 0",
  "&:hover": {
    backgroundColor: "#d7282f",
    color: "#fff",
    border: "1px solid #d7282f",
    transition: "all ease .3s",
  },
});
export const AuxiliaryHeading = styled(Typography)({
  fontSize: "14px",
  fontWeight: "600",
  color: "#231f20",
  fontFamily: "Open Sans !important",
});
export const AuxiliaryText = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  color: "#231f20",
  marginLeft: "6px",
  marginBottom: "10px",
  fontFamily: "Open Sans !important",
});
export const ChooseFileIcon = styled("div")({
  display: "flex",
  flex: 0.25,
  alignItems: "center",
  justifyContent: "center",
});

export const TermNameContainer = styled("div")({
  display: "flex",
  flex: 0.25,
  alignItems: "center",
});
export const TermNameContent = styled("div")({
  display: "flex",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "24px",
  alignItems: "center",
  //   fontFamily: "open sans",
  /* identical to box height, or 171% */
  letterSpacing: "0.09px",
  color: "#000000",
  gap: "6px",
});
export const DeleteIconContainer = styled("div")({
  display: "flex",
  flex: "0.25",
  alignItems: "center",
  justifyContent: "center",
});

export const OuterContainerSingleSpec = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const Img = styled("img")({
  // borderRadius: "50%",
  height: "100%",
  width: "100%",
  objectFit: "contain",
  "&:hover": {
    // height: "38px",
    // width: "38px",
    // borderRadius: "0px",
  },
});

export const ImgContainer = styled("div")({
  display: "flex",
  // gap: "10px",
  alignItems: "center",
  height: "100%",
  margin: "6px",
});

export const OuterContainerCustomSpec = styled("div")({
  // padding: "6px",
  border: "1px solid #D2D2D2",
  borderRadius: "4px",
});

export const HeaderCustomSpec: any = styled(Box)(({ expanded }: any) => ({
  height: "50px",
  background: expanded ? "transparent" : "#ECECEC",
  borderRadius: "4px",
  padding: "12px 16px 12px 0px",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  borderBottom: expanded && "1px solid #D2D2D2",
  "& .typetext": {
    "&:hover": {
      cursor: "pointer",
      "& .arrowicons": {
        color: "#d7282f",
      },
    },
  },
}));
export const CustomSpecification: any = styled(Box)(({ expanded }: any) => ({
  "& .MuiTableHead-root": {
    background: "#f8f8f8",
  },
  "& .MuiTableCell-root": {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1A2027",
  },
  "& .ActionCol": {
    position: "sticky",
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    borderLeft: "1px solid #ddd",
    "&::before": {
      content: "''",
      position: "absolute",
      bottom: "-10px",
      top: "0",
      left: "0px",
      width: "6px",
      boxShadow: "-3px 0px 3px #eeeeee",
      height:'100%',
    },
  },
  "& .ActionData": {
    position: "sticky",
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    background: "#fff",
    borderBottom: "1px solid #d2d2d2",
    "&::before": {
      content: "''",
      position: "absolute",
      bottom: "0px",
      top: "0",
      left: "0px",
      width: "6px",
      boxShadow: "-3px 0px 3px #eeeeee",
    },
  },
}));

export const SpecNameContainer = styled("div")({
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "24px",
  display: "flex",
  alignItems: "center",
  /* identical to box height, or 171% */

  letterSpacing: "0.09px",
  marginLeft: "12px",
  color: "#000000",
  // width: "100%",
  textTransform: "capitalize",
});

export const SpecDeleteIconContainer = styled("div")({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  width: "100%",
  // marginLeft: "12px",
  "@media screen and (max-width:767px)": {
    justifyContent: "start",
    padding: "0 0 0 12px",
  },
  "& .MuiSelect-select": {
    // padding:"6px 12px"
  },
});
export const SpecInnerContent = styled("div")({
  // padding: "16px",
  fontFamily: "Open Sans !important",
});
export const AddedTermsContainer = styled("div")({});

export const AddNewTermContainer = styled("div")({
  paddingLeft: "16px",
  paddingBottom: "16px",
  paddingTop: "16px",
});
export const CustomButtonCustomSpec = styled(Button)({
  background: "#DD484E",
  color: "white",
  fontWeight: 600,
  fontSize: "14px",
  lineheight: "24px",
  /* identical to box height, or 171% */
  // letterSpacing: "0.09px",
  "&:hover": {
    background: "#DD484E",
    color: "white",
  },
});

export const SmallContainer = styled("div")({
  display: "flex",
  flex: "0.25",
  // justifyContent: "center",
  alignItems: "center",
  fontWeight: 600,
  fontSize: "13px",
  lineHeight: "19px",
  fontFamily: "Open Sans !important",
  /* identical to box height */

  color: "#2F2F2F",
});
export const OuterContainerCustomSpecs = styled("div")({
  border: "1px solid #E1E1E1",
  borderRadius: "6px",
  marginTop: "16px",
});
export const HeaderCustomSpecs = styled("div")({
  height: "auto",
  // background: "#676474",
  background: "#F0F3F8",
  borderRadius: "6px 6px 0px 0px",
  padding: "10px 16px",
});

export const HeaderMainText = styled("p")({
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  color: "#ffffff",
});

export const HeaderSubText = styled("p")({
  color: "#ffffff",
  // fontWeight: 400,
  fontSize: "12px",
  lineHeight: "24px",
  fontFamily: "open sans",
  "@media screen and (max-width:480px)": {
    lineHeight: "normal",
  },
});

export const InputFieldContainer = styled("div")({
  margin: "16px",
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const InputFieldInn = styled("div")({
  margin: "16px",
  marginTop: "24px",
  display: "flex",
});

export const BtnContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "100px",
  borderRadius: "0 4px 4px 0px",
  position: "relative",
  right: "0px",
  borderLeft: "1px solid #d2d2d2",
});

export const CustomButtonCustomSpecs = styled(Button)({
  textTransform: "none",
  background: "#D7282F",
  color: "white",
  fontWeight: 600,
  fontSize: "13px",
  lineheight: "24px",
  borderLeft: "none",
  letterSpacing: "0.09px",
  padding: "3px 0px",
  height: "28.75px",
  "&:hover": {
    background: "#D7282F",
    color: "white",
  },
});

export const SpecificationsListContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  // margin: "30px 15px 0",
  margin: "15px 15px 0",
});

export const SuggestedSpecContainer = styled("div")({
  display: "flex",
  minHeight: "56px",
  alignItems: "center",
  // border: "1px solid #E1E1E1",
  borderRadius: "6px",
  margin: "16px 16px 0px 16px",
  flex: 1,
  justifyContent: "space-between",
  "@media screen and (max-width:1024px)": {
    display: "grid",
  },
});

export const SpecLeftContainer = styled("div")({
  display: "block",
  padding: "16px",
});

export const SpecRightContainer = styled("div")({
  flex: 0.2,
  display: "flex",
  alignItems: "center",
  minHeight: "56px",
  borderLeft: "1px solid #E1E1E1",
  justifyContent: "center",
  padding: "0 16px",
});

export const CustomChipSelected = styled("div")({
  height: "24px",
  background: "#7D7C7C",
  borderRadius: "4px",
  fontWeight: 600,
  fontSize: "13px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  color: "#FFFFFF",
  paddingLeft: "6px",
  paddingRight: "6px",
  cursor: "pointer",
  float: "left",
  margin: "4px 6px 4px 0",
});

export const CustomChip = styled(Box)({
  fontWeight: 600,
  height: "24px",
  fontSize: "13px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  background: "#FFFFFF",
  border: "1px solid #7D7C7C",
  borderRadius: "4px",
  color: "#424242",
  paddingLeft: "6px",
  paddingRight: "6px",
  cursor: "pointer",
  float: "left",
  margin: "4px 6px 4px 0",
});

export const TextFieldSec = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiOutlinedInput-input": {
    paddingTop: "6px",
    paddingBottom: "6px",
    fontSize: "13px",
    maxWidth: "210px",
    width: "210px",
  },
});

export const SaveCancelIconbox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});
