import InnerLayout from "@/components/innerLayout";
import React, { useEffect, useState } from "react";
import SellerCompanyDetails from "@/components/CompanySettings";
import Head from "next/head";
import { setShowVerifyMobileModal } from "@/hooks/appReducers";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { VerifyMobile } from "@/components/profile/personalProfile/personalProfileModals/verifyMobile";
import { getCookie } from "@/utils/cookieUtils";

const CompanyDetails = () => {
  const [pageLoad, setPageLoad] = useState<boolean>(false);
  const { userEmail, mobileNumber, showVerifyMobileModal, mobileverified } =
    useSelector((state: any) => state.userData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isDismissed = getCookie("isMobileVerificationDismissed");
    if (!isDismissed && !mobileverified) {
      dispatch(setShowVerifyMobileModal(true));
    } else {
      dispatch(setShowVerifyMobileModal(false));
    }
  }, [dispatch, mobileverified]);

  useEffect(() => {
    setPageLoad(true);
  }, []);
  return (
    <>
      <Head>
        <title> Company Details | Merchant AD</title>
      </Head>
      {pageLoad && (
        <InnerLayout>
          {/* <VerifyMobile
            mobileNumber={mobileNumber}
            confirmMobile={""}
            open={showVerifyMobileModal}
            closeModal={() => dispatch(setShowVerifyMobileModal(false))}
            emailId={userEmail}
          /> */}
          <SellerCompanyDetails />
        </InnerLayout>
      )}
    </>
  );
};

export default CompanyDetails;
