/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { ArrowDownOutline, ArrowUpOutline } from 'react-ionicons';

const DropPlanDetail = ({ show, setShow, title }) => (
  <PlanDetail show={show} onClick={() => setShow((value) => !value)}>
    <DetailTitle>{title}</DetailTitle>
    <ArrowButton onClick={() => setShow((value) => !value)}>
      {!show
        ? (
          <ArrowDownOutline
            color="#4D65A8"
            height="30px"
            width="30px"
            onClick={() => setShow((value) => !value)}
          />
        )
        : (
          <ArrowUpOutline
            color="#4D65A8"
            height="30px"
            width="30px"
            onClick={() => setShow((value) => !value)}
          />
        )}
    </ArrowButton>
  </PlanDetail>
);

export default DropPlanDetail;

const PlanDetail = styled.div`
  width: 100%;
  height: ${(props) => (props.show ? '111px' : '44px')};
  background-color: #E0D1ED9E;
  border-radius: 5px;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  font-size:18px;
  color: #4D65A8;
  cursor: pointer;
  position: relative;
  left: 0;
  top: 0;
  transition: all 450ms ease-out;
  margin-bottom: 8px;
`;

const ArrowButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
`;

const DetailTitle = styled.span`
  font-weight: 700;
  position: relative;
  top: 12px;
  left: 0;
`;
