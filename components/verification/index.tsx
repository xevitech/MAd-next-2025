import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  styled,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useFormik } from "formik";
import { BASE_URL } from "@/utils/staticValues";
import { setUserBasicInfo } from "@/hooks/appReducers";
import Auth from "@/auth/Auth";
import { useDispatch } from "react-redux";
import { setCookie } from "@/utils/cookieUtils";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { decryptData } from "@/utils/crypto-reusable";
import { OtpHeader } from "../guestLayout/user/styles";
import {
  modifyEmail,
  setOtpExpirationTimeInLS,
} from "@/utils/commonFunctions/other";
import { ThreeDots } from "react-loader-spinner";
import {
  CodeInput,
  FIlledButton,
  OutlineButton,
  VerificationBG,
  VerificationInner,
} from "./style";

const Verification = () => {
  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  const [otpMessage, setOtpMessage] = useState({ status: "", message: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [resendOTPLoading, setResendOTPLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showTimer, setShowTimer] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const emailID = router.query?.email;

  useEffect(() => {
    const storedExpirationTime = parseInt(
      localStorage.getItem("otpExpirationTime"),
      10
    );
    if (storedExpirationTime) {
      setShowTimer(true);
      const remainingTime = storedExpirationTime - new Date().getTime();
      setTimeLeft(Math.floor(remainingTime / 1000));
    }
  }, []);

  const formik = useFormik({
    initialValues: { otp: "" },
    onSubmit: (values) => {
      console.log("OTP Submitted:", values.otp);
    },
  });

  // Handle the paste event (to ensure only numeric values are pasted)
  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedValue = e.clipboardData.getData("text");
    const numericValue = pastedValue.replace(/\D/g, ""); // Allow only numeric values
    formik.setFieldValue("otp", numericValue);
    setOtpMessage({ status: "otp", message: "" });
  };

  const verifyOtp = async () => {
    if (formik.values.otp?.length !== 4) {
      setOtpMessage({ status: "error", message: "Please enter valid otp" });
      return;
    }
    // const userID = decryptData(router.query?.id);
    const userID = router.query?.id;

    let payload = {
      otp: formik.values.otp,
      user_id: userID.toString(),
      is_verified: "yes",
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
        console.log('data_100',data);
      
        if (Array.isArray(data.account_types) && data.account_types.length > 0) {
          const perms = data.account_types[0].user_permission;
          // Only stringify if it really is an object/array
          if (perms && typeof perms === 'object') {
           
            localStorage.setItem(
              "subSellerList",
              JSON.stringify(data.account_types[0]?.user_permission)
            );

          } 
        }
        
        
        setTimeout(() => {
          router.push({
            pathname: "/dashboard",
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
  useEffect(() => {
    if (timeLeft <= 0) {
      setShowTimer(false);
      localStorage.removeItem("otpExpirationTime");
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleResendOtp = async () => {
    // const userID = decryptData(router.query?.id);
    const userID = router.query?.id;
    formik.setFieldValue("otp", "");
    let payload = { user_id: userID.toString() as string };
    setResendOTPLoading(true);
    setOtpMessage({ status: "", message: "" });
    try {
      const response = await fetch(`${BASE_URL}/auth/resendOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response?.status) {
        setOtpExpirationTimeInLS();
        setTimeLeft(120);
        setShowTimer(true);
        const data = await response.json();

        // if (data?.status) {
        toast.success(data?.message);
        // setTimeLeft(120);
        // }
      }
    } catch (error) {
      console.log("error while resend OTP", error);
    } finally {
      setResendOTPLoading(false);
    }
  };
  return (
    <VerificationBG>
      <VerificationInner>
        <OtpHeader>
          OTP has been sent to{" "}
          <span style={{ fontWeight: "500", color: "#231f20" }}>
            {modifyEmail(emailID as string)}
          </span>
        </OtpHeader>
        <IconButton
          sx={{
            bgcolor: "#ffdbdc",
            color: "#d7282f",
            width: 60,
            height: 60,
            mb: 2,
            "&:hover": {
              bgcolor: "#ffdbdc",
            },
          }}
        >
          <EmailIcon fontSize="large" />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" mb={1}>
          Verify Your Email
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          We have sent a 4-digit verification code to your email address. <br />
          Please enter it below.
        </Typography>

        <CodeInput direction="row" spacing={1} justifyContent="center" mb={3}>
          <MuiOtpInput
            autoFocus={true}
            className="otptextField"
            {...formik.getFieldProps("otp")}
            value={formik.values.otp || ""}
            onChange={(value) => {
              const numericValue = value.replace(/\D/g, "");
              formik.setFieldValue("otp", numericValue);
              setOtpMessage({ status: "otp", message: "" });
            }}
            onKeyDown={(e) => handleKeyDown(e)}
            onPaste={(e) => handlePaste(e)}
          />
        </CodeInput>

        <Stack direction="row" spacing={2} mb={3} justifyContent="center">
          <FIlledButton
            variant="contained"
            color="primary"
            onClick={verifyOtp}
            sx={{
              backgroundColor: loading
                ? "rgba(216, 38, 47, 0.75)!important"
                : "#d7282f",
            }}
          >
            {loading ? (
              <ThreeDots
                height="30"
                width="45"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              "Verify"
            )}
          </FIlledButton>
          <OutlineButton
            variant="outlined"
            color="secondary"
            sx={{ cursor: showTimer && "not-allowed" }}
            onClick={() => {
              !showTimer && handleResendOtp();
            }}
          >
            {resendOTPLoading ? (
              <ThreeDots
                height="30"
                width="45"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              "Resend OTP"
            )}
          </OutlineButton>
        </Stack>
        {otpMessage?.message !== "" && (
          <Alert
            sx={{
              ".MuiAlert-icon": {
                color: `${
                  otpMessage?.status === "success" ? "green" : "#D7282F"
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
            // severity={otpMessage?.status}
          >
            {otpMessage?.message}
          </Alert>
        )}
        {timeLeft !== 0 && showTimer && (
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
        <Typography variant="caption" color="text.secondary">
          Didn't receive the email? Check your spam folder or try again later.
        </Typography>
      </VerificationInner>
    </VerificationBG>
  );
};

export default Verification;
