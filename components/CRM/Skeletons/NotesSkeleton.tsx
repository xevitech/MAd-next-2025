import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
const NotesSkeleton = () => {
    return (
        <>
            <Box sx={{ display: 'flex', gap: '20px', margin:"0 0 2% 2%"}}>
                <Box>
                    <Skeleton variant='circular' animation='wave' height={30} width={30} />
                </Box>
                <Box sx={{ width: '100%', padding: '10px', border:"1px solid #e9e9e9" }} >
                    <Box sx={{ width: '100%' }}>
                        <Skeleton animation='wave' variant='text' width="100%" />
                        <Skeleton animation='wave' variant='text' width="55%" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: "center", gap: "40px", marginTop: '8px' }}>
                        <Box>
                            <Skeleton animation='wave' variant='rounded' width={50} height={15} />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: 'center', gap: '15px' }}>
                            <Box>
                                <Skeleton animation='wave' variant='circular' height={20} width={20} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={50} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: '20px', margin:"0 0 2% 2%"}}>
                <Box>
                    <Skeleton variant='circular' animation='wave' height={30} width={30} />
                </Box>
                <Box sx={{ width: '100%', padding: '10px', border:"1px solid #e9e9e9" }} >
                    <Box sx={{ width: '100%' }}>
                        <Skeleton animation='wave' variant='text' width="100%" />
                        <Skeleton animation='wave' variant='text' width="55%" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: "center", gap: "40px", marginTop: '8px' }}>
                        <Box>
                            <Skeleton animation='wave' variant='rounded' width={50} height={15} />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: 'center', gap: '15px' }}>
                            <Box>
                                <Skeleton animation='wave' variant='circular' height={20} width={20} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={50} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: '20px', margin:"0 0 2% 2%"}}>
                <Box>
                    <Skeleton variant='circular' animation='wave' height={30} width={30} />
                </Box>
                <Box sx={{ width: '100%', padding: '10px', border:"1px solid #e9e9e9" }} >
                    <Box sx={{ width: '100%' }}>
                        <Skeleton animation='wave' variant='text' width="100%" />
                        <Skeleton animation='wave' variant='text' width="55%" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: "center", gap: "40px", marginTop: '8px' }}>
                        <Box>
                            <Skeleton animation='wave' variant='rounded' width={50} height={15} />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: 'center', gap: '15px' }}>
                            <Box>
                                <Skeleton animation='wave' variant='circular' height={20} width={20} />
                            </Box>
                            <Box>
                                <Skeleton animation='wave' variant='text' width={50} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NotesSkeleton;
