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
import RecentSearchesSkeleton from "./Skeleton/RecentSearchesSkeleton";
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

export default function RecentSearches() {
  const [recentSearchesData, setRecentSearchesData] = useState([]);
  const router = useRouter();
  const [loader, setLoader] = useState(true);

  const columns: any = [
    {
      field: "serial_no",
      headerName: "Sr. No.",
      minWidth: 80,
      flex: 0.2,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "search_term",
      headerName: "Search Term",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "applied_filters",
      headerName: "Applied Filters",
      type: "text",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "date_viewed",
      headerName: "Date Viewed",
      type: "text",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "search_keyword",
      headerName: "Results",
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const handleClick = () => {
          const serahKeyword = params?.value;
          if (serahKeyword) {
            router.push(`/productlist/?name=${serahKeyword}`);
          }
        };
        return <div onClick={handleClick}>{"Visit Searched keyword"}</div>;
      },
    },
  ];

  useEffect(() => {
    const recentSupplier = async () => {
      try {
        const response = await apiClient(
          "activities/recent/keyword_search/list",
          "get"
        );
        if (response?.status === 200) {
          console.log(response?.data, "recentSupplierData");

          console.log(response, "response");
          setRecentSearchesData(response?.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    recentSupplier();
  }, []);

  const rows = recentSearchesData.map((item, index) => ({
    serial_no: index + 1,
    search_term: item?.search_keyword,
    applied_filters: `Type: product`,
    date_viewed: formatDateUsFormat(item?.created_at),
    search_keyword: item?.search_keyword,
  }));
  return (
    <>
      <Box className="full_page">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <OuterContainer>
              <InnerContainer>
                <ProfileHeader text={"Recent Searches"} />
                {loader ? (
                  <RecentSearchesSkeleton />
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
                          {/* <ThemeProvider theme={theme}> */}
                            <DataGridPro
                              localeText={{
                                columnMenuShowColumns: "Manage Columns",
                              }}
                              sx={DataGridStyle}
                              rows={rows}
                              columns={columns}
                              pageSize={10}
                              rowHeight={45}
                              autoHeight
                              pagination
                              checkboxSelection={false}
                              disableSelectionOnClick={true}
                              getRowId={(row) => row.serial_no}
                            />
                          {/* </ThemeProvider> */}
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
