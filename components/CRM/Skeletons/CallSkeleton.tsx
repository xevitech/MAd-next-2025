import { Divider, Grid, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
const CallSkeleton = () => {
    return (
        <Box sx={{ border: '1px solid #e6e6e6', padding: '12px' }}>
            <Box sx={{ border: '1px solid #e6e6e6', padding: '12px 8px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton animation='wave' variant='text' width={'12%'} height={30} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <Box>
                            <Skeleton animation='wave' variant='rounded' width={80} height={25} />
                        </Box>
                        <Box>
                            <Skeleton animation='wave' variant='rounded' width={80} height={25} />
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ marginTop: '8px' }} />

                <Grid container spacing={2} sx={{ marginTop: '6px' }}>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'8%'} />
                            </Box>
                            <Box sx={{ marginTop: '4px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'8%'} />
                            </Box>
                            <Box sx={{ marginTop: '4px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'8%'} />
                            </Box>
                            <Box sx={{ marginTop: '4px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'8%'} />
                            </Box>
                            <Box sx={{ marginTop: '4px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'8%'} />
                            </Box>
                            <Box sx={{ marginTop: '4px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'8%'} />
                            </Box>
                            <Box sx={{ marginTop: '4px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'8%'} />
                            </Box>
                            <Box sx={{ marginTop: '4px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'8%'} />
                            </Box>
                            <Box sx={{ marginTop: '4px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ marginTop: '20px', border: '1px solid #e6e6e6', padding: '12px 8px' }}>
                <Box sx={{ width: '100%' }}>
                    <Skeleton animation='wave' variant='text' width={'12%'} height={30} />
                </Box>
                <Box sx={{ marginTop: '12px' }}>
                    <Box>
                        <Skeleton animation='wave' variant='text' width={'8%'} />
                    </Box>
                    <Box sx={{ marginTop: '4px' }}>
                        <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                    </Box>
                </Box>
                <Box sx={{ marginTop: '12px' }}>
                    <Box>
                        <Skeleton animation='wave' variant='text' width={'8%'} />
                    </Box>
                    <Box sx={{ marginTop: '4px' }}>
                        <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CallSkeleton;
