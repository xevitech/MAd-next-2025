import { Grid, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
const FilesSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          padding: "8px 20px",
          backgroundColor: "#F5F5F5",
          borderTop: "1px solid #dadada",
          borderBottom: "1px solid #dadada",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Skeleton animation="wave" variant="text" width={"16%"} />
            <Skeleton animation="wave" variant="text" width={60} />
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={10}
              height={18}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "8px 20px",
          backgroundColor: "#F5F5F5",
          borderTop: "1px solid #dadada",
          borderBottom: "1px solid #dadada",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Skeleton animation="wave" variant="text" width={"16%"} />
            <Skeleton animation="wave" variant="text" width={60} />
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={10}
              height={18}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "8px 20px",
          backgroundColor: "#F5F5F5",
          borderTop: "1px solid #dadada",
          borderBottom: "1px solid #dadada",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Skeleton animation="wave" variant="text" width={"16%"} />
            <Skeleton animation="wave" variant="text" width={60} />
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={10}
              height={18}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "8px 20px",
          backgroundColor: "#F5F5F5",
          borderTop: "1px solid #dadada",
          borderBottom: "1px solid #dadada",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Skeleton animation="wave" variant="text" width={"16%"} />
            <Skeleton animation="wave" variant="text" width={60} />
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={10}
              height={18}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FilesSkeleton;
