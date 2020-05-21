import React from 'react';
import PropTypes from 'prop-types';

import StockMeter from './StockMeter';
import Arrow from './Arrow';

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
        <StockMeter
          change={change}
          changePercent={changePercent}
          high={high}
          low={low}
          price={price}
        />
        <div className="stock-info">
          <div className="stock-naming">
            <h2 className="stock-name">{name.toUpperCase()}</h2>
            <div className="stock-symbol">{symbol}</div>
          </div>
          <div className="stock-current-price-info">
            <div className="stock-price">{price}</div>
            <div className={'stock-change-info ' + (change > 0 ? 'green' : 'red' )}>
              <div className="stock-card-change">
                {change !== 0 && (
                  <Arrow change={change} />
                )}
                {change}
              </div>
              <div className="stock-changePercent">({changePercent})</div>
            </div>
          </div>
          <div className="stock-projection-info">
            <div className="stock-projection-item">open {open}</div>
            <div className="stock-projection-item">high {high}</div>
            <div className="stock-projection-item">low {low}</div>
          </div>
        </div>
      </div>
    );
  });

  return <div className="stock-list">{stockList}</div>;
};

StockList.propTypes = {
  stocks: PropTypes.array
};

export default StockList;
