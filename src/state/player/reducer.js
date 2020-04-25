import {
  UPDATE_PLAYER_LIST,
} from './action';

const initialState = {
  allPlayers: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYER_LIST:
      return {
        allPlayers: [...state.allPlayers, action.payload],
      };
    default:
      return state;
  }
}
