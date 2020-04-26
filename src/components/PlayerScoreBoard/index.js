import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { trim } from '../../utils/stringUtil';
import PlayerItem from '../PlayerItem';

const PlayerScore = ({ player }) => <li className="playerscore">
  <strong className="playerscore__points">{player.score}</strong>
  <em className="playerscore__username">{trim(player.username, 20)}</em>
</li>;

PlayerScore.propTypes = {
  player: PropTypes.shape({
    username: PropTypes.string,
    score: PropTypes.number,
  }),
};

const PlayerScoreBoard = ({ players }) => <div className="content">
  <ol className="playerscoreboard" type="1">
    {players.map((player, idx) => <li key={`scoreboard-${idx}`}><PlayerItem player={player}/></li>)}
  </ol>
</div>;

PlayerScoreBoard.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
};

export default PlayerScoreBoard;
