import React from 'react';
import PropTypes from 'prop-types';

import './TaskWhiteBoard.scss';

const ORIGINAL_ANSWER_FONT_SIZE = 10;

/**
 * Determines if the font-size should be reduced and by how much.
 * Reduction is given as a Float value from 1 to 0, where 1 is no reduction
 * and 0 is full reduction.
 *
 * Longer words should give stronger reduction
 * */
const getFontSizeReduction = (length) => {
  const activationThreshold = 8;
  // Determines how much the length of the word should affect the reduction
  const reductionWeight = 0.3;

  return length > activationThreshold
    ? Math.abs(1 - reductionWeight * (length / ORIGINAL_ANSWER_FONT_SIZE))
    : 1;
};

const TaskWhiteBoard = ({ colorToDisplay = null }) => {
  if (!colorToDisplay) {
    return <div className="taskwhiteboard">
      <span>Loading task...</span>
    </div>;
  }

  const fontSizeReduction = getFontSizeReduction(colorToDisplay.name.length);
  const actualFontSize = ORIGINAL_ANSWER_FONT_SIZE * fontSizeReduction;

  return <div className="taskwhiteboard">
    <strong
      className="taskwhiteboard__answer"
      style={{ color: colorToDisplay.color, fontSize: `${actualFontSize}em` }}
    >{colorToDisplay.name}</strong>
  </div>;
};

TaskWhiteBoard.propTypes = {
  colorToDisplay: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default TaskWhiteBoard;
