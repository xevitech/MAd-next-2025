import { Box, Typography } from '@mui/material'
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridToolbarContainer } from "@mui/x-data-grid-pro";

const columnss: GridColDef[] = [
    { field: 'id', headerName: 'Sr. No.', width: 70 },
    { field: 'productId', headerName: 'Product Id', width: 130 },
    { field: 'productImage', headerName: 'Product Image/Name', width: 130 },
    {
        field: 'category',
        headerName: 'Category',
        width: 90,
    },
    {
        field: 'productType',
        headerName: 'Product Type',
        width: 90,
    },
    {
        field: 'postValidity',
        headerName: 'Post Validity',
        width: 90,
    },

];

const rowss = [
    { id: 1, productId: 'Snow', productImage: 'Jon', category: 35, productType: 'Simple', postValidity: '3_months' },
    { id: 2, productId: 'Lannister', productImage: 'Cersei', category: 42, productType: 'Simple', postValidity: '3_months' },
    { id: 3, productId: 'Lannister', productImage: 'Jaime', category: 45, productType: 'Simple', postValidity: '3_months' },
    { id: 4, productId: 'Stark', productImage: 'Arya', category: 16, productType: 'Simple', postValidity: '3_months' },
];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <Box sx={{ p: 1 }}>
                <Typography
                    sx={{
                        fontWeight: "600 !important",
                        fontSize: "18px",
                        color: "#231F20",
                    }}
                >
                    Select Products
                </Typography>
            </Box>
        </GridToolbarContainer>
    );
}
export default function Adsmodaltable() {
    return (
        <>
            <Box boxShadow='0px 2px 4px 0px rgba(0, 0, 0, 0.075)'>
                <Box style={{ height: 366, width: '100%' }} sx={{ mt: 8, boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.075)' }}>
                    <DataGrid
                        rows={rowss}
                        columns={columnss}
                        checkboxSelection
                        components={{ Toolbar: CustomToolbar }}
                    />
                </Box>
            </Box>
        </>
    )
}
