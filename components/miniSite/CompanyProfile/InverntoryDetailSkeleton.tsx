import { Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import { CPTextViewBox } from "./CompanyProfile.styled";
import {
  ComFacilitySubComponent,
  MiniComFacilityInnerData,
  SubComponentData,
} from "../styled";

export default function InverntoryDetailSkeleton() {
  return (
    <>
      <MiniComFacilityInnerData>
        <ComFacilitySubComponent>
          <Typography variant="h4">
            <Skeleton
              animation="wave"
              variant="text"
              width={"10%"}
              height={"37px"}
            />
          </Typography>
          <SubComponentData>
            <Grid mb={{ xs: 1 }} container spacing={{ xs: 1 }}>
              <Grid item xs={12} sm={4}>
                <CPTextViewBox
                  pb={{ xs: 1.8, lg: "8px" }}
                  wid="100%"
                  height={"100%"}
                >
                  <Typography component="label">
                    <Skeleton animation="wave" variant="text" width={"40%"} />
                  </Typography>
                  <Typography>
                    <Skeleton animation="wave" variant="text" width={"60%"} />
                  </Typography>
                </CPTextViewBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CPTextViewBox
                  pb={{ xs: 1.8, lg: "8px" }}
                  wid="100%"
                  height={"100%"}
                >
                  <Typography component="label">
                    <Skeleton animation="wave" variant="text" width={"40%"} />
                  </Typography>
                  <Typography>
                    <Skeleton animation="wave" variant="text" width={"60%"} />
                  </Typography>
                </CPTextViewBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CPTextViewBox
                  pb={{ xs: 1.8, lg: "8px" }}
                  wid="100%"
                  height={"100%"}
                >
                  <Typography component="label">
                    <Skeleton animation="wave" variant="text" width={"40%"} />
                  </Typography>
                  <Typography>
                    <Skeleton animation="wave" variant="text" width={"60%"} />
                  </Typography>
                </CPTextViewBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CPTextViewBox
                  pb={{ xs: 1.8, lg: "8px" }}
                  wid="100%"
                  height={"100%"}
                >
                  <Typography component="label">
                    <Skeleton animation="wave" variant="text" width={"40%"} />
                  </Typography>
                  <Typography>
                    <Skeleton animation="wave" variant="text" width={"60%"} />
                  </Typography>
                </CPTextViewBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CPTextViewBox
                  pb={{ xs: 1.8, lg: "8px" }}
                  wid="100%"
                  height={"100%"}
                >
                  <Typography component="label">
                    <Skeleton animation="wave" variant="text" width={"40%"} />
                  </Typography>
                  <Typography>
                    <Skeleton animation="wave" variant="text" width={"60%"} />
                  </Typography>
                </CPTextViewBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CPTextViewBox
                  pb={{ xs: 1.8, lg: "8px" }}
                  wid="100%"
                  height={"100%"}
                >
                  <Typography component="label">
                    <Skeleton animation="wave" variant="text" width={"40%"} />
                  </Typography>
                  <Typography>
                    <Skeleton animation="wave" variant="text" width={"60%"} />
                  </Typography>
                </CPTextViewBox>
              </Grid>
            </Grid>
          </SubComponentData>
        </ComFacilitySubComponent>
      </MiniComFacilityInnerData>
    </>
  );
}
