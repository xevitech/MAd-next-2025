import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";
import { SellerCardItem } from "../style";

export default function TopratedSkeleton() {
  let List = [1, 2, 3, 4, 5, 6,];
  return (
    <>
      <Box>
        <Grid container spacing={2} sx={{ padding: "1rem 0 0 0" }}>
          {List.map((v, i) => (
            <Grid item xs={12} sm={12} md={4} lg={2}>
              <Box
                sx={{
                  padding: "14px",
                  boxShadow:
                    "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"100%"}
                  height={"207px"}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
