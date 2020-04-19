import {
  put,
  take,
  call,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { fetchCurrentGameRoom } from '../../utils/api/gameRoomApi';
import { SOCKET_CONNECT_FAILURE, SOCKET_CONNECT_SUCCESS, connectToSocket } from '../socket/action';
import { GAME_ROOM_CONNECT_FAILURE, GAME_ROOM_CONNECT_REQUESTED, GAME_ROOM_CONNECT_SUCCESS } from './action';

function* loadOrFetchGameRoom({ joinPin, roomId }) {
  if (!roomId) {
    console.info(`No roomId provided, attempting to fetch from redux-state... JoinPin: ${joinPin}`);
    const room = yield select(state => state.gameRoom.room);

    if (!room) {
      throw new Error('No room is present in redux-store!');
    }

    if (room.joinPin !== joinPin) {
      throw new Error(`Provided joinPin (${joinPin}) did not match joinPin in redux-store (${room.joinPin})`);
    }

    return room;
  }

  console.info(`RoomId (${roomId}) provided. Loading room...`);
  return yield call(fetchCurrentGameRoom, roomId);
}

function* joinGameRoom(action) {
  const { joinPin, roomId } = action.payload;
  try {
    yield put(connectToSocket({ token: joinPin, role: 'master' }));

    const socketAction = yield take([SOCKET_CONNECT_SUCCESS, SOCKET_CONNECT_FAILURE]);

    if (socketAction.type === SOCKET_CONNECT_FAILURE) {
      console.error(`Failed to to connect to socket using pin: ${joinPin}`, socketAction.error);
      // Just pass along the original error
      throw socketAction.error;
    }

    const gameRoom = yield loadOrFetchGameRoom({ joinPin, roomId });

    yield put({
      type: GAME_ROOM_CONNECT_SUCCESS,
      // joinPin has to be replaced by a non-hardcoded value
      payload: gameRoom,
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
