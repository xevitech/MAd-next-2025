import React from "react";
import dynamic from "next/dynamic";
const Grapes = dynamic(() => import("./tabsData/Grapes"), { ssr: false });
const CmsPage = () => {
  return (
    <>
      <Grapes />
    </>
  );
};
export default CmsPage;
