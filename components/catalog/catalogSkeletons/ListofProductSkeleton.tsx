import { DataGridStyle } from "@/components/common/commonStyle";
import { Box, Skeleton } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import React from "react";
import { ListProductTable } from "../style";

export default function ListofProductSkeleton() {
  const columns: any = [
    {
      field: "one",
      headerName: (
        <Skeleton animation="wave" variant="text" width={50} height={"30px"} />
      ),
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={20}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "two",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "three",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: () => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "four",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "five",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "six",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "seven",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
    {
      field: "eight",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            height={"30px"}
          />
        );
      },
    },
  ];
  const rows = Array.from({ length: 10 }).map((_, index) => ({
    id: index, // Unique key for each row
    one: <Skeleton animation="wave" variant="text" width={20} />,
    two: <Skeleton animation="wave" variant="text" width={80} />,
    three: <Skeleton animation="wave" variant="text" width={80} />,
    four: <Skeleton animation="wave" variant="text" width={80} />,
    five: <Skeleton animation="wave" variant="text" width={80} />,
    six: <Skeleton animation="wave" variant="text" width={80} />,
    seven: <Skeleton animation="wave" variant="text" width={80} />,
    eight: <Skeleton animation="wave" variant="text" width={80} />,
  }));
  return (
    <>
      <Box sx={{ height: 450, margin: "0", padding: "7px 0px" }}>
        <DataGridPro
          localeText={{
            columnMenuShowColumns: "Manage Columns",
          }}
          sx={DataGridStyle}
          rows={rows}
          columns={columns}
          pageSize={8}
          rowHeight={40}
          //   autoHeight
          pagination
          checkboxSelection={false}
          disableSelectionOnClick={true}
        />
      </Box>
    </>
  );
}
