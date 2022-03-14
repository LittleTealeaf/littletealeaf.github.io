import React, { Component } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './pages/home';
import Projects from './pages/projects'


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                <Header />
                <Routes>
                    <Route path="/" component={Home} exact />
                    <Route path="/projects" component={Projects} />
                    <Route component={Home}/>
                </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;