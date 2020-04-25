import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const ListPlayers = ({ players }) => (
  <ul className="player-list">
    {players.map((player, i) => <li key={`${i}-${player.id}`}>
      {player.username}
    </li>)}
  </ul>
);

ListPlayers.propTypes = {
  players: PropTypes.array,
};

export default ListPlayers;
