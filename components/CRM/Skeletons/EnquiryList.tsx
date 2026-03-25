import React from "react";
import { Box, Grid, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
const EnquiryList = () => {
  return (
    <Box>
      <Box 
        sx={{
          backgroundColor: "#F5F5F5",
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={7} xl={7}>
            <Box>
              <Skeleton animation="wave" variant="text" width={"100%"} />
              <Skeleton animation="wave" variant="text" width={"60%"} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                margin: "8px 0 0 0 ",
              }}
            >
              <Skeleton
                animation="wave"
                variant="text"
                width={"10%"}
                height={25}
              />
              <Skeleton animation="wave" variant="text" width={"8%"} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={5} xl={5}>
            <Box
              sx={{
                textAlign: "right",
                display: "flex",
                gap: "20px",
                justifyContent: "flex-end",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  borderRight: "1px solid #dcdcdc",
                  paddingRight: "20px",
                }}
              >
                <Skeleton animation="wave" variant="text" width={60} />
                <Skeleton animation="wave" variant="text" width={100} />
              </Box>
              <Box>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={100}
                  height={30}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ padding: "16px" }}>
        <Box>
          <Skeleton animation="wave" variant="text" width={"10%"} height={25} />
        </Box>
        <Box
          sx={{
            marginTop: "16px",
            border: "1px solid #d2d2d2",
            borderRadius: "4px",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" variant="text" width={"20%"} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{
            justifyContent: "flex-end",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "16px 0 0 0",
          }}
        >
          <Box>
            <Skeleton animation="wave" variant="rounded" width={100} />
          </Box>
          <Box>
            <Skeleton animation="wave" variant="rounded" width={100} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={7} xl={7}>
            <Box>
              <Skeleton animation="wave" variant="text" width={"100%"} />
              <Skeleton animation="wave" variant="text" width={"60%"} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                margin: "8px 0 0 0 ",
              }}
            >
              <Skeleton
                animation="wave"
                variant="text"
                width={"10%"}
                height={25}
              />
              <Skeleton animation="wave" variant="text" width={"8%"} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={5} xl={5}>
            <Box
              sx={{
                textAlign: "right",
                display: "flex",
                gap: "20px",
                justifyContent: "flex-end",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  borderRight: "1px solid #dcdcdc",
                  paddingRight: "20px",
                }}
              >
                <Skeleton animation="wave" variant="text" width={60} />
                <Skeleton animation="wave" variant="text" width={100} />
              </Box>
              <Box>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={100}
                  height={30}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EnquiryList;
