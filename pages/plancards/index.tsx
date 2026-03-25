import React, { useEffect } from "react";
import InnerLayout from "@/components/innerLayout";
import dynamic from "next/dynamic";
import Head from "next/head";
import { VerifyMobile } from "@/components/profile/personalProfile/personalProfileModals/verifyMobile";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { setShowVerifyMobileModal } from "@/hooks/appReducers";
const Bestprice = dynamic(async () => import("@/components/planCard"), {
  ssr: false,
});

const PlanCards = () => {
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
        <title>Plans | Merchant AD</title>
      </Head>
      <InnerLayout>
      {/* <VerifyMobile
        mobileNumber={mobileNumber}
        confirmMobile={""}
        open={showVerifyMobileModal}
        closeModal={()=>dispatch(setShowVerifyMobileModal(false))}
        emailId={userEmail}
      /> */}
        <Bestprice />
      </InnerLayout>
    </>
  );
};

export default PlanCards;
