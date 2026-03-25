import { Box, Skeleton, Grid, } from '@mui/material'
import React from 'react'

export default function Discountlevel() {
    return (
        <>
            <Box p={2}>
                <Box my={2}>
                    <Box>
                        <Skeleton animation='wave' width={190} height={30} />
                    </Box>
                    <Box>
                        <Skeleton animation='wave' width={250} />
                    </Box>
                </Box>
                <Box mt={2} p={2} sx={{ border: '1px solid #9FA2BF52', borderRadius: '6px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} lg={3.7} xl={3.7}>
                            <Box>
                                <Skeleton animation='wave' width={100} height={22} />
                            </Box>
                            <Box mt={1}>
                                <Skeleton variant="rectangular" width={'100%'} height={25} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={3.7} xl={3.7}>
                            <Box>
                                <Skeleton animation='wave' width={100} height={22} />
                            </Box>
                            <Box mt={1}>
                                <Skeleton variant="rectangular" width={'100%'} height={25} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={3.7} xl={3.7}>
                            <Box>
                                <Skeleton animation='wave' width={100} height={22} />
                            </Box>
                            <Box mt={1}>
                                <Skeleton variant="rectangular" width={'100%'} height={25} />
                            </Box>
                        </Grid>
                        <Grid item xs={0.9} display='flex' alignItems='center' >
                            <Box mt={3.7}>
                                <Skeleton variant="rectangular" width={100} height={30} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={4}>
                    <Skeleton animation='wave' width={100} height={23} />
                </Box>
                <Box mt={1} p={2} sx={{ border: '1px solid #9FA2BF52', borderRadius: '6px' }}>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box>
                                    <Skeleton animation='wave' width={100} height={22} />
                                </Box>
                                <Box mt={1}>
                                    <Skeleton variant='rectangular' width={'100%'} height={25} />
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box>
                                    <Skeleton animation='wave' width={100} height={22} />
                                </Box>
                                <Box mt={1}>
                                    <Skeleton variant='rectangular' width={'100%'} height={25} />
                                </Box>
                            </Grid>
                            <Grid item xs={4} >
                                <Box>
                                    <Skeleton animation='wave' width={100} height={22} />
                                </Box>
                                <Box mt={1} display={'flex'}>
                                    <Box>
                                        <Skeleton variant='rectangular' width='500px' height={25} />
                                    </Box>
                                    <Box ml={2}>
                                        <Skeleton variant='rectangular' width={25} height={25} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}