import { act } from 'react-dom/test-utils';

export function mockDate() {
  return new Date(Date.UTC(2019, 2, 25, 0 , -new Date().getTimezoneOffset(), 0, 0)).valueOf();
}

/**
 * General purpose mock of localStorage.
 * When called is a mocked instance returned which can
 * be connected to DOM by calling (typically in beforeEach):
 *
 * ```
 * Object.defineProperty(window, 'localStorage', {
 *   value: localStorageMock,
 * });
 * ```
 * */
export const initLocalStorageMock = (() => {
  let store = {};

  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
});

/**
 * Simple test-utility function to do async wait, with Promises
 *
 * @param {number} ms Miliseconds to wait
 * @return {Promise}
 * */
export const wait = ms => new Promise(rsv => setTimeout(rsv, ms));


/**
 * Utility function to group a list into an object
 *
 * @param {array} list The list containing data
 * @param {function} map Tells how an item should be group into the object.
 *                       (item) => [key, val], key := Key in the object,
 *                                             val := Value which the key points to
 * @return {object} The list grouped into an object
 * */
const groupBy = (list, map) => {
  const grouped = {};

  list.forEach((item) => {
    const [key, val] = map(item);

    if (!(key in grouped)) {
      grouped[key] = val;
    }
  });

  return grouped;
};

/**
 * Does a simple read of the urls, without any deserialization
 * of the values
 * @param {string} uri The uri to parse
 * @return {object}
 * */
export const parseParams = (uri) => {
  const params = uri.split('?')[1];

  const keyVals = params
    .split('&')
    .map(item => item.split('='));

  return groupBy(keyVals, keyVal => keyVal);
};

export const mockDispatch = action => action(dispatch => dispatch);

/**
 * Tests that the reducer, when called with a specific action,
 * results in the correct state
 *
 * @param {function} reducer The reducer to be called
 * @param {object} action
 * @param {object} expectedState The state we expect the reducer to create
 * @param {object|null} oldState Optionally the old state
 * @return {object} The new state. To be used for other assertions
 * */
// eslint-disable-next-line import/prefer-default-export
export const testChangedState = (reducer, action, expectedState, oldState = null) => {
  const newState = reducer(oldState, action);

  expect(newState).toEqual(expectedState);

  // Return new state to be used by caller later
  return newState;
};

/**
 * Generate a range of numbers from up until to.
 *
 * @param {number} from Start
 * @param {number} to Last number
 * @return {array} List of numbers
 * */
export const numberRange = (from, to) => Array(to).fill(from).map((x, y) => x + y);

export const updateFormField = async (element, { name, value }) => {
  await act(async () => {
    element.simulate('change', { persist: () => {}, target: { name, value } });
  });
  await act(async () => {
    element.simulate('blur', { persist: () => {}, target: { name, value } });
  });
};

export const submitForm = async (form, ...evtParams) => {
  await act(async () => {
    form.simulate('submit', { preventDefault: () => {}, ...evtParams });
  });
};
