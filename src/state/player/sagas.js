import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import { UPDATE_PLAYER_LIST_REQUESTED, UPDATE_PLAYER_LIST_FAILURE, UPDATE_PLAYER_LIST_SUCCESS } from './action';

function* updatePlayers(action) {
  const { player } = action.payload;

  try {
    yield put({
      type: UPDATE_PLAYER_LIST_SUCCESS,
      payload: player,
    });
  } catch (error) {
    console.error('Failed to update players', error);
    yield put({ error, type: UPDATE_PLAYER_LIST_FAILURE });
  }
}


export default function* watchPlayerUpdate() {
  yield takeLatest(UPDATE_PLAYER_LIST_REQUESTED, updatePlayers);
}
