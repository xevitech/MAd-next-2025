import { Box, Typography } from "@mui/material";
import React from "react";

export default function EmptybannerImage() {
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <img src="/assets/subdomainBanner.svg" alt="" />
        <Typography>You have not listed any Slider yet.</Typography>
        <Typography>Click here to add Slider.</Typography>
      </Box>
    </>
  );
}
