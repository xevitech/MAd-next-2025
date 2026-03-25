import { Box, Divider, Skeleton } from '@mui/material'
import React from 'react'

export default function SetRules() {
    return (
        <>
            <Box px={2}>
                <Box marginTop='38px'>
                    <Box>
                        <Skeleton animation='wave' width={190} height={30} />
                    </Box>
                    <Box>
                        <Skeleton animation='wave' width={140} />
                    </Box>
                </Box>
                <Box mt={1} p={2} sx={{ border: '1px solid #9FA2BF52', borderRadius: '6px' }}>
                    <Box marginTop='-3px'>
                        <Skeleton animation='wave' width={100} height={25} />
                    </Box>
                    <Box display='flex' alignItems={'center'} mb={3} mt={1}>
                        <Box>
                            <Skeleton variant="rounded" width={450} height={27}/>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Skeleton variant="rounded" width={25} height={23} />
                        </Box>
                    </Box>
                    <Divider sx={{borderStyle:'dashed'}}></Divider>
                    <Box display='flex' alignItems={'center'} mt={3} mb={4}>
                        <Box>
                            <Skeleton variant="rounded" width={450} height={25} />
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Skeleton variant="rounded" width={200} height={25} />
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Skeleton variant="rounded" width={25} height={23} />
                        </Box>
                    </Box>
                    <Divider sx={{borderStyle:'dashed'}}></Divider>
                    <Box display='flex' mt={3} mb={3}>
                        <Box>
                            <Skeleton variant="rounded" width={450} height={25} />
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Skeleton variant="rounded" width={290} height={25} />
                            <Box display='flex' mt={1}>
                                <Skeleton variant="rounded" width={65} height={25} sx={{}} />
                                <Skeleton variant="rounded" width={65} height={25} sx={{ ml: 2 }} />
                                <Skeleton variant="rounded" width={65} height={25} sx={{ ml: 2.3 }} />
                            </Box>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Skeleton variant="rounded" width={130} height={25} />
                        </Box>
                    </Box>
                </Box>
                <Box mt={5} p={2} sx={{ border: '1px solid #9FA2BF52', borderRadius: '6px' }}>
                    <Box my={1}>
                        <Skeleton animation='wave' width={140} height={20} />
                    </Box>
                    <Box display='flex' alignItems='center' mb={2}>
                        <Box>
                            <Skeleton variant='rounded' width={450} height={25} />
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Skeleton variant='rounded' width={25} height={23} />
                        </Box>
                    </Box>
                    <Divider></Divider>

                    <Box display='flex' alignItems='center' my={2}>
                        <Box>
                            <Skeleton variant='rounded' width={450} height={25} />
                        </Box>
                        <Box mx={2}>
                            <Skeleton variant='rounded' width={280} height={25} />
                        </Box>
                        <Box>
                            <Skeleton variant='rounded' width={130} height={25} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{float:'right',mt:2}}>
                    <Skeleton variant='rounded' width={100} height={30} />
                </Box>
            </Box>
        </>
    )
}