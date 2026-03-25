import { Grid, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
const ActivitySkeleton = () => {
    const dummy = [1, 1, 1, 1, 1, 1, 1, 1, 1]
    return (
        <Grid container spacing={2} sx={{marginTop:'20px'}}>
            {
                dummy?.map((ele) => (
                    <Grid item xs={12} sm={4} lg={4} xl={4}>
                        <Box sx={{ border: '1px solid #e5e5e5', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                            <Box sx={{}}>
                                <Box sx={{ padding: '6px 6px 6px 16px', borderBottom: '1px solid #e5e5e5' }}>
                                    <Skeleton animation='wave' variant='text' width={'25%'} />
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: '8px' }}>
                                <Box sx={{ padding: '6px', }}>
                                    <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.11)', padding: '20px 10px 20px 10px', borderRadius: '6px' }}>
                                        <Skeleton animation='wave' variant='text' width={100} />
                                        <Box sx={{ padding: '10px', display: 'flex', gap: '15px' }}>
                                            <Box>
                                                <Skeleton animation='wave' variant='circular' height={35} width={35} />
                                            </Box>
                                            <Box sx={{ width: '100%' }}>
                                                <Skeleton animation='wave' variant='text' width={'19%'} />
                                                <Skeleton animation='wave' variant='text' width={'30%'} />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <Box>
                                                <Skeleton variant='rounded' animation='wave' height={30} width={90} />
                                            </Box>
                                            <Box>
                                                <Skeleton variant='rounded' animation='wave' height={30} width={90} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))
            }


        </Grid>
    );
};

export default ActivitySkeleton;
