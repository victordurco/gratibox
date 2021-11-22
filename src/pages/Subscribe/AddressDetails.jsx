/* eslint-disable prefer-destructuring */
import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import cep from 'cep-promise';
import { ArrowDownOutline, ArrowUpOutline } from 'react-ionicons';
import UserContext from '../../contexts/UserContext';
import WelcomeUserTitle from '../shared/WelcomeUserTitle';
import Image from '../../assets/image03.jpg';
import Button from '../shared/Button';
import states from './states';

const AddressDetails = () => {
  const navigate = useNavigate();
  const planDetails = JSON.parse(localStorage.getItem('planDetails'));

  const [showStatesMenu, setShowStatesMenu] = useState(false);
  const [addressData, setAddressData] = useState({
    name: '',
    address: '',
    cep: '',
    city: '',
    state: 'Estado',
  });

  const handleChange = (prop) => (event) => {
    setAddressData({ ...addressData, [prop]: event.target.value });
  };

  const { user } = useContext(UserContext);
  let userFirstName;
  if (user) {
    const usernameArray = user.name.split(' ');
    userFirstName = usernameArray[0];
  }

  useEffect(() => {
    if (!user || user.planType) {
      navigate('/entrar');
    }
    console.log(planDetails);
    cep('17048794')
      .then(console.log);
  }, [user]);

  return (
    <PageContainer>
      <Background>
        <WelcomeUserTitle user={userFirstName || 'User'} />
        <Subtitle>“Agradecer é arte de atrair coisas boas”</Subtitle>
        <SubscribeBox>
          <BoxImage src={Image} />
          <LargeInput
            placeholder="Nome completo"
            value={addressData.name}
            onChange={() => handleChange('name')}
          />
          <LargeInput
            placeholder="Endereço"
            value={addressData.address}
            onChange={() => handleChange('address')}
          />
          <LargeInput
            placeholder="CEP"
            value={addressData.cep}
            onChange={() => handleChange('cep')}
          />
          <SmallInputsWrapper>
            <CityInput placeholder="Cidade" />
            <StateInput onClick={() => setShowStatesMenu((value) => !value)}>
              <SelectedState>{addressData.state}</SelectedState>
              <ArrowButton onClick={() => setShowStatesMenu((value) => !value)}>
                {!showStatesMenu
                  ? (
                    <ArrowDownOutline
                      color="#4D65A8"
                      height="25px"
                      width="25px"
                      onClick={() => setShowStatesMenu((value) => !value)}
                    />
                  )
                  : (
                    <ArrowUpOutline
                      color="#4D65A8"
                      height="25px"
                      width="25px"
                      onClick={() => setShowStatesMenu((value) => !value)}
                    />
                  )}
              </ArrowButton>
            </StateInput>
          </SmallInputsWrapper>
          <StatesOptions show={showStatesMenu}>
            {states.map((item) => <StateOption>{item.acronym}</StateOption>)}
          </StatesOptions>
        </SubscribeBox>
        <Button
          text="Finalizar"
          width="47%"
          height="40px"
          marginTop="8px"
          marginBottom="18px"
        />
      </Background>
    </PageContainer>
  );
};

export default AddressDetails;

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

const LargeInput = styled.input`
  width: 100%;
  height: 44px;
  background-color:#E0D1ED9E;
  border: none;
  border-radius: 5px;
  font-size:18px;
  font-weight:700;
  color: #4D65A8;
  padding: 0px 12px;
  margin-bottom: 8px;

  ::placeholder{
    font-size:18px;
    font-weight:700;
    color: #4D65A8;
  }
  
`;

const CityInput = styled.input`
  width: 60%;
  height: 44px;
  background-color:#E0D1ED9E;
  border: none;
  border-radius: 5px;
  font-size:18px;
  font-weight:700;
  color: #4D65A8;
  padding: 0px 12px;
  margin-bottom: 8px;
  
  ::placeholder{
    font-size:18px;
    font-weight:700;
    color: #4D65A8;
  }
`;

const SmallInputsWrapper = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StateInput = styled.div`
  width: 35%;
  height: 44px;
  background-color:#E0D1ED9E;
  border: none;
  border-radius: 5px;
  font-size:18px;
  font-weight:700;
  color: #4D65A8;
  margin-bottom: 8px;
  padding: 0 12px;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArrowButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 5px;
`;

const SelectedState = styled.span`
  font-size:18px;
  font-weight:700;
  color: #4D65A8;
`;

const StatesOptions = styled.div`
  width: 32%;
  height: ${(props) => (props.show ? '90px' : '0px')};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  transition: all 450ms ease-out;
  position:relative;
  top: -3px;
  right: -33%;
  background-color: #E0D1ED9E;
  border-radius: 5px;
`;

const StateOption = styled.span`
  font-size:18px;
  font-weight:700;
  color: #4D65A8;
  cursor: pointer;
  margin: 0 0 2px 15px;

  :hover{
    background-color: #837e869e;
  }
`;
