import {
    Box,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow, Grid, Divider,
  } from "@mui/material";
  import React from "react";
  
  export default function SkeletonForCalculator() {
    return (
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Skeleton variant="rounded" width='100%' height={40} />
            <Skeleton variant="rounded" width='100%' height={40} sx={{ mt: 2 }} />
            <Skeleton variant="rounded" width='100%' height={40} sx={{ mt: 2 }} />
            <Skeleton variant="rounded" width='100%' height={40} sx={{ mt: 2 }} />
            <Skeleton variant="rounded" width='8%' height={40} sx={{ mt: 2 }} />
          </Grid>
          {/* Grid 8 ends here */}
          <Grid item xs={12} sm={12} md={6} lg={6} >
            <Box sx={{ border: '1px solid #E4E4E4', p: 2, borderRadius: '3px' }}>
              <Skeleton variant="rounded" width={100} height={30}></Skeleton>
              <Divider sx={{ mt: 1 }} />
              {/* calculator and divider */}
              <Skeleton variant="rounded" width={80} height={20} sx={{ mt: 1 }}></Skeleton>
              <Box display='flex' sx={{}}>
                <Skeleton variant="rounded" width={50} height={20} sx={{ mt: 1 }}></Skeleton>
                <Skeleton variant="rounded" width={50} height={20} sx={{ mt: 1, ml: 1 }}></Skeleton>
              </Box>
              {/* equation 1 and its content */}
  
              <Skeleton variant="rounded" width={80} height={20} sx={{ mt: 2 }}></Skeleton>
              <Box display='flex'>
                <Skeleton variant="rounded" width={50} height={20} sx={{ mt: 1 }}></Skeleton>
                <Skeleton variant="rounded" width={50} height={20} sx={{ mt: 1, ml: 1 }}></Skeleton>
              </Box>
              {/* equation 2 and its content */}
  
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Box>
                  <Skeleton variant="rounded" width={80} height={20} sx={{ mt: 2 }}></Skeleton>
                </Box>
                <Box>
                  <Skeleton variant="rounded" width={60} height={20} sx={{ mt: 2 }}></Skeleton>
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" width='100%' height={30} sx={{ mt: 1 }}></Skeleton>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <Box>
                  <Skeleton variant="rounded" width={60} height={20} sx={{ mt: 1 }}></Skeleton>
                </Box>
                <Box>
                  <Skeleton variant="rounded" width={80} height={20} sx={{ mt: 1 }}></Skeleton>
                </Box>
              </Box>
              {/* equation 3 and its content */}
  
              <Box sx={{ border: '1px solid #E4E4E4', mt: 4, p: 1, borderRadius: '3px' }}>
                <Box display='flex' justifyContent='space-between'>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                </Box>
                <Box display='flex' justifyContent='space-between' marginTop={2}>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                </Box>
                <Box display='flex' justifyContent='space-between' marginTop={2}>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                </Box>
                <Box display='flex' justifyContent='space-between' marginTop={2}>
                  <Box>
                    <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 0 }}></Skeleton>
                  </Box>
                </Box>
              </Box>
            </Box>
  
            {/* make final calculation starts from here */}
            <Box sx={{ border: '1px solid #E4E4E4', mt: 3, p: 2, borderRadius: '3px' }}>
              <Box display='flex' justifyContent='space-between' alignItems='center' >
                <Box>
                  <Skeleton variant="rounded" width={150} height={25}></Skeleton>
                </Box>
                <Box>
                  <Skeleton variant="rounded" width={100} height={20}></Skeleton>
                </Box>
              </Box>
              <Divider sx={{ mt: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Box>
                  <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 1 }}></Skeleton>
                </Box>
                <Box>
                  <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 1 }}></Skeleton>
                </Box>
                <Box>
                  <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 1 }}></Skeleton>
                </Box>
                <Box>
                  <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 1 }}></Skeleton>
                </Box>
                <Box>
                  <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 1 }}></Skeleton>
                </Box>
                <Box>
                  <Skeleton variant="rounded" width={40} height={25} sx={{ mt: 1 }}></Skeleton>
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" width={100} height={40} sx={{ mt: 3 }}></Skeleton>
              </Box>
  
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
  