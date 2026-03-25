import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

const LandingPage = dynamic(
  () => import("@/components/guestLayout/landingPage"),
  {
    ssr: false,
  }
);

export default function Home(props) {
  const initializeGoogleTagManager = (id) => {
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j: any = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", id);
  };
  useEffect(() => {
    initializeGoogleTagManager("G-YKVKB2M7234D2");
  }, []);
  return (
    <>
      <Head>
        <title>
          Merchant AD - Buyers & Sellers from the largest online B2B marketplace
        </title>

        {/* <meta name="robots" content="index, follow" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=2.0"
        />
        <meta
          name="description"
          content="Find reputable Manufacturers, Suppliers, Exporters, Importers, Buyers, Wholesalers, Products, and Trade Leads from our reputable trading Site. Let's Buy & Sell on Powercozmo.com"
        />
        <link rel="icon" href="/power-cozmo-icon1.svg" />
        <meta name="tracking-page-name" content="home"/>
      </Head>

      <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
        {<LandingPage />}
      </NextAppDirEmotionCacheProvider>
    </>
  );
}


//redirect to signin/signup
/*
import Head from "next/head";
import dynamic from "next/dynamic";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import { useEffect } from "react";
import { GetServerSideProps } from "next";

const LandingPage = dynamic(
  () => import("@/components/guestLayout/landingPage"),
  {
    ssr: false,
  }
);

export default function Home(props) {
  const initializeGoogleTagManager = (id) => {
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j: any = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", id);
  };

  useEffect(() => {
    initializeGoogleTagManager("G-YKVKB2M7D2");
  }, []);

  return null; // won't render because redirect happens before this
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/user/signin",
      permanent: false, // set true if you want a 308 permanent redirect
    },
  };
};
*/



// export to hostinger shared hosting 

// import { useEffect } from "react";

// export default function Index() {
//   useEffect(() => {
//     window.location.replace("/user/signin");
//   }, []);

//   return null;
// }

