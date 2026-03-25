import React from 'react'
import Grid from '@mui/material/Grid'

import { Divider, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/material';

export default function CompanyDetailSkeleton() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                        <Box>
                            <Box>
                                <Skeleton animation='wave' width={250} />
                            </Box>
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={100} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12}sm={12} md={12} lg={12} xl={12}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={150} />
                        </Box>
                        <Box sx={{ display: 'flex', ml: 10, alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation='wave' width={20} height={30} sx={{ mr: 1 }} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' width={100} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', ml: 10, alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation='wave' width={20} height={30} sx={{ mr: 1 }} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' width={100} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', ml: 10, alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation='wave' width={20} height={30} sx={{ mr: 1 }} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' width={100} />
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                {/* E-mail */}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={80} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={150} sx={{ ml: 19, alignItems: 'center' }} />
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
                            <Skeleton animation='wave' width={175} sx={{ ml: 10, alignItems: 'center' }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                {/* website */}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={100} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={125} sx={{ ml: 16, alignItems: 'center' }} />
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
                            <Skeleton animation='wave' width={125} sx={{ ml: 10, alignItems: 'center' }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                {/* select */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={{ display: 'flex', mb: 2 }}>

                        <Box>
                            <Skeleton animation='wave' width={150} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={150} sx={{ ml: 10, }} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={150} sx={{ ml: 2, }} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={150} sx={{ ml: 2, }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                {/* main product */}
                <Grid item xs={12}sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={150} />
                        </Box>
                        <Box>
                            <Skeleton variant="rounded" height={20} width={100} sx={{ ml: 10 }} />
                        </Box>
                        <Box>
                            <Skeleton variant="rounded" height={20} width={100} sx={{ ml: 10 }} />
                        </Box>
                        <Box>
                            <Skeleton variant="rounded" height={20} width={100} sx={{ ml: 10 }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={150} />
                        </Box>
                        <Box>
                            <Skeleton variant="rounded" height={20} width={100} sx={{ ml: 10 }} />
                        </Box>
                        <Box>
                            <Skeleton variant="rounded" height={20} width={100} sx={{ ml: 10 }} />
                        </Box>
                        <Box>
                            <Skeleton variant="rounded" height={20} width={100} sx={{ ml: 10 }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                {/* employee */}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={100} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={150} sx={{ ml: 10 }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={250} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={150} sx={{ ml: 10 }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                {/* compny */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography> <Skeleton animation='wave' width={300} /> </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box >
                            <Skeleton animation='wave' width={150} />
                        </Box>
                        <Box >
                            <Skeleton animation='wave' width={150} sx={{ ml: 10 }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box >
                            <Skeleton animation='wave' width={200} />
                        </Box>
                        <Box >
                            <Skeleton animation='wave' width={150} sx={{ ml: 10 }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                {/* location */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography> <Skeleton animation='wave' width={250} /> </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={150}></Skeleton>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={70}></Skeleton>
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={150} sx={{ ml: 2 }}></Skeleton>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={180}></Skeleton>
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={100} sx={{ ml: 2 }}></Skeleton>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={150}></Skeleton>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box>
                            <Skeleton animation='wave' width={150}></Skeleton>
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                {/* address */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography> <Skeleton animation='wave' width={150} /> </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex' }}>
                        <Box>
                            <Skeleton animation='wave' width={70} sx={{ mb: 2 }} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={170} sx={{ mb: 2, ml: 2 }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex' }}>
                        <Box>
                            <Skeleton animation='wave' width={70} sx={{ mb: 2 }} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={170} sx={{ mb: 2, ml: 2 }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex' }}>
                        <Box>
                            <Skeleton animation='wave' width={70} sx={{ mb: 2 }} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={170} sx={{ mb: 2, ml: 2 }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ display: 'flex' }}>
                        <Box>
                            <Skeleton animation='wave' width={70} sx={{ mb: 2 }} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={170} sx={{ mb: 2, ml: 2 }} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box>
                        <Skeleton animation='wave' width={150} sx={{ mb: 2 }} />
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Box>
                        <Skeleton animation='wave' width="100%" />
                        <Skeleton animation='wave' width="50%" sx={{ mb: 2 }} />
                    </Box>
                    <Divider />
                </Grid>
            </Grid>
        </>
    )
}
