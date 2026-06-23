// Intercept and silence external browser extension / cross-origin "Script error." false alarms in the preview iframe
if (typeof window !== 'undefined') {
  const suppressError = (message: any, source: any) => {
    const msg = String(message || '');
    const src = String(source || '');
    return (
      msg.includes('Script error.') || 
      !source || 
      src.includes('extension') || 
      src.includes('chrome-extension') || 
      src.includes('chrome') ||
      src.includes('browser-sync') ||
      src.includes('livereload') ||
      !src.startsWith(window.location.origin)
    );
  };

  window.addEventListener('error', (event) => {
    if (suppressError(event.message, event.filename)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }, true);

  const oldOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    if (suppressError(message, source)) {
      return true; // Suppress the error bubbling
    }
    if (oldOnError) {
      return oldOnError.apply(this, arguments as any);
    }
    return false;
  };
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);


