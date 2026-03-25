import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function EditPostSkelton() {
    return (
        <>

            <Box sx={{ width: 'calc(100% - 0px)', marginLeft: '0px', marginTop: "58px", padding: "15px", }}>
                <Skeleton animation='wave' variant='text' width={'30%'} sx={{ margin: '18px 0px' }} />
                <Box sx={{ display: 'flex', width: '100%', gap: '15px', }}>
                    <Box sx={{ width: 'calc(100% - 240px)', margin: '0px 15px 0 0', "@media screen and (max-width:1024px)": { width: '100%', margin: '0px' } }}>
                        <Stack gap={'16px'} sx={{ width: '100%' }} >
                            <Box sx={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)', backgroundColor: '#fff', padding: '12px 16px', width: '100%', borderRadius: '6px' }}>
                                <Skeleton animation='wave' variant='text' height={28} width={'9%'} sx={{ "@media screen and (max-width:600px)": { width: '60% !important' } }} />
                                <Skeleton animation='wave' variant='text' width={'18%'} sx={{ padding: '6px 0 0 0', "@media screen and (max-width:600px)": { width: '40% !important' } }} />
                                <Skeleton animation='wave' variant='rounded' height={45} sx={{ margin: '8px 0 0 0' }} />
                            </Box>
                            <Box sx={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)', backgroundColor: '#fff', padding: '12px 16px', width: '100%', borderRadius: '6px' }}>
                                <Skeleton animation='wave' variant='text' height={28} width={'9%'} sx={{ "@media screen and (max-width:600px)": { width: '60% !important' } }} />
                                <Skeleton animation='wave' variant='text' width={'15%'} sx={{ padding: '6px 0 0 0', "@media screen and (max-width:600px)": { width: '40% !important' } }} />
                            </Box>
                            <Box sx={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)', backgroundColor: '#fff', padding: '12px 16px', width: '100%', borderRadius: '6px' }}>
                                <Skeleton animation='wave' variant='text' height={28} width={'9%'} sx={{ "@media screen and (max-width:600px)": { width: '60% !important' } }} />
                                <Skeleton animation='wave' variant='text' width={'13%'} sx={{ padding: '6px 0 0 0', "@media screen and (max-width:600px)": { width: '40% !important' } }} />
                            </Box>
                            <Box sx={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)', backgroundColor: '#fff', padding: '12px 16px', width: '100%', borderRadius: '6px' }}>
                                <Skeleton animation='wave' variant='text' height={28} width={'9%'} sx={{ "@media screen and (max-width:600px)": { width: '60% !important' } }} />
                                <Skeleton animation='wave' variant='text' width={'16%'} sx={{ padding: '6px 0 0 0', "@media screen and (max-width:600px)": { width: '40% !important' } }} />
                            </Box>
                            <Box sx={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)', backgroundColor: '#fff', padding: '12px 16px', width: '100%', borderRadius: '6px' }}>
                                <Skeleton animation='wave' variant='text' height={28} width={'9%'} sx={{ "@media screen and (max-width:600px)": { width: '60% !important' } }} />
                                <Skeleton animation='wave' variant='text' width={'14%'} sx={{ padding: '6px 0 0 0', "@media screen and (max-width:600px)": { width: '40% !important' } }} />
                            </Box>
                            <Box sx={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)', backgroundColor: '#fff', padding: '12px 16px', width: '100%', borderRadius: '6px' }}>
                                <Skeleton animation='wave' variant='text' height={28} width={'9%'} sx={{ "@media screen and (max-width:600px)": { width: '60% !important' } }} />
                                <Skeleton animation='wave' variant='text' width={'17%'} sx={{ padding: '6px 0 0 0', "@media screen and (max-width:600px)": { width: '40% !important' } }} />
                            </Box>
                        </Stack>
                    </Box>
                    <Box sx={{ width: '240px', boxShadow: '0px 0px 0px rgba(159, 162, 191, 0.18),0px 1px 0px rgba(159, 162, 191, 0.32)', backgroundColor: '#fff', padding: '10px', "@media screen and (max-width:1024px)": { display: 'none' } }}>
                        <Box sx={{ display: 'flex', justifyContent: "center" }} >
                            <Skeleton variant="circular" width="125px" height="125px" animation="wave" />
                        </Box>
                        <Box sx={{ margin: '10px 0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <Skeleton animation='wave' variant='text' width={'80%'} />
                            <Skeleton animation='wave' variant='text' width={'30%'} />
                        </Box>
                        <Box sx={{ margin: '0px 10px', }}>
                            <ul style={{ marginLeft: '30px' }}>
                                <li style={{}}>
                                    <Skeleton animation='wave' variant='text' width={'50%'} />
                                    <style>
                                        {`li::marker {color: rgba(0, 0, 0, 0.11);}`}
                                    </style>
                                </li>
                                <li style={{}}>
                                    <Skeleton animation='wave' variant='text' width={'30%'} />
                                    <style>
                                        {`li::marker {color: rgba(0, 0, 0, 0.11);}`}
                                    </style>
                                </li>
                                <li style={{}}>
                                    <Skeleton animation='wave' variant='text' width={'70%'} />
                                    <style>
                                        {`li::marker {color: rgba(0, 0, 0, 0.11);}`}
                                    </style>
                                </li>
                                <li style={{}}>
                                    <Skeleton animation='wave' variant='text' width={'30%'} />
                                    <style>
                                        {`li::marker {color: rgba(0, 0, 0, 0.11);}`}
                                    </style>
                                </li>
                                <li style={{}}>
                                    <Skeleton animation='wave' variant='text' width={'60%'} />
                                    <style>
                                        {`li::marker {color: rgba(0, 0, 0, 0.11);}`}
                                    </style>
                                </li>
                                <li style={{}}>
                                    <Skeleton animation='wave' variant='text' width={'40%'} />
                                    <style>
                                        {`li::marker {color: rgba(0, 0, 0, 0.11);}`}
                                    </style>
                                </li>
                            </ul>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: 'center', marginBottom: "12px" }}>
                            <Skeleton animation='wave' variant='rounded' width={'80%'} height={'30px'} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
