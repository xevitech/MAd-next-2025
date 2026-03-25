import { styled } from "@mui/material";

export const ProductContentContainer = styled("div")({
  // padding: '16px',
  width: "100%",
  background: "#ffff",
  marginTop: "0px",
  // boxShadow:
  //   '0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)',
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  alignItems: "center",
  flexDirection: "column",
});

export const ProductSectionHeaderContainer = styled("div")({
  height: "35px",
  borderBottom: "1px solid #DDDDDD",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "25px",
  width: "100%",
  marginBottom: "8px",
});

export const ContentDescription = styled("div")({
  width: "100%",
});

export const ContentDescriptionHeader = styled("div")({
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  color: "#000000",
});

export const ContentDescriptionText = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "32px",
  /* identical to box height, or 200% */
  letterSpacing: "0.09px",
  color: "#414141",
});

export const TabsContainer = styled("div")({
  width: "100%",
});
export const ProductInfoTabStyle = {
  "& .MuiTab-root": {
    padding: "0px 16px 12px 16px",
    minHeight: "auto",
  },
  "& .MuiTabs-root": {
    minHeight: "auto !important",
  },
};
export const ProductDescriptionTabStyle = {
  "& .MuiTab-root": {
    padding: "0px 16px 0px 16px",
    minHeight: "auto",
    textTransform: "capitalize",
  },
  "& .MuiTab-root:first-of-type": {
    paddingLeft: "0px",
  },
  "& .MuiTabs-root": {
    minHeight: "auto !important",
  },
  
};
