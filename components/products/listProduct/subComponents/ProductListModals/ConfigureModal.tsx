import { Box } from "@mui/material";
import React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { GridColDef } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "@/components/common/commonStyle";
const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "featurename",
    headerName: "Feature Name",
    flex: 1,
    editable: true,
  },
  {
    field: "startingvalue",
    headerName: "Starting Value",
    flex: 1,
    editable: true,
  },
  {
    field: "endvalue",
    headerName: "End Value",
    flex: 1,
    editable: true,
  },
];

const rows = [
  { id: 1, featurename: "Grade", startingvalue: "0.1G", endvalue: "0.1G" },
  { id: 2, featurename: "Size", startingvalue: "154.8”", endvalue: "25.6”" },
];
export default function ConfigureModal(data) {
  return (
    <>
      <Box sx={{ margin: "8px 0 0 0" }}>
        <Box sx={{ width: "100%" }}>
          <DataGridPro
            rows={rows}
            columns={columns}
            sx={DataGridStyle}
            autoHeight
            rowHeight={46}
          />
        </Box>
      </Box>
    </>
  );
}
