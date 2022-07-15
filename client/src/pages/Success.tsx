import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { emptyProduct } from '../redux/cartRedux';
import { RootState } from '../redux/store';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
  background-color: #ececec;
  font-weight: 600;
  font-size: large;
`;

const CheckBtn = styled.button`
  background-color: darkblue;
  color: white;
  font-size: 18px !important;
  padding: 10px 16px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Success = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const { data }: any = location.state;
  console.log(cart);

  useEffect(() => {
    dispatch(emptyProduct());
    console.log(data);
  }, []);

  return (
    <Wrapper>
      <Announcement />
      <Navbar />
      <Result>
        <h1>Payment Success</h1>
        <br />
        <span>$ {data.amount / 100}</span>
        <br />
        <span>{data.source.address_country}</span>
        <br />
        <span>{data.source.address_city}</span>
        <br />
        <span>{data.source.address_line1.split(',')[2]}</span>
        <br />
        <span>{data.source.address_zip}</span>
        <Link to='/'>
          <CheckBtn>Home</CheckBtn>
        </Link>
      </Result>
    </Wrapper>
  );
};

export default Success;
