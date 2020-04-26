import React from 'react';
import PropTypes from 'prop-types';

const PlayerItem = ({ player }) => <li className="tags has-addons">
  <span className="tag is-link is-light is-medium">{player.username}</span>
  <span className="tag is-medium has-text-weight-bold"
  >{player.score}</span>
</li>;

PlayerItem.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.any.isRequired,
    username: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
  }),
};

const OrderedPlayerList = ({ players, className = null }) => <ol className={className}>
  {players.map(player => <PlayerItem key={`orderedplayerlist-${player.id}`} player={player}/>)}
</ol>;

OrderedPlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
    username: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
  })),
  className: PropTypes.string,
};

export default OrderedPlayerList;
