import { appendUnique } from '../arrayUtil';


describe('appendUnique', () => {
  it('ensure match items are not dupicated', () => {
    const baseList = [
      {
        id: 12312312312,
        name: 'Jon snow',
      },
      {
        id: 9992299,
        name: 'Peter Baelish',
      },
      {
        id: 3333322,
        name: 'Tyrion Lannister',
      },
    ];

    const newItem = {
      id: 12312312312,
      name: 'Updated Jon snow',
    };

    const appendedList = appendUnique(
      baseList,
      newItem,
      (current, appended) => current.id !== appended.id,
    );

    const expectedList = baseList.filter(item => item.id !== 12312312312);
    expectedList.push(newItem);

    expect(appendedList).toEqual(expectedList);
  });
});
