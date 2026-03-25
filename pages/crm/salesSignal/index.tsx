import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from 'next/dynamic';
const LeadsManagementCrmSalesSignal = dynamic(async () => import("@/components/CRM/SalesSignal/CrmSalesSignal"), {
  ssr: false,
})
const SalesSignal = () => {
  return (
 
    <InnerLayout>
    <LeadsManagementCrmSalesSignal/>
    </InnerLayout>
    
  );
};

export default SalesSignal;