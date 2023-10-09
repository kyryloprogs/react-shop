import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {}

function MainPage({ }: Props) {
  return (
    <Box component="div" sx={{ flexGrow: 1, p: 3 }} >
      <div className="bg-no-repeat bg-center bg-cover bg-banner1 " style={{ width: "1179px", height: "273px", margin: "0 auto", borderRadius: "10px" }} />
      <div className='flex flex-row justify-between mt-12 w-[1179px] m-auto'>
        <div className="bg-no-repeat bg-center bg-cover bg-banner2 " style={{ width: "363px", height: "273px", borderRadius: "10px" }} />
        <div className="bg-no-repeat bg-center bg-cover bg-banner3 " style={{ width: "737px", height: "273px" , borderRadius: "10px" }} />
      </div>
      <div className='flex flex-row justify-between mt-12 w-[1179px] m-auto'>
        <div className="bg-no-repeat bg-center bg-cover bg-banner4 " style={{ width: "322px", height: "273px", borderRadius: "10px"  }} />
        <div className="bg-no-repeat bg-center bg-cover bg-banner5 " style={{ width: "322px", height: "273px", borderRadius: "10px"  }} />
        <div className="bg-no-repeat bg-center bg-cover bg-banner6 " style={{ width: "322px", height: "273px", borderRadius: "10px"  }} />
      </div>
    </Box>

  )
}

export default MainPage