/* eslint-disable prefer-destructuring */
import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import WelcomeUserTitle from '../shared/WelcomeUserTitle';
import Image from '../../assets/image03.jpg';
import Button from '../shared/Button';
import DropPlanDetail from '../shared/DropPlanDetail';

const Subscribe = () => {
  const navigate = useNavigate();
  const [showPlanType, setShowPlanType] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

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
        <Subtitle>“Agradecer é arte de atrair coisas boas”</Subtitle>
        <SubscribeBox>
          <BoxImage src={Image} />
          <DropPlanDetail
            title="Plano"
            show={showPlanType}
            setShow={setShowPlanType}
          />
          <DropPlanDetail
            title="Entrega"
            show={showDelivery}
            setShow={setShowDelivery}
          />
          <DropPlanDetail
            title="Quero receber"
            show={showProducts}
            setShow={setShowProducts}
          />
        </SubscribeBox>
        <Button
          text="Proximo"
          width="47%"
          height="40px"
          marginTop="8px"
          marginBottom="18px"
        />
      </Background>
    </PageContainer>
  );
};

export default Subscribe;

const PageContainer = styled.div`
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  height:100%;
  min-height: 100vh;
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

const SubscribeBox = styled.div`
  width: 100%;
  min-height: 430px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 27px;
`;

const BoxImage = styled.img`
  height: 172px;
`;
