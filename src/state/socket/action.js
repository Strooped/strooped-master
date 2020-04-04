
export const SOCKET_CONNECT_REQUESTED = 'SOCKET_CONNECT_REQUESTED';
export const SOCKET_CONNECT_SUCCESS = 'SOCKET_CONNECT_SUCCESS';
export const SOCKET_CONNECT_FAILURE = 'SOCKET_CONNECT_FAILURE';

export const connectToSocket = query => ({
  type: SOCKET_CONNECT_REQUESTED,
  payload: { query },
});
