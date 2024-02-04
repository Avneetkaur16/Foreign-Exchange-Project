import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './change.css';

const Change = () => {
  const [symbols, setSymbols] = useState({})
  const [selected, setSelected] = useState([]);
  const [base, setBase] = useState('USD');
  const [rates, setRates] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
        const { data } = await axios.get(`${apiUrl}/change?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}&base=${base}&currencies=${selected}`);
        setRates(data?.rates);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className='change-main'>
        <h2>Latest Exchange Rates</h2>
        <div className='change-container'>
            <h3>Change Rates</h3>
            
            <div>
                <label htmlFor='base'>Base Currency: </label>
                <input type='text' id='base' min={3} max={3} name='base' value={base} onChange={(e) => setBase(e.target.value)} />

            </div>

            <div className='change-dates'>
                <div className='change-date'>
                    <label htmlFor='startDate'>Start Date: </label>
                    <input type='date' id='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className='change-date'>
                    <label htmlFor='endDate'>End Date: </label>
                    <input type='date' id='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>

            <div className='change-select'>
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
            <div className='change-selected'>
                {selected.length > 0 ? selected?.map((item) => (
                    <p>{item},</p>
                )) : (<p>All</p>)}
            </div>

            {rates && Object.keys(rates).map(key => (
                <>
                <h4>{key}</h4>
                {rates[key] && Object.keys(rates[key]).map(item => (
                    <div>
                        <p>{item} {rates[key][item]}</p>
                    </div>
                ))}
                </>
            ))}

        </div>
    </div>
  )
}

export default Change
