import InnerLayout from '@/components/innerLayout'
import { VerifyMobile } from '@/components/profile/personalProfile/personalProfileModals/verifyMobile'
import Wish from '@/components/wishList/wish'
import { setShowVerifyMobileModal } from '@/hooks/appReducers'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/store'

const WishList = () => {
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
       <title>My Wishlist| Powercozmo</title>
     </Head>
    <div>
        <InnerLayout>
        {/* <VerifyMobile
        mobileNumber={mobileNumber}
        confirmMobile={""}
        open={showVerifyMobileModal}
        closeModal={() => dispatch(setShowVerifyMobileModal(false))}
        emailId={userEmail}
      /> */}
          <Wish/>
        </InnerLayout>
      
    </div>
    </>
  )
}

export default WishList
