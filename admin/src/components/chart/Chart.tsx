import React from 'react';
import './chart.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { UserDataType } from '../../pages/home/Home';
import { ProductType } from '../../redux/userRedux';

type DataType = {
  data: UserDataType[] | ProductType | undefined | any;
  title: string;
  grid?: boolean;
  dataKey: string;
};

const Chart = ({ data, title, grid, dataKey }: DataType) => {
  return (
    <div className='chart'>
      <h3 className='chartTitle'>{title}</h3>
      <ResponsiveContainer width='100%' aspect={4 / 1}>
        <LineChart data={data}>
          {grid && <CartesianGrid stroke='#d0d0ee' strokeDasharray='3 3' />}
          <XAxis dataKey='name' stroke='#5550bd' />
          <YAxis stroke='#5550bd' />
          <Line type='monotone' dataKey={dataKey} stroke='#5550bd' />
          <Tooltip />
          {/* <Legend /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
