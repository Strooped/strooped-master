
export const SOCKET_CONNECT_REQUESTED = 'SOCKET_CONNECT_REQUESTED';
export const SOCKET_CONNECT_SUCCESS = 'SOCKET_CONNECT_SUCCESS';
export const SOCKET_CONNECT_FAILURE = 'SOCKET_CONNECT_FAILURE';

export const SOCKET_EMIT_MESSAGE = 'SOCKET_EMIT_MESSAGE';

export const connectToSocket = query => ({
  type: SOCKET_CONNECT_REQUESTED,
  payload: { query },
});

export const emitMessage = (name, payload) => ({
  payload: { name, payload },
  type: SOCKET_EMIT_MESSAGE,
});
