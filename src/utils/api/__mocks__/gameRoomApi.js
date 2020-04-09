
// eslint-disable-next-line import/prefer-default-export
export const createGameRoom = jest.fn().mockImplementation(async options => ({
  name: options.name,
  joinPin: '223455',
}));
