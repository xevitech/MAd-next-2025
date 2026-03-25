import { TextField, InputAdornment, Button } from "@mui/material";
import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Auth from "@/auth/Auth";
import { Slide } from "react-reveal";
import Image from "next/image";

import {
  StepContainer,
  InputItemContainer,
  InputFieldsContainer,
  LoginSignUpButtonContainer,
  StepFooter,
  Step1FooterBtnContainerLogin,
  LoginWrapper,
  LoginOuterWrapper,
  LoginHeaderContainer,
  LoginHeaderHighlightText,
  LoginHeaderTextContainer,
  LoginLogoContainer,
  RecoverPasswordText,
} from "./styles";

interface ResetForm {
  newPassword: string;
  confirmNewPassword: string;
}

interface ResetFormError {
  newPassword: boolean;
  confirmNewPassword: boolean;
}

interface ResetFormHelperText {
  newPassword: string;
  confirmNewPassword: string;
}
export const ResetPassword = () => {
  const router = useRouter();
  let resetToken = router.query;
  console.log(router.query);
  const [loading, setLoading] = useState(false);

  const [resetFormData, setResetFormData] = useState<ResetForm>({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [resetFormError, setResetFormError] = useState<ResetFormError>({
    newPassword: false,
    confirmNewPassword: false,
  });

  const [helperText, setHelperText] = useState<ResetFormHelperText>({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value.trim() as string;
    const key = e.target.id as string;
    setResetFormData((prev) => ({ ...prev, [key]: value }));
    checkError(key, value);
  };

  const isError = (): boolean => {
    if (resetFormError?.newPassword || resetFormError?.confirmNewPassword) {
      return true;
    }

    return Object.entries(resetFormError)
      .map((element) => element[1])
      .includes(true);
  };

  const checkError = (field: string, value: string) => {
    if (field === "newPassword") {
      if (value === "") {
        setResetFormError((prev) => ({ ...prev, newPassword: true }));
        setHelperText((prev) => ({ ...prev, newPassword: "Required!" }));
      } else if (value.length < 6 && value.length > 0) {
        setResetFormError((prev) => ({ ...prev, newPassword: true }));
        setHelperText((prev) => ({
          ...prev,
          newPassword: "Password must be of 6 characters or more!",
        }));
      } else {
        setResetFormError((prev) => ({ ...prev, newPassword: false }));
        setHelperText((prev) => ({ ...prev, newPassword: "" }));
      }
    }

    if (field === "confirmNewPassword") {
      if (value === "") {
        setResetFormError((prev) => ({ ...prev, confirmNewPassword: true }));
        setHelperText((prev) => ({ ...prev, confirmNewPassword: "Required!" }));
      } else if (value.length < 6 && value.length > 0) {
        setResetFormError((prev) => ({ ...prev, confirmNewPassword: true }));
        setHelperText((prev) => ({
          ...prev,
          confirmNewPassword: "Password must be of 6 characters or more!",
        }));
      } else if (
        value?.length >= 6 &&
        resetFormData?.newPassword.trim() !== value
      ) {
        setResetFormError((prev) => ({ ...prev, confirmNewPassword: true }));
        setHelperText((prev) => ({
          ...prev,
          confirmNewPassword: "Passwords don't match!",
        }));
      } else {
        setResetFormError((prev) => ({ ...prev, confirmNewPassword: false }));
        setHelperText((prev) => ({ ...prev, confirmNewPassword: "" }));
      }
    }
  };

  const changePassword = async () => {
    if (isError()) {
      toast.error("Password Error!");
      return;
    }

    let payload = {
      token: resetToken?.toString(),
      newPassword: resetFormData?.newPassword,
    };

    setLoading(true);

    const response = await fetch(
      "http://merchantad.xevitech.com/api/v1/auth/changePassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    setLoading(false);
    if (data?.status) {
      toast.success("Password changed Successsfully!");
      Auth.login(data?.accessToken, data?.user);
      router.push("/profile/");
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <>
      <LoginOuterWrapper>
        <Slide top>
          <LoginWrapper>
            <>
              <LoginHeaderContainer>
                <LoginLogoContainer>
                  <Image
                    src={"/assets/power-cozmo-icon1.svg"}
                    alt="logo-image"
                    layout="fill"
                  ></Image>
                </LoginLogoContainer>
                <LoginHeaderTextContainer>
                  <LoginHeaderHighlightText>
                    Merchant AD
                  </LoginHeaderHighlightText>
                </LoginHeaderTextContainer>
                <RecoverPasswordText>Reset Password</RecoverPasswordText>
              </LoginHeaderContainer>
              <StepContainer style={{ paddingBottom: "34px" }}>
                <InputItemContainer>
                  <TextField
                    size="small"
                    InputLabelProps={{
                      style: { fontSize: 14, fontWeight: 700 },
                    }}
                    error={resetFormError?.newPassword}
                    helperText={helperText?.newPassword}
                    fullWidth
                    label="New Password"
                    id="newPassword"
                    value={resetFormData?.newPassword}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <RiLockPasswordLine style={{ fontSize: "18px" }} />
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                </InputItemContainer>
                <InputItemContainer>
                  <TextField
                    InputLabelProps={{
                      style: { fontSize: 14, fontWeight: 700 },
                    }}
                    size="small"
                    error={resetFormError?.confirmNewPassword}
                    helperText={helperText?.confirmNewPassword}
                    fullWidth
                    label="Confirm New Password"
                    id="confirmNewPassword"
                    value={resetFormData?.confirmNewPassword}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <RiLockPasswordLine style={{ fontSize: "18px" }} />
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                </InputItemContainer>

                <InputFieldsContainer>
                  <InputItemContainer></InputItemContainer>
                </InputFieldsContainer>
              </StepContainer>
              <LoginSignUpButtonContainer>
                <Button
                  style={{
                    fontWeight: "bold",
                    textTransform: "none",

                    backgroundColor: "rgba(216, 38, 47,0.75)",
                    height: "36px",

                    width: "85%",
                    margin: "auto",
                  }}
                  variant="contained"
                  onClick={() => {
                    changePassword();
                  }}
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
                    " Change Password "
                  )}
                </Button>
              </LoginSignUpButtonContainer>
              <StepFooter>
                <Step1FooterBtnContainerLogin> </Step1FooterBtnContainerLogin>
              </StepFooter>
            </>
          </LoginWrapper>
        </Slide>
      </LoginOuterWrapper>
    </>
  );
};
