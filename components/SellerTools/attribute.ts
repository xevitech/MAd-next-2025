import { styled } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
export const OuterContainer = styled("div")({
});

export const PreHeaderText: any = styled("div")(({ breakPoints }: any) => ({
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: breakPoints?.max980px ? "20px" : "30px",
  lineHeight: "41px",
  marginBottom: breakPoints?.max980px ? "10px" : "30px",
  display: "flex",
  paddingLeft: "40px",
  color: "#231F20",
  marginTop: "64px",
  marginLeft: "-37px",
}));
export const InnerContainer: any = styled("div")(({ breakPoints }: any) => ({
  borderRadius: "6px",
  minHeight: "100vh",
}));

export const Header = styled("div")({
  justifyContent: "space-between",
  flex: 1,
  background: "#FFFFFF",

  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  marginBottom: "20px",
  Height: "129px",
  paddingBottom: "60px",

  "@media screen and (max-width: 768px)": {
    width: "100%",
    margin: "0 auto",
  },
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
  height: "fit-content",
  minHeight: "300px",
  padding: "8px 15px",
  flex: breakPoints?.max1024px ? 0.6 : breakPoints?.max1200px ? 0.4 : 0.3,
  Width: "360px",
}));

export const CardInn: any = styled("div")(({ breakPoints }: any) => ({
  display: breakPoints?.max768px ? "none" : "block",
  width: "100%",
  margin: "0 8px",
}));

export const CardHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
});
export const CardHeaderText = styled("span")({
  color: "#231F20",
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "20px",
  alignItems: "center",
});

export const CardContent = styled("div")({
  display: "flex",
  flexDirection: "column",
});

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

export const SearchORCreate = styled("div")({
  border: "1px solid #ccc",
  height: "300px",
  borderRadius: "5px",
  padding:" 10px"
});

export const InputSearch = styled("input")({
  float: "right",
  height: "31px",
  width: "20%",
  border: "1px solid #22335480",
  borderRadius: "6px",
  padding: "5px",
});

export const ApprovedHeading = styled("div")({
  textAlign: "center",
  color: "#7B7979",
  fontSize: "14px",
  padding: "1rem 0 3rem",
});

export const ApprovedIcons = styled("span")({
  float: "right",
  marginRight: "72%",
});

export const RightHeading = styled("div")({
  position: "absolute",
  width: "565px",
  height: "152px",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "13px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  color: "#7B7979",
  margin: "60px",
});

export const ApprovedCategoryUL = styled("ul")({
  listStyle: "none",
  overflowX: "hidden",
  height: "225px",
  padding: "0",
});

export const ApprovedCategoryLI = styled("li")({
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "400",
  position: "relative",
  width: "96%",
  clear: "both",
  wordWrap: "break-word",
  whiteSpace: "normal",
  fontFamily: "Open Sans",
  float: "left",
  padding: "8px 6px",
  margin: "2px 10px",
  color: "#7B7979",
  borderRadius: "none",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    borderRadius: "5px",
  },
});
export const InputField = styled(TextField)({
  width: "96%",
  margin: "2% 0 2% 2%",
  borderRadius: "6px",
  "&:hover": {
    border: "1px solid #22335480",
    borderRadius: "6px",
  },
});

export const useStyles: any = makeStyles()((theme) => {
  return {
    customTextField: {
      "& input::placeholder": {
        fontSize: "13px",
      },
      width: "96%",
      margin: "2% 0 2% 2%",
      borderRadius: "6px",
      "&:hover": {
        border: "1px solid #22335480",
        borderRadius: "6px",
      },
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
  display: "grid",
  alignSelf: "center",
  "&:hover": {
    color: "#D7282F",
  },
  position: "absolute",
      right: "10px",
});

export const MainGrid = styled(Grid)({
  width: "100%",
});

export const SubGrid = styled(Grid)({
  fontWeight: "600",
  fontSize: "13px",
  color: "#231F20",
  padding: "12px 0",
});

export const GridSpan = styled("span")({
  borderLeft: "2px solid #ccc",
  paddingLeft: "5px",
});

export const DropDownGrid = styled("div")({
  fontFamily: "Open Sans",
  lineHeight: "30px",
  fontWeight: "600",
  fontSize: "16px",
  margin: "10px 0px 0px 0",
  borderRadius: "6px",
  width: "100%",
  paddingLeft: "10px",
  height: "45px",
  paddingTop: "5px",
  "@media screen and (max-width:768px)":{
    margin:'0px'
  }
});

export const CategoryGrid = styled("span")({
  fontFamily: "Open Sans",
  fontSize: "14px",
  borderRadius: "6px",
  width: "31%",
});

export const SellerInnerspan = styled("div")({
  display: "grid",
  alignSelf: "center",
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
  padding: "2rem 0 5rem",
});
