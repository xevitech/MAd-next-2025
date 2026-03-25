import React, { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Alert, Stack, TextField, Typography } from "@mui/material";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import * as Yup from "yup";
import {
  Goback,
  InputItemContainer,
  Step2FooterLeftButtons,
} from "@/components/guestLayout/user/styles";
import { Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import Auth from "@/auth/Auth";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/staticValues";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  ButtonContainer,
  EyeIconContainer,
  ModalHeader,
  OtpHeading,
  OtpInputWrapper,
  OtpWrapper,
  OuterContainer,
  StepHeading,
} from "./styles";
import { useAppDispatch } from "redux/store";
import { profileData } from "@/hooks/appReducers";
import { useFormik } from "formik";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { useSelector } from "react-redux";
import { VerifyMobileBoxx } from "../verifyMobile/styles";

export const EditEmail = (props) => {
  const { open, closeModal, getProfile } = props;
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailInputRef=useRef(null);
  const recoverInputRef=useRef(null);
  const [otpMessage, setOtpMessage] = useState<any>({
    status: "",
    message: "",
  });
  const [alertMessage, setAlertMessage] = useState<any>({
    status: false,
    message: "",
  });
  const { social_type } = useSelector((state: any) => state.userData);
  const [timeLeft, setTimeLeft] = useState(120);
  const dispatch = useAppDispatch();
  const verifyEmail = async () => {
    const { email } = formik.values;
    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await fetch(`${BASE_URL}/profile/verify/email`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.status) {
        setActiveStep(3);
        setLoading(false);
        setTimeLeft(120);
        setLoading(false);
        toast.success(data.message);
        var myData = JSON.parse(localStorage.getItem("userData"));
        myData["email"] = email;
        localStorage.setItem("userData", JSON.stringify(myData));
      } else {
        setLoading(false);
        formik.setFieldError("email", data.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const checkPassword = async () => {
    const { password } = formik.values;
    try {
      const formData = new FormData();
      setLoading(true);
      formData.append("password", password);
      const response = await fetch(`${BASE_URL}/profile/check_password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        setLoading(false);
        setActiveStep(2);
      } else {
        setLoading(false);
        formik.setFieldError("password", data.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    outline: "none",
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: "6px",
    p: 3,

    "@media (max-width:480px)": {
      width: "90%",
      padding: "20px 10px",

      "& svg": {
        fontSize: "22px",
      },
    },
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOtpMessage({ status: "", message: "" });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [otpMessage]);

  const verifyOtp = async () => {
    const { otp } = formik.values;
    const formData = new FormData();
    formData.append("otp", otp);
    formik.errors.otp = "";

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/profile/verify/email_check`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        setOtpMessage({
          status: "success",
          message: "Email verified successfully",
        });
        setLoading(false);
        dispatch(profileData());
        setActiveStep(1);
        getProfile();
        CloseModal();
        toast.success("Email saved successfully.");
      } else {
        setLoading(false);
        setOtpMessage({ status: "error", message: data?.message });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const numericPaste = paste.replace(/\D/g, "");
    if (numericPaste) {
      formik.setFieldValue("otp", numericPaste);
      setOtpMessage({ status: "", message: "" });
    } else {
      setOtpMessage({
        status: "error",
        message: "Only numeric values are allowed",
      });
    }
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
  const validation = Yup.object().shape({
    password:
      activeStep == 1
        ? Yup.string().required("Please enter password")
        : Yup.string().notRequired(),
    otp:
      activeStep == 3
        ? Yup.string().required("Please enter otp")
        : Yup.string().notRequired(),
    email:
      activeStep == 2
        ? Yup.string()
            .email("Please enter valid email")
            .required("Please enter email")
        : Yup.string().notRequired(),
  });

  const formik = useFormik({
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      password: "",
      email: "",
      otp: "",
    },
    onSubmit: () => {
      if (activeStep == 1) checkPassword();
      if (activeStep == 2) {
        setLoading(true);
        verifyEmail();
      }
      if (activeStep == 3) {
        setLoading(true);
        verifyOtp();
      }
    },
  });

  const CloseModal = () => {
    setActiveStep(1);
    formik.resetForm();
    setLoading(false);
    closeModal();
  };

  const handleEmailPasswordChange = (e) => {
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
    if (emailInputRef.current) {
      emailInputRef.current.value = removeSpace;
      emailInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const handleRevoverEmailChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("email", removeSpace);
    formik.setFieldTouched("email", true);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
    if (value.includes(" ")) {
      formik.setFieldError("email", "Email cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("email","");
      }, 2000);
    } else {
      formik.setFieldError("email", "");
    }
    if (recoverInputRef.current) {
      recoverInputRef.current.value = removeSpace;
      recoverInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  return (
    <>
      {open && (
        <div>
          <Modal
            open={open}
            onClose={CloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Button
                className="forModalButton"
                onClick={CloseModal}
                color="error"
                sx={{
                  minHeight: "46px",
                  minWidth: "46px",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "9px",
                  right: "11px",
                  "@media screen and (max-width:600px)": {
                    right: "0px",
                    top: "0px",
                  },
                }}
              >
                <CloseOutlinedIcon style={{ cursor: "pointer" }} />
              </Button>
              {activeStep === 1 && (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <ModalHeader>Current Password </ModalHeader>
                    <InputItemContainer>
                      {/* {!showPassword ? (
                        <LightTooltip
                          title="Show Password"
                          arrow
                          placement="top"
                          disableInteractive
                        >
                          <EyeIconContainer sx={{ top: "6px" }}>
                            <AiFillEye
                              onClick={() => {
                                setShowPassword(true);
                              }}
                            />
                          </EyeIconContainer>
                        </LightTooltip>
                      ) : (
                        <LightTooltip
                          title="Hide Password"
                          arrow
                          placement="top"
                          disableInteractive
                        >
                          <EyeIconContainer sx={{ top: "6px" }}>
                            <AiFillEyeInvisible
                              onClick={() => setShowPassword(false)}
                            />
                          </EyeIconContainer>
                        </LightTooltip>
                      )} */}
                      {!showPassword ? (
                        <LightTooltip
                          title="Hide Password"
                          arrow
                          placement="top"
                          disableInteractive
                        >
                          <EyeIconContainer>
                            <AiFillEyeInvisible
                              onClick={() => setShowPassword(true)}
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
                            <AiFillEye
                              onClick={() => {
                                setShowPassword(false);
                              }}
                            />
                          </EyeIconContainer>
                        </LightTooltip>
                      )}

                      <TextField
                        style={{ margin: "auto" }}
                        InputLabelProps={{
                          style: { fontSize: 14, fontWeight: 700 },
                          shrink: true,
                        }}
                        size="small"
                        autoFocus
                        error={formik.errors.password ? true : false}
                        helperText={formik.errors.password}
                        type={!showPassword ? "text" : "password"}
                        fullWidth
                        label="Password"
                        id="password"
                        value={formik.values.password}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && formik.values.password) {
                            e.preventDefault();
                            checkPassword();
                          }
                        }}
                        // onChange={(e) => {
                        //   formik.setFieldValue("password", e.target.value);
                        //   formik.setFieldError("password", "");
                        // }}
                        onChange={handleEmailPasswordChange}
                        inputRef={emailInputRef}
                      ></TextField>
                    </InputItemContainer>
                    <ButtonContainer>
                      <Button
                        type="submit"
                        disabled={loading}
                        style={{
                          fontWeight: "bold",
                          textTransform: "none",
                          height: "36px",
                          width: "100%",
                          display: "inline-flex",
                          margin: "auto",
                          backgroundColor: "rgba(216, 38, 47,0.9)",
                        }}
                        variant="contained"
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
                          "Next"
                        )}
                      </Button>
                    </ButtonContainer>
                    {social_type !== null && (
                      <Alert
                        severity="info"
                        sx={{
                          fontSize: "11px",
                          cursor: "pointer",
                          margin: "10px auto 0",
                          alignItems: "center",
                        }}
                      >
                        Your password has already been sent to your email when
                        you registered the account.
                      </Alert>
                    )}
                  </form>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <ModalHeader>New Email</ModalHeader>
                    <InputItemContainer>
                      <TextField
                        // style={{ width: "85%", margin: "auto" }}
                        InputLabelProps={{
                          style: { fontSize: 14, fontWeight: 700 },
                          shrink: true,
                        }}
                        size="small"
                        autoFocus
                        error={formik.errors.email ? true : false}
                        helperText={formik.errors.email}
                        type="text"
                        fullWidth
                        label="Email"
                        id="Email"
                        value={formik.values.email}
                        // onChange={(e) => {
                        //   formik.setFieldValue("email", e.target.value);
                        //   formik.setFieldError("email", "");
                        // }}
                        onChange={handleRevoverEmailChange}
                        inputRef={recoverInputRef}
                      ></TextField>
                    </InputItemContainer>
                    <ButtonContainer>
                      <Button
                        sx={
                          {
                            // '@media (max-width:400px)': {
                            //   width: "calc(100% - 41px)",
                            // },
                          }
                        }
                        disabled={loading}
                        style={{
                          fontWeight: "bold",
                          textTransform: "none",
                          height: "36px",

                          // width: "calc(100% - 48px)",
                          width: "100%",
                          display: "inline-flex",

                          margin: "auto",
                          backgroundColor: "rgba(216, 38, 47,0.9)",
                        }}
                        variant="contained"
                        onClick={(e) => {
                          e.preventDefault();
                          formik.handleSubmit();
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
                          "Next"
                        )}
                      </Button>
                    </ButtonContainer>
                  </form>
                </>
              )}
              {activeStep === 3 && (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <OuterContainer>
                      <StepHeading>Verify Your Email</StepHeading>
                      <OtpWrapper>
                        <OtpHeading sx={{}}>
                          Please enter the OTP sent to your email{" "}
                          <b
                            style={{
                              fontWeight: "600",
                              fontSize: "15px",
                              wordBreak: "break-word",
                            }}
                          >
                            {formik.values.email}
                          </b>{" "}
                          to complete the process
                        </OtpHeading>
                        <OtpInputWrapper>
                          <MuiOtpInput
                            autoFocus={true}
                            sx={{
                              margin: "auto",
                              width: "70%",
                              "@media screen and (max-width:320px)": {
                                width: "80%",
                              },
                            }}
                            TextFieldsProps={{
                              size: "small",
                              variant: "outlined",
                            }}
                            value={formik.values.otp}
                            onChange={(value) => {
                              const numericValue = value.replace(/[^0-9]/g, "");
                              if (numericValue !== value) {
                                setOtpMessage({
                                  status: "error",
                                  message: "Only numeric values are allowed",
                                });
                              } else {
                                setOtpMessage({ status: "", message: "" });
                              }
                              formik.setFieldValue("otp", numericValue);
                            }}
                            onKeyDown={(e) => handleKeyDown(e)}
                            onPaste={(e) => handlePaste(e)}
                          />
                        </OtpInputWrapper>
                        {timeLeft !== 0 && (
                          <VerifyMobileBoxx>
                            <Typography
                              sx={{
                                textAlign: "center",
                                fontSize: "13px",
                                color: "#212529",
                              }}
                            >
                              You can resend the OTP in{" "}
                              <strong> {timeLeft}</strong> seconds
                            </Typography>
                          </VerifyMobileBoxx>
                        )}
                      </OtpWrapper>
                    </OuterContainer>

                    <ButtonContainer>
                      <Button
                        disabled={loading}
                        style={{
                          fontWeight: "bold",
                          textTransform: "none",
                          height: "36px",
                          width: "calc(100% - 68px)",
                          display: "inline-flex",
                          margin: "auto",
                          backgroundColor: "rgba(216, 38, 47,0.9)",
                        }}
                        variant="contained"
                        onClick={(e) => {
                          e.preventDefault();
                          formik.handleSubmit();
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
                      </Button>
                    </ButtonContainer>

                    {formik.errors.otp && (
                      <Alert
                        sx={{
                          ".MuiAlert-icon": {
                            color:
                              otpMessage?.status == "success"
                                ? "green"
                                : "#D7282F",
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
                        severity="error"
                      >
                        {formik.errors.otp}
                      </Alert>
                    )}

                    {otpMessage?.message !== "" && (
                      <Alert
                        sx={{
                          ".MuiAlert-icon": {
                            color: `${
                              otpMessage?.status == "success"
                                ? "green"
                                : "#D7282F"
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
                        {otpMessage?.message}{" "}
                      </Alert>
                    )}
                    <Step2FooterLeftButtons>
                      <Goback
                        onClick={() => {
                          verifyEmail();
                        }}
                        style={{
                          textAlign: "center",
                          marginTop: 10,
                          fontFamily: "unset",
                          cursor: "pointer",
                        }}
                        disabled={timeLeft !== 0 ? true : false}
                      >
                        Resend OTP
                      </Goback>
                    </Step2FooterLeftButtons>
                  </form>
                </>
              )}
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};
