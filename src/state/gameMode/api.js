import { callGet } from '../../utils/api';

const BASE_URL = 'http://localhost:3001/v1';

// eslint-disable-next-line import/prefer-default-export
export const fetchAllGameModes = () => callGet(`${BASE_URL}/gamemode/`);
