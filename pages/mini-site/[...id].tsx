import React, { useEffect, useState } from "react";
import MiniSite from "@/components/miniSite/[...id]";
import Head from "next/head";
import { apiClient, FirstletterCapital } from "@/components/common/common";

const MiniSiteHome = ({ query, shop }) => {
  const [render, setRender] = useState<any>(false);
  useEffect(() => {
    setRender(true);
  }, []);
  return (
    <>
      <Head>
        <title>
          Merchant AD - {query?.id?.[0]} -{" "}
          {query?.id?.[1] ? FirstletterCapital(query?.id?.[1]) : "Home"}
          <meta name="description" content={shop?.description ?? ""} />
          <meta property="og:description" content={shop?.description ?? ""} />
          <meta name="categories" content={shop?.categories ?? ""} />
          <meta name="title" content={shop?.name ?? ""} />
          <meta property="og:title" content={shop?.name ?? ""} />
          <meta property="og:type" content="shop" />
          <meta property="og:site_name" content="www.powercozmo.com" />
        </title>
        <meta name="tracking-page-name" content="mini-site" />
      </Head>
      <div style={{ position: "relative" }}>{render && <MiniSite />}</div>
    </>
  );
};

export default MiniSiteHome;

export async function getServerSideProps({ query }) {
  if (query?.id[0] == "undefined") {
    return {
      props: { query },
    };
  } else {
    try {
      let params: any = await apiClient(
        `front/minisite/metaTags?shop_slug=${query?.id[0] ?? ""}`,
        "get"
      );

      console.log(params?.shop, "params");
      if (!params?.shop) {
        return {
          props: { query },
        };
      }
      return {
        props: { query, shop: params?.shop },
      };
    } catch (error) {
      return { props: { query } };
    }
  }
}
