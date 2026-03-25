import { Box, Skeleton } from "@mui/material";
import React from "react";
import {
  AddMoreProductTable,
  AddProductTableBox,
  CatelogeWhiteContainer,
  CatelogWrapper,
} from "../style";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "@/components/common/commonStyle";

export default function CatalogUpdateSkeleton() {
  const columns: any = [
    {
      field: "serial_no",
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
      field: "supplier",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      minWidth: 70,
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
      field: "company_type",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 250,
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
      field: "date_viewed",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 150,
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
      field: "mini_site",
      headerName: (
        <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
      ),
      type: "text",
      minWidth: 120,
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
    serial_no: <Skeleton animation="wave" variant="text" width={20} />,
    supplier: <Skeleton animation="wave" variant="text" width={80} />,
    company_type: <Skeleton animation="wave" variant="text" width={80} />,
    date_viewed: <Skeleton animation="wave" variant="text" width={80} />,
    mini_site: <Skeleton animation="wave" variant="text" width={80} />,
  }));
  return (
    <div >
      <CatelogeWhiteContainer sx={{}} className="skeletonBox" >
        <CatelogWrapper sx={{ margin: "1rem 0" }} className="innerskeletonDiv">
          <AddMoreProductTable
            sx={{ margin: "40px 0 0 0", position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-38px",
                left: "0px",
                width: "150px",
                height: "38px",
                borderRadius: "4px 4px 0 0",
                overflow: "hidden",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height="38px"
                animation="wave"
              />
            </Box>
            <AddProductTableBox
              sx={{
                "& .MuiDataGrid-footerContainer": {
                  display: "none",
                },
              }}
            >
              <DataGridPro
                localeText={{
                  columnMenuShowColumns: "Manage Columns",
                }}
                sx={DataGridStyle}
                rows={rows}
                columns={columns}
                // pageSize={10}
                rowHeight={45}
                autoHeight
                pagination={false}
                checkboxSelection={false}
                disableSelectionOnClick={true}
              />
            </AddProductTableBox>
          </AddMoreProductTable>
        </CatelogWrapper>
      </CatelogeWhiteContainer>
    </div>
  );
}
