import React, { useEffect, useState } from "react";
import EditProduct from "@/components/products/editProduct";
import InnerLayout from "@/components/innerLayout";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { EDITOR_API_KEY } from "@/utils/staticValues";

const Editproduct = () => {
  const router: any = useRouter();
  const { Id } = router.query;
  const [pageLoad, setPageLoad] = useState<boolean>(false);

  useEffect(() => {
    if (Id !== "") setPageLoad(true);
  }, [Id]);

  return (
    <>
      <Head>
        <Script
          src={`https://cdn.tiny.cloud/1/${EDITOR_API_KEY}/tinymce/5/tinymce.min.js`}
          referrerPolicy="origin"
        ></Script>
      </Head>

      {pageLoad && (
        <InnerLayout>
          <EditProduct id={Id} />
        </InnerLayout>
      )}
    </>
  );
};

export default Editproduct;
