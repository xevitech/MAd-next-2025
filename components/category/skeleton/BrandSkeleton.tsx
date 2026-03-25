import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function BrandSkeleton() {
  let List = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          justifyContent: "center",
          overflowX: "scroll",
          padding: "40px 0",
          flexWrap: "wrap",
        }}
      >
        {List.map((v, i) => (
          <Skeleton
            animation="wave"
            variant="rectangular"
            style={{
              width: "140px",
              height: "150px",
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
        ))}
      </Box>
    </>
  );
}
