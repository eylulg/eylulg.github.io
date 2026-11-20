import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AppRoutes, preloadPage } from '@/router';
import '@/styles/globals.css';

// If the chunk fails to load, the lazy route tries again and shows the error page.
await preloadPage(window.location.pathname).catch(() => {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
