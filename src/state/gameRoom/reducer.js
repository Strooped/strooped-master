import {
  GAME_ROOM_CONNECT_FAILURE,
  GAME_ROOM_CONNECT_REQUESTED,
  GAME_ROOM_CONNECT_SUCCESS,
} from './action';

const initialState = {
  room: {
    name: null,
    gameMode: null,
    roomId: null,
  },
  error: null,
  joinPin: null,
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GAME_ROOM_CONNECT_REQUESTED:
      return {
        ...state,
        isLoading: true,
        joinPin: action.payload.joinPin,
      };
    case GAME_ROOM_CONNECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        room: action.payload,
      };
    case GAME_ROOM_CONNECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
