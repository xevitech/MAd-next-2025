import { Box } from '@mui/material'
import React from 'react'
import { Popovertext } from '../style'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function Adsheading() {
    return (
        <>
            <Box display='flex' justifyContent='space-between' sx={{ px: 2, my: 2 }} >
                <Popovertext>Which ad do you want to use?</Popovertext>
                <Box><CloseOutlinedIcon sx={{ cursor: 'pointer' }} /></Box>
            </Box>
        </>
    )
}
