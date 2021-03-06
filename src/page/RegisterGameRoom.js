import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import RegisterGameForm from '../components/RegisterGameForm';
import useGameRoom from '../hooks/useGameRoom';
import { listGameModes } from '../state/gameMode/action';

const RegisterGameRoom = () => {
  const pageTitle = 'Start a new game';
  const [gameRoom, setGameRoom] = useState(null);
  const dispatch = useDispatch();
  const { modes = [], error: gameModeError } = useSelector(state => state.gameMode);

  const loadedGameRoom = useGameRoom({
    joinPin: gameRoom?.joinPin,
    roomId: gameRoom?.id,
  });

  useEffect(() => {
    dispatch(listGameModes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadedGameRoom?.room?.id) {
    if (!gameRoom?.joinPin) {
      console.warn('User is already connected to a room. Redirecting to lobby...');
    }

    // Replace with actual redirect when lobby is available
    return <Redirect to="/lobby/"/>;
  }

  return <Layout pageTitle={pageTitle} type="centered">
    <h1 className="title is-2 has-text-centered has-text-light">{pageTitle}</h1>

    {gameModeError && <section className="has-text-light">
      <h3>Could not retrieve any game modes...</h3>
      <p>{gameModeError.message}</p>
    </section>}

    <RegisterGameForm onRegistered={room => setGameRoom(room)} modes={modes}/>
  </Layout>;
};

export default RegisterGameRoom;
