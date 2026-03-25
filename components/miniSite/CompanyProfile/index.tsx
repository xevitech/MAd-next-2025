import { Divider, Typography } from "@mui/material";
import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Certificate } from "../Certificates";

import MiniSidebar from "../MiniSidebar";
import {
  SellerHeading,
  SellerOuter,
  SellerOuterCon,
  StickyBar,
} from "../Products/Products.styled";
import { MiniSiteContainer, ScrollHiddenDiv } from "../styled";
import CompanyInfo from "./CompanyInfo";
import {
  CompanyProfileInner,
  CompanyProfileOuter,
} from "./CompanyProfile.styled";
import CPcontactPersone from "./CPcontactPerson";
import CPfaq from "./CPfaq";
import FactoryPhoto from "./FactoryPhoto";
import InventoryDetail from "./InventoryDetail";
import NewsRoom from "./NewsRoom";
import ProjectPhoto from "./ProjectPhoto";
import RegionalOffice from "./RegionalOffice";
import RNDmanagment from "./RNDmanagment";
import ServiceList from "./ServiceList";

import QAQC from "./QAQC";
import Link from "next/link";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Scrollspy from "react-scrollspy";
import { useRouter } from "next/router";
import ExportCapabilities from "./ExportCapabilities";
import {
  apiClient,
  handleTrackUser,
  trackPageView,
} from "@/components/common/common";
import { debounce } from "lodash";
import SingleSlider from "../SingleSlider";
import {
  getBussinessType,
  getFactoryPhotos,
} from "@/utils/commonFunctions/getDatas";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import SidebarSkeleton from "./SidebarSkeleton";

const MiniCompanyProfile = () => {
  const [hideCertificates, setHideCertificates] = useState<boolean>(false);
  const [showContactDetail, setShowContactDetail] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(false);
  const [getTrackedId, setgetTrackedId] = useState("");
  const [highLight, setHighLight] = useState<any>("");
  const [details, setdetails] = useState<any>({});
  const [bannerData, setBannerData] = useState([]);
  const [contacts, setcontacts] = useState<any>([]);
  const [contactLoader, setContactLoader] = useState<any>(true);
  const [companyTourProjectData, setCompanyTourProjectData] = useState<any>({});
  const { minisiteUserID, headerData } = useSelector(
    (state: any) => state.miniSite
  );
  const {
    basic_information: { slug },
  } = headerData;

  let isScrolling: any;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      localStorage.removeItem("scrollPercentage");
      let response = await trackPageView(
        router?.asPath,
        "",
        "mini-site-companyprofile",
        "",
        ""
      );
      setgetTrackedId(response);
    })();
    getContactsList();
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
    (async () => {
      try {
        const response = await apiClient(
          `mini-site/company_profile/company-profile?shop_slug=${slug}&type=Company Profile`,
          "get"
        );
        if (response?.status === 200) {
          const {
            contact_profile: { project_photos, factory_photos },
          } = response;
          setCompanyTourProjectData({ project_photos, factory_photos });
          setBannerData(response?.banner_list);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let interval;
      const checkApi = async () => {
        interval = await setInterval(
          () =>
            trackPageView(
              router?.asPath,
              "yes",
              "mini-site-companyprofile",
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
    })();
  }, [getTrackedId]);

  const FactoryDetails = async () => {
    setLoader(true);
    let response = await apiClient(
      `mini-site/company_profile/factory_informations/view?user_id=${minisiteUserID}&mini_site=1`,
      "get"
    );

    if (response.status == 200) {
      setdetails(response?.data);
      // router.push(
      //   `/mini-site/${headerData?.basic_information?.slug}/companyprofile#${router.asPath.split("#")?.[1] == undefined ||
      //     router.asPath.split("#")?.[1] == ""
      //     ? "Company-Information"
      //     : router.asPath.split("#")?.[1]
      //   }`
      // );
    }
    setLoader(false);
  };

  const getContactsList = async () => {
    // setContactLoader(true);
    try {
      const response = await fetch(
        `${BASE_URL}/mini-site/company_profile/contact_person/view?user_id=${minisiteUserID}`,
        {
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const responseJson = await response.json();
      if (response.status === 200) {
        if (responseJson.data.length > 0) {
          let contactStatus = responseJson.data.filter((v) => v.status == 1);
          let contactChat = responseJson.data.filter(
            (v) => v.is_chat_active == "1"
          );

          if (contactStatus.length > 0) {
            setShowContactDetail(true);
          } else {
            setShowContactDetail(false);
          }
          setcontacts(contactStatus);
        }
      }
      setContactLoader(false);
    } catch (error) {
      console.error(error);
      setContactLoader(false);
    }
  };

  useLayoutEffect(() => {
    if (minisiteUserID && !headerData?.company_information) FactoryDetails();
  }, [minisiteUserID, headerData?.company_information]);

  const list = [
    {
      name: "Company Information",
      link: "#Company-Information",
      icon: "icon-company_information",
      id: "Company-Information",
    },
    ...(contacts?.length > 0
      ? [
          {
            name: "Contact Person Details",
            link: "#Contact-Person-Details",
            icon: "icon-contactperson",
            id: "Contact-Person-Details",
          },
        ]
      : []),
    {
      name: "Regional Offices",
      link: "#Regional-Offices",
      icon: "icon-regional_offices",
      id: "Regional-Offices",
    },
    {
      name: "Export Capabilities",
      link: "#Export-Capabilities",
      icon: "icon-export_capabilities",
      id: "Export-Capabilities",
    },
    {
      name: "Company Facilities",
      link: "#Company-Facilities",
      icon: "icon-company_facilities",
      id: "Company-Facilities",
    },
    {
      name: "QA/QC",
      link: "#QA-QC",
      icon: "icon-QA_QC",
      id: "QA-QC",
    },
    {
      name: "R&D Management",
      link: "#R&D-Management",
      icon: "icon-RD_management",
      id: "R&D-Management",
    },
    // {
    //   name: "Factory Photos",
    //   link: "#Factory-Photos",
    //   icon: "icon-factory_photos",
    //   id: "Factory-Photos",
    // },
    {
      name: "Project Photos",
      link: "#Project-Photos",
      icon: "icon-project_photos",
      id: "Project-Photos",
    },
    {
      name: "Services",
      link: "#Services",
      icon: "icon-services",
      id: "Services",
    },
    {
      name: hideCertificates ? "" : "Certificates",
      link: "#Certificates",
      icon: "icon-certificates",
      id: "Certificates",
    },
    {
      name: "Newsroom",
      link: "#Newsroom",
      icon: "icon-newsroom",
      id: "Newsroom",
    },
    {
      name: "FAQ's",
      link: "#FAQ",
      icon: "icon-faqs",
      id: "FAQ",
    },
  ];

  // const handleScrollChange=(currentActiveKey)=>{
  //   if(currentActiveKey?.id!==undefined){
  //     const getActiveLink = list?.find(item=>item?.id==currentActiveKey?.id)
  //     if(getActiveLink.id==currentActiveKey?.id){
  //        router.push(getActiveLink?.link);
  //     }
  //   }
  // }
  // const debouncedHandleScrollChange = debounce(handleScrollChange, 200);

  const bussinessType = getBussinessType(headerData?.business_type);
  const factoryPhotos = getFactoryPhotos(
    headerData?.company_facility,
    bussinessType
  );
  return (
    <>
      {bannerData?.length > 0 && (
        <SingleSlider settings={bannerData[0]} type="company_profile" />
      )}
      <MiniSiteContainer>
        <Grid container spacing={{ md: 2, sm: 2, xs: 2 }}>
          <Grid item md={3} xs={12} display={{ xs: "none", lg: "block" }}>
            <StickyBar>
              <SellerOuterCon>
                <SellerOuter>
                  <SellerHeading pb={"10px"}>
                    <Typography variant="h4">About Us </Typography>
                  </SellerHeading>
                  <Divider orientation="horizontal" />
                  {!contactLoader ? (
                    <Scrollspy
                    className="scrollspy"
                    items={list
                      .filter((i) =>
                        !showContactDetail
                          ? i.name != "Contact Person Details"
                          : i
                      )
                      .map((v) => v.link.replace("#", ""))}
                    currentClassName="activeScrollspy"
                      offset={ 50 }
                      // onUpdate ={(key)=>debouncedHandleScrollChange(key)}
                    >
                      {list
                        .filter((i) =>
                          !showContactDetail
                            ? i.name != "Contact Person Details"
                            : i
                        )
                        .map(
                          (v, i) =>
                            v.name && (
                              <Typography
                                component="li"
                                sx={{
                                  listStyle: "none",
                                  "& i": {
                                    fontSize: "20px",
                                    width: "20px",
                                    display: "inline-block",
                                  },
                                  "& .icon-factory_photos": {
                                    fontSize: "15px",
                                  },
                                }}
                              >
                                <Box
                                  key={`${v.name}-${i}`}
                                  display={"flex"}
                                  alignItems="center"
                                  gap={2}
                                  pt={2}
                                  sx={{}}
                                >
                                  <Box
                                    component="span"
                                    sx={{
                                      display: "flex",
                                      gap: "7px",
                                      "&:hover": {
                                        "& a": {
                                          color: "#d7282f !important",
                                        },
                                        "& i:before": {
                                          color: "#d7282f",
                                        },

                                        "& .icon-QA_QC": {
                                          "& span:before": {
                                            color: "#d7282f",
                                          },
                                        },
                                        "& .icon-RD_management": {
                                          "& span:before": {
                                            color: "#d7282f",
                                          },
                                        },
                                        "& .icon-project_photos": {
                                          "& span:before": {
                                            color: "#d7282f",
                                          },
                                        },
                                      },
                                    }}
                                  >
                                    <Box
                                      component={"i"}
                                      className={v.icon}
                                      sx={{
                                        "& i:before": {
                                          color:
                                            highLight === v.name
                                              ? "#d7282f"
                                              : "black",
                                        },
                                      }}
                                    >
                                      <span className="path1"></span>
                                      <span className="path2"></span>
                                      <span className="path3"></span>
                                      <span className="path4"></span>
                                      <span className="path5"></span>
                                      <span className="path6"></span>
                                      <span className="path7"></span>
                                      <span className="path8"></span>
                                    </Box>
                                    <Link
                                      className={`sharat ${
                                        highLight === v.name
                                          ? "activeScrollspy"
                                          : ""
                                      }`}
                                      href={v.link}
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        color: "#d7282f !important",
                                      }}
                                      onClick={() => setHighLight(v.name)}
                                    >
                                      {v.name}
                                    </Link>
                                  </Box>
                                </Box>
                              </Typography>
                            )
                        )}
                    </Scrollspy>
                  ) : (
                    <>
                      <SidebarSkeleton />
                    </>
                  )}
                </SellerOuter>
              </SellerOuterCon>
              <MiniSidebar />
            </StickyBar>
          </Grid>
          <Grid item lg={9} xs={12}>
            <Stack spacing={{ md: 2, xs: 2 }}>
              <ScrollHiddenDiv id="Company-Information"></ScrollHiddenDiv>
              <CompanyProfileOuter
                sx={{ marginTop: "0px !important" }}
                p={{ xs: 2 }}
                id="Company-Information"
              >
                <CompanyProfileInner>
                  <CompanyInfo
                    factory_photos={headerData?.contact_profile?.factory_photos}
                  />
                </CompanyProfileInner>
              </CompanyProfileOuter>

              <>
                <ScrollHiddenDiv id="Contact-Person-Details"></ScrollHiddenDiv>
                <CompanyProfileOuter
                  id="Contact-Person-Details"
                  p={{ xs: 2 }}
                  bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
                >
                  <CompanyProfileInner>
                    <CPcontactPersone
                      contacts={contacts}
                      contactLoader={contactLoader}
                    />
                  </CompanyProfileInner>
                </CompanyProfileOuter>
              </>

              <ScrollHiddenDiv id="Regional-Offices"></ScrollHiddenDiv>
              <CompanyProfileOuter
                id="Regional-Offices"
                p={{ xs: 2 }}
                bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
              >
                <CompanyProfileInner>
                  <RegionalOffice />
                </CompanyProfileInner>
              </CompanyProfileOuter>

              <ScrollHiddenDiv id="Export-Capabilities"></ScrollHiddenDiv>
              <CompanyProfileOuter
                id="Export-Capabilities"
                p={{ xs: 2 }}
                bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
              >
                <CompanyProfileInner>
                  <ExportCapabilities />
                </CompanyProfileInner>
              </CompanyProfileOuter>

              <ScrollHiddenDiv id="Company-Facilities"></ScrollHiddenDiv>
              <CompanyProfileOuter
                id="Company-Facilities"
                p={{ xs: 2 }}
                bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
              >
                <CompanyProfileInner>
                  <InventoryDetail
                    loader={loader}
                    factorydetails={headerData}
                  />
                </CompanyProfileInner>
              </CompanyProfileOuter>

              <ScrollHiddenDiv id="QA-QC"></ScrollHiddenDiv>
              <CompanyProfileOuter
                id="QA-QC"
                p={{ xs: 2 }}
                bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
              >
                <CompanyProfileInner>
                  <QAQC />
                </CompanyProfileInner>
              </CompanyProfileOuter>

              <ScrollHiddenDiv id="R&D-Management"></ScrollHiddenDiv>
              <CompanyProfileOuter
                id="R&D-Management"
                p={{ xs: 2 }}
                bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
              >
                <CompanyProfileInner>
                  <RNDmanagment showExpand={true} />
                </CompanyProfileInner>
              </CompanyProfileOuter>

              {/* <ScrollHiddenDiv id="Factory-Photos"></ScrollHiddenDiv>
              <CompanyProfileOuter
                id="Factory-Photos"
                p={{ xs: 2 }}
                bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
              >
                <CompanyProfileInner>
                  <FactoryPhoto
                    loader={loader}
                    factory_photos={factoryPhotos ?? []}
                  />
                </CompanyProfileInner>
              </CompanyProfileOuter> */}

              <ScrollHiddenDiv id="Project-Photos"></ScrollHiddenDiv>
              <CompanyProfileOuter
                id="Project-Photos"
                p={{ xs: 2 }}
                bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
              >
                <CompanyProfileInner>
                  <ProjectPhoto
                    loader={loader}
                    factorydetails={companyTourProjectData?.project_photos}
                  />
                </CompanyProfileInner>
              </CompanyProfileOuter>

              <ScrollHiddenDiv id="Services"></ScrollHiddenDiv>
              <CompanyProfileOuter
                p={{ xs: 2 }}
                bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
                id="Services"
              >
                <CompanyProfileInner>
                  <ServiceList />
                </CompanyProfileInner>
              </CompanyProfileOuter>

              {!hideCertificates && (
                <>
                  <ScrollHiddenDiv id="Certificates"></ScrollHiddenDiv>
                  <CompanyProfileOuter
                    id="Certificates"
                    p={{ xs: 2 }}
                    bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
                  >
                    <CompanyProfileInner>
                      <Certificate setHideCertificates={setHideCertificates} />
                    </CompanyProfileInner>
                  </CompanyProfileOuter>
                </>
              )}

              <ScrollHiddenDiv id="Newsroom"></ScrollHiddenDiv>
              <CompanyProfileOuter
                id="Newsroom"
                p={{ xs: 2 }}
                bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
              >
                <CompanyProfileInner>
                  <NewsRoom />
                </CompanyProfileInner>
              </CompanyProfileOuter>

              <ScrollHiddenDiv id="FAQ"></ScrollHiddenDiv>
              <CompanyProfileOuter
                id="FAQ"
                p={{ xs: 2 }}
                bs="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
              >
                <CompanyProfileInner>
                  <CPfaq />
                </CompanyProfileInner>
              </CompanyProfileOuter>
            </Stack>
          </Grid>
        </Grid>
      </MiniSiteContainer>
    </>
  );
};

export default MiniCompanyProfile;
