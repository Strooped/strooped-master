import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const GameModeSelect = ({ modes, onChange }) => {
  const listenOnClick = mode => (evt) => {
    evt.preventDefault();
    onChange(mode);
  };

  return <div className="gamemodeselect">
    {modes.map((mode, idx) => <button
      key={`mode-${idx}`}
      className="gamemodepreview"
      onClick={listenOnClick(mode)}
    >
      <h3 className="subtitle is-4">{mode.title}</h3>
      <p>{mode.description}</p>
    </button>)}
  </div>;
};

GameModeSelect.propTypes = {
  modes: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default GameModeSelect;
