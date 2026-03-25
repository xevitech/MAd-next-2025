import React from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const QuestionnaireSkeleton = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          padding: "20px 20px 50px 20px",
          border: "1px solid #E0E3E7",
          borderRadius: "4px",
        }}
      >
        <Box>
          <Skeleton animation="wave" variant="text" width={"18%"} />
        </Box>
        <Box>
          <Skeleton animation="wave" variant="text" width={"100%"} />
          <Skeleton animation="wave" variant="text" width={"50%"} />
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#f7f7f7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                borderRadius: "6px",
                border: "1px solid #E0E3E7",
              }}
            >
              <Skeleton
                animation="wave"
                variant="circular"
                height={80}
                width={80}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              "@media screen and (max-width:900px)": {
                marginTop: "32px",
              },
            }}
          >
            <Box
              sx={{
                height: "100%",
                padding: "1rem",
                backgroundColor: "#f7f7f7",
                borderRadius: "6px",
                border: "1px solid #E0E3E7",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ height: "100%" }}>
                    <Skeleton animation="wave" variant="text" width={"50%"} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ height: "100%" }}>
                    <Skeleton animation="wave" variant="text" width={"100%"} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ height: "100%" }}>
                    <Skeleton animation="wave" variant="text" width={"50%"} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ height: "100%" }}>
                    <Skeleton animation="wave" variant="text" width={"100%"} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ height: "100%" }}>
                    <Skeleton animation="wave" variant="text" width={"50%"} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ height: "100%" }}>
                    <Skeleton animation="wave" variant="text" width={"100%"} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ height: "100%" }}>
                    <Skeleton animation="wave" variant="text" width={"50%"} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ height: "100%" }}>
                    <Skeleton animation="wave" variant="text" width={"100%"} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          margin: "1rem 0 0 0",
          backgroundColor: "#fff",
          border: "1px solid #E0E3E7",
          padding: "15px 24px",
          borderRadius: "4px",
          position: "relative",
        }}
      >
        <Box>
          <Skeleton animation="wave" variant="text" width={"100%"} />
        </Box>
        <Box sx={{ margin: "8px 0 0 0" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={"100%"}
            height={35}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "-15px",
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            height={30}
            width={30}
          />
        </Box>
      </Box>
      <Box
        sx={{
          margin: "1rem 0 0 0",
          backgroundColor: "#fff",
          border: "1px solid #E0E3E7",
          padding: "15px 24px",
          borderRadius: "4px",
          position: "relative",
        }}
      >
        <Box>
          <Skeleton animation="wave" variant="text" width={"40%"} />
        </Box>
        <Box sx={{ margin: "8px 0 0 0" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={"100%"}
            height={35}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "-15px",
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            height={30}
            width={30}
          />
        </Box>
      </Box>
      <Box
        sx={{
          margin: "1rem 0 0 0",
          backgroundColor: "#fff",
          border: "1px solid #E0E3E7",
          padding: "15px 24px",
          borderRadius: "4px",
          position: "relative",
        }}
      >
        <Box>
          <Skeleton animation="wave" variant="text" width={"40%"} />
        </Box>
        <Box sx={{ margin: "8px 0 0 0" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={"100%"}
            height={75}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "-15px",
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            height={30}
            width={30}
          />
        </Box>
      </Box>
      <Box
        sx={{
          margin: "1rem 0 0 0",
          backgroundColor: "#fff",
          border: "1px solid #E0E3E7",
          padding: "15px 24px",
          borderRadius: "4px",
          position: "relative",
        }}
      >
        <Box>
          <Skeleton animation="wave" variant="text" width={"40%"} />
        </Box>
        <Box sx={{ margin: "8px 0 0 0" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={"100%"}
            height={75}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "-15px",
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            height={30}
            width={30}
          />
        </Box>
      </Box>
      <Box
        sx={{
          margin: "1rem 0 0 0",
          backgroundColor: "#fff",
          border: "1px solid #E0E3E7",
          padding: "15px 24px",
          borderRadius: "4px",
          position: "relative",
        }}
      >
        <Box>
          <Skeleton animation="wave" variant="text" width={"40%"} />
        </Box>
        <Box sx={{ margin: "8px 0 0 0" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={"100%"}
            height={75}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "-15px",
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            height={30}
            width={30}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionnaireSkeleton;
