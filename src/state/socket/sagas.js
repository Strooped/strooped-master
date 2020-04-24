import {
  put,
  takeLatest,
  takeEvery,
  call,
  select,
  take,
  spawn,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { SOCKET_CONNECT_FAILURE, SOCKET_CONNECT_REQUESTED, SOCKET_CONNECT_SUCCESS } from './action';
import { connectToSocket } from '../../utils/socket';
import { updatePlayerList } from '../player/action';

const SOCKET_IO_HOST = process.env.STROOPED_API_HOST;

let activeSocket = null;

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const playerJoinHandler = (message) => {
      console.info('Received message from client');
      console.info(message);
      emit(message);
    };
    socket.on('player:joined', playerJoinHandler);

    const unsubscribe = () => {
      socket.off('player:joined', playerJoinHandler);
    };
    return unsubscribe;
  });
}

// eslint-disable-next-line require-yield
function* listenOnSocketEvents(socket) {
  if (!socket) {
    throw new ReferenceError('Client has no active connection to server');
  }
  const channel = yield call(createSocketChannel, socket);
  while (true) {
    const player = yield take(channel);
    yield put(updatePlayerList(player));
  }
}

function* handleSocketConnection(action) {
  const { query } = action.payload;
  console.info(`Connecting to soket on host: ${SOCKET_IO_HOST}`);

  try {
    activeSocket = yield call(
      connectToSocket,
      SOCKET_IO_HOST,
      { query },
    );

    console.info('Socket successfully connected');
    console.info(activeSocket);
    // Notify redux of a successful connection
    yield put({
      type: SOCKET_CONNECT_SUCCESS,
      socket: activeSocket,
    });

    // Continue to listen on events
    yield spawn(listenOnSocketEvents, activeSocket);
  } catch (err) {
    console.error(`Failed to talk with socket on host: ${SOCKET_IO_HOST}`, err);
    yield put({
      type: SOCKET_CONNECT_FAILURE,
      error: err,
    });
  }
}

function* emitMessageToSocket(action) {
  console.info('%c Sending message to socket...', 'color: #993669');
  console.info(action);

  const { name, payload } = action.payload;

  const { connection: socket, isConnected } = yield select(state => state.socket.socket);

  if (!isConnected) {
    console.error('No connection to socket yet. Could not send message');
    console.info(action);
    return;
  }

  socket.emit(name, payload);
}

export default function* watchSocketConnection() {
  yield takeLatest(SOCKET_CONNECT_REQUESTED, handleSocketConnection);
  yield takeEvery(action => action.type.startsWith('SOCKET_EMIT_'), emitMessageToSocket);
}
