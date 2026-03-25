import { Box, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { RolNameSkl } from './style'

function RolesSkelton() {
  return (
    <div>
        <Box>
        <Skeleton animation="wave" variant="text" width={110} height={40} />
        <Skeleton animation="wave" variant="text" width={180} height={40} />
        <RolNameSkl>
        <Skeleton animation="wave" variant="rounded" width={730} height={37} />
        <Skeleton animation="wave" variant="rounded" width={730} height={37} />
       
        </RolNameSkl>
        <Box>
          <Table>
        <TableHead>
          <TableRow sx={{borderBottom:'1px solid #e0e0e0'}}>
            <TableCell sx={{borderBottom:'none'}}>
              <Skeleton animation="wave" variant="text" width={"200px"} />
            </TableCell>
            <TableCell sx={{borderBottom:'none'}}>
                <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <Skeleton animation="wave" variant="text" width={"28px"} height={"31px"} />
                  <Skeleton animation="wave" variant="text" width={"60px"} />
                </Box>
            </TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 1, 1, 1, 1, 1].map((ele, index) => (
            <TableRow>
              <TableCell>
                <Skeleton animation="wave" variant="text" width={"200px"} />
              </TableCell>
              <TableCell>
            <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <Skeleton animation="wave" variant="text" width={"28px"} height={"31px"} />
                  <Skeleton animation="wave" variant="text" width={"60px"} />
                </Box>
            </TableCell>
            <TableCell>
            <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <Skeleton animation="wave" variant="text" width={"28px"} height={"31px"} />
                  <Skeleton animation="wave" variant="text" width={"60px"} />
                </Box>
            </TableCell>
            <TableCell>
            <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <Skeleton animation="wave" variant="text" width={"28px"} height={"31px"} />
                  <Skeleton animation="wave" variant="text" width={"60px"} />
                </Box>
            </TableCell>
            <TableCell>
            <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <Skeleton animation="wave" variant="text" width={"28px"} height={"31px"} />
                  <Skeleton animation="wave" variant="text" width={"60px"} />
                </Box>
            </TableCell>
            <TableCell>
            <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <Skeleton animation="wave" variant="text" width={"28px"} height={"31px"} />
                  <Skeleton animation="wave" variant="text" width={"60px"} />
                </Box>
            </TableCell>
            <TableCell>
            <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <Skeleton animation="wave" variant="text" width={"28px"} height={"31px"} />
                  <Skeleton animation="wave" variant="text" width={"60px"} />
                </Box>
            </TableCell>      
             </TableRow>
          ))}
        </TableBody>
      </Table>
        </Box>
        </Box>
    </div>
  )
}

export default RolesSkelton
