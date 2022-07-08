import './home.css';
import React from 'react';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import { userData } from '../../dummyData';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { Link } from 'react-router-dom';

type UserDataType = [
  {
    name: string;
    'Active User'?: number;
    Sales?: number;
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
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export type { UserDataType };
export default Home;
