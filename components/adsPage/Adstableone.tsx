import { Box } from '@mui/material'
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid-pro';

const columns: GridColDef[] = [

    {
        field: 'Adtype',
        headerName: 'Ad Type',
        width: 800,
        editable: true,
    },
    {
        field: 'mystatus',
        headerName: 'My Status',
        width: 150,
        editable: true,
    },
];

const rows = [

];

export default function Adstableone() {
    return (
        <>
            <Box sx={{ height: '336px', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{}}
                    checkboxSelection
                    sx={{
                        "& .MuiDataGrid-footerContainer": {
                            display: 'none'
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
