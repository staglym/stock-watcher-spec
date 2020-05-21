import React from 'react';

import arrowUp from '../../images/arrow-up.svg';
import arrowDown from '../../images/arrow-down.svg';

const Arrow = ({ change }) => {
  const image = change > 0
    ? arrowUp
    : arrowDown;

  return <img className="stock-change-arrow" src={image} alt="stock arrow" />;
};

export default Arrow;
