/* eslint-disable consistent-return */
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../shared/Button';
import WelcomeTitle from '../shared/WelcomeTitle';
import AuthInput from '../shared/AuthInput';
import { signIn } from '../../services/gratibox.services';
import UserContext from '../../contexts/UserContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (formData.password.length < 6) {
      setLoading(false);
      return (
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Sua senha deve conter pelo menos 6 caracteres',
        })
      );
    }

    signIn(formData)
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.data.token));
        setUser({ ...response.data });
        setLoading(false);
        if (response.data.planType === 1 || response.data.planType === 2) {
          navigate('/assinatura');
        } else {
          navigate('/planos');
        }
      }).catch((error) => {
        const { status } = error.response;
        setLoading(false);
        if (status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'E-mail não cadastrado',
          });
        } else if (status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senha incorreta',
          });
        } else if (status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Dados preenchidos incorretamente',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Falha ao entrar, tente novamente mais tarde',
          });
        }
      });
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <Container>
      <WelcomeTitle />
      <Form onSubmit={handleSubmit}>
        <AuthInput
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
        />
        <AuthInput
          placeholder="Senha"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
        />
        <Button
          width="60vw"
          height="56px"
          text="Login"
          type="submit"
          marginTop="35px"
          marginBottom="15px"
          loading={loading}
        />
        <SignUpButton onClick={() => navigate('/cadastro')}>Ainda não sou grato</SignUpButton>
      </Form>
    </Container>
  );
};

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
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
