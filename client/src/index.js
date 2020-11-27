import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css'
import './style.css';
import App from './App';

if (process.env.REACT_APP_API_CONFIG === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

