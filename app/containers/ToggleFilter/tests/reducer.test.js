import toggleFilterReducer, { initialState } from "../reducer";
import { toggleFilter } from "../actions";

describe("toggleFilterReducer", () => {
  it("returns the initial state", () => {
    expect(toggleFilterReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle the toggleFilter actions correctly for pictograms", () => {
    const expectedResult = initialState.setIn(["pictograms", "catalog"], false);
    expect(
      toggleFilterReducer(initialState, toggleFilter("pictograms", "catalog"))
    ).toEqual(expectedResult);
  });
  it("should handle the toggleFilter actions correctly for materials", () => {
    const expectedResult = initialState.setIn(["materials", "area"], false);
    expect(
      toggleFilterReducer(initialState, toggleFilter("materials", "area"))
    ).toEqual(expectedResult);
  });
});
