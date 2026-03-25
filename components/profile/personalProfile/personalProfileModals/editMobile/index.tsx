import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, Button, Skeleton, Typography } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import Auth from "@/auth/Auth";
import { MuiOtpInput } from "mui-one-time-password-input";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { BASE_URL } from "@/utils/staticValues";
import {
  ButtonContainer,
  MobileInputContainer,
  ModalHeader,
  OtpHeading,
  OtpInputWrapper,
  OtpWrapper,
  OuterContainer,
  StepHeading,
  style,
} from "./styles";
import dynamic from "next/dynamic";
import { useAppDispatch } from "redux/store";
import {
  profileData,
  setLoginViaSocial,
  setShowVerifyMobileModal,
  setTimeofPop,
  setWelcomeSocial,
} from "@/hooks/appReducers";
import { MobileCodes } from "@/components/common/PhoneInput/MobileCodesList";
import { useSelector } from "react-redux";
import {
  Goback,
  Step2FooterLeftButtons,
} from "@/components/guestLayout/user/styles";
import { VerifyMobileBoxx } from "../verifyMobile/styles";
const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);
export const EditMobile = (props) => {
  const [activeStep, setActiveStep] = useState(1);
  const { open, closeModal, getProfile } = props;
  const [loading, setLoading] = useState(false);
  const [validate, setValidation] = useState<boolean>(false);
  const { social_type } = useSelector((state: any) => state.userData);
  const dispatch = useAppDispatch();
  const [alertMessage, setAlertMessage] = useState<any>({
    status: false,
    message: "",
  });
  const [timeLeft, setTimeLeft] = useState(120);
  const validation = Yup.object().shape({
    mobileNumber:
      activeStep == 1
        ? Yup.string()
            .required("Please enter mobile number")
            .matches(/^[0-9]*$/, "OTP must be numeric")
        : Yup.string().notRequired(),
    otp:
      activeStep == 2
        ? Yup.string()
            .required("Please enter otp")
            .matches(/^[0-9]*$/, "OTP must be numeric")
        : Yup.string().notRequired(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      mobileNumber: props?.mobileNumber ?? "",
      otp: "",
      country_id: "",
      mobile_country_code: props?.countryCode ?? "",
      mobile_code: props?.mobileCode ?? "",
    },
    onSubmit: () => {
      if (!validate) {
        formik.setFieldError("mobileNumber", "Please enter correct mobile no");
        return;
      }

      if (activeStep == 1) {
        sendOtp();
        setLoading(true);
      }
      if (activeStep == 2) verifyOtp();
    },
  });

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

  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("mobile_code", mobile_code);
    formik.setFieldValue("country_id", country_code);
    formik.setFieldValue("mobile_country_code", country_code);
    formik.setFieldValue("mobileNumber", phone);
    formik.setFieldError("mobileNumber", "");
    setValidation(isValid);
  };

  const verifyOtp = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("mobile_number", formik.values.mobileNumber);
    formData.append("mobile_country_code", formik.values.mobile_country_code);
    formData.append("type", "new");
    formData.append("otp", formik.values.otp);
    formData.append("country_code", formik.values.mobile_code);

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
        setAlertMessage({ status: true, message: "data.message" });
        setTimeLeft(0);
        closeModal();
        dispatch(setTimeofPop(20000));
        dispatch(setShowVerifyMobileModal(false));
        dispatch(setLoginViaSocial(false));
        if (social_type == "google" || social_type == "linkedin") {
          dispatch(setWelcomeSocial(true));
        }
        dispatch(profileData());
        getProfile();
        toast.success("Mobile number saved successfully.");
      } else {
        setAlertMessage({ status: false, message: data.message });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    const formData = new FormData();
    formData.append("mobile_number", formik.values.mobileNumber);
    formData.append(
      "country_code",
      formik.values.mobile_code?.includes("+")
        ? formik.values.mobile_code
        : `+${formik.values.mobile_code}`
    );
    formData.append("mobile_country_code", formik.values.mobile_country_code);
    formData.append("type", "new");

    try {
      const response = await fetch(`${BASE_URL}/profile/verify/mobile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.message === "Mobile number already exists.") {
        formik.setFieldError("mobileNumber", data.message);
      } else {
        toast.success(data.message);
        dispatch(setTimeofPop(""));
        setTimeLeft(120);
        setActiveStep(2);
        dispatch(setWelcomeSocial(false));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      {open && (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Button
              onClick={() => {
                formik.resetForm();
                setActiveStep(1);
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
                <form onSubmit={formik.handleSubmit}>
                  <ModalHeader>Enter mobile number</ModalHeader>
                  {formik.values.mobile_code == "" && (
                    <Box>
                      <Skeleton
                        variant="rectangular"
                        width={335}
                        height={33}
                        sx={{ marginBottom: "5px" }}
                      />
                    </Box>
                  )}
                  <MobileInputContainer>
                    <MobileInputCommon
                      mobileNumber={formik.values.mobileNumber}
                      mobileCode={formik.values.mobile_code}
                      countryCode={formik.values.mobile_country_code}
                      handleChange={setMobileNumber}
                      helperText={formik.errors.mobileNumber}
                      error={formik?.errors.mobileNumber ? true : false}
                    />
                  </MobileInputContainer>
                  <ButtonContainer>
                    <Button
                      type="submit"
                      disabled={loading}
                      style={{
                        fontWeight: "bold",
                        textTransform: "none",
                        height: "36px",

                        width: "97%",
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
                </form>
              </>
            )}
            {activeStep === 2 && (
              <>
                <form onSubmit={formik.handleSubmit}>
                  <OuterContainer>
                    <StepHeading>
                      Verify Your Mobile Number
                    </StepHeading>
                    <OtpWrapper>
                      <OtpHeading>
                        Please enter the OTP sent to your mobile number{" "}
                        <b
                          style={{
                            fontWeight: 600,
                            fontSize: "15px",
                          }}
                        >
                          {formik?.values?.mobile_code?.includes("+")
                            ? ""
                            : "+" +
                              formik?.values?.mobile_code +
                              formik?.values?.mobileNumber}
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
                          value={formik.values.otp}
                          onChange={(newValue) => {
                            const numericValue = newValue.replace(/\D/g, "");
                            formik.setFieldValue("otp", numericValue);
                            formik.setFieldError("otp", "");
                          }}
                        />
                      </OtpInputWrapper>
                    </OtpWrapper>
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
                  </OuterContainer>
                  <ButtonContainer>
                    <Button
                      disabled={loading}
                      sx={{
                        "@media (max-width: 320px)": {
                          width: "calc(100% - 33px)",
                        },
                        fontWeight: "bold",
                        textTransform: "none",
                        height: "36px",
                        width: "calc(100% - 68px)",
                        display: "inline-flex",
                        margin: "auto",
                        backgroundColor: "rgba(216, 38, 47,0.9)",
                        "&:hover": {
                          background: "rgba(215, 40, 47, 0.85)",
                        },
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                      }}
                      variant="contained"
                      type="submit"
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
                            alertMessage?.status == "success"
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
                      style={{
                        textAlign: "center",
                        margin: 0,
                        marginTop: 10,
                        fontFamily: "unset",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        formik.setFieldValue("otp", ""), sendOtp();
                      }}
                      sx
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
      )}
    </div>
  );
};
