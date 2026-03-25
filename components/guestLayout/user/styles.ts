import { styled, Button, Box, Typography } from "@mui/material";

export const BarContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 5,
  "@media screen and (max-width:767px)": { padding: "9px 20px" },
  "& .Outerheading": {
    "@media screen and (max-width:320px)": {
      width: "150px",
      objectFit: "contain",
    },
  },

});

export const CustomButtonHeader = styled(Button)({
  display: "inline-block",
  background: "#D7282FD9",
  color: "white",
  "&:hover": {
    background: "#D7282FD9",
    color: "white",
  },
  fontWeight: "bold",
  textTransform: "none",
  height: "42px",
  minWidth: "80px",
  border: "1px solid rgba(228, 101, 179, 0.35)",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "6px",
  "@media screen and (max-width: 480px)": {
    height: "32px",
    minWidth: "70px",
    fontSize: "12px",
    margin: "-7px 0 0 0",
    lineHeight: "15px",
  },
});

export const LogoContainerHeader = styled("div")({
  "& img": {
    cursor: "pointer",
  },
});

export const Step1FooterTextContainer: any = styled("div")(
  ({ breakPoint }: any) => ({
    fontSize: "10px",
    textAlign: "center",
    padding: "10px",
    flex: 1,
    display: "flex",
    justifyContent: breakPoint?.max320px ? "flex-start" : "flex-end",
    alignItems: "center",
    flexDirection: "column",
  })
);

export const Step1FooterText: any = styled(Box)(({ breakPoint }: any) => ({
  marginTop: "10px",
  fontSize: "10px",
  "@media screen and (max-width:480px)": {
    marginTop: '0px',
  }
}));
export const SignUpOuterBox: any = styled(Box)(({ breakPoint }: any) => ({
  "& .TermandconditionBox": {
    textAlign: "center",
    margin: "-4px 0 0 0",
  },
  "& .NextButton": {
    "@media screen and (max-width:480px)": {
      width: "100%",
    },
  },
  "& .SignupWith": {
    "@media screen and (max-width:320px)": {
      padding: "0 0 10px 0 !important",
    },
  },
}));
export const TermsAndPrivacy: any = styled(Box)(({ breakPoint }: any) => ({
  textDecoration: "underline",
  cursor: "pointer",
  display: "inline-block",
  color: "#D7282F",
  margin: "0 4px",
}));

export const OuterWrapper = styled("div")({
  // height: "100vh",
  // width: "100vw",
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
  // fontFamily: "open sans",
  // backgroundImage: "url(/assets/merchantad-sigin-bg.png)",
  // backgroundOrigin: "border-box",
  // zIndex: 1,
  // backgroundSize: "cover",
  // backgroundRepeat: "no-repeat",
  // backgroundPosition: "center",
  // boxShadow: "0 24px 64px #26214a1a",
  position: "relative",
  "@media screen and (max-width:600px)": {
    width: "100%",
  },

});

export const LoginOuterWrapper = styled("div")({
  // height: "100vh",
  // width: "100vw",
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
  // fontFamily: "open sans",
  // backgroundImage: "url(/assets/merchantad-sigin-bg.png)",
  // backgroundOrigin: "border-box",
  // zIndex: 1,
  // backgroundSize: "cover",
  // backgroundRepeat: "no-repeat",
  // backgroundPosition: "center",
  position: "relative",
  "@media screen and (max-width:600px)": {
    width: "100% !important",
  },
});

export const BoxRedBackgroundImg = styled("div")({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "open sans",
  backgroundImage: "url(/assets/merchantad-sigin-bg.png)",
  backgroundOrigin: "border-box",
  zIndex: 1,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: "relative",
  "@media screen and (max-width:600px)": {
    width: "100% !important",
    minHeight: "100vh",
    height: "100%",
    padding: "12% 0"
  },
  "@media screen and (max-width:1024px) and (orientation : landscape)": {
    width: "100%",
    minHeight: "100vh",
    height: "100%",
    // height:"100%",
    margin: "0px",
    padding: "12% 0"
  },
  "& .dialogheight": {
    height: "100vh"
  }
});





export const Wrapper: any = styled("div")(({ breakPoint, type }: any) => ({
  position: "relative",
  maxWidth: breakPoint?.max750px ? "auto" : "480px",
  margin: "auto",
  boxShadow: "0 24px 64px #26214a1a",
  borderRadius: "15px",
  zIndex: 900,
  background: `white`,
  padding: "10px 15px 23px",
  display: "flex",
  flexDirection: "column",
  minWidth: breakPoint?.max540px ? "auto" : "480px",
  minHeight: "400px",
  "@media screen and (max-width:600px)": { width: "90%", maxWidth: "90%" },
}));

export const LoginWrapper: any = styled("div")(({ breakPoint, page }: any) => ({
  margin: "auto",
  boxShadow: "0 24px 64px #26214a1a",
  borderRadius: "12px",
  zIndex: 900,
  background: `white`,
  display: "flex",
  flexDirection: "column",
  justifyContent:
    page?.page === "forgot-password" || page?.page === "email-instructions"
      ? "flex-start"
      : "space-between",
  width: "480px",
  padding: " 10px 20px 32px 15px",
  "@media screen and (max-width:600px)": {
    // width:"90%",
    width: "90vw"

  }
}));

export const ProductdetailWrapper: any = styled(Box)(({ theme }: any) => ({
  paddingBottom: "6px",
}));

export const HeaderContainer: any = styled("div")(({ breakPoint }: any) => ({
  display: "flex",
  alignItems: "center",
  gap: breakPoint?.max540px ? "5px" : "10px",
  padding: breakPoint?.max540px ? "12px" : "16px",
  flexDirection: "column",
  paddingBottom: breakPoint?.max540px ? "10px" : "0px",
}));

export const LoginHeaderContainer: any = styled("div")(
  ({ breakPoint }: any) => ({
    display: "flex",
    alignItems: "center",
    gap: breakPoint?.max540px ? "5px" : "20px",
    padding: "0 16px 0",
    flexDirection: "column",
  })
);

export const Errormessage = styled(Typography)({
  fontSize: "10px",
  cursor: "default",
});
export const LinkLive = styled(Typography)({
  "&:hover": {
    textDecoration: "underline",
  },
  fontSize: "10px",
  cursor: "pointer",
  color: "#d7282f",
});

export const LogoContainer = styled("div")({
  width: "67px",
  height: "67px",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
});

export const LoginLogoContainer = styled("div")({
  width: "67px",
  height: "67px",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
  position: "relative",
});

export const LogoImage = styled("img")({
  width: "52px",
  height: "52px",
});

export const LoginLogoImage = styled("img")({
  width: "52px",
  height: "52px",
});

export const HeaderTextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "10px",
});

export const LoginHeaderTextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const HeaderHighlightText: any = styled("p")(({ breakPoint }: any) => ({
  fontWeight: 700,
  fontSize: breakPoint?.max540px ? "26px" : "32px",
  lineHeight: breakPoint?.max540px ? "26px" : "41.7px",
  color: "#231F20",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  textAlign: "center",
  "@media screen and (max-width:768px)": {
    fontSize: "25px",
  },
}));

export const LoginHeaderHighlightText: any = styled("p")(
  ({ breakPoint }: any) => ({
    fontWeight: 700,
    fontSize: breakPoint?.max540px ? "26px" : "32px",
    lineHeight: breakPoint?.max540px ? "26px" : "41.7px",
    color: "#231F20",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    textAlign: "center",
    "@media screen and (max-width:768px)": {
      fontSize: "22px",
    },
  })
);

export const SimpleText: any = styled("p")(({ breakPoint }: any) => ({
  fontWeight: 400,
  fontSize: breakPoint?.max540px ? "12px" : "16px",
  lineHeight: "22.4px",
  color: "rgba(34, 51, 84, 0.5)",
  fontStyle: "normal",
  textAlign: "center",
}));

export const OAuthSignUpTextContainer: any = styled("div")(
  ({ breakPoint }: any) => ({
    textAlign: "center",
    opacity: "0.7",
    fontSize: "12px",
    color: "#000",
  })
);

export const OAuthSignUpIconOuterContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

export const OAuthSignUpIconContainer: any = styled("div")(({ icon }: any) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "25px",
  height: "25px",
  background: "#bdbdbd",
  borderRadius: "50%",
  color: "white",
  cursor: "pointer",
  "&:hover": {
    background: icon?.linkedin ? "#0077b5" : "#dc5043",
  },
  transition: "background 0.5s",
}));

export const OAuthSignUpBtnOuterContainer: any = styled("div")(
  ({ breakPoint, page }: any) => ({
    width: "100%",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  })
);

export const OAuthSignUpBtnContainer: any = styled("div")(
  ({ breakPoint }: any) => ({
    display: "flex",
    flex: 1,
    justifyContent: breakPoint?.max540px ? "center" : "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: breakPoint?.max540px ? "5px" : "",
  })
);

export const OAuthBtn: any = styled("div")(({ breakPoint }: any) => ({
  cursor: "pointer",
  flex: breakPoint?.max540px ? 0.3 : 0.47,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: breakPoint?.max540px ? "30px" : "38px",
  maxWidth: "328px",
  minWidth: breakPoint?.max540px ? "130px" : "200px",
  border: "1px solid rgba(34, 51, 84, 0.2)",

  borderRadius: "6px",
}));

export const OAuthBtnContent = styled("div")({
  width: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
});

export const OAuthBtnIcon: any = styled("img")(({ breakPoint }: any) => ({
  width: breakPoint?.max540px ? "16px" : "auto",
  height: breakPoint?.max540px ? "16px" : "auto",
}));
export const OAuthBtnText: any = styled("p")(({ breakPoint }: any) => ({
  display: "inline",
  fontWeight: breakPoint?.max540px ? 600 : 700,
  fontSize: breakPoint?.max540px ? "10px" : "14px",
  lineHeight: "19.07px",
  color: "#231F20",
}));

export const UnderLineContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flex: 1,
});

export const UnderLine = styled("div")({
  border: "1px solid rgba(34, 51, 84, 0.2)",
  flex: 0.5,
});

export const TextInsideUnderlineContainer = styled("div")({
  width: "44px",
  height: "42px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "rgba(34, 51, 84, 0.5)",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "22px",
});

export const StepperUiContainer: any = styled("div")(({ breakPoint }: any) => ({
  paddingTop: breakPoint?.max540px ? "10px" : "40px",
  minHeight: breakPoint?.max540px ? "auto" : "141px",
  width: "100%",
  borderRadius: "6px",
}));

export const StepContainer: any = styled("div")(
  ({ breakPoint, container, step }: any) => ({
    padding: "34px",
    display: "flex",
    flexDirection: "column",
    gap: "34px",
    width: "100%",
    paddingBottom: container?.signup ? "15px" : step?.step2 ? "15px" : "15px",
    paddingTop: breakPoint?.max540px ? "14px" : "25px",
    "@media screen and (max-width:600px)": {
      padding: "10px",
      gap: "30px",
      paddingBottom: "30px",
    },
    "@media screen and (max-width:480px)": {
      padding: "0px",
      gap: "30px",
      paddingBottom: "30px",
    },
  })
);

export const StepHeading: any = styled("p")(({ breakPoint }: any) => ({
  textAlign: breakPoint?.max540px ? "center" : "start",
  color: "#223354",
  fontWeight: "600",
  fontSize: breakPoint?.max540px ? "12px" : "15px",
  lineHeight: "25.2px",
  marginTop: 0,
}));

export const InputFieldsContainer: any = styled("div")(
  ({ breakPoint }: any) => ({
    display: "flex",
    gap: "34px",
    flex: 1,
    flexDirection: "column",
    "@media screen and (max-width: 767px)": {
      // gap: "30px",
    },
    "& .userTypespace": {},
  })
);

export const TermsError: any = styled("p")(({ breakPoint }: any) => ({
  color: "#d7282f",
  margin: "10px 0 10px 0",
  marginLeft: "-21px",
  fontSize: "10px",
}));
export const ErrorICon: any = styled("img")(({ breakPoint }: any) => ({
  height: "8px",
  width: "8px",
}));

export const InputItemContainer: any = styled("div")(
  ({ breakPoint, flexColumn, padding, transform }: any) => ({
    position: "relative",
    flex: 0.48,
    display: "flex",
    width: breakPoint?.max540px && "100%",
    flexDirection: flexColumn ? "column" : "row",
    gap: flexColumn && "6px",
    padding: padding?.padding,
    transform: transform?.up && "translatey(-11px)",
  })
);

export const TermsAndConditionsCheckboxContainer = styled("div")({
  textAlign: "start",
});
export const TermsAndConditionsText = styled("span")({
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "24px",
  opacity: "0.6",
});
export const TermsAndConditionsTextClickable = styled("a")({
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "24px",
  paddingLeft: "5px",
  color: "#468EFF",
  cursor: "pointer",
});

export const Step1FooterOuterContainer = styled("div")({
  background: "rgb(34 51 84 / 2%)",
});

export const StepFooter: any = styled("div")(
  ({ breakPoint, step, loginStep }: any) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: breakPoint?.max320px ? "column-reverse" : "row",
    justifyContent: loginStep?.loginStep ? "center" : "space-between",

    padding: breakPoint?.max320px && "20px",
  })
);

export const Step1FooterBtnContainer: any = styled("div")(
  ({ breakPoint }: any) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "stretch",
    height: "100%",
    width: "fit-content",
  })
);

export const Step1FooterBtnContainerLogin: any = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const UserIconContainer = styled("div")({
  display: "inline-flex",
  minWidth: "45px",
  justifyContent: "center",
  alignItems: "end",
  fontSize: "24px",
  color: "#d8262f",
});

export const EyeIconContainer = styled("span")({
  position: "absolute",
  right: "8px",
  top: "4px",
  fontSize: "24px",
  opacity: "0.7",
  cursor: "pointer",
  zIndex: 1,
});

export const Step2FooterBtnContainer: any = styled("div")(
  ({ breakPoint, justifyContent }: any) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "3px 32px",
    minHeight: "auto ",
    height: "auto ",
    alignItems: "normal",
    gap: "16px",

    "@media screen and (max-width: 600px)": {
      padding: "17px 12px",
      fontSize: "12px",
    },
  })
);
export const Step2FooterLeftButtons: any = styled("div")(
  ({ breakPoint }: any) => ({
    justifyContent: "space-between",
    width: "auto",
    textAlign: "center",
    ".MuiTypography-root": {
      fontSize: "12px",
      color: "#223354",
    },
    "& .MuiButtonBase-root": {
      padding: "10",
      minWidth: "auto",
    },
  })
);

export const CheckIconContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minheight: "120px",
});

export const CheckIcon: any = styled("img")(({ breakPoint }: any) => ({
  height: breakPoint?.max540px ? "80px" : "auto",
  width: breakPoint?.max540px ? "80px" : "auto",
}));

export const ConfirmationTextHeading: any = styled("div")(
  ({ breakPoint }: any) => ({
    display: "flex",
    minHeight: "36px",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#EBF9FF",
    borderRadius: "6px",
    width: "fit-content",
    margin: "auto",
    paddingLeft: "15px",
    paddingRight: "15px",
    gap: breakPoint?.max540px ? "12px" : "30px",
    padding: breakPoint?.max540px && "7px",
  })
);

export const ConfirmationIconContainer = styled("span")({
  paddingLeft: "5px",
  paddingRight: "5px",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const ConfirmationIcon: any = styled("img")({});

export const ConfirmationTextContainer: any = styled("p")(
  ({ type, breakPoint }: any) => ({
    display: "inline-block",
    color: type?.danger ? "red" : "#33C2FF",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
  })
);

export const ConfirmationDescription: any = styled("p")(
  ({ breakPoint }: any) => ({
    textAlign: "center",
    fontWeight: breakPoint?.max540px ? 600 : 700,
    fontSize: breakPoint?.max540px ? "15px" : "22px",
    lineHeight: "130%",
    color: "#231F20",
    maxWidth: "435px",
    margin: "auto",
    "@media screen and (max-width:767px)": { fontSize: "16px" },
  })
);

export const OtpContainer = styled("div")({
  margin: "auto",
  maxWidth: "300px",
});

export const OtpHeader = styled("p")({
  textAlign: "center",
  color: "#212529",
  fontWeight: 400,
  marginBottom: "20px",
  // marginTop: "10px",
  fontSize: "14px"
});

export const Step2ToggleButtonsContainer: any = styled("div")(
  ({ breakPoint }: any) => ({
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    justifyContent: "flex-start",
    flexDirection: breakPoint?.max320px ? "column" : "row",
    gap: breakPoint?.max320px ? "5px" : "30px",
  })
);

export const LoginSignUpButtonContainer: any = styled("div")(
  ({ transform }: any) => ({
    display: "flex",
    flexDirection: "column",
  })
);

export const BelowSignUpBtnTextContainer = styled(Box)({
  justifyContent: "space-between",
  width: "84%",
  margin: "auto",
  paddingBottom: "15px",
  fontSize: "12px",
  textAlign: "right",
});

export const BelowSignUpBtnText = styled("span")({
  display: "inline-block",
  cursor: "pointer",
  color: "#d7282f",
  transition: "opacity 0.6s",
  "&:hover": {
    opacity: 1,
  },
});

export const PasswordResetContainer = styled("div")({});
export const PasswordResetDescriptionContainer = styled("div")({
  background: "#FBFBFC",
  padding: "20px 20px 10px 20px",
  opacity: "0.7",
  textAlign: "center",
  fontSize: "14px",

  "@media screen and (max-width:767px)": {
    padding: "20px 10px 10px",
  },
});

export const FooterTextForgotPasswordContainer = styled("div")({
  padding: "0px 22px 22px 22px",
  display: "flex",
  justifyContent: "center",
});

export const FooterTextForgotPassword = styled("span")({
  fontSize: "14px",
  opacity: "1",
  fontWeight: "600",
});

export const FooterTextForgotPasswordLinkText: any = styled("span")(
  ({ bold }: any) => ({
    display: "inline-block",
    cursor: "pointer",
    opacity: 1,
    transition: "opacity 0.6s",
    fontWeight: "bold",
    color: "#d8262fbf",
    "&:hover": {
      opacity: 1,
    },
    fontSize: bold?.bold && "16px",
  })
);

export const CheckEmailContentContainer = styled("div")({});

export const CheckEmailHeaderText = styled("p")({
  paddingLeft: "34px",
  paddingRight: "34px",
  opacity: "0.7",
  textAlign: "center",
});

export const CheckEmailContentText = styled("p")({
  fontSize: "18px",
  opacity: "0.8",
  padding: "18px 0 0 24px",
  textAlign: "center",
  fontWeight: "bold",
  "@media screen and (max-width:767px)": {
    fontSize: "16px",
  },
  "@media screen and (max-width:320px)": {
    fontSize: "14px",
  },
});

export const CheckEmailHeaderIconContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const CheckEmailHeaderIcon = styled("img")({
  width: "90px",
  height: "90px",
});

export const CheckEmailFooterButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "0px 0px 0px 34px",
  gap: "10px",
});

export const RecoverPasswordText = styled("h3")({
  fontSize: "23px",
  opacity: 0.6,
  "@media screen and (max-width: 480px)": {
    fontSize: "18px",
  },
  
});

export const Text: any = styled("p")(({ breakPoint }: any) => ({
  opacity: "0.7",
  fontSize: "14px",
}));

export const InnerWrapper: any = styled("div")({});

export const LogButton: any = styled(Button)({
  fontWeight: "bold",
  textTransform: "none",
  backgroundColor: "rgba(216, 38, 47,0.75)",
  height: "36px",
  width: "85%",
  margin: "auto",
});
export const LogButton2: any = styled(Button)({
  fontWeight: "bold",
  textTransform: "none",
  backgroundColor: "rgba(216, 38, 47, 0.75)",
  color: "white",
  display: "flex",
  borderRadius: "6px",
  width: "calc(100% - 68px)",
  margin: "auto",
  height: "45px",
  "@media screen and (max-width: 768px)": {
    height: "38px !important",
    width: "94%",
  },
  "&:hover": {
    background: "#D7282FD9",
    color: "white",
  },
});

export const Goback: any = styled(Button)({
  textTransform: "none",
  background: "transparent",
  height: "10px",
  color: "#223354",
  fontSize: "13px",
  textDecoration: "underline",
  marginTop: "10px",

  "&:hover": {
    background: "none",
  },
  "@media screen and (max-width: 768px)": { fontSize: "12px" },
});

export const ButtonLog: any = styled(Button)({
  height: "45px",
  "@media screen and (max-width: 768px)": { height: "38px" },
  "@media screen and (max-width: 600px)": { width: '96% !important' },
  "@media screen and (max-width: 480px)": { width: '100% !important' },
});

export const SignInStepContainer: any = styled("div")(
  ({ breakPoint, container, step }: any) => ({
    padding: breakPoint?.max540px ? "34px" : "34px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingBottom: container?.signup ? "15px" : step?.step2 ? "15px" : "15px",
    paddingTop: breakPoint?.max540px ? "14px" : "25px",
    gap: "20px !important",

    "@media screen and (max-width:600px)": {
      padding: "12px",
      gap: "22px",
      paddingBottom: "10px",
    },
  })
);

export const StepContainerLast: any = styled("div")(
  ({ breakPoint, container, step }: any) => ({
    padding: breakPoint?.max540px ? "34px" : "34px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    paddingBottom: container?.signup ? "15px" : step?.step2 ? "15px" : "15px",
    paddingTop: breakPoint?.max540px ? "14px" : "25px",
    "@media screen and (max-width:600px)": {
      padding: "0 10px",
      gap: "4px",
    },
  })
);

export const SignUpWrapper: any = styled("div")(
  ({ breakPoint, type }: any) => ({
    position: "relative",
    maxWidth: breakPoint?.max750px ? "auto" : "480px",
    margin: "auto",
    boxShadow: "0 24px 64px #26214a1a",
    borderRadius: "15px",
    zIndex: 900,
    background: `white`,
    padding: "10px 15px 23px",
    display: "flex",
    flexDirection: "column",
    minWidth: breakPoint?.max540px ? "auto" : "480px",
    minHeight: "400px",

    "@media screen and (max-width: 600px)": {
      // width: "90%",
      width: "90vw",
      margin: "0 auto",
      // padding: "0px 15px 9px",
      // top: "134px"

    },
  })
);

export const StepContainerTop: any = styled("div")(
  ({ breakPoint, container, step }: any) => ({
    padding: breakPoint?.max540px ? "34px" : "34px",
    display: "flex",
    flexDirection: "column",
    gap: "34px",
    width: "100%",
    paddingBottom: container?.signup ? "15px" : step?.step2 ? "15px" : "15px",
    paddingTop: breakPoint?.max540px ? "14px" : "25px",
    "@media screen and (max-width:600px)": {
      gap: "22px",
      paddingBottom: "30px",
      padding: "10px",
    },
    "@media screen and (max-width:480px)": {
      padding: "0px",
    },
  })
);

export const LogInSocialBox: any = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  marginTop: "5px",
  "@media screen and (max-width:480px)": {
    flexDirection: "column",
  },
  "& .my-facebook-button": {
    border: "none",
    background: " transparent",
    color: "#3b5998",
    cursor: "pointer",
  },
});
export const BoxGoogle: any = styled("div")({});
export const AllOuterComponent: any = styled("div")({
  "& .MuiFormHelperText-root::before": {
    content: '""',
    display: "inline-block",
    background: "url(../assets/error-outline-red.svg) no-repeat",
    // width: "8px",
    height: "8px",
    backgroundSize: "100%",
    marginRight: "4px",
    position: "relative",
    top: "4px",
    margin: "0 4px 0 0px",
    padding: "4px",
  },
  "& .Step2style": {
    "@media screen and (max-width:480px)": {
      padding: "0px !important",
    },
  },
  "& .NextButton": {
    "@media screen and (max-width:480px)": {
      width: "100%",
    },
  },
  "& .Optstyle": {
    "@media screen and (max-width:480px)": {
      fontSize: "14px",
    },
  },
});
