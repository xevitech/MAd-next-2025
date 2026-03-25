import { styled } from "@mui/material/styles";
import { ButtonBase, Dialog } from "@mui/material";
import { Box } from "@mui/material";

/*************************************Image Modal******************************************/
export const ArrowContainer: any = styled("div")(({ position }: any) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  cursor: "pointer",
  "&.c-arrow": {
    opacity: ".6",
    transition: "all ease .3s",
    "&:hover": {
      opacity: "1",
    },
    "@media (max-width: 767px)": {
      "& img": {
        width: "25px",
      },
    },
  },
  "@media (max-width: 767px)": {
    height: "20px",
    width: "20px",
  },
}));

export const LeftImageContainer = styled("div")({
  display: "flex",
  height: "fit-content",
  maxHeight: "500px",
  flexDirection: "column",
  gap: 5,
  overflow: "auto",
  "&::-webkit-scrollbar": { width: "1px" },
  /* Track */ "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
  /* Handle */ " & ::-webkit-scrollbar-thumb": { background: "#888" },
  /* Handle on hover */ " &::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

export const RightImageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
});
export const ModalHeaderContainer = styled("div")({
  display: "flex",
  padding: "8px",
  "@media (max-width: 767px)": {
    padding: "0",
  },
  justifyContent: "space-between",
  alignItems: "center",
  "& .imagmodal": {
    "& .MuiTabs-flexContainer": {
      " & .MuiButtonBase-root": {
        color: "#d7282f",
        padding: "0 6px",
      },
    },
    "& .MuiTabs-indicator": {
      background: "#d7282f",
    },
  },
});
export const ModalImageContainer = styled("div")({
  display: "flex",
  padding: "16px 16px 28px",
  flex: 1,
  gap: 20,
});
export const CrossIconContainer = styled("div")({
  position: "absolute",
  right: "2%",
});
export const ModalHeader = styled("div")({
  background: "#FFFFFF",
  position: "relative",
});
/******************************Web Carousal***********************************/

export const CarousalSliderContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "60px",
  gap: 2,
  borderRadius: "6px",
  padding: "5% 0",
  "@media (max-width: 1280px)": {
    padding: "0",
  },
  "& .MuiSvgIcon-root": {
    color: "#8b8b8b",
    cursor: "pointer",
    borderRadius: "100%",
    transition: "all ease .5s",
    "&:hover": {
      color: "#000000",
      backgroundColor: "#dddddd",
    },
  },
  "& .slick-slider": {
    height: "auto !important",
    display: "flex",
    margin: "auto",
    "& .slick-list": {
      margin: "auto",
      "& .slick-track": {
        height: "100% !important",
      },
    },
  },
});
export const WebCarousalContainer = styled("div")({
  display: "flex",
  gap: 16,
  "@media (max-width: 1280px)": {
    alignItems: "flex-start",
  },
  "@media (max-width:600px)": {
    display: "none",
  },
});

export const WebArrowButton = styled(ButtonBase)(({ position }: any) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "30px",
  width: "30px",
  borderRadius: "50%",
  cursor: "pointer",
  background: "#2233541a",
}));
export const WebCarousalImage = styled("div")(({ position }: any) => ({
  flexDirection: "column",
  justifyContent: "center",
  cursor: "pointer",
  display: "flex !important",
  alignItems: "center",
}));

export const ZoomIconContainer = styled("div")({
  cursor: "pointer",
  right: "50%",
  position: "absolute",
  top: "85%",
  background: "#FFFFFF",
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "100000 !important",
});

export const MagnifyImagebox = styled("div")({
  position: "relative",
  "& img": {
    borderRadius: "6px",
    width: "100%",
    display: "block",
    pointerEvents: "none",
    margin: "auto",
  },
});

export const VideoOuterBox = styled(Box)({
  background: "white",
  width: "100%",
  border: "1px solid #e5e5e5",
  height: "452px",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  "@media screen and (max-width:1280px)": {
    height: "auto",
  },
  "&.forbigscreenonly": {
    "@media screen and (max-width:600px)": {
      display: "none",
    },
  },
});
export const ReactImageMagnify = styled("div")({
  width: "100%",
});
export const ZoomIcon = styled(Box)({
  position: "absolute",
  bottom: "10px",
  right: "10px",
  zIndex: "100",
  cursor: "pointer",
  backgroundColor: "#393939",
  borderRadius: "100%",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all ease .3s",
  transform: "scale(1)",

  "& .MuiSvgIcon-root": {
    color: "white",
    fontSize: "20px",
  },
  "&:hover": {
    backgroundColor: "#000000",
    transform: "scale(1.2)",
  },
});

export const CarousalArrow = styled(Box)({
  width: "30px",
  height: "30px",
  background: "#ffffff",
  borderRadius: "100%",
  overflow: "hidden",
  border: "1px solid #d2d2d2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export const SliderThumbnails = styled(Box)({
  borderRadius: "6px",
  padding: "8px",
  margin: "1px",
  "& .slick-track": {
    "& .slick-slide": {
      padding: "6px",
      height: "80px",
      "& img": {
        border: "1px solid #e7e7e7",
        padding: "2px",
      },
    },
  },
  "& .slick-arrow": {
    "&:before": {
      color: "#6e6e6e",
      fontSize: "26px",
    },
  },
  "& .slick-prev": {
    left: "-10px",
    zIndex: "1",
  },
  "& .slick-next": {
    right: "-4px",
    zIndex: "1",
  },
});
export const ImagemodalstyleDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    maxWidth: "900px",
    "@media (max-width:767px)": {
      margin: "12px",
    },
  },
});

export const MobileAutoSlider = styled(Box)({
  display: "none",
  "@media (max-width:600px)": {
    display: "block",
    "& .slick-track": {
      display: "flex",
      gap: "10px",
      padding: "16px",
      "@media screen and (max-width: 767px)": {
        padding: "0",
        gap: "0",
      },
      "& .slick-slide": {
        "& img": {
          border: "1px solid #e7e7e7",
          padding: "2px",
          borderLeft: 0,
          borderRight: 0,
        },
      },
    },
    "& .slick-arrow": {
      "&:before": {
        color: "#6e6e6e",
        fontSize: "26px",
      },
    },
    "& .slick-prev": {
      left: "6px",
      zIndex: "1",
      color: "#231F20",
      background: "#dbdbdb",
      padding: "4px",
    },
    "& .slick-next": {
      right: "6px",
      zIndex: "1",
      color: "#231F20",
      background: "#dbdbdb",
      padding: "4px",
    },
    "& .slick-disabled": {
      opacity: ".25",
    },
    "& .slick-dots": {
      display: "block !important",
      bottom: "-17px",
    },
  },
});
