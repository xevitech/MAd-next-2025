import React from "react";
import {
  AddMoreProductTable,
  AddProductTableBox,
  CatelogeWhiteContainer,
  CatelogSkeletonBox,
  CatelogWrapper,
} from "./style";
import { Box, Skeleton, Stack, Grid } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "../common/commonStyle";

export default function CatalogSkeleton() {
  const columns: any = [
    {
      field: "serial_no",
      headerName: (
        <Skeleton animation="wave" variant="text" width={50} height={"30px"} />
      ),
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={20}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "supplier",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      minWidth: 70,
      flex: 1,
      renderCell: (params) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "company_type",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 250,
      flex: 1,
      renderCell: () => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "date_viewed",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "mini_site",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
  ];
  const rows = Array.from({ length: 10 }).map((_, index) => ({
    id: index, // Unique key for each row
    serial_no: <Skeleton animation="wave" variant="text" width={20} />,
    supplier: <Skeleton animation="wave" variant="text" width={80} />,
    company_type: <Skeleton animation="wave" variant="text" width={80} />,
    date_viewed: <Skeleton animation="wave" variant="text" width={80} />,
    mini_site: <Skeleton animation="wave" variant="text" width={80} />,
  }));
  return (
    <>
      <Box>
        <Stack spacing={1}>
          <Box>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "20%" }} />
            <Skeleton
              animation="wave"
              height={10}
              width="40%"
              style={{ marginBottom: 6 }}
            />
          </Box>
          <Box>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "12px",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      overflowX: "scroll",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "6px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        height: "100%",
                      }}
                    >
                      <Stack
                        gap={"6px"}
                        sx={{
                          height: "280px",
                          overflowY: "auto",
                          width: "100%",
                        }}
                      >
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        padding: "6px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        height: "100%",
                      }}
                    >
                      <Stack
                        gap={"6px"}
                        sx={{
                          height: "280px",
                          overflowY: "auto",
                          width: "100%",
                        }}
                      >
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        padding: "6px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        height: "100%",
                      }}
                    >
                      <Stack
                        gap={"6px"}
                        sx={{
                          height: "280px",
                          overflowY: "auto",
                          width: "100%",
                        }}
                      >
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={"220px"}
                            height={"30px"}
                          ></Skeleton>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "12px",
                    height: "100%",
                  }}
                >
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "20%" }}
                  />
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="40%"
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={30}
                    sx={{ margin: "20px 0" }}
                  />
                  <Skeleton variant="rounded" width={"100%"} height={90} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* <Skeleton variant="rectangular" width={210} height={60} /> */}
          {/* <Box>
            <CatelogeWhiteContainer sx={{}}>
              <CatelogWrapper sx={{ margin: "1rem 0" }}>
                <AddMoreProductTable
                  sx={{ margin: "40px 0 0 0", position: "relative" }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-38px",
                      left: "0px",
                      width: "150px",
                      height: "38px",
                      borderRadius: "4px 4px 0 0",
                      overflow: "hidden",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="38px"
                      animation="wave"
                    />
                  </Box>
                  <AddProductTableBox
                    sx={{
                      "& .MuiDataGrid-footerContainer": {
                        display: "none",
                      },
                    }}
                  >
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
                    />
                  </AddProductTableBox>
                </AddMoreProductTable>
              </CatelogWrapper>
            </CatelogeWhiteContainer>
          </Box> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              gap: "10px",
              margin: "20px 0 0",
            }}
          >
            <Skeleton variant="rounded" width={"90px"} height={32} />
            <Skeleton variant="rounded" width={"90px"} height={32} />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
