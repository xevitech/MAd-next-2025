import React, { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Alert, Button, Typography } from "@mui/material";
import Auth from "@/auth/Auth";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { MuiOtpInput } from "mui-one-time-password-input";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { BASE_URL } from "@/utils/staticValues";
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
  VerifyMobileBoxx,
} from "./styles";
import {
  profileData,
  setShowVerifyMobileModal,
  setWelcomeSocial,
} from "@/hooks/appReducers";
import { useAppDispatch } from "redux/store";
import { MyAppContext } from "@/contextApi/appContext";
import { useSelector } from "react-redux";
import {
  Goback,
  Step2FooterLeftButtons,
} from "@/components/guestLayout/user/styles";
import { setCookie } from "@/utils/cookieUtils";
export const VerifyMobile = (props) => {
  const [loading, setLoading] = useState(false);
  const { setshowRegisterationModal }: any = useContext(MyAppContext);
  const [activeStep, setActiveStep] = useState<number>(1);
  const { loginviaSocial, mobileCode, mobile_country_code } = useSelector(
    (state: any) => state.userData
  );
  const [otp, setOtp] = useState<any>();
  const [timestamp, setTimestamp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const dispatch = useAppDispatch();
  const [alertMessage, setAlertMessage] = useState<any>({
    status: false,
    message: "",
  });
  const { open, closeModal, mobileNumber } = props;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setLoading(true);
      verifyOtp();
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("mobile_number", mobileNumber);
    formData.append("type", "old");
    formData.append("otp", otp);
    formData.append("mobile_country_code", mobile_country_code);
    formData.append("country_code", mobileNumber);

    try {
      const response = await fetch(`${BASE_URL}/profile/verify/mobile_check`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.status) {
        dispatch(setShowVerifyMobileModal(false));
        !loginviaSocial && setshowRegisterationModal(true);
        loginviaSocial && dispatch(setWelcomeSocial(true));
        setAlertMessage({ status: true, message: data.message });
        dispatch(profileData());
        closeModal();
      } else {
        if (otp == "" || otp == undefined) {
          setAlertMessage({
            status: false,
            message: "Please enter otp",
          });
        } else {
          setAlertMessage({ status: false, message: data.message });
        }
      }
      setLoading(false);
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAlertMessage({ status: "", message: "" });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [alertMessage]);

  const confirmMobile = async (type) => {
    const formData = new FormData();
    formData.append("mobile_number", mobileNumber);
    formData.append("country_code", `${mobileCode}`);
    formData.append("type", type);

    try {
      const response = await fetch(`${BASE_URL}/profile/verify/mobile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        toast.success(data.message);
        const currentTime = Date.now();
        setTimestamp(currentTime);
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
  const handlePaste = (event: React.ClipboardEvent) => {
    let paste = event.clipboardData.getData("text");
    event.preventDefault();
    const numericPaste = paste.replace(/\D/g, "");
    setOtp(numericPaste);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalOuterContainer>
          <Box sx={style} className="mobileverificationPopup">
            <>
              <Button
                onClick={() => {
                  const futureDate = new Date();
                  futureDate.setHours(futureDate.getHours() + 2);
                  setCookie("isMobileVerificationDismissed", true, futureDate);
                  closeModal();
                }}
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
                        setLoading(true);
                        confirmMobile("old");
                      }}
                      variant="contained"
                      size="small"
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
                        "Confirm Mobile No."
                      )}
                    </CustomButton>
                  </ButtonContainer>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <OuterContainer>
                    <StepHeading>Verify Your Mobile Number</StepHeading>
                    <OtpWrapper>
                      <OtpHeading>
                        {" "}
                        Please enter the OTP sent to your mobile number{" "}
                        <b
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                          }}
                        >
                          {" "}
                          {mobileCode + mobileNumber}
                        </b>{" "}
                        to complete the process{" "}
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
                          value={otp}
                          onChange={(value) => {
                            const numericValue = value.replace(/\D/g, "");
                            setOtp(numericValue);
                            setAlertMessage({ status: false, message: "" });
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
                  {alertMessage?.message !== "" && (
                    <Alert
                      sx={{
                        ".MuiAlert-icon": {
                          color: `${
                            alertMessage?.status == true ? "green" : "#D7282F"
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
                        "@media (max-width:767px)": {
                          width: "100%",
                          margin: "10px 0 0",
                        },
                      }}
                      severity={
                        alertMessage?.status == true ? "success" : "error"
                      }
                    >
                      {alertMessage?.message}
                    </Alert>
                  )}
                  <Step2FooterLeftButtons>
                    <Goback
                      onClick={() => {
                        confirmMobile("old");
                      }}
                      style={{
                        textAlign: "center",
                        margin: 0,
                        marginTop: 10,
                        fontFamily: "unset",
                        cursor: "pointer",
                      }}
                      disabled={timeLeft !== 0 ? true : false}
                    >
                      Resend OTP
                    </Goback>
                  </Step2FooterLeftButtons>
                </>
              )}
            </>
          </Box>
        </ModalOuterContainer>
      </Modal>
    </div>
  );
};
