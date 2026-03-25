import React, { useContext, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import QaqcDepartment from "./FactoryDetails/qaqcdepartment/QaqcDepartment";
import { CompanyFacilityContainer, MainHeading } from "./FactoryDetails/style";
import QualityTestEquipment from "./FactoryDetails/qualitytestequipment/QualityTestEquipment";
import AgentRepresentative from "./FactoryDetails/AgentRepresentative";
import DistributorQaQc from "./FactoryDetails/wholesalar/DistributorQaQc";
import RetailerQaqc from "./FactoryDetails/retailer/retailerqaqc/RetailerQaqc";
import WholesalerQaQc from "./FactoryDetails/wholesalar/WholesalerQaQc";
import ResellerQaQc from "./FactoryDetails/wholesalar/ResellerQaQc";
import OtherQaQc from "./FactoryDetails/wholesalar/wholesalarqaqc/OtherQaQc";
import {
  FactorySmallTextContainer,
  HeaderContainer,
  HeaderTextContainer,
} from "./commonStyles";
import { MyAppContext } from "@/contextApi/appContext";
import QaQcSkelton from "./FactoryDetails/wholesalar/wholesalarwarehouse/QaQcSkelton";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { QualityControlPress } from "./FactoryDetails/qualitycontrolpress/QualityControlPress";
import QaQcCommon from "./QaQc/QaQcCommon";
const QualityAssurance = () => {
  const [isLoading, setLoading] = useState(false);
  const { breakPoints } = useContext(MyAppContext);
  const { businessType }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const [listData, setListingData] = useState("");
  useEffect(() => {
    document.body.classList.add("companyDetailScroll");
  }, []);

  useEffect(() => {
    getCompanyProfile();
  }, []);

  const getCompanyProfile = async () => {
    let response = await fetch(`${BASE_URL}/company_profile/view`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Auth.token()}`,
      },
    });
    const data = await response.json();
    setListingData(data?.qaqc_rnd?.manufacture_qaqc);
    return data;
  };
  const manufactureData = listData;
  let departmentData;
  if (manufactureData) {
    departmentData = JSON.parse(manufactureData);
  }
  const handlCallBackFunction = () => {
    getCompanyProfile();
  };
  return (
    <>
      <Stack sx={{}}>
        <CompanyFacilityContainer>
          <HeaderContainer breakPoints={breakPoints}>
            <Box>
              <HeaderTextContainer breakPoints={breakPoints}>
                Quality Assurance/Quality Control
              </HeaderTextContainer>
              <FactorySmallTextContainer>
                Manage Information related to QA/QC
              </FactorySmallTextContainer>
            </Box>
          </HeaderContainer>
          <hr className="hair-line" style={{ margin: "0", padding: "0" }} />
          {isLoading ? (
            <Stack sx={{ gap: "18px" }}>
              <QaQcSkelton />
            </Stack>
          ) : !businessType ? (
            <Box sx={{ height: 300, width: "100%" }}>
              <Stack sx={{ gap: "18px" }}>
                <ResellerQaQc />
              </Stack>
            </Box>
          ) : (
            <>
              {businessType?.name === "Manufacturers" && (
                <Stack sx={{ gap: "18px" }}>
                  <QaqcDepartment
                    handlCallBackFunction={handlCallBackFunction}
                    listData={listData}
                    departmentData={departmentData}
                  />
                  <QualityControlPress
                    handlCallBackFunction={handlCallBackFunction}
                    departmentData={departmentData}
                  />
                  <QualityTestEquipment
                    listData={listData}
                    handlCallBackFunction={handlCallBackFunction}
                    departmentData={departmentData}
                  />
                </Stack>
              )}
              
              {businessType?.name === "Agents and Representatives" && (
                <Stack sx={{ gap: "18px" }}>
                  <AgentRepresentative />
                </Stack>
              )}

              {businessType?.name === "Distributors" && (
                <Stack sx={{ gap: "18px" }}>
                  <DistributorQaQc type="Distributor" type_key="distributor_qaqc" />
                </Stack>
              )}

              {businessType?.name === "Retailers" && (
                <Stack sx={{ gap: "18px" }}>
                  {/* <RetailerQaqc /> */}
                  <DistributorQaQc type="Retailer" type_key="retailer_qaqc" />
                </Stack>
              )}
              {businessType?.name === "Wholesalers" && (
                <Stack sx={{ gap: "18px" }}>
                  <DistributorQaQc type="Wholesalers" type_key="wholesalers_qaqc" />
                  {/* <WholesalerQaQc /> */}
                </Stack>
              )}
              {businessType?.name === "Resellers" && (
                <Stack sx={{ gap: "18px" }}>
                   <DistributorQaQc type="Reseller" type_key="reseller_qaqc" />
                  {/* <ResellerQaQc /> */}
                </Stack>
              )}
              {businessType?.name === "Others" && (
                <Stack sx={{ gap: "18px" }}>
                   <DistributorQaQc type="Other" type_key="other_qaqc" />
                  {/* <OtherQaQc /> */}
                </Stack>
              )}
            </>
          )}
        </CompanyFacilityContainer>
      </Stack>
    </>
  );
};
export default QualityAssurance;
