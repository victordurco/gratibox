/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Button = ({
  text, type, onClickFunction, height, width, marginTop,
}) => (
  <PageButton
    type={type}
    onClick={onClickFunction}
    height={height}
    width={width}
    marginTop={marginTop}
  >
    {text}
  </PageButton>
);

export default Button;

const PageButton = styled.button`
    width: ${(props) => props.width};
    max-width: 480px;
    height: ${(props) => props.height};
    font-weight: 500;
    font-size: 24px;
    padding: 5px 15px;
    color: white;
    border-radius: 10px;
    border: none;
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
    background-color: #8C97EA;
    cursor: pointer;

    :hover{
      border: 1px #303763 solid;
      background-color: #6D7CE4;
    }
`;
