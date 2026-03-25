import React, { useState, createContext, useEffect } from 'react';
// import useMediaQuery from '@mui/material/useMediaQuery';
import Auth from '@/auth/Auth';
import { BASE_URL } from '@/utils/staticValues';
import { toast } from 'react-toastify';
import { apiClient } from '@/components/common/common';

export const AccountContext = createContext<any>(null);
export const AccountContextProvider = ({ children }: any) => {
  const [completeScreenLoader, setCompleteScreenLoader] = useState(false);
  const [details , setdetails]=React.useState<any>();
  // const [verification , setverification] = React.useState<any>(details?.company_verification_certificate);
  const [value, setValue] = useState<any>({
    ques1:details?.inquiry_from,
    ques2:details?.company_verification_certificate,
    ques3:details?.reminder_inquiries,
    ques4:details?.automate_quote,
    ques5:details?.searches_matching,
    ques6:details?.frequent_searches,
    ques7:details?.trade_alert_new_product_demand,
    ques8:details?.demanding_enquiries_powercozmo,
    ques9:details?.preffer_mode_communication,
    ques10:details?.view_profile,
    ques11:details?.view_company_tour,
    ques12:details?.view_company_certifications,
    ques13:details?.view_company_contact_details,
    ques14:details?.view_your_company_details,
    ques15:details?.instant_messaging,
    ques16:details?.view_personal_information
    
  });
  const getAccountDetails = async () => {
    let response = await apiClient(
      "prefrences/index",
      "get"
    );
    // setdetails(response.data);
    if (response?.status) {
      setdetails(response.data);
      // toast.success(response.message);
    } 
    else{
      toast.error(response.message);
    }
  };
  const UpdateDetails = async () => {
    let response = await apiClient("prefrences/update", "post", {
      body: {
        inquiry_from: value?.ques1,
        company_verification_certificate: value?.ques2,
        reminder_inquiries: value?.ques3,
        automate_quote: value?.ques4,
        searches_matching: value?.ques5,
        frequent_searches: value?.ques6,
        trade_alert_new_product_demand: value?.ques7,
        demanding_enquiries_powercozmo: value?.ques8,
        preffer_mode_communication: value?.ques9,
        view_profile: value?.ques10,
        view_company_tour: value?.ques11,
        view_company_certifications: value?.ques12,
        view_company_contact_details:value?.ques13,
        view_your_company_details:value?.ques14,
        instant_messaging: value?.ques15,
        view_personal_information: value?.ques16,
      },
    });
    if (response.status == 200) {
        getAccountDetails();
      toast.success(response.message);
    }
  };
  // useEffect(() => {
  //   getAccountDetails();
  // },[]);
 
  return (
    <AccountContext.Provider
      value={{
       details ,
       setdetails,
      //  verification,
      //  setverification
      value,
      setValue,
      getAccountDetails,
      UpdateDetails
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
