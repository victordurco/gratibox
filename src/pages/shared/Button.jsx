/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Ellipsis } from 'react-spinners-css';

const Button = ({
  text, type, onClickFunction, height, width, marginTop, fontSize, loading,
}) => (
  <PageButton
    type={type}
    onClick={onClickFunction}
    height={height}
    width={width}
    marginTop={marginTop}
    fontSize={fontSize}
    loading={loading ? 1 : 0}
  >
    {loading ? (
      <Ellipsis color="#fff" width="20px" />
    ) : (
      text
    )}
  </PageButton>
);

export default Button;

const PageButton = styled.button`
    width: ${(props) => props.width};
    max-width: 480px;
    height: ${(props) => props.height};
    font-weight: 500;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '24px')};
    padding: 5px 15px;
    color: white;
    border-radius: 10px;
    border: none;
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
    background-color: #8C97EA;
    opacity: ${(props) => (props.loading ? '0.5' : '1')};
    cursor: ${(props) => (props.loading ? 'not-allowed' : 'pointer')};
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: ${(props) => (props.fontSize ? props.fontSize : '24px')};
    :hover{
      border: 1px #6471c7ac solid;
      background-color: #6D7CE4;
    }
`;
