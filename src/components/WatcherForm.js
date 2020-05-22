import React from 'react';
import PropTypes from 'prop-types';

import Input from './form/Input';

const WatcherForm = ({
  handleChange,
  handleSubmit,
  isMobile,
  symbol
}) => {
  return (
    <form className="watcher-form" onSubmit={handleSubmit}>
      <Input
        className="input"
        handleChange={handleChange}
        placeholder="Enter stock symbol"
        value={symbol}
      />
      <button className="add-stock" type="submit">{isMobile ? 'Add' : 'Add Stock'}</button>
    </form>
  );
};

WatcherForm.propTypes = {
  handleSubmit: PropTypes.func,
  isMobile: PropTypes.bool,
  symbol: PropTypes.string
};

export default WatcherForm;
