import React, { useEffect, useState } from "react";
import CompanyProfile from "@/components/profile/companyProfile";
import InnerLayout from "@/components/innerLayout";
import Head from "next/head";

const Companyprofile = () => {
  const [pageLoad, setPageLoad] = useState<boolean>(false);
  useEffect(() => {
    setPageLoad(true);
  }, []);
  return (
    <>
      <Head>
        <title>Company Profile | Powercozmo</title>
      </Head>
      {pageLoad && (
        <InnerLayout>
          <CompanyProfile />
        </InnerLayout>
      )}
    </>
  );
};

export default Companyprofile;
