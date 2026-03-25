import React, { useEffect, useState } from 'react';
import InnerLayout from '@/components/innerLayout';
import Head from 'next/head';
import CreateCatalog from '@/components/catalog/create';
import AddMoreProducts from '@/components/catalog/addmoreproducts';
import CatalogProductList from '@/components/catalog/catalogProductList';
// import CatalogProductList from '@/components/catalog/CatalogProductList';

const catalogAddMore = () => {
  return (
    <>
    <Head>
       <title>More Catalog | Powercozmo</title>
     </Head>
    <InnerLayout>
    <CatalogProductList/>
    </InnerLayout>

    </>
  );
};

export default catalogAddMore;
