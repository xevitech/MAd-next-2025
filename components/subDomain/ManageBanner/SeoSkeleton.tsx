import { Box, Divider, Grid, Radio, Skeleton } from '@mui/material'
import React from 'react'


export default function SeoSkeleton() {
  return (
    <>
    <Box sx={{marginTop:'-20px'}}>
           <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                <Skeleton variant="text"  width={90} height={40} />

                </Grid>
            </Grid>
            <Divider sx={{ mt: 1, }} />
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={4}>
                        <Skeleton variant="text"  width={110} height={30} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                        <Skeleton variant="text"  width={500} height={30} />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={4}>
                        <Skeleton variant="text"  width={130} height={30} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                        <Skeleton variant="text"  width={500} height={30} />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={4}>
                        <Skeleton variant="text"  width={130} height={30}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                        <Skeleton variant="text"  width={500} height={30}/>
                        </Grid>
                    </Grid>
                 

                </Grid>
            </Grid>
            </Box>
    </>
  )
}