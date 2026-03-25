import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const FooterPage = dynamic(
  () => import("components/common/include/footerPart"),
  {
    ssr: false,
  }
);
import HeaderPage from "@/components/common/include/headerPart";
// import ManufactureProducts from "@/components/guestLayout/landingPage/manufactureProducts/ManufactureProducts";
import ManufactureProducts3 from "@/components/guestLayout/landingPage/manufactureProducts/ManufactureProduct3";
let AboutUs = dynamic(() => import("@/components/aboutus"), {
  ssr: false,
});


const Manufacture = () => {

  return (
    <>
      <>
        <HeaderPage />
        <ManufactureProducts3 />
        <FooterPage />
      </>
    </>
  );
};
export default Manufacture;
