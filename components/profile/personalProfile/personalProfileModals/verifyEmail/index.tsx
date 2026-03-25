import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Alert, Box, Button, Typography } from "@mui/material";
import {
  style,
  ModalHeader,
  ModalSubHeader,
  ModalOuterContainer,
  CustomButton,
  ButtonContainer,
} from "./styles";
import { ThreeDots } from "react-loader-spinner";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  IconContainer,
  OtpHeading,
  OtpInputWrapper,
  OtpWrapper,
  OuterContainer,
  StepHeading,
  VerifyMobileBoxx,
} from "../verifyMobile/styles";
import { MuiOtpInput } from "mui-one-time-password-input";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { toast } from "react-toastify";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useAppDispatch } from "redux/store";
import { setEmailVerified } from "@/hooks/appReducers";
import {
  Goback,
  Step2FooterLeftButtons,
} from "@/components/guestLayout/user/styles";

export const VerifyEmail = (props) => {
  const { open, closeModal, getProfile } = props;
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [otp, setOtp] = useState<any>("");
  const [otpMessage, setOtpMessage] = useState<any>({
    status: "",
    message: "",
  });
  const [timeLeft, setTimeLeft] = useState(120);
  const userId = JSON.parse(localStorage.getItem("userData"))?.id;
  const handleOtpChange = (e: any) => {
    setOtp(e);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOtpMessage({ status: "", message: "" });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [otpMessage]);

  const verifyEmail = async () => {
    const formData = new FormData();
    formData.append("user_id", userId);
    try {
      const response = await fetch(`${BASE_URL}/auth/resendOtp`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        toast.success(data.message);
        setActiveStep(2);
        setLoading(false);
        setTimeLeft(120);
        // setOtpMessage({ status: "success", message: data?.message })
      } else {
        toast.error(data.message);
        setLoading(false);
        // setOtpMessage({ status: "error", message: data?.message })
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const formData = new FormData();
    formData.append("otp", otp);
    formData.append("user_id", userId);
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/verifyOtp`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.status == true || data.status == 200) {
        dispatch(setEmailVerified(true));
        setOtpMessage({ status: "success", message: data?.message });
        setLoading(false);
        getProfile();
        closeModal();
      } else {
        if (otp == "" || otp == undefined) {
          setOtpMessage({
            status: "error",
            message: "Please enter otp",
          });
        } else {
          setOtpMessage({ status: "error", message: data.message });
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
     }
  };

  const closeEmailPopUp = () => {
    setActiveStep(1);
    setOtp("");
    setOtpMessage({ status: "", message: "" });
    setTimeLeft(120);
    closeModal();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (otp.length == 4) {
        verifyOtp();
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={closeEmailPopUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalOuterContainer>
          <Box sx={style}>
            <Button
              onClick={closeEmailPopUp}
              color="error"
              sx={{
                minHeight: "46px",
                minWidth: "46px",
                borderRadius: "50%",
                position: "absolute",
                top: "9px",
                right: "11px",
                "@media screen and (max-width:600px)":{
                  right:"0px",
                  top:"0px"
                }
              }}
            >
              <CloseOutlinedIcon style={{ cursor: "pointer" }} />
            </Button>
            {activeStep == 1 && (
              <>
                <IconContainer>
                  <img src={"/assets/confirmMobileGreenTick.svg"} alt="image" />
                </IconContainer>
                <ModalHeader>Email Verification</ModalHeader>
                <ModalSubHeader>Your account is almost ready</ModalSubHeader>
                <ButtonContainer>
                  <CustomButton
                    variant="contained"
                    size="small"
                    onClick={() => {
                      verifyEmail(), setLoading(true);
                    }}
                  >
                    {loading ? (
                      <ThreeDots
                        height="35"
                        width="40"
                        radius="9"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      "Confirm Email"
                    )}
                  </CustomButton>
                </ButtonContainer>
              </>
            )}
            {activeStep == 2 && (
              <>
                <OuterContainer>
                  <StepHeading>Verify Your Email</StepHeading>
                  <OtpWrapper>
                    <OtpHeading>
                      {" "}
                      Please enter the OTP sent to your email{" "}
                      <b
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                          wordBreak: "break-word",
                        }}
                      >
                        {props.emailId}
                      </b>{" "}
                      to complete the process
                    </OtpHeading>
                    <OtpInputWrapper>
                      {" "}
                      <MuiOtpInput
                        autoFocus={true}
                        sx={{
                          width: "70%",
                          margin: "auto",
                          "@media screen and (max-width:320px)": {
                            width: "80%",
                          },
                        }}
                        TextFieldsProps={{
                          size: "small",
                          variant: "outlined",
                        }}
                        value={otp}
                        onChange={handleOtpChange}
                        onKeyDown={handleKeyDown}
                      />
                    </OtpInputWrapper>
                  </OtpWrapper>
                </OuterContainer>
                {timeLeft !== 0 && (
                  <VerifyMobileBoxx>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: "13px",
                        color: "#212529",
                      }}
                    >
                      You can resend the OTP in <strong> {timeLeft}</strong>{" "}
                      seconds
                    </Typography>
                  </VerifyMobileBoxx>
                )}
                <ButtonContainer>
                  <Button
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
                  </Button>
                </ButtonContainer>
                <Step2FooterLeftButtons>
                  <Goback
                    style={{
                      textAlign: "center",
                      marginTop: 10,
                      fontFamily: "unset",
                      cursor: "pointer",
                    }}
                    onClick={() => verifyEmail()}
                    disabled={timeLeft !== 0 ? true : false}
                  >
                    Resend OTP
                  </Goback>
                </Step2FooterLeftButtons>
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
              </>
            )}
          </Box>
        </ModalOuterContainer>
      </Modal>
    </div>
  );
};
