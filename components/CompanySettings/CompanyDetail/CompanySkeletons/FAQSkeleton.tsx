import React from 'react'
import Grid from '@mui/material/Grid'
import { Paper, Skeleton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

export default function FaqSkeleton() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={{ mb: 2 }}>
                        <Box>
                            <Typography ><Skeleton animation="wave" width='30%' /></Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Skeleton animation="wave" width='100%' />
                            <Skeleton animation="wave" width='90%' />
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <Box>
                            <Typography ><Skeleton animation="wave" width='40%' /></Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Skeleton animation="wave" width='100%' />
                            <Skeleton animation="wave" width='90%' />
                        </Box>
                    </Box>
                    <Divider />
                </Grid>
            </Grid>
        </>
    )
}
