import React from "react";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function AuxilarySkeltonList() {
  return (
    <>
      <TableRow>
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"20px"} />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"100px"} />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"100px"} />
        </TableCell>
        <TableCell sx={{ display: "flex", gap: "6px" }}>
          <Skeleton
            animation="wave"
            variant="text"
            width={"20px"}
            height={25}
          />
          <Skeleton
            animation="wave"
            variant="text"
            width={"20px"}
            height={25}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"20px"} />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"100px"} />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"100px"} />
        </TableCell>
        <TableCell sx={{ display: "flex", gap: "6px" }}>
          <Skeleton
            animation="wave"
            variant="text"
            width={"20px"}
            height={25}
          />
          <Skeleton
            animation="wave"
            variant="text"
            width={"20px"}
            height={25}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
