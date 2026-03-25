import { Skeleton, Divider } from "@mui/material";
import Box from "@mui/material/Box";

export default function ProductItemSkelton({ data }: any) {
    return (
        <>
            <Box sx={{ border: '1px solid #e1e1e1', boxShadow: '0 3px 9px 0 rgba(0,0,0,.1)', borderRadius: "6px", }} key={data}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: '8px'
                    }}
                >
                    <Box style={{ display: "flex", alignItems: 'center' }}>
                        <Box>
                            <Skeleton animation="wave" width={20} height={20} variant="rectangular" sx={{ mr: 1 }} />
                        </Box>
                        <Box>
                            <Skeleton variant="text" animation="wave" width={100} />
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Skeleton variant="text" animation="wave" width={50} />
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ padding: '4px', border: '1px solid #e7e7e7', margin: '8px' }}>
                    <Skeleton variant="rectangular" animation='wave' width={'100%'} height={'150px'} />
                </Box>
                <Box sx={{ margin: '8px', borderBottom: '1px dashed #e7e7e7', paddingBottom: '10px' }}>
                    <Skeleton variant="text" animation='wave' width={'70%'} />
                </Box>

                <Box sx={{ borderBottom: "1px dashed #e7e7e7", paddingBottom: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                        <Box>
                            <Skeleton variant="text" animation='wave' width={40} />
                        </Box>
                        <Box>
                            <Skeleton variant="text" animation='wave' width={50} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                        <Box>
                            <Skeleton variant="text" animation='wave' width={60} />
                        </Box>
                        <Box>
                            <Skeleton variant="text" animation='wave' width={30} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                        <Box>
                            <Skeleton variant="text" animation='wave' width={60} />
                        </Box>
                        <Box>
                            <Skeleton variant="text" animation='wave' width={50} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 8px' }}>
                        <Box>
                            <Skeleton variant="text" animation='wave' width={70} />
                        </Box>
                        <Box>
                            <Skeleton variant="text" animation='wave' width={50} />
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ margin: '8px', padding: '8px', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ border: '1px solid #e7e7e7', padding: '3px 8px', minWidth: '100px', borderRadius: '4px' }}>
                        <Skeleton variant="text" animation='wave' width={'100%'} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}