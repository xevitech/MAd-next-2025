import { Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";

export default function ServicesSkeleton() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box style={{ width: '100%' }}>
            <TableContainer>
              <Skeleton
                width="100%"
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Skeleton variant="rectangular" width={15} height={15} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" width={100}
                          style={{ marginRight: 80, }}
                        />
                      </TableCell>
                      <TableCell>
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          variant="rounded"
                          width={100}
                          style={{ marginRight: 120 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          variant="rounded"
                          width={100}
                          style={{ marginRight: 80 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" width={100} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Skeleton>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
