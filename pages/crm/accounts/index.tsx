import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from "next/dynamic";
import { ContactDetails } from '@/components/profile/companyProfile/contactDetails';
import Contact from '@/components/ContactList/MyContact';
import CrmCompany from '@/components/CRM/Company/CrmCompany';
import Head from 'next/head';
const LeadsManagementCrmCompany = dynamic(async () => import("@/components/CRM/Company/CrmCompany"), {
  ssr: false,
})
const contacts = () => {
  return (
    <>
    <Head>
       <title>Account | Powercozmo</title>
     </Head>
    <InnerLayout>
    <LeadsManagementCrmCompany/>
    </InnerLayout>
    </>
  );
};

export default contacts;