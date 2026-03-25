import React, { useContext, useEffect, useState } from "react";
import { MyAppContext } from "@/contextApi/appContext";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SetPricingRules from "./SetPricingRules";
import DiscountLevels from "./DiscountLevels";
import GeneralSettings from "./GeneralSettings";
import { ProfileHeader } from "../common/profileheader";
import { apiClient } from "../common/common";
import { AccessDenied } from "../common/AccessDenied";
import {
  BoxContainer,
  BoxHeader,
  PricingContainer,
  TabListStyle,
  TabPanelStyle,
  Tabstyling,
} from "./style";
import Head from "next/head";
import Dashboard from "pages/dashboard";

const PricingSettings = () => {
  const { setCompleteScreenLoader, role } = useContext(MyAppContext);
  setCompleteScreenLoader(false);
  const [value, setValue] = React.useState("1");
  const [priceDetail, setPriceDetail] = React.useState<any>({});
  const [unitList, setUnitList] = React.useState<any>([]);
  const [discountLoader, setDiscountLoader] = useState<boolean>(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    FetchRuleDetails();
    FetchUnitList();
  }, [value]);

  const FetchRuleDetails = async () => {
    setDiscountLoader(true);
    let response = await apiClient("users/rule/setup/list", "get");
    if (response.status == 200) {
      setPriceDetail({
        shown: response.shown,
        hidden: response.hidden,
        min_qty: response.min_qty,
        min_val: response.min_val,
        min_max: response.min_max,
        min: response.min,
        max: response.max,
        unit: response.unit,
        discount_level: response.discount_level,
        min_qty_status: response.min_qty_status,
        min_val_status: response.min_val_status,
      });
    }
    setDiscountLoader(false);
  };
  const FetchUnitList = async () => {
    let response: any = await apiClient("unit", "get");
    if (response.status === 200) setUnitList(response.data);
  };

  return (
    <>
      <Head>
        <title>Rules | Merchant AD</title>
      </Head>
      {role == "buyer" ? (
        <div className="full_page">
          <Dashboard />
          {/* <AccessDenied /> */}
        </div>
      ) : (
        <div className="full_page set_rules">
          <PricingContainer>
            <BoxHeader>
              <ProfileHeader text={"Set Rules"} />
            </BoxHeader>

            <BoxContainer>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "#D7282F",
                        padding: "0",
                        height: "3px",
                      },
                    }}
                    sx={TabListStyle}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Set Pricing Rules" value="1" sx={Tabstyling} />
                    <Tab label="Discount Levels" value="2" sx={Tabstyling} />
                    <Tab label="General Settings" value="3" sx={Tabstyling} />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={TabListStyle}>
                  <SetPricingRules priceDetail={priceDetail} />
                </TabPanel>
                <TabPanel value="2" sx={TabListStyle}>
                  <DiscountLevels
                    priceDetail={priceDetail}
                    discountLoader={discountLoader}
                  />
                </TabPanel>
                <TabPanel value="3" sx={TabPanelStyle}>
                  <GeneralSettings
                    priceDetail={priceDetail}
                    unitList={unitList}
                  />
                </TabPanel>
              </TabContext>
            </BoxContainer>
          </PricingContainer>
        </div>
      )}
    </>
  );
};
export default PricingSettings;
