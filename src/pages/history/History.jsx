import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './history.css';

const History = () => {
    const [symbols, setSymbols] = useState({})
    const [selected, setSelected] = useState([]);
    const [base, setBase] = useState('USD');
    const [rates, setRates] = useState({});
    const [date, setDate] = useState(null);
  
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
          const { data } = await axios.get(`${apiUrl}/${date}?api_key=${apiKey}&base=${base}&currencies=${selected}`);
          setRates(data?.rates);
      } catch (error) {
          console.log(error);
      }
    }


  return (
    <div className='history-main'>
        <h2>Latest Exchange Rates</h2>
        <div className='history-container'>
            <h3>Historical Rates</h3>
            
            <input type='text' min={3} max={3} name='base' value={base} onChange={(e) => setBase(e.target.value)} />
            <input type='date' name='date' value={date} onChange={(e) => setDate(e.target.value)} />

            <div className='history-select'>
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
            <div className='history-selected'>
                {selected.length > 0 ? selected?.map((item) => (
                    <p>{item},</p>
                )) : (<p>All</p>)}
            </div>

            {rates && Object.keys(rates).map(key => (
                <div className='history-item'>
                    <p>1 {base} = {key}: {rates[key]}</p>
                </div>
            ))}

        </div>
    </div>
  )
}

export default History
