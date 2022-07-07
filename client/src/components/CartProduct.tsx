import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Add, ClearOutlined, Remove } from '@mui/icons-material';
import { CartProductObjType, removeProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

type ProductPropsObjType = {
  product: CartProductObjType;
};

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '5px 15px' })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const CancelBox = styled.div`
  background-color: #eeeeee;
  position: absolute;
  right: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartProduct = ({ product }: ProductPropsObjType) => {
  const dispatch = useDispatch();
  const handleRemoveProduct = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.target);
    console.log(product);
    dispatch(removeProduct({ product, quantity: product.quantity }));
  };

  return (
    <Product>
      <CancelBox onClick={handleRemoveProduct}>
        <ClearOutlined />
      </CancelBox>
      <ProductDetail>
        <Image src={product.img} />
        <Details>
          <ProductName>
            <b>Product:</b> {product.title}
          </ProductName>
          <ProductId>
            <b>ID:</b> {product._id}
          </ProductId>
          <ProductColor color={product.color[0]} />
          <ProductSize>
            <b>Size:</b> {product.size}
          </ProductSize>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <Add />
          <ProductAmount>{product.quantity}</ProductAmount>
          <Remove />
        </ProductAmountContainer>
        <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
      </PriceDetail>
      <Hr />
    </Product>
  );
};

export default CartProduct;
