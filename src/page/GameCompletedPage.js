import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Redirect } from 'react-router';
import GameModeSelect from '../components/GameModeSelect';
import Layout from '../components/Layout';
import PlayerScoreBoard from '../components/PlayerScoreBoard';
import useGameRoom from '../hooks/useGameRoom';
import usePlayerScoreBoard from '../hooks/usePlayerScoreboard';

import './GameCompletedPage.scss';
import { resetPlayerData, setCurrentGameRoom } from '../state/gameRoom/action';
import { replaceGameMode } from '../utils/api/gameRoomApi';

const GameCompletedPage = () => {
  const gameRoom = useGameRoom();
  const roomId = gameRoom?.room?.id;
  const players = usePlayerScoreBoard();

  const dispatch = useDispatch();
  const { modes: gameModes } = useSelector(state => state.gameMode);

  const [gotoLobby, setGotoLobby] = useState(false);
  const [exitGame, setExitGame] = useState(false);

  const handleGameModeChange = (newMode) => {
    replaceGameMode(roomId, newMode.id)
      .then((updatedRoom) => {
        dispatch(setCurrentGameRoom(updatedRoom));
        dispatch(resetPlayerData());
        setGotoLobby(true);
      })
      .catch(console.error);
  };

  if (exitGame) {
    // Do a full redirect to disconnect client from socket
    window.location.href = '/';
    return null;
  }

  if (gotoLobby) {
    return <Redirect to="/lobby"/>;
  }

  const otherGameModes = gameModes.filter(mode => mode.id !== gameRoom?.room?.gameMode?.id);

  return <Layout pageTitle="Game finished">
    <div className="gamecompletedpage">
      <div className="gamecompletedpage__actions">
        {otherGameModes.length > 0 && <>
          <h2>Choose next game mode</h2>
          <GameModeSelect modes={otherGameModes} onChange={handleGameModeChange}/>
          <strong className="has-text-light">Or</strong>
        </>}
        <button
          onClick={() => setExitGame(true)}
          className={classNames('button is-link is-rounded is-size-4 is-centered', { 'is-only-item': otherGameModes.length < 1 })}
        >Exit game</button>
      </div>

      <div className="gamecompletedpage__scores">
        <h2>Scoreboard</h2>
        <PlayerScoreBoard players={players}/>
      </div>
    </div>
  </Layout>;
};

export default GameCompletedPage;
