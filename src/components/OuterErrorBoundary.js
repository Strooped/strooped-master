import React from 'react';
import PropTypes from 'prop-types';
import { isDevelopment } from '../utils/envUtil';

/**
 * Outer application error boundrary to handle any uncatched events.
 *
 * Errors are reported to Sentry, with additional userinfo and tags
 * available.
 * */
export class OuterErrorBoundary extends React.Component {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    // Do not use Layout, because it requires React router and Redux,
    // and we want this ErrorBoundary to be minimal
    return <main>
      <h2>Something went wrong...</h2>
      {isDevelopment() && <section>
        <h3>Error message</h3>
        <pre>{this.state.error.message}</pre>
      </section>}
    </main>;
  }
}

OuterErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
};

export default OuterErrorBoundary;
