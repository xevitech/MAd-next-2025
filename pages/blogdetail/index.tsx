import dynamic from "next/dynamic";
import React from "react";
import HeaderPage from "@/components/common/include/headerPart";
import FooterPage from "@/components/common/include/footerPart";
const Blogdetail = dynamic(
  () => import("../../components/SingleBlogDetail/blogdetail"),
  {
    ssr: false,
  }
);
const Products = () => {
  return (
    <>
      <HeaderPage />
      <Blogdetail />
      <FooterPage />
    </>
  );
};

export default Products;
