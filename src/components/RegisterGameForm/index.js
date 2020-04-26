import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createGameRoom } from '../../utils/api/gameRoomApi';
import GameModeSelect from '../GameModeSelect';

const RegisterGameForm = ({ onRegistered, modes }) => {
  const [selectedMode, setSelectedMode] = useState(null);
  const submitGameRoom = (mode) => {
    createGameRoom(parseInt(mode.id, 10))
      .then(room => onRegistered(room))
      .catch(err => console.error('Failed to create game-room', err));
  };

  return <form onSubmit={(evt) => {
    evt.preventDefault();
    submitGameRoom(selectedMode);
  }}>
    <GameModeSelect
      modes={modes}
      onChange={(mode) => {
        setSelectedMode(mode);
      }}
    />

    <div className="field is-grouped">
      <button className="button is-link is-fullwidth is-rounded is-size-4 has-vertical-margin" type="submit" disabled={!selectedMode}>Create game</button>
    </div>
  </form>;
};

RegisterGameForm.propTypes = {
  onRegistered: PropTypes.func.isRequired,
  modes: PropTypes.arrayOf(PropTypes.object),
};

export default RegisterGameForm;
