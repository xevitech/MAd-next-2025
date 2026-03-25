import React, { useState, useEffect, useContext } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { MyAppContext } from "contextApi/appContext";
import Auth from "@/auth/Auth";
import { BASE_URL } from "@/utils/staticValues";
import { BasicInfo } from "./basicInfo";
import Grid from "@mui/material/Grid";
import {
  BorderLinearProgress,
  CardContenLightText,
  CardHeaderText,
  Header,
  OuterContainer,
  Card,
  CardContent,
  CardHeader,
  CardHeaderDescription,
  Spantext,
  WelcomeRightHeader1,
} from "./styles";
import { CompanyRegistration } from "./companyRegistration";
import { ContactDetails } from "./contactDetails";
import { AdditionalInfo } from "./additionalInfo";
import UploadImageModal from "@/components/common/updateprofilemodal/UploadProfileImageModal";
import UploadCoverModal from "@/components/common/updateprofilemodal/UploadCoverModal";
import { SingleFieldModal } from "@/components/common/modal";
import { toggleView } from "@/utils/commonFunctions/other";
import { ProfileHeader } from "@/components/common/profileheader";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { getCompanyProfile } from "@/hooks/company";
import { apiClient } from "@/components/common/common";
import CompanyProfileCover from "./companyProfileCover";
import Tradeshow from "./tradeshow";
import Platforms from "./platforms";
import { BusinessTypeModal } from "./businessType/businessTypeModal";
import { BusinessTypeForBuyer } from "./businessType/businessTypeForBuyer";
import { BusinessTypeBuyerModal } from "./businessType/businessTypeBuyerModal";
import CompanyandProjectPhotos from "./projectandcompanyphotos";

const CompanyProfile = ({ header = true }) => {
  const { breakPoints } = useContext(MyAppContext);
  const [basicInfoState, setBasicInfoState] = useState<string>("view");
  const [businessTypeState, setBusinessTypeState] = useState<string>("view");
  const [companyRegistrationState, setCompanyRegistrationState] =
    useState<string>("view");

  const [contactDetailsState, setContactDetailsState] =
    useState<string>("view");

  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showUpdateCoverModal, setShowUpdateCoverModal] = useState(false);
  const [showEditCompanyNameModal, setShowEditCompanyNameModal] =
    useState(false);
  const dispatch = useAppDispatch();
  const { companyDetails } = useSelector((state: any) => state.companyProfile);
  const closeModals = () => {
    setShowUpdateProfileModal(false);
    setShowUpdateCoverModal(false);
    setShowEditCompanyNameModal(false);
  };
  const { role } = useSelector((state: any) => state.userData);
  const [showPopup, setShowPopup] = useState(false);
  const [showBuyerPopup, setShowBuyerPopup] = useState(false);
  const resetModes = () => {
    setBasicInfoState((prev) => "view");
    setBusinessTypeState((prev) => "view");
    setCompanyRegistrationState((prev) => "view");
    setContactDetailsState((prev) => "view");
  };
  useEffect(() => {
    if (companyDetails.business_type_user?.length === 0) {
      setShowBuyerPopup(true);
    } else {
      setShowBuyerPopup(false);
    }
  }, [companyDetails]);
  const editModal = () => {
    setShowEditCompanyNameModal(true);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setShowBuyerPopup(true);
    if (companyDetails && role !== '') {
      setIsLoading(false);
      if (role === "buyer" &&
        (!companyDetails.business_type_user ||
        companyDetails.business_type_user === null ||
        companyDetails.business_type_user?.length > 0)
      ) {
        setShowBuyerPopup(true);
      }
      else if (role !== "buyer" &&
        (!companyDetails?.business_type ||
        companyDetails?.business_type?.length > 0)
      ) {
        setShowPopup(true);
        setShowBuyerPopup(false);
      } else if (
        companyDetails.business_type?.length > 1 ||
        companyDetails.business_type_user?.length > 1
      ) {
        setShowPopup(false);
        setShowBuyerPopup(false);
      }
    }
  }, [companyDetails]);

  useEffect(() => {
    if (isLoading) {
      setShowPopup(false);
      setShowBuyerPopup(false);
    }
  }, [isLoading]);
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
    if (header) {
      dispatch(getCompanyProfile());
    }
  }, [header]);

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

  const handleClose = () => {
    setShowPopup(false);
  };
  const handleBuyerClose = () => {
    setShowBuyerPopup(false);
  };

  const { user_info } = useSelector((state: any) => state.userData);
  let defaultValues;

  if (user_info?.type === "seller") {
    defaultValues = companyDetails?.business_type;
  } else {
    defaultValues = companyDetails?.business_type_user;
  }

  const [allTogglesAreZero, setAllTogglesAreZero] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (defaultValues) {
      setIsDataLoading(false);

      const defaultTypes = defaultValues?.map((v) => ({
        name: v.name,
        child: typeof v.value === "string" ? [v.value] : v.value,
        toggle: v.toggle,
        tooltip: user_info?.type === "seller" ? v.tooltip : v.value,
      }));
      const allToggles = defaultTypes?.find((type) => type.toggle === true || type.toggle === '1');
      setAllTogglesAreZero(allToggles);
  
      if (allToggles) {
        setShowBuyerPopup(false);
        setShowPopup(false);
      } else {
        if (role !== 'buyer') {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }
  
        if (role !== 'seller') {
          setShowBuyerPopup(true);
        } else {
          setShowBuyerPopup(false);
        }
      }
    }
  }, [defaultValues, user_info, role]);


  useEffect(() => {
    if(role !== ''){
    if (role === "seller" && !companyDetails?.business_type && !isDataLoading) {
      setShowPopup(true);
      }
    }
  }, [role, companyDetails, isDataLoading]);

  useEffect(() => {
    if(role !== ''){
    if (
      role === "buyer" &&
      !companyDetails?.business_type_user &&
      !isDataLoading
    ) {
      setShowBuyerPopup(true);
    }
    }
  }, [role, companyDetails, isDataLoading]);
  return (
    <>
      {(showPopup || (allTogglesAreZero && showPopup)) && (
        <Modal
          open={showPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: "background.paper",
              borderRadius: "4px",
              boxShadow: 24,
              p: 2,
            }}
          >
            <BusinessTypeModal
              resetModes={resetModes}
              defaultData={companyDetails}
              mode={"edit"}
              changeMode={setBusinessTypeState}
              toggleMode={toggleView}
              updateProfile={updateProfile}
              handleClose={() => setShowPopup(false)}
            />
          </Box>
        </Modal>
      )}

      {role === "buyer" && showBuyerPopup && ( 
        <Modal
          open={showBuyerPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: "background.paper",
              borderRadius: "4px",
              boxShadow: 24,
              p: 2,
            }}
          >
            <BusinessTypeBuyerModal
              resetModes={resetModes}
              defaultData={companyDetails}
              mode={"edit"}
              changeMode={setBusinessTypeState}
              toggleMode={toggleView}
              updateProfile={updateProfile}
              handleBuyerClose={handleBuyerClose}
            />
          </Box>
        </Modal>
      )}

      <OuterContainer
        breakPoints={breakPoints}
        className="outercompantdetail"
        sx={{ marginBottom: "24px" }}
      >
        <>
          <UploadImageModal
            companyDetails={companyDetails}
            name={"companyProfileImage"}
            endPoint={"company_profile/updateProfile"}
            open={showUpdateProfileModal}
            closeModal={closeModals}
          />

          <UploadCoverModal
            open={showUpdateCoverModal}
            closeModal={closeModals}
            company_detail={companyDetails}
            keyValue={"profile_banner"}
            name={"companyProfileBanner"}
            endPoint={"company_profile/updateProfile"}
          />
          <SingleFieldModal
            modalHeader={"Guest Company "}
            fieldValue={companyDetails?.contact_profile?.name}
            open={showEditCompanyNameModal}
            placeHolder="Please Enter New Name"
            closeModal={closeModals}
            getCompanyDetails={() => dispatch(getCompanyProfile())}
          />

          <div className={header ? "full_page" : ""}>
            <Grid container>
              {header && (
                <>
                  <Grid item xs={12}>
                    <ProfileHeader text={"Company Profile"} />
                  </Grid>
                  <Header>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sm={6}
                        className="BannerContainer"
                      >
                        <CompanyProfileCover
                          companyDetails={companyDetails}
                          DeleteImage={DeleteImage}
                          breakPoints={breakPoints}
                          editModal={editModal}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} sm={6}>
                        <Card breakPoints={breakPoints}>
                          <WelcomeRightHeader1>
                            <CardHeader>
                              <CardHeaderDescription>
                                The following information will be displayed in
                                the company profile, provide more information to
                                earn trust from your users/supplier.
                              </CardHeaderDescription>
                              <CardHeaderText>
                                Complete Company Profile
                              </CardHeaderText>
                            </CardHeader>
                            <CardContent>
                              <CardContenLightText>
                                Please fill in the required fields.
                                <Spantext>
                                  {Number(
                                    companyDetails?.contact_profile
                                      ?.complete_profile
                                  )}
                                  %
                                </Spantext>
                              </CardContenLightText>
                              <Box
                                sx={{
                                  flexGrow: 1,
                                  transform: "translateY(-6px)",
                                }}
                              >
                                <br />
                                <BorderLinearProgress
                                  variant="determinate"
                                  value={
                                    companyDetails?.contact_profile
                                      ?.complete_profile || 0
                                  }
                                />
                              </Box>
                            </CardContent>
                          </WelcomeRightHeader1>
                        </Card>
                      </Grid>
                    </Grid>
                  </Header>
                </>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Grid container>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                      <BasicInfo
                        resetModes={resetModes}
                        defaultValues={companyDetails?.basic_information}
                        mode={basicInfoState}
                        changeMode={setBasicInfoState}
                        toggleMode={toggleView}
                        updateProfile={updateProfile}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                      <CompanyRegistration
                        resetModes={resetModes}
                        defaultValues={companyDetails?.location_of_registration}
                        mode={companyRegistrationState}
                        changeMode={setCompanyRegistrationState}
                        toggleMode={toggleView}
                        updateProfile={updateProfile}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid container>
                    {role === "buyer" && (
                      <Grid item xs={12} sx={{ mb: 2 }}>
                        <BusinessTypeForBuyer
                          resetModes={resetModes}
                          defaultData={companyDetails}
                          mode={businessTypeState}
                          changeMode={setBusinessTypeState}
                          toggleMode={toggleView}
                          updateProfile={updateProfile}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} sx={{ mb: 2 }}>
                      <ContactDetails
                        resetModes={resetModes}
                        mode={contactDetailsState}
                        changeMode={setContactDetailsState}
                        toggleMode={toggleView}
                        defaultValues={companyDetails?.contact_profile}
                        updateProfile={updateProfile}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                      <AdditionalInfo
                        defaultValues={{
                          ...companyDetails?.company_operational_address,
                          description:
                            companyDetails?.contact_profile?.description,
                          industry: companyDetails?.contact_profile?.industry,
                          minisite_footer_banner:
                            companyDetails?.contact_profile
                              ?.minisite_footer_banner,
                          slogan: companyDetails?.basic_information?.slogan,
                          minisite_footer_banner_name:
                            companyDetails?.contact_profile
                              ?.minisite_footer_banner_name,
                          average_sourcing_frequency:
                            companyDetails?.basic_information
                              ?.average_sourcing_frequency,
                          primary_sourcing_purpose:
                            companyDetails?.basic_information
                              ?.primary_sourcing_purpose,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} mt={-2}>
                  <Platforms />
                </Grid>
                {role === "seller" && (
                  <Grid item xs={12}>
                    <CompanyandProjectPhotos />
                  </Grid>
                )}
                {localStorage.getItem("userData") &&
                  JSON.parse(localStorage.getItem("userData"))?.type ==
                    "seller" && (
                    <Grid item xs={12}>
                      <Tradeshow />
                    </Grid>
                  )}
              </Grid>
            </Grid>
          </div>
        </>
      </OuterContainer>
    </>
  );
};

export default CompanyProfile;
