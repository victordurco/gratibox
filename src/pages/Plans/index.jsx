import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PlanBox from '../shared/PlanBox';

const Plans = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Background>
        <Title onClick={navigate()}>Bom te ver por aqui, @User.</Title>
        <Subtitle>Você ainda não assinou um plano, que tal começar agora?</Subtitle>
        <PlanBox
          description="Você recebe um box por semana. Ideal para quem quer exercer a gratidão todos os dias."
        />
        <PlanBox
          description="Você recebe um box por mês. Ideal para quem está começando agora."
        />
      </Background>
    </PageContainer>
  );
};

export default Plans;

const PageContainer = styled.div`
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  height:100%;
  width:100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top, #4D65A8,#6D7CE4);
  padding: 11px;
`;

const Title = styled.span`
  font-size: 26px;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin: 80px 0 22px 0;
`;

const Subtitle = styled.span`
  font-size:18px;
  font-weight:300;
  color: white;
  text-align: center;
  margin-bottom: 30px;
`;
