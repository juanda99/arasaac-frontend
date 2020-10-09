import reducer, { initialState } from "../reducer";
import { changeLocale, startTranslation, stopTranslation } from "../actions";

describe("LanguageProviderReducer", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it("should handle changeLocale action correctly", () => {
    const expectedResult = initialState.set("locale", "es");
    expect(reducer(initialState, changeLocale("es"))).toEqual(expectedResult);
  });
  it("should handle startTranslation action correctly", () => {
    const expectedResult = initialState
      .set("locale", "af")
      .set("previousLocale", "en");
    expect(reducer(initialState, startTranslation())).toEqual(expectedResult);
  });
  it("should handle stopTranslation action correctly", () => {
    const state = initialState.set("locale", "af").set("previousLocale", "en");
    const expectedResult = initialState
      .set("previousLocale", "")
      .set("locale", "en");
    expect(reducer(state, stopTranslation())).toEqual(expectedResult);
  });
});
