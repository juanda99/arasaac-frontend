import { getFilteredItems } from "../index";

describe("Filter list of items based on JSON filters", () => {
  it("should filter strings and arrays.", () => {
    const items = [
      { a: "aaa", b: ["bbb", "z"], c: "ccc", d: "ddd", e: "eee" },
      { a: "aaa", b: ["bbb", "r"], c: "ccc", d: "eee", e: "fff" },
      { a: "xxx", b: "bbb", c: "ccc", d: "ddd", e: "fff" },
    ];
    const filters = { a: "aaa", b: "bbb" };
    const expectedItems = [
      { a: "aaa", b: ["bbb", "z"], c: "ccc", d: "ddd", e: "eee" },
      { a: "aaa", b: ["bbb", "r"], c: "ccc", d: "eee", e: "fff" },
    ];
    expect(getFilteredItems(items, filters)).toEqual(expectedItems);
  });
  it("should filter objects", () => {
    const items = [{ a: { b: "bbb", c: "ccc" } }];
    const filters = { b: "bbb" };
    const expectedItems = [];
    expect(getFilteredItems(items, filters)).toEqual(expectedItems);
  });
});

/*
describe('Filter list of items based on ImmutableMap filters', () => {
  it('should filter strings and arrays.', () => {
    const items = [
      { a: 'aaa', b: ['bbb', 'z'], c: 'ccc', d: 'ddd', e: 'eee' },
      { a: 'aaa', b: ['bbb', 'r'], c: 'ccc', d: 'eee', e: 'fff' },
      { a: 'xxx', b: 'bbb', c: 'ccc', d: 'ddd', e: 'fff' }
    ]
    const filters = fromJS({ a: 'aaa', b: 'bbb' })
    const expectedItems = [
      { a: 'aaa', b: ['bbb', 'z'], c: 'ccc', d: 'ddd', e: 'eee' },
      { a: 'aaa', b: ['bbb', 'r'], c: 'ccc', d: 'eee', e: 'fff' }
    ]
    expect(getFilteredItems2(items, filters)).toEqual(expectedItems)
  })
  it('should filter objects', () => {
    const items = [{ a: { b: 'bbb', c: 'ccc' } }]
    const filters = fromJS({ b: 'bbb' })
    const expectedItems = []
    expect(getFilteredItems2(items, filters)).toEqual(expectedItems)
  })
})
*/
