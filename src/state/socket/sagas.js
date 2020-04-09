import { put, takeLatest, call } from 'redux-saga/effects';
import { SOCKET_CONNECT_FAILURE, SOCKET_CONNECT_REQUESTED, SOCKET_CONNECT_SUCCESS } from './action';
import { connectToSocket } from '../../utils/socket';

const SOCKET_IO_HOST = 'http://localhost:3002';

let activeSocket = null;

// eslint-disable-next-line require-yield
function* listenOnSocketEvents(socket) {
  if (!socket) {
    throw new ReferenceError('Client has no active connection to server');
  }

  socket.on('game:start', (message) => {
    console.info('Received message from client');
    console.info(message);
  });
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
    yield listenOnSocketEvents(activeSocket);
  } catch (err) {
    console.error(`Failed to talk with socket on host: ${SOCKET_IO_HOST}`, err);
    yield put({
      type: SOCKET_CONNECT_FAILURE,
      error: err,
    });
  }
}

export default function* watchSocketConnection() {
  yield takeLatest(SOCKET_CONNECT_REQUESTED, handleSocketConnection);
}