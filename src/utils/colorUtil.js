const stripHexColor = hexColor => hexColor.replace('#', '');

/**
 * Ref: https://24ways.org/2010/calculating-color-contrast/
 * */

// eslint-disable-next-line import/prefer-default-export
export function getContrastYIQ(rawHexColor, { light, dark }) {
  const safeHexColor = stripHexColor(rawHexColor);
  const red = parseInt(safeHexColor.substr(0, 2), 16);
  const green = parseInt(safeHexColor.substr(2, 2), 16);
  const blue = parseInt(safeHexColor.substr(4, 2), 16);
  const yiq = ((red * 299) + (green * 587) + (blue * 114)) / 1000;

  return (yiq >= 128) ? dark : light;
}

export function getContrast50(hexColor, { light, dark }) {
  return (parseInt(hexColor.replace('#', ''), 16) > 0xffffff / 2) ? dark : light;
}
