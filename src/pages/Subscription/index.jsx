/* eslint-disable prefer-destructuring */
import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Roller } from 'react-spinners-css';
import UserContext from '../../contexts/UserContext';
import WelcomeUserTitle from '../shared/WelcomeUserTitle';
import Image from '../../assets/image03.jpg';
import Button from '../shared/Button';
import { getSubscription } from '../../services/gratibox.services';

const Subscription = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);
  let userFirstName;
  if (user) {
    const usernameArray = user.name.split(' ');
    userFirstName = usernameArray[0];
  }

  const [pageInfo, setPageInfo] = useState({
    name: '',
    planType: 0,
    subscriptionDate: '',
    deliveryDay: '',
    nextDeliveries: [],
    tea: false,
    incense: false,
    organics: false,
  });

  useEffect(() => {
    if (!user) {
      navigate('/entrar');
      return;
    }

    getSubscription(user.token)
      .then((res) => {
        setLoading(false);
        setPageInfo({
          name: res.data.name,
          planType: res.data.planType,
          subscriptionDate: res.data.subscription.subscriptionDate,
          deliveryDay: res.data.subscription.deliveryDay,
          nextDeliveries: res.data.subscription.nextDeliveries,
          tea: res.data.subscription.tea,
          incense: res.data.subscription.incense,
          organics: res.data.subscription.organics,
        });
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao carregar dados de assinatura',
        });
        navigate('/');
      });
  }, [user]);

  return (
    <PageContainer>
      <Background>
        <WelcomeUserTitle user={userFirstName || 'User'} />
        <Subtitle>“Agradecer é arte de atrair coisas boas”</Subtitle>
        <SubscriptionBox>
          <BoxImage src={Image} />
          {loading
            ? <Roller color="#4D65A8" width="100px" />
            : (
              <>
                <InfoBox>
                  <HorizontalInfoContainer>
                    {'Plano: '}
                    <Value>{pageInfo.planType === 1 ? 'Semanal' : 'Mensal'}</Value>
                  </HorizontalInfoContainer>
                  <HorizontalInfoContainer>
                    {'Data da assinatura: '}
                    <Value>{pageInfo.subscriptionDate}</Value>
                  </HorizontalInfoContainer>
                  <VerticalInfoContainer>
                    {'Próximas entregas: '}
                    <NextDeliveries>
                      {pageInfo.nextDeliveries.map((day) => <Value>{day}</Value>)}
                    </NextDeliveries>
                  </VerticalInfoContainer>
                </InfoBox>
                <ProductsBox>
                  {pageInfo.tea
            && <Product>Chás</Product>}
                  {pageInfo.organics
            && <Product>Produtos orgânicos</Product>}
                  {pageInfo.incense
            && <Product>Incensos</Product>}
                </ProductsBox>
              </>
            )}

        </SubscriptionBox>
        <Button
          text="Avaliar entregas"
          width="47%"
          height="40px"
          marginTop="8px"
          marginBottom="18px"
          fontSize="18px"
          onClickFunction={() => Swal.fire({
            icon: 'info',
            title: 'Estamos quase...',
            text: 'Em breve será possível avaliar suas entregas',
          })}
        />
      </Background>
    </PageContainer>
  );
};

export default Subscription;

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

const SubscriptionBox = styled.div`
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

const InfoBox = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const HorizontalInfoContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  font-size:18px;
  font-weight: 700;
  color: #4D65A8;
  margin-bottom: 8px;
`;

const VerticalInfoContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  font-size:18px;
  font-weight: 700;
  color: #4D65A8;
  margin-bottom: 8px;
`;

const NextDeliveries = styled.div`
  width: 50%;
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size:18px;
  font-weight: 700;
  color: #4D65A8;
   :first-child{
     margin-top: 8px;
   }
`;

const Value = styled.span`
  font-size:18px;
  font-weight: 700;
  color: #E63C80;
  margin: 0 0 5px 5px;
`;

const ProductsBox = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
`;

const Product = styled.span`
  font-size:18px;
  font-weight: 400;
  color: #E63C80;
`;
