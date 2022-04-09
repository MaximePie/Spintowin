import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import { ReactNotifications } from 'react-notifications-component';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-notifications-component/dist/theme.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="app-container">
      <ReactNotifications />
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
