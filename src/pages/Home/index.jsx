import React from 'react';
import styled from 'styled-components';
import Image from '../../assets/image05.webp';

const Home = () => (
  <PageContainer>
    <Background>
      <BackgroundTop>
        <Title>Bem vindo ao GratiBox</Title>
        <SubTitle>
          Receba em casa um box com chás, produtos organicos, incensos e muito mais...
        </SubTitle>
      </BackgroundTop>
      <ImageBackground src={Image} alt="image background" />
      <BackgroundBottom>
        <SignInButton>Quero começar</SignInButton>
        <SignUpButton>Já sou grato</SignUpButton>
      </BackgroundBottom>
    </Background>
  </PageContainer>
);

export default Home;

const PageContainer = styled.div`
  height:fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  height:100vh;
  width:100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BackgroundTop = styled.div`
  width: 100%;
  height: 100%;
  background-color:#6D7CE4;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: white;
  text-align: center;
  position: relative;
  top: 20px;
  left: 0;
`;

const SubTitle = styled.span`
  width: fit-content;
  max-width: 350px;
  height:92px;
  color: white;
  font-size:18px;
  font-weight: 300;
  text-align: center;
  flex-wrap: wrap;
  display: flex;
  word-break: break-word;
  position: relative;
  top: 50px;
  left: 0;
`;

const BackgroundBottom = styled.div`
  width: 100%;
  height: 50%;
  background-color: #4D65A8;
  border: none;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-top: 1px #4D65A8 solid;
`;

const ImageBackground = styled.img`
  width: 100%;
  border: none;
`;

const SignInButton = styled.button`
  width: 50%;
  max-width: 400px;
  height: 45px;
  border-radius: 10px;
  background-color: #8C97EA;
  color: white;
  font-size:18px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SignUpButton = styled.button`
   width: 50%;
  max-width: 400px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:inherit;
  color: white;
  font-size:18px;
  font-weight: 700;
  cursor:pointer;
`;
