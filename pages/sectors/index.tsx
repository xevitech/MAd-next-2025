import React from "react";
import Head from "next/head";
import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import SectorsList from "@/components/sectors";
const Sectors = () => {
  return (
    <>
      <Head>
        <title>{"Sectors | Merchant AD"}</title>
      </Head>
      <HeaderPage />
      <div className="fixed-header">
      <SectorsList />
      </div>
      <FooterPage />
    </>
  );
};
export default Sectors;
