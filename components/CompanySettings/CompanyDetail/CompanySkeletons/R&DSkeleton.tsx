import { Grid, Skeleton, Box, Divider, Typography } from '@mui/material'
import React from 'react'

export default function RnDSkeleton() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} lg={6} xl={6}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4} md={4}>
                            <Box sx={{ padding: '12px 0px' }}>
                                <Skeleton animation='wave' variant='text' width={'40%'} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <Box sx={{ padding: '12px 0px' }}>
                                <Skeleton animation='wave' variant='text' width={'35%'} />
                            </Box>
                        </Grid>
                    </Grid>
                    <hr
                        className="hair-line"
                        style={{ margin: "0px", padding: "0px" }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={6} xl={6} >
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4} md={4}>
                            <Box sx={{ padding: '12px 0px' }}>
                                <Skeleton animation='wave' variant='text' width={'35%'} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <Box sx={{ padding: '12px 0px' }}>
                                <Skeleton animation='wave' variant='text' width={'35%'} />
                            </Box>
                        </Grid>
                    </Grid>
                    <hr
                        className="hair-line"
                        style={{ margin: "0px", padding: "0px" }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={6} xl={6} mt={-2}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4} md={4}>
                            <Box sx={{ padding: '12px 0px' }}>
                                <Skeleton animation='wave' variant='text' width={'25%'} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <Box sx={{ padding: '12px 0px' }}>
                                <Skeleton animation='wave' variant='text' width={'35%'} />
                            </Box>
                        </Grid>
                    </Grid>
                    <hr
                        className="hair-line"
                        style={{ margin: "0px", padding: "0px" }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={6} xl={6} mt={-2}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4} md={4}>
                            <Box sx={{ padding: '12px 0px' }}>
                                <Skeleton animation='wave' variant='text' width={'48%'} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <Box sx={{ padding: '12px 0px' }}>
                                <Skeleton animation='wave' variant='text' width={'35%'} />
                            </Box>
                        </Grid>
                    </Grid>
                    <hr
                        className="hair-line"
                        style={{ margin: "0px", padding: "0px" }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={6} xl={6} mt={-2}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4} md={4}>
                            <Box sx={{ padding: '12px 0px' }}>
                                <Skeleton animation='wave' variant='text' width={'35%'} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <Box sx={{ padding: '12px 0px' }}>
                                <Skeleton animation='wave' variant='text' width={'35%'} />
                            </Box>
                        </Grid>
                    </Grid>
                    <hr
                        className="hair-line"
                        style={{ margin: "0px", padding: "0px" }}
                    />
                </Grid>
                
            </Grid>
        </>
    )
}
