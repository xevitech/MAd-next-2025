import { Divider } from "@mui/material";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
} from "@mui/material";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Height, Padding } from "@mui/icons-material";
import { Border } from "../SellerTools/styles";
import { MainBox } from "../Contactus/style";
import {
  ButtonBox,
  Inner1Box,
  Inner1Box1,
  Inner2Box,
  MainBox1,
  MainnBox,
} from "./DashboradSkeltonStyel";
import Grid from "@mui/material/Grid";
const DashboardSkelton = () => {
  let List = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ margin: "5.5rem 0px 0 0" }}>
          <Box>
            <Skeleton variant="text" width={210} height={36} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={6}>
          <Box
            style={{
              minHeight: "160px",
              backgroundColor: "#ffff",
              borderRadius: "4px",
            }}
          >
            <MainnBox>
              <Box>
                <Skeleton variant="text" width={210} />
              </Box>
              <Box>
                <Skeleton variant="text" width={60} />
              </Box>
            </MainnBox>
            <Inner1Box>
              <Skeleton variant="text" width={210} />
            </Inner1Box>
            <Box style={{ marginTop: "10px" }}>
              <Divider variant="middle" />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "100%", padding: "15px" }}>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={4} md={6} lg={4}>
                    <Skeleton variant="text" width={60} />
                  </Grid>
                  <Grid item xs={6} sm={4} md={6} lg={4}>
                    <Skeleton variant="text" width={60} />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={4} md={6} lg={4}>
                    <Skeleton variant="text" width={60} />
                  </Grid>
                  <Grid item xs={6} sm={4} md={6} lg={4}>
                    <Skeleton variant="text" width={60} />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={4} md={6} lg={4}>
                    <Skeleton variant="text" width={60} />
                  </Grid>
                  <Grid item xs={6} sm={4} md={6} lg={4}>
                    <Skeleton variant="text" width={60} />
                  </Grid>
                </Grid>
              </Box>
              <Box style={{ padding: "20px " }}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={"100px"}
                  height={"37px"}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box
            style={{
              minHeight: "170px",
              backgroundColor: "#ffff",
              borderRadius: "4px",
              marginTop: "-2px",
            }}
          >
            <Grid container spacing={2} mt={0.5}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={2.5}>
                <Inner2Box
                  sx={{
                    "@media (max-width: 900px)": {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    "@media (max-width: 767px)": {
                      display: "block",
                    },
                  }}
                >
                  <Skeleton variant="circular" width={127} height={127} />
                </Inner2Box>
              </Grid>
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                <Inner2Box>
                  <Skeleton variant="text" width={210} />
                </Inner2Box>
                <Inner2Box>
                  <Skeleton variant="text" sx={{ width: "60%" }} />
                </Inner2Box>

                <Box style={{ marginTop: "10px" }}>
                  <Divider variant="middle" />
                </Box>
                <ButtonBox>
                  <Skeleton variant="text" width={210} height={60} />
                </ButtonBox>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={0}>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <Box
            style={{
              minHeight: "130px",
              backgroundColor: "#ffff",
              borderRadius: "4px",
            }}
          >
            <MainBox1>
              <Box
                style={{
                  gap: "10px",
                  paddingTop: "10px",
                }}
              >
                <Box>
                  <Skeleton variant="text" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" width={100} />
                </Box>
                <Box>
                  <Skeleton variant="text" width={140} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="circular" width={44} height={44} />
                </Box>
              </Box>
            </MainBox1>
          </Box>
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <Box
            style={{
              minHeight: "130px",
              backgroundColor: "#ffff",
              borderRadius: "4px",
            }}
          >
            <MainBox1>
              <Box
                style={{
                  gap: "10px",
                  paddingTop: "10px",
                }}
              >
                <Box>
                  <Skeleton variant="text" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" width={100} />
                </Box>
                <Box>
                  <Skeleton variant="text" width={140} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="circular" width={44} height={44} />
                </Box>
              </Box>
            </MainBox1>
          </Box>
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <Box
            style={{
              minHeight: "130px",
              backgroundColor: "#ffff",
              borderRadius: "4px",
            }}
          >
            <MainBox1>
              <Box
                style={{
                  gap: "10px",
                  paddingTop: "10px",
                }}
              >
                <Box>
                  <Skeleton variant="text" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" width={100} />
                </Box>
                <Box>
                  <Skeleton variant="text" width={140} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="circular" width={44} height={44} />
                </Box>
              </Box>
            </MainBox1>
          </Box>
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <Box
            style={{
              minHeight: "130px",
              backgroundColor: "#ffff",
              borderRadius: "4px",
            }}
          >
            <MainBox1>
              <Box
                style={{
                  gap: "10px",
                  paddingTop: "10px",
                }}
              >
                <Box>
                  <Skeleton variant="text" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" width={100} />
                </Box>
                <Box>
                  <Skeleton variant="text" width={140} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="circular" width={44} height={44} />
                </Box>
              </Box>
            </MainBox1>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={0.3}>
        <Grid item xs={12}>
          <Box
            style={{
              backgroundColor: "#ffff",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              padding: "20px 0 10px 10px",
              overflowX:'auto'
            }}
          >
            <Box sx={{ paddingRight: "10%", paddingLeft: "20px" }}>
              {" "}
              <Skeleton variant="text" width={140} />
            </Box>
            <Box sx={{ paddingRight: "10%" }}>
              {" "}
              <Skeleton variant="text" width={140} />
            </Box>
            <Box sx={{ paddingRight: "10%" }}>
              {" "}
              <Skeleton variant="text" width={140} />
            </Box>
            
          </Box>
        </Grid>
      </Grid>
      <Box
        style={{
          backgroundColor: "#ffff",
          borderRadius: "4px",
          minHeight: "400px",
        }}
      >
        <TableContainer>
          <Table>
            <TableBody>
              {List.map((v, i) => (
                <TableRow>
                  <TableCell style={{ width: "20px" }}>
                    <Skeleton variant="rectangular" width={15} height={15} />
                  </TableCell>
                  <TableCell sx={{}}>
                    <Skeleton
                      animation="wave"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          width: "100px",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: "250px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "20px",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={{
                          height: "34px",
                          width: "34px",
                          minHeight: "34px",
                          minWidth: "34px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          marginLeft: "10px",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="text"
                          sx={{
                            width: "100%",
                            "@media screen and (max-width:900px)": {
                              width: "100px",
                            },
                          }}
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          sx={{
                            width: "100%",
                            "@media screen and (max-width:900px)": {
                              width: "100px",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          width: "100px",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          width: "100px",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          width: "100px",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          width: "100px",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          width: "100px",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          width: "100px",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          width: "100px",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          width: "100px",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{
                        "@media screen and (max-width:900px)": {
                          width: "100px",
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export default DashboardSkelton;
