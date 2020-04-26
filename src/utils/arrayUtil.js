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
