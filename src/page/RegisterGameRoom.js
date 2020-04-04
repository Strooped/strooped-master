import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import RegisterGameForm from '../components/RegisterGameForm';
import useGameRoom from '../hooks/useGameRoom';
import { listGameModes } from '../state/gameMode/action';

const RegisterGameRoom = () => {
  const pageTitle = 'Start a new game';
  const [joinPin, setJoinPin] = useState(null);
  const dispatch = useDispatch();
  const { modes = [], error: gameModeError } = useSelector(state => state.gameMode);

  const gameRoom = useGameRoom({ joinPin });

  useEffect(() => {
    dispatch(listGameModes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (gameRoom.room.roomId) {
    if (!joinPin) {
      console.warn('User is already connected to a room. Redirecting to lobby...');
    }

    // Replace with actual redirect when lobby is available
    return <div>
      Redirect placeholder...
    </div>;
  }

  return <Layout pageTitle={pageTitle} type="centered">
    <h1 className="title is-2 has-text-centered">{pageTitle}</h1>

    {gameModeError && <section>
      <h3>Could not retrieve any game modes...</h3>
      <p>{gameModeError.message}</p>
    </section>}

    <RegisterGameForm onRegistered={room => setJoinPin(room.joinPin)} modes={modes}/>
  </Layout>;
};

export default RegisterGameRoom;
