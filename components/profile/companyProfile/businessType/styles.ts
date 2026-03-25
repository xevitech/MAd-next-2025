import { Box, styled } from "@mui/material";

export const CheckBoxContainer: any = styled("div")(({ breakPoints }: any) => ({
  display: "flex",
  flexWrap: "wrap",
  fontFamily: "open sans",
  fontSize: "14px",
  "@media screen and (max-width: 1024px)": {
    paddingLeft: "0px",
  },
}));
export const SelectedBusinessBtn: any = styled("div")(
  ({ breakPoints }: any) => ({
    display: "flex",
    background: "#DD484E",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "14px",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    borderRadius: "6px",
    maxHeight: "35px",
    width: "fit-content",
    textAlign: "center",
    padding: breakPoints?.max1440px ? "10px 7px" : "15px 20px",
  })
);

export const SelectedBusinessBtnOutline: any = styled(Box)(
  ({ breakPoints }: any) => ({
    display: "flex",
    background: "transparent",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "12px",
    justifyContent: "center",
    alignItems: "center",
    color: "#231F20",
    borderRadius: "6px",
    maxHeight: "35px",
    minHeight: "26px",
    textAlign: "center",
    border: "1px solid #727272",
    padding: "4px 8px",
    "&:hover": {
      backgroundColor: "#f7f7f7",
    },
    "@media screen and (max-width: 1024px)": {
      padding: "7px",
    },
  })
);

export const BoxCheckBox = styled(Box)({
  margin: "0",
  display: "flex",
  alignItems: "center",
  "@media screen and (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
});
export const OtherField = styled(Box)({
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    "& .MuiInputBase-input": {
      padding: "0 10px",
      height: "30px",
      fontSize: "12px",
    },
  },
});
export const TypeListing = styled(Box)({
  display: "block",
  width: "100%",
  "& .MuiTypography-root": {
    fontSize: "12px",
    display: "flex",
    float: "left",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      fontSize: "14px",
      marginLeft: "4px",
      color: "#34A853",
    },
  },
});
export const CancelLink = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
    marginRight: "2px",
  },
  "&:hover": {
    opacity: ".7",
  },
});
export const SaveLink = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#231f20",
  cursor: "pointer",
  borderLeft: "1px solid #d2d2d2",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
    marginLeft: "10px",
    marginRight: "2px",
  },
  "&:hover": {
    opacity: ".7",
  },
});
export const SaveLinkModal = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#231f20",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
    marginLeft: "10px",
    marginRight: "2px",
  },
  "&:hover": {
    opacity: ".7",
  },
});
export const SaveBuyerLink = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#231f20",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
    marginLeft: "10px",
    marginRight: "2px",
  },
  "&:hover": {
    opacity: ".7",
  },
});
