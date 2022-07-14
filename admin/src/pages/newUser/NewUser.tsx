import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../redux/userRedux';
import { publicRequest } from '../../requestMethods';
import './newUser.css';
import { mmTk } from '../product/Product';
import { checkMmTk, isMnTk } from '../../module/checkMmTk';

const NewUser = ({ mmTk }: mmTk) => {
  const [user, setUser] = useState<UserType | {}>({ isAdmin: false });
  const navigate = useNavigate();
  const [mmTkResult, setMnTkResult] = useState<boolean>(false);

  useEffect(() => {
    isMnTk(mmTk, setMnTkResult);
  }, [mmTk]);

  const handleNewUser = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === 'isAdmin') {
      if (e.target.value === 'false') {
        setUser({
          ...user,
          [e.target.name]: false,
        });
      } else {
        setUser({
          ...user,
          [e.target.name]: true,
        });
      }
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const createNewUser = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post('/auth/register', user);
      console.log(res);
      navigate(`/user/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);

  return (
    <div className='newUser'>
      <h1 className='newUserTitle'>New User</h1>
      <form className='newUserForm'>
        <div className='newUserItem'>
          <label>Username</label>
          <input
            onChange={handleNewUser}
            name='username'
            type='text'
            placeholder='john'
          />
        </div>
        <div className='newUserItem'>
          <label>Email</label>
          <input
            onChange={handleNewUser}
            name='email'
            type='email'
            placeholder='john@gmail.com'
          />
        </div>
        <div className='newUserItem'>
          <label>Password</label>
          <input
            onChange={handleNewUser}
            name='password'
            type='password'
            placeholder='password'
          />
        </div>
        {/* <div className='newUserItem'>
          <label>Gender</label>
          <div className='newUserGender'>
            <input type='radio' name='gender' id='male' value='male' />
            <label htmlFor='male'>Male</label>
            <input type='radio' name='gender' id='female' value='female' />
            <label htmlFor='female'>Female</label>
            <input type='radio' name='gender' id='other' value='other' />
            <label htmlFor='other'>Other</label>
          </div>
        </div> */}
        <div className='newUserItem'>
          <label>Admin</label>
          <select
            onChange={handleNewUser}
            className='newUserSelect'
            name='isAdmin'
          >
            <option value='false'>No</option>
            <option value='true'>Yes</option>
          </select>
        </div>
        {/* @ts-ignore */}
        <button onClick={mmTkResult && createNewUser} className='newUserButton'>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewUser;
