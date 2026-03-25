/***** Chnaged file 15march *****/
import { Autocomplete, styled } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import { Box, Typography, Tab } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { TextField } from "@mui/material";
export const OuterContainer = styled("div")({
  "@media screen and (max-width: 768px)": {
    width: "95%",
    margin: "0 auto",
  },
});
import { Button } from "@mui/material";

export const CustomisedButton = styled(Button)({
  background: "rgba(215, 40, 47, 0.8)",
  color: "#FFFFFF",
  width: "190px",
  height: "35px",

  marginLeft: "10px",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "19px",
  borderRadius: "6px",
  textTransform: "none",
  "&:hover": {
    background: "rgba(40, 40, 43,01)",
  },
});

export const PreHeaderText = styled("div")({
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: "30px",
  lineHeight: "41px",
  marginBottom: "30px",
  display: "flex",
  paddingLeft: "40px",
  color: "#231F20",
  marginTop: "64px",
  marginLeft: "-37px",
});
export const InnerContainer = styled("div")({
  borderRadius: "6px",
  // minHeight: "100vh",
});
export const Header = styled("div")({
  justifyContent: "space-between",
  flex: 1,
  background: "#FFFFFF",
  boxShadow: "0px 4px 20px rgb(170 180 190 / 30%)",
  borderRadius: "6px",
  marginBottom: "20px",
  minHeight: "129px",
});
export const HeaderLeftContent = styled("div")({
  flex: 0.5,
  display: "flex",
  gap: "20px",
  position: "relative",
  margin: "16px",
  borderRight: "1px solid #D9D9D9",
});
export const HeaderRightContent = styled("div")({
  flex: 0.5,
  justifyContent: "flex-end",
});

export const FloatingIcon = styled("div")({
  height: "13px",
  width: "13px",
  position: "relative",
});
export const ContentContainer: any = styled("div")(({ breakPoints }: any) => ({
  display: "flex",
  gap: "20px",
  flexDirection: breakPoints?.max1024px ? "column" : "row",
}));

export const ContentLeftContainer = styled("div")({
  flex: 0.6,
  paddingTop: "0px",
});

export const ContentRightContainer = styled("div")({
  flex: 0.5,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  paddingTop: "0px",
  borderRadius: "6px",
});

export const LogoContainer = styled("div")({
  width: "fit-content",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const Logo = styled("img")({
  width: "73px",
  height: "73px",
  borderRadius: "50%",
});

export const FloatingUpdateIconContainer = styled("div")({
  position: "absolute",

  bottom: "10px",
  right: "-5px",
  width: "25px",
  height: "24px",

  background: "rgba(204, 64, 78, 0.8)",
  zIndex: 1,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});
export const CompanyNameContainer = styled("div")({
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "32px",
  display: "flex",
  color: "#231F20",
  paddingRight: "10px",
  paddingTop: "16px",
  position: "relative",
});
export const Card: any = styled("div")(({ breakPoints }: any) => ({
  borderRadius: "6px",
}));

export const CardHeader: any = styled("div")(({ breakPoint }: any) => ({
  display: breakPoint?.max600px ? "block" : "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));
export const CardHeaderText: any = styled("div")(({ breakPoint }: any) => ({
  color: "#231F20",
  fontFamily: "open sans",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "20px",
  alignItems: "center",
  display: breakPoint?.max600px ? "block" : "flex",
  justifyContent: "space-between",
  padding: "0px 12px 0 12px !important",
  position: "relative",
  "@media screen and (max-width: 768px)": {
    fontSize: "16px",
    display: "flex",
    padding: "1rem",
  },
  "@media screen and (max-width: 480px)": {
    display: "block",
    margin: "12px 0 0",
  },
}));

export const CardHeaderText2 = styled("span")({
  color: "#231F20",
  fontFamily: "open sans",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "20px",
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
  margin: "0 0 1.5rem",
});

export const CardContent = styled("div")({});

export const CardContenLightText = styled("span")({
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  color: "#2F2F2F",
  marginTop: "5px",
  opacity: 0.8,
  position: "relative",
});

export const ContentInnerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  padding: "15px",
});

export const ContainerHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
  margin: "10px",
  marginBottom: "0px",
  paddingBottom: "10px",
});

export const ContainerHeaderText = styled("span")({
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "22px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  fontFamily: "open sans",
});

export const ContainerHeaderDescription = styled("span")({
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  color: "#223354",
  fontFamily: "open sans",
  opacity: 0.5,
});

export const FloatingEditIcon = styled("span")({
  position: "absolute",
  right: "5px",
  top: "-10px",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",

  color: "#D7282F",
});

export const PencilIcon = styled("div")({
  marginRight: "5px",
  width: "10px",
  height: "10px",
  position: "relative",
});
export const FieldContainer: any = styled("div")(({ flexDirection }: any) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "7px",
  borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
  minHeight: "45px",
  alignItems: "center",
  gap: flexDirection?.flexStart ? "20px" : "",
}));

export const FieldLabel = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "138.9%",

  display: "flex",
  alignItems: "center",

  color: "rgba(34, 51, 84, 0.5)",
});

export const AddressContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const AddressLeftContainer = styled("div")({
  display: "flex",
  gap: "10px",
});
export const AddressRightContainer = styled("div")({
  color: "#D7282F",
});

export const AddressIconContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const AddressValueContainer = styled("div")({
  width: "80%",
  textAlign: "start",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "20px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
});

export const FieldValue = styled("div")({
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "24px",

  display: "flex",
  alignItems: "center",
  textAlign: "right",
  letterSpacing: "0.09px",

  color: "#231F20",
});
export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },

  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export const FloatingEditIconCompanyName = styled("div")({
  position: "absolute",
  right: "-50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: "24px",
});

export const PencilIconCompanyName = styled("div")({
  marginRight: "5px",
  width: "10px",
  height: "10px",
  position: "relative",
  display: "flex",
  gap: "10px",
});

export const AllApprovedCat = styled("div")({
  boxShadow: "0px 4px 20px rgb(170 180 190 / 30%)",
  borderRadius: "6px",
  padding: "1rem 1rem 1.2rem",
});

export const InputSearch: any = styled("input")(({ breakPoint }: any) => ({
  width: breakPoint?.max600px ? "200px" : "300px",
  border: "1px solid #2233541a",
  borderRadius: "4px",
  color: "#7B7979",
  padding: "8px",
  fontSize: "13px",
  fontFamily: "Open Sans",
  margin: breakPoint?.max600px ? "8px 0" : "8px 0",
  outline: "none",
  "&:hover": { borderColor: "#bebebe" },
}));

export const ApprovedHeading = styled("div")({
  textAlign: "center",
  color: "#7B7979",
  fontSize: "13px",
  padding: "1rem 0 3rem",
  lineHeight: "21px",
});

export const ApprovedIcons = styled("span")({
  margin: "0 0 0 8px",
});

export const RightHeading: any = styled("div")(({ breakPoint }: any) => ({
  position: breakPoint?.max600px ? "unset" : "absolute",
  height: breakPoint?.max600px ? "auto" : "213px",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "13px",
  lineHeight: "18px",
  display: "inline-grid",
  alignItems: "center",
  textAlign: "center",
  color: "#7B7979",
  margin: breakPoint?.max1440px
    ? "60px 120px"
    : breakPoint?.max600px
    ? "10px"
    : "60px 120px",
  width: "46%",
  "@media screen and (max-width:1300px)": {
    margin: "60px 15px",
  },

  "@media screen and (max-width:900px)": {
    position: "unset",
    margin: "25px 0",
    width: "100%",
    height: "auto",
  },
}));

export const ApprovedCategoryUL = styled("ul")({
  listStyle: "none",
  height: "250px",
  overflowY: "scroll",
  margin: "8px 0 0 0",
  padding: "0",
});

export const ApprovedCategoryLI = styled("li")({
  color: "#231F20",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "400",
  position: "relative",
  width: "100%",
  clear: "both",
  wordWrap: "break-word",
  whiteSpace: "normal",
  fontFamily: "Open Sans",
});

export const InputField = styled(TextField)({
  width: "96%",
  margin: "2% 0 2% 2%",
  borderRadius: "6px",
});

/** Make style mui classes  **/
export const useStyles: any = makeStyles()((theme) => {
  return {
    customTextField: {
      "& input::placeholder": {
        fontSize: "13px",
      },
      width: "100%",
      margin: "9px auto 0",
      borderRadius: "6px",
    },
    buttonGroup: {
      display: "flex",
      gap: "16px !important",
      marginTop: "16px !important",
      marginBottom: "16px",
      flexWrap: "wrap",
    },
  };
});

export const CategoryHeaderButton = styled("div")({
  width: "25px",
  height: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  color: "#7B7979",
  fontSize: "23px",
  lineHeight: "25px",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    "&:hover": {
      color: "#D7282F",
    },
  },
});

export const MainGrid = styled(Grid)({
  width: "1028px",
});

export const SubGrid = styled(Grid)({
  borderBottom: "1px solid #ABABABB2",
  fontFamily: "Open Sans",
  lineHeight: "30px",
  fontWeight: "600",
  fontSize: "13px",
});

export const GridSpan = styled("span")({
  borderLeft: "1px solid #ccc",
  paddingLeft: "5px",
});

export const DropDownGrid = styled("span")({
  border: "1px solid #ccc",
  fontFamily: "Open Sans",
  lineHeight: "30px",
  fontWeight: "600",
  fontSize: "14px",
  margin: "30px 0px 0px 12px",
  borderRadius: "6px",
  width: "32%",
  background: "#F8F8F8",
  paddingLeft: "10px",
  height: "40px",
  paddingTop: "5px",
});

export const CategoryGrid = styled("span")({
  fontFamily: "Open Sans",
  lineHeight: "30px",
  fontSize: "14px",
  margin: "30px 0px 0px 22px",
  borderRadius: "6px",
  width: "31%",
});

/******** New components for seller category style ********/

export const SellercategoryBg = styled("div")({});

export const SellerCatgoryThName = styled("span")({
  fontWeight: "600",
  fontFamily: "Open Sans",
  color: "#1A2027",
  fontSize: "14px",
});

export const SellerCatgoryValue = styled("span")({
  display: "inline-block",
  fontSize: "13px",
  color: "#3e5060",
  fontFamily: "Open Sans",
  textTransform: "capitalize",
  "@media screen and (max-width: 768px)": {
    fontSize: "13px",
  },
});
export const SellerCatgoryStatusBox = styled(Box)({
  padding: "5px 5px 5px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .Statusrejected": {
    backgroundColor: "rgb(255, 225, 226)",
    color: "#d7282f",
  },
  "& .Statusapproved": { backgroundColor: "#ECFBE6", color: "#3BB900" },
  "& .Statuspending": {
    backgroundColor: "rgb(231, 231, 231)",
    color: "rgb(58, 58, 58)",
  },
});
export const SellerCatgoryStatus = styled("span")({
  display: "flex",
  fontSize: "12px",
  fontFamily: "Open Sans",
  textTransform: "capitalize",
  padding: "3px 8px",
  borderRadius: "6px",
  alignItems: "center",
  "@media screen and (max-width: 768px)": {
    fontSize: "13px",
  },
});

export const SellerInnerspan = styled("div")({
  padding: "2px 8px",
  margin: "2px 0",
  transition: "all ease .5s",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    borderRadius: "5px",
  },
});

export const AddListingBtnContainer = styled("div")({
  width: "fit-content",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const EmptyDatagrid = styled("div")({
  display: "block",
  textAlign: "center",
  padding: "5rem 0 3rem",
});

/***************** New style component after Makestyle issue *************/
export const DeleteCategory = styled("div")({
  position: "absolute",
  left: "240px",
  border: "1px solid #fff",
  padding: "4px 5px",
  borderRadius: "3px",

  "&:hover": {
    border: "1px solid #e5e5e5",
  },
});

export const CategotyName = styled("span")({
  padding: "5px 8px",
});

export const OuterDiv = styled("div")({
  width: "30px",
  height: "30px",
  padding: "6px",
  background: "#f3f3f3",
  borderRadius: "50%",
});

export const DeleteText = styled("div")({
  fontSize: "15px",
  color: "#D7282F",
  fontWeight: 400,
  display: "flex",
  cursor: "pointer",
});
export const SpecificationDescription = styled(Typography)({
  fontSize: "12px",
  fontWeight: 400,
  color: "rgb(132, 132, 135)",
});

/***********============================= Start Nafish style for category new design ====================================********/
export const Mainbox = styled(Box)(() => ({
  padding: "10px 16px 16px 16px",
  color: "#FFFFFF",
  boxShadow: "0px 0px 9px 1px rgba(159, 162, 191, 0.32)",
  margin: "0px 0% 0px 0%",
  borderRadius: "16px",
  backgroundColor: "white",
  "@media screen and (max-width:320px)": {
    margin: "0px 8px",
  },
}));
export const Mytext = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: "600",
}));
export const SelectedCategories = styled(Box)(() => ({
  alignContent: "center",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
}));

export const DeletSelected = styled(Typography)(() => ({
  color: "#d7282f",
  borderLeft: "1px solid #D2D2D2",
  fontSize: "15px",
  paddingLeft: "10px",
}));

export const BoxText = styled(Box)(() => ({
  alignContent: "center",
  display: "flex",
}));
export const Texticon = styled(Box)(() => ({
  color: "#DD484E",
  marginTop: "6px",
  marginLeft: "6px",
}));
export const Categories = styled(Typography)(() => ({
  borderLeft: "1px solid #D2D2D2",
  fontSize: "14px",
  paddingLeft: "10px",
  color: "black",
}));

export const DeleteIcon = styled(DeleteOutlinedIcon)(() => ({
  fontSize: "17px",
  color: "#D7282F",
  justifyItems: "center",
  marginTop: "3px",
}));
export const Border = styled(Typography)(() => ({
  fontSize: "16px",
  color: "#231F20",
  borderBottom: "1px solid #D2D2D2",
  marginTop: "3px",
  paddingBottom: "10px",
  fontWeight: "600",
}));
export const Tabtext = styled(Tab)(() => ({
  color: "black",
  textTransform: "capitalize",
}));
export const Header1 = styled(Box)(() => ({
  padding: "16px, 0px, 10px, 0px",
}));
/***********============================= End Nafish style for category new design ====================================********/

export const CategoryInput = styled(Box)(() => ({
  padding: "0px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  "& .MuiAutocomplete-endAdornment": {
    "& .MuiAutocomplete-popupIndicator": {
      transition: "all ease .3s",
      margin: "0 -3px 0 0",
      "& .MuiSvgIcon-root": {
        color: "#DD484E",
      },
    },
  },
  "& fieldset": {
    borderRadius: "50px",
  },
}));
export const CategoryTable = styled(Box)(() => ({
  padding: "16px 0",
}));
export const CustomAutocomplate = styled(Autocomplete)(() => ({
  width: "240px",
  "@media (max-width:600px)": {
    width: "100%",
  },
}));

export const TableWishlist = styled(Box)(() => ({
  "& .MuiDataGrid-root": {
    border: "0",
    "& .MuiDataGrid-row": {
      "&:hover": {
        backgroundColor: "#FFEEEF",
      },
      "&.Mui-selected": {
        backgroundColor: "#FFEEEF",
      },
    },
    "& .MuiTablePagination-selectLabel": {
      display: "block !important",
    },
  },
}));
export const ParentCategoryBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  overflowX: "auto",
}));
export const SecondSkeletonBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  paddingLeft: "20px",
  gap: "10px",
  paddingBottom: "5px",
});
export const MainBox3 = styled(Box)({
  border: "1px solid #E0E3E7",
  height: "100%",
  borderRadius: "4px",
  padding: "16px 16px 16px 0px",
});
// category drawer
export const DrawerOuterBox = styled(Box)({
  padding: "12px 16px 0px 16px",
});
export const DrawerHeading = styled(Typography)({
  fontSize: "17px",
  fontWeight: "500",
  color: "#231f20",
});
export const DrawerLabel = styled(Typography)({
  fontSize: "14px",
  margin: "15px 0 5px",
  display: "block",
  color: "rgba(34, 51, 84, 0.5)",
  fontWeight: "400",
  "@media (max-width:768px)": {
    margin: "8px 0 5px",
  },
});
export const DrawerButtonBox = styled(Box)({});
