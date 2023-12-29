import { Typography } from '@mui/material'

type Props = {
    attributes: Array<any>
}

const Charasteristics = (props: Props) => {
    console.log(props.attributes)
    return (
        <div className='w-full grid grid-cols-2 gap-[10px] ml-[60px] mt-[37px] mx-auto'>
            {props.attributes.map((el, index) => (
                <div className='flex flex-row gap-[60px] min-h-[50px] break-words pb-[64px] mt-[37px]' key={index}>
                    <div className='min-w-[134px]'>
                        <Typography variant='productSettings'>
                            {el.attribute?.name}:
                        </Typography>
                    </div>
                    <div className='max-w-[375px]'>
                        <Typography variant='productSettings'>
                            {el.attribute?.value}
                        </Typography>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Charasteristics