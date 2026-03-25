import {
  CustomInfoTitle,
  CustomInfoValue,
  CustomInfoValue2,
  CustomizeInfoInn,
  CustomizeInfosection,
  DestinationPort,
  DestinationPortInn,
  EnquiryDetailData,
  GreyBoxInfo,
} from "@/components/Crm-v1/common/style";
import { Box, Skeleton, Grid, Divider, Typography } from "@mui/material";
import React from "react";

export default function EnquiryDetailSkeleton() {
  return (
    <>
      <Box>
        <EnquiryDetailData>
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              margin: "0 0 1rem",
            }}
          >
            <Box>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={"144px"}
                height={"32px"}
              ></Skeleton>
            </Box>
          </Box> */}
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  flexGrow: "1",
                  background: "#F5F5F5",
                  padding: "16px",
                  width: "100%",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={7} md={7}>
                    <Box
                      sx={{ display: "flex", alignItems: "start", gap: "10px" }}
                    >
                      <Box
                        sx={{
                          height: "50px",
                          width: "50px",
                          minWidth: "50px",
                          border: "1px solid #d2d2d2",
                          padding: "5px",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          height={"100%"}
                          width={"100%"}
                        ></Skeleton>
                      </Box>
                      <Box>
                        <Skeleton
                          variant="text"
                          width={"100"}
                          animation="wave"
                        />
                        <Box sx={{ display: "flex", gap: "5px" }}>
                          <Box>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"40px"}
                            ></Skeleton>
                          </Box>
                          <Divider variant="fullWidth" orientation="vertical" />
                          <Box>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"140px"}
                            ></Skeleton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                      }}
                    >
                      <Box>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={"70px"}
                          height={30}
                        ></Skeleton>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={"100px"}
                        ></Skeleton>
                      </Box>
                      <Divider variant="fullWidth" orientation="vertical" />
                      <Box>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          width={"65px"}
                          height={"25px"}
                        ></Skeleton>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ margin: "0 10px" }}>
                <Box
                  sx={{
                    height: "25px",
                    width: "25px",
                    minWidth: "25px",
                    borderRadius: "50%",
                    border: "1px solid",
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    height={"100%"}
                    width={"100%"}
                  ></Skeleton>
                </Box>
              </Box>
            </Box>
          </Box>
          <GreyBoxInfo sx={{ margin: "10px 0" }}>
            <Box className="customize-title">
              <Skeleton
                animation="wave"
                variant="text"
                width={"100px"}
                height={"30px"}
              ></Skeleton>
            </Box>
            <CustomizeInfoInn>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  <CustomizeInfosection>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={5}>
                        <div>
                          <CustomInfoTitle>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"80px"}
                            ></Skeleton>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"50px"}
                            ></Skeleton>

                          </CustomInfoTitle>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={12} md={7}>
                        <div className="Myinfovalues MyinfoResponsive">
                          <CustomInfoTitle>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"90px"}
                            ></Skeleton>
                          </CustomInfoTitle>
                          <CustomInfoValue>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"70px"}
                            ></Skeleton>
                          </CustomInfoValue>
                        </div>
                      </Grid>
                    </Grid>
                  </CustomizeInfosection>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <CustomizeInfosection>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={5}>
                        <div>
                          <CustomInfoTitle>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"80px"}
                            ></Skeleton>
                          </CustomInfoTitle>
                          <CustomInfoValue>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"60px"}
                            ></Skeleton>
                          </CustomInfoValue>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <div className="Myinfovalues MyinfoResponsive">
                          <CustomInfoTitle>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"110px"}
                            ></Skeleton>
                          </CustomInfoTitle>
                          <DestinationPort>
                            <DestinationPortInn>
                              <CustomInfoValue>
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"80px"}
                                ></Skeleton>
                              </CustomInfoValue>
                              <CustomInfoValue2></CustomInfoValue2>
                            </DestinationPortInn>
                            <DestinationPortInn>
                              <CustomInfoValue>
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"60px"}
                                ></Skeleton>
                              </CustomInfoValue>
                              <CustomInfoValue2>
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"80px"}
                                ></Skeleton>
                              </CustomInfoValue2>
                            </DestinationPortInn>
                          </DestinationPort>
                        </div>
                      </Grid>
                    </Grid>
                  </CustomizeInfosection>
                </Grid>
              </Grid>
            </CustomizeInfoInn>
          </GreyBoxInfo>
          <GreyBoxInfo>
            <Box className="customize-title">
              <Skeleton
                animation="wave"
                variant="text"
                width={"100px"}
                height={"30px"}
              ></Skeleton>
            </Box>
            <CustomizeInfoInn>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <CustomizeInfosection>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={6}>
                        <div>
                          <CustomInfoTitle>
                            {" "}
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"100px"}
                            ></Skeleton>
                          </CustomInfoTitle>
                          <DestinationPort>
                            <DestinationPortInn>
                              <CustomInfoValue>
                                {" "}
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"60px"}
                                ></Skeleton>
                              </CustomInfoValue>
                              <CustomInfoValue2>
                                {" "}
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"70px"}
                                ></Skeleton>{" "}
                              </CustomInfoValue2>
                            </DestinationPortInn>
                            <DestinationPortInn>
                              <CustomInfoValue>
                                {" "}
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"60px"}
                                ></Skeleton>{" "}
                              </CustomInfoValue>
                              <CustomInfoValue2>
                                {" "}
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"50px"}
                                ></Skeleton>
                              </CustomInfoValue2>
                            </DestinationPortInn>
                          </DestinationPort>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="Myinfovalues">
                          <CustomInfoTitle>
                            {" "}
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"150px"}
                            ></Skeleton>
                          </CustomInfoTitle>
                          <DestinationPort>
                            <DestinationPortInn>
                              <CustomInfoValue>
                                {" "}
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"110px"}
                                ></Skeleton>
                              </CustomInfoValue>
                              <CustomInfoValue2>
                                {" "}
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"60px"}
                                ></Skeleton>
                              </CustomInfoValue2>
                            </DestinationPortInn>
                            <DestinationPortInn>
                              <CustomInfoValue>
                                {" "}
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"80px"}
                                ></Skeleton>
                              </CustomInfoValue>
                              <CustomInfoValue2>
                                {" "}
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"60px"}
                                ></Skeleton>{" "}
                              </CustomInfoValue2>
                            </DestinationPortInn>
                          </DestinationPort>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Divider component="div" sx={{ width: "100%" }} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <div>
                          <CustomInfoTitle>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"130px"}
                            ></Skeleton>
                          </CustomInfoTitle>
                          <DestinationPort>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={3} md={3}>
                                <DestinationPortInn>
                                  <CustomInfoValue>
                                    {" "}
                                    <Skeleton
                                      animation="wave"
                                      variant="text"
                                      width={"60px"}
                                    ></Skeleton>
                                  </CustomInfoValue>
                                  <CustomInfoValue2>
                                    {" "}
                                    <Skeleton
                                      animation="wave"
                                      variant="text"
                                      width={"90px"}
                                    ></Skeleton>{" "}
                                  </CustomInfoValue2>
                                </DestinationPortInn>
                              </Grid>
                            </Grid>
                          </DestinationPort>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Divider component="div" sx={{ width: "100%" }} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <div>
                          <CustomInfoTitle>
                            {" "}
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"150px"}
                            ></Skeleton>
                          </CustomInfoTitle>
                          <DestinationPort>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={3} md={3}>
                                <Typography>
                                  {" "}
                                  <Skeleton
                                    animation="wave"
                                    variant="text"
                                    width={"60px"}
                                  ></Skeleton>
                                </Typography>
                              </Grid>
                            </Grid>
                          </DestinationPort>
                        </div>
                      </Grid>
                    </Grid>
                  </CustomizeInfosection>
                </Grid>
              </Grid>
            </CustomizeInfoInn>
          </GreyBoxInfo>
        </EnquiryDetailData>
      </Box>
    </>
  );
}
