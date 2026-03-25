import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CryptoJS from "crypto-js";
import { apiClient } from "@/components/common/common";
import { toast } from "react-toastify";
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET_KEY,
} from "@/utils/staticValues";
import { useDispatch } from "react-redux";
import {
  setLoginViaSocial,
  setShowVerifyMobileModal,
  setSocialLoader,
  setUserBasicInfo,
} from "@/hooks/appReducers";
import { setCookie } from "@/utils/cookieUtils";

const TwitterCallbackPage = ({ decryptedText }) => {
  const router = useRouter();
  const { oauth_token, oauth_verifier, screen_name, user_id }: any =
    router.query;
  const decodedText = decodeURIComponent(user_id);
  const bytes = CryptoJS.AES.decrypt(decodedText, "Shammi@12345");
  decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!router.isReady || !oauth_token || !oauth_verifier) return;
    const fetchData = async () => {
      if (decodedText && screen_name) {
        const payload = {
          name: screen_name,
          provider_id: decodedText,
          email: `${screen_name}@x.com`,
          social_type: "twitter",
        };
        dispatch(setSocialLoader(true));
        try {
          let response = await apiClient("auth/socialSignupLogin", "post", {
            body: payload,
          });
          if (response.status === 200) {
            localStorage.setItem("Token", response.accessToken);
            setCookie(
              "token",
              response.accessToken,
              response.expires_at ? response.expires_at : ""
            );
            localStorage.setItem("userData", JSON.stringify(response.user));
            dispatch(setUserBasicInfo(response?.user));
            dispatch(setLoginViaSocial(true));
            dispatch(setShowVerifyMobileModal(false));
            dispatch(setSocialLoader(false));
            router.push("/dashboard");
          } else {
            toast.error("Something went wrong");
            router.push("/user/signin");
          }
        } catch (error) {
          toast.error("Error processing request");
        }
      } else {
        router.push("/user/signin");
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <h1>Processing Twitter Authentication...</h1>
      <p>Please wait while we complete the authentication process.</p>
    </div>
  );
};

export default TwitterCallbackPage;
