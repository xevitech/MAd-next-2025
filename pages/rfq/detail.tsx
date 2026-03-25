import React from "react";
import InnerLayout from "@/components/innerLayout";
import RecentActivities from "@/components/recentActivities";
import Head from "next/head";
// import { Detail } from "@/components/rfq";
const Detail = () => {
  return (
    <>
    <Head>
      <title>RFQ | Merchant AD</title>
    </Head>
      <InnerLayout>
        <Detail/>
      </InnerLayout>
    </>
  );
};
export default Detail;
