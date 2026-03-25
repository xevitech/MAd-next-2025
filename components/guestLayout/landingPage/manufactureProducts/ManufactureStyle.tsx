import { Box } from "@/components/dashboard/style";
import { Button, Stack, styled, Typography } from "@mui/material";

export const ManufactureFlexBox = styled(Box)({
  height: "100%",
  padding: "0px",
  background: "#fff",
  borderRadius: "10px",
});
export const ManufactureCompanyName = styled(Stack)({
  padding: "0px",
  gap: "8px",
  alignItems: "center",
});
export const ManufactureCompanyImageBox = styled(Box)({
  width: "180px",
  height: "71px",
  border: "1px solid #DDDDDD",
  "& img": { width: "100%", objectFit: "contain" },
});
export const ManufactureName = styled(Typography)({
  fontSize: "20px",
  color: "#231F20",
  fontWeight: "600",
  textAlign: "center",
  "@media screen and (max-width:1600px)": {
    fontSize: "16px",
  },
});
export const ManufactureOriginDate = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "4px 0",
  "@media screen and (max-width:900px)": {
    flexDirection: "column",
    alignItems: "start",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#4A4A4A",
  },
  "& .MuiTypography-body2":{
    fontSize: "12px",
  }
});
export const ManufactureUserStatus = styled(Box)({
  fontSize: "11px",
  padding: "3px 5px",
  borderRadius: "6px",
  background: "#D4F5CF",
  color: "#3E8C32",
});
export const ManufactureBusinessType = styled(Typography)({
  fontSize: "12px",
  color: "#4A4A4A",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  "& span": {
    fontWeight: 600,
  },
  "& .businesstype": {
    "@media screen and (max-width:767px)": { fontSize: "13px" },
  },
});
export const VisitStoreBTN = styled(Button)({
  border: "1px solid #d7282f",
  color: "#d7282f",
  fontSize: "14px",
  fontWeight: "600",
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#d7282f",
    color: "#fff",
  },
});
export const FilterBox = styled(Box)({
  background: "#fff",
  padding: "8px",
  borderRadius: "4px",
});
export const BusinessImage = styled("img")({
  height: "20px",
  width: "30px",
});
export const Spacing = styled(Box)({
  padding: "32px 0 0 0",
  "@media screen and (max-width:1200px)": {
    padding: "16px 0 0 0",
  },
  "@media screen and (max-width:900px)": {
    padding: "24px 0 0 0",
  },
});
export const FilterHeading = styled(Typography)({
  fontSize: "15px",
  fontWeight: "600 !important",
  color: "#231f20",
});
export const ManufactureProductBox = styled(Box)({ padding: "0px" });
export const ManufactureContactSupplierBTN = styled(Button)({
  fontSize: "14px",
  fontWeight: "500",
  color: "#d7282f",
  border: "1px solid #d7282f",
  borderRadius: "4px",
  textTransform: "capitalize",
  padding: "4px 12px",
  height: "34.5px",
  "&:hover": { color: "#fff", backgroundColor: "#d7282f" },
  "@media screen and (max-width:767px)": { fontSize: "13px" },
});
export const ManufactureChatBTN = styled(Button)({
  fontSize: "14px",
  fontWeight: "500",
  color: "#d7282f",
  border: "1px solid #d7282f",
  borderRadius: "4px",
  textTransform: "capitalize",
  padding: "4px 12px",
  height: "34.5px",
  "&:hover": { color: "#fff", backgroundColor: "#d7282f" },
  "@media screen and (max-width:767px)": { fontSize: "13px" },
});
export const ManufactureWishlist = styled(Box)({
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
  "@media screen and (max-width:767px)": {
    height: "26px",
    width: "26px",
    svg: {
      fontSize: "16px",
    },
  },
});
export const ManufactureSellerImgBox = styled(Box)({
  height: "80px",
  width: "100%",
  border: "1px solid #dddd",
  borderRadius: "6px",
  padding: "2px",
  maxHeight: "80px",
  img: {
    height: "100%",
    width: "100%",
  },
});
export const ManufactureFlexSpacebetween = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0",
  "@media screen and (max-width:1600px)": {
    flexDirection: "column",
    alignItems: "start",
  },
});
export const SinceandBusinesstype = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "@media screen and (max-width:900px)": {
    flexDirection: "column",
    alignItems: "start",
  },
});
export const ManufactureFlex1 = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "0",
});
export const ManufactureSellerName = styled(Typography)({
  fontSize: "20px",
  fontWeight: "600",
  color: "#d7282f",
  padding: "0",
  textTransform: "capitalize",
  "@media screen and (max-width:767px)": { fontSize: "16px" },
});
export const ManufactureDivider = styled(Box)({
  width: "1px",
  height: "22px",
  background: "#c9c9c9",
  padding: "0",
});
export const ManufactureCountry = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  color: "#3E3E3E",
});

/*****============ Contact Sellers Popup form Styling ==================*****/
export const ManufacturerAttachmntArea = styled(Box)({
  padding: 0,
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

export const ManufacturerButtonRequest = styled(Button)({
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

export const ManuFacturerSupplierTo = styled(Box)({
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
export const ManuFacturerSellerName = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: 0,
});
export const FilterBTN = styled(Button)({
  fontSize: "14px",
  padding: "5px 15px",
  color: "#fff",
  backgroundColor: "#d7282f",
  transition: "all ease .3s",
  border: "1px solid #d7282f",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#d7282f",
    transition: "all ease .3s",
    border: "1px solid #d7282f",
  },
});
export const ManuFacturerFlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0px",
  "@media screen and (max-width:767px)": {
    flexDirection: "column",
    alignItems: "start",
    gap: "20px",
  },
});
export const ManuFacturerBTNBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  padding: "0px",
});
export const ManuFacturerimageNtextBox = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: "16px",
  flexWrap: "wrap",
  padding: "0px",
});
export const ManuFacturerimageBox = styled(Box)({
  height: "75px",
  width: "75px",
  maxWidth: "75px",
  border: "1px solid #ddd",
  padding: "0px",
  background: "#e2e2e2",
  "& img": {
    height: "100%",
    width: "100%",
  },
});
export const ManuFacturerDetails = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: "8px",
  flexDirection: "column",
  padding: "0px",
});
export const ManuFacturerNameverifiedcountryBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  padding: "0px",
});
export const ManuFacturerPlanNall = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  padding: 0,
});
export const ChipOuter = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  flexWrap: "wrap",
  width: "100%",
  padding: "0px",
});
export const ChipSpan = styled("span")({
  fontSize: "13px",
  fontWeight: "bold",
});
