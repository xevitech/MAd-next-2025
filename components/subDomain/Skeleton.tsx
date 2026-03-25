import Skeleton from "@mui/material/Skeleton";

import { Grid, Box, Typography, styled } from "@mui/material";

import { Divider } from "@mui/material";

import React from "react";

// const CardBox = styled(Grid)(() => ({
//   width: "100%",

//   height: "auto",

//   background: "#FFFFFF",

//   boxShadow:
//     "0px 9px 16px rgba(159, 162, 191, 0.18) 0px 2px 2px rgba(159, 162, 191, 0.32)",

//   borderRadius: "6px",
// }));
export default function SubdomainSkeleton() {
  return (
    <>
      {/* <div style={{ backgroundColor: "#F6F8FB" }}>
        <Grid container spacing={0}>
          <Divider sx={{ mb: 1 }} />

          <CardBox sx={{ p: 3 }} item xs={12}>
            <Typography>
              <Skeleton animation="wave" width={180} height={30} />
            </Typography>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex">
                <Box>
                  <Skeleton animation="wave" width={100} />
                </Box>

                <Box>
                  <Skeleton animation="wave" width={140} sx={{ ml: 3 }} />
                </Box>
              </Box>

              <Box>
                <Skeleton animation="wave" width={30} sx={{ mr: 2 }} />
              </Box>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex">
                <Box>
                  <Skeleton animation="wave" width={100} />
                </Box>

                <Box>
                  <Skeleton animation="wave" width={130} sx={{ ml: 3 }} />
                </Box>
              </Box>

              <Box>
                <Skeleton animation="wave" width={30} sx={{ mr: 2 }} />
              </Box>
            </Box>

            <Divider sx={{ mt: 2, mb: 2 }} />
          </CardBox>
        </Grid>
      </div> */}
      <Box sx={{ backgroundColor: "#F7F7F7", padding: "10px", position: "relative", borderRadius: "6px", display: "flex", }}>

        <Box sx={{ position: "absolute", display: "flex", alignItems: "center", right: "16px" }} >
          <Skeleton variant="rectangular" animation="wave" width={13} height={13} />
          <Skeleton variant="rectangular" animation="wave" width={27} height={20} sx={{marginLeft:"10px"}}/>
        </Box>
        <p style={{}}>
          <Skeleton variant="text" animation="wave" width={100}  sx={{ marginRight:"32px" }} />
        </p>

        <p style={{}} >
          <Skeleton variant="text" animation="wave" width={400} sx={{ margin:"0px 0px 8px 0px" }} />
          <Skeleton variant="text" animation="wave" width={300} sx={{  }} />
          <Divider
            variant="fullWidth"
            orientation="horizontal"
            sx={{margin:"14px 0px"}}
          />
        </p>
        {/* <p style={{}}>
          <Skeleton variant="text" animation="wave" width={200} sx={{ marginTop: "60px" }} />
        </p> */}
        {/* <Box sx={{ paddingRight: "32px", marginLeft: "50%" }} >
          <Skeleton variant="rectangular" animation="wave" width={13} height={13} />
        </Box> */}


        {/* <Box sx={{ marginLeft: "17%", width: "40%" }}>
          <Skeleton variant="text" animation="wave" width={400} height={30} sx={{ paddingRight: "32px", marginLeft: "30px" }} />
        </Box> */}

      </Box>

    </>
  );
}
