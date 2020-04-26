import PropTypes from 'prop-types';
import React from 'react';
import { trim } from '../utils/stringUtil';

const PlayerItem = ({ player }) => <div className="tags has-addons">
  <span className="tag is-link is-light is-medium">{trim(player.username, 20)}</span>
  <span className="tag is-medium has-text-weight-bold">{player.score}</span>
</div>;

PlayerItem.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.any.isRequired,
    username: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
  }),
};

export default PlayerItem;
