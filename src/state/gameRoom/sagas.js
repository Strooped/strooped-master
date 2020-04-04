import {
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { SOCKET_CONNECT_FAILURE, SOCKET_CONNECT_SUCCESS, connectToSocket } from '../socket/action';
import { GAME_ROOM_CONNECT_FAILURE, GAME_ROOM_CONNECT_REQUESTED, GAME_ROOM_CONNECT_SUCCESS } from './action';

function* joinGameRoom(action) {
  const { joinPin } = action.payload;
  try {
    yield put(connectToSocket({ token: joinPin, role: 'master' }));

    const socketAction = yield take([SOCKET_CONNECT_SUCCESS, SOCKET_CONNECT_FAILURE]);

    if (socketAction.type === SOCKET_CONNECT_FAILURE) {
      console.error(`Failed to to connect to socket using pin: ${joinPin}`, socketAction.error);
      // Just pass along the original error
      throw socketAction.error;
    }

    yield put({
      type: GAME_ROOM_CONNECT_SUCCESS,
      // joinPin has to be replaced by a non-hardcoded value
      payload: {
        joinPin,
        gameMode: '1',
        name: 'Some name',
        roomId: 'test123123123',
      },
    });
  } catch (error) {
    yield put({ type: GAME_ROOM_CONNECT_FAILURE, error });
  }
}

/**
 * Will attempt to connect the client to the strooped-relay,
 * as a game-master.
 *
 * It uses the socket-state for the connecting part
 * */
export default function* watchGameRoomJoin() {
  yield takeLatest(GAME_ROOM_CONNECT_REQUESTED, joinGameRoom);
}
