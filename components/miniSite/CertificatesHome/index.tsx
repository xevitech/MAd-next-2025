import {
  apiClient,
  handleTrackUser,
  trackPageView,
} from "@/components/common/common";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MiniSiteContainer } from "../styled";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router from "next/router";
import CertificateSkelton from "../MiniSkelton/CertificateSkelton";
import { useSelector } from "react-redux";
import SingleSlider from "../SingleSlider";
import { CertificateOuter } from "./Certificate.styled";
import CPheader from "../CompanyProfile/CPheaderComponent";
const MiniSidebar = dynamic(() => import("../MiniSidebar"), { ssr: false });
const TestReportCertificate = dynamic(() => import("./TestReportCertificate"), {
  ssr: false,
});

const CertificatesHome = (allData: any) => {
  console.log("allData", allData);

  const { minisiteUserID, headerData } = useSelector(
    (state: any) => state.miniSite
  );
  const {
    basic_information: { slug },
  } = headerData;
  const [getTrackedId, setgetTrackedId] = useState("");
  const [certificateloading, setCertificateloading] = useState<boolean>(true);
  const [certificatesData, setCertificatesData] = useState<any>([]);

  const arr = [1, 1, 1, 1];
  const NavigateHandler = (route) => router.push(route);
  let shop_id = JSON.parse(localStorage.getItem("shop_id"));
  let user_id = JSON.parse(localStorage.getItem("userData"))?.id;
  let isScrolling: any;
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
    (async () => {
      localStorage.removeItem("scrollPercentage");
      let response =
        (await router?.asPath?.includes("/certificate")) &&
        trackPageView(router?.asPath, "", "mini-site-certificate", "", "");
      setgetTrackedId(response);
      await FetchCertificates();
      let interval;
      const checkApi = async () => {
        interval = setInterval(
          () =>
            trackPageView(
              router?.asPath,
              "yes",
              "mini-site-certificate",
              "",
              getTrackedId
            ),
          30000
        );
      };
      router?.asPath?.includes("/certificate") && checkApi();
      return () => {
        clearInterval(interval);
      };
    })();
  }, []);

  const FetchCertificates = async () => {
    let response = await apiClient(
      `mini-site/company_profile/minisite/certificate/list?user_id=${minisiteUserID}`,
      "get",
      {}
    );
    if (response?.status === 200) {
      setCertificateloading(false);
      setCertificatesData(response);
    }
  };

  const SkeletonArray = [1, 1];
  console.log(allData[0]?.type, "allData");
  return (
    <Box>
      {certificatesData?.bannerList &&
        certificatesData?.bannerList[0]?.images?.length > 0 && (
          <SingleSlider
            settings={certificatesData?.bannerList[0]}
            type="certificate"
          />
        )}
      <MiniSiteContainer className="sectionspacing">
        <Box>
          <Grid container spacing={{ md: 2, sm: 2, xs: 2 }}>
            <Grid item lg={3} xs={12} display={{ xs: "none", lg: "block" }}>
              <MiniSidebar />
            </Grid>
            <Grid item lg={9} xs={12}>
              <CertificateOuter
                paddingY={{ xs: 0, sm: 2 }}
                paddingX={{ xs: 1, sm: 2 }}
              >
                <Box mb={{ xs: 2 }}>
                  <CPheader
                    icon="/assets/cpicon2.svg"
                    title={"Certificate"}
                    // title={
                    //   allData[0]?.type ? (
                    //     allData[0].type
                    //   ) : (
                    //     <Skeleton
                    //       variant="text"
                    //       sx={{ fontSize: "1rem" }}
                    //       width="150px"
                    //     />
                    //   )
                    // }
                    expand={length > 2 ? true : false}
                  />
                </Box>
                <Stack spacing={{ md: 2, xs: 2 }}>
                  {!certificateloading && certificatesData?.data?.length > 0 ? (
                    <TestReportCertificate
                      allData={certificatesData?.data}
                      contextloading={certificateloading}
                    />
                  ) : (
                    certificateloading && <CertificateSkelton />
                  )}
                  {!certificateloading &&
                    certificatesData?.data?.length === 0 && (
                      <div style={{ backgroundColor: "white" }}>
                        <EmptyPage
                          text={"Certificate"}
                          onClickHandler={() => {
                            NavigateHandler(
                              "/companySettings/companyDetails?tab=certificates"
                            );
                          }}
                          logo="/assets/legal-contract.svg"
                          actiontext={user_id !== minisiteUserID ? false : true}
                        />
                      </div>
                    )}
                </Stack>
              </CertificateOuter>
            </Grid>
          </Grid>
        </Box>
      </MiniSiteContainer>
    </Box>
  );
};

export default CertificatesHome;
