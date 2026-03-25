import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import {
  CompanyFacilityInnContainerQAQCnRND,
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  UpImageName,
  UploadImagesRow,
} from "../../style";

export default function QaQcSkelton() {
  return (
    <div>
      <CompanyFacilityInnContainerQAQCnRND>
        <Box>
          <Skeleton variant="text" width={182} height={37} animation="wave" />
        </Box>
        <Grid container spacing={2} mt={0}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <DataRowHere>
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} sm={12} md={2}>
                      <DataRowTitle>
                        <Skeleton variant="text" animation="wave" width={180} />
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <Grid container spacing={2}>
                        <Grid item sm={6} md={6}>
                          <Skeleton variant="rounded" width={120} height={40} />
                        </Grid>
                        <Grid item sm={6} md={6}>
                          <Skeleton variant="rounded" width={120} height={40} />
                        </Grid>
                      </Grid>


                    </Grid>
                  </Grid>
                </DataRowHere>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={6}>
                <DataRowHere>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4}>
                      <DataRowTitle>
                        <Skeleton variant="text" animation="wave" width={180} />
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <DataRowValue>
                        <Skeleton variant="text" animation="wave" width={80} />
                      </DataRowValue>
                    </Grid>
                  </Grid>
                </DataRowHere>
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <DataRowHere>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4}>
                      <DataRowTitle>
                        <Skeleton variant="text" animation="wave" width={180} />
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <DataRowValue>
                        <Skeleton variant="text" animation="wave" width={80} />
                      </DataRowValue>
                    </Grid>
                  </Grid>
                </DataRowHere>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <DataRowHere>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4}>
                      <DataRowTitle>
                        <Skeleton variant="text" animation="wave" width={180} />
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <DataRowValue>
                        <Skeleton variant="text" animation="wave" width={80} />
                      </DataRowValue>
                    </Grid>
                  </Grid>
                </DataRowHere>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <DataRowHere>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4}>
                      <DataRowTitle>
                        <Skeleton variant="text" animation="wave" width={180} />
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <DataRowValue>
                        <Skeleton variant="text" animation="wave" width={80} />
                      </DataRowValue>
                    </Grid>
                  </Grid>
                </DataRowHere>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CompanyFacilityInnContainerQAQCnRND>
    </div>
  );
}
