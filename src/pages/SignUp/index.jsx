import React from 'react';
import styled from 'styled-components';
import WelcomeTitle from '../shared/WelcomeTitle';
import AuthInput from '../shared/AuthInput';
import Button from '../shared/Button';

const SignUp = () => (
  <Container>
    <Form>
      <WelcomeTitle />
      <AuthInput placeholder="Nome" type="text" />
      <AuthInput placeholder="Email" type="email" />
      <AuthInput placeholder="Senha" type="password" />
      <AuthInput placeholder="Confirmar senha" type="password" />
      <Button
        type="submit"
        text="Cadastrar"
        width="280px"
        height="56px"
        marginTop="62px"
      />
    </Form>
  </Container>
);

export default SignUp;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to top, #303763, #6D7CE4);
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
