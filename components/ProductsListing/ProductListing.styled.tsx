import { Box, Link, styled, Typography } from "@mui/material";
import { Stack, ButtonBase } from "@mui/material";
import theme from "styles/theme";

export const BPheader = styled(Stack)(() => ({
  fontFamily: "open sans",
  color: "rgba(35, 31, 32, 1)",
  "& h5": {
    display: "inline-block",
    "& span": {
      fontSize: "12px",
      fontWeight: "400",
      marginRight: "4px",
    },
    "& p": {
      fontSize: "14px",
      fontWeight: 600,
      display: "inline-block",
    },
  },
}));
export const BigPostOuterBox = styled(Link)(() => ({
  minHeight: "200px",
  maxHeight: "400px",
  width:'100%'
}));
export const BPMain = styled(Stack)(() => ({
  fontFamily: "open sans",
  color: "rgba(35, 31, 32, 1)",
  padding: "5px 8px 0",
  "& h4": {
    fontWeight: 600,
    fontSize: "18px",
    cursor: "pointer",
  },
  "& label": {
    fontWeight: 400,
    fontSize: "12px",
  },
  [theme.breakpoints.down("md")]: {
    "& h4": {
      fontSize: "15px",
    },
  },
}));

export const BPstockChip: any = styled(Typography)(({ theme, qty }: any) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "14px",

  "& svg": {
    width: "20px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
}));

export const BPstackLabel: any = styled(Typography)(({ theme }: any) => ({
  fontSize: "14px",
  color: "#000000",
  fontFamily: "open sans",
  "@media screen and (max-width: 800px)": {
    fontSize: 12,
  },
}));
export const BPstackText: any = styled(Typography)(({ theme }: any) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: "#231F20",
  fontFamily: "open sans",
  textTransform: "capitalize",
  "@media screen and (max-width: 800px)": {
    fontSize: 12,
  },
}));
export const PriceType = styled("div")(({ span }: any) => ({
  textTransform: "capitalize",
}));

export const ProductHeadePriceButton = styled(ButtonBase)(({ theme }: any) => ({
  justifyContent: "space-between",
  gap: "8px",
  borderRadius: "6px !important",
  backgroundColor: "rgba(215, 40, 47, .1)!important",
  color: "rgba(215, 40, 47, 1)!important",
  fontSize: "13px!important",
  fontWeight: 600,
  fontFamily: "Open sans!important",
  padding: "4px 10px !important",
  "& span": {
    color: "rgba(215, 40, 47, 1)!important",
    fontSize: "13px !important",
    fontWeight: 600,
    fontFamily: "Open sans !important",
    whiteSpace: "nowrap",
  },
  "& svg": {
    width: 14,
  },
}));
export const ProductHeadePriceButton2 = styled(ButtonBase)(
  ({ theme }: any) => ({
    border: "1px solid #231F20 !important",
    borderRadius: 4,
    background: "#fff",
    padding: "2px 10px !important",
    "@media screen and (max-width:1536px)": {
      padding: "2px 4px !important",
    },
    "@media screen and (max-width:900px)": {
      padding: "2px 2px !important",
    },
    "& span": {
      color: "#231F20",
      fontSize: "14px",
      fontFamily: "Open Sans",
      whiteSpace: "nowrap",
      "@media screen and (max-width:1536px)": {
        fontSize: "12px",
      },
      "@media screen and (max-width:900px)": {
        fontSize: "10px !important",
      },
      "@media screen and (max-width:1200px)": {
        fontSize: "10px !important",
      },
    },
    "&:hover": {
      background: "#515151",
      "& span": {
        color: "#fff",
      },
    },
  })
);
export const ProductHeadePriceButtonred = styled(ButtonBase)(
  ({ theme }: any) => ({
    border: "1px solid #D7282F !important",
    borderRadius: 4,
    background: "#fff",
    padding: "3px 12px !important",
    "@media screen and (max-width:1536px)": {
      padding: "2px 4px !important",
    },
    "@media screen and (max-width:900px)": {
      padding: "2px 2px !important",
    },
    "& span": {
      color: "#D7282F",
      fontSize: "13px",
      fontWeight: 600,
      fontFamily: "Open Sans",
      whiteSpace: "nowrap",
      "@media screen and (max-width:1536px)": {
        fontSize: "12px",
        gap: "4px",
      },
      "@media screen and (max-width:900px)": {
        fontSize: "10px",
      },
      "@media screen and (max-width:1200px)": {
        fontSize: "10px !important",
      },
    },
    "&:hover": {
      background: "#D7282F",
      "& span": {
        color: "#fff",
      },
    },
  })
);

export const Descriptionpost = styled("p")(({ theme }: any) => ({
  fontSize: "13px",
  fontWeight: 400,
  color: "#231f20",
  fontFamily: "open sans",
  padding: "0 0 18px 0",
  lineHeight: "22px",
}));

export const TMyProductName = styled(Typography)({
  margin: 0,
  fontSize: "16px",
  fontWeight: "600",
  padding: 0,
  color: "#231f20",
  display: "inline-block",
  textTransform: "capitalize",
  "&:hover": {
    color: "#d7282f",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "13px",
  },
});
export const TMyProductPretitle = styled(Typography)({
  fontSize: "14px",
  fontWeight: "500",
  color: "#d7282f",
});
export const CompanyName = styled(Box)({
  fontSize: "12px",
  color: "#4a4a4a",
  fontWeight: 400,
  margin: "4px 0 8px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "inline-flex",
  cursor: "pointer",
  gap: "6px",
  "& svg": { color: "#4a4a4a", fontSize: "15px" },
  "& span": { display: "flex", alignItems: "end" },
  "&:hover": {
    color: "#d7282f",
    "& svg": { color: "#d7282f" },
  },
});
export const CompanyNameListView = styled(Box)({
  fontSize: "12px",
  color: "#4a4a4a",
  fontWeight: 400,
  overflow: "hidden",
  textOverflow: "ellipsis",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "inline-flex",
  alignItems: "end",
  cursor: "pointer",
  gap: "4px",
  "& svg": { color: "#4a4a4a", fontSize: "15px" },
  "&:hover": {
    color: "#d7282f",
    "& svg": { color: "#d7282f" },
  },
});
