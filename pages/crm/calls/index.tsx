import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from "next/dynamic";
import Head from 'next/head';
const LeadsManagement = dynamic(async () => import("@/components/CRM/Leads"), {
    ssr: false,
  })
const LeadManagement = () => {
  return (<>
    <Head>
       <title>Calls | Powercozmo</title>
     </Head>
    <InnerLayout>
    <LeadsManagement/>
    </InnerLayout>
    </>
  );
};

export default LeadManagement;