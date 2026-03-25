import { Grid, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
const UrlSkeleton = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            backgroundColor: "#F8FAFB",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "4px",
            height: "40px",
          }}
        >
          <Box sx={{ backgroundColor: "#EBEBEB", borderRadius: "4px 0 0 4px" }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              height={30}
              width={30}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" animation="wave" width={"16%"} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            backgroundColor: "#F8FAFB",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "4px",
            height: "40px",
          }}
        >
          <Box sx={{ backgroundColor: "#EBEBEB", borderRadius: "4px 0 0 4px" }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              height={30}
              width={30}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" animation="wave" width={"16%"} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            backgroundColor: "#F8FAFB",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "4px",
            height: "40px",
          }}
        >
          <Box sx={{ backgroundColor: "#EBEBEB", borderRadius: "4px 0 0 4px" }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              height={30}
              width={30}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" animation="wave" width={"16%"} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            backgroundColor: "#F8FAFB",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "4px",
            height: "40px",
          }}
        >
          <Box sx={{ backgroundColor: "#EBEBEB", borderRadius: "4px 0 0 4px" }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              height={30}
              width={30}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" animation="wave" width={"16%"} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            backgroundColor: "#F8FAFB",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "4px",
            height: "40px",
          }}
        >
          <Box sx={{ backgroundColor: "#EBEBEB", borderRadius: "4px 0 0 4px" }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              height={30}
              width={30}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" animation="wave" width={"16%"} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            backgroundColor: "#F8FAFB",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "4px",
            height: "40px",
          }}
        >
          <Box sx={{ backgroundColor: "#EBEBEB", borderRadius: "4px 0 0 4px" }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              height={30}
              width={30}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" animation="wave" width={"16%"} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UrlSkeleton;
