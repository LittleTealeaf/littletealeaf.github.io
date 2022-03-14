import React, { Component } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './pages/home';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
             <Routes>
                    <Route path="/" component={Home} exact/>
                </Routes>   
            </BrowserRouter>
        );
    }
}

export default App;