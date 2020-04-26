import { appendUnique } from '../../utils/arrayUtil';
import { GAME_ROOM_RESET_PLAYER_DATA } from '../gameRoom/action';
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
        ...state,
        allPlayers: appendUnique(
          state.allPlayers,
          action.payload,
          (current, appended) => current.id !== appended.id,
        ),
      };
      // Special actions which instructs us to reset any game related data,
      // like scores.
    case GAME_ROOM_RESET_PLAYER_DATA:
      return {
        ...state,
        allPlayers: state.allPlayers.map(player => ({ ...player, score: 0 })),
      };
    default:
      return state;
  }
}
