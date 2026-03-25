import React from "react";
import dynamic from "next/dynamic";
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);
import HeaderPage from "@/components/common/include/headerPart";
const Blogdetail = dynamic(
  () => import("@/components/SingleBlogDetail/blogdetail"),
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
