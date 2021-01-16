import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserStateProvider } from './data/UserStateProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserStateProvider>
        <App />
      </UserStateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
