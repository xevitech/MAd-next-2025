import React from "react";
import InnerLayout from "@/components/innerLayout";
import RecentActivities from "@/components/recentActivities";
import Head from "next/head";
import { RFQList } from "@/components/rfq";
const RFQ = () => {
  return (
    <>
    <Head>
      <title>RFQ | Merchant AD</title>
    </Head>
      <InnerLayout>
        <RFQList />
      </InnerLayout>
    </>
  );
};
export default RFQ;
