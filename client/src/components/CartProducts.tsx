import React from 'react';
import { CartProductObjType } from '../redux/cartRedux';
import CartProduct from './CartProduct';

type ProductListPropsObjType = {
  products: CartProductObjType[];
};

const CartProducts = ({ products }: ProductListPropsObjType) => {
  return (
    <>
      {products.map((product: CartProductObjType) => (
        <CartProduct product={product} />
      ))}
    </>
  );
};

export default CartProducts;
