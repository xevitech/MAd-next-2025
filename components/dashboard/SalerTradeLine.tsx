import React, { useEffect, useState } from "react";
import { Box, CardContent, Tab, Tabs } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { Card } from "@mui/material";
import { DataGridStyle } from "../common/commonStyle";
import { styles, Tabtext } from "./ProductInfoTable";
import { apiClient } from "../common/common";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function SellerTrendLineTable() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [tableData, setTableData] = useState<any>({});

  const sallersTradeineData = async () => {
    const response = await apiClient("score/seller-trend-lines", "get");
    if (response?.status == 200) {
      setTableData(response?.data);
    }  
    };

  useEffect(() => {
    sallersTradeineData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "serialNo",
      headerName: "Sr. No.",
      minWidth: 50,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "seller_performance",
      headerName: "Seller performance",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category_performance",
      headerName: "Category performance",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "diff",
      headerName: "Differance",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];
  

  const formatToTwoDecimals = (value: any): string => {
    if (value === null || value === undefined) return "0";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "0";
    return num.toFixed(2);
  };

  const transformDataForMetric = (data: any, metric: string) => {
    if (!data) return [];

    return Object.entries(data).map(
      ([category, metrics]: [string, any], index) => {
        const metricData = metrics[metric];
        return {
          serialNo: index + 1,
          category,
          seller_performance:
            formatToTwoDecimals(metricData?.seller_performance) ?? "0",
          category_performance:
            formatToTwoDecimals(metricData?.category_performance) ?? "0",
          diff: formatToTwoDecimals(metricData?.diff) ?? "0",
        };
      }
    );
  };

  const tableIndex = [
    "avg_scroll_depth",
    "element_clicks",
    "page_views",
    "repeat_page_visits",
    "sessions_engaged",
    "time_spent",
  ];

  const tabLabels = [
    "Average scroll Depth",
    "Element clicks",
    "Page views",
    "Repeat page visits",
    "Sessions engaged",
    "Time spent",
  ];

  return (
    <Box sx={{ margin: "16px 0 0 0" }}>
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons={false}
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
                {tabLabels.map((value, index) => (
                  <Tabtext label={value} {...a11yProps(index)} style={styles.headline} sx={{minHeight:'72px'}} />
                ))}
              </Tabs>
            </Box>
            {tableIndex.map((metric, index) => (
              <CustomTabPanel key={index} value={value} index={index}>
                <DataGridPro
                  style={{
                    border: "5px",
                    borderRadius: "10px",
                    borderColor: "transparent",
                  }}
                  rows={transformDataForMetric(tableData, metric)}
                  columns={columns}
                  getRowId={(row) => row.serialNo}
                  sx={DataGridStyle}
                  autoHeight
                  rowHeight={46}
                  disableSelectionOnClick
                  pagination
                  pageSize={5}
                />
              </CustomTabPanel>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
