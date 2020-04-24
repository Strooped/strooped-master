import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const LobbyViewLayout = ({ children }) => <div className="lobbyview">
  <div className="lobby__container">
    <div className="lobby__content">
      {children}
    </div>
  </div>
</div>;

LobbyViewLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LobbyViewLayout;
