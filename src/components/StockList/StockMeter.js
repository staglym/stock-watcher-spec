import React from 'react';

const StockMeter = ({
  change,
  changePercent,
  high,
  low,
  price
}) => {
  const calcPointPosition = (stockHigh, stockLow, stockPrice, stockChangePercent) => {
    const high = parseFloat(stockHigh);
    const low = parseFloat(stockLow);
    const price = parseFloat(stockPrice);
    const changePercent = parseFloat(stockChangePercent);

    const pos = ((price - low) * 100) / (high - low);
    const halfway = 50;
    const top = changePercent > 0
      ? `${halfway - pos}%`
      : changePercent < 0
        ? `${halfway + pos}%`
        : `${halfway}%`;
    const offset = '-6.5px'; // Current HTML entity I'm using is using 13px of height

    return {
      position: 'relative',
      top: `calc(${top} - ${offset})`
    };
  };

  return (
    <div className={'stock-change ' + (change > 0 ? 'posChange' : 'negChange')}>
      <div className="change-meter">
        <div className="change-graph">
          <div className="change-graph-point">
            <span
              className="point"
              style={calcPointPosition(high, low, price, changePercent)}
            >
              &#x025B9;
            </span>
          </div>
          <div className="change-graph-line"></div>
        </div>
        <div className="change">
          <div className="change-high">{high}</div>
          <div className="change-low">{low}</div>
        </div>
      </div>
    </div>
  );
};

export default StockMeter;
