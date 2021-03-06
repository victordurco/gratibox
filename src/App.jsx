/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import GlobalStyle from './styles/GlobalStyle';

import { getUser } from './services/gratibox.services';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Plans from './pages/Plans';
import Subscribe from './pages/Subscribe';
import AddressDetails from './pages/Subscribe/AddressDetails';
import Subscription from './pages/Subscription';

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      getUser(token)
        .then((response) => {
          setUser({ ...response.data, token });
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrar" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/planos" element={<Plans />} />
          <Route path="/assinar/:id" element={<Subscribe />} />
          <Route path="/assinar/:id/finalizar" element={<AddressDetails />} />
          <Route path="/assinatura" element={<Subscription />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
