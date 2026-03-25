import React from 'react'
import Grid from '@mui/material/Grid'
import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

export default function SocialSkeleton() {
    return (
        <Box>
            <Grid container spacing={1} columnSpacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} mt={-1}>
                    <Box sx={{ display: 'flex', marginLeft: '10px', marginTop: '16px', gap: '10px' }}>
                        <Box sx={{ margin: '6px 0 0 0' }}>
                            <Skeleton
                                animation="wave"
                                variant="circular"
                                width={22}
                                height={22}
                            />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={140} variant='text' />
                            <Skeleton animation='wave' width={170} variant='text' />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} mt={-1}>
                    <Box sx={{ display: 'flex', marginLeft: '10px', marginTop: '16px', gap: '10px' }}>
                        <Box sx={{ margin: '6px 0 0 0' }}>
                            <Skeleton
                                animation="wave"
                                variant="circular"
                                width={22}
                                height={22}
                            />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' width={140} variant='text' />
                            <Skeleton animation='wave' width={180} variant='text' />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
            </Grid>
        </Box>
    )
}
