/**
 * Author: Pranjal Ekhande
 * Description: This file handles the core logic of the Currency Converter Web App.
 * It sets up the React components and manages the currency conversion functionality.
 */
import React, { useState } from 'react';
import CurrencyAPI from '@everapi/currencyapi-js';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { supported_currencies, isSupportedCurrency } from './modules/currencies';

const key = "cur_live_STu7ZYBGYSGNkXoLTKBQMqlfSH8sazymII9NXhZ0";
const currencyApi = new CurrencyAPI(key);

const topCurrencies = ['USD', 'EUR', 'JPY', 'GBP', 'INR', 'CAD', 'CHF'];

function App() {
  // State to store the current exchange rates and user input (reffered from stackoverflow)
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  // Fetching exchange rates from an API
  const handleConvert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toastr.error('Please enter a valid amount.');
      return;
    }

    if (!isSupportedCurrency(sourceCurrency) || !isSupportedCurrency(targetCurrency)) {
      toastr.error('Invalid currency selected.');
      return;
    }

    try {
      const response = await currencyApi.latest({
        base_currency: sourceCurrency,
        currencies: targetCurrency
      });
      const rate = response.data[targetCurrency].value;
      const convertedAmount = rate * parseFloat(amount);
      setResult(convertedAmount.toFixed(2));
    } catch (error) {
      toastr.error('Error converting currency. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>

      <label htmlFor="sourceCurrency">From:</label>
      <div className="top-currencies">
        {topCurrencies.map(currency => (
          <button 
            key={currency} 
            onClick={() => setSourceCurrency(currency)}
            className={sourceCurrency === currency ? 'active' : ''}
          >
            {currency}
          </button>
        ))}
      </div>
      <div className="converter">
        <div className="currency-selector">
          {/* <label htmlFor="sourceCurrency">From:</label> */}
          
          <select 
            id="sourceCurrency"
            value={sourceCurrency} 
            onChange={(e) => setSourceCurrency(e.target.value)}
          >
            {supported_currencies.map(currency => (
              <option key={currency.abbreviation} value={currency.abbreviation}>
                {currency.abbreviation} - {currency.description}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="targetCurrency">To:</label>
        <div className="top-currencies">
        {topCurrencies.map(currency => (
          <button 
            key={currency} 
            onClick={() => setTargetCurrency(currency)}
            className={targetCurrency === currency ? 'active' : ''}
          >
            {currency}
          </button>
        ))}
      </div>
        <div className="currency-selector">
          {/* <label htmlFor="targetCurrency">To:</label> */}
          <select 
            id="targetCurrency"
            value={targetCurrency} 
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            {supported_currencies.map(currency => (
              <option key={currency.abbreviation} value={currency.abbreviation}>
                {currency.abbreviation} - {currency.description}
              </option>
            ))}
          </select>
        </div>
        <div className="amount-input">
          <label htmlFor="amount">Amount:</label>
          <input 
            id="amount"
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
        <button onClick={handleConvert}>Convert</button>
        {result && (
          <div className="result">
            {amount} {sourceCurrency} = {result} {targetCurrency}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;