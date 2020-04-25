import { appendUnique } from '../../utils/arrayUtil';
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
        allPlayers: appendUnique(
          state.allPlayers,
          action.payload,
          (current, appended) => current.id !== appended.id,
        ),
      };
    default:
      return state;
  }
}
