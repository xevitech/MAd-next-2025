import { Box, ListItemText, Skeleton, styled } from '@mui/material'
import React from 'react'
export const Listitemtext1 = styled(ListItemText)({
    height:'30px',
    margin:'0 0 0 0',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    borderBottom:'1px solid #f1f1f1',
  "& .MuiListItemText-primary": {
    fontSize: '13px !important',
    fontWeight: '300',
    color: '#00000',
    display: 'flex',
    justifyContent: 'center',
    width:'100%'
  },
})

export default function FeaturelistSkeleton() {
    return (
        <>
            <Box
                sx={{
                    pt: 0,
                    height: "100%",
                    textAlign: "center",
                    "& .MuiListItemText-root": {
                        "&:nth-child(even)": {
                            background: "#f7f7f7",
                        },
                        "&:nth-child(odd)": {
                            backgroundColor: "#ffffff",
                        },

                        "& .MuiListItemText-primary": {
                            fontWeight: "400",
                        },
                    },
                }}
            >
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
                <Listitemtext1><Skeleton animation='wave'  variant='text' width={'60%'} /></Listitemtext1>
            </Box>
        </>
    )
}
