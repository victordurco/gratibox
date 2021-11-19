/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const AuthInput = ({
  placeholder, type, value, onChange,
}) => (
  <Input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={onChange}
  />
);

export default AuthInput;

const Input = styled.input`
    width: 90%;
    max-width: 480px;
    height: 64px;
    font-weight: 500;
    font-size: 24px;
    padding: 5px 15px;
    color: #444444;
    border-radius: 10px;
    border: none;
    margin-bottom: 8px;

    ::placeholder{
      font-size: 24px;
      color: #686868;
      font-weight: 500;
    }
`;
