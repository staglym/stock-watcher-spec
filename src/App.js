import React, { useEffect, useState } from 'react';
import './App.css';

import WatcherForm from './components/WatcherForm';
import StockList from './components/StockList';

import { fetchStocks } from './client';

const App = () => {
  const [symbol, setSymbol] = useState('');
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setMobile] = useState(window.innerWidth < 480);

  const updateViewport = () => {
    setMobile(window.innerWidth < 480);
  }

  useEffect(() => {
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  });

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
      return false;
    }
    
    fetchStocks(
      setError,
      setLoading,
      setStocks,
      stocks,
      userSymbol
    );

    resetInput();
  };

  return (
    <div className="app">
      <header>
        <h1 className="header">Stock Watcher</h1>
        <WatcherForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isMobile={isMobile}
          symbol={symbol}
        />
      </header>
      {loading && <div className="loading">Loading...</div>}
      {error
        ?
          <>
            <div className="error">Something went wrong. Did you enter a valid stock symbol?</div>
            <StockList isMobile={isMobile} stocks={stocks} />
          </>
        : <StockList isMobile={isMobile} stocks={stocks} />
      }
    </div>
  );
}

export default App;
