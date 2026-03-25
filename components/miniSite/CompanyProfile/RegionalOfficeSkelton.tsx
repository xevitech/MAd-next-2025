import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { CPsurface, CPtext, CPtextHeadings } from "./CompanyProfile.styled";

function RegionalOfficeSkelton() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <CPsurface bg="#FAFAFA" border="1px solid #E8E8E8" height="100%">
          <Stack
            direction="row"
            borderBottom="1px solid #E8E8E8"
            justifyContent="start"
            alignItems="center"
            spacing={1}
            p={{ xs: 1 }}
          >
            <CPtextHeadings style={{ width: "100%", fontSize: "17px," }}>
              <Skeleton variant="text" width={200} />
            </CPtextHeadings>
          </Stack>
          <Grid container p={{ xs: 1 }} spacing={{ xs: 1 }}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={160} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={190} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={130} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={190} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={90} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext sx={{ wordBreak: "break-word" }}>
                    <Skeleton variant="text" width={180} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={100} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={180} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={120} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={175} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box></Box>
        </CPsurface>
      </Grid>
      <Grid item xs={4}>
        <CPsurface bg="#FAFAFA" border="1px solid #E8E8E8" height="100%">
          <Stack
            direction="row"
            borderBottom="1px solid #E8E8E8"
            justifyContent="start"
            alignItems="center"
            spacing={1}
            p={{ xs: 1 }}
          >
            <CPtextHeadings style={{ width: "100%", fontSize: "17px," }}>
              <Skeleton variant="text" width={200} />
            </CPtextHeadings>
          </Stack>
          <Grid container p={{ xs: 1 }} spacing={{ xs: 1 }}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={160} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={190} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={130} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={190} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={90} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext sx={{ wordBreak: "break-word" }}>
                    <Skeleton variant="text" width={180} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={100} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={180} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={120} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={175} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box></Box>
        </CPsurface>
      </Grid>
      <Grid item xs={4}>
        <CPsurface bg="#FAFAFA" border="1px solid #E8E8E8" height="100%">
          <Stack
            direction="row"
            borderBottom="1px solid #E8E8E8"
            justifyContent="start"
            alignItems="center"
            spacing={1}
            p={{ xs: 1 }}
          >
            <CPtextHeadings style={{ width: "100%", fontSize: "17px," }}>
              <Skeleton variant="text" width={200} />
            </CPtextHeadings>
          </Stack>
          <Grid container p={{ xs: 1 }} spacing={{ xs: 1 }}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={160} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={190} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={130} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={190} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={90} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext sx={{ wordBreak: "break-word" }}>
                    <Skeleton variant="text" width={180} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={100} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={180} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext txtColour="#000">
                    <Skeleton variant="text" width={120} />
                  </CPtext>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CPtext>
                    <Skeleton variant="text" width={175} />
                  </CPtext>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box></Box>
        </CPsurface>
      </Grid>
    </Grid>
  );
}

export default RegionalOfficeSkelton;
