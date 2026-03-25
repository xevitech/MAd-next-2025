import React from "react";
import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import InnerLayout from "@/components/innerLayout";
import RecentSearches from "@/components/recentActivities/recentSearches";

export default function index() {
  return (
    <>
      <InnerLayout>
        <RecentSearches />
      </InnerLayout>
    </>
  );
}
