import { emitMessage } from '../socket/action';

export const UPDATE_PLAYER_LIST = 'UPDATE_PLAYER_LIST';

export const notifyStartGame = () => emitMessage('game:start');

export const updatePlayerList = player => ({
  type: UPDATE_PLAYER_LIST,
  payload: player,
});
