import { TOGGLE_FILTER, toggleFilter } from "../actions";

describe("ToggleFilter action", () => {
  it("Should return the correct type", () => {
    const filter = "catalog";
    const type = "materials";
    const expectedResult = {
      type: TOGGLE_FILTER,
      payload: { type, filter },
    };
    expect(toggleFilter(type, filter)).toEqual(expectedResult);
  });
});
