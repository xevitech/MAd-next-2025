import { Divider } from "@mui/material";
import { Skeleton } from "@mui/lab";
import { Stack, Grid } from "@mui/material";
import Box from "@mui/material/Box";

export default function CertificateSkelton() {
  return (
    <>
      {[1].map((v, i) => (
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "#fff", borderRadius: '6px', paddingBottom: "16px" }}
          key={i + v}
        >
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid  rgba(34, 51, 84, 0.1)', paddingBottom: '12px' }}>
              <Box>
                <Skeleton animation='wave' variant="rounded" height={30} width={30} />
              </Box>
              <Box>
                <Skeleton animation='wave' variant="text" width={60} ></Skeleton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} xl={6}>
            <Box sx={{ border: "2px solid #CDCDCD", borderRadius: "6px", }}>
              <Grid container spacing={0}>
                <Grid item xs={3.5}>
                  <Box sx={{ padding: "8px" }}>
                    <Stack spacing={1}>
                      <Box sx={{ display: "flex", justifyContent: 'center' }}>
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          height={180}
                          width={"75%"}
                        />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: 'center' }}>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          width="58%"
                          height={35}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={8.5}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"40%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"60%"}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"40%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"65%"}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"50%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"55%"}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"100%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"40%"}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"80%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"40%"}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"50%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"70%"}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} lg={6} xl={6}>
            <Box sx={{ border: "2px solid #CDCDCD", borderRadius: "6px" }}>
              <Grid container spacing={0}>
                <Grid item xs={3.5}>
                  <Box sx={{ padding: "8px" }}>
                    <Stack spacing={1}>
                      <Box sx={{ display: "flex", justifyContent: 'center' }}>
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          height={180}
                          width={"75%"}
                        />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: 'center' }}>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          width="58%"
                          height={35}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={8.5}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"30%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"60%"}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"50%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"30%"}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"40%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"80%"}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"80%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"60%"}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"60%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"100%"}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "6px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"40%"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={"66%"}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
