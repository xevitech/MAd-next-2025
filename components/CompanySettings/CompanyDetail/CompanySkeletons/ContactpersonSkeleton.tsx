import React from "react";
import Grid from "@mui/material/Grid";
import { Divider, Skeleton } from "@mui/material";
import { Box } from "@mui/material";

export default function ContactSkeleton() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          sx={{ margin: "16px 0px 0px 0px" }}
        >
          <Box
            className="reginal_box"
            sx={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              padding: "12px 10px",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  mt: 1,
                }}
              >
                <Box>
                  <Skeleton
                    animation="wave"
                    width={40}
                    height={40}
                    variant="circular"
                  />
                </Box>
                <Box
                  sx={{
                    "@media screen and (max-width:400px)": {
                      display: "none",
                    },
                  }}
                >
                  <Skeleton animation="wave" variant="text" width={30} />
                </Box>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={30}
                    height={15}
                  />
                </Box>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={15}
                    height={15}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Skeleton animation="wave" width={40} />
                </Box>
                <Box>
                  <Skeleton animation="wave" width={40} sx={{ ml: 2 }} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"20%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"20%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"50%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"50%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          sx={{ margin: "16px 0px 0px 0px" }}
        >
          <Box
            className="reginal_box"
            sx={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              padding: "12px 10px",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  mt: 1,
                }}
              >
                <Box>
                  <Skeleton
                    animation="wave"
                    width={40}
                    height={40}
                    variant="circular"
                  />
                </Box>
                <Box
                  sx={{
                    "@media screen and (max-width:400px)": {
                      display: "none",
                    },
                  }}
                >
                  <Skeleton animation="wave" variant="text" width={30} />
                </Box>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={30}
                    height={15}
                  />
                </Box>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={15}
                    height={15}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Skeleton animation="wave" width={40} />
                </Box>
                <Box>
                  <Skeleton animation="wave" width={40} sx={{ ml: 2 }} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"20%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"20%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"50%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"50%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          sx={{ margin: "16px 0px 0px 0px" }}
        >
          <Box
            className="reginal_box"
            sx={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              padding: "12px 10px",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  mt: 1,
                }}
              >
                <Box>
                  <Skeleton
                    animation="wave"
                    width={40}
                    height={40}
                    variant="circular"
                  />
                </Box>
                <Box
                  sx={{
                    "@media screen and (max-width:400px)": {
                      display: "none",
                    },
                  }}
                >
                  <Skeleton animation="wave" variant="text" width={30} />
                </Box>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={30}
                    height={15}
                  />
                </Box>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={15}
                    height={15}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Skeleton animation="wave" width={40} />
                </Box>
                <Box>
                  <Skeleton animation="wave" width={40} sx={{ ml: 2 }} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"20%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"20%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"50%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
              <Box>
                <Skeleton animation="wave" width={90} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={"50%"} sx={{ ml: 10 }} />
              </Box>
            </Box>
            <Divider />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
