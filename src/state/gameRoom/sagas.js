import {
  put,
  takeLatest,
} from 'redux-saga/effects';

import { CREATE_GAME_ROOM_REQUESTED, CREATE_GAME_ROOM_FAILURE, CREATE_GAME_ROOM_SUCCESS } from './action';

function* createGameRoom() {
  try {
    yield put({ type: CREATE_GAME_ROOM_SUCCESS, payload: {} });
  } catch (error) {
    yield put({ type: CREATE_GAME_ROOM_FAILURE, error });
  }
}

export default function* watchGameRoomCreation() {
  yield takeLatest(CREATE_GAME_ROOM_REQUESTED, createGameRoom);
}
