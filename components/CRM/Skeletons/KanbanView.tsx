import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";
const KanbanView = () => {
  const dummy = [1, 1, 1, 1];
  return (
    <div>
      <Grid container spacing={2}>
        {dummy?.map((item:any)=><Grid item xs={12} sm={12} lg={3} xl={3} mt={1}>
          <Box
            sx={{
              backgroundColor: "#e9e9e9",
              borderRadius: "6px",
              padding: "12px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "8px",
                borderRadius: "6px",
              }}
            >
              <Skeleton animation="wave" variant="text" width={"35%"} />
              <Skeleton animation="wave" variant="text" width={"20%"} />
            </Box>
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "8px",
                marginTop: "12px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Skeleton animation="wave" variant="text" width={"20%"} />
                </Box>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={15}
                    height={15}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: "12px",
                  }}
                >
                  <Box>
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={25}
                      height={25}
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Skeleton animation="wave" variant="text" width={"40%"} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: "12px",
                  }}
                >
                  <Box>
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={25}
                      height={25}
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Skeleton animation="wave" variant="text" width={"38%"} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={"100%"}
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={"100%"}
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={"100%"}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>)}
      </Grid>
    </div>
  );
};

export default KanbanView;
