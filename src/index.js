import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from "react-toast-notifications";
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
    <App />
    </ToastProvider>
  </React.StrictMode>
);


