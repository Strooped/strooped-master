import { LIST_GAME_MODES_FAILURE, LIST_GAME_MODES_REQUESTED, LIST_GAME_MODES_SUCCESS } from './action';

const initialState = {
  isLoading: false,
  error: null,
  modes: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_GAME_MODES_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case LIST_GAME_MODES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        modes: action.payload,
      };
    case LIST_GAME_MODES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
