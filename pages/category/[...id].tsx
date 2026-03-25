import CategorySector from "@/components/category/categorysector";
import { apiClient } from "@/components/common/common";
import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";

const Category = ({ data }) => {
  return (
    <>
      <Head>
        <title>{"All Categories | Merchant AD"}</title>
        <meta name="description" content={data?.meta_description ?? ""} />
        <meta name="keyword" content={data?.tags ?? ""} />
        <meta name="title" content={data?.meta_title ?? ""} />
        <meta name="tracking-page-name" content="category"/>
      </Head>
      <HeaderPage />
      
      <div className="fixed-header">
      <div style={{ background:"#fff"}}>
        <Box className="mypagecontainer">
          <CategorySector list={data} />
        </Box>
      </div>
      </div>
      <FooterPage />
    </>
  );
};

export default Category;

export async function getServerSideProps({ query }) {
  let categoryResponse = await apiClient(`front/frontEndcategoryList`, "get");


  let metaData = categoryResponse?.data[0];
  return {
    props: {
      data: {
        data: categoryResponse?.data ?? "No data",
        meta_title: metaData?.meta_title ?? "",
        meta_description: metaData?.meta_description ?? "",
        tags: metaData?.tags ?? "",
        name: metaData?.name ?? "",
        categoryList: categoryResponse?.data ?? [],
        query,
      },
    },
  };
}
