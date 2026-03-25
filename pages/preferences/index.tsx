
import Accountsetting from '@/components/preferences';
import { VerifyMobile } from '@/components/profile/personalProfile/personalProfileModals/verifyMobile';
import { setShowVerifyMobileModal } from '@/hooks/appReducers';
import dynamic from 'next/dynamic';
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/store';
const InnerLayout = dynamic(() => import("@/components/innerLayout"), {
  ssr: false,
});

const AccountPreferences = () => {
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
      <Accountsetting />
    </InnerLayout>
  );
};
export default AccountPreferences;