import React from "react";
import dynamic from "next/dynamic";
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);
import Survey from "@/components/surveyForm";

const PowercozmoSurvey = () => {
  return (
    <>
      <Survey />
    </>
  );
};
export default PowercozmoSurvey;
