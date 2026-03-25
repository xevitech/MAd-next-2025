import React, { useEffect, useState } from "react";
import Faq from "@/components/Faq";
import HeaderPage from "@/components/common/include/headerPart";
import FooterPage from "@/components/common/include/footerPart";
const AboutPage = () => {
    return (
        <>
            <HeaderPage />
            <Faq />
            <FooterPage />
        </>
    )
}
export default AboutPage;