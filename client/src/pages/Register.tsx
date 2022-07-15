import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signUp, UserType } from '../redux/apiCalls';
import { RootState } from '../redux/store';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [regInfo, setRegInfo] = useState<UserType>();
  const [pwdCheckRef, setPwdCheckRef] = useState<string>();
  const dispatch = useDispatch();
  const isFetching = useSelector((state: RootState) => state.user.isFetching);
  const navigate = useNavigate();

  const onRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (regInfo?.password !== pwdCheckRef) {
      window.alert('Unmatched between password and confirm password');
    }
    try {
      signUp(dispatch, regInfo as UserType);
      navigate('/login');
    } catch (error) {
      window.alert(error);
    }
  };

  const regInfoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={onRegister}>
          {/* <Input placeholder='name' />
          <Input placeholder='last name' /> */}
          <Input
            onChange={regInfoOnChange}
            name='username'
            placeholder='username'
          />
          <Input onChange={regInfoOnChange} name='email' placeholder='email' />
          <Input
            onChange={regInfoOnChange}
            name='password'
            type='password'
            placeholder='password'
          />
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPwdCheckRef(e.target.value)
            }
            type='password'
            placeholder='confirm password'
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button disabled={isFetching} type='submit'>
            {isFetching ? 'CREATING...' : 'CREATE'}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
