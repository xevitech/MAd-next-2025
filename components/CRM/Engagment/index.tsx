import React, { useEffect, useState } from "react";
import { OuterContainer } from "../../SellerTools/styles";
import { CrmFullData, CrmInnerContent } from "../commonStyle";
import { useRouter } from "next/router";
import { useAppDispatch } from "redux/store";
import CommonHeader from "../Leads/CommonHeader";
import {
  DataGridStyleIcon,
  TrackingColData,
  EngagmentStatsContainer,
  TrackingTopColumn,
  EngagmentTable,
  HeadingTrackingCommon,
  TrackingTableOuter,
  TableBorderSection,
  EngagmentTableClickeble,
  TooltipTable,
  TableHeading,
  SmallTableView,
} from "./style";
import { Box, Grid, Typography } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { getEngagmentScore } from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import { LicenseKey } from "@/components/common/common";
import { LicenseInfo } from "@mui/x-license-pro";
import UserEngagment from "../Skeletons/UserEngagment";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
LicenseInfo.setLicenseKey(LicenseKey);
function createData(
  avg_elements_clicks: any,
  avg_page_repeat: any,
  avg_page_view: any,
  avg_scroll_depth: any,
  avg_time_spend: any,
  category: any,
  category_id: any,
  id: any,
  total_leads: any,
  total_products: any
) {
  return {
    avg_elements_clicks,
    avg_page_repeat,
    avg_page_view,
    avg_scroll_depth,
    avg_time_spend,
    category,
    category_id,
    id,
    total_leads,
    total_products,
  };
}

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">{index}</TableCell>
        <TableCell component="th" scope="row">
          {row?.category}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row?.total_leads}</TableCell>
        <TableCell align="center">{row?.total_products}</TableCell>
        <TableCell align="center">{row?.avg_page_view}%</TableCell>
        <TableCell align="center">{row?.avg_time_spend}H</TableCell>
        <TableCell align="center">{row?.avg_scroll_depth}%</TableCell>
        <TableCell align="center">{row?.avg_elements_clicks}%</TableCell>
        <TableCell align="center">{row?.avg_page_repeat}%</TableCell>
      </TableRow>
      <TableRow
        sx={{
          "& .MuiTableCell-root": {
            padding: "4px !important",
          },
        }}
      >
        <TableCell
          style={{
            paddingBottom: "0px !important",
            paddingTop: "0px !important",
          }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <SmallTableView>
              {/* <TableHeading>
                <Typography variant="h6" gutterBottom component="div">
                  Sub Matrics According to Products
                </Typography>
              </TableHeading> */}
              <Table width="100%">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Total Leads</TableCell>
                    <TableCell align="right">Average Page Views</TableCell>
                    <TableCell align="right">Average Time Spent</TableCell>
                    <TableCell align="right">Average Scroll Depth</TableCell>
                    <TableCell align="right">Average Element Clicks</TableCell>
                    <TableCell align="right">Average Repeat Visits</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.history?.length > 0 ? (
                    row?.history?.map((history, index) => {
                      return (
                        <TableRow style={{ background: "#eeffef" }}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{history?.name}</TableCell>
                          <TableCell align="right">{history?.total_leads}</TableCell>
                          <TableCell align="right">
                            {history?.avg_page_view}%
                          </TableCell>
                          <TableCell align="right">
                            {history?.avg_time_spend}H
                          </TableCell>
                          <TableCell align="right">
                            {history?.avg_scroll_depth}%
                          </TableCell>
                          <TableCell align="right">
                            {history?.avg_elements_clicks}%
                          </TableCell>
                          <TableCell align="right">
                            {history?.avg_page_repeat}%
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow style={{ background: "#FFEEEF" }}>
                      <TableCell align="center" colSpan={8}>No Data Found</TableCell>
                    </TableRow>
                  )}
                  {/* "#FFEEEF" */}
                </TableBody>
              </Table>
            </SmallTableView>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const EngagmentScore = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { engagmentData, engagmentLoader } = useSelector(
    (state: any) => state.formList
  );
  useEffect(() => {
    dispatch(getEngagmentScore());
  }, []);

  console.log(engagmentData, "------engagmentData");
  return (
    <div className="full_page">
      <CrmFullData>
        <OuterContainer>
          <CommonHeader />
        </OuterContainer>
        <CrmInnerContent>
          <EngagmentStatsContainer>
            {engagmentLoader ? (
              <UserEngagment />
            ) : (
              <>
                <TrackingTopColumn>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2} md={2.5}>
                      <TrackingColData>
                        <Typography>Engagment Score</Typography>
                        <Typography variant="h5">
                          {engagmentData?.engagment_score}
                        </Typography>
                      </TrackingColData>
                    </Grid>
                    <Grid item xs={12} sm={2.5} md={2.5}>
                      <LightTooltip
                        placement="top"
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              width: "500px",
                              maxWidth: "500px",
                            },
                          },
                        }}
                        title={
                          <TooltipTable>
                            <DataGridPro
                              autoHeight
                              rows={
                                engagmentData?.selling_category?.map(
                                  (row, index) => ({
                                    ...row,
                                    serialNumber: index + 1, // Add 1 to index to start serial number from 1
                                  })
                                ) || []
                              }
                              columns={[
                                {
                                  field: "serialNumber",
                                  headerName: "Sr. No.",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                },
                                {
                                  field: "name",
                                  headerName: "Category Name",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                },
                                {
                                  field: "lead_count",
                                  headerName: "Total Leads",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                  renderCell: (params) => {
                                    const isFirstRow =
                                      params.row.serialNumber === 1;
                                    return (
                                      <>
                                        {params?.value}
                                        {isFirstRow && (
                                          <ArrowUpwardOutlinedIcon />
                                        )}
                                        {engagmentData?.selling_category.findIndex(
                                          (row) => row.id === params.row.id
                                        ) +
                                          1 ===
                                          engagmentData?.selling_category
                                            ?.length && (
                                          <ArrowDownwardOutlinedIcon />
                                        )}
                                      </>
                                    );
                                  },
                                },
                              ]}
                              rowHeight={32}
                              checkboxSelection={false}
                              sx={DataGridStyleIcon}
                              disableSelectionOnClick
                              hideFooter
                              disableColumnMenu
                            />
                          </TooltipTable>
                        }
                      >
                        <TrackingColData>
                          <Typography>Top Selling Category</Typography>
                          <Typography variant="h5">
                            {engagmentData?.selling_category
                              ?.filter((item) => item.lead_count !== "0")?.[0]
                              ?.name?.slice(0, 30) + "..."}
                          </Typography>
                        </TrackingColData>
                      </LightTooltip>
                    </Grid>
                    <Grid item xs={12} sm={2.5} md={2.5}>
                      <LightTooltip
                        placement="top"
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              width: "500px",
                              maxWidth: "500px",
                            },
                          },
                        }}
                        title={
                          <TooltipTable>
                            <DataGridPro
                              autoHeight
                              rows={
                                engagmentData?.selling_product?.map(
                                  (row, index) => ({
                                    ...row,
                                    serialNumber: index + 1, // Add 1 to index to start serial number from 1
                                  })
                                ) || []
                              }
                              columns={[
                                {
                                  field: "serialNumber",
                                  headerName: "Sr. No.",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                },
                                {
                                  field: "name",
                                  headerName: "Category Name",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                },
                                {
                                  field: "lead_count",
                                  headerName: "Total Leads",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                  renderCell: (params) => {
                                    const isFirstRow =
                                      params.row.serialNumber === 1;
                                    return (
                                      <>
                                        {params?.value}
                                        {isFirstRow && (
                                          <ArrowUpwardOutlinedIcon />
                                        )}
                                        {engagmentData?.selling_product.findIndex(
                                          (row) => row.id === params.row.id
                                        ) +
                                          1 ===
                                          engagmentData?.selling_product
                                            ?.length && (
                                          <ArrowDownwardOutlinedIcon />
                                        )}
                                      </>
                                    );
                                  },
                                },
                              ]}
                              rowHeight={32}
                              checkboxSelection={false}
                              sx={DataGridStyleIcon}
                              disableSelectionOnClick
                              hideFooter
                              disableColumnMenu
                            />
                          </TooltipTable>
                        }
                      >
                        <TrackingColData>
                          <Typography>Top Selling Product</Typography>
                          <Typography variant="h5">
                            {engagmentData?.selling_product
                              ?.filter((item) => item.lead_count !== "0")?.[0]
                              ?.name?.slice(0, 30) + "..."}
                          </Typography>
                        </TrackingColData>
                      </LightTooltip>
                    </Grid>
                    <Grid item xs={12} sm={2.5} md={2.5}>
                      <LightTooltip
                        placement="top"
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              width: "500px",
                              maxWidth: "500px",
                            },
                          },
                        }}
                        title={
                          <TooltipTable>
                            <DataGridPro
                              className="redrowtable"
                              autoHeight
                              rows={
                                engagmentData?.selling_category
                                  ?.slice()
                                  ?.reverse()
                                  ?.map((row, index) => ({
                                    ...row,
                                    serialNumber: index + 1, // Add 1 to index to start serial number from 1
                                  })) || []
                              }
                              columns={[
                                {
                                  field: "serialNumber",
                                  headerName: "Sr. No.",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                },
                                {
                                  field: "name",
                                  headerName: "Category Name",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                },
                                {
                                  field: "lead_count",
                                  headerName: "Total Leads",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                  renderCell: (params) => {
                                    const isFirstRow =
                                      params.row.serialNumber ===
                                      engagmentData?.selling_category?.length;
                                    return (
                                      <>
                                        {params?.value}
                                        {isFirstRow && (
                                          <ArrowUpwardOutlinedIcon />
                                        )}
                                        {engagmentData?.selling_category.findIndex(
                                          (row) => row.id === params.row.id
                                        ) +
                                          1 ===
                                          engagmentData?.selling_category
                                            ?.length && (
                                          <ArrowDownwardOutlinedIcon />
                                        )}
                                      </>
                                    );
                                  },
                                },
                              ]}
                              rowHeight={32}
                              checkboxSelection={false}
                              sx={DataGridStyleIcon}
                              disableSelectionOnClick
                              hideFooter
                              disableColumnMenu
                            />
                          </TooltipTable>
                        }
                      >
                        <TrackingColData className="lightbg">
                          <Typography>Low Selling Category</Typography>
                          <Typography variant="h5">
                            {engagmentData?.selling_category?.[
                              engagmentData?.selling_category?.length - 1
                            ]?.name?.slice(0, 30) + "..."}
                          </Typography>
                        </TrackingColData>
                      </LightTooltip>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <LightTooltip
                        placement="top"
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              width: "500px",
                              maxWidth: "500px",
                            },
                          },
                        }}
                        title={
                          <TooltipTable>
                            <DataGridPro
                              className="redrowtable"
                              autoHeight
                              rows={
                                engagmentData?.selling_product
                                  ?.slice()
                                  ?.reverse()
                                  ?.map((row, index) => ({
                                    ...row,
                                    serialNumber: index + 1, // Add 1 to index to start serial number from 1
                                  })) || []
                              }
                              columns={[
                                {
                                  field: "serialNumber",
                                  headerName: "Sr. No.",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                },
                                {
                                  field: "name",
                                  headerName: "Category Name",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                },
                                {
                                  field: "lead_count",
                                  headerName: "Total Leads",
                                  flex: 1,
                                  headerAlign: "center",
                                  align: "center",
                                  sortable: false,
                                  renderCell: (params) => {
                                    const isFirstRow =
                                      params.row.serialNumber ===
                                      engagmentData?.selling_product?.length;
                                    return (
                                      <>
                                        {params?.value}
                                        {isFirstRow && (
                                          <ArrowUpwardOutlinedIcon />
                                        )}
                                        {engagmentData?.selling_product.findIndex(
                                          (row) => row.id === params.row.id
                                        ) +
                                          1 ===
                                          engagmentData?.selling_product
                                            ?.length && (
                                          <ArrowDownwardOutlinedIcon />
                                        )}
                                      </>
                                    );
                                  },
                                },
                              ]}
                              rowHeight={32}
                              checkboxSelection={false}
                              sx={DataGridStyleIcon}
                              disableSelectionOnClick
                              hideFooter
                              disableColumnMenu
                            />
                          </TooltipTable>
                        }
                      >
                        <TrackingColData className="lightbg">
                          <Typography>Low Selling Product</Typography>
                          <Typography variant="h5">
                            {engagmentData?.selling_product?.[
                              engagmentData?.selling_product?.length - 1
                            ]?.name?.slice(0, 30) + "..."}
                          </Typography>
                        </TrackingColData>
                      </LightTooltip>
                    </Grid>
                  </Grid>
                </TrackingTopColumn>
                <TrackingTableOuter>
                  <TableBorderSection>
                    <HeadingTrackingCommon>
                      <Typography>Engagment Matrics</Typography>
                    </HeadingTrackingCommon>
                    <EngagmentTableClickeble>
                      <TableContainer className="tablecontainerexpand">
                        <Table aria-label="collapsible table" size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Sr. No.</TableCell>
                              <TableCell>Category Name</TableCell>
                              <TableCell align="right">Total Leads</TableCell>
                              <TableCell align="right">
                                Total Products
                              </TableCell>
                              <TableCell align="right">
                                Average Page Views
                              </TableCell>
                              <TableCell align="right">
                                Average Time Spent
                              </TableCell>
                              <TableCell align="right">
                                Average Scroll Depth
                              </TableCell>
                              <TableCell align="right">
                                Average Element Clicks
                              </TableCell>
                              <TableCell align="right">
                                Average Repeat Visits
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {engagmentData?.engagment_metrics?.length > 0 &&
                              engagmentData?.engagment_metrics?.map(
                                (row, index) => (
                                  <Row
                                    key={row.name}
                                    row={row}
                                    index={index + 1}
                                  />
                                )
                              )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </EngagmentTableClickeble>
                  </TableBorderSection>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <TableBorderSection>
                        <HeadingTrackingCommon>
                          <Typography>Conversion Related Metrics</Typography>
                        </HeadingTrackingCommon>
                        <EngagmentTable sx={{ height: "auto", width: "100%" }}>
                          <DataGridPro
                            autoHeight
                            rows={engagmentData?.lead_conversion_metrics || []}
                            columns={[
                              {
                                field: "conversion_type",
                                headerName: "Conversion",
                                flex: 1,
                                headerAlign: "left",
                                align: "left",
                                sortable: false,
                                minWidth: 300,
                              },
                              {
                                field: "conversion_percentage",
                                headerName: "Percentage",
                                flex: 1,
                                headerAlign: "center",
                                align: "center",
                                sortable: false,
                              },
                              {
                                field: "total_converted_leads",
                                headerName: "Lead Converted",
                                flex: 1,
                                headerAlign: "center",
                                align: "center",
                                sortable: false,
                              },
                            ]}
                            loading={
                              engagmentData?.lead_conversion_metrics?.length ===
                              0
                            }
                            rowHeight={32}
                            checkboxSelection={false}
                            sx={DataGridStyleIcon}
                            disableSelectionOnClick
                            hideFooter
                            disableColumnMenu
                          />
                        </EngagmentTable>
                      </TableBorderSection>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TableBorderSection>
                        <HeadingTrackingCommon>
                          <Typography>Seller Comparison Dashboard</Typography>
                        </HeadingTrackingCommon>
                        <EngagmentTable
                          sx={{
                            height: "auto",
                            width: "100%",
                            " .columnpadding": {
                              ".MuiDataGrid-columnHeader, .MuiDataGrid-cell:last-child":
                                {
                                  padding: "0px !important",
                                },
                              ".MuiDataGrid-columnHeaderTitle:first-child": {
                                padding: "0px 10px",
                              },
                            },
                          }}
                        >
                          <DataGridPro
                            autoHeight
                            rows={
                              engagmentData?.seller_comparision_metrics || []
                            }
                            columns={[
                              {
                                field: "matric",
                                headerName: "Metric",
                                flex: 1,
                                headerAlign: "left",
                                align: "left",
                                sortable: false,
                                minWidth: 300,
                              },
                              {
                                field: "sellers_value",
                                headerName: "Seller's Value",
                                flex: 1,
                                headerAlign: "center",
                                align: "center",
                                sortable: false,
                              },
                              {
                                field: "category_avg",
                                headerName: "Category Average",
                                flex: 1,
                                headerAlign: "center",
                                align: "center",
                                sortable: false,
                              },
                              {
                                field: "difference",
                                headerName: "Difference",
                                flex: 1,
                                headerAlign: "center",
                                sortable: false,
                                renderCell: (params) => (
                                  <Box
                                    sx={{
                                      backgroundColor: "#dcf6d2",
                                      height: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: "100%",
                                      padding: "0 10px 0 0",
                                      zIndex: -1,
                                    }}
                                  >
                                    {params.value}
                                  </Box>
                                ),
                              },
                            ]}
                            rowHeight={32}
                            checkboxSelection={false}
                            sx={DataGridStyleIcon}
                            disableSelectionOnClick
                            hideFooter
                            disableColumnMenu
                            className="columnpadding"
                          />
                        </EngagmentTable>
                      </TableBorderSection>
                    </Grid>
                  </Grid>
                </TrackingTableOuter>
              </>
            )}
          </EngagmentStatsContainer>
        </CrmInnerContent>
      </CrmFullData>
    </div>
  );
};
export default EngagmentScore;
