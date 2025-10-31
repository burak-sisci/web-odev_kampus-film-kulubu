// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import et
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Uygulamayı BrowserRouter ile sarmala */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
