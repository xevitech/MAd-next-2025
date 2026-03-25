import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTokenFromCookies } from "@/utils/cookieUtils";

const requireAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const token = typeof window !== "undefined" && getTokenFromCookies();
    useEffect(() => {
      if (!token) {
        router.replace("/user/signin");
      } else {
        router.replace("/dashboard");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default requireAuth;
