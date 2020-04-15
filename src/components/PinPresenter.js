import PropTypes from 'prop-types';
import React from 'react';

const PinPresenter = ({ pin }) => <div>
  <div className="pin-heading_wrapper">
    <h2>
      Game PIN
    </h2>
  </div>
  <div className="pin__wrapper">
    <span>
      {pin}
    </span>
  </div>
</div>;

PinPresenter.propTypes = {
  pin: PropTypes.number,
};

export default PinPresenter;
