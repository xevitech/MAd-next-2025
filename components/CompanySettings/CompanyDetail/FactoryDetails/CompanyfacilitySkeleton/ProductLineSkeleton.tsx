import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import { DataRowHere, DataRowTitle, DataRowValue } from "../style";

export default function ProductLineSkeleton() {
  return (
    <>
      <Box sx={{ padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <DataRowHere>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4}>
                      <DataRowTitle>
                        <Typography>
                          <Skeleton
                            animation="wave"
                            width={"30%"}
                            variant="text"
                          />
                        </Typography>
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <DataRowValue>
                        <Typography>
                          <Skeleton
                            animation="wave"
                            width={150}
                            variant="text"
                          />
                        </Typography>
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
                        <Typography>
                          <Skeleton
                            animation="wave"
                            width={"30%"}
                            variant="text"
                          />
                        </Typography>
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <DataRowValue>
                        <Typography>
                          <Skeleton
                            animation="wave"
                            width={250}
                            variant="text"
                          />
                        </Typography>
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
                        <Typography>
                          <Skeleton
                            animation="wave"
                            width={"30%"}
                            variant="text"
                          />
                        </Typography>
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <DataRowValue>
                        <Typography>
                          <Skeleton
                            animation="wave"
                            width={350}
                            variant="text"
                          />
                        </Typography>
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
                        <Typography>
                          <Skeleton
                            animation="wave"
                            width={"30%"}
                            variant="text"
                          />
                        </Typography>
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <DataRowValue>
                        <Typography>
                          <Skeleton
                            animation="wave"
                            width={200}
                            variant="text"
                          />
                        </Typography>
                      </DataRowValue>
                    </Grid>
                  </Grid>
                </DataRowHere>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
