import React, { useEffect } from "react";
import InnerLayout from "@/components/innerLayout";
import RecentActivities from "@/components/recentActivities";
import Head from "next/head";
import { VerifyMobile } from "@/components/profile/personalProfile/personalProfileModals/verifyMobile";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { setShowVerifyMobileModal } from "@/hooks/appReducers";
const Activity = () => {
  const {  userEmail,mobileNumber,showVerifyMobileModal,mobileverified} = useSelector(
    (state: any) => state.userData
  );

  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    !mobileverified && dispatch(setShowVerifyMobileModal(true))
  },[mobileverified])
  
  return (
    <>
    <Head>
      <title>Recent Activity | Merchant AD</title>
    </Head>
      <InnerLayout>
        <RecentActivities />
      </InnerLayout>
    </>
  );
};
export default Activity;
