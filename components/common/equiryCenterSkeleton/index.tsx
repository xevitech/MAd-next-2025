import React from "react";
import {
  Box,
  Divider,
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  MainBox,
  SecondSkeletonBox,
  SideBox,
  SkeletonBox,
} from "@/components/CRM/commonStyle";

function EquiryCenterSkeleton() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "6px",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <SecondSkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={80} />
            </SecondSkeletonBox>
            <SecondSkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={80} />
            </SecondSkeletonBox>
            <SecondSkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={80} />
            </SecondSkeletonBox>
            <SecondSkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={80} />
            </SecondSkeletonBox>
            <SecondSkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={80} />
            </SecondSkeletonBox>
            <SecondSkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={80} />
            </SecondSkeletonBox>
          </Box>
        </Box>
        <Skeleton variant="rounded" width={140} height={30} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} xl={2.2}>
          <SideBox>
            <Box sx={{ paddingLeft: "12px" }}>
              <Skeleton variant="text" width={120} height={40} />
              <Skeleton variant="rounded" width={240} height={30} />
              <Skeleton variant="text" width={140} height={40} />
            </Box>
            <Divider />
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>{" "}
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
            <SkeletonBox>
              <Skeleton variant="text" width={20} height={30} />
              <Skeleton variant="text" width={120} />
            </SkeletonBox>
          </SideBox>
        </Grid>
        <Grid item xs={12} sm={12} md={9} xl={9.8}>
          <MainBox>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>

                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={120}
                        sx={{ paddingLeft: "10px" }}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>

                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>{" "}
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>

                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SecondSkeletonBox>
                        <Skeleton variant="text" width={20} height={30} />
                        <Skeleton variant="text" width={120} />
                      </SecondSkeletonBox>
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </TableCell>

                    <TableCell>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </MainBox>
        </Grid>
      </Grid>
    </>
  );
}

export default EquiryCenterSkeleton;
