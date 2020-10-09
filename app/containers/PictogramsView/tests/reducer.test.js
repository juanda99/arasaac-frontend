import { fromJS } from "immutable";
import pictogramsViewReducer, { initialState } from "../reducer";
import { toggleShowFilter } from "../actions";

describe("pictogramsViewReducer", () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it("should return the initial state", () => {
    expect(pictogramsViewReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle the showFilter action correcty", () => {
    const expectedResult = state.set("showFilter", true).set("loading", false);
    expect(pictogramsViewReducer(state, toggleShowFilter())).toEqual(
      expectedResult
    );
  });

  it("should handle the showFilter action correcty: hide filters", () => {
    const testState = fromJS({ showFilter: true });
    const expectedResult = fromJS({ showFilter: false });
    expect(pictogramsViewReducer(testState, toggleShowFilter())).toEqual(
      expectedResult
    );
  });
});
