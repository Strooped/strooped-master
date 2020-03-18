import io from 'socket.io-client';


// eslint-disable-next-line import/prefer-default-export
export const connectToSocket = (url, options) => new Promise((rsv, rr) => {
  const socket = io(url, options);

  socket.on('connect_error', (err) => {
    console.error('Connection error', err);
    rr(err);
  });

  socket.on('connect', () => {
    rsv(socket);
  });
});
