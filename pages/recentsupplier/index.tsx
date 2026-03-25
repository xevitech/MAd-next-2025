import React from "react";
import RecentSupplier from "@/components/recentActivities/recentSupplier";
import InnerLayout from "@/components/innerLayout";
import RecentSearches from "@/components/recentActivities/recentSearches";
export default function index() {
  return (
    <>
      <InnerLayout>
        <RecentSupplier />
      </InnerLayout>
    </>
  );
}
