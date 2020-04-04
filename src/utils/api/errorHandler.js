
// eslint-disable-next-line import/prefer-default-export
export class HttpError extends Error {
  constructor(err, status = 500, data = null, response = null) {
    super(err);

    // View-name (relevant in Sentry reports)
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
    this.response = response;
  }
}

// eslint-disable-next-line import/prefer-default-export
export function handleHttpError(func) {
  return (...params) => func(...params)
    .catch((err) => {
      console.error('Caught Unexpected error', err);

      return Promise.reject(err);
    });
}
