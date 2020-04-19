import { SOCKET_CONNECT_FAILURE, SOCKET_CONNECT_REQUESTED, SOCKET_CONNECT_SUCCESS } from './action';

const initialState = {
  socket: {
    isConnected: false,
    connection: null,
    pin: null,
    isConnecting: false,
    error: null,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SOCKET_CONNECT_REQUESTED:
      return {
        ...state,
        socket: {
          ...state.socket,
          isConnecting: true,
        },
      };
    case SOCKET_CONNECT_SUCCESS:
      return {
        ...state,
        socket: {
          ...state.socket,
          connection: action.socket,
          error: null,
          isConnected: true,
          isConnecting: false,
        },
      };
    case SOCKET_CONNECT_FAILURE:
      return {
        ...state,
        socket: {
          ...state.socket,
          error: action.error,
          isConnecting: false,
        },
      };
    default:
      return state;
  }
}
