/* eslint-disable prefer-destructuring */
import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import cep from 'cep-promise';
import { ArrowDownOutline, ArrowUpOutline } from 'react-ionicons';
import UserContext from '../../contexts/UserContext';
import WelcomeUserTitle from '../shared/WelcomeUserTitle';
import Image from '../../assets/image03.jpg';
import Button from '../shared/Button';
import { getStates, subscribe } from '../../services/gratibox.services';

const AddressDetails = () => {
  const navigate = useNavigate();
  const planDetails = JSON.parse(localStorage.getItem('planDetails'));

  const { user } = useContext(UserContext);
  let userFirstName;
  if (user) {
    const usernameArray = user.name.split(' ');
    userFirstName = usernameArray[0];
  }

  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState();
  const [showStatesMenu, setShowStatesMenu] = useState(false);
  const [addressData, setAddressData] = useState({
    name: '',
    address: '',
    cep: '',
    city: '',
    state: 'Estado',
  });

  const handleChange = (prop) => (event) => {
    if (prop === 'cep') {
      setAddressData({ ...addressData, [prop]: event.target.value });
      cep(event.target.value)
        .then((res) => {
          if (res.cep) {
            setAddressData({
              ...addressData,
              address: `${res.street}, ${res.neighborhood}`,
              cep: res.cep,
              city: res.city,
              state: res.state,
            });
          }
        });
    } else {
      setAddressData({ ...addressData, [prop]: event.target.value });
    }
  };

  const handleStateChange = (acronym) => {
    setAddressData({ ...addressData, state: acronym });
    setShowStatesMenu(false);
  };

  const addressDataIsValid = () => {
    const cepRegex = /^\d{5}-?\d{3}$/;

    if (addressData.name < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O nome do destinatário deve conter pelo menos 3 letras',
      });
      return false;
    }
    if (!addressData.address || !addressData.city || addressData.state === 'Estado' || !addressData.cep) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos',
      });
      return false;
    }
    if (!addressData.address || !addressData.city || addressData.state === 'Estado' || !addressData.cep) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos',
      });
      return false;
    }
    if (!cepRegex.test(addressData.cep)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha com um cep válido',
      });
      return false;
    }
    return true;
  };

  const finishSubscription = () => {
    setLoading(true);
    const subscriptionData = {
      ...planDetails,
      addressData,
      userId: user.id,
    };
    if (addressDataIsValid()) {
      subscribe(user.token, subscriptionData)
        .then(() => {
          localStorage.removeItem('planDetails');
          setLoading(false);
          Swal.fire({
            title: 'Sucesso',
            text: 'Assinatura feita!',
            icon: 'success',
            confirmButtonColor: '#6D7CE4',
            confirmButtonText: 'Entrar',
          }).then(() => {
            setLoading(false);
            navigate('/assinatura');
          });
        })
        .catch((error) => {
          const { status } = error.response;
          setLoading(false);
          if (status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Preencha os dados corretamente',
            });
            return;
          }

          if (status === 409) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Essa conta já assina um plano',
            });
            return;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo deu errado com a assinatura',
          });
        });
    } else setLoading(false);
  };

  useEffect(() => {
    if (!user || user.planType) {
      navigate('/entrar');
    }

    getStates()
      .then((res) => {
        setStates(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Não foi possível carregar os estados',
        });
      });
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
            onChange={handleChange('name')}
          />
          <LargeInput
            placeholder="Endereço"
            value={addressData.address}
            onChange={handleChange('address')}
          />
          <LargeInput
            placeholder="CEP"
            value={addressData.cep}
            onChange={handleChange('cep')}
          />
          <SmallInputsWrapper>
            <CityInput
              placeholder="Cidade"
              value={addressData.city}
              onChange={handleChange('city')}
            />
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
            {states
              ? states.map((item) => (
                <StateOption
                  onClick={() => handleStateChange(item.acronym)}
                >
                  {item.acronym}
                </StateOption>
              ))
              : ''}
          </StatesOptions>
        </SubscribeBox>
        <Button
          text="Finalizar"
          width="47%"
          height="40px"
          marginTop="8px"
          marginBottom="18px"
          onClickFunction={finishSubscription}
          loading={loading}
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
  background-color:#E0D1ED9E;;
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
