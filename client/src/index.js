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

  // axios.defaults.headers.common['jwt'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmMwZDg1OWVmZmIyMTNiMTQxODZlMGUiLCJpYXQiOjE2MDY0NzM4MzcsImV4cCI6MTYwNjU2MDIzN30.Ic7n6tTbD0ESbAXvKStZgxTwRH2kUS_9j6JpO04_aRQ'

  //We set the token in the request header
  //We get the token from the sessionStorage
  axios.defaults.headers.common['jwt'] = sessionStorage.getItem('jwt');
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

