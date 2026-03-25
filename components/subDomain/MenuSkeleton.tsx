import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const MenuItemSkeleton = () => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
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
    </div>
  );
};

export default MenuItemSkeleton;
