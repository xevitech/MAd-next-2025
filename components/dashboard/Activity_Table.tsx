import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Grid from "@mui/material/Grid";
import { DataGridStyle } from "../common/commonStyle";
import {
  Button,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import router from "next/router";
import EmptyPage from "../common/EmptyPage";
import { Card } from "./style";
import { useSelector } from "react-redux";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { apiClient } from "../common/common";
import { ActivityList } from "./ActivityList";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
export default function ActivityTable() {
  const { role } = useSelector((state: any) => state.userData);
  const Tabtext = styled(Tab)(() => ({
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "21.79px",
    fontFamily: "open sans",
    textTransform: "none",
    "@media screen and (max-width:767px)": {
      fontSize: "14px",
      minHeight: "22px",
    },
  }));
  const Celltext = styled(TableCell)(() => ({
    fontWeight: "400",
    fontSize: "15px",
    fontFamily: "open sans",
    textTransform: "none",
    color: "#7B7979",
    padding: "7px 0",
  }));

  const Img = styled("img")(() => ({
    marginLeft: "10px",
  }));

  const Headingbox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }));

  const Heading = styled(Typography)(() => ({
    fontFamily: "open sans",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "21.79px",
  }));

  const Numberbox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
  }));

  const Number = styled(Typography)(() => ({
    fontFamily: "open sans",
    fontWeight: "600",
    fontSize: "35px",
    lineHeight: "47.66px",
    color: "#565656",
  }));

  const SubNumber = styled(Typography)(() => ({
    fontFamily: "open sans",
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "14.98px",
    background: "#E7FFED",
    color: "#3BB900",
    marginLeft: "10px",
  }));

  const Text = styled(Typography)(() => ({
    fontFamily: "open sans",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "17.7px",
    color: "#7B7979",
  }));
  const [listItem, setListItem] = useState<any>([]);
  const [selectItem, setSelectedItem] = useState<any>([]);
  const [activitydata, setActivityData] = useState<any>([]);
  const [sellerData, setsellerData] = useState<any>();
  const [splicedata, setSpliceData] = useState<any>([]);
  const [productData, setProductData] = useState<any>();
  useEffect(() => {
    getNavigationList();
    getActivitiesData();
    getseller();
    getProduct();
  }, []);
  const { user_info } = useSelector((state: any) => state.userData);
  const getNavigationList = async () => {
    const response = await apiClient("activities/list", "get");
    if (response.status) {
      const data = response.data;
      setListItem(
        data.map((element: any) => ({
          ...element,
          parent: element.parent.map((v) => ({ ...v, expanded: true })),
          expanded: true,
        }))
      );

      setSelectedItem(
        data
          .map((element) => {
            if (element.parent.length > 0) {
              return element.parent.map((v) => v.type);
            } else {
              return element.type;
            }
          })
          .flat()
      );
    }
  };
  const getseller = async () => {
    const response = await apiClient("front/view_data?type=seller", "get");
    if (response.status) {
      const data = response.data;
      setsellerData(data);
    }
  };
  const getProduct = async () => {
    const response = await apiClient("front/view_data?type=product", "get");
    if (response.status) {
      const data = response.data;
      setProductData(data);
    }
  };
  const getActivitiesData = async () => {
    const response = await apiClient(
      `activities/recent?accountType=${user_info?.type}`,
      "get"
    );
    if (response.status) {
      const data = response.data;
      data.map((element) => {
        element.history.forEach((item) => {
          listItem.find((ele) => {
            if (ele.type == item.type) {
              (item.icon = ele.icon), (item.color_code = ele.color_code);
              (item.name = ele.name), (item.expanded = ele.expanded);
            }
          });
          return item;
        });
        return;
      });
      setActivityData(data);
      setSpliceData(data.slice(0, 2));
    }
  };

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
          <Box sx={{ padding: "4px 15px 15px 15px" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getseller();
    getActivitiesData();
    getProduct();
  };

  const dummyColumns = [
    { field: "from_user_id", headerName: "User ID", width: 150 },
    { field: "from_user_name", headerName: "User Name", width: 200 },
    { field: "data_viewed", headerName: "Data Viewed", width: 150 },
  ];
  let dummyColumns2 = [
    { field: "id", headerName: "Sr. No.", width: 150 },
    { field: "total_view_count", headerName: "User ID", minidth: 150, flex: 1 },
    { field: "name", headerName: "PRODUCT NAME", minidth: 200, flex: 1 },
    {
      field: "unique_number",
      headerName: "UNIQUE NUMBER",
      minwidth: 200,
      flex: 1,
    },
  ];

  return (
    <>
      <Grid container spacing={1.5} alignItems="stretch" sx={{ mt: 0.4 }}>
        <Grid item xs={12} sm={12}>
          <Card
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0px",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                // scrollButtons
                // allowScrollButtonsMobile
                aria-label="basic tabs example"
                sx={{
                  "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
                    color: "#D7282F",
                    "& i:before": {
                      color: "#D7282F",
                    },
                  },
                  "& .MuiTabs-indicator": { backgroundColor: "#D7282F" },
                }}
              >
                {role == "buyer" && (
                  <Tabtext
                    icon={<PersonAddAltOutlinedIcon />}
                    iconPosition="start"
                    label="Viewed Seller"
                  />
                )}
                {role == "buyer" && (
                  <Tabtext
                    icon={
                      <i
                        className="icon-view-product"
                        style={{ fontWeight: "bold" }}
                      ></i>
                    }
                    iconPosition="start"
                    label="Viewed Products"
                  />
                )}

                <Tabtext
                  icon={<AccessTimeOutlinedIcon />}
                  iconPosition="start"
                  label="Activities"
                />
              </Tabs>
            </Box>

            <Box>
              {role == "buyer" && (
                <TabPanel value={value} index={0}>
                  {sellerData?.lenght > 0 ? (
                    <DataGridPro
                      style={{
                        border: "none",
                        display: "flex",
                        justifyContent: "right",
                        height: "400px",
                      }}
                      rows={sellerData}
                      getRowId={(row) => row.from_user_id}
                      columns={dummyColumns}
                      sx={DataGridStyle}
                    />
                  ) : (
                    <EmptyPage
                      text={"Seller"}
                      logo={"/assets/viewed_seller.svg"}
                      usertype="buyer"
                      onClickHandler={() => {}}
                    />
                  )}
                </TabPanel>
              )}

              <TabPanel
                value={value}
                index={role == "seller" || role == "subuser" ? 0 : 2}
              >
                <ActivityList
                  selectItem={activitydata}
                  splicedata={splicedata}
                />
                {activitydata?.length > 2 && (
                  <Typography
                    sx={{
                      color: "rgb(215, 40, 47)",
                      padding: "22px, 12px, 22px, 12px",
                      cursor: "pointer",
                    }}
                    onClick={() => router.push("/recentactivity")}
                  >
                    {" "}
                    All Activities{" "}
                  </Typography>
                )}
              </TabPanel>

              {role == "buyer" && (
                <TabPanel value={value} index={1}>
                  <Box>
                    {productData?.length > 0 ? (
                      <DataGridPro
                        style={{
                          border: "none",
                          display: "flex",
                          justifyContent: "right",
                          height: "400px",
                        }}
                        rows={productData}
                        columns={dummyColumns2}
                        getRowId={(row) => row.id}
                        pageSize={10}
                        sx={DataGridStyle}
                      />
                    ) : (
                      <EmptyPage
                        text={"Products"}
                        usertype="buyer"
                        logo={"/assets/viewed_products (2).svg"}
                        onClickHandler={() => {}}
                      />
                    )}
                  </Box>
                </TabPanel>
              )}
            </Box>
          </Card>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Card sx={{ borderRadius: "6px", p: 2, pl: 3 }}>
            <Headingbox>
              <Heading>Most Sales in Countries</Heading>
              <Button>
                {" "}
                <MoreVertOutlinedIcon sx={{ color: "#7B7979" }} />{" "}
              </Button>
            </Headingbox>

            <Numberbox>
              <Number>22,842</Number>
              <SubNumber>+43%</SubNumber>
            </Numberbox>
            <Text>Sales Last 90 Days</Text>
            <Divider sx={{ mt: 3 }} />
            <Box>
              <TableContainer
                sx={{
                  height: 220,
                }}
              >
                <Table
                  sx={{
                    height: "max-content",
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <Celltext>Australia</Celltext>
                      <Celltext>18,879</Celltext>
                      <Celltext>
                        15%
                        <Img src="assets/downn.svg" alt="" />
                      </Celltext>
                    </TableRow>
                    <TableRow>
                      <Celltext>Canada</Celltext>
                      <Celltext>10,357</Celltext>
                      <Celltext>
                        15%
                        <Img src="assets/upp.svg" alt="" />
                      </Celltext>
                    </TableRow>
                    <TableRow>
                      <Celltext>China</Celltext>
                      <Celltext>4860</Celltext>
                      <Celltext>
                        15%
                        <Img src="assets/downn.svg" alt="" />
                      </Celltext>
                    </TableRow>
                    <TableRow>
                      <Celltext>India</Celltext>
                      <Celltext>28,769</Celltext>
                      <Celltext>
                        15%
                        <Img src="assets/downn.svg" alt="" />
                      </Celltext>
                    </TableRow>
                    <TableRow>
                      <Celltext>Japan</Celltext>
                      <Celltext>15,286</Celltext>
                      <Celltext>
                        15%
                        <Img src="assets/upp.svg" alt="" />
                      </Celltext>
                    </TableRow>
                    <TableRow>
                      <Celltext>Brazil</Celltext>
                      <Celltext>1,50,000</Celltext>
                      <Celltext>
                        15%
                        <Img src="assets/upp.svg" alt="" />
                      </Celltext>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </Grid> */}
      </Grid>
    </>
  );
}
