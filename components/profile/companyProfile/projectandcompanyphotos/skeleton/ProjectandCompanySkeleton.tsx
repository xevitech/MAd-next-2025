import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

export default function ProjectandCompanySkeleton() {
  let List = [1, 2, 3, 4, 5];
  return (
    <>
      <Grid container spacing={2}>
        {List.map((v, i) => (
          <Grid item xs={12} sm={6} md={3} lg={2.4} mt={1}>
            <Box sx={{minHeight:'292px'}}>
              <Skeleton variant="rectangular" width={"100%"} height={150} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
