import React, { useEffect, useState } from "react";
import CmsPage from "@/components/cmsPage";
const editor = () => {
  const [mountEditor, setMountEditor] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("window", window);
      if (window) setMountEditor(true);
    }
  }, []);
  return (
    <>
      <CmsPage />
    </>
  );
};

export default editor;
