import React from 'react'

type Props = {
    attributes: object
}

const Charasteristics = (props: Props) => {
    return (
        <div className='w-full grid grid-cols-2 gap-[10px] ml-[60px] mt-[37px]'>
            {Object.keys(props.attributes).map((el, index) => (
                <div className='flex flex-row gap-[60px] min-h-[50px] break-words pb-[64px]' key={index}>
                    <div className='min-w-[134px]'>{el}: </div>
                    <div className='max-w-[375px]'>{props.attributes[el as keyof typeof props.attributes]}</div>
                </div>
            ))}
        </div>
    )
}

export default Charasteristics