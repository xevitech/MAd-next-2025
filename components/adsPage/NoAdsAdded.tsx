import { Box } from '@mui/material'
import React from 'react'
import { Noadsheading, Noadsimg, Noadstext } from './style'

export default function NoAdsAdded() {
    return (
        <>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Box sx={{textAlign:'center'}}>
                    <Noadsimg src="/assets/adsquestionmark.svg" alt="" />
                    <Noadsheading>
                        No Ads Record
                    </Noadsheading>
                    <Noadstext>
                        You have not Added any Ad.
                    </Noadstext>
                </Box>
            </Box>
        </>
    )
}
