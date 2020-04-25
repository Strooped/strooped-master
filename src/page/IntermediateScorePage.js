import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Layout from '../components/Layout';
import PlayerScoreBoard from '../components/PlayerScoreBoard';
import useGameRoom from '../hooks/useGameRoom';
import usePlayerScoreBoard from '../hooks/usePlayerScoreboard';

import './IntermediateScorePage.scss';

const IntermediateScorePage = () => {
  const gameRoom = useGameRoom();
  const roomId = gameRoom?.room?.id;

  const [shouldStartNextRound, triggerStartNextRound] = useState(false);
  const players = usePlayerScoreBoard();

  if (!roomId) {
    return <Redirect to="/"/>;
  }

  if (shouldStartNextRound) {
    console.info('Navigating to next round...');
    return <Redirect to="/round/"/>;
  }

  return <Layout pageTitle="Round complete">
    <h1 className="title is-1 has-text-light has-text-centered">Round complete</h1>

    <div className="scorelayout">
      <div className="scorelayout__scoreboard">
        <PlayerScoreBoard players={players}/>
      </div>

      <section className="scorelayout__actions">
        <button
          onClick={triggerStartNextRound}
          className="button is-link is-rounded is-centered is-centered-in-container"
        >Start next round</button>
      </section>
    </div>
  </Layout>;
};

export default IntermediateScorePage;
