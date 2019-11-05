import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Header from './Components/StaticsComponents/Header';

import { ThemeProvider } from './Components/DarkMode/ThemeContext';

ReactDOM.render(
  <ThemeProvider>
  <BrowserRouter>
  <Header/>
    <App />
  </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'));

