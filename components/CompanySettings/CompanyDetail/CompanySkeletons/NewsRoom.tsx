import { Paper, Grid, Typography, Skeleton, Divider } from '@mui/material'
import { Box } from '@mui/system'
import {
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import React from 'react'

export default function NewsSkeleton() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow sx={{}}>
                                        <TableCell sx={{ padding: '16px 0px 16px 16px' }}>
                                            <Skeleton variant="rounded" width={15} height={15} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px 0px 16px 16px', display: 'flex',  }}>
                                            <Skeleton animation="wave" variant="circular" width={36} height={36}  />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px 0px 0px 16px' }}>
                                            <Skeleton variant="rounded"  style={{ marginLeft: 140 }}  width={'20%'}/>
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100}  />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{}}>
                                        <TableCell sx={{ padding: '16px 0px 16px 16px' }}>
                                            <Skeleton variant="rounded" width={15} height={15} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px 0px 16px 16px', display: 'flex',  }}>
                                            <Skeleton animation="wave" variant="circular" width={36} height={36}  />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px 0px 0px 16px' }}>
                                            <Skeleton variant="rounded"  style={{ marginLeft: 140 }}  width={'20%'}/>
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100}  />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{}}>
                                        <TableCell sx={{ padding: '16px 0px 16px 16px' }}>
                                            <Skeleton variant="rounded" width={15} height={15} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px 0px 16px 16px', display: 'flex',  }}>
                                            <Skeleton animation="wave" variant="circular" width={36} height={36}  />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px 0px 0px 16px' }}>
                                            <Skeleton variant="rounded"  style={{ marginLeft: 140 }}  width={'20%'}/>
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100}  />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{}}>
                                        <TableCell sx={{ padding: '16px 0px 16px 16px' }}>
                                            <Skeleton variant="rounded" width={15} height={15} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px 0px 16px 16px', display: 'flex',  }}>
                                            <Skeleton animation="wave" variant="circular" width={36} height={36}  />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px 0px 0px 16px' }}>
                                            <Skeleton variant="rounded"  style={{ marginLeft: 140 }}  width={'20%'}/>
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100}  />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '0px' }}>
                                            <Skeleton variant="rounded" width={100} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}