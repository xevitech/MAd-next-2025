import { Box } from "@mui/material";
import { Button, Typography, Switch, styled } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const OuterContainer = styled("div")({
  minHeight: "calc(100vh + 64px)",
});

export const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  "@media (max-width: 600px)": {
    display: "block",
    justifyContent: "inherit",
    textAlign: "center",
  },
});

export const CreatePostButton = styled(Button)({
  background: "#fff",
  border: "1px solid #d7282fcc",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "19px",
  color: "#d7282fcc",
  height: "36px",
  textTransform: "none",
  marginBottom: "20px",
  width: "160px",
  marginRight: "-20px",
  margin: "6rem 0 1rem",
  "&:hover": {
    background: "#d7282fcc",
    color: "#fff",
  },
  "@media (max-width: 767px)": {
    margin: "0 auto 1rem",
    fontSize: "14px",
    height: "32px",
    width: "157px",
  },
});

export const useStyles: any = makeStyles()(() => {
  return {
    toggleButton: {
      color: "rgba(215, 40, 47, 0.85)",
      background: "white",
      cursor: "pointer",
      height: "36px !important",
      width: "36px !important",
      padding: "6px",
      borderRadius: "6px",
    },
    selectedToggleButton: {
      color: "white",
      background: "rgba(215, 40, 47, 0.85)",
      cursor: "pointer",
      height: "36px !important",
      width: "36px !important",
      padding: "6px",
      borderRadius: "6px",
    },
    borderbox: { border: "1px solid", borderRadius: "6px" },
  };
});

export const ChangeViewButtons = styled("div")({
  display: "flex",
  gap: "0",
});

export const AdvanceSearchBoxContainer = styled("div")({
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  padding: "20px",
  "& .FilterContainer": {
    maxWidth: "550px",
  },

});
export const AdvanceSearchBoxHeader = styled("div")({
  display: "flex",
  gap: "16px",
  "& div:first-child": {
    paddingLeft: "0",
  },
  "@media (max-width: 1024px)": {
    display: "block",
    gap: "0",
  },
});

export const ProductSearchFieldsContainer: any = styled("div")(
  () => ({
    marginTop: "40px",
    paddingBottom: "16px",
    clear: "both",
  })
);

export const InnerContainer = styled("div")({
  borderRadius: "6px",
  minHeight: "100vh",
});

export const ProductsSearchFieldInnerContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (max-width: 767px)": {
    display: "block",
  },
});

export const FieldsContainer = styled("div")({
  display: "flex",
  gap: "16px",
  width: "100%",
});

export const ButtonsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  borderRadius: "6px",
  margin: "0 0 0 10px",
  "@media (max-width: 767px)": {
    margin: "10px 0 0 0",
    alignItems: "start",
    justifyContent: "left"

  },
});

export const ProductListContainer = styled("div")({});

export const CellText: any = styled("span")(({ val }: any) => ({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "18px",
  fontFamily: "open sans",
  textAlign: "left",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  "& div": {
    borderRadius: "6px",
    padding: "3px 8px",
    lineHeight: "18px",
    minHeight: "24.5px",
  },
}));

export const HeaderCellText = styled("span")({
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "12px",
  display: "flex",
  alignItems: "center",
  letterSpacing: "0.4px",
  textTransform: "capitalize",
  color: "#1A2027",
  fontFamily: "open sans",
  minHeight: "16px",
});

export const ChipCustom: any = styled("div")(({ danger, thinText }: any) => ({
  display: "inline-block",
  background: danger ? "#dbe8f9" : "#ECFBE6",
  color: danger ? "#355f97" : "#3BB900",
  padding: "3px 8px",
  borderRadius: "6px",
  fontWeight: thinText ? 400 : 600,
  fontSize: "13px",
  lineHeight: "18px",
  minHeight: "24.5px",
}));

export const ProductListEditIcon = styled("span")({
  display: "inline-flex",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
export const CellHeader = styled(Box)({
  marginTop: "12px",
  marginBottom: "7px",
  flexDirection: "column",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "16px",
  display: "flex",
  marginLeft: "10px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});
export const ProductNameCSS = styled("span")({
  padding: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const EditIconCSS = styled("span")({
  display: "inline-block",
  cursor: "pointer",
});

export const FontContainer = styled(Typography)(
  ({
    color,
    fontSize,
    fontWeight,
    padding,
    textDecorationLine,
    background,
  }: any) => ({
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: fontWeight || 600,
    fontSize: fontSize || "12px",
    color: color || "#231F20",
    padding,
    textDecorationLine,
    background,
  })
);

export const Columnexport = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "6px 14px 0px 6px",
  alignItems: "center",
  "& .tableLink": {
    display: "flex",
    justifyContent: "flex-end",
    "@media (max-width: 767px)": {
      justifyContent: "flex-start",
      margin: 0
    },
  },
  "& .MuiDivider-root": {
    height: "20px",
    "@media (max-width: 767px)": {
      display: "none"
    }
  }
});

export const Switchcolor = styled(Switch)({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#d7282f",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#7e7979",
  },
});

export const Fontcontainer2 = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const Heading = styled(Box)({
  fontFamily: "open sans",
  fontWeight: 700,
  fontSize: "30px",
  lineHeight: "41px",
  marginBottom: "30px",
  display: "flex",
  color: "#231F20",
  marginLeft: "-20px",
});

export const PopoverContent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (max-width: 767px)": {
    flexDirection: "column",
    "& .MuiSvgIcon-root": {
      fontSize: "36px",
      margin: "0 !important",
    },
  },
});

export const NumValue = styled("div")({
  background: "#D7282F",
  borderRadius: "8px 0px 0px 8px",
  color: "#fff",
  padding: "10px",
  textAlign: "center",
  fontSize: "25px",
  alignSelf: "center",
  fontWeight: 600,
  "@media (max-width: 767px)": {
    width: "100%",
    borderRadius: "8px 8px 0px 0px",
  },
});

export const UpTxt = styled(Typography)({
  color: "#000",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "normal",
});
export const Boldtxt = styled(Typography)({
  color: "#000 !important",
  fontWeight: "600 !important",
  fontSize: "24px !important",
  lineHeight: "normal",
});

export const ColTxt = styled("div")({
  background: "#fff",
  color: "#000",
  padding: "0px 25px",
  alignSelf: "center",
  lineHeight: "normal",
  "@media (max-width: 767px)": {
    width: "100%",
    flexDirection: "column",
    gap: "0 !important",
    padding: "10px 0",
    borderBottom: "1px solid #d2d2d2",
    "& .MuiTypography-root": {
      textAlign: "center",
    },
  },
});

export const ColTxtBorder = styled("div")({
  background: "#fff",
  color: "#000",
  padding: "0px 25px",
  alignSelf: "center",
  lineHeight: "normal",
  margin: "0 0px 0 -1px",
  "@media (max-width: 767px)": {
    width: "100%",
    textAlign: "center",
    borderBottom: "1px solid #d2d2d2",
    padding: "10px 0",
  },
});

export const StartTxt = styled("div")({
  color: "#484848",
  fontSize: "13px",
});

export const Datecol = styled("div")({
  color: "#303030",
  fontSize: "14px",
  fontWeight: "600",
  padding: "2px 0 0",
});

export const BigPostData = styled("div")({
  width: "700px",
  minHeight: "70px",
  margin: "0 auto",
  borderRadius: "10px",
  background: "#fff",
  boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
  "@media (max-width: 768px)": {
    width: "calc(100% - 32px)",
    margin: "0 16px",
  },
});

export const StatusTabs = styled("div")({
  minWidth: "120px",
  paddingLeft: "20px",
  paddingRight: "20px",
  borderRight: "1px solid #DCDCDC",
  cursor: "pointer",
  transition: "all ease .5s",
  '&:last-child': {
    borderRight: '0',
  },
  "& i": {
    display: "inline-flex",
    width: "30px",
    height: "30px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
  },
  "& .icon-all": {
    border: "1px solid #1A75FF",
    boxShadow: "0px 3px 12px 2px rgba(25, 117, 255, 0.35)",
    "&::before": {
      color: "#1A75FF"
    }
  },
  "& .icon-approved": {
    border: "1px solid #44D600",
    boxShadow: "0px 3px 12px 2px rgba(68, 214, 0, 0.35)",
    "&::before": {
      color: "#44D600"
    }
  },

  "& .icon-publlished-1": {
    border: "1px solid #44D600",
    boxShadow: "0px 3px 12px 2px rgba(68, 214, 0, 0.35)",
    fontSize:"22px",
    "&::before": {
      color: "#44D600"
    }
  },
  "& .icon-pending": {
    border: "1px solid #cd9b09",
    boxShadow: "0px 3px 12px 2px rgba(205, 155, 9, 0.35)",
    "&::before": {
      color: "rgb(205, 155, 9)"
    }
  },
  // "& .icon-pending": {
  //   border: "1px solid #FF1A43",
  //   boxShadow: "0px 3px 12px 2px rgba(255, 26, 67, 0.35)",
  //   "&::before": {
  //     color: "#FF1A43"
  //   }
  // },
  "& .icon-draft": {
    border: "1px solid #FFA31A",
    boxShadow: "0px 3px 12px 2px rgba(255, 163, 25, 0.35)",
  },
  "& .icon-expire-svgrepo-com-1": {
    border: "1px solid #AD5504",
    boxShadow: "0px 3px 12px 2px rgba(173, 85, 4, 0.35)",
  },
  // "& .icon-rejected_icon": {
  //   border: "1px solid #00A0B6",
  //   boxShadow: "0px 3px 12px 2px rgba(0, 160, 182, 0.35)",
  // },
  "& .icon-rejected_icon": {
    border: "1px solid #FF1A43",
    boxShadow: "0px 3px 12px 2px rgba(255, 26, 67, 0.35)",
    "&::before": {
      color: "#FF1A43"
    }
  },
  "& .icon-delete-file": {
    border: "1px solid #343a30",
    boxShadow: "0px 3px 12px 2px rgba(52, 58, 48, 0.35)",
    "&::before": {
      color: "#343a30"
    }
  },
  // "& .icon-delete-file": {
  //   border: "1px solid #d7282f",
  //   boxShadow: "0px 3px 12px 2px rgba(215, 40, 47, 0.35)",
  // },
  "&:hover": {
    "& i::before": {
      color: "#ffffff",
    },
    "& .icon-all": {
      backgroundColor: "#1A75FF",
    },
    "& .icon-approved": {
      backgroundColor: "#44D600",
    },

    "& .icon-publlished-1": {
      backgroundColor: "#44D600",
    },


    "& .icon-pending": {
      backgroundColor: "rgb(205, 155, 9)",
    },
    // "& .icon-pending": {
    //   backgroundColor: "#FF1A43",
    // },
    "& .icon-draft": {
      backgroundColor: "#FFA31A",
    },
    "& .icon-expire-svgrepo-com-1": {
      backgroundColor: "#AD5504",
    },
    // "& .icon-rejected_icon": {
    //   backgroundColor: "#00A0B6",
    // },
    "& .icon-rejected_icon": {
      backgroundColor: "#FF1A43",
    },
    "& .icon-delete-file": {
      backgroundColor: "#343a30",
    },
    // "& .icon-delete-file": {
    //   backgroundColor: "#d7282f",
    // },
  },
  "&.active": {
    "& i::before": {
      color: "#ffffff",
    },
    "& .icon-all": {
      backgroundColor: "#1A75FF"
    },
    "& .icon-approved": {
      backgroundColor: "#44D600"
      ,
    },
    "& .icon-publlished-1": {
      backgroundColor: "#44D600"
    },

    "& .icon-pending": {
      backgroundColor: "rgb(205, 155, 9)"
      ,
    },
    // "& .icon-pending": {
    //   backgroundColor: "#FF1A43"
    //   ,
    // },
    "& .icon-draft": {
      backgroundColor: "#FFA31A",
    },
    "& .icon-expire-svgrepo-com-1": {
      backgroundColor: "#AD5504",
    },
    "& .icon-rejected_icon": {
      backgroundColor: "#FF1A43",
    },
    // "& .icon-rejected_icon": {
    //   backgroundColor: "#00A0B6",
    // },
    "& .icon-delete-file": {
      backgroundColor: "#343a30",
    },
  },
  "@media (max-width: 1204px)": {
    padding: "0",
    float: "left",
    width: "33%",
    margin: "0 0 26px 0",
    border: "0",
  },

  "@media (max-width: 767px)": {
    width: "50%",
  },
});
export const SearchContainer = styled(Box)({
  marginBottom: "16px",
  "@media (max-width: 600px)": {
    height: "300px",
    overflowY: "auto",
    paddingRight: "16px",
  },
});
export const GridTable = styled(Box)({
  "& .MuiDataGrid-row": {
    "&.Mui-hovered": {
    },
    "&.Mui-selected": {
      backgroundColor: "#FFEEEF !important",
    },
  },
  "& .MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      color: "#d7282f",
    },
    "&.Mui-checked": {
      color: "#d7282f",
      "& .MuiSvgIcon-root": {
        color: "#d7282f",
      },
    },
  },
});


export const ProductTopBarr = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media (max-width:767px)": {
    display: "block",
  },
});
export const CreatePostBox = styled(Box)({
  "@media (max-width:767px)": {
    textAlign: "center",
  },
});
export const MyRedButtons = styled(Button)({
  textTransform: "capitalize",
  color: "#d7282f",
  borderColor: "#d7282f",
  padding: "2px",
  "& svg": {
    fontSize: "15px"
  },
  "&:hover": {
    color: "#d7282f",
    borderColor: "#d7282f",
  },
  "& .MuiButton-startIcon": {
    marginRight: "2px"
  }
});
export const AssignToBox = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "center",
  "@media (max-width:600px)": {
    flexDirection: "column",
    alignItems: "start",
    minWidth: "100%"
  },
  "& .MuiFormControl-root": {
    minWidth: "160px",
    "@media (max-width:600px)": {
      width: "100%",
      minWidth: "100%"
    },
    "& svg": {
      fontSize: "16px"
    }
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "13px",
    paddingTop: "5.5px",
    paddingBottom: "5.5px"
  },
  "& button": {
    textTransform: "capitalize"
  }

});
export const AllWithIcon = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "center",
  "& svg": {
    fontSize: "16px",
    color: "#34a853"
  },
  "& .MuiTypography-root": {
    color: "#d7282f"
  }
});


/////////////////////////////////// After tab added style
export const TabNestedProductList = styled(Box)({
  "& .MuiTabs-indicator": {
    background: "rgba(215, 40, 47, 0.8)",
    height: "38px",
    color: "#fff",
    borderRadius: "6px 6px 0 0px"
  },
  "& .MuiTab-root": {
    background: "#ECECEC",
    color: "#000",
    fontSize: "14px",
    textTransform: "capitalize",
    borderRadius: "6px 6px 0 0px",
    padding: "10px 16px", minHeight: "38px"
  },
  "& .Mui-selected": {
    color: "#fff !important",
    position: "relative",
    zIndex: 10,
    background: "transparent",
  },
  "& .MuiTabPanel-root": {
    padding: 0
  },
  "& .MuiTabs-root": {
    minHeight: "38px",
  },
  "& .MuiTabs-flexContainer": {
    gap: "10px"
  }

});


export const ProductListBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "7px",
  "@media (max-width:767px)": {
    background: "#f5f5f5",
    padding: "4px",
    margin: "0 0 10px"
  },
});
export const TableOtherActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});






