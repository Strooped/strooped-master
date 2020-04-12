import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';
import useTickAnimation from '../../hooks/useTickAnimation';

/**
 * Just a simple presentational component to show how
 * much time there is left
 * */
const CountdownTimer = ({ timeLeftMs, className = null }) => {
  const timeLeftSeconds = timeLeftMs / 1000;
  const { isAnimationActive } = useTickAnimation({ trigger: timeLeftMs });

  return <em className={classNames('countdowntimer', { 'countdowntimer--change': isAnimationActive }, className)}>
    {timeLeftSeconds} {timeLeftSeconds === 1 ? 'second' : 'seconds'}
  </em>;
};

CountdownTimer.propTypes = {
  timeLeftMs: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default CountdownTimer;
