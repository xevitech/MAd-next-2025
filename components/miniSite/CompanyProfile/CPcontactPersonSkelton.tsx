import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { CPtext, CPtextHeadings } from "./CompanyProfile.styled";

function CPcontactPersonSkelton() {
  return (
    <Grid container spacing={2} mt={5}>
      <Grid item xs={12} sm={6} md={4}>
        <Stack
          direction="column"
          sx={{
            boxShadow:
              "0px 0px 0px rgba(159, 162, 191, 0.18),0px 1px 0px rgba(159, 162, 191, 0.32)",
            backgroundColor: "#FFF5F6",
          }}
        >
          <Box
            p={{ xs: 1, md: 2 }}
            borderBottom="1px solid rgba(34, 51, 84, .1)"
          >
            <Stack justifyContent="center" alignItems="center">
              <Box marginY={{ xs: 2, md: 3 }} textAlign="center">
                <Skeleton variant="rounded" height={65} width={65} />
              </Box>
              <CPtextHeadings
                sx={{
                  fontSize: "14px !important",
                  fontWeight: "600 !important",
                }}
              >
                <Skeleton animation="wave" variant="text" width={80} />
              </CPtextHeadings>
              <CPtext txtColour="#D7282F" sz="15px">
                <Skeleton animation="wave" variant="text" width={200} />
              </CPtext>
            </Stack>
          </Box>
          <Box p={{ xs: 1, md: 2 }}>
            <Stack
              justifyContent="space-between"
              alignItems={{
                xs: "flex-start",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-start",
              }}
              direction={{
                xs: "column",
                sm: "column",
                md: "column",
                lg: "column",
              }}
              gap={{ xs: 1 }}
            >
              <Box>
                <CPtext>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={18}
                    height={18}
                    sx={{ marginRight: "6px" }}
                  />
                  <Skeleton animation="wave" variant="text" width={150} />
                </CPtext>
              </Box>
              <Box>
                <CPtext>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={18}
                    height={18}
                    sx={{ marginRight: "6px" }}
                  />
                  <Skeleton animation="wave" variant="text" width={130} />
                </CPtext>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack
          direction="column"
          sx={{
            boxShadow:
              "0px 0px 0px rgba(159, 162, 191, 0.18),0px 1px 0px rgba(159, 162, 191, 0.32)",
            backgroundColor: "#FFF5F6",
          }}
        >
          <Box
            p={{ xs: 1, md: 2 }}
            borderBottom="1px solid rgba(34, 51, 84, .1)"
          >
            <Stack justifyContent="center" alignItems="center">
              <Box marginY={{ xs: 2, md: 3 }} textAlign="center">
                <Skeleton variant="rounded" height={65} width={65} />
              </Box>
              <CPtextHeadings
                sx={{
                  fontSize: "14px !important",
                  fontWeight: "600 !important",
                }}
              >
                <Skeleton animation="wave" variant="text" width={80} />
              </CPtextHeadings>
              <CPtext txtColour="#D7282F" sz="15px">
                <Skeleton animation="wave" variant="text" width={200} />
              </CPtext>
            </Stack>
          </Box>
          <Box p={{ xs: 1, md: 2 }}>
            <Stack
              justifyContent="space-between"
              alignItems={{
                xs: "flex-start",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-start",
              }}
              direction={{
                xs: "column",
                sm: "column",
                md: "column",
                lg: "column",
              }}
              gap={{ xs: 1 }}
            >
              <Box>
                <CPtext>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={18}
                    height={18}
                    sx={{ marginRight: "6px" }}
                  />
                  <Skeleton animation="wave" variant="text" width={150} />
                </CPtext>
              </Box>
              <Box>
                <CPtext>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={18}
                    height={18}
                    sx={{ marginRight: "6px" }}
                  />
                  <Skeleton animation="wave" variant="text" width={130} />
                </CPtext>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack
          direction="column"
          sx={{
            boxShadow:
              "0px 0px 0px rgba(159, 162, 191, 0.18),0px 1px 0px rgba(159, 162, 191, 0.32)",
            backgroundColor: "#FFF5F6",
          }}
        >
          <Box
            p={{ xs: 1, md: 2 }}
            borderBottom="1px solid rgba(34, 51, 84, .1)"
          >
            <Stack justifyContent="center" alignItems="center">
              <Box marginY={{ xs: 2, md: 3 }} textAlign="center">
                <Skeleton variant="rounded" height={65} width={65} />
              </Box>
              <CPtextHeadings
                sx={{
                  fontSize: "14px !important",
                  fontWeight: "600 !important",
                }}
              >
                <Skeleton animation="wave" variant="text" width={80} />
              </CPtextHeadings>
              <CPtext txtColour="#D7282F" sz="15px">
                <Skeleton animation="wave" variant="text" width={200} />
              </CPtext>
            </Stack>
          </Box>
          <Box p={{ xs: 1, md: 2 }}>
            <Stack
              justifyContent="space-between"
              alignItems={{
                xs: "flex-start",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-start",
              }}
              direction={{
                xs: "column",
                sm: "column",
                md: "column",
                lg: "column",
              }}
              gap={{ xs: 1 }}
            >
              <Box>
                <CPtext>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={18}
                    height={18}
                    sx={{ marginRight: "6px" }}
                  />
                  <Skeleton animation="wave" variant="text" width={150} />
                </CPtext>
              </Box>
              <Box>
                <CPtext>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={18}
                    height={18}
                    sx={{ marginRight: "6px" }}
                  />
                  <Skeleton animation="wave" variant="text" width={130} />
                </CPtext>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CPcontactPersonSkelton;
