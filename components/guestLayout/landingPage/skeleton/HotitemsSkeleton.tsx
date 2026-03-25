import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

export default function HotitemsSkeleton() {
  let List = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <>
      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(6, 1fr)",
          },
          gridTemplateRows: "repeat(6, auto)",
          columnGap: "16px",
        }}
      >
        {List.map((v, i) => (
          <Grid item>
            <Box sx={{margin:'8px 0'}}>
              <Skeleton variant="text" width={"100%"} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
