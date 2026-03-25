import EmailEditor from "react-email-editor";
import React, { useRef, useState, useEffect } from "react";
import { render } from "react-dom";
// import { sample } from '../ DummycmsHTML';
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.bundle";
import Script from "next/script";
// import Preview from './Preview';
const PreviewEdited = ({ edData, editedCss }) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" />
      <style>{editedCss}</style>
      <div dangerouslySetInnerHTML={{ __html: edData }}></div>
    </>
  );
};
export default PreviewEdited;
