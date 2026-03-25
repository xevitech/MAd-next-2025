import { Box, Button, Link, List, styled, Typography } from "@mui/material";

export const ProductList = styled(Box)({
  "@media (max-width: 1200px)": {
    height: "100%",
  },
  "@media (max-width: 900px)": {
    display: "flex",
    width: "100%",
    height: "108px",
    overflowY: "auto",
    paddingRight: "12px",
  },
  "& .MuiStack-root": {
    // paddingRight: '16px',
    // borderRight: '1px solid #DCDCDC',
    boxShadow: "rgba(33, 35, 38, 0.1) 11px 0px 10px -14px",
    minHeight: "230px",
    // padding: "20px 0 0 0",
    "@media (max-width: 1200px)": {
      minHeight: "auto",
      height: "100%",
      width: "100%",
    },
    "@media (max-width: 899px)": {
      padding: "0",
      borderRight: "0",
    },

    "& .MuiPaper-root": {
      boxShadow: "none",

      cursor: "pointer",
      position: "relative",
      transition: "all ease .3s",
      marginBottom: "1px",
      borderRadius: "0",
      whiteSpace: "nowrap",
      "& .MuiTypography-root": {
        fontSize: "14px",
        fontWeight: 600,
        "@media (max-width: 1600px)": {
          fontSize: "13px",
        },
      },
      "&:after": {
        content: '" "',
        width: "0",
        height: "0",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderLeft: "8px solid #e8e8e8",
        display: "inline-block",
        position: "absolute",
        left: "100%",
        top: "50%",
        transform: "translate(0px, -50%)",
        opacity: "0",
        transition: "background .2s ease-out",
        "@media (max-width:900px)": {
          display: "none",
        },
      },
      "&:hover": {
        backgroundColor: "#fff",
        transition: "background .2s ease-out",
        color: "#d7282f",
        // '&:after': {
        //     opacity: '1',
        // },
      },
      "&.active": {
        backgroundColor: "#fff",
        color: "#d7282f",
        fontWeight: 600,
        // '&:after':{
        //     opacity:'1',
        //     borderTop: '8px solid transparent',
        //     borderBottom: '8px solid transparent',
        //     borderLeft: '8px solid #d7282f',
        // },
        transition: "background .2s ease-out",
      },
    },
  },
});
export const SubListing = styled(Box)({
  padding: "3px",
  // borderRadius: '12px',
  // border: '1px solid transparent',
  // cursor: 'pointer',
  height: "100%",
  "&:hover": {
    // borderColor: '#FFBFC2',
  },
  "&.active": {
    // borderColor: '#FFBFC2',
  },
  "& img": {
    maxWidth: "40px",
    height: "auto",
    "@media (max-width: 1050px)": {
      maxWidth: "100%",
    },
    "@media (max-width: 900px)": {
      maxWidth: "38px",
    },
  },
  "& .MuiTypography-h6": {
    fontSize: "16px",
    color: "#D7282F",
    fontWeight: "600",
    "@media (min-width: 1200px) and (max-width: 1800px)": {
      padding: "0 0 0 10px",
    },
  },
  "& .MuiTypography-body2": {
    fontSize: "12px",
    color: "#4A4A4A",
    paddingRight: "0%",
    "@media (min-width: 1200px) and (max-width: 1800px)": {
      padding: "0 0 0 10px",
    },
  },
});
export const SubDescription = styled(Box)({
  padding: "0 1rem 0 0",
  "& .MuiTypography-h6": {
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    lineheight: "normal",
    "&:hover": {
      color: "#D7282F",
    },
    "@media (max-width: 1600px)": {
      fontSize: "13px",
    },
  },
  "& .MuiTypography-body2": {
    fontSize: "12px",
    // lineHeight: '20px',
    // color: '#4A4A4A',
    color: "#000",
    "@media (max-width: 1600px)": {
      fontSize: "11px",
    },
  },
});
export const ThumbImg = styled(Box)({
  borderRadius: "8px",
  overflow: "hidden",
  height: "105px",
  margin: "10px 0 5px",
  "& img": {
    height: "105px",
    objectFit: "cover",
    width: "100%",
  },
});

export const ProductDrawerCarousel = styled(Box)({
  "& .MuiButtonBase-root:hover": {
    opacity: "0.8 !important",
    background: "#000",
  },
});
export const OurProductList = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "& svg": {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.7)",
  },
});
export const ImageInfo = styled(Box)({
  display: "flex",
  gap: "10px",
});

export const OurProductMenuBoxOuter = styled(Box)({
  padding: "0 2rem 0 1rem",
});

export const OurProductMenuBox = styled(Box)({
  "& .MuiListItem-root": {
    display: "block",
  },
  "& .MuiTypography-h6": {
    color: "#000",
    fontSize: "15px",
    fontWeight: 600,
    "@media (max-width: 1600px)": {
      fontSize: "13px",
    },
  },
  "& .MuiTypography-body2": {
    fontSize: "13px",
    "@media (max-width: 1600px)": {
      fontSize: "12x",
    },
  },
  "& .MuiList-root": {
    paddingTop: 0,
    padding: "0 20px 0 10px",
  },
});
export const ProductSubList = styled(Box)({
  display: "grid",
  gap: "6px",
  padding: "4px 0 0",
  // height: "114px",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "3px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d2d2d2",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#6d6d6d",
  },
  "& .MuiTypography-body2": {
    // cursor: "pointer",
    color: "#616161",
    "&:hover": {
      // color: "#d7282f",
      // textDecoration: "underline",
    },
  },
});
export const LearnMore = styled(Link)({
  fontSize: "12px",
  color: "#d7282f",
  fontWeight: 400,
  textDecoration:"none",
  cursor: "pointer",
  "&:hover": {
    // textDecoration:"none",
  },
});
export const ProductCarouselImagContent = styled(Box)({});
export const ProductCarouselImag = styled(Box)({
  height: "120px",
  margin: "0 0 10px",
  "& img": {
    height: "100%",
    width: "100%",
    borderRadius: "3px",
  },
});
export const Lable = styled(Typography)({
  fontSize: "14px",
  color: "#d7282f",
  fontWeight: 600,
});
export const SubLable = styled(List)({
  fontSize: "13px",
  fontWeight: "400",
  paddingTop: "0px",
  maxHeight: "100px",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "0.2em",
    height: "0.2em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#dedede",
    borderRadius: "4px",
  },
  "& .MuiListItem-root": {
    paddingBottom: "0px",
    paddingLeft: "0px",
    cursor: "pointer",
  },
});
