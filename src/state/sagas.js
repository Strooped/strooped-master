import { all } from 'redux-saga/effects';
import watchGameRoomJoin from './gameRoom/sagas';
import watchSocketConnection from './socket/sagas';
import watchGameModeList from './gameMode/sagas';

function* rootSaga() {
  yield all([
    watchGameRoomJoin(),
    watchSocketConnection(),
    watchGameModeList(),
  ]);
}

export default function runSagas(sagaMiddleware) {
  sagaMiddleware.run(rootSaga);
}
