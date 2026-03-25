import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Terms from "pages/privacy-policy";
const SignIn = dynamic(() => import("@/components/Terms/privacy"), {
  ssr: false,
});

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Merchant AD </title>
      </Head>
      {/* <SignIn /> */}
      <Terms/>
    </>
  );
};

export default Privacy;
