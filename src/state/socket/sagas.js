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
import { updatePlayerList, updatePlayerScore } from '../player/action';

const SOCKET_IO_HOST = process.env.STROOPED_API_HOST;

function createSocketChannel(socket, events) {
  return eventChannel((emit) => {
    const handlers = events.map((event) => {
      const handler = payload => emit({ event, payload });

      socket.on(event, handler);
      return [event, handler];
    });

    return function unsubscribe() {
      handlers.forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  });
}

// eslint-disable-next-line require-yield
function* listenOnSocketEvents(socket) {
  if (!socket) {
    throw new ReferenceError('Client has no active connection to server');
  }

  /**
   * Registers which redux-action to apply for specific socket.io events
   * */
  const actionByEvent = {
    'player:joined': payload => updatePlayerList(payload.player),
    'task:answer': payload => updatePlayerScore(payload.player),
  };
  const events = Object.keys(actionByEvent);

  const channel = yield call(createSocketChannel, socket, events);

  while (true) {
    const { event, payload } = yield take(channel);
    console.info('Event from socket');
    console.info({ event, payload });

    if (!(event in actionByEvent)) {
      console.error(`Cannot find redux-action to apply for socket.io-event ${event}. Existing redux-actions ${Object.keys(actionByEvent)}`);
      // eslint-disable-next-line no-continue
      continue;
    }

    const action = actionByEvent[event](payload);
    yield put(action);
  }
}

function* handleSocketConnection(action) {
  const { query } = action.payload;
  console.info(`Connecting to soket on host: ${SOCKET_IO_HOST}`);

  try {
    const activeSocket = yield call(
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

  const { name: event, payload } = action.payload;

  const { connection: socket, isConnected } = yield select(state => state.socket.socket);

  if (!isConnected) {
    console.error('No connection to socket yet. Could not send message');
    console.info(action);
    return;
  }

  socket.emit(event, payload);
}

export default function* watchSocketConnection() {
  yield takeLatest(SOCKET_CONNECT_REQUESTED, handleSocketConnection);
  yield takeEvery(action => action.type.startsWith('SOCKET_EMIT_'), emitMessageToSocket);
}
