import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from "next/dynamic";
import Head from 'next/head';
const WorkFlowView = dynamic(async () => import("@/components/CRM/Leads/WorkFlow"), {
    ssr: false,
  })
const WorkFlowManagement = () => {
  return (<>
    <Head>
        <title>Workflow | Powercozmo</title>
      </Head>
    <InnerLayout>
      <WorkFlowView />
   </InnerLayout>
    </>
  );
};

export default WorkFlowManagement;