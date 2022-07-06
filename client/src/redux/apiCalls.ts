import { Dispatch } from '@reduxjs/toolkit';
import { publicRequest } from '../requestMethods';
import { loginFailure, loginStart, loginSuccess } from './userRedux';

type UserType = {
  username?: string;
  password?: string;
};

export const login = async (dispatch: Dispatch, user: UserType) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
