import { Box } from '@mui/material'
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid-pro';

const column: GridColDef[] = [

    {
        field: 'ad_type',
        headerName: 'Ad Type',
        width: 200,
        editable: true,
    },
    {
        field: 'memo',
        headerName: 'Memo',
        width: 350,
        editable: true,
    },
    {
        field: 'images',
        headerName: 'Images',
        width: 200,
        editable: true,
        renderCell: (params) => <img src={params.value} style={{ height: '32px', width: '32px' }} />
    },
    {
        field: 'period',
        headerName: 'Period',
        width: 350,
        editable: true,
    },

    {
        field: 'Mystatus',
        headerName: 'My Status',
        width: 150,
        editable: true,
    },
];

const row = [
    { ad_type: 'Under title', id: 1, memo: 'Certified premium quality products!', images: '(/assets/arrow.svg)', period: '15-12-1968', Mystatus: 'Requested' }
];


export default function Adstabletwo() {
    return (
        <>
            <Box sx={{ height: '336px', width: '100%' }}>
                <DataGrid
                    rows={row}
                    columns={column}
                    initialState={{}}
                    checkboxSelection
                    sx={{
                        "& .MuiDataGrid-footerContainer": {
                            display: 'none',
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: '900',
                        },
                        backgroundColor: 'white'
                    }}
                />
            </Box>
        </>
    )
}
