import React from "react";
import Grid from "@mui/material/Grid";
import {
  ComNameLogoInfo,
  CompanyBusinessType,
  CompanyOriginInfo,
  CompanyProductItem,
  CompanyProductList,
  CompanyRating,
  OriginDate,
  SecrorMinMaxOrder,
  TopRatedCompaniesBox,
  TopRatedCompaniesInner,
  UserStatus,
} from "../styles";
import { Link, Skeleton, Typography } from "@mui/material";
import { LinkBox } from "@/components/Chat/style";

export default function TopSellerSkeleton() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <TopRatedCompaniesBox className="in-whiteBox">
            <TopRatedCompaniesInner>
              <ComNameLogoInfo>
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      color: "inherit",
                      textDecoration: "none",
                    },
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                  ></Skeleton>
                </Link>
              </ComNameLogoInfo>
              <CompanyOriginInfo sx={{ width: "100%" }}>
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      color: "inherit",
                      textDecoration: "none",
                    },
                  }}
                >
                  <Typography variant="h5">
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={100}
                    ></Skeleton>
                  </Typography>
                </Link>

                <Skeleton variant="text" width={"190px"} animation="wave" />
                <Skeleton variant="text" width={"140px"} animation="wave" />
              </CompanyOriginInfo>
            </TopRatedCompaniesInner>
            <CompanyProductList>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <CompanyProductItem>
                    <LinkBox
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          color: "inherit",
                          textDecoration: "none",
                        },
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={"100px"}
                        height={"100px"}
                        animation="wave"
                      />
                    </LinkBox>
                    <SecrorMinMaxOrder>
                      <Typography variant="h5">
                        <Skeleton
                          variant="text"
                          width="50"
                          height=""
                          animation="wave"
                        />
                      </Typography>
                      <Skeleton
                        variant="text"
                        width="50"
                        height=""
                        animation="wave"
                      />
                    </SecrorMinMaxOrder>
                  </CompanyProductItem>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <CompanyProductItem>
                    <LinkBox
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          color: "inherit",
                          textDecoration: "none",
                        },
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={"100px"}
                        height={"100px"}
                        animation="wave"
                      />
                    </LinkBox>
                    <SecrorMinMaxOrder>
                      <Typography variant="h5">
                        <Skeleton
                          variant="text"
                          width="50"
                          height=""
                          animation="wave"
                        />
                      </Typography>
                      <Skeleton
                        variant="text"
                        width="50"
                        height=""
                        animation="wave"
                      />
                    </SecrorMinMaxOrder>
                  </CompanyProductItem>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <CompanyProductItem>
                    <LinkBox
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          color: "inherit",
                          textDecoration: "none",
                        },
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={"100px"}
                        height={"100px"}
                        animation="wave"
                      />
                    </LinkBox>
                    <SecrorMinMaxOrder>
                      <Typography variant="h5">
                        <Skeleton
                          variant="text"
                          width="50"
                          height=""
                          animation="wave"
                        />
                      </Typography>
                      <Skeleton
                        variant="text"
                        width="50"
                        height=""
                        animation="wave"
                      />
                    </SecrorMinMaxOrder>
                  </CompanyProductItem>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <CompanyProductItem>
                    <LinkBox
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          color: "inherit",
                          textDecoration: "none",
                        },
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={"100px"}
                        height={"100px"}
                        animation="wave"
                      />
                    </LinkBox>
                    <SecrorMinMaxOrder>
                      <Typography variant="h5">
                        <Skeleton
                          variant="text"
                          width="50"
                          height=""
                          animation="wave"
                        />
                      </Typography>
                      <Skeleton
                        variant="text"
                        width="50"
                        height=""
                        animation="wave"
                      />
                    </SecrorMinMaxOrder>
                  </CompanyProductItem>
                </Grid>
              </Grid>
            </CompanyProductList>
          </TopRatedCompaniesBox>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TopRatedCompaniesBox className="in-whiteBox">
            <TopRatedCompaniesInner>
              <ComNameLogoInfo>
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      color: "inherit",
                      textDecoration: "none",
                    },
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                  ></Skeleton>
                </Link>
              </ComNameLogoInfo>
              <CompanyOriginInfo sx={{ width: "100%" }}>
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      color: "inherit",
                      textDecoration: "none",
                    },
                  }}
                >
                  <Typography variant="h5">
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={100}
                    ></Skeleton>
                  </Typography>
                </Link>

                <Skeleton variant="text" width={"190px"} animation="wave" />
                <Skeleton variant="text" width={"140px"} animation="wave" />
              </CompanyOriginInfo>
            </TopRatedCompaniesInner>
            <CompanyProductList>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <CompanyProductItem>
                    <LinkBox
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          color: "inherit",
                          textDecoration: "none",
                        },
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={"100px"}
                        height={"100px"}
                        animation="wave"
                      />
                    </LinkBox>
                    <SecrorMinMaxOrder>
                      <Typography variant="h5">
                        <Skeleton
                          variant="text"
                          width="50"
                          height=""
                          animation="wave"
                        />
                      </Typography>
                      <Skeleton
                        variant="text"
                        width="50"
                        height=""
                        animation="wave"
                      />
                    </SecrorMinMaxOrder>
                  </CompanyProductItem>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <CompanyProductItem>
                    <LinkBox
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          color: "inherit",
                          textDecoration: "none",
                        },
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={"100px"}
                        height={"100px"}
                        animation="wave"
                      />
                    </LinkBox>
                    <SecrorMinMaxOrder>
                      <Typography variant="h5">
                        <Skeleton
                          variant="text"
                          width="50"
                          height=""
                          animation="wave"
                        />
                      </Typography>
                      <Skeleton
                        variant="text"
                        width="50"
                        height=""
                        animation="wave"
                      />
                    </SecrorMinMaxOrder>
                  </CompanyProductItem>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <CompanyProductItem>
                    <LinkBox
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          color: "inherit",
                          textDecoration: "none",
                        },
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={"100px"}
                        height={"100px"}
                        animation="wave"
                      />
                    </LinkBox>
                    <SecrorMinMaxOrder>
                      <Typography variant="h5">
                        <Skeleton
                          variant="text"
                          width="50"
                          height=""
                          animation="wave"
                        />
                      </Typography>
                      <Skeleton
                        variant="text"
                        width="50"
                        height=""
                        animation="wave"
                      />
                    </SecrorMinMaxOrder>
                  </CompanyProductItem>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <CompanyProductItem>
                    <LinkBox
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          color: "inherit",
                          textDecoration: "none",
                        },
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={"100px"}
                        height={"100px"}
                        animation="wave"
                      />
                    </LinkBox>
                    <SecrorMinMaxOrder>
                      <Typography variant="h5">
                        <Skeleton
                          variant="text"
                          width="50"
                          height=""
                          animation="wave"
                        />
                      </Typography>
                      <Skeleton
                        variant="text"
                        width="50"
                        height=""
                        animation="wave"
                      />
                    </SecrorMinMaxOrder>
                  </CompanyProductItem>
                </Grid>
              </Grid>
            </CompanyProductList>
          </TopRatedCompaniesBox>
        </Grid>
      </Grid>
    </>
  );
}
