import React, { useEffect } from "react";
import InnerLayout from "@/components/innerLayout";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { setShowVerifyMobileModal } from "@/hooks/appReducers";
import { VerifyMobile } from "@/components/profile/personalProfile/personalProfileModals/verifyMobile";
import { getCookie } from "@/utils/cookieUtils";
const SubDomain = dynamic(async () => import("@/components/subDomain"), {
  ssr: false,
});
const Subdomain = () => {
  const { userEmail, mobileNumber, showVerifyMobileModal, mobileverified } =
    useSelector((state: any) => state.userData);
  const dispatch = useAppDispatch();

    useEffect(() => {
      const isDismissed = getCookie('isMobileVerificationDismissed');
      if (!isDismissed && !mobileverified) {
        dispatch(setShowVerifyMobileModal(true));
      } else {
        dispatch(setShowVerifyMobileModal(false));
      }
    }, [dispatch, mobileverified]);

  return (
    <InnerLayout>
      {/* <VerifyMobile
        mobileNumber={mobileNumber}
        confirmMobile={""}
        open={showVerifyMobileModal}
        closeModal={() => dispatch(setShowVerifyMobileModal(false))}
        emailId={userEmail}
      /> */}
      <SubDomain />
    </InnerLayout>
  );
};

export default Subdomain;
