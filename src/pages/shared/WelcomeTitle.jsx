import React from 'react';
import styled from 'styled-components';

const WelcomeTitle = () => (
  <Title>Bem vindo ao GratiBox</Title>
);

export default WelcomeTitle;

const Title = styled.span`
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: white;
    margin-bottom: 43px;
`;
