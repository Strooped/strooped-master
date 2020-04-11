import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

/**
 * Just a simple presentational component to show how
 * much time there is left
 * */
const CountdownTimer = ({ timeLeftMs, className = null }) => {
  const timeLeftSeconds = timeLeftMs / 1000;

  return <em className={classNames('countdowntimer', className)}>
    {timeLeftSeconds} {timeLeftSeconds === 1 ? 'second' : 'seconds'}
  </em>;
};

CountdownTimer.propTypes = {
  timeLeftMs: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default CountdownTimer;
