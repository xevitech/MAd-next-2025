import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Header,
  OuterContainer,
  InnerContainer,
  Card,
  TableWishlist,
} from "../SellerTools/styles";
import { ProfileHeader } from "../common/profileheader";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "../common/commonStyle";
import { apiClient } from "../common/common";
import { formatDateUsFormat } from "../Helper";
import { useRouter } from "next/router";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import RecentSupplierSkeleton from "./Skeleton/RecentSupplierSkeleton";

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#f5f5f5",
        },
        colorPrimary: {
          "&.Mui-checked": {
            color: "#D7282F",
          },
          MuiCssBaseline: {
            "@global": {
              ".Mui-disabled": { opacity: 0.5 },
              ".Mui-selected": { background: "red" },
            },
          },
        },
        track: {
          opacity: 0.38,
          backgroundColor: "#000",
          ".Mui-checked.Mui-checked + &": {
            opacity: 0.7,
            backgroundColor: "#a5a5a5",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: "error",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        color: "error",
      },
    },
    MuiTypography: {
      defaultProps: {},
    },
  },
});
export default function RecentSupplier() {
  const [recentSupplierData, setRecentSupplierData] = useState([]);
  const router = useRouter();
  const [loader, setLoader] = useState(true);

  const columns: any = [
    {
      field: "serial_no",
      headerName: "Sr. No.",
      minWidth: 80,
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return <div>{cellValues.value}</div>;
      },
    },

    {
      field: "supplier",
      headerName: "Supplier",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return <>{params?.value != undefined ? params?.value : "--"}</>;
      },
    },

    {
      field: "company_type",
      headerName: "Company Type",
      type: "text",
      minWidth: 100,
      flex: 1,
    },
    // {
    //   field: "summary report",
    //   headerName: "Summary Report",
    //   type: "text",
    //   minWidth: 100,
    //   flex: 1,
    // },
    {
      field: "date_viewed",
      headerName: "Date Viewed",
      type: "text",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "mini_site",
      headerName: "Stores",
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const handleClick = () => {
          const miniSiteValue = params?.value;
          if (miniSiteValue) {
            // Redirect to the new path when clicked
            router.push(`/mini-site/${miniSiteValue}/home`);
          }
        };
        return (
          <Box
            onClick={handleClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              textDecoration: "underline",
              "&:hover": {
                color: "#d7282f",
              },
              "& svg": {
                fontSize: "18px",
              },
            }}
          >
            <StoreOutlinedIcon />
            {"Visit store"}
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    const recentSupplier = async () => {
      try {
        const response = await apiClient(
          "activities/recent/supplier/list",
          "get"
        );
        console.log(response, "response");
        if (response?.status === 200) {
          console.log(response?.data, "recentSupplierData");

          setRecentSupplierData(response?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    recentSupplier();
  }, []);
  const rows = recentSupplierData.map((item, index) => ({
    serial_no: index + 1,
    supplier: item?.name,
    company_type: item?.business_type.join(", "),
    date_viewed: formatDateUsFormat(item?.created_at),
    mini_site: item?.slug,
  }));
  return (
    <>
      <Box className="full_page">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <OuterContainer>
              <InnerContainer>
                <ProfileHeader text={"Recent Supplier"} />
                {loader ? (
                  <RecentSupplierSkeleton></RecentSupplierSkeleton>
                ) : (
                  <Header>
                    <Card>
                      <TableWishlist>
                        <Box
                          sx={{
                            width: "100%",
                            display: "table",
                            tableLayout: "fixed",
                          }}
                        >
                          <ThemeProvider theme={theme}>
                            <DataGridPro
                              localeText={{
                                columnMenuShowColumns: "Manage Columns",
                              }}
                              sx={DataGridStyle}
                              rows={rows}
                              columns={columns}
                              pageSize={10}
                              getRowId={(row) => row.serial_no}
                              rowHeight={45}
                              autoHeight
                              pagination
                              checkboxSelection={false}
                              disableSelectionOnClick={true}
                            />
                          </ThemeProvider>
                        </Box>
                      </TableWishlist>
                    </Card>
                  </Header>
                )}
              </InnerContainer>
            </OuterContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
