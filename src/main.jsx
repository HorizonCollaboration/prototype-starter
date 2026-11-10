// Fixed by Horizon: don't change this file. The prototype itself is App.jsx.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Banner from './Banner.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Banner />
        <App />
    </StrictMode>,
);
