import { callGet } from '../../utils/api';

// eslint-disable-next-line import/prefer-default-export
export const fetchAllGameModes = () => callGet(`${process.env.STROOPED_API_HOST}/v1/game-modes/`);
