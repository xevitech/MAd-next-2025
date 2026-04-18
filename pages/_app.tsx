// Normal setup
import * as React from "react";
import "../styles/globals.css";
import "../styles/globalcrm.css";
import "../public/assets/css/svg.icons.css";
import theme from "../utils/theme";
import { MyAppContextProvider } from "../contextApi/appContext";
// import { ProductContextProvider } from "../contextApi/productContext";
// import { ProSidebarProvider } from "react-pro-sidebar";
import {
  apiClient,
  areAllTabsClosed,
  decrementTabCount,
  generateSessionId,
  getTabCount,
  handleTrackData,
  handleTrackUser,
  incrementTabCount,
  removeSessionId,
  timeInMinutes,
  trackPageEvents,
  trackPageView,
  trackUserActivity,
} from "@/components/common/common";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Script from "next/script";
import { ThemeProvider } from "styled-components";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import { TssCacheProvider } from "tss-react";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { useAppDispatch, wrapper } from "redux/store";
import { Provider, useSelector } from "react-redux";
import { BASE_URL } from "@/utils/staticValues";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { setDefaultCountryCode } from "@/hooks/HeaderHooks";
import {
  setUserBasicInfo,
  setTrackedData,
  fetchIPAddress,
  logOut,
  setLoginViaSocial,
  setTimeofPop,
  setShowVerifyMobileModal,
} from "@/hooks/appReducers";
import moment from "moment";
import Cookies from "js-cookie";
import { EditMobile } from "@/components/profile/personalProfile/personalProfileModals/editMobile";
import { VerifyMobile } from "@/components/profile/personalProfile/personalProfileModals/verifyMobile";
import { ProductContextProvider } from "@/contextApi/productContext";
import {
  getCookie,
  getSessionFromCookies,
  getTokenFromCookies,
  setCookie,
} from "@/utils/cookieUtils";
import useHeatmapTracking from "@/utils/hooks/heatMapTracking/useHeatmapTracking";
import { getHeatMapSettings } from "@/utils/commonFunctions/getDatas";
// import ReminderManager from "@/components/Crm-v1/common/ReminderManager";
import Auth from "@/auth/Auth";
import { getCurrentPageUrl } from "@/utils/commonFunctions/other";
// import { ProductContextProvider } from "@/contextApi/ProductContext";

function App({ Component, ...rest }: any) {
  let { pathname, query, asPath } = useRouter();

  const {
    user_info,
    id,
    role,
    loginviaSocial,
    mobile,
    userEmail,
    social_type,
    mobileNumber,
    mobileverified,
    openLogoutModal,
    timeofPop,
    showVerifyMobileModal,
    showConfirmEmailModal,
    showEditEmailModal,
    showEditMobileModal,
  } = useSelector((state: any) => state.userData);
  const intervalRef = React.useRef(null);
  const [isReload, setIsREload] = React.useState(false);
  const [trackedId, settrackedId] = React.useState("");
  const router = useRouter();
  let isScrolling: any;
  let activityData: any = {};
  const startTimeRef = React.useRef(null);
  const lastVisitedUrlRef = React.useRef(null);
  const INACTIVITY_LIMIT = 2 * 24 * 60 * 60 * 1000;
  let storedToken;
  let isMobileVerificationClosed;
  if (typeof window !== "undefined") {
    storedToken = getTokenFromCookies();
    const sessionData = getCookie("isMobileVerificationDismissed");
    isMobileVerificationClosed = sessionData ? JSON.parse(sessionData) : false;
  }

  React.useEffect(() => {
    const handleRouteStart = (url: any) => {
      localStorage.setItem("Pageurl", url);
      startTimeRef.current = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      localStorage.setItem("pageStart", startTimeRef.current);
    };
    localStorage.removeItem("scrollPercentage");
    const handleRouteChanges = async (url: string) => {
      if (url === router.asPath) {
        setIsREload(true);
      } else {
        setIsREload(false);
      }
      lastVisitedUrlRef.current = router.asPath;
      const endTime: any = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      activityData = {
        ...activityData,
        url: lastVisitedUrlRef.current,
        startTime: startTimeRef.current,
        endTime: endTime,
        duration: timeInMinutes(startTimeRef.current, endTime),
      };
      localStorage?.removeItem("scrollPercentage");
      const existingData = Cookies?.get("userActivity");
      const newData = existingData ? JSON.parse(existingData) : [];
      newData.push(activityData);
      Cookies?.set("userActivity", JSON.stringify(newData), { expires: 1 });
      lastVisitedUrlRef.current = url;
      dispatch(setTrackedData(newData));
    };

    const handleTrackUSer = (event) => {
      window.clearTimeout(isScrolling);
      if (trackedId !== "") {
        if (event?.type === "scroll") {
          isScrolling = setTimeout(function () {
            handleTrackUser(event, "", trackedId);
          }, 100);
        } else {
          handleTrackUser(event, "", trackedId);
        }
      }
    };

    router.events.on("routeChangeComplete", handleRouteChanges);
    router.events.on("routeChangeStart", handleRouteStart);
    if (router.asPath == "/productlist") {
      document.addEventListener("click", handleTrackUSer, true);
      document.addEventListener("scroll", handleTrackUSer);
    }

    return () => {
      if (router.asPath == "/productlist") {
        document.removeEventListener("click", handleTrackUSer);
        document.removeEventListener("scroll", handleTrackUSer);
      }
      router.events.off("routeChangeComplete", handleRouteChanges);
      router.events.off("routeChangeStart", handleRouteStart);
    };
  }, [trackedId]);

  let publicRoutes = [
    "productdetail",
    "productlist",
    "category",
    "page",
    "ourProduct",
    "user",
    "mini-site",
    "about-us",
    "blog",
    "contact-us",
    "blogdetail",
    "resetPassword",
    "our-products",
    "questionnaire",
    "",
  ];
  const dispatch = useAppDispatch();
  const getGeoLocation = async () => {
    try {
      const response = await fetch("https://geolocation-db.com/json/");
      const data = await response.json();
      localStorage.setItem("country_code", JSON.stringify(data));
      dispatch(setDefaultCountryCode(data.country_code));
    } catch (err) {}
  };

  // React.useEffect(() => {
  React.useEffect(() => {
    const FIVE_MINUTES = 5 * 60 * 1000;
    const now = Date.now();

    let sessionId = sessionStorage.getItem("sessionId");
    let timestamp = sessionStorage.getItem("sessionTimestamp");

    // Try localStorage if sessionStorage doesn't have data
    if (!sessionId || !timestamp) {
      sessionId = localStorage.getItem("sessionId");
      timestamp = localStorage.getItem("sessionTimestamp");
    }

    const isExpired =
      !timestamp || now - parseInt(timestamp, 10) > FIVE_MINUTES;

    const isAuthenticated = Auth.isUserAuthenticated();
    if (isAuthenticated) {
      if (!sessionId || isExpired) {
        // Renew both session ID and timestamp
        const newSessionId = generateSessionId(8);
        const newTimestamp = now.toString();

        localStorage.setItem("sessionId", newSessionId);
        Cookies.set("sessionId", newSessionId);
        localStorage.setItem("sessionTimestamp", newTimestamp);

        sessionStorage.setItem("sessionId", newSessionId);
        sessionStorage.setItem("sessionTimestamp", newTimestamp);
      } else {
        // Only renew timestamp
        const updatedTimestamp = now.toString();
        localStorage.setItem("sessionTimestamp", updatedTimestamp);
        sessionStorage.setItem("sessionTimestamp", updatedTimestamp);
      }
    } else {
      Cookies.remove("sessionId");
    }
  }, []);

  React.useEffect(() => {
    let timeout: any;
    let token = getTokenFromCookies();
    const resetInactivityTimer = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(logOut());
      }, INACTIVITY_LIMIT);
    };
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "touchstart",
      "click",
      "keypress",
    ];
    if (token) {
      events.forEach((event) => {
        window.addEventListener(event, resetInactivityTimer);
      });
      resetInactivityTimer();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [router.asPath]);

  React.useEffect(() => {
    (async () => {
      if (router.asPath == "/productlist") {
        const resoponse = await trackPageView(
          lastVisitedUrlRef.current,
          "",
          "productlist"
        );
        settrackedId(resoponse);
      }
      const handleBeforeUnload = (event) => {
        decrementTabCount();
      };
      const handleFocus = () => {
        getTabCount();
        let tabs = parseInt(localStorage.getItem("openTabs"));
      };
      if (typeof window !== "undefined") {
        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("focus", handleFocus);
      }
      getGeoLocation();
      dispatch(fetchIPAddress());
      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("beforeunload", handleBeforeUnload);
          window.removeEventListener("focus", handleFocus);
        }
      };
    })();
  }, []);

  React.useEffect(() => {
    let token = getTokenFromCookies();
    if (
      router.asPath !== "/user/signup" &&
      router.asPath !== "/user/signin" &&
      router.asPath !== "/OnBoardingStepForm" &&
      router.asPath !== "/" &&
      !openLogoutModal &&
      token
    ) {
      if (social_type === "google" || social_type === "linkedin") {
        intervalRef.current = setInterval(() => {
          dispatch(setLoginViaSocial(true));
        }, timeofPop);
      } else {
        const isDismissed = getCookie("isMobileVerificationDismissed");
        if (!isDismissed && !mobileverified) {
          intervalRef.current = setInterval(() => {
            dispatch(setShowVerifyMobileModal(true));
          }, timeofPop);
        } else {
          dispatch(setShowVerifyMobileModal(false));
        }
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeofPop, role, router]);

  React.useEffect(() => {
    let interval;
    const checkApi = async () => {
      interval = setInterval(
        () =>
          trackPageView("/productlist", "yes", "productlist", "", trackedId),
        30000
      );
    };
    if (trackedId !== "" && router.asPath == "/productlist") {
      checkApi();
    }
    return () => {
      clearInterval(interval);
    };
  }, [trackedId]);

  React.useEffect(() => {
    lastVisitedUrlRef.current = router.asPath;
    startTimeRef.current = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    localStorage.setItem("pageStart", startTimeRef.current);

    if (getTokenFromCookies()) {
      if (Object?.keys(user_info).length == 0 && localStorage?.userData) {
        dispatch(setUserBasicInfo(JSON.parse(localStorage?.userData)));
      }
    }
    if (router.asPath == "/user/signin" || router.asPath == "/user/signup") {
      if (getTokenFromCookies()) {
        const isAccountDeleted = async () => {
          try {
            const token = Auth.token();
            const sessionID = getSessionFromCookies();
            const currentPageUrl = getCurrentPageUrl();

            let userData: string | { id?: string } = "user-Id-NA";

            if (typeof window !== "undefined") {
              const storedData = localStorage.getItem("userData");
              if (storedData) {
                try {
                  userData = JSON.parse(storedData);
                } catch {
                  userData = "user-Id-NA";
                }
              }
            }

            const userId =
              typeof userData === "object" &&
              userData !== null &&
              "id" in userData
                ? userData.id
                : "";

            const res = await fetch(
              `${BASE_URL}/profile/verify/user_delete_status?user_id=1852`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "X-Session-Hash": sessionID ?? "session-hash",
                  "X-Pc-Url": currentPageUrl ?? "page-url",
                  "x-uid": userId ? `"${userId}"` : "user-Id-NA",
                },
              }
            );
            const data = await res.json();
            if (res.status === 401 || data?.user_deleted_status) {
              localStorage.clear();
              sessionStorage.clear();
              document.cookie.split(";").forEach((cookie) => {
                const name = cookie.split("=")[0].trim();
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
              });
            }
          } catch (error) {
            console.error("Error verifying account deletion:", error);
          }
        };

        isAccountDeleted();
        router.push("/dashboard");
      }
      return;
    }
  }, []);

  React.useEffect(() => {
    const body = document.body;
    body.className = "";
    if (asPath.includes("crm")) {
      body.classList.add("crm-body");
    } else {
      body.classList.add("body");
    }
    return () => {
      body.className = "";
    };
  }, [asPath]);

  React.useEffect(() => {
    if (!storedToken && !publicRoutes.includes(router.asPath.split("/")[1])) {
      //  router.push("/user/signin");
      return;
    } else {
      let userInfo = window?.localStorage
        ? JSON.parse(localStorage.getItem("userData"))
        : {};
      if (
        userInfo?.type == "subuser" &&
        !router.asPath.includes("crm") &&
        !publicRoutes.includes(router.asPath.replace("/", ""))
      ) {
        router.push("/dashboard");
      }
    }
  }, [storedToken]);

  React.useLayoutEffect(() => {
    if (query.autologin) {
      AutoLogin(query.autologin);
    }
  }, [query]);

  const AutoLogin = async (id) => {
    let res = await fetch(`${BASE_URL}/autologin?id=${id}`);
    let response = await res.json();
    if (response) {
      localStorage.clear();
      localStorage.setItem("Token", response.accessToken);
      setCookie("token", response?.accessToken, response?.expires_at);
      localStorage.setItem("userData", JSON.stringify(response.user));
      dispatch(setUserBasicInfo(response.user));
      router.push("/dashboard");
    }
  };

  if (pathname.startsWith("/productdetail")) {
    pathname = pathname.replace("[id]", `${query.id}`);
  }
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  if (pathname.startsWith("/productdetail")) {
    pathname = pathname.replace("[id]", `${query.id}`);
  }

  const handleRouteChange = (url) => {
    if (!url.startsWith(router.basePath)) {
      router.push("/profile");
    }
  };

  const closeModals = () => {
    dispatch(setLoginViaSocial(false));
    dispatch(setTimeofPop(28800000));
  };
  const closeMobileModal = () => {
    dispatch(setTimeofPop(28800000));
    dispatch(setShowVerifyMobileModal(false));
  };

  React.useEffect(() => {
    startTimeRef.current = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const events: any = ["routeChangeStart", "beforeHistoryChange"];
    for (const event of events) {
      router.events.on(event, handleRouteChange);
    }
    return () => {
      for (const event of events) {
        router.events.off(event, handleRouteChange);
      }
    };
  }, [router]);

  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",

        
        "name": "Merchant AD",
        "image": "https://www.merchantad.com/assets/Logo.svg",
        "@id": "",
        "url": "https://www.merchantad.com/",
        "telephone": "07814201487",  
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Complex 146- Mecca Street",
          "addressLocality": "Amman, Jordan",
          "postalCode": "11954",
          "addressCountry": "AE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 31.9539494,
          "longitude": 35.910635
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "sameAs": [
          "https://www.facebook.com/merchantad.epg",
          "https://twitter.com/merchantad",
          "https://www.instagram.com/merchantad/",
          "https://www.linkedin.com/company/merchantad"
        ] 
      }`,
    };
  }
  const heatmapSettings = getHeatMapSettings();
  const { initializeTracking } = useHeatmapTracking(heatmapSettings);

  React.useEffect(() => {
    initializeTracking();
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId="<your_client_id>">
        {/* <ChatWindow /> */}
        <Provider store={store}>
          <Head>
            {/* Preload the Open Sans font */}
            <link
              rel="preload"
              href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
              as="style"
            />
            {/* Regular font import */}
            <link
              href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
              rel="stylesheet"
            />

            <link
              rel="canonical"
              href={`https://merchantad.com${router.pathname}`}
            />

            <meta
              name="google-site-verification"
              content="WfIamgKvRw4-TgM91Wk17xcDB5jjJtVUAmRoM7yJpgg"
            />

            <meta
              name="msvalidate.01"
              content="9408152F30AA5C44823FF443066A93CE"
            />

            <link
              rel="shortcut icon"
              // href="https://merchantad.com/public/assets/fav/merchantad-fav.png"
              href="/assets/merchantad-fav.png"
            />
            <title>Merchant AD {pathname}</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=2.0"
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={addProductJsonLd()}
              key="merchantad-jsonld"
            />

            <Script>
              {`function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WG7ZZ8GM'`}
            </Script>
            <Script id="google-analytics">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-YKVKB2M7D2')`}
            </Script>
          </Head>
          {/* <ReminderManager /> */}
          <StyledEngineProvider injectFirst>
            <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
              <NextAppDirEmotionCacheProvider
                options={{ key: "tss" }}
                ///CacheProvider={TssCacheProvider}
              >
                <ThemeProvider theme={theme}>
                  {/* <ProSidebarProvider> */}
                  <MyAppContextProvider>
                    <ProductContextProvider>
                      {loginviaSocial &&
                        mobileNumber == null &&
                        !openLogoutModal && (
                          <EditMobile
                            mobileNumber={""}
                            countryCode={""}
                            mobileCode={""}
                            // getProfile={getProfileInfo}
                            open={loginviaSocial}
                            closeModal={closeModals}
                            emailId={userEmail}
                          />
                        )}
                      {showVerifyMobileModal &&
                        !showConfirmEmailModal &&
                        !showEditEmailModal &&
                        !showEditMobileModal &&
                        mobileNumber !== null &&
                        mobileverified == false &&
                        !openLogoutModal &&
                        role !== "subuser" &&
                        !isMobileVerificationClosed && (
                          <VerifyMobile
                            mobileNumber={mobileNumber}
                            confirmMobile={""}
                            open={showVerifyMobileModal}
                            closeModal={closeMobileModal}
                            emailId={userEmail}
                          />
                        )}
                      <Component {...pageProps} />
                    </ProductContextProvider>
                  </MyAppContextProvider>
                  {/* </ProSidebarProvider> */}
                  <ToastContainer autoClose={1000} />
                </ThemeProvider>
              </NextAppDirEmotionCacheProvider>
            </NextAppDirEmotionCacheProvider>
          </StyledEngineProvider>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}
export default wrapper.withRedux(App);

export async function getStaticProps({ params }) {
  return { props: { url: "dfgd" } };
}
