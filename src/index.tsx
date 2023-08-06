import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import AppContainer from './components/AppContainer';

const container = document.querySelector('#root');
if (!container) {
  throw new Error('root element can\'t be found');
}

const queryClient = new QueryClient();

const root = createRoot(container);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContainer />
    </QueryClientProvider>
  </StrictMode>,
);
