import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ text }) => <button className="button is-rounded is-large is-fullwidth">
  {text}
</button>;

export default Button;

Button.propTypes = {
  text: PropTypes.string,
};
