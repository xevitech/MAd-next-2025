import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Divider, Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import styled from '@emotion/styled';

export const Flex = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',

}))


export default function Recentactivityskeleton() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                    <Box sx={{m:2}}>
                        <Typography>
                            <Skeleton animation="wave" width={300} height={30} />
                            <Skeleton animation="wave" width={500} />
                        </Typography>

                        <Box sx={{ mt: 4 }}>
                            <Skeleton animation="wave" width={250} height={30} />
                            <Flex>
                                <Box>
                                    <Skeleton variant="circular" width={40} height={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={100} sx={{ ml: 3 }} />
                                </Box>
                            </Flex>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <Flex>
                                <Box>
                                    <Skeleton variant="circular" width={40} height={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={150} sx={{ ml: 3 }} />
                                </Box>
                            </Flex>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <Flex>
                                <Box>
                                    <Skeleton variant="circular" width={40} height={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={120} sx={{ ml: 3 }} />
                                </Box>
                            </Flex>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <Flex>
                                <Box>
                                    <Skeleton variant="circular" width={40} height={40} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={170} sx={{ ml: 3 }} />
                                </Box>
                            </Flex>
                        </Box>

                        <Box sx={{ ml: 8 }}>
                            <Box sx={{ mt: 2 }}><Skeleton animation="wave" width={300} /></Box>
                            <Box sx={{ mt: 2 }}><Skeleton animation="wave" width={250} /></Box>
                            <Box sx={{ mt: 2 }}><Skeleton animation="wave" width={320} /></Box>
                            <Box sx={{ mt: 2 }}><Skeleton animation="wave" width={380} /></Box>
                            <Box sx={{ mt: 2 }}><Skeleton animation="wave" width={220} /></Box>

                            <Flex sx={{ mt: 2 }}>
                                <Box>
                                    <Skeleton variant="circular" width={25} height={25} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={50} sx={{ ml: 2 }} />
                                </Box>
                            </Flex>
                            <Flex sx={{ mt: 2 }}>
                                <Box>
                                    <Skeleton variant="circular" width={25} height={25} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={50} sx={{ ml: 2 }} />
                                </Box>
                            </Flex>

                            <Box>
                                <Skeleton animation="wave" width={250} />
                                <Skeleton animation="wave" width={210} />
                            </Box>
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <Skeleton animation="wave" width={250} height={30} />


                            <Skeleton variant="circular" width={20} height={20} sx={{ mt: 2 }} />
                            <Flex sx={{ mt: 2 }}>
                                <Box sx={{ ml: 2 }}>
                                    <Skeleton variant="circular" width={20} height={20} sx={{ mt: 2 }} />
                                    <Skeleton variant="circular" width={20} height={20} sx={{ mt: 2 }} />
                                    <Skeleton variant="circular" width={20} height={20} sx={{ mt: 2 }} />
                                </Box>
                                <Box sx={{ ml: 2 }}>
                                    <Skeleton animation="wave" width={100} sx={{ ml: 1, mt: 2 }} />
                                    <Skeleton animation="wave" width={100} sx={{ ml: 1, mt: 2 }} />
                                    <Skeleton animation="wave" width={100} sx={{ ml: 1, mt: 2 }} />
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Box sx={{ backgroundColor: '#E0E0E0', height: '824px', borderRadius: '8px', padding: '10px' ,m:2}}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex',alignItems:'center' }}>
                                <Box>
                                    <Skeleton animation="wave" width={50} height={25} />
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" width={80} height={30} sx={{ml:2}}/>
                                </Box>
                            </Box>
                            <Box>
                                <Typography><Skeleton animation="wave" width={70} /></Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={100} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={100} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={90} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={70} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={40} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={110} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={80} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={120} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={100} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={100} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={90} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={70} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={40} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={110} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={80} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={120} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={100} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={100} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={90} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={70} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={40} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={110} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={80} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1 }}>
                            <Box>
                                <Typography><Skeleton animation="wave" width={120} /></Typography>
                            </Box>
                            <Box>
                                <Typography><Skeleton variant="rectangular" width={15} height={15} /></Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
