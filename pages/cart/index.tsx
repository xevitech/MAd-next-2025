// import CartComponent from "@/app/components/cart";

// export default function CartPage() {
//   return <CartComponent />;
// }

import HeaderPage from "@/components/common/include/headerPart";
import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);

import { CartComponent, CartProvider } from '@/components/cart';
import { Box } from '@mui/material';

export const metadata = {
  title: 'Shopping Cart | My E-Commerce Store',
  description: 'Review your cart items and proceed to checkout.',
};

export default function CartPage() {
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
      
      <CartProvider>
        <Box className="mx-auto px-4">

          <CartComponent />
        </Box>
      </CartProvider>

      <FooterPage />
    </>
    
    
      
   
  );
}