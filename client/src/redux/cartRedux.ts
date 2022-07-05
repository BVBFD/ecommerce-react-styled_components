import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  products: Array<string>;
  quantity: number;
  total: number;
};

const initialState: State = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += action.payload.quantity;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
// reducer 함수 수행하기 위해..
export default cartSlice.reducer;
// reducer, state 상태 정보를 보관하는 store 객체를 만들기 위해..
