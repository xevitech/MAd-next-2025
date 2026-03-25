import React from "react";
import { DataGridStyle } from "@/components/common/commonStyle";
import { Card, Header, TableWishlist } from "@/components/SellerTools/styles";
import { Box, Skeleton } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
const columns: any = [
  {
    field: "serial_no",
    headerName: (
      <Skeleton animation="wave" variant="text" width={50} height={"30px"} />
    ),
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (cellValues) => {
      return (
        <Skeleton animation="wave" variant="text" width={20} height={"30px"} />
      );
    },
  },
  {
    field: "supplier",
    headerName: (
      <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
    ),
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      return (
        <Skeleton animation="wave" variant="text" width={80} height={"30px"} />
      );
    },
  },
  {
    field: "company_type",
    headerName: (
      <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
    ),
    type: "text",
    minWidth: 100,
    flex: 1,
    renderCell: () => {
      return (
        <Skeleton animation="wave" variant="text" width={80} height={"30px"} />
      );
    },
  },
  {
    field: "date_viewed",
    headerName: (
      <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
    ),
    type: "text",
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      return (
        <Skeleton animation="wave" variant="text" width={80} height={"30px"} />
      );
    },
  },
  {
    field: "mini_site2",
    headerName: (
      <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
    ),
    type: "text",
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      return (
        <Skeleton animation="wave" variant="text" width={80} height={"30px"} />
      );
    },
  },
  {
    field: "mini_site3",
    headerName: (
      <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
    ),
    type: "text",
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      return (
        <Skeleton animation="wave" variant="text" width={80} height={"30px"} />
      );
    },
  },
  {
    field: "mini_site4",
    headerName: (
      <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
    ),
    type: "text",
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      return (
        <Skeleton animation="wave" variant="text" width={80} height={"30px"} />
      );
    },
  },
];
const rows = Array.from({ length: 10 }).map((_, index) => ({
  id: index, // Unique key for each row
  serial_no: <Skeleton animation="wave" variant="text" width={20} />,
  supplier: <Skeleton animation="wave" variant="text" width={80} />,
  company_type: <Skeleton animation="wave" variant="text" width={80} />,
  date_viewed: <Skeleton animation="wave" variant="text" width={80} />,
  mini_site2: <Skeleton animation="wave" variant="text" width={80} />,
  mini_site3: <Skeleton animation="wave" variant="text" width={80} />,
  mini_site4: <Skeleton animation="wave" variant="text" width={80} />,
}));
export default function LeadIndexSkeleton() {
  return (
    <>
      <Box
        sx={{
          padding: "0px",
        }}
      >
        <DataGridPro
          localeText={{
            columnMenuShowColumns: "Manage Columns",
          }}
          sx={DataGridStyle}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowHeight={45}
          autoHeight
          pagination
          checkboxSelection={false}
          disableSelectionOnClick={true}
        />
      </Box>
    </>
  );
}
