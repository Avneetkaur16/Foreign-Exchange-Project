import React, { useEffect, useState } from 'react';
import './liverates.css';
import axios from 'axios';

const LiveRates = () => {

  const [symbols, setSymbols] = useState({})
  const [selected, setSelected] = useState([]);
  const [base, setBase] = useState('USD');
  const [rates, setRates] = useState({});

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setSymbols(JSON.parse(localStorage.getItem("symbols")));
  }, []);
    
  const handleSelect = (e) => {
    setSelected((prev) => [...prev, e.target.value])
  }

  const handleGetRates = async() => {
    try {
        const { data } = await axios.get(`${apiUrl}/latest?api_key=${apiKey}&base=${base}&currencies=${selected}`);
        setRates(data?.rates);
    } catch (error) {
        console.log(error);
    }
  }
  
  return (
    <div className='live-main'>
        <h2>Latest Exchange Rates</h2>
        <div className='live-container'>
            <h3>Latest Rates</h3>
            
            <input type='text' min={3} max={3} name='base' value={base} onChange={(e) => setBase(e.target.value)} />

            <div className='live-select'>
                <p>Select To Convert: </p>
                <select onChange={handleSelect}>
                    <option defaultValue='All'>All</option>
                    {symbols && Object.keys(symbols).map(key => (
                        <option value={key}>{key}: {symbols[key]}</option>
                    ))}
                </select>
                <button onClick={handleGetRates}>Get Rates</button>
            </div>

            <h4>Selected Currencies</h4>
            <div className='live-selected'>
                {selected.length > 0 ? selected?.map((item) => (
                    <p>{item},</p>
                )) : (<p>All</p>)}
            </div>

            {rates && Object.keys(rates).map(key => (
                <div className='live-item'>
                    <p>1 {base} = {key}: {rates[key]}</p>
                </div>
            ))}

        </div>
    </div>
  )
}

export default LiveRates
