import React, { useState } from 'react';
import './convert.css';
import axios from 'axios';

const Convert = () => {
  const [base, setBase] = useState('USD');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState('')
  const [output, setOutput] = useState('');

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleConvert = async(e) => {
    e.preventDefault();
    try {
        const { data } = await axios.get(`${apiUrl}/convert?api_key=${apiKey}&from=${base}&to=${currency}&amount=${amount}&date=${date}`);
        console.log(data)
        setOutput(data?.result)
    } catch (error) {
        console.log(error);
    }
  }

  console.log(output);

  return (
    <div className='convert-main'>
        <h2>Convert Currencies</h2>
        <form className='convert-container'>

            <div className='convert-item'>
                <label htmlFor='base'>Enter Base Currency:</label>
                <input type='text' id='base' min={3} max={3} value={base} onChange={(e) => setBase(e.target.value)} required/>
            </div>

            <div className='convert-item'>
                <label htmlFor='currency'>Enter The Currency To Convert To:</label>
                <input type='text' id='currency' min={3} max={3} value={currency} onChange={(e) => setCurrency(e.target.value)} required />
            </div>

            <div className='convert-item'>
                <label>Enter the amount of {base} to be converted to {currency}:</label>
                <input type='number' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>

            <div className='convert-item'>
                <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <button onClick={handleConvert}>Convert</button>
        </form>
        <div className='convert-output'>
            <p>{output ? `1 ${base} = ${output} ${currency}` : 'Enter the currencies to convert'}</p>
        </div>
    </div>
  )
}

export default Convert