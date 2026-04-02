import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import dynamic from "next/dynamic";
import Head from "next/head";
const AboutPage = () => {
  const ContactUS = dynamic(() => import("@/components/Contactus"), {
    ssr: false,
  });
  return (
    <>
      <Head>
        <title>MerchantAD - Reach Out for Energy Solutions and Support</title>
        <meta
          name="description"
          content="Get in touch with MerchantAD's expert team for all your Industrial needs. We're here to assist you with top-notch solutions and support."
        />
      </Head>
      <HeaderPage />
      <ContactUS />
      <FooterPage />
    </>
  );
};
export default AboutPage;
