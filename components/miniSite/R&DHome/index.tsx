import { Box, Grid, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
import { MiniSiteContainer } from "../styled";
import { CompanyProfileOuter } from "../CompanyProfile/CompanyProfile.styled";
import { MiniSiteContext } from "@/contextApi/miniContext";
import RNDmanagment from "../CompanyProfile/RNDmanagment";
import { useAppDispatch } from "redux/store";
import router from "next/router";
import { useSelector } from "react-redux";
import { handleTrackUser, trackPageView } from "@/components/common/common";
import SingleSlider from "../SingleSlider";
const MiniSidebar = dynamic(() => import("../MiniSidebar"), { ssr: false });
const RDHome = () => {
  const ctx = useContext(MiniSiteContext);
  const { contextLoading } = useSelector((state: any) => state.miniSite);
  const dispatch = useAppDispatch();
  const [getTrackedId, setgetTrackedId] = useState("");
  const [bannerData, setBannerData] = useState([]);
  let isScrolling: any;
  useEffect(() => {
    (async () => {
      localStorage.removeItem("scrollPercentage");
      let response = await trackPageView(
        router?.asPath,
        "",
        "mini-site-r&d",
        "",
        ""
      );
      setgetTrackedId(response);
    })();
  }, []);

  useEffect(() => {
    const handleTrackUSer = (event) => {
      window.clearTimeout(isScrolling);
      if (getTrackedId !== "") {
        if (event?.type === "scroll") {
          isScrolling = setTimeout(function () {
            handleTrackUser(event, "", getTrackedId);
          }, 100);
        } else {
          handleTrackUser(event, "", getTrackedId);
        }
      }
    };
    document.addEventListener("click", handleTrackUSer, true);
    document.addEventListener("scroll", handleTrackUSer);
    return () => {
      document.removeEventListener("click", handleTrackUSer, true);
      document.removeEventListener("scroll", handleTrackUSer);
    };
  }, [getTrackedId]);

  useEffect(() => {
    let interval;
    const checkApi = async () => {
      interval = await setInterval(
        () =>
          trackPageView(
            router?.asPath,
            "yes",
            "mini-site-r&d",
            "",
            getTrackedId
          ),
        30000
      );
    };
    if (getTrackedId) {
      checkApi();
    }
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleBannerDetails = (bannerData) => {
    setBannerData(bannerData);
  };

  return (
    <Box>
      {bannerData?.length > 0 && (
        <SingleSlider settings={bannerData[0]} page="r&d" />
      )}
      {!contextLoading && (
        <Box>
          <MiniSiteContainer className="sectionspacing">
            <Box>
              <Grid container spacing={{ md: 2, sm: 2, xs: 2 }}>
                <Grid item md={3} xs={12} display={{ xs: "none", lg: "block" }}>
                  <MiniSidebar />
                </Grid>
                <Grid item lg={9} xs={12}>
                  <Stack spacing={{ md: 2, xs: 2 }}>
                    <CompanyProfileOuter
                      p={{ xs: 2 }}
                      bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
                    >
                      <RNDmanagment
                        callFunction={handleBannerDetails}
                        showExpand={true}
                      />
                    </CompanyProfileOuter>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </MiniSiteContainer>
        </Box>
      )}
    </Box>
  );
};
export default RDHome;
