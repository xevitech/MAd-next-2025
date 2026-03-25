import React, { useEffect, useState } from 'react';
import InnerLayout from '@/components/innerLayout';
import Head from 'next/head';
import CreateCatalog from '@/components/catalog/create';

const catalogCreate = () => {
  return (
    <>
    <Head>
       <title>Create Catalog | Powercozmo</title>
     </Head>
    <InnerLayout>
      <CreateCatalog />
    </InnerLayout>

    </>
  );
};

export default catalogCreate;
