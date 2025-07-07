import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Must match case and path exactly
import './index.css';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. App will not be mounted.");
}