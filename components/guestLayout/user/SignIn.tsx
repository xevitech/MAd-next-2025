import React, { useState, useContext, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { ThreeDots } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Slide } from "react-reveal";
import Image from "next/image";
import Auth from "@/auth/Auth";
import logstyle from "./login.module.css";
import {
  LoginWrapper,
  LoginOuterWrapper,
  LoginHeaderTextContainer,
  LoginHeaderHighlightText,
  StepContainer,
  LoginHeaderContainer,
  BelowSignUpBtnText,
  StepFooter,
  InputItemContainer,
  EyeIconContainer,
  LoginSignUpButtonContainer,
  BelowSignUpBtnTextContainer,
  PasswordResetContainer,
  PasswordResetDescriptionContainer,
  FooterTextForgotPasswordContainer,
  FooterTextForgotPassword,
  FooterTextForgotPasswordLinkText,
  CheckEmailContentContainer,
  CheckEmailHeaderText,
  CheckEmailContentText,
  CheckEmailHeaderIconContainer,
  CheckEmailFooterButtonContainer,
  RecoverPasswordText,
  ButtonLog,
  AllOuterComponent,
  Errormessage,
  LinkLive,
  BoxRedBackgroundImg,
} from "./styles";
import { HeaderBar } from "./common/HeaderBar";
import { Alert, Box, Divider, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { MyAppContext } from "contextApi/appContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiClient, CheckOs, getFirstUrl } from "@/components/common/common";
import LoginWithSocial from "./common/LoginWithSocial";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import {
  fetchIPAddress,
  setSellerSubList,
  setUserBasicInfo,
  setUserType,
} from "@/hooks/appReducers";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { setCookie } from "@/utils/cookieUtils";
import Link from "next/link";
import { BASE_URL, SECRET_KEY } from "@/utils/staticValues";
import { encryptData } from "@/utils/crypto-reusable";
import { setOtpExpirationTimeInLS } from "@/utils/commonFunctions/other";

interface ApiResponse {
  status: number;
  user: any;
  [key: string]: any;
}
const SignIn = () => {
  const router = useRouter();

  const { setUserDetails, setUserToken, setCompleteScreenLoader } =
    useContext(MyAppContext);
  const { socailLoader } = useSelector((state: any) => state.userData);

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<string>("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const recoverInputRef = useRef(null);
  // const [socailLoader, setSocialLoader] = useState<boolean>(false);
  const { ipAddress } = useSelector((state: any) => state.userData);
  const [blockmessage, setBlockMessage] = useState<any>({
    status: false,
    message: "",
  });
  const dispatch = useAppDispatch();

  const validation = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter email address"),
    password:
      activeStep === "forgot-password"
        ? Yup.string().notRequired()
        : Yup.string().required("Please enter password"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      if (activeStep === "forgot-password") {
        resetPassword(values);
      } else {
        handleLogin(values);
      }
    },
  });

  useEffect(() => {
    dispatch(fetchIPAddress());
  }, [dispatch]);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    let response: ApiResponse = await apiClient("auth/login", "post", {
      body: { email, password, ip: ipAddress, system_info: CheckOs() },
    });
console.log(response,"response")
    if (response.status === 200) {
      if (!response?.user?.user_certified) {
        const userId = response?.user?.id;
        let payload = { user_id: userId?.toString() as string };
        await fetch(`${BASE_URL}/auth/resendOtp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        // const encryptedId = encryptData(String(userId));
        await setOtpExpirationTimeInLS();
        router.push(`/verification-page?id=${userId}&email=${email}`);
        return;
      }
      Auth.login(response?.accessToken, response?.user, response?.expires_at);
      setCookie("token", response?.accessToken, response?.expires_at);
      setCompleteScreenLoader(false);
      setUserDetails(response?.user);
      setUserToken(response?.accessToken);
      dispatch(setUserBasicInfo(response?.user));
      localStorage.setItem("listData", JSON.stringify(response));
      if( response?.user?.type == "subuser" ){
        localStorage.setItem("userAccountType", response?.account_types[0]?.name )
      } else {
        localStorage.setItem("userAccountType", "Admin")
      }
      if (response?.user?.type == "subuser") {
        dispatch(setUserType(response?.user?.type));
        dispatch(setSellerSubList(response.account_types[0]?.user_permission));
        localStorage.setItem(
          "subSellerList",
          JSON.stringify(response.account_types[0]?.user_permission)
        );
          if(response.account_types[0]?.user_permission?.[0].dashboard?.view){
          router.push("/dashboard");
        } else if(response.account_types[0]?.user_permission?.[0].personal_profile?.view){
          router.push("/profile");
        }
        return;
      }

      if (router?.query?.minisite) {
        router.push(`/mini-site/${router?.query?.minisite}/home`);
      } else {
        toast.success("Login Successful!");
        if (typeof window !== "undefined") {
          if (response?.user?.type == "subuser"){
            if(response.account_types[0]?.user_permission?.[0].dashboard?.view){
          window.location.href = "/dashboard";
        } else if(response.account_types[0]?.user_permission?.[0].personal_profile?.view){
          window.location.href = "/profile";
        }
        return;
          } else {
            window.location.href = "/dashboard";
          } 
        }
      }
    } else {
      if (!response.status) {
        console.log(response.message);
        setBlockMessage({ status: true, message: response.message });
      }
    }
    setLoading(false);
  };

  const resetPassword = async ({ email }) => {
    setLoading(true);
    let response = await apiClient("auth/forgotPassword", "post", {
      body: { email },
    });
    if (response.status === 200) {
      toast.success(response?.message);
      setActiveStep("email-instructions");
      setLoading(false);
    } else {
      formik.setFieldError("email", response?.message);
      setLoading(false);
    }
  };
  const handleEmailChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("email", removeSpace);
    formik.setFieldTouched("email", true);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
    if (value.includes(" ")) {
      formik.setFieldError("email", "Email address cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("email", "");
      }, 2000);
    } else {
      formik.setFieldError("email", "");
    }
    if (emailInputRef.current) {
      emailInputRef.current.value = removeSpace;
      emailInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
    setBlockMessage({ status: false, message: "" });
  };

  useEffect(() => {
    if (router.query.username) {
      formik.setFieldValue("email", router.query.username);
    }
  }, [router.query.username]);

  const checkEmailForPasswordReset = () => {
    return (
      <>
        <CheckEmailContentContainer>
          <CheckEmailHeaderIconContainer>
            <Image
              width={90}
              height={90}
              src={"/assets/checkIcon.svg"}
              alt={""}
            />
          </CheckEmailHeaderIconContainer>
          <CheckEmailHeaderText>
            The password reset instructions have been sent to your email{" "}
            <b>{formik.values.email}</b>
          </CheckEmailHeaderText>
          <CheckEmailContentText>
            Check your email for further instructions
          </CheckEmailContentText>
          <Divider sx={{ margin: "8px", fontSize: "13px" }}>Or</Divider>
          <CheckEmailFooterButtonContainer>
            <Button
              style={{
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "rgba(216, 38, 47,0.75)",
                height: "36.5px",
                width: "85%",
                margin: "auto",
              }}
              variant="contained"
              onClick={() => {
                setActiveStep("login");
              }}
            >
              {loading ? (
                <ThreeDots
                  height="36px"
                  width="36px"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                "Continue to Log In"
              )}
            </Button>
          </CheckEmailFooterButtonContainer>
        </CheckEmailContentContainer>
      </>
    );
  };
  const handleRevoverEmailChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("email", removeSpace);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
    if (value.includes(" ")) {
      formik.setFieldError("email", "Email cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("email", "");
      }, 2000);
    } else {
      formik.setFieldError("email", "");
    }
    if (recoverInputRef.current) {
      recoverInputRef.current.value = removeSpace;
      recoverInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const forgotPassword = () => {
    return (
      <form onSubmit={formik.handleSubmit}>
        <PasswordResetContainer>
          <PasswordResetDescriptionContainer>
            {
              "Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it."
            }
          </PasswordResetDescriptionContainer>
          <InputItemContainer padding={{ padding: "20px 34px 34px 34px" }}>
            <TextField
              {...formik.getFieldProps("email")}
              size="small"
              error={formik.errors.email ? true : false}
              helperText={formik.errors.email ? formik.errors.email : ""}
              fullWidth
              label={<p style={{ fontWeight: "700" }}>Email</p>}
              id="email"
              placeholder="Enter your email"
              // onChange={(e) => {
              //   formik.setFieldValue("email", e.target.value);
              //   formik.setFieldError("email", "");
              // }}
              onChange={handleRevoverEmailChange}
              inputRef={recoverInputRef}
              value={formik.values.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineMail style={{ fontSize: "18px" }} />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </InputItemContainer>
          <LoginSignUpButtonContainer transform={{ transform: true }}>
            <Button
              style={{
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "rgba(216, 38, 47,0.75)",
                height: "36.5px",
                width: "85%",
                margin: "auto",
                transform: "translateY(-20px)",
                marginTop: "8px",
              }}
              variant="contained"
              type="submit"
            >
              {loading ? (
                <ThreeDots
                  height="36px"
                  width="36px"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </LoginSignUpButtonContainer>
          <FooterTextForgotPasswordContainer>
            <FooterTextForgotPassword>
              Need to Signin again?{" "}
              <FooterTextForgotPasswordLinkText
                onClick={() => {
                  setActiveStep("login");
                  formik.setFieldError("email", "");
                  setBlockMessage(false);
                }}
              >
                Click here to retry
              </FooterTextForgotPasswordLinkText>
            </FooterTextForgotPassword>
          </FooterTextForgotPasswordContainer>
        </PasswordResetContainer>
      </form>
    );
  };

  const login = () => {
    const handlePasswordChange = (e) => {
      const { value, selectionStart } = e.target;
      const removeSpace = value.replace(/\s/g, "");
      formik.setFieldValue("password", removeSpace);
      formik.setFieldTouched("password", true);
      const cursorPosition =
        selectionStart - (value.length - removeSpace.length);
      if (value.includes(" ")) {
        formik.setFieldError("password", "Password cannot contain spaces");
        setTimeout(() => {
          formik.setFieldError("password", "");
        }, 2000);
      } else {
        formik.setFieldError("password", "");
      }
      if (passwordInputRef.current) {
        passwordInputRef.current.value = removeSpace;
        passwordInputRef.current.setSelectionRange(
          cursorPosition,
          cursorPosition
        );
      }
    };

    return (
      <>
        <form onSubmit={formik.handleSubmit}>
          <StepContainer className={logstyle.stepcontainerlogin}>
            <InputItemContainer>
              <TextField
                {...formik.getFieldProps("email")}
                size="small"
                InputLabelProps={{ style: { fontSize: 14, fontWeight: 700 } }}
                error={formik.errors.email ? true : false}
                helperText={formik.errors.email ? formik.errors.email : ""}
                fullWidth
                placeholder="example@site.com"
                label="Email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={handleEmailChange}
                InputProps={{
                  autoComplete: "none",
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiOutlineMail style={{ fontSize: "18px" }} />
                    </InputAdornment>
                  ),
                }}
                inputRef={emailInputRef}
              ></TextField>
            </InputItemContainer>

            <InputItemContainer>
              {showPassword ? (
                <LightTooltip
                  title="Hide Password"
                  arrow
                  placement="top"
                  disableInteractive
                >
                  <EyeIconContainer>
                    <AiFillEyeInvisible
                      onClick={() => {
                        setShowPassword(false);
                      }}
                    />
                  </EyeIconContainer>
                </LightTooltip>
              ) : (
                <LightTooltip
                  title="Show Password"
                  arrow
                  placement="top"
                  disableInteractive
                >
                  <EyeIconContainer>
                    <AiFillEye onClick={() => setShowPassword(true)} />
                  </EyeIconContainer>
                </LightTooltip>
              )}

              <TextField
                {...formik.getFieldProps("password")}
                InputLabelProps={{ style: { fontSize: 14, fontWeight: 700 } }}
                size="small"
                error={formik.errors.password ? true : false}
                helperText={
                  formik.errors.password ? formik.errors.password : ""
                }
                type={showPassword ? "text" : "password"}
                fullWidth
                placeholder={"Min 8 characters"}
                label="Password"
                id="password"
                name="password"
                value={formik.values.password}
                // onChange={(e) => {
                //   const trimmedValue = e.target.value.trim();
                //   formik.setFieldError("password", "");
                //   if (trimmedValue == "") {
                //     formik.setFieldValue("password", "");
                //   } else {
                //     formik.setFieldValue("password", e.target.value);
                //   }
                //   setBlockMessage(false);
                // }}
                onChange={handlePasswordChange}
                InputProps={{
                  autoComplete: "new-password",
                  startAdornment: (
                    <InputAdornment position="start">
                      <RiLockPasswordLine style={{ fontSize: "18px" }} />
                    </InputAdornment>
                  ),
                }}
                inputRef={passwordInputRef}
              ></TextField>
            </InputItemContainer>
          </StepContainer>
          <LoginSignUpButtonContainer sx={{ margin: "-10px 0 0 0" }}>
            <BelowSignUpBtnTextContainer
              sx={{
                "@media screen and (max-width:600px)": { display: "none" },
              }}
            >
              <BelowSignUpBtnText
                onClick={() => {
                  ForgetPasswordHandle();
                  setBlockMessage(false);
                }}
              >
                Forgot Password?
              </BelowSignUpBtnText>
            </BelowSignUpBtnTextContainer>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              gap={1}
            >
              <ButtonLog
                className={logstyle.btnstyle}
                type="submit"
                style={{
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "rgba(216, 38, 47,0.75)",
                  width: "85%",
                  margin: "auto",
                }}
                variant="contained"
                disabled={loading}
              >
                {loading ? (
                  <ThreeDots
                    height="36"
                    width="36"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  "Log In"
                )}
              </ButtonLog>
              <BelowSignUpBtnTextContainer
                sx={{
                  display: "none",
                  "@media screen and (max-width:600px)": {
                    display: "block",
                    textAlign: "center",
                    paddingBottom: "0px",
                  },
                }}
              >
                <BelowSignUpBtnText
                  onClick={() => {
                    ForgetPasswordHandle();
                    setBlockMessage(false);
                  }}
                >
                  Forgot Password?
                </BelowSignUpBtnText>
              </BelowSignUpBtnTextContainer>
              <LoginWithSocial
                text="Or you can Login with"
                type={"login"}
                // setSocialLoader={setSocialLoader}
              />
            </Box>
          </LoginSignUpButtonContainer>
        </form>
        <StepFooter loginStep={{ loginStep: true }}></StepFooter>
      </>
    );
  };

  const returnStep = () => {
    if (activeStep === "login") {
      return login();
    } else if (activeStep === "forgot-password") {
      return forgotPassword();
    } else if (activeStep === "email-instructions") {
      return checkEmailForPasswordReset();
    }
  };

  const ForgetPasswordHandle = () => {
    if (formik.errors.email === "User not found!") {
      formik.setFieldValue("email", "");
    }
    formik.setFieldError("email", "");
    formik.setFieldError("password", "");
    formik.setFieldValue("password", "");
    setActiveStep("forgot-password");
  };
  const extractUrl = (message) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = message.match(urlRegex);
    return urls ? urls[0] : null;
  };

  const handleLinkClick = () => {
    const url = extractUrl(blockmessage.message);
    if (url) {
      window.open(url, '_blank');
    }
  };

  const renderMessage = () => {
    let url = blockmessage?.message.match(/https?:\/\/[^\s]+/);
    const newUrl = url?.[0] || "";
    let updatedMessage = blockmessage?.message.replace(newUrl, "");
    const quoteLink = newUrl ? (
      <Link href={newUrl} target="_blank">
        Contact Us
      </Link>
    ) : null;
    return (
      // <>
      //   <Errormessage>{updatedMessage}</Errormessage>
      //   {newUrl && (
      //     <LinkLive onClick={() => handleLinkClick()}>{quoteLink}</LinkLive>
      //   )}
      // </>
      <Box
        sx={{
          "& .Errormessage": {
            display: "inline",
          },

          "& .LinkLive": {
            display: "inline",
            textDecoration: "none",
            "& a": {
              color: "#d7282f",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          },
        }}
      >
        <Errormessage className="Errormessage">{updatedMessage}</Errormessage>
        {newUrl && (
          <LinkLive className="LinkLive" onClick={() => handleLinkClick()}>
            {quoteLink}
          </LinkLive>
        )}
      </Box>
    );
  };

  return (
    <BoxRedBackgroundImg>
      <AllOuterComponent>
        {!socailLoader && <HeaderBar text={"Sign Up"}></HeaderBar>}
        <LoginOuterWrapper className="signupform">
          {!socailLoader ? (
            <Slide top>
              <LoginWrapper page={{ page: activeStep }}>
                <>
                  <LoginHeaderContainer>
                    {activeStep === "forgot-password" ? (
                      ""
                    ) : (
                      <LoginHeaderTextContainer>
                        <LoginHeaderHighlightText>
                          Let's Go!
                        </LoginHeaderHighlightText>
                      </LoginHeaderTextContainer>
                    )}

                    {activeStep !== "login" && (
                      <RecoverPasswordText>
                        Recover Password
                      </RecoverPasswordText>
                    )}
                  </LoginHeaderContainer>

                  {returnStep()}
                </>
                {blockmessage?.status && (
                  <Alert
                    severity="error"
                    sx={{
                      fontSize: "11px",
                      margin: "10px auto 0",
                      // alignItems: "center",
                      "& .mui-ptiqhd-MuiSvgIcon-root": {
                        display: "none",
                      },
                      "@media screen and (max-width: 480px)": {
                        padding: "3px",
                        "&.MuiAlert-root": {
                          // flexDirection: "column",
                          // alignItems: "center",
                        },
                        "& .MuiAlert-icon": {
                          marginRight: "0",
                          "@media screen and (max-width: 480px)": {
                            paddingTop: "2px",
                            fontSize: "12px",
                            marginRight: "5px",
                          },
                        },
                        "& .MuiAlert-message": {
                          padding: "0 !important",
                        },

                        "& .MuiAlert-action": {
                          display: "none",
                        },
                      },
                      "@media (min-width: 600px)": {
                        width: "calc(100% - 68px)",
                      },
                    }}
                    onClose={() =>
                      setBlockMessage({ status: false, message: "" })
                    }
                  >
                    {renderMessage()}
                  </Alert>
                )}
              </LoginWrapper>
            </Slide>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                background: "#fffff",
              }}
            >
              <img src="/assets/Loader/Power-Logo-Loader.gif" alt="loader" />
            </Box>
          )}
        </LoginOuterWrapper>
      </AllOuterComponent>
    </BoxRedBackgroundImg>
  );
};

export default SignIn;
