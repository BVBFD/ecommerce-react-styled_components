import React from 'react';
import { Send } from '@mui/icons-material';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: 'center' })}
`;

const InputContainer = styled.div`
  width: 10%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: '80%' })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.a`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;

  &:active {
    transform: scale(0.9);
  }
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Questions</Title>
      <Desc>Feel free to contact us anytime!</Desc>
      <InputContainer>
        {/* <Input placeholder='Your email' /> */}
        <Button href='mailto:lsevina126@gmail.com?subject=안녕하세요!&body=문의사항을 적어서 보내주세요!'>
          <Send style={{ marginRight: '12px' }} />
          Click To Us By Email
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
