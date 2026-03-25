import dynamic from 'next/dynamic';
import React from 'react';
const Blogdetail = dynamic(() => import('../../components/SingleBlogDetail/blogdetail'), {
  ssr: false,
});
const Products = () => {
  return (
    <>
        <Blogdetail />
    </>
  );
};

export default Products; 