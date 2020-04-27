import React from 'react';
import PropTypes from 'prop-types';
import PlayerItem from '../PlayerItem';

const OrderedPlayerList = ({ players, className = null }) => <ol className={className}>
  {players.map(player => <li key={`orderedplayerlist-${player.id}`}><PlayerItem player={player}/></li>)}
</ol>;

OrderedPlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
    username: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })),
  className: PropTypes.string,
};

export default OrderedPlayerList;
