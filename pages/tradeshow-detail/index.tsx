import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import TradeshowDetail from "@/components/guestLayout/landingPage/TradeshowDetail";

const DetailTradeshow = () => {
  const [render,setRender]= useState(false)

  useEffect(()=>{
    setRender(true)
  },[])
  return (
    <>
     <HeaderPage/>
     <TradeshowDetail/>
      <FooterPage />
    </>
  );
};

export default DetailTradeshow;
