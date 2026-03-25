import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";
import { ThreeDots } from "react-loader-spinner";
import { MuiOtpInput } from "mui-one-time-password-input";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-reveal";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  apiClient,
  PasswordMessage,
  passwordRules,
} from "@/components/common/common";
import { PhoneInput } from "react-international-phone";
import {
  OuterWrapper,
  OAuthSignUpBtnOuterContainer,
  HeaderTextContainer,
  HeaderHighlightText,
  HeaderContainer,
  Step2FooterBtnContainer,
  ConfirmationDescription,
  StepFooter,
  Step2FooterLeftButtons,
  InputFieldsContainer,
  InputItemContainer,
  StepHeading,
  EyeIconContainer,
  Step1FooterTextContainer,
  Step1FooterText,
  Step2ToggleButtonsContainer,
  OtpContainer,
  OtpHeader,
  Text,
  InnerWrapper,
  LogButton2,
  Goback,
  SignInStepContainer,
  StepContainerLast,
  SignUpWrapper,
  StepContainerTop,
  AllOuterComponent,
  TermsError,
  ErrorICon,
  SignUpOuterBox,
  TermsAndPrivacy,
  BoxRedBackgroundImg,
  Errormessage,
  LinkLive,
} from "./styles";
import Auth from "@/auth/Auth";
import { HeaderBar } from "./common/HeaderBar";
import { BASE_URL } from "@/utils/staticValues";
import ColorToggleButton from "@/components/common/toggleButtonGroupCustom";
import CountrySelect from "@/components/common/countrydropdown/Index";
import { useAppDispatch } from "redux/store";
import LoginWithSocial from "./common/LoginWithSocial";
import MobileInputCommon from "@/components/common/PhoneInput";
import { Alert, Box, Typography } from "@mui/material";
import { setUserBasicInfo } from "@/hooks/appReducers";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCookie } from "@/utils/cookieUtils";
import Link from "next/link";
import { setOtpExpirationTimeInLS } from "@/utils/commonFunctions/other";

interface UserData {
  id: number;
  name: string;
  email: string;
}

const SignUp = () => {
  const router = useRouter();
  const emailclear = useRef(null);
  const max750px = useMediaQuery("(max-width:750px)");
  const max540px = useMediaQuery("(max-width:540px)");
  const max320px = useMediaQuery("(max-width:320px)");
  const breakPoints = { max750px, max540px, max320px };
  const [userData, setUserData] = useState<UserData>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendOtpLoading, setResendOtpLoading] = useState<boolean>(false);
  const [validate, setValidation] = useState<boolean>(false);
  const { socailLoader } = useSelector((state: any) => state.userData);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [numLockOn, setNumLockOn] = useState(false);
  const [deletedAccount, setDeletedAccount] = useState({
    status: false,
    message: null,
  });
  const [otpMessage, setOtpMessage] = useState<any>({
    status: "",
    message: "",
  });
  const [cursorPos, setCursorPos] = useState(0);
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState(120);
  const validation = Yup.object().shape({
    fullName:
      activeStep === 0
        ? Yup.string()
            .matches(
              /^[a-zA-Z ]+$/,
              "Please enter valid full name without numbers and special characters"
            )
            .min(2, "Minimum 2 characters")
            .required("Please enter full name")
        : Yup.string().notRequired(),
    mobileNumber:
      activeStep === 0
        ? Yup.string()
            .required("Please enter mobile number")
            .test(
              "custom-validation",
              "Please enter correct mobile no",
              function (value) {
                return validate
                  ? true
                  : this.createError({
                      message: "Please enter correct mobile no",
                    });
              }
            )
        : Yup.string().notRequired(),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter email"),
    password:
      activeStep == 0
        ? Yup.string()
            .matches(passwordRules, {
              message: PasswordMessage,
            })
            .required("Please enter password")
            .min(8, PasswordMessage)
        : Yup.string().notRequired(),
    country_id:
      activeStep == 1
        ? Yup.string().required("Please select country")
        : Yup.string().notRequired(),
    companyName:
      activeStep == 1
        ? Yup.string()
            .required("Please enter company name")
            .max(
              100,
              "Company name is too long. Please limit it to 100 characters."
            )
        : Yup.string().notRequired(),
    role:
      activeStep == 1
        ? Yup.string().nullable().required("User type required!")
        : Yup.string().notRequired(),
  });
  let formik = useFormik({
    initialValues: {
      fullName: "",
      country: "",
      mobileNumber: "",
      password: "",
      termsAndConditions: "",
      email: "",
      role: "seller",
      companyName: "",
      country_id: "",
      mobile_code: "",
      otp: "",
      mobile_country_code: "",
      checked: false,
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setDeletedAccount({
        status: false,
        message: null,
      });
      const {
        fullName,
        mobileNumber,
        password,
        email,
        role,
        companyName,
        country_id,
        mobile_code,
        mobile_country_code,
      } = values;
      setLoading(true);

      if (activeStep === 0) {
        let validEmail = await apiClient("auth/isExistingUser", "post", {
          body: { email, phone: mobileNumber },
        });

        if (validEmail.status === 200 || validEmail.status) {
          if (validEmail?.email || validEmail?.phone) {
            if (validEmail?.email && !validEmail?.deleted)
              formik.setFieldError("email", validEmail?.email_message);
            validEmail?.phone &&
              formik.setFieldError(
                "mobileNumber",
                "Mobile number already exists"
              );
            validEmail?.deleted &&
              setDeletedAccount({
                status: true,
                message: validEmail?.email_message,
              });
          } else {
            setActiveStep(1);
          }
        }
      }
      setLoading(false);
      if (activeStep === 1) {
        setLoading(true);
        setTimeLeft(120);
        const time = new Date();
        const expirationTime = time.getTime() + 120 * 1000;
        setOtpExpirationTimeInLS();
        let response = await apiClient("auth/signup", "post", {
          body: {
            name: fullName,
            email,
            password,
            phone_code: mobile_code,
            phone: mobileNumber,
            company_name: companyName,
            company_location: country_id,
            role,
            mobile_country_code,
          },
        });

        if (response.status === 200) {
          setUserData(response.user);
          setActiveStep(2);
          const currentTime = Date.now();
          setUserData(response.user);
          toast.success("OTP has been sent to your registered email address");
          localStorage.removeItem("formData");
        } else {
          formik.setFieldError(
            "companyName",
            response?.message !== "Please enter company name"
              ? "CUSTOM_COMPANY_NAME_ERROR"
              : response?.message
          );
          localStorage.setItem("companyName", companyName);
        }
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const storedExpirationTime = parseInt(
      localStorage.getItem("otpExpirationTime"),
      10
    );
    if (storedExpirationTime) {
      const now = Date.now();
      const remainingTime = storedExpirationTime - now;

      if (remainingTime > 0) {
        setTimeLeft(Math.floor(remainingTime / 1000));
      } else {
        setTimeLeft(0);
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      const storedExpirationTime = parseInt(
        localStorage.getItem("otpExpirationTime"),
        10
      );
      const currentTime = Date.now();

      const actualTimeLeft = Math.floor(
        (storedExpirationTime - currentTime) / 1000
      );

      setTimeLeft((prevTime) => {
        if (Math.abs(actualTimeLeft - prevTime) > 1) {
          return actualTimeLeft > 0 ? actualTimeLeft : 0;
        }

        return prevTime > 1 ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      formik.setValues(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOtpMessage({ status: "", message: "" });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [otpMessage]);

  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("mobile_code", mobile_code);
    formik.setFieldValue("country_id", country_code);
    formik.setFieldValue("mobile_country_code", country_code);
    formik.setFieldValue("mobileNumber", phone);
    formik.setFieldError("mobileNumber", "");
    setValidation(isValid);
  };
  // const handleNumlock = (event) => {
  //   if (event?.getModifierState) {
  //     const isNumLockActive = event?.getModifierState("NumLock");
  //     if ((!isNumLockActive) && (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
  //       event.preventDefault();
  //     }
  //   }
  // };

  const ValidateField = (field: any) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };

  const resendOtp = async () => {
    formik.setFieldValue("otp", "");
    let payload = { user_id: userData?.id?.toString() as string };
    setResendOtpLoading(true);
    const response = await fetch(`${BASE_URL}/auth/resendOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (data?.status) {
      toast.success(data?.message);
      setOtpExpirationTimeInLS();
      setTimeLeft(120);
    }
    setResendOtpLoading(false);
  };

  const modifyEmail = (email: string) => {
    return email.replace(
      /(.{2})(.*)(?=@)/,
      function (gp1: string, gp2: string, gp3: string) {
        for (let i = 0; i < gp3.length; i++) {
          gp2 += "*";
        }
        return gp2;
      }
    );
  };

  const verifyOtp = async () => {
    let payload = {
      otp: formik.values.otp,
      user_id: userData?.id.toString(),
      // is_verified:'yes'
    };
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/verifyOtp`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        method: "POST",
      });

      const data = await response.json();
      setLoading(false);
      if (data?.status) {
        setTimeLeft(0);
        dispatch(setUserBasicInfo(data?.user));
        Auth.login(data?.accessToken, data?.user, data?.expires_at);
        toast.success(
          "OTP verified successfully. You have been successfully logged in."
        );
        setCookie("token", data?.accessToken, data?.expires_at);
        setTimeout(() => {
          router.push({
            pathname: "/dashboard",
            // pathname: "/OnBoardingStepForm",
          });
        }, 3000);
      } else {
        if (!formik.values.otp) {
          setOtpMessage({
            status: "error",
            message: "Please enter otp",
          });
        } else {
          setOtpMessage({ status: "error", message: data?.message });
        }
      }

      setLoading(false);
    } catch (error) {
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
  };

  const handlePasswordChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("password", removeSpace);
    formik.setFieldTouched("password", true);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
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

  const onEnterHandler = () => {
    const { companyName, country_id, role } = formik.values;
    if (companyName && country_id && role) {
      formik.handleSubmit();
    }
  };

  const handleFocus = (e) => {
    e.target.setSelectionRange(cursorPos, cursorPos);
  };
  const renderMessage = () => {
    // let url = blockmessage?.message.match(/https?:\/\/[^\s]+/);
    const newUrl = "/contact-us";
    const quoteLink = newUrl ? (
      <Link href={newUrl} target="_blank">
        Contact Us
      </Link>
    ) : null;
    return (
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
        <Errormessage className="Errormessage">
          {deletedAccount?.message}
        </Errormessage>
        {newUrl && <LinkLive className="LinkLive">{quoteLink}</LinkLive>}
      </Box>
    );
  };

  const step1 = () => {
    return (
      <SignUpOuterBox>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            formik.handleSubmit(e);
          }}
          className="signupform "
        >
          <StepContainerTop
            breakPoint={breakPoints}
            container={{ signup: true }}
          >
            <InputFieldsContainer breakPoint={breakPoints}>
              <InputItemContainer breakPoint={breakPoints}>
                <TextField
                  InputLabelProps={{ style: { fontSize: 14, fontWeight: 700 } }}
                  size="small"
                  {...formik.getFieldProps("fullName")}
                  error={ValidateField("fullName")}
                  helperText={
                    ValidateField("fullName") && formik.errors.fullName
                  }
                  fullWidth
                  placeholder="John Doe"
                  autoFocus
                  label="Full Name"
                  id="fullName"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const trimmedValue = newValue.trim();

                    if (trimmedValue !== "") {
                      if (newValue.length <= 50) {
                        if (
                          !newValue.startsWith(" ") ||
                          trimmedValue.length > 0
                        ) {
                          formik.setFieldValue("fullName", newValue);
                          formik.setFieldError("fullName", "");
                        }
                      } else {
                        formik.setFieldValue("fullName", newValue.slice(0, 50));
                        formik.setFieldError(
                          "fullName",
                          "Full name is too long. Please limit it to 50 characters."
                        );
                      }
                    } else {
                      formik.setFieldValue("fullName", "");
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineUser style={{ fontSize: "15px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </InputItemContainer>

              <InputItemContainer breakPoint={breakPoints}>
                <MobileInputCommon
                  className="mobilecommon"
                  mobileNumber={formik.values.mobileNumber}
                  mobileCode={formik.values.mobile_code}
                  countryCode={formik.values.mobile_country_code}
                  handleChange={setMobileNumber}
                  label={"Mobile No."}
                  helperText={formik.errors.mobileNumber}
                  // handleKeys={handleNumlock}
                />
              </InputItemContainer>

              <InputItemContainer breakPoint={breakPoints}>
                <TextField
                  {...formik.getFieldProps("email")}
                  error={ValidateField("email")}
                  className={`${
                    formik.errors.email ===
                    "Your account has been deleted. Please contact support for further assistance."
                      ? "error-class"
                      : ""
                  } `}
                  helperText={ValidateField("email") && formik.errors.email}
                  InputLabelProps={{ style: { fontSize: 14, fontWeight: 700 } }}
                  size="small"
                  name="email"
                  fullWidth
                  placeholder="example@site.com"
                  label="Email"
                  id="email"
                  autoFocus={false}
                  onPaste={(e) => {
                    emailPaste(e); // your existing paste handler
                    setTimeout(() => handleEmailChange(e), 0); // Trigger onChange after paste
                  }}
                  onChange={handleEmailChange}
                  onFocus={handleFocus}
                  value={formik.values.email}
                  InputProps={{
                    autoComplete: "off",
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineMail style={{ fontSize: "15px" }} />
                      </InputAdornment>
                    ),
                  }}
                  inputRef={emailInputRef}
                />

                {/* <TextField
                  {...formik.getFieldProps("email")}
                  error={ValidateField("email")}
                  helperText={ValidateField("email") && formik.errors.email}
                  ref={emailclear}
                  InputLabelProps={{ style: { fontSize: 14, fontWeight: 700 } }}
                  size="small"
                  name="email"
                  fullWidth
                  placeholder="example@site.com"
                  label="Email"
                  id="email"
                  autoFocus={false}
                  onPaste={(e) => emailPaste(e)}
                  onChange={(e) => {
                    let regexp = /^\S*$/;
                    if (regexp.test(e.target.value))
                      formik.setFieldValue("email", e.target.value), formik.setFieldError("email", "");
                  }}
                  value={formik.values.email}
                  InputProps={{
                    autoComplete: "off",
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineMail style={{ fontSize: "15px" }} />
                      </InputAdornment>
                    ),
                  }}
                ></TextField> */}
              </InputItemContainer>
              <InputItemContainer breakPoint={breakPoints}>
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
                      {" "}
                      <AiFillEye onClick={() => setShowPassword(true)} />
                    </EyeIconContainer>
                  </LightTooltip>
                )}
                <TextField
                  className={`${
                    formik.errors.password === PasswordMessage
                      ? "error-class"
                      : ""
                  } `}
                  sx={{
                    "& input::placeholder": {
                      fontSize: "12px !important",
                    },
                  }}
                  size="small"
                  placeholder={"Min 8 characters"}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  label="Password"
                  id="password"
                  {...formik.getFieldProps("password")}
                  error={ValidateField("password")}
                  helperText={
                    ValidateField("password") && formik.errors.password
                  }
                  // onChange={(e) => {
                  //   const trimmedValue = e.target.value.trim();
                  //   formik.setFieldError("password", "");
                  //   if (trimmedValue === "") {
                  //     formik.setFieldValue("password", "");
                  //   } else {
                  //     formik.setFieldValue("password", e.target.value);
                  //   }
                  // }}
                  onChange={handlePasswordChange}
                  value={formik.values.password}
                  InputLabelProps={{ style: { fontSize: 14, fontWeight: 700 } }}
                  InputProps={{
                    autoComplete: "new-password",
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiLockPasswordLine style={{ fontSize: "15px" }} />
                      </InputAdornment>
                    ),
                  }}
                  inputRef={passwordInputRef}
                ></TextField>
              </InputItemContainer>
            </InputFieldsContainer>
          </StepContainerTop>

          <Box
            sx={{
              marginTop: "15px",
              "@media screen and (max-width:480px)": { margin: "30px 0 0 0" },
            }}
          >
            <LogButton2 type="submit" className="NextButton">
              {loading ? (
                <ThreeDots
                  height="25"
                  width="40"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                "Next"
              )}
            </LogButton2>
          </Box>
        </form>
        {deletedAccount?.status && renderMessage()}
        <StepFooter breakPoint={breakPoints} className="SignupWith">
          <Step1FooterTextContainer breakPoint={breakPoints}>
            <OAuthSignUpBtnOuterContainer
              breakPoint={breakPoints}
            ></OAuthSignUpBtnOuterContainer>
            <Step1FooterText breakPoint={breakPoints}>
              <LoginWithSocial text="Or you can Signup with" type="signup" />
            </Step1FooterText>
          </Step1FooterTextContainer>
        </StepFooter>
        {/* <Step1FooterText
          className="TermandconditionBox"
          breakPoint={breakPoints}
        >
          By clicking the next button, you agree to our
          <TermsAndPrivacy
            component={"span"}
            onClick={() => {
              localStorage.setItem("formData", JSON.stringify(formik.values));
              router.push({
                pathname: "/terms-and-condition",
              });
            }}
          >
            Terms of Service &nbsp;
          </TermsAndPrivacy>
          and
          <TermsAndPrivacy
            component={"span"}
            onClick={() => {
              localStorage.setItem("formData", JSON.stringify(formik.values));
              router.push({
                pathname: "/privacy-policy",
              });
            }}
          >
            Privacy Policy.
          </TermsAndPrivacy>
          {formik.errors.checked && (
            <TermsError>
              <ErrorICon src="/assets/error-outline-red.svg" alt="" />{" "}
              {formik.errors.checked}
            </TermsError>
          )}
        </Step1FooterText> */}
      </SignUpOuterBox>
    );
  };

  const step2 = () => {
    return (
      <Box className="signupform2 signupform">
        <form onSubmit={formik.handleSubmit} style={{ padding: "0 0 12px 0" }}>
          <SignInStepContainer
            breakPoint={breakPoints}
            step={{ step2: true }}
            className="Step2style"
          >
            <StepHeading breakPoint={breakPoints}>
              Tell us about your company{" "}
            </StepHeading>

            <InputFieldsContainer breakPoint={breakPoints} sx={{ gap: `$` }}>
              <InputItemContainer breakPoint={breakPoints}>
                <TextField
                  {...formik.getFieldProps("companyName")}
                  onChange={(e) => {
                    const input = e.target;
                    const newValue = input.value;
                    const cursorPosition = input.selectionStart;
                    const trimmedValue = newValue.trimStart();
                    if (trimmedValue.length > 100) {
                      formik.setFieldError(
                        "companyName",
                        "Company name content is too long. Please limit it to 100 characters."
                      );
                      return;
                    }
                    if (trimmedValue !== newValue) {
                      formik.setFieldValue("companyName", trimmedValue);
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition -
                          (newValue.length - trimmedValue.length);
                      });
                    } else {
                      formik.setFieldValue("companyName", newValue);
                      formik.setFieldError("companyName", "");
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition -
                          (newValue.length - trimmedValue.length);
                      });
                    }
                  }}
                  className={
                    formik.errors.companyName ? "redBorder error-class" : ""
                  }
                  error={Boolean(formik.errors.companyName)}
                  helperText={
                    ValidateField("companyName") &&
                    formik.errors.companyName &&
                    formik.touched.companyName &&
                    (formik.errors.companyName ===
                    "CUSTOM_COMPANY_NAME_ERROR" ? (
                      <div style={{ color: "#d7282f" }}>
                        If you want to register with this company name, you can{" "}
                        <a
                          style={{
                            color: "#1976d2",
                            textDecoration: "underline",
                          }}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push("/recreate-company");
                          }}
                        >
                          make a request
                        </a>{" "}
                        or{" "}
                        <a
                          style={{
                            color: "#1976d2",
                            textDecoration: "underline",
                          }}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push("/contact-us");
                          }}
                        >
                          contact us
                        </a>
                        .
                      </div>
                    ) : (
                      <div style={{ color: "#1976d2", marginTop: "8px" }}>
                        {formik.errors.companyName}
                      </div>
                    ))
                  }
                  size="small"
                  fullWidth
                  name="companyName"
                  label="Company Name"
                  id="companyName"
                  InputLabelProps={{ style: { fontSize: 14, fontWeight: 700 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BsBuilding style={{ fontSize: "15px" }} />
                      </InputAdornment>
                    ),
                  }}
                  disabled={loading}
                />
              </InputItemContainer>

              <InputItemContainer breakPoint={breakPoints}>
                <CountrySelect
                  country={formik.values.country_id}
                  setCountry={(values) =>
                    formik.setFieldValue("country_id", values)
                  }
                  label="Country"
                  styleProps={{ width: "100%" }}
                  error={
                    !formik.values.country_id
                      ? formik.errors?.country_id
                      : false
                  }
                  errorText={
                    formik.values.country_id ? "" : formik.errors?.country_id
                  }
                  disableField={loading}
                  disableClearable={formik.values.country_id ? false : true}
                />
              </InputItemContainer>
            </InputFieldsContainer>
            <InputFieldsContainer breakPoint={breakPoints}>
              <InputItemContainer
                className="userTypespace"
                transform={{ up: true }}
                flexColumn={true}
                breakPoint={breakPoints}
              >
                <p className="account_type">
                  <Text>User Type</Text>
                </p>
                <Step2ToggleButtonsContainer breakPoint={breakPoints}>
                  <ColorToggleButton
                    value={formik.values.role}
                    setValue={(value) => {
                      formik.setFieldValue("role", value);
                      formik.setFieldError("role", "");
                    }}
                    options={["seller", "buyer"]}
                    error={formik.touched.role && formik.errors.role}
                    errorText={formik.touched.role ? formik.errors.role : ""}
                    onEnterEvent={onEnterHandler}
                    disableRole={loading}
                  ></ColorToggleButton>
                </Step2ToggleButtonsContainer>
              </InputItemContainer>
            </InputFieldsContainer>
          </SignInStepContainer>

          <LogButton2 type="submit" variant="contained" className="NextButton">
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
              "Next"
            )}
          </LogButton2>
        </form>
      </Box>
    );
  };
  const handlePaste = (event: React.ClipboardEvent) => {
    let paste = event.clipboardData.getData("text");
    event.preventDefault();
    const numericPaste = paste.replace(/\D/g, "");
    formik.setFieldValue("otp", numericPaste);
  };

  const emailPaste = (event: React.ClipboardEvent) => {
    let paste = event.clipboardData.getData("text");
    event.preventDefault();
    formik.setFieldValue("email", paste);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      !/[0-9]/.test(e.key)
    ) {
      if (e.key === "Enter") {
        if (formik.values.otp.length === 4) {
          verifyOtp();
        }
      }
    }
  };

  const step3 = () => {
    return (
      <>
        <StepContainerLast>
          <ConfirmationDescription className="Optstyle">
            Please enter the one time password to verify your account
          </ConfirmationDescription>
          <OtpContainer>
            <OtpHeader>
              OTP has been sent to{" "}
              <span style={{ fontWeight: "500", color: "#231f20" }}>
                {modifyEmail(formik.values?.email as string)}
              </span>
            </OtpHeader>
            <MuiOtpInput
              autoFocus={true}
              className="otptextField"
              {...formik.getFieldProps("otp")}
              value={formik.values.otp}
              onChange={(value) => {
                const numericValue = value.replace(/\D/g, "");
                formik.setFieldValue("otp", numericValue);
                setOtpMessage({ status: false, message: "" });
              }}
              onKeyDown={(e) => handleKeyDown(e)}
              onPaste={(e) => handlePaste(e)}
            />
          </OtpContainer>
          {timeLeft !== 0 && (
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "13px",
                color: "#212529",
              }}
            >
              You can resend the OTP in <strong> {timeLeft}</strong> seconds
            </Typography>
          )}
        </StepContainerLast>

        <LogButton2
          style={{
            fontWeight: "bold",
            textTransform: "none",
            height: "45px",
            width: "calc(100% - 68px)",
            display: "inline-flex",
            // margin: "1rem auto 0",
            backgroundColor: "rgba(216, 38, 47, 0.75)",
            color: "#fff",
          }}
          // disabled={formik.values.otp ? false : true}
          variant="contained"
          onClick={() => {
            verifyOtp();
          }}
        >
          {loading ? (
            <ThreeDots
              height="40"
              width="40"
              radius="9"
              color="white"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            "Submit OTP"
          )}
        </LogButton2>
        {otpMessage?.message !== "" && (
          <Alert
            sx={{
              ".MuiAlert-icon": {
                color: `${
                  otpMessage?.status == "success" ? "green" : "#D7282F"
                }`,
                fontSize: "20px",
                padding: "8px 0 px 2px",
              },
              fontSize: "12px",
              cursor: "pointer",
              margin: "10px auto 0",
              alignItems: "center",
              height: "45px",
              width: "calc(100% - 68px)",
            }}
            severity={otpMessage?.status}
          >
            {otpMessage?.message}
          </Alert>
        )}
        <StepFooter>
          <Step2FooterBtnContainer justifyContent={{ spaceBetween: true }}>
            <Step2FooterLeftButtons>
              <Goback
                onClick={() => resendOtp()}
                disabled={timeLeft !== 0 ? true : false}
              >
                {resendOtpLoading ? (
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="#d7282f"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  "Resend OTP"
                )}
              </Goback>
            </Step2FooterLeftButtons>
          </Step2FooterBtnContainer>
        </StepFooter>
      </>
    );
  };
  return (
    // <AllOuterComponent className="signupform">
    <BoxRedBackgroundImg>
      <AllOuterComponent className="">
        {!socailLoader && <HeaderBar text={"Log In"}> </HeaderBar>}
        <OuterWrapper>
          <InnerWrapper breakPoints={breakPoints}>
            {!socailLoader ? (
              <Slide top>
                <SignUpWrapper breakPoint={breakPoints}>
                  <>
                    <HeaderContainer breakPoint={breakPoints}>
                      <HeaderTextContainer>
                        <HeaderHighlightText>Sign Up!</HeaderHighlightText>
                      </HeaderTextContainer>
                    </HeaderContainer>

                    {activeStep === 0 && step1()}
                    {activeStep === 1 && step2()}
                    {activeStep === 2 && step3()}

                    {activeStep === 1 && (
                      <LightTooltip
                        arrow
                        placement="top"
                        title={` ${
                          activeStep == 1 ? "Back" : "Back to Sign Up"
                        }`}
                        disableInteractive
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "36px",
                            left: "16px",
                            "@media screen and (max-width:600px)": {
                              top: "22px",
                            },
                          }}
                          onClick={() => {
                            setActiveStep((prev) => prev - 1);
                          }}
                        >
                          <ArrowBackOutlinedIcon
                            sx={{
                              color: "#231f20",
                              fontSize: "22px",
                              cursor: "pointer",
                              "&:hover": {
                                color: "#d7282f",
                                transform: "all ease .3s",
                              },
                            }}
                          />
                        </Box>
                      </LightTooltip>
                    )}
                  </>
                </SignUpWrapper>
              </Slide>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  background: "#fffff",
                }}
              >
                <img src="/assets/Loader/Power-Logo-Loader.gif" alt="loder" />
              </Box>
            )}
          </InnerWrapper>
        </OuterWrapper>
      </AllOuterComponent>
    </BoxRedBackgroundImg>
  );
};

export default SignUp;
