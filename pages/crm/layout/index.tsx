import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from "next/dynamic";
const PageLayout = dynamic(async () => import("@/components/CRM/PageLayout"), {
    ssr: false,
  })
const LayoutManagement = () => {
  return (
    <InnerLayout>
    <PageLayout/>
    </InnerLayout>
  );
};

export default LayoutManagement;