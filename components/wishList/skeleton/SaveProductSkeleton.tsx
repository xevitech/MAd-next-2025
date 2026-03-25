import { Box, Divider, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { SidebarBox } from "../styles";

export default function SaveProductSkeleton() {
  let List = [1, 2, 3, ];
  return (
    <>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={12} md={3} lg={2.5} xl={2.5}>
          <SidebarBox>
            <Stack
              sx={{
                bgcolor: "background.paper",
                textAlign: "left",
                width: "100%",
              }}
            >
              <Box>
                <Skeleton
                  variant="text"
                  width=""
                  height=""
                  animation="wave"
                  sx={{ margin: "0 0 6px", padding: "6px 10px" }}
                />
              </Box>
              <Box>
                <Skeleton
                  variant="text"
                  width=""
                  height=""
                  animation="wave"
                  sx={{ margin: "0 0 6px", padding: "6px 10px" }}
                />
              </Box>
              <Box>
                <Skeleton
                  variant="text"
                  width=""
                  height=""
                  animation="wave"
                  sx={{ margin: "0 0 6px", padding: "6px 10px" }}
                />
              </Box>
              <Box>
                <Skeleton
                  variant="text"
                  width=""
                  height=""
                  animation="wave"
                  sx={{ margin: "0 0 6px", padding: "6px 10px" }}
                />
              </Box>
             
            </Stack>
          </SidebarBox>
        </Grid>
        {List.map((v, i) => (
          <Grid item xs={12} sm={12} md={3} lg={3} height={"100%"}>
            <Box
              sx={{
                border: "1px solid #e1e1e1",
                boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px",
                }}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Box>
                    <Skeleton variant="text" animation="wave" width={100} />
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Skeleton variant="text" animation="wave" width={50} />
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  padding: "4px",
                  border: "1px solid #e7e7e7",
                  margin: "8px",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={"100%"}
                  height={"150px"}
                />
              </Box>
              <Box
                sx={{
                  margin: "8px",
                  borderBottom: "1px solid #e7e7e7",
                  paddingBottom: "10px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"70%"} />
                <Skeleton variant="text" animation="wave" width={"50%"} />
              </Box>

              <Box
                sx={{
                  margin: "8px",
                  borderBottom: "1px dashed #e7e7e7",
                  paddingBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "25px",
                    margin: "2px 8px",
                  }}
                >
                  <Box>
                    <Skeleton variant="text" animation="wave" width={70} />
                  </Box>
                  <Box>
                    <Skeleton variant="text" animation="wave" width={60} />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "35px",
                    margin: "2px 8px",
                  }}
                >
                  <Box>
                    <Skeleton variant="text" animation="wave" width={60} />
                  </Box>
                  <Box>
                    <Skeleton variant="text" animation="wave" width={60} />
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  margin: "8px",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #e7e7e7",
                    padding: "3px 8px",
                    minWidth: "100px",
                    borderRadius: "4px",
                  }}
                >
                  <Skeleton variant="text" animation="wave" width={"100%"} />
                </Box>
                <Box
                  sx={{
                    border: "1px solid #e7e7e7",
                    padding: "3px 8px",
                    minWidth: "40px",
                    borderRadius: "4px",
                  }}
                >
                  <Skeleton variant="text" animation="wave" width={"100%"} />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
