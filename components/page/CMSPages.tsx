import React, { useEffect } from "react";
export default function CMSPages({ pagesData }) {
  let html = pagesData.html;
  useEffect(() => {
    document.body.classList.add("cms-body");
    return ()=>{
    document.body.classList.remove("cms-body");
    }
  });
  return (
    <div>
      <style jsx>{`
        ${pagesData.css}
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
