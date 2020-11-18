import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get('http://localhost:5000/api')
      .then(response => {
        console.log(response.data);
        setMessage(response.data.message)
      })
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {message}
        </p>
      </header>
    </div>
  );
}

export default App;
