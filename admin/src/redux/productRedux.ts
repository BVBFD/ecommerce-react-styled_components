import { createSlice } from '@reduxjs/toolkit';

type SizeType = 'XS' | 'S' | 'M' | 'L' | 'XL';

type ProductType = {
  _id?: string;
  title?: string;
  desc?: string;
  img?: string;
  categories?: ['women' | 'man', string];
  size?: SizeType[];
  color?: string[];
  price?: number;
  inStock?: boolean;
  createdAt?: number;
  updatedAt?: number;
  _v?: Int32List;
};

type ProductStateType = {
  products: Array<ProductType>;
  isFetching: boolean;
  error: boolean;
};

const initialState: ProductStateType = {
  products: [],
  isFetching: false,
  error: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Get All
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Delete
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Add
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
