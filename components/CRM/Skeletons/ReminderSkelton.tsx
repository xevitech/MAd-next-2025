import React from "react";
import {
  Box,
  Grid,
  Skeleton,
} from "@mui/material";
const ReminderSkelton = () => {
  return (
    <Box>
    <Box sx={{ padding: '15px 0 0px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Box sx={{ width: '100%', backgroundColor: "rgba(0, 0, 0, 0.12)", height: '1px' }}></Box>
        <Box sx={{ position: 'absolute', top: '5px', left: '2%', background: "#fff", padding: '0 6px' }}>
            <Skeleton animation='wave' variant='text' width={80} />
        </Box>
    </Box>
    <Box>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={11} md={11}>
                <Box sx={{ display: 'flex', gap: '12px', padding: "12px 8px 0px", alignItems: "center" }}>
                    <Box>
                        <Skeleton animation='wave' variant='rounded' width={14} height={14} />
                    </Box>
                    <Box>
                        <Skeleton animation='wave' variant='text' sx={{ width: '100px' }} />
                        <Skeleton animation='wave' variant='text' sx={{ width: '150px' }} />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={11} md={11} mt={-1}>
                <Box sx={{ display: 'flex', gap: '12px', padding: "12px 8px 0px", alignItems: "center" }}>
                    <Box>
                        <Skeleton animation='wave' variant='rounded' width={14} height={14} />
                    </Box>
                    <Box>
                        <Skeleton animation='wave' variant='text' sx={{ width: '100px' }} />
                        <Skeleton animation='wave' variant='text' sx={{ width: '150px' }} />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={11} md={11} mt={-1}>
                <Box sx={{ display: 'flex', gap: '12px', padding: "12px 8px 0px", alignItems: "center" }}>
                    <Box>
                        <Skeleton animation='wave' variant='rounded' width={14} height={14} />
                    </Box>
                    <Box>
                        <Skeleton animation='wave' variant='text' sx={{ width: '100px' }} />
                        <Skeleton animation='wave' variant='text' sx={{ width: '150px' }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Box>
    <Box sx={{ padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', margin: '12px 0 0 0' }}>
        <Box sx={{ width: '100%', backgroundColor: "rgba(0, 0, 0, 0.12)", height: '1px' }}></Box>
        <Box sx={{ position: 'absolute', top: '10', left: '2%', background: "#fff", padding: '0 6px' }}>
            <Skeleton animation='wave' variant='text' width={80} />
        </Box>
    </Box>
    <Box>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={11} md={11}>
                <Box sx={{ display: 'flex', gap: '12px', padding: "12px 8px 0px", alignItems: "center" }}>
                    <Box>
                        <Skeleton animation='wave' variant='rounded' width={14} height={14} />
                    </Box>
                    <Box>
                        <Skeleton animation='wave' variant='text' sx={{ width: '100px' }} />
                        <Skeleton animation='wave' variant='text' sx={{ width: '150px' }} />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={11} md={11} mt={-1}>
                <Box sx={{ display: 'flex', gap: '12px', padding: "12px 8px 0px", alignItems: "center" }}>
                    <Box>
                        <Skeleton animation='wave' variant='rounded' width={14} height={14} />
                    </Box>
                    <Box>
                        <Skeleton animation='wave' variant='text' sx={{ width: '100px' }} />
                        <Skeleton animation='wave' variant='text' sx={{ width: '150px' }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Box>
</Box>
  );
};

export default ReminderSkelton;
