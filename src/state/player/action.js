import { emitMessage } from '../socket/action';

export const UPDATE_PLAYER_LIST_REQUESTED = 'UPDATE_PLAYER_LIST_REQUESTED';
export const UPDATE_PLAYER_LIST_SUCCESS = 'UPDATE_PLAYER_LIST_SUCCESS';
export const UPDATE_PLAYER_LIST_FAILURE = 'UPDATE_PLAYER_LIST_FAILURE';

export const notifyStartGame = () => emitMessage('game:start');


export const updatePlayerList = player => ({
  type: UPDATE_PLAYER_LIST_REQUESTED,
  payload: player,
});
