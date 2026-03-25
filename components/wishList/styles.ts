import {
  Box,
  Button,
  Paper,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TextOverFlow } from "../common/CustomHooks/TextOverFlow";

export const WishLishCard = styled("div")({});

export const WishlistHeader = styled("div")({
  background: "#fff",
});

export const PriceTypeButton = styled(Box)({
  fontSize: "12px",
  borderRadius: "6px",
  boxShadow: "none",
  textTransform: "capitalize",
  padding: "3px 8px",
  fontWeight: "400",
});
export const AvalibilityButton = styled(Box)({
  fontSize: "12px",
  borderRadius: "6px",
  boxShadow: "none",
  textTransform: "capitalize",
  padding: "3px 8px",
  fontWeight: "400",
});

//**********               Wishlist for Buyer             ***************** */
export const OuterBox = styled(Box)({
  background: "#fff",
  padding: "16px",
  borderRadius: "10px",
  "@media screen and (max-width:600px)": { padding: "0px" },
});
export const FlexBoxSpaceBetween = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid #ddd",
  "& .Listpopper": {
    "@media screen and (max-width:480px)": {
      display: "none",
    },
  },
});
export const CreateListBox = styled(Box)({
  display: "none",
  alignItems: "center",
  justifyContent: "flex-end",
  margin: "10px 0 0 0",
  "@media screen and (max-width:480px)": {
    display: "flex",
  },
});

export const CreateListBTN = styled(Button)({
  background: "#fff",
  color: "#d7282f",
  border: "1px solid #d7282f",
  fontSize: "14px",
  fontWeight: "500",
  padding: "4px 16px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#d7292f",
    color: "#fff",
  },
});
export const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "30px",
  "@media screen and (max-width:480px)": {
    flexDirection: "column",
    alignItems: "start",
    gap: "10px",
  },
});
export const ListName = styled(Typography)({
  fontSize: "14px",
  fontWeight: "600",
  color: "#231f20",
});
export const BTNBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  margin: "12px 0 0 0",
  "@media screen and (max-width:480px)": {
    justifyContent: "start",
  },
});
export const CancelBTN = styled(Button)({
  backgroundColor: "#fff",
  color: "#231f20",
  border: "1px solid #989898",
  fontSize: "14px",
  fontWeight: "500",
  padding: "2px 12px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#231f20",
    color: "#fff",
    border: "1px solid #231f20",
  },
});
export const SaveBTN = styled(Button)({
  backgroundColor: "#d7282f",
  color: "#fff",
  border: "1px solid #d7282f",
  fontSize: "14px",
  fontWeight: "500",
  padding: "2px 12px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#d7282f",
  },
});
export const PopperPaper = styled(Paper)({
  padding: "16px",
  backgroundColor: "#FFFDFD",
  boxShadow: "0px 4px 4px 0px #00000040",
});
export const TabStyle = styled(Tab)({
  textTransform: "capitalize",
  "&.Mui-selected": {
    color: "#d7282f",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#d7282f",
  },
  minHeight: "auto",
});
export const TabsStyle = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#d7282f",
  },
  minHeight: "49px",
});
export const SidebarBox = styled(Box)({
  boxShadow: "0px 0px 4px 0px #00000033",
  padding: "8px",
  width: "100%",
});
export const VerticalTabs = styled(Tabs)({
  alignItems: "start",
  width: "100%",
  "& .MuiTabs-scroller": {
    width: "100%",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiButtonBase-root": {
    padding: "0 2px 0 7px",
  },
  "& .tabName": {
    "& svg": {
      margin: "0 0 -4px",
      fontSize: "20px",
    },
  },
});
export const VerticalTab = styled(Tab)({
  textTransform: "none",
  padding: "6px 10px",
  minHeight: "31px",
  alignItems: "center",
  margin: "0 0 6px 0",
  justifyContent: "center",
  "@media screen and (max-width:900px)": { maxWidth: "100%" },
  "&.Mui-selected": {
    backgroundColor: "#F1F1F1",
    color: "#231f20",
    borderRadius: "6px",
    padding: "6px 2px 6px 6px !important",
  },
  "&:hover": {
    backgroundColor: "#F1F1F1",
    color: "#231f20",
    borderRadius: "6px",
  },
  "& .tabName": {
    fontSize: "14px",
    color: "#231f20",
    alignItems: "center",
    gap: "4px",
    width: "135px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    display: "block",
    // display:'flex',
    textAlign: "start",
    "@media screen and (min-width:1280px) and (max-width:1536px)": {
      width: "105px",
    },
  },
  "& .MuiTab-iconWrapper": {
    fontSize: "24px",
    margin: "0",
  },
});
export const VerticalTabContentBox = styled(Box)({});
export const DeleteSelectedBTN = styled(Button)({
  background: "#fff",
  color: "#d7282f",
  border: "1px solid #d7282f",
  fontSize: "14px",
  fontWeight: "500",
  padding: "4px 16px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#d7292f",
    color: "#fff",
  },
});
export const MoveToBTN = styled(Button)({
  background: "#fff",
  color: "#d7282f",
  border: "1px solid #d7282f",
  fontSize: "14px",
  fontWeight: "500",
  padding: "4px 16px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#d7292f",
    color: "#fff",
  },
});
export const MoveToList = styled("ul")({
  listStyleType: "none",
  width: "272px",
  "@media screen and (max-width:767px)": {
    width: "auto",
  },
});
export const MoveToListText = styled("li")({
  borderBottom: "1px solid #ddd",
  borderRadius: "6px",
  padding: "8px 18px 8px 4px",
  "&:not(:first-child)": {
    "&:hover": {
      backgroundColor: "#F1F1F1",
      borderRadius: "6px",
      cursor: "pointer",
    },
  },
  "& .MuiTypography-root": {
    fontSize: "13px",
    fontWeight: "600",
    color: "#231f20",
    "&:hover": { color: "#d7282f" },
  },
});
export const CreateNewList = styled(Button)({
  fontSize: "14px",
  fontWeight: "500",
  color: "#d7282f",
  background: "#fff",
  border: "0",
  textTransform: "capitalize",
  "&:hover": {
    background: "#fff",
  },
});

/*****============ Contact Sellers Popup form Styling ==================*****/
export const WishAttachmntArea = styled(Box)({
  "& .MuiButton-root": {
    textTransform: "capitalize",
    color: "#d7282f",
    fontSize: "13px",
    paddingTop: 0,
    paddingBottom: 0,
    "& i::before": {
      fontSize: "17px !important",
    },
    "&:hover": {
      background: "rgba(225, 40, 47, 0.04)",
    },
  },
});

export const ButtonRequest = styled(Button)({
  backgroundColor: "#fff",
  border: "1px solid #d7282f",
  color: "#d7282f",
  borderRadius: "3px",
  padding: "3px 11px",
  transition: "all ease .3s",
  textTransform: "capitalize",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#d7282f",
    border: "1px solid #d7282f",
  },
});

export const SupplierTo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "5px 20px",
  "& .MuiTypography-root": {
    color: "#231f20",
    fontSize: "14px",
    fontWeight: 700,
  },
  "& .MuiTypography-body2": {
    color: "#333",
    fontSize: "14px",
    fontWeight: 400,
  },
  "& .MuiAvatar-root": {
    width: "32px",
    height: "32px",
  },
});
export const SellerNameWithImage = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
});
// supplier wishlist
export const SupplierOuterBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  "@media screen and (max-width:800px)": {
    flexDirection: "column",
    gap: "12px",
    alignItems: "start",
  },
});
export const SupplierInnerBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "@media screen and (max-width:480px)": {
    flexDirection: "column",
    alignItems: "start",
  },
});
export const SupplierImageBox = styled(Box)({
  height: "80px",
  width: "100px",
  minWidth: "100px",
  border: "1px solid #dddd",
  borderRadius: "6px",
  padding: "2px",
  maxHeight: "80px",
  img: {
    height: "100%",
    width: "100%",
  },
});
export const SupplierOriginDateBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "4px 0",
  flexWrap: "wrap",
  "@media screen and (max-width:900px)": {
    // flexDirection: "column",
    alignItems: "start",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#4A4A4A",
  },
  "& .MuiTypography-body2": {
    fontSize: "12px",
  },
});
export const SupplierWishlistBox = styled(Box)({
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  border: "1px solid #ccc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2px",
  svg: {
    color: "#d7282f",
    cursor: "pointer",
  },
  "@media screen and (max-width:800px)": {
    position: "absolute",
    right: "16px",
    top: "0%",
  },
  "@media screen and (max-width:767px)": {
    height: "26px",
    width: "26px",
    svg: {
      fontSize: "16px",
    },
  },
});
