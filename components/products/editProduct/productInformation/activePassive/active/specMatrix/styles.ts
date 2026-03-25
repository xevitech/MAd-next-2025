import { Box, Button, styled } from "@mui/material";

export const MatrixItemContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flex: 1,
  padding: "8px",
  minHeight: "40px",
  paddingTop: "3px",
});
export const Id = styled("div")({
  display: "flex",
  justifyContent: "center",
  fontSize: "13px",
  fontWeight: "600",
  alignItems: "center",
});
export const ItemValue = styled("div")({
  flex: 0.5,
  display: "flex",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "24px",
  /* identical to box height, or 171% */
  justifyContent: "center",
  letterSpacing: "0.09px",

  color: "#000000",
  fontFamily: "open sans",
});
export const Price = styled("div")({
  display: "flex",
  flex: 0.2,
  justifyContent: "center",
  fontSize: "13px",
  fontWeight: "600",
});
export const Img = styled("div")({
  display: "flex",
  flex: 0.2,
  justifyContent: "center",
  fontSize: "13px",
  fontWeight: "600",
});
export const Actions = styled("div")({
  flex: 0.1,
  textAlign: "center",
  fontSize: "13px",
  fontWeight: "600",
});
export const ImageItem = styled("img")({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  marginRight: "4px",
});
export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #E1E1E1",
  borderRadius: "6px",
  marginTop: "16px",
});
export const Header = styled("div")({
  height: "auto",
  background: "#676474",
  borderRadius: "6px 6px 0px 0px",
  padding: "10px 16px",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  color: "#ffffff",
  fontFamily: "open sans",
});
export const MatrixTableHeader = styled(Box)({
  // backgroundColor: "#FFECEC !important",
  backgroundColor: "#F0F3F8 !important",
  color: "#231f20 !important",
  // justifyContent: "space-between",
  // display: "flex",
  padding: "10px 16px",
  "@media screen and (max-width:600px)": {
    display: "block",
  },
  "& .MuiFormLabel-root": {
    background: "#F0F3F8",
  },
  "& .MuiFormControl-root": {
    minWidth: "150px",
    maxWidth: "150px",
  },
});
export const MatrixContainer = styled(Box)({
  width: "100%",
  overflow: "auto",
  // overflowX: "auto !important",
  // overflowY: "hidden",
});
export const PaginationBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  padding: "16px 0",
});

export const MatrixScroll = styled(Box)({
  "@media (max-width: 1368px)": {
    width: "1000px",
    // width: "100%",
  },
});
export const MatrixTableHeaderInner = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
export const MatrixSelectFilter = styled(Box)({
  display: "flex",
  width: "100%",
  alignItems: "flex-start",
  margin: "20px 0 0px",
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: "500",
    color: "#000",
    padding: "6px 0 0",
    width: "120px",
  },

  "& .MuiOutlinedInput-input": {
    fontSize: "13px",
    padding: "5.8px 14px",
  },
});
export const FilterButtons = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "end",
  justifyContent: "end",
  margin: "20px 0 0px",
  "& button": {
    border: "1px solid #d7282f",
    borderRadius: "4px",
    fontSize: "13px",
    color: "#d7282f",
    textTransform: "capitalize",
    minWidth: "87px",
    maxWidth: "90px",
    "&:hover": {
      background: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
    },
  },
});
export const MatrixSelectFilterInn = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "center",
  flexWrap: "wrap",
  "& .MuiFormLabel-root": {
    fontSize: "13px",
  },
  "& .MuiSelect-select": {
    fontSize: "13px",
    padding: "6px 12px",
  },
});

export const SelectLable = styled(Box)({
  margin: "-2px 0 0 0",
});
export const SelectFilterBox = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
});
export const ToggleFilterBtn = styled(Button)({
  background: "#d7282f",
  color: "#fff",
  textTransform: "capitalize",
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "90px",
  height: "32px",
  "&:hover": {
    opacity: ".85",
    background: "#d7282f",
  },
  "& svg": {
    margin: "-7px",
    fontSize: "28px !important",
  },
  "& .MuiButton-icon": {
    margin: "-6px 0 0",
  },
});
export const SelectStatusDelete = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  "& span": {
    // margin: "6px 9px 0 -6px",
    "& svg": {
      color: "#d7282f",
      fontSize: "18px",
      cursor: "pointer",
      margin: "6px 9px 0 -6px",
    },
  },
  "& .MuiSelect-select": {
    fontSize: "13px",
    padding: "6px 12px",
  },
});
