import React from 'react';
import InnerLayout from '@/components/innerLayout';
import dynamic from "next/dynamic";
const FieldMapping = dynamic(async () => import("@/components/CRM/Leads/FieldMapping"), {
    ssr: false,
})
const MappingManagement = () => {
    return (
        <InnerLayout>
            <FieldMapping />
        </InnerLayout>
    );
};

export default MappingManagement;