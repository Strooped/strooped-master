import { emitMessage } from '../socket/action';

export const CURRENT_TASK_UPDATE_REQUESTED = 'CURRENT_TASK_UPDATE_REQUESTED';
export const CURRENT_TASK_UPDATE_SUCCESS = 'CURRENT_TASK_UPDATE_SUCCESS';
export const CURRENT_TASK_UPDATE_FAILURE = 'CURRENT_TASK_UPDATE_FAILURE';

export const CURRENT_ROUND_UPDATE = 'CURRENT_ROUND_UPDATE';

export const changeCurrentTask = ({ task, roundId }) => ({
  type: CURRENT_TASK_UPDATE_REQUESTED,
  payload: { task, roundId },
});

export const updateCurrentRound = ({ round }) => ({
  type: CURRENT_ROUND_UPDATE,
  payload: round,
});

export const notifyTaskTimeout = task => emitMessage('task:ending', task);
export const notifyPlayersOfNewTask = task => emitMessage('task:start', task);
export const notifyPlayersOfRoundEnd = roundId => emitMessage('round:ending', { roundId });
