import React, { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
  Alert,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { apiClient, PasswordMessage, passwordRules } from "../common/common";
import { toast } from "react-toastify";
import { BoxRedBackgroundImg, CheckIcon, LoginOuterWrapper } from "../guestLayout/user/styles";
import { HeaderBar } from "../guestLayout/user/common/HeaderBar";
import { LightTooltip } from "../common/Tooltip/tooltip";

export const ResetPasswordModals = {
  "& .MuiDialog-paper": {
    width: "480px",
    maxWidth: "480px",
    boxShadow: "0 24px 64px #26214a1a",
    borderRadius: "12px",
    "@media screen and (max-width:600px)": {
      width: "90vw",
      margin: 0

    },
    "@media screen and (max-width:767px)": {
      "& .MuiTypography-root": {
        fontSize: "18px",
        padding: "14px 5px"
      },
      "& .MuiDialogContent-root": {
        // paddingTop: "10px",
        padding: "10px 16px 20px",
        "& .MuiSvgIcon-root": {
          color: "#4e4e4e",
          fontSize: "22px"
        }
      }
    },
  }
};

function ResetPasswordModal() {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [redirectEmail, setRedirectEmail] = useState();
  const [alertMessage, setAlertMessage] = useState<boolean>(false);
  const router = useRouter();
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null)
  const { username } = router.query;
  const validation = Yup.object().shape({
    password: Yup.string()
      .matches(passwordRules, {
        message: PasswordMessage,
      })
      .required("Please enter password")
      .min(6, "Mininum 6 characters"),
    confirmPassword: Yup.string().required("Please enter confirm password"),
  });

  const formik = useFormik({
    validationSchema: validation,
    validateOnChange: false,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ password, confirmPassword }) => {
      const { id } = router.query;
      if (password != confirmPassword) {
        formik.setFieldError(
          "confirmPassword",
          `Password and confirm password doesn't match`
        );
        return;
      }
      setLoading(true);
      let response = await apiClient("auth/changePassword", "post", {
        body: { newPassword: password, token: id },
      });

      if (response.status == 200) {
        const email = response?.user?.email;
        setRedirectEmail(email);
        setAlertMessage(true);
      } else {
        toast.error(
          "The link has expired, or the password has already been changed! Please check and try again"
        );
        router.push("/user/signin");
      }
      setLoading(false);
    },
  });

  const redirectToLogin = () => {
    router.push({
      pathname: "/user/signin",
      query: { username: redirectEmail },
    });
  };

  const handlePasswordChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("password", removeSpace);
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
      passwordInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("confirmPassword", removeSpace);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
    if (value.includes(" ")) {
      formik.setFieldError("confirmPassword", "Password cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("confirmPassword", "");
      }, 2000);
    } else {
      formik.setFieldError("confirmPassword", "");
    }
    if (confirmPasswordInputRef.current) {
      confirmPasswordInputRef.current.value = removeSpace;
      confirmPasswordInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  return (
    <BoxRedBackgroundImg>
      <HeaderBar />
      <LoginOuterWrapper className="signupform dialogheight">
        <Dialog
          sx={ResetPasswordModals}
          hideBackdrop={true}
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle textAlign="center">
              <Typography
                component="span"
                fontFamily={"open sans"}
                fontSize="24px"
                fontWeight={700}
              >
                Enter New Password
              </Typography>
            </DialogTitle>
            <DialogContent>
              {/* <Grid container spacing={4} p={2} */}
              <Grid container spacing={4} p={2} rowSpacing={{ xs: 3, sm: 3, md: 4 }}
                sx={{
                  "@media screen and (max-width:767px)": {
                    padding: 0
                  }
                }}>
                <Grid item md={12} lg={12} xl={12} xs={12}>
                  <TextField
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
                    inputRef={passwordInputRef}
                    name="password"
                    value={formik.values.password}
                    type={!showPassword ? "text" : "password"}
                    size="small"
                    sx={{ width: "100%" }}
                    label="Password"
                    placeholder="Type new Password"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ display: "flex", gap: "4px" }}
                        >
                          {!showPassword ? (
                            <LightTooltip
                              title="Hide Password"
                              arrow
                              placement="top"
                              disableInteractive
                            >
                              <VisibilityOff
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowPassword(true)}
                              />
                            </LightTooltip>
                          ) : (
                            <LightTooltip
                              title="Show Password"
                              arrow
                              placement="top"
                              disableInteractive
                            >
                              <Visibility
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowPassword(false)}
                              />
                            </LightTooltip>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    error={formik.errors.password ? true : false}
                    helperText={
                      formik.errors.password ? formik.errors.password : ""
                    }
                  />
                </Grid>
                <Grid item md={12} lg={12} xs={12} xl={12}>
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    // onChange={(e) => {
                    //   const trimmedValue = e.target.value.trim();
                    //   formik.setFieldError("confirmPassword", "");
                    //   if (trimmedValue === "") {
                    //     formik.setFieldValue("confirmPassword", "");
                    //   } else {
                    //     formik.setFieldValue("confirmPassword", e.target.value);
                    //   }
                    // }}
                    onChange={handleConfirmPasswordChange}
                    inputRef={confirmPasswordInputRef}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    type={!showConfirmPassword ? "text" : "password"}
                    size="small"
                    sx={{ width: "100%" }}
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ display: "flex", gap: "4px" }}
                        >
                          {!showConfirmPassword ? (
                            <LightTooltip
                              title="Hide Password"
                              arrow
                              placement="top"
                              disableInteractive
                            >
                              <VisibilityOff
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowConfirmPassword(true)}
                              />
                            </LightTooltip>
                          ) : (
                            <LightTooltip
                              title="Show Password"
                              arrow
                              placement="top"
                              disableInteractive
                            >
                              <Visibility
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowConfirmPassword(false)}
                              />
                            </LightTooltip>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ shrink: true }}
                    error={formik.errors.confirmPassword ? true : false}
                    helperText={
                      formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : ""
                    }
                  />
                </Grid>
                <Grid item md={12} lg={12} xl={12} xs={12} textAlign={"center"}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      width: "100%",
                      background: "#DD484E",
                      textTransform: "capitalize",
                    }}
                  >
                    {loading ? (
                      <ThreeDots
                        height="34"
                        width="36"
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
                  {alertMessage && (
                    <Alert
                      sx={{
                        ".MuiAlert-icon": {
                          color: "green",
                          fontSize: "20px",
                          padding: "9px 0 px 2px",
                        },
                        fontSize: "12px",
                        cursor: "pointer",
                        margin: "10px 0 0  0",
                      }}
                      severity="success"
                    >
                      {" "}
                      Your password has been changed successfully. Please click
                      on{" "}
                      <span
                        style={{ color: "#d7282f" }}
                        // onClick={() => router.push("/user/signin")}
                        onClick={redirectToLogin}
                      >
                        Login
                      </span>{" "}
                      to continue
                    </Alert>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
          </form>
        </Dialog>
      </LoginOuterWrapper>
    </BoxRedBackgroundImg>
  );
}

export default ResetPasswordModal;
