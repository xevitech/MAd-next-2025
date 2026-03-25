import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const SignIn = dynamic(() => import("@/components/guestLayout/user/SignIn"), {
  ssr: false,
});

const Signin = () => {
  return (
    <>
      <Head>
        <title>Sign in | Merchant AD Member Login</title>
        <meta
          name="title"
          content="Sign in | Merchant AD Member Login"
        />
        <meta
          name="description"
          content="Offering The Top Online Business Directories of own country. Sign in to your Merchant AD account to manage your listings, track performance, and access exclusive member benefits."
        />
        <meta
          name="keyword"
          content="sign in, login, account sign in, account login"
        />
      </Head>
      <SignIn />
    </>
  );
};

export default Signin;
