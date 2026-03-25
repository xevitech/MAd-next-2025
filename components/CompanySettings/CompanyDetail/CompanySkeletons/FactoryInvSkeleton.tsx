import React from 'react'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import { Skeleton, Divider } from '@mui/material'

export default function FactorySkeleton() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box>
                            <Box>
                                <Skeleton animation='wave' width={350} />
                            </Box>
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={70} height={50} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={100} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={180} sx={{ml:2}}/>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={100} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={90} sx={{ml:2}}/>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex' , mb: 2}}>
                        <Box>
                            <Skeleton animation='wave' width={100} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={140} sx={{ml:2}}/>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex' , mb: 2}}>
                        <Box>
                            <Skeleton animation='wave' width={100} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={100} sx={{ml:2}}/>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex' , mb: 2}}>
                        <Box>
                            <Skeleton animation='wave' width={100} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={200} sx={{ml:2}}/>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={{ display: 'flex' , mb: 2}}>
                        <Box sx={{ mr: 7 }}>
                            <Skeleton animation='wave' width={100} height={50} />
                        </Box>
                        <Box sx={{ mr: 7 }}>
                            <Skeleton animation='wave' width={100} height={50} />
                        </Box>
                        <Box sx={{ mr: 7 }}>
                            <Skeleton animation='wave' width={100} height={50} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box>
                        <Skeleton animation='wave' width="70%" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                    <Box sx={{}}>
                        <Skeleton animation='wave' width={'100%'} height={250} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                    <Box sx={{}}>
                        <Skeleton animation='wave' width={'100%'} height={250} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                    <Box sx={{}}>
                        <Skeleton animation='wave' width={'100%'} height={250} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                    <Box sx={{}}>
                        <Skeleton animation='wave' width={'100%'} height={250} />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
