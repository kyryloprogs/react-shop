import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import dayjs from 'dayjs';

type Props = {
    data: [
        {
            price: number,
            regDate: string
        }
    ]
}
const Price = (props: Props) => {
    console.log(props);
    const chartData = props.data.map((e) => ({
        month: dayjs(e.regDate).format("MMM"),
        sales: e.price
      }));

   
    return (
        <div className='flex justify-center items-center mt-16'>
            <LineChart width={1300} height={518} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="linear" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

export default Price;
