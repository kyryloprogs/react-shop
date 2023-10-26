import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'

type Props = {
  favorite: false,
  img: string,
  title: string,
  design: string,
  additional: Array<any>,
  price: number,
  watches: number,
  favcount: number,
  likes: number,
  dislikes: number
}

const ItemCard = (props: Props) => {
  return (
    <Card sx={{ display: 'flex' }}>
{/* //       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//         <CardContent sx={{ flex: '1 0 auto' }}>
//           Star
//         </CardContent>
//       </Box>
//       <CardMedia */}
{/* //         component="img"
//         sx={{ width: 151 }}
//         image="/static/images/cards/live-from-space.jpg"
//         alt="Live from space album cover"
//       />
//       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//           <IconButton aria-label="previous">
//             {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//           </IconButton>
//           <IconButton aria-label="play/pause">
//             <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//           </IconButton>
//           <IconButton aria-label="next">
//             {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//           </IconButton>
//         </Box>
//       </Box>
//       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//           <IconButton aria-label="previous">
//             {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//           </IconButton>
//           <IconButton aria-label="play/pause">
//             <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//           </IconButton>
//           <IconButton aria-label="next">
//             {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//           </IconButton>
//         </Box>
//       </Box> */}
    </Card >
   )
 }

export default ItemCard