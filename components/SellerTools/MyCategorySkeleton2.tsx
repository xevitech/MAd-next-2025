import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";
const MyCategorySkeleton2 = () => {
  return (
    <>
      <Box
        sx={{
          border: "1px solid #dddddd",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F4F4F4",
            borderRadius: "8px 8px 0 0",
            padding: "16px",
          }}
        >
          {" "}
          <Grid container>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton animation="wave" variant="text" width={"30%"} />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={"100%"}
                  height={36}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            padding: "16px",
            marginTop: "8px",
            gap: "10px",
          }}
        >
          <Grid container spacing={2} rowSpacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={"100%"}
                height={36}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={"100%"}
                height={36}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={"100%"}
                height={36}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Box>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={"100%"}
                  height={36}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        <Skeleton animation="wave" variant="rounded" width={70} height={36} />
      </Box>
    </>
  );
};
export default MyCategorySkeleton2;
