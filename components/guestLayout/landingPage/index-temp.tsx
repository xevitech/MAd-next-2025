import { validateEmail } from "@/utils/commonFunctions/Validations";
import { BASE_URL } from "@/utils/staticValues";
import { InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  CrossIconContainer,
  CrossIconImage,
  CustomButton,
  HeaderText,
  InputFieldContainer,
  LandingPageContainer,
  LeftMaskContainer,
  NormalText,
  Overlayback,
  RightMaskContainer,
  TopButtonsContainer,
} from "./styles";

const LandingPage = () => {
  const router = useRouter();
  const [showEmailField, setShowEmailField] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorText, setEmailErrorText] = useState<string>("");
  const [email, setEmail] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  const showEmailFieldContent = () => {
    return (
      <Overlayback>
        <LeftMaskContainer>
          <HeaderText>{"Let's Go for FREE"}</HeaderText>
          <NormalText>and start using MerchantAD in seconds!</NormalText>
        </LeftMaskContainer>
        <RightMaskContainer>
          <CrossIconContainer>
            <CrossIconImage
              onClick={() => {
                setShowEmailField(false);
              }}
            >
              <Image
                src="/assets/cross_icon.svg"
                alt="crossIcon"
                width={60}
                height={60}
              />
            </CrossIconImage>
          </CrossIconContainer>
        </RightMaskContainer>
        <InputFieldContainer>
          <TextField
            size="small"
            InputLabelProps={{ style: { fontSize: 14 } }}
            variant="outlined"
            error={emailError}
            helperText={emailErrorText}
            fullWidth
            label="Email "
            id="email"
            name="email"
            value={email?.email}
            onChange={handleEmailChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AiOutlineMail style={{ fontSize: "18px" }} />
                </InputAdornment>
              ),
            }}
          ></TextField>

          <CustomButton
            onClick={handleSubmit}
            buttontype={{ emailButton: true }}
          >
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
              "Get Merchant AD"
            )}
          </CustomButton>
        </InputFieldContainer>
      </Overlayback>
    );
  };

  const checkError = (mail: string) => {
    if (mail === "") {
      setEmailError(true);
      setEmailErrorText("Required");
    } else if (!validateEmail(mail)) {
      setEmailError(true);
      setEmailErrorText("Invalid Email Format");
    } else {
      setEmailError(false);
      setEmailErrorText("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setEmail((prev) => ({ ...prev, [name]: value }));
    checkError(value);
  };

  const handleSubmit = async () => {
    if (!email?.email) {
      toast.error("Please enter your email!");
      return;
    }
    if (emailError) {
      toast.error("Please enter correct email!");
      return;
    }
    setLoading(true);
    const response = await fetch(`${BASE_URL}/auth/isExistingUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email?.email }),
    });
    const data = await response.json();
    setLoading(false);

    if (data?.status) {
      router.push({
        pathname: "/user/signin",
        query: { email: email?.email },
      });
    } else {
      router.push({
        pathname: "/user/signup",
        query: { email: email?.email },
      });
    }
  };

  return (
    <>
      <LandingPageContainer>
        <TopButtonsContainer>
          <CustomButton
            buttontype={{ getStarted: true }}
            onClick={() => {
              setShowEmailField(true);
            }}
            variant="contained"
          >
            Get Started
          </CustomButton>
          <CustomButton
            onClick={() => {
              router.push("/user/signup");
            }}
          >
            Sign Up
          </CustomButton>
          <CustomButton
            onClick={() => {
              router.push("/user/signin");
            }}
          >
            Log In{" "}
          </CustomButton>
        </TopButtonsContainer>
        {showEmailField && showEmailFieldContent()}
      </LandingPageContainer>
    </>
  );
};

export default LandingPage;
