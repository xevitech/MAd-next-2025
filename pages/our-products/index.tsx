import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// import FooterPage from "@/components/common/include/footerPart";
const FooterPage = dynamic(() => import("components/common/include/footerPart"), {
    ssr: false,
});
import HeaderPage from "@/components/common/include/headerPart";
let Ourproduct = dynamic(() => import('@/components/ourProduct'), {
    ssr: false
})
const AboutPage = () => {
    return (
        <>
            <HeaderPage />
            <Ourproduct />
            <FooterPage />
        </>
    )
}
export default AboutPage;