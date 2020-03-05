/**
 * Checks if an object is empty.
 *
 * @param {object} obj The object to check
 * @return {boolean} True if {} or any 'falsy' value
 * */
// eslint-disable-next-line import/prefer-default-export
export const isEmptyObject = (obj) => {
  if (!obj) {
    return true;
  }

  return Object.keys(obj).length < 1;
};

/**
 * Convert a "list of objects" over to an "object
 * of objects" from a key in each object.
 *
 * @throws {ReferenceError} If a key returned from keyExtract is undefined
 * @param {array} array [{ id: 'tests', name: 'Test' }, { id: ... }]
 * @param {function} keyExtract Called for each item, expects a key-value to be returned
 *                              If an item has no key, should it return 'null', not undefined
 * @return {object} { 'tests': { id: 'tests', name: 'Test' }, ... }
 * */
export function arrayToObject(array, keyExtract) {
  return array.reduce((obj, item) => {
    const key = keyExtract(item);

    // undefined keys point to unhandled missing keys
    if (key === undefined) {
      throw ReferenceError(`No key returned for object ${JSON.stringify(item)}`);
      // If key is null, should we ignore it
    } else if (key === null) {
      return obj;
    }

    // eslint-disable-next-line no-param-reassign
    obj[key] = item;
    return obj;
  }, {});
}

/**
 * Merges two objects together shallowly.
 *
 * @param {object} obj1
 * @param {object} obj2 Object with highest precedence
 * @return {object} Object containing the combined values
 * */
export function merge(obj1, obj2) {
  return Object.assign(obj1 || {}, obj2 || {});
}

export const groupBy = (arr, criteria) => arr.reduce((obj, item) => {
  // Check if the criteria is a function to run on the item or a property of it
  const key = typeof criteria === 'function' ? criteria(item) : item[criteria];

  // If the key doesn't exist yet, create it
  if (!(key in obj)) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = [];
  }

  // Push the value to the object
  obj[key].push(item);

  // Return the object to the next item in the loop
  return obj;
}, {});

export function deDuplicate(array) {
  return Array.from(new Set(array));
}
