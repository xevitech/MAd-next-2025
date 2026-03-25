import { Alert, Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ButtonContainer,
  CustomButton,
  IconContainer,
  ModalHeader,
  ModalOuterContainer,
  ModalSubHeader,
  OtpHeading,
  OtpInputWrapper,
  OtpWrapper,
  OuterContainer,
  StepHeading,
  style,
} from "../../personalProfile/personalProfileModals/verifyMobile/styles";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ThreeDots } from "react-loader-spinner";
import { MuiOtpInput } from "mui-one-time-password-input";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { Goback } from "@/components/guestLayout/user/styles";
const VerifyCompanyMobile = (props) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const { open, closeModal, setVarifyPhone } = props;
  const [otp, setOtp] = useState<any>();
  const [otpMessage, setOtpMessage] = useState<any>({
    status: "",
    message: "",
  });
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const verifyOtp = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("type", "phone");
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
        setOtpMessage({ status: "success", message: data.message });
        setVarifyPhone(true);
        closeModal();
      } else {
        setOtpMessage({ status: "error", message: data.message });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const confirmMobile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("type", "phone");
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
        toast.success(data.message);
        setActiveStep(2);
        setTimeLeft(120);
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (otp.length == 4) {
        verifyOtp();
      }
    }
  };

  const handleCloseModal = () => {
    setActiveStep(1);
    closeModal();
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
  return (
    <>
      <Modal
        open={open}
        onClose={() => handleCloseModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalOuterContainer>
          <Box sx={style} className="mobileverificationPopup">
            <>
              <Button
                onClick={() => handleCloseModal()}
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
              {activeStep === 1 && (
                <>
                  {" "}
                  <IconContainer>
                    <img
                      src={"/assets/confirmMobileGreenTick.svg"}
                      alt="image"
                    />
                  </IconContainer>
                  <ModalHeader>Mobile Verification</ModalHeader>
                  <ModalSubHeader>Your account is almost ready</ModalSubHeader>
                  <ButtonContainer>
                    {" "}
                    <CustomButton
                      onClick={() => {
                        confirmMobile();
                      }}
                      variant="contained"
                      size="small"
                      onKeyDown={() => confirmMobile()}
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
                        " Confirm Mobile No."
                      )}
                    </CustomButton>
                  </ButtonContainer>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <OuterContainer>
                    <StepHeading>
                      Please enter the one time password to verify your mobile
                    </StepHeading>
                    <OtpWrapper>
                      <OtpHeading>
                        {" "}
                        Please enter the otp we messaged you.{" "}
                        {props?.mobile?.includes("+")
                          ? props?.mobile
                          : `+${props?.mobile}`}{" "}
                        {props?.phone}
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
                  {otpMessage?.message !== "" && (
                    <Alert
                      sx={{
                        ".MuiAlert-icon": {
                          color: `${otpMessage?.status == "success"
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
                      onClick={() => confirmMobile()}
                      disabled={timeLeft !== 0 ? true : false}
                    >
                      Resend OTP
                    </Goback>
                  </div>
                </>
              )}
            </>
          </Box>
        </ModalOuterContainer>
      </Modal>
    </>
  );
};

export default VerifyCompanyMobile;
