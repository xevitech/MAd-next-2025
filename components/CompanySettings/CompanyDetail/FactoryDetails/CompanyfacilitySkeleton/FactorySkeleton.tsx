import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import {
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  UploadImageCol,
  UploadImagesRow,
} from "../style";

export default function FactorySkeleton() {
  return (
    <>
      <Box
        sx={{
          padding: "16px",
          "@media screen and (max-width:767px)": { padding: "16px 0 0 0" },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataRowHere>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <DataRowTitle>
                    <Typography>
                      <Skeleton animation="wave" width={"30%"} variant="text" />
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
                          {" "}
                          <Skeleton
                            animation="wave"
                            width={140}
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
                            width={"30%"}
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
          <Grid item xs={12}>
            <DataRowHere>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <DataRowTitle>
                    <Typography>
                      {" "}
                      <Skeleton animation="wave" width={"30%"} variant="text" />
                    </Typography>
                  </DataRowTitle>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
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
                          {" "}
                          <Skeleton
                            animation="wave"
                            width={"80%"}
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
                            width={130}
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
                            width={"40%"}
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
                            width={190}
                            variant="text"
                          />{" "}
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
                            width={"30%"}
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
                            width={110}
                            variant="text"
                          />{" "}
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
                            width={"30%"}
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
                            width={200}
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
                            width={"28%"}
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
            <DataRowHere>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <DataRowTitle>
                    <Typography>
                      {" "}
                      <Skeleton animation="wave" width={"44%"} variant="text" />
                    </Typography>
                  </DataRowTitle>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
                  <DataRowValue>
                    <Typography>
                      {" "}
                      <Skeleton animation="wave" width={180} variant="text" />
                    </Typography>
                  </DataRowValue>
                </Grid>
              </Grid>
            </DataRowHere>
          </Grid>
          <Grid item xs={12}>
            <DataRowHere>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <DataRowTitle>
                    <Typography>
                      {" "}
                      <Skeleton animation="wave" width={"83%"} variant="text" />
                    </Typography>
                  </DataRowTitle>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
                  <DataRowValue>
                    <Typography>
                      {" "}
                      <Skeleton animation="wave" width={450} variant="text" />
                    </Typography>
                  </DataRowValue>
                </Grid>
              </Grid>
            </DataRowHere>
          </Grid>

          <Grid item xs={12}>
            <DataRowHere>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <DataRowTitle>
                    <Typography>
                      {" "}
                      <Skeleton animation="wave" width={"38%"} variant="text" />
                    </Typography>
                  </DataRowTitle>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
                  <DataRowValue>
                    <Typography sx={{ display: "flex", gap: "4px" }}>
                      <Skeleton animation="wave" width={350} variant="text" />
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
                            width={"87%"}
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
                            width={"35%"}
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
                            width={"23%"}
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <DataRowHere>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4}>
                      <DataRowTitle>
                        <Typography>
                          <Skeleton
                            animation="wave"
                            width={"80%"}
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
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
