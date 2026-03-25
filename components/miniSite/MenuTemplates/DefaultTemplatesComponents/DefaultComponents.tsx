import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";

export const Demo = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:900px)"
  );
  return (
    <Box
      style={{
        color: "green",
        padding: isSmallScreen ? "8px" : isMediumScreen ? "12px" : "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: isSmallScreen
          ? "lightgreen"
          : isMediumScreen
          ? "lightblue"
          : "lightyellow",
      }}
    >
      <Typography variant="h6">It's working.... One </Typography>
    </Box>
  );
};


export const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:900px)"
  );
  return (
    <Box
      style={{
        color: "green",
        padding: isSmallScreen ? "8px" : isMediumScreen ? "12px" : "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: isSmallScreen
          ? "lightgreen"
          : isMediumScreen
          ? "lightblue"
          : "lightyellow",
      }}
    >
      <Typography variant="h6">It's working....</Typography>
    </Box>
  );
};
