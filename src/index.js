import { render } from 'react-dom';
import React from 'react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)