import React, { useEffect, useState  } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import Userdata from "@/components/Terms/user-data";
const TermConditions = dynamic(() => import("@/components/Terms/privacy"), {
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
      <Userdata/>
       {render &&  <FooterPage />  }
     
    </>
  );
};

export default Terms;
