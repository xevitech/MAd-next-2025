import React, { useEffect, useState } from "react";
import CMSPages from "@/components/page/CMSPages";
import Head from "next/head";
import Script from "next/script";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const HeaderPage = dynamic(
  () => import("components/common/include/headerPart"),
  {
    ssr: true,
  }
);
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: true,
  }
);

function Pages({ data }) {
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    setRender(true);
  }, []);
  
  return (
    <>
      <Head>
        <title>
          {data?.meta_title ? data?.meta_title ?? "" : data?.title ?? ""}
        </title>
        <meta name="description" content={data?.meta_description ?? ""} />
        <meta name="keyword" content={data?.keywords ?? ""} />
        <meta name="title" content={data?.meta_title ?? data?.title ?? ""} />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/assets/GrapesCss/custom.css" />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      {render && <HeaderPage />}
      {data && render ? (
        <CMSPages pagesData={data} />
      ) : (
        render && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minHeight: "50vh",
              backgroundColor: "",
            }}
          >
            <Typography variant="h1" style={{ color: "black" }}>
              404
            </Typography>
            <Typography variant="h6" style={{ color: "black" }}>
              The page you’re looking for doesn’t exist.
            </Typography>
          </Box>
        )
      )}
      {render && <FooterPage />}
    </>
  );
}

export default Pages;
export const getServerSideProps = async ({ query }) => {
  let result: any = await fetch(
    `https://merchantad.xevitech.com/api/v1/cms/page/listed/${query?.id}`
  );
  let response = await result.json();
  if (response.status && response.data) {
    return { props: { data: response.data } };
  }
  if (response.status && !response.data) {
    return { props: { data: null } };
  }
  if (!response.status) {
    return { props: { data: null } };
  } else {
    return { props: { data: null } };
  }
};
