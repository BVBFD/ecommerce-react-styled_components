import './home.css';
import React from 'react';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import { userData } from '../../dummyData';

type UserDataType = [
  {
    name: string;
    'Active User': number;
  }
];

const Home = () => {
  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart
        data={userData as UserDataType}
        title='User Analytics'
        grid={true}
        dataKey='Active User'
      />
    </div>
  );
};

export type { UserDataType };
export default Home;
