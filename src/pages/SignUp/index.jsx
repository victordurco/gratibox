/* eslint-disable consistent-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import WelcomeTitle from '../shared/WelcomeTitle';
import AuthInput from '../shared/AuthInput';
import Button from '../shared/Button';
import { signUp } from '../../services/gratibox.services';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const passwordConfirmationIsValid = () => {
    if (formData.password === formData.confirmPassword) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (formData.name.length < 3) {
      setLoading(false);
      return (
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Seu nome deve conter pelo menos 3 letras',
        })
      );
    }

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

    if (!passwordConfirmationIsValid) {
      setLoading(false);
      return (
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Sua confirmação de senha falhou',
        })
      );
    }

    const body = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    signUp(body)
      .then(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Cadastro realizado!',
          icon: 'success',
          confirmButtonColor: '#6D7CE4',
          confirmButtonText: 'Entrar',
        }).then(() => {
          setLoading(false);
          navigate('/');
        });
      })
      .catch((error) => {
        const { status } = error.response;
        setLoading(false);
        if (status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha os dados corretamente',
          });
          return;
        }

        if (status === 409) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Esse e-mail já é cadastrado',
          });
          return;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo deu errado com o cadastro',
        });
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <WelcomeTitle />
        <AuthInput
          placeholder="Nome"
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
        />
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
        <AuthInput
          placeholder="Confirmar senha"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
        />
        <Button
          type="submit"
          text="Cadastrar"
          width="280px"
          height="56px"
          marginTop="62px"
          loading={loading}
        />
      </Form>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to top, #4D65A8,#6D7CE4);
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
