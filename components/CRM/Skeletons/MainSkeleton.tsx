import { Grid, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
const MainSkeleton = () => {
  const dummy = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Skeleton
            variant="rectangular"
            width={80}
            height={30}
            sx={{ borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            width={120}
            height={30}
            sx={{ borderRadius: "4px" }}
          />
        </Box>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={1.5}>
          <Grid item md={2.2}>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "8px 10px 0 16px",
                height:"100%"
              }}
            >
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "10px",
                  width: "100px",
                  borderRadius: "4px",
                  marginBottom: "5px",
                }}
              />
              <Skeleton
                variant="rectangular"
                sx={{ border: "1px solid #ddd", height: "30px" }}
              />
              <Box sx={{ margin: "10px 0 0" }}>
                <Skeleton
                  variant="rectangular"
                  sx={{ border: "1px solid #ddd", height: "30px" }}
                />
                {
                dummy?.map((ele) => (
                <div
                  style={{ display: "flex", gap: "8px", margin: "10px 0 0" }}
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "18px", height: "18px", borderRadius: "4px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: "10px",
                      width: "100px",
                      marginBottom: "5px",
                    }}
                  />
                </div>
                ))
}
              </Box>
            </Box>
          </Grid>
          <Grid item md={9.8}>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "8px 10px 0 16px",
                display: "",
                minHeight: "400px",
              }}
            >
              {
                dummy?.map((ele) => (
              <Box
                sx={{
                  display: "flex",
                  gap: "100px",
                  alignItems: "center",
                  height: "40px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "18px", height: "18px", borderRadius: "4px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "10px", width: "100px" }}
                  />
                </div>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "10px", height: "14px", width: "100px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "10px", height: "14px", width: "100px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "10px", height: "14px", width: "100px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "10px", height: "14px", width: "100px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "10px", height: "14px", width: "100px" }}
                />
              </Box>
                ))
              }
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainSkeleton;
