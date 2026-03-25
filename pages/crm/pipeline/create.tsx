import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from "next/dynamic";
const PipeLineManagement = dynamic(async () => import("@/components/CRM/PipeLine"), {
    ssr: false,
  })
const Create = () => {
  return (
    <InnerLayout>
    <PipeLineManagement/>
    </InnerLayout>
  );
};

export default Create;