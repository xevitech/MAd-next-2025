import React, { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VerticalTabs from "./VerticalTabs";
import { OuterContainer, InnerContainer, AccountBox } from "./style";
import { MyAppContext } from "contextApi/appContext";
import { ProfileHeader } from "../common/profileheader";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import EnhancedEncryptionOutlinedIcon from "@mui/icons-material/EnhancedEncryptionOutlined";
import { AccountContextProvider } from "@/contextApi/accountContext";
import NoDataFound from "../common/NoDataFound";
import { AccessDenied } from "../common/AccessDenied";
import { Grid, styled } from "@mui/material";
import Head from "next/head";
import DeleteAccount from "../common/DeleteAlert/DeleteAccount";
import { useSelector } from "react-redux";
import { setdeleteAccount } from "@/hooks/appReducers";
import { useAppDispatch } from "redux/store";
import Dashboard from "pages/dashboard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 2,
            "@media screen and (max-width:600px)": {
              p: 1,
            },
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Accountsetting() {
  const [value, setValue] = React.useState(0);
  const { breakPoints, role } = useContext(MyAppContext);
  const { deleteAccount } = useSelector((state: any) => state.userData);
  const dispatch = useAppDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    dispatch(setdeleteAccount(false));
  };

  const Fonts = styled(Tab)(() => ({
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "none",
    minHeight: "31px",
    "&.MuiButtonBase-root.MuiTab-root.Mui-selected": {
      color: "#1B1A1A",
      "&.MuiButtonBase-root.MuiTab-root.Mui-selected>.MuiTab-iconWrapper": {
        color: "#D7282F",
      },
      "&.MuiButtonBase-root-MuiTab-root": {
        color: "#4E4E4E",
      },
    },
  }));

  return (
    <>
      <Head>
        <title>Preferences | Merchant AD</title>
      </Head>

      <AccountContextProvider>
        <>
          {
            <DeleteAccount
              open={deleteAccount}
              handleClose={handleClose}
              text={""}
              onClickAction={""}
              loading={""}
              componentText={""}
            />
          }
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
            <div
              className="full_page"
              style={{
                justifyContent: "space-between",
                paddingTop: "5px",
                minHeight: "calc(100vh + 64px)",
              }}
            >
              <OuterContainer>
                <Box sx={{ background: "" }}>
                  <ProfileHeader text={"Account Settings"} />
                  <InnerContainer>
                    <Box>
                      <Box className="AllModulesTable">
                        <AccountBox>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            variant="scrollable"
                            sx={{
                              padding: "13px 0px 0px",
                              minHeight: "60px",
                              "& .MuiTabs-indicator": {
                                backgroundColor: "#D7282F",
                              },
                            }}
                          >
                            <Fonts
                              icon={
                                <LanguageOutlinedIcon
                                  sx={{ width: "20px", height: "20px" }}
                                />
                              }
                              iconPosition="start"
                              label="Account Preferences"
                            />
                            {/* <Fonts
                              icon={
                                <NotificationsActiveOutlinedIcon
                                  sx={{ width: "20px", height: "20px" }}
                                />
                              }
                              iconPosition="start"
                              label="Alert Preferences"
                            />
                            <Fonts
                              icon={
                                <DraftsOutlinedIcon
                                  sx={{ width: "20px", height: "20px" }}
                                />
                              }
                              iconPosition="start"
                              label="Email Preferences"
                            />
                            <Fonts
                              icon={
                                <EnhancedEncryptionOutlinedIcon
                                  sx={{ width: "20px", height: "20px" }}
                                />
                              }
                              iconPosition="start"
                              label="Privacy Settings"
                            /> */}
                          </Tabs>
                        </AccountBox>
                        <TabPanel value={value} index={0}>
                          <VerticalTabs />
                        </TabPanel>
                        {/* <TabPanel value={value} index={1}>
                          <NoDataFound />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                          <NoDataFound />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                          <NoDataFound />
                        </TabPanel> */}
                      </Box>
                    </Box>
                  </InnerContainer>
                </Box>
              </OuterContainer>
            </div>
          )}
        </>
      </AccountContextProvider>
    </>
  );
}
