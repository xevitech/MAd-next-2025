import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

export default function SidebarSkeleton() {
  return (
    <>
      <Typography
        component="li"
        sx={{
          listStyle: "none",
          "& i": {
            fontSize: "20px",
            width: "20px",
            display: "inline-block",
          },
          "& .icon-factory_photos": {
            fontSize: "15px",
          },
        }}
      >
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"50%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"40%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"70%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"30%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"45%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"25%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"70%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"40%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"55%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"44%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"65%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"34%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"60%"} />
          </Box>
       
        </Box>
        <Box display={"flex"} alignItems="center" gap={2} pt={1} sx={{}}>
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: "7px",
              width:'100%'
            }}
          >
            <Skeleton animation="wave" variant="text" width={"66%"} />
          </Box>
       
        </Box>
      </Typography>
    </>
  );
}
