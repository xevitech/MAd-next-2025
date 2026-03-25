import React from "react";
import InnerLayout from '@/components/innerLayout';
import Head from "next/head";
import EditRole from "@/components/Roles/edit";
const Roles = () => {
  return (<>
      <Head>
      <title>Seller Roles | Merchant AD</title>
    </Head>
    <InnerLayout>
      <EditRole />
    </InnerLayout>
    </>
  );
};
export default Roles;
