import React, { useState } from 'react';
import './App.css';

import WatcherForm from './components/WatcherForm';
import StockList from './components/StockList';

import { fetchStocks } from './client';

const App = () => {
  const [symbol, setSymbol] = useState('');
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    return setSymbol(value);
  };

  const resetInput = () => setSymbol('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Allow the user to input spaces before and after the symbol without any problems
    const userSymbol = symbol.trim();

    if (!userSymbol.length) {
      resetInput();
      console.error('Received empty input');
      return false;
    }
    
    fetchStocks(
      setError,
      setLoading,
      setStocks,
      stocks,
      userSymbol
    );

    resetInput('');
  };

  return (
    <div className="app">
      <header>
        <h1 className="header">Stock Watcher</h1>
        <WatcherForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          symbol={symbol}
        />
      </header>
      {loading && <div className="loading">Loading...</div>}
      {error
        ? <div className="error">Something went wrong with the API call. Please refresh and try again</div>
        : <StockList stocks={stocks} />
      }
      
    </div>
  );
}

export default App;
