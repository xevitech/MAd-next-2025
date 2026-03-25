import React from 'react'
import Grid from '@mui/material/Grid'
import { Box, Divider, Skeleton } from '@mui/material'

export default function InquirySkeleton() {
    return (
        <>
           <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Skeleton animation="wave" width={'50%'} />
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box>
                                <Skeleton variant="circular" width={20} height={20} />
                            </Box>
                            <Box ml={2}>
                                <Skeleton animation="wave" width={200} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box>
                                <Skeleton variant="circular" width={20} height={20} />
                            </Box>
                            <Box ml={2}>
                                <Skeleton animation="wave" width={180} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box>
                                <Skeleton variant="circular" width={20} height={20} />
                            </Box>
                            <Box ml={2}>
                                <Skeleton animation="wave" width={150} />
                            </Box>
                        </Box>
                        <Box mt={1}>
                            <Skeleton animation="wave" width={350} />
                        </Box>
                    </Box>

                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Skeleton animation="wave" width={'40%'} />
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box>
                                <Skeleton variant="circular" width={20} height={20} />
                            </Box>
                            <Box ml={2}>
                                <Skeleton animation="wave" width={200} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box>
                                <Skeleton variant="circular" width={20} height={20} />
                            </Box>
                            <Box ml={2}>
                                <Skeleton animation="wave" width={180} />
                            </Box>
                        </Box>
                        <Box mt={1}>
                            <Skeleton animation="wave" width={320} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Skeleton animation="wave" width={'40%'} />
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box>
                                <Skeleton variant="circular" width={20} height={20} />
                            </Box>
                            <Box ml={2}>
                                <Skeleton animation="wave" width={140} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box>
                                <Skeleton variant="circular" width={20} height={20} />
                            </Box>
                            <Box ml={2}>
                                <Skeleton animation="wave" width={110} />
                            </Box>
                        </Box>
                        <Box mt={1}>
                            <Skeleton animation="wave" width={320} />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Skeleton animation="wave" width={'35%'} />
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box>
                                <Skeleton variant="circular" width={20} height={20} />
                            </Box>
                            <Box ml={2}>
                                <Skeleton animation="wave" width={200} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box>
                                <Skeleton variant="circular" width={20} height={20} />
                            </Box>
                            <Box ml={2}>
                                <Skeleton animation="wave" width={180} />
                            </Box>
                        </Box>
                        <Box mt={1}>
                            <Skeleton animation="wave" width={320} />
                        </Box>
                    </Box>
                </Grid>

            </Grid>
        </>
    )
}