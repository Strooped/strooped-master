import PropTypes from 'prop-types';
import React from 'react';

const ListPlayers = ({ players }) => <ul className="player-list">
  {players.map(player => <li key={player}>
    {player}
  </li>)}
</ul>;

ListPlayers.propTypes = {
  players: PropTypes.arrayOf.string,
};

export default ListPlayers;
