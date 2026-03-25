import { Box, Skeleton, Stack, Divider } from "@mui/material";
import React from "react";

export default function BigpostSkeleton() {
  return (
    <>
      <Box
        sx={{
          background: "rgb(255, 246, 246)",
          borderRadius: "6px",
          boxShadow:
            "rgba(17, 17, 26, 0.05) 0px -1px 1px inset, rgba(17, 17, 26, 0.1) 0px 0px 3px",
        }}
      >
        <Box
          sx={{
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton animation="wave" variant="text" width={50} />
          </Box>
          <Box>
            <Skeleton animation="wave" variant="text" width={100} height={20} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", padding: "8px 8px 0", gap: "10px" }}>
          <Stack gap={"6px"}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={54}
              width={54}
            ></Skeleton>
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={54}
              width={54}
            ></Skeleton>
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={54}
              width={54}
            ></Skeleton>
          </Stack>
          <Box sx={{ width: "100%" }}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={270}
            ></Skeleton>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton
              animation="wave"
              variant="text"
              width={"130px"}
              height={35}
            />
          </Box>
        </Box>
        <Divider variant="fullWidth" orientation="horizontal" />
        <Box
          sx={{ padding: "8px", display: "flex", justifyContent: "flex-end" }}
        >
          <Skeleton variant="rounded" width={"100px"} height={"35px"} animation="wave" />
        </Box>
      </Box>
    </>
  );
}
