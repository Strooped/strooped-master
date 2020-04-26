import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import CountdownTimer from '../components/CountdownTimer';
import OrderedPlayerList from '../components/OrderedPlayerList';
import TaskViewLayout from '../components/TaskViewLayout';
import TaskWhiteBoard from '../components/TaskViewLayout/TaskWhiteBoard';
import useGameRoom from '../hooks/useGameRoom';
import useLiveTimer from '../hooks/useLiveTimer';
import { notifyTaskTimeout } from '../state/currentRound/action';

import './CurrentTaskPage.scss';

const TIME_TO_ANSWER_DURATION_SECONDS = 5000;

const CurrentTaskPage = () => {
  useGameRoom();

  const dispatch = useDispatch();
  const { currentTask, round } = useSelector(state => state.currentRound);
  const players = useSelector(state => state.players.allPlayers);
  const [isPaused, setPause] = useState(false);

  const liveTimer = useLiveTimer({
    timeoutMs: TIME_TO_ANSWER_DURATION_SECONDS,
    shouldStart: !!currentTask && !isPaused,
  });

  if (!round) {
    console.warn('Entered this page without any active round');
    return <Redirect to="/round/"/>;
  }

  if (liveTimer.isCompleted) {
    dispatch(notifyTaskTimeout(currentTask));
    return <Redirect to="/round/task/"/>;
  }

  return <TaskViewLayout
    pageTitle="What color is this?"
    sideSection={<>
      <section className="gamemetadata">
        <h2 className="subtitle is-4 has-text-light">Players</h2>
        <OrderedPlayerList
          className="gamemetadata__players"
          players={players}
        />
      </section>
      <CountdownTimer timeLeftMs={liveTimer.timeLeft} className="taskclock"/>
      <button className="button is-text" onClick={() => setPause(!isPaused)}>{!isPaused ? 'pause' : 'continue'}</button>
    </>}
  >
    <TaskWhiteBoard colorToDisplay={currentTask.correctAnswer}/>
  </TaskViewLayout>;
};

export default CurrentTaskPage;
