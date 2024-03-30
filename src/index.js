import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


import { MetaMaskProvider } from './Context/metamaskContext';
import { ContractProvider } from './Context/contractContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MetaMaskProvider>
    <ContractProvider>
     <App/>
     </ContractProvider>
    </MetaMaskProvider>
  </React.StrictMode>
);