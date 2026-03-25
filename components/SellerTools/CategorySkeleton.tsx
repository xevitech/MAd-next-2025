import React from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const CategorySkeleton = () => {
  let List = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {List.map((v, i) => (
              <TableRow>
                <TableCell style={{ width: "20px" }}>
                  <Skeleton variant="rectangular" width={15} height={15} />
                </TableCell>
                <TableCell sx={{}}>
                  <Skeleton
                    animation="wave"
                    sx={{
                      "@media screen and (max-width:900px)": { width: "100px" },
                    }}
                  />
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
                        sx={{
                          width: "100%",
                          "@media screen and (max-width:900px)": {
                            width: "100px",
                          },
                        }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{
                          width: "100%",
                          "@media screen and (max-width:900px)": {
                            width: "100px",
                          },
                        }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{
                      "@media screen and (max-width:900px)": { width: "100px" },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{
                      "@media screen and (max-width:900px)": { width: "100px" },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{
                      "@media screen and (max-width:900px)": { width: "100px" },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{
                      "@media screen and (max-width:900px)": { width: "100px" },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{
                      "@media screen and (max-width:900px)": { width: "100px" },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{
                      "@media screen and (max-width:900px)": { width: "100px" },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{
                      "@media screen and (max-width:900px)": { width: "100px" },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{
                      "@media screen and (max-width:900px)": { width: "100px" },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{
                      "@media screen and (max-width:900px)": { width: "100px" },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategorySkeleton;
