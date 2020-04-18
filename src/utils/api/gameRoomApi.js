import { callGet, callPost } from './index';

const buildUrl = path => `${process.env.STROOPED_API_HOST}${path}`;

// eslint-disable-next-line import/prefer-default-export
export const createGameRoom = gameModeId => callPost(
  buildUrl('/v1/game-rooms/'),
  {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mode: gameModeId }),
  },
);

export const fetchCurrentGameRoom = roomId => callGet(buildUrl(`/v1/game-rooms/${roomId}/`));
