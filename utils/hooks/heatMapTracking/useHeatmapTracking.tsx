import {
  debounce,
  getCurrentDateTimeTracking,
  getMetaData,
  getUTMParameter,
} from "@/components/Helper";
import { checkIsIdentifier } from "@/utils/commonFunctions/other";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { generateSessionId } from "@/components/common/common";
import { scrollThresholds } from "@/utils/commonDatas/constantDatas";
import { crmApiClient } from "@/utils/apiClient/crmApiClient";
import {
  getSessionFromCookies,
  removeMobileVerficiationFromCookie,
} from "@/utils/cookieUtils";
import Auth from "@/auth/Auth";

const useHeatmapTracking = (settings) => {
  const { user_info = {} } = useSelector((state: any) => state.userData);
  const { id: userId = "" } = user_info;
  let userID = userId;
  if (!userID && typeof window !== "undefined") {
    const userData = localStorage.getItem("userData");
    userID = userData ? JSON.parse(userData)?.id : "";
  }
  const detail = useSelector((state: any) => state.productDetail.detail.data);
  const { id } = detail;

  const { query } = useRouter();
  let commonPayloads;

  const queries =
    query && Object.keys(query).length > 0 ? JSON.stringify(query) : null;

  if (typeof window != "undefined") {
    commonPayloads = {
      ...(queries && { queries }),
      page_url: window?.location?.href ?? "",
      operating_system: window?.navigator.platform ?? "",
      browser_info: window?.navigator.userAgent ?? "",
      session_id: getSessionFromCookies() ?? "",
      utm_source: getUTMParameter("utm_source"),
      user_id: String(userID),
    };
  }
  const initializeTracking = () => {
    const pageName = getMetaData("tracking-page-name") ?? "";
    const pageURL = window.location.href;

    const HEATMAP = {
      settings: {
        debug: settings.debug || false,
        url: settings.url ?? "",
        baseUrl: settings.baseUrl,
        hash: settings.hash,
        clicks: settings.clicks || true,
        clicksThreshold: settings.clicksThreshold || 1,
        movementsThreshold: settings.movementsThreshold || 100,
        movementDebounce: settings.movementDebounce || 200,
        movement: settings.movement || true,
        scrolls: true,
        trackClosingPage: true,
        clickEndpoint: settings?.clickEndpoint || "",
        scrollEndpoint: settings?.scrollEndpoint || "",
      },
      scrollDownTriggered: {},
      scrollUpTriggered: {},
      data: {
        clicks: [],
        movements: [],
        buttonIdentity: null,
      },
      isClickHandlerRegistered: false,
      scrollUpPositions: {
        scroll25: false,
        scroll50: false,
        scroll75: false,
        scroll100: false,
      },
      trackScrollUp: async (percentage) => {
        // you could use the same scrollEndpoint, or a different one
        await HEATMAP.sendScrollTracking({
          ...commonPayloads,
          page_visit_id: HEATMAP.pageVisitId,
          depth_position: percentage,
          direction: "up",
          page_name: pageName ? pageName : "unknown-source",
        });
      },
      scrollPositions: {
        scroll25: false,
        scroll50: false,
        scroll75: false,
        scroll100: false,
      },
      pageVisitId: null,
      sessionId: Cookies.get("sessionId"),
      init: async () => {
        try {
          const data = {
            session_id: HEATMAP.sessionId,
            user_id: commonPayloads?.user_id,
            page_name: pageName ? pageName : "unknown-source",
            page_url: pageURL ?? "",
            depth_position: 0,
            relatded_id: id ? id : "",
          };
          const response = await fetch(HEATMAP.settings.scrollEndpoint, {
            method: "POST",
            keepalive: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((response) => response.json());
        } catch (error) {
          console.error("Error for the scrolling tracking");
        }
        const initializePageView = async () => {
          const payload = {
            session_id: HEATMAP.sessionId,
            user_id: commonPayloads?.user_id,
            page_name: pageName ? pageName : "unknown-source",
            page_url: pageURL ?? "",
          };
          try {
            const response = await crmApiClient("page-visit", "post", {
              body: payload,
            });
            const pageVisitId = response?.data?.page_visit_id;
            localStorage.setItem("pageVisitId", pageVisitId);
            HEATMAP.pageVisitId = pageVisitId;
          } catch (error) {
            console.error("Error for the scrolling tracking");
          }
        };
        initializePageView();
        if (!HEATMAP?.sessionId) {
          if (Auth.isUserAuthenticated()) {
            HEATMAP.sessionId = generateSessionId(8);
            Cookies.set("sessionId", HEATMAP?.sessionId);
          }
          const currentDateTime = Date.now();
          const payload = {
            session_id: HEATMAP.sessionId,
            session_start_at: currentDateTime,
            user_id: commonPayloads?.user_id,
            utm_source: commonPayloads?.utm_source ?? "",
          };
          try {
            const response = await crmApiClient("session-start", "post", {
              body: payload,
            });
          } catch (error) {
            console.error("Error starting session:", error);
          }
        }
        if (HEATMAP.isLoadedInHeatmap()) {
          // API for started new session
          //   HEATMAP.trackIframeScroll();
          //   HEATMAP.trackIframeNavigation();
        }
        if (HEATMAP.isLoadedInHeatmap() && !HEATMAP.settings.debug) {
          return;
        }
        if (HEATMAP.settings.clicks && !HEATMAP.isClickHandlerRegistered) {
          HEATMAP.initClicks();
        }
        if (HEATMAP.settings.movement) {
          HEATMAP.initMovements();
        }
        if (HEATMAP.settings.scrolls) {
          HEATMAP.initScrolls();
        }
        if (HEATMAP.settings.trackClosingPage) {
          HEATMAP.initTrackClosePage();
        }
      },
      initClicks: () => {
        const handleClick = async (e) => {
          const dataValue = e.target;
          const buttonIdentity = dataValue?.dataset?.tracking ?? null;
          HEATMAP.data.clicks.push({
            x: e.pageX,
            y: e.pageY,
          });

          if (checkIsIdentifier(buttonIdentity)) {
            HEATMAP.data.buttonIdentity = buttonIdentity;
            if (
              HEATMAP.data.clicks.length >= HEATMAP.settings.clicksThreshold
            ) {
              await HEATMAP.trackClicks();
              HEATMAP.data.clicks = [];
            }
          } else {
            HEATMAP.data.clicks = [];
          }
        };

        window.addEventListener("click", handleClick);
        HEATMAP.isClickHandlerRegistered = true;
        return () => {
          window.removeEventListener("click", handleClick);
        };
      },
      initScrolls: () => {
        let lastScrollPerc = 0;
        // two flag sets so we don’t mix up ups vs downs
        HEATMAP.scrollDownTriggered = {};
        HEATMAP.scrollUpTriggered = {};
        scrollThresholds.forEach(({ key }) => {
          HEATMAP.scrollDownTriggered[key] = false;
          HEATMAP.scrollUpTriggered[key] = false;
        });

        const handleScroll = () => {
          const docH = document.documentElement.scrollHeight;
          const winH = window.innerHeight;
          const scrollY = window.scrollY;
          const newPerc = ((scrollY + winH) / docH) * 100;

          if (newPerc > lastScrollPerc) {
            // scrolling DOWN
            scrollThresholds.forEach(({ percentage, key }) => {
              // did we just cross downward through this threshold?
              if (
                lastScrollPerc < percentage &&
                newPerc >= percentage &&
                !HEATMAP.scrollDownTriggered[key]
              ) {
                HEATMAP.scrollDownTriggered[key] = true;
                HEATMAP.trackScroll(percentage);
              }
              // if we’re now above it again, reset the UP flag so a future UP crossing can fire
              if (newPerc >= percentage) {
                HEATMAP.scrollUpTriggered[key] = false;
              }
            });
          } else if (newPerc < lastScrollPerc) {
            // scrolling UP
            scrollThresholds.forEach(({ percentage, key }) => {
              // did we just cross upward through this threshold?
              if (
                lastScrollPerc > percentage &&
                newPerc <= percentage &&
                !HEATMAP.scrollUpTriggered[key]
              ) {
                HEATMAP.scrollUpTriggered[key] = true;
                HEATMAP.trackScrollUp
                  ? HEATMAP.trackScrollUp(percentage)
                  : HEATMAP.trackScroll(percentage); // or call a separate up‐handler
              }
              // if we’re now below it again, reset the DOWN flag so a future DOWN crossing can fire
              if (newPerc <= percentage) {
                HEATMAP.scrollDownTriggered[key] = false;
              }
            });
          }

          lastScrollPerc = newPerc;
        };

        const debounced = debounce(handleScroll, 100);
        window.addEventListener("scroll", debounced);
        return () => window.removeEventListener("scroll", debounced);
      },

      initMovements: () => {
        const handleMouseMove = debounce(async (e) => {
          const dataValue = e.target;
          const buttonIdentity = dataValue?.dataset?.tracking;

          HEATMAP.data.movements.push({
            x: e.pageX,
            y: e.pageY,
          });

          HEATMAP.data.movements = HEATMAP.data.movements.reduce(
            (acc, current) => {
              const x = acc.find((item) => item.x === current.x);
              const y = acc.find((item) => item.y === current.y);
              if (!x && !y) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            },
            []
          );
          // if (checkIsIdentifier(buttonIdentity)) {
          // HEATMAP.data.buttonIdentity = buttonIdentity;
          if (
            HEATMAP.data.movements.length >= HEATMAP.settings.movementsThreshold
          ) {
            // await HEATMAP.trackMovements();
            HEATMAP.data.movements = [];
          }
          // }
        }, HEATMAP.settings.movementDebounce);

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      },
      initTrackClosePage: () => {
        const handleBeforeUnload = async (e) => {
          const currentDateTime = Date.now();
          const payload = {
            session_id: HEATMAP.sessionId,
            session_end_at: currentDateTime,
          };
          removeMobileVerficiationFromCookie();
          // navigator.sendBeacon('https://merchantad.com/crm/v1/session-end', JSON.stringify(payload))
          // try {

          //   const response = await crmApiClient("session-end", "post", payload);
          // } catch (error) {
          //   console.error("Error starting session:", error);
          // }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      },
      trackClicks: async () => {
        if (!HEATMAP.data.clicks.length) {
          return;
        }
        const clickedTime = Date.now();
        await HEATMAP.send({
          clicks: HEATMAP.data.clicks,
          clicked_position_width: HEATMAP.getWidth(),
          clicked_position_height: HEATMAP.getHeight(),
          button_identity: HEATMAP.data.buttonIdentity,
          click_time: clickedTime,
          relatded_id: id ? id : "",
          page_visit_id: HEATMAP.pageVisitId,
          ...commonPayloads,
        });
      },
      trackScroll: async (percentage) => {
        const payload = {
          session_id: HEATMAP.sessionId,
          user_id: commonPayloads?.user_id,
          page_name: pageName ? pageName : "unknown-source",
          page_url: pageURL ?? "",
          depth_position: percentage ?? "",
          relatded_id: id ? id : "",
          page_visit_id: HEATMAP.pageVisitId,
        };
        await HEATMAP.sendScrollTracking(payload);
      },
      trackMovements: async () => {
        if (!HEATMAP.data.movements.length) {
          return;
        }
        await HEATMAP.send({
          movements: HEATMAP.data.movements,
          width: HEATMAP.getWidth(),
          height: HEATMAP.getHeight(),
          // path: window.location.pathname,
          // buttonIdentity: HEATMAP.data.buttonIdentity,
          ...commonPayloads,
        });
      },
      send: async (data) => {
        data.hash = HEATMAP.settings.hash;
        await fetch(HEATMAP.settings.clickEndpoint, {
          method: "POST",
          keepalive: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => response.json());
      },
      sendScrollTracking: async (data) => {
        try {
          const response = await fetch(HEATMAP.settings.scrollEndpoint, {
            method: "POST",
            keepalive: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((response) => response.json());
        } catch (error) {
          console.error("Error for the scrolling tracking");
        }
      },
      getWidth: () => {
        return Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
        );
      },
      getHeight: () => {
        return Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.documentElement.clientHeight
        );
      },
      isLoadedInHeatmap: () => {
        if (typeof window !== "undefined" && window.location.ancestorOrigins) {
          return (
            window.location.ancestorOrigins[0] === HEATMAP.settings.baseUrl
          );
        }
        return false;
      },
    };

    HEATMAP.init();
  };

  return { initializeTracking };
};

export default useHeatmapTracking;
