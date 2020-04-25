
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
