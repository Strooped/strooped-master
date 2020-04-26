import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Layout.scss';

// eslint-disable-next-line no-unused-vars
const Layout = (props) => {
  const {
    children,
    type = null,
    hasExitButton = false,
  } = props;

  return <div className="genericlayout">
    <header className="navbar">
      <span className="title is-3 has-text-light">Strooped</span>
      {hasExitButton && <a href="/" className="button is-danger exitbutton">Exit game</a>}
    </header>
    <main className={classNames('pagecontent', type ? `is-${type}` : null)}>
      {children}
    </main>
  </div>;
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  // pageTitle should be used to update the tab name
  pageTitle: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['centered']),
  hasExitButton: PropTypes.bool,
};

export default Layout;
