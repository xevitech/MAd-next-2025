import React from 'react'
import InnerLayout from '@/components/innerLayout';
import dynamic from 'next/dynamic';
const LeadDetails = dynamic(async () => import("@/components/CRM/Leads/details"), {
    ssr: false,
  })
const Details = () => {
  return (
    <InnerLayout>
    <div><LeadDetails/></div>
    </InnerLayout>
  )
}

export default Details