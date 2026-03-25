import React from "react";
import InnerLayout from '@/components/innerLayout';
import Head from "next/head";
import CreateRole from "@/components/Roles/create";
const Roles = () => {
  return (<>
      <Head>
      <title>Seller Roles | Merchant AD</title>
    </Head>
    <InnerLayout>
      <CreateRole />
    </InnerLayout>
    </>
  );
};
export default Roles;
