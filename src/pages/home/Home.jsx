import axios from 'axios';
import React, { useState } from 'react';
import './home.css';

const Home = () => {

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  const [symbols, setSymbols] = useState({});

  
  const fetchSymbols = async() => {
    try {
      const { data } = await axios.get(`${apiUrl}/symbols?api_key=${apiKey}`);
      localStorage(setItem("symbols", JSON.stringify(data?.symbols)))
      setSymbols(data?.symbols);
      
    } catch (error) {
      console.log(error);
    }
  }
    

  console.log(symbols)

  return (
    <div className='home-main'>
      <h2>Foreign Exchange Rates</h2>
      <h3>Available Currencies</h3>
      <button onClick={fetchSymbols}>Click to get Available Currencies</button>
      <div className='home-container'>
        {Object.keys(symbols).map(key => (
          <div className='home-item'>
            <p>{key}: {symbols[key]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
