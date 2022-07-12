import './home.css';
import React, { useEffect, useMemo, useState } from 'react';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { userRequest } from '../../requestMethods';

type ResType = {
  _id: number;
  total: number;
};

type UserDataType = {
  name: string;
  'Active User'?: number;
  Sales?: number;
};

const Home = () => {
  const [userStats, setUserStats] = useState<UserDataType[]>([]);

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/users/stats');
        res.data
          .sort((a: ResType, b: ResType) => a._id - b._id)
          .map((item: ResType) =>
            setUserStats((prev) => [
              ...(prev as UserDataType[]),
              { name: MONTHS[item._id - 1], 'Active User': item.total },
            ])
          );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart
        data={userStats}
        title='New Users'
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
