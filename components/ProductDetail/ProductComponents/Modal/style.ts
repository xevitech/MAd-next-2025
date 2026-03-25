import { Box, Typography, styled } from "@mui/material";

export const ModalHeader = styled(Box)(() => ({
  "@media (max-width: 600px)": {
    display: "flex",
    alignItems: "center",
  },
  "& .MuiTypography-body1": {
    fontWeight: "700",
    "@media (max-width: 600px)": {
      fontSize: "14px",
    },
    "@media (max-width: 480px)": {
      fontSize: "12px",
    },
  },
}));
export const CloseIcon = styled(Box)(() => ({
  cursor: "pointer",
  color: "#D7282F",
  background: "#FFE8EC",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
}));

export const TableHeading = styled(Box)(() => ({
  padding: "16px 0 0",
}));

export const TableCol = styled(Box)(() => ({
  "& .TableContainer": {
    boxShadow: "inherit",
    border: "1px solid #d2d2d2",
    padding: "16px 0 0px",
    borderRadius: "8px",
    "& .CustomTable": {
      "& th": {
        padding: "6px 6px",
        fontWeight: "600",
        fontSize: "13px",
      },
      "& td": {
        padding: "0px 6px",
        fontWeight: "500",
        fontSize: "13px",
      },
      "& .indentCheckbox": {
        position: "relative",
        left: "18px",
      },
      "& .MuiTableBody-root": {
        "& .MuiTableRow-root": {
          transition: "all ease .3s",
          "&:hover": {
            background: "#FFF0EF !important",
          },
        },
      },
    },
  },
}));

export const GroupIcons = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  "& .CollapseIcon": {
    fontSize: "20px",
    color: "#D7282F",
    cursor: "pointer",
    "&:hover": {
      color: "black",
    },
  },
}));

export const ConfigTable = styled(Box)(() => ({
  "& .MuiPaper-root": {
    border: "1px solid #dddddd",
    boxShadow: "none",
    "& .MuiTableContainer-root": {
      "&::-webkit-scrollbar": {
        width: "8px",
        height: "10px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "10px",
      },
    },
    "& .MuiTable-root": {
      "& .MuiTableBody-root": {
        "& .MuiTableRow-root": {
          "&:nth-child(odd)": {
            backgroundColor: "#fafafa",
          },
          "&:hover": {
            backgroundColor: "#0000000a",
          },
        },
      },
    },
  },
  "& .CustomTable": {
    "& .tableHead": {
      "& th": {
        backgroundColor: "#f8f8f8",
      },
    },
    "& .MuiPaper-root": {
      border: "3px solid #dddddd",
    },
    "& th": {
      padding: "8px 6px",
      fontWeight: "600",
      fontSize: "13px",
      width: "180px",
    },
    "& th:nth-of-type(1)": {
      width: "100px",
    },
    "& th:nth-of-type(2)": {
      width: "130px",
    },

    "& td": {
      padding: "2px 6px",
      fontWeight: "500",
      fontSize: "13px",
      width: "180px",
      transition: "all ease .3s",
    },
    "& td:nth-of-type(1)": {
      width: "100px",
    },
    "& td:nth-of-type(2)": {
      width: "130px",
    },
    "& .indentCheckbox": {
      position: "relative",
      left: "18px",
    },
    "& .SubTableBody": {
      "& .MuiTableBody-root": {
        "& .MuiTableRow-root": {
          transition: "all ease .3s",
          "&:hover": {
            background: "#FFF0EF !important",
            "& .FirstRow": {
              background: "#FFF0EF !important",
            },
          },
        },
      },
    },
    "& .rowHeading": {
      "& td": {
        padding: "8px 6px",
        "& .MuiSvgIcon-root": {
          fontSize: "20px",
          color: "#D7282F",
          cursor: "pointer",
          "&:hover": {
            color: "#AC0007",
          },
        },
      },
    },
  },
}));

export const DrawerContainer = styled(Box)(() => ({
  padding: "0 16px",
  width: "1300px",
  // position: "relative",
  overflow: "hidden",
  "@media (max-width: 1300px)": {
    width: "100%",
  },
  "&.active": {
    "& .Login-modal": {
      opacity: "1",
      pointerEvents: "inherit",
      "& .Zoom-box": {
        opacity: "1",
        transform: "scale(1)",
      },
    },
  },
}));
export const LoginModal = styled(Box)(() => ({
  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "4",
  backgroundColor: "rgba(0,0,0, 0.5)",
  opacity: "0",
  pointerEvents: "none",
  transition: "all ease .5s",
}));
export const ZoomBox = styled(Box)(() => ({
  transform: "scale(1.5)",
  transition: "all ease .3s",
  opacity: "0",
  "& .New-user": {
    marginTop: "0!important",
    boxShadow: "none",
    "& .SignUp": {
      paddingTop: "0",
      boxShadow: "none",
      paddingBottom: "0",
      "& .MuiTypography-body1": {
        paddingTop: "0",
        fontWeight: "600",
        fontSize: "18px",
        color: "#000000",
        justifyContent: "flex-start",
        gap: "4px",
        alignItems: "center",
      },
    },
  },
}));
export const DrawerHeader = styled(Box)(() => ({
  position: "sticky",
  top: "0",
  display: "flex",
  gap: 10,
  alignItems: "center",
  color: "#000000",
  justifyContent: "space-between",
  paddingBottom: "6px",
  paddingTop: "10px",
  backgroundColor: "#ffffff",
  zIndex: "2",
  "& .MuiSvgIcon-root": {
    cursor: "pointer",
    "&:hover": {
      color: "#D7282F",
    },
  },
}));
export const DrawerBody = styled(Box)(() => ({
  height: "calc(100vh - 137px)",
  overflowY: "auto",
  paddingRight: "4px",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#d2d2d2",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#888888",
  },
}));
export const TermLbl = styled(Box)(() => ({
  backgroundColor: "#E6FFDB",
  border: "1px solid #B1E09C",
  borderRadius: "4px",
  fontSize: "12px",
  padding: "0px 5px",
  marginLeft: "6px",
}));
export const SubjectCol = styled(Box)(() => ({
  padding: "16px",
  border: "1px solid #dddddd",
}));
export const UserthumbImg = styled(Box)(() => ({
  display: "flex",
  position: "relative",
  "& img": {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
  },
}));
export const UserAddress = styled(Box)(() => ({
  "& .MuiTypography-h6": {
    fontSize: "13px",
    fontWeight: "700",
  },
  "& .MuiTypography-subtitle1": {
    fontSize: "13px",
    color: "#000000",
    lineHeight: "18px",
    "& .MuiSvgIcon-root": {
      fontSize: "16px",
      cursor: "pointer",
      margin: "-6px 7px 0",
      "&:hover": {
        color: "#d32f2f",
      },
    },
  },
}));
export const PlanBadge = styled(Box)(() => ({
  width: "20px",
  height: "20px",
  position: "absolute",
  right: "-4px",
  bottom: "-2px",
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "20px",
    height: "20px",
  },
}));

export const TabsData = styled(Box)(() => ({
  width: "100%",
  marginTop: "16px",
  "& .MuiTabs-root": {
    "& .MuiTab-root": {
      textTransform: "capitalize",
      fontSize: "14px",
      fontWeight: "600",
      color: "#000000",
      minHeight: "38px",
      padding: "6px 16px ",
      backgroundColor: "#FBFBFB",
      letterSpacing: "0px",
      "@media (max-width:900px)": {
        fontSize: "14px",
      },
      "&:hover": {
        color: "#D7282F",
      },
      "& i": {
        fontSize: "16px",
      },
      "&.Mui-selected": {
        color: "#D7282F",
        backgroundColor: "#F1F1F1",
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#D7282F",
    },
  },
}));

export const ConfigTableList = styled(Box)(() => ({
  width: "100%",
  "& .MuiTypography-h6": {
    fontSize: "16px",
    fontWeight: "700",
    margin: "18px 0 8px 0",
  },
}));
export const OptionContainer = styled(Box)(() => ({}));

export const Options = styled(Box)(() => ({
  height: "100%",
  marginTop: "0px",
  "& .MuiFormGroup-root": {
    height: "100%",
    "&.active": {
      "& .MuiFormControlLabel-root": {
        borderColor: "#D7282F",
        backgroundColor: "#FFF3F3",
        "& .MuiTypography-body1": {
          color: "#D7282F",
        },
        "& .MuiButtonBase-root": {
          opacity: "1",
        },
      },
    },
  },
  "& .MuiFormControlLabel-root": {
    border: "1px solid #DDDDDD",
    borderRadius: "6px",
    padding: "12px 12px 12px 18px",
    margin: "0",
    position: "relative",
    cursor: "pointer",
    height: "100%",
    "& .MuiButtonBase-root": {
      position: "absolute",
      left: "-11px",
      padding: "0",
      width: "20px",
      height: "20px",
      border: "1px solid #D7282F",
      backgroundColor: "#ffffff",
      opacity: "0",
      "&:before": {
        content: '" "',
        width: "4px",
        height: "8px",
        borderBottom: "2px solid #D7282F",
        borderRight: "2px solid #D7282F",
        transform: "rotate(45deg)",
        position: "relative",
        top: "-1px",
      },
      "& .MuiSvgIcon-root": {
        display: "none",
      },
    },
    "& .MuiTypography-body1": {
      fontSize: "13px",
      color: "#000000",
    },
  },
}));

export const ConfigureTable = styled(Box)(() => ({
  width: "100%",
  paddingTop: "12px",
  "& .MuiPaper-root": {
    boxShadow: "none",
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#d2d2d2",
      borderRadius: "10px",
      "&:hover": {
        background: "#6d6d6d",
      },
    },
    "& .MuiTable-root": {
      "& .MuiTableHead-root": {
        "& .MuiTableCell-root": {
          whiteSpace: "nowrap",
          padding: "6px 8px",
          fontWeight: "600",
          fontSize: "13px",
          "&:last-child": {
            position: "sticky",
            right: "0",
            backgroundColor: "#FFFFFF",
            zIndex: "2",
            textAlign: "center",
          },
        },
      },
      "& .MuiTableBody-root": {
        "& .MuiTableCell-root": {
          padding: "10px 8px",
          "&:last-child": {
            position: "sticky",
            right: "0",
            backgroundColor: "white",
            zIndex: "2",
            textAlign: "center",
          },
          "& .MuiSvgIcon-root": {
            fontSize: "20px",
            color: "#6c6c6c",
          },
        },
        "& .MuiFormControl-root": {
          width: "190px",
          "& .MuiFormLabel-root": {
            fontSize: "13px",
            "&.Mui-focused": {
              transform: "translate(14px, -9px) scale(0.85)",
            },
          },
        },
      },
    },
  },
  "& .MuiButton-textPrimary": {
    color: "#D7282F",
    fontSize: "13px",
    textTransform: "capitalize",
    margin: "3px 0",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#b31118",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "17px",
      marginRight: "4px",
    },
  },
}));

export const RelatedTableList = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  "& .MuiPaper-root": {
    boxShadow: "none",
    margin: "0 -8px",
    width: "calc(100% - -16px)",
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#d2d2d2",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#888888",
    },

    "& .MuiTableRow-head": {
      "& .MuiTableCell-head": {
        borderBottom: "0",
        padding: "0 8px",
        fontWeight: "600",
        fontSize: "12px",
      },
    },
  },
  "& .MuiButton-textPrimary": {
    color: "#D7282F",
    fontSize: "13px",
    textTransform: "capitalize",
    margin: "3px 0",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#b31118",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "17px",
      marginRight: "4px",
    },
  },
  "& .MuiTable-root": {
    "& .MuiTableBody-root": {
      "& .MuiFormControl-root": {
        width: "100%",
        "& .MuiFormLabel-root": {
          fontSize: "13px",
          "&.Mui-focused": {
            transform: "translate(14px, -9px) scale(0.85)",
          },
        },
        "& .MuiInputBase-root": {
          backgroundColor: "#ffdcdc",
        },
      },
      "& .MuiTableCell-root": {
        padding: "6px 8px",
        "& .MuiSvgIcon-root": {
          fontSize: "20px",
          color: "#6c6c6c",
        },
      },
    },
  },
}));
export const AddSpecBtn = styled(Box)(() => ({
  borderTop: "1px solid #dddddd",
  width: "100%",
  marginTop: "8px",
  "& .MuiButtonBase-root": {
    margin: "0",
    padding: "6px 0px",
  },
}));

export const SummaryOuter = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: "10px",
}));
export const SummaryBox = styled(Box)(() => ({
  width: "100%",
  border: "1px solid #DDDDDD",
  borderRadius: "6px",
  padding: "8px",
}));
export const FooterBtn = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: "12px 0 ",
  borderTop: "1px solid #dddddd",
  marginTop: "16px",
  "& button": {
    borderRadius: "4px",
    padding: "6px 16px",
    marginRight: "10px",
  },
  "& .redfooterbtn": {
    background: "#d7282f",
    color: "#fff",
  },
  "& .greyfooterbtn": {
    color: "#a9a9a9",
    border: "1px solid #a9a9a9",
    background: "#fff",
  },
}));

export const DetailQuickSignPhoneField = styled(Box)(() => ({
  "& .MuiFormControl-root": {
    "& .MuiTypography-body1": {
      fontSize: "12px !important",
      fontWeight: "normal !important",
      color: "rgba(0, 0, 0, 0.87) !important",
      padding: "0 3px",
    },
  },
}));
export const HeaderBreadcrumb = styled(Box)(() => ({
  backgroundColor: "#F5F5F5",
  padding: "8px 10px",
  borderRadius: "6px",
  "& .MuiTypography-h6": {
    fontSize: "13px",
    color: "#000000",
    "& span": {
      fontWeight: "600",
    },
  },
}));

export const ProductWImg = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "8px 0",
  gap: "16px",
  "@media (max-width:900px)": {
    // display: "block",
    textAlign: "center",
  },
}));

export const FeatureProdImg = styled(Box)(() => ({
  padding: "6px",
  border: "1px solid #DDDDDD",
  width: "130px",
  height: "100px",
  display: "flex",
  position: "relative",
  justifyContent: "center",
  "& img": {
    width: "100%",
    objectFit: "contain",
  },
}));
export const IdWName = styled(Box)(() => ({
  "& .MuiTypography-h5": {
    fontSize: "14px",
    fontWeight: "500",
    color: "#231F20",
    "@media (max-width:900px)": {
      fontSize: "13px",
    },
    "& span": {
      fontSize: "14px",
    },
  },
}));

export const ProductID = styled(Box)(() => ({
  backgroundColor: "#898989",
  borderRadius: "3px",
  color: "#ffffff",
  display: "inline-flex",
  marginBottom: "6px",
  padding: "0px 4px",
  fontSize: "10px",
  position: "absolute",
  right: "5px",
}));
export const ProdCompanyName = styled(Box)(() => ({
  fontSize: "12px",
  color: "#231F20",
  fontWeight: "400",
}));
export const QuoteDetail = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "14px",
  color: "#d7282f",
}));
export const OverviewCol = styled(Box)(() => ({
  marginTop: "16px",
  border: "1px solid #dddddd",
  paddingBottom: "16px",
  borderRadius: "4px",
  position: "relative",
  "& .MuiTypography-h6": {
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#F8F8F8",
    padding: "4px 10px",
    color: "#000",
    borderRadius: "4px",
  },
}));
export const LableValueTop = styled(Box)(() => ({
  minHeight: "84px",
  "&.CustomizeRequestOrigin": {
    minHeight: "0px !important",
    "& .MuiTypography-body1": {
      margin: "0 0 12px 0",
    },
  },
  "@media (max-width:1030px)": {
    minHeight: "100px",
  },
  "@media (max-width:900px)": {
    minHeight: "auto",
    margin: "0px 0 14px",
  },

  "& .MuiTypography-h3": {
    fontSize: "14px",
    color: "#000000",
    fontWeight: "600",
    marginBottom: "6px",
  },
  "& .MuiTypography-body1": {
    fontSize: "11px",
    color: "#000000",
    "& span": {
      fontWeight: "700",
    },
  },
  "& .OriginDescription": {
    "@media screen and (min-width:952px)": {
      height: "49.5px",
    },
    "@media screen and (min-width:900px) and (max-width:951px)": {
      height: "66px",
    },
  },
}));
export const LableValue = styled(Box)(() => ({
  // "@media (max-width:1030px)": {
  //   minHeight: "90px",
  // },
  "@media (max-width:900px)": {
    minHeight: "auto",
  },

  "& .MuiTypography-h3": {
    fontSize: "14px",
    color: "#000000",
    fontWeight: "600",
    marginBottom: "6px",
  },
  "& .MuiTypography-body1": {
    fontSize: "11px",
    color: "#000000",
    "& span": {
      fontWeight: "700",
    },
  },
}));

export const ProfileAndMinisiteLink = styled(Box)({
  display: "flex",
  alignItems: "center",
  "@media (max-width: 600px)": {
    display: "block",
  },
});

export const QuoteProfileInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "10px 10px 10px",
  "@media (max-width: 600px)": {
    padding: "6px 10px 0",
  },
  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#000",
    fontWeight: 600,
  },
  "& .MuiAvatar-root": {
    width: "30px",
    height: "30px",
  },
});
export const ProductQuoteProfileInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#000",
    fontWeight: 600,
  },
  "& .MuiAvatar-root": {
    width: "40px",
    height: "40px",
  },
});

export const MiniSiteLink = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#000",
    fontWeight: 600,
  },
  margin: "0 0 0 6px",
  fontSize: "13px",
  padding: "0 4px 0 6px",
  position: "relative",
  "@media (max-width: 600px)": {
    margin: "5px 0 6px 6px",
  },
  fontWeight: 600,
  "&:before": {
    content: '" "',
    position: "absolute",
    backgroundColor: "#D2D2D2",
    width: "1px",
    height: "15px",
    top: 3,
    left: -5,
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
});
export const QuoteProductName = styled(Typography)({
  display: "flex",
  alignItems: "center",
  padding: "10px 10px 10px",

  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#000",
    fontWeight: 600,
  },
});
export const DialougeContentstyle = {
  border: "none",
  padding: "20px",
  background: "#f5f5f5",
  "@media (max-width: 600px)": { padding: "10px" },
};
export const QuoteModalStyle = {
  "& .MuiPaper-root": {
    maxWidth: "700px",
    "@media (max-width: 600px)": {
      width: "90%",
      margin: 0,
    },
  },
};
export const QuoteuantityBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  // justifyContent:'flex-end',
  gap: 10,
  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#000",
  },
  "@media (max-width: 600px)": {
    "& .MuiTextField-root": {
      width: "80px",
    },
  },
});
export const QuoteuantityBoxInn = styled(Box)({
  display: "flex",
  // alignItems: "center",
  gap: 10,
  width:'100%',
  "& .MuiTextField-root": {
    width: "80px",
  },
  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#000",
  },
});

export const QuoteDescription = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "11px",
    color: "#000",
  },
  "& a": {
    color: "#d7282f !important",
  },
});
export const RequestQuoteH = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "19px",
    color: "#000",
    fontWeight: 600,
    "@media (max-width:900px)": {
      fontSize: "18px",
    },
  },
});
export const LabelCheckboxGroup = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "13px",
    color: "#000",
  },
  "& .MuiRadio-root": {
    // padding: "4px",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
});

/**** Quantity UI (21-05-24)  ****/
export const CustomProductTypeData = styled(Box)({
  background: "#F4F6FA",
  padding: "6px 10px",
  margin: "2px 0 0",
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: "600",
  },
  // span: {
  //   borderRadius: "4px",
  //   padding: "0px 8px",
  //   backgroundColor: "#fff",
  //   margin: "0 4px",
  // },
});
export const CustomRequestOuter = styled(Box)({
  color: "#4a4a4a",
  fontSize: "13px",
  "& span": {
    fontWeight: "600",
    color: "#000",
    fontSize: "14px",
  },
});

export const CustomPriceQuoteCol = styled(Box)({
  backgroundColor: "#ffffff",
  marginTop: "10px",
  padding: "9px",
  "@media (max-width:767px)": {
    padding: "9px 4px 9px 9px",
  },
  borderRadius: "4px",
  "& .MuiTypography-h6": {
    fontSize: "14px",
    fontWeight: "600",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
  "& .icon-agreement": {
    fontSize: "24px",
  },
  "& .icon-instock-hideprice": {
    fontSize: "20px",
    margin: "4px 0px 0 1px",
  },
  "& .showhidepeice": {
    "& .showhideoption": {
      display: "contents",
    },
  },
});
export const CustomAvailabilityCol = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiTypography-h6": {
    fontSize: "14px",
    color: "#000000",
    lineHeight: "22px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    "@media (max-width: 600px)": {
      fontSize: "12px",
    },
    "@media (max-width: 1280px)": {
      whiteSpace: "nowrap",
    },
    "& span": {
      fontSize: "14px",
      "@media (max-width: 1280px)": {
        whiteSpace: "normal",
      },
      "@media (max-width: 600px)": {
        fontSize: "12px",
      },
    },
    "& .MuiTypography-body1": {
      fontSize: "13px",
      fontWeight: "600",
      // border: "1px solid #34A853",
      borderRadius: "4px",
      padding: "0px 8px",
      whiteSpace: "nowrap",
      // color: "#34A853",
      backgroundColor: "#ffffff",
      display: "inline-flex",
      margin: "0 8px",
      "@media (max-width: 600px)": {
        fontSize: "12px",
      },
    },
    "@media (max-width: 768px)": {
      display: "initial",
    },
  },
});

export const AddAttachmntSec = styled(Box)({
  "& .MuiButton-root": {
    textTransform: "capitalize",
    color: "#d7282f",
    fontSize: "14px",
    padding:'0 8px',
    "&:hover": {
      background: "rgba(225, 40, 47, 0.04)",
    },
  },
});

//////////////////////////////// Configure Flyout Styling ////////////////////////////////
export const FlexDiv = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "start",
  "@media screen and (max-width:480px)": {
    flexWrap: "wrap",
  },
});
export const ConfigueUserAddress = styled(Box)(() => ({
  // width:'100%',
  "& .MuiTypography-h6": {
    fontSize: "12px",
    fontWeight: "700",
    padding: "0",
    background: "transparent",
    margin: 0,
  },
  "& .MuiTypography-subtitle1": {
    fontSize: "13px",
    color: "#000000",
    lineHeight: "18px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    "& .MuiSvgIcon-root": {
      fontSize: "16px",
      cursor: "pointer",
      color: "#0000008a",
      "&:hover": {
        color: "#d32f2f",
      },
    },
  },
}));

export const SubjectBox = styled(Box)({
  fontSize: "13px",
  display: "flex",
  alignItems: "start",
  // flexWrap: "wrap",
  gap: "4px",
  "& .uniqueNo-brandName": {
    whiteSpace: "nowrap",
  },
  "& .Prod-Name": {
    fontSize: "13px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    overflow: "hidden",
    width: "46%",
  },
  "& .del-saveIcons": {
    fontSize: "16px",
    cursor: "pointer",
    color: "#0000008a",
    margin: "4px 0 0 0",
    "&:hover": {
      color: "#d7282f",
    },
  },
  "& .editIcon": {
    fontSize: "16px",
    cursor: "pointer",
    color: "#0000008a",
    "&:hover": {
      color: "#d7282f",
    },
  },
});
export const TabInnData = styled(Box)({
  padding: "10px",
  border: "1px solid #ddd",
});
export const ConfigTabsData = styled(Box)(() => ({
  width: "100%",
  marginTop: "16px",
  "& .MuiTabs-root": {
    minHeight: "37px !Important",
    "& .MuiTab-root": {
      textTransform: "capitalize",
      fontSize: "14px",
      fontWeight: "600",
      color: "#000000",
      minHeight: "35px",
      padding: "6px 16px ",
      backgroundColor: "#FBFBFB",
      letterSpacing: "0px",
      "@media (max-width:900px)": {
        fontSize: "14px",
      },
      "&:hover": {
        color: "#D7282F",
      },
      "& i": {
        fontSize: "16px",
      },
      "&.Mui-selected": {
        color: "#D7282F",
        backgroundColor: "#F1F1F1",
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#D7282F",
    },
  },
}));
export const SubjectLine = styled(Box)({});
export const ConFigueOverView = styled(Box)({});
export const ConfigueProductInfo = styled(Box)({
  display: "flex",
  gap: "4px",
  alignItems: "center",
  margin: "0 0 8px",
  "& .MuiTypography-root": {
    // display:"flex",
    fontWeight: 600,
    fontSise: "14px",
    wordBreak: "break-all",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
    display: "-webkit-box",
  },
});
export const CProductImage = styled(Box)({
  width: "50px",
  height: "50px",
  minWidth: "50px",
  background: "#ddd",
  borderRadius: "50%",
  border: "1px solid #ddd",
  padding: "2px",
  overflow: "hidden",

  "& img": {
    width: "100%",
    height: "100%",
  },
});

export const ConFigueOverViewInn = styled(Box)({
  // textAlign: "left",
  padding: "10px 10px 0 10px",
  "& .MuiTypography-h5": {
    fontSize: "13px",
    color: "#000000",
    wordBreak: "break-word",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
    color: "#d7282f",
    fontWeight: "600",
    wordBreak: "break-word",
  },
});
export const ConfigureOverviewCol = styled(Box)(() => ({
  marginTop: "16px",
  border: "1px solid #dddddd",
  paddingBottom: "16px",
  borderRadius: "4px",
  position: "relative",
  width: "100%",
  "& .MuiTypography-h6": {
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#F8F8F8",
    padding: "4px 10px",
    color: "#000",
    borderRadius: "4px",
    margin: 0,
  },
}));
export const ConfigureOverviewColData = styled(Box)(() => ({
  textAlign: "center",
  paddingTop: "16px",
  "& .MuiTypography-h5": {
    fontSize: "13px",
    color: "#000000",
  },
  "& .MuiTypography-body1": {
    fontSize: "15px",
    color: "#000000",
    fontWeight: "600",
  },
}));
export const DelievryTerms = styled(Box)(() => ({
  // padding: "1rem 0",
}));
export const WriteMessagBox = styled(Box)(() => ({
  "& .MuiTypography-body1": {
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "4px",
    marginTop: "16px",
  },
}));
export const ConfigAddAttatchment = styled(Box)(() => ({
  "& label": {
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "6px",
    marginTop: "10px",
  },
  color: "#000",
  fontSize: "14px",
  "& .MuiTypography-root": {
    color: "#DA020A",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      color: "#c10007",
    },
    "& i": {
      marginRight: "4px",
      fontSize: "16px",
    },
  },
}));

export const ConfigSummaryOuter = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: "10px",
}));
export const ConfigSummaryInn = styled(Box)(() => ({
  width: "300px",
  "@media screen and (max-width:600px)": {
    width: "100%",
  },
  "& .MuiTypography-h5": {
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "6px",
  },
}));

export const ConfigSummaryBox = styled(Box)(() => ({
  width: "100%",
  border: "1px solid #DDDDDD",
  borderRadius: "6px",
  padding: "8px",
}));

export const ConfigTotalBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #DDDDDD",
  "& .MuiTypography-h3": {
    fontSize: "14px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  "& .MuiTypography-body1": {
    fontSize: "14px",
    fontWeight: "700",
  },
}));

export const UploadImgView = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "2px 6px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  maxWidth: "max-content",
  backgroundColor: "#f9f9f9",
  "& .desicon": {
    fontSize: "15px !important",
    color: "#a2a0a0",
    marginRight: "5px",
  },
  "& .visibilityIcon": {
    fontSize: "15px !important",
    color: "#444",
  },
  "& .MuiTypography-body2": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block",
    maxWidth: "70px",
    fontSize: "13px",
    color: "#444444",
  },
}));
