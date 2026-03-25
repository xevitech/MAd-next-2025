import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from "next/dynamic";
import Head from 'next/head';
const ScoringRule = dynamic(async () => import("@/components/CRM/Setting"), {
    ssr: false,
  })
const Scoringrules = () => {
  return (
    <>
    <Head>
       <title>Scroing Rules | Powercozmo</title>
     </Head>
    <InnerLayout>
    <ScoringRule/>
    </InnerLayout>
    </>
  );
};

export default Scoringrules;