"use strict";
import dynamic from "next/dynamic";
import React from "react";
const Verification = dynamic(async () => import("@/components/verification"), {
  ssr: false,
});
const VerificationPage = () => {
  return (
    <>
      <Verification />
    </>
  );
};
export default VerificationPage;
