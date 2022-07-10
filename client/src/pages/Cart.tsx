import React, { useEffect, useState } from 'react';
import { Add, ClearOutlined, ClosedCaption, Remove } from '@mui/icons-material';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CartProductObjType, removeProduct } from '../redux/cartRedux';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { userRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CartProducts from '../components/CartProducts';
import { UserState } from '../redux/userRedux';

type UserType = {
  _id: string;
  username: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  createdAt?: number;
  updatedAt?: number;
  _v?: number;
  accessToken?: string;
};

type SummaryItemProps = {
  type?: string;
};

type TopButtonProps = {
  status?: 'filled' | undefined;
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button<TopButtonProps>`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.status === 'filled' && 'none'};
  background-color: ${(props) =>
    props.status === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.status === 'filled' && 'white'};
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
  margin-right: 2rem;
`;

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

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div<SummaryItemProps>`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
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

type CartProductsType = {
  productId: string;
  quantity: number;
};

const Cart = () => {
  const user = useSelector(
    (state: RootState) => state.user.currentUser as UserType
  );
  const cart = useSelector((state: RootState) => state.cart);
  const [stripeToken, setStripeToken] = useState<Token>();
  const [products, setProducts] = useState<CartProductsType[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const KEY = process.env.REACT_APP_STRIPE;

  const onToken = (token: Token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    let newArray: CartProductsType[] = [];
    cart.products.forEach((product) => {
      let buyProductObj = {};
      buyProductObj = {
        productId: product._id,
        quantity: product.quantity,
      };
      newArray.push(buyProductObj as CartProductsType);
    });

    setProducts(newArray);
  }, [cart.products]);

  console.log(cart);
  console.log(user);
  console.log(products);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken?.id,
          amount: cart.total * 100,
        });

        await userRequest.post('/orders', {
          userId: user._id,
          products,
          amount: cart.total,
          address: 'USA',
          status: 'approved',
        });

        navigate('/success', { state: { data: res.data } });
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton status='filled'>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {/* @ts-ignore */}
            <CartProducts products={cart.products} />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {/* @ts-ignore */}
            <StripeCheckout
              label='Leo Shop'
              name='Pay Now'
              currency='USD'
              image='https://images.chosun.com/resizer/BzADectC5PmMDjNYKOg9mR6QDDA=/318x350/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/OCDXXRBXIUEZJKXN4FLMGR4KOM.jpg'
              billingAddress
              shippingAddress
              description={`your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY!}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
