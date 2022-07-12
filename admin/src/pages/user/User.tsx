import React, { useEffect, useState } from 'react';
import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  VerifiedUser,
  VerifiedUserOutlined,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import './user.css';
import { userRequest } from '../../requestMethods';
import { UserType } from '../../redux/userRedux';

type UpdateType = {
  username?: UserType['username'];
  email?: UserType['email'];
  isAdmin?: UserType['isAdmin'];
};

const User = () => {
  const [user, setUser] = useState<UserType>();
  const { userId } = useParams();
  const [update, setUpdate] = useState<UpdateType>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get(`/users/find/${userId}`);
        setUser(res.data);
        setUpdate({
          username: res.data.username,
          email: res.data.email,
          isAdmin: res.data.isAdmin,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  const handleUpdateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    console.log(e.target.name);
    console.log(e.target.value);
    if (e.target.name === 'isAdmin') {
      if (e.target.value === 'true') {
        setUpdate({ ...update, [e.target.name]: true });
      } else {
        setUpdate({ ...update, [e.target.name]: false });
      }
    } else {
      setUpdate({ ...update, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateBtn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await userRequest.put(`/users/${userId}`, update);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='user'>
      <div className='userTitleContainer'>
        <h1 className='userTitle'>Edit User</h1>
        <Link to='/newUser'>
          <button className='userAddButton'>Create</button>
        </Link>
      </div>
      <div className='userContainer'>
        <div className='userShow'>
          <div className='userShowBottom'>
            <span className='userShowTitle'>Account Details</span>
            <div className='userShowInfo'>
              <PermIdentity className='userShowIcon' />
              <span className='userShowInfoTitle'>{user?.username}</span>
            </div>
            <span className='userShowTitle'>Register Date</span>
            <div className='userShowInfo'>
              <CalendarToday className='userShowIcon' />
              <span className='userShowInfoTitle'>
                {new Date(user?.createdAt as number).toLocaleDateString()}
              </span>
            </div>
            <span className='userShowTitle'>Contact Details</span>
            <div className='userShowInfo'>
              <MailOutline className='userShowIcon' />
              <span className='userShowInfoTitle'>{user?.email}</span>
            </div>
            <span className='userShowTitle'>Admin Info</span>
            <div className='userShowInfo'>
              {user?.isAdmin ? (
                <VerifiedUser className='userShowIcon' />
              ) : (
                <VerifiedUserOutlined className='userShowIcon' />
              )}
              <span className='userShowInfoTitle'>{user?._id}</span>
            </div>
          </div>
        </div>
        <div className='userUpdate'>
          <span className='userUpdateTitle'>Edit</span>
          <form className='userUpdateForm'>
            <div className='userUpdateLeft'>
              <div className='userUpdateItem'>
                <label>Username</label>
                <input
                  type='text'
                  name='username'
                  placeholder={user?.username}
                  className='userUpdateInput'
                  onChange={handleUpdateChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  placeholder={user?.email}
                  className='userUpdateInput'
                  onChange={handleUpdateChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Admin</label>
                <select
                  name='isAdmin'
                  className='userUpdateInput'
                  onChange={handleUpdateChange}
                >
                  <option value='false'>No</option>
                  <option value='true'>Yes</option>
                </select>
              </div>
              <div className='userUpdateRight'>
                <button onClick={handleUpdateBtn} className='userUpdateButton'>
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
