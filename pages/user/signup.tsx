import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
const SignUp = dynamic(() => import("@/components/guestLayout/user/SignUp"), {
  ssr: false,
});
const Signup = () => {
  return (
    <>
      <Head>
        <title>Sign Up | Merchant AD</title>
        <meta name="title" content="Sign Up | Merchant AD" />
        <meta
          name="description"
          content="Offering The Top Online Business Directories of own country. Sign in to your Merchant AD account to manage your listings, track performance, and access exclusive member benefits."
        />
        <meta
          name="keyword"
          content="sign up, register account, create account"
        />
      </Head>
      <SignUp />
    </>
  );
};

export default Signup;
