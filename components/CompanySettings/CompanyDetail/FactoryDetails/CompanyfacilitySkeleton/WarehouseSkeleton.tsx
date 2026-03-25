import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import { DataRowHere, DataRowTitle, DataRowValue } from "../style";

export default function WarehouseSkeleton() {
  return (
    <>
      <Box sx={{ padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataRowHere>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <DataRowTitle>
                    <Typography>
                      <Skeleton animation="wave" width={"40%"} variant="text" />
                    </Typography>
                  </DataRowTitle>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
                  <DataRowValue>
                    <Typography>
                      <Skeleton animation="wave" width={150} variant="text" />
                    </Typography>
                  </DataRowValue>
                </Grid>
              </Grid>
            </DataRowHere>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <DataRowHere>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4}>
                      <DataRowTitle>
                        <Typography>
                          {" "}
                          <Skeleton
                            animation="wave"
                            width={"40%"}
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
                            width={170}
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
                          {" "}
                          <Skeleton
                            animation="wave"
                            width={"50%"}
                            variant="text"
                          />
                        </Typography>
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <DataRowValue>
                        <Typography>
                          {" "}
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
                          {" "}
                          <Skeleton
                            animation="wave"
                            width={"60%"}
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
                            width={"40%"}
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
                            width={120}
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
                            width={"50%"}
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
                            width={190}
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
                            width={"40%"}
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
              <Grid item xs={12}>
                <DataRowHere>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={2}>
                      <DataRowTitle>
                        <Typography>
                          <Skeleton
                            animation="wave"
                            width={"70%"}
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
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <DataRowHere>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <DataRowTitle>
                    <Typography>
                      <Skeleton animation="wave" width={"40%"} variant="text" />
                    </Typography>
                  </DataRowTitle>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
                  <DataRowValue>
                    <Typography sx={{ display: "flex", gap: "4px" }}>
                      <Skeleton animation="wave" width={200} variant="text" />
                    </Typography>
                  </DataRowValue>
                </Grid>
              </Grid>
            </DataRowHere>
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
                            width={"40%"}
                            variant="text"
                          />
                        </Typography>
                      </DataRowTitle>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
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
                    <Grid item xs={12} sm={4} md={4}>
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
                            width={"40%"}
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
                            width={"40%"}
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
                            width={110}
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
                            width={"40%"}
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
                            width={"40%"}
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
                            width={180}
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
