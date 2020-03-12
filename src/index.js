import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout.jsx';
import Header from './components/Header.jsx';

window.axios = axios;

require('./../node_modules/bootstrap/dist/css/bootstrap.css');
import './styles/common.scss';

const Index = () => {
    return (
        <div className="container">
            <Header />
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </div>
    );
};
ReactDOM.render(<Index />, document.getElementById('root'));
