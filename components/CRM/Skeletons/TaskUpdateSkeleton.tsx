import { Divider, Grid, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
const TaskUpdateSkeleton = () => {
    return (
        <Box sx={{ padding: '8px', }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box sx={{ mt: 2 }}>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'12%'} />
                            </Box>
                            <Box sx={{ marginTop: '6px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box sx={{ mt: 2 }}>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'12%'} />
                            </Box>
                            <Box sx={{ marginTop: '6px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box sx={{ mt: 2 }}>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'12%'} />
                            </Box>
                            <Box sx={{ marginTop: '6px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} xl={6}>
                        <Box sx={{ mt: 2 }}>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'12%'} />
                            </Box>
                            <Box sx={{ marginTop: '6px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                        <Box sx={{ mt: 2 }}>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={'12%'} />
                            </Box>
                            <Box sx={{ marginTop: '6px' }}>
                                <Skeleton animation='wave' variant='rounded' width={'100%'} height={33} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: '25px' }}>
                    <Box>
                        <Skeleton animation='wave' variant='rounded' width={'50%'} height={40} />
                    </Box>
                    <Box sx={{ marginTop: '6px' }}>
                        <Skeleton animation='wave' variant='text' width={'38%'} />
                    </Box>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Box>
                        <Skeleton animation='wave' variant='text' width={'8%'} />
                    </Box>
                    <Box sx={{ marginTop: '8px' }}>
                        <Skeleton animation='wave' variant='rounded' width={'100%'} height={130} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TaskUpdateSkeleton;
