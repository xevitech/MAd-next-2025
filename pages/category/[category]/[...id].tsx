import { apiClient } from "@/components/common/common";
import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
const ThirdStep = dynamic(() => import("../../../components/category"), {
  ssr: false,
});
const SecondStep = dynamic(() => import("@/components/category/SecondStep"), {
  ssr: false,
});

const Category = ({ data }) => {
  
  return (
    <>
      <Head>
        <title>{data.data?.[0]?.name} {"| Merchant AD"}</title>
        <meta name="description" content={data.meta_description ?? ""} />
        <meta name="keyword" content={data.tags ?? ""} />
        <meta name="title" content={data.meta_title ?? ""} />
        <meta name="tracking-page-name" content="category"/>
      </Head>
      <HeaderPage />
      <div className="fixed-header">
        {" "}
        <SecondStep list={data} />
      </div>
      {/* {data.level == "second" && (
        <div className="fixed-header">
          {" "}
          <SecondStep list={data} />
        </div>
      )}
      {data.level == "third" && (
        <div className="fixed-header">
          <ThirdStep list={data} />
        </div>
      )} */}
      <FooterPage />
    </>
  );
};

export default Category;

export async function getServerSideProps({ query }) {
  if (query?.id?.length > 0) {
    let lastItem = query?.id.length - 1;
    let url =
      query?.id.length == 1
        ? `menu/SubCategoryList?slug=${query?.id[lastItem]}&with_product=${1}`
        : `menu/SubCategoryList?slug=${query?.id[lastItem]}&with_product=${1}`;


    let categoryResponse: any = await apiClient(url, "get");
    let metaData = categoryResponse?.data[0];

    const level = (() => {
      switch (query?.id.length) {
        case 1:
          return "second";
        case 2:
          return "third";
        case 3:
          return "fourth";
        case 4:
          return "fifth";
        case 5:
          return "sixth";
        default:
          return "Null";
      }
    })();

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
          level: level,
        },
      },
    };
  }
}
