import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {}

function NotFoundPage({ }: Props) {
  return (
    <Box component="div" sx={{ flexGrow: 1, p: 3 }} >
      <div className='w-full text-center text'> Page not found. Choose category of products or favorite products.</div>
    </Box>

  )
}

export default NotFoundPage;