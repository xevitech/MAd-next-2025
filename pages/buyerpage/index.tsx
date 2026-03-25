import FooterPage from '@/components/common/include/footerPart';
import HeaderPage from '@/components/common/include/headerPart';
import dynamic from 'next/dynamic';
import React from 'react';
const Buyerpage = dynamic(() => import('../../components/Buyerpage'), {
  ssr: false,
});
const Products = () => {
  return (
    <>
      <HeaderPage />
      <Buyerpage />
      <FooterPage />
    </>
  );
};

export default Products;