// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}> {/* Ajoutez I18nextProvider pour la traduction */}
      <ThemeProvider>
        <Router> {/* Enveloppez votre application avec BrowserRouter */}
          <App />
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  </StrictMode>
);
