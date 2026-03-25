import React, { useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
const SignIn = dynamic(() => import("@/components/Terms/termContent"), {
  ssr: false,
});

const Signin = () => {
  return (
    <>
     <HeaderPage/>
      <Head>
        <title>Merchant AD </title>
      </Head>
      <SignIn />
      
      <FooterPage />
    </>
  );
};

export default Signin;
