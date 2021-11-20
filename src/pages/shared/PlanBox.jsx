/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MonthlyImage from '../../assets/image02.jpg';
import WeeklyImage from '../../assets/image04.jpg';
import Button from './Button';

const PlanBox = ({ description, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/assinar');
  };

  return (
    <Container>
      <Image src={type === 'monthly' ? MonthlyImage : WeeklyImage} alt="plan image" />
      <PlanDescription>{description}</PlanDescription>
      <Button
        text="Assinar"
        width="47%"
        height="40px"
        marginTop="44px"
        onClickFunction={handleClick}
      />
    </Container>
  );
};

export default PlanBox;

const Container = styled.div`
    width: 100%;
    height: 400px;
    border-radius: 25px;
    background-color: #E5CDB3;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
`;

const Image = styled.img`
  height: 219px;
`;

const PlanDescription = styled.span`
  width: 308px;
 font-size: 18px;
 font-weight: 700;
 color: #4D65A8;
 text-align: center
`;
