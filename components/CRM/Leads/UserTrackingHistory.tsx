import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { DataGridStyle, SmallOutineBtn } from "../commonStyle";
import { InviteMeetingOuter } from "../style";
import { Chart } from "react-google-charts";
import {
  HeadingTrackingCommon,
  InnerTableArea,
  TableBorderSection,
  TableGrid,
  TopbarTrackingdrawer,
  TotalCountData,
  TrackingColData,
  TrackingDrawerData,
  TrackingStatsContainer,
  TrackingTableOuter,
  TrackingTopColumn,
} from "./style-tracking";
import {
  Grid,
  Skeleton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
type Anchor = "top" | "left" | "bottom" | "right";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { getAllTrackingData } from "@/hooks/UseCreateFormData";
import UserTracking from "../Skeletons/UserTracking";
import { apiClient } from "@/components/common/common";
import UserSubTracking from "../Skeletons/UserSubTracking";
const UserTrackingHistory = () => {
  const dispatch = useAppDispatch();
  const [dataDrawer, setDataDrawer] = useState(false);
  const [dataType, setDataType] = useState(0);
  const [subActivity, setSubActivity] = useState([]);
  const [subDataLoader, setSubDataLoader] = useState(false);
  const { trackingLoader, trackingData, seasonsList } = useSelector(
    (state: any) => state.formList
  );

  useEffect(() => {
    dispatch(getAllTrackingData());
  }, []);

  const pageandTimeColumns: GridColDef[] = [
    {
      field: "srNo",
      headerName: "Sr. No.",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "page_name",
      headerName: "Page",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "start_time",
      headerName: "Start Timestamp ",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "end_time",
      headerName: "End Timestamp ",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "time_spent",
      headerName: "Total Time Spend",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "views",
      headerName: "Page View Count",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  const averageColumns: GridColDef[] = [
    {
      field: "srNo",
      headerName: "Sr. No.",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "page_name",
      headerName: "Page URL",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return <Box onClick={async () => {}}>{cellValues?.value}</Box>;
      },
    },
    {
      field: "id",
      headerName: "No Scroll",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Box>
            {cellValues?.row?.page_height - cellValues?.row?.scroll_position}px
          </Box>
        );
      },
    },
    {
      field: "id",
      headerName: "Scrolled",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return <Box>{cellValues?.row?.scroll_position}px</Box>;
      },
    },
    {
      field: "page_height",
      headerName: "Page Height",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return <Box>{cellValues?.row?.page_height}px</Box>;
      },
    },
    {
      field: "avg_scroll_depth",
      headerName: "Avg Scroll Depth",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  const elementColumns: GridColDef[] = [
    {
      field: "srNo",
      headerName: "Sr. No.",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "page_name",
      headerName: "Page",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return <Box onClick={async () => {}}>{cellValues?.value}</Box>;
      },
    },
    {
      field: "element_type",
      headerName: "Elements",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return <Box>{cellValues?.row?.element_type}</Box>;
      },
    },
    {
      field: "event_counts",
      headerName: "Elements Count / Clicks",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return <Box>{cellValues?.value}</Box>;
      },
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "srNo",
      headerName: "Sr. No.",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "season_id",
      headerName: "Session Id",
      width: 250,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Box
            onClick={async () => {
              getDetailsOfUserActivity(0, cellValues?.row?.season_id);
              setDataType(0);
              toggleDrawer();
            }}
          >
            {cellValues?.value}
          </Box>
        );
      },
    },

    {
      field: "start_time",
      headerName: "Start Timestamp ",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "end_time",
      headerName: "End Timestamp ",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "views",
      headerName: "Views",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Box
            onClick={async () => {
              getDetailsOfUserActivity(0, cellValues?.row?.season_id);
              setDataType(0);
              toggleDrawer();
            }}
          >
            {cellValues?.value}
          </Box>
        );
      },
    },
    {
      field: "time_spent",
      headerName: "Time Spent",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Box
            onClick={async () => {
              getDetailsOfUserActivity(0, cellValues?.row?.season_id);
              setDataType(0);
              toggleDrawer();
            }}
          >
            {cellValues?.value}
          </Box>
        );
      },
    },
    {
      field: "avg_scroll_depth",
      headerName: "Avg Scrolling Depth",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Box
            onClick={async () => {
              getDetailsOfUserActivity(1, cellValues?.row?.season_id);
              setDataType(1);
              toggleDrawer();
            }}
          >
            {cellValues?.value}
          </Box>
        );
      },
    },
    {
      field: "element_click",
      headerName: "Elements",
      width: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Box
            onClick={async () => {
              getDetailsOfUserActivity(2, cellValues?.row?.season_id);
              setDataType(2);
              toggleDrawer();
            }}
          >
            {cellValues?.value}
          </Box>
        );
      },
    },
  ];

  const getDetailsOfUserActivity = async (type, season_id) => {
    setSubDataLoader(true);
    let url = "crm/tracking/season_pages_list";
    let response = await apiClient(url, "post", {
      body: {
        type:
          type == 0
            ? "page_listing"
            : type == 1
            ? "scroll_listing"
            : "element_listing",
        season_id: season_id,
      },
    });
    if (response?.status == true || response?.status == 200) {
      setSubActivity(response?.data);
      setSubDataLoader(false);
    } else {
      setSubDataLoader(false);
    }
  };

  const data = [
    ["Years", "Clicks", "Scrolls", "Pages"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];

  const options = {
    chart: {
      title: "User Trackings",
      subtitle: "Clicks, Scrolls, Page Visited",
    },
  };

  const toggleDrawer = () => {
    setDataDrawer(!dataDrawer);
  };

  const seasonsListWithSrNo =
    seasonsList?.length > 0
      ? seasonsList.map((row, index) => ({
          ...row,
          srNo: index + 1,
        }))
      : [];

  const subActiityUpdate =
    subActivity?.length > 0
      ? subActivity.map((row, index) => ({
          ...row,
          srNo: index + 1,
        }))
      : [];

  return (
    <>
      {trackingLoader ? (
        <UserTracking />
      ) : (
        <>
          <Box>
            {/* <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />

        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />

        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={[
            ["Task", "Hours per Day"],
            ["Work", 11],
            ["Eat", 2],
            ["Commute", 2],
            ["Watch TV", 2],
            ["Sleep", 7],
          ]}
          options={{
            title: "User Daily Activities",
          }}
        /> */}
          </Box>

          <TrackingStatsContainer>
            <TrackingTopColumn>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                  <TrackingColData>
                    <Typography>Total Seasons Engaged</Typography>
                    <Typography variant="h5">
                      {trackingData?.seasons_engaged}
                    </Typography>
                  </TrackingColData>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TrackingColData>
                    <Typography>Total Time Spent</Typography>
                    <Typography variant="h5">
                      {trackingData?.time_spent}
                    </Typography>
                  </TrackingColData>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TrackingColData>
                    <Typography>Total Page Views</Typography>
                    <Typography variant="h5">
                      {trackingData?.page_views}
                    </Typography>
                  </TrackingColData>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TrackingColData>
                    <Typography>Total Average Scroll Depth</Typography>
                    <Typography variant="h5">
                      {trackingData?.avg_scroll_depth}%
                    </Typography>
                  </TrackingColData>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TrackingColData>
                    <Typography>Total Element Clicks</Typography>
                    <Typography variant="h5">
                      {trackingData?.element_click}
                    </Typography>
                  </TrackingColData>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TrackingColData>
                    <Typography>Repeat Page Visits</Typography>
                    <Typography variant="h5">
                      {trackingData?.repeat_page_view}
                    </Typography>
                  </TrackingColData>
                </Grid>
              </Grid>
            </TrackingTopColumn>
          </TrackingStatsContainer>
          <TrackingTableOuter>
            <TableBorderSection>
              <HeadingTrackingCommon>
                <Typography>Total Seasons Engaged</Typography>
              </HeadingTrackingCommon>
              <TableGrid>
                <DataGridPro
                  pagination
                  disableSelectionOnClick
                  rows={
                    seasonsListWithSrNo?.length > 0 ? seasonsListWithSrNo : []
                  }
                  columns={columns}
                  loading={trackingLoader}
                  rowHeight={38}
                  pageSize={20}
                  sx={DataGridStyle}
                />
              </TableGrid>
            </TableBorderSection>
          </TrackingTableOuter>

          <div>
            <React.Fragment key={"right"}>
              <Drawer anchor={"right"} open={dataDrawer}>
                {subDataLoader ? (
                  <UserSubTracking />
                ) : (
                  <TrackingDrawerData
                    sx={{
                      width: 900,
                    }}
                    role="presentation"
                  >
                    <TopbarTrackingdrawer>
                      <Typography>
                        {dataType == 0
                          ? "Total Time Spent and Page View Count"
                          : dataType == 1
                          ? "Total Avg Scroll Dept"
                          : "Total Elements Count / Clicks"}
                      </Typography>
                      <CancelOutlinedIcon onClick={toggleDrawer} />
                    </TopbarTrackingdrawer>
                    <InnerTableArea>
                      <div style={{ height: 500, width: "100%" }}>
                        <DataGridPro
                          pagination
                          rows={
                            subActiityUpdate?.length > 0 ? subActiityUpdate : []
                          }
                          columns={
                            dataType == 0
                              ? pageandTimeColumns
                              : dataType == 2
                              ? elementColumns
                              : averageColumns
                          }
                          loading={trackingLoader}
                          rowHeight={38}
                          pageSize={20}
                          disableSelectionOnClick
                          sx={DataGridStyle}
                        />
                      </div>
                    </InnerTableArea>
                  </TrackingDrawerData>
                )}
              </Drawer>
            </React.Fragment>
          </div>
        </>
      )}
    </>
  );
};

export default UserTrackingHistory;
