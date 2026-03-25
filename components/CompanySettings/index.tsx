import {
  Header,
  StoreButtonContainer,
  Followersbutton,
  CompanyDetailInnData,
  SocialmediaContactt,
} from "@/components/CompanySettings/style";
import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import companydetail from "./CompanyDetail/companydetail.module.css";

import {
  BorderLinearProgress,
  ProgressDigit,
  CompanyInfotext,
  SipmleText,
} from "../profile/companyProfile/styles";

import UploadImageModal from "../common/updateprofilemodal/UploadProfileImageModal";
import { apiClient } from "@/components/common/common";
import UploadCoverModal from "../common/updateprofilemodal/UploadCoverModal";
import { MyAppContext } from "@/contextApi/appContext";
import RegionalOffices from "@/components/CompanySettings/CompanyDetail/RegionalOffices";
import ContactPersonDetail from "@/components/CompanySettings/CompanyDetail/ContactPersonDetail";
import QualityAssurance from "@/components/CompanySettings/CompanyDetail/QualityAssurance";
import ResearchAndDevelop from "@/components/CompanySettings/CompanyDetail/ResearchAndDevelop";
import FactoryInventoryDetail from "@/components/CompanySettings/CompanyDetail/FactoryDetails/FactoryInventoryDetail";
import Services from "@/components/CompanySettings/CompanyDetail/Services/Services";
import Certificates from "@/components/CompanySettings/CompanyDetail/Certificates";
import NewsRoom from "./CompanyDetail/NewsRoom/NewsRoom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FAQ from "@/components/CompanySettings/CompanyDetail/FAQ";
import { Grid, Box, Stack, Skeleton } from "@mui/material";
import { SingleFieldModal } from "@/components/common/modal";
import { ProfileHeader } from "../common/profileheader";
import { makeStyles } from "tss-react/mui";
import { useRouter } from "next/router";
import { AccessDenied } from "../common/AccessDenied";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 498,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  padding: "16px 20px",
  "@media (max-width:600px)": {
    width: "95%",
  },
};
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
import { toast } from "react-toastify";
import CompanyProfileCover from "../profile/companyProfile/companyProfileCover";
import CompanyProfile from "../profile/companyProfile";
import SocialMediaContact from "./CompanyDetail/SocialAccounts";
import FollowerListModal from "./Modal/CompanyDetailModalheader";
import ExportCapabilities from "./CompanyDetail/ExportCapabilities";
import { BusinessType } from "../profile/companyProfile/businessType";
import { toggleView } from "@/utils/commonFunctions/other";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import Dashboard from "pages/dashboard";

// Outside of functional component
const useStyles = makeStyles()((theme) => {
  return {
    tabscroll: {
      "@media (max-width:600px)": {
        maxWidth: "98%",
        margin: "0 auto",
      },
    },
    companydetaildes: {
      "@media (max-width:600px)": {},
    },

    tabs: {
      fontSize: "14px !important",
      "@media screen and (max-width:767px)": {
        fontSize: "12px !important",
      },
      "& .MuiTabs-indicator": {
        backgroundColor: "#D7282F !important",
        height: "36px !important",
        minHeight: "36px !important",
        borderRadius: "6px !important",
        top: 7,
        border: "1px solid #D7282F",
      },
    },
  };
});
const SellerCompanyDetails = () => {
  const [activeButton, setActiveButton] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [coverModal, setCoverModal] = useState<boolean>(false);
  const [followerList, setFollowerList] = useState<any>([]);
  const { setCompleteScreenLoader, breakPoints } = useContext(MyAppContext);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const { role, id } = useSelector((state: any) => state.userData);
  const [open, setOpen] = React.useState(false);
  const [showEditCompanyNameModal, setShowEditCompanyNameModal] =
    useState(false);
  const dispatch = useAppDispatch();
  const { companyDetails }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const [basicInfoState, setBasicInfoState] = useState<string>("view");
  const [businessTypeState, setBusinessTypeState] = useState<string>("view");
  const [storeDataLoading, setStoreDataLoading] = useState<boolean>(false);
  const [companyRegistrationState, setCompanyRegistrationState] =
    useState<string>("view");

  const [contactDetailsState, setContactDetailsState] =
    useState<string>("view");
  const resetModes = () => {
    setBasicInfoState((prev) => "view");
    setBusinessTypeState((prev) => "view");
    setCompanyRegistrationState((prev) => "view");
    setContactDetailsState((prev) => "view");
  };
  const router = useRouter();
  const { query } = router;
  const closeModals = () => {
    setShowEditCompanyNameModal(false);
  };
  useEffect(() => {
    fetchSubdomain();
  }, []);
  const fetchSubdomain = async () => {
    setStoreDataLoading(true);
    let response = await apiClient("sub_domain/list", "get", {});

    if (response.status === 200 || response.status) {
      setStoreDataLoading(false);
      setdomaindata(response.data);
    }
    setLoader(false);
  };
  const [domaindata, setdomaindata] = useState<any>([]);
  useLayoutEffect(() => {
    if (query?.tab) {
      const { tab } = query;
      if (tab == "company") {
        setActiveButton(0);
      }
      if (tab == "contact") {
        setActiveButton(1);
      }
      if (tab == "regional") {
        setActiveButton(2);
      }
      if (tab == "factory") {
        setActiveButton(3);
      }
      if (tab == "export") {
        setActiveButton(4);
      }
      if (tab == "QAQC") {
        setActiveButton(5);
      }
      if (tab == "research") {
        setActiveButton(6);
      }
      if (tab == "services") {
        setActiveButton(7);
      }
      if (tab == "social") {
        setActiveButton(8);
      }
      if (tab == "certificates") {
        setActiveButton(9);
      }
      if (tab == "newsroom") {
        setActiveButton(10);
      }
      if (tab == "faq") {
        setActiveButton(11);
      }
      if (tab) {
        setLoader(false);
      }
    }
  }, [query, activeButton]);

  const { classes } = useStyles();
  const getCompanyDetails = async () => {
    try {
      setCompleteScreenLoader(true);
      let userData = localStorage?.userData
        ? JSON.parse(localStorage.userData)
        : {};
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          shop_id: companyDetails.basic_information.shop_id,
        })
      );
      localStorage.setItem("userData1", JSON.stringify(companyDetails));
      setCompleteScreenLoader(false);
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };
  const FetchFollowerList = async (skip) => {
    setButtonLoader(true);
    let response = await apiClient(
      `front/user/follower_list?skip=${skip}&take=${5}&status=${1}&shop_id=${
        companyDetails?.basic_information?.user_id
      }`,
      "get"
    );
    if (response.status) {
      setFollowerCount(response.total);
      setFollowerList((prev) => [...response.data, ...prev]);
    }
    setButtonLoader(false);
  };
  const updateProfile = async (payload) => {
    let promise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${BASE_URL}/company_profile/updateProfile`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${Auth.token()}`,
              "Content-Type": "application/json",
            },

            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();
        if (data.status == true || data.status == 200) {
        }
        return resolve(response);
      } catch (error) {
        return reject(false);
      }
    });

    return promise;
  };

  useEffect(() => {
    if (companyDetails?.basic_information?.user_id) {
      FetchFollowerList(0);
    }
  }, [companyDetails?.basic_information?.user_id]);

  useEffect(() => {
    getCompanyDetails();
  }, []);

  let TabList = [
    "company",
    "contact",
    "regional",
    "factory",
    "export",
    "QAQC",
    "research&management",
    "services",
    "social",
    "certificates",
    "newsroom",
    "faq",
  ];

  useEffect(() => {
    dispatch(getCompanyProfile());
  }, []);

  const renderComponent = () => {
    switch (activeButton) {
      case 0:
        return <CompanyProfile header={false} />;
      case 1:
        return <ContactPersonDetail />;
      case 2:
        return <RegionalOffices />;
      case 3:
        return <FactoryInventoryDetail />;
      case 4:
        return <ExportCapabilities />;
      case 5:
        return <QualityAssurance />;
      case 6:
        return <ResearchAndDevelop />;
      case 7:
        return <Services />;
      case 8:
        return (
          <SocialmediaContactt>
            <Box
              sx={{
                "& .detailsContacts": {
                  width: "30%",
                  "@media (max-width: 899px)": {
                    width: "50%",
                  },
                  "@media (max-width: 767px)": {
                    width: "100%",
                  },
                },
                "& .detailsContacts1": {
                  width: "30% !important",
                  "@media (max-width: 899px)": {
                    width: "50% !important",
                  },
                  "@media (max-width: 767px)": {
                    width: "100% !important",
                  },
                },
              }}
            >
              <SocialMediaContact componentType={"company"} />
            </Box>
          </SocialmediaContactt>
        );
      case 9:
        return <Certificates />;
      case 10:
        return <NewsRoom />;
      case 11:
        return <FAQ />;
      default:
        return <div> Coming soon....</div>;
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const editModal = () => setShowEditCompanyNameModal(true);

  const DeleteImage = async (type) => {
    let formData = new FormData();
    if (type == "banner") {
      formData.append("type", "company");
    }
    if (type == "profile") {
      formData.append("type", "contact_list");
    }
    let response = await apiClient(
      "profile/delete_images",
      "post",
      { body: formData },
      true
    );
    return response;
  };

  const NavigateToMiniSite = (slug) => {
    if (slug) window.open(`/mini-site/${slug}/home`, "_blank");
    if (!slug) {
      toast.error("Please enter store name");
      router.push(`/subdomain?store-name`);
    }
  };
  const loadMoreData = () => {
    if (followerList.length < followerCount) {
      FetchFollowerList(skip + 5);
      setSkip((prev) => prev + 5);
    }
  };

  return (
    <>
      {loader ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "420px",
            }}
          >
            <img src="/assets/Loader/Power-Logo-Loader.gif" alt="Loader" />
          </Box>
        </>
      ) : (
        <>
          {profileModal && (
            <UploadImageModal
              name={"companyProfileImage"}
              endPoint={"company_profile/updateProfile"}
              open={profileModal}
              companyDetails={companyDetails}
              closeModal={setProfileModal}
            />
          )}
          {coverModal && (
            <UploadCoverModal
              open={coverModal}
              closeModal={setCoverModal}
              keyValue={"profile_banner"}
              name={"companyProfileBanner"}
              company_detail={companyDetails}
              endPoint={"company_profile/updateProfile"}
            />
          )}
          {showEditCompanyNameModal && (
            <SingleFieldModal
              modalHeader={"New Company Name"}
              fieldValue={companyDetails?.contact_profile?.name}
              open={showEditCompanyNameModal}
              placeHolder="Please Enter New Name"
              closeModal={closeModals}
              getCompanyDetails={getCompanyDetails}
            />
          )}
          {role == "buyer" ? (
            <Box className="full_page companydetail_page">
              <Grid container>
                <Grid item xs={12}>
                  <ProfileHeader text={""} />
                  {/* <AccessDenied /> */}
                  <Dashboard />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box className="full_page companydetail_page">
              <Grid container>
                <Grid item xs={12}>
                  <ProfileHeader text={"Company Details"} />
                </Grid>
              </Grid>

              <Header>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CompanyDetailInnData>
                      <CompanyProfileCover
                        companyDetails={companyDetails}
                        editModal={editModal}
                        DeleteImage={DeleteImage}
                        role={role}
                      />
                    </CompanyDetailInnData>
                  </Grid>

                  <Grid
                    className={classes.companydetaildes}
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    sx={{
                      padding: "0 16px 0",
                      borderLeft: "1px solid rgb(0 0 0 / 12%)",
                      margin: "15px 0",
                      "@media (max-width: 1200px)": {
                        borderLeft: "none",
                      },
                      "@media (max-width: 600px)": {
                        padding: "0",
                      },
                    }}
                  >
                    <Grid
                      container
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Grid item>
                        <CompanyInfotext breakPoints={breakPoints}>
                          The following information will be displayed on your
                          mini-Site, provide more information to earn trust from
                          your buyers.
                        </CompanyInfotext>
                      </Grid>
                      <Grid
                        item
                        style={{
                          color: "#231F20",
                          fontFamily: "open sans",
                          fontWeight: 700,
                          fontSize: "18px",
                          lineHeight: "20px",
                          alignItems: "center",
                          paddingBottom: "10px",
                          borderBottom: "1px solid rgba(34, 51, 84,0.1)",
                        }}
                      >
                        {companyDetails?.contact_profile?.complete_profile ==
                          "100" ||
                        companyDetails?.contact_profile?.complete_profile > 100
                          ? "Completed"
                          : "Complete Company Profile"}
                      </Grid>
                      <Grid item>
                        <SipmleText>
                          Please fill in the required fields before submitting.
                        </SipmleText>
                      </Grid>

                      <Grid
                        item
                        sx={{ flexGrow: 1, transform: "translateY(-6px)" }}
                      >
                        <br />
                        <ProgressDigit>
                          {`${
                            companyDetails?.contact_profile?.complete_profile ??
                            0
                          }%`}
                        </ProgressDigit>
                        <BorderLinearProgress
                          variant="determinate"
                          value={
                            +companyDetails?.contact_profile?.complete_profile
                          }
                        />
                      </Grid>
                      <Grid
                        container
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center  ",
                        }}
                      >
                        <Box>
                          <Followersbutton onClick={handleOpen}>
                            Followers({followerCount})
                          </Followersbutton>

                          {open && (
                            <FollowerListModal
                              buttonLoader={buttonLoader}
                              open={open}
                              followerList={followerList}
                              handleClose={handleClose}
                              loadMoreData={loadMoreData}
                              followerCount={followerCount}
                              setFollowerList={setFollowerList}
                              setFollowerCount={setFollowerCount}
                            />
                          )}
                        </Box>
                        <Grid item style={{ paddingTop: "10px" }}>
                          {id &&
                            (storeDataLoading ? (
                              <Skeleton
                                width={145}
                                height={"34px"}
                                variant="rounded"
                                animation="wave"
                              />
                            ) : (
                              <>
                                <StoreButtonContainer
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "#d7282f !important",
                                      color: "#fff !important",
                                      transition: "all ease .3s",
                                      border: "1px solid #d7282f",
                                    },
                                  }}
                                  onClick={() => {
                                    NavigateToMiniSite(
                                      companyDetails?.basic_information?.slug
                                    );
                                  }}
                                >
                                  View Online Store
                                </StoreButtonContainer>
                              </>
                            ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Header>
              <Grid container spacing={2}>
                <Grid item xs={12} className={classes.tabscroll}>
                  {
                    <Box
                      className="tabsContainer"
                      style={{
                        backgroundColor: "white",
                        minWidth: "100%",
                        marginTop: "14px",
                        borderRadius: "6px",
                      }}
                    >
                      {!role ? (
                        <Box
                          sx={{
                            minHeight: "112px",
                            boxShadow:
                              "0px 12px 23px 0px rgb(112 112 112 / 4%)",
                            borderRadius: "6px",
                            padding: "16px",
                          }}
                        >
                          <Box
                            sx={{
                              margin: "0 0 16px 0",
                              padding: "0 0 12px 0",
                              borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                              >
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  height={34}
                                  width={150}
                                />
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={150}
                                />
                              </Box>
                              <Box>
                                <Skeleton
                                  variant="text"
                                  width={40}
                                  height={25}
                                  animation="wave"
                                />
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <Skeleton
                              width={100}
                              height={"26px"}
                              variant="rounded"
                              animation="wave"
                            />
                            <Skeleton
                              width={130}
                              height={"26px"}
                              variant="rounded"
                              animation="wave"
                            />
                            <Skeleton
                              width={90}
                              height={"26px"}
                              variant="rounded"
                              animation="wave"
                            />
                          </Box>
                        </Box>
                      ) : role === "seller" ? (
                        <BusinessType
                          resetModes={resetModes}
                          defaultData={companyDetails}
                          mode={businessTypeState}
                          changeMode={setBusinessTypeState}
                          toggleMode={toggleView}
                          updateProfile={updateProfile}
                        />
                      ) : (
                        ""
                      )}
                    </Box>
                  }
                </Grid>
                <Grid item xs={12} className={classes.tabscroll}>
                  {
                    <Box
                      className="tabsContainer"
                      style={{
                        backgroundColor: "white",
                        minWidth: "100%",
                        marginTop: "14px",
                        borderRadius: "6px",
                      }}
                    >
                      <Tabs
                        value={activeButton}
                        onChange={(e, value) => {
                          setActiveButton(value);
                          router.push(
                            `/companySettings/companyDetails?tab=${TabList[value]}`
                          );
                        }}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        className={companydetail.company_detail_tab}
                      >
                        <Tab className={classes.tabs} label="Company Info" />
                        <Tab
                          className={classes.tabs}
                          label="Contact Person Details"
                        />
                        <Tab
                          className={classes.tabs}
                          label="Regional Offices"
                        />
                        <Tab
                          className={classes.tabs}
                          label="Company Facilities"
                        />
                        <Tab
                          className={classes.tabs}
                          label="Export Capabilities"
                        />
                        <Tab className={classes.tabs} label="QA/QC" />
                        <Tab className={classes.tabs} label="R&D Management" />
                        <Tab className={classes.tabs} label="Services" />
                        <Tab className={classes.tabs} label="Social Contacts" />
                        <Tab className={classes.tabs} label="Certificates" />
                        <Tab className={classes.tabs} label="News room" />
                        <Tab className={classes.tabs} label="FAQs" />
                      </Tabs>
                    </Box>
                  }
                </Grid>

                <Grid item xs={12}>
                  <div>{renderComponent()}</div>
                </Grid>
              </Grid>

              {/* Top Grid Close */}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default SellerCompanyDetails;
