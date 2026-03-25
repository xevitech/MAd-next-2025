import SellerContactTable from "@/components/SellerSubaccount/ContactList";
import dynamic from 'next/dynamic';
import Head from "next/head";
import React from "react";
const InnerLayout = dynamic(() => import("@/components/innerLayout"), {
  ssr: false,
});

const SellerSubAccount = () => {
  return (<>
      <Head>
      <title>Seller Sub Account | Merchant AD</title>
    </Head>
    <InnerLayout>
      <SellerContactTable />
    </InnerLayout>
    </>
  );
};
export default SellerSubAccount;
