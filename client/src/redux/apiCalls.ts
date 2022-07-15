import { Dispatch } from '@reduxjs/toolkit';
import { publicRequest } from '../requestMethods';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from './userRedux';

type UserType = {
  username?: string;
  password?: string;
  email?: string;
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

export const signUp = async (dispatch: Dispatch, user: UserType) => {
  dispatch(signUpStart());
  try {
    await publicRequest.post('/auth/register', user);
    dispatch(signUpSuccess());
  } catch (error) {
    window.alert(error);
    dispatch(signUpFailure());
  }
};

export type { UserType };
