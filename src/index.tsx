import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import { ReactNotifications } from 'react-notifications-component';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import 'react-notifications-component/dist/theme.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <div className="app-container">
      <ReactNotifications />
      <App />
    </div>
  </QueryClientProvider>,
  document.getElementById('root'),
);
