import React from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.scss';
import { ReactNotifications } from 'react-notifications-component';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import 'react-notifications-component/dist/theme.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <div className="app-container">
      <ReactNotifications />
      <App />
    </div>
  </QueryClientProvider>,
);
