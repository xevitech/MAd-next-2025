import React, { useContext, useEffect } from "react";
import { MyAppContext } from "contextApi/appContext";
import { Box, Grid } from "@mui/material";
import Popup from "../common/registerationpopup";
import { ProfileHeader } from "../common/profileheader";
import HeaderContent from "./HeaderContant";
import InfoCard from "./InfoCards";
import ProductInfoTable from "./ProductInfoTable";
import Orderlist from "./OrderList";
import ActivityTable from "./Activity_Table";
import { useAppDispatch } from "redux/store";
import {
  setLoginViaSocial,
  setRegistrationModal,
  setShowVerifyMobileModal,
  setWelcomeSocial,
} from "@/hooks/appReducers";
import { useSelector } from "react-redux";
import WelcomeModal from "./WelcomeModal";
import DashboardSkelton from "./DashboradSkelton";
import PlanCardDashboard from "./PlanCardDashboard";
import { getCookie } from "@/utils/cookieUtils";
import SalerTradeLine from "./SalerTradeLine";

export const Dashboard = () => {
  const { setCompleteScreenLoader, setshowRegisterationModal }: any =
    useContext(MyAppContext);

  const dispatch = useAppDispatch();
  const {
    role,
    showRegisterationModal,
    userName,
    userEmail,
    loginviaSocial,
    dashboardSkeleton,
    mobileverified,
    welcomeModalSocial,
  } = useSelector((state: any) => state.userData);

  // useEffect(() => {
  //   setCompleteScreenLoader(false);
  //   const isDismissed = getCookie('isMobileVerificationDismissed');
  //    if (!isDismissed && mobileverified == false && !loginviaSocial) {
  //     dispatch(setShowVerifyMobileModal(true));
  //   } else {
  //     dispatch(setShowVerifyMobileModal(false));
  //   }
  // }, [dispatch, mobileverified]);



  const closeModals = () => {
    dispatch(setRegistrationModal(false));
  };

  const closeWelcomeModal = () => {
    dispatch(setLoginViaSocial(false));
    dispatch(setWelcomeSocial(false));
  };
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  return (
    <>
      {welcomeModalSocial && (
        <WelcomeModal
          open={welcomeModalSocial}
          onClose={() => closeWelcomeModal()}
        />
      )}

      {showRegisterationModal && (
        <Popup
          email={userEmail}
          open={showRegisterationModal}
          closeModal={closeModals}
        ></Popup>
      )}
      <Box
        className="full_page dashboardpage"
        style={{
          marginBottom: "20px",
          backgroundColor: "#f4f6fa",
        }}
      >
        {dashboardSkeleton ? (
          <>
            <DashboardSkelton />
          </>
        ) : (
          <>
            <Grid container xs={12}>
              <ProfileHeader text={"Dashboard"} />
            </Grid>
            <HeaderContent name={userName} />
            {userName && <InfoCard />}
            {/* <SalerTradeLine /> */}
            {userName && <ProductInfoTable />}
            {userName && role == "buyer" && <Orderlist />}
            {role !== "subuser" && userName && <ActivityTable />}
            {userName && role !== "subuser" && <PlanCardDashboard />}
          </>
        )}
      </Box>
    </>
  );
};
export default Dashboard;
