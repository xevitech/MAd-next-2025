import { Box, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { SubHeading } from './style'

const text = [
    {
        value: 'name',
        label: 'Merchant AD',
    },
    {
        value: 'product',
        label: 'Desiel Engine',
    },
    {
        value: 'fuel',
        label: 'Desiel',
    },
];

export default function HeadingAndSelect() {
    return (
        <>
            <Box display='flex' justifyContent='space-between' alignItems='center' mt={2} mb={2}>
                <Box>
                    <SubHeading>Add Listing</SubHeading>
                </Box>
                <Box>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "25ch" }
                        }}
                        noValidate
                        autoComplete="off"

                    >
                        <div>
                            <TextField
                                id="outlined-multiline-flexible"
                                label='Select  add Types'
                                maxRows={4}
                                select
                                size="small"
                            >
                                {text.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
