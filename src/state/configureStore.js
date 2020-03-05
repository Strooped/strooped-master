import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import runSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];

// Only include redux logger in development mode
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    // reducer,
    {},
    applyMiddleware(...middleware),
  );

  runSagas(sagaMiddleware);

  return { store };
}
