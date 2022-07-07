import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  currentUser: object | null;
  isFetching: boolean;
  error: boolean;
};

const initialState: UserState = {
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
    logOut: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export type { UserState };
export const { loginStart, loginSuccess, loginFailure, logOut } =
  userSlice.actions;
// reducer 함수 수행하기 위해..
export default userSlice.reducer;
// reducer, state 상태 정보를 보관하는 store 객체를 만들기 위해..
