import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Layout from '../components/Layout';

import { notifyStartGame } from '../state/player/action';
import ListPlayers from '../components/ListPlayers';
import useGameRoom from '../hooks/useGameRoom';

import './GameLobbyPage.scss';

const GameLobbyPage = () => {
  const dispatch = useDispatch();
  const gameRoom = useGameRoom();
  const joinPin = gameRoom?.room?.joinPin;
  const { allPlayers = [] } = useSelector(state => state.players);
  const [redirect, setRedirect] = useState(false);

  const handleStartGame = () => {
    dispatch(notifyStartGame());
    setTimeout(() => setRedirect(true), 2000);
  };
  // eslint-disable-next-line consistent-return
  if (redirect) {
    return <Redirect to="/round/"/>;
  }

  return <Layout pageTitle="Lobby" type="centered" hasExitButton={true}>
    <article className="lobbyview">
      {joinPin && <h2 className='title is-1 has-text-white'>Game PIN</h2>}
      <code className='is-size-1'>{joinPin}</code>
      <h3 className='title is-2 has-text-white has-top-margin'>
        Players
      </h3>

      {allPlayers && <ListPlayers players={allPlayers}/>}

      <button
        className="button is-link is-fullwidth is-size-4 is-rounded has-upper-auto-margin"
        onClick={handleStartGame}
        type="button">
        Start game
      </button>
    </article>
  </Layout>;
};

export default GameLobbyPage;
