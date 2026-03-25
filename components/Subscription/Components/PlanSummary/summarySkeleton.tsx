import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box, Grid, TableHead,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const SummarySkeleton = () => {
  return (
    <>
      <Box sx={{ padding: '0px 16px' }}>
        <Box sx={{ margin: '16px 0 8px 0' }}>
          <Skeleton animation='wave' variant="text" width={'12%'} />
        </Box>
        <Box sx={{ border: '1px solid rgb(221, 221, 221)', borderRadius: "4px", padding: '12px 16px' }}>
          <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Box>
                <Skeleton animation='wave' variant="text" width={'50%'} />
                <Skeleton animation='wave' variant="text" width={'20%'} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={2}>
              <Box>
                <Skeleton animation='wave' variant="text" width={'50%'} />
                <Skeleton animation='wave' variant="text" width={'20%'} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={2}>
              <Box>
                <Skeleton animation='wave' variant="text" width={'50%'} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={2}>
              <Box>
                <Skeleton animation='wave' variant="text" width={'50%'} />
                <Skeleton animation='wave' variant="text" width={'20%'} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={2}>
              <Box>
                <Skeleton animation='wave' variant="text" width={'50%'} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={1}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Skeleton animation='wave' variant="rectangular" width={10} height={10} />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid rgb(221, 221, 221)', marginTop: '16px' }}>
            <Skeleton animation='wave' variant="text" sx={{ margin: '22px 0px 14px', width: '12%' }} />
          </Box>
          <Box sx={{ borderRadius: '4px', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'50%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'100%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'100%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'100%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'100%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'100%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'100%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={'30%'} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="rounded" width={'70%'} height={30} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* )} */}
            </TableContainer>
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default SummarySkeleton;
