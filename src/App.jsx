import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/entrar" exact element={<SignIn />} />
    </Routes>
  </BrowserRouter>
);

export default App;
