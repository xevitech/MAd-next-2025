import { Box, Grid, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProfileHeader } from "@/components/common/profileheader";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  WhiteBox,
  TabStyle,
  SubscriptionContainer,
  StarBox,
  AdsText,
  AllText,
  QualityAndAssurance,
  Product,
  Mainbox2,
  SecondAdsText,
  EnlargViewAndLeads,
  Over,
  TextBox,
  Mapp,
  Ellipse,
  EllipseImage,
  Heximage,
  Imageforadsone,
  UpgradeBtn,
  NewMainbox,
} from "@/components/Subscription/styles";
import Summary from "@/components/Subscription/Components/PlanSummary/Summary";
import Payment from "@/components/Subscription/Components/Payment/Payment";
import Invoice from "@/components/Subscription/Components/Invoice/Invoice";
import BillingInfo from "@/components/Subscription/Components/Billing/BillingInfo";
import { BtnFilled } from "../common/buttons/ButtonsVariations";
import { useRouter } from "next/router";
import Head from "next/head";
import SkeletonSubscription from "./SkeletonSubscription";

function Subscription() {
  const [informationType, setInformationType] = useState<string>("1");
  const router = useRouter();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  return (
    <>
      <Head>
        <title>My Subscription | Merchant AD</title>
      </Head>

      <Box className='full_page'>
        <ProfileHeader text={"Subscription Information"} />
        {loading ? (<Box><SkeletonSubscription /></Box>) : (<WhiteBox sx={{ width: "100%", typography: "body1" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} xl={9} lg={12}>
              <SubscriptionContainer>
                <TabContext value={informationType}>
                  <TabStyle
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      fontFamily: "open sans",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TabList
                      TabIndicatorProps={{
                        style: { background: "#DD484E" },
                      }}
                      onChange={(e, value) => setInformationType(value)}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        style={{
                          textTransform: "none",
                          color: informationType == "1" ? "#DD484E" : "black",
                        }}
                        label={"Subscription Summary"}
                        value={"1"}
                        icon={<MailOutlineIcon style={{ fontSize: "20px" }} />}
                        iconPosition="start"
                      />
                      <Tab
                        style={{
                          textTransform: "none",
                          color: informationType == "3" ? "#DD484E" : "black",
                        }}
                        label={"Payment"}
                        value={"3"}
                        icon={<CreditCardIcon style={{ fontSize: "20px" }} />}
                        iconPosition="start"
                      />
                    </TabList>
                  </TabStyle>

                  <TabPanel
                    style={{
                      textTransform: "none",
                      padding: "0px",
                      paddingTop: "12px",
                    }}
                    value={`1`}
                  >
                    <Summary />
                  </TabPanel>
                  <TabPanel
                    style={{
                      textTransform: "none",
                      padding: "0px",
                      paddingTop: "30px",
                    }}
                    value={`2`}
                  >
                    <BillingInfo />
                  </TabPanel>
                  <TabPanel
                    style={{
                      textTransform: "none",
                      padding: "0px",
                      paddingTop: "30px",
                    }}
                    value={`3`}
                  >
                    <Payment />
                  </TabPanel>
                  <TabPanel
                    style={{
                      textTransform: "none",
                      padding: "0px",
                      paddingTop: "30px",
                    }}
                    value={`4`}
                  >
                    <Invoice />
                  </TabPanel>
                </TabContext>
              </SubscriptionContainer>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
              {/* ads starts from here */}
              <NewMainbox>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <img src="/assets/adsimg.svg" alt="" />
                </Box>
                <Box>
                  <AdsText>
                    <AllText>
                      Add <QualityAndAssurance>quality</QualityAndAssurance> and{" "}
                      <QualityAndAssurance>assurance</QualityAndAssurance> tags
                      to your <Product>product.</Product>
                    </AllText>
                  </AdsText>
                </Box>
                <Box>
                  <Imageforadsone src="/assets/groupforads.svg" alt="" />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                    paddingBottom: "20px",
                  }}
                >
                  <UpgradeBtn onClick={() => router.push("/plancards")}>
                    Upgrade Now
                  </UpgradeBtn>
                </Box>
              </NewMainbox>
              {/* ads ends here */}

              {/* ad two */}
              <Mainbox2>
                <StarBox>
                  <img src="/assets/adsimg.svg" alt="" />
                </StarBox>
                <TextBox>
                  <SecondAdsText>
                    Get noticed first with{" "}
                    <EnlargViewAndLeads>enlarged View</EnlargViewAndLeads> and
                    get edge
                    <Over> over </Over>{" "}
                    <EnlargViewAndLeads>leads.</EnlargViewAndLeads>
                  </SecondAdsText>
                </TextBox>
                <Box position={"relative"}>
                  <Mapp src="/assets/mapads2.svg" alt="" />
                  <Ellipse src="/assets/Ellipse 37.svg" alt="" />
                  <EllipseImage src="/assets/ellipseimage.svg" alt="" />
                  <Heximage src="/assets/adshexa.svg" alt="" />
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "43px",
                      color: "#fff",
                      left: "35px",
                    }}
                  >
                    Only <br></br>$125
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center" mt={20}>
                  <BtnFilled onClick={() => router.push("/plancards")}>
                    Upgrade Now
                  </BtnFilled>
                </Box>
              </Mainbox2>
            </Grid>
          </Grid>
        </WhiteBox>)}
      </Box>

    </>
  );
}

export default Subscription;
