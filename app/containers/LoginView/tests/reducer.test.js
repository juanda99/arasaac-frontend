import Immutable, { fromJS } from "immutable";
import authReducer from "../reducer";
import { login } from "../actions";

describe("AuthReducer", () => {
  let initialState;
  beforeEach(() => {
    initialState = fromJS({
      username: "",
      token: "",
      isAuthenticated: false,
      loading: false,
      error: "",
      profile: {},
    });
  });
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle login action correctly", () => {
    const state = fromJS({
      username: "",
      token: "",
      isAuthenticated: false,
      loading: false,
      error: "previousError",
    });
    const user = "User";
    const password = "Password";
    const expectedResult = fromJS({
      username: "",
      token: "",
      isAuthenticated: false,
      loading: true,
      error: "",
    });
    // expect(authReducer(state, login(user, password))).toEqual(expectedResult)
    expect(
      Immutable.is(
        authReducer(state, login.request(user, password)),
        expectedResult
      )
    ).toEqual(true);
  });
});
