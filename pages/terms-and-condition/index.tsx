import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
const TermConditions = dynamic(() => import("@/components/Terms/termContent"), {
  ssr: false,
});

const Terms = () => {
  const [render,setRender]= useState(false)

  useEffect(()=>{
    setRender(true)
  },[])
  return (
    <>
     <HeaderPage/>
      <Head>
        <title>Merchant AD </title>
      </Head>
    { render&& <TermConditions /> }
      <FooterPage />
    </>
  );
};

export default Terms;
