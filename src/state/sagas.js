import { all } from 'redux-saga/effects';
import watchGameRoomCreation from './gameRoom/sagas';
import watchSocketConnection from './socket/sagas';

function* rootSaga() {
  yield all([
    watchGameRoomCreation(),
    watchSocketConnection(),
  ]);
}

export default function runSagas(sagaMiddleware) {
  sagaMiddleware.run(rootSaga);
}
