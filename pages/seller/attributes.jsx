import React from "react";
import SellerAttributes from "@/components/SellerTools/SellerAttributes";
import InnerLayout from "@/components/innerLayout";
import Head from "next/head";

const attributes = () => {
  return (
    <>
      <Head>
        <title>Specification Definition | Merchant AD</title>
      </Head>
      <InnerLayout>
        <SellerAttributes />
      </InnerLayout>
    </>
  );
};

export default attributes;
