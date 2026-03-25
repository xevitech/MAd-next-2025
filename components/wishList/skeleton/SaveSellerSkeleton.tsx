import { Box, Divider, Grid, Skeleton } from "@mui/material";
import React from "react";

export default function SaveSellerSkeleton() {
    let List = [1, 2, 3, 4];
  return (
    <>
      <Grid container spacing={2}>
        {List.map((v, i) => (
          <Grid item xs={12}>
            <Box sx={{ background: "#fff", padding: "0px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  "@media screen and (max-width:767px)": {
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "20px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    sx={{
                      height: "75px",
                      width: "75px",
                      maxWidth: "75px",
                    }}
                  >
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      height={"100%"}
                      width="100%"
                    ></Skeleton>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        gap: "8px",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={160}
                          height={35}
                        ></Skeleton>
                        <Divider variant="fullWidth" orientation="vertical" />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={80}
                        ></Skeleton>
                        <Divider variant="fullWidth" orientation="vertical" />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={50}
                        ></Skeleton>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={70}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={120}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={60}
                          ></Skeleton>
                        </Box>
                        <Box>
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={90}
                          ></Skeleton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={"37px"}
                      width={"120px"}
                    ></Skeleton>
                  </Box>
                  <Box>
                    {" "}
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={"37px"}
                      width={"110px"}
                    ></Skeleton>
                  </Box>
                  <Box>
                    {" "}
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      height={"37px"}
                      width={"37px"}
                    ></Skeleton>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Grid container spacing={2} mt={0.5}>
                  {List.map((v, i) => (
                    <Grid item xs={12} sm={12} md={3} lg={3} height={"100%"}>
                      <Box
                        sx={{
                          border: "1px solid #e1e1e1",
                          boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
                          borderRadius: "6px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "8px",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box>
                              <Skeleton
                                variant="text"
                                animation="wave"
                                width={100}
                              />
                            </Box>
                          </Box>
                          <Box>
                            <Box>
                              <Skeleton
                                variant="text"
                                animation="wave"
                                width={50}
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Divider />
                        <Box
                          sx={{
                            padding: "4px",
                            border: "1px solid #e7e7e7",
                            margin: "8px",
                          }}
                        >
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width={"100%"}
                            height={"150px"}
                          />
                        </Box>
                        <Box
                          sx={{
                            margin: "8px",
                            borderBottom: "1px solid #e7e7e7",
                            paddingBottom: "10px",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={"70%"}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={"50%"}
                          />
                        </Box>

                        <Box
                          sx={{
                            margin: "8px",
                            borderBottom: "1px dashed #e7e7e7",
                            paddingBottom: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "25px",
                              margin: "2px 8px",
                            }}
                          >
                            <Box>
                              <Skeleton
                                variant="text"
                                animation="wave"
                                width={70}
                              />
                            </Box>
                            <Box>
                              <Skeleton
                                variant="text"
                                animation="wave"
                                width={60}
                              />
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "35px",
                              margin: "2px 8px",
                            }}
                          >
                            <Box>
                              <Skeleton
                                variant="text"
                                animation="wave"
                                width={60}
                              />
                            </Box>
                            <Box>
                              <Skeleton
                                variant="text"
                                animation="wave"
                                width={60}
                              />
                            </Box>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            margin: "8px",
                            padding: "8px",
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              border: "1px solid #e7e7e7",
                              padding: "3px 8px",
                              minWidth: "100px",
                              borderRadius: "4px",
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width={"100%"}
                            />
                          </Box>
                          <Box
                            sx={{
                              border: "1px solid #e7e7e7",
                              padding: "3px 8px",
                              minWidth: "40px",
                              borderRadius: "4px",
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width={"100%"}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
