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
export const getColorQuestion = async (task) => {
  const correctColor = task.correctAnswer;
  const { name } = await getColorByHex(correctColor);

  const colorOptions = (await getAllColors())
    .filter(otherColor => task.buttons.includes(otherColor.color))
    .filter(otherColor => otherColor.color !== correctColor);

  const { color } = takeRandomItem(colorOptions);

  return { name, color };
};
