import 'whatwg-fetch';
import 'core-js/stable';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

import configureStore from './state/configureStore';
// eslint-disable-next-line import/no-named-as-default
import OuterErrorBoundary from './components/OuterErrorBoundary';
import { registerReactAxe } from './util/accessibilityUtil';

import './style/globals.scss';


const { store } = configureStore();

// Give detailed accessibility feedback
registerReactAxe();

ReactDOM.render(
  <Suspense fallback={<div className="loading-wrapper"/>}>
    <Provider store={store}>
      <OuterErrorBoundary>
          <App/>
      </OuterErrorBoundary>
    </Provider>
  </Suspense>,
  document.getElementById('root'),
);
