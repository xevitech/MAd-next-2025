import React from 'react'
import InnerLayout from '@/components/innerLayout';
import dynamic from 'next/dynamic';
const DetailsOther = dynamic(async () => import("@/components/CRM/Leads/detailsOther"), {
    ssr: false,
  })
const Details = () => {
  return (
    <InnerLayout>
    <div><DetailsOther/></div>
    </InnerLayout>
  )
}

export default Details