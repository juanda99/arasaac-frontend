import {
  LOGIN,
  LOGOUT,
  ACTIVATION,
  SOCIAL_LOGIN_PREPARE,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
  SOCIAL_LOGOUT,
  login,
  logout,
  socialLogin,
  socialLogout,
  activation,
} from "../actions";

describe("Authentication actions", () => {
  describe("Login request", () => {
    it("should return the correct type and  props", () => {
      const username = "testUser";
      const password = "password";
      const expectedResult = {
        type: LOGIN.REQUEST,
        payload: { username, password },
      };
      expect(login.request(username, password)).toEqual(expectedResult);
    });
  });
  describe("Login success", () => {
    it("should return the correct type and props", () => {
      const username = "testUser";
      const token = "token";
      const expectedResult = {
        type: LOGIN.SUCCESS,
        payload: { username, token },
      };
      expect(login.success(username, token)).toEqual(expectedResult);
    });
  });
  describe("Login failure", () => {
    it("should return the correct type and props", () => {
      const error = "Test error";
      const expectedResult = {
        type: LOGIN.FAILURE,
        payload: { error },
      };
      expect(login.failure(error)).toEqual(expectedResult);
    });
  });

  describe("Activaction request", () => {
    it("should return the correct type and  props", () => {
      const profile = {};
      const expectedResult = {
        type: ACTIVATION.REQUEST,
        payload: { profile },
      };
      expect(activation.request(profile)).toEqual(expectedResult);
    });
  });
  describe("Activaction success", () => {
    it("should return the correct type and props", () => {
      const expectedResult = {
        type: ACTIVATION.SUCCESS,
        payload: {},
      };
      expect(activation.success()).toEqual(expectedResult);
    });
  });
  describe("Activaction failure", () => {
    it("should return the correct type and props", () => {
      const error = "Test error";
      const expectedResult = {
        type: ACTIVATION.FAILURE,
        payload: { error },
      };
      expect(activation.failure(error)).toEqual(expectedResult);
    });
  });

  describe("Logout request", () => {
    it("should return the correct type and  props", () => {
      const expectedResult = {
        type: LOGOUT.REQUEST,
        payload: {},
      };
      expect(logout.request()).toEqual(expectedResult);
    });
  });
  describe("Logout success", () => {
    it("should return the correct type and props", () => {
      const username = "testUser";
      const password = "password";
      const expectedResult = {
        type: LOGOUT.SUCCESS,
        payload: {},
      };
      expect(logout.success(username, password)).toEqual(expectedResult);
    });
  });
  describe("Logout failure", () => {
    it("should return the correct type and props", () => {
      const error = "Test error";
      const expectedResult = {
        type: LOGOUT.FAILURE,
        payload: { error },
      };
      expect(logout.failure(error)).toEqual(expectedResult);
    });
  });

  describe("Social Login actions", () => {
    it("Login actions", () => {
      expect(socialLogin.prepare("facebook", 1)).toEqual({
        type: SOCIAL_LOGIN_PREPARE,
        payload: { service: "facebook", options: 1 },
      });

      expect(socialLogin.request("facebook", 1)).toEqual({
        type: SOCIAL_LOGIN_REQUEST,
        payload: { service: "facebook", options: 1 },
      });

      expect(socialLogin.success(1)).toEqual({
        type: SOCIAL_LOGIN_SUCCESS,
        payload: { user: 1 },
      });

      expect(socialLogin.failure("test")).toEqual({
        type: SOCIAL_LOGIN_FAILURE,
        payload: { error: "test" },
      });
    });

    it("Logout", () => {
      expect(socialLogout()).toEqual({
        type: SOCIAL_LOGOUT,
        payload: {},
      });
    });
  });
});
