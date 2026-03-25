import {
  Box,
  Button,
  Menu,
  SwipeableDrawer,
  Typography,
  styled,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
export const RfqFullData = styled(Box)({
  height: "calc(100vh - 10vh)",
  // background: "#fff",
  borderRadius: "6px",
  "@media screen and (max-width:1280px)": {
    background: "transparent"
  },
  ".MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      width: "14px",
      height: "14px",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
      padding: 0,
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "1px solid #D7282F",
      borderRight: "1px solid #D7282F",
      position: "absolute",
      top: "7px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
    "&.MuiCheckbox-root": {
      padding: "5px 10px",
    },
  },
  "& .datetimecommon": {
    "& .MuiFormControl-root": {
      minWidth: "100% !important"
    },
    "& .MuiStack-root": {
      overflow: "hidden",
      paddingTop: 0
    },
  },
});
export const RfQInnerContent = styled(Box)({
  margin: "5.5rem 0 0",
  background: "#fff",
  borderRadius: "6px",
  "& .tabnospace": {
    paddingTop: "0 !important",
  },
  "@media screen and (max-width:1280px)": {
    margin: "1rem 0 0",
  },
});
export const RfqOuterBox = styled(Box)({
  position: "sticky",
  top: "100px",
  "&:hover": {
    background: "transparnt",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
    bottom: 0,
    color: "#D7282F !important",
    height: "1.5px",
  },
  "& .MuiTab-root": {
    textTransform: "capitalize",
    fontSize: "14px",
    color: "#333333",
    minHeight: "40px",
    minWidth: "100px",
    padding: "13px 12px 10px 12px",
    "& svg": { margin: "0 3px", fontSize: 19 },
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    zIndex: 1,
    "& svg": { color: "#D7282F" },
  },

  "& .MuiTabs-flexContainer": {
    alignItems: "center",
  },
  ".icon-leadsblack:before": {
    color: "inherit"
  },
  "@media screen and (max-width: 900px)": {
    "& .MuiTabs-scroller": {
      background: "#f3f3f3",
      borderRadius: "50px"
    },
    "& .MuiTabs-indicator": {
      border: "none",
      background: "#fff",
      boxShadow: "0px 3px 3px rgba(150, 150, 150, 0.25)",
      borderRadius: "50px",
      height: "36px",
      minHeight: "36px",
      color: "#fff",
      position: "absolute",
      top: 6
    }
  },
  "& .MuiTabs-scroller": {
    borderBottom: "1px solid #e5e5e5",
  },
  "& .MuiButtonBase-root:hover": { color: "#d7282f" },
  "& .MuiTabs-scrollButtons": {
    width: 10,
    margin: "0 5px",
    "& svg": {
      background: "#ddd",
      borderRadius: "50px"
    }
  },
  "& .MuiTabs-root": { overflow: "visible" }
});
export const RfQTabBox = styled(Box)({
  "& i:before": {
    fontSize: "20px"
  },
  "& .MuiTabs-indicator:before": {
    content: "''",
    borderBottom: "6px solid #CC0000",
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    margin: "49px 0 19px",
    bottom: "-20px",
    position: "absolute",
    left: "42%",
    color: "#d7282f",
  },
});

export const Labeldata = styled("span")({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  "& .MuiTypography-root": {
    fontSize: "14px",
    padding: "0 0 0 5px"
  }

});
export const HelpIcon = styled(HelpOutlineIcon)({
  fontSize: "22px",
  zIndex: 1,
  margin: "0 0 0 -11px",
  padding: "0 7px 0 0px",
});
export const RfqGridContent = styled(Box)({
  padding: "12px"
});

export const RfqTableCoulmn = styled(Box)({
  height: "100%",
  "@media screen and (max-width: 900px)": {
    height: "400px",
  },
});
export const RfqDataGridStyle = {
  "& svg": {
    fontSize: "18px"
  },
  "& .MuiDataGrid-virtualScroller": {
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "3px",
      height: "6px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },
  },
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
    fontSize: "14px",
    color: "#1A2027",
    fontFamily: "Open Sans",
  },
  "& .MuiDataGrid-cell": {
    color: "#3E5060",
    fontSize: "13px",
    fontFamily: "Open Sans",
    cursor: "pointer",
    padding: "5px"
  },
  "& .MuiDataGrid-columnHeaders": {
    background: "#f8f8f8"
  }
};

/******************** Start Stying for Common Menu for all modules ********************/

/****====Start Rfq List page left sidebar stylin ====****/
export const RfqFilterCoulm = styled("div")({
  borderRadius: "4px",
  position: "relative",
  overflow: "hidden",
  border: "1px solid #E0E3E7",
  height: "90%"
});
/****** Start Common Search Bar for CRM Module ******/
export const SearchCoulmBox = styled(Box)({
  padding: "12px 7px",
});
export const SidebarTitleArea = styled(Box)({
  padding: "7px",
});

export const RfqSearchCommon = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "100%",
  padding: "0",
  borderRadius: "4px",
  margin: "6px 0px 2px",
  "& .MuiInputBase-input": {
    paddingTop: "6px",
    paddingBottom: "6px",
    transition: "all 2s ease-in",
  },
  "& button": {
    padding: "0",
    margin: "3px 0px 3px -5px"
  },
  "& svg": {
    color: "#515151",
    fontSize: "19px",
  },
}));
export const SidebarTitle = styled(Typography)({
  fontSize: "14px",
  color: "#000",
  fontWeight: 600,
  padding: "0",
  margin: "0",
});
export const FilterIconStyle = styled(FilterAltOutlinedIcon)({
  fontSize: "18px",
  margin: "7px 3px -4px -2px",
});
export const LeftFilterMenuList = styled(Box)({
  padding: "8px 0 10px 8px",
  height: "355px",
  overflowY: "scroll",
  "& .MuiTabPanel-root": {
    padding: 0,
  },
  "& .MuiTypography-root": {
    fontSize: "13px",
  },

  "& .MuiFormHelperText-root::before": {
    display: "none"
  }
});
export const ApplyButtonWrapper = styled(Box)({
  gap: 10,
  display: "flex",
  justifyContent: "right",
  position: "absolute",
  width: "100%",
  bottom: "10px",
  borderTop: '1px solid #E0E3E7',
  padding: "7px 7px 0",
  background: "#fff",
  boxShadow: "0 -2px 4px -1px rgba(0,0,0,.15)",
});
export const ActiveBtn = {
  background: "#D7282F",
  opacity: "85%",
  color: "#fff",
  border: "1px solid #D7282F",
  transition: 'all ease .5s',
};
export const FilledButton = styled(Button)({
  background: "#D7282F",
  opacity: "85%",
  borderRadius: "3px",
  border: "1px solid #D7282F !important",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 25px",
  minWidth: "auto",
  textTransform: "capitalize",
  height: "30px",
  "&:svg": { fontSize: "27px" },
  "&:hover": {
    background: "#fff",
    color: "#D7282F",
  },
});
export const AllLadsBtn = styled(Button)({
  color: "#fff",
  background: "#D7282F",
  opacity: "85%",
  borderRadius: 4,
  height: "30px",
  fontWeight: 600,
  fontSize: "13px",
  textTransform: "capitalize",
  "& .MuiSelect-select": {
    borderRadius: "4px",
    color: "#fff !important",
    padding: "6px 10px",
    fontWeight: 600,
  },
  "&:hover": {
    background: "#D7282F",
    color: "#fff",
  },
  "& .MuiFormLabel-root": { color: "#fff" },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& svg": { color: "#fff", width: 17 },
});

export const OutLinedButton = styled(Button)({
  borderRadius: "3px",
  border: "1px solid #BFBFBF",
  background: "transparent",
  color: "#4A4A4A",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 12px",
  minWidth: "auto",
  width: "max-content",
  textTransform: "capitalize",
  height: "30px",
  "& svg, i": { fontSize: "16px !important" },
  "&:hover": {
    background: "#D7282F",
    color: "#fff !important",
    border: "1px solid #D7282F",
    opacity: "85%",
  },
  "&:hover img": {
    filter: "brightness(0) invert(1)"
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "& .MuiButton-startIcon": {
    marginRight: "3px",
  },
  "@media screen and (max-width:767px)": {
    fontSize: "12px"
  },
  "& img": {
    filter: "grayscale(100%)",
    fontSize: "18px",
  },
});
export const TabsStyleindicator = {
  "&:hover": {
    backgroundColor: "transparnt",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#D7282F",
    bottom: 0,
    color: "#D7282F !important",
    height: "1.5px",
  },
  "& .MuiTab-root": {
    textTransform: "capitalize",
    fontSize: "14px",
    // margin: "-2px 0 0",
    color: "#333333",
    minHeight: "50px",
    minWidth: "100px",
    "& svg": { margin: "0 3px", fontSize: 19 },
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    zIndex: 1,
    "& svg": { color: "#D7282F" },
  },

  "& .MuiTabs-flexContainer": {
    alignItems: "center",
    // borderBottom: "1px solid #e5e5e5",
  },
  ".icon-leadsblack:before": {
    color: "inherit"
  },
  "@media screen and (max-width: 900px)": {
    "& .MuiTabs-scroller": {
      background: "#f3f3f3",
      borderRadius: "50px"
    },
    "& .MuiTabs-indicator": {
      border: "none",
      background: "#fff",
      boxShadow: "0px 3px 3px rgba(150, 150, 150, 0.25)",
      borderRadius: "50px",
      height: "36px",
      minHeight: "36px",
      color: "#fff",
      position: "absolute",
      top: 6
    }
  },
  "& .MuiTabs-scroller": {
    borderBottom: "1px solid #e5e5e5",
    // margin: "0 10px"
  },
  "& .MuiButtonBase-root:hover": { color: "#d7282f" },
  "& .MuiTabs-scrollButtons": {
    width: 10,
    margin: "0 5px",
    "& svg": {
      background: "#ddd",
      borderRadius: "50px"
    }
  },
  "& .MuiTabs-root": { overflow: "visible" }
};

export const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 0 10px",
  "@media screen and (max-width:730px)": {
    display: "block",
  },

});
export const RfqButtonContainerLeft = styled(Box)({
  display: "flex",
  gap: 10,
  alignItems: "center",
  "& .Viewchange": {
    "& i": { margin: "2px 1px 0 0" },
    "& .icon-listView": {
      fontSize: "9px !important",
    },
  },
  "@media screen and (max-width: 767px)": {
    margin: '0 0 7px',
  },
});

export const StyledMenu3 = styled(Menu)({
  "& .MuiPaper-root": {
    borderRadius: 6,
    width: "138px",
    border: "1px solid #D2D2D2",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },
    boxShadow: "none"
  },
  "& .MuiList-root": {
    padding: 0,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "13px"
  },
  "& .MuiListItemIcon-root": {
    minWidth: 25,
  },
  "& .rightcheckicon": {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    transition: 'all ease .1s',
  },
  "& .MuiButtonBase-root:hover": {
    "& .rightcheckicon": {
      visibility: "visible"
    }
  }
});

/****** End Common Search Bar for CRM Module ******/

/****====end  Rfq List page left sidebar stylin ====****/

/********============== Start Enquiry Detail tab styling =============******/
export const EnquiryDetailData = styled(Box)({
  alignItems: "center",
  padding: "1rem 0px",
  width: "100%",
  "& .labeltext": {
    background: "#F5D5D6",
    color: "#D7282F",
    padding: "4px 8px",
    borderRadius: "50px",
    fontWeight: 600,
    lineHeight: "28px"
  }
});

export const AccordionBorder = styled(Box)({
  border: "1px solid #d7d7d7",
  margin: "0 0 15px",
  borderRadius: "4px",
  "& .MuiPaper-root": {
    background: "transparent"
  },
});

export const DetailTopButtons = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#D7282F",
    fontWeight: 600,
  },
  "@media screen and (max-width: 767px)": {
    display: "block",
  }
});
export const ProductNameBox = styled(Box)({
  display: "flex",
  gap: "10px",
});
export const ProductImageBox = styled(Box)({
  width: "60px",
  height: "60px",
  border: "1px solid #D2D2D2",
  padding: "5px",
  "& img": {
    width: "100%"
  }
});

export const ProductTitle = styled(Typography)({
  color: "#231F20",
  fontSize: 16,
  fontWeight: 600,
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    cursor: "pointer"
  },
  "@media screen and (max-width: 767px)": {
    fontSize: 14,
  }
});
export const ProductID = styled(Typography)({
  color: "#231F20",
  fontSize: 12,
  "& span": {
    fontWeight: 600
  },
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    cursor: "pointer"
  },
});


export const ProductBoxLeft = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  gap: 10,
  fontSize: "16px !important",
  color: "#4A4A4A",
});

export const ProDuctTypeRow = styled(Box)({
  display: "contents",
  justifyContent: "flex-start",
  gap: 10,
  // "& .MuiTypography-root": {
  //   color:"#4A4A4A"
  // },
  "@media screen and (max-width: 767px)": {
    gap: 5,
    "& .MuiTypography-root": {
      fontSize: "14px",
    }
  },

});
export const BoxAccordianInner = styled(Box)({
  margin: "0 0 15px",
  borderRadius: "8px"
});
export const CategoryName = styled(Typography)({
  fontSize: 12,
  "& span": {
    color: "#006FBF",
  },
});
export const ColorBoxValue = styled(Box)({
  display: "flex",
  alignItems: "baseline",
  gap: 10,
});
export const RedboxValue = styled("div")({
  background: "#FFE8EC",
  padding: "1px 4px",
  borderRadius: "4px",
  cursor: "pointer",
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#D7282F",
    fontWeight: 600,
  },
  "@media screen and (max-width: 767px)": {
    "& .MuiTypography-root": {
      fontSize: 12,
    }
  }
});


export const ProductIDSection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 6,
  "& .MuiTypography-root": {
    padding: "0 8px 0 0px",
  }
});

export const GreenboxValue = styled("span")({
  background: "#E2F7DD",
  padding: "1px 4px",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "7px",
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#57874B",
    fontWeight: 600,
    display: "table-row",

  },
  "& .smallgreenbox": {
    "& .MuiTypography-root": {
      fontSize: 12,
    },
  }
});
export const GreenboxValuesmall = styled("div")({
  background: "#E2F7DD",
  padding: "1px 4px",
  borderRadius: "4px",
  cursor: "pointer",
  "& .MuiTypography-root": {
    fontSize: 10,
    color: "#57874B",
    fontWeight: 600,
  },
});
export const ProductBoxRight = styled(Box)({
  textAlign: "right",
  // float: "right",
  alignItems: 'center',
  justifyContent: "space-between",
  gap: "10px"
});
export const LocationDiv = styled(Box)({
  borderRight: "1px solid #C1BEBE",
  padding: "0 20px 0 7px"
});
export const EDetailButtons = styled(Box)({
  display: "flex",
  gap: 10,
  "@media screen and (max-width: 767px)": {
    display: "grid"
  }
});

export const CountryName = styled(Typography)({
  color: "#4A4A4A",
  fontSize: 16,
  fontWeight: 600,
});
export const DateAndTime = styled(Typography)({
  fontSize: 12,
  color: "#4A4A4A",

  "& svg": {
    fontSize: 15,
    color: "#223354",
    opacity: "50%",
    margin: "0px 5px -3px",
  },
});
export const ProductEnquiryData = styled(Box)({});
// export const InfoButtonContainer = styled(Box)({
//   display: "flex",
//   justifyContent: "end",
//   gap: 10,
//   margin: "0 0 1rem",
//   "@media screen and (max-width: 767px)": {
//     justifyContent: "flex-start",
//     padding: "10px 0 0",
//   }
// });
export const ProductBgInfo = styled(Box)({
  background: "#F5F5F5",
  borderRadius: "8px 8px 0 0",
  padding: 16,
  "@media screen and (max-width: 767px)": {
    padding: "7px"
  }
});
export const TopData = styled(Box)({
  // display: "flex",
  // justifyContent: "space-between",
  display:"inline-flex",
  padding: "0 16px 10px",
  alignItems: "center",
  "& .MuiTypography-root": {
    fontSize: 16,
    fontWeight: 600,
  },
  "& p": {
    fontSize: 14,
    fontWeight: 600,
    margin:"-1px 0 0 1rem"
  },
  "@media screen and (max-width: 767px)": {
    "& .MuiTypography-root": {
      fontSize: 14,
    }
  }
});
export const ProductDetailtable = styled("div")({
  padding: "0 16px 16px",
  '& .MuiTable-root': {
    '& .MuiTableHead-root': {
      backgroundColor: '#F5F5F5',
      '& .MuiTableCell-root': {
        whiteSpace: 'nowrap',
        padding: '12px 8px',
        fontWeight: '600',
        fontSize: '13px',
        // '&:last-child': {
        //   position: 'sticky',
        //   right: '0',
        //   backgroundColor: '#fbfbfb',
        //   zIndex: '2',
        //   textAlign: 'center',
        //   // background:"#fbfbfb"
        // },
      },
    },
    '& .MuiTableBody-root': {
      '& .MuiTableCell-root': {
        padding: '10px 8px',
        // '&:last-child': {
        //   position: 'sticky',
        //   right: '0',
        //   backgroundColor: '#fbfbfb',
        //   zIndex: '2',
        //   textAlign: 'center',
        //   // boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        // },
        '& .MuiSvgIcon-root': {
          fontSize: '20px',
          color: '#6c6c6c',
        },
      },
      '& .MuiFormControl-root': {
        width: '190px',
        '& .MuiFormLabel-root': {
          fontSize: '13px',
          '&.Mui-focused': {
            transform: 'translate(14px, -9px) scale(0.85)',
          },
        },
      },
    },
  },
});
export const UnitPriceContainer = styled(Box)({
  display: "flex",
  justifyContent: "end",
  gap: 10,
  margin: "10px 0 0",
  "@media screen and (max-width: 600px)": {
    display: "grid"
  }
});
export const UnitPriceBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
});

export const UnitPrice = styled("div")({
  background: "#EEEEEE",
  borderRadius: 4,
  padding: "6px 15px",
  fontSize: 14,
  fontWeight: 600,
  color: "#231F20",
});
export const UnitPriceValue = styled("div")({
  background: "#EEEEEE",
  borderRadius: 4,
  padding: "6px 15px",
  fontWeight: 400,
  fontSize: 14,
  color: "#231F20",
});

export const EnquiryAddproduct = {
  "& .MuiPaper-root": {
    width: "1400px",
    maxWidth: "1400px",
  },
};
export const ButtonSimple = styled(Button)({
  background: "#DBE8F9",
  color: "#355F97",
  fontSize: "13px",
  boxShadow: "none !important",
  border: "1px solid inherit",
  textTransform: "capitalize",
  "&:hover": {
    background: "#c2d3eb",
  },
});
export const ButtonByOrder = styled(Button)({
  background: "#E7E7E7",
  color: "#3A3A3A",
  fontSize: "13px",
  boxShadow: "none !important",
  border: "1px solid inherit",
  textTransform: "capitalize",
  "&:hover": {
    background: "#d3d3d3",
  },
});
export const ButtonQuantity = styled(Button)({
  background: "#ECFBE6",
  color: "#3BB900",
  fontSize: "13px",
  boxShadow: "none !important",
  border: "1px solid #DFF2D7",
  textTransform: "capitalize",
  "&:hover": {
    background: "#e3ffd8",
  },
});

export const SmallRedOutineBtn = styled(Button)({
  minWidth: "65px",
  borderRadius: "3px",
  // background: "#fff",
  background: "transparent",
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 9px",
  textTransform: "capitalize",
  height: "30px",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    background: "#D7282F",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
});
export const SmallBlackOutineBtn = styled(Button)({
  minWidth: "65px",
  borderRadius: "3px",
  // background: "#fff",
  background: "transparent",
  border: "1px solid #231F20",
  color: "#231F20",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 9px",
  textTransform: "capitalize",
  height: "30px",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    background: "#231F20",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
});
export const BuyerDetailTop = styled(Box)({
  position: "sticky",
  top: 0,
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  padding: "1px 0 10px",
  margin: "0 0 20px",
  zIndex: "100"
});

export const EditModeProductTitle = styled(Box)({
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // background: "#f3f3f3",
  background: "#fff",
  zIndex: "10",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
})

export const EditModeProductContent = styled(Box)({
  padding: "2rem 1rem"
});
export const ButtonActionInfo = styled(Box)({
  display: "flex",
  justifyContent: "right",
  gap: 10,
  // background:"#f5f5f5",
  padding: "10px"
});
export const EditSwipeableDrawerStyle = styled(SwipeableDrawer)({
  "@media (max-width:900px)": {
    "& .MuiPaper-root": {
      width: "95%"
    }
  }
});
export const EditDrawerPanel = styled(Box)({
  width: "800px",
  "@media (max-width:900px)": {
    width: "100%"
  }
});
export const DialogProductInfo = styled(Box)({
  display: "flex",
  gap: 10,
  alignItems: "center",
});
export const EnquiryLeadImage = styled(Box)({
  width: "40px",
  height: "40px",
  "& img": {
    width: "100%",
    height: "100%",
    borderRadius: "50px",
  }
});
export const HeadingInfo = styled(Box)({
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "12px"
  },
  "& .myproductname": {
    fontSize: "14px",
    fontWeight: 600,
  },
  "& .pricetyype": {
    background: "#E2F7DD",
    color: "#57874B",
  },
  "& .buyernamein": {
    color: "#231F20",
    borderRight: "2px solid #6e6769",
    padding: "0 2px 0 0px",
    margin: "10px 8px 0 0px"
  }
});
export const ProductBasicInformation = styled(Box)({
  padding: "12px",
  border: "1px solid #ddd",
  margin: "6px 14px",
  borderRadius: "4px"
});
export const ProductTypeTypo = styled(Typography)({
  fontSize: "14px",
  fontWeight: "600"
});

export const InfoButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
});
export const RedOutLinedButton = styled(Button)({
  borderRadius: "3px",
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "14px",
  fontWeight: 600,
  padding: "0 12px",
  minWidth: "auto",
  textTransform: "capitalize",
  height: "32px",
  "&:svg": { fontSize: "27px" },
  "&:hover": {
    background: "#FFD7D7",
    color: "#D7282F",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
});

/***** Icon datagrid  ******/
export const DataGridStyleIcon = {
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "&.MuiDataGrid-root": {
    height: "90%",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
    fontSize: "14px",
    color: "#1A2027",
    fontFamily: "Open Sans",
  },
  "& .MuiDataGrid-cell": {
    color: "#3E5060",
    fontSize: "13px",
    fontFamily: "Open Sans",
    cursor: "pointer",
  },
  "& .Mui-checked": {
    color: "#d7282fcc !important",
  },
  "& .MuiSvgIcon-root": {
    // color: "#D7282F",
    fontSize: 16,
  },
  "& .MuiDataGrid-columnSeparator": { display: "none" },
  ".MuiCheckbox-root": {
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "1px solid #D7282F",
      borderRight: "1px solid #D7282F",
      position: "absolute",
      top: "8px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
  },
};

export const OuterContentAccor = styled(Box)({
  margin: "0 10px"
});
export const MultipleButton = styled(Box)({
  display: "flex",
  gap: "5px"
});
export const TotalProductCount = styled(Box)({
  justifyContent: "right",
  display: "flex",
  "& .totaldivider": {
    margin: "10px 0"
  }
});
export const TotalProductBox = styled(Box)({
  border: "1px solid #DCDCDC",
  borderRadius: 10,
  padding: "16px 14px",
  marginTop: "10px",
  background: "#FBFBFB",
  width: "300px",
  "& .MuiTypography-root": {
    color: "#4a4a4a",
    fontSize: "13px",
  },

});
export const AccordionContent = styled(Box)({
  border: "1px solid #D2D2D2",
  borderRadius: "10px",
  margin: "16px 0 10px"
});
export const SmallFilledBtn = styled(Button)({
  minWidth: "70px",
  borderRadius: "3px",
  background: "#D7282F",
  opacity: "85%",
  border: "1px solid #D7282F",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 12px",
  textTransform: "capitalize",
  height: "30px",
  "&:svg": { fontSize: "27px" },
  "&:hover": {
    background: "#D7282F",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
});
export const OverViewInfoP = styled(Box)({
  // padding: "1rem",
  "& .MuiTypography-root": {
    color: "#231F20",
    // fontSize: "12px"
  }
});
export const RProductLabel = styled(Typography)({
  fontWeight: 600
});
export const AmountValue = styled(Typography)({
  "& span": {
    background: "#F5D5D6",
    borderRadius: "20px",
    padding: "1px 10px",
    fontWeight: 600,
    color: "#d7282f"
  }
});
export const QuantityBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  background: "#FFF1F2",
  borderTop: "1px solid #FFCED2",
  padding: "1rem",
  borderRadius: "0 0 10px 10px",
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "12px",

  },
  "& span": {
    color: "#231F20",
    fontWeight: 600,
    fontSize: "14px",
    margin: "0 8px"
  },
  "& .MuiFormLabel-root": {
    background: "transparent"
  }
});
export const RightSection = styled(Box)({
  // float: "right",
  // width: "50%",

});
export const SimpleQuantityCompo = styled(Box)({
  "& .simplqtybox": {
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
  }
});
export const GreyBoxInfo = styled(Box)({
  background: "#F5F5F5",
  borderRadius: "8px 8px 0 0",
  padding: 0,
  border: "1px solid #D2D2D2",
  margin: "0 10px 16px",
  "& .customize-title": {
    padding: "10px 16px"
  },
  "@media screen and (max-width: 767px)": {
    padding: "7px"
  }
});
export const CustomizeInfoInn = styled(Box)({
  background: "#eaeaea",
  borderTop: "1px solid #fff",
  margin: "0 10px 10px",
  padding: "10px"
});
export const CustomizeInfosection = styled(Box)({
  background: "#fff",
  borderRadius: "4px",
  padding: "10px",
  width: "100%",
  height: "100%",
  "& .Myinfovalues": {
    borderLeft: "1px solid #ddd",
    padding: "0 20px",
    height: "100%"
  }
});
export const CustomInfoTitle = styled(Box)({
  color: "#000",
  fontSize: "14px",
  fontWeight: "600",
  padding: "4px 0px"
});
export const CustomInfoValue = styled(Box)({
  color: "#1C1C1C",
  fontSize: "13px",
});
export const CustomInfoValue2 = styled(Box)({
  color: "#606060",
  fontSize: "12px",
});


export const CustomSelectedChip = styled(Box)({
  display: "block",
});
export const CountryChip = styled("span")({
  color: "#fff",
  fontSize: "12px",
  background: "#d7282f",
  borderRadius: "4px",
  padding: "2px 5px",
  margin: "0 2px 2px 0",
  display: "inline-block"
});

export const DestinationPort = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "& .MuiTypography-root": {
    fontSize: "13px"
  }
});
export const DestinationPortInn = styled(Box)({
});

/**===== New UI Updation =====**/
export const ProductTypeOption = styled(Box)({
  position: "relative"
});
export const MainRightData = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%"
});
export const PTypeImage = styled("span")({
  background: 'url("/assets/ribon.svg") no-repeat center',
  color: "#ffffff",
  borderRadius: "6px",
  zIndex: 10,
  fontSize: "11px",
  width: "100px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  backgroundSize: "100%",
  // position: "absolute",
  top: "-2px",
  right: "0",
  "& .MuiTypography-body1": {
    margin: "2px 0 0 20px",
    fontWeight: 600,
    textTransform: "capitalize",
    position: "relative",
    top: "-3px",
    fontSize: "12px",
  },
});
export const ProductFeatureSection = styled(Box)({
  background: "#F3F9FF",
  padding: "18px 10px 10px",
  margin: "10px 0",
});
export const SpecificationHeading = styled(Typography)({
  fontSize: "16px",
  color: "#231F20",
  fontWeight: 600,
});
export const BrandBoxStyle = styled(Box)({
  "& .MuiTypography-h6": {
    fontSize: "12px",
    color: "#4A4A4A !important",
    fontWeight: "normal",
  },
  "& .MuiTypography-body1": {
    fontSize: "16px",
    color: "#D7282F !important",
    fontWeight: "600",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    "@media (max-width: 1600px)": {
      fontSize: "16px",
    },
    "@media (max-width: 800px)": {
      fontSize: "13px",
    },
  },
});

export const FeatureOpt = styled(Box)({
  display: "flex",
  "& .MuiTypography-h6": {
    fontSize: "12px",
    color: "#4A4A4A",
    fontWeight: "normal",
    textTransform: 'capitalize'
  },
  "& .MuiTypography-body1": {
    fontSize: "16px",
    color: "#000000",
    fontWeight: "600",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "@media (max-width: 767px)": {
      fontSize: "14px",
    },
  },
  "& .view_more_opt": {
    color: "#d7282f",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "none"
    }
  }
});
export const InnerOpt = styled(Box)({
  borderLeft: "1px solid #BDBDBD",
  paddingLeft: "10px"
});
export const DataProductTypeData1 = styled(Box)({
  background: "#F4F6FA",
  padding: "6px 10px",
  margin: "2px 0 0",
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: "600",
  },
  span: {
    borderRadius: "4px",
    padding: "0px 8px",
    backgroundColor: "#fff",
    margin: "0 4px",
  },
  "& .by-orderp": {
    border: "1px solid #D7282F",
    color: "#D7282F",
  },
  "& .in-stockp": {
    border: "1px solid #34A853",
    color: "#34A853",
  },
});
export const DataProductTypeInner = styled(Box)({
  background: "#fff",
  padding: "10px",
  margin: "10px 0 0",
  borderRadius: "4px",
  "& svg": {
    fontSize: "16px"
  },
});
export const PriceQuoteColumn = styled(Box)({
});
export const PriceQuoteInfo = styled(Box)({
  border: "1px solid #dadada",
  padding: "3px 40px",
  margin: "0 6px 0 0",
  borderRadius: "5px",
  textAlign: "center",
  "& .MuiTypography-h5": {
    fontSize: "16px",
    color: "#D82E34",
    fontWeight: 700,
  },
  "& .MuiTypography-body1": {
    fontSize: "12px",
    color: "#4A4A4A",
  },
});
export const PriceTermVlue = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "100%",
  justifyContent: "center",
  paddingLeft: "0px",
  paddingRight: "16px",
  position: "relative",
  "& .MuiSvgIcon-root": {
    fontSize: "15px",
    color: "#0AA133",
    margin: "4px 3px -3px"
  },
  "@media (max-width: 900px)": {
    right: "0",
    backgroundColor: "#f3f3f3",
    borderColor: "#e3e3e3",
  },
});


export const OverViewHeading = styled(Box)({
  background: "#EBF4FD",
  padding: "10px",
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: "600",
  },

});
export const OverViewSection = styled(Box)({
  padding: "9px 12px",
  borderBottom: "1px solid #e6e6e6",
});
export const OverViewInfo = styled(Box)({
  padding: "0 10px",
  borderLeft: "1px solid #ddd",

});
export const OverinfoLabel = styled(Typography)({
  color: "#000",
  fontSize: "12px",
});
export const OverinfoValue = styled("p")({
  color: "#000",
  fontSize: "15px",
  fontWeight: '500'
});
export const OverViewSection2 = styled(Box)({
  padding: "0",

});
export const HeadingMain = styled(Typography)({
  padding: "18px 12px",
  fontSize: "12px",
  color: "#d7282f",
  fontWeight: 600,
});


export const AddButtonSection = styled(Box)({
  margin: "7px 12px 0",
  "& span": {
    cursor: "pointer",
    border: "1px solid #d7282f",
    padding: "2px 3px",
    display: "inline-block",
    borderRadius: "4px",
    margin: "0 3px",
    transition: "all .4s ease-in",
    "&:hover": {
      background: "#d7282f",
      "& .MuiTypography-root": {
        color: "#fff",
      },
    },
    "& .MuiTypography-root": {
      fontSize: "12px",
      color: "#d7282f",
      fontWeight: 600,
    },
  }
});
export const TopRightSection = styled(Box)({
  display: "flex",
  gap: "10px",
  "& button": {
    background: "#fff",
    color: "#d7282f",
    fontSize: "13px",
    boxShadow: "none !important",
    border: "1px solid #d7282f",
    textTransform: "capitalize",
    "&:hover": {
      background: "#d7282f",
      color: "#fff",
      border: "1px solid #d7282f",
    },
  }
});
export const CreatedDate = styled(Box)({
  "& .MuiTypography-h6": {
    fontSize: "13px",
    color: "#231F20",
    fontWeight: 600,
  },
  "& .MuiTypography-body1": {
    fontSize: "13px",
    color: "#4A4A4A",
  },
});
























