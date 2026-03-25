import { Box, Skeleton, Grid } from "@mui/material";
import React from "react";

export default function TopEngineerSkeleton() {
  let List = [1, 2, 3];
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0px 0px 30px",
          }}
        >
          <Skeleton
            animation="wave"
            variant="text"
            width={"30%"}
            height={"35px"}
          ></Skeleton>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {List.map((v, i) => (
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    border: "1px solid rgb(221, 221, 221)",
                    margin: "12px",
                    borderRadius: "6px",
                  }}
                >
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={4} md={4}>
                      <Box>
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width={"100%"}
                          height={"120px"}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                      <Box sx={{ padding: "10px 0px 0px" }}>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={"30%"}
                        ></Skeleton>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={"25%"}
                          sx={{ padding: "5px 0" }}
                        ></Skeleton>
                      </Box>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"90%"}
                      ></Skeleton>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"10%"}
                      ></Skeleton>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
