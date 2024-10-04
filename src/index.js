import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import HomePage from './pages/index';

import "./styles/styles.scss";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/serviceWorker.js')
            .then((registration) => {
                console.log('Service Worker registrado com sucesso: ', registration);
            })
            .catch((registrationError) => {
                console.log('Falha ao registrar o Service Worker: ', registrationError);
            });
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HomePage />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();