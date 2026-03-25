import React, { useEffect, useState } from 'react';
import InnerLayout from '@/components/innerLayout';
import Head from 'next/head';
import UpdateCatalog from '@/components/catalog/UpdateCatalog';


const catalogUpdate = () => {
  return (
    <>
    <Head>
       <title>Update Catalog | Powercozmo</title>
     </Head>
    <InnerLayout>
      <UpdateCatalog/>
    </InnerLayout>

    </>
  );
};

export default catalogUpdate;
