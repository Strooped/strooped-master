
export const CREATE_GAME_ROOM_REQUESTED = 'CREATE_GAME_ROOM_REQUESTED';
export const CREATE_GAME_ROOM_SUCCESS = 'CREATE_GAME_ROOM_SUCCESS';
export const CREATE_GAME_ROOM_FAILURE = 'CREATE_GAME_ROOM_FAILURE';

export const createGameRoom = (name, mode) => ({
  type: CREATE_GAME_ROOM_REQUESTED,
  payload: { name, mode },
});
