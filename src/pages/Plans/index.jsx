/* eslint-disable prefer-destructuring */
import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PlanBox from '../shared/PlanBox';
import UserContext from '../../contexts/UserContext';
import WelcomeUserTitle from '../shared/WelcomeUserTitle';

const Plans = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  let userFirstName;
  if (user) {
    const usernameArray = user.name.split(' ');
    userFirstName = usernameArray[0];
  }

  useEffect(() => {
    if (!user) {
      navigate('/entrar');
    }
  }, [user]);

  return (
    <PageContainer>
      <Background>
        <WelcomeUserTitle user={userFirstName || 'User'} />
        <Subtitle>Você ainda não assinou um plano, que tal começar agora?</Subtitle>
        <PlanBox
          description="Você recebe um box por semana. Ideal para quem quer exercer a gratidão todos os dias."
          type="weekly"
        />
        <PlanBox
          description="Você recebe um box por mês. Ideal para quem está começando agora."
          type="monthly"
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

const Subtitle = styled.span`
  font-size:18px;
  font-weight:300;
  color: white;
  text-align: center;
  margin-bottom: 30px;
`;
