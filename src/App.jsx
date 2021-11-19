import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import GlobalStyle from './styles/GlobalStyle';
import SignUp from './pages/SignUp';

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/cadastro" exact element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

export default App;
