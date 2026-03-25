import React from "react";
import InnerLayout from "@/components/innerLayout";
import dynamic from "next/dynamic";
import Head from "next/head";
// import LeadsManagement from "@/components/CRM/Leads";
const LeadsManagementCrmDeals = dynamic(
  async () => import("@/components/CRM/Deals/CrmDeals"),
  {
    ssr: false,
  }
);
const LeadsManagement = dynamic(async () => import("@/components/CRM/Leads"), {
  ssr: false,
});
const contacts = () => {
  return (
    <>
      <Head>
        <title>Deals | Powercozmo</title>
      </Head>
      <InnerLayout>
        {/* <LeadsManagement /> */}

        <LeadsManagementCrmDeals />
      </InnerLayout>
    </>
  );
};

export default contacts;
