import React from 'react';
import { Redirect } from 'react-router';
import CountdownTimer from '../components/CountdownTimer';
import Layout from '../components/Layout';
import PlayerScoreBoard from '../components/PlayerScoreBoard';
import useGameRoom from '../hooks/useGameRoom';
import useLiveTimer from '../hooks/useLiveTimer';

/**
 * The time it takes until we automatically switch to next round
 * */
const NEXT_ROUND_TIMEOUT_MS = 10000;

const IntermediateScorePage = () => {
  const gameRoom = useGameRoom();
  const roomId = gameRoom?.room?.id;

  const { timeLeft, isCompleted } = useLiveTimer({ timeoutMs: NEXT_ROUND_TIMEOUT_MS });

  if (!roomId) {
    return <Redirect to="/"/>;
  }

  if (isCompleted) {
    console.info('Trigger next round...');
  }

  return <Layout pageTitle="Round complete">
    <h1 className="title is-1 has-text-light has-text-centered">Round complete</h1>

    <div className="has-medium-width has-vertical-margin">
      <PlayerScoreBoard players={
        [
          {
            username: 'Player 1',
            score: 3,
          },
          {
            username: 'Player 2',
            score: 1,
          },
          {
            username: 'Player 3',
            score: 20,
          },
        ]
      }/>
    </div>

    <section className="has-medium-width has-vertical-margin">
      <h2 className="subtitle is-4 has-text-light">Starting next round in:</h2>
      <CountdownTimer timeLeftMs={timeLeft}/>
    </section>
  </Layout>;
};

export default IntermediateScorePage;
