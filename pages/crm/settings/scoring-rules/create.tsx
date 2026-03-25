import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from "next/dynamic";
import Head from 'next/head';
const CreateScoring = dynamic(async () => import("@/components/CRM/Setting/CreateScoring"), {
    ssr: false,
  })
const Scoringrules = () => {
  return (
    <>
    <Head>
       <title>Scroing Rules | Powercozmo</title>
     </Head>
    <InnerLayout>
    <CreateScoring/>
    </InnerLayout>
    </>
  );
};

export default Scoringrules;