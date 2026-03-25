import { DataGridStyle } from '@/components/common/commonStyle';
import { Card, Header, TableWishlist } from '@/components/SellerTools/styles';
import { Box, Skeleton } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import React from 'react'

function TradeShowSkeleton() {
    const columns: any = [
        {
          field: "serial_no",
          headerName: (
            <Skeleton animation="wave" variant="text" width={50} height={"30px"} />
          ),
          flex: .2,
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
          field: "company_type",
          headerName: (
            <Skeleton animation="wave" variant="text" width={100} height={"30px"} />
          ),
          type: "text",
          minWidth: 150,
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
          field: "skeleton",
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
    <>
      <Header>
        <Card>
          <TableWishlist>
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
          </TableWishlist>
        </Card>
      </Header>
    </>
  )
}

export default TradeShowSkeleton