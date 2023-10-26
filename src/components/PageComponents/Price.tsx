import { LineChart } from '@mui/x-charts'
import React from 'react'

type Props = {
    data: Array<any>,
}

const Price = ({ data }: Props) => {
    const xAsisData = data.map(a => new Date(a.regDate).toLocaleString('en-US', { month: 'long' }));
    console.log()
    return (
        <div className="min-h-[750px]">
            <LineChart
                series={[
                    { curve: "linear", data: data.map(a => a.price) },
                    // { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
                ]}
                xAxis={[{ data: xAsisData }]} 
                sx={{ width: "100%", marginTOp: "60px" }}
                height={700}
            />

        </div>
    )
}

export default Price