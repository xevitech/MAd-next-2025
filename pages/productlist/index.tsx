import React, { useEffect, useState } from "react";
import ProductList from "@/components/ProductsListing/ProductList";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Fab } from "@mui/material";
import { BackToTopBox } from "@/components/ProductsListing/style";
// import ChatWindow from "@/components/Chat";
const HeaderPage = dynamic(
  () => import("components/common/include/headerPart"),
  {
    ssr: true,
  }
);
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: true,
  }
);
// const ChatWindowPage = dynamic(async () => import("@/components/Chat"), {
//   ssr: false,
// });

const Products = () => {
  const [currentScrollTop, setcurrentScrollTop] = useState<any>(
    typeof window !== "undefined" && window?.scrollY
  );

  useEffect(() => {
    const scrollEvent = () => {
      setcurrentScrollTop(window?.scrollY);
    };
    document.addEventListener("scroll", scrollEvent);
    return () => {
      document.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Head>
        <title>
          Merchant AD: Browse Our Product Catalog for Top-Quality Items
        </title>

        <meta
          name="description"
          content="Experience the best in quality and value in the Merchant AD product catalog. Discover exclusive deals and top-notch items today."
        />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        ></link>
        <meta name="tracking-page-name" content="product-listing" />
      </Head>

      <>
        <HeaderPage />
        <ProductList />
        {/* <ChatWindowPage /> */}
        <FooterPage />
        {currentScrollTop > 3 && (
          <div style={{ position: "relative" }}>
            <BackToTopBox onClick={() => handleScroll()}>
              <Fab size="small" aria-label="">
                <KeyboardArrowUpIcon />
              </Fab>
            </BackToTopBox>
          </div>
        )}
      </>
    </>
  );
};

export default Products;
