import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from "next/dynamic";
import { ContactDetails } from '@/components/profile/companyProfile/contactDetails';
import Contact from '@/components/ContactList/MyContact';
import CrmContacts from '@/components/CRM/Contacts/CrmContacts';
import Head from 'next/head';
const LeadsManagementContacts = dynamic(async () => import("@/components/CRM/Contacts/CrmContacts"), {
  ssr: false,
})
const contacts = () => {
  return (
    <>
     <Head>
        <title>Contacts | Powercozmo</title>
      </Head>
    <InnerLayout>
    <LeadsManagementContacts/>
    </InnerLayout>
    </>
  );
};

export default contacts;