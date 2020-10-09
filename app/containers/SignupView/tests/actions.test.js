import { SIGNUP, signup } from "../actions";

describe("SingupView actions", () => {
  describe("Signup request", () => {
    it("should return the correct type and props", () => {
      const email = "email@example.com";
      const password = "pass";
      const expectedResult = {
        type: SIGNUP.REQUEST,
        payload: { email, password },
      };
      expect(signup.request(email, password)).toEqual(expectedResult);
    });
  });
  describe("Signup success", () => {
    it("should return the correct type and props", () => {
      const expectedResult = {
        type: SIGNUP.SUCCESS,
        payload: {},
      };
      expect(signup.success()).toEqual(expectedResult);
    });
  });
  describe("Signup failure", () => {
    it("should return the correct type and props", () => {
      const error = "Test error";
      const expectedResult = {
        type: SIGNUP.FAILURE,
        payload: { error },
      };
      expect(signup.failure(error)).toEqual(expectedResult);
    });
  });
});
