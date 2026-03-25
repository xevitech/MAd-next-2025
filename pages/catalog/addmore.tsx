import React, { useEffect, useState } from 'react';
import InnerLayout from '@/components/innerLayout';
import Head from 'next/head';
import CreateCatalog from '@/components/catalog/create';
import AddMoreProducts from '@/components/catalog/addmoreproducts';

const catalogAddMore = () => {
  return (
    <>
    <Head>
       <title>Add More Catalog | Powercozmo</title>
     </Head>
    <InnerLayout>
      <AddMoreProducts />
    </InnerLayout>

    </>
  );
};

export default catalogAddMore;
