import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import LobbyViewLayout from '../components/LobbyViewLayout';
import { notifyStartGame } from '../state/player/action';
import ListPlayers from '../components/ListPlayers';
import useGameRoom from '../hooks/useGameRoom';

const GameLobbyPage = () => {
  const dispatch = useDispatch();
  const gameRoom = useGameRoom();
  const joinPin = gameRoom?.room?.joinPin;
  const { allPlayers = [], isLoading } = useSelector(state => state.players);
  const [redirect, setRedirect] = useState(false);

  if (!joinPin) {
    return <Redirect to={'/'} />;
  }

  const HandleStartGame = () => {
    if (allPlayers.length > 1) {
      dispatch(notifyStartGame());
      setTimeout(() => setRedirect(true), 2000);
    }
  };
  // eslint-disable-next-line consistent-return
  if (redirect) {
    return <Redirect to="/round/"/>;
  }

  return <LobbyViewLayout>
    <div style={{ width: '100%' }}>
      {joinPin && <h2 className='title is-1 has-text-white'>Game PIN</h2>}
      <code className='is-size-1'>{joinPin}</code>
      <h3
        style={{ margin: '50px 0 0' }}
        className='title is-2 has-text-white has-margin-top-1'>
        Players
      </h3>
        {!isLoading && allPlayers && <ListPlayers players={allPlayers}/>}
    </div>
    <button
      className="button is-link is-fullwidth is-size-1"
      onClick={HandleStartGame}
      type="button">
      Start game
    </button>
  </LobbyViewLayout>;
};

export default GameLobbyPage;
