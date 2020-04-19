import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import useGameRoom from '../hooks/useGameRoom';
import { changeCurrentTask, notifyPlayersOfNewTask, notifyPlayersOfRoundEnd } from '../state/currentRound/action';

const findTaskById = (tasks, taskId) => tasks.find(task => task.id === taskId) || null;

const getNextTask = (tasks, currentTask) => {
  if (!currentTask) {
    return tasks[0];
  }

  const currentTaskIndex = tasks.findIndex(task => task.id === currentTask.id);

  if (currentTaskIndex < 0 || currentTaskIndex === undefined) {
    return tasks[0];
  }

  if (currentTaskIndex >= tasks.length) {
    return null;
  }

  return tasks[currentTaskIndex + 1];
};

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
    // If we are not connected to the socket,
    // is there no point in continuing
    if (!gameRoom.room || !gameRoom.room.roomId) {
      history.push('/');
      return;
    }

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

    // No next task available
    // then attempt to load the next round
    // (we should actually load an intermediate scoreboard)
    if (!nextTask) {
      dispatch(notifyPlayersOfRoundEnd(round.id));
      history.push('/round/');
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
