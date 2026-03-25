import { Skeleton } from "@mui/material";
import React from "react";
import { AddProductTable } from "../style";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "@/components/common/commonStyle";

export default function AddNewProductSkeleton() {
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
  ];
  const rows = Array.from({ length: 10 }).map((_, index) => ({
    id: index, // Unique key for each row
    one: <Skeleton animation="wave" variant="text" width={20} />,
    two: <Skeleton animation="wave" variant="text" width={80} />,
    three: <Skeleton animation="wave" variant="text" width={80} />,
    four: <Skeleton animation="wave" variant="text" width={80} />,
  }));
  return (
    <>
      <AddProductTable style={{ height: 430, width: "100%" }}>
        <DataGridPro
          localeText={{
            columnMenuShowColumns: "Manage Columns",
          }}
          sx={DataGridStyle}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowHeight={40}
          //   autoHeight
          pagination
          checkboxSelection={false}
          disableSelectionOnClick={true}
        />
      </AddProductTable>
    </>
  );
}
