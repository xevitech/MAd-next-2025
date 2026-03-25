import React from "react";

import dynamic from "next/dynamic";
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);
import HeaderPage from "@/components/common/include/headerPart";
import Head from "next/head";
import Script from "next/script";
let AboutUs = dynamic(() => import("@/components/aboutus"), {
  ssr: false,
});
const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us - Merchant AD</title>
        <meta
          name="description"
          content="Merchant AD facilitates an integrated platform that eases availability of spare parts, components and services to the Power Generation, Oil & Energy, Water & Wastewater management sectors"
        />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        ></link>
      </Head>
      <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" />

      <>
        <HeaderPage />
        <AboutUs />
        <FooterPage />
      </>
    </>
  );
};
export default AboutPage;
