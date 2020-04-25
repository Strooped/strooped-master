import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Layout.scss';

// eslint-disable-next-line no-unused-vars
const Layout = ({ children, pageTitle, type = null }) => <div className="genericlayout">
  <header className="navbar">
    <span className="title is-1 has-text-light">Strooped</span>
  </header>
  <main className={classNames('pagecontent', type ? `is-${type}` : null)}>
    {children}
  </main>
</div>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  // pageTitle should be used to update the tab name
  pageTitle: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['centered']),
};

export default Layout;
