import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext';

// Get root DOM node
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App wrapped with the ShopContextProvider
root.render(
  <React.StrictMode>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </React.StrictMode>
);
