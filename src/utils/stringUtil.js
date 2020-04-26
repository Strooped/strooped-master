

// eslint-disable-next-line import/prefer-default-export
export const trim = (phrase, maxLength, suffix = '...') => {
  if (!phrase || (phrase.length + suffix.length) <= maxLength) {
    return phrase;
  }

  return `${phrase.substring(0, maxLength)}${suffix}`;
};
