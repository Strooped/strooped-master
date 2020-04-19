import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import useGameRoom from '../hooks/useGameRoom';


const LobbyPage = () => {
  const gameRoom = useGameRoom();
  const joinPin = gameRoom?.room?.joinPin;

  if (!joinPin) {
    console.warn('No joinPin accessible in LobbyPage. Redirecting back to homepage...');
    return <Redirect to="/"/>;
  }

  return <section style={{ margin: '1em auto', width: '100%', maxWidth: '40rem' }}>
    {joinPin && <h2>Join <code>{joinPin}</code></h2>}
    <Link to="/round/">Start round</Link>
  </section>;
};

export default LobbyPage;
