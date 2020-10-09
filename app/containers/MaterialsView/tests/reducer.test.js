import { fromJS } from "immutable";
import materialsViewReducer, { initialState } from "../reducer";
import { materials, toggleShowFilter, setFilterItems } from "../actions";

describe("materialsViewReducer", () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it("should return the initial state", () => {
    expect(materialsViewReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle the showFilter action correcty", () => {
    const expectedResult = state.set("showFilter", true).set("loading", false);
    expect(materialsViewReducer(state, toggleShowFilter())).toEqual(
      expectedResult
    );
  });

  it("should handle the showFilter action correcty: hide filters", () => {
    const testState = fromJS({ showFilter: true });
    const expectedResult = fromJS({ showFilter: false });
    expect(materialsViewReducer(testState, toggleShowFilter())).toEqual(
      expectedResult
    );
  });

  it("should handle the materials.request action correctly", () => {
    const searchText = "test";
    const locale = "es";
    const expectedResult = state.set("loading", true).set("error", false);
    expect(
      materialsViewReducer(state, materials.request(locale, searchText))
    ).toEqual(expectedResult);
  });

  it("should handle the materials.failure action correctly", () => {
    const error = "test error";
    const payload = { error };
    const expectedResult = state
      .set("error", payload.error)
      .set("loading", false);

    expect(materialsViewReducer(state, materials.failure(error))).toEqual(
      expectedResult
    );
  });

  it("should handle the materials.success action correctly", () => {
    const locale = "es";
    const searchText = "test";
    const data = {};
    data.entities = { materials: { 123: { idMaterial: 123 } } };
    data.result = [123];
    const expectedResult = state
      .set("loading", false)
      .setIn(["search", locale, searchText], data.result)
      .mergeIn(["materials"], data.entities.materials);

    expect(
      materialsViewReducer(state, materials.success(locale, searchText, data))
    ).toEqual(expectedResult);
  });

  it("should handle the setFilterItems action correctly", () => {
    const filter = "License";
    const filterItem = "testLicense";
    const expectedResult = state
      .set("loading", false)
      .setIn(["filters", filter], filterItem);
    expect(
      materialsViewReducer(state, setFilterItems(filter, filterItem))
    ).toEqual(expectedResult);
  });
});
