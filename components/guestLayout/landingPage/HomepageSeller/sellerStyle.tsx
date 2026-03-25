import { Box, ButtonBase, Card, IconButton, Stack, styled, Typography } from "@mui/material";

export const SellerBannerContainer = styled(Box)({
  // height: "78vh",
  height: "700px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundPosition: "center",
  color: "#fff",
  position: "relative",
  width: "100%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  margin: "-2px 0 0",
  background: 'url("/assets/images/landing-page/seller-bg.jpg") #000',
  "@media  (max-device-width: 900px) and (orientation: portrait)": {
    height: "50vh",
  },
  "@media screen and (max-width:767px)": {
    margin: "0 0 25px",
    height: "50vh",
    padding: "0 5px",
  },

  "@media screen and (max-width:1600px)": {
    padding: "0 20px",
  },
  "& .MuiTypography-h1": {
    fontSize: "40px",
    fontWeight: 700,
    margin: "20px 0",
    "@media screen and (max-width:1600px)": {
      fontSize: "30px",
    },
    "@media screen and (max-width:767px)": {
      "& br": {
        display: "none",
      },
    },
    "@media screen and (max-width:1200px)": {
      fontSize: "26px",
    },
    "@media screen and (max-width:800px)": {
      fontSize: "19px",
    },
  },
  "& .MuiTypography-h2": {
    fontSize: "24px",
    "@media screen and (max-width:800px)": {
      fontSize: "16px",
    },
  },
  "& .MuiTypography-body1": {
    fontSize: "16px",
    "@media screen and (max-width:767px)": {
      fontSize: "12px",
      "& br": {
        display: "none",
      },
    },
  },
});
export const SellerCommonContainer = styled(Box)({
  width: "95%",
  padding: "0 20px",
  margin: "0 auto",
  "@media screen and (max-width:1700px)": {
    width: "100%",
  },

});

export const TestiminialButton = styled(IconButton)({
  position: "absolute",
  bottom: "-20px",
  zIndex: 1,
  color: "#d7282f",
  padding: "2px",
  "& svg": {
    fontSize: "15px",
    margin: "0 -2px 0 3px",
    stroke: "#d7282f",
    strokeWidth: 1,
    "@media screen and (max-width:1400px)": {
      margin: "0 -12px 0 3px",
    },
  },
  "&:hover": {
    color: "#d7282f",
  },
});
export const ButtonSize = styled(IconButton)({
  position: "absolute",
  top: "-35px",
  zIndex: 1,
  border: "1px solid #ddd",
  color: "#ddd",
  padding: "2px",
  "& svg": {
    fontSize: "15px",
    margin: "0 -2px 0 3px",
    "@media screen and (max-width:1400px)": {
      margin: "0 -2px 0 -6px",
    },
  },
  "&:hover": {
    color: "#d7282f",
  },
  "@media screen and (max-width:900px)": {
    display: "none",
  },
});

export const Startsellingbutton = styled(ButtonBase)(() => ({
  background: "linear-gradient(360deg, #D7282F 0%, #FA4B52 100%)",
  borderRadius: "6px",
  padding: "12px",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  opacity: "85%",
  transition: ".3s",
  margin: "8px",
  "@media screen and (max-width:1600px)": {
    fontSize: "13px",
  },

  "&:hover": {
    opacity: "100%",
    transition: ".3s",
    backgroundColor: "#f5f5f5",
  },
  "@media screen and (max-width:600px)": {
    padding: "10px 12px",
  },
}));
export const BannerBoxSearch = styled(Box)({
  display: "flex",
  gap: "0px",
  marginTop: "20px",
  border: "1px solid #CCCEDD",
  width: "85%",
  justifyContent: "space-between",
  borderRadius: "3px",
  "@media screen and (max-width:1600px)": {
    width: "100%",
  },
  "& .MuiInputBase-input": {
    color: "#fff",
    border: "none",
    "&:hover": {
      border: "none",
    }
  },
  "& .MuiOutlinedInput-notchedOutline":{
    border:"none"
  }

});

export const ExploreBusiness = styled(Box)({
  textAlign: "center",
});
export const TotalCountBox = styled(Box)({
  width: "60%",
  margin: "3rem auto 0",
  "@media screen and (max-width:1600px)": {
    width: "100%",
  },
});
export const TotalCountCol = styled(Box)({
  "& .MuiTypography-body1": {
    fontSize: "16px",
    color: "#000",
    "&:first-of-type": {
      fontSize: "30px",
      color: "#D7282F",
      fontWeight: "700",
      padding: "10px 0",
      "@media screen and (max-width:1024px)": {
        fontSize: "18px",
      },
    },
    "&:nth-of-type(2)": {
      fontSize: "18px",
      color: "#000",
    }
  },
});
export const BannerImageBox = styled(Box)({
  textAlign: "center",
  "& img": {
    width: "550px"
  }
});
export const PageSubHead = styled(Typography)({
  color: "#231F20",
  fontSize: "18px",
  fontWeight: 700,
  textAlign: "center",
  padding: "10px 0",
  "& span": {
    color: "#d7282f"
  }
});
export const PageMainHead = styled(Typography)({
  color: "#231F20",
  fontSize: "32px",
  fontWeight: 600,
  textAlign: "center",
  "& span": {
    color: "#d7282f"
  }
});
export const PageHeadingDes = styled(Typography)({
  color: "#231F20",
  fontSize: "15px",
  fontWeight: 400,
  textAlign: "center"
});
export const PagePerSection = styled(Box)({
  padding: "60px 0",
  position: "relative",
  "& .Card-1": {
    backgroundColor: "#fff",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "16px",
    borderRadius: "30px",
    zIndex: "2",
    isolation: "isolate",
    "&:before": {
      content: '""',
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "#fff",
      borderTop: "16px solid #DBDBDB",
      borderRight: "16px solid #DBDBDB",
      borderLeft: "16px solid #DBDBDB",
      borderRadius: "100px 100px 0 0",
      top: "-56px",
      left: "-20px",
      zIndex: "-1",
      transform: "translateZ(0)"
    },
  },

  "& .Card-2": {
    backgroundColor: "#fff",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "16px",
    borderRadius: "30px",
    zIndex: "2",
    "&::before": {
      content: '""',
      position: "absolute",
      height: "100%",
      width: "100%",
      top: "65px",
      left: "-24px",
      zIndex: -1,
      background: "#fff",
      borderBottom: "16px solid #DBDBDB",
      borderRight: "16px solid #DBDBDB",
      borderLeft: "16px solid #DBDBDB",
      borderRadius: "0 0 100px 100px",
      borderTop: "none"
    },
  },

  "& .Card-3": {
    backgroundColor: "#fff",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "16px",
    borderRadius: "30px",
    zIndex: "2",
    "&::before": {
      content: '""',
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "#fff",
      borderTop: "16px solid #DBDBDB",
      borderRight: "16px solid #DBDBDB",
      borderLeft: "16px solid #DBDBDB",
      borderRadius: "100px 100px 0 0",
      top: "-38px",
      left: "-24px",
      zIndex: "-1",
      transform: "translateZ(0)"
    },
  },

  "& .Card-4": {
    backgroundColor: "#fff",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "16px",
    borderRadius: "30px",
    zIndex: "2",
    "&::before": {
      content: '""',
      position: "absolute",
      height: "100%",
      width: "100%",
      top: "41px",
      left: "-25px",
      zIndex: -1,
      background: "#fff",
      borderBottom: "16px solid #DBDBDB",
      borderRight: "16px solid #DBDBDB",
      borderLeft: "16px solid #DBDBDB",
      borderRadius: "0 0 100px 100px",
      borderTop: "none"
    },

  },
  "& .evenNo": {
    fontSize: "66px",
    color: "#231f20",
    margin: 0,
    fontWeight: 700,
    "& p": {
      textAlign: "center"
    }
  },
  "& .oddNo": {
    fontSize: "66px",
    color: "#d7282f",
    margin: 0,
    fontWeight: 700,
    "& p": {
      textAlign: "center"
    }
  }









});
export const SliderScreenSection = styled(Box)({
  // padding: "60px 0"
});
export const SellerPageBody = styled(Box)({
  background: "#fff",
  "& .pinksection": {
    background: "#FBF8F6"
  },
  "& .whitesection": {
    background: "#fff"
  },
  "& .SimplyComBoxSection": {
    background: 'url("/assets/images/landing-page/seller-graph-bg.png") #FBF8F6',
    backgroundRepeat: "no-repeat",

  }
});

export const ExpandableCard = styled(Card)({
  cursor: "pointer",
  background: "#f8f8f8",
  transition: "all 0.3s",
  "&:hover": {
    background: "#ececec",
  },
});

export const SectionTitle = styled(Typography)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: 600,
  color: "#d9252a",
});

export const ContainerBox = styled(Box)({
  "& .Gridhover": {
    padding: "16px",
    transition: "all ease .3s",
    "&:hover": {
      backgroundColor: "#D7282F",
      borderRadius: "4px",
      transition: "all ease .3s",
      "& .hovertext": {
        color: "#fff",
        transition: "all ease .3s",
      },
      "& .hoverbgcolor": {
        backgroundColor: "#fff",
        transition: "all ease .3s",
      },
      "& .Gridicon": {
        color: "#d7282f",
        transition: "all ease .3s",
      },
    },
  },
  "& .hovertext": { transition: "all ease .3s" },
  "& .Gridicon": {
    color: "#fff",
    transition: "all ease .3s",
  },
  "& .iconandtext": { display: "flex", alignItems: "center" },
  "& .headingfistspan": { color: "#231f20" },
  "& .headingsecondspan": {
    color: "#231f20",
    fontSize: "28px",
    "@media screen and (max-width:767px)": {
      fontSize: "18px",
    },
  },
  "& .headingthirdspan": {
    color: "#d7282f",
    fontSize: "28px",
    fontWeight: "700",
    "@media screen and (max-width:767px)": {
      fontSize: "18px",
    },
  },
});

export const ColumnGap = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});
export const ColumnImage = styled(Box)({
  "& img": {
    width: "100%",
  },
});
export const CRMColumnStack = styled(Stack)({
  gap: "20px",
});

export const SectionPageHeadings = styled("h2")({
  fontSize: "30px",
  fontWeight: "700",
  color: "#231f20",
  "@media screen and (max-width:1600px)": {
    fontSize: "24px",
  },
  "@media screen and (max-width:1024px)": {
    fontSize: "22px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "18px",
  },
});
export const SectionPageText = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  color: "#000",
  "@media screen and (max-width:600px)": {
    fontSize: "12px",
  },
});


export const CheckSection = styled(Stack)({
  gap: "15px",
});
export const CheckRow = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: "8px",
  "& .MuiTypography-body1": {
    fontSize: "14px",
    "@media screen and (max-width:1600px)": {
      fontSize: "12px",
    },
  },
  "& svg": {
    color: "#d7282f",
    fontSize: "16px",
    margin: "3px 0 0px",
  },
  "& span": {
    fontWeight: 600,
    margin: "0 0 10px",
    fontSize: "14px",
  },
});

export const ColumnStack = styled(Box)({
  padding: "0 20px",
  "@media screen and (max-width:800px)": {
    padding: "0",
  },
});

/******* Start CRM & Chat Info styling *******/
export const LiveChatInfo = styled(Stack)({
  padding: "35px 0 0 18px",
  gap: "30px",
  "& .MuiTypography-h3": {
    fontSize: "18px",
    fontWeight: "700",
    color: "#231f20",
    padding: "0px 0 2px",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#000",
    padding: "4px 0",
    "@media screen and (max-width:1600px)": {
      fontSize: "13px",
    },
  },
  "@media screen and (max-width:899px)": {
    padding: "15px 0 0",
    gap: "10px",
  },
});
export const LiveChatinnData = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: "14px",
  "& img": {
    width: "40px"
  }
});
export const LiveChatinnBox = styled(Box)({
  "& svg": {
    fontSize: "15px",
    margin: "0 0 0 6px",
  },
});
export const LearnMoreTxt = styled(Typography)({
  display: "flex",
  alignItems: "center",
  padding: "8px 0px",
  "& a": {
    color: "#d7282f",
    display: "flex",
    alignItems: "center",
  },
});

export const ChatColumnImage = styled(Box)({
  "& img": {
    width: "800px",
    "@media screen and (max-width:1600px)": {
      width: "100%",
    },
  },
});
/******* End CRM & Chat Info styling *******/

export const Content = styled(Box)({
  padding: "10px 20px",
  fontSize: "14px",
  color: "#333",
});

export const RightSection = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const LeftSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  borderLeft: "3px solid #D9D9D9"
});

export const GrowBusinessSec = styled(Box)({
  width: "80%",
  margin: "0 auto"
});
export const ImageSliderScreen = styled(Box)({
  margin: "30px auto",
  textAlign: "center",
  position: "relative",
  "& .slick-slide": {
    "& img": {
      width: "100% !important"
    }
  }
});

export const SimplyComBoxLeft = styled(Box)({
  textAlign: "center",
  "& .complex-price-img": {
    width: "375px",
    margin: "2rem 0 0"
  }
});
export const SimplyCompleHead = styled("h2")({
  fontSize: "30px",
  fontWeight: "700",
  color: "#231f20",
  "@media screen and (max-width:1600px)": {
    fontSize: "24px",
  },
  "@media screen and (max-width:1024px)": {
    fontSize: "22px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "18px",
  },
});

export const SimplyCompleRight = styled(Box)({
  padding: "35px 0 0 18px",
  display: "grid",
  justifyContent: "center",
  gap: "40px",
  "& .MuiTypography-h3": {
    fontSize: "18px",
    fontWeight: "700",
    color: "#231f20",
    padding: "0px 0 2px",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#000",
    padding: "4px 0",
    "@media screen and (max-width:1600px)": {
      fontSize: "13px",
    },
  },
  "@media screen and (max-width:899px)": {
    padding: "15px 0 0",
    gap: "10px",
  },
});

export const EngagementAnalyticsBox = styled(Box)({
  width: "100%",
  "& img": {
    width: "100%",
  }
});

export const VideoContainer = styled("div")({
  textAlign: "center",
  margin: "30px 0"
});
export const VideoIframeBox = styled("div")({
  // width:"400px",
  // height:"400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  background: "#fff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  margin: "auto",
  "& iframe": {
    width: "100%"
  }
});

export const VideoContent = styled("div")({
  padding: "16px"
});

export const VideoName = styled(Typography)({
  margin: "10px 0",
  fontSize: "18px",
  fontWeight: "bold"
});

export const VideoDescription = styled(Typography)({
  fontSize: "14px",
  color: "#666"
});

export const WatchButton = styled("a")({
  display: "inline-block",
  marginTop: "10px",
  padding: "8px 16px",
  color: "#4A4A4A",
  textDecoration: "none",
  borderRadius: "4px",
  fontWeight: "700",
  fontSize: "16px",
  transition: "background 0.3s",

  "&:hover": {
    textDecoration: "underline"
  }
});

export const CommonQuestionBox = styled(Box)({
  margin: "1rem 0",
});

/***** Lase section styling  ****/
export const Shadesbg = styled(Box)(() => ({
  backgroundImage: `url('/assets/buyershadesbg.svg')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
  margin: "1rem 0 0"
}));
export const Skewimage2 = styled(Box)(() => ({
  backgroundImage: `url('/assets/buyerskewimage2.svg')`,
  backgroundRepeat: "no-repeat",
  padding: "90px 180px",
  "@media screen and (max-width:1700px)": {
    padding: "90px 50px",
  },
  "@media screen and (max-width:600px)": {
    padding: "0px 0px 0px 0px",
  },
}));
export const Realtime = styled(Typography)(() => ({
  fontSize: "45px",
  fontWeight: "700",
  color: "#d7282f",
  "@media screen and (max-width:1700px)": {
    fontSize: "38px",
  },
}));
export const Realtimespan = styled("span")(() => ({
  fontWeight: "600",
  color: "#231F20",
}));
export const Weeasy = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "400",
  color: "#4A4A4A",
}));
export const FlexBoxforchat = styled(Box)(() => ({
  display: "flex",
  gap: "15px",
  "@media screen and (max-width:600px)": {
    padding: "0px 20px",
  },
}));
export const Imageborder = styled(Box)(() => ({
  border: "1px solid #E9E9E9",
  borderRadius: "6px",
  padding: "10px",
}));
export const Onlinechat = styled(Typography)(() => ({
  fontSize: "22px",
  fontWeight: "400",
  color: "#231F20",
}));
export const Livechat = styled(Typography)(() => ({
  fontSize: "32px",
  fontWeight: "600",
  color: "#d7282f",
}));
export const Livechatparagraph = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#4a4a4a",
  lineHeight: "33px",
}));
export const LearnMoreBox = styled(Box)(() => ({
  marginTop: "50px",
  "@media screen and (max-width:600px)": {
    margin: "30px 0px",
    display: "flex",
    justifyContent: "center",
    paddingBottom: "30px",
  },
}));

export const ButtonoverCard = styled(ButtonBase)(() => ({
  border: "1px solid #CDCDCD",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "21.79px",
  textAlign: "center",
  borderRadius: "6px",
  padding: "9px 11px 12px 11px",
  backgroundColor: "transparent",
  left: "0",
  right: "0",
  margin: "0 auto",
  width: "auto",
  color: "#D7282F",
  transition: "ease-in .3s",
  "&:hover": {
    backgroundColor: "#D7282F",
    color: "#ffff",
    transition: "ease-in .3s",
    "& .MuiTypography-root": {
      color: "#ffff",
      transition: "ease-in .3s",
    },
  },
}));
export const ButtonText = styled(Typography)(() => ({
  color: "#D7282F",
  transition: "ease-in .3s",
}));
export const TypographyBorderline: any = styled(Typography)({
  position: "absolute",
  bottom: 0,
  height: 1,
  width: "90px",
  background: "red",
});
export const Skewimageinsidepadding = styled(Box)(() => ({
  "@media screen and (max-width:600px)": {
    padding: "0px 20px",
  },
}));
export const ClickHereBox = styled(Box)(() => ({
  marginTop: "50px",
  "@media screen and (max-width:600px)": {
    padding: "30px 0px",
    margin: "0 auto",
  },
}));
export const EmainChatBoxOuter = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "10px 0",
  "& svg": {
    color: "#d7282f"
  }
});

export const TextLayer = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: "#4a4a4a",
  fontSize: "16px",
  "& svg": {
    color: "#d7282f",
    fontSize: "18px"
  }
});
export const StepCardCon = styled(Box)({
  width: "95%",
  padding: "0 20px",
  margin: "6rem auto",
});
export const StepCardInn = styled(Box)({
  textAlign: "center"
});
export const CircleShape = styled(Box)({
  width: "50px",
  height: "50px",
  borderRadius: "50px",
  background: "#DBDBDB",
  left: "-54px",
  position: "relative",
  bottom: "-12px"
});

export const CircleShapeRight = styled(Box)({
  width: "50px",
  height: "50px",
  borderRadius: "50px",
  background: "#DBDBDB",
  right: "-40px",
  position: "absolute",
  top: "-12px"
});
















