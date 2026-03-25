import { Box, Skeleton, Stack, Grid, Divider } from "@mui/material";
import React from "react";

export default function TradeshowDetailSkeleton() {
  let List = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <>
      <Stack gap={"24px"} margin={"150px 0 0 0"}>
        <Box
          sx={{
            borderRadius: "20px",
            border: "1px solid #ddd",
            padding: "8px",
            overflow: "hidden",
            height: "600px",
            "@media screen and (max-width:900px)": { height: "auto" },
          }}
        >
          <Skeleton
            variant="rounded"
            sx={{
              height: "100%",
              width: "100%",
              "@media screen and (max-width:900px)": {
                height: "300px",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            border: "1px solid rgb(197, 197, 197)",
            borderRadius: "10px",
            padding: "16px",
          }}
        >
          <Grid container rowSpacing={{ sm: 0, md: 2 }}>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                "@media screen and (max-width:900px)": {
                  display: "none",
                },
              }}
            >
              <Box>
                <Divider variant="fullWidth" orientation="horizontal" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                "@media screen and (max-width:900px)": {
                  display: "none",
                },
              }}
            >
              <Box>
                <Divider variant="fullWidth" orientation="horizontal" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                "@media screen and (max-width:900px)": {
                  display: "none",
                },
              }}
            >
              <Box>
                <Divider variant="fullWidth" orientation="horizontal" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                "@media screen and (max-width:900px)": {
                  display: "none",
                },
              }}
            >
              <Box>
                <Divider variant="fullWidth" orientation="horizontal" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                "@media screen and (max-width:900px)": {
                  display: "none",
                },
              }}
            >
              <Box>
                <Divider variant="fullWidth" orientation="horizontal" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box>
                <Skeleton variant="text" width={150} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "none",
                "@media screen and (max-width:900px)": { display: "block" },
              }}
            >
              <Box>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ margin: "10px 0" }}
                />
              </Box>
            </Grid>
           
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
