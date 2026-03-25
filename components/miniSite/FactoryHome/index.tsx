import { Box, Grid, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { MiniSiteContainer } from "../styled";
import InventoryDetail from "../CompanyProfile/InventoryDetail";
import { CompanyProfileOuter } from "../CompanyProfile/CompanyProfile.styled";
import FactoryPhoto from "../CompanyProfile/FactoryPhoto";
import { useSelector } from "react-redux";
import router from "next/router";
import {
  apiClient,
  handleTrackUser,
  trackPageView,
} from "@/components/common/common";
import SingleSlider from "../SingleSlider";
import { getBussinessType, getFactoryPhotos } from "@/utils/commonFunctions/getDatas";
const MiniSidebar = dynamic(() => import("../MiniSidebar"), { ssr: true });
const FactoryHome = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [details, setdetails] = useState<any>({});
  const [getTrackedId, setgetTrackedId] = useState("");
  let isScrolling: any;
  const { minisiteUserID, headerData } = useSelector(
    (state: any) => state.miniSite
  );

  const {
    basic_information: { slug },
  } = headerData;
  const FactoryDetails = async () => {
    setLoader(true);
    let response = await apiClient(
      `mini-site/company_profile/factory_informations/view?shop_slug=${slug}&type=Factory Tour`,
      "get"
    );

    if (response.status == 200) setdetails(response?.data);
    setLoader(false);
  };

  useEffect(() => {
    (async () => {
      localStorage.removeItem("scrollPercentage");
      let response = await trackPageView(
        router?.asPath,
        "",
        "mini-site-factory",
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
    if (minisiteUserID) FactoryDetails();
    let interval;
    const checkApi = async () => {
      interval = await setInterval(
        () =>
          trackPageView(
            router?.asPath,
            "yes",
            "mini-site-factory",
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
  }, [minisiteUserID]);

  const bussinessType = getBussinessType(headerData?.business_type);

  const factoryImages = getFactoryPhotos(headerData?.company_facility, bussinessType);

  return (
    <Box>
      {details?.banner_list?.length > 0 && (
        <SingleSlider settings={details?.banner_list[0]} />
      )}
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
                  <InventoryDetail
                    loader={loader}
                    factorydetails={headerData}
                    fecilityTypeToShow="factory"
                  />
                </CompanyProfileOuter>
                {/* <CompanyProfileOuter
                  p={{ xs: 2 }}
                  bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
                >
                  <FactoryPhoto
                    loader={loader}
                    factory_photos={factoryImages ?? []}
                  />
                </CompanyProfileOuter> */}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </MiniSiteContainer>
    </Box>
  );
};
export default FactoryHome;
