import { Box, ButtonBase, Tabs,styled } from "@mui/material";
export const AccountHeaderText: any = styled("div")(({ breakPoints }: any) => ({
  fontWeight: breakPoints?.max600px ? "600" : "700",
  lineHeight: breakPoints?.max600px ? "41px" : "36px",
  margin: breakPoints?.max600px
    ? "5rem auto 1rem"
    : breakPoints?.max768px
    ? "5rem 0 1rem"
    : "6rem 0 2rem",
  fontSize: breakPoints?.max768px
    ? "18px"
    : breakPoints?.max1024px
    ? "25px"
    : "30px",
  backgroundColor: breakPoints?.max600px ? "#FFE9EA" : "transparent",
  textAlign: breakPoints?.max600px ? "center" : "left",
  borderRadius: "3px",
  width: breakPoints?.max600px ? "253px" : "auto",
  position: breakPoints?.max600px ? "relative" : "static",
  top: breakPoints?.max600px ? "-13px" : "0px",
}));

export const OuterContainer = styled("div")({});

export const InnerContainer = styled("div")({
  background: "white",
  borderRadius: "6px",
  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.075)",
  "@media screen and (max-width: 767px)": {
    paddingBottom: "20px",
    marginBottom: "30px",
  },
});

export const AccountBox = styled(Box)({
  borderBottom: "1px solid #0000001f",
  margin: "0 20px",
});

export const VTabs = styled(Tabs)({
  border: "2px solid #F6F8FB",
  margin: "8px 20px 8px 0",
  borderRadius: "6px",
  "& .MuiTabs-indicator": {
    background: "#D7282F",
  },

});

export const SaveButton = styled(ButtonBase)({
  float: "right",
  border: "1px solid #d7282f",
  borderRadius: "6px",
  padding: "6px 12px",
  color: "#d7282f",
  transition: "all ease 0.3s",
  "&:hover": {
    backgroundColor: "#d7282f",
    color: "#fff",
    border: "1px solid #d7282f",
    transition: "all ease 0.3s",
  },
});
