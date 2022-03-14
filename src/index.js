import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import App from './App'
import Header from './components/header';

ReactDOM.render(
  <React.StrictMode>
    < Header />
  </React.StrictMode>,
  document.getElementById('header')
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

