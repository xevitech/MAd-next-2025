import { Box } from '@mui/material'
import React from 'react'
import { Btn, Btn2 } from '../style'

export default function Adsmodalbuttons() {
    return (
        <>
            <Box sx={{ mt: 2, float: 'right', pb: 3 }}>
                <Btn2>Cancel</Btn2>
                <Btn>Launch</Btn>
            </Box>
        </>
    )
}
