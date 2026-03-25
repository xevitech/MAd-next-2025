import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from 'next/dynamic';
const Ads = dynamic(() => import('../../components/adsPage'), {
  ssr: false,
});
const Products = () => {
  return (
    <>
      <InnerLayout>
        <Ads />
      </InnerLayout>
    </>
  );
};

export default Products;