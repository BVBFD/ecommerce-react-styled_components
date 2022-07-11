import { Dispatch } from '@reduxjs/toolkit';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  ProductType,
  logout,
  UserType,
} from './userRedux';
import { publicRequest, userRequest } from '../requestMethods';
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from './productRedux';

type LoginTryType = {
  username: string;
  password: string;
};

export const login = async (dispatch: Dispatch, user: LoginTryType) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logoutImpl = (dispatch: Dispatch) => {
  dispatch(logout());
};

export const getProducts = async (dispatch: Dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get('/products');
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id: string, dispatch: Dispatch) => {
  dispatch(deleteProductStart());
  try {
    // await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (
  id: string,
  product: ProductType,
  dispatch: Dispatch
) => {
  dispatch(updateProductStart());
  try {
    dispatch(updateProductSuccess({ id, product }));
  } catch (error) {
    dispatch(updateProductFailure);
  }
};

export const addProduct = async (product: ProductType, dispatch: Dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};
