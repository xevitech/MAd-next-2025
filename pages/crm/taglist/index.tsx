import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from 'next/dynamic';
const TagList = dynamic(async () => import("@/components/CRM/Leads/TagsList"), {
  ssr: false,
})
const ManageTags = () => {
  return (
    <InnerLayout>
      <TagList />
    </InnerLayout>
  );
};

export default ManageTags;