import React from 'react';
import styled from 'styled-components';

const SignIn = () => (
  <Container>
    <Title>Bem vindo ao GratiBox</Title>
    <Input placeholder="E-mail" type="email" />
    <Input placeholder="Senha" type="password" />
    <LoginButton>Login</LoginButton>
    <SignUpButton>Ainda não sou grato</SignUpButton>
  </Container>
);

export default SignIn;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #6D7CE4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.span`
    font-size: 28px;
    font-weight: 700;
    color: white;
    margin-bottom:40px;
`;

const Input = styled.input`
  width: 80vw;
  max-width: 400px;
  height: 64px;
  border-radius:10px;
  padding: 5px 18px;
  border: none;
  margin-bottom: 8px;
`;

const LoginButton = styled.button`
  width: 60vw;
  max-width: 400px;
  height: 56px;
  color: white;
  font-size:32px;
  font-weight: 700;
  border-radius:10px;
  background-color: #8C97EA;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px 0 15px 0;
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
