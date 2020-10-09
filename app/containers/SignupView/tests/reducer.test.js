import { fromJS } from "immutable";
import signupViewReducer, { initialState } from "../reducer";
import { signup } from "../actions";

describe("signupViewReducer", () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it("should return the initial state", () => {
    expect(signupViewReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle the signup.request action correctly", () => {
    const email = "email@example.com";
    const password = "pass";
    const expectedResult = state.set("loading", true).set("error", "");
    expect(signupViewReducer(state, signup.request(email, password))).toEqual(
      expectedResult
    );
  });

  it("should handle the signup.failure action correctly", () => {
    const error = "test error";
    // const payload = { error }
    const expectedResult = state
      // .set('error', payload.error)
      .set("error", error)
      .set("loading", false);

    expect(signupViewReducer(state, signup.failure(error))).toEqual(
      expectedResult
    );
  });

  it("should handle the signup.success action correctly", () => {
    const expectedResult = fromJS({
      loading: false,
      error: "",
    });
    expect(signupViewReducer(state, signup.success())).toEqual(expectedResult);
  });
});
