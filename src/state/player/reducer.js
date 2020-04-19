import { UPDATE_PLAYER_LIST_REQUESTED, UPDATE_PLAYER_LIST_SUCCESS, UPDATE_PLAYER_LIST_FAILURE } from './action';

const initialState = {
  allPlayers: [],
  isLoading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYER_LIST_REQUESTED:
      return {
        ...state,
        isLoading: true,
        allPlayers: null,
      };
    case UPDATE_PLAYER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allPlayers: Object.assign(action.payload),
      };
    case UPDATE_PLAYER_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
