import { Visibility } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '../../redux/userRedux';
import { publicRequest, userRequest } from '../../requestMethods';
import './widgetSm.css';

const WidgetSm = () => {
  const [users, setUsers] = useState<UserType[]>();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await publicRequest.get('/users/?new=true');
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className='widgetSm'>
      <span className='widgetSmTitle'>New Join Members</span>
      <ul className='widgetSmList'>
        {users?.map((user) => (
          <li className='widgetSmListItem' key={user._id}>
            <img
              src={
                user.img ||
                'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=''
              className='widgetSmImg'
            />
            <div className='widgetSmUser'>
              <span className='widgetSmUsername'>{user?.username}</span>
            </div>
            <Link to={`/user/${user?._id}`}>
              <button className='widgetSmButton'>
                <Visibility className='widgetSmIcon' />
                Display
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
