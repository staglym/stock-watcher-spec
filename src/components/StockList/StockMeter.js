import React from 'react';

const StockMeter = ({
  change,
  changePercent,
  high,
  low,
  price
}) => {
  const calcPointPosition = (high, low, price, changePercent) => {
    // Find what percentage `price` is in the range {low - high}
    const pos = ((price - low) * 100) / (high - low);
    const posFixed = pos.toFixed(2);
    const halfway = 50;
    const offset = '-6.5px';
    const topPercentage = 100 - posFixed;
    const top = changePercent !== 0
      ? `calc(${topPercentage}% + ${offset})`
      : `${halfway}%`

    return {
      position: 'relative',
      top
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
