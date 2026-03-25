import React, { useEffect } from "react";
import InnerLayout from "@/components/innerLayout";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { setShowVerifyMobileModal } from "@/hooks/appReducers";
import { VerifyMobile } from "@/components/profile/personalProfile/personalProfileModals/verifyMobile";
const PricingSetting = dynamic(() => import("@/components/pricingSettings"), {
  ssr: false,
});

const pricingSettings = () => {
  const {  userEmail,mobileNumber,showVerifyMobileModal,mobileverified} = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useAppDispatch();

  useEffect(()=>{
    !mobileverified && dispatch(setShowVerifyMobileModal(true))
  },[mobileverified])
  
  return (
    <InnerLayout>
      {/* <VerifyMobile
        mobileNumber={mobileNumber}
        confirmMobile={""}
        open={showVerifyMobileModal}
        closeModal={() => dispatch(setShowVerifyMobileModal(false))}
        emailId={userEmail}
      /> */}
      <PricingSetting />{" "}
    </InnerLayout>
  );
};

export default pricingSettings;
