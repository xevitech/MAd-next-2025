import React, { useEffect, useState } from 'react';
import QuestionnaireForm from '@/components/Questionnaire';
import { useAppDispatch } from 'redux/store';
import { getGeoLocation } from '@/hooks/geolocation';
import Head from 'next/head';
import dynamic from "next/dynamic";
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);
import HeaderPage from "@/components/common/include/headerPart";
const Questionnaire = () => {
  const [pageLoad, setPageLoad] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  useEffect(() => {
    setPageLoad(true)
    dispatch(getGeoLocation());
  }, [])
  return (<>
    {pageLoad && <>
      <Head>
        <title>Questionary | Powercozmo</title>
      </Head>
      <HeaderPage />
      <QuestionnaireForm />
      <FooterPage />
    </>
    } </>
  );
};

export default Questionnaire;
