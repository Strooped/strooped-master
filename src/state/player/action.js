import { emitMessage } from '../socket/action';

export const UPDATE_PLAYER_LIST = 'UPDATE_PLAYER_LIST';
export const UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE';

export const notifyStartGame = () => emitMessage('game:start');

export const updatePlayerList = player => ({
  type: UPDATE_PLAYER_LIST,
  payload: player,
});

/**
 * Very similar to updatePlayerList, but the semantic meaning
 * of these actions is different.
 *
 * This action implies only that it will update the score of an existing player.
 * However, updatePlayerList can also append or reorder the player-list.
 * */
export const updatePlayerScore = player => ({ type: UPDATE_PLAYER_SCORE, payload: player });
