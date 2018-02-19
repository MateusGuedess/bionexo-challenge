import React from 'react';
import logo from './../../assets/images/logo.svg';
import './../../assets/css/style.css';
import { Dashboard } from '../Dashboard/components';


export const Body = () =>
(
    <div className="app">
        <Header />
        <Content />
    </div>
);


const Header = () =>
(
    <div className="header">
        <div className="logo">
            <img src={ logo } alt="Bionexo Challenge Logo" />
        </div>
    </div>
);


const Content = () =>
(
    <div className="content">
        <Dashboard />
    </div>
);