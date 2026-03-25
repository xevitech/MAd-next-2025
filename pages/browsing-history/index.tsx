import React from "react";

import dynamic from "next/dynamic";
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);
import HeaderPage from "@/components/common/include/headerPart";
import Browsinghistory from "@/components/browsinghistory";

const BrowsingHistory = () => {
  return (
    <>

      <>
        <HeaderPage />
        <Browsinghistory />
        <FooterPage />
      </>
    </>
  );
};
export default BrowsingHistory;
