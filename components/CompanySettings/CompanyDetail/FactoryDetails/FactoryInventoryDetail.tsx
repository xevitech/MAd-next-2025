import React, { useContext, useEffect, useState } from "react";

import {
  FactorySmallTextContainer,
  HeaderContainer,
  HeaderTextContainer,
  OuterContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { Box, Divider, Skeleton, Stack } from "@mui/material";
import _debounce from "lodash/debounce";
import AnnualProductionCapacity from "./annualproductioncapacity/AnnualProductionCapacity";
import { CompanyFacilityContainer } from "./style";
import ProductionLine from "./productionline/ProductionLine";
import ProductionEquipment from "./productionequipment/ProductionEquipment";
import Store from "./store/Store";
import AgentandRepresentStore from "./agentandrepresentative/agentandrepresentstore/AgentandRepresentStore";
import RetailerFactory from "./retailer/retailerfactory/RetailerFactory";
import RetailerStore from "./retailer/retailerstore/RetailerStore";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import WareHouseCommom from "./retailer/retalierwarehouse/RetalierWaerehouse";
import ManufectreFactory from "./factory/Factory";
import { MyAppContext } from "@/contextApi/appContext";
import ManufecturerWareHouse from "./warehouse/Warehouse";
import { ProductionProcess } from "./prductionprocess/ProductionProcess";
import { getCompanyProfile } from "@/hooks/company";
const FactoryInventoryDetail = () => {
  const { businessType }: any = useSelector(
    (state: any) => state.companyProfile
  );

  const dispatch = useDispatch()

  const [listData, setListingData] = useState("");
  useEffect(() => {
    getCompanyFacilities();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);
  const getCompanyFacilities = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        `${BASE_URL}/company_profile/view/company-Faclities`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );
      const data = await response.json();
      dispatch(getCompanyProfile())
      setListingData(data?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handlCallBackFunction = () => {
    getCompanyFacilities();
  };
  const { setCompleteScreenLoader, breakPoints } = useContext(MyAppContext);
  const [loading, setLoading] = useState(true);
  return (
    <OuterContainer value={"20px"} sx={{ padding: "16px", }}>
      <HeaderContainer breakPoints={breakPoints}>
        <div>
          <HeaderTextContainer breakPoints={breakPoints}>
            Company Facility
          </HeaderTextContainer>
          <FactorySmallTextContainer>
            Manage Information related to Company Facility
          </FactorySmallTextContainer>
        </div>
      </HeaderContainer>
      <Divider variant="fullWidth" orientation="horizontal" />

      <Stack sx={{ gap: "18px" }}>
        {businessType?.name === "Manufacturers" && (
          <CompanyFacilityContainer sx={{ padding: "0px" }}>
            <Stack sx={{ gap: "18px" }}>
              <Stack>
                <ManufectreFactory
                  listData={listData}
                  handlCallBackFunction={handlCallBackFunction}
                  type={"manufacturer"}
                />
                <AnnualProductionCapacity
                  type={"manufacturer"}
                  handlCallBackFunction={handlCallBackFunction}
                  listData={listData}
                />
                <ProductionProcess
                  type={"manufacturer"}
                  handlCallBackFunction={handlCallBackFunction}
                  list={listData}
                />
                <ProductionLine
                  type={"manufacturer"}
                  handlCallBackFunction={handlCallBackFunction}
                  list={listData}
                />
                <ProductionEquipment
                  type={"manufacturer"}
                  handlCallBackFunction={handlCallBackFunction}
                  list={listData}
                />
                <ManufecturerWareHouse
                  listData={listData}
                  handlCallBackFunction={handlCallBackFunction}
                  type={"manufacturer"}
                />
                <Store
                  listData={listData}
                  handlCallBackFunction={handlCallBackFunction}
                  type={"manufacturer"}
                />
              </Stack>
            </Stack>
          </CompanyFacilityContainer>
        )}

        {businessType?.name === "Agents and Representatives" && (
          <CompanyFacilityContainer sx={{ padding: "0px" }}>
            <Stack sx={{ gap: "18px" }}>
              <AgentandRepresentStore />
            </Stack>
          </CompanyFacilityContainer>
        )}
        {businessType?.name === "Distributors" && (
          <CompanyFacilityContainer sx={{ padding: "0px" }}>
            <Stack sx={{ gap: "18px" }}>
              <RetailerFactory
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"distributor"}
              />
              <WareHouseCommom
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"distributor"}
              />
              <RetailerStore
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"distributor"}
              />
            </Stack>
          </CompanyFacilityContainer>
        )}
        {businessType?.name === "Retailers" && (
          <CompanyFacilityContainer sx={{ padding: "0px" }}>
            <Stack sx={{ gap: "18px" }}>
              <RetailerFactory
                listData={listData}
                type={"retailer"}
                handlCallBackFunction={handlCallBackFunction}
              />
              <WareHouseCommom
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"retailer"}
              />
              <RetailerStore
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"retailer"}
              />
            </Stack>
          </CompanyFacilityContainer>
        )}
        {businessType?.name === "Wholesalers" && (
          <CompanyFacilityContainer sx={{ padding: "0px" }}>
            <Stack sx={{ gap: "18px" }}>
              <RetailerFactory
                listData={listData}
                type={"wholesaler"}
                handlCallBackFunction={handlCallBackFunction}
              />
              <WareHouseCommom
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"wholesaler"}
              />
              <RetailerStore
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"wholesaler"}
              />
            </Stack>
          </CompanyFacilityContainer>
        )}
        {businessType?.name === "Resellers" && (
          <CompanyFacilityContainer sx={{ padding: "0px" }}>
            <Stack sx={{ gap: "18px" }}>
              <RetailerFactory
                listData={listData}
                type={"reseller"}
                handlCallBackFunction={handlCallBackFunction}
              />
              <WareHouseCommom
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"reseller"}
              />
              <RetailerStore
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"reseller"}
              />
            </Stack>
          </CompanyFacilityContainer>
        )}
        {businessType?.name === "Others" && (
          <CompanyFacilityContainer sx={{ padding: "0px" }}>
            <Stack sx={{ gap: "18px" }}>
              <RetailerFactory
                listData={listData}
                type={"other"}
                handlCallBackFunction={handlCallBackFunction}
              />
              <WareHouseCommom
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"other"}
              />
              <RetailerStore
                listData={listData}
                handlCallBackFunction={handlCallBackFunction}
                type={"other"}
              />
            </Stack>
          </CompanyFacilityContainer>
        )}
      </Stack>
    </OuterContainer>
  );
};

export default FactoryInventoryDetail;
