import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

//Assets
import './assets/main.css'
import './style.css';

//Components
import App from './App';

//If you want to work with the Mock API
if (process.env.REACT_APP_API_CONFIG === 'development') {
  console.log('You work with the developement API using mock data (fake)');
  const { worker } = require('./mocks/browser')
  worker.start()
} else {
  console.log('You work with the production API using real data');

  //Instead, work with the real one

  //We set the baseURL of our API
  axios.defaults.baseURL = 'http://localhost:5000'

  // if(sessionStorage.getItem('jwt'))





}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

