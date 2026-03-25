import FooterPage from '@/components/common/include/footerPart';
import HeaderPage from '@/components/common/include/headerPart';
import dynamic from 'next/dynamic';
import React from 'react';
const Sellerpage = dynamic(() => import('../../components/Sellerpage'), {
  ssr: false,
});
const Products = () => {
  return (
    <>
      <HeaderPage />
      <Sellerpage />
      <FooterPage />
    </>
  );
};

export default Products;