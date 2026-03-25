import {
  Box,
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const PageSkelton = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          whiteSpace: "nowrap",
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            borderRadius: "6px 6px 0px 0px",
            minHeight: "38px",
            width: "116px",
            overflow: "hidden",
            minWidth: "116px",
          }}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"116px"}
            height={"38px"}
          />
        </Box>
        <Box
          sx={{
            borderRadius: "6px 6px 0px 0px",
            minHeight: "38px",
            width: "116px",
            overflow: "hidden",
            minWidth: "116px",
          }}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"116px"}
            height={"38px"}
          />
        </Box>
        <Box
          sx={{
            borderRadius: "6px 6px 0px 0px",
            minHeight: "38px",
            width: "116px",
            overflow: "hidden",
            minWidth: "116px",
          }}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"116px"}
            height={"38px"}
          />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow:
            "0px 0px 0px rgba(159, 162, 191, 0.18),0px 1px 0px rgba(159, 162, 191, 0.32)",
          borderRadius: "6px",
          padding: "20px",
        }}
      >
        <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Box>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={30}
                width={30}
              />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={100} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Box>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={30}
                width={30}
              />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={100} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Box>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={30}
                width={30}
              />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={100} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Box>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={30}
                width={30}
              />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={100} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Box>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={30}
                width={30}
              />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={100} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Box>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={30}
                width={30}
              />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={100} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Box>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={30}
                width={30}
              />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={100} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ margin: "40px 0 0 0", padding: "0 0 16px 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={"100%"}
                  height={37}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={"100%"}
                  height={37}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={"100%"}
                  height={37}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          margin: "20px 0px",
          backgroundColor: "#fff",
          padding: "0 0 50px 0",
          borderRadius: "6px",
          boxShadow:
            "0px 0px 0px rgba(159, 162, 191, 0.18),0px 1px 0px rgba(159, 162, 191, 0.32)",
        }}
      >
        <Box
          sx={{
            margin: "6px 14px 0px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px",
          }}
        >
          <Box>
            <Skeleton animation="wave" variant="text" width={120} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Box>
              <Skeleton animation="wave" variant="text" width={100} />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={100} />
            </Box>
          </Box>
        </Box>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "20px" }}>
                    <Skeleton variant="rectangular" width={15} height={15} />
                  </TableCell>
                  <TableCell style={{ width: "6%" }}>
                    <Skeleton animation="wave" width={"100%"} height={28} />
                  </TableCell>
                  <TableCell style={{ width: "250px" }}>
                    <Skeleton animation="wave" width={"100%"} height={28} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" height={28} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" height={28} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" height={28} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" height={28} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" height={28} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" height={28} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" height={28} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" height={28} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" height={28} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ width: "20px" }}>
                    <Skeleton variant="rectangular" width={15} height={15} />
                  </TableCell>
                  <TableCell style={{ width: "6%" }}>
                    <Skeleton animation="wave" width={"100%"} />
                  </TableCell>
                  <TableCell style={{ width: "250px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "20px",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={{
                          height: "34px",
                          width: "34px",
                          minHeight: "34px",
                          minWidth: "34px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          marginLeft: "10px",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "20px" }}>
                    <Skeleton variant="rectangular" width={15} height={15} />
                  </TableCell>
                  <TableCell style={{ width: "6%" }}>
                    <Skeleton animation="wave" width={"100%"} />
                  </TableCell>
                  <TableCell style={{ width: "250px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "20px",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={{
                          height: "34px",
                          width: "34px",
                          minHeight: "34px",
                          minWidth: "34px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          marginLeft: "10px",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "20px" }}>
                    <Skeleton variant="rectangular" width={15} height={15} />
                  </TableCell>
                  <TableCell style={{ width: "6%" }}>
                    <Skeleton animation="wave" width={"100%"} />
                  </TableCell>
                  <TableCell style={{ width: "250px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "20px",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={{
                          height: "34px",
                          width: "34px",
                          minHeight: "34px",
                          minWidth: "34px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          marginLeft: "10px",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "20px" }}>
                    <Skeleton variant="rectangular" width={15} height={15} />
                  </TableCell>
                  <TableCell style={{ width: "6%" }}>
                    <Skeleton animation="wave" width={"100%"} />
                  </TableCell>
                  <TableCell style={{ width: "250px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "20px",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={{
                          height: "34px",
                          width: "34px",
                          minHeight: "34px",
                          minWidth: "34px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          marginLeft: "10px",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "20px" }}>
                    <Skeleton variant="rectangular" width={15} height={15} />
                  </TableCell>
                  <TableCell style={{ width: "6%" }}>
                    <Skeleton animation="wave" width={"100%"} />
                  </TableCell>
                  <TableCell style={{ width: "250px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "20px",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={{
                          height: "34px",
                          width: "34px",
                          minHeight: "34px",
                          minWidth: "34px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          marginLeft: "10px",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "20px" }}>
                    <Skeleton variant="rectangular" width={15} height={15} />
                  </TableCell>
                  <TableCell style={{ width: "6%" }}>
                    <Skeleton animation="wave" width={"100%"} />
                  </TableCell>
                  <TableCell style={{ width: "250px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "20px",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={{
                          height: "34px",
                          width: "34px",
                          minHeight: "34px",
                          minWidth: "34px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          marginLeft: "10px",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default PageSkelton;
