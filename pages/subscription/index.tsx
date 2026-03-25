import Subscription from "@/components/Subscription";
import InnerLayout from "@/components/innerLayout";
import { VerifyMobile } from "@/components/profile/personalProfile/personalProfileModals/verifyMobile";
import { setShowVerifyMobileModal } from "@/hooks/appReducers";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";

function index() {
  const {  userEmail,mobileNumber,showVerifyMobileModal,mobileverified} = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useAppDispatch();

  useEffect(()=>{
    !mobileverified && dispatch(setShowVerifyMobileModal(true))
  },[mobileverified])
  
  return (
    <InnerLayout >
          {/* <VerifyMobile
        mobileNumber={mobileNumber}
        confirmMobile={""}
        open={showVerifyMobileModal}
        closeModal={() => dispatch(setShowVerifyMobileModal(false))}
        emailId={userEmail}
      /> */}
      <Subscription />
    </InnerLayout>
  );
}

export default index;
