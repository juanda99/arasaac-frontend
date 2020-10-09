import { createSelector } from "reselect";
import {
  DEFAULT_LIST,
  DEFAULT_PROFILE_PICTURE,
  ARASAAC,
  FACEBOOK,
  GOOGLE,
} from "utils";

// makeSelectLocationState expects a plain JS object for the routing state
export const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get("route"); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export const selectAuth = (state) => state.get("auth");

// we use Token as User
export const makeSelectHasUser = () =>
  createSelector(selectAuth, (auth) => auth.get("accessToken"));

export const makeSelectId = () =>
  createSelector(selectAuth, (auth) => auth.get("_id"));

export const makeSelectLoading = () =>
  createSelector(selectAuth, (auth) => auth.get("loading"));

export const makeSelectFavorites = () =>
  createSelector(selectAuth, (auth) => auth.get("favorites"));

export const makeSelectRootFavorites = () =>
  createSelector(makeSelectFavorites(), (favorites) =>
    favorites ? favorites.get(DEFAULT_LIST) : []
  );

export const makeSelectError = () =>
  createSelector(selectAuth, (auth) => auth.get("error"));

export const makeSelectRefreshToken = () =>
  createSelector(selectAuth, (auth) => auth.get("refreshToken"));

export const makeSelectRefreshing = () =>
  createSelector(selectAuth, (auth) => auth.get("isRefreshing"));

export const makeSelectTokens = () =>
  createSelector(
    makeSelectHasUser(),
    makeSelectRefreshToken(),
    (accessToken, refreshToken) => ({ accessToken, refreshToken })
  );

export const makeSelectName = () =>
  createSelector(
    selectAuth,
    (substate) =>
      substate.get("name") ||
      substate.getIn(["facebook", "name"]) ||
      substate.getIn(["google", "name"])
  );

export const makeSelectPicture = () =>
  createSelector(
    selectAuth,
    makeSelectPictureProvider(),
    (substate, pictureProvider) => {
      if (pictureProvider === ARASAAC) return DEFAULT_PROFILE_PICTURE;
      return substate.getIn([pictureProvider, "picture"]);
    }
  );

export const makeSelectPictureProvider = () =>
  createSelector(
    selectAuth,
    (substate) => substate.get("pictureProvider") || ARASAAC
  );

export const makeSelectHasFacebook = () =>
  createSelector(
    selectAuth,
    (substate) => !!substate.getIn([FACEBOOK, "picture"])
  );

export const makeSelectHasGoogle = () =>
  createSelector(
    selectAuth,
    (substate) => !!substate.getIn([GOOGLE, "picture"])
  );

export const makeSelectLastLogin = () =>
  createSelector(selectAuth, (substate) => substate.get("lastLogin"));

export const makeSelectEmail = () =>
  createSelector(selectAuth, (substate) => substate.get("email"));

export const makeSelectRole = () =>
  createSelector(selectAuth, (substate) => substate.get("role"));

export const makeSelectCompany = () =>
  createSelector(selectAuth, (substate) => substate.get("company"));

export const makeSelectUrl = () =>
  createSelector(selectAuth, (substate) => substate.get("url"));

export const makeSelectUserLocale = () =>
  createSelector(selectAuth, (substate) => substate.get("locale"));

export const makeSelectTargetLanguages = () =>
  createSelector(selectAuth, (substate) => substate.get("targetLanguages"));
