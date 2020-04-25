import { combineReducers } from 'redux';

import gameRoomReducer from './gameRoom/reducer';
import gameModeReducer from './gameMode/reducer';
import socketReducer from './socket/reducer';
import currentRoundReducer from './currentRound/reducer';
import playerReducer from './player/reducer';

const rootReducer = combineReducers({
  gameRoom: gameRoomReducer,
  gameMode: gameModeReducer,
  currentRound: currentRoundReducer,
  socket: socketReducer,
  players: playerReducer,
});

export default rootReducer;
