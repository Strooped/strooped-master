import { HttpError } from './errorHandler';

const extractResponseBody = (res) => {
  try {
    return res.json();
  } catch (e) {
    return res.text();
  }
};


/**
 * @param {Response} res
 * */
const responseHandler = async (res) => {
  const body = await extractResponseBody(res);

  if (res.status < 400) {
    return body;
  }

  // Errors typically related to authentication and authorization.
  // 401s from feide consent api implies some other issue, and should not go here
  if ((res.status >= 401 && res.status <= 403)) {
    throw new HttpError(`Could not authenticate user (Error Code ${res.status})`, res.status, body, res);
  }

  // Resource not found
  if (res.status === 404) {
    throw new HttpError(`Could not find resource (Error code ${res.status})`, res.status, body, res);
  }

  // Server errors
  if (res.status >= 500) {
    throw new HttpError(`Something went wrong on the server (Error code ${res.status})`, res.status, body, res);
  }

  // Catch all other unmapped failures and give a generic error
  throw new HttpError(`Unknown error (Error code ${res.status})`, res.status, body, res);
};


// eslint-disable-next-line import/prefer-default-export
export const callGet = (uri, options = {}) => fetch(uri, options).then(responseHandler);
export const callPost = (uri, options = {}) => fetch(uri, { ...options, method: 'post' }).then(responseHandler);
