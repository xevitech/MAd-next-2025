import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { MainBox3, SecondSkeletonBox } from "./styles";
const MyCategorySkeleton = () => {
  let List = [1, 2, 3, 4, 5, 6];
  return (
    // {List.map((v, i) => (
    //   <SkeletonForContactList key={i} />
    // ))}
    <Box
      sx={{
        border: "1px solid #E0E3E7",
        height: "100%",
        borderRadius: "4px",
      }}
    >
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Box>
                  <Skeleton variant="text" width={20} height={30} />
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Skeleton variant="text" width={40} height={30} />
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Skeleton variant="text" width={130} />
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Skeleton variant="text" width={130} />
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Skeleton variant="text" width={130} />
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Skeleton variant="text" width={130} />
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Skeleton variant="text" width={130} />
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Skeleton variant="text" width={130} />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {List.map((v, i) => (
              <TableRow>
                <TableCell>
                  <Box>
                    <Skeleton variant="text" width={20} height={30} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Skeleton variant="text" width={40} height={30} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Skeleton variant="text" width={130} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Skeleton variant="text" width={130} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Skeleton variant="text" width={130} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Skeleton variant="text" width={130} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Skeleton variant="text" width={130} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Skeleton variant="text" width={130} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default MyCategorySkeleton;
