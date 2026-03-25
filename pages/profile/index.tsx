import React, { useEffect, useState } from 'react';
import PersonalProfile from '@/components/profile/personalProfile';
import InnerLayout from '@/components/innerLayout';
import { useAppDispatch } from 'redux/store';
import { getGeoLocation } from '@/hooks/geolocation';
import Head from 'next/head';
const Personalprofile = () => {
  const [pageLoad, setPageLoad] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  useEffect(()=>{
    setPageLoad(true)
    dispatch(getGeoLocation());
  },[])
  return (<>
   {pageLoad && <InnerLayout>
    <Head>
        <title>Personal Profile | Powercozmo</title>
      </Head>
      <PersonalProfile />
    </InnerLayout>
  } </>
  );
};

export default Personalprofile;
