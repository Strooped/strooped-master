import { appendUnique, updateInPlace } from '../../utils/arrayUtil';
import { GAME_ROOM_RESET_PLAYER_DATA } from '../gameRoom/action';
import {
  UPDATE_PLAYER_LIST, UPDATE_PLAYER_SCORE,
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
    case UPDATE_PLAYER_SCORE:
      return {
        ...state,
        allPlayers: updateInPlace(
          state.allPlayers,
          action.payload,
          player => player.id === action.payload.id,
        ),
      };
    // Special actions which instructs us to reset any game related data,
    // like scores.
    case GAME_ROOM_RESET_PLAYER_DATA:
      return {
        ...state,
        allPlayers: state.allPlayers.map(player => ({
          ...player,
          score: 0,
        })),
      };
    default:
      return state;
  }
}
