import { AccordionSummary, Box, Grid, Typography } from "@mui/material";

import { TextField, styled } from "@mui/material";

export const IconsStyle = {
  height: 16,
  width: 16,
  color: "#D7282F",
  cursor: "pointer",
};

export const OuterContainer: any = styled(Box)(
  ({ value, noShadow, breakPoints }: any) => ({
    background: "#FFFFFF",
    borderRadius: "6px",
    display: "flex",

    flexDirection: "column",
    boxShadow: !noShadow && "0px 12px 23px 0px rgb(112 112 112 / 4%)",
    fontSize: breakPoints?.max600px ? "14px" : "18px",
    position: "relative",

    padding: "16px",
    "@media screen and (max-width:600px)": {
      borderRadius: "4px",
      width: "100% !important",
      padding: 0,
      boxShadow: "none",
      "& .addaccountcontainer": {
        padding: 0,
        marginTop: "10px",
      },
    },
    // marginBottom: "2rem",
    marginBottom: "1rem",
    "& .customerCase": {
      margin: "0 0 10px 0",
    },
  })
);

export const HeaderContainer: any = styled(Box)(({ breakPoints }: any) => ({
  display: "flex",
  // marginLeft: "11px",
  justifyContent: "space-between",
  paddingBottom: "0",
  "@media (max-width: 767px)": {
    display: "block",
  },
  "@media (max-width: 600px)": {
    paddingBottom: "0",
  },
  "& .addregionalbtn": {
    marginBottom: 10,
  },
}));
export const EditContainer: any = styled("div")(({ breakPoints }: any) => ({
  position: "absolute",
  right: 0,
  top: "-44px",
  "@media screen and (max-width: 320px)": {
    top: "-73px",
  },
}));

export const HeaderTextContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    fontFamily: "Open Sans",
    gap: "4px",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: breakPoints?.max600px ? "14px" : "18px",
    lineHeight: "normal",
    display: "flex",
    alignItems: "center",
    flex: 0.5,
    color: "#231F20",
    "@media screen and (max-width:1400px)": {
      fontSize: "16px",
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "15px",
      margin: "0 0 5px",
      flex: 1,
    },
    "@media screen and (max-width: 350px)": {},
  })
);

export const HeaderSmallTextContainer = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  color: "#223354",
  opacity: 0.5,
});

export const ContentContainer = styled(Box)(({ value, flex }: any) => ({
  ...value,
  background: "#FFFFFF",
  borderRadius: "6px",
  flex: flex || 0.5,
  paddingRight: "10px",
  paddingLeft: "10px",
  paddingTop: "12px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
}));

export const ContentHeaderContainer: any = styled("div")(
  ({ value, breakPoints }: any) => ({
    ...value,

    display: breakPoints?.max768px ? "block" : "flex",
    justifyContent: "space-between",
    flex: 1,
    "@media screen and (max-width:600px)": {
      paddingLeft: "0 !important",
    },
  })
);

export const LeftContentContainer: any = styled("div")(
  ({ value, flex }: any) => ({
    ...value,
    display: "flex",
    flex: flex || 0.6,
  })
);

export const RightContentContainer: any = styled(Box)(({ value }: any) => ({
  ...value,
  display: "flex",
  flex: 0.4,
  justifyContent: "flex-end",
  alignItems: "center",
}));

export const ContentWrapper: any = styled("div")(
  ({ value, breakPoints }: any) => ({
    ...value,
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    gap: "16px",
    padding: breakPoints?.max600px ? "5px" : "16px 0",
  })
);

export const FieldLabelContainer: any = styled(Box)(
  ({ value, breakPoints }: any) => ({
    ...value,
    display: "flex",
    flex: value?.flex ? value?.flex : 0.5,
    color: "#223354",
    opacity: 0.6,

    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    alignItems: "flex-start",
    padding: "12px 0",
    "@media screen and (max-width:767px)": {
      flex: "1 !Important",
      padding: " 0",
    },
    "&.Tradeshow": {
      padding: " 15px 0 5px 0",
    },
  })
);

export const SocialFieldLabelContainer = styled("div")(
  ({ value, breakPoints }: any) => ({
    ...value,
    display: "flex",
    flex: 0.5,
    color: "#223354",
    opacity: 0.5,
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    alignItems: "center",
  })
);

export const FieldValueContainer: any = styled("div")(
  ({ value, flexStart, breakPoints }: any) => ({
    display: breakPoints?.max768px ? "block" : "flex",
    flex: value?.flex ? value?.flex : 0.5,
    color: "#231F20",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: breakPoints?.max600px ? "13px" : "14px",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: flexStart && "10px",
    ...value,
    margin: "5px 0 5px 0",
    wordBreak: "break-word",
    "@media screen and (max-width:600px)": {
      fontSize: "12px",
    },
    "& .MuiTypography-root": {
      fontSize: "12px",
    },
  })
);
export const BothFieldValueContainer = styled("div")(
  ({ value, flexStart, breakPoints }: any) => ({
    display: breakPoints?.max768px ? "flex" : "flex",
    flex: value?.flex ? value?.flex : 0.5,
    color: "#231F20",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: breakPoints?.max600px ? "13px" : "14px",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: flexStart && "10px",
    ...value,
    margin: "5px 0 5px 0",
  })
);

export const FieldValueContainerQA: any = styled("div")(
  ({ value, flexStart, breakPoints }: any) => ({
    display: breakPoints?.max768px ? "block" : "flex",
    color: "#231F20",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: breakPoints?.max600px ? "13px" : "14px",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",

    gap: flexStart && "10px",
    ...value,
    "@media screen and (max-width:320px)": {
      padding: "0px",
    },
  })
);

export const FooterContainer: any = styled("div")(({ breakPoints }: any) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: 5,
}));
export const ErrorText: any = styled("div")(({ breakPoints }: any) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: 5,
}));

export const FieldContainer: any = styled(Box)(
  ({ value, breakPoints }: any) => ({
    ...value,
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    borderBottom: breakPoints?.max600px ? "1px solid #d7d7d7" : "none",
    padding: breakPoints?.max600px ? "8px 0" : "0px",
    Height: "fit-content",
    alignItems: "center",
    "@media (max-width:600px)": {
      display: "block",
      padding: "0px 0",
    },
    "& .RegionalOffices": {
      "@media screen and (max-width:600px)": {
        fontSize: "14px !important",
      },
    },
  })
);
export const FieldContainerQA = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "48px",
  height: "100%",
  "@media screen and (max-width:600px)": {
    display: "block",
  },
});
export const FieldLabelContainerQA = styled(Box)({
  color: "#223354",
  opacity: 0.5,
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  padding: "12px 0",
});
export const QAQCGrid = styled(Grid)({
  padding: "0px 0 0 16px !important",
});

export const SocialFieldContainer = styled("div")({
  display: "flex",
  flex: "50%",
});

export const SaveButtonContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    display: "flex",
    justifyContent: "flex-end",
    padding: breakPoints?.max768px ? "6px 4px 20px 15px" : "6px 0px 16px 15px",
    gap: "15px",
    "@media (max-width:600px)": {
      padding: "6px 4px 20px 0",
    },
  })
);

/****************************************QAQC**********************************************/

export const EditTextContainer = styled("div")({
  color: " #D7282F",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "25px",
  display: "flex",
  alignItems: "center",
  gap: 3,
  cursor: "pointer",
});

export const QualityFieldContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    display: breakPoints?.max768px ? "block" : "inline-block",
    width: breakPoints?.max768px ? "100%" : "auto",
    flex: 0.5,
    flexDirection: "column",
    "@media (max-width: 767px)": { display: "block" },
  })
);
export const FullQualityFieldContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    display: breakPoints?.max768px ? "block" : "inline-block",
    width: breakPoints?.max768px ? "100%" : "auto",
    flex: 0.5,
    flexDirection: "column",
  })
);

export const SocialAccountContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});

export const ToggleButtonContainer = styled("div")({
  background: "#E8E8E8",
  border: "1px solid #D8D0D0",
  borderRadius: "6px",
  height: "35px",
  padding: 5,
  display: "flex",
  alignItems: "center",
  gap: 2,
});

/***********************************Factory ? Inventory details*********************************************/

export const FactoryPhotosContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    gap: 20,
    textAlign: "center",
    margin: "20px 0 0 0",
    "@media screen and (max-width:600px)": {
      margin: "0px",
    },
    "& .factory_img_col": {
      border: "1px solid #ebe9e9",
      borderRadius: "4px",
    },
  })
);

export const PreviewImages: any = styled("div")(({ breakPoints }: any) => ({
  width: "100%",
}));

export const FactorTextContainer = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "13px",
  lineHeight: "22px",
  textAlign: "center",
  color: "#231F20",
  whiteSpace: "nowrap",
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  background: "#f4f4f4",
  padding: "5px",
  borderRadius: "0 0 3px 3px",
  "& input": {
    fontSize: "13px !important",
  },
  "& fieldset": {
    border: "none",
  },
});

export const FactoryButtonContainer: any = styled("div")(({ value }: any) => ({
  position: "absolute",
  gap: "20px",
  display: "flex",
  top: value?.top ?? "40%",
  left: "50%",
  transform: " translate(-50%, -50%)",
}));

export const CloseIconContainer = styled("div")({
  position: "absolute",
  top: "-4%",
  right: "-10px",
});

export const CloseIconStyle = {
  color: "#FF1A43",
  height: 19,
  width: 20,
  background: "#FFE8EC",
  border: " 1px solid #D7282F",
  borderRadius: "100px",
  transform: "matrix(-1, 0, 0, 1, 0, 0)",
  cursor: "pointer",
};

export const FactoryToggleButtonContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    display: breakPoints?.max768px ? "block" : "flex",
    gap: 20,
    padding: breakPoints?.max600px ? "22px 0 0 0" : "20px 0",
  })
);

export const FactoryLargeTextContainer = styled(Box)({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "20px",
  color: " #223354",
  opacity: 0.5,
});
export const FactorySmallTextContainer = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "15px",
  color: "#223354",
  opacity: 0.5,
  paddingBottom: "12px",
  marginTop: "3px",
  "@media (max-width: 980px)": {
    fontSize: "13px",
    lineHeight: "normal",
    margin: "0px 0 8px",
  },
  "@media (max-width: 480px)": {
    margin: "0px 0 8px",
  },
});

export const FactoryLoacationLabelContainer: any = styled(Box)(
  ({ flex, breakPoints }: any) => ({
    display: "flex",
    color: "#223354",
    opacity: 0.5,
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "24px",
    alignItems: "center",
    textTransform: "capitalize",
    // padding: "12px 0",
    padding: "12px 0 0",
    "@media (max-width: 600px)": {
      width: "100%",
      padding: "12px 0 0 0",
    },
  })
);

export const FactoryFieldContainer = styled("div")(
  ({ flex, breakPoints }: any) => ({
    display: "flex",
    color: "#223354",
    fontWeight: 400,
    fontSize: "14px",
    alignItems: "center",
    padding: "12px 0",
    "@media (max-width: 600px)": {
      width: "100% !important",
      padding: "0",
      display: "block",
    },
    "& .locationlabelwidth": {
      width: "21%",
      "@media (max-width: 767px)": {
        width: "50%",
      },
      "@media (max-width:600px)": {
        width: "100%",
      },
      "@media (max-width: 600px)": {
        width: "100%",
      },
    },
  })
);

export const FactoryLoacationValueContainer = styled("div")(
  ({ flex }: any) => ({
    display: "flex",
    color: "#231F20",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "22px",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "16px",
    width: "70%",
    "@media (max-width: 600px)": {
      width: "60%",
      margin: "0px 0 6px 0px",
    },
  })
);

/********************************************Services************************************************************/

export const SearchInputContainer = styled(TextField)({
  display: "flex",
  background: "#FFFFFF",
  border: "1px solid #E0E3E7",
  borderRadius: "13px",
  width: "20%",
  padding: "10px",
});

export const DescriptionTextContainer = styled(Box)({
  fontWeight: 400,
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  letterSpacing: "0.09px",
  color: "#231f20",
  justifyContent: "space-between",
  flex: 0.75,
  opacity: ".55",
});

// --------------------------SocialMedia--------------//

export const AddAccountContainer = styled("div")({
  display: "flex",
  padding: "16px 0",
  flex: 1,
  gap: "10px",
  alignItems: "self-start",
  "@media (max-width:900px)": {
    display: "block",
  },
  "@media (max-width:600px)": {
    padding: "10px 10px 0px 16px",
  },
});

export const AccountFieldContainer: any = styled(Box)(({ value }: any) => ({
  display: "flex",
  flex: value.flex,

  "@media (max-width:900px)": {
    margin: "0 0 10px",
  },
}));

export const TextFieldButtonContainer: any = styled("div")(
  ({ value }: any) => ({
    display: "flex",
    flex: 1,
    gap: "20px",
    justifyContent: value ? value : "flex-start",
    alignItems: "flex-start",
    "@media (max-width:768px)": {
      alignItems: "flex-start",
    },
    "@media (max-width:1024px)": {
      gap: "8px",
    },
    "@media (max-width:320px)": {
      display: "block",
    },
  })
);

export const AccountTypeContainer = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  wordBreak: "break-word",
  textTransform: "capitalize",
  "@media screen and (max-width:320px)": {
    width: "100px",
  },
});
export const AccountLinkContainer: any = styled("div")(({ value }: any) => {
  let style: any =
    value === "WhatsApp"
      ? {}
      : {
          display: "inline-flex",
        };
  return {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "20px",
    display: "inline-flex",
    alignItems: "center",
    color: "#231F20",
    margin: "3px 0 2px",
    wordBreak: "break-word",
    ...style,
  };
});

export const ButtonContainer = styled("div")({
  padding: "16px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "5px",
});

export const LogoContainer = styled("div")({
  display: "flex",
  // gap: 10,
  gap: 7,
  alignItems: "start",
  // "& i": {
  //   fontSize: "22px",
  // },
  "& .icon-instagram1": {
    fontSize: "20px",
    color: "#ff00b8",
  },
  "& .icon-wechat": {
    fontSize: "25px",
  },

  "& i": {
    fontSize: "22px",
    width: "28px",
    display: "block",
  },
});

export const ListContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media screen and (max-width:320px)": {
    alignItems: "start",
  },
});

/******************************************************FAQ'S**************************************************************/

export const QuestionContainer = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "23px",
  display: "flex",
  alignItems: "center",
  boxShadow: "none",
  color: "#231f20",
  // "&::before": {
  //   content: '""',
  //   width: "5px",
  //   height: "5px",
  //   backgroundColor: "black",
  //   margin: "0 -8px 0",
  //   borderRadius: "50%",
  //   display: "inline-block",
  //   position: "relative",
  //   top: "0",
  //   marginRight: "4px", // Adjust this value as needed
  //   left:"-4px"
  // },
  "@media (max-width:767px)": {
    fontSize: "14px",
  },
});

export const AnswerContainerBorder = styled("div")({});

export const AnswerContainer = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "normal",
  display: "flex",
  alignItems: "center",
  color: "#929296",
  // margin: "-9px 0 8px",
  margin: "-2px 0 8px",
});

export const TextFieldStyle = {
  width: "100%",
  height: "77px",
  marginTop: 10,
  marginBottom: 0,
  paddingLeft: 10,
  paddingTop: 5,
  borderRadius: "6px",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#929296",
  lineHeight: "23px",
  "&::placeholder": {
    color: "yellow",
  },
};

export const FAQButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: 5,
  marginTop: 10,
});

export const AddFAQFieldContainer = styled("div")({
  padding: "16px",
  background: "#FFFFFF",
  border: "1px solid rgba(34, 51, 84, 0.1)",
  borderRadius: "4px",
  marginTop: "10px",
});

export const ErrorMessage = styled("p")({
  display: "flex",
  alignItems: "self-start", //center
  "& .MuiFormHelperText-root::before": {
    top: "4px",
  },
});

export const CustomAccordianSummary = styled(AccordionSummary)({
  transform: "none",
});

/***** New component for "FactoiryInventory Detail" *****/

export const ImgUpfactory: any = styled("div")(({ breakPoints }: any) => ({
  padding: breakPoints?.max600px ? "0px" : "0px",
}));

export const DescriptionTextContainer_new = styled("div")({});

/***** New COMMON COMPONENT for "Add service new design" *****/
export const FullFieldContainer = styled("label")({
  width: "100%",
  "& .certificatespacing": {
    margin: "1px 0 5px !important",
  },
});

export const FullFieldLabel = styled("span")({
  fontSize: "14px",
  margin: "15px 0 5px",
  display: "block",
  color: "rgba(34, 51, 84, 0.5)",
  fontWeight: "400",
  // margin: "1px 0 5px",
  "@media (max-width:768px)": {
    margin: "8px 0 5px",
  },
});
export const ImageFormatSpan = styled("span")({
  fontSize: "11px",
});

export const FullFieldValue = styled(Box)({
  width: "100%",
  "& textarea": {
    paddingTop: 2,
  },
  "& textarea:hover": {
    borderColor: "#000 !important",
  },
});

export const FieldBorder = styled("div")({
  display: "flex",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  padding: "5px 2px 5px",
  "@media (max-width:768px)": {
    padding: "0 2px 2px",
    justifyContent: "flex-start",
  },
});

export const SocialContactMedia = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  paddingTop: "16px",
  "@media (max-width:768px)": {
    paddingTop: "0",
  },
});

export const ContactEdits = styled("div")({
  display: "flex",
  gap: 5,
  alignItems: "center",
});

export const QualityFieldContainerFD: any = styled("div")(
  ({ breakPoints }: any) => ({
    display: breakPoints?.max768px ? "block" : "inline-block",
    width: breakPoints?.max768px ? "100%" : "auto",
    flex: 0.5,
    flexDirection: "column",
    "@media (max-width: 767px)": { display: "block" },
  })
);

export const CertificateNumBtn = styled(Box)({
  "& .MuiButtonBase-root": {
    "@media screen and (max-width: 480px)": {
      fontSize: "0",
      padding: "0px 10px",
      position: "absolute",
      right: "10px",
      "& .MuiSvgIcon-root": {
        fontSize: "25px !important",
      },
    },
  },
});

export const RADBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "100%",
  padding: "12px 0px",
});

export const SocialConatactUpdates = styled(Box)({
  "& .MuiInputBase-root": {
    padding: "7px 10px",
    // marginBottom: "5px",
    "@media screen and (max-width:767px)": {
      marginBottom: 0,
      padding: "6px 3px 6px 8px",
    },
  },
});

export const SocialmediaLogoBox = styled(Box)({
  display: "flex",
  width: "32px",
  "& .icon-wechat": {
    margin: "0 1px 0 -2px",
  },
});
// Delete selected for Newsroom, servies and export capabilities
export const DeleteSelectedOuterBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "20px 0px 5px",
  gap: "12px",
  "& .borderLeft": {
    borderLeft: "0",
    paddingLeft: "16px !important",
  },
  "@media screen and (max-width:767px)": {
    flexDirection: "column",
    alignItems: "start",
  },
});
export const DeleteSelectedInnerBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "18px",
  "@media screen and (max-width:380px)": {
    flexDirection: "column",
    alignItems: "start",
  },
});
export const DeleteSelectedText = styled(Typography)({
  borderLeft: "1px solid rgb(210, 210, 210)",
  paddingLeft: "12px",
  fontSize: "14px",
  fontWeight: "300",
  "@media screen and (max-width:767px)": {
    borderLeft: "none",
    paddingLeft: "0px",
    marginLeft: "0px",
  },
});
export const DeleteSelectedDivider = styled(Box)({
  height: "21px",
  backgroundColor: " rgb(210, 210, 210)",
  width: "1px",
  "@media screen and (max-width:380px)": {
    display: "none",
  },
});
export const DeleteSelectedRedText = styled(Typography)({
  fontSize: "14px",
  fontWeight: "300",
  color: "#d7282f",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});
