/**
 * Allows you to immutably append an item to an array,
 * and at the same time ensure that you will not have two
 * of the same item.
 * */
// eslint-disable-next-line import/prefer-default-export
export const appendUnique = (items, newItem, uniqueComparator) => {
  const deduplicatedItems = items.filter(item => uniqueComparator(item, newItem));

  return [...deduplicatedItems, newItem];
};

/**
 * Updates an item in an array without modifying the position of an item
 * */
export const updateInPlace = (items, updatedItem, isCorrectItem) => [...items]
  .map((item) => {
    if (isCorrectItem(item)) {
      return updatedItem;
    }
    return item;
  });


export const takeN = (items, numberOfItems) => items.slice(0, numberOfItems);

/**
 * Shuffles array in place. ES6 version.
 * Taken from https://stackoverflow.com/a/6274381
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  // eslint-disable-next-line no-plusplus
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const removeItem = (array, item) => {
  const index = array.findIndex(value => value === item);

  if (!!index && index >= 0) {
    array.splice(index, 1);
  }

  return array;
};
