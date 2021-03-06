/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../../contexts/UserContext';
import WelcomeUserTitle from '../shared/WelcomeUserTitle';
import Image from '../../assets/image03.jpg';
import Button from '../shared/Button';
import DropPlanDetail from '../shared/DropPlanDetail';

const Subscribe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const planId = Number(id.replace(':', ''));
  const plan = planId === 1 ? { weekly: true } : { monthly: true };
  const [showPlanType, setShowPlanType] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState(
    planId === 1
      ? {
        monday: false,
        wednesday: false,
        friday: false,
      }
      : {
        1: false,
        10: false,
        20: false,
      },
  );
  const [products, setProducts] = useState({
    tea: false,
    incense: false,
    organics: false,
  });

  const { user } = useContext(UserContext);
  let userFirstName;
  if (user) {
    const usernameArray = user.name.split(' ');
    userFirstName = usernameArray[0];
  }

  const createFinalPlanObject = () => {
    let deliveryDay = '';
    Object.keys(deliveryDetails).forEach((day) => {
      if (deliveryDetails[day]) deliveryDay = day;
    });

    return ({
      planId,
      deliveryDay,
      products,
    });
  };

  const planDataIsValid = () => {
    let numberOfProducts = 0;
    let numberOfDeliveryDays = 0;
    const chosenPlanId = planId;

    Object.keys(deliveryDetails).forEach((day) => {
      if (deliveryDetails[day]) numberOfDeliveryDays++;
    });

    Object.keys(products).forEach((product) => {
      if (products[product]) numberOfProducts++;
    });

    if (numberOfProducts <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecione pelo menos um produto',
      });
      return false;
    }
    if (numberOfDeliveryDays !== 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Escolha um dia para entrega',
      });
      return false;
    }
    if (chosenPlanId !== 1 && chosenPlanId !== 2) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Plano inv??lido',
      });
      return false;
    }
    return true;
  };

  const handleButtonClick = () => {
    if (planDataIsValid()) {
      const planDetails = createFinalPlanObject();
      localStorage.setItem('planDetails', JSON.stringify(planDetails));
      navigate('finalizar');
    }
  };

  useEffect(() => {
    if (!user || user.planType) {
      navigate('/entrar');
    }
  }, [user]);

  return (
    <PageContainer>
      <Background>
        <WelcomeUserTitle user={userFirstName || 'User'} />
        <Subtitle>???Agradecer ?? arte de atrair coisas boas???</Subtitle>
        <SubscribeBox>
          <BoxImage src={Image} />
          <DropPlanDetail
            title="Plano"
            show={showPlanType}
            setShow={setShowPlanType}
            items={plan}
          />
          <DropPlanDetail
            title="Entrega"
            show={showDelivery}
            setShow={setShowDelivery}
            items={deliveryDetails}
            setItems={setDeliveryDetails}
          />
          <DropPlanDetail
            title="Quero receber"
            show={showProducts}
            setShow={setShowProducts}
            items={products}
            setItems={setProducts}
          />
        </SubscribeBox>
        <Button
          text="Proximo"
          width="47%"
          height="40px"
          marginTop="8px"
          marginBottom="18px"
          onClickFunction={handleButtonClick}
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
