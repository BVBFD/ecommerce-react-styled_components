import { useSelect } from '@mui/base';
import { Language, NotificationsNone, Settings } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutImpl } from '../../redux/apiCalls';
import { RootState } from '../../redux/store';
import './topbar.css';

const Topbar = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    logoutImpl(dispatch);
  };

  return (
    user && (
      <div className='topbar'>
        <div className='topbarWrapper'>
          <div className='topLeft'>
            <Link to={'/'}>
              <span className='logo'>Leo Admin</span>
            </Link>
          </div>
          <div className='topRight'>
            <button className='logoutBtn' onClick={handleLogout}>
              Log-out
            </button>
            <div className='topbarIconContainer'>
              <NotificationsNone />
              <span className='topIconBadge'>2</span>
            </div>
            <div className='topbarIconContainer'>
              <Language />
              <span className='topIconBadge'>2</span>
            </div>
            <div className='topbarIconContainer'>
              <Settings />
            </div>
            <img
              src='https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
              className='topAvatar'
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Topbar;
