import { apiClient } from "@/components/common/common";
import EmptyPage from "@/components/common/EmptyPage";
import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import ChatWindow from "@/components/Chat";
import ProductActions from "@/components/ProductDetail/ProductComponents/ProductActions";
import { BackToTopBox } from "@/components/ProductsListing/style";
import { Fab } from "@mui/material";

const ProductDetailPage = dynamic(() => import("@/components/ProductDetail"), {
  ssr: false,
});
const ProductDetail = ({ data }) => {
  const { name, user_id } = useSelector((state: any) => state.productDetail.detail.data);
  const [render, setRender] = useState<boolean>(false);
  const [currentScrollTop, setcurrentScrollTop] = useState<any>(typeof window !== "undefined" && window?.scrollY);

  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    const scrollEvent = () => {
      setcurrentScrollTop(window?.scrollY);
    }
    document.addEventListener('scroll', scrollEvent);
    return () => {
      document.removeEventListener('scroll', scrollEvent);
    }
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // Smooth scrolling
    });
  }

 
  return (
    <>
      <Head>
        <title>{data?.name}</title>
        <meta name="description" content={`${data?.name ?? ""} is inside category ${data?.categories ?? ""} on Merchant AD`} />
        <meta property="og:description" content={`${data?.name ?? ""} is inside category ${data?.categories ?? ""} on Merchant AD`} />

        <meta name="keyword" content={data?.meta_keyword ?? ""} />

        <meta name="title" content={data?.name ?? ""} />
        <meta property="og:title" content={data?.name ?? ""} />

        <meta property="og:type" content="product"/>

        <meta property="og:availability" content={data?.availability ?? ""}/>

        <meta property="og:site_name" content="www.powercozmo.com"/>
        <meta name="tracking-page-name" content="product-detail"/>
        </Head>

      <div style={{ position: "relative", /*paddingTop: "63px"*/ }}>
        {render && <HeaderPage />}
        {data != "No data" ? (
          <>
            <ProductDetailPage />
            {currentScrollTop > 3 && <div style={{ position: "relative" }}>
              <BackToTopBox onClick={() => handleScroll()}>
                <Fab size="small" aria-label="">
                  <KeyboardArrowUpIcon />
                </Fab>
              </BackToTopBox>
            </div>}
          </>
        ) : (
          <EmptyPage
            text={"Product"}
            onClickHandler={() => console.log()}
            logo="/assets/category_rejected.svg"
            type="product"
          />
        )}
        {/* {name && <ChatWindow />}s */}
        {name && <FooterPage />}
        {name && <ProductActions />}

        
      </div>
    </>
  );
};

export default ProductDetail;
export async function getServerSideProps({ query }) {
  // const currency = localStorage.getItem("currency") ?? 1;
  if (query?.id[0] == "undefined") {
    return {
      props: { data: "No data" },
    };
  } else {
    let params: any = await apiClient("front/single/view/metaTags", "post", {
      body: {
        slug: query?.id?.[2] ?? "",
        // currency:currency
      },
    });
    return {
      props: { data: params?.product ?? "No data" },
    };
  }
}
