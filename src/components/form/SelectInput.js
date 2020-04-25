import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wrapper around <select/> with additional styles included
 * */
const SelectInput = (props) => {
  const {
    name,
    onBlur,
    onChange,
    value,
    label,
    children,
    ...other
  } = props;

  const inputId = `select-${name}`;

  return <div className="field">
    <label className="label has-text-light" htmlFor={inputId}>{label}</label>
    <div className="control">
      <div className="select is-fullwidth">
        <select
          name={name}
          id={inputId}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          {...other}
        >
          {children}
        </select>
      </div>
    </div>
  </div>;
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

export default SelectInput;
