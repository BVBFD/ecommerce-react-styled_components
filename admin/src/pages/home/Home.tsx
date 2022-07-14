import './home.css';
import React, { useEffect, useMemo, useState } from 'react';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { publicRequest, userRequest } from '../../requestMethods';

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

  const USER = JSON.parse(
    localStorage?.getItem('persist:root') as string
  )?.user;
  const TOKEN = JSON.parse(USER).currentUser?.accessToken.toString();

  useEffect(() => {
    const getXSSToken = async () => {
      try {
        await publicRequest.get('/getXSSToken');
      } catch (error) {
        console.log(error);
      }
    };
    // 로그아웃 다른 아이디 재로그인시
    // 로그앗된 아이디 토큰 사용되던 문제 수정
    if (TOKEN === undefined) {
      window.location.replace('/');
    }
    getXSSToken();
  }, []);

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
