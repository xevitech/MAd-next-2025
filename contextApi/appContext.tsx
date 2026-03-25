import React, { useState, createContext, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Auth from "@/auth/Auth";
import { BASE_URL } from "@/utils/staticValues";

export const MyAppContext = createContext<any>(null);

export const MyAppContextProvider = ({ children }: any) => {
  const [completeScreenLoader, setCompleteScreenLoader] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [verifieduser, setverifieduser] = useState("");
  const [mobileverified, setMobileverified] = useState("");
  const [userDetails, setUserDetails] = useState<any>();
  const [userToken, setUserToken] = useState<any>();
  const [userEmail, setuserEmail] = useState<any>();
  const [memberid, setMemberId] = useState<any>();
  const [pendingFields, setPendingFields] = useState<any>([]);
  const [role, setrole] = useState<any>();
  const [showRegisterationModal, setshowRegisterationModal] = useState(false);
  const [profileCompletionPercent, setProfileCompletionPercent] =
    useState<any>();
  const max600px = useMediaQuery("(max-width:600px) and (min-width:280px)");
  const max1200px = useMediaQuery("(max-width:1200px) and (min-width:1025px)");
  const max1024px = useMediaQuery("(max-width:1024px) and (min-width:768px)");
  const max980px = useMediaQuery("(max-width:980px)");
  const max1024min600px = useMediaQuery(
    "(max-width:1024px) and (min-width:600px)"
  );
  const max768px = useMediaQuery("(max-width:768px)");
  const max1440px = useMediaQuery("(max-width:1440px) and (min-width:1201px)");
  const max1920px = useMediaQuery("(max-width:1920px) and (min-width:1440px)");
  const max1460px = useMediaQuery("(max-width:1460px)");
  const breakPoints = {
    max1200px,
    max1024px,
    max980px,
    max768px,
    max1440px,
    max1920px,
    max600px,
    max1024min600px,
    max1460px,
  };

  return (
    <MyAppContext.Provider
      value={{
        userDetails,
        setUserDetails,
        userToken,
        setUserToken,
        showRegisterationModal,
        setshowRegisterationModal,
        completeScreenLoader,
        setCompleteScreenLoader,
        breakPoints,
        profileImage,
        setProfileImage,
        userName,
        setUserName,
        verifieduser,
        setverifieduser,
        userEmail,
        setuserEmail,
        profileCompletionPercent,
        setProfileCompletionPercent,
        setMemberId,
        memberid,
        role,
        setrole,
        pendingFields,
        mobileverified,
      }}
    >
      {children}
    </MyAppContext.Provider>
  );
};
