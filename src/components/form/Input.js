import React from 'react';
import PropTypes from 'prop-types';

/**
 * General purpose input element which includes global styles.
 * */
const Input = (props) => {
  const {
    name,
    label = null,
    type = 'text',
    onBlur = () => null,
    onChange,
    value,
    ...other
  } = props;

  const inputId = `input-${name}`;

  return <div className="field">
    {label && <label className="label" htmlFor={inputId}>{label}</label>}
    <div className="control">
      <input
        name={name}
        id={inputId}
        className="input"
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        {...other}
      />
    </div>
  </div>;
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
  type: PropTypes.oneOf([
    'text',
    'email',
    'tel',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'file',
    'hidden',
    'number',
    'password',
    'radio',
    'range',
    'search',
    'time',
    'url',
    'week',
  ]),
};

export default Input;
