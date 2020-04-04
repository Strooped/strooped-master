import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
import { LIST_GAME_MODES_FAILURE, LIST_GAME_MODES_REQUESTED, LIST_GAME_MODES_SUCCESS } from './action';
import { fetchAllGameModes } from './api';

function* retrieveGameModes() {
  try {
    const modes = yield call(fetchAllGameModes);

    yield put({ type: LIST_GAME_MODES_SUCCESS, payload: modes });
  } catch (error) {
    yield put({ type: LIST_GAME_MODES_FAILURE, error });
  }
}

export default function* watchGameModeList() {
  yield takeLatest(LIST_GAME_MODES_REQUESTED, retrieveGameModes);
}
