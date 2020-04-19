import { all } from 'redux-saga/effects';
import watchGameRoomJoin from './gameRoom/sagas';
import watchSocketConnection from './socket/sagas';
import watchGameModeList from './gameMode/sagas';
import watchTaskChange from './currentRound/sagas';
import watchPlayerUpdate from './player/sagas';

function* rootSaga() {
  yield all([
    watchGameRoomJoin(),
    watchSocketConnection(),
    watchGameModeList(),
    watchTaskChange(),
    watchPlayerUpdate(),
  ]);
}

export default function runSagas(sagaMiddleware) {
  sagaMiddleware.run(rootSaga);
}
