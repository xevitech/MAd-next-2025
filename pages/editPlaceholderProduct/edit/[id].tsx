import React, { useEffect, useState } from "react";
import InnerLayout from "@/components/innerLayout";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import EditProductPlaceholder from "@/components/products/editProduct/placeholderEditProduct/EditProductPlaceholder";
import { EDITOR_API_KEY } from "@/utils/staticValues";

const EditPlaceholder = () => {
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
          <EditProductPlaceholder id={Id} />
        </InnerLayout>
      )}
    </>
  );
};

export default EditPlaceholder;
