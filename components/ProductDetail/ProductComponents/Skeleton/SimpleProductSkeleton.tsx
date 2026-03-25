import React from 'react'
import Grid from '@mui/material/Grid'
import { Divider, Skeleton } from '@mui/material'
import Box from '@mui/material/Box'

export default function SimpleProductSkeleton() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', marginLeft: '16px' }}>
                        <Box>
                            <Skeleton animation='wave' variant='text' width={100} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' variant='text' width={100} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' variant='text' width={100} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} lg={9.5} xl={9.5}>
                    <Grid container spacing={3}>
                        {/* carousel/image part start from here */}
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                            <Box sx={{ marginLeft: '16px', }}>
                                <Box width={'100%'}>
                                    <Skeleton variant="rectangular" width='100%' height={480} />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: "center", gap: '12px', mt: 2 }}>
                                    <Box sx={{ width: '136px', display: 'flex', justifyContent: "center", border: '1px solid #CACACA', borderRadius: '4px', padding: '4px' }}>
                                        <Skeleton variant='rectangular' width={'100%'} height={50} />
                                    </Box>
                                    <Box sx={{ width: '136px', display: 'flex', justifyContent: "center", border: '1px solid #CACACA', borderRadius: '4px', padding: '4px' }}>
                                        <Skeleton variant='rectangular' width={'100%'} height={50} />
                                    </Box>
                                    <Box sx={{ width: '136px', display: 'flex', justifyContent: "center", border: '1px solid #CACACA', borderRadius: '4px', padding: '4px' }}>
                                        <Skeleton variant='rectangular' width={'100%'} height={50} />
                                    </Box>
                                    <Box sx={{ width: '136px', display: 'flex', justifyContent: "center", border: '1px solid #CACACA', borderRadius: '4px', padding: '4px' }}>
                                        <Skeleton variant='rectangular' width={'100%'} height={50} />
                                    </Box>
                                    <Box sx={{ width: '136px', display: 'flex', justifyContent: "center", border: '1px solid #CACACA', borderRadius: '4px', padding: '4px' }}>
                                        <Skeleton variant='rectangular' width={'100%'} height={50} />
                                    </Box>
                                    <Box sx={{ width: '136px', display: 'flex', justifyContent: "center", border: '1px solid #CACACA', borderRadius: '4px', padding: '4px' }}>
                                        <Skeleton variant='rectangular' width={'100%'} height={50} />
                                    </Box>
                                </Box>
                                <Box sx={{ margin: '16px 0px', display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                    <Box>
                                        <Skeleton animation='wave' variant='rounded' width={17} height={17} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation='wave' variant='rounded' width={17} height={17} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation='wave' variant='rounded' width={17} height={17} />
                                    </Box>
                                    <Box>
                                        <Skeleton animation='wave' variant='rounded' width={17} height={17} />
                                    </Box>
                                </Box>
                                <Box sx={{ padding: '8px 12px', backgroundColor: '#F3F3F3', borderRadius: '6px 6px 0 0', margin: '8px 0 0 0' }}>
                                    <Skeleton animation='wave' variant='text' width={'12%'} />
                                    <Box sx={{ backgroundColor: '#fff', padding: "8px 12px", margin: '12px 0 0 0', minHeight: '100px', "@media screen and (max-width:900px)": { minHeight: 'auto' } }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <Box>
                                                    <Skeleton variant='text' animation='wave' width={'100%'} />
                                                    <Skeleton variant='text' animation='wave' width={'40%'} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <Box>
                                                    <Skeleton variant='text' animation='wave' width={'100%'} />
                                                    <Skeleton variant='text' animation='wave' width={'40%'} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <Box>
                                                    <Skeleton variant='text' animation='wave' width={'100%'} />
                                                    <Skeleton variant='text' animation='wave' width={'40%'} />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        {/* carousel/image part ends here */}

                        {/* product name and specifications start from here */}
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'100%'} height={30} />
                                <Skeleton animation='wave' variant='text' width={'40%'} />
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton animation='wave' variant='text' width={'14%'} />
                                    </Box>
                                    <Box sx={{}}>
                                        <Skeleton variant='rounded' animation='wave' width={100} height={17} />
                                    </Box>
                                </Box>
                                <Box sx={{ margin: '0px 0 0 0' }}>
                                    <Skeleton animation='wave' variant='text' width={'100%'} />
                                    <Skeleton animation='wave' variant='text' width={'50%'} />
                                </Box>
                            </Box>

                            <Box sx={{ margin: '12px 0 0 0' }}>
                                <Skeleton animation='wave' variant='text' width={'30%'} height={30} />
                                <Box sx={{ margin: '8px 0 0 0' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={'20%'} />
                                                <Skeleton animation='wave' variant='text' width={'12%'} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={8} lg={8}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={6} sm={6} md={4} lg={4}>
                                                    <Box>
                                                        <Skeleton animation='wave' variant='text' width={'100%'} />
                                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={4} lg={4}>
                                                    <Box>
                                                        <Skeleton animation='wave' variant='text' width={'100%'} />
                                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={4} lg={4}>
                                                    <Box>
                                                        <Skeleton animation='wave' variant='text' width={'100%'} />
                                                        <Skeleton animation='wave' variant='text' width={'40%'} />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>

                            <Box sx={{ padding: '8px 12px', backgroundColor: '#F3F3F3', borderRadius: '6px 6px 0 0', margin: '16px 0 0 0' }}>
                                <Skeleton animation='wave' variant='text' width={'12%'} />
                                <Box sx={{ backgroundColor: '#fff', padding: "8px 12px", margin: '12px 0 0 0' }}>
                                    <Skeleton animation='wave' variant='text' width={'55%'} />
                                </Box>
                            </Box>

                            <Box sx={{ padding: '8px 12px', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <Box>
                                    <Skeleton variant="circular" width="24px" height="24px" animation="wave" />
                                </Box>
                                <Box>
                                    <Skeleton variant='text' animation='wave' width={130} />
                                    <Skeleton variant='text' animation='wave' width={80} />
                                </Box>
                            </Box>

                            <Box sx={{ padding: '8px 12px', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <Box>
                                    <Skeleton variant="circular" width="24px" height="24px" animation="wave" />
                                </Box>
                                <Box>
                                    <Skeleton variant='text' animation='wave' width={90} />
                                    <Skeleton variant='text' animation='wave' width={130} />
                                </Box>
                            </Box>

                            <Box sx={{ padding: '8px 12px', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <Box>
                                    <Skeleton variant="circular" width="24px" height="24px" animation="wave" />
                                </Box>
                                <Box>
                                    <Skeleton variant='text' animation='wave' width={60} />
                                    <Skeleton variant='text' animation='wave' width={90} />
                                    <Skeleton variant='text' animation='wave' width={110} />
                                </Box>
                            </Box>
                            <Divider sx={{ backgroundColor: '#dddddd' }} />
                            <Box sx={{ padding: '8px 12px', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <Skeleton variant="circular" width="22px" height="22px" animation="wave" />
                                <Skeleton variant='text' animation='wave' width={60} />
                                <Box sx={{ width: '40px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <Skeleton variant='text' animation='wave' width={'100%'} />
                                </Box>
                                <Box sx={{ width: '40px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <Skeleton variant='text' animation='wave' width={'100%'} />
                                </Box>
                                <Box sx={{ width: '40px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <Skeleton variant='text' animation='wave' width={'100%'} />
                                </Box>
                            </Box>
                            <Divider sx={{ backgroundColor: '#dddddd' }} />
                            <Box sx={{ padding: '8px 12px', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <Skeleton variant="circular" width="22px" height="22px" animation="wave" />
                                <Box sx={{ width: "100%" }}>
                                    <Skeleton variant='text' animation='wave' width={'30%'} />
                                    <Skeleton variant='text' animation='wave' width={'18%'} />
                                    <Skeleton variant='text' animation='wave' width={'20%'} />
                                </Box>
                            </Box>
                            <Divider sx={{ backgroundColor: '#dddddd' }} />
                            <Box sx={{ padding: '8px 12px', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Skeleton animation='wave' variant='rounded' width={'150px'} height={30} />
                                <Skeleton animation='wave' variant='rounded' width={'150px'} height={30} />
                            </Box>

                        </Grid>
                        {/* product name and specifications ends here */}
                    </Grid>
                    <Box sx={{ marginTop: '16px', marginLeft: '16px', }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: "1px solid #dee2e6" }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' width={100} height={30} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' width={100} height={30} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' width={100} height={30} />
                            </Box>
                        </Box>
                        <Box sx={{ padding: '16px', }}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Box sx={{ width: '50%' }}>
                                    <Skeleton animation='wave' variant='text' width={"10%"} />
                                    <Skeleton animation='wave' variant='text' width={"15%"} />
                                </Box>
                                <Box sx={{ width: '50%' }}>
                                    <Skeleton animation='wave' variant='text' width={"10%"} />
                                    <Skeleton animation='wave' variant='text' width={"15%"} />
                                </Box>
                            </Box>
                            <Box sx={{ width: '50%', marginTop: '8px' }}>
                                <Skeleton animation='wave' variant='text' width={"10%"} />
                                <Skeleton animation='wave' variant='text' width={"70%"} />
                            </Box>
                        </Box>
                    </Box>
                    <Divider color="#dee2e6" sx={{ marginTop: '8px' }} />
                </Grid>

                <Grid item sm={12} md={12} lg={2.5} xl={2.5} >
                    <Box sx={{ padding: '10px', boxShadow: '-2px 0px 7px rgba(0, 0, 0, 0.4)', borderRadius: '6px', marginRight: '30px' }}>
                        <Box sx={{ border: '1px solid #e3e6ed', margin: '0 0 12px', padding: '6px', background: '#fff', borderRadius: '6px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #CCCCCC', margin: '6px 0', padding: '6px', borderRadius: '6px', background: '#fff' }}>
                                <Skeleton variant='circular' animation='wave' sx={{ height: '27px', width: '27px', borderRadius: '50%' }} />
                                <Skeleton variant='text' animation='wave' sx={{ width: '157px', }} />
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                <Skeleton variant="rounded" animation="wave" sx={{ width: '24px', height: '17px', }} />
                                <Skeleton variant="text" animation="wave" sx={{ width: '140px', }} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', margin: '4px 0 0 0' }}>
                                <Skeleton variant='rounded' animation='wave' width={12} height={12} />
                                <Skeleton variant='rounded' animation='wave' width={12} height={12} />
                                <Skeleton variant='rounded' animation='wave' width={12} height={12} />
                                <Skeleton variant='rounded' animation='wave' width={12} height={12} />
                                <Skeleton variant='rounded' animation='wave' width={12} height={12} />
                                <Skeleton variant='text' animation='wave' width={'100px'} />
                            </Box>
                        </Box>
                        <Box>
                            <Divider sx={{ marginTop: '8px', backgroundColor: '#dddddd' }} />
                        </Box>
                        <Box sx={{ marginTop: '16px' }}>
                            <Box>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={16} height={16} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={140} height={15} />
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={25} height={25} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={80} height={15} />
                                                <Skeleton animation='wave' variant='text' width={70} />
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={25} height={25} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={80} height={15} />
                                                <Skeleton animation='wave' variant='text' width={70} />
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={25} height={25} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={80} height={15} />
                                                <Skeleton animation='wave' variant='text' width={70} />
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={25} height={25} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={80} height={15} />
                                                <Skeleton animation='wave' variant='text' width={70} />
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={25} height={25} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={80} height={15} />
                                                <Skeleton animation='wave' variant='text' width={70} />
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={25} height={25} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={80} height={15} />
                                                <Skeleton animation='wave' variant='text' width={70} />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Divider sx={{ marginTop: '8px', backgroundColor: '#dddddd' }} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '8px 0 0 0 ', padding: '0 0 30px 0' }}>
                            <Skeleton animation='wave' variant='text' width={'50%'} />
                        </Box>
                        <Box>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Skeleton variant='rounded' animation='wave' width={'100%'} sx={{ height: '34px' }} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Skeleton variant='rounded' animation='wave' width={'100%'} sx={{ height: '34px' }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Skeleton variant='rounded' animation='wave' width={'100%'} sx={{ height: '34px' }} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Box sx={{ padding: '12px', boxShadow: '-2px 0px 7px rgba(0, 0, 0, 0.4)', marginTop: '16px', borderRadius: '6px', marginRight: '30px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Box>
                                <Skeleton animation='wave' variant='circular' height={30} width={30} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={150} />
                            </Box>
                        </Box>

                        <Box sx={{ margin: '12px 0 0 0' }}>
                            <Skeleton animation='wave' variant='rounded' width={'100%'} height={60} />
                        </Box>
                        <Box sx={{ margin: '12px 0 0 0' }}>
                            <Skeleton animation='wave' variant='rounded' width={'100%'} height={32} />
                        </Box>
                        <Box sx={{ margin: '12px 0 0 0', display: "flex", justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rounded' height={35} width={35} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={80} />
                                <Skeleton animation='wave' variant='text' width={50} />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
