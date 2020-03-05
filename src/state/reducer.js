import { combineReducers } from 'redux';

import gameRoomReducer from './gameRoom/reducer';

const rootReducer = combineReducers({
  gameRoom: gameRoomReducer,
});

export default rootReducer;
