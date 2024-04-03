import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/dist/style.css';
import { AuthProvider } from './services/AuthService';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@smastrom/react-rating/style.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
