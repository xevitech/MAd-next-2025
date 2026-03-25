import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import RetargatingHomePageComponent from "@/components/guestLayout/landingPage/retargatingHomePage";
import Head from "next/head";
import React from "react";
const RetargatingHomePage = () => {
  return (
    <div>
      <Head>
        <title>Powercozmo</title>
      </Head> 
      <HeaderPage />
      <RetargatingHomePageComponent />
      <FooterPage />
    </div>
  );
};

export default RetargatingHomePage;
