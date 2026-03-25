import { Skeleton } from "@mui/lab";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

export default function ReviewSkelton({ key }) {
    return (<>
        <Box
            sx={{
                background: "#fff",
                boxShadow: '0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)',
                borderRadius: '6px',
               
                p: 2
            }}>
            <Grid key={key} container spacing={{ xs: 2 }}>
                <Grid item xs={12} sm={12} md={4}>
                    <Box sx={{ borderBottom: '1px solid rgba(217, 217, 217, 1)' }}>
                        <Skeleton animation='wave' variant="text" width={'35%'} height={30} />
                        <Skeleton animation='wave' variant="text" width={'15%'} sx={{ marginLeft: '4px' }} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '8px', width: "100%", margin: '12px 0px' }}>
                        <Box sx={{}}>
                            <Skeleton animation='wave' variant="text" width={30} />
                        </Box>
                        <Box sx={{}}>
                            <Skeleton animation='wave' variant="text" width={100} />
                        </Box>
                        <Box sx={{}}>
                            <Skeleton animation='wave' variant="text" width={100} />
                        </Box>
                    </Box>
                    <Box>
                        <Skeleton animation='wave' variant="text" width={'40%'} />
                    </Box>
                    <Box sx={{ padding: '0px 10px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0px' }}>
                            <Box>
                                <Skeleton animation='wave' width={30} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton animation='wave' width={'100%'} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' width={30} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0px' }}>
                            <Box>
                                <Skeleton animation='wave' width={30} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton animation='wave' width={'100%'} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' width={30} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0px' }}>
                            <Box>
                                <Skeleton animation='wave' width={30} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton animation='wave' width={'100%'} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' width={30} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0px' }}>
                            <Box>
                                <Skeleton animation='wave' width={30} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton animation='wave' width={'100%'} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' width={30} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0px' }}>
                            <Box>
                                <Skeleton animation='wave' width={30} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton animation='wave' width={'100%'} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' width={30} />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Box sx={{ borderBottom: '1px solid rgba(217, 217, 217, 1)', padding: '11px 0px 11px 0px' }}>
                        <Skeleton animation='wave' variant="text" width={'35%'} height={30} />
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Box sx={{ display: 'flex', gap: '8px', width: "100%", margin: '35px 0px' }}>
                                <Box sx={{ width: '100%' }}>
                                    <Skeleton animation='wave' variant="rounded" width={'100%'} height={40} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '8px', width: "100%", margin: '35px 0px' }}>
                                <Box sx={{ width: '100%' }}>
                                    <Skeleton animation='wave' variant="rounded" width={'100%'} height={40} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '8px', width: "100%", margin: '35px 0px' }}>
                                <Box sx={{ width: '100%' }}>
                                    <Skeleton animation='wave' variant="rounded" width={'100%'} height={40} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <Box sx={{ width: "100%", margin: '35px 0px', backgroundColor: "#F9F9F9", p: 2 }}>
                                <Box sx={{ borderBottom: '1px solid rgba(217, 217, 217, 1)', width: '100%', pb: 1 }}>
                                    <Skeleton animation='wave' variant="text" width={'30%'} />
                                </Box>
                                <Box sx={{ p: .5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0px' }}>
                                        <Box>
                                            <Skeleton animation='wave' width={30} />
                                        </Box>
                                        <Box sx={{ width: '100%' }}>
                                            <Skeleton animation='wave' width={'100%'} />
                                        </Box>
                                        <Box>
                                            <Skeleton animation='wave' width={30} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0px' }}>
                                        <Box>
                                            <Skeleton animation='wave' width={30} />
                                        </Box>
                                        <Box sx={{ width: '100%' }}>
                                            <Skeleton animation='wave' width={'100%'} />
                                        </Box>
                                        <Box>
                                            <Skeleton animation='wave' width={30} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0px' }}>
                                        <Box>
                                            <Skeleton animation='wave' width={30} />
                                        </Box>
                                        <Box sx={{ width: '100%' }}>
                                            <Skeleton animation='wave' width={'100%'} />
                                        </Box>
                                        <Box>
                                            <Skeleton animation='wave' width={30} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0px' }}>
                                        <Box>
                                            <Skeleton animation='wave' width={30} />
                                        </Box>
                                        <Box sx={{ width: '100%' }}>
                                            <Skeleton animation='wave' width={'100%'} />
                                        </Box>
                                        <Box>
                                            <Skeleton animation='wave' width={30} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0px' }}>
                                        <Box>
                                            <Skeleton animation='wave' width={30} />
                                        </Box>
                                        <Box sx={{ width: '100%' }}>
                                            <Skeleton animation='wave' width={'100%'} />
                                        </Box>
                                        <Box>
                                            <Skeleton animation='wave' width={30} />
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    </>
    )
}