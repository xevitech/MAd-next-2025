import { Alert, Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ButtonContainer,
  CustomButton,
  ModalHeader,
  ModalSubHeader,
  style,
} from "../../personalProfile/personalProfileModals/verifyEmail/styles";
import {
  IconContainer,
  ModalOuterContainer,
  OtpHeading,
  OtpInputWrapper,
  OtpWrapper,
  OuterContainer,
  StepHeading,
} from "../../personalProfile/personalProfileModals/verifyMobile/styles";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { ThreeDots } from "react-loader-spinner";
import { MuiOtpInput } from "mui-one-time-password-input";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { Goback } from "@/components/guestLayout/user/styles";

const VerifyCompanymail = (props) => {
  const { open, closeModal, setVarify } = props;
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [otp, setOtp] = useState<any>();
  const [otpMessage, setOtpMessage] = useState<any>({
    status: "",
    message: "",
  });
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOtpMessage({ status: "", message: "" });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [otpMessage]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const verifyEmail = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("type", "email");
    try {
      const response = await fetch(
        `${BASE_URL}/company_profile/verify_accounts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status) {
        setActiveStep(2);
        setLoading(false);
        toast.success(data.message);
        setTimeLeft(120);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const numericPaste = paste.replace(/\D/g, "");
    if (numericPaste) {
      setOtp(numericPaste);
      setOtpMessage({ status: "", message: "" });
    } else {
      setOtpMessage({
        status: "error",
        message: "Only numeric values are allowed",
      });
    }
  };
  const verifyOtp = async () => {
    if (otp?.length == 4) {
      const formData = new FormData();
      formData.append("type", "email");
      formData.append("otp", otp);

      try {
        const response = await fetch(
          `${BASE_URL}/company_profile/verify_accounts_otp`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Auth.token()}`,
            },
            body: formData,
          }
        );
        const data = await response.json();
        if (data.status) {
          setOtpMessage({ status: "error", message: data.message });
          setVarify(true);
          setLoading(false);
          closeModal();
        } else {
          setOtpMessage({ status: "error", message: data.message });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (otp.length == 4) {
        verifyOtp(), setLoading(true);
      }
    }
  };
  const handleCloseModel = () => {
    setActiveStep(1);
    closeModal();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalOuterContainer>
          <Box sx={style}>
            <Button
              onClick={() => handleCloseModel()}
              color="error"
              style={{
                minHeight: "46px",
                minWidth: "46px",
                borderRadius: "50%",
                position: "absolute",
                top: "9px",
                right: "11px",
              }}
            >
              <CloseOutlinedIcon style={{ cursor: "pointer" }} />
            </Button>
            {activeStep == 1 && (
              <>
                <IconContainer>
                  <MarkEmailReadIcon />
                </IconContainer>
                <ModalHeader>Email Verification</ModalHeader>
                <ModalSubHeader>Your account is almost ready</ModalSubHeader>
                <ButtonContainer>
                  <CustomButton
                    variant="contained"
                    size="small"
                    onClick={() => verifyEmail()}
                    onKeyDown={() => verifyEmail()}
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
                      "Confirm email"
                    )}
                  </CustomButton>
                </ButtonContainer>
              </>
            )}
            {activeStep == 2 && (
              <>
                <OuterContainer>
                  <StepHeading>
                    Please enter the one time password to verify your email
                  </StepHeading>
                  <OtpWrapper>
                    <OtpHeading>
                      {" "}
                      Please enter the code we emailed you. {props.emailId}
                    </OtpHeading>
                    <OtpInputWrapper>
                      {" "}
                      <MuiOtpInput
                        autoFocus={true}
                        style={{ width: "80%", margin: "auto" }}
                        TextFieldsProps={{
                          size: "small",
                          variant: "outlined",
                        }}
                        value={otp}
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
                          setOtp(numericValue);
                        }}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onPaste={(e) => handlePaste(e)}
                      />
                    </OtpInputWrapper>
                  </OtpWrapper>
                </OuterContainer>
                {timeLeft !== 0 && (
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
                      setLoading(true);
                      verifyOtp();
                    }}
                    onKeyDown={() => {
                      verifyOtp(), setLoading(true);
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
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 15,
                    fontFamily: "unset",
                    cursor: "pointer",
                  }}
                >
                  <Goback
                    onClick={() => verifyEmail()}
                    disabled={timeLeft !== 0 ? true : false}
                  >
                    Resend OTP
                  </Goback>
                </div>
              </>
            )}
          </Box>
        </ModalOuterContainer>
      </Modal>
    </div>
  );
};

export default VerifyCompanymail;
