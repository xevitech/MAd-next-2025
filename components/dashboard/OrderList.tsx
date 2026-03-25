import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Box from "@mui/material/Box";
import { ButtonBase, Divider, Tooltip, styled } from "@mui/material";
import { Card, Cellbtn } from "./style";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGridPro } from "@mui/x-data-grid-pro";
import router from "next/router";
import { DataGridStyle } from "../common/commonStyle";
import EmptyPage from "../common/EmptyPage";
const Heading = styled(Typography)(() => ({
  fontSize: "21px",
  fontWeight: "600",
  color: "#231F20",
  fontFamily: "open sans",
  lineHeight: "28.6px",
}));

const SubHeading = styled(Typography)(() => ({
  fontSize: "12px",
  fontWeight: "400",
  color: "#7B7979",
  fontFamily: "open sans",
  lineHeight: "17.7px",
  marginTop: "5px",
  marginBottom: "10px",
}));

const Celltext = styled(Typography)(() => ({
  fontFamily: "open sans",
  fontWeight: "400",
  fontSize: "13px",
  color: "#231F20",
  lineHeight: "17.7px",
}));

const Cellheading = styled(Typography)(() => ({
  fontFamily: "open sans",
  fontWeight: "600",
  fontSize: "14px",
  color: "#1A2027",
  lineHeight: "19.07px",
  textTransform: "uppercase",
}));
const Admin = styled(Typography)(() => ({
  width: "74px",
  height: "33px",
  borderTopLeftRadius: "6px",
  borderBottomRightRadius: "6px",
  color: "#FFFFFF",
  backgroundColor: "#44D600",
  textAlign: "center",
  alignItems: "center",
  display: "grid",
}));

const Secondboxheading = styled(Typography)(() => ({
  fontFamily: "open sans",
  fontWeight: "700",
  fontSize: "24px",
  lineHeight: "32.68px",
  color: "#223354",
}));

const Secondboxsubheading = styled(Typography)(() => ({
  fontFamily: "open sans",
  fontWeight: "400",
  fontSize: "15px",
  color: "#7B7979",
  padding: "4px 25px 0 0px",
}));

const Btn2 = styled(ButtonBase)(() => ({
  width: "134px",
  height: "44px",
  border: "1px solid #1A75FF",
  borderRadius: "6px",
  color: "#1A75FF",
  padding: "22px",
  marginTop: "23px",
  fontWeight: "700",
  transition: "ease-in .3s",
  "&:hover": {
    background: "#1A75FF",
    color: "#fff",
    border: `1px solid "#1A75FF"}`,
  },
}));
const SecondimagedBox = styled(Box)(() => ({
  backgroundColor: "#FFFFFF",
  backgroundImage: "url(/assets/chat.png)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right center",
  borderRadius: "6px",
  marginRight: "15px",
  "@media screen and (max-width: 1400px)": {
    backgroundSize: "90px !important",
    backgroundPositionY: "75px",
  },
  "@media screen and (max-width: 1700px)": {
    backgroundSize: "90px !important",
    backgroundPositionY: "75px",
  },
  "@media (min-width:900px) and (max-width:1200px)": {
    backgroundSize: "90px !important",
  },
  "@media screen and (max-width:350px)": {
    backgroundSize: "80px !important",
  },
}));
const columns = [
  {
    field: "orderid",
    headerName: "ORDER ID",
    width: 100,
    flex: 1,
    renderHeader: (params) => {
      return <Cellheading>{params?.colDef?.headerName}</Cellheading>;
    },
    renderCell: (cellValues) => {
      return (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></div>
          <Celltext>{cellValues.value}</Celltext>
        </>
      );
    },
  },

  {
    field: "productName",
    headerName: "PRODUCT NAME/IMAGE",
    width: 450,
    flex: 1,
    renderHeader: (params) => {
      return (
        <Cellheading
          style={{
            boxSizing: "unset",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Tooltip title="PRODUCT NAME/IMAGE" placement="bottom">
            {params?.colDef?.headerName}
          </Tooltip>
        </Cellheading>
      );
    },
    renderCell: (cellValues) => {
      return (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></div>
          <Celltext style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {cellValues.value}
          </Celltext>
        </>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderHeader: (params) => {
      return (
        <Cellheading
          style={{
            boxSizing: "unset",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {params?.colDef?.headerName}
        </Cellheading>
      );
    },
    renderCell: (params) => {
      return (
        <>
          <Cellbtn
            style={{
              color: `${
                params.value == "1"
                  ? "#3BB900"
                  : params.value == "0"
                  ? "#F5B225"
                  : "#D7282F"
              }`,

              border: `${
                params.value == "1"
                  ? "transparent"
                  : params.value == "0"
                  ? "transparent"
                  : "transparent"
              }`,
              background: `${
                params.value == "1"
                  ? "#ECFBE6"
                  : params.value == "0"
                  ? "#FFF4DD"
                  : "#FFE1E2"
              }`,
            }}
          >
            {params.value == 1
              ? "Delivered"
              : params.value == 0
              ? "Shipped"
              : "Cancel"}
          </Cellbtn>
        </>
      );
    },
  },

  {
    field: "price",
    headerName: "PRICE",
    width: 90,
    flex: 1,
    renderHeader: (params) => {
      return (
        <Cellheading style={{ boxSizing: "unset" }}>
          {params?.colDef?.headerName}
        </Cellheading>
      );
    },
    renderCell: (cellValues) => {
      return (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></div>
          <Celltext>{cellValues.value}</Celltext>
        </>
      );
    },
  },

  {
    field: "date",
    headerName: "DATE",
    width: 90,
    flex: 1,
    renderHeader: (params) => {
      return (
        <Cellheading style={{ boxSizing: "unset" }}>
          {params?.colDef?.headerName}
        </Cellheading>
      );
    },
    renderCell: (cellValues) => {
      return (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></div>
          <Celltext>{cellValues.value}</Celltext>
        </>
      );
    },
  },

  {
    field: "action",
    headerName: "ACTION",
    flex: 1,
    renderHeader: (params) => {
      return (
        <Cellheading style={{ boxSizing: "unset" }}>
          {params?.colDef?.headerName}
        </Cellheading>
      );
    },
    renderCell: (cellValues) => {
      return (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DeleteOutlineIcon
              sx={{
                color: "#d7282f",
                fontSize: "20px",
                margin: "0 0 0 10px",
                cursor: "pointer",
              }}
            />
          </div>
          <Celltext>{cellValues.value}</Celltext>
        </>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    orderid: "#52140300",
    productName: "Turbine180kVA2",
    status: "Delivered",
    price: "$1880",
    date: "5/12/2016",
    action: "",
  },
  {
    id: 2,
    orderid: "#52140300",
    productName: "Genset180kVA2",
    status: "Cancel",
    price: "$1880",
    date: "5/12/2016",
    action: "",
  },
  {
    id: 3,
    orderid: "#52140300",
    productName: "Gas Turbine180kVA2",
    status: "Shipped",
    price: "$1880",
    date: "5/12/2016",
    action: "",
  },
  {
    id: 4,
    orderid: "#52140300",
    productName: "Motork45VA2",
    status: "Delivered",
    price: "$1880",
    date: "5/12/2016",
    action: "",
  },
  {
    id: 5,
    orderid: "#52140300",
    productName: "Turbine180kVA2",
    status: "Cancel",
    price: "$1880",
    date: "5/12/2016",
    action: "",
  },
  {
    id: 6,
    orderid: "#52140300",
    productName: "Genset180kVA2",
    status: "Shipped",
    price: "$1880",
    date: "5/12/2016",
    action: "",
  },
  {
    id: 7,
    orderid: "#52140300",
    productName: "Di Pipes",
    status: "Delivered",
    price: "$1880",
    date: "5/12/2016",
    action: "",
  },
];

const ImagedBox = styled(Box)(() => ({
  backgroundColor: "#242E6F",
  backgroundImage: "url(../assets/cash.png)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  borderRadius: "6px",
  "@media screen and (max-width: 1400px)": {
    backgroundSize: "130px !important",
  },
  "@media (min-width:900px) and (max-width:1200px)": {
    backgroundSize: "90px !important",
  },
  "@media (min-width:1201px) and (max-width:1399px)": {
    backgroundSize: "110px !important",
  },
}));

const Boxheading = styled(Box)(() => ({
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: "27px",
  lineHeight: "39.49px",
  fontFamily: "open sans",
  marginBottom: "10px",
}));

const Boxsubheading = styled(Box)(() => ({
  color: "#FFFFFF",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "18.52px",
  fontFamily: "open sans",
}));

const Btn = styled(ButtonBase)(() => ({
  width: "120px",
  height: "28px",
  borderRadius: "6px",
  color: "#FFFFFF",
  backgroundColor: "#1A75FF",
  padding: "22px, 12px, 22px, 12px",
  marginTop: "23px",
  fontWeight: 700,
}));

export default function Orderlist() {
  const [orderList, SetOrderList] = useState<any>([]);
  return (
    <>
      <Grid container spacing={1.5} sx={{ mt: 0.4 }}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Card style={{ height: 490, padding: "15px" }}>
            <Heading>Order List</Heading>
            <SubHeading>
              User with complete profiles receive quicker responses to
              inquiries.
            </SubHeading>
            <Divider />
            {orderList?.length > 0 ? (
              <>
                {" "}
                <DataGridPro
                  style={{
                    border: "none",
                    display: "flex",
                    justifyContent: "right",
                    height: "400px",
                  }}
                  rows={rows}
                  columns={columns}
                  checkboxSelection
                  pagination
                  pageSize={10}
                  sx={DataGridStyle}
                />{" "}
              </>
            ) : (
              <EmptyPage
                text={"Order List"}
                logo={"/assets/images/No Orrder List.svg"}
                onClickHandler={() => {}}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Stack spacing={3}>
            <ImagedBox style={{ padding: "7.5px", minHeight: "230px" }}>
              <Box sx={{ p: 2 }}>
                <Boxheading>
                  Upgrade to PRO <br />
                  Account
                </Boxheading>
                <Boxsubheading>
                  Start Your PRO Subscription today <br />
                  for as low as $5/month
                </Boxsubheading>
                <Btn onClick={() => router.push("/plancards")}>Click Here</Btn>
              </Box>
            </ImagedBox>
            <Card>
              <Admin>Admin</Admin>
              <SecondimagedBox style={{ padding: "7.5px", height: "202px" }}>
                <div style={{ display: "flex" }}>
                  <Box sx={{ p: 1.2 }}>
                    <Secondboxheading>Chat with Admin</Secondboxheading>
                    <Secondboxsubheading>
                      Chat Now today by clicking the button below.
                    </Secondboxsubheading>
                    <Btn2
                      sx={{
                        "@media screen and (max-width:350px)": {
                          width: "90px",
                          padding: "0px",
                          marginTop: "7px",
                          height: "35px",
                        },
                      }}
                    >
                      Chat Now
                    </Btn2>
                  </Box>
                </div>
              </SecondimagedBox>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
