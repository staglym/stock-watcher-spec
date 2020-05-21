import React from 'react';
import PropTypes from 'prop-types';

import Input from './form/Input';

const WatcherForm = ({
  handleChange,
  handleSubmit,
  symbol
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input
        className="input"
        handleChange={handleChange}
        placeholder="Enter stock symbol"
        value={symbol}
      />
      <button className="add-stock" type="submit">Add Stock</button>
    </form>
  );
};

WatcherForm.propTypes = {
  handleSubmit: PropTypes.func,
  symbol: PropTypes.string
};

export default WatcherForm;
