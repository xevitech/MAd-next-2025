import React, { useEffect, useState } from 'react';
import InnerLayout from '@/components/innerLayout';
import Head from 'next/head';
import ListCatalog from '@/components/catalog';

const catalogList = () => {
  return (
    <>
    <Head>
       <title>Catalog List | Powercozmo</title>
     </Head>
    <InnerLayout>
      <ListCatalog />
    </InnerLayout>

    </>
  );
};

export default catalogList;
