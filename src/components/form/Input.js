import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  className,
  handleChange,
  placeholder,
  type = 'text',
  value
}) => {
  return (
    <input
      className={className}
      onChange={handleChange}
      placeholder={placeholder}
      required
      type={type}
      value={value}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
};

export default Input;
