import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import GlobalStyle from './styles/GlobalStyle';

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/" exact element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default App;
