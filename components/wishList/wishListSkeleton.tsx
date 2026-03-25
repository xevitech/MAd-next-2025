import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";

export default function SkeletonWishList() {
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Skeleton animation="wave" variant="text" />
              </TableCell>
              {/* <TableCell></TableCell> */}
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton variant="rectangular" width={20} height={20} />
              </TableCell>
              <TableCell sx={{ minWidth: "42px" }}>
                <Skeleton animation="wave" variant="text" width={"10px"} />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box>
                    <Skeleton variant="circular" width={25} height={25} />
                  </Box>
                  <Box>
                    <Skeleton animation="wave" width={100} sx={{ ml: 2 }} />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={50} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={70} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={100} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={80} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={90} />
              </TableCell>
              <TableCell>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={80}
                  height={25}
                />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={80} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton variant="rectangular" width={20} height={20} />
              </TableCell>
              <TableCell sx={{ minWidth: "42px" }}>
                <Skeleton animation="wave" variant="text" width={"10px"} />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box>
                    <Skeleton variant="circular" width={25} height={25} />
                  </Box>
                  <Box>
                    <Skeleton animation="wave" width={100} sx={{ ml: 2 }} />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={50} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={70} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={100} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={80} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={90} />
              </TableCell>
              <TableCell>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={80}
                  height={25}
                />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={80} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton variant="rectangular" width={20} height={20} />
              </TableCell>
              <TableCell sx={{ minWidth: "42px" }}>
                <Skeleton animation="wave" variant="text" width={"10px"} />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box>
                    <Skeleton variant="circular" width={25} height={25} />
                  </Box>
                  <Box>
                    <Skeleton animation="wave" width={100} sx={{ ml: 2 }} />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={50} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={70} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={100} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={80} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={90} />
              </TableCell>
              <TableCell>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={80}
                  height={25}
                />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={80} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton variant="rectangular" width={20} height={20} />
              </TableCell>
              <TableCell sx={{ minWidth: "42px" }}>
                <Skeleton animation="wave" variant="text" width={"10px"} />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box>
                    <Skeleton variant="circular" width={25} height={25} />
                  </Box>
                  <Box>
                    <Skeleton animation="wave" width={100} sx={{ ml: 2 }} />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={50} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={70} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={100} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={80} />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={90} />
              </TableCell>
              <TableCell>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={80}
                  height={25}
                />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" width={80} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
