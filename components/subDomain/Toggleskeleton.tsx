import { Box, Skeleton } from '@mui/material'
import React from 'react'

export default function Toggleskeleton() {
  return (
    <>
      <Box sx={{}}>
        <Skeleton variant="rounded" width={72} height={20} sx={{ margin:'8px' }} />
      </Box>
    </>
  )
}
