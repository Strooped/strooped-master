import { combineReducers } from 'redux';

import gameRoomReducer from './gameRoom/reducer';
import gameModeReducer from './gameMode/reducer';
import socketReducer from './socket/reducer';

const rootReducer = combineReducers({
  gameRoom: gameRoomReducer,
  gameMode: gameModeReducer,
  socket: socketReducer,
});

export default rootReducer;
