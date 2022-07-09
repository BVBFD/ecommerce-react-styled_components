import { createSlice } from '@reduxjs/toolkit';

type UserType = {
  _id: string;
  userId: string;
  password?: string;
  email: string;
  profilePic?: string;
  createdAt?: number;
  updatedAt?: number;
  _v?: Int32List;
  editable: boolean;
};

type ProductType = {
  currentUser: UserType | null;
  isFetching: boolean;
  error: boolean;
};

const initialState: ProductType = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
export type { UserType, ProductType };
