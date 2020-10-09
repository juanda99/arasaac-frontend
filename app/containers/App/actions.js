/*
 *
 * LoginView actions
 *
 */

import { createRequestTypes, action } from "utils/actions";
import { DEFAULT_LIST } from "utils";

// constants
export const LOGIN = createRequestTypes("LOGIN");
export const SOCIAL_LOGIN = createRequestTypes("SOCIAL_LOGIN");
export const LOGOUT = "app/LoginView/LOGOUT";
export const TOKEN_VALIDATION = createRequestTypes("TOKEN_VALIDATION");
export const TOKEN_REFRESH = createRequestTypes("TOKEN_REFRESH");
export const RESET_ERROR = "app/LoginView/RESET_ERROR";
export const ACTIVATION = createRequestTypes("ACTIVATION");
// for profileView
export const UPDATE_USER = createRequestTypes("UPDATE_USER");

// pictograms, saga takes place in PictogramsView
export const ADD_FAVORITE = createRequestTypes("ADD_FAVORITE");
export const DELETE_FAVORITE = createRequestTypes("DELETE_FAVORITE");
export const ADD_LIST = createRequestTypes("ADD_LIST");
export const RENAME_LIST = createRequestTypes("RENAME_LIST");
export const DELETE_LIST = createRequestTypes("DELETE_LIST");

export const login = {
  request: (username, password) =>
    action(LOGIN.REQUEST, { username, password }),
  success: (accessToken, refreshToken) =>
    action(LOGIN.SUCCESS, { accessToken, refreshToken }),
  failure: (error) => action(LOGIN.FAILURE, { error }),
};

export const socialLogin = {
  request: (socialToken, provider, locale) =>
    action(SOCIAL_LOGIN.REQUEST, { socialToken, provider, locale }),
  success: (accessToken, refreshToken) =>
    action(SOCIAL_LOGIN.SUCCESS, { accessToken, refreshToken }),
  failure: (error) => action(SOCIAL_LOGIN.FAILURE, { error }),
};

export const tokenValidation = {
  request: (accessToken) => action(TOKEN_VALIDATION.REQUEST, { accessToken }),
  success: (authData) => action(TOKEN_VALIDATION.SUCCESS, { authData }),
  failure: (error) => action(TOKEN_VALIDATION.FAILURE, { error }),
};

export const tokenRefresh = {
  request: (refreshToken) => action(TOKEN_REFRESH.REQUEST, { refreshToken }),
  success: (accessToken) => action(TOKEN_REFRESH.SUCCESS, { accessToken }),
  failure: (error) => action(TOKEN_REFRESH.FAILURE, { error }),
};

export const activation = {
  request: (code) => action(ACTIVATION.REQUEST, { code }),
  success: (accessToken) => action(ACTIVATION.SUCCESS, { accessToken }),
  failure: (error) => action(ACTIVATION.FAILURE, { error }),
};

export const updateUser = {
  request: (user, token) => action(UPDATE_USER.REQUEST, { user, token }),
  success: (user) => action(UPDATE_USER.SUCCESS, { user }),
  failure: (error) => action(UPDATE_USER.FAILURE, { error }),
};

export const logout = () => action(LOGOUT);

export const resetError = () => action(RESET_ERROR);

// favorite pictograms related actions:

export const addFavorite = {
  request: (fileName, listName = DEFAULT_LIST, token) =>
    action(ADD_FAVORITE.REQUEST, { fileName, listName, token }),
  success: (fileName, listName) =>
    action(ADD_FAVORITE.SUCCESS, { fileName, listName }),
  failure: (error) => action(ADD_FAVORITE.FAILURE, { error }),
};

export const deleteFavorite = {
  request: (fileName, listName = DEFAULT_LIST, token) =>
    action(DELETE_FAVORITE.REQUEST, { fileName, listName, token }),
  success: (fileName, listName) =>
    action(DELETE_FAVORITE.SUCCESS, { fileName, listName }),
  failure: (error) => action(DELETE_FAVORITE.FAILURE, { error }),
};

export const addList = {
  request: (listName, token) => action(ADD_LIST.REQUEST, { listName, token }),
  success: (listName) => action(ADD_LIST.SUCCESS, { listName }),
  failure: (error) => action(ADD_LIST.FAILURE, { error }),
};

export const renameList = {
  request: (listName, newListName, token) =>
    action(RENAME_LIST.REQUEST, { listName, newListName, token }),
  success: (listName, newListName) =>
    action(RENAME_LIST.SUCCESS, { listName, newListName }),
  failure: (error) => action(RENAME_LIST.FAILURE, { error }),
};

export const deleteList = {
  request: (listName, token) =>
    action(DELETE_LIST.REQUEST, { listName, token }),
  success: (listName) => action(DELETE_LIST.SUCCESS, { listName }),
  failure: (error) => action(DELETE_LIST.FAILURE, { error }),
};
