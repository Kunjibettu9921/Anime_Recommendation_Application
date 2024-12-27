// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Using createRoot in React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);