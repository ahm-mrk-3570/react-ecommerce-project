import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

import 'swiper/css';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/react-ecommerce-project/'>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
