import { Skeleton, TableCell, TableRow } from "@mui/material";

const ConstantListSkelton = () => {
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
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"100px"} />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"100px"} />
        </TableCell>
        <TableCell
          sx={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}
        >
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
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"100px"} />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"100px"} />
        </TableCell>
        <TableCell
          sx={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}
        >
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
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"100px"} />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" width={"100px"} />
        </TableCell>
        <TableCell
          sx={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}
        >
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
};
export default ConstantListSkelton;
