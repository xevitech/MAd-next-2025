import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
const TagsSkeleton = () => {
    return (
        <>
           <Box sx={{display:"flex",gap:"4px"}}>
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={40}
                    height={30}
                    sx={{
                        borderRadius: '0 25px 25px 0',
                    }}
                />
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={50}
                    height={30}
                    sx={{
                        borderRadius: '0 25px 25px 0', 
                    }}
                />
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={60}
                    height={30}
                    sx={{
                        borderRadius: '0 25px 25px 0', 
                    }}
                />
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={50}
                    height={30}
                    sx={{
                        borderRadius: '0 25px 25px 0',
                    }}
                />
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={40}
                    height={30}
                    sx={{
                        borderRadius: '0 25px 25px 0',
                    }}
                />
            </Box>
        </>
    );
};

export default TagsSkeleton;
