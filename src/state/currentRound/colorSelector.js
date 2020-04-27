import { shuffle } from '../../utils/arrayUtil';
import { getContrastYIQ } from '../../utils/colorUtil';

let cachedColors = null;

const fetchAllColors = () => fetch(`${process.env.STROOPED_API_HOST}/colors.json`)
  .then(res => res.json())
  .catch((err) => {
    console.error('Failed to retrieve list of all colors from api', err);
    return [];
  });

const getAllColors = async () => {
  if (!cachedColors) {
    cachedColors = await fetchAllColors();
  }
  return cachedColors;
};

const getColorByHex = async (colorHex) => {
  const allColors = await getAllColors();

  return allColors.find(color => color.color === colorHex);
};

const takeRandomItem = collection => collection[Math.floor(Math.random() * collection.length)];

/**
 * Finds a color-name to combine with the correct answer.
 * Valid color-names are limited by the items in task.buttons.
 *
 * Adjusting this function can help make a task easier or more difficult
 *
 * @return {object} name: A usable name, is not equal to the correct answer
 *                  color: Hex-color-value for the correct answer
 * */
// eslint-disable-next-line import/prefer-default-export
const getColorQuestion = async (task) => {
  const correctColor = task.correctAnswer;
  const { color } = await getColorByHex(correctColor);

  const colorOptions = (await getAllColors())
    .filter(otherColor => task.buttons.includes(otherColor.color))
    .filter(otherColor => otherColor.color !== correctColor);

  const { name } = takeRandomItem(colorOptions);

  return { name, color };
};

const injectBackgroundColors = (buttons) => {
  const defaultBackgroundColor = '#EFEFEF';
  const colorPool = shuffle(buttons.map(button => button.color));

  return buttons.map((button) => {
    // We want to use another background color, than the actuall button color,
    // to make it more difficult
    const backgroundColorIndex = colorPool.findIndex(otherColor => otherColor !== button.color);
    const backgroundColor = backgroundColorIndex > -1
      ? colorPool[backgroundColorIndex]
      : defaultBackgroundColor;

    if (backgroundColorIndex > -1) {
      colorPool.splice(backgroundColorIndex, 1);
    }

    const fontColor = getContrastYIQ(backgroundColor, { light: '#ffffff', dark: '#222222' });

    return {
      ...button,
      backgroundColor,
      fontColor,
    };
  });
};

/**
 * Expands each color in a task with more metadata,
 * and randomly assigns background colors to them.
 * */
// eslint-disable-next-line import/prefer-default-export
export const buildCompleteTask = async (task) => {
  const correctAnswer = await getColorQuestion(task);

  let expandedButtons = await Promise.all(task.buttons.map(button => getColorByHex(button)));
  expandedButtons = expandedButtons.map(button => ({ ...button, backgroundColor: '#ffffff', fontColor: '#222222' }));
  expandedButtons = injectBackgroundColors(expandedButtons);

  return {
    ...task,
    correctAnswer,
    buttons: expandedButtons,
  };
};
