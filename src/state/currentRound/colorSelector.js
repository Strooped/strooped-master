let cachedColors = null;

const fetchAllColors = () => fetch('http://localhost:3001/colors.json')
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

// eslint-disable-next-line import/prefer-default-export
export const getColorQuestion = async (correctColor) => {
  const { color } = await getColorByHex(correctColor);

  const allOtherColors = (await getAllColors())
    .filter(otherColor => otherColor.color !== correctColor);

  const { name } = takeRandomItem(allOtherColors);

  console.info(`Correct color is ${name} (hex: ${correctColor}), shown color is ${color}`);
  return { name, color };
};
