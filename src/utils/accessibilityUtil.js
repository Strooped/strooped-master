import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line import/prefer-default-export
export const registerReactAxe = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Dynamic import react-axe when needed
  const { default: axe } = await import('react-axe');
  axe(React, ReactDOM);
};
