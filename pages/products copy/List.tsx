import React, { useEffect, useState } from 'react';
import ListProduct from '@/components/products/listProduct';
import InnerLayout from '@/components/innerLayout';
import Head from 'next/head';
import { Box } from '@mui/material';
import { setShowVerifyMobileModal } from '@/hooks/appReducers';
import { useSelector } from 'react-redux';
import { VerifyMobile } from '@/components/profile/personalProfile/personalProfileModals/verifyMobile';
import { useAppDispatch } from 'redux/store';

const productList = () => {
  const [pageLoader, setPageLoader] = useState(true);
  const {  userEmail,mobileNumber,showVerifyMobileModal,mobileverified} = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useAppDispatch();
  useEffect(()=>{
    setPageLoader(false);
    !mobileverified && dispatch(setShowVerifyMobileModal(true))
  },[mobileverified])

  return (
    <>
    <Head>
       <title>Product List | Merchant AD</title>
     </Head>
    <InnerLayout>
    {/* <VerifyMobile
        mobileNumber={mobileNumber}
        confirmMobile={""}
        open={showVerifyMobileModal}
        closeModal={()=>dispatch(setShowVerifyMobileModal(false))}
        emailId={userEmail}
      /> */}
      <ListProduct />
    </InnerLayout>

    </>
  );
};

export default productList;
