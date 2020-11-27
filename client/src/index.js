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
  const { worker } = require('./mocks/browser')
  worker.start()
} else {
  console.log('real API');

  //Instead, work with the real one

  //We set the baseURL of our API
  axios.defaults.baseURL = 'http://localhost:5000'

  //We set the token in the request header
  axios.defaults.headers.common['jwt'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmMwZDg1OWVmZmIyMTNiMTQxODZlMGUiLCJpYXQiOjE2MDY0NzM4MzcsImV4cCI6MTYwNjU2MDIzN30.Ic7n6tTbD0ESbAXvKStZgxTwRH2kUS_9j6JpO04_aRQ";
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

