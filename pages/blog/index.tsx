import React from "react";
import dynamic from "next/dynamic";
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);
import HeaderPage from "@/components/common/include/headerPart";
import Blog from "@/components/Blog/index";
import Head from "next/head";

const Products = () => {
  return (
    <>
      <Head>
        <title>Blog | Merchant AD </title>
        <meta
          name="description"
          content="Stay updated on the Merchant AD blogs for expert insights on oil and gas, energy solutions, water management, and innovative industrial power generation solutions. Your source for valuable industry insights."
        />
        <meta
          name="keywords"
          content="blog, news, topics, story, newsletter, supplier, manufacturer, exporter, importer, trade leads, latest blog posts."
        />
      </Head>
      <HeaderPage />
      <Blog />
      <FooterPage />
    </>
  );
};

export default Products;
