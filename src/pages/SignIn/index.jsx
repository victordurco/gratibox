import React from 'react';
import styled from 'styled-components';
import Button from '../shared/Button';
import WelcomeTitle from '../shared/WelcomeTitle';
import AuthInput from '../shared/AuthInput';

const SignIn = () => (
  <Container>
    <WelcomeTitle />
    <AuthInput placeholder="Email" type="email" />
    <AuthInput placeholder="Senha" type="password" />
    <Button
      width="60vw"
      height="56px"
      text="Login"
      type="submit"
      marginTop="35px"
      marginBottom="15px"
    />
    <SignUpButton>Ainda não sou grato</SignUpButton>
  </Container>
);

export default SignIn;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to top, #4D65A8,#6D7CE4);
`;

const SignUpButton = styled.button`
   width: 60vw;
  max-width: 400px;
  height: 56px;
  color: white;
  font-size:19px;
  font-weight: 700;
  border-radius:10px;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;
