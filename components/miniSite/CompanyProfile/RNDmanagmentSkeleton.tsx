import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import CPheader from "./CPheaderComponent";
import { CPTextViewBox } from "./CompanyProfile.styled";

export default function RNDmanagmentSkeleton() {
  return (
    <>
      <Box>
        <Box mb={{ xs: 1 }}>
          <CPheader
            // icon="/assets/cpicon15.svg"
            icon="icon-RD_management"
            title="R&D Management"
            subtitle={null}
            controls={null}
          />
        </Box>
        <Grid mb={{ xs: 1 }} container spacing={{ xs: 1 }}>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <CPTextViewBox pb={{ xs: 1.8 }} wid="100%">
              <Typography component="label">
                <Skeleton animation="wave" variant="text" width={"13%"} />
              </Typography>
              <Typography>
                <Skeleton animation="wave" variant="text" width={"22%"} />
              </Typography>
            </CPTextViewBox>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <CPTextViewBox pb={{ xs: 1.8 }} wid="100%">
              <Typography component="label">
                <Skeleton animation="wave" variant="text" width={"13%"} />
              </Typography>
              <Typography>
                <Skeleton animation="wave" variant="text" width={"22%"} />
              </Typography>
            </CPTextViewBox>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <CPTextViewBox pb={{ xs: 1.8 }} wid="100%">
              <Typography component="label">
                <Skeleton animation="wave" variant="text" width={"13%"} />
              </Typography>
              <Typography>
                <Skeleton animation="wave" variant="text" width={"22%"} />
              </Typography>
            </CPTextViewBox>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
