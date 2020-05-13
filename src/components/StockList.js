import React from 'react';
import PropTypes from 'prop-types';

const StockList = ({ stocks }) => {
  const stockList = stocks.map(stock => {
    const {
      name,
      symbol,
      open,
      high,
      low,
      price,
      change,
      changePercent
    } = stock;

    return (
      <div className="stock-card" key={`${name}-key`}>
        <div>{name}</div>
        <div>{symbol}</div>
        <div>{open}</div>
        <div>{high}</div>
        <div>{low}</div>
        <div>{price}</div>
        <div>{change}</div>
        <div>{changePercent}</div>
      </div>
    );
  });

  return <div className="stock-list">{stockList}</div>;
};

StockList.propTypes = {
  stocks: PropTypes.array
};

export default StockList;
