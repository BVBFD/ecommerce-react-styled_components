import { Dispatch } from '@reduxjs/toolkit';
import { loginFailure, loginStart, loginSuccess, logout } from './userRedux';
import * as ProductInfoType from './productRedux';
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

type ProductType2 = ProductInfoType.ProductType;

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
    window.alert('Wrong login info!!');
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
    window.alert(error);
  }
};

export const deleteProduct = async (id: string, dispatch: Dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
    window.alert(error);
  }
};

export const updateProduct = async (
  id: string,
  product: ProductType2,
  dispatch: Dispatch
) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateProductFailure);
    window.alert(error);
  }
};

export const addProduct = async (product: ProductType2, dispatch: Dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(addProductFailure());
    window.alert(error);
  }
};
