import { Formik } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';
import { createGameRoom } from '../../utils/api/gameRoomApi';
import Input from '../form/Input';
import SelectInput from '../form/SelectInput';

const isModeInModes = (modeId, modes) => !!modes
  .find(mode => mode.id === parseInt(modeId, 10));

const RegisterGameForm = ({ onRegistered, modes }) => {
  const submitGameRoom = (values) => {
    createGameRoom(values)
      .then(room => onRegistered(room))
      .catch(err => console.error('Failed to create game-room', err));
  };

  return <Formik
    initialValues={{
      mode: modes[0] ? modes[0].id : '',
      name: '',
    }}
    validate={(values) => {
      const errors = {};

      if (!values.name || values.name.length < 2) {
        errors.name = 'Please include a name, with minimum 3 characters';
      }

      if (!values.mode) {
        errors.mode = 'Please select which mode you wish to play';
      } else if (!isModeInModes(values.mode, modes)) {
        errors.mode = 'Unknown mode selected. Please select one of the listed modes';
      }

      return errors;
    }}
    onSubmit={submitGameRoom}
  >
    {({
      handleSubmit,
      values,
      handleBlur,
      handleChange,
    }) => <form onSubmit={handleSubmit}>
      <SelectInput
        name="mode"
        label="Game mode"
        value={values.mode}
        onBlur={handleBlur}
        onChange={handleChange}
        required
      >
        <option value="" disabled>No game selected</option>
        {modes.map(mode => <option key={`mode-${mode.id}`} value={mode.id}>{mode.title}</option>)}
      </SelectInput>

      <Input
        name="name"
        label="Name of game"
        value={values.name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Super game"
        required
      />

      <div className="field is-grouped">
        <button className="button is-link is-fullwidth" type="submit">Create game</button>
      </div>
    </form>}
  </Formik>;
};

RegisterGameForm.propTypes = {
  onRegistered: PropTypes.func.isRequired,
  modes: PropTypes.arrayOf(PropTypes.object),
};

export default RegisterGameForm;
