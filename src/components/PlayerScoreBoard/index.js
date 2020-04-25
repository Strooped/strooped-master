import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const PlayerScore = ({ player }) => <li className="playerscore">
  <strong className="playerscore__points">{player.score}</strong>
  <em className="playerscore__username">{player.username}</em>
</li>;

PlayerScore.propTypes = {
  player: PropTypes.shape({
    username: PropTypes.string,
    score: PropTypes.number,
  }),
};

const PlayerScoreBoard = ({ players }) => <ul className="playerscoreboard">
  {players.map((player, idx) => <PlayerScore key={`scoreboard-${idx}`} player={player}/>)}
</ul>;

PlayerScoreBoard.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
};

export default PlayerScoreBoard;
