import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EmptyPage from "../common/EmptyPage";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import DataTable from "./DataTable";
import { ProductCard, EmptyPageOuter } from "./style";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { styled } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import BrandLists from "../CompanySettings/CompanyDetail/BrandsLists";
import MyCategoriesList from "../SellerTools/MyCategoriesList";

export const Tabtext = styled(Tab)(() => ({
  fontWeight: "400",
  fontSize: "16px !important",
  fontFamily: "open sans",
  textTransform: "none",
  whiteSpace: "nowrap",
  "@media screen and (max-width: 840px)": {
    fontSize: "14px !important",
    width: "auto !important",
    minHeight: "45px",
    fontWeight: "600",
  },
  "& svg": {
    "@media screen and (max-width: 840px)": {
      fontSize: "18px",
    },
  },
}));

export const styles = {
  headline: {
    width: "20%",
    color: "#000",
  },
  emptytable: {
    padding: "2rem",
  },
};

function TabPanel(props: any) {
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
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ProductInfoTable() {
  const [value, setValue] = React.useState(0);
  const { role } = useSelector((state: any) => state.userData);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  const router = useRouter();
  const NavigateHandler = (route) => router.push(route);
  return (
    <>
      <Grid container sx={{ mt: 2, width: "100%" }}>
        <Grid item xs={12} lg={12} xl={12}>
          <ProductCard>
            {role == "seller" && (
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons={false}
                  aria-label="basic tabs example"
                  sx={{
                    "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
                      color: "#D7282F !important",
                    },
                    "& .MuiTabs-indicator": { backgroundColor: "#D7282F" },
                    "@media screen and (max-width: 840px)": {
                      "& .MuiTabs-scrollButtons": {
                        display: "flex !important",
                      },
                    },
                  }}
                >
                  <Tabtext
                    style={styles.headline}
                    icon={<PersonAddAltOutlinedIcon></PersonAddAltOutlinedIcon>}
                    iconPosition="start"
                    label="Products"
                  />

                  <Tabtext
                    style={styles.headline}
                    icon={<BrandingWatermarkIcon />}
                    iconPosition="start"
                    label="Brands"
                  />

                  <Tabtext
                    style={styles.headline}
                    icon={<CategoryIcon />}
                    iconPosition="start"
                    label="Categories"
                  />
                </Tabs>
              </Box>
            )}
            {role == "buyer" && (
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="basic tabs example"
                  sx={{
                    "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
                      color: "#D7282F !important",
                      "& i:before": {
                        color: "#d7282f",
                      },
                    },
                    "& .MuiTabs-indicator": { backgroundColor: "#D7282F" },
                    "@media screen and (max-width: 840px)": {
                      "& .MuiTabs-scrollButtons": {
                        display: "flex !important",
                      },
                    },
                  }}
                >
                  <Tabtext
                    style={styles.headline}
                    icon={<i className="icon-das-no-rfq"></i>}
                    iconPosition="start"
                    label="RFQs"
                  />
                  <Tabtext
                    style={styles.headline}
                    icon={<QuestionMarkIcon />}
                    iconPosition="start"
                    label="Enquiries "
                  />
                  <Tabtext
                    style={styles.headline}
                    icon={<i className="icon-das-no-invoice"></i>}
                    iconPosition="start"
                    label="Order and Invoice"
                  />
                  <Tabtext
                    style={styles.headline}
                    icon={<i className="icon-das-no-quotation"></i>}
                    iconPosition="start"
                    label="Quotations"
                  />
                </Tabs>
              </Box>
            )}
            {role == "seller" && (
              <>
                <TabPanel value={value} index={0}>
                  <DataTable />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <BrandLists />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <MyCategoriesList />
                </TabPanel>
              </>
            )}
            {role == "buyer" && (
              <>
                <TabPanel value={value} index={0}>
                  <EmptyPageOuter>
                    <EmptyPage
                      text={"RFQs"}
                      logo="/assets/images/das-no-rfq.svg"
                      onClickHandler={() => NavigateHandler("/rfq")}
                    ></EmptyPage>
                  </EmptyPageOuter>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <EmptyPageOuter>
                    <EmptyPage
                      text={"Enquiries"}
                      logo="/assets/images/das-enquiries.svg"
                      onClickHandler={() => {}}
                    ></EmptyPage>
                  </EmptyPageOuter>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <EmptyPageOuter>
                    <EmptyPage
                      text={"Order and Invoice"}
                      logo="/assets/images/das-no-invoice.svg"
                      onClickHandler={() => {}}
                    ></EmptyPage>
                  </EmptyPageOuter>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <EmptyPageOuter>
                    <EmptyPage
                      text={"Quotations"}
                      logo="/assets/images/das-no-quotation.svg"
                      onClickHandler={() => {}}
                    ></EmptyPage>
                  </EmptyPageOuter>
                </TabPanel>
              </>
            )}
          </ProductCard>
        </Grid>
      </Grid>
    </>
  );
}
