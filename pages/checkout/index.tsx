import HeaderPage from "@/components/common/include/headerPart";
import dynamic from "next/dynamic";
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);

import { CheckoutComponent, CheckoutProvider } from '@/components/checkout';
import { Container } from '@mui/material';
import Head from "next/head";
import Script from "next/script";

export const metadata = {
  title: 'Checkout | My E-Commerce Store',
  description: 'Complete your purchase securely.',
};

export default function CheckoutPage() {
  return (
    <>  
      <Head>
          <title>About Us - Merchant AD</title>
          <meta
            name="description"
            content="Merchant AD facilitates an integrated platform that eases availability of spare parts, components and services to the Power Generation, Oil & Energy, Water & Wastewater management sectors"
          />
          <link
            href="https://unpkg.com/aos@2.3.1/dist/aos.css"
            rel="stylesheet"
          ></link>
        </Head>
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" />
        <HeaderPage />
      <CheckoutProvider>
        <Container>

        <CheckoutComponent />
        </Container>
      </CheckoutProvider>
      <FooterPage />
    </>
    
  );
}