/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const WelcomeUserTitle = ({ user }) => (
  <Title>
    Bom te ver por aqui,
    {' '}
    {user}
    .
  </Title>
);

export default WelcomeUserTitle;

const Title = styled.span`
  font-size: 26px;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin: 80px 0 22px 0;
`;
