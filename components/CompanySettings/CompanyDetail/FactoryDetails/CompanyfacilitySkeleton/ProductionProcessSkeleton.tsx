import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import {
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  UploadImageCol,
  UploadImagesRow,
} from "../style";

export default function ProductionProcessSkeleton() {
  return (
    <>
      <Box sx={{ padding: "16px 0 16px 0" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <DataRowHere>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={2}>
                  <DataRowTitle>
                    <Typography>
                      <Skeleton animation="wave" width={"30%"} variant="text" />
                    </Typography>
                  </DataRowTitle>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <DataRowValue>
                    <Typography>
                      <Skeleton animation="wave" width={150} variant="text" />
                    </Typography>
                  </DataRowValue>
                </Grid>
              </Grid>
            </DataRowHere>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <DataRowHere>
              <Grid container spacing={1} alignItems={"center"}>
                <Grid item xs={12} sm={2} md={2}>
                  <DataRowTitle>
                    <Typography>
                      <Skeleton animation="wave"  width={'30%'} variant="text" />
                    </Typography>
                  </DataRowTitle>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} className="">
                  <DataRowValue>
                    <UploadImagesRow>
                      <UploadImageCol>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          width={150}
                          height={25}
                        ></Skeleton>
                      </UploadImageCol>
                      <UploadImageCol>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          width={150}
                          height={25}
                        ></Skeleton>
                      </UploadImageCol>
                      <UploadImageCol>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          width={150}
                          height={25}
                        ></Skeleton>
                      </UploadImageCol>
                    </UploadImagesRow>
                  </DataRowValue>
                </Grid>
              </Grid>
            </DataRowHere>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <DataRowHere>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={2}>
                  <DataRowTitle>
                    <Typography>
                      <Skeleton animation="wave" width={"30%"} variant="text" />
                    </Typography>
                  </DataRowTitle>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <DataRowValue>
                    <Typography>
                      <Skeleton animation="wave" width={550} variant="text" />
                    </Typography>
                  </DataRowValue>
                </Grid>
              </Grid>
            </DataRowHere>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
