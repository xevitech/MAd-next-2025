import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
export default function FormSkeleton() {
  const {
    skeleton
  } = useSelector((state: any) => state.LeadsData);
  return (
    <>
      <Box p={2} sx={{ background: "#fff" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={skeleton== "single" ? 12 : skeleton == "triple"? 4: 6}>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={skeleton== "single" ? 12 : skeleton == "triple"? 4: 6}>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
          </Grid>
          {skeleton=="triple"&&  <Grid item xs={12} sm={6} md={skeleton== "single" ? 12 : skeleton == "triple"? 4: 6}>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
          </Grid>}
        
        </Grid>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} sm={6} md={skeleton== "single" ? 12 : skeleton == "triple"? 4: 6} lg={6}>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={skeleton== "single" ? 12 : skeleton == "triple"? 4: 6} lg={6}>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
            <Box>
              <Skeleton animation="wave" width={"100%"} height={"60px"} />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{ display: "flex", gap: 2 }}
              alignItems={"center"}
              justifyContent={"right"}
            >
              <Skeleton animation="wave" width={"10%"} height={"60px"} />
              <Skeleton animation="wave" width={"10%"} height={"60px"} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
