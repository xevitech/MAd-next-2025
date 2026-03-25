import React, { useState } from 'react'
import { Box, Grid, Skeleton, Table, TableCell, TableContainer, TableRow } from "@mui/material";
const LeadInfo = () => {
    const [list,setList]= useState<any>([1,1,1,1])
  return (
    <>
    {list?.map((item,index)=>  <Box sx={{ border: '1px solid #e9e9e9', padding: '20px 20px', borderRadius: '6px', marginTop:"16px" }} key={index}>
    <Box sx={{ borderBottom: '1px  solid #e9e9e9', paddingBottom: '10px' }}>
        <Skeleton animation='wave' variant='text' width={'15%'} height={'45px'} />
    </Box>
    <Grid container spacing={2}>
        <Grid item xs={12} lg={6} xl={6}>
            <Box>
                <TableContainer>
                    <Table>
                        <TableRow>
                            <TableCell sx={{ paddingLeft: '0px' }}>
                                <Skeleton animation='wave' variant='text' width={'100%'} height={30}/>
                            </TableCell>
                            <TableCell>
                                <Skeleton animation='wave' variant='text' width={'100%'} height={30}/>
                            </TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6} xl={6}>
            <Box>
                <TableContainer>
                    <Table>
                        <TableRow>
                            <TableCell sx={{ paddingLeft: '0px' }}>
                                <Skeleton animation='wave' variant='text' width={'100%'} height={30}/>
                            </TableCell>
                            <TableCell>
                                <Skeleton animation='wave' variant='text' width={'100%'} height={30}/>
                            </TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6} xl={6}>
            <Box>
                <TableContainer>
                    <Table>
                        <TableRow>
                            <TableCell sx={{ paddingLeft: '0px' }}>
                                <Skeleton animation='wave' variant='text' width={'100%'} height={30} />
                            </TableCell>
                            <TableCell>
                                <Skeleton animation='wave' variant='text' width={'100%'} height={30} />
                            </TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6} xl={6}>
            <Box>
                <TableContainer>
                    <Table>
                        <TableRow>
                            <TableCell sx={{ paddingLeft: '0px' }}>
                                <Skeleton animation='wave' variant='text' width={'100%'} height={30} />
                            </TableCell>
                            <TableCell>
                                <Skeleton animation='wave' variant='text' width={'100%'} height={30} />
                            </TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            </Box>
        </Grid>
    </Grid>
  
</Box>)}
   
</>
  )
}

export default LeadInfo