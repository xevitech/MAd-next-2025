import React from 'react'
import Grid from '@mui/material/Grid'
import { Card, Divider, Skeleton } from '@mui/material'
import { Box } from '@mui/system'


export default function ListSkeleton() {
    return (
        <>
            <Grid container spacing={3} >
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                    <Skeleton variant="rectangular" width='100%' height={291} />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Card sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={80} height={30} sx={{ ml: 2 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={100} height={50} />
                            </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation="wave" width={250} height={40} />
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={70} height={50} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={75} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={85} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={60} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={90} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                        </Box>
                        <Divider />

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Skeleton animation="wave" width='100%' />
                            <Skeleton animation="wave" width='50%' />
                        </Box>
                        <Divider />


                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={60} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={80} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={85} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={70} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                    <Skeleton variant="rectangular" width='100%' height={291} />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Card sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={80} height={30} sx={{ ml: 2 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={100} height={50} />
                            </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation="wave" width={250} height={40} />
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={70} height={50} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={75} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={85} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={60} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={90} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                        </Box>
                        <Divider />

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Skeleton animation="wave" width='100%' />
                            <Skeleton animation="wave" width='50%' />
                        </Box>
                        <Divider />


                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={60} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={80} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={85} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={70} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                    <Skeleton variant="rectangular" width='100%' height={291} />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Card sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={80} height={30} sx={{ ml: 2 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={100} height={50} />
                            </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation="wave" width={250} height={40} />
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={70} height={50} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={75} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={85} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={60} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={90} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                        </Box>
                        <Divider />

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Skeleton animation="wave" width='100%' />
                            <Skeleton animation="wave" width='50%' />
                        </Box>
                        <Divider />


                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={60} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={80} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={85} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={70} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                    <Skeleton variant="rectangular" width='100%' height={291} />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Card sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={80} height={30} sx={{ ml: 2 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={100} height={50} />
                            </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation="wave" width={250} height={40} />
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={70} height={50} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={75} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={85} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={60} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={90} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                        </Box>
                        <Divider />

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Skeleton animation="wave" width='100%' />
                            <Skeleton animation="wave" width='50%' />
                        </Box>
                        <Divider />


                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={60} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={80} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={85} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={70} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                    <Skeleton variant="rectangular" width='100%' height={291} />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Card sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={80} height={30} sx={{ ml: 2 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={100} height={50} />
                            </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation="wave" width={250} height={40} />
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={70} height={50} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={75} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={85} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={60} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={90} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                        </Box>
                        <Divider />

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Skeleton animation="wave" width='100%' />
                            <Skeleton animation="wave" width='50%' />
                        </Box>
                        <Divider />


                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={60} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={80} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={85} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={70} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                    <Skeleton variant="rectangular" width='100%' height={291} />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Card sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={80} height={30} sx={{ ml: 2 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={100} height={50} />
                            </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation="wave" width={250} height={40} />
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={70} height={50} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={75} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={85} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={60} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={90} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                        </Box>
                        <Divider />

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Skeleton animation="wave" width='100%' />
                            <Skeleton animation="wave" width='50%' />
                        </Box>
                        <Divider />


                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={60} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={80} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={85} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={70} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                    <Skeleton variant="rectangular" width='100%' height={291} />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Card sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={80} height={30} sx={{ ml: 2 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={100} height={50} />
                            </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation="wave" width={250} height={40} />
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={70} height={50} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={75} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={85} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={60} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={90} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                        </Box>
                        <Divider />

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Skeleton animation="wave" width='100%' />
                            <Skeleton animation="wave" width='50%' />
                        </Box>
                        <Divider />


                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={60} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={80} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={85} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={70} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                    <Skeleton variant="rectangular" width='100%' height={291} />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Card sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={80} height={30} sx={{ ml: 2 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={100} height={50} />
                            </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation="wave" width={250} height={40} />
                            </Box>
                            <Box>
                                <Skeleton animation="wave" width={70} height={50} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={75} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={85} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={60} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={90} sx={{ ml: 1 }} />
                                </Box>
                            </Box>
                        </Box>
                        <Divider />

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Skeleton animation="wave" width='100%' />
                            <Skeleton animation="wave" width='50%' />
                        </Box>
                        <Divider />


                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={60} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={80} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={75} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={90} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{ mt: 2 }}>
                                    <Box>
                                        <Skeleton animation="wave" width={85} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation="wave" width={70} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

            </Grid>
        </ >
    )
}
