import {
  GOOGLE_CLIENT_ID,
  LINKEDIN_CLIENT_ID,
  FACEBOOK_APP_KEY,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  REDIRECT_URI,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET_KEY,
  BASE_URL,
} from "@/utils/staticValues";
import { Box, Typography } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React, { useEffect, useLayoutEffect } from "react";
import XIcon from "@mui/icons-material/X";
import jwt_decode from "jwt-decode";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import { apiClient } from "@/components/common/common";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  setLoginViaSocial,
  setShowVerifyMobileModal,
  setSocialLoader,
  setUserBasicInfo,
} from "@/hooks/appReducers";
import { BoxGoogle, LogInSocialBox } from "../styles";
import axios from "axios";
import { setCookie } from "@/utils/cookieUtils";

function LoginWithSocial({ text, type }) {
  let redirect_url = typeof window === "object" ? window.location.origin : "";
  const router = useRouter();
  const dispatch = useDispatch();
  const SignUpHandler = async (data) => {
    dispatch(setSocialLoader(true));
    let response = await apiClient("auth/socialSignupLogin", "post", {
      body: data,
    });
    if (response.status === 200) {
      if (type === "signup") toast.success("Account created successfully");
      localStorage.setItem("Token", response.accessToken);
      setCookie("token", response.accessToken, response.expires_at);
      localStorage.setItem("userData", JSON.stringify(response.user));
      dispatch(setUserBasicInfo(response?.user));
      dispatch(setLoginViaSocial(true));
      dispatch(setShowVerifyMobileModal(false));
      router.push("/dashboard");
    } else {
      toast.error("Something went wrong");
    }
  };

  const getProfileDetails = async (code) => {
    dispatch(setSocialLoader(true));
    let response = await apiClient("linkedin/token", "post", {
      body: { code, redirect_url: `${redirect_url}/user/signin` },
    });
    if (response.status == 200 && response.email) {
      SignUpHandler({
        name: response.name,
        email: response.email,
        provider_id: response.sub,
        social_type: "linkedin",
      });
    } else {
      toast.error("Something went wrong");
      router.push("/user/signin");
    }
  };

  useLayoutEffect(() => {
    if (router?.query?.code) {
      dispatch(setSocialLoader(true));
      getProfileDetails(router?.query?.code);
    }
  }, [router?.query?.code]);

  const facebookLogin = (response) => {
    if (response.status !== "unknown") {
      SignUpHandler({
        name: response.name,
        email: response.email,
        provider_id: response.id,
        social_type: "facebook",
      });
      console.log("Logged in successfully:", response);
    } else {
      console.log("User login failed:", response);
    }
  };

  const handleTwitterLogins = async () => {
    const rootUrl = `${BASE_URL}/auth/twitter/url`;
    const response = await axios.get(rootUrl);
    window.location.href = response?.data?.url;
  };

  return (
    <LogInSocialBox>
      <Typography
        component="span"
        fontFamily="open sans"
        fontSize="14px"
        sx={{
          // paddingRight: "5px",
          "@media (max-width: 600px)": {
            fontSize: "12px",
          },
          "@media (max-width: 480px)": {
            padding: "0 0 6px 0",
          },
        }}
      >
        {text}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <BoxGoogle
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Box
            sx={{
              margin: "0px 0 0 2px",
              "& div": {
                display: "flex",
                overflow: "hidden",
                padding: "0 !important",
                justifyContent: "center !important",
              },
            }}
          >
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  var decoded: any = jwt_decode(credentialResponse.credential);
                  SignUpHandler({
                    name: decoded.name,
                    email: decoded.email,
                    provider_id: decoded.sub,
                    social_type: "google",
                  });
                }}
                onError={() => toast.error("Something went wrong")}
                size="medium"
                shape="square"
                type="icon"
                width="10px"
              />
            </GoogleOAuthProvider>
          </Box>
        </BoxGoogle>
        <Box
          sx={{ cursor: "pointer", zIndex: 1, position: "relative" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Box
            style={{
              color: "#0072b1",
              fontSize: "10px",
              border: "1px solid #dadce0 ",
              borderRadius: "4px",
              padding: "3px",
              height: "32px",
              marginLeft: "6px",
            }}
          >
            <LinkedInIcon
              onClick={(e) => {
                e.stopPropagation();
                if (redirect_url) {
                  router.push(
                    `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${redirect_url}/user/signin&scope=email%20profile%20openid%20w_member_social&state=zSE1VgyEKkI5ycETjcuV`
                  );
                }
              }}
            />
          </Box>
        </Box>
        <Box
          className="FacebookIcon"
          style={{
            color: "#0072b1",
            fontSize: "10px",
            border: "1px solid #dadce0 ",
            borderRadius: "4px",
            padding: "3px",
            height: "32px",
            marginLeft: "6px",
          }}
        >
          <FacebookLogin
            appId={FACEBOOK_APP_KEY}
            autoLoad={false}
            callback={facebookLogin}
            fields="name,email,picture"
            scope="public_profile,email"
            cssClass="my-facebook-button"
            textButton={""}
            icon={<FacebookIcon />}
          />
        </Box>
        <Box
          style={{
            color: "black",
            fontSize: "10px",
            border: "1px solid #dadce0 ",
            borderRadius: "4px",
            padding: "4px",
            height: "32px",
            marginLeft: "6px",
          }}
        >
          <XIcon sx={{ fontSize: "20px" }} onClick={handleTwitterLogins} />
          {/* <TwitterLogin
      authCallback={handleTwitterLogin}
      consumerKey={TWITTER_CONSUMER_KEY}
      consumerSecret={TWITTER_CONSUMER_SECRET_KEY}

    /> */}
        </Box>
      </Box>
    </LogInSocialBox>
  );
}

export default LoginWithSocial;
