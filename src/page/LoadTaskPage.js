import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import useGameRoom from '../hooks/useGameRoom';
import { changeCurrentTask, notifyPlayersOfNewTask, notifyPlayersOfRoundEnd } from '../state/currentRound/action';
import { notifyPlayersOfGameEnd } from '../state/gameRoom/action';
import { findTaskById, getNextRound, getNextTask } from '../utils/taskUtil';

const getRequestedTaskId = (location) => {
  const params = qs.parse(location.search);

  return params.taskId || null;
};

/**
 * This view is responsible for fetching a the next task for the current round.
 * Such that when we go to CurrentTaskPage, should it have everything it needs.
 * */
const LoadTaskPage = ({ location }) => {
  const gameRoom = useGameRoom();

  const history = useHistory();
  const dispatch = useDispatch();
  const { currentTask, round, isLoading: isTaskLoading } = useSelector(state => state.currentRound);

  const [hasLoadedTask, setHasLoadedTask] = useState(false);

  useEffect(() => {
    if (!round || !round.id) {
      history.push('/round/');
      return;
    }

    if (isTaskLoading) {
      return;
    }

    const requestedTaskId = getRequestedTaskId(location);

    let nextTask = requestedTaskId
      ? findTaskById(round.tasks, requestedTaskId)
      : getNextTask(round.tasks, currentTask);

    if (!nextTask && requestedTaskId) {
      nextTask = getNextTask(round.tasks, currentTask);
    }

    const nextRound = getNextRound(gameRoom?.room?.gameMode?.rounds ?? [], round);
    // We are fully done if there is no next task and no next round available
    const isDoneWithGame = !nextTask && !nextRound;

    if (isDoneWithGame) {
      dispatch(notifyPlayersOfGameEnd());
      history.push('/scoreboard/');
      return;
    }

    // Users will probably see the intermediate scoreboard
    if (!nextTask) {
      dispatch(notifyPlayersOfRoundEnd(round.id));
      history.push('/round/scoreboard/');
      return;
    }

    // We need to notify the players of what task is next
    dispatch(notifyPlayersOfNewTask(nextTask));
    dispatch(changeCurrentTask({ task: nextTask }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentTask && !isTaskLoading) {
      setHasLoadedTask(true);
    }
  }, [currentTask, isTaskLoading]);

  if (hasLoadedTask && currentTask) {
    return <Redirect to={`/round/task/${currentTask.id}`}/>;
  }

  return <section>
    <h2>Loading next task...</h2>
  </section>;
};

LoadTaskPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LoadTaskPage;
