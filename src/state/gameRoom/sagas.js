import {
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { SOCKET_CONNECT_FAILURE, SOCKET_CONNECT_SUCCESS, connectToSocket } from '../socket/action';
import { GAME_ROOM_CONNECT_FAILURE, GAME_ROOM_CONNECT_REQUESTED, GAME_ROOM_CONNECT_SUCCESS } from './action';

const MOCKED_ROUNDS = [
  {
    id: '292993dd',
    tasks: [
      {
        id: '22edd',
        type: 'COLOR',
        buttons: ['#FFD700', '#FF4500', '#F08080', '#AFEEEE'],
        correctAnswer: '#FFD700',
      },
      {
        id: 'weofofwfd',
        type: 'COLOR',
        buttons: ['#40E0D0', '#7FFFD4', '#ADD8E6', '#FAEBD7'],
        correctAnswer: '#7FFFD4',
      },
      {
        id: '3r23r2',
        type: 'COLOR',
        buttons: ['#778899', '#7B68EE', '#F08080', '#AFEEEE'],
        correctAnswer: '#778899',
      },
      {
        id: 'egeg233',
        type: 'COLOR',
        buttons: ['#FFD700', '#FF4500', '#FFD700', '#EE82EE'],
        correctAnswer: '#EE82EE',
      },
    ],
  },
  {
    id: '444jjjddd9',
    tasks: [
      {
        id: 'oogeioi',
        type: 'COLOR',
        buttons: ['#FFD700', '#FF4500', '#F08080', '#AFEEEE'],
        correctAnswer: '#FFD700',
      },
      {
        id: 'weofofwfd',
        type: 'COLOR',
        buttons: ['#40E0D0', '#7FFFD4', '#ADD8E6', '#FAEBD7'],
        correctAnswer: '#7FFFD4',
      },
      {
        id: 'ss2222',
        type: 'COLOR',
        buttons: ['#778899', '#7B68EE', '#F08080', '#AFEEEE'],
        correctAnswer: '#778899',
      },
      {
        id: 'ss222',
        type: 'COLOR',
        buttons: ['#FFD700', '#FF4500', '#FFD700', '#EE82EE'],
        correctAnswer: '#EE82EE',
      },
    ],
  },
];


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
        rounds: MOCKED_ROUNDS,
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
