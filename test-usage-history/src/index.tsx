import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import App2 from './App2';
import App3 from './App3';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
    <>
        <App />
        <App2 />
        <App3 />
    </>
);