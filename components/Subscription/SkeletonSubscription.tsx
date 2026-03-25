import { Box, Grid, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function SkeletonSubscription() {
    return (
        <>
            <Box sx={{ boxShadow: '0px 0px 0px rgba(159, 162, 191, 0.18),0px 1px 0px rgba(159, 162, 191, 0.32)', borderRadius: "6px", padding: '20px', backgroundColor: '#fff' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
                        <Box sx={{ border: '1px solid #EAEAEA', borderRadius: '6px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', gap: '12px', padding: '12px 16px' }}>
                                <Skeleton animation='wave' variant='text' width={80} />
                                <Skeleton animation='wave' variant='text' width={80} />
                            </Box>
                            <Box sx={{ margin: '12px 0 0 0', backgroundColor: '#f5f5f5', padding: '4px 16px' }}>
                                <Skeleton animation='wave' variant='text' width={'12%'} sx={{padding:'4px 0px'}} />
                            </Box>
                            <Box sx={{ margin: '20px 16px 0', padding: '0 0 24px 0', borderBottom: '1px solid #d2d2d2' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={9} lg={9}>
                                        <Box>
                                            <Skeleton animation='wave' variant='text' width={'100%'} height={'40px'} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                        <Box>
                                            <Skeleton animation='wave' variant='text' width={'80%'} height={'40px'} />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ padding: '0px 16px' }}>
                                <Box sx={{ margin: '16px 0 8px 0' }}>
                                    <Skeleton animation='wave' variant="text" width={'12%'} />
                                </Box>
                                <Box sx={{ border: '1px solid rgb(221, 221, 221)', borderRadius: "4px", padding: '12px 16px' }}>
                                    <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Grid item xs={12} sm={12} md={6} lg={3}>
                                            <Box>
                                                <Skeleton animation='wave' variant="text" width={'50%'} />
                                                <Skeleton animation='wave' variant="text" width={'20%'} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={2}>
                                            <Box>
                                                <Skeleton animation='wave' variant="text" width={'50%'} />
                                                <Skeleton animation='wave' variant="text" width={'20%'} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={2}>
                                            <Box>
                                                <Skeleton animation='wave' variant="text" width={'50%'} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={2}>
                                            <Box>
                                                <Skeleton animation='wave' variant="text" width={'50%'} />
                                                <Skeleton animation='wave' variant="text" width={'20%'} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={2}>
                                            <Box>
                                                <Skeleton animation='wave' variant="text" width={'50%'} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={1}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Skeleton animation='wave' variant="rectangular" width={10} height={10} />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ borderTop: '1px solid rgb(221, 221, 221)', marginTop: '16px' }}>
                                        <Skeleton animation='wave' variant="text" sx={{ margin: '22px 0px 14px', width: '12%' }} />
                                    </Box>
                                    <Box sx={{ borderRadius: '4px', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px' }}>
                                        <TableContainer>
                                            <Table sx={{ minWidth: 650 }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'50%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'100%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'100%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'100%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'100%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'100%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'100%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="text" width={'30%'} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
                        <Stack gap={'32px'}>
                            <Box>
                                <Skeleton animation='wave' variant='rounded' height={'447px'} width={'100%'} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' variant='rounded' height={'388px'} width={'100%'} />
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
