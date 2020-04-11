import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TaskViewLayout = ({ children, sideSection, pageTitle }) => <div className="taskviewlayout">
  <aside className="taskviewlayout__metadata">
    {sideSection}
  </aside>
  <main className="taskviewlayout__task">
    <h1 className="title is-2 has-text-light">{pageTitle}</h1>
    {children}
  </main>
</div>;

TaskViewLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sideSection: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default TaskViewLayout;
