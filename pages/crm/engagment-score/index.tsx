import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from "next/dynamic";
import Head from 'next/head';
const EngagmentScore = dynamic(async () => import("@/components/CRM/Engagment"), {
    ssr: false,
  })
const Scoringrules = () => {
  return (
    <>
    <Head>
       <title>Engagment Score | Powercozmo</title>
     </Head>
    <InnerLayout>
    <EngagmentScore/>
    </InnerLayout>
    </>
  );
};

export default Scoringrules;