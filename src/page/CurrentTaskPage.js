import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import CountdownTimer from '../components/CountdownTimer';
import TaskViewLayout from '../components/TaskViewLayout';
import TaskWhiteBoard from '../components/TaskViewLayout/TaskWhiteBoard';
import useGameRoom from '../hooks/useGameRoom';
import useLiveTimer from '../hooks/useLiveTimer';
import { notifyTaskTimeout } from '../state/currentRound/action';

const TIME_TO_ANSWER_DURATION_SECONDS = 3000;

const CurrentTaskPage = () => {
  useGameRoom();

  const pageTitle = 'What color is this?';

  const dispatch = useDispatch();
  const { currentTask, round } = useSelector(state => state.currentRound);

  const liveTimer = useLiveTimer({
    timeoutMs: TIME_TO_ANSWER_DURATION_SECONDS,
    shouldStart: !!currentTask,
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
    pageTitle={pageTitle}
    sideSection={<>
      <section>
        <h2 className="subtitle is-4 has-text-light">Players</h2>
        <ol>
          <li>Jon snow</li>
          <li>Peter Baelish</li>
          <li>Tyrion Lannister</li>
        </ol>
      </section>
      <CountdownTimer timeLeftMs={liveTimer.timeLeft} className="has-upper-auto-margin"/>
    </>}
  >
    <TaskWhiteBoard colorToDisplay={currentTask}/>
  </TaskViewLayout>;
};

export default CurrentTaskPage;
