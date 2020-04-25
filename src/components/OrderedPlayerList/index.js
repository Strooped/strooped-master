import React from 'react';
import PropTypes from 'prop-types';

const OrderedPlayerList = ({ players, className = null }) => <ol className={className}>
  {players.map(player => <li key={`orderedplayerlist-${player.id}`}>{player.username}</li>)}
</ol>;

OrderedPlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
    username: PropTypes.string.isRequired,
  })),
  className: PropTypes.string,
};

export default OrderedPlayerList;
