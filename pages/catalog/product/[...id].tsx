import React, { useEffect, useState } from 'react';
import InnerLayout from '@/components/innerLayout';
import Head from 'next/head';
import CreateCatalog from '@/components/catalog/create';
import AddMoreProductList from '@/components/catalog/addmoreproductList';


const moreProduct = () => {
  return (
    <>
    <Head>
       <title>Add More Catalog | Powercozmo</title>
     </Head>
    <InnerLayout>
      <AddMoreProductList/>
    </InnerLayout>

    </>
  );
};

export default moreProduct;
