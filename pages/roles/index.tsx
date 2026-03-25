import React from "react";
import InnerLayout from '@/components/innerLayout';
import Head from "next/head";
import RolesList from "@/components/Roles";
const Roles = () => {
  return (<>
      <Head>
      <title>Seller Roles | Merchant AD</title>
    </Head>
    <InnerLayout>
      <RolesList />
    </InnerLayout>
    </>
  );
};
export default Roles;
