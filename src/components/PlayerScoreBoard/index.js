import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { takeN } from '../../utils/arrayUtil';
import { trim } from '../../utils/stringUtil';
import PlayerItem from '../PlayerItem';

import './index.scss';

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

const PlayerPodium = ({ players }) => <div className="podium">
  {players.map((player, idx) => <div key={`podium-${idx}`} className={classNames('podium__position', `has-position-${idx + 1}`)}>
    <PlayerItem player={player}/>
    <div className="podium__position__box"/>
  </div>)}
</div>;

PlayerPodium.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
};

const PlayerScoreBoard = ({ players }) => {
  const playersOnPodium = takeN(players, 3);
  const otherPlayers = players.slice(3);

  return <>
    <PlayerPodium players={playersOnPodium}/>
    <ol className="playerscoreboard" type="1" start={4}>
      {otherPlayers.map((player, idx) => <li key={`scoreboard-${idx}`}><PlayerItem player={player}/></li>)}
    </ol>
  </>;
};

PlayerScoreBoard.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
};

export default PlayerScoreBoard;
