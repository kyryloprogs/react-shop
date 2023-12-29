import { Typography } from '@mui/material'

type Props = {
  description: string
}

const Description = (props: Props) => {
  return (
    <div className='mt-[67px] w-[90%] ml-[70px] mb-10'>
      <Typography variant='description'>{props.description}</Typography>
    </div>
  )
}

export default Description