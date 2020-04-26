import { emitMessage } from '../socket/action';

export const GAME_ROOM_CONNECT_REQUESTED = 'GAME_ROOM_CONNECT_REQUESTED';
export const GAME_ROOM_CONNECT_SUCCESS = 'GAME_ROOM_CONNECT_SUCCESS';
export const GAME_ROOM_CONNECT_FAILURE = 'GAME_ROOM_CONNECT_FAILURE';

export const GAME_ROOM_RESET_PLAYER_DATA = 'GAME_ROOM_RESET_PLAYER_DATA';

export const joinGameRoom = ({ joinPin, roomId }) => ({
  type: GAME_ROOM_CONNECT_REQUESTED,
  payload: { joinPin, roomId },
});

export const setCurrentGameRoom = gameRoom => ({
  type: GAME_ROOM_CONNECT_SUCCESS,
  payload: gameRoom,
});

export const resetPlayerData = () => ({
  type: GAME_ROOM_RESET_PLAYER_DATA,
});

export const notifyPlayersOfGameEnd = () => emitMessage('game:ending', {});
