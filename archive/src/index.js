import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';

import Header from './components/header'
import Home from './pages/home';
import Projects from './pages/projects'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
    
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

