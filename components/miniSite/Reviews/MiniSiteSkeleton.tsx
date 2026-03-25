import React from 'react'
import Grid from '@mui/material/Grid'
import { Box, Divider, Skeleton, Stack } from '@mui/material'

export default function MiniSiteSkeleton() {
    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12} sx={{ margin: "0px 0 0 0 " }}>
                    <Box sx={{ backgroundImage: " url(/_next/static/media/greadientbg.fc7173e5.png)", padding: '23px 100px 16px 100px', "@media screen and (max-width:1536px)": { padding: '23px 36px 16px 36px' } }}>
                        <Grid container spacing={0} alignItems={'center'}>
                            <Grid item xs={7} sm={7} md={7} lg={7} xl={8}>
                                <Box sx={{ display: 'flex', gap: '4px', "@media screen and (max-width:1024px)": { alignItems: 'center' } }}>
                                    <Box sx={{ "@media screen and (max-width:900px)": { display: 'none' } }}>
                                        <Skeleton animation='wave' variant='circular' width={'100px'} height={'100px'} sx={{ margin: '0 0 16px 0' }} />
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Skeleton animation='wave' variant='text' width={'80px'} height={'28px'} />
                                            <Skeleton animation='wave' variant='text' width={'40px'} />
                                            <Skeleton animation='wave' variant='text' width={'50px'} height={'28px'} />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '-4px 0 0 0' }}>
                                            <Skeleton animation='wave' variant='text' width={'80px'} height={'35px'} sx={{ "@media screen and (max-width:1024px)": { display: 'none' } }} />
                                            <Skeleton animation='wave' variant='text' width={'50px'} />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '-4px 0 0 0', "@media screen and (max-width:900px)": { display: 'none' } }}>
                                            <Skeleton animation='wave' variant='text' width={'50px'} sx={{ "@media screen and (max-width:1024px)": { display: 'none' } }} />
                                            <Skeleton animation='wave' variant='text' width={'80px'} height={'35px'} />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '-4px 0 0 0', "@media screen and (max-width:1024px)": { display: 'none' } }}>
                                            <Skeleton animation='wave' variant='text' width={'50px'} />
                                            <Skeleton animation='wave' variant='text' width={'80px'} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5} xl={4} sx={{ "@media screen and (max-width:1024px)": { justifyContent: 'flex-end' }, "@media screen and (max-width:900px)": { justifyContent: 'flex-end' }, "@media screen and (max-width:600px)": { display: 'none' } }}>
                                <Stack sx={{ gap: '12px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'end', }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', "@media screen and (max-width:900px)": { flexDirection: 'column-reverse', alignItems: 'flex-end' } }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={'50px'} height={'23px'} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={'174px'} height={'38px'} />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end', "@media screen and (max-width:1024px)": { display: 'none' } }}>
                                        <Box sx={{ margin: '0 16px 0 0', padding: '0 16px 0 0', borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={'30px'} height={'20px'} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={'100px'} />
                                            </Box>
                                        </Box>
                                        <Box sx={{ margin: '0 16px 0 0', padding: '0 16px 0 0', borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={'70px'} height={'20px'} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={'100px'} />
                                            </Box>
                                        </Box>
                                        <Box sx={{ margin: '0 0px 0 0', padding: '0 0px 0 0', }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='rounded' width={'150px'} height={'20px'} />
                                            </Box>
                                            <Box>
                                                <Skeleton animation='wave' variant='text' width={'100px'} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ backgroundColor: '#fff', padding: '0px 100px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px', display: 'flex', alignItems: "center", gap: '12px', width: '100%', "@media screen and (max-width:800px)": { padding: '0px 20px', overflow: 'auto' } }}>
                <Box sx={{ padding: '14px 12px' }}>
                    <Skeleton animation='wave' variant='text' width={'100px'} />
                </Box>
                <Box sx={{ padding: '14px 12px' }}>
                    <Skeleton animation='wave' variant='text' width={'100px'} />
                </Box>
                <Box sx={{ padding: '14px 12px' }}>
                    <Skeleton animation='wave' variant='text' width={'100px'} />
                </Box>
                <Box sx={{ padding: '14px 12px' }}>
                    <Skeleton animation='wave' variant='text' width={'100px'} />
                </Box>
                <Box sx={{ padding: '14px 12px' }}>
                    <Skeleton animation='wave' variant='text' width={'100px'} />
                </Box>
            </Box>
            <Box>
                <Skeleton animation='wave' variant='rectangular' width={'100%'} sx={{ height: '421px', "@media screen and (max-width:1024px)": { height: '226px' } }} />
            </Box>
            <Box sx={{ padding: '14px 24px', margin: '18px 100px 0 100px', backgroundColor: '#fff', boxShadow: 'rgba(159, 162, 191, 0.18) 0px 0px 0px, rgba(159, 162, 191, 0.32) 0px 1px 0px', "@media screen and (max-width:800px)": { margin: '18px 20px 0 20px' }, "@media screen and (max-width:480px)": { margin: '18px 0px 0 0px' } }}>
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', "@media screen and (max-width:1024px)": {
                        display: 'block'
                    }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)', margin: '0 16px 0 0', padding: '0 16px 0 0', }}>
                            <Skeleton animation='wave' variant='text' height={'26px'} sx={{
                                width: '130px', "@media screen and (max-width:900px)": {
                                    width: '70px'
                                }
                            }} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' variant='text' sx={{
                                width: '100px', "@media screen and (max-width:900px)": {
                                    width: '70px'
                                }
                            }} />
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{
                            border: '1px solid rgb(204, 206, 221)', borderRadius: '100px', overflow: 'hidden', "@media screen and (max-width:900px)": {
                                margin: '12px 0 0 0'
                            }
                        }}>
                            <Skeleton animation='wave' variant='rounded' height={'37px'} sx={{
                                width: '490px',
                                "@media screen and (max-width:1024px)": {
                                    width: '100%'
                                }
                            }} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ border: '1px solid rgb(221, 221, 221)', backgroundColor: 'rgb(251, 251, 251)', margin: '12px 0px 0px', borderRadius: '8px', padding: '10px 20px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'auto' }}>
                        <Stack sx={{ gap: '6px', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' height={'36px'} width={'36px'} />
                            </Box>
                            <Box>
                                <Skeleton variant='text' animation='wave' width={'80px'} />
                            </Box>
                        </Stack>
                        <Stack sx={{ gap: '6px', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' height={'36px'} width={'36px'} />
                            </Box>
                            <Box>
                                <Skeleton variant='text' animation='wave' width={'80px'} />
                            </Box>
                        </Stack>
                        <Stack sx={{ gap: '6px', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' height={'36px'} width={'36px'} />
                            </Box>
                            <Box>
                                <Skeleton variant='text' animation='wave' width={'80px'} />
                            </Box>
                        </Stack>
                        <Stack sx={{ gap: '6px', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' height={'36px'} width={'36px'} />
                            </Box>
                            <Box>
                                <Skeleton variant='text' animation='wave' width={'80px'} />
                            </Box>
                        </Stack>
                        <Stack sx={{ gap: '6px', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' height={'36px'} width={'36px'} />
                            </Box>
                            <Box>
                                <Skeleton variant='text' animation='wave' width={'80px'} />
                            </Box>
                        </Stack>
                        <Stack sx={{ gap: '6px', alignItems: 'center' }}>
                            <Box>
                                <Skeleton animation='wave' variant='rectangular' height={'36px'} width={'36px'} />
                            </Box>
                            <Box>
                                <Skeleton variant='text' animation='wave' width={'80px'} />
                            </Box>
                        </Stack>
                    </Box>
                </Box>
                <Box sx={{ margin: '24px 0 0 0' }}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Box sx={{ border: '1px solid #e1e1e1', boxShadow: '0 3px 9px 0 rgba(0,0,0,.1)', borderRadius: "6px", }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: '8px'
                                    }}
                                >
                                    <Box style={{ display: "flex", alignItems: 'center' }}>
                                        <Box>
                                            <Skeleton animation="wave" width={20} height={20} variant="rectangular" sx={{ mr: 1 }} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation="wave" width={100} />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Skeleton variant="text" animation="wave" width={50} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box sx={{ padding: '4px', border: '1px solid #e7e7e7', margin: '8px' }}>
                                    <Skeleton variant="rectangular" animation='wave' width={'100%'} height={'150px'} />
                                </Box>
                                <Box sx={{ margin: '8px', borderBottom: '1px dashed #e7e7e7', paddingBottom: '10px' }}>
                                    <Skeleton variant="text" animation='wave' width={'70%'} />
                                </Box>

                                <Box sx={{ borderBottom: "1px dashed #e7e7e7", paddingBottom: '10px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={40} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={60} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={30} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={60} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={70} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ margin: '8px', padding: '8px', display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ border: '1px solid #e7e7e7', padding: '3px 8px', minWidth: '100px', borderRadius: '4px' }}>
                                        <Skeleton variant="text" animation='wave' width={'100%'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Box sx={{ border: '1px solid #e1e1e1', boxShadow: '0 3px 9px 0 rgba(0,0,0,.1)', borderRadius: "6px", }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: '8px'
                                    }}
                                >
                                    <Box style={{ display: "flex", alignItems: 'center' }}>
                                        <Box>
                                            <Skeleton animation="wave" width={20} height={20} variant="rectangular" sx={{ mr: 1 }} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation="wave" width={100} />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Skeleton variant="text" animation="wave" width={50} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box sx={{ padding: '4px', border: '1px solid #e7e7e7', margin: '8px' }}>
                                    <Skeleton variant="rectangular" animation='wave' width={'100%'} height={'150px'} />
                                </Box>
                                <Box sx={{ margin: '8px', borderBottom: '1px dashed #e7e7e7', paddingBottom: '10px' }}>
                                    <Skeleton variant="text" animation='wave' width={'70%'} />
                                </Box>

                                <Box sx={{ borderBottom: "1px dashed #e7e7e7", paddingBottom: '10px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={40} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={60} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={30} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={60} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={70} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ margin: '8px', padding: '8px', display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ border: '1px solid #e7e7e7', padding: '3px 8px', minWidth: '100px', borderRadius: '4px' }}>
                                        <Skeleton variant="text" animation='wave' width={'100%'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Box sx={{ border: '1px solid #e1e1e1', boxShadow: '0 3px 9px 0 rgba(0,0,0,.1)', borderRadius: "6px", }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: '8px'
                                    }}
                                >
                                    <Box style={{ display: "flex", alignItems: 'center' }}>
                                        <Box>
                                            <Skeleton animation="wave" width={20} height={20} variant="rectangular" sx={{ mr: 1 }} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation="wave" width={100} />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Skeleton variant="text" animation="wave" width={50} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box sx={{ padding: '4px', border: '1px solid #e7e7e7', margin: '8px' }}>
                                    <Skeleton variant="rectangular" animation='wave' width={'100%'} height={'150px'} />
                                </Box>
                                <Box sx={{ margin: '8px', borderBottom: '1px dashed #e7e7e7', paddingBottom: '10px' }}>
                                    <Skeleton variant="text" animation='wave' width={'70%'} />
                                </Box>

                                <Box sx={{ borderBottom: "1px dashed #e7e7e7", paddingBottom: '10px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={40} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={60} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={30} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={60} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={70} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ margin: '8px', padding: '8px', display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ border: '1px solid #e7e7e7', padding: '3px 8px', minWidth: '100px', borderRadius: '4px' }}>
                                        <Skeleton variant="text" animation='wave' width={'100%'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Box sx={{ border: '1px solid #e1e1e1', boxShadow: '0 3px 9px 0 rgba(0,0,0,.1)', borderRadius: "6px", }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: '8px'
                                    }}
                                >
                                    <Box style={{ display: "flex", alignItems: 'center' }}>
                                        <Box>
                                            <Skeleton animation="wave" width={20} height={20} variant="rectangular" sx={{ mr: 1 }} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation="wave" width={100} />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Skeleton variant="text" animation="wave" width={50} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box sx={{ padding: '4px', border: '1px solid #e7e7e7', margin: '8px' }}>
                                    <Skeleton variant="rectangular" animation='wave' width={'100%'} height={'150px'} />
                                </Box>
                                <Box sx={{ margin: '8px', borderBottom: '1px dashed #e7e7e7', paddingBottom: '10px' }}>
                                    <Skeleton variant="text" animation='wave' width={'70%'} />
                                </Box>

                                <Box sx={{ borderBottom: "1px dashed #e7e7e7", paddingBottom: '10px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={40} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={60} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={30} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={60} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={70} />
                                        </Box>
                                        <Box>
                                            <Skeleton variant="text" animation='wave' width={50} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ margin: '8px', padding: '8px', display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ border: '1px solid #e7e7e7', padding: '3px 8px', minWidth: '100px', borderRadius: '4px' }}>
                                        <Skeleton variant="text" animation='wave' width={'100%'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
