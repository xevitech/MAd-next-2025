import React from "react";
import InnerLayout from "@/components/innerLayout";
import dynamic from "next/dynamic";
const PipeLineList = dynamic(
  async () => import("@/components/CRM/PipeLine/PipeLineList"),
  {
    ssr: false,
  }
);
const Pipeline = () => {
  return (
    <InnerLayout>
      <PipeLineList />
    </InnerLayout>
  );
};

export default Pipeline;
