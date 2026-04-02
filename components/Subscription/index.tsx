import { ProfileHeader } from "@/components/common/profileheader";
import BillingInfo from "@/components/Subscription/Components/Billing/BillingInfo";
import Invoice from "@/components/Subscription/Components/Invoice/Invoice";
import Payment from "@/components/Subscription/Components/Payment/Payment";
import Summary from "@/components/Subscription/Components/PlanSummary/Summary";
import {
  SubscriptionContainer,
  TabStyle,
  WhiteBox
} from "@/components/Subscription/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
            <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
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

          </Grid>
        </WhiteBox>)}
      </Box>

    </>
  );
}

export default Subscription;
