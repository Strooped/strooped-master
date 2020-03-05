import { all } from 'redux-saga/effects';
import watchGameRoomCreation from './gameRoom/sagas';

function* rootSaga() {
  yield all([
    watchGameRoomCreation(),
  ]);
}

export default function runSagas(sagaMiddleware) {
  sagaMiddleware.run(rootSaga);
}
