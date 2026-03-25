import React from 'react'
import CommonCRMTabs from '../Leads/CommonCRMTabs';
import { CrmFullData, CrmInnerContent } from '../commonStyle';
import { OuterContainer } from '@/components/SellerTools/styles';
import { ProfileHeader } from '@/components/common/profileheader';
import Leads from '../Leads/Leads';
import LeadsManagement from '../Leads';


const CrmSalesSignal = () => {
  return (
    <>
    <LeadsManagement />
    </>
    // <div className="full_page crm_pagelayout">
    //   <CrmFullData>
    //     <OuterContainer>
    //       <ProfileHeader text={"CRM Management Center"} />
    //     </OuterContainer>
    //     <CrmInnerContent>
    //       <CommonCRMTabs activeButton={""} />
    //       <Leads />
    //     </CrmInnerContent>
    //   </CrmFullData>
    // </div>
  )
}

export default CrmSalesSignal;