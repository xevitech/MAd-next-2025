import React, { useEffect } from 'react';
import InnerLayout from '@/components/innerLayout';
import Head from 'next/head';
import MyCategory from '../../components/SellerTools/MyCategory';
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { setShowVerifyMobileModal } from '@/hooks/appReducers';
import { VerifyMobile } from '@/components/profile/personalProfile/personalProfileModals/verifyMobile';

const category = () => {
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
  <title>
  Categories | Merchant AD
  </title>
 </Head>
    <InnerLayout>
    {/* <VerifyMobile
        mobileNumber={mobileNumber}
        confirmMobile={""}
        open={showVerifyMobileModal}
        closeModal={() => dispatch(setShowVerifyMobileModal(false))}
        emailId={userEmail}
      /> */}
      <MyCategory />
    </InnerLayout>
    </>
  );
};

export default category;
